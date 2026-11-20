/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Personajes importantes en tecnología y computación
   Bloque D — Inteligencia Artificial, Machine Learning y robótica
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";
  var C = AM;

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Inteligencia Artificial, ML y robótica</h2>' +
      '<p>De una palabra acuñada en 1956 a los sistemas que hoy conversan, ven y conducen: este bloque reúne a quienes construyeron la inteligencia artificial moderna. Están los “padrinos” del aprendizaje profundo, los arquitectos de los grandes modelos de lenguaje, los pioneros del aprendizaje por refuerzo y de la robótica autónoma. Es la genealogía directa de la IA que usas hoy.</p>');
    cog.epigrafe(cont, "“La inteligencia artificial es la nueva electricidad.”", "Andrew Ng");

    cog.persona(cont, { slug: "john-mccarthy", nombre: "John McCarthy", color: C, etiqueta: "Padre de la IA · LISP", meta: "1927–2011 · Informático (EE. UU.)", parrafos: [
      'Fue quien <b>acuñó el término “Inteligencia Artificial”</b> al organizar, en 1955, el taller de Dartmouth. Defendía que la inteligencia podía replicarse mediante lógica formal: enseñar a la máquina qué es verdad y dejar que razone.',
      'En 1958 creó <b>LISP</b>, el idioma natal de la IA clásica, pensado para manipular símbolos y listas. De él salieron ideas hoy omnipresentes: la recolección de basura y el tiempo compartido, antecedente del cómputo en la nube.',
      'Fundó los laboratorios de IA del MIT y de Stanford (SAIL). Su apuesta —la mente como manipuladora de símbolos lógicos— dominó la IA durante tres décadas. Ganó el Premio Turing en 1971.'
    ] });

    cog.persona(cont, { slug: "geoffrey-hinton", nombre: "Geoffrey Hinton", color: C, etiqueta: "Padrino del deep learning", meta: "n. 1947 · Psicólogo e informático británico-canadiense", parrafos: [
      'Llamado el “padrino del aprendizaje profundo”, dedicó décadas a las <b>redes neuronales</b> cuando casi nadie creía en ellas. Formado en psicología experimental, su intuición era que la inteligencia podía emerger de redes que aprenden, al estilo del cerebro.',
      'Impulsó la <b>retropropagación</b> como método para entrenar redes de varias capas y, ya en los 2010, sus avances encendieron la revolución del deep learning. Fue mentor de una generación entera de investigadores clave. Ganó el <b>Premio Turing</b> (2018) y el <b>Nobel de Física</b> (2024).',
      'En 2023 dejó Google para poder hablar con libertad sobre los <b>riesgos</b> de la IA que él ayudó a crear, advirtiendo sobre peligros a largo plazo. Pocas personas encarnan tan bien el arco de la IA: de la fe solitaria en una idea impopular a la preocupación por sus consecuencias.'
    ] });

    cog.persona(cont, { slug: "yann-lecun", nombre: "Yann LeCun", color: C, etiqueta: "Visión · CNN", meta: "n. 1960 · Informático francés", parrafos: [
      'Informático francés, es el padre de las <b>redes neuronales convolucionales</b> (CNN), la arquitectura inspirada en la corteza visual que revolucionó la visión por computadora. En los años 90 su red <b>LeNet</b> ya leía cheques y códigos postales automáticamente.',
      'Esa idea —detectar patrones visuales por capas, de bordes a formas a objetos— es la base de cómo las máquinas hoy reconocen caras, diagnostican imágenes médicas y ven el entorno en los coches autónomos. Compartió el <b>Premio Turing</b> (2018) con Hinton y Bengio.',
      'Como científico jefe de IA en Meta, es una voz influyente y a menudo polémica: defiende el valor de la investigación abierta y es escéptico de algunos temores sobre la IA, apostando por nuevas arquitecturas que aprendan del mundo de forma más parecida a los animales.'
    ] });

    cog.persona(cont, { slug: "yoshua-bengio", nombre: "Yoshua Bengio", color: C, etiqueta: "Deep learning · Ética", meta: "n. 1964 · Informático canadiense", parrafos: [
      'Uno de los tres “padrinos” del aprendizaje profundo, es además el investigador en ciencias de la computación más citado del mundo. Desde Montreal, ayudó a sostener y hacer avanzar las redes neuronales durante los años en que estaban fuera de moda.',
      'Hizo aportes fundamentales al aprendizaje de representaciones, a los modelos del lenguaje y a los mecanismos de atención que luego harían posibles los grandes modelos. Compartió el <b>Premio Turing</b> (2018) con Hinton y LeCun. Fundó Mila, uno de los grandes institutos de IA del mundo.',
      'En los últimos años se ha volcado en la <b>seguridad y la gobernanza</b> de la IA, advirtiendo sobre los riesgos de sistemas cada vez más capaces y abogando por desarrollarlos con cautela. Representa la conciencia del campo: profundizar la ciencia sin perder de vista sus consecuencias sociales.'
    ] });

    cog.persona(cont, { slug: "jurgen-schmidhuber", nombre: "Jürgen Schmidhuber", color: C, etiqueta: "Redes recurrentes · LSTM", meta: "n. 1963 · Informático alemán", parrafos: [
      'Investigador alemán, co-creó en los años 90 las redes <b>LSTM</b> (<i>Long Short-Term Memory</i>), un tipo de red neuronal capaz de <b>recordar información a largo plazo</b> en secuencias. Fueron durante años la tecnología clave del reconocimiento de voz y la traducción automática.',
      'Si tu teléfono entendía tu voz o traducía un texto en la década de 2010, probablemente había una LSTM detrás. Su trabajo sobre memoria en las redes resolvió un problema que había frenado el procesamiento de secuencias durante mucho tiempo.',
      'Es también conocido por reivindicar enérgicamente la prioridad histórica de muchas ideas del deep learning, a menudo señalando que se inventaron antes de lo que se suele reconocer. Más allá de las polémicas, su contribución a cómo las máquinas procesan el tiempo y la secuencia es indiscutible.'
    ] });

    cog.persona(cont, { slug: "fei-fei-li", nombre: "Fei-Fei Li", color: C, etiqueta: "ImageNet", meta: "n. 1976 · Informática (Stanford)", parrafos: [
      'Entendió algo que otros pasaban por alto: que los algoritmos de visión no mejorarían sin <b>muchísimos datos</b>. Por eso lideró la creación de <b>ImageNet</b>, una base con millones de imágenes etiquetadas a mano.',
      'En 2012, un modelo de deep learning arrasó en la competencia de ImageNet y <b>detonó la revolución</b> del aprendizaje profundo: el momento en que la IA moderna despegó. ImageNet fue el combustible de esa explosión.',
      'Hoy codirige el instituto de <b>IA centrada en el ser humano (HAI)</b> de Stanford y es una de las grandes voces sobre la ética y el impacto social de la tecnología. Encendió la visión por computadora que luego otras someterían a auditoría.'
    ] });

    cog.persona(cont, { slug: "andrew-ng", nombre: "Andrew Ng", color: C, etiqueta: "Educación · ML aplicado", meta: "n. 1976 · Informático (Stanford)", parrafos: [
      'Uno de los grandes divulgadores y aplicadores del machine learning. Cofundó <b>Google Brain</b>, el equipo que llevó el deep learning a escala industrial en Google, y fue director de IA en Baidu, impulsándola en el mundo chino.',
      'Su mayor impacto quizá sea educativo: su curso de machine learning y la plataforma <b>Coursera</b> (que cofundó con Daphne Koller) y luego DeepLearning.AI formaron a <b>millones</b> de personas en todo el planeta. Democratizó el acceso a una tecnología antes reservada a unos pocos.',
      'Famoso por su frase “la IA es la nueva electricidad”, aboga por una adopción pragmática y extendida de la IA en todas las industrias. Combina investigación, emprendimiento y enseñanza con una misión clara: que el aprendizaje automático deje de ser élite y se vuelva herramienta universal.'
    ] });

    cog.persona(cont, { slug: "daphne-koller", nombre: "Daphne Koller", color: C, etiqueta: "IA probabilística", meta: "n. 1968 · Informática (Stanford)", parrafos: [
      'Experta en <b>modelos gráficos probabilísticos</b>: una forma de que la IA razone con información incompleta o incierta, representando relaciones entre variables y actualizando creencias con la evidencia (razonamiento bayesiano).',
      'Ese enfoque —decidir bajo incertidumbre, con probabilidades en vez de certezas— es complementario al deep learning y clave en la biomedicina, donde lo ha usado para entender datos genómicos y de salud.',
      'Cofundó <b>Coursera</b>, que llevó cursos universitarios a millones de personas, y fundó insitro, que aplica el aprendizaje automático al descubrimiento de fármacos. Une investigación de frontera con impacto social a gran escala.'
    ] });

    cog.persona(cont, { slug: "demis-hassabis", nombre: "Demis Hassabis", color: C, etiqueta: "DeepMind · AlphaFold", meta: "n. 1976 · Neurocientífico e informático británico", parrafos: [
      'Prodigio del ajedrez y diseñador de videojuegos en su juventud, estudió ciencias de la computación y luego neurociencia, convencido de que entender el cerebro era la clave para construir inteligencia. Cofundó <b>DeepMind</b>, uno de los laboratorios de IA más influyentes.',
      'Bajo su liderazgo, DeepMind creó <b>AlphaGo</b>, el sistema que venció al campeón mundial del Go —un hito que se creía a décadas de distancia— y <b>AlphaFold</b>, que resolvió el problema de predecir la estructura de las proteínas, un avance de enorme impacto para la biología y la medicina.',
      'Por AlphaFold recibió el <b>Premio Nobel de Química en 2024</b>. Su visión es usar la IA como herramienta para acelerar el descubrimiento científico y, eventualmente, alcanzar una inteligencia general. Encarna la unión entre neurociencia, juegos e IA de frontera.'
    ] });

    cog.persona(cont, { slug: "ilya-sutskever", nombre: "Ilya Sutskever", color: C, etiqueta: "Grandes modelos · OpenAI", meta: "n. 1986 · Informático canadiense-israelí", parrafos: [
      'Alumno de Hinton, fue co-autor de <b>AlexNet</b> (2012), la red que ganó ImageNet y desató la revolución del deep learning. Desde entonces estuvo en el centro de casi todos los grandes avances del campo.',
      'Cofundó <b>OpenAI</b> y, como su científico jefe, fue una mente clave detrás de la arquitectura y el escalamiento de los <b>grandes modelos de lenguaje</b> que dieron lugar a la familia GPT. Su apuesta por escalar modelos y datos a magnitudes enormes resultó extraordinariamente fértil.',
      'Preocupado por cómo controlar y alinear sistemas cada vez más potentes, se ha centrado en la <b>seguridad</b> de la IA avanzada. Representa a la generación que llevó las ideas de sus maestros a una escala que transformó la tecnología y la sociedad en pocos años.'
    ] });

    cog.persona(cont, { slug: "ian-goodfellow", nombre: "Ian Goodfellow", color: C, etiqueta: "GANs", meta: "n. 1985/86 · Informático (EE. UU.)", parrafos: [
      'Inventó en 2014 las <b>Redes Generativas Antagónicas</b> (GANs), la idea —según cuenta, surgida en una conversación de bar— de enfrentar <b>dos redes</b>: una que genera imágenes falsas y otra que intenta detectarlas, mejorando ambas en una competencia.',
      'Las GANs permitieron por primera vez generar <b>imágenes sintéticas sorprendentemente realistas</b> y abrieron el campo de la IA generativa visual. Son antecesoras directas de buena parte de las imágenes creadas por IA, y también de los <i>deepfakes</i>.',
      'Su invención planteó de inmediato preguntas éticas sobre la autenticidad de lo que vemos. Goodfellow trabajó en seguridad del aprendizaje automático, estudiando cómo engañar y proteger a los modelos. Su idea cambió lo que entendíamos por “crear” contenido con máquinas.'
    ] });

    cog.persona(cont, { slug: "andrej-karpathy", nombre: "Andrej Karpathy", color: C, etiqueta: "Visión · Divulgación", meta: "n. 1986 · Informático eslovaco-canadiense", parrafos: [
      'Investigador y uno de los mejores comunicadores del deep learning. Alumno de Fei-Fei Li, trabajó en visión por computadora y fue director de IA en <b>Tesla</b>, liderando el sistema de visión del piloto automático —enseñar a un coche a ver el mundo—.',
      'Miembro fundador de OpenAI, es célebre por sus cursos, charlas y ensayos que explican la IA con una claridad excepcional. Suya es la idea de los LLMs como <b>“máquinas de sueños”</b>: generar texto es soñar, y el prompt dirige el sueño.',
      'Su capacidad para hacer accesibles ideas complejas lo convirtió en referente para quien quiere entender de verdad cómo funcionan las redes neuronales y los modelos de lenguaje. Representa el valor de la divulgación rigurosa en un campo que avanza más rápido de lo que la mayoría puede seguir.'
    ] });

    cog.persona(cont, { slug: "richard-sutton", nombre: "Richard Sutton", color: C, etiqueta: "Aprendizaje por refuerzo", meta: "n. 1957 · Informático estadounidense-canadiense", parrafos: [
      'Es considerado el padre del <b>aprendizaje por refuerzo</b> moderno: el paradigma en que un agente aprende por ensayo y error, guiado por recompensas y castigos, como se entrena a un animal. Su libro de texto es la referencia del campo.',
      'El aprendizaje por refuerzo es la base de los sistemas que dominaron el Go y el ajedrez, y del <b>RLHF</b> que hoy alinea a los grandes modelos de lenguaje con las preferencias humanas. Sutton puso los fundamentos teóricos de todo ese edificio.',
      'Es célebre por su ensayo “<b>The Bitter Lesson</b>” (la amarga lección): la historia de la IA muestra que los métodos generales que aprovechan más cómputo y datos acaban superando a los que incorporan conocimiento humano hecho a mano. Una idea incómoda que marcó la estrategia del campo. Ganó el Premio Turing en 2024.'
    ] });

    cog.persona(cont, { slug: "stuart-russell", nombre: "Stuart Russell", color: C, etiqueta: "Fundamentos · Seguridad", meta: "n. 1962 · Informático británico", parrafos: [
      'Coautor, con Peter Norvig, de <i>Artificial Intelligence: A Modern Approach</i>, el <b>libro de texto de IA más usado del mundo</b>, con el que se han formado estudiantes en miles de universidades. Organiza y transmite el campo entero de forma coherente.',
      'En los últimos años se ha convertido en una de las voces más serias sobre la <b>seguridad y el control de la IA</b>: ¿cómo nos aseguramos de que sistemas muy capaces hagan lo que de verdad queremos, y no una interpretación literal y catastrófica de nuestras órdenes?',
      'En su libro <i>Human Compatible</i> propone replantear la IA para que sea <b>incierta sobre los objetivos humanos</b> y busque deferir a las personas. Combina el rigor del investigador fundamental con la preocupación pública por el rumbo de la tecnología.'
    ] });

    cog.persona(cont, { slug: "sebastian-thrun", nombre: "Sebastian Thrun", color: C, etiqueta: "Coches autónomos", meta: "n. 1967 · Informático alemán", parrafos: [
      'Roboticista alemán, lideró el equipo de Stanford que ganó el <b>DARPA Grand Challenge</b> con el vehículo autónomo <b>Stanley</b>, demostrando que un coche podía conducir solo por el desierto. Fue el pistoletazo de salida de la era de los autos autónomos.',
      'Fundó y dirigió el proyecto de coche autónomo de Google, que se convirtió en <b>Waymo</b>, pionero mundial de la conducción sin conductor. Su trabajo en robótica probabilística ayudó a que las máquinas navegaran un mundo lleno de incertidumbre.',
      'También cofundó <b>Udacity</b>, llevando educación tecnológica en línea a millones. Su carrera une dos pasiones: construir máquinas que se mueven de forma autónoma por el mundo real y democratizar el acceso al conocimiento que las hace posibles.'
    ] });

    cog.persona(cont, { slug: "pieter-abbeel", nombre: "Pieter Abbeel", color: C, etiqueta: "Robótica por refuerzo", meta: "n. 1977 · Roboticista belga", parrafos: [
      'Investigador belga en UC Berkeley, es una figura líder en la aplicación del <b>aprendizaje por refuerzo profundo a la robótica</b>: enseñar a robots habilidades físicas complejas —manipular objetos, caminar, doblar ropa— no programándolas a mano, sino dejando que las aprendan.',
      'Su trabajo en <b>aprendizaje por imitación</b> y refuerzo permite que los robots adquieran destrezas observando o practicando, acercándolos a la flexibilidad que tienen los humanos para aprender tareas nuevas.',
      'Formó a muchos investigadores destacados y cofundó empresas que llevan estas ideas a la industria. Es un puente entre la teoría del aprendizaje y su encarnación física: hacer que la inteligencia no solo piense, sino que actúe hábilmente en el mundo real.'
    ] });

    cog.persona(cont, { slug: "francoise-beaufays", nombre: "Françoise Beaufays", color: C, etiqueta: "Aprendizaje federado", meta: "n. s. XX · Investigadora (Google)", parrafos: [
      'Investigadora en Google, ha sido clave en el <b>reconocimiento de voz</b> y el procesamiento del lenguaje que usan a diario miles de millones de personas en sus teléfonos, mejorando cómo las máquinas entienden el habla.',
      'Es pionera del <b>aprendizaje federado</b>: una técnica para entrenar modelos de IA <b>sin enviar los datos privados</b> de los usuarios a un servidor central. El modelo aprende en el propio dispositivo y solo se comparten las mejoras, protegiendo la privacidad.',
      'Ese enfoque resuelve una tensión central de la IA moderna: mejorar los modelos con datos reales sin sacrificar la privacidad de las personas. Su trabajo muestra que el avance técnico y el respeto a los datos de los usuarios pueden ir de la mano.'
    ] });

    cog.nota(cont, 'Serie <b>Personajes importantes en tecnología y computación</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', C);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Inteligencia artificial", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Inteligencia_artificial", lang: "es" },
    { t: "Aprendizaje profundo", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Aprendizaje_profundo", lang: "es" },
    { t: "Deep learning", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Deep_learning", lang: "en" },
    { t: "AlphaFold", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/AlphaFold", lang: "en" },
    { t: "Reinforcement learning", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Reinforcement_learning", lang: "en" }
  ];

  var QUIZ = [
    { p: "Los tres “padrinos del deep learning” que compartieron el Premio Turing 2018 son…", op: ["Turing, Shannon y McCarthy", "Hinton, LeCun y Bengio", "Hassabis, Sutskever y Ng", "Goodfellow, Karpathy y Sutton"], ok: 1, porque: "Geoffrey Hinton, Yann LeCun y Yoshua Bengio recibieron el Turing 2018 por sus aportes fundacionales al aprendizaje profundo." },
    { p: "AlphaFold, de DeepMind (Hassabis), resolvió…", op: ["El ajedrez", "La predicción de la estructura de las proteínas", "La traducción automática", "El reconocimiento facial"], ok: 1, porque: "AlphaFold predijo la estructura 3D de las proteínas, un avance clave para la biología; le valió a Hassabis el Nobel de Química 2024." },
    { p: "Las GANs de Ian Goodfellow funcionan enfrentando…", op: ["Dos computadoras físicas", "Dos redes: una que genera y otra que detecta falsificaciones", "Un humano contra una máquina", "Dos bases de datos"], ok: 1, porque: "Una red genera datos falsos y otra intenta detectarlos; compiten y mejoran, logrando imágenes sintéticas muy realistas." },
    { p: "El aprendizaje por refuerzo (Sutton) se basa en…", op: ["Reglas lógicas escritas a mano", "Aprender por ensayo y error mediante recompensas y castigos", "Comprimir datos", "Traducir idiomas"], ok: 1, porque: "Un agente aprende qué hacer maximizando recompensas; es la base de los sistemas que dominan juegos y del RLHF que alinea a los LLMs." }
  ];

  E.registrar({
    id: "fund-computo-personajes-d-ia",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8.4,
    titulo: "Personajes en TyC · D. IA y ML",
    sub: "Inteligencia Artificial, Machine Learning y robótica",
    resumen: "Quienes construyeron la IA moderna: McCarthy, Hinton, LeCun, Bengio, Schmidhuber, Fei-Fei Li, Ng, Koller, Hassabis, Sutskever, Goodfellow, Karpathy, Sutton, Russell, Thrun, Abbeel y Beaufays.",
    chips: [{ k: "Serie", v: "Personajes en TyC" }, { k: "Bloque", v: "D · IA y ML" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-personajes-d-ia", QUIZ)
    }
  });
})();
