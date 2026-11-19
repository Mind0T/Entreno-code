/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Genealogía de las Ciencias de la Computación (80 referentes)
   De Boole a la IA, la nube y la ética tecnológica
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG — El río de la computación: de la lógica al hardware de IA */
  var SVG_RIO =
    '<svg viewBox="0 0 620 150" role="img" aria-label="De Boole a las TPUs">' +
    '<defs><marker id="gArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<g text-anchor="middle" font-size="10.5">' +
    '<rect x="10" y="56" width="104" height="40" rx="9" fill="none" stroke="var(--azul)" stroke-width="1.8"/><text x="62" y="74" fill="var(--azul)">Álgebra Boole</text><text x="62" y="88" font-size="9" fill="currentColor" opacity=".55">Boole</text>' +
    '<line x1="114" y1="76" x2="140" y2="76" stroke="currentColor" opacity=".5" marker-end="url(#gArr)"/>' +
    '<rect x="144" y="56" width="104" height="40" rx="9" fill="none" stroke="var(--morado)" stroke-width="1.8"/><text x="196" y="74" fill="var(--morado)">Teoría Info.</text><text x="196" y="88" font-size="9" fill="currentColor" opacity=".55">Shannon · Turing</text>' +
    '<line x1="248" y1="76" x2="274" y2="76" stroke="currentColor" opacity=".5" marker-end="url(#gArr)"/>' +
    '<rect x="278" y="56" width="104" height="40" rx="9" fill="none" stroke="var(--verde)" stroke-width="1.8"/><text x="330" y="74" fill="var(--verde)">Arq. von</text><text x="330" y="88" font-size="9" fill="currentColor" opacity=".55">Neumann</text>' +
    '<line x1="382" y1="76" x2="408" y2="76" stroke="currentColor" opacity=".5" marker-end="url(#gArr)"/>' +
    '<rect class="cog-pulse" x="412" y="56" width="104" height="40" rx="9" fill="none" stroke="var(--ambar)" stroke-width="2"/><text x="464" y="74" fill="var(--ambar)">RISC · TPUs</text><text x="464" y="88" font-size="9" fill="currentColor" opacity=".55">Patterson</text>' +
    '<text x="300" y="28" fill="currentColor" opacity=".7" font-size="11">Una idea lógica del siglo XIX termina en el silicio que entrena la IA.</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Genealogía de las Ciencias de la Computación</h2>' +
      '<p>Toda la disciplina cabe en un árbol genealógico: desde un álgebra lógica del siglo XIX hasta los centros de datos que hoy entrenan modelos y la ética que los vigila. Aquí están los <b>80 referentes</b> que la construyeron, en seis bloques. No para memorizarlos, sino para ver los <b>hilos</b> que los conectan: cómo una idea de Boole desemboca en una TPU, o cómo el escalamiento de datos provoca —como reacción— toda una ciencia de la privacidad.</p>');

    cog.epigrafe(cont, "“Si he visto más lejos, es por estar sobre los hombros de gigantes.”", "Isaac Newton");

    cog.prosa(cont, '<h3>A · Fundamentos teóricos y pioneros</h3>' +
      '<p><b>George Boole</b> (álgebra de Boole, base de los circuitos) · <b>Charles Babbage</b> (la Máquina Analítica: ALU, control, memoria) · <b>Ada Lovelace</b> (primer algoritmo) · <b>Alan Turing</b> (Máquina de Turing, padre de la computación teórica y la IA) · <b>John von Neumann</b> (la arquitectura de las computadoras modernas) · <b>Claude Shannon</b> (Teoría de la Información, el bit) · <b>Grace Hopper</b> (primer compilador) · <b>Margaret Hamilton</b> (software del Apolo, “ingeniería de software”) · <b>Edsger Dijkstra</b> (programación estructurada, algoritmo del camino más corto) · <b>Donald Knuth</b> (<i>The Art of Computer Programming</i>, TeX).</p>');
    cog.figura(cont, { color: AM, titulo: "El río que va de la lógica al silicio de IA",
      svg: SVG_RIO,
      pie: "<b>Boole</b> (álgebra lógica) → <b>Shannon</b> y <b>Turing</b> (circuitos y computabilidad) → <b>von Neumann</b> (la arquitectura) → <b>Patterson</b> (RISC y las TPUs que entrenan redes). Una sola línea de causa y efecto, de 1850 a hoy." });

    cog.prosa(cont, '<h3>B · Sistemas, redes, internet y criptografía</h3>' +
      '<p><b>Dennis Ritchie</b> (C y co-creador de Unix) · <b>Ken Thompson</b> (Unix) · <b>Linus Torvalds</b> (kernel de Linux y Git) · <b>Richard Stallman</b> (software libre, GNU, GPL) · <b>Vint Cerf</b> (TCP/IP, arquitectura de internet) · <b>Radia Perlman</b> (“madre de internet”, Spanning Tree Protocol) · <b>Tim Berners-Lee</b> (la Web, HTTP, URL) · <b>Douglas Engelbart</b> (HCI: ratón, ventanas, hipertexto) · <b>Shafi Goldwasser</b> (criptografía, pruebas de conocimiento cero) · <b>Tony Hoare</b> (Quicksort, lógica de Hoare, la referencia nula).</p>');

    cog.prosa(cont, '<h3>C · Ingeniería de software y lenguajes</h3>' +
      '<p><b>Frances Allen</b> (optimización de compiladores) · <b>Barbara Liskov</b> (abstracción de datos, la “L” de SOLID) · <b>John Backus</b> (Fortran) · <b>Niklaus Wirth</b> (Pascal) · <b>Bjarne Stroustrup</b> (C++) · <b>Larry Wall</b> (Perl) · <b>Guido van Rossum</b> (Python) · <b>James Gosling</b> (Java) · <b>Yukihiro Matsumoto</b> (Ruby) · <b>Rasmus Lerdorf</b> (PHP) · <b>Brendan Eich</b> (JavaScript, en 10 días) · <b>Anders Hejlsberg</b> (C# y TypeScript) · <b>Chris Lattner</b> (Swift y LLVM) · <b>Joe Armstrong</b> (Erlang) · <b>Rich Hickey</b> (Clojure).</p>');

    cog.prosa(cont, '<h3>D · IA, Machine Learning y robótica</h3>' +
      '<p><b>John McCarthy</b> (acuñó “IA”, LISP) · <b>Geoffrey Hinton</b> (“padrino de la IA”, backpropagation) · <b>Yann LeCun</b> (CNNs) · <b>Yoshua Bengio</b> (deep learning, ética) · <b>Jürgen Schmidhuber</b> (LSTM) · <b>Fei-Fei Li</b> (ImageNet) · <b>Andrew Ng</b> (Google Brain, Coursera) · <b>Daphne Koller</b> (modelos gráficos probabilísticos) · <b>Demis Hassabis</b> (DeepMind, AlphaGo, AlphaFold) · <b>Ilya Sutskever</b> (AlexNet, OpenAI) · <b>Ian Goodfellow</b> (GANs) · <b>Andrej Karpathy</b> (visión, Tesla) · <b>Richard Sutton</b> (aprendizaje por refuerzo) · <b>Stuart Russell</b> (el libro de referencia de IA, seguridad) · <b>Sebastian Thrun</b> (coche autónomo, Waymo) · <b>Pieter Abbeel</b> (robótica por refuerzo profundo) · <b>Françoise Beaufays</b> (aprendizaje federado).</p>');

    cog.prosa(cont, '<h3>E · Nube, Big Data y sistemas distribuidos</h3>' +
      '<p><b>Leslie Lamport</b> (computación distribuida, LaTeX) · <b>Eric Brewer</b> (Teorema CAP) · <b>Jeff Dean</b> (MapReduce, Bigtable, TensorFlow) · <b>Sanjay Ghemawat</b> (GFS, MapReduce) · <b>Urs Hölzle</b> (centros de datos de Google) · <b>David Patterson</b> (RISC, TPUs) · <b>Werner Vogels</b> (CTO de Amazon, arquitecto de AWS) · <b>James Hamilton</b> (infraestructura de AWS) · <b>Swami Sivasubramanian</b> (SageMaker) · <b>Doug Cutting</b> (Hadoop) · <b>Matei Zaharia</b> (Spark) · <b>Solomon Hykes</b> (Docker) · <b>Brendan Burns</b> (Kubernetes) · <b>Kelsey Hightower</b> (Cloud Native) · <b>Mitchell Hashimoto</b> (Terraform) · <b>Martin Fowler</b> (microservicios).</p>');

    cog.prosa(cont, '<h3>F · Ética, privacidad y justicia algorítmica</h3>' +
      '<p><b>Cynthia Dwork</b> (Privacidad Diferencial) · <b>Latanya Sweeney</b> (k-anonimato) · <b>Timnit Gebru</b> (sesgos en modelos de lenguaje) · <b>Margaret Mitchell</b> (Model Cards) · <b>Joy Buolamwini</b> (sesgos en reconocimiento facial) · <b>Cathy O’Neil</b> (<i>Armas de destrucción matemática</i>) · <b>Safiya Umoja Noble</b> (<i>Algorithms of Oppression</i>) · <b>Ruha Benjamin</b> (desigualdad en el ML predictivo) · <b>Kate Crawford</b> (costo ecológico de la IA) · <b>Virginia Dignum</b> (IA responsable) · <b>Milind Tambe</b> (IA para el bien social) · <b>Luciano Floridi</b> (Ética de la Información).</p>');

    cog.prosa(cont, '<h3>Los hilos que los conectan</h3>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "Hardware", titulo: "De la lógica al silicio",
        cuerpo: 'Boole → Shannon + Turing → von Neumann → RISC y TPUs (Patterson). El pensamiento abstracto se vuelve circuito.' },
      { color: VE, etiqueta: "Software libre", titulo: "Unix → la nube",
        cuerpo: 'Unix (Thompson, Ritchie) → GNU/GPL (Stallman) + Linux (Torvalds) → Docker (Hykes) → Kubernetes (Burns).' },
      { color: MO, etiqueta: "Big Data", titulo: "De GFS a Spark",
        cuerpo: 'GFS y MapReduce (Dean, Ghemawat) → Hadoop (Cutting) → Spark (Zaharia) → la nube (Vogels, Hölzle).' },
      { color: RO, etiqueta: "Tensión", titulo: "Innovación vs. ética",
        cuerpo: 'El escalamiento de datos (Dean, Sutskever) provoca su contrapeso: matemático (Dwork, Sweeney) y filosófico (Gebru, Crawford, Floridi).' }
    ]);

    cog.acordeon(cont, [
      { q: "Privacidad con matemáticas: ZKP, Privacidad Diferencial y k-anonimato", a: 'Las <b>pruebas de conocimiento cero</b> (Goldwasser) permiten <b>demostrar que sabes algo sin revelarlo</b> (probar que conoces la contraseña sin decirla). La <b>privacidad diferencial</b> (Dwork) añade <b>ruido calibrado</b> a los datos para que ningún individuo sea identificable, sin arruinar las estadísticas agregadas. El <b>k-anonimato</b> (Sweeney) garantiza que cada registro sea indistinguible de al menos otros k−1.' },
      { q: "El Teorema CAP y los sistemas distribuidos", a: 'Brewer: un sistema distribuido no puede garantizar a la vez <b>Consistencia</b>, <b>Disponibilidad</b> y <b>tolerancia a Particiones</b> de red; cuando la red se parte, hay que <b>elegir</b> entre seguir respondiendo (disponibilidad) o rechazar para no dar datos viejos (consistencia). Lamport, por su parte, dio las herramientas para razonar sobre la consistencia entre nodos.' },
      { q: "Paradigmas de lenguajes", a: '<b>Estructurado</b> (Dijkstra, Wirth): flujo claro, sin saltos caóticos. <b>Orientado a objetos</b> (Liskov, Stroustrup, Gosling): datos y comportamiento encapsulados en objetos. <b>Funcional/concurrente</b> (McCarthy con LISP, Armstrong con Erlang, Hickey con Clojure): funciones puras, inmutabilidad y concurrencia segura.' },
      { q: "El costo ecológico de la IA", a: 'Entrenar modelos gigantes consume <b>energía y agua</b> a escala industrial. Los centros de datos (Hamilton, Hölzle) tienen una huella física real; <b>Kate Crawford</b> la documenta, y <b>Floridi</b> enmarca el dilema dentro de la <b>Ética de la Información</b>: cada bit tiene un costo material.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Asocia aporte y referente. Elige y revisa.",
      reactivos: [
        { p: '¿Quién formuló el Teorema CAP de los sistemas distribuidos?',
          opciones: [{ t: "Eric Brewer", ok: true }, { t: "Tim Berners-Lee" }, { t: "Guido van Rossum" }],
          porque: "<b>Eric Brewer</b> formuló el Teorema CAP: no puedes tener a la vez consistencia, disponibilidad y tolerancia a particiones." },
        { p: 'La Privacidad Diferencial —añadir ruido calibrado para proteger individuos— es de…',
          opciones: [{ t: "Cynthia Dwork", ok: true }, { t: "Margaret Mitchell" }, { t: "Doug Cutting" }],
          porque: "<b>Cynthia Dwork</b> co-inventó la privacidad diferencial, pilar matemático de la privacidad de datos moderna." },
        { p: 'El linaje “Unix → GNU/Linux → Docker → Kubernetes” es la historia de…',
          opciones: [{ t: "el software libre y la nube", ok: true }, { t: "los lenguajes funcionales" }, { t: "la criptografía" }],
          porque: "Es el hilo del <b>software libre</b> que desemboca en la contenedorización y orquestación modernas de la nube." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Historia de la computación", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Historia_de_la_computación", lang: "es" },
    { t: "Teorema CAP", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Teorema_CAP", lang: "es" },
    { t: "Turing Award (ACM A.M. Turing Award)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Turing_Award", lang: "en" },
    { t: "Differential privacy", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Differential_privacy", lang: "en" },
    { t: "History of computing", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/History_of_computing", lang: "en" }
  ];

  var QUIZ = [
    { p: "El álgebra de Boole es la base de…", op: ["Los lenguajes funcionales", "Los circuitos digitales", "La privacidad diferencial", "Los microservicios"], ok: 1, porque: "Shannon aplicó el álgebra de Boole a los circuitos: la lógica binaria es el cimiento del hardware digital." },
    { p: "¿Quién creó el kernel de Linux y también Git?", op: ["Richard Stallman", "Linus Torvalds", "Ken Thompson", "Dennis Ritchie"], ok: 1, porque: "<b>Linus Torvalds</b> creó tanto el kernel de Linux (1991) como el sistema de control de versiones Git." },
    { p: "Las “pruebas de conocimiento cero” (Goldwasser) permiten…", op: ["Entrenar redes sin datos", "Demostrar que sabes algo sin revelarlo", "Comprimir archivos", "Orquestar contenedores"], ok: 1, porque: "Permiten probar la posesión de un secreto (p. ej. una contraseña) sin revelar el secreto mismo." },
    { p: "El Teorema CAP dice que un sistema distribuido no puede garantizar a la vez…", op: ["Velocidad, costo y seguridad", "Consistencia, Disponibilidad y tolerancia a Particiones", "Memoria, CPU y red", "Backend, frontend y base de datos"], ok: 1, porque: "Ante una partición de red hay que elegir entre consistencia y disponibilidad: no se tienen las tres a la vez." },
    { p: "¿Qué documenta principalmente Kate Crawford?", op: ["Los algoritmos de ordenamiento", "El costo ecológico y energético de la infraestructura de IA", "La sintaxis de Python", "El Teorema CAP"], ok: 1, porque: "Crawford expone las implicaciones materiales, energéticas y ecológicas de los centros de datos y la IA a gran escala." }
  ];

  E.registrar({
    id: "fund-computo-genealogia-cc",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8,
    titulo: "Genealogía de las Ciencias de la Computación",
    sub: "De Boole a la IA, la nube y la ética",
    resumen: "Los 80 referentes que construyeron la computación, en seis bloques —fundamentos, sistemas y redes, lenguajes, IA, nube/Big Data y ética— y los hilos que los conectan: del álgebra de Boole a las TPUs, de Unix a Kubernetes.",
    chips: [{ k: "Bloque", v: "Historia y referentes" }, { k: "Tipo", v: "Mapa genealógico" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-genealogia-cc", QUIZ)
    }
  });
})();
