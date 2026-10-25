/* ============================================================
   app.js - navegacion (hash), menu lateral, pestañas y progreso
   Rutas:  #/inicio   #/<tema>   #/<tema>/<pestaña>
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const GRUPOS = [
    { id: "ordenamiento", titulo: "Algoritmos de ordenamiento" },
    { id: "pila", titulo: "Estructura: Pila" },
    { id: "cola", titulo: "Estructura: Cola" },
    { id: "busqueda", titulo: "Algoritmos de búsqueda" },
  ];
  const raiz = document.getElementById("app-raiz");
  let lateral, principal, tituloMovil;
  let temaActual = null;

  /* ---------- progreso ---------- */
  const visto = () => E.almacen.leer("visto", {});
  function marcarPestana(id, tab) {
    const v = visto();
    v[id] = v[id] || {};
    if (!v[id][tab]) {
      v[id][tab] = 1;
      E.almacen.guardar("visto", v);
    }
  }
  const avance = (m) => {
    if (m.pronto) return 0;
    const v = visto()[m.id] || {};
    const claves = Object.keys(m.pestanas);
    return claves.filter((k) => v[k]).length / claves.length;
  };
  const completo = (m) => !m.pronto && avance(m) >= 0.6;
  E.ui.alTerminarQuiz = (id) => { marcarPestana(id, "quiz"); pintarLateral(); };

  /* ---------- tema claro / oscuro ---------- */
  function aplicarTema(t) {
    if (t) document.documentElement.setAttribute("data-tema", t);
    else document.documentElement.removeAttribute("data-tema");
  }
  function temaEfectivo() {
    const t = document.documentElement.getAttribute("data-tema");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
  }
  function alternarTema() {
    const nuevo = temaEfectivo() === "oscuro" ? "claro" : "oscuro";
    aplicarTema(nuevo);
    E.almacen.guardar("tema", nuevo);
    pintarLateral();
  }

  /* ---------- armado de la pagina ---------- */
  function ordenados() {
    return E.modulos.slice().sort((a, b) => (a.orden || 0) - (b.orden || 0));
  }
  function pintarLateral() {
    E.vaciar(lateral);
    const actual = temaActual ? temaActual.id : "inicio";
    lateral.append(
      h(
        "a",
        { class: "marca", href: "#/inicio" },
        h("div", { class: "marca-logo", "aria-hidden": "true" }, "C"),
        h("div", {}, h("b", {}, "Estudio de C"), h("span", {}, "algoritmos y estructuras de datos"))
      )
    );
    const navInicio = h("ul", { class: "nav-lista" }, h("li", {}, h("a", { class: "nav-item", href: "#/inicio", "aria-current": actual === "inicio" ? "page" : null }, h("span", { class: "pt", "aria-hidden": "true" }), "Mapa de estudio")));
    lateral.append(h("nav", { class: "grupo-nav", "aria-label": "Inicio" }, navInicio));
    GRUPOS.forEach((g) => {
      const items = ordenados().filter((m) => m.grupo === g.id);
      if (!items.length) return;
      lateral.append(
        h(
          "nav",
          { class: "grupo-nav", "aria-label": g.titulo },
          h("h3", {}, g.titulo),
          h(
            "ul",
            { class: "nav-lista" },
            items.map((m) =>
              h(
                "li",
                {},
                h(
                  "a",
                  {
                    class: "nav-item" + (completo(m) ? " visto" : "") + (m.pronto ? " pronto" : ""),
                    href: "#/" + m.id,
                    "aria-current": actual === m.id ? "page" : null,
                  },
                  h("span", { class: "pt", "aria-hidden": "true" }, "✓"),
                  m.titulo,
                  m.pronto ? h("span", { class: "etq" }, "pronto") : null
                )
              )
            )
          )
        )
      );
    });
    lateral.append(
      h(
        "div",
        { class: "lateral-pie" },
        h("span", {}, "Todo el código es C. Las animaciones siguen tus archivos línea por línea."),
        h("span", {}, "Tip: en cada animación usa ←  →  y la barra espaciadora.")
      )
    );
  }

  /* ---------- inicio ---------- */
  function pintarInicio() {
    temaActual = null;
    document.title = "Estudio de C · algoritmos y estructuras de datos";
    tituloMovil.textContent = "Mapa de estudio";
    const c = h("div", { class: "contenedor" });
    c.append(
      h(
        "section",
        { class: "hero" },
        h("h1", { html: "Aprende C viendo <em>cómo se ejecuta</em>, línea por línea." }),
        h("p", {}, "Tu propio código de ordenamiento, pilas y colas, convertido en pruebas de escritorio animadas: la memoria, los apuntadores y los dobles apuntadores a la vista."),
        h("p", { class: "suave" }, "Elige un tema del mapa. Cada uno trae explicación, código comentado línea por línea, prueba de escritorio animada, laboratorio y un mini quiz.")
      )
    );
    c.append(
      h(
        "div",
        { class: "como-usar" },
        h("div", { class: "tarjeta" }, h("h3", {}, "1 · Lee"), h("p", {}, "Cada tema empieza con una explicación detallada, con mini animaciones.")),
        h("div", { class: "tarjeta" }, h("h3", {}, "2 · Sigue el código"), h("p", {}, "La línea que se ejecuta se resalta mientras ves variables, memoria y consola.")),
        h("div", { class: "tarjeta" }, h("h3", {}, "3 · Experimenta"), h("p", {}, "Escribe tus propios datos o llama a tus funciones a mano en el laboratorio.")),
        h("div", { class: "tarjeta" }, h("h3", {}, "4 · Verifica"), h("p", {}, "Un quiz corto por tema, con explicación de cada respuesta."))
      )
    );
    const mapa = h("div", { class: "mapa" });
    GRUPOS.forEach((g) => {
      const items = ordenados().filter((m) => m.grupo === g.id);
      if (!items.length) return;
      mapa.append(
        h(
          "section",
          { class: "mapa-grupo" },
          h("h2", {}, g.titulo),
          items.map((m) =>
            h(
              "a",
              { class: "mapa-tarjeta" + (m.pronto ? " pronto" : ""), href: "#/" + m.id },
              h("b", {}, m.titulo + (m.pronto ? "  · próximamente" : "")),
              h("span", {}, m.resumen),
              m.pronto ? null : h("div", { class: "prog", role: "progressbar", "aria-valuenow": Math.round(avance(m) * 100), "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": "Avance en " + m.titulo }, h("i", { style: { width: Math.round(avance(m) * 100) + "%" } }))
            )
          )
        )
      );
    });
    c.append(mapa);
    c.append(
      h(
        "p",
        { class: "pie-pagina" },
        "Los ejemplos de colas y la lección de dobles apuntadores viven en ",
        h("code", {}, "Estudio/c_extra/"),
        ". Todo lo demás se lee directamente de tus archivos del repositorio (el script ",
        h("code", {}, "scripts/sincronizar_codigo.py"),
        " los copia aquí)."
      )
    );
    principal.append(c);
  }

  /* ---------- tema ---------- */
  function pintarTema(m, tabPedida) {
    temaActual = m;
    document.title = m.titulo + " · Estudio de C";
    tituloMovil.textContent = m.titulo;
    const claves = Object.keys(m.pestanas);
    const tabIni = claves.includes(tabPedida) ? tabPedida : claves[0];
    const c = h("div", { class: "contenedor" });
    const cab = h(
      "header",
      { class: "tema-cab" },
      h("div", { class: "migas" }, h("a", { href: "#/inicio" }, "Mapa"), " / " + (GRUPOS.find((g) => g.id === m.grupo) || {}).titulo),
      h("h1", {}, m.titulo, m.sub ? h("span", { class: "sub" }, m.sub) : null),
      h("p", {}, m.resumen),
      m.chips && m.chips.length ? h("div", { class: "chips" }, m.chips.map((x) => h("span", { class: "chip" }, x.k + ": ", h("b", {}, x.v)))) : null
    );
    c.append(cab);
    if (m.pronto) {
      c.append(h("div", { class: "prosa pronto-caja", html: m.pronto }));
      principal.append(c);
      return;
    }
    const barra = h("div", { class: "pestanas", role: "tablist", "aria-label": "Secciones de " + m.titulo });
    const paneles = {};
    const botones = {};
    const hechos = visto()[m.id] || {};
    claves.forEach((k) => {
      const p = h("section", { class: "panel-tab", role: "tabpanel", id: "panel-" + k, hidden: true, "aria-labelledby": "tab-" + k });
      paneles[k] = p;
      const b = h(
        "button",
        {
          class: "pestana",
          role: "tab",
          type: "button",
          id: "tab-" + k,
          "aria-controls": "panel-" + k,
          tabindex: "-1",
          onclick: () => ir(k, true),
          onkeydown: (ev) => {
            const i = claves.indexOf(k);
            let j = null;
            if (ev.key === "ArrowRight") j = (i + 1) % claves.length;
            else if (ev.key === "ArrowLeft") j = (i - 1 + claves.length) % claves.length;
            else if (ev.key === "Home") j = 0;
            else if (ev.key === "End") j = claves.length - 1;
            if (j !== null) {
              ev.preventDefault();
              ir(claves[j], true);
              botones[claves[j]].focus();
            }
          },
        },
        m.pestanas[k].titulo,
        hechos[k] ? h("span", { class: "ok", "aria-hidden": "true" }, "✓") : null
      );
      botones[k] = b;
      barra.append(b);
    });
    c.append(barra);
    claves.forEach((k) => c.append(paneles[k]));
    principal.append(c);
    const armados = {};
    function ir(k, actualizarHash) {
      claves.forEach((x) => {
        const on = x === k;
        paneles[x].hidden = !on;
        botones[x].setAttribute("aria-selected", on ? "true" : "false");
        botones[x].tabIndex = on ? 0 : -1;
      });
      if (!armados[k]) {
        armados[k] = true;
        try {
          m.pestanas[k].render(paneles[k], { modulo: m, ir: (t) => ir(t, true) });
        } catch (e) {
          console.error(e);
          paneles[k].append(h("div", { class: "nota ojo" }, h("span", { class: "nota-tit" }, "Algo falló"), "No pude armar esta sección: " + e.message));
        }
      }
      marcarPestana(m.id, k);
      if (!botones[k].querySelector(".ok") && k !== "explicacion") botones[k].append(h("span", { class: "ok", "aria-hidden": "true" }, "✓"));
      if (actualizarHash) {
        const nuevo = "#/" + m.id + "/" + k;
        if (location.hash !== nuevo) history.replaceState(null, "", nuevo);
        window.scrollTo({ top: 0 });
      }
      pintarLateralSinPerderFoco();
    }
    ir(tabIni, false);
    if (tabPedida && claves.includes(tabPedida)) {
      /* la ruta ya trae la pestaña */
    }
  }
  function pintarLateralSinPerderFoco() {
    const foco = document.activeElement;
    const esTab = foco && foco.classList && foco.classList.contains("pestana");
    pintarLateral();
    if (esTab) foco.focus();
  }

  /* ---------- router ---------- */
  function ruta() {
    const partes = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    E.vaciar(principal);
    window.scrollTo({ top: 0 });
    lateral.classList.remove("abierto");
    const id = partes[0] || "inicio";
    if (id === "inicio") pintarInicio();
    else {
      const m = E.moduloPorId(id);
      if (m) pintarTema(m, partes[1]);
      else pintarInicio();
    }
    pintarLateral();
    principal.focus({ preventScroll: true });
  }

  /* ---------- arranque ---------- */
  function iniciar() {
    const guardado = E.almacen.leer("tema", null);
    if (guardado) aplicarTema(guardado);
    lateral = h("aside", { class: "lateral", id: "lateral", "aria-label": "Temas" });
    tituloMovil = h("b", {}, "Estudio de C");
    const menu = h("button", { type: "button", class: "btn btn-chico", "aria-controls": "lateral", "aria-label": "Abrir o cerrar el menú", onclick: () => lateral.classList.toggle("abierto") }, "☰ Temas");
    const barraMovil = h("div", { class: "barra-movil" }, menu, tituloMovil);
    principal = h("main", { class: "principal", id: "contenido", tabindex: "-1" });
    raiz.append(lateral, h("div", {}, barraMovil, principal));
    window.addEventListener("hashchange", ruta);
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") lateral.classList.remove("abierto");
    });
    ruta();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
