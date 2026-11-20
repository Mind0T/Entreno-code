/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Personajes importantes en tecnología y computación
   Bloque E — Nube, Big Data, hardware y sistemas distribuidos
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";
  var C = AZ;

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Nube, Big Data y sistemas distribuidos</h2>' +
      '<p>Cuando los datos y el tráfico crecieron más allá de lo que una sola máquina podía manejar, hubo que aprender a repartir el trabajo entre <b>miles</b> de computadoras que actúan como una sola. Este bloque reúne a quienes inventaron la nube, el Big Data, los contenedores y el hardware especializado: la infraestructura invisible sobre la que corre —literalmente— internet y la IA moderna.</p>');
    cog.epigrafe(cont, "“Todo falla, todo el tiempo.”", "Werner Vogels, sobre diseñar para la escala");

    cog.persona(cont, { slug: "leslie-lamport", nombre: "Leslie Lamport", color: C, etiqueta: "Sistemas distribuidos", meta: "n. 1941 · Informático (EE. UU.)", parrafos: [
      'Uno de los grandes teóricos de los <b>sistemas distribuidos</b>: cómo lograr que muchas computadoras separadas, sin un reloj común, se pongan de acuerdo y actúen de forma coherente a pesar de retrasos y fallos. Es un problema endiabladamente difícil que él ayudó a domar.',
      'Formalizó nociones fundamentales sobre el <b>tiempo y el orden</b> de los eventos en sistemas distribuidos, y creó algoritmos de consenso como Paxos, que permiten que un grupo de máquinas acuerde un valor aunque algunas fallen. Son cimientos de los servicios en la nube que usamos a diario.',
      'Es además el creador de <b>LaTeX</b>, el sistema de composición de documentos con que se escribe gran parte de la ciencia del mundo. Ganó el Premio Turing en 2013. Su trabajo demuestra que detrás de la aparente simplicidad de un servicio en línea hay matemáticas muy profundas.'
    ] });

    cog.persona(cont, { slug: "eric-brewer", nombre: "Eric Brewer", color: C, etiqueta: "Teorema CAP", meta: "n. 1967 · Informático (UC Berkeley / Google)", parrafos: [
      'Formuló el <b>Teorema CAP</b>, una de las ideas más citadas de los sistemas distribuidos. Afirma que, cuando la red entre máquinas se parte, un sistema no puede garantizar a la vez <b>consistencia</b> (todos ven el mismo dato) y <b>disponibilidad</b> (todos reciben respuesta): hay que elegir.',
      'Ese principio obliga a cada arquitecto de sistemas a tomar decisiones conscientes sobre qué sacrificar bajo fallo. Es una guía fundamental para diseñar bases de datos y servicios a gran escala, desde redes sociales hasta bancos.',
      'Como vicepresidente de infraestructura en Google Cloud, aplicó esas ideas a una de las infraestructuras más grandes del planeta. Su teorema convirtió una intuición difusa de los ingenieros en un principio claro que estructura cómo pensamos la fiabilidad a escala.'
    ] });

    cog.persona(cont, { slug: "jeff-dean", nombre: "Jeff Dean", color: C, etiqueta: "Infraestructura de Google · IA", meta: "n. 1968 · Informático (EE. UU.)", parrafos: [
      'Legendario ingeniero de Google, co-creó las tecnologías que permitieron procesar cantidades colosales de datos: <b>MapReduce</b> (un modelo para repartir cálculos entre miles de máquinas) y <b>Bigtable</b> (una base de datos a escala planetaria). Su trabajo definió la era del Big Data.',
      'Esas herramientas hicieron posible indexar toda la web y sostener los servicios de Google. Luego lideró <b>TensorFlow</b> y los equipos de IA de la empresa, llevando el aprendizaje profundo a escala industrial. Pocos ingenieros han moldeado tanto la infraestructura del mundo digital.',
      'Su reputación es tal que circulan “hechos de Jeff Dean” al estilo de bromas sobre superhéroes de la ingeniería. Más allá del folclore, su obra es un pilar real de cómo se procesan datos masivos y se entrena IA a la escala que exige el presente.'
    ] });

    cog.persona(cont, { slug: "sanjay-ghemawat", nombre: "Sanjay Ghemawat", color: C, etiqueta: "Big Data", meta: "n. 1966 · Informático indio-estadounidense", parrafos: [
      'Compañero de trabajo inseparable de Jeff Dean, co-arquitectó algunas de las infraestructuras más importantes de Google: el <b>Google File System</b> (GFS), un sistema para almacenar archivos gigantescos repartidos entre miles de máquinas, y <b>MapReduce</b>.',
      'El GFS resolvió cómo guardar de forma fiable petabytes de datos sobre hardware barato que falla constantemente, asumiendo el fallo como norma y no como excepción. Fue la base del almacenamiento a gran escala e inspiró sistemas abiertos como Hadoop.',
      'Discreto y enormemente respetado, forma con Dean una de las parejas de ingeniería más productivas de la historia de la computación. Su trabajo, casi invisible para el usuario, es lo que hace que buscar en internet o guardar datos en la nube “simplemente funcione”.'
    ] });

    cog.persona(cont, { slug: "urs-holzle", nombre: "Urs Hölzle", color: C, etiqueta: "Centros de datos", meta: "n. 1964 · Informático suizo", parrafos: [
      'Uno de los primeros ingenieros clave de Google, fue el arquitecto de su <b>infraestructura de centros de datos</b>. Tomó una decisión estratégica brillante: construir la potencia de Google con <b>muchísimas computadoras baratas</b> trabajando juntas, en lugar de pocas máquinas caras.',
      'Ese enfoque —hardware común, software inteligente que tolera sus fallos— definió cómo se construyen hoy los grandes centros de datos del mundo y es la base física de la computación en la nube. También impulsó la <b>eficiencia energética</b> de esas instalaciones.',
      'Su trabajo demuestra que la escala no se logra solo con mejores máquinas, sino con una arquitectura que convierte miles de piezas corrientes y falibles en un sistema confiable. Es, literalmente, quien diseñó los cimientos físicos sobre los que corre buena parte de internet.'
    ] });

    cog.persona(cont, { slug: "david-patterson", nombre: "David Patterson", color: C, etiqueta: "Arquitectura · RISC · TPU", meta: "n. 1947 · Informático (UC Berkeley)", parrafos: [
      'Pionero de la arquitectura de computadoras, co-desarrolló el enfoque <b>RISC</b> (conjunto reducido de instrucciones): procesadores más simples y rápidos que, contra la intuición de la época, resultaron más eficientes. RISC es hoy la base de los chips de casi todos los teléfonos y dispositivos (como los ARM).',
      'Coautor del libro de texto de referencia sobre arquitectura de computadoras, formó a generaciones de ingenieros. Más tarde, en Google, participó en el diseño de las <b>TPUs</b>, chips especializados para acelerar el entrenamiento de redes neuronales.',
      'Ganó el Premio Turing en 2017 (con John Hennessy). Su carrera une dos extremos cruciales: diseñar los procesadores de propósito general que llevamos en el bolsillo y el hardware especializado que hace posible la IA moderna. El rendimiento de todo lo digital descansa en decisiones como las suyas.'
    ] });

    cog.persona(cont, { slug: "werner-vogels", nombre: "Werner Vogels", color: C, etiqueta: "AWS", meta: "n. 1958 · Informático neerlandés", parrafos: [
      'Como director de tecnología (CTO) de Amazon, es el arquitecto y visionario detrás de <b>Amazon Web Services (AWS)</b>, el servicio que inauguró y lidera la computación en la nube: alquilar potencia de cómputo y almacenamiento bajo demanda, en lugar de comprar servidores.',
      'AWS transformó la industria: permitió que cualquier startup accediera, por unos dólares, a la misma infraestructura que antes solo tenían los gigantes. Buena parte de internet —apps, servicios, sitios— corre hoy sobre la nube que él ayudó a definir.',
      'Su filosofía de diseño asume que “<b>todo falla, todo el tiempo</b>”, y por eso construye sistemas que siguen funcionando a pesar de los fallos constantes a gran escala. Es una de las figuras que convirtió la computación en un servicio, como el agua o la electricidad.'
    ] });

    cog.persona(cont, { slug: "james-hamilton", nombre: "James Hamilton", color: C, etiqueta: "Infraestructura de nube", meta: "n. s. XX · Ingeniero (AWS)", parrafos: [
      'Ingeniero distinguido de AWS, es una de las mentes clave detrás de la <b>infraestructura física</b> de la nube de Amazon: servidores, redes, centros de datos y hasta el diseño energético que los alimenta, optimizados al extremo para la escala planetaria.',
      'Su obsesión es la <b>eficiencia</b>: cada mejora en cómo se enfría un servidor, se distribuye la energía o se conectan las máquinas se multiplica por millones de equipos, con un impacto enorme en costo y en consumo. Es ingeniería de escala masiva, donde los detalles importan muchísimo.',
      'Antes trabajó en bases de datos de alto rendimiento. Su carrera ilustra una verdad poco glamurosa pero esencial: la nube no es magia, sino una colosal obra de ingeniería física y logística, llevada al límite por personas que optimizan lo que nadie ve.'
    ] });

    cog.persona(cont, { slug: "swami-sivasubramanian", nombre: "Swami Sivasubramanian", color: C, etiqueta: "Datos e IA en la nube", meta: "n. s. XX · Informático indio-estadounidense", parrafos: [
      'Vicepresidente de datos e IA en AWS, ha liderado el desarrollo de servicios de <b>bases de datos y machine learning</b> en la nube que usan millones de empresas, haciendo accesibles tecnologías que antes requerían equipos especializados.',
      'Fue parte del equipo original detrás de <b>DynamoDB</b> y de los sistemas de almacenamiento distribuido de Amazon, y luego impulsó <b>SageMaker</b>, la plataforma que facilita construir, entrenar y desplegar modelos de IA sin montar la infraestructura desde cero.',
      'Su trabajo representa la fase en que la IA y el manejo de datos masivos dejaron de ser proyectos artesanales para convertirse en <b>servicios</b> que cualquier organización puede contratar. Es parte de quienes hicieron la IA práctica y escalable para el mundo real.'
    ] });

    cog.persona(cont, { slug: "doug-cutting", nombre: "Doug Cutting", color: C, etiqueta: "Hadoop · Big Data abierto", meta: "n. 1963 · Informático (EE. UU.)", parrafos: [
      'Creó <b>Apache Hadoop</b>, la implementación de código abierto que llevó las ideas de Google (GFS y MapReduce) a todo el mundo, permitiendo que cualquier empresa procesara cantidades enormes de datos sobre grupos de máquinas corrientes.',
      'Hadoop fue el motor de la primera gran era del <b>Big Data</b>: democratizó el procesamiento masivo de información y creó una industria entera alrededor del análisis de datos a gran escala. Curiosamente, lo bautizó con el nombre del elefante de peluche de su hijo.',
      'Antes había creado <b>Lucene</b>, la biblioteca de búsqueda de texto que está detrás de innumerables buscadores. Su trayectoria encarna el poder del software libre: tomar las mejores ideas de los gigantes tecnológicos y ponerlas al alcance de todos.'
    ] });

    cog.persona(cont, { slug: "matei-zaharia", nombre: "Matei Zaharia", color: C, etiqueta: "Apache Spark", meta: "n. 1984 · Informático rumano-canadiense", parrafos: [
      'Creó <b>Apache Spark</b> durante su doctorado en Berkeley: un motor de procesamiento de datos a gran escala mucho más rápido que Hadoop, porque trabaja en memoria y unifica distintos tipos de análisis en una sola herramienta.',
      'Spark se convirtió en el estándar para el análisis de Big Data y el machine learning a escala, adoptado por incontables empresas. Hizo el procesamiento masivo de datos no solo posible, sino ágil, abriendo la puerta a análisis interactivos sobre volúmenes enormes.',
      'Cofundó Databricks, una de las grandes compañías de datos e IA, y sigue investigando en sistemas y aprendizaje automático. Representa la generación que, sobre los cimientos del Big Data temprano, construyó herramientas más veloces y accesibles para la era de los datos.'
    ] });

    cog.persona(cont, { slug: "solomon-hykes", nombre: "Solomon Hykes", color: C, etiqueta: "Docker · Contenedores", meta: "n. 1983 · Informático francés-estadounidense", parrafos: [
      'Creó <b>Docker</b>, la herramienta que popularizó los <b>contenedores</b>: una forma de empaquetar una aplicación con todo lo que necesita para funcionar, de modo que corra igual en cualquier máquina —la del desarrollador, la de pruebas o la nube—.',
      'Docker resolvió el eterno problema del “en mi computadora sí funciona”: al estandarizar cómo se empaqueta y despliega el software, transformó la forma en que se construyen y entregan las aplicaciones modernas. Fue un cambio cultural además de técnico.',
      'Los contenedores se volvieron la unidad básica de la computación en la nube y de los microservicios. La idea de Hykes hizo el software más portátil, reproducible y fácil de escalar, y es hoy una pieza fundamental de cómo se despliega casi todo en internet.'
    ] });

    cog.persona(cont, { slug: "brendan-burns", nombre: "Brendan Burns", color: C, etiqueta: "Kubernetes", meta: "n. s. XX · Informático (Google / Microsoft)", parrafos: [
      'Co-creó <b>Kubernetes</b> en Google, el sistema que <b>orquesta contenedores</b>: si Docker empaqueta una aplicación, Kubernetes gestiona miles de esos paquetes a la vez, decidiendo dónde corren, reiniciándolos si fallan y escalándolos según la demanda.',
      'Kubernetes se convirtió en el estándar de facto para desplegar y operar aplicaciones a gran escala en la nube. Automatiza tareas que antes exigían ejércitos de administradores, y es la base sobre la que se construyen hoy los sistemas modernos de software.',
      'Basado en la experiencia interna de Google gestionando sus propios servicios, se liberó como código abierto y creó un ecosistema enorme a su alrededor. Burns, hoy en Microsoft Azure, es una figura central de la era “nativa de la nube”.'
    ] });

    cog.persona(cont, { slug: "kelsey-hightower", nombre: "Kelsey Hightower", color: C, etiqueta: "Cloud Native", meta: "n. 1981 · Ingeniero (EE. UU.)", parrafos: [
      'Más que por un invento, es célebre por su papel como <b>comunicador y referente</b> del movimiento “nativo de la nube” (<i>cloud native</i>). Explicó y enseñó Kubernetes y las tecnologías de contenedores a una comunidad enorme con una claridad legendaria.',
      'Su guía “Kubernetes the Hard Way” enseñó a incontables ingenieros a entender la tecnología desde sus fundamentos, no como una caja negra. Sus demostraciones en vivo, a menudo arriesgadas y memorables, marcaron la cultura del sector.',
      'Autodidacta que llegó a lo más alto de la industria, es también un ejemplo inspirador de trayectoria. Su contribución recuerda que la tecnología no avanza solo con quien la inventa, sino con quien la hace <b>comprensible y accesible</b> para todos los demás.'
    ] });

    cog.persona(cont, { slug: "mitchell-hashimoto", nombre: "Mitchell Hashimoto", color: C, etiqueta: "Infraestructura como código", meta: "n. 1988 · Informático (EE. UU.)", parrafos: [
      'Fundó HashiCorp y creó herramientas que definieron la <b>infraestructura como código</b>: la idea de describir servidores, redes y servicios en archivos de texto versionables, en lugar de configurarlos a mano, haciéndolos reproducibles y automatizables.',
      'Su herramienta <b>Terraform</b> se volvió estándar para construir y gestionar infraestructura en la nube de forma declarativa: describes el estado deseado y la herramienta lo hace realidad. También creó Vagrant, Vault y otras utilidades ampliamente usadas.',
      'Su trabajo profesionalizó la gestión de infraestructura, llevándola el rigor del desarrollo de software: control de versiones, revisión, automatización. Es una figura clave de la generación que convirtió operar sistemas en una disciplina de ingeniería tan seria como programarlos.'
    ] });

    cog.persona(cont, { slug: "martin-fowler", nombre: "Martin Fowler", color: C, etiqueta: "Arquitectura de software", meta: "n. 1963 · Ingeniero de software británico", parrafos: [
      'Uno de los pensadores más influyentes sobre <b>cómo diseñar y estructurar software</b>. Sus libros y artículos sobre <i>refactoring</i> (mejorar el código sin cambiar su comportamiento), patrones de diseño y arquitectura formaron a generaciones de desarrolladores.',
      'Popularizó y clarificó el concepto de <b>microservicios</b>: dividir una aplicación grande en servicios pequeños e independientes que se despliegan y escalan por separado, un enfoque dominante en los sistemas modernos a gran escala.',
      'Fue además uno de los firmantes del <b>Manifiesto Ágil</b>, que transformó cómo se organizan los equipos de software. Su don es destilar prácticas complejas en ideas claras y accionables. Es una brújula para quienes construyen sistemas que deben crecer y mantenerse en el tiempo.'
    ] });

    cog.nota(cont, 'Serie <b>Personajes importantes en tecnología y computación</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', C);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Computación en la nube", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Computación_en_la_nube", lang: "es" },
    { t: "Teorema CAP", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Teorema_CAP", lang: "es" },
    { t: "MapReduce", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/MapReduce", lang: "en" },
    { t: "Kubernetes", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Kubernetes", lang: "en" },
    { t: "Apache Spark", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Apache_Spark", lang: "en" }
  ];

  var QUIZ = [
    { p: "El Teorema CAP (Brewer) dice que, ante una partición de red, no puedes tener a la vez…", op: ["Velocidad y memoria", "Consistencia y disponibilidad", "Hardware y software", "Datos y programas"], ok: 1, porque: "Cuando la red se parte hay que elegir entre que todos vean el mismo dato (consistencia) o que todos reciban respuesta (disponibilidad)." },
    { p: "MapReduce y GFS (Dean y Ghemawat) sirvieron para…", op: ["Diseñar lenguajes", "Procesar y almacenar datos masivos repartidos entre miles de máquinas", "Cifrar comunicaciones", "Entrenar robots"], ok: 1, porque: "Fueron la base del Big Data: repartir cálculo y almacenamiento entre muchas máquinas corrientes que fallan constantemente." },
    { p: "Docker (Hykes) popularizó los contenedores, que sirven para…", op: ["Ordenar datos", "Empaquetar una app con todo lo que necesita para que corra igual en cualquier máquina", "Cifrar discos", "Crear páginas web"], ok: 1, porque: "Resuelven el “en mi computadora sí funciona”: estandarizan cómo se empaqueta y despliega el software." },
    { p: "Kubernetes (Burns) se encarga de…", op: ["Escribir código", "Orquestar miles de contenedores: dónde corren, reiniciarlos y escalarlos", "Diseñar chips", "Formular teoremas"], ok: 1, porque: "Si Docker empaqueta una app, Kubernetes gestiona a gran escala muchos de esos contenedores de forma automática." }
  ];

  E.registrar({
    id: "fund-computo-personajes-e-nube",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8.5,
    titulo: "Personajes en TyC · E. Nube y datos",
    sub: "Nube, Big Data, hardware y sistemas distribuidos",
    resumen: "La infraestructura a escala planetaria: Lamport, Brewer, Dean, Ghemawat, Hölzle, Patterson, Vogels, Hamilton, Sivasubramanian, Cutting, Zaharia, Hykes, Burns, Hightower, Hashimoto y Fowler.",
    chips: [{ k: "Serie", v: "Personajes en TyC" }, { k: "Bloque", v: "E · Nube y datos" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-personajes-e-nube", QUIZ)
    }
  });
})();
