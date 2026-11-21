/* ============================================================
   cog.js — Herramientas didácticas para Ciencias Cognitivas,
   Neurociencias y Filosofía. Componentes reutilizables:
   tarjetas de concepto, tablas comparativas, acordeones,
   figuras SVG y ejercicios interactivos "Distingue".
   No ejecuta código; es puro contenido visual.
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, h = E.h;
  E.cog = E.cog || {};

  /* ---- prosa / llamados ---- */
  E.cog.prosa = function (cont, html) { cont.append(h("div", { class: "prosa cog-prosa", html: html })); };
  E.cog.nota = function (cont, html, color) {
    cont.append(h("div", { class: "lz-callout cog-nota", style: color ? { "--c": color } : null,
      html: '<span class="ic"><svg viewBox="0 0 24 24"><path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg></span><p>' + html + '</p>' }));
  };

  /* ---- tarjeta de concepto ---- */
  E.cog.card = function (opts) {
    opts = opts || {};
    return h("article", { class: "cog-card", style: opts.color ? { "--c": opts.color } : null },
      opts.icono ? h("span", { class: "cog-card-ic", "aria-hidden": "true", html: opts.icono }) : null,
      opts.etiqueta ? h("span", { class: "cog-card-tag" }, opts.etiqueta) : null,
      h("h4", { class: "cog-card-tit" }, opts.titulo || ""),
      h("div", { class: "cog-card-body", html: opts.cuerpo || "" }));
  };
  E.cog.grid = function (cont, cards) {
    var g = h("div", { class: "cog-grid" });
    (cards || []).forEach(function (c) { g.append(E.cog.card(c)); });
    cont.append(g);
  };

  /* ---- tabla comparativa visual ----
     opts = { criterio:"Criterio", cols:[{nombre, color}], filas:[{k, v:[...]}] } */
  E.cog.tabla = function (cont, opts) {
    opts = opts || {};
    var thead = h("tr", {}, h("th", { class: "cog-t-k" }, opts.criterio || ""));
    (opts.cols || []).forEach(function (c) {
      thead.append(h("th", { class: "cog-t-h", style: c.color ? { "--c": c.color } : null },
        h("span", { class: "cog-t-dot", "aria-hidden": "true" }), c.nombre));
    });
    var tb = h("tbody");
    (opts.filas || []).forEach(function (f) {
      var tr = h("tr", {}, h("th", { class: "cog-t-k", scope: "row", html: f.k }));
      (f.v || []).forEach(function (val) { tr.append(h("td", { html: val })); });
      tb.append(tr);
    });
    cont.append(h("div", { class: "cog-tabla-wrap" },
      h("table", { class: "cog-tabla" }, h("thead", {}, thead), tb)));
  };

  /* ---- acordeón (details/summary, accesible) ---- */
  E.cog.acordeon = function (cont, items, titulo) {
    var box = h("div", { class: "cog-acc-box" });
    if (titulo) box.append(h("h3", { class: "cog-acc-tit" }, titulo));
    (items || []).forEach(function (it) {
      box.append(h("details", { class: "cog-acc" },
        h("summary", {}, h("span", { class: "cog-acc-q", html: it.q }),
          h("span", { class: "cog-acc-chev", "aria-hidden": "true", html: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>' })),
        h("div", { class: "cog-acc-a", html: it.a })));
    });
    cont.append(box);
  };

  /* ---- figura con SVG + pie ---- */
  E.cog.figura = function (cont, opts) {
    opts = opts || {};
    cont.append(h("figure", { class: "cog-fig", style: opts.color ? { "--c": opts.color } : null },
      opts.titulo ? h("figcaption", { class: "cog-fig-tit" }, opts.titulo) : null,
      h("div", { class: "cog-fig-svg", html: opts.svg || "" }),
      opts.pie ? h("figcaption", { class: "cog-fig-pie", html: opts.pie }) : null));
  };

  /* ---- ejercicio interactivo "Distingue" ----
     Cada reactivo muestra un enunciado y botones (términos). Al elegir,
     colorea y revela la explicación. No califica: refuerza por práctica.
     opts = { intro, reactivos:[{ p, opciones:[{t, ok}], porque }] } */
  E.cog.distingue = function (cont, opts) {
    opts = opts || {};
    var box = h("div", { class: "cog-ej" });
    box.append(h("div", { class: "cog-ej-head" },
      h("span", { class: "cog-ej-ic", "aria-hidden": "true", html: '<svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0"/></svg>' }),
      h("div", {}, h("b", {}, opts.titulo || "Distingue"),
        opts.intro ? h("p", { class: "cog-ej-intro" }, opts.intro) : null)));
    (opts.reactivos || []).forEach(function (r, i) {
      var item = h("div", { class: "cog-ej-item" });
      item.append(h("p", { class: "cog-ej-p", html: "<b>" + (i + 1) + ".</b> " + r.p }));
      var ops = h("div", { class: "cog-ej-ops" });
      var porque = h("p", { class: "cog-ej-porque", hidden: true, html: r.porque || "" });
      var resuelto = false;
      (r.opciones || []).forEach(function (o) {
        var b = h("button", { class: "cog-ej-op", type: "button" }, o.t);
        b.addEventListener("click", function () {
          if (resuelto) return; resuelto = true;
          ops.querySelectorAll("button").forEach(function (bb) {
            bb.disabled = true;
            var isThis = bb === b;
            var txt = bb.textContent;
            var esCorrecta = (r.opciones.find(function (x) { return x.t === txt; }) || {}).ok;
            if (esCorrecta) bb.classList.add("ok");
            else if (isThis) bb.classList.add("mal");
          });
          porque.hidden = false;
        });
        ops.append(b);
      });
      item.append(ops); item.append(porque); box.append(item);
    });
    cont.append(box);
  };

  /* ---- separador/epígrafe ---- */
  E.cog.epigrafe = function (cont, texto, autor) {
    cont.append(h("blockquote", { class: "cog-epi" },
      h("p", { html: texto }), autor ? h("cite", {}, "— " + autor) : null));
  };

  /* ---- referencias (fuentes verificadas con enlace) ----
     items = [{ t:"título", fuente:"Sitio/Autor", url:"https://…", lang:"es"|"en" }] */
  E.cog.refs = function (cont, items, titulo) {
    var box = h("section", { class: "cog-refs" });
    box.append(h("h3", { class: "cog-refs-tit" },
      h("span", { class: "cog-refs-ic", "aria-hidden": "true",
        html: '<svg viewBox="0 0 24 24"><path d="M4 5.5h11M4 10h11M4 14.5h7"/><path d="M16.5 13.5l3.5 3.5-3.5 3.5"/></svg>' }),
      titulo || "Referencias"));
    var ol = h("ol", { class: "cog-refs-list" });
    (items || []).forEach(function (r) {
      ol.append(h("li", {},
        h("a", { class: "cog-ref", href: r.url, target: "_blank", rel: "noopener noreferrer" },
          h("span", { class: "cog-ref-txt" },
            h("span", { class: "cog-ref-t", html: r.t }),
            r.fuente ? h("span", { class: "cog-ref-src" }, r.fuente) : null),
          h("span", { class: "cog-ref-lang" + (r.lang === "es" ? " es" : "") }, r.lang === "es" ? "ES" : "EN"),
          h("span", { class: "cog-ref-ext", "aria-hidden": "true",
            html: '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>' }))));
    });
    box.append(ol);
    cont.append(box);
  };

  /* ---- retrato (foto local con respaldo de monograma) ----
     Mientras no exista el archivo, se muestra un avatar con iniciales.
     Cuando el archivo carga, se revela la foto.
     opts = { nombre, slug, color, src? } */
  E.cog.iniciales = function (nombre) {
    var p = String(nombre || "").trim().split(/\s+/).filter(Boolean);
    var ini = (p[0] ? p[0].charAt(0) : "") + (p[1] ? p[1].charAt(0) : (p[0] ? p[0].charAt(1) || "" : ""));
    return (ini || "·").toUpperCase();
  };
  E.cog.retrato = function (opts) {
    opts = opts || {};
    var fig = h("span", { class: "cog-ret", style: opts.color ? { "--c": opts.color } : null });
    var mono = h("span", { class: "cog-ret-mono", "aria-hidden": "true" }, E.cog.iniciales(opts.nombre));
    // Candidatos: la ruta explícita, o el slug probado en varias extensiones.
    var cand = opts.src ? [opts.src]
      : (opts.slug ? ["jpg", "png", "webp", "jpeg"].map(function (e) { return "assets/retratos/" + opts.slug + "." + e; }) : []);
    if (cand.length) {
      var i = 0;
      var img = h("img", {
        class: "cog-ret-img", src: cand[0], alt: opts.nombre || "", loading: "lazy", decoding: "async",
        onload: function () { fig.classList.add("con-foto"); },
        onerror: function () { i++; if (i < cand.length) img.src = cand[i]; else fig.classList.remove("con-foto"); }
      });
      fig.append(img);
    }
    fig.append(mono);
    return fig;
  };

  /* ---- revelado al hacer scroll (como una línea de tiempo) ---- */
  var _reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var _io = null;
  function _revelar(el) {
    if (_reduce || !("IntersectionObserver" in window)) { el.classList.add("visible"); return; }
    if (!_io) {
      _io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); _io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    }
    _io.observe(el);
  }

  /* Etiquetas por bloque, adaptadas a una persona (igual que la línea del
     tiempo divide cada hito: "¿Qué ocurrió?", "Innovación"…). */
  var _persLabels = {
    1: ["Perfil"],
    2: ["¿Quién fue?", "¿Por qué importa?"],
    3: ["¿Quién fue?", "Su aporte", "¿Por qué importa?"],
    4: ["¿Quién fue?", "Su aporte", "Qué cambió", "Su legado"],
    5: ["¿Quién fue?", "Su aporte", "Qué cambió", "Por qué importó", "Su legado"]
  };
  function _labelsFor(n, override) {
    if (override && override.length) return override;
    if (_persLabels[n]) return _persLabels[n];
    var a = ["¿Quién fue?"];
    for (var i = 1; i < n - 1; i++) a.push("Su aporte");
    if (n > 1) a.push("¿Por qué importa?");
    return a;
  }

  /* ---- ficha de persona como entrada de línea de tiempo ----
     Retrato grande que se agranda al revelarse, identidad y la bio
     dividida en bloques con preguntas adaptadas a la persona.
     opts = { slug, nombre, meta, color, etiqueta, parrafos:[html,...], bloques?:[etq,...] } */
  E.cog.persona = function (cont, opts) {
    opts = opts || {};
    var parr = opts.parrafos || [];
    var labels = _labelsFor(parr.length, opts.bloques);
    var art = h("article", { class: "cog-bio cog-bio-tl", style: opts.color ? { "--c": opts.color } : null });
    art.append(h("span", { class: "cog-tl-node", "aria-hidden": "true" }));
    var head = h("div", { class: "cog-bio-head" },
      h("div", { class: "cog-tl-foto" }, E.cog.retrato({ nombre: opts.nombre, slug: opts.slug, color: opts.color })),
      h("div", { class: "cog-bio-id" },
        opts.etiqueta ? h("span", { class: "cog-bio-tag" }, opts.etiqueta) : null,
        h("h4", { class: "cog-bio-nom" }, opts.nombre || ""),
        opts.meta ? h("span", { class: "cog-bio-meta", html: opts.meta }) : null));
    art.append(head);
    var cuerpo = h("div", { class: "cog-bio-cuerpo" });
    parr.forEach(function (p, i) {
      var lab = labels && labels[i];
      cuerpo.append(h("div", { class: "cog-tl-bloque" },
        lab ? h("p", { class: "cog-tl-label" }, lab) : null,
        h("p", { html: p })));
    });
    art.append(cuerpo);
    cont.append(art);
    _revelar(art);
    return art;
  };
})();
