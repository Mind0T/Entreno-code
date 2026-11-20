/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Los Padres Fundadores de la IA (1936–1986)
   Dartmouth, la gran bifurcación simbólico/conexionista, ELIZA
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — La gran bifurcación: lógica vs. neurona */
  var SVG_BIFUR =
    '<svg viewBox="0 0 620 220" role="img" aria-label="La gran bifurcación entre IA simbólica y conexionista">' +
    '<defs><marker id="bArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<g text-anchor="middle" font-size="11.5">' +
    '<rect x="236" y="12" width="148" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".55"/><text x="310" y="30" fill="currentColor" opacity=".85" font-size="12.5">Dartmouth 1956</text><text x="310" y="45" font-size="9.5" fill="currentColor" opacity=".6">nace el término “IA”</text>' +
    '<path d="M250 52q-120 24-170 60" stroke="var(--azul)" fill="none" opacity=".55" marker-end="url(#bArr)"/>' +
    '<path d="M370 52q120 24 170 60" stroke="var(--verde)" fill="none" opacity=".55" marker-end="url(#bArr)"/>' +
    // simbólica
    '<rect x="14" y="116" width="200" height="90" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="114" y="104" fill="var(--azul)" font-size="12.5" font-weight="600">SIMBÓLICA (lógica)</text>' +
    '<text x="114" y="138" fill="currentColor" opacity=".75" font-size="10.5">Turing · Simon &amp; Newell</text>' +
    '<text x="114" y="156" fill="currentColor" opacity=".75" font-size="10.5">McCarthy (LISP) · Minsky</text>' +
    '<text x="114" y="182" fill="currentColor" opacity=".55" font-size="10">reglas explícitas, símbolos</text>' +
    // conexionista
    '<rect x="406" y="116" width="200" height="90" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="506" y="104" fill="var(--verde)" font-size="12.5" font-weight="600">CONEXIONISTA (neurona)</text>' +
    '<text x="506" y="138" fill="currentColor" opacity=".75" font-size="10.5">McCulloch &amp; Pitts · Hebb</text>' +
    '<text x="506" y="156" fill="currentColor" opacity=".75" font-size="10.5">Rosenblatt (Perceptrón)</text>' +
    '<text x="506" y="182" fill="currentColor" opacity=".55" font-size="10">pesos que aprenden</text>' +
    // choque 1969
    '<path d="M214 170h180" stroke="var(--rojo)" stroke-width="1.6" stroke-dasharray="4 4" opacity=".7"/><text x="310" y="164" fill="var(--rojo)" font-size="10">Perceptrons (1969) → 1er Invierno</text>' +
    '</g></svg>';

  /* SVG 2 — El problema XOR: una raya recta no basta */
  var SVG_XOR =
    '<svg viewBox="0 0 440 180" role="img" aria-label="El problema XOR no es separable con una sola recta">' +
    '<g font-size="11">' +
    // ejes
    '<line x1="40" y1="150" x2="200" y2="150" stroke="currentColor" opacity=".4"/><line x1="40" y1="150" x2="40" y2="20" stroke="currentColor" opacity=".4"/>' +
    // puntos: (0,0)&(1,1) clase A (verde), (0,1)&(1,0) clase B (ambar)
    '<circle cx="60" cy="150" r="7" fill="var(--verde)"/><circle cx="180" cy="30" r="7" fill="var(--verde)"/>' +
    '<circle cx="60" cy="30" r="7" fill="var(--ambar)"/><circle cx="180" cy="150" r="7" fill="var(--ambar)"/>' +
    '<text x="120" y="172" text-anchor="middle" fill="currentColor" opacity=".6">XOR: ninguna recta los separa</text>' +
    // intento de recta fallida
    '<line x1="40" y1="40" x2="200" y2="150" stroke="var(--rojo)" stroke-width="1.6" stroke-dasharray="5 4" opacity=".7"/>' +
    // solución con capa oculta
    '<text x="330" y="26" text-anchor="middle" fill="var(--morado)" font-size="12" font-weight="600">Con capa oculta</text>' +
    '<g stroke="var(--morado)" fill="none" opacity=".8" stroke-width="1.6"><circle cx="270" cy="70" r="8"/><circle cx="270" cy="120" r="8"/><circle cx="330" cy="80" r="8"/><circle cx="330" cy="110" r="8"/><circle cx="390" cy="95" r="8"/><path d="M278 70l44 8M278 70l44 36M278 120l44-36M278 120l44 2M338 80l44 12M338 110l44-12"/></g>' +
    '<text x="330" y="150" text-anchor="middle" fill="currentColor" opacity=".6" font-size="10">dos capas → frontera curva</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Los Padres Fundadores de la IA</h2>' +
      '<p>Entre 1936 y 1986, un puñado de matemáticos, ingenieros y psicólogos convirtió una intuición —“¿puede una máquina pensar?”— en una disciplina. En el camino plantaron las dos grandes semillas que aún hoy pelean por la IA: la que cree que pensar es <b>manipular símbolos lógicos</b> y la que cree que pensar es lo que emerge de <b>redes de neuronas</b>. Entender a estos nueve pioneros es entender por qué la IA es como es.</p>');

    cog.epigrafe(cont, "“Conjeturamos que todo aspecto del aprendizaje o la inteligencia puede, en principio, describirse con tanta precisión que una máquina lo simule.”", "Propuesta de Dartmouth, 1956");

    cog.prosa(cont, '<h3>1 · El Big Bang: Dartmouth 1956</h3>' +
      '<p>En el verano de 1956, el <b>Dartmouth Summer Research Project</b> acuñó oficialmente el término <b>“Inteligencia Artificial”</b> y fijó la agenda de la disciplina. Un matiz importante: las <b>redes neuronales</b> como idea teórica son <b>anteriores</b> al término “machine learning”. El modelo matemático de neurona de <b>McCulloch y Pitts</b> es de 1943; el simulador físico <b>SNARC</b>, de 1951; y “Machine Learning” lo acuñó Arthur Samuel hasta 1959. Hoy las redes neuronales se entienden como una <b>rama</b> dentro del machine learning.</p>');

    cog.prosa(cont, '<h3>2 · La gran bifurcación</h3>' +
      '<p>Casi desde el inicio, la IA se partió en dos escuelas rivales. Esta tensión es el esqueleto de toda su historia.</p>');
    cog.figura(cont, { color: MO, titulo: "Dos caminos desde un mismo origen",
      svg: SVG_BIFUR,
      pie: "La rama <b>simbólica</b> (Turing, Simon, McCarthy, Minsky) programa reglas lógicas explícitas. La <b>conexionista</b> (McCulloch-Pitts, Hebb, Rosenblatt) deja que pesos numéricos aprendan. En 1969, el libro <i>Perceptrons</i> de Minsky y Papert hundió temporalmente a la rama conexionista: el <b>Primer Invierno de la IA</b>." });

    cog.prosa(cont, '<h3>3 · Los nueve pioneros</h3>' +
      '<p>Cada uno aportó una pieza distinta —la lógica, el hardware, la neurona, el lenguaje, la ética—. Conócelos de cerca:</p>');

    cog.persona(cont, { slug: "alan-turing", nombre: "Alan Turing", color: AZ, etiqueta: "Lógica y computación", meta: "1912–1954 · Matemático y criptógrafo británico", parrafos: [
      'Matemático, lógico y criptógrafo formado en el <b>King\'s College</b> de Cambridge y doctorado en Princeton bajo la tutela de Alonzo Church. En 1936, con apenas 24 años, publicó <i>“On Computable Numbers”</i>, donde definió un dispositivo abstracto —la <b>máquina universal de Turing</b>— capaz de ejecutar cualquier algoritmo. Ese artículo fundó la <b>teoría de la computación</b> y demostró, de paso, que hay problemas que ninguna máquina puede resolver.',
      'Durante la Segunda Guerra Mundial lideró en <b>Bletchley Park</b> el descifrado de la máquina alemana <b>Enigma</b>, diseñando la electromecánica <i>Bombe</i>; se estima que ese trabajo acortó la guerra en años. En 1950, su ensayo <i>“Computing Machinery and Intelligence”</i> propuso el <b>Juego de la Imitación</b> —hoy el <b>Test de Turing</b>— como forma pragmática de preguntar si una máquina “piensa”, esquivando definiciones metafísicas.',
      'En 1948, su informe <i>“Intelligent Machinery”</i> ya imaginaba <b>máquinas no organizadas</b> que aprenden ajustándose con la experiencia, una intuición precursora de las redes neuronales. Procesado en 1952 por su homosexualidad —entonces delito en el Reino Unido— murió dos años después; el Estado británico le ofreció un perdón oficial en 2013. El mayor galardón de la computación, el <b>Premio Turing</b>, lleva su nombre.'
    ] });

    cog.persona(cont, { slug: "john-mccarthy", nombre: "John McCarthy", color: AZ, etiqueta: "IA simbólica", meta: "1927–2011 · Informático estadounidense", parrafos: [
      'Matemático formado en Caltech y Princeton, fue quien <b>acuñó el término “Inteligencia Artificial”</b> al proponer, en 1955, el taller de Dartmouth. Defendía que la inteligencia podía replicarse mediante <b>lógica formal</b> y conocimiento declarativo: enseñarle a la máquina <i>qué</i> es verdad y dejar que razone, en lugar de programar cada paso.',
      'En 1958 creó <b>LISP</b>, el segundo lenguaje de alto nivel más antiguo aún en uso y el idioma natal de la IA clásica, pensado para manipular símbolos y listas. De ahí salieron ideas que hoy damos por sentadas: la <b>recolección de basura</b> (<i>garbage collection</i>) y el <b>tiempo compartido</b> (<i>time-sharing</i>), que permitía a varias personas usar una misma computadora a la vez —antecedente directo del cómputo en la nube—.',
      'Fundó los laboratorios de IA del <b>MIT</b> y de <b>Stanford (SAIL)</b>, y propuso el programa <i>Advice Taker</i>, un sistema que razonaría con sentido común. Recibió el <b>Premio Turing</b> en 1971. Su apuesta —la mente como manipuladora de símbolos lógicos— definió el paradigma dominante de la IA durante tres décadas.'
    ] });

    cog.persona(cont, { slug: "marvin-minsky", nombre: "Marvin Minsky", color: MO, etiqueta: "Puente simbólico–conexionista", meta: "1927–2016 · Científico cognitivo (MIT)", parrafos: [
      'Pionero que empezó, paradójicamente, del lado conexionista: en 1951 construyó con Dean Edmonds el <b>SNARC</b>, el primer simulador físico de una red neuronal (40 neuronas hechas con tubos de vacío). Cofundó el laboratorio de IA del MIT y fue una de las mentes más influyentes del campo durante medio siglo.',
      'Su teoría de los <b>Marcos</b> (<i>Frames</i>, 1974) propuso que el conocimiento se organiza en estructuras con “huecos” que se rellenan según el contexto —una idea que anticipó la representación del conocimiento moderna—. En <i>La Sociedad de la Mente</i> (1986) planteó que la inteligencia no es un mecanismo único, sino la interacción de muchos agentes simples sin inteligencia propia.',
      'En 1969, junto a Seymour Papert, publicó <i>Perceptrons</i>, que demostró con rigor matemático las limitaciones del perceptrón de una sola capa (no podía resolver el <b>XOR</b>). El libro redirigió el financiamiento hacia la IA simbólica y contribuyó al <b>Primer Invierno de la IA</b>. Recibió el Premio Turing en 1969 y hasta asesoró el diseño de HAL 9000 en <i>2001: Odisea del espacio</i>.'
    ] });

    cog.persona(cont, { slug: "claude-shannon", nombre: "Claude Shannon", color: AM, etiqueta: "Teoría de la información", meta: "1916–2001 · Matemático e ingeniero (EE. UU.)", parrafos: [
      'En su tesis de maestría de 1937 —llamada “la tesis más importante del siglo”— demostró que los <b>circuitos eléctricos de conmutación</b> podían implementar cualquier operación del <b>álgebra de Boole</b>. Con eso dio el plano de todo el <b>hardware digital</b>: los unos y ceros del mundo moderno descienden de esa idea.',
      'En 1948 publicó <i>“Una teoría matemática de la comunicación”</i>, fundando la <b>Teoría de la Información</b>: definió cómo medir, comprimir y transmitir información sin error, y popularizó el <b>bit</b> como su unidad. Es la base de todo lo que hoy llamamos telecomunicaciones, compresión de datos y códigos de corrección de errores.',
      'Participó en el taller de Dartmouth y jugueteó con la IA temprana: construyó <b>Theseus</b>, un ratón mecánico que aprendía a salir de un laberinto, y escribió sobre ajedrez por computadora, estimando el gigantesco número de partidas posibles (el <b>Número de Shannon</b>, ~10<sup>120</sup>). Fue tan brillante como lúdico, famoso por recorrer los pasillos de Bell Labs en monociclo.'
    ] });

    cog.persona(cont, { slug: "nathaniel-rochester", nombre: "Nathaniel Rochester", color: AM, etiqueta: "Hardware y primeras NN", meta: "1919–2001 · Ingeniero (IBM)", parrafos: [
      'Ingeniero de IBM, fue el <b>arquitecto principal de la IBM 701</b> (1952), la primera computadora comercial de propósito general de la compañía, y escribió para ella el <b>primer lenguaje ensamblador</b> simbólico, un paso clave para que programar no fuera traducir números a mano.',
      'Fue uno de los cuatro organizadores del taller de Dartmouth de 1956 —el único con un pie firme en la industria—. En una IBM 704 dirigió, hacia 1955–56, una de las <b>primeras simulaciones masivas de redes neuronales</b> (hasta 512 neuronas), inspirándose directamente en las ideas del neuropsicólogo Donald Hebb sobre cómo las conexiones se refuerzan con el uso.',
      'Su carrera ejemplifica un puente poco contado: el de la <b>infraestructura real</b> que hizo posibles los experimentos de IA. Sin máquinas como la 701 y la 704, y sin quien supiera construirlas y programarlas, las ideas de Turing o McCarthy habrían quedado en el papel. Impulsó además el grupo de investigación en IA dentro de IBM.'
    ] });

    cog.persona(cont, { slug: "frank-rosenblatt", nombre: "Frank Rosenblatt", color: VE, etiqueta: "Conexionismo", meta: "1928–1971 · Psicólogo (Cornell)", parrafos: [
      'Psicólogo de formación, fue el gran defensor temprano del enfoque <b>conexionista</b>: la idea de que la inteligencia emerge de redes de unidades simples, inspiradas en las neuronas, que aprenden de la experiencia. Es, en buena medida, el <b>abuelo intelectual del deep learning</b>.',
      'En 1957 formuló el <b>Perceptrón</b>, un algoritmo que ajustaba automáticamente sus <b>pesos</b> para aprender a clasificar patrones, y en 1958 lo materializó en el hardware <b>Mark I Perceptron</b>, con una cámara de 400 fotocélulas. Por primera vez una máquina “aprendía” a reconocer formas sin que un humano programara reglas explícitas.',
      'Su rivalidad intelectual con Minsky marcó la época: <i>Perceptrons</i> (1969) expuso los límites de su modelo de una sola capa y hundió el financiamiento de su línea de trabajo. Rosenblatt murió joven, en 1971, sin ver cómo la <b>retropropagación</b> y las capas ocultas rescatarían —y harían triunfar— justo su apuesta décadas después.'
    ] });

    cog.persona(cont, { slug: "arthur-samuel", nombre: "Arthur Samuel", color: VE, etiqueta: "Aprendizaje automático", meta: "1901–1990 · Ingeniero (IBM, Stanford)", parrafos: [
      'Ingeniero eléctrico que acuñó, en 1959, el término <b>“Machine Learning”</b>, definiéndolo como el campo que da a las computadoras la capacidad de aprender <b>sin ser programadas explícitamente</b> para cada tarea. Esa frase sigue siendo, sesenta años después, la mejor definición de una disciplina entera.',
      'Lo demostró con un <b>programa de damas</b> que corría en la IBM 701 y que <b>mejoraba jugando contra sí mismo</b>, ajustando su evaluación de las posiciones con la experiencia. En 1962 llegó a vencer a un fuerte jugador humano: una de las primeras pruebas tangibles de que una máquina podía superar a su creador en una tarea concreta.',
      'Popularizó técnicas de búsqueda como <b>Minimax</b> y la <b>poda alfa-beta</b>, esenciales para los programas de juegos, y es considerado un precursor del <b>aprendizaje por refuerzo</b>, el paradigma que hoy entrena a los sistemas que dominan el Go o alinean a los grandes modelos de lenguaje.'
    ] });

    cog.persona(cont, { slug: "joseph-weizenbaum", nombre: "Joseph Weizenbaum", color: RO, etiqueta: "Ética de la IA", meta: "1923–2008 · Informático (MIT)", parrafos: [
      'Nacido en Berlín, huyó del nazismo con su familia en 1936 y acabó siendo profesor en el MIT. Entre 1964 y 1966 creó <b>ELIZA</b>, el <b>primer chatbot</b> de la historia: su guion más famoso, <i>DOCTOR</i>, imitaba a un psicoterapeuta repitiendo las frases del usuario en forma de pregunta, mediante simple reconocimiento de patrones y <b>sin comprender nada</b>.',
      'Lo que descubrió lo alarmó: personas sensatas —incluida su secretaria— se abrían emocionalmente con ELIZA y le atribuían comprensión real. A ese fenómeno —nuestra tendencia a proyectar mente y empatía en una máquina que solo procesa texto— se le llama hoy <b>Efecto ELIZA</b>, y es más relevante que nunca con los asistentes conversacionales modernos.',
      'Ese hallazgo lo convirtió en el <b>primer gran crítico ético</b> de la IA. En <i>Computer Power and Human Reason</i> (1976) distinguió entre <b>decidir</b> —un cálculo que una máquina puede hacer— y <b>elegir</b>, un acto de juicio moral que, sostenía, debe seguir siendo humano. Su advertencia sobre delegar decisiones morales a las máquinas resuena directamente en los debates actuales.'
    ] });

    cog.persona(cont, { slug: "herbert-simon", nombre: "Herbert Simon", color: AZ, etiqueta: "IA simbólica · Cognición", meta: "1916–2001 · Polímata (Carnegie Mellon)", parrafos: [
      'Uno de los grandes polímatas del siglo XX: hizo aportes fundamentales a la economía, la psicología cognitiva, la administración y la IA. Es el raro caso de alguien que ganó tanto el <b>Premio Turing</b> (1975) como el <b>Nobel de Economía</b> (1978), por mostrar que las personas no optimizan como robots perfectos.',
      'Su concepto de <b>racionalidad limitada</b> y de <i>satisficing</i> (conformarse con una solución “suficientemente buena” en vez de la óptima) describe cómo decidimos de verdad, bajo tiempo y datos limitados. Esa idea —que pensar es buscar atajos razonables en un espacio enorme— se tradujo directamente en algoritmos de IA.',
      'Junto a Allen Newell y Cliff Shaw creó el <b>Logic Theorist</b> (1956), considerado el primer programa de IA, capaz de demostrar teoremas de matemática, y luego el <b>General Problem Solver (GPS)</b>, que formalizó el uso de <b>heurísticas</b>. Es uno de los pilares de la IA simbólica y un puente genuino entre cómo piensa la mente humana y cómo se diseña una máquina que razona.'
    ] });

    cog.prosa(cont, '<h3>4 · El problema XOR: por qué cayó el Perceptrón</h3>' +
      '<p>En 1969, Minsky y Papert demostraron que un perceptrón de <b>una sola capa</b> no puede resolver el <b>XOR</b> (“o exclusivo”): no existe una recta que separe sus clases. El golpe fue tan duro que cortó el financiamiento del conexionismo durante años.</p>');
    cog.figura(cont, { color: RO, titulo: "Una recta no basta; una capa oculta sí",
      svg: SVG_XOR,
      pie: "En el XOR, los puntos de cada clase están en esquinas opuestas: <b>ninguna línea recta</b> los separa (izquierda). La solución llegó después: añadir una <b>capa oculta</b> y entrenarla con <b>retropropagación</b> dobla la frontera y resuelve el problema (derecha). Lo que Minsky vio como muro, el deep learning lo volvió trampolín." });

    cog.acordeon(cont, [
      { q: "McCulloch-Pitts y la regla de Hebb", a: 'McCulloch y Pitts (1943) tradujeron la neurona a una <b>puerta lógica</b>: suma entradas y dispara si pasa un umbral. Hebb (1949) añadió el aprendizaje: “neuronas que se disparan juntas, se conectan juntas” — la base biológica de ajustar <b>pesos sinápticos</b>.' },
      { q: "Minimax y la explosión combinatoria", a: 'En juegos como las damas o el ajedrez, los futuros posibles explotan (el <b>Número de Shannon</b> estima 10^120 partidas de ajedrez). <b>Minimax</b> asume que el rival juega óptimo y elige el mejor peor-caso; la <b>poda alfa-beta</b> descarta ramas que ya no pueden mejorar, recortando el árbol de búsqueda.' },
      { q: "Weizenbaum: decidir no es elegir", a: 'ELIZA imitaba a un psicoterapeuta con simple reconocimiento de patrones, y la gente le confiaba sus secretos (el <b>Efecto ELIZA</b>). Weizenbaum se alarmó: una máquina puede <b>calcular</b> una decisión, pero <b>elegir</b> con juicio moral es humano. Su advertencia de 1976 resuena hoy con los LLMs y las interfaces antropomórficas.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "¿Simbólico o conexionista? Elige y revisa el porqué.",
      reactivos: [
        { p: 'El LISP de McCarthy y el GPS de Simon pertenecen a la rama…',
          opciones: [{ t: "simbólica (reglas y lógica)", ok: true }, { t: "conexionista (pesos)" }, { t: "ninguna, son hardware" }],
          porque: "Ambos manipulan <b>símbolos y reglas lógicas explícitas</b>: son el corazón de la IA <b>simbólica</b>." },
        { p: 'El Perceptrón de Rosenblatt y el SNARC de Minsky son de la rama…',
          opciones: [{ t: "conexionista (redes y pesos)", ok: true }, { t: "simbólica" }, { t: "cuántica" }],
          porque: "Son <b>redes neuronales</b> que aprenden ajustando pesos: rama <b>conexionista</b>, aunque Minsky luego atacó al perceptrón." },
        { p: '¿Qué detonó el “Primer Invierno de la IA”?',
          opciones: [{ t: "El libro Perceptrons (1969) mostró el límite del perceptrón monocapa", ok: true }, { t: "La invención de LISP" }, { t: "El Test de Turing" }],
          porque: "Minsky y Papert probaron que un perceptrón de una capa no resuelve el XOR; el financiamiento conexionista se desplomó." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Historia de la inteligencia artificial", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Historia_de_la_inteligencia_artificial", lang: "es" },
    { t: "¿Quién inventó la inteligencia artificial?", fuente: "National Geographic en español", url: "https://www.nationalgeographicla.com/ciencia/2023/03/quien-invento-la-inteligencia-artificial", lang: "es" },
    { t: "The Turing Test", fuente: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/turing-test/", lang: "en" },
    { t: "Dartmouth workshop (1956)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dartmouth_workshop", lang: "en" },
    { t: "ELIZA", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/ELIZA", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Qué ocurrió en Dartmouth en 1956?", op: ["Se construyó la primera computadora", "Se acuñó el término “Inteligencia Artificial” y se fijó su agenda", "Se inventó el Perceptrón", "Nació internet"], ok: 1, porque: "El Dartmouth Summer Research Project (1956) acuñó oficialmente el término <b>IA</b> y estableció la agenda de investigación de la disciplina." },
    { p: "¿Cuál es la “gran bifurcación” de la IA?", op: ["Hardware vs. software", "IA simbólica (reglas) vs. conexionista (redes neuronales)", "Académica vs. industrial", "Supervisada vs. no supervisada"], ok: 1, porque: "La IA se partió entre la escuela <b>simbólica</b> (manipular símbolos con lógica) y la <b>conexionista</b> (pesos que aprenden en redes neuronales)." },
    { p: "El libro <i>Perceptrons</i> (1969) de Minsky y Papert…", op: ["Fundó el deep learning", "Mostró que el perceptrón monocapa no resuelve el XOR y frenó el conexionismo", "Inventó la retropropagación", "Creó ELIZA"], ok: 1, porque: "Demostró el límite del perceptrón de una capa (el XOR) y detonó el <b>Primer Invierno de la IA</b>, hundiendo el financiamiento conexionista." },
    { p: "¿Quién creó ELIZA y por qué es históricamente clave?", op: ["Turing; fue la primera computadora", "Weizenbaum; primer chatbot y origen de la ética de la IA", "McCarthy; inventó LISP", "Samuel; jugaba damas"], ok: 1, porque: "Weizenbaum creó ELIZA (1966), reveló el <b>Efecto ELIZA</b> y fundó la ética de la IA distinguiendo decidir (cálculo) de elegir (juicio moral)." },
    { p: "La regla de Hebb (1949) dice, en esencia, que…", op: ["Las máquinas no pueden pensar", "Neuronas que se disparan juntas se conectan juntas", "El ajedrez tiene 10^120 partidas", "El bit es la unidad de información"], ok: 1, porque: "Es la base biológica del aprendizaje por pesos: la coactivación fortalece la conexión sináptica, idea que heredaron las redes artificiales." }
  ];

  E.registrar({
    id: "fund-computo-padres-fundadores",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 6,
    titulo: "Los Padres Fundadores de la IA",
    sub: "1936–1986: de Dartmouth a la gran bifurcación",
    resumen: "Los nueve pioneros que crearon la IA —Turing, McCarthy, Minsky, Shannon, Rochester, Rosenblatt, Samuel, Weizenbaum y Simon—, la división simbólico vs. conexionista, el problema XOR y el Primer Invierno.",
    chips: [{ k: "Bloque", v: "Historia de la IA" }, { k: "Tipo", v: "Referentes y fichas" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-padres-fundadores", QUIZ)
    }
  });
})();
