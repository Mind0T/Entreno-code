/* ============================================================
   jugador.js - el "reproductor" de pruebas de escritorio
   Muestra el codigo C con la linea que se ejecuta, la escena
   animada (SVG/HTML), la tabla de variables, la consola y la
   tabla de seguimiento (prueba de escritorio en papel).
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;

  const REPO = "https://github.com/Mind0T/entreno-code/blob/main/";
  const ROL_TXT = { dec: "declaración", impl: "implementación", main: "main" };

  /* ---------- panel de codigo (con pestañas por archivo) ---------- */
  E.PanelCodigo = function (archivos, orden, opts) {
    opts = opts || {};
    orden = (orden || ["dec", "impl", "main"]).filter((r) => archivos[r]);
    const el = h("div", { class: "codigo" });
    const tabs = h("div", { class: "codigo-tabs", role: "tablist" });
    const cuerpo = h("div", { class: "codigo-cuerpo" });
    const pie = h("div", { class: "codigo-pie" });
    const lineas = {}; // rol -> [div]
    const vistas = {}; // rol -> div
    const btnTab = {};
    let actual = null;

    /* comentarios incrustados: comPorRol[rol][nLinea] = "texto" */
    const comentarios = opts.comentarios || (archivos._mod && E.COMENT[archivos._mod]) || [];
    const comPorRol = {};
    if (comentarios.length) {
      comentarios.forEach((cm) => {
        const arch = archivos[cm.f];
        if (!arch) return;
        let n = cm.n;
        if (!n) {
          try { n = E.anclas(arch, "comentarios")(cm.ln, cm.nth || 1); } catch (e) { return; }
        }
        if (!n) return;
        comPorRol[cm.f] = comPorRol[cm.f] || {};
        if (!comPorRol[cm.f][n]) comPorRol[cm.f][n] = cm.c; // primera gana
      });
    }

    orden.forEach((rol) => {
      const a = archivos[rol];
      const vista = h("div", { class: "codigo-archivo", role: "tabpanel", hidden: true });
      const comR = comPorRol[rol] || {};
      lineas[rol] = a.lines.map((txt, i) => {
        const hijos = [
          h("span", { class: "ln-n" }, i + 1),
          h("span", { class: "ln-src", html: txt.length ? E.resaltarC(txt) : "&nbsp;" }),
        ];
        if (comR[i + 1]) hijos.push(h("span", { class: "ln-com" }, "// " + comR[i + 1]));
        const ln = h("div", { class: "ln" + (comR[i + 1] ? " con-com" : ""), "data-n": i + 1 }, ...hijos);
        if (opts.alClickLinea) ln.addEventListener("click", () => opts.alClickLinea(rol, i + 1, ln));
        vista.append(ln);
        return ln;
      });
      vistas[rol] = vista;
      cuerpo.append(vista);
      const b = h(
        "button",
        {
          class: "codigo-tab",
          role: "tab",
          type: "button",
          onclick: () => mostrar(rol, true),
        },
        h("span", { class: "tab-nombre" }, a.name),
        h("span", { class: "tab-rol" }, ROL_TXT[rol] || rol)
      );
      btnTab[rol] = b;
      tabs.append(b);
    });

    const enlace = h("a", { class: "codigo-gh", target: "_blank", rel: "noopener" }, "Ver en GitHub");
    const copiar = h(
      "button",
      {
        class: "btn-mini",
        type: "button",
        onclick: () => {
          const txt = archivos[actual].code;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(txt).then(
              () => aviso("Copiado"),
              () => aviso("No se pudo copiar")
            );
          }
        },
      },
      "Copiar"
    );
    const msg = h("span", { class: "codigo-msg", "aria-live": "polite" });
    function aviso(t) {
      msg.textContent = t;
      setTimeout(() => (msg.textContent = ""), 1400);
    }
    pie.append(enlace, copiar, msg);
    el.append(tabs, cuerpo, pie);

    function mostrar(rol, manual) {
      if (!vistas[rol]) return;
      actual = rol;
      orden.forEach((r) => {
        vistas[r].hidden = r !== rol;
        btnTab[r].setAttribute("aria-selected", r === rol ? "true" : "false");
        btnTab[r].classList.toggle("on", r === rol);
      });
      enlace.setAttribute("href", REPO + archivos[rol].path);
      if (manual && opts.alElegir) opts.alElegir(rol);
    }

    let marcadas = [];
    function marcar(rol, linea, prev) {
      marcadas.forEach((x) => x.classList.remove("act", "prev"));
      marcadas = [];
      if (!rol || !lineas[rol]) return;
      if (rol !== actual) mostrar(rol, false);
      if (prev && prev.rol === rol && lineas[rol][prev.l - 1]) {
        lineas[rol][prev.l - 1].classList.add("prev");
        marcadas.push(lineas[rol][prev.l - 1]);
      }
      const nodo = lineas[rol][linea - 1];
      if (nodo) {
        nodo.classList.add("act");
        marcadas.push(nodo);
        const top = nodo.offsetTop;
        const ch = cuerpo.clientHeight;
        if (top < cuerpo.scrollTop + 24 || top > cuerpo.scrollTop + ch - 48) {
          cuerpo.scrollTop = Math.max(0, top - ch / 2);
        }
      }
    }

    mostrar(orden[orden.length > 1 ? 1 : 0] || orden[0], false);
    if (opts.inicial && vistas[opts.inicial]) mostrar(opts.inicial, false);
    return { el, mostrar, marcar, lineas, actual: () => actual, cuerpo };
  };

  /* ---------- codigo con anotaciones (pestaña "Código explicado") ---------- */
  E.CodigoAnotado = function (archivos, anotaciones, orden) {
    // anotaciones: [{ f:'impl', ln:'texto de la linea', nth:1, t:'explicacion html' }]
    const cont = h("div", { class: "anotado" });
    const lista = h("ol", { class: "anotado-lista" });
    const info = h("div", { class: "anotado-info", "aria-live": "polite" }, h("p", { class: "suave" }, "Toca una línea del código (o un número de la lista) para leer qué hace y por qué."));
    const anclas = {};
    const marcas = []; // {f,l,item}
    function ancla(f) {
      if (!anclas[f]) anclas[f] = E.anclas(archivos[f], "anotaciones");
      return anclas[f];
    }
    let panel;
    const items = anotaciones.map((a, i) => {
      const n = ancla(a.f)(a.ln, a.nth || 1);
      const li = h(
        "li",
        {},
        h(
          "button",
          { type: "button", class: "anotado-item", onclick: () => elegir(i) },
          h("code", { class: "anotado-ref" }, archivos[a.f].name + ":" + n),
          h("span", { class: "anotado-titulo", html: a.t.split("|")[0] })
        )
      );
      lista.append(li);
      marcas.push({ f: a.f, l: n, li, i });
      return { n, li };
    });
    function elegir(i) {
      const a = anotaciones[i];
      const m = marcas[i];
      panel.mostrar(a.f, false);
      panel.marcar(a.f, m.l, null);
      marcas.forEach((x) => x.li.classList.toggle("on", x.i === i));
      const partes = a.t.split("|");
      E.vaciar(info);
      info.append(
        h("h4", { html: partes[0] }),
        h("p", { html: partes.slice(1).join("|") || "" }),
        h("code", { class: "anotado-linea" }, archivos[a.f].lines[m.l - 1].trim())
      );
    }
    panel = E.PanelCodigo(archivos, orden, {
      comentarios: E.comentDeAnot(anotaciones),
      alClickLinea: (rol, n) => {
        const i = marcas.findIndex((m) => m.f === rol && m.l === n);
        if (i >= 0) elegir(i);
        else {
          panel.marcar(rol, n, null);
          E.vaciar(info);
          info.append(h("p", { class: "suave" }, "Esa línea no tiene nota. Elige una de la lista de la derecha."));
        }
      },
    });
    // marcar con puntos las lineas que tienen nota
    marcas.forEach((m) => {
      const l = panel.lineas[m.f] && panel.lineas[m.f][m.l - 1];
      if (l) l.classList.add("tiene-nota");
    });
    cont.append(h("div", { class: "anotado-col-codigo" }, panel.el, info), h("div", { class: "anotado-col-lista" }, h("h3", {}, "Línea por línea"), lista));
    if (anotaciones.length) elegir(0);
    return { el: cont };
  };

  /* ---------- el reproductor ---------- */
  E.Jugador = function (contenedor, cfg) {
    const panel = E.PanelCodigo(cfg.archivos, cfg.orden, { inicial: cfg.inicial });
    let todos = [];
    let visibles = [];
    let pos = 0;
    let detalle = cfg.detalleInicial || "fino"; // 'fino' | 'resumido'
    let vel = 1;
    let jugando = false;
    let timer = null;
    let cons = []; // consola acumulada por paso
    let vista = null;

    /* --- estructura --- */
    const raiz = h("div", { class: "jug", tabindex: "0", "aria-label": "Reproductor de la prueba de escritorio. Flechas izquierda y derecha para avanzar, espacio para reproducir." });
    const colIzq = h("div", { class: "jug-izq" }, panel.el);
    const escena = h("div", { class: "jug-escena" });
    const barraTitulo = h("div", { class: "jug-titulo" });
    const nota = h("div", { class: "jug-nota", "aria-live": "polite" });
    const ctrl = h("div", { class: "jug-ctrl" });
    const colDer = h("div", { class: "jug-der" }, barraTitulo, escena, ctrl, nota);
    const datos = h("div", { class: "jug-datos" });
    const pVars = h("section", { class: "caja caja-vars" }, h("h4", {}, "Variables"), h("div", { class: "vars-lista" }));
    const pPila = h("section", { class: "caja caja-pila" }, h("h4", {}, "Llamadas activas"), h("div", { class: "pila-lista" }));
    const pCons = h("section", { class: "caja caja-cons" }, h("h4", {}, "Consola"), h("pre", { class: "cons" }));
    if (cfg.panelVars !== false) datos.append(pVars);
    if (cfg.pilaLlamadas) datos.append(pPila);
    if (cfg.consola !== false) datos.append(pCons);
    const tablaCaja = h("section", { class: "caja caja-tabla" });
    raiz.append(h("div", { class: "jug-fila" }, colIzq, colDer), datos);
    if (cfg.tabla) raiz.append(tablaCaja);
    contenedor.append(raiz);

    vista = cfg.vista(escena);

    /* --- controles --- */
    const btn = (txt, tit, fn, clase) =>
      h("button", { type: "button", class: "ctl " + (clase || ""), title: tit, "aria-label": tit, onclick: fn }, txt);
    const bInicio = btn("⏮", "Ir al inicio", () => ir(0));
    const bAtras = btn("◀", "Paso atrás (←)", () => { pausar(); ir(pos - 1); });
    const bPlay = btn("▶", "Reproducir (espacio)", () => alternar(), "ctl-play");
    const bAdel = btn("▶|", "Paso adelante (→)", () => { pausar(); ir(pos + 1); });
    const bFin = btn("⏭", "Ir al final", () => { pausar(); ir(visibles.length - 1); });
    const slider = h("input", { type: "range", min: 0, max: 0, value: 0, class: "ctl-slider", "aria-label": "Paso", oninput: (e) => { pausar(); ir(parseInt(e.target.value, 10)); } });
    const cuenta = h("span", { class: "ctl-cuenta" }, "0 / 0");
    const selVel = h(
      "select",
      { class: "ctl-sel", "aria-label": "Velocidad", onchange: (e) => (vel = parseFloat(e.target.value)) },
      [0.5, 1, 2, 4, 8, 16].map((v) => h("option", { value: v, selected: v === 1 }, v + "×"))
    );
    const selDet = h(
      "select",
      {
        class: "ctl-sel",
        "aria-label": "Nivel de detalle",
        onchange: (e) => cambiarDetalle(e.target.value),
      },
      h("option", { value: "fino", selected: detalle === "fino" }, "Línea por línea"),
      h("option", { value: "resumido", selected: detalle === "resumido" }, "Resumido")
    );
    ctrl.append(
      h("div", { class: "ctl-fila" }, bInicio, bAtras, bPlay, bAdel, bFin, cuenta),
      slider,
      h("div", { class: "ctl-fila ctl-opc" }, h("label", {}, "Velocidad ", selVel), h("label", {}, "Detalle ", selDet))
    );

    raiz.addEventListener("keydown", (ev) => {
      if (ev.target && /^(INPUT|SELECT|TEXTAREA)$/.test(ev.target.tagName)) return;
      if (ev.key === "ArrowRight") { ev.preventDefault(); pausar(); ir(pos + 1); }
      else if (ev.key === "ArrowLeft") { ev.preventDefault(); pausar(); ir(pos - 1); }
      else if (ev.key === " ") { ev.preventDefault(); alternar(); }
      else if (ev.key === "Home") { ev.preventDefault(); ir(0); }
      else if (ev.key === "End") { ev.preventDefault(); ir(visibles.length - 1); }
    });

    /* --- logica --- */
    function recalcularVisibles(mantener) {
      const idxActual = visibles.length ? visibles[pos] : 0;
      visibles = [];
      todos.forEach((p, i) => {
        if (detalle === "fino" || p.lv === 0) visibles.push(i);
      });
      if (!visibles.length && todos.length) visibles = [todos.length - 1];
      if (mantener) {
        // quedarse en el paso visible mas cercano (hacia atras)
        let j = 0;
        for (let k = 0; k < visibles.length; k++) if (visibles[k] <= idxActual) j = k;
        pos = j;
      } else pos = 0;
      slider.max = Math.max(0, visibles.length - 1);
    }
    function recalcularConsola(desde) {
      for (let i = desde; i < todos.length; i++) {
        const prev = i ? cons[i - 1] : [];
        const p = todos[i];
        let seg = prev;
        if (p.sal || p.ent) {
          seg = prev.slice();
          if (p.sal) seg.push({ t: "o", s: p.sal });
          if (p.ent) seg.push({ t: "i", s: p.ent });
        }
        cons[i] = seg;
      }
    }

    function cambiarDetalle(v) {
      detalle = v;
      recalcularVisibles(true);
      pintar();
    }

    function ir(i) {
      if (!visibles.length) return;
      pos = E.clamp(i, 0, visibles.length - 1);
      pintar();
    }
    function pausar() {
      jugando = false;
      clearTimeout(timer);
      bPlay.textContent = "▶";
      bPlay.setAttribute("aria-label", "Reproducir (espacio)");
    }
    function alternar() {
      if (jugando) return pausar();
      if (pos >= visibles.length - 1) pos = 0;
      jugando = true;
      bPlay.textContent = "⏸";
      bPlay.setAttribute("aria-label", "Pausar (espacio)");
      pintar();
      programar();
    }
    function programar() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!jugando) return;
        if (!raiz.isConnected) return pausar();
        if (pos >= visibles.length - 1) return pausar();
        pos++;
        pintar();
        if (pos >= visibles.length - 1) return pausar();
        programar();
      }, 1100 / vel);
    }

    function pintarVars(paso, previo) {
      const lista = pVars.querySelector(".vars-lista");
      E.vaciar(lista);
      const v = paso.v;
      if (!v || !Object.keys(v).length) {
        lista.append(h("p", { class: "suave" }, "—"));
        return;
      }
      const pv = (previo && previo.v) || {};
      Object.keys(v).forEach((k) => {
        const cambio = !(k in pv) || String(pv[k]) !== String(v[k]);
        lista.append(
          h(
            "div",
            { class: "var" + (cambio && previo ? " cambio" : "") },
            h("span", { class: "var-n" }, k),
            h("span", { class: "var-v" }, String(v[k]))
          )
        );
      });
    }
    function pintarPila(paso) {
      const lista = pPila.querySelector(".pila-lista");
      E.vaciar(lista);
      const p = paso.pila;
      if (!p || !p.length) {
        lista.append(h("p", { class: "suave" }, "—"));
        return;
      }
      p.forEach((txt, i) => lista.append(h("div", { class: "marco" + (i === 0 ? " arriba" : "") }, txt)));
    }
    function pintarConsola(idx) {
      const pre = pCons.querySelector(".cons");
      E.vaciar(pre);
      const segs = cons[idx] || [];
      if (!segs.length) pre.append(h("span", { class: "suave" }, "(sin salida todavía)"));
      segs.forEach((s) => pre.append(h("span", { class: s.t === "i" ? "c-in" : "c-out" }, s.s)));
      pre.scrollTop = pre.scrollHeight;
    }
    function pintarTabla(idx) {
      if (!cfg.tabla) return;
      E.vaciar(tablaCaja);
      const cols = cfg.tabla.cols;
      const filas = [];
      for (let i = 0; i <= idx && i < todos.length; i++) if (todos[i].fila) filas.push(todos[i].fila);
      const MAXF = 300;
      const mostrar = filas.slice(-MAXF);
      const t = h("table", { class: "tabla-escritorio" });
      t.append(
        h("thead", {}, h("tr", {}, h("th", { class: "th-n" }, "#"), cols.map((c) => h("th", { class: c.clase || "" }, c.label))))
      );
      const tb = h("tbody");
      mostrar.forEach((f, i) => {
        const prev = i ? mostrar[i - 1] : null;
        const ult = i === mostrar.length - 1;
        tb.append(
          h(
            "tr",
            { class: ult ? "ult" : "" },
            h("td", { class: "td-n" }, filas.length - mostrar.length + i + 1),
            cols.map((c) => {
              const val = f[c.k] === undefined ? "" : f[c.k];
              const cambio = prev ? String(prev[c.k]) !== String(val) : val !== "";
              return h("td", { class: (c.clase || "") + (cambio ? " cambio" : "") }, String(val));
            })
          )
        );
      });
      t.append(tb);
      const cab = h(
        "div",
        { class: "tabla-cab" },
        h("h4", {}, cfg.tabla.titulo || "Prueba de escritorio"),
        h("span", { class: "suave" }, filas.length ? filas.length + " fila" + (filas.length === 1 ? "" : "s") + (filas.length > MAXF ? " (se muestran las últimas " + MAXF + ")" : "") : "Se irá llenando conforme avances")
      );
      const wrap = h("div", { class: "tabla-scroll" }, t);
      tablaCaja.append(cab, wrap);
      wrap.scrollTop = wrap.scrollHeight;
    }

    let ultimoPintado = -1;
    function pintar() {
      if (!visibles.length) {
        cuenta.textContent = "0 / 0";
        return;
      }
      const idx = visibles[pos];
      const paso = todos[idx];
      const previoIdx = pos > 0 ? visibles[pos - 1] : -1;
      const previo = previoIdx >= 0 ? todos[previoIdx] : null;
      panel.marcar(paso.f, paso.l, previo ? { rol: previo.f, l: previo.l } : null);
      vista.pintar(paso.viz, paso, idx);
      nota.className = "jug-nota " + (paso.etiqueta || "");
      nota.innerHTML = paso.nota || "";
      if (cfg.panelVars !== false) pintarVars(paso, previo);
      if (cfg.pilaLlamadas) pintarPila(paso);
      if (cfg.consola !== false) pintarConsola(idx);
      pintarTabla(idx);
      slider.value = pos;
      cuenta.textContent = pos + 1 + " / " + visibles.length;
      bInicio.disabled = bAtras.disabled = pos === 0;
      bAdel.disabled = bFin.disabled = pos >= visibles.length - 1;
      ultimoPintado = idx;
    }

    /* --- API publica --- */
    const api = {
      raiz,
      panel,
      cargar(pasos, titulo) {
        pausar();
        todos = pasos;
        cons = [];
        recalcularConsola(0);
        recalcularVisibles(false);
        E.vaciar(barraTitulo);
        if (titulo) barraTitulo.append(h("span", {}, titulo));
        barraTitulo.hidden = !titulo;
        pintar();
      },
      /* agrega pasos al final y salta al primero nuevo (modo laboratorio) */
      agregar(pasos, irAlPrimero) {
        pausar();
        const desde = todos.length;
        todos = todos.concat(pasos);
        recalcularConsola(desde);
        const idxPrimero = desde;
        recalcularVisibles(true);
        if (irAlPrimero !== false) {
          let j = visibles.findIndex((v) => v >= idxPrimero);
          pos = j < 0 ? visibles.length - 1 : j;
        }
        pintar();
      },
      reiniciar() {
        pausar();
        todos = [];
        visibles = [];
        cons = [];
        pos = 0;
      },
      jugar() {
        if (!jugando) alternar();
      },
      fijarDetalle(v) {
        selDet.value = v;
        cambiarDetalle(v);
      },
      pausar,
      ir,
      total: () => visibles.length,
      pasos: () => todos,
    };
    return api;
  };
})();
