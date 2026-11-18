/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Arquitecturas Cognitivas Híbridas (CLARION), CIoT y Ontologías
   La mente dual, las redes conscientes del contexto y el ser en código
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — CLARION: dos niveles, cuatro subsistemas */
  var SVG_CLARION =
    '<svg viewBox="0 0 580 210" role="img" aria-label="Arquitectura CLARION: nivel explícito e implícito en cuatro subsistemas">' +
    '<g font-size="10.5" text-anchor="middle">' +
    '<text x="24" y="60" fill="var(--azul)" font-size="10" transform="rotate(-90 24 60)">EXPLÍCITO</text>' +
    '<text x="24" y="150" fill="var(--morado)" font-size="10" transform="rotate(-90 24 150)">IMPLÍCITO</text>' +
    // cuatro columnas
    '<g>' +
    '<text x="110" y="24" fill="currentColor" opacity=".8" font-weight="600">ACS</text><text x="110" y="200" font-size="9" fill="currentColor" opacity=".55">acción</text>' +
    '<text x="240" y="24" fill="currentColor" opacity=".8" font-weight="600">NACS</text><text x="240" y="200" font-size="9" fill="currentColor" opacity=".55">memoria</text>' +
    '<text x="370" y="24" fill="currentColor" opacity=".8" font-weight="600">MS</text><text x="370" y="200" font-size="9" fill="currentColor" opacity=".55">motivación</text>' +
    '<text x="500" y="24" fill="currentColor" opacity=".8" font-weight="600">MCS</text><text x="500" y="200" font-size="9" fill="currentColor" opacity=".55">metacognición</text>' +
    '</g>' +
    // fila explícita (reglas)
    '<g>' +
    '<rect x="60" y="34" width="100" height="40" rx="8" fill="none" stroke="var(--azul)" stroke-width="1.6"/><text x="110" y="58" fill="var(--azul)">reglas SI-ENT.</text>' +
    '<rect x="190" y="34" width="100" height="40" rx="8" fill="none" stroke="var(--azul)" stroke-width="1.6"/><text x="240" y="58" fill="var(--azul)">ontologías</text>' +
    '<rect x="320" y="34" width="100" height="40" rx="8" fill="none" stroke="var(--azul)" stroke-width="1.6"/><text x="370" y="58" fill="var(--azul)">metas</text>' +
    '<rect class="cog-pulse" x="450" y="34" width="100" height="40" rx="8" fill="none" stroke="var(--azul)" stroke-width="1.6"/><text x="500" y="58" fill="var(--azul)">monitoreo</text>' +
    '</g>' +
    // fila implícita (redes)
    '<g>' +
    '<rect x="60" y="124" width="100" height="40" rx="8" fill="none" stroke="var(--morado)" stroke-width="1.6"/><text x="110" y="148" fill="var(--morado)">Q-values</text>' +
    '<rect x="190" y="124" width="100" height="40" rx="8" fill="none" stroke="var(--morado)" stroke-width="1.6"/><text x="240" y="148" fill="var(--morado)">red asociativa</text>' +
    '<rect x="320" y="124" width="100" height="40" rx="8" fill="none" stroke="var(--morado)" stroke-width="1.6"/><text x="370" y="148" fill="var(--morado)">impulsos</text>' +
    '<rect x="450" y="124" width="100" height="40" rx="8" fill="none" stroke="var(--morado)" stroke-width="1.6"/><text x="500" y="148" fill="var(--morado)">ajuste fino</text>' +
    '</g>' +
    // flechas bottom-up / top-down
    '<g stroke-width="1.5" fill="none" opacity=".7">' +
    '<path d="M110 124v-50" stroke="var(--verde)" marker-end="url(#cArrU)"/>' +
    '<path d="M130 74v50" stroke="var(--ambar)" marker-end="url(#cArrD)"/>' +
    '</g>' +
    '<defs><marker id="cArrU" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0l5 3-5 3z" fill="var(--verde)"/></marker><marker id="cArrD" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0l5 3-5 3z" fill="var(--ambar)"/></marker></defs>' +
    '<text x="76" y="105" font-size="8.5" fill="var(--verde)">bottom-up</text><text x="150" y="105" font-size="8.5" fill="var(--ambar)">top-down</text>' +
    '</g></svg>';

  /* SVG 2 — Tripleta RDF */
  var SVG_RDF =
    '<svg viewBox="0 0 520 110" role="img" aria-label="Tripleta sujeto predicado objeto">' +
    '<defs><marker id="tArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".6"/></marker></defs>' +
    '<g text-anchor="middle" font-size="12">' +
    '<circle cx="80" cy="55" r="42" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="80" y="52" fill="var(--azul)">Sensor_1</text><text x="80" y="70" font-size="9" fill="currentColor" opacity=".55">sujeto</text>' +
    '<line x1="122" y1="55" x2="200" y2="55" stroke="currentColor" opacity=".55" marker-end="url(#tArr)"/><text x="161" y="44" font-size="10.5" fill="var(--morado)">mide</text><text x="161" y="72" font-size="9" fill="currentColor" opacity=".5">predicado</text>' +
    '<circle cx="250" cy="55" r="42" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="250" y="52" fill="var(--verde)">Temp.</text><text x="250" y="70" font-size="9" fill="currentColor" opacity=".55">objeto</text>' +
    '<text x="400" y="42" fill="currentColor" opacity=".75" font-size="11">El motor de inferencia deduce:</text>' +
    '<text x="400" y="62" fill="var(--ambar)" font-size="10.5">“si Temp &gt; 38 → Fiebre”</text>' +
    '<text x="400" y="80" fill="currentColor" opacity=".55" font-size="9.5">hechos nuevos, sin programarlos</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Mentes híbridas, redes conscientes y el ser en código</h2>' +
      '<p>Un mismo principio recorre tres escalas muy distintas: una <b>mente</b> que combina intuición y reglas (la arquitectura <b>CLARION</b>), una <b>red</b> que percibe y razona sobre su entorno (el <b>CIoT</b>) y la <b>representación formal de la realidad</b> en código (las <b>ontologías</b>). La idea común: lo simbólico y lo conexionista no son rivales — son <b>dos capas</b> que, juntas, piensan mejor.</p>');

    cog.epigrafe(cont, "“Una ontología es una especificación explícita de una conceptualización.”", "Tom Gruber, 1993");

    cog.prosa(cont, '<h3>1 · CLARION: la arquitectura dual de la mente</h3>' +
      '<p><b>CLARION</b> (de Ron Sun) modela la mente humana con <b>dos niveles</b>: uno <b>implícito/conexionista</b> (redes neuronales: rápido, reactivo, opaco a la introspección) y uno <b>explícito/simbólico</b> (reglas y ontologías: lento, consciente, flexible). Son el Sistema 1 y el Sistema 2 hechos arquitectura.</p>');
    cog.figura(cont, { color: MO, titulo: "Dos niveles, cuatro subsistemas",
      svg: SVG_CLARION,
      pie: "Cada subsistema tiene su capa implícita y su capa explícita. <b>ACS</b>: acción y decisión. <b>NACS</b>: memoria declarativa. <b>MS</b>: motivación (impulsos → metas). <b>MCS</b>: metacognición, el control ejecutivo. El aprendizaje <b>bottom-up</b> extrae reglas de la red; el <b>top-down</b> automatiza reglas conscientes hacia la red." });
    cog.nota(cont, 'El <b>MCS</b> (subsistema metacognitivo) explica un fenómeno muy humano: la <b>asfixia bajo presión</b> (<i>choking under pressure</i>). Cuando una tarea ya está automatizada (vive en la capa implícita) y el MCS, nervioso, <b>sobrepondera la capa explícita</b> —“piensa cada paso”—, el rendimiento se desploma. Pensar de más rompe lo que el cuerpo ya sabía.', AM);

    cog.acordeon(cont, [
      { q: "El algoritmo RER: cómo nacen las reglas desde la red", a: '<b>Rule Extraction Refinement</b>: la red implícita aprende por ensayo y error (refuerzo). Cuando una acción funciona consistentemente, CLARION <b>extrae</b> una regla simbólica que la resume; si la regla sigue acertando, la <b>generaliza</b> (la hace más amplia); si empieza a fallar, la <b>especializa</b> (le añade condiciones). Así lo intuitivo se vuelve conocimiento explícito y verbalizable — como cuando por fin puedes <i>explicar</i> algo que antes solo “te salía”.' }
    ], "Profundiza: CLARION");

    cog.prosa(cont, '<h3>2 · Del Internet Ubicuo al CIoT</h3>' +
      '<p>En 1991, <b>Mark Weiser</b> imaginó la <b>computación ubicua</b>: la tecnología más profunda es la <b>invisible</b>, tejida en el entorno hasta desaparecer. El <b>CIoT</b> (<i>Cognitive Internet of Things</i>) le añade una mente: sensores por todas partes + modelos híbridos que convierten datos brutos en <b>significado</b>.</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "La infraestructura", titulo: "Internet Ubicuo",
        cuerpo: 'Sensores y actuadores (IoT), arquitecturas distribuidas (<i>cloud</i> + <b>edge computing</b>), mallas de servicios y microservicios para latencia casi nula.' },
      { color: MO, etiqueta: "La mente", titulo: "Internet Cognitivo",
        cuerpo: 'Capa <b>conexionista</b> (ML/DL detecta anomalías y predice) + capa <b>simbólica</b> (ontologías y grafos razonan). El mismo dúo de CLARION, a escala de red.' },
      { color: VE, etiqueta: "La decisión", titulo: "CIoT en acción",
        cuerpo: 'Una red <b>consciente del contexto</b> que usa <b>heurísticas y metaheurísticas</b> para decidir en tiempo real (ej. redistribuir carga energética entre nodos <i>edge</i>).' }
    ]);

    cog.prosa(cont, '<h3>3 · Ingeniería de contexto con ontologías</h3>' +
      '<p>Para que una máquina <b>razone</b> sobre el mundo, el mundo debe estar modelado en una estructura semántica formal. <b>Tim Berners-Lee</b> (2001) propuso la <b>Web Semántica</b> con los estándares <b>RDF</b> y <b>OWL</b>.</p>');
    cog.figura(cont, { color: VE, titulo: "RDF: el mundo como tripletas",
      svg: SVG_RDF,
      pie: "Todo hecho se expresa como <b>Sujeto → Predicado → Objeto</b> (“Sensor_1 mide Temperatura”). Un <b>motor de inferencia</b> aplica <b>axiomas</b> (reglas lógicas) y deduce hechos nuevos que nadie programó explícitamente. Eso es razonamiento deductivo <i>white-box</i>." });
    cog.tabla(cont, {
      criterio: "Criterio",
      cols: [{ nombre: "Ontologías", color: VE }, { nombre: "Deep Learning", color: MO }, { nombre: "SQL", color: AZ }],
      filas: [
        { k: "Caja", v: ["<b>White-box</b>", "<b>Black-box</b>", "Transparente"] },
        { k: "Razonamiento", v: ["Deductivo", "Inductivo/estadístico", "Solo consultas"] },
        { k: "Explicabilidad", v: ["Total, trazable", "Casi nula", "Media"] },
        { k: "Interoperabilidad", v: ["Alta (OWL)", "Baja", "Media"] }
      ]
    });
    cog.nota(cont, 'Hitos y autores: <b>Weiser</b> (1991, ubicua), <b>Berners-Lee</b> (2001, Web Semántica), <b>Strang y Linnhoff-Popien</b> (2004, demostraron la superioridad de las ontologías sobre modelos clave-valor en sistemas ubicuos) y <b>Harry Chen</b> (SOUPA, una ontología estándar). El ciclo: adquirir contexto → poblar la ontología → razonar con el motor de inferencia → reaccionar en microservicios. Aplicaciones reales: <b>AAL</b> (cuidado inteligente de adultos mayores) y <b>Smart Cities</b>.', VE);

    cog.prosa(cont, '<h3>4 · Ontología: de la metafísica al código</h3>' +
      '<p>La palabra viene de la <b>filosofía</b>: la rama de la metafísica que estudia <i>qué existe</i>. No confundir con su hermana, la <b>epistemología</b>.</p>');
    cog.grid(cont, [
      { color: MO, etiqueta: "¿Qué existe?", titulo: "Ontología",
        cuerpo: 'La pregunta por <b>el ser</b>: qué entidades hay en la realidad para ser conocidas. En computación: <b>Clases</b>, <b>Propiedades</b>, <b>Instancias</b> y <b>Axiomas</b> en OWL.' },
      { color: AZ, etiqueta: "¿Cómo lo sabemos?", titulo: "Epistemología",
        cuerpo: 'La pregunta por <b>el conocer</b>: cómo validamos lo que creemos saber. Es el filtro de la verdad, no el inventario del ser.' }
    ]);
    cog.nota(cont, 'El puente es hermoso: una pregunta metafísica de 2500 años —“¿qué categorías existen?”— fue <b>formalizada en código</b> (OWL/RDF) por Gruber y Berners-Lee para que las máquinas compartan un significado consensuado. Y la <b>explicabilidad</b> <i>white-box</i> de las ontologías resuelve la opacidad de las redes: por eso importa tanto en el diseño de sistemas de confianza (AAL, entornos ubicuos). Ahí la <b>Esfera 3</b>: la <i>Calm Technology</i> de Weiser es diseño de interfaces que <b>no gritan</b>, que informan sin abrumar.', AZ);

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Elige la opción correcta y revisa el porqué.",
      reactivos: [
        { p: 'En CLARION, la capa rápida, reactiva y opaca a la introspección es la…',
          opciones: [{ t: "implícita (conexionista)", ok: true }, { t: "explícita (simbólica)" }, { t: "metacognitiva" }],
          porque: "El nivel <b>implícito</b> es la red neuronal: rápida, paralela y difícil de verbalizar. El explícito son reglas conscientes." },
        { p: 'La pregunta “¿qué entidades existen en la realidad?” corresponde a la…',
          opciones: [{ t: "ontología", ok: true }, { t: "epistemología" }, { t: "heurística" }],
          porque: "La <b>ontología</b> estudia el ser y lo que existe; la epistemología estudia cómo llegamos a conocerlo." },
        { p: 'Comparadas con el deep learning, las ontologías destacan por ser…',
          opciones: [{ t: "white-box: trazables y explicables", ok: true }, { t: "black-box: opacas" }, { t: "incapaces de razonar" }],
          porque: "Las ontologías razonan de forma <b>deductiva y trazable</b> (white-box), justo donde el deep learning es opaco (black-box)." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "La arquitectura CLARION modela la mente con…", op: ["Una sola red neuronal", "Dos niveles: implícito/conexionista y explícito/simbólico", "Solo reglas lógicas", "Puro aprendizaje por refuerzo"], ok: 1, porque: "CLARION (Ron Sun) es <b>híbrida</b>: combina una capa implícita (redes) y una explícita (reglas/ontologías), como Sistema 1 y Sistema 2." },
    { p: "El fenómeno de “asfixia bajo presión” en CLARION ocurre cuando…", op: ["La red implícita falla", "El MCS sobrepondera la capa explícita en una tarea ya automatizada", "Se agota la memoria", "Faltan sensores"], ok: 1, porque: "El subsistema metacognitivo (MCS) fuerza el control explícito sobre algo que ya era automático, y el rendimiento cae." },
    { p: "En RDF, un hecho se representa como…", op: ["Una tabla", "Una tripleta Sujeto-Predicado-Objeto", "Un peso numérico", "Una imagen"], ok: 1, porque: "RDF modela el conocimiento en tripletas (Sujeto → Predicado → Objeto), y un motor de inferencia deduce hechos nuevos con axiomas." },
    { p: "Frente al deep learning, una ontología es…", op: ["Black-box, opaca", "White-box: razonamiento deductivo y explicabilidad total", "Más rápida siempre", "Incapaz de interoperar"], ok: 1, porque: "Las ontologías son <b>white-box</b>: cada deducción es trazable, lo opuesto a la opacidad del deep learning." },
    { p: "La ontología (filosofía) se distingue de la epistemología en que…", op: ["Son sinónimos", "La ontología pregunta qué existe; la epistemología, cómo lo conocemos", "La ontología es sobre redes neuronales", "La epistemología no existe en computación"], ok: 1, porque: "Ontología = el ser (qué existe); epistemología = el conocer (cómo validamos lo que sabemos)." }
  ];

  E.registrar({
    id: "fund-computo-clarion-ciot-ontologias",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 13,
    titulo: "Mentes híbridas, CIoT y Ontologías",
    sub: "CLARION, el Internet consciente del contexto y el ser en código",
    resumen: "La arquitectura cognitiva dual CLARION (implícito/explícito, los 4 subsistemas, RER, el choking under pressure), el Internet Cognitivo (CIoT) y las ontologías como puente entre la metafísica (qué existe) y el código (RDF/OWL).",
    chips: [{ k: "Bloque", v: "Cognición y sistemas" }, { k: "Tipo", v: "Arquitecturas híbridas" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-clarion-ciot-ontologias", QUIZ)
    }
  });
})();
