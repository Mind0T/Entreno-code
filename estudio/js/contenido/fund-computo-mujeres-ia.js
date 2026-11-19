/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Mujeres Fundamentales en la Historia de la IA
   De los cimientos de la computación a la ética algorítmica
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG — De la visión a la auditoría ética: un linaje */
  var SVG_LINAJE =
    '<svg viewBox="0 0 620 160" role="img" aria-label="De ImageNet a la auditoría ética de sesgos">' +
    '<defs><marker id="mArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<g text-anchor="middle" font-size="11">' +
    '<rect x="14" y="54" width="150" height="56" rx="11" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="89" y="78" fill="var(--verde)" font-size="11.5">Fei-Fei Li</text><text x="89" y="94" font-size="9.5" fill="currentColor" opacity=".6">ImageNet → DL visual</text>' +
    '<line x1="164" y1="82" x2="200" y2="82" stroke="currentColor" opacity=".5" marker-end="url(#mArr)"/>' +
    '<rect x="204" y="54" width="150" height="56" rx="11" fill="none" stroke="var(--ambar)" stroke-width="2"/><text x="279" y="78" fill="var(--ambar)" font-size="11.5">Joy Buolamwini</text><text x="279" y="94" font-size="9.5" fill="currentColor" opacity=".6">audita sesgos faciales</text>' +
    '<line x1="354" y1="82" x2="390" y2="82" stroke="currentColor" opacity=".5" marker-end="url(#mArr)"/>' +
    '<rect class="cog-pulse" x="394" y="54" width="212" height="56" rx="11" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="500" y="78" fill="var(--morado)" font-size="11.5">Mitchell · Chowdhury</text><text x="500" y="94" font-size="9.5" fill="currentColor" opacity=".6">Model Cards · Red Teaming</text>' +
    '<text x="310" y="30" fill="currentColor" opacity=".7" font-size="11">La misma visión por computadora que despegó…</text>' +
    '<text x="310" y="138" fill="currentColor" opacity=".7" font-size="11">…fue auditada y, después, gobernada con estándares de diseño.</text>' +
    '</g></svg>';

  function f(color, etiqueta, nombre, cuerpo) { return { color: color, etiqueta: etiqueta, titulo: nombre, cuerpo: cuerpo }; }

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Mujeres Fundamentales en la IA</h2>' +
      '<p>La historia de la IA no se entiende sin ellas. Desde el <b>primer algoritmo de la historia</b> hasta los estándares que hoy auditan a los modelos más grandes, veinte mujeres atraviesan cuatro eras: los cimientos de la computación, la IA clásica, el auge del machine learning y la visión, y la ética algorítmica. No es una lista de homenaje: es el <b>linaje técnico</b> que va del compilador a las <i>Model Cards</i>.</p>');

    cog.epigrafe(cont, "“No podemos mejorar lo que no medimos, ni corregir el sesgo que no auditamos.”", "Espíritu de la Algorithmic Justice League");

    cog.prosa(cont, '<h3>Era A · Los cimientos de la computación</h3>' +
      '<p>Antes de que existiera la “IA”, se construyó la capacidad misma de programar: de la idea al lenguaje, y del lenguaje al software confiable.</p>');
    cog.grid(cont, [
      f(AZ, "Siglo XIX", "Ada Lovelace", 'Escribió el <b>primer algoritmo de la historia</b> para la Máquina Analítica de Babbage y vio que una computadora podría ir <b>más allá del cálculo numérico</b>.'),
      f(AZ, "Compiladores", "Grace Hopper", 'Inventó el <b>primer compilador</b> y fue clave en <b>COBOL</b>, acercando el lenguaje de máquina al humano. Contraalmirante de la Marina.'),
      f(AZ, "Software robusto", "Margaret Hamilton", 'Acuñó el término <b>“ingeniería de software”</b> y dirigió el software de vuelo del <b>Apolo</b>; sus principios de tolerancia a fallos sostienen la IA moderna.')
    ]);

    cog.prosa(cont, '<h3>Era B · IA clásica y ciencias cognitivas</h3>' +
      '<p>El puente entre el lenguaje humano, el diálogo y la percepción —problemas que aún definen la IA.</p>');
    cog.grid(cont, [
      f(MO, "Recuperación", "Karen Spärck Jones", 'Introdujo el <b>IDF</b> (frecuencia inversa de documentos), base de los buscadores y del NLP… y aún viva en los sistemas <b>RAG</b> de hoy.'),
      f(MO, "Creatividad", "Margaret Boden", 'Referente en historia y filosofía de la IA; pionera en el estudio de la <b>creatividad artificial</b>.'),
      f(MO, "Sistemas expertos", "Elaine Rich", 'Autora del libro fundacional <i>Artificial Intelligence</i> (1983); pionera en <b>modelado de usuarios</b>.'),
      f(MO, "Diálogo", "Barbara Grosz", 'Modeló computacionalmente las <b>estructuras del discurso</b>, cimiento de los agentes conversacionales.'),
      f(MO, "Robótica", "Ruzena Bajcsy", 'Propuso la <b>percepción activa</b>: robots que mueven sus sensores para comprender, en vez de recibir datos pasivamente.')
    ]);

    cog.prosa(cont, '<h3>Era C · Machine learning, visión y robótica</h3>');
    cog.grid(cont, [
      f(VE, "Visión", "Fei-Fei Li", 'Creó <b>ImageNet</b>, la base de datos que detonó la revolución del deep learning visual en <b>2012</b>. Codirige el HAI de Stanford.'),
      f(VE, "Emoción", "Cynthia Breazeal", 'Pionera de la <b>robótica social</b>; creó <b>Kismet</b>, de los primeros robots que reconocen y simulan emociones.'),
      f(VE, "Incertidumbre", "Daphne Koller", 'Experta en <b>modelos gráficos probabilísticos</b> (decidir bajo incertidumbre). Cofundó Coursera.'),
      f(VE, "Robótica distribuida", "Daniela Rus", 'Dirige el MIT CSAIL; pionera en <b>robótica distribuida</b>: muchas máquinas colaborando.'),
      f(VE, "Afectiva", "Rosalind Picard", 'Fundó la <b>computación afectiva</b>: reconocer y procesar emociones con sensores y biometría.'),
      f(VE, "Refuerzo", "Doina Precup", 'En DeepMind y McGill; experta en <b>Aprendizaje por Refuerzo</b>, clave en el dominio del Go y el ajedrez.'),
      f(VE, "Tensores", "Anima Anandkumar", 'Especialista en <b>algoritmos de tensores</b> e IA para la ciencia (clima, fluidos, modelos masivos).'),
      f(VE, "Sentido común", "Yejin Choi", 'Pionera del <b>sentido común computacional</b>: razonar sobre el contexto implícito, más allá de la estadística.')
    ]);

    cog.prosa(cont, '<h3>Era D · Ética, sesgos y justicia algorítmica</h3>' +
      '<p>Cuando la IA salió al mundo, otras cuatro la pusieron a rendir cuentas.</p>');
    cog.grid(cont, [
      f(RO, "Sesgo facial", "Joy Buolamwini", 'Fundó la <b>Algorithmic Justice League</b>; demostró altas tasas de error del reconocimiento facial con mujeres y personas de piel oscura.'),
      f(RO, "Loros estocásticos", "Timnit Gebru", 'Coautora del trabajo clave sobre los peligros de los <b>modelos de lenguaje gigantes</b> y la falta de diversidad en los datos.'),
      f(RO, "Transparencia", "Margaret Mitchell", 'Impulsora de las <b>Model Cards</b>: documentar capacidades, límites y sesgos de cada modelo.'),
      f(RO, "Auditoría", "Rumman Chowdhury", 'Líder global en <b>red teaming</b>: auditorías éticas y de seguridad a gran escala de modelos generativos.')
    ]);

    cog.prosa(cont, '<h3>Un linaje, no una lista</h3>' +
      '<p>El valor de verlas juntas es ver cómo se encadenan: una crea la tecnología, otra descubre su sesgo, otra la gobierna.</p>');
    cog.figura(cont, { color: MO, titulo: "De la visión a la auditoría ética",
      svg: SVG_LINAJE,
      pie: "<b>Fei-Fei Li</b> enciende la visión por computadora con ImageNet; <b>Joy Buolamwini</b> audita los sesgos de esos mismos sistemas; <b>Mitchell</b> y <b>Chowdhury</b> los convierten en estándares de diseño (<i>Model Cards</i>, <i>Red Teaming</i>). La innovación y su crítica son el mismo linaje." });

    cog.acordeon(cont, [
      { q: "IDF: por qué sigue vivo en RAG", a: 'El <b>IDF</b> de Spärck Jones pesa las palabras: las muy comunes (“el”, “de”) valen poco; las raras y específicas valen mucho. Esa intuición —qué términos distinguen un documento— es la base de la <b>búsqueda</b>, y por eso late dentro de los recuperadores de los sistemas RAG modernos.' },
      { q: "Percepción activa vs. pasiva", a: 'La IA clásica asumía percepción <b>pasiva</b>: recibes una imagen y la clasificas. Bajcsy propuso lo <b>activo</b>: el robot <i>mueve</i> su cámara, se acerca, toca —la acción crea mejor percepción—. Es un eco directo de la neurociencia cognitiva: percibir es actuar.' },
      { q: "Sentido común vs. “loros estocásticos”", a: 'Dos polos de un debate: <b>Yejin Choi</b> busca dotar a los modelos de razonamiento sobre lo implícito (el sentido común que un humano da por hecho). <b>Timnit Gebru</b> advierte que, sin eso, un LLM es un <b>“loro estocástico”</b>: repite patrones estadísticos sin comprender. El contraste define el estado del arte.' },
      { q: "Model Cards y Red Teaming como diseño", a: 'La ética se vuelve <b>práctica de producto</b>: una <b>Model Card</b> es una ficha técnica honesta (para qué sirve, dónde falla, con qué datos). El <b>Red Teaming</b> es atacar al modelo a propósito para encontrar sus grietas antes de que lo hagan terceros. Gobernanza vuelta diseño.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Asocia cada aporte con su autora. Elige y revisa.",
      reactivos: [
        { p: '¿Quién creó la base de datos que detonó el deep learning visual en 2012?',
          opciones: [{ t: "Fei-Fei Li (ImageNet)", ok: true }, { t: "Ada Lovelace" }, { t: "Grace Hopper" }],
          porque: "<b>ImageNet</b>, de Fei-Fei Li, dio a las redes los datos etiquetados masivos que encendieron la visión por computadora." },
        { p: 'Documentar capacidades, límites y sesgos de un modelo con una ficha estándar es la idea de…',
          opciones: [{ t: "las Model Cards (Margaret Mitchell)", ok: true }, { t: "el IDF (Spärck Jones)" }, { t: "Kismet (Breazeal)" }],
          porque: "Las <b>Model Cards</b> de Mitchell estandarizan la transparencia: una ficha técnica honesta por modelo." },
        { p: 'Advertir que un modelo de lenguaje gigante puede ser un “loro estocástico” es el aporte de…',
          opciones: [{ t: "Timnit Gebru", ok: true }, { t: "Daniela Rus" }, { t: "Daphne Koller" }],
          porque: "Gebru coautoró la crítica a los modelos de lenguaje gigantes: repiten patrones sin comprender (“loros estocásticos”)." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Ada Lovelace", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Ada_Lovelace", lang: "es" },
    { t: "Grace Hopper", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Grace_Hopper", lang: "es" },
    { t: "ImageNet", fuente: "Sitio oficial (Stanford/Princeton)", url: "https://www.image-net.org/", lang: "en" },
    { t: "Model Cards for Model Reporting (Mitchell et al., 2019)", fuente: "arXiv 1810.03993", url: "https://arxiv.org/abs/1810.03993", lang: "en" },
    { t: "On the Dangers of Stochastic Parrots (Bender, Gebru et al., 2021)", fuente: "ACM FAccT", url: "https://dl.acm.org/doi/10.1145/3442188.3445922", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Quién escribió el primer algoritmo de la historia?", op: ["Grace Hopper", "Ada Lovelace", "Margaret Hamilton", "Fei-Fei Li"], ok: 1, porque: "<b>Ada Lovelace</b> escribió el primer algoritmo para la Máquina Analítica de Babbage y previó usos más allá del cálculo numérico." },
    { p: "El IDF de Karen Spärck Jones es base de…", op: ["La robótica social", "Los motores de búsqueda y el NLP (hoy también RAG)", "La computación afectiva", "El aprendizaje por refuerzo"], ok: 1, porque: "El <b>IDF</b> pesa la importancia de las palabras: cimiento de la recuperación de información, buscadores, NLP y los recuperadores de RAG." },
    { p: "ImageNet, de Fei-Fei Li, fue clave porque…", op: ["Inventó el compilador", "Dio datos masivos etiquetados que detonaron el deep learning visual (2012)", "Creó el primer chatbot", "Formuló las Model Cards"], ok: 1, porque: "ImageNet aportó el dataset etiquetado a gran escala que encendió la revolución de la visión por computadora en 2012." },
    { p: "Joy Buolamwini es conocida por…", op: ["Fundar Coursera", "Demostrar sesgos raciales y de género en el reconocimiento facial", "Crear LISP", "Dirigir el MIT CSAIL"], ok: 1, porque: "Desde la <b>Algorithmic Justice League</b> mostró las altas tasas de error del reconocimiento facial con mujeres y personas de piel oscura." },
    { p: "El “red teaming” de Rumman Chowdhury consiste en…", op: ["Entrenar modelos más rápido", "Auditar y atacar modelos a propósito para hallar sus fallos", "Diseñar robots sociales", "Comprimir redes neuronales"], ok: 1, porque: "El <b>red teaming</b> somete a los modelos generativos a auditorías adversarias de seguridad y ética a gran escala." }
  ];

  E.registrar({
    id: "fund-computo-mujeres-ia",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 7,
    titulo: "Mujeres Fundamentales en la IA",
    sub: "De los cimientos a la ética algorítmica",
    resumen: "Veinte mujeres que atraviesan cuatro eras de la IA: los cimientos de la computación (Lovelace, Hopper, Hamilton), la IA clásica, el auge del ML y la visión, y la ética algorítmica (Buolamwini, Gebru, Mitchell, Chowdhury).",
    chips: [{ k: "Bloque", v: "Historia de la IA" }, { k: "Tipo", v: "Referentes y fichas" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-mujeres-ia", QUIZ)
    }
  });
})();
