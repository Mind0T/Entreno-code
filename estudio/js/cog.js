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
})();
