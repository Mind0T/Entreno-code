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

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Mujeres Fundamentales en la IA</h2>' +
      '<p>La historia de la IA no se entiende sin ellas. Desde el <b>primer algoritmo de la historia</b> hasta los estándares que hoy auditan a los modelos más grandes, veinte mujeres atraviesan cuatro eras: los cimientos de la computación, la IA clásica, el auge del machine learning y la visión, y la ética algorítmica. No es una lista de homenaje: es el <b>linaje técnico</b> que va del compilador a las <i>Model Cards</i>.</p>');

    cog.epigrafe(cont, "“No podemos mejorar lo que no medimos, ni corregir el sesgo que no auditamos.”", "Espíritu de la Algorithmic Justice League");

    cog.prosa(cont, '<h3>Era A · Los cimientos de la computación</h3>' +
      '<p>Antes de que existiera la “IA”, se construyó la capacidad misma de programar: de la idea al lenguaje, y del lenguaje al software confiable.</p>');
    cog.persona(cont, { slug: "ada-lovelace", nombre: "Ada Lovelace", color: AZ, etiqueta: "Siglo XIX · Primera programadora", meta: "1815–1852 · Matemática británica", parrafos: [
      'Hija del poeta Lord Byron y educada rigurosamente en matemáticas, colaboró con Charles Babbage en torno a su <b>Máquina Analítica</b>, una computadora mecánica que nunca llegó a construirse. En sus notas de 1843 escribió lo que se considera el <b>primer algoritmo</b> pensado para ser ejecutado por una máquina: un método para calcular los números de Bernoulli.',
      'Su aporte más profundo no fue el código, sino la <b>visión</b>: comprendió, mucho antes que nadie, que una máquina capaz de manipular símbolos no se limitaría a los números. Imaginó que podría componer música o manipular cualquier contenido representable con símbolos —la idea germinal de la computación de propósito general—.',
      'También advirtió, con lucidez, que la máquina “no tiene pretensión alguna de originar nada”: solo hace lo que sabemos ordenarle. Ese matiz sobre los límites de lo que una máquina “crea” sigue siendo central en los debates sobre la IA generativa. El lenguaje <b>Ada</b> lleva su nombre en su honor.'
    ] });

    cog.persona(cont, { slug: "grace-hopper", nombre: "Grace Hopper", color: AZ, etiqueta: "Compiladores", meta: "1906–1992 · Informática y contraalmirante (EE. UU.)", parrafos: [
      'Doctora en matemáticas por Yale, se unió a la Marina de los Estados Unidos durante la Segunda Guerra Mundial y programó la <b>Harvard Mark I</b>, una de las primeras computadoras electromecánicas. Llegó a <b>contraalmirante</b> y es una de las figuras más influyentes en la historia del software.',
      'Su idea revolucionaria fue que programar no debía hacerse en el lenguaje de la máquina, sino en algo <b>cercano al humano</b>. Hacia 1952 creó el primer <b>compilador</b>, un programa que traduce instrucciones legibles por personas a código máquina. Muchos dudaban que fuera posible; ella lo demostró.',
      'Ese principio desembocó en <b>COBOL</b>, lenguaje orientado a los negocios que ella impulsó y que aún hoy mueve sistemas bancarios. Popularizó además el término <b>“bug”</b> (al retirar una polilla atrapada en un relé). Su legado es la idea misma de que el software debe ser accesible, no solo para ingenieros.'
    ] });

    cog.persona(cont, { slug: "margaret-hamilton", nombre: "Margaret Hamilton", color: AZ, etiqueta: "Software robusto", meta: "n. 1936 · Ingeniera de software (MIT)", parrafos: [
      'Dirigió en el MIT el equipo que escribió el <b>software de vuelo a bordo del programa Apolo</b> de la NASA. En una época en que programar apenas se consideraba una disciplina, ella insistió en tratarlo con rigor de ingeniería y <b>acuñó el término “ingeniería de software”</b> para darle la seriedad que merecía.',
      'Su obsesión por la <b>tolerancia a fallos</b> salvó la misión Apolo 11: durante el descenso a la Luna, su sistema de prioridades detectó una sobrecarga y descartó tareas no esenciales en lugar de colapsar, permitiendo que el alunizaje continuara. Había diseñado el software para <b>recuperarse de errores</b>, no solo para funcionar cuando todo iba bien.',
      'Esos principios —detección de errores, recuperación, sistemas que fallan con gracia— son hoy el cimiento de cualquier sistema crítico, incluida la IA que opera en el mundo real. Recibió la Medalla Presidencial de la Libertad en 2016. Su trabajo demostró que la fiabilidad del software es una cuestión de vida o muerte.'
    ] });

    cog.prosa(cont, '<h3>Era B · IA clásica y ciencias cognitivas</h3>' +
      '<p>El puente entre el lenguaje humano, el diálogo y la percepción —problemas que aún definen la IA.</p>');
    cog.persona(cont, { slug: "karen-sparck-jones", nombre: "Karen Spärck Jones", color: MO, etiqueta: "Recuperación de información", meta: "1935–2007 · Lingüista computacional (Cambridge)", parrafos: [
      'Pionera británica del procesamiento del lenguaje natural y la recuperación de información, en una época en que casi no había mujeres en el campo. Defendía una frase que se volvió célebre: <i>“la computación es demasiado importante para dejarla solo a los hombres”</i>.',
      'En 1972 introdujo el <b>IDF</b> (frecuencia inversa de documentos), la idea de <b>pesar</b> las palabras según lo informativas que son: las muy comunes (“el”, “de”) valen poco; las raras y específicas, mucho. Combinado con la frecuencia de términos (TF-IDF), se convirtió en el motor estadístico de los buscadores durante décadas.',
      'Su trabajo sigue latiendo en la tecnología actual: los <b>recuperadores</b> que alimentan a los sistemas <b>RAG</b> modernos —los que anclan a los grandes modelos de lenguaje a documentos reales— descienden directamente de su intuición sobre qué hace relevante a un término. Es un puente vivo entre la lingüística de los años 70 y la IA de hoy.'
    ] });

    cog.persona(cont, { slug: "margaret-boden", nombre: "Margaret Boden", color: MO, etiqueta: "Creatividad artificial", meta: "n. 1936 · Científica cognitiva (Sussex)", parrafos: [
      'Investigadora británica que une la psicología, la filosofía y la inteligencia artificial, es una de las grandes pensadoras sobre qué significa que una máquina “piense”. Ayudó a fundar uno de los primeros programas académicos de ciencia cognitiva del mundo.',
      'Su tema más distintivo es la <b>creatividad artificial</b>: ¿puede una máquina ser creativa de verdad? Distinguió entre creatividad <b>exploratoria</b> (buscar dentro de un espacio de posibilidades conocido) y <b>transformacional</b> (cambiar las reglas mismas del espacio), un marco que hoy ilumina el debate sobre el arte y la escritura generados por IA.',
      'Como historiadora y filósofa del campo, su obra monumental <i>Mind as Machine</i> traza la historia de la ciencia cognitiva. Su mirada aporta la pregunta incómoda y necesaria: más allá de lo que la IA <i>hace</i>, ¿qué implica filosóficamente para nuestra idea de mente, originalidad y comprensión?'
    ] });

    cog.persona(cont, { slug: "elaine-rich", nombre: "Elaine Rich", color: MO, etiqueta: "Sistemas expertos", meta: "n. 1950 · Informática (EE. UU.)", parrafos: [
      'Autora de <i>Artificial Intelligence</i> (1983), uno de los <b>libros de texto fundacionales</b> con que se formó una generación entera de estudiantes de IA. Su manera de organizar y explicar el campo ayudó a definir qué era, como disciplina enseñable, la inteligencia artificial clásica.',
      'Fue pionera en el <b>modelado de usuarios</b>: la idea de que un sistema inteligente debe construir una representación de <i>quién</i> es la persona con la que interactúa —sus metas, su nivel, sus preferencias— para adaptarse a ella. Es un antecedente directo de la personalización y de los asistentes que hoy ajustan su respuesta a cada usuario.',
      'Trabajó también en sistemas expertos y en procesamiento de lenguaje natural. Su contribución recuerda que buena parte del avance de la IA no vino solo de nuevos algoritmos, sino de <b>sistematizar y transmitir</b> el conocimiento del campo con claridad, haciéndolo accesible y acumulativo.'
    ] });

    cog.persona(cont, { slug: "barbara-grosz", nombre: "Barbara Grosz", color: MO, etiqueta: "Diálogo y discurso", meta: "n. 1948 · Informática (Harvard)", parrafos: [
      'Figura central del procesamiento del lenguaje natural, modeló computacionalmente cómo funciona el <b>discurso</b>: no como frases sueltas, sino como una conversación con estructura, intenciones y foco de atención que cambian a lo largo del tiempo.',
      'Su trabajo sobre la <b>estructura del discurso</b> y la atención en el diálogo sentó las bases teóricas de los <b>agentes conversacionales</b>. Entender que una conversación tiene segmentos, propósitos y referencias que dependen del contexto es justo lo que permite a un sistema sostener un intercambio coherente.',
      'Además de su ciencia, es una voz influyente en la <b>ética y el diseño responsable</b> de la IA y en los sistemas de colaboración entre humanos y máquinas. Impulsó también la inclusión de mujeres en la computación. Su carrera muestra que modelar el lenguaje es, en el fondo, modelar la cooperación humana.'
    ] });

    cog.persona(cont, { slug: "ruzena-bajcsy", nombre: "Ruzena Bajcsy", color: MO, etiqueta: "Percepción activa", meta: "n. 1933 · Ingeniera y roboticista (UC Berkeley)", parrafos: [
      'Nacida en Eslovaquia y sobreviviente de la Segunda Guerra Mundial, se convirtió en una pionera mundial de la robótica y la visión por computadora, con doctorados en ingeniería eléctrica y en ciencias de la computación (Stanford).',
      'Su gran aporte conceptual fue la <b>percepción activa</b>: romper con la idea de que un sistema recibe imágenes de forma pasiva y las clasifica. Propuso que percibir es <b>actuar</b> —el robot mueve su cámara, se acerca, toca, cambia su punto de vista— porque la acción genera mejor información sobre el mundo.',
      'Esa idea tiene un eco directo en la neurociencia cognitiva (percibir y actuar están entrelazados) y es hoy fundamental en la robótica y en los sistemas que exploran su entorno. Fundó el laboratorio GRASP en Penn y recibió múltiples honores; su visión cambió cómo entendemos la relación entre sentir y moverse.'
    ] });

    cog.prosa(cont, '<h3>Era C · Machine learning, visión y robótica</h3>');
    cog.persona(cont, { slug: "fei-fei-li", nombre: "Fei-Fei Li", color: VE, etiqueta: "Visión por computadora", meta: "n. 1976 · Informática (Stanford)", parrafos: [
      'Nacida en China y emigrada a Estados Unidos en la adolescencia, se doctoró en una especialidad que mezcla ingeniería y <b>neurociencia computacional</b> de la visión. Entendió algo que otros pasaban por alto: que los algoritmos de visión no mejorarían sin <b>muchísimos datos</b> de los que aprender.',
      'Por eso lideró la creación de <b>ImageNet</b>, una base de datos con millones de imágenes etiquetadas a mano. En 2012, un modelo de deep learning (AlexNet) arrasó en su competencia y <b>detonó la revolución</b> del aprendizaje profundo visual: el momento en que la IA moderna “despegó”. ImageNet fue el combustible de esa explosión.',
      'Hoy codirige el instituto de <b>IA centrada en el ser humano (HAI)</b> de Stanford y es una de las voces más influyentes en la ética y el impacto social de la tecnología. Su trayectoria enlaza dos capítulos de este tema: encendió la visión por computadora que, años después, otras someterían a auditoría ética.'
    ] });

    cog.persona(cont, { slug: "cynthia-breazeal", nombre: "Cynthia Breazeal", color: VE, etiqueta: "Robótica social", meta: "n. 1967 · Roboticista (MIT)", parrafos: [
      'Pionera mundial de la <b>robótica social</b>: robots diseñados no para fabricar coches, sino para <b>interactuar emocionalmente</b> con las personas. Se preguntó cómo sería una máquina capaz de leer y responder a las señales sociales humanas.',
      'A finales de los años 90 creó <b>Kismet</b> en el MIT, uno de los primeros robots capaces de <b>reconocer y simular expresiones emocionales</b>: fruncía el ceño, sonreía, parecía curioso o molesto según cómo la trataran. Fue una demostración temprana y conmovedora de que una máquina podía participar en una interacción afectiva.',
      'Su trabajo influye en los asistentes, los robots educativos y de compañía, y en todo el campo de la <b>interacción humano-robot</b>. Plantea preguntas de diseño y ética que hoy son urgentes: cómo construimos máquinas que se relacionan con nosotros sin manipular nuestra tendencia natural a encariñarnos con ellas.'
    ] });

    cog.persona(cont, { slug: "daphne-koller", nombre: "Daphne Koller", color: VE, etiqueta: "IA probabilística", meta: "n. 1968 · Informática (Stanford)", parrafos: [
      'Científica israelí-estadounidense, experta en <b>modelos gráficos probabilísticos</b>: una forma de que la IA razone cuando la información es incompleta o incierta, representando las relaciones entre muchas variables y actualizando creencias con la evidencia (razonamiento bayesiano).',
      'Ese enfoque —decidir bajo <b>incertidumbre</b>, con probabilidades en vez de certezas— es distinto y complementario al deep learning puramente conexionista, y es clave en aplicaciones como la biomedicina, donde ella lo ha usado para entender datos genómicos y de salud.',
      'Es también una figura decisiva en la democratización del conocimiento: cofundó <b>Coursera</b>, que llevó cursos universitarios a millones de personas en el mundo, y más tarde fundó insitro, que aplica el aprendizaje automático al descubrimiento de fármacos. Une investigación de frontera con un impacto social masivo.'
    ] });

    cog.persona(cont, { slug: "daniela-rus", nombre: "Daniela Rus", color: VE, etiqueta: "Robótica distribuida", meta: "n. 1963 · Roboticista (MIT)", parrafos: [
      'Nacida en Rumanía, dirige el <b>CSAIL</b> del MIT —uno de los laboratorios de computación e IA más grandes e influyentes del mundo—. Su campo es la robótica, pero con una mirada particular: no un robot gigante y solitario, sino <b>muchas máquinas que colaboran</b>.',
      'Es pionera en la <b>robótica distribuida y modular</b>: enjambres de robots que cooperan, robots que se reconfiguran, y la <b>robótica blanda</b>, con cuerpos flexibles inspirados en organismos vivos. La idea es que la inteligencia y la capacidad pueden emerger de la coordinación de muchas unidades simples.',
      'Trabaja también en hacer la IA más <b>eficiente y transparente</b>, con redes neuronales más pequeñas e interpretables. Su liderazgo al frente del CSAIL la coloca en el centro de la agenda de investigación que definirá la próxima década de robótica e inteligencia artificial.'
    ] });

    cog.persona(cont, { slug: "rosalind-picard", nombre: "Rosalind Picard", color: VE, etiqueta: "Computación afectiva", meta: "n. 1962 · Ingeniera (MIT Media Lab)", parrafos: [
      'Fundó un campo entero: la <b>computación afectiva</b>, nombre que acuñó en un libro de 1997. Su tesis fue provocadora para la época: si queremos máquinas realmente inteligentes y útiles, deben poder <b>reconocer, interpretar y responder a las emociones</b> humanas.',
      'Desarrolló tecnologías para <b>medir señales fisiológicas</b> —conductancia de la piel, ritmo cardiaco, expresiones— y a partir de ellas inferir estados emocionales. Esto abrió aplicaciones en salud mental, autismo y bienestar, incluyendo dispositivos capaces de detectar crisis antes de que ocurran.',
      'Su trabajo plantea de frente las preguntas éticas de una IA que lee emociones: el potencial para ayudar es enorme, pero también lo es el riesgo de vigilancia y manipulación. Como pionera, no solo creó la tecnología, sino el marco para discutir cuándo y cómo debe usarse con responsabilidad.'
    ] });

    cog.persona(cont, { slug: "doina-precup", nombre: "Doina Precup", color: VE, etiqueta: "Aprendizaje por refuerzo", meta: "n. 1975 · Informática (McGill / DeepMind)", parrafos: [
      'Investigadora rumano-canadiense, es una de las grandes especialistas en <b>aprendizaje por refuerzo</b>: el paradigma en que un agente aprende por <b>ensayo y error</b>, recibiendo recompensas o castigos, tal como se entrena a un animal o como un niño aprende qué funciona.',
      'Su trabajo teórico sobre cómo un agente puede aprender <b>a distintos niveles de abstracción temporal</b> (las “opciones”: aprender sub-habilidades y combinarlas) es fundamental para que el refuerzo funcione en problemas complejos y de largo plazo, no solo en juegos simples.',
      'Dirige el laboratorio de DeepMind en Montreal y enseña en McGill, formando a la siguiente generación. El aprendizaje por refuerzo que ella ayuda a avanzar es la base de los sistemas que dominaron el Go y el ajedrez, y del <b>RLHF</b> que hoy alinea a los grandes modelos de lenguaje con las preferencias humanas.'
    ] });

    cog.persona(cont, { slug: "anima-anandkumar", nombre: "Anima Anandkumar", color: VE, etiqueta: "IA para la ciencia", meta: "n. 1980s · Informática (Caltech)", parrafos: [
      'Científica india-estadounidense, experta en los <b>métodos de tensores</b>: herramientas matemáticas para entrenar modelos de forma más eficiente y con garantías teóricas, descomponiendo datos de muchas dimensiones en sus componentes esenciales.',
      'Lidera la aplicación de la IA a problemas de la <b>ciencia y la ingeniería</b>: simulación de fluidos, predicción del clima y el tiempo, y modelado físico a gran escala. En lugar de resolver ecuaciones costosísimas, sus modelos aprenden a aproximar la física mucho más rápido —un cambio de juego para la ciencia computacional—.',
      'Combina la investigación académica en Caltech con el trabajo en la industria, impulsando tanto los fundamentos matemáticos como las aplicaciones de alto impacto. Su carrera muestra una frontera creciente: la IA no solo como producto de consumo, sino como un <b>instrumento científico</b> para entender el mundo natural.'
    ] });

    cog.persona(cont, { slug: "yejin-choi", nombre: "Yejin Choi", color: VE, etiqueta: "Sentido común computacional", meta: "n. 1977 · Informática (Stanford)", parrafos: [
      'Investigadora surcoreana-estadounidense del procesamiento del lenguaje natural, se enfoca en uno de los problemas más duros y menos resueltos de la IA: el <b>sentido común</b>. Enseñar a una máquina lo que cualquier humano da por obvio —que si sueltas un vaso se rompe, que la gente actúa por motivos—.',
      'Argumenta que los grandes modelos de lenguaje, por impresionantes que sean, tienen lagunas sorprendentes en razonamiento cotidiano porque <b>imitan patrones</b> sin un modelo del mundo. Su trabajo busca dotarlos de conocimiento implícito y capacidad de inferir lo no dicho.',
      'Su postura dialoga directamente con la advertencia de los “loros estocásticos”: ella intenta construir el <b>razonamiento</b> que a esos modelos les falta. Reconocida con una beca MacArthur (“genius grant”), representa una de las apuestas más importantes para que la IA pase de repetir a comprender.'
    ] });

    cog.prosa(cont, '<h3>Era D · Ética, sesgos y justicia algorítmica</h3>' +
      '<p>Cuando la IA salió al mundo, otras cuatro la pusieron a rendir cuentas.</p>');
    cog.persona(cont, { slug: "joy-buolamwini", nombre: "Joy Buolamwini", color: RO, etiqueta: "Justicia algorítmica", meta: "n. 1989 · Informática y activista (MIT)", parrafos: [
      'Investigadora ghanesa-estadounidense del MIT, descubrió el sesgo de la forma más directa posible: un software de reconocimiento facial <b>no detectaba su rostro</b> hasta que se ponía una máscara blanca. Esa anécdota reveló un problema sistémico y la convirtió en una de las voces más influyentes del campo.',
      'Su investigación <i>Gender Shades</i> demostró con datos que los sistemas comerciales de reconocimiento facial tenían <b>tasas de error mucho más altas</b> con mujeres y personas de piel oscura —hasta de decenas de puntos porcentuales— porque se habían entrenado con datos poco diversos. La causa no era malicia, sino sesgo heredado de los datos.',
      'Fundó la <b>Algorithmic Justice League</b> para combatir el sesgo en la IA y acuñó el término <i>“coded gaze”</i> (la mirada codificada). Su trabajo llevó a grandes empresas a revisar o retirar sus sistemas y alimentó el debate público y legal sobre la vigilancia facial. Convirtió un fallo técnico en un movimiento por la justicia.'
    ] });

    cog.persona(cont, { slug: "timnit-gebru", nombre: "Timnit Gebru", color: RO, etiqueta: "Ética de la IA", meta: "n. 1982/83 · Informática (DAIR)", parrafos: [
      'Investigadora nacida en Etiopía, refugiada en Estados Unidos, se doctoró en Stanford en visión por computadora y se convirtió en una de las figuras centrales de la ética de la IA. Colaboró con Buolamwini en los estudios sobre sesgo facial.',
      'Fue coautora del influyente artículo sobre los <b>“loros estocásticos”</b>, que advierte de los riesgos de los <b>modelos de lenguaje gigantes</b>: su enorme costo ambiental, la opacidad, el sesgo de los datos de entrenamiento y el peligro de confundir fluidez con comprensión. El modelo <b>imita</b> el lenguaje sin entenderlo.',
      'Su salida de Google en 2020, en circunstancias que ella describió como un despido ligado a ese trabajo, desató un debate mundial sobre la <b>independencia de la investigación ética</b> dentro de las grandes tecnológicas. Fundó el instituto <b>DAIR</b> para investigar la IA fuera de la influencia corporativa. Es un símbolo de la IA crítica y responsable.'
    ] });

    cog.persona(cont, { slug: "margaret-mitchell", nombre: "Margaret Mitchell", color: RO, etiqueta: "Transparencia", meta: "n. 1980s · Informática (Hugging Face)", parrafos: [
      'Investigadora estadounidense en ética del aprendizaje automático, cofundó y dirigió junto a Gebru el equipo de IA ética de Google, y hoy trabaja en Hugging Face. Su enfoque es traducir los principios éticos en <b>prácticas concretas de ingeniería</b>.',
      'Su aporte más conocido son las <b>Model Cards</b>: una ficha técnica estandarizada que acompaña a cada modelo y documenta con honestidad para qué sirve, con qué datos se entrenó, <b>dónde falla</b> y qué sesgos tiene. Es el equivalente a la etiqueta nutricional de un alimento, pero para la IA.',
      'La idea cambió la cultura del campo: documentar los límites de un modelo dejó de ser opcional para volverse un estándar de <b>transparencia y rendición de cuentas</b>. Junto a Gebru, representa la generación que insistió en que construir IA conlleva la responsabilidad de explicar públicamente qué hace y qué no.'
    ] });

    cog.persona(cont, { slug: "rumman-chowdhury", nombre: "Rumman Chowdhury", color: RO, etiqueta: "Auditoría de IA", meta: "n. 1980 · Científica de datos (EE. UU.)", parrafos: [
      'Científica de datos estadounidense de origen bangladesí, es una líder mundial en la <b>auditoría ética de sistemas de IA</b>: evaluar de forma sistemática si un modelo es justo, seguro y responsable antes y después de desplegarlo.',
      'Es referente del <b>red teaming</b> aplicado a la IA: reunir equipos que <b>atacan deliberadamente</b> un modelo para encontrar sus fallos, sesgos y usos peligrosos antes de que lo hagan actores malintencionados. Organizó ejercicios masivos de este tipo sobre modelos generativos, con apoyo incluso gubernamental.',
      'Dirigió el equipo de ética de aprendizaje automático en Twitter y fundó iniciativas para democratizar la auditoría algorítmica. Su trabajo materializa una idea clave de este tema: la ética no es un discurso, sino una <b>práctica técnica</b> —probar, medir, exponer— que debe formar parte del ciclo de vida de todo sistema.'
    ] });

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
