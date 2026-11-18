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
    // C
    { id: "ordenamiento", lang: "c", titulo: { es: "Algoritmos de ordenamiento", en: "Sorting algorithms" } },
    { id: "pila", lang: "c", titulo: { es: "Estructura: Pila", en: "Structure: Stack" } },
    { id: "cola", lang: "c", titulo: { es: "Estructura: Cola", en: "Structure: Queue" } },
    { id: "busqueda", lang: "c", titulo: { es: "Algoritmos de búsqueda", en: "Search algorithms" } },
    // Python — organizado por TEMAS (no por semanas)
    { id: "py-entorno", lang: "py", titulo: { es: "Entorno y flujo de trabajo", en: "Environment & workflow" } },
    { id: "py-fundamentos", lang: "py", titulo: { es: "Fundamentos de Python", en: "Python fundamentals" } },
    { id: "py-herramientas", lang: "py", titulo: { es: "Herramientas de Python", en: "Python tools" } },
    // Fundamentos — tres esferas de teoría y conceptos
    { id: "fund-mente", lang: "fund", titulo: { es: "Ciencias Cognitivas, Neurociencias y Filosofía", en: "Cognitive Science, Neuroscience & Philosophy" } },
    { id: "fund-computo", lang: "fund", titulo: { es: "Ciencias de la Computación e IA", en: "Computer Science & AI" } },
    { id: "fund-diseno", lang: "fund", titulo: { es: "Diseño", en: "Design" } },
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
    { titulo: { es: "Fundamentos", en: "Foundations" }, langs: [
      { id: "fund", label: "Teoría", real: true },
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
  function gruposDe(lenguaje) {
    lenguaje = lenguaje || "c";
    return GRUPOS.filter((g) => (g.lang || "c") === lenguaje)
      .map((g) => ({ g, items: ordenados().filter((m) => m.grupo === g.id) }))
      .filter((x) => x.items.length);
  }
  function popTemasC(pop, lenguaje) {
    gruposDe(lenguaje).forEach(({ g, items }) => {
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
          if (l.real) popTemasC(panel, l.id); else popSoon(panel, l.soon);
          panel.hidden = false; hint.hidden = true;
          try { panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
        });
        list.append(btn);
      });
      col.append(list); menu.append(col);
    });
    return h("section", { class: "catzone" }, menu, hint, panel);
  }

  /* ============================================================
     LANDING estilo "Eivind" — identidad + menú infinito de CURSOS
     ============================================================ */
  const ICON_CUR = {
    c: '<rect x="3.5" y="5" width="17" height="14" rx="3" opacity=".4"/><path d="M15.5 9.2a4 4 0 1 0 0 5.6"/>',
    py: '<rect x="5" y="4" width="9" height="9" rx="2.5"/><rect x="10" y="11" width="9" height="9" rx="2.5"/><circle cx="8" cy="7.3" r="1"/><circle cx="16" cy="16.7" r="1"/>',
    pydata: '<path d="M4 20V5"/><path d="M4 20h16"/><path d="M7.5 16l3-4 3 2 4.5-7"/><circle cx="18" cy="7" r="1.3"/>',
    ux: '<path d="M9.5 18.5h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.8 10.6c.7.6 1 1 1 2.4h5.6c0-1.4.3-1.8 1-2.4A6 6 0 0 0 12 3z"/>',
    uiux: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18"/><path d="m13 13 3.5 5.5 1.3-2.4 2.6-.5L13 13z"/>',
    gcp: '<path d="M12 4 5.5 7.8v4.4L12 16l6.5-3.8V7.8L12 4z"/><path d="M12 10.2 5.7 7.9M12 10.2l6.3-2.3M12 10.2V16"/>',
    aws: '<path d="M7.5 15.5a3.5 3.5 0 0 1-.3-7 5 5 0 0 1 9.6-.6 3.4 3.4 0 0 1 .2 6.8"/><path d="M6 18.5c3.5 2 8.5 2 12 0"/>',
    ai: '<path d="M12 4a3.5 3.5 0 0 0-3.5 3.5v9a3 3 0 0 0 6 .3V7.5A3.5 3.5 0 0 0 12 4z" opacity=".45"/><path d="m12 10.5 1.8 1.8L12 14l-1.8-1.7L12 10.5z"/><circle cx="12" cy="7.6" r="1"/>',
    cog: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.4A3 3 0 0 0 6 18a3 3 0 0 0 3 2V4z" opacity=".5"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.4A3 3 0 0 1 18 18a3 3 0 0 1-3 2V4z"/><path d="M12 4v16"/>',
    fund: '<circle cx="12" cy="7" r="4.2"/><circle cx="7" cy="15.5" r="4.2" opacity=".6"/><circle cx="17" cy="15.5" r="4.2" opacity=".6"/>'
  };
  const AZ="#5B8DEF", MO="#B79CC9", CI="#9DB4CF", AM="#E2A336", CO="#7C83E8";
  function cTopics(lenguaje) {
    return gruposDe(lenguaje).reduce(function (acc, x) {
      x.items.forEach(function (m) { acc.push({ id: m.id, titulo: m.titulo, done: completo(m), pronto: !!m.pronto, enlace: m.enlace || null }); });
      return acc;
    }, []);
  }
  function CURSOS(data) {
    data = data || {};
    const dC = data.c || {}, dPy = data.py || {}, dFund = data.fund || {};
    const pyReal = !!(dPy.topics && dPy.topics.length);
    const fundReal = !!(dFund.topics && dFund.topics.length);
    return [
      { id:"c", icon:"c", area:AZ, real:true, first:dC.first, topics:dC.topics,
        nombre:{es:"Fundamentos de C", en:"C fundamentals"}, sub:{es:"Programación", en:"Programming"},
        frase:{es:"Empieza por aquí: C, viendo correr el código línea por línea.", en:"Start here: C, watching the code run line by line."},
        resumen:{es:"El corazón de la Learning Zone: aprende C mirando la memoria, los apuntadores y cada estructura cobrar vida con animaciones y pruebas de escritorio.", en:"The heart of the Learning Zone: learn C by watching memory, pointers and every structure come alive with animations and desktop traces."},
        aprende:{es:["Pila, cola y estructuras de datos paso a paso","Pruebas de escritorio que siguen el código línea por línea","Ordenamiento y búsqueda con animaciones"], en:["Stack, queue and data structures step by step","Desktop traces following the code line by line","Sorting and search with animations"]} },
      { id:"py", icon:"py", area:AZ, real:pyReal, first:dPy.first, topics:dPy.topics, nombre:{es:"Fundamentos de Python", en:"Python fundamentals"}, sub:{es:"Programación", en:"Programming"},
        frase: pyReal
          ? {es:"Lee, escribe y ejecuta Python aquí mismo — como un cuaderno que vive en tu navegador.", en:"Read, write and run Python right here — like a notebook living in your browser."}
          : {es:"Pronto: Python desde cero, con la misma magia de ver todo por dentro.", en:"Soon: Python from scratch, with the same magic of seeing it all inside."},
        resumen:{es:"Fundamentos de Python con celdas de código que corres y verificas al instante: tipos, variables, flujo, funciones y estructuras — practicas mientras lees, como en un Jupyter Notebook.", en:"Python fundamentals with code cells you run and check instantly: types, variables, flow, functions and structures — you practice as you read, like a Jupyter Notebook."},
        aprende:{es:["Tipos, variables y operadores, ejecutando código real","Celdas tipo notebook: escribe, corre y verifica","Un quiz en cada tema para fijar lo aprendido"], en:["Types, variables and operators, running real code","Notebook-style cells: write, run and check","A quiz in every topic to lock in what you learn"]} },
      { id:"fund", icon:"fund", area:CO, real:fundReal, first:dFund.first, topics:dFund.topics,
        nombre:{es:"Fundamentos", en:"Foundations"}, sub:{es:"Teoría y conceptos", en:"Theory and concepts"},
        frase: fundReal
          ? {es:"La base teórica de todo: tres esferas — la mente, la máquina y el diseño.", en:"The theory beneath it all: three spheres — mind, machine and design."}
          : {es:"Pronto: los fundamentos teóricos que sostienen la mente, la máquina y el diseño.", en:"Soon: the theoretical foundations behind mind, machine and design."},
        resumen:{es:"El cimiento conceptual de la Learning Zone, en tres esferas: Ciencias Cognitivas, Neurociencias y Filosofía; Ciencias de la Computación e IA; y Diseño. Teoría, conceptos y comparativas con diagramas y ejercicios para pensar con precisión.", en:"The conceptual bedrock of the Learning Zone, in three spheres: Cognitive Science, Neuroscience & Philosophy; Computer Science & AI; and Design. Theory, concepts and comparisons with diagrams and exercises to think with precision."},
        aprende:{es:["Ciencias Cognitivas, Neurociencias y Filosofía: la mente, el ser y el saber","Ciencias de la Computación e IA: de la historia a los conceptos clave","Diseño: operaciones mentales, affordance y pensamiento visual"], en:["Cognitive Science, Neuroscience & Philosophy: mind, being and knowing","Computer Science & AI: from history to key concepts","Design: mental operations, affordance and visual thinking"]} },
      { id:"pydata", icon:"pydata", area:MO, nombre:{es:"Python para Ciencia de Datos", en:"Python for Data Science"}, sub:{es:"Programación · Datos", en:"Programming · Data"},
        frase:{es:"Pronto: Python para ciencia de datos, de pandas a los primeros modelos.", en:"Soon: Python for data science, from pandas to your first models."},
        resumen:{es:"El puente entre programar y analizar: pandas, visualización y los primeros modelos de machine learning, con ejemplos reales.", en:"The bridge between coding and analysis: pandas, visualization and your first machine-learning models, with real examples."},
        aprende:{es:["pandas y limpieza de datos","Visualización con matplotlib y seaborn","Primeros modelos de machine learning"], en:["pandas and data cleaning","Visualization with matplotlib and seaborn","Your first machine-learning models"]} },
      { id:"ux", icon:"ux", area:MO, nombre:{es:"Design Thinking", en:"Design Thinking"}, sub:{es:"Diseño", en:"Design"},
        frase:{es:"Pronto: Design Thinking, para resolver problemas centrados en las personas.", en:"Soon: Design Thinking, to solve problems centered on people."},
        resumen:{es:"El proceso que uso en mis proyectos: empatizar, definir, idear, prototipar y probar, con casos reales como el reto de la NASA.", en:"The process I use in my projects: empathize, define, ideate, prototype and test, with real cases like the NASA challenge."},
        aprende:{es:["Las 5 fases del Design Thinking","Persona, empathy map y journey map","De la idea al prototipo"], en:["The 5 phases of Design Thinking","Persona, empathy map and journey map","From idea to prototype"]} },
      { id:"uiux", icon:"uiux", area:MO, nombre:{es:"UX / UI", en:"UX / UI"}, sub:{es:"Diseño", en:"Design"},
        frase:{es:"Pronto: UX/UI, del wireframe a una interfaz que se siente bien.", en:"Soon: UX/UI, from wireframe to an interface that feels right."},
        resumen:{es:"Diseño de interfaces con intención: jerarquía, affordance, heurísticas de Nielsen y economía del comportamiento aplicadas a pantallas reales.", en:"Interface design with intent: hierarchy, affordance, Nielsen's heuristics and behavioral economics applied to real screens."},
        aprende:{es:["Heurísticas de usabilidad","Jerarquía visual y affordance","De wireframe a alta fidelidad"], en:["Usability heuristics","Visual hierarchy and affordance","From wireframe to high fidelity"]} },
      { id:"gcp", icon:"gcp", area:CI, nombre:{es:"Cloud Engineer · Google", en:"Cloud Engineer · Google"}, sub:{es:"Cómputo en la nube", en:"Cloud computing"},
        frase:{es:"Pronto: Google Cloud, rumbo a la certificación de Cloud Engineer.", en:"Soon: Google Cloud, on the way to the Cloud Engineer cert."},
        resumen:{es:"Fundamentos de Google Cloud orientados a la certificación Associate Cloud Engineer: cómputo, redes, almacenamiento e identidad.", en:"Google Cloud fundamentals aimed at the Associate Cloud Engineer cert: compute, networking, storage and identity."},
        aprende:{es:["Cómputo, redes y almacenamiento","IAM e identidad","Rumbo a Associate Cloud Engineer"], en:["Compute, networking and storage","IAM and identity","Toward Associate Cloud Engineer"]} },
      { id:"aws", icon:"aws", area:AM, nombre:{es:"Cloud Practitioner · AWS", en:"Cloud Practitioner · AWS"}, sub:{es:"Cómputo en la nube", en:"Cloud computing"},
        frase:{es:"Pronto: AWS desde los cimientos, rumbo a Cloud Practitioner.", en:"Soon: AWS from the ground up, toward Cloud Practitioner."},
        resumen:{es:"Los fundamentos de AWS para la certificación Cloud Practitioner: la nube, sus servicios clave, precios y seguridad.", en:"AWS fundamentals for the Cloud Practitioner cert: the cloud, its key services, pricing and security."},
        aprende:{es:["La nube y el modelo de responsabilidad","Servicios clave de AWS","Rumbo a Cloud Practitioner"], en:["The cloud and the shared responsibility model","Key AWS services","Toward Cloud Practitioner"]} },
      { id:"ai", icon:"ai", area:AM, nombre:{es:"AI Practitioner · AWS", en:"AI Practitioner · AWS"}, sub:{es:"Cómputo en la nube", en:"Cloud computing"},
        frase:{es:"Pronto: IA en AWS, rumbo a la certificación AI Practitioner.", en:"Soon: AI on AWS, toward the AI Practitioner cert."},
        resumen:{es:"Inteligencia artificial y machine learning en AWS para la certificación AI Practitioner: conceptos, servicios y casos de uso responsables.", en:"Artificial intelligence and machine learning on AWS for the AI Practitioner cert: concepts, services and responsible use cases."},
        aprende:{es:["Conceptos de IA y ML","Servicios de IA en AWS","IA responsable · rumbo a AI Practitioner"], en:["AI and ML concepts","AI services on AWS","Responsible AI · toward AI Practitioner"]} }
    ];
  }

  /* ---------- landing ---------- */
  function pintarInicio() {
    document.title = "Learning Zone · Irving Soriano";
    if (!window.EivindLZ) { // respaldo: menú clásico si el motor no cargó
      const c = h("div", { class: "lz" }, heroCarousel(), categoryZone());
      principal.append(c); initCarousel(); return;
    }
    const mountEl = h("div", { class: "eiv", id: "eivMount" });
    principal.append(mountEl);
    const topsC = cTopics("c");
    const topsPy = cTopics("py");
    const topsFund = cTopics("fund");
    const firstC = (topsC.find((t) => !t.pronto) || {}).id || "";
    const firstPy = (topsPy.find((t) => !t.pronto) || {}).id || "";
    const firstFund = (topsFund.find((t) => !t.pronto && !t.enlace) || topsFund.find((t) => !t.pronto) || {}).id || "";
    window.EivindLZ.mount(mountEl, {
      lang: lang, icons: ICON_CUR, cId: "c", cFirst: firstC,
      cursos: CURSOS({ c: { topics: topsC, first: firstC }, py: { topics: topsPy, first: firstPy }, fund: { topics: topsFund, first: firstFund } }),
      nav: function (hash) { location.hash = hash; }
    });
  }

  /* ============================================================
     BARRA DE TEMAS (en cada lección, en vez del sidebar)
     ============================================================ */
  function topicBar(actual) {
    const btn = h("button", { class: "tb-switch-btn", type: "button", id: "tbBtn", "aria-expanded": "false" },
      D("temas"), h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", html: '<path d="M6 9l6 6 6-6"/>' }));
    const menu = h("div", { class: "tb-menu", id: "tbMenu", hidden: true });
    gruposDe(actual.lenguaje || "c").forEach(({ g, items }) => {
      const grp = h("div", { class: "tb-g" }, h("h4", {}, T(g.titulo)));
      const ul = h("div", { class: "tb-g-list" });
      items.forEach((m) => {
        const esEnlace = !!m.enlace;
        ul.append(h("a", {
          class: "tb-topic" + (m.id === actual.id ? " on" : "") + (m.pronto ? " pronto" : "") + (esEnlace ? " enlace" : ""),
          href: m.pronto ? null : (esEnlace ? m.enlace : "#/" + m.id),
          target: esEnlace ? "_blank" : null, rel: esEnlace ? "noopener" : null,
          "aria-disabled": m.pronto ? "true" : null,
        }, m.titulo,
           esEnlace ? h("span", { class: "tb-ext", "aria-hidden": "true", html: '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>' }) : null,
           m.pronto ? h("span", { class: "etq" }, D("soon")) : null));
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
    else {
      const m = E.moduloPorId(id);
      if (m && m.enlace) { window.open(m.enlace, "_blank", "noopener"); location.hash = "#/inicio"; return; }
      if (m) pintarTema(m, partes[1]); else pintarInicio();
    }
    principal.focus({ preventScroll: true });
  }

  /* ---------- botón "volver arriba" (solo en vista de curso) ---------- */
  function montarBotonArriba() {
    const btn = h("button", {
      class: "lz-top", type: "button",
      "aria-label": lang === "en" ? "Back to top" : "Volver arriba",
      html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>'
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(btn);
    let tick = false;
    function sync() {
      tick = false;
      const mostrar = window.scrollY > 400 && !!document.querySelector(".contenedor");
      btn.classList.toggle("show", mostrar);
    }
    window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(sync); } }, { passive: true });
    window.addEventListener("hashchange", () => setTimeout(sync, 60));
    sync();
  }

  function iniciar() {
    principal = h("main", { class: "principal", id: "contenido", tabindex: "-1" });
    raiz.append(principal);
    window.addEventListener("hashchange", ruta);
    ruta();
    montarBotonArriba();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
