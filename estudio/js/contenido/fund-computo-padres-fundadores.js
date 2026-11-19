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

  function ficha(nombre, anios, aporte) {
    return { color: AZ, etiqueta: anios, titulo: nombre, cuerpo: aporte };
  }

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

    cog.prosa(cont, '<h3>3 · Los nueve pioneros</h3>');
    cog.grid(cont, [
      ficha("Alan Turing", "1912–1954", 'Formalizó qué es computable con la <b>Máquina de Turing</b> (1936); descifró Enigma en Bletchley Park; propuso el <b>Test de Turing</b> (1950) y, en 1948, las “máquinas no organizadas”, precursoras de las redes neuronales.'),
      ficha("John McCarthy", "1927–2011", 'Acuñó el término “IA” e inventó <b>LISP</b> (1958) para manipular símbolos, además del <i>garbage collection</i> y el <b>tiempo compartido</b> (<i>Time-Sharing</i>), antecedente del cómputo en la nube.'),
      ficha("Marvin Minsky", "1927–2016", 'Construyó el <b>SNARC</b> (1951), primer simulador físico de red neuronal; teoría de los <b>Marcos</b> y <i>La Sociedad de la Mente</i>; coautor de <i>Perceptrons</i> (1969), que detonó el Primer Invierno.'),
      ficha("Claude Shannon", "1916–2001", 'Aplicó el <b>álgebra de Boole</b> a los circuitos (1937): la base del hardware digital. Fundó la <b>Teoría de la Información</b> (1948) y popularizó el <b>bit</b>.'),
      ficha("Nathaniel Rochester", "1919–2001", 'Arquitecto de la <b>IBM 701</b> y del primer <b>ensamblador</b> simbólico; dirigió en una IBM 704 la primera simulación masiva de redes neuronales (1955–56), inspirada en Hebb.'),
      ficha("Frank Rosenblatt", "1928–1971", 'Padre del <b>conexionismo</b>: inventó el <b>Perceptrón</b> (1957) y el hardware <b>Mark I</b>, una red que ajustaba sus pesos sola. Abuelo intelectual del deep learning.'),
      ficha("Arthur Samuel", "1901–1990", 'Su programa de <b>damas</b> aprendía de su experiencia y venció a un campeón (1962); popularizó <b>Minimax</b> y la poda alfa-beta, y acuñó el término <b>Machine Learning</b> (1959).'),
      ficha("Joseph Weizenbaum", "1923–2008", 'Creó <b>ELIZA</b> (1966), el primer chatbot; descubrió el <b>Efecto ELIZA</b>; y con <i>Computer Power and Human Reason</i> (1976) fundó la ética de la IA, separando <b>decidir</b> (cálculo) de <b>elegir</b> (juicio moral).'),
      ficha("Herbert Simon", "1916–2001", 'Con Newell y Shaw creó el <b>Logic Theorist</b> (1956) y el <b>GPS</b>; formalizó las <b>heurísticas</b> y la <b>Racionalidad Limitada</b>. Único con <b>Premio Turing</b> y <b>Nobel de Economía</b>.')
    ]);

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
