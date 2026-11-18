/* ============================================================
   Ciencias Cognitivas — Tema 3: Filosofía del Ser y el Saber
   Ontología · Ontológico · Epistemología  (realidad vs conocimiento)
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Ontología (¿qué existe?) vs Epistemología (¿cómo lo sé?) */
  var SVG_SER_SABER =
    '<svg viewBox="0 0 580 230" role="img" aria-label="Ontología frente a epistemología">' +
    // Ontología: el inventario de lo que existe
    '<text x="140" y="24" text-anchor="middle" font-size="12.5" fill="var(--azul)" font-weight="600">ONTOLOGÍA</text>' +
    '<text x="140" y="42" text-anchor="middle" font-size="11" fill="currentColor" opacity=".7">¿qué existe?</text>' +
    '<rect x="34" y="58" width="212" height="150" rx="14" fill="none" stroke="var(--azul)" stroke-width="2" opacity=".8"/>' +
    '<g stroke="var(--azul)" stroke-width="1.8" fill="none" opacity=".9">' +
    '<circle class="cog-pop" cx="84" cy="100" r="15"/>' +
    '<rect class="cog-pop" style="animation-delay:.15s" x="128" y="86" width="30" height="30" rx="5"/>' +
    '<path class="cog-pop" style="animation-delay:.3s" d="M196 114l16-28 16 28z"/>' +
    '<circle class="cog-pop" style="animation-delay:.45s" cx="110" cy="160" r="11"/>' +
    '<rect class="cog-pop" style="animation-delay:.6s" x="150" y="148" width="26" height="26" rx="13"/>' +
    '</g>' +
    '<text x="140" y="198" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">el inventario del ser</text>' +
    // flecha
    '<path d="M258 133h40" stroke="currentColor" opacity=".4" stroke-width="1.6" marker-end="url(#ssArrow)"/>' +
    '<defs><marker id="ssArrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".5"/></marker></defs>' +
    // Epistemología: el filtro de la verdad
    '<text x="440" y="24" text-anchor="middle" font-size="12.5" fill="var(--verde)" font-weight="600">EPISTEMOLOGÍA</text>' +
    '<text x="440" y="42" text-anchor="middle" font-size="11" fill="currentColor" opacity=".7">¿cómo sé que es verdad?</text>' +
    '<rect x="332" y="58" width="214" height="150" rx="14" fill="none" stroke="var(--verde)" stroke-width="2" opacity=".8"/>' +
    // embudo-filtro
    '<g stroke="var(--verde)" stroke-width="2" fill="none">' +
    '<path d="M360 84h160l-54 56v34l-52 18v-52z"/>' +
    '</g>' +
    '<g fill="var(--verde)"><circle cx="384" cy="74" r="3"/><circle cx="440" cy="72" r="3"/><circle cx="496" cy="74" r="3"/></g>' +
    '<text x="440" y="74" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">creencias</text>' +
    '<circle cx="440" cy="172" r="7" fill="var(--verde)"/>' +
    '<text x="440" y="200" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">conocimiento justificado</text>' +
    '</svg>';

  /* SVG 2 — Falsos amigos: Ontología (filosofía) vs Ontogenia (biología) */
  var SVG_FALSOS =
    '<svg viewBox="0 0 560 150" role="img" aria-label="Ontología frente a ontogenia, falsos amigos">' +
    '<g>' +
    '<rect x="24" y="30" width="230" height="92" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/>' +
    '<text x="139" y="58" text-anchor="middle" font-size="13" fill="var(--azul)" font-weight="600">ONTOLOGÍA</text>' +
    '<text x="139" y="80" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75">Filosofía · el SER</text>' +
    '<text x="139" y="100" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".55">¿qué cosas existen?</text>' +
    '</g>' +
    '<g font-size="22" fill="var(--rojo)"><text x="280" y="84" text-anchor="middle">≠</text></g>' +
    '<g>' +
    '<rect x="306" y="30" width="230" height="92" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<text x="421" y="58" text-anchor="middle" font-size="13" fill="var(--verde)" font-weight="600">ONTOGENIA</text>' +
    '<text x="421" y="80" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75">Biología · el INDIVIDUO</text>' +
    '<text x="421" y="100" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".55">¿cómo se desarrolla un ser?</text>' +
    '</g>' +
    '<text x="280" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".55">suenan igual · campos distintos</text>' +
    '</svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Filosofía del Ser y el Saber</h2>' +
      '<p>Dos de las preguntas más antiguas de la filosofía caben en dos palabras: <b>ontología</b> (¿qué existe?) y <b>epistemología</b> (¿cómo sé que lo que sé es verdad?). Una mira la <i>realidad</i>; la otra, el <i>conocimiento</i> de esa realidad. Y de paso, hay que desactivar una trampa: <b>ontología</b> no es lo mismo que <b>ontogenia</b>.</p>');

    cog.epigrafe(cont, "“Solo sé que no sé nada.”", "Sócrates (vía Platón)");

    cog.prosa(cont, '<h3>1 · Ontología — la teoría de lo que existe</h3>' +
      '<p>La <b>ontología</b> es la rama de la filosofía que estudia la naturaleza del <b>ser</b>: qué cosas existen, qué tipos de entidades hay y cómo se relacionan. ¿Existen los números igual que existe una silla? ¿Es real una emoción, una empresa, un derecho? La ontología arma el <i>inventario</i> de la realidad.</p>');
    cog.figura(cont, { color: AZ, titulo: "El inventario del ser y el filtro de la verdad",
      svg: SVG_SER_SABER,
      pie: "La <b>ontología</b> cataloga <i>qué hay</i>. La <b>epistemología</b> es el <i>filtro</i> que separa las creencias de verdad del mero creer: conocimiento justificado." });
    cog.prosa(cont, '<p><b>Ontológico</b> es su adjetivo. Un “debate ontológico” discute si algo <i>existe</i> y de qué modo: por ejemplo, si una entidad abstracta (el número 7, la justicia) tiene la misma clase de existencia que algo físico.</p>');

    cog.prosa(cont, '<h3>2 · Cuidado: Ontología ≠ Ontogenia</h3>' +
      '<p>Suenan casi igual y viven en mundos distintos. Confundirlas es el error clásico de este bloque:</p>');
    cog.figura(cont, { color: RO, svg: SVG_FALSOS,
      pie: "<b>Ontología</b> (del griego <i>ón</i>, “ser” + <i>logos</i>, “estudio”) es <b>filosofía</b>: el estudio de lo que existe. <b>Ontogenia</b> (<i>ón</i> + <i>génesis</i>, “origen”) es <b>biología</b>: el desarrollo de un individuo. Misma raíz, campos opuestos." });

    cog.prosa(cont, '<h3>3 · Epistemología — la teoría del conocimiento</h3>' +
      '<p>La <b>epistemología</b> estudia <i>cómo</i> sabemos, qué cuenta como conocimiento y cómo lo justificamos. Es el <b>filtro crítico</b>: no le basta con que creas algo, pregunta <i>por qué</i> estarías justificado en creerlo. La definición clásica de conocimiento —“creencia verdadera justificada”— nace aquí.</p>');
    cog.tabla(cont, {
      criterio: "¿Qué pregunta?",
      cols: [{ nombre: "Ontología", color: AZ }, { nombre: "Epistemología", color: VE }],
      filas: [
        { k: "Objeto", v: ["El <b>ser</b> / la realidad", "El <b>conocimiento</b> de la realidad"] },
        { k: "Pregunta", v: ["¿Qué existe y cómo?", "¿Cómo sé que es verdad?"] },
        { k: "Busca", v: ["Un inventario del mundo", "Un criterio para justificar"] },
        { k: "Ejemplo", v: ["¿Existen los números?", "¿Cómo pruebo que 2+2=4?"] },
        { k: "No confundir con", v: ["Ontogenia (biología del individuo)", "Epistolar (de cartas)"] }
      ]
    });
    cog.nota(cont, 'Orden mental útil: primero la <b>ontología</b> dice <i>qué hay</i>; luego la <b>epistemología</b> pregunta <i>cómo podemos conocerlo</i>. El ser va antes que el saber sobre el ser.', AZ);

    cog.prosa(cont, '<h3>4 · Donde esto toca la tecnología</h3>' +
      '<p>Ambas palabras tienen una segunda vida, muy literal, en computación y datos:</p>');
    cog.acordeon(cont, [
      { q: "“Ontologías” en datos: no es metáfora", a: 'En ciencia de datos e IA, una <b>ontología</b> es un modelo <i>formal</i> de un dominio: sus clases, propiedades y relaciones (RDF, OWL, <i>knowledge graphs</i>, schema.org). Cuando diseñas el esquema de una base de datos o un grafo de conocimiento, estás haciendo ontología aplicada: decides qué entidades “existen” en tu sistema.' },
      { q: "Epistemología de un modelo: ¿cómo “sabe”?", a: 'Preguntar si un modelo <i>sabe</i> algo o solo lo repite es epistemología pura. La <b>validación</b>, el <i>ground truth</i>, la calibración de confianza y la incertidumbre son el aparato epistémico del ML: su forma de justificar que una predicción es creíble.' },
      { q: "La alucinación como falla epistémica", a: 'Cuando un modelo afirma con seguridad algo falso, falla <i>epistémicamente</i>: produce una “creencia” sin justificación. Distinguir <b>procesar</b> de <b>conocer con razones</b> es exactamente el territorio de la epistemología.' },
      { q: "Compromiso ontológico", a: 'Todo esquema de datos hace un “compromiso ontológico”: al modelar, decides qué categorías son reales para tu software (¿un “usuario” y una “cuenta” son la misma cosa?). Esas decisiones ontológicas moldean lo que el sistema puede o no puede representar.' }
    ], "Conexiones con IA, datos y diseño");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "¿Ontología, epistemología u ontogenia? Elige y revisa el porqué.",
      reactivos: [
        { p: 'Preguntar “¿los números existen de verdad o son un invento humano?” es una cuestión…',
          opciones: [{ t: "ontológica", ok: true }, { t: "epistemológica" }, { t: "ontogenética" }],
          porque: "Se discute <b>qué existe y de qué modo</b>: es <b>ontología</b> (la teoría del ser)." },
        { p: 'Preguntar “¿qué pruebas necesito para afirmar que esto es verdad?” es una cuestión…',
          opciones: [{ t: "epistemológica", ok: true }, { t: "ontológica" }, { t: "biológica" }],
          porque: "Se interroga <b>cómo justificamos el conocimiento</b>: es <b>epistemología</b>." },
        { p: 'Diseñar el grafo de clases y relaciones de un dominio para tu base de datos es construir una…',
          opciones: [{ t: "ontología (aplicada)", ok: true }, { t: "ontogenia" }, { t: "epistemología" }],
          porque: "En datos, un modelo formal de entidades y relaciones es literalmente una <b>ontología</b>." }
      ]
    });
    cog.nota(cont, 'Ya casi. Cierra el tema en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "La <b>ontología</b> (en filosofía) estudia…", op: ["Cómo se desarrolla un individuo", "La naturaleza del ser: qué existe y cómo", "Cómo justificamos el conocimiento", "El origen de las especies"], ok: 1, porque: "La <b>ontología</b> es la teoría del <b>ser</b>: qué cosas existen y de qué modo." },
    { p: "La <b>epistemología</b> se ocupa de…", op: ["Qué cosas existen", "Cómo sabemos que algo es verdad y cómo lo justificamos", "La biografía de un organismo", "La evolución de la especie"], ok: 1, porque: "La <b>epistemología</b> es la teoría del <b>conocimiento</b>: su criterio y su justificación." },
    { p: "¿Cuál es la diferencia clave entre <b>ontología</b> y <b>ontogenia</b>?", op: ["Son sinónimos", "Ontología es filosofía (el ser); ontogenia es biología (el individuo)", "Ontología es biología; ontogenia es filosofía", "Ninguna, solo cambia el idioma"], ok: 1, porque: "Comparten raíz pero no campo: <b>ontología</b> = filosofía del ser; <b>ontogenia</b> = desarrollo biológico de un individuo." },
    { p: "En ciencia de datos, una “ontología” es…", op: ["Un tipo de red neuronal", "Un modelo formal de clases, propiedades y relaciones de un dominio", "Un algoritmo de ordenamiento", "Una métrica de error"], ok: 1, porque: "Es un modelo formal del conocimiento de un dominio (RDF/OWL, <i>knowledge graphs</i>): ontología aplicada." },
    { p: "Que un modelo afirme con seguridad algo falso es, sobre todo, una falla…", op: ["Ontológica", "Epistémica (una “creencia” sin justificación)", "Ontogenética", "De hardware"], ok: 1, porque: "Es un problema de <b>justificación del conocimiento</b>: una falla <b>epistémica</b> (alucinación)." }
  ];

  E.registrar({
    id: "cog-filosofia",
    grupo: "fund-mente",
    lenguaje: "fund",
    orden: 3,
    titulo: "Filosofía del Ser y el Saber",
    sub: "Ontología · Ontológico · Epistemología",
    resumen: "¿Qué existe (ontología) y cómo sé que es verdad (epistemología)? Dos preguntas filosóficas milenarias — y por qué una “ontología” también vive en tus bases de datos.",
    chips: [{ k: "Bloque", v: "Filosofía" }, { k: "Tipo", v: "Conceptos y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("cog-filosofia", QUIZ)
    }
  });
})();
