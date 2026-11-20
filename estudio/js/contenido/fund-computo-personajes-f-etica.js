/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Personajes importantes en tecnología y computación
   Bloque F — Ética de datos, privacidad y justicia algorítmica
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";
  var C = RO;

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Ética, privacidad y justicia algorítmica</h2>' +
      '<p>A medida que los algoritmos empezaron a decidir quién recibe un crédito, un trabajo o la atención de la policía, se volvió urgente una pregunta: ¿son justos? ¿respetan nuestra privacidad? Este bloque reúne a quienes convirtieron la ética de la tecnología en una disciplina rigurosa —con matemáticas para proteger datos y con investigación para exponer los sesgos— y a los filósofos que piensan qué significa todo esto.</p>');
    cog.epigrafe(cont, "“Los algoritmos son opiniones encerradas en matemáticas.”", "Cathy O'Neil");

    cog.persona(cont, { slug: "cynthia-dwork", nombre: "Cynthia Dwork", color: C, etiqueta: "Privacidad diferencial", meta: "n. 1958 · Informática (Harvard)", parrafos: [
      'Co-inventó la <b>privacidad diferencial</b>, uno de los avances más importantes en la protección de datos. La idea es ingeniosa: añadir una cantidad <b>calibrada de ruido aleatorio</b> a los datos o a los resultados, de modo que se puedan obtener estadísticas útiles del conjunto sin poder identificar a ningún individuo.',
      'Con ello resolvió matemáticamente una tensión central de la era de los datos: cómo aprender de la información de millones de personas sin exponer a ninguna en particular. Hoy la usan empresas y gobiernos —incluido el censo de EE. UU.— para publicar datos sin violar la privacidad.',
      'También ha trabajado en la <b>equidad algorítmica</b>, formalizando qué significa que un sistema sea justo. Su obra ejemplifica una idea poderosa: que problemas sociales como la privacidad y la justicia pueden abordarse con rigor matemático, no solo con buenas intenciones.'
    ] });

    cog.persona(cont, { slug: "latanya-sweeney", nombre: "Latanya Sweeney", color: C, etiqueta: "Re-identificación · k-anonimato", meta: "n. 1959 · Informática (Harvard)", parrafos: [
      'Demostró, de forma contundente, lo frágil que es el anonimato: mostró que datos “anónimos” podían <b>re-identificar</b> a personas combinándolos con información pública. Con solo el código postal, la fecha de nacimiento y el sexo, identificó los registros médicos de un gobernador.',
      'Para enfrentar eso formuló el <b>k-anonimato</b>: un criterio que exige que cada registro sea indistinguible de al menos otros k−1, de modo que no se pueda señalar a un individuo concreto. Fue un primer marco formal para proteger la privacidad en datos publicados.',
      'Como profesora en Harvard y figura pública, ha investigado también la <b>discriminación algorítmica</b> —por ejemplo, cómo ciertos anuncios con sesgo racial aparecían según el nombre buscado—. Su trabajo une la técnica con la defensa de los derechos de las personas en un mundo de datos.'
    ] });

    cog.persona(cont, { slug: "timnit-gebru", nombre: "Timnit Gebru", color: C, etiqueta: "Ética de la IA", meta: "n. 1982/83 · Informática (DAIR)", parrafos: [
      'Investigadora nacida en Etiopía y refugiada en Estados Unidos, es una de las figuras centrales de la ética de la IA. Colaboró en los estudios que expusieron el sesgo del reconocimiento facial con mujeres y personas de piel oscura.',
      'Fue coautora del influyente artículo sobre los <b>“loros estocásticos”</b>, que advierte de los riesgos de los modelos de lenguaje gigantes: su costo ambiental, su opacidad, el sesgo de los datos y el peligro de confundir fluidez con comprensión real.',
      'Su salida de Google en 2020, ligada a ese trabajo, desató un debate mundial sobre la <b>independencia de la investigación ética</b> dentro de las grandes tecnológicas. Fundó el instituto <b>DAIR</b> para investigar la IA fuera de la influencia corporativa.'
    ] });

    cog.persona(cont, { slug: "margaret-mitchell", nombre: "Margaret Mitchell", color: C, etiqueta: "Transparencia · Model Cards", meta: "n. 1980s · Informática (Hugging Face)", parrafos: [
      'Investigadora en ética del aprendizaje automático, cofundó y dirigió junto a Gebru el equipo de IA ética de Google. Su enfoque es traducir los principios éticos en <b>prácticas concretas de ingeniería</b>.',
      'Su aporte más conocido son las <b>Model Cards</b>: una ficha estandarizada que acompaña a cada modelo y documenta con honestidad para qué sirve, con qué datos se entrenó, dónde falla y qué sesgos tiene. Es como la etiqueta nutricional de un producto, pero para la IA.',
      'La idea cambió la cultura del campo: documentar los límites de un modelo dejó de ser opcional para volverse un estándar de <b>transparencia y rendición de cuentas</b>. Hoy continúa ese trabajo en Hugging Face.'
    ] });

    cog.persona(cont, { slug: "joy-buolamwini", nombre: "Joy Buolamwini", color: C, etiqueta: "Justicia algorítmica", meta: "n. 1989 · Informática y activista (MIT)", parrafos: [
      'Descubrió el sesgo de la forma más directa: un software de reconocimiento facial no detectaba su rostro hasta que se ponía una máscara blanca. Esa experiencia reveló un problema sistémico y la convirtió en una voz líder del campo.',
      'Su investigación <i>Gender Shades</i> demostró con datos que los sistemas comerciales tenían tasas de error mucho más altas con mujeres y personas de piel oscura, por haberse entrenado con datos poco diversos. Fundó la <b>Algorithmic Justice League</b> y acuñó el término <i>“coded gaze”</i>.',
      'Su trabajo llevó a grandes empresas a revisar o retirar sus sistemas y alimentó el debate público y legal sobre la vigilancia facial. Convirtió un fallo técnico en un movimiento por la justicia, combinando ciencia, arte y activismo.'
    ] });

    cog.persona(cont, { slug: "cathy-oneil", nombre: "Cathy O'Neil", color: C, etiqueta: "Auditoría algorítmica", meta: "n. 1972 · Matemática (EE. UU.)", parrafos: [
      'Matemática y ex analista financiera, tras vivir de cerca la crisis de 2008 se volvió una crítica aguda del uso irresponsable de los algoritmos. Su libro <i>Armas de destrucción matemática</i> (2016) se volvió un clásico sobre el tema.',
      'Acuñó esa expresión para describir modelos que son <b>opacos, se aplican a gran escala y causan daño</b>: algoritmos que deciden sobre crédito, empleo, seguros o sentencias penales reforzando la desigualdad, muchas veces sin que nadie pueda cuestionarlos.',
      'Su frase —“los algoritmos son opiniones encerradas en matemáticas”— desmonta el mito de la objetividad: un modelo hereda los sesgos de sus datos y de quien lo diseña. Aboga por <b>auditar</b> los algoritmos que afectan vidas. Su voz llevó el debate del ámbito técnico al público general.'
    ] });

    cog.persona(cont, { slug: "safiya-umoja-noble", nombre: "Safiya Umoja Noble", color: C, etiqueta: "Sesgo en buscadores", meta: "n. 1968 · Académica (UCLA)", parrafos: [
      'Académica estadounidense, su libro <i>Algorithms of Oppression</i> (2018) expuso cómo los <b>motores de búsqueda</b> no son neutrales: reproducen y amplifican sesgos racistas y sexistas en sus resultados, moldeando cómo vemos a grupos enteros.',
      'Documentó, por ejemplo, cómo ciertas búsquedas devolvían resultados profundamente estereotipados, revelando que la tecnología que usamos para “saber” está atravesada por relaciones de poder comerciales y culturales. Lo aparentemente objetivo esconde decisiones y sesgos.',
      'Su trabajo conecta la computación con los estudios críticos sobre raza y género, y argumenta que estos sistemas tienen consecuencias sociales reales. Es una voz clave para entender que los algoritmos que median nuestro acceso a la información no son espejos neutros del mundo.'
    ] });

    cog.persona(cont, { slug: "ruha-benjamin", nombre: "Ruha Benjamin", color: C, etiqueta: "Tecnología y desigualdad", meta: "n. 1978 · Socióloga (Princeton)", parrafos: [
      'Socióloga de Princeton, estudia cómo la tecnología puede <b>reproducir y profundizar la desigualdad</b> incluso cuando se presenta como neutral o beneficiosa. Su libro <i>Race After Technology</i> es una referencia en el campo.',
      'Acuñó el concepto del <b>“New Jim Code”</b>: sistemas tecnológicos que, bajo una apariencia de objetividad y progreso, codifican y automatizan discriminaciones históricas. La tecnología no borra el prejuicio social; a veces lo vuelve invisible y más difícil de combatir.',
      'Su mirada, desde las ciencias sociales, complementa la de los informáticos: no basta con arreglar un algoritmo, hay que entender el <b>contexto social</b> que produce los datos y las decisiones. Aboga por imaginar y construir tecnologías orientadas a la justicia, no solo a la eficiencia.'
    ] });

    cog.persona(cont, { slug: "kate-crawford", nombre: "Kate Crawford", color: C, etiqueta: "Impacto social y ecológico", meta: "n. 1970s · Investigadora (EE. UU. / Australia)", parrafos: [
      'Investigadora de las implicaciones sociales, políticas y <b>materiales</b> de la inteligencia artificial. Su libro <i>Atlas of AI</i> revela el costo oculto de la IA: no es algo “en la nube” e inmaterial, sino una industria con una enorme huella física.',
      'Documenta cómo la IA consume <b>recursos naturales, energía y agua</b> a escala industrial, depende de minerales extraídos y de trabajo humano mal pagado para etiquetar datos, y concentra poder en pocas manos. Nos obliga a ver la cadena completa detrás de cada modelo.',
      'Su trabajo amplía el debate ético más allá del sesgo: incluye el <b>costo ambiental</b>, el laboral y el geopolítico. Cofundó institutos dedicados a estudiar el impacto social de la IA. Es una voz esencial para entender la tecnología como un fenómeno planetario, no solo computacional.'
    ] });

    cog.persona(cont, { slug: "virginia-dignum", nombre: "Virginia Dignum", color: C, etiqueta: "IA responsable · Gobernanza", meta: "n. s. XX · Informática (Universidad de Umeå)", parrafos: [
      'Investigadora portuguesa-neerlandesa, es una de las grandes especialistas mundiales en <b>IA responsable</b>: cómo diseñar, desarrollar y gobernar sistemas de inteligencia artificial que sean éticos, transparentes y rindan cuentas a la sociedad.',
      'Participa en comités internacionales que elaboran <b>directrices y políticas</b> sobre IA, para organismos como la Unión Europea y la ONU. Trabaja en traducir principios abstractos —justicia, responsabilidad, transparencia— en requisitos concretos para quienes construyen la tecnología.',
      'Su libro <i>Responsible Artificial Intelligence</i> es una referencia. Representa el esfuerzo por construir <b>gobernanza</b>: que la IA no quede solo en manos de empresas o ingenieros, sino que haya marcos sociales y legales que orienten su desarrollo hacia el bien común.'
    ] });

    cog.persona(cont, { slug: "milind-tambe", nombre: "Milind Tambe", color: C, etiqueta: "IA para el bien social", meta: "n. s. XX · Informático (Harvard)", parrafos: [
      'Investigador en Harvard y Google, es un referente de la <b>“IA para el bien social”</b>: usar la inteligencia artificial y los sistemas multiagente para atacar problemas de salud pública, conservación y pobreza.',
      'Sus modelos han ayudado a <b>proteger la vida silvestre</b> frente a la caza furtiva (optimizando las patrullas de guardabosques), a mejorar campañas de salud y a asistir a poblaciones vulnerables, demostrando que la IA puede dirigirse explícitamente hacia el bienestar colectivo.',
      'Su enfoque de <b>teoría de juegos</b> y optimización aplicada muestra que las mismas técnicas que impulsan la publicidad o las finanzas pueden ponerse al servicio de causas sociales. Encarna la idea de que el impacto de la IA depende de para qué —y para quién— decidimos usarla.'
    ] });

    cog.persona(cont, { slug: "luciano-floridi", nombre: "Luciano Floridi", color: C, etiqueta: "Filosofía de la información", meta: "n. 1964 · Filósofo italiano", parrafos: [
      'Filósofo italiano, es la máxima autoridad en la <b>filosofía y la ética de la información</b>. Piensa a fondo qué significa vivir en una sociedad donde la información y lo digital son tan reales e influyentes como el mundo físico.',
      'Acuñó el concepto de la <b>“infosfera”</b> —el entorno de información en el que cada vez más habitamos— y argumenta que la revolución digital cambia nuestra propia idea de quiénes somos, tanto como lo hicieron Copérnico, Darwin o Freud.',
      'Asesora a gobiernos y organismos sobre la <b>ética de la IA y de los datos</b>, aportando el marco conceptual que las decisiones técnicas necesitan. Representa la voz de la filosofía en este debate: recordar que, detrás de cada algoritmo, hay preguntas profundas sobre el ser humano y el sentido.'
    ] });

    cog.nota(cont, 'Serie <b>Personajes importantes en tecnología y computación</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', C);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Sesgo algorítmico", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Sesgo_algorítmico", lang: "es" },
    { t: "Ética de la inteligencia artificial", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Ética_de_la_inteligencia_artificial", lang: "es" },
    { t: "Differential privacy", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Differential_privacy", lang: "en" },
    { t: "Weapons of Math Destruction (Cathy O'Neil)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Weapons_of_Math_Destruction", lang: "en" },
    { t: "Algorithmic bias", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Algorithmic_bias", lang: "en" }
  ];

  var QUIZ = [
    { p: "La privacidad diferencial (Dwork) protege a las personas…", op: ["Cifrando el disco duro", "Añadiendo ruido calibrado para obtener estadísticas útiles sin identificar a nadie", "Borrando los datos", "Prohibiendo la recolección"], ok: 1, porque: "Agrega ruido controlado de modo que el conjunto siga siendo útil, pero ningún individuo pueda ser identificado." },
    { p: "Latanya Sweeney demostró que…", op: ["Los datos “anónimos” pueden re-identificar personas combinándolos con info pública", "El cifrado es inútil", "Los algoritmos no tienen sesgo", "La nube es insegura"], ok: 0, porque: "Mostró, p. ej., que con código postal, fecha de nacimiento y sexo se podía identificar registros “anónimos”, y formuló el k-anonimato." },
    { p: "Las “armas de destrucción matemática” de Cathy O'Neil son algoritmos que…", op: ["Son rápidos y precisos", "Son opacos, se aplican a gran escala y causan daño reforzando la desigualdad", "Solo se usan en videojuegos", "No usan datos"], ok: 1, porque: "Describen modelos opacos y masivos que deciden sobre crédito, empleo o justicia amplificando sesgos, sin posibilidad de cuestionarlos." },
    { p: "Kate Crawford amplía la ética de la IA al señalar su…", op: ["Velocidad", "Costo material, energético, laboral y ecológico", "Sintaxis", "Precio de venta"], ok: 1, porque: "Revela que la IA no es inmaterial: consume recursos, energía y trabajo humano, con una enorme huella física y social." }
  ];

  E.registrar({
    id: "fund-computo-personajes-f-etica",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8.6,
    titulo: "Personajes en TyC · F. Ética y datos",
    sub: "Ética de datos, privacidad y justicia algorítmica",
    resumen: "Quienes piden cuentas a la tecnología: Dwork, Sweeney, Gebru, Mitchell, Buolamwini, O'Neil, Noble, Benjamin, Crawford, Dignum, Tambe y Floridi.",
    chips: [{ k: "Serie", v: "Personajes en TyC" }, { k: "Bloque", v: "F · Ética y datos" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-personajes-f-etica", QUIZ)
    }
  });
})();
