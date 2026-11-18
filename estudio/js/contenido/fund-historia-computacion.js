/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Tema-enlace: Historia de la computación → abre la línea del
   tiempo interactiva (proyecto aparte, desplegado en Vercel).
   El menú abre el enlace directamente; esta lección es respaldo.
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, h = E.h, cog = E.cog;
  var ENLACE = "https://linea-tiempo-computacion-1am1.vercel.app/";

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Historia de la computación</h2>' +
      '<p>Un recorrido visual e interactivo por la evolución de la computación, hito por hito: generaciones, hardware, arquitectura y programación. Vive como una línea de tiempo navegable en su propia página.</p>');
    cont.append(h("div", { class: "cog-launch-wrap" },
      h("a", { class: "cog-launch", href: ENLACE, target: "_blank", rel: "noopener" },
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", html: '<path d="M7 17 17 7M9 7h8v8"/>' }),
        "Abrir la línea del tiempo")));
    cog.nota(cont, 'La línea del tiempo se abre en una pestaña nueva. Más adelante se integrará con la estética del sitio (fondo, header y navegación).', 'var(--azul)');
  }

  E.registrar({
    id: "fund-historia-computacion",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 5,
    titulo: "Historia de la computación",
    sub: "Ciencias de la Computación e IA",
    resumen: "La evolución de la computación como una línea de tiempo interactiva: generaciones, hardware, arquitectura y programación.",
    enlace: ENLACE,
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } }
    }
  });
})();
