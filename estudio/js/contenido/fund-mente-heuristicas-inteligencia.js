/* ============================================================
   Fundamentos · Ciencias Cognitivas, Neurociencias y Filosofía
   Heurísticas, Metaheurísticas y la Taxonomía de la Inteligencia
   Decidir con atajos · De qué está hecha, cómo procesa y dónde ocurre
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Óptimo local vs global: escapar del valle equivocado */
  var SVG_OPTIMO =
    '<svg viewBox="0 0 560 170" role="img" aria-label="Óptimo local contra óptimo global en un paisaje de soluciones">' +
    '<path d="M20 60 Q90 150 150 90 Q210 40 280 120 Q350 170 430 60 Q480 25 540 70" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/>' +
    // pelota atrapada en local
    '<circle cx="150" cy="90" r="8" fill="var(--rojo)"/><text x="150" y="70" text-anchor="middle" font-size="10" fill="var(--rojo)">atrapado</text><text x="150" y="112" text-anchor="middle" font-size="9" fill="currentColor" opacity=".55">óptimo local</text>' +
    // óptimo global
    '<circle cx="430" cy="60" r="8" fill="var(--verde)"/><text x="430" y="40" text-anchor="middle" font-size="10" fill="var(--verde)">meta</text><text x="430" y="82" text-anchor="middle" font-size="9" fill="currentColor" opacity=".55">óptimo global</text>' +
    // flecha de salto
    '<path d="M160 86q140 -70 262 -24" stroke="var(--ambar)" fill="none" stroke-dasharray="5 4" opacity=".8" marker-end="url(#oArr)"/>' +
    '<defs><marker id="oArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="var(--ambar)"/></marker></defs>' +
    '<text x="300" y="30" text-anchor="middle" font-size="10.5" fill="var(--ambar)">aceptar un paso “peor” para escapar</text>' +
    '</svg>';

  /* SVG 2 — Tres ejes de la inteligencia */
  var SVG_EJES =
    '<svg viewBox="0 0 580 160" role="img" aria-label="Tres preguntas sobre la inteligencia">' +
    '<g text-anchor="middle" font-size="11.5">' +
    '<rect x="14" y="40" width="172" height="90" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="100" y="30" fill="var(--azul)" font-weight="600">¿De qué está hecha?</text><text x="100" y="72" font-size="10.5" fill="currentColor" opacity=".75">Fisicalismo ·</text><text x="100" y="90" font-size="10.5" fill="currentColor" opacity=".75">Esencialismo ·</text><text x="100" y="108" font-size="10.5" fill="currentColor" opacity=".75">Funcionalismo</text>' +
    '<rect x="204" y="40" width="172" height="90" rx="12" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="290" y="30" fill="var(--morado)" font-weight="600">¿Cómo procesa?</text><text x="290" y="80" font-size="10.5" fill="currentColor" opacity=".75">Computacionalismo</text><text x="290" y="98" font-size="10.5" fill="currentColor" opacity=".75">vs. Conexionismo</text>' +
    '<rect x="394" y="40" width="172" height="90" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="480" y="30" fill="var(--verde)" font-weight="600">¿Dónde ocurre?</text><text x="480" y="80" font-size="10.5" fill="currentColor" opacity=".75">Cognición corporeizada</text><text x="480" y="98" font-size="10.5" fill="currentColor" opacity=".75">· Enactivismo</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Heurísticas y la naturaleza de la inteligencia</h2>' +
      '<p>Dos preguntas que parecen de mundos distintos y son la misma: <b>¿cómo se decide bien cuando no se puede calcular todo?</b> y <b>¿qué es, en el fondo, la inteligencia?</b>. La primera nos lleva de los atajos mentales a los algoritmos que imitan hormigas; la segunda, a tres ejes filosóficos que separan a una mente de un procesador. Entenderlas es tener el mapa conceptual que sostiene a toda la IA.</p>');

    cog.epigrafe(cont, "“La mente humana opera con racionalidad limitada: busca lo suficientemente bueno, no lo perfecto.”", "Herbert Simon");

    cog.prosa(cont, '<h3>1 · Heurística: el atajo que basta</h3>' +
      '<p>Del griego <i>heuriskein</i> (“hallar”): una <b>heurística</b> es una regla práctica para encontrar soluciones <b>suficientemente buenas</b> en tiempo razonable, cuando la perfección es imposible o demasiado cara. No garantiza el óptimo; garantiza <b>avanzar</b>.</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "Psicología", titulo: "Heurística de disponibilidad",
        cuerpo: 'Juzgar la probabilidad de algo por lo <b>fácil que es recordarlo</b> (Kahneman y Tversky). Por eso tememos más a los aviones que a los autos: los accidentes aéreos se recuerdan más.' },
      { color: VE, etiqueta: "Diseño (UX)", titulo: "Heurísticas de usabilidad",
        cuerpo: 'Reglas como poner lo importante <b>arriba a la izquierda</b> (donde el ojo occidental empieza a leer). Jakob Nielsen formalizó diez de estas reglas para interfaces.' },
      { color: MO, etiqueta: "Analogía", titulo: "Buscar un libro",
        cuerpo: 'En vez de revisar toda la biblioteca, vas directo a tu <b>género favorito</b> y miras portadas. No es exhaustivo, pero funciona.' }
    ]);

    cog.prosa(cont, '<h3>2 · Metaheurística: la estrategia sobre los atajos</h3>' +
      '<p>Una <b>metaheurística</b> (“más allá de”) es una estrategia de <b>nivel superior</b>, independiente del problema, para <b>guiar y combinar</b> heurísticas dentro de un espacio de búsqueda inmenso. Si la heurística elige un libro en tu pasillo favorito, la metaheurística diseña <b>cómo explorar varios pasillos</b> antes de decidir.</p>');
    cog.grid(cont, [
      { color: AM, etiqueta: "Etología", titulo: "Colonia de Hormigas (ACO)",
        cuerpo: 'Hormigas simples dejan <b>feromonas</b>; los caminos buenos acumulan más rastro y emergen rutas óptimas globales. Se usa en logística y telecomunicaciones.' },
      { color: VE, etiqueta: "Evolución", titulo: "Algoritmos Genéticos",
        cuerpo: 'Población aleatoria → seleccionas los mejores → cruce y <b>mutación</b> → nueva generación. Úsalo, por ejemplo, para diseñar un ala aerodinámica.' },
      { color: AZ, etiqueta: "Metalurgia", titulo: "Recocido Simulado",
        cuerpo: 'Imita enfriar un metal: a “alta temperatura” <b>acepta soluciones peores</b> para escapar de puntos ciegos; al enfriar, se asienta en el óptimo global.' }
    ]);
    cog.prosa(cont, '<p>El gran problema que resuelven es la trampa del <b>óptimo local</b>: quedarte en el mejor punto de tu vecindario sin ver que hay una cima más alta más allá.</p>');
    cog.figura(cont, { color: AM, titulo: "Exploración vs. explotación",
      svg: SVG_OPTIMO,
      pie: "Un algoritmo “goloso” se queda en el primer valle bueno (<b>óptimo local</b>, rojo). Las metaheurísticas aceptan a veces un paso <b>peor</b> —la “alta temperatura” del recocido, la aleatoriedad del cruce— para saltar la colina y encontrar el <b>óptimo global</b> (verde). Ese equilibrio entre <b>explorar</b> lo nuevo y <b>explotar</b> lo conocido es el corazón del asunto." });

    cog.prosa(cont, '<h3>3 · ¿Qué es la inteligencia? Tres preguntas</h3>' +
      '<p>La filosofía de la mente ordena el debate en tres ejes. No se contradicen: iluminan ángulos distintos de lo mismo.</p>');
    cog.figura(cont, { color: MO, titulo: "Tres lentes sobre la inteligencia",
      svg: SVG_EJES,
      pie: "El <b>material</b> (¿de qué está hecha?), el <b>mecanismo</b> (¿cómo procesa?) y la <b>ubicación</b> (¿dónde ocurre?). Cada eje tiene sus posturas rivales." });
    cog.tabla(cont, {
      criterio: "Eje",
      cols: [{ nombre: "Posturas", color: AZ }, { nombre: "En una frase", color: VE }],
      filas: [
        { k: "¿De qué está hecha?", v: ["Fisicalismo · Esencialismo · Funcionalismo", "Materia / esencia intangible / la <b>función</b>, no importa el sustrato"] },
        { k: "¿Cómo procesa?", v: ["Computacionalismo · Conexionismo", "Manipular símbolos lógicos / emerger de redes que aprenden"] },
        { k: "¿Dónde ocurre?", v: ["Cognición corporeizada · Enactivismo", "Necesita un <b>cuerpo</b> / se crea en la <b>acción</b> con el entorno"] }
      ]
    });
    cog.nota(cont, 'La IA contemporánea es, filosóficamente, <b>funcionalista</b> (lo que importa es que la función se cumpla, en biología o en silicio) con arquitectura <b>conexionista</b> (redes que aprenden). Su mayor desafío teórico viene del tercer eje: la <b>cognición corporeizada</b> (Varela, Maturana, Thompson) sostiene que sin cuerpo ni acción en el mundo no hay comprensión real — justo lo que les falta a los LLMs, que viven solo en texto. Es el problema del <b>anclaje del símbolo</b>.', MO);

    cog.acordeon(cont, [
      { q: "Autores clave", a: '<b>Kahneman y Tversky</b>: heurísticas y sesgos cognitivos. <b>Jakob Nielsen</b>: heurísticas de usabilidad. <b>Putnam</b>: funcionalismo. <b>Searle</b>: la Habitación China (contra el “entendimiento” puramente simbólico). <b>Varela, Maturana y Thompson</b>: enactivismo y cognición corporeizada.' },
      { q: "Fisicalismo, esencialismo y funcionalismo", a: '<b>Fisicalismo</b>: la mente <i>es</i> procesos físicos (química en el cerebro, electricidad en el chip). <b>Esencialismo/dualismo</b>: hay una esencia o conciencia <b>más allá</b> de la materia, y por eso las máquinas no comprenderían de verdad. <b>Funcionalismo</b>: lo que define a la inteligencia es la <b>función</b> (entrada → proceso → salida), sin importar de qué esté hecho el sistema — la base filosófica de que una máquina pueda ser inteligente.' },
      { q: "Corporeización en la era de los LLMs", a: 'Un LLM aprendió el mundo <b>solo desde texto</b>, sin tocar, ver ni moverse. Para la cognición corporeizada y el <b>enactivismo</b>, eso es una limitación de fondo: el significado de “pesado”, “frío” o “cerca” se forja <b>en el cuerpo</b>, actuando. Un modelo sin cuerpo manipula la palabra sin haber vivido el concepto — de nuevo, el <i>symbol grounding problem</i>.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Elige la opción correcta y revisa el porqué.",
      reactivos: [
        { p: 'El Recocido Simulado acepta a veces una solución peor. ¿Para qué?',
          opciones: [{ t: "para escapar de óptimos locales", ok: true }, { t: "para ir más rápido" }, { t: "para ahorrar memoria" }],
          porque: "Aceptar pasos “peores” a alta temperatura permite <b>saltar</b> fuera de un óptimo local y buscar el global." },
        { p: 'La postura de que la inteligencia depende de la función, no del material, es el…',
          opciones: [{ t: "funcionalismo", ok: true }, { t: "esencialismo" }, { t: "conexionismo" }],
          porque: "El <b>funcionalismo</b> dice que basta con cumplir la función (entrada→proceso→salida), sea en biología o en silicio." },
        { p: 'Afirmar que sin un cuerpo que actúe en el mundo no hay comprensión real es propio del…',
          opciones: [{ t: "enactivismo / cognición corporeizada", ok: true }, { t: "computacionalismo" }, { t: "fisicalismo" }],
          porque: "El <b>enactivismo</b> sostiene que la cognición se crea en la acción organismo-entorno, no “dentro de la cabeza” aislada." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "Una heurística es…", op: ["Un algoritmo que garantiza la solución óptima", "Un atajo que da una solución suficientemente buena en tiempo razonable", "Un tipo de red neuronal", "Una ley física"], ok: 1, porque: "No garantiza el óptimo, pero permite avanzar: una regla práctica para soluciones “suficientemente buenas” cuando la perfección es inviable." },
    { p: "¿Qué distingue a una metaheurística de una heurística?", op: ["Es más lenta", "Es una estrategia de nivel superior que guía y combina heurísticas", "Solo sirve para videojuegos", "No usa la naturaleza"], ok: 1, porque: "La metaheurística (“más allá de”) es independiente del problema y orquesta la búsqueda; la heurística es el atajo concreto." },
    { p: "El problema del “óptimo local” consiste en…", op: ["Quedarse en el mejor punto del vecindario sin ver uno mejor más lejos", "Usar demasiada memoria", "No tener datos", "Un error de sintaxis"], ok: 0, porque: "Es la trampa de asentarse en una buena solución local y no explorar lo suficiente para hallar la óptima global." },
    { p: "La IA contemporánea es, filosóficamente, sobre todo…", op: ["Esencialista y simbólica", "Funcionalista con arquitectura conexionista", "Dualista", "Puramente corporeizada"], ok: 1, porque: "Es <b>funcionalista</b> (importa la función, no el sustrato) y <b>conexionista</b> (redes que aprenden de datos)." },
    { p: "El mayor desafío que la cognición corporeizada plantea a los LLMs es que…", op: ["Son demasiado rápidos", "Aprenden solo de texto, sin cuerpo ni acción en el mundo", "No usan electricidad", "No tienen suficientes parámetros"], ok: 1, porque: "Sin cuerpo ni acción, el significado no se “ancla” en la experiencia: es el problema del symbol grounding." }
  ];

  E.registrar({
    id: "fund-mente-heuristicas-inteligencia",
    grupo: "fund-mente",
    lenguaje: "fund",
    orden: 16,
    titulo: "Heurísticas y la naturaleza de la inteligencia",
    sub: "Decidir con atajos · De qué está hecha la mente",
    resumen: "Cómo se decide bien sin calcularlo todo (heurísticas, metaheurísticas, óptimos locales, exploración vs. explotación) y la triple taxonomía filosófica de la inteligencia: de qué está hecha, cómo procesa y dónde ocurre.",
    chips: [{ k: "Bloque", v: "Decisión y mente" }, { k: "Tipo", v: "Conceptos y taxonomía" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-mente-heuristicas-inteligencia", QUIZ)
    }
  });
})();
