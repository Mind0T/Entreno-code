/* ============================================================
   app.js — Learning Zone
   Landing (hero + menú de categorías) y páginas de tema.
   Rutas:  #/inicio   #/<tema>   #/<tema>/<pestaña>
   Sin menú lateral: navegación por el menú de categorías y una
   barra superior de temas en cada lección.
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;

  let lang = "es";
  try { lang = localStorage.getItem("irvin.lang") === "en" ? "en" : "es"; } catch (e) {}
  const T = (o) => (o && (o[lang] != null ? o[lang] : o.es)) || "";

  const GRUPOS = [
    { id: "ordenamiento", titulo: { es: "Algoritmos de ordenamiento", en: "Sorting algorithms" } },
    { id: "pila", titulo: { es: "Estructura: Pila", en: "Structure: Stack" } },
    { id: "cola", titulo: { es: "Estructura: Cola", en: "Structure: Queue" } },
    { id: "busqueda", titulo: { es: "Algoritmos de búsqueda", en: "Search algorithms" } },
  ];

  /* categorías del menú (solo "C" tiene contenido; el resto, pronto) */
  const CATS = [
    { titulo: { es: "Programación", en: "Programming" }, langs: [
      { id: "c", label: "C", real: true },
      { id: "py", label: "Python", soon: [{ es: "Fundamentos de Python", en: "Python fundamentals" }, { es: "Python para ciencia de datos", en: "Python for data science" }] },
    ]},
    { titulo: { es: "Diseño", en: "Design" }, langs: [
      { id: "ux", label: "UX-UI", soon: [{ es: "Design thinking", en: "Design thinking" }] },
    ]},
    { titulo: { es: "Cómputo en la nube", en: "Cloud computing" }, langs: [
      { id: "gcp", label: "Google", soon: [{ es: "Cloud Engineer", en: "Cloud Engineer" }] },
      { id: "aws", label: "AWS", soon: [{ es: "Cloud Practitioner", en: "Cloud Practitioner" }, { es: "AI Practitioner", en: "AI Practitioner" }] },
    ]},
  ];

  const DICT = {
    es: {
      eyebrow: "Plataforma abierta", lz_sub: "Espacio hecho de un aprendiz para otros aprendices.",
      soon: "pronto", pick: "Elige un lenguaje para ver sus temas.",
      soon_long: "Contenido en camino. Por ahora, explora los temas de C.",
      back: "Learning Zone", temas: "Temas", abrir: "Abrir",
    },
    en: {
      eyebrow: "Open platform", lz_sub: "A space made by a learner, for other learners.",
      soon: "soon", pick: "Pick a language to see its topics.",
      soon_long: "Content on the way. For now, explore the C topics.",
      back: "Learning Zone", temas: "Topics", abrir: "Open",
    },
  };
  const D = (k) => (DICT[lang] && DICT[lang][k]) || DICT.es[k] || k;

  const raiz = document.getElementById("app-raiz");
  let principal;

  /* ---------- progreso ---------- */
  const visto = () => E.almacen.leer("visto", {});
  function marcarPestana(id, tab) {
    const v = visto(); v[id] = v[id] || {};
    if (!v[id][tab]) { v[id][tab] = 1; E.almacen.guardar("visto", v); }
  }
  const avance = (m) => {
    if (m.pronto) return 0;
    const v = visto()[m.id] || {};
    const claves = Object.keys(m.pestanas);
    return claves.filter((k) => v[k]).length / claves.length;
  };
  const completo = (m) => !m.pronto && avance(m) >= 0.6;
  E.ui.alTerminarQuiz = (id) => { marcarPestana(id, "quiz"); };

  function ordenados() {
    return E.modulos.slice().sort((a, b) => (a.orden || 0) - (b.orden || 0));
  }

  /* ============================================================
     CARRUSEL (alusivo a código · tonos azul/morado)
     ============================================================ */
  const VIZ = {
    code:
      '<svg viewBox="0 0 220 180" fill="none">' +
      '<rect x="20" y="24" width="180" height="132" rx="12" stroke="var(--azul)" stroke-width="2" opacity=".45"/>' +
      '<circle cx="34" cy="38" r="3" fill="var(--morado)"/><circle cx="46" cy="38" r="3" fill="var(--azul)"/><circle cx="58" cy="38" r="3" fill="var(--verde)"/>' +
      '<rect data-anim="hl" x="24" y="74" width="172" height="18" rx="4" fill="var(--azul)" opacity=".16"/>' +
      '<g>' +
      '<rect data-anim="bar" x="36" y="58" width="58" height="7" rx="3" fill="var(--morado)" opacity=".85" style="animation-delay:.05s"/>' +
      '<rect data-anim="bar" x="36" y="79" width="104" height="7" rx="3" fill="var(--silver)" opacity=".9" style="animation-delay:.15s"/>' +
      '<rect data-anim="bar" x="52" y="100" width="80" height="7" rx="3" fill="var(--azul)" opacity=".75" style="animation-delay:.25s"/>' +
      '<rect data-anim="bar" x="52" y="121" width="56" height="7" rx="3" fill="var(--morado)" opacity=".55" style="animation-delay:.35s"/>' +
      '</g></svg>',
    sort:
      '<svg viewBox="0 0 220 180" fill="none">' +
      '<g stroke="var(--azul)" stroke-width="2" opacity=".22"><line x1="20" y1="150" x2="206" y2="150"/></g>' +
      '<g>' +
      '<rect data-anim="rise" x="30"  y="96"  width="24" height="54" rx="4" fill="var(--azul)"   style="animation-delay:.05s"/>' +
      '<rect data-anim="rise" x="66"  y="66"  width="24" height="84" rx="4" fill="var(--morado)" style="animation-delay:.15s"/>' +
      '<rect data-anim="rise" x="102" y="112" width="24" height="38" rx="4" fill="var(--azul)"   style="animation-delay:.25s"/>' +
      '<rect data-anim="rise" x="138" y="48"  width="24" height="102" rx="4" fill="var(--morado)" style="animation-delay:.35s"/>' +
      '<rect data-anim="rise" x="174" y="82"  width="24" height="68" rx="4" fill="var(--silver)" style="animation-delay:.45s"/>' +
      '</g>' +
      '<g data-anim="swap" fill="none" stroke="var(--silver)" stroke-width="2.4" stroke-linecap="round"><path d="M78 40c14 0 14 0 0 0"/><path d="M78 36l12 0M150 36l-12 0"/></g></svg>',
    stack:
      '<svg viewBox="0 0 220 180" fill="none">' +
      '<g data-anim="float"><rect x="70" y="30" width="80" height="26" rx="6" fill="var(--morado)" opacity=".9"/></g>' +
      '<rect x="70" y="62" width="80" height="26" rx="6" fill="var(--azul)" opacity=".8"/>' +
      '<rect x="70" y="94" width="80" height="26" rx="6" fill="var(--azul)" opacity=".55"/>' +
      '<rect x="70" y="126" width="80" height="26" rx="6" fill="var(--silver)" opacity=".7"/>' +
      '<g stroke="var(--morado)" stroke-width="2" opacity=".5"><line data-anim="draw" x1="160" y1="43" x2="192" y2="43"/><path data-anim="node" d="M186 37l8 6-8 6" fill="none"/></g>' +
      '<text x="30" y="47" fill="var(--morado)" font-family="monospace" font-size="12" opacity=".8">push</text></svg>',
    nn:
      '<svg viewBox="0 0 220 180" fill="none">' +
      '<g stroke="var(--morado)" stroke-width="1.5" opacity=".3">' +
      '<line x1="44" y1="54" x2="110" y2="44"/><line x1="44" y1="54" x2="110" y2="90"/><line x1="44" y1="54" x2="110" y2="136"/>' +
      '<line x1="44" y1="126" x2="110" y2="44"/><line x1="44" y1="126" x2="110" y2="90"/><line x1="44" y1="126" x2="110" y2="136"/>' +
      '<line x1="110" y1="44" x2="178" y2="90"/><line x1="110" y1="90" x2="178" y2="90"/><line x1="110" y1="136" x2="178" y2="90"/></g>' +
      '<g fill="var(--azul)">' +
      '<circle data-anim="node" cx="44" cy="54" r="8"/><circle data-anim="node" cx="44" cy="126" r="8" style="animation-delay:.3s"/>' +
      '<circle data-anim="node" cx="110" cy="44" r="7" fill="var(--morado)" style="animation-delay:.5s"/><circle data-anim="node" cx="110" cy="90" r="7" fill="var(--morado)" style="animation-delay:.7s"/>' +
      '<circle data-anim="node" cx="110" cy="136" r="7" fill="var(--morado)" style="animation-delay:.9s"/>' +
      '<circle data-anim="node" cx="178" cy="90" r="10" fill="var(--silver)" style="animation-delay:1.1s"/></g></svg>',
  };
  const CAR = [
    { k: "code", c: "var(--azul)",
      es: { f: "Plataforma abierta", h: "Learning Zone", p: "Espacio hecho de un aprendiz para otros aprendices." },
      en: { f: "Open platform", h: "Learning Zone", p: "A space made by a learner, for other learners." } },
    { k: "sort", c: "var(--morado)",
      es: { f: "Pruebas de escritorio", h: "Mira correr el código", p: "Cada algoritmo, línea por línea: memoria, variables y lógica a la vista." },
      en: { f: "Desktop traces", h: "Watch the code run", p: "Every algorithm, line by line: memory, variables and logic in sight." } },
    { k: "stack", c: "var(--azul)",
      es: { f: "Estructuras de datos", h: "Pila, cola y memoria", p: "Visualiza push y pop, enlaces y apuntadores en acción." },
      en: { f: "Data structures", h: "Stack, queue and memory", p: "See push and pop, links and pointers in action." } },
    { k: "nn", c: "var(--morado)",
      es: { f: "Machine Learning · pronto", h: "Lo que viene", p: "Redes neuronales, nube y ciencia de datos — en camino." },
      en: { f: "Machine Learning · soon", h: "What's next", p: "Neural networks, cloud and data science — on the way." } },
  ];
  let cIdx = 0, cTimer = null, cPaused = false;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  function heroCarousel() {
    const slides = h("div", { class: "slides", id: "slides" });
    CAR.forEach((s, i) => {
      const t = s[lang] || s.es;
      slides.append(
        h("article", { class: "slide" + (i === 0 ? " on" : ""), style: { "--c": s.c }, "aria-hidden": i !== 0 },
          h("div", { class: "s-txt" },
            h("span", { class: "s-facet" }, h("i", { "aria-hidden": "true" }), t.f),
            h("h2", {}, t.h),
            h("p", {}, t.p)),
          h("div", { class: "s-viz", "aria-hidden": "true", html: VIZ[s.k] })));
    });
    const dots = h("div", { class: "dots", id: "dots", role: "tablist", "aria-label": "Elegir" });
    CAR.forEach((s, i) => dots.append(h("button", { role: "tab", type: "button", "data-i": i, "aria-pressed": i === 0, "aria-label": (s[lang] || s.es).f })));
    const toggle = h("button", { class: "ctrl", id: "toggle", type: "button", "aria-label": "Pausar", html: '<svg viewBox="0 0 24 24"><path d="M8 5h3v14H8zM13 5h3v14h-3z"/></svg>' });
    const stage = h("section", { class: "stage", id: "stage", "aria-roledescription": "carrusel", "aria-label": "Learning Zone" },
      h("span", { class: "glow", id: "glow", "aria-hidden": "true" }), toggle, slides, dots);
    stage.style.setProperty("--c", CAR[0].c);
    return stage;
  }
  function cShow(i) {
    const sl = document.querySelectorAll("#slides .slide"), dt = document.querySelectorAll("#dots button");
    if (!sl.length) return;
    cIdx = (i + sl.length) % sl.length;
    sl.forEach((el, n) => { el.classList.toggle("on", n === cIdx); el.setAttribute("aria-hidden", n !== cIdx); });
    dt.forEach((el, n) => el.setAttribute("aria-pressed", n === cIdx));
    const g = document.getElementById("stage"); if (g) g.style.setProperty("--c", CAR[cIdx].c);
  }
  function cStart() { cStop(); if (reduce || cPaused) return; cTimer = setInterval(() => cShow(cIdx + 1), 3000); }
  function cStop() { if (cTimer) { clearInterval(cTimer); cTimer = null; } }
  function initCarousel() {
    cIdx = 0; cPaused = false;
    const stage = document.getElementById("stage"); if (!stage) return;
    document.getElementById("dots").addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) { cShow(+b.dataset.i); cStart(); } });
    stage.addEventListener("mouseenter", cStop);
    stage.addEventListener("mouseleave", () => { if (!cPaused) cStart(); });
    const tg = document.getElementById("toggle");
    tg.addEventListener("click", function () {
      cPaused = !cPaused;
      this.setAttribute("aria-label", cPaused ? "Reproducir" : "Pausar");
      this.innerHTML = cPaused ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M8 5h3v14H8zM13 5h3v14h-3z"/></svg>';
      if (cPaused) cStop(); else cStart();
    });
    // deslizar con dedo o mouse para adelantar/retroceder
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { if (e.target.closest(".ctrl,.dots")) return; sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => {
      if (sx === null) return; const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) { cShow(cIdx + (dx < 0 ? 1 : -1)); cStart(); }
    });
    stage.addEventListener("pointercancel", () => { sx = null; });
    if (!reduce) cStart();
  }

  /* ============================================================
     MENÚ DE CATEGORÍAS (reemplaza al sidebar)
     ============================================================ */
  function gruposDe() {
    return GRUPOS.map((g) => ({ g, items: ordenados().filter((m) => m.grupo === g.id) })).filter((x) => x.items.length);
  }
  function popTemasC(pop) {
    gruposDe().forEach(({ g, items }) => {
      const grp = h("div", { class: "pg" }, h("h4", {}, T(g.titulo)));
      const ul = h("div", { class: "pg-list" });
      items.forEach((m) => {
        ul.append(h("a", {
          class: "ptopic" + (m.pronto ? " pronto" : "") + (completo(m) ? " done" : ""),
          href: m.pronto ? null : "#/" + m.id, "aria-disabled": m.pronto ? "true" : null,
        }, h("span", { class: "pdot", "aria-hidden": "true" }, completo(m) ? "✓" : ""), m.titulo,
           m.pronto ? h("span", { class: "etq" }, D("soon")) : null));
      });
      grp.append(ul); pop.append(grp);
    });
  }
  function popSoon(pop, topics) {
    const ul = h("div", { class: "pg-list" });
    (topics || []).forEach((t) => ul.append(h("span", { class: "ptopic pronto" }, h("span", { class: "pdot" }), T(t), h("span", { class: "etq" }, D("soon")))));
    pop.append(h("div", { class: "pg" }, ul));
  }
  function categoryZone() {
    const menu = h("div", { class: "catmenu" });
    const hint = h("p", { class: "lzhint" }, D("pick"));
    const panel = h("div", { class: "lzpanel", id: "lzpanel", hidden: true });
    let activeId = null;
    const botones = [];
    CATS.forEach((cat) => {
      const col = h("div", { class: "catcol" }, h("h3", { class: "cattitle" }, T(cat.titulo)));
      const list = h("div", { class: "catlist" });
      cat.langs.forEach((l) => {
        const btn = h("button", { class: "catlang" + (l.real ? "" : " soon"), type: "button", "aria-expanded": "false", "aria-controls": "lzpanel" },
          h("span", { class: "pix" }, l.label), l.real ? null : h("span", { class: "pronto-tag" }, D("soon")));
        botones.push(btn);
        btn.addEventListener("click", () => {
          if (activeId === l.id) {
            activeId = null; panel.hidden = true; hint.hidden = false;
            botones.forEach((b) => b.setAttribute("aria-expanded", "false"));
            return;
          }
          activeId = l.id;
          botones.forEach((b) => b.setAttribute("aria-expanded", String(b === btn)));
          E.vaciar(panel);
          if (l.real) popTemasC(panel); else popSoon(panel, l.soon);
          panel.hidden = false; hint.hidden = true;
          try { panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
        });
        list.append(btn);
      });
      col.append(list); menu.append(col);
    });
    return h("section", { class: "catzone" }, menu, hint, panel);
  }

  /* ---------- landing ---------- */
  function pintarInicio() {
    document.title = "Learning Zone · Irving Soriano";
    const c = h("div", { class: "lz" }, heroCarousel(), categoryZone());
    principal.append(c);
    initCarousel();
  }

  /* ============================================================
     BARRA DE TEMAS (en cada lección, en vez del sidebar)
     ============================================================ */
  function topicBar(actual) {
    const btn = h("button", { class: "tb-switch-btn", type: "button", id: "tbBtn", "aria-expanded": "false" },
      D("temas"), h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", html: '<path d="M6 9l6 6 6-6"/>' }));
    const menu = h("div", { class: "tb-menu", id: "tbMenu", hidden: true });
    gruposDe().forEach(({ g, items }) => {
      const grp = h("div", { class: "tb-g" }, h("h4", {}, T(g.titulo)));
      const ul = h("div", { class: "tb-g-list" });
      items.forEach((m) => {
        ul.append(h("a", {
          class: "tb-topic" + (m.id === actual.id ? " on" : "") + (m.pronto ? " pronto" : ""),
          href: m.pronto ? null : "#/" + m.id, "aria-disabled": m.pronto ? "true" : null,
        }, m.titulo, m.pronto ? h("span", { class: "etq" }, D("soon")) : null));
      });
      grp.append(ul); menu.append(grp);
    });
    btn.addEventListener("click", () => {
      const open = menu.hasAttribute("hidden");
      if (open) { menu.removeAttribute("hidden"); btn.setAttribute("aria-expanded", "true"); }
      else { menu.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); }
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) { menu.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); } });
    document.addEventListener("click", (e) => { if (!e.target.closest(".tb-switch")) { menu.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); } });
    return h("div", { class: "topicbar" },
      h("a", { class: "tb-back", href: "#/inicio" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", html: '<path d="M19 12H5M11 6l-6 6 6 6"/>' }), D("back")),
      h("div", { class: "tb-switch" }, btn, menu));
  }

  /* ---------- tema (lección) — contenido conservado ---------- */
  function pintarTema(m, tabPedida) {
    document.title = m.titulo + " · Learning Zone";
    const claves = Object.keys(m.pestanas);
    const tabIni = claves.includes(tabPedida) ? tabPedida : claves[0];
    const c = h("div", { class: "contenedor" });
    c.append(topicBar(m));
    const cab = h("header", { class: "tema-cab" },
      h("div", { class: "migas" }, (GRUPOS.find((g) => g.id === m.grupo) || {}).titulo ? T((GRUPOS.find((g) => g.id === m.grupo) || {}).titulo) : ""),
      h("h1", {}, m.titulo, m.sub ? h("span", { class: "sub" }, m.sub) : null),
      h("p", {}, m.resumen),
      m.chips && m.chips.length ? h("div", { class: "chips" }, m.chips.map((x) => h("span", { class: "chip" }, x.k + ": ", h("b", {}, x.v)))) : null);
    c.append(cab);
    if (m.pronto) { c.append(h("div", { class: "prosa pronto-caja", html: m.pronto })); principal.append(c); return; }

    const barra = h("div", { class: "pestanas", role: "tablist", "aria-label": "Secciones de " + m.titulo });
    const paneles = {}, botones = {}, hechos = visto()[m.id] || {};
    claves.forEach((k) => {
      const p = h("section", { class: "panel-tab", role: "tabpanel", id: "panel-" + k, hidden: true, "aria-labelledby": "tab-" + k });
      paneles[k] = p;
      const b = h("button", {
        class: "pestana", role: "tab", type: "button", id: "tab-" + k, "aria-controls": "panel-" + k, tabindex: "-1",
        onclick: () => ir(k, true),
        onkeydown: (ev) => {
          const i = claves.indexOf(k); let j = null;
          if (ev.key === "ArrowRight") j = (i + 1) % claves.length;
          else if (ev.key === "ArrowLeft") j = (i - 1 + claves.length) % claves.length;
          else if (ev.key === "Home") j = 0;
          else if (ev.key === "End") j = claves.length - 1;
          if (j !== null) { ev.preventDefault(); ir(claves[j], true); botones[claves[j]].focus(); }
        },
      }, m.pestanas[k].titulo, hechos[k] ? h("span", { class: "ok", "aria-hidden": "true" }, "✓") : null);
      botones[k] = b; barra.append(b);
    });
    c.append(barra);
    claves.forEach((k) => c.append(paneles[k]));
    principal.append(c);

    const armados = {};
    function ir(k, actualizarHash) {
      claves.forEach((x) => { const on = x === k; paneles[x].hidden = !on; botones[x].setAttribute("aria-selected", on ? "true" : "false"); botones[x].tabIndex = on ? 0 : -1; });
      if (barra && barra.scrollWidth > barra.clientWidth + 1) {
        try { const br = barra.getBoundingClientRect(), er = botones[k].getBoundingClientRect(); barra.scrollBy({ left: er.left + er.width / 2 - (br.left + br.width / 2), behavior: "smooth" }); } catch (e) {}
      }
      if (!armados[k]) {
        armados[k] = true;
        try { m.pestanas[k].render(paneles[k], { modulo: m, ir: (t) => ir(t, true) }); }
        catch (e) { console.error(e); paneles[k].append(h("div", { class: "nota ojo" }, h("span", { class: "nota-tit" }, "Algo falló"), "No pude armar esta sección: " + e.message)); }
      }
      marcarPestana(m.id, k);
      if (!botones[k].querySelector(".ok") && k !== "explicacion") botones[k].append(h("span", { class: "ok", "aria-hidden": "true" }, "✓"));
      if (actualizarHash) { const nuevo = "#/" + m.id + "/" + k; if (location.hash !== nuevo) history.replaceState(null, "", nuevo); window.scrollTo({ top: 0 }); }
    }
    ir(tabIni, false);
  }

  /* ---------- router ---------- */
  function ruta() {
    const partes = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    E.vaciar(principal); window.scrollTo({ top: 0 });
    const id = partes[0] || "inicio";
    if (id === "inicio") pintarInicio();
    else { const m = E.moduloPorId(id); if (m) pintarTema(m, partes[1]); else pintarInicio(); }
    principal.focus({ preventScroll: true });
  }

  function iniciar() {
    principal = h("main", { class: "principal", id: "contenido", tabindex: "-1" });
    raiz.append(principal);
    window.addEventListener("hashchange", ruta);
    ruta();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
