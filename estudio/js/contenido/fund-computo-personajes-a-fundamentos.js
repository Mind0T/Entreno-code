/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Personajes importantes en tecnología y computación
   Bloque A — Fundamentos teóricos, matemáticas y pioneros
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";
  var C = AZ;

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Fundamentos teóricos y pioneros</h2>' +
      '<p>Antes de que existiera una sola computadora electrónica, ya existían las <b>ideas</b> que la harían posible: una lógica que convierte el razonamiento en álgebra, una máquina que podría programarse, una teoría de qué es computable y qué no. Este bloque reúne a quienes pusieron los cimientos matemáticos y conceptuales de toda la disciplina — de un álgebra del siglo XIX al software que llevó al ser humano a la Luna.</p>');
    cog.epigrafe(cont, "“Si he visto más lejos, es por estar sobre los hombros de gigantes.”", "Isaac Newton");

    cog.persona(cont, { slug: "george-boole", nombre: "George Boole", color: C, etiqueta: "Lógica", meta: "1815–1864 · Matemático británico", parrafos: [
      'Matemático autodidacta inglés, en 1854 publicó <i>Las leyes del pensamiento</i>, donde propuso algo audaz: que el <b>razonamiento lógico</b> podía expresarse con <b>álgebra</b>. Su sistema operaba con solo dos valores —verdadero y falso, 1 y 0— y operaciones como Y, O y NO.',
      'En su época fue una curiosidad abstracta sin aplicación evidente. Pero ese <b>álgebra de Boole</b> resultó ser exactamente el lenguaje que, casi un siglo después, describiría el funcionamiento de los <b>circuitos digitales</b>: cada interruptor es un 0 o un 1, y combinarlos es hacer lógica booleana.',
      'Por eso Boole es, sin haberlo sabido, el abuelo del mundo digital: cada chip, cada procesador y cada operación de una computadora es, en el fondo, álgebra booleana ejecutada a velocidad vertiginosa. La lógica que él formalizó es el idioma materno de las máquinas.'
    ] });

    cog.persona(cont, { slug: "charles-babbage", nombre: "Charles Babbage", color: C, etiqueta: "Máquina programable", meta: "1791–1871 · Matemático e inventor (Reino Unido)", parrafos: [
      'Matemático e inventor británico, frustrado por los errores de las tablas de cálculo hechas a mano, concibió máquinas para automatizarlas. Su <b>Máquina Diferencial</b> y, sobre todo, su <b>Máquina Analítica</b> (1837) fueron diseños visionarios de computadoras mecánicas.',
      'La Máquina Analítica anticipó, con engranajes y tarjetas perforadas, los componentes de una computadora moderna: una unidad de cálculo (“el molino”, como una CPU), una memoria (“el almacén”), y <b>flujo de control</b> con bucles y bifurcaciones. Era una máquina de <b>propósito general</b>, programable.',
      'Nunca logró construirla por completo —la ingeniería y el financiamiento de su tiempo no alcanzaban—, pero el diseño era correcto. Babbage imaginó la arquitectura de la computación un siglo antes de que la electrónica la hiciera realidad, y por ello se le considera el <b>padre de la computadora</b>.'
    ] });

    cog.persona(cont, { slug: "ada-lovelace", nombre: "Ada Lovelace", color: C, etiqueta: "Primera programadora", meta: "1815–1852 · Matemática británica", parrafos: [
      'Hija del poeta Lord Byron y educada rigurosamente en matemáticas, colaboró con Babbage en torno a la Máquina Analítica. En sus notas de 1843 escribió lo que se considera el <b>primer algoritmo</b> pensado para ser ejecutado por una máquina: un método para calcular los números de Bernoulli.',
      'Su aporte más profundo fue la <b>visión</b>: comprendió que una máquina capaz de manipular símbolos no se limitaría a los números, y que podría, por ejemplo, componer música o manipular cualquier contenido representable con símbolos — la idea germinal de la computación de propósito general.',
      'También advirtió que la máquina “no tiene pretensión de originar nada”: solo hace lo que sabemos ordenarle, un matiz que sigue vigente en los debates sobre la IA generativa. El lenguaje de programación <b>Ada</b> lleva su nombre.'
    ] });

    cog.persona(cont, { slug: "alan-turing", nombre: "Alan Turing", color: C, etiqueta: "Teoría de la computación", meta: "1912–1954 · Matemático británico", parrafos: [
      'En 1936, con <i>“On Computable Numbers”</i>, definió un dispositivo abstracto —la <b>máquina universal de Turing</b>— capaz de ejecutar cualquier algoritmo. Ese artículo fundó la <b>teoría de la computación</b> y delimitó, de paso, qué problemas ninguna máquina puede resolver.',
      'Durante la Segunda Guerra Mundial lideró en Bletchley Park el descifrado de la máquina alemana <b>Enigma</b>; se estima que ese trabajo acortó la guerra en años. En 1950 propuso el <b>Test de Turing</b> como forma pragmática de preguntar si una máquina “piensa”.',
      'Procesado en 1952 por su homosexualidad —entonces delito en el Reino Unido— murió dos años después; recibió un perdón oficial póstumo en 2013. El mayor galardón de la computación, el <b>Premio Turing</b>, lleva su nombre, y es considerado padre tanto de la informática como de la IA.'
    ] });

    cog.persona(cont, { slug: "john-von-neumann", nombre: "John von Neumann", color: C, etiqueta: "Arquitectura de computadoras", meta: "1903–1957 · Matemático húngaro-estadounidense", parrafos: [
      'Polímata húngaro-estadounidense de genio legendario, hizo aportes decisivos a las matemáticas, la física cuántica, la economía (teoría de juegos) y la computación. Su mente abarcaba campos enteros con una facilidad que asombraba a sus contemporáneos.',
      'En 1945 describió la <b>arquitectura de von Neumann</b>: una computadora con una memoria única que guarda <b>tanto los datos como el propio programa</b>, y una unidad de proceso que los lee y ejecuta. Esa idea del “programa almacenado” es la base de prácticamente todas las computadoras que usamos hoy.',
      'Antes de él, reprogramar una máquina significaba recablearla físicamente. Su diseño hizo del software algo flexible y de propósito general. También exploró los <b>autómatas autorreplicantes</b>, anticipando preguntas sobre máquinas que se construyen a sí mismas.'
    ] });

    cog.persona(cont, { slug: "claude-shannon", nombre: "Claude Shannon", color: C, etiqueta: "Teoría de la información", meta: "1916–2001 · Matemático e ingeniero (EE. UU.)", parrafos: [
      'En su tesis de maestría de 1937 demostró que los <b>circuitos de conmutación</b> podían implementar cualquier operación del <b>álgebra de Boole</b>: el puente entre la lógica abstracta y el hardware real. Fue el plano de toda la electrónica digital.',
      'En 1948 fundó la <b>Teoría de la Información</b>: definió cómo medir, comprimir y transmitir información sin error, y popularizó el <b>bit</b> como su unidad. Es la base de las telecomunicaciones, la compresión de datos y los códigos correctores de errores.',
      'Tan brillante como lúdico, construyó un ratón mecánico que aprendía laberintos y estudió el ajedrez por computadora. Recorría los pasillos de Bell Labs en monociclo. Su obra sostiene, silenciosamente, cada mensaje que enviamos por el mundo.'
    ] });

    cog.persona(cont, { slug: "grace-hopper", nombre: "Grace Hopper", color: C, etiqueta: "Compiladores", meta: "1906–1992 · Informática y contraalmirante (EE. UU.)", parrafos: [
      'Doctora en matemáticas por Yale y contraalmirante de la Marina de los EE. UU., programó la Harvard Mark I durante la Segunda Guerra Mundial. Es una de las figuras más influyentes de la historia del software.',
      'Su idea revolucionaria: programar no debía hacerse en lenguaje de máquina, sino en algo <b>cercano al humano</b>. Hacia 1952 creó el primer <b>compilador</b>, que traduce instrucciones legibles por personas a código máquina — algo que muchos creían imposible.',
      'Ese principio desembocó en <b>COBOL</b>, que aún mueve sistemas bancarios. Popularizó el término <b>“bug”</b> al retirar una polilla de un relé. Su legado es la idea de que el software debe ser accesible, no solo para ingenieros.'
    ] });

    cog.persona(cont, { slug: "margaret-hamilton", nombre: "Margaret Hamilton", color: C, etiqueta: "Ingeniería de software", meta: "n. 1936 · Ingeniera (MIT / NASA)", parrafos: [
      'Dirigió en el MIT el equipo que escribió el <b>software de vuelo del programa Apolo</b>. En una época en que programar apenas se consideraba una disciplina, insistió en tratarlo con rigor y <b>acuñó el término “ingeniería de software”</b>.',
      'Su obsesión por la <b>tolerancia a fallos</b> salvó el Apolo 11: durante el descenso a la Luna, su sistema de prioridades descartó tareas no esenciales ante una sobrecarga, en lugar de colapsar, y permitió completar el alunizaje.',
      'Esos principios —detección de errores, recuperación, fallar con gracia— son hoy el cimiento de cualquier sistema crítico, incluida la IA que opera en el mundo real. Recibió la Medalla Presidencial de la Libertad en 2016.'
    ] });

    cog.persona(cont, { slug: "edsger-w-dijkstra", nombre: "Edsger W. Dijkstra", color: C, etiqueta: "Algoritmos y rigor", meta: "1930–2002 · Informático neerlandés", parrafos: [
      'Informático neerlandés, campeón del <b>rigor</b> en la programación. Insistía en que escribir software es una disciplina matemática que exige precisión y demostración, no prueba y error. Sus ensayos, mordaces y memorables, marcaron la cultura del campo.',
      'Su <b>algoritmo de Dijkstra</b> (1959) encuentra el <b>camino más corto</b> en un grafo y es uno de los más usados del mundo: vive en los GPS, el enrutamiento de internet y las redes. Es un clásico que casi todo estudiante de computación aprende.',
      'Impulsó la <b>programación estructurada</b> y su célebre crítica “la sentencia GOTO considerada dañina” cambió cómo escribimos código, favoreciendo estructuras claras sobre saltos caóticos. Ganó el Premio Turing en 1972. Para él, la elegancia y la corrección eran inseparables.'
    ] });

    cog.persona(cont, { slug: "donald-knuth", nombre: "Donald Knuth", color: C, etiqueta: "Análisis de algoritmos", meta: "n. 1938 · Informático estadounidense", parrafos: [
      'Considerado el “padre del análisis de algoritmos”, dedicó décadas a su obra monumental <i>The Art of Computer Programming</i>, una referencia tan rigurosa y completa que Bill Gates dijo que quien la leyera entera debería enviarle su currículum.',
      'Formalizó cómo medir la <b>eficiencia</b> de los algoritmos y popularizó la notación para analizar su costo en tiempo y memoria —herramientas con las que hoy se evalúa todo programa—. Ganó el Premio Turing en 1974.',
      'Frustrado por la mala tipografía de sus libros, creó el sistema <b>TeX</b>, que revolucionó la composición de textos científicos y matemáticos y que aún es el estándar para publicar ciencia. Es también famoso por su humor: ofrece cheques simbólicos a quien encuentre errores en sus libros.'
    ] });

    cog.nota(cont, 'Este bloque es parte de la serie <b>Personajes importantes en tecnología y computación</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', C);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Historia de la computación", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Historia_de_la_computación", lang: "es" },
    { t: "Arquitectura de von Neumann", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Arquitectura_de_von_Neumann", lang: "es" },
    { t: "Premio Turing (ACM A.M. Turing Award)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Turing_Award", lang: "en" },
    { t: "The Turing Test", fuente: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/turing-test/", lang: "en" },
    { t: "History of computing", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/History_of_computing", lang: "en" }
  ];

  var QUIZ = [
    { p: "El álgebra de Boole es la base de…", op: ["Los lenguajes funcionales", "Los circuitos digitales", "La robótica social", "Los compiladores"], ok: 1, porque: "Shannon mostró que los circuitos de conmutación implementan el álgebra booleana: la lógica de 1 y 0 es el cimiento del hardware digital." },
    { p: "La “arquitectura de von Neumann” introdujo la idea de…", op: ["Una máquina sin memoria", "Guardar el programa y los datos en la misma memoria", "Recablear la máquina para cada tarea", "El primer compilador"], ok: 1, porque: "El programa almacenado —datos y programa en una memoria común— es la base de casi todas las computadoras modernas." },
    { p: "El algoritmo de Dijkstra sirve para…", op: ["Ordenar listas", "Encontrar el camino más corto en un grafo", "Comprimir imágenes", "Entrenar redes neuronales"], ok: 1, porque: "Calcula la ruta más corta en un grafo; vive en los GPS, el enrutamiento de internet y las redes." },
    { p: "Ada Lovelace es reconocida por…", op: ["Inventar el transistor", "Escribir el primer algoritmo y prever usos más allá del cálculo", "Fundar la teoría de la información", "Crear COBOL"], ok: 1, porque: "Escribió el primer algoritmo para la Máquina Analítica de Babbage y vio que una máquina de símbolos podía ir más allá de los números." }
  ];

  E.registrar({
    id: "fund-computo-personajes-a-fundamentos",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8.1,
    titulo: "Personajes en TyC · A. Fundamentos",
    sub: "Fundamentos teóricos, matemáticas y pioneros",
    resumen: "Quienes pusieron los cimientos de la computación: Boole, Babbage, Lovelace, Turing, von Neumann, Shannon, Hopper, Hamilton, Dijkstra y Knuth.",
    chips: [{ k: "Serie", v: "Personajes en TyC" }, { k: "Bloque", v: "A · Fundamentos" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-personajes-a-fundamentos", QUIZ)
    }
  });
})();
