/* ============================================================
   ui.js - piezas reutilizables de la interfaz
     E.ui.n()            -> caja de nota (html)
     E.ui.MiniDemo()     -> mini-animacion paso a paso dentro de la explicacion
     E.ui.Quiz()         -> preguntas de opcion multiple
     E.ui.Laboratorio()  -> reproductor + botones para llamar a tus funciones
     E.ui.pestanaX()     -> fabricas de pestañas estandar
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const ui = (E.ui = {});

  /* ---------- helpers de texto ---------- */
  ui.n = (tipo, titulo, html) =>
    '<div class="nota ' + tipo + '"><span class="nota-tit">' + titulo + "</span>" + html + "</div>";
  ui.numeros = function (txt) {
    const partes = String(txt).trim().split(/[\s,;]+/).filter(Boolean);
    if (!partes.length) return { error: "Escribe al menos dos números separados por comas." };
    const nums = [];
    for (const p of partes) {
      if (!/^-?\d+$/.test(p)) return { error: "“" + p + "” no es un entero. Usa solo números enteros, por ejemplo: 5, 2, 9, 1." };
      nums.push(parseInt(p, 10));
    }
    if (nums.length < 2) return { error: "Necesito al menos 2 números." };
    if (nums.length > 40) return { error: "Máximo 40 números (el tamaño de TAM_ARREGLO en tu código)." };
    if (nums.some((x) => Math.abs(x) > 999)) return { error: "Usa números entre -999 y 999 para que se vean bien." };
    return { nums };
  };
  ui.montar = function (cont, html, demos, ctx) {
    cont.innerHTML = html;
    cont.querySelectorAll("[data-demo]").forEach((el) => {
      const f = demos && demos[el.getAttribute("data-demo")];
      if (f) f(el, ctx);
      else el.textContent = "(demo no disponible)";
    });
  };

  /* ---------- mini demo paso a paso ---------- */
  ui.MiniDemo = function (cont, cfg) {
    let pasos = [];
    let pos = 0;
    let timer = null;
    let jugando = false;
    const filtro = cfg.filtro || ((p) => p.lv === 0);
    const cab = h("div", { class: "demo-cab" }, h("span", { class: "demo-sello" }, cfg.sello || "Pruébalo"), h("span", {}, cfg.titulo || ""));
    const escena = h("div", { class: "demo-cuerpo" });
    const texto = h("div", { class: "demo-texto", "aria-live": "polite" });
    const pie = h("div", { class: "demo-pie" });
    const caja = h("div", { class: "demo" }, cab, escena, texto, pie);
    cont.append(caja);
    const vista = cfg.vista(escena);

    const bIni = h("button", { type: "button", class: "btn btn-chico", onclick: () => ir(0) }, "⏮");
    const bAtras = h("button", { type: "button", class: "btn btn-chico", onclick: () => { parar(); ir(pos - 1); } }, "◀ Atrás");
    const bPlay = h("button", { type: "button", class: "btn btn-chico btn-azul", onclick: () => (jugando ? parar() : jugar()) }, "▶ Reproducir");
    const bAdel = h("button", { type: "button", class: "btn btn-chico", onclick: () => { parar(); ir(pos + 1); } }, "Siguiente ▶");
    pie.append(bIni, bAtras, bPlay, bAdel);
    if (cfg.regenerar) {
      pie.append(
        h("button", { type: "button", class: "btn btn-chico", onclick: () => { parar(); cargar(cfg.regenerar()); } }, cfg.etqRegenerar || "Otro ejemplo")
      );
    }
    function parar() {
      jugando = false;
      clearTimeout(timer);
      bPlay.textContent = "▶ Reproducir";
    }
    function jugar() {
      if (pos >= pasos.length - 1) pos = 0;
      jugando = true;
      bPlay.textContent = "⏸ Pausar";
      pintar();
      sig();
    }
    function sig() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!jugando || !caja.isConnected) return parar();
        if (pos >= pasos.length - 1) return parar();
        pos++;
        pintar();
        if (pos >= pasos.length - 1) return parar();
        sig();
      }, cfg.ms || 1300);
    }
    function ir(i) {
      pos = E.clamp(i, 0, pasos.length - 1);
      pintar();
    }
    function pintar() {
      const p = pasos[pos];
      if (!p) return;
      vista.pintar(p.viz, p, pos);
      texto.innerHTML = '<span class="cuenta">' + (pos + 1) + "/" + pasos.length + "</span>" + p.nota;
      bIni.disabled = bAtras.disabled = pos === 0;
      bAdel.disabled = pos >= pasos.length - 1;
    }
    function cargar(lista) {
      pasos = lista.filter(filtro);
      pos = 0;
      pintar();
    }
    cargar(cfg.pasos);
    return { cargar };
  };

  /* ---------- quiz ---------- */
  ui.Quiz = function (cont, id, preguntas) {
    const guardado = E.almacen.leer("quiz:" + id, null);
    let aciertos = 0;
    let respondidas = 0;
    const res = h("div", { class: "quiz-res", "aria-live": "polite" });
    const lista = h("div", { class: "quiz" });
    preguntas.forEach((q, qi) => {
      const ops = h("div", { class: "opciones" });
      const porque = h("div", { class: "porque", hidden: true });
      const botones = q.op.map((txt, oi) => {
        const b = h("button", { type: "button", class: "opcion", onclick: () => responder(oi) }, h("span", { html: txt }));
        ops.append(b);
        return b;
      });
      function responder(oi) {
        botones.forEach((b, k) => {
          b.disabled = true;
          if (k === q.ok) b.classList.add("bien");
          else if (k === oi) b.classList.add("mal");
        });
        porque.hidden = false;
        porque.innerHTML = (oi === q.ok ? "<b>¡Correcto!</b> " : "<b>Casi.</b> ") + q.porque;
        respondidas++;
        if (oi === q.ok) aciertos++;
        if (respondidas === preguntas.length) {
          res.textContent = "Resultado: " + aciertos + " de " + preguntas.length + (aciertos === preguntas.length ? " · ¡perfecto!" : aciertos >= preguntas.length - 1 ? " · casi perfecto" : " · repasa la explicación y vuelve a intentar");
          const mejor = Math.max(aciertos, guardado ? guardado.mejor : 0);
          E.almacen.guardar("quiz:" + id, { mejor: mejor, total: preguntas.length });
          if (ui.alTerminarQuiz) ui.alTerminarQuiz(id, aciertos, preguntas.length);
        }
      }
      lista.append(
        h(
          "section",
          { class: "preg" },
          h("h3", {}, h("span", { class: "n" }, "P" + (qi + 1)), h("span", { html: q.p })),
          q.codigo ? h("pre", {}, q.codigo) : null,
          ops,
          porque
        )
      );
    });
    cont.append(
      h("div", {}, guardado ? h("p", { class: "suave" }, "Tu mejor resultado aquí: " + guardado.mejor + " de " + guardado.total + ".") : null, lista, res)
    );
  };

  /* ---------- laboratorio (llamar a tus funciones a mano) ---------- */
  /*
    cfg = {
      archivos, orden, vista, panelVars, pilaLlamadas,
      crear: () => maquina,                   // nueva maquina (estado inicial)
      arranque: (m) => pasos iniciales,
      ops: [{ id:'push', etq:'push(&pila, ▢)', arg:true }, ...],
      aliases: { push:'push', enqueue:'enqueue', ... }
      limiteElementos: n (opcional)
      estado: (m) => 'texto'
    }
  */
  ui.Laboratorio = function (cont, cfg) {
    let M = null;
    const caja = h("div", { class: "jug-lab" });
    const ops = h("div", { class: "lab-ops" });
    const llamada = h("div", { class: "lab-llamada" }, "Elige una operación para llamar a tu función.");
    const estado = h("span", { class: "lab-estado" });
    const valor = h("input", { type: "number", value: 10, min: -999, max: 999, "aria-label": "Valor para la operación", step: 1 });
    const gArg = h("span", { class: "grupo" }, h("label", {}, "valor "), valor);
    const gOps = h("span", { class: "grupo" });
    const gExtra = h("span", { class: "grupo" });
    const txtSec = h("input", { type: "text", placeholder: cfg.ejemploSecuencia || "push 10, push 20, pop", "aria-label": "Secuencia de llamadas", style: { minWidth: "22ch" } });
    const msg = h("span", { class: "aviso-err", "aria-live": "polite" });
    const reiniciarBtn = h("button", { type: "button", class: "btn btn-chico", onclick: () => reiniciar() }, "↺ Empezar de cero");

    const jugCont = h("div");
    caja.append(ops, llamada, jugCont);
    cont.append(caja);
    let jug = null;

    function val() {
      let n = parseInt(valor.value, 10);
      if (isNaN(n)) n = 0;
      return E.clamp(n, -999, 999);
    }
    function actualizar() {
      estado.textContent = cfg.estado ? cfg.estado(M) : "";
    }
    function llamar(op, arg) {
      msg.textContent = "";
      const o = cfg.ops.find((x) => x.id === op);
      const t = o.llamada ? o.llamada(arg) : o.id + "(" + (o.arg ? arg : "") + ")";
      llamada.textContent = "» " + t;
      const pasos = M.lab(op, arg);
      jug.agregar(pasos, true);
      actualizar();
    }
    cfg.ops.forEach((o) => {
      gOps.append(
        h("button", { type: "button", class: "btn btn-chico" + (o.arg ? " btn-azul" : ""), onclick: () => llamar(o.id, o.arg ? val() : undefined) }, o.etq)
      );
    });
    const sec = () => {
      const trozos = txtSec.value.split(/[;,\n]+/).map((s) => s.trim()).filter(Boolean);
      if (!trozos.length) return;
      const lista = [];
      for (const t of trozos) {
        const m = /^([A-Za-z]+)\s*\(?\s*(&?\w*)?\s*,?\s*(-?\d+)?\s*\)?$/.exec(t);
        const nombre = m && cfg.aliases[m[1].toLowerCase()];
        const o = nombre && cfg.ops.find((x) => x.id === nombre);
        if (!o) { msg.textContent = "No entiendo “" + t + "”. Usa: " + cfg.ops.map((x) => x.id + (x.arg ? " 10" : "")).join(", ") + "."; return; }
        let a;
        if (o.arg) {
          const num = /(-?\d+)\s*\)?\s*$/.exec(t);
          if (!num) { msg.textContent = "A “" + o.id + "” le falta un número, por ejemplo: " + o.id + " 10."; return; }
          a = parseInt(num[1], 10);
        }
        lista.push([o.id, a]);
      }
      if (lista.length > 30) { msg.textContent = "Máximo 30 llamadas a la vez."; return; }
      msg.textContent = "";
      let todos = [];
      lista.forEach(([op, a]) => { todos = todos.concat(M.lab(op, a)); });
      llamada.textContent = "» " + lista.map(([op, a]) => op + (a !== undefined ? "(" + a + ")" : "()")).join(" ; ");
      jug.agregar(todos, true);
      actualizar();
    };
    const gSec = h("span", { class: "grupo" }, txtSec, h("button", { type: "button", class: "btn btn-chico", onclick: sec }, "Ejecutar secuencia"));
    gExtra.append(reiniciarBtn);
    if (cfg.ops.some((o) => o.arg)) ops.append(gArg);
    ops.append(gOps, gSec, gExtra, estado);
    cont.append(msg);

    function reiniciar() {
      E.vaciar(jugCont);
      M = cfg.crear();
      jug = E.Jugador(jugCont, {
        archivos: cfg.archivos,
        orden: cfg.orden,
        inicial: cfg.inicial || "impl",
        vista: cfg.vista,
        panelVars: cfg.panelVars,
        pilaLlamadas: cfg.pilaLlamadas,
      });
      jug.cargar(cfg.arranque(M), "Laboratorio · tú decides qué función se llama");
      llamada.textContent = "Elige una operación para llamar a tu función.";
      actualizar();
    }
    reiniciar();
    return { reiniciar };
  };

  /* ---------- fabricas de pestañas estandar ---------- */
  ui.pestanaExplicacion = (html, demos) => ({
    titulo: "Explicación",
    render(cont, ctx) {
      const d = h("article", { class: "prosa" });
      cont.append(d);
      ui.montar(d, typeof html === "function" ? html(ctx) : html, demos, ctx);
    },
  });
  ui.pestanaCodigo = (modulo, anotaciones, orden, intro) => {
    /* registra los comentarios incrustados de este módulo (se derivan de las
       notas) para que también aparezcan en el código de la prueba de escritorio */
    E.registrarComentarios(modulo, anotaciones);
    return {
      titulo: "Código explicado",
      render(cont) {
        const A = E.codigoDe(modulo);
        if (intro) cont.append(h("div", { class: "prosa ancha", html: intro }));
        cont.append(E.CodigoAnotado(A, anotaciones, orden).el);
      },
    };
  };
  ui.pestanaQuiz = (id, preguntas) => ({
    titulo: "Quiz",
    render(cont) {
      cont.append(h("div", { class: "prosa" }, h("h2", {}, "Ponte a prueba"), h("p", {}, "Sin calificación ni prisa: elige una opción y te explico por qué. Tu mejor resultado se guarda en este navegador.")));
      ui.Quiz(cont, id, preguntas);
    },
  });
  ui.panelCtl = (...hijos) => h("div", { class: "panel-ctl" }, ...hijos);
})();
