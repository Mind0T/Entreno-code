/* ============================================================
   Fundamentos · Ciencias Cognitivas, Neurociencias y Filosofía
   Tema-enlace: "Conocer" de Francisco Varela → abre la
   presentación interactiva (página aparte, misma estética del
   sitio). El menú abre el enlace directamente; esta lección
   es respaldo.
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, h = E.h, cog = E.cog;
  var ENLACE = "ciencias-cognitivas-varela.html";

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Conocer: las ciencias cognitivas</h2>' +
      '<p>Un recorrido visual e interactivo por el ensayo de <b>Francisco Varela</b> (1988), etapa por etapa: la <b>cibernética</b>, el <b>cognitivismo</b>, el <b>conexionismo</b> y la <b>enacción</b>. Incluye esquemas animados, flash cards de repaso y un test de 15 preguntas. Vive como una presentación navegable en su propia página.</p>');
    cont.append(h("div", { class: "cog-launch-wrap" },
      h("a", { class: "cog-launch", href: ENLACE, target: "_blank", rel: "noopener" },
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", html: '<path d="M7 17 17 7M9 7h8v8"/>' }),
        "Abrir la presentación")));
    cog.nota(cont, 'La presentación se abre en una pestaña nueva, ya con la estética del sitio: mismo fondo, plata y navegación por teclas, swipe y pantalla completa.', 'var(--ambar)');
  }

  E.registrar({
    id: "cog-conocer-varela",
    grupo: "fund-mente",
    lenguaje: "fund",
    orden: 4,
    titulo: "Conocer · Las ciencias cognitivas (Varela)",
    sub: "Ciencias Cognitivas, Neurociencias y Filosofía",
    resumen: "Las cuatro etapas de Varela —cibernética, cognitivismo, conexionismo y enacción— en una presentación interactiva con esquemas animados, flash cards y test.",
    chips: [{ k: "Bloque", v: "La mente" }, { k: "Tipo", v: "Presentación interactiva" }],
    enlace: ENLACE,
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } }
    }
  });
})();
