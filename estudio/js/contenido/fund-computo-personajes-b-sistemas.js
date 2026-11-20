/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Personajes importantes en tecnología y computación
   Bloque B — Sistemas operativos, redes, internet y criptografía
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";
  var C = VE;

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Sistemas, redes e internet</h2>' +
      '<p>Si el bloque anterior puso los cimientos teóricos, este construyó la <b>plomería</b> del mundo digital: los sistemas operativos que gobiernan cada máquina, los protocolos que conectan el planeta, la web que lo volvió navegable y la criptografía que lo protege. Son las personas que hicieron que las computadoras dejaran de estar solas y empezaran a hablarse entre sí.</p>');
    cog.epigrafe(cont, "“Internet no es una red de computadoras; es una red de personas.”", "Idea atribuida a los pioneros de la red");

    cog.persona(cont, { slug: "dennis-ritchie", nombre: "Dennis Ritchie", color: C, etiqueta: "Lenguaje C · Unix", meta: "1941–2011 · Informático (Bell Labs)", parrafos: [
      'En los laboratorios Bell, a principios de los años 70, creó el lenguaje de programación <b>C</b>, uno de los más influyentes de la historia. C ofrecía un equilibrio raro: tan cercano al hardware como para ser eficiente, pero lo bastante legible para escribir programas grandes.',
      'Con Ken Thompson co-creó el sistema operativo <b>Unix</b>, y lo reescribió en C — una decisión clave, porque hizo a Unix <b>portable</b> entre máquinas distintas. Casi todos los lenguajes modernos (C++, Java, Python, JavaScript) heredan la sintaxis y las ideas de C.',
      'Su influencia es tan profunda que suele pasar inadvertida: el kernel de Linux, los sistemas que mueven internet y hasta los teléfonos descienden de su trabajo. Ganó el Premio Turing en 1983. Murió pocos días después de Steve Jobs, con mucha menos atención y un impacto quizá mayor.'
    ] });

    cog.persona(cont, { slug: "ken-thompson", nombre: "Ken Thompson", color: C, etiqueta: "Unix", meta: "n. 1943 · Informático (Bell Labs)", parrafos: [
      'Co-creador y diseñador original de <b>Unix</b> (1969), el sistema operativo cuya filosofía —herramientas pequeñas que hacen una cosa bien y se combinan— moldeó para siempre cómo se construye software. Casi todo lo que usamos hoy desciende, directa o indirectamente, de Unix.',
      'Creó también el lenguaje B (antecesor de C), el sistema de codificación de texto <b>UTF-8</b> (junto a Rob Pike) que permite que el mundo escriba en cualquier idioma en internet, y décadas después el lenguaje <b>Go</b> en Google. Su carrera abarca medio siglo de infraestructura esencial.',
      'En su discurso del Premio Turing (1983, compartido con Ritchie) planteó una reflexión famosa sobre la confianza en el software: hasta qué punto podemos confiar en código que no escribimos nosotros mismos. Una advertencia sobre seguridad que sigue siendo profundamente actual.'
    ] });

    cog.persona(cont, { slug: "linus-torvalds", nombre: "Linus Torvalds", color: C, etiqueta: "Linux · Git", meta: "n. 1969 · Informático finlandés", parrafos: [
      'En 1991, siendo estudiante en Finlandia, escribió desde cero el <b>kernel de Linux</b> como un proyecto personal y lo liberó para que cualquiera lo usara y mejorara. Lo que empezó como un pasatiempo se convirtió en el sistema operativo más usado del planeta.',
      'Hoy <b>Linux</b> mueve la mayoría de los servidores de internet, las supercomputadoras, Android y buena parte de la infraestructura crítica del mundo. Su modelo de desarrollo abierto y colaborativo, con miles de contribuyentes, demostró que el software libre podía superar a los gigantes comerciales.',
      'Años después creó <b>Git</b>, el sistema de control de versiones que hoy usan prácticamente todos los programadores del mundo y que hace posible plataformas como GitHub. Es famoso por su estilo directo y sin filtros, pero su impacto técnico es sencillamente colosal.'
    ] });

    cog.persona(cont, { slug: "richard-stallman", nombre: "Richard Stallman", color: C, etiqueta: "Software libre", meta: "n. 1953 · Programador y activista (EE. UU.)", parrafos: [
      'Programador y activista estadounidense, fundó en 1983 el <b>Proyecto GNU</b> y el movimiento del <b>software libre</b>, con una idea radicalmente política: el software debe darle al usuario la libertad de usarlo, estudiarlo, modificarlo y compartirlo.',
      'Creó la <b>Free Software Foundation</b> y la licencia <b>GPL</b>, un mecanismo legal ingenioso (el <i>copyleft</i>) que obliga a que las mejoras de un programa libre sigan siendo libres. También escribió herramientas fundamentales como el editor Emacs y el compilador GCC.',
      'Su filosofía fue el motor ético que, combinado con el kernel de Torvalds, dio lugar a los sistemas GNU/Linux. Figura controvertida por sus posturas intransigentes, su insistencia en la libertad del usuario moldeó buena parte de la cultura tecnológica moderna, incluido el movimiento de código abierto.'
    ] });

    cog.persona(cont, { slug: "vint-cerf", nombre: "Vint Cerf", color: C, etiqueta: "Protocolos de internet", meta: "n. 1943 · Informático (EE. UU.)", parrafos: [
      'Conocido como uno de los “padres de internet”, co-diseñó con Bob Kahn los protocolos <b>TCP/IP</b> en los años 70: el conjunto de reglas que permite que redes distintas se interconecten y que la información viaje troceada en paquetes de una máquina a otra.',
      'TCP/IP es el idioma común que hace posible internet: gracias a él, cualquier dispositivo puede comunicarse con cualquier otro, sin importar quién lo fabricó o qué red use. Es una de esas invenciones invisibles sobre las que descansa literalmente todo el mundo conectado.',
      'Defensor incansable de una internet abierta y accesible, trabajó luego en Google y hasta en protocolos para una “internet interplanetaria”. Recibió el Premio Turing en 2004. Su diseño, pensado para ser simple y robusto, escaló de unos pocos nodos a miles de millones de dispositivos.'
    ] });

    cog.persona(cont, { slug: "radia-perlman", nombre: "Radia Perlman", color: C, etiqueta: "Redes", meta: "n. 1951 · Ingeniera de redes (EE. UU.)", parrafos: [
      'Llamada a veces la “madre de internet” —aunque ella matiza el título—, resolvió un problema fundamental de las redes: cómo lograr que muchos conmutadores (switches) se conecten entre sí sin crear bucles que colapsen el tráfico.',
      'Su invención, el <b>Spanning Tree Protocol</b> (STP), permite que las redes Ethernet se organicen automáticamente en una estructura sin bucles y se reconfiguren si un enlace falla. Es una pieza silenciosa pero esencial que hizo posibles las grandes redes locales.',
      'Autora de textos de referencia sobre redes y seguridad, ha trabajado toda su vida en hacer la infraestructura más robusta. Resume su filosofía con humor: diseñar redes que “simplemente funcionen” aunque la gente cometa errores. Su obra sostiene, sin que lo notemos, las redes que usamos a diario.'
    ] });

    cog.persona(cont, { slug: "tim-berners-lee", nombre: "Tim Berners-Lee", color: C, etiqueta: "World Wide Web", meta: "n. 1955 · Informático británico", parrafos: [
      'En 1989, trabajando en el <b>CERN</b>, inventó la <b>World Wide Web</b>: propuso un sistema para enlazar documentos mediante hipervínculos y acceder a ellos por internet. Creó sus tres pilares: el <b>HTML</b> (para escribir páginas), el <b>HTTP</b> (para transmitirlas) y las <b>URL</b> (para ubicarlas).',
      'Su decisión más trascendente fue <b>regalar la web al mundo</b>: no la patentó ni cobró por ella, para que cualquiera pudiera construir sobre ella libremente. Esa generosidad es la razón por la que la web se volvió universal en vez de propiedad de una empresa.',
      'Hoy lidera iniciativas para una web más abierta, descentralizada y respetuosa de la privacidad, preocupado por cómo unas pocas plataformas concentraron su poder. Recibió el Premio Turing en 2016. Pocas personas han cambiado la vida cotidiana de tanta gente con una sola idea.'
    ] });

    cog.persona(cont, { slug: "douglas-engelbart", nombre: "Douglas Engelbart", color: C, etiqueta: "Interacción humano-computadora", meta: "1925–2013 · Ingeniero (EE. UU.)", parrafos: [
      'Visionario que, cuando las computadoras eran máquinas para procesar datos en lotes, imaginó algo distinto: herramientas para <b>aumentar el intelecto humano</b>, con las que las personas trabajarían de forma interactiva y colaborativa.',
      'En 1968 dio la que se conoce como “<b>la madre de todas las demostraciones</b>”: en una sola sesión presentó el <b>ratón</b>, las ventanas, el hipertexto, la videoconferencia y la edición colaborativa en tiempo real. Mostró, décadas antes, cómo usaríamos las computadoras.',
      'Buena parte de esas ideas inspiraron luego a Xerox PARC, a Apple y a toda la informática personal. Fundó, en esencia, el campo de la <b>interacción humano-computadora</b>. Recibió el Premio Turing en 1997. Su obsesión no era la máquina, sino amplificar lo que las personas pueden hacer juntas.'
    ] });

    cog.persona(cont, { slug: "shafi-goldwasser", nombre: "Shafi Goldwasser", color: C, etiqueta: "Criptografía", meta: "n. 1958 · Informática (MIT)", parrafos: [
      'Científica israelí-estadounidense, es una de las figuras centrales de la <b>criptografía moderna</b> y la teoría de la complejidad. Ayudó a convertir la seguridad informática de un arte en una ciencia con demostraciones matemáticas rigurosas.',
      'Co-inventó las <b>pruebas de conocimiento cero</b>: un método para <b>demostrar que sabes un secreto sin revelarlo</b> (por ejemplo, probar que conoces una contraseña sin decirla). Es una idea contraintuitiva y poderosa, hoy clave en la privacidad digital y en las criptomonedas.',
      'También formalizó la noción de cifrado “semánticamente seguro”, base de la criptografía con la que protegemos nuestras comunicaciones. Ganó el Premio Turing en 2012. Su trabajo da fundamento matemático a algo que usamos todos los días sin pensarlo: la confianza en lo digital.'
    ] });

    cog.persona(cont, { slug: "tony-hoare", nombre: "Tony Hoare", color: C, etiqueta: "Algoritmos y verificación", meta: "n. 1934 · Informático británico", parrafos: [
      'Informático británico, inventó en 1959 el algoritmo de ordenamiento <b>Quicksort</b>, uno de los más usados y eficientes del mundo, que casi todo programa de ordenación emplea de una u otra forma.',
      'Desarrolló la <b>lógica de Hoare</b>, un sistema formal para <b>demostrar matemáticamente que un programa es correcto</b>, sentando bases de la verificación de software. Ganó el Premio Turing en 1980.',
      'Con notable honestidad, llamó a la <b>referencia nula</b> (el valor “null” que él introdujo en 1965) su “<b>error de mil millones de dólares</b>”, por la incontable cantidad de fallos que ha causado en el software desde entonces. Una lección perdurable sobre cómo una pequeña decisión de diseño puede tener consecuencias enormes.'
    ] });

    cog.nota(cont, 'Serie <b>Personajes importantes en tecnología y computación</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', C);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Unix", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Unix", lang: "es" },
    { t: "World Wide Web", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/World_Wide_Web", lang: "es" },
    { t: "TCP/IP (Internet protocol suite)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Internet_protocol_suite", lang: "en" },
    { t: "Zero-knowledge proof", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Zero-knowledge_proof", lang: "en" },
    { t: "Turing Award", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Turing_Award", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Qué crearon Ken Thompson y Dennis Ritchie?", op: ["La World Wide Web", "El sistema Unix (y Ritchie el lenguaje C)", "El protocolo TCP/IP", "El algoritmo Quicksort"], ok: 1, porque: "Co-crearon Unix; Ritchie además creó C y reescribió Unix en él, haciéndolo portable. Casi todo el software moderno desciende de ahí." },
    { p: "TCP/IP (Cerf y Kahn) sirve para…", op: ["Ordenar datos", "Interconectar redes distintas y transmitir información en paquetes", "Cifrar contraseñas", "Componer páginas web"], ok: 1, porque: "TCP/IP es el idioma común que permite que redes y dispositivos distintos se comuniquen: el fundamento de internet." },
    { p: "Las pruebas de conocimiento cero (Goldwasser) permiten…", op: ["Ordenar listas rápido", "Demostrar que sabes un secreto sin revelarlo", "Enrutar paquetes", "Crear páginas web"], ok: 1, porque: "Permiten probar la posesión de un secreto (p. ej. una contraseña) sin revelar el secreto mismo." },
    { p: "Tim Berners-Lee es clave porque…", op: ["Inventó el ratón", "Inventó la Web (HTML, HTTP, URL) y la regaló al mundo", "Creó Linux", "Fundó el software libre"], ok: 1, porque: "Inventó la World Wide Web y decidió no patentarla, para que cualquiera pudiera construir sobre ella libremente." }
  ];

  E.registrar({
    id: "fund-computo-personajes-b-sistemas",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8.2,
    titulo: "Personajes en TyC · B. Sistemas y redes",
    sub: "Sistemas operativos, redes, internet y criptografía",
    resumen: "La plomería del mundo digital: Ritchie, Thompson, Torvalds, Stallman, Cerf, Perlman, Berners-Lee, Engelbart, Goldwasser y Hoare.",
    chips: [{ k: "Serie", v: "Personajes en TyC" }, { k: "Bloque", v: "B · Sistemas y redes" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-personajes-b-sistemas", QUIZ)
    }
  });
})();
