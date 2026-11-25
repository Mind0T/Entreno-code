/* ============================================================
   Fundamentos · Ciencias Cognitivas, Neurociencias y Filosofía
   La Mente como Plano Arquitectónico de la IA
   Diez puentes entre el cerebro y el silicio
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG — Sistema 1 vs Sistema 2 */
  var SVG_S1S2 =
    '<svg viewBox="0 0 560 160" role="img" aria-label="Sistema 1 rápido e intuitivo contra Sistema 2 lento y deliberativo">' +
    '<g text-anchor="middle" font-size="11.5">' +
    '<rect x="20" y="36" width="230" height="100" rx="14" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="135" y="26" fill="var(--verde)" font-weight="600">Sistema 1</text><text x="135" y="72" font-size="11" fill="currentColor" opacity=".8">rápido · intuitivo</text><text x="135" y="92" font-size="11" fill="currentColor" opacity=".8">automático · sin esfuerzo</text><text x="135" y="118" font-size="9.5" fill="currentColor" opacity=".55">≈ un LLM que predice el token</text>' +
    '<rect class="cog-pulse" x="310" y="36" width="230" height="100" rx="14" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="425" y="26" fill="var(--morado)" font-weight="600">Sistema 2</text><text x="425" y="72" font-size="11" fill="currentColor" opacity=".8">lento · lógico</text><text x="425" y="92" font-size="11" fill="currentColor" opacity=".8">deliberativo · con esfuerzo</text><text x="425" y="118" font-size="9.5" fill="currentColor" opacity=".55">≈ razonar paso a paso (CoT)</text>' +
    '<text x="280" y="152" fill="currentColor" opacity=".55" font-size="9.5">la IA quiere pasar del 1 al 2</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>La mente como plano de la IA</h2>' +
      '<p>Antes de que existiera el <i>deep learning</i>, ya existía su plano: el cerebro. Casi todas las grandes ideas de la IA moderna nacieron mirando a la mente —la memoria, la visión, el razonamiento con pocos datos, los sesgos—. Diez figuras encarnan ese puente entre <b>neurociencia, cognición y computación</b>. No son “los de la IA”: son quienes entendieron que para construir una inteligencia artificial primero hay que entender la natural.</p>');

    cog.epigrafe(cont, "“Para construir una mente, primero hay que estudiar una.”", "Espíritu de la neurociencia computacional");

    cog.prosa(cont, '<h3>1 · Los diez perfiles</h3>' +
      '<p>Diez personas encarnan ese puente entre la mente y la máquina. Recórrelas como una línea de tiempo de ideas: quién es cada una, qué aportó y por qué importa para la IA.</p>');

    cog.persona(cont, { slug: "demis-hassabis", nombre: "Demis Hassabis", color: VE, etiqueta: "Memoria e imaginación → agentes", meta: "n. 1976 · Neurocientífico y cofundador de DeepMind (Reino Unido)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Niño prodigio del ajedrez y diseñador de videojuegos (<i>Theme Park</i>, <i>Black &amp; White</i>) antes de doctorarse en <b>neurociencia cognitiva</b> en la UCL, donde estudió el <b>hipocampo</b>, la memoria episódica y la imaginación. En 2010 cofundó <b>DeepMind</b> con una meta explícita: “resolver la inteligencia y usarla para resolver todo lo demás”.',
      'Bajo su dirección, DeepMind creó <b>AlphaGo</b>, que en 2016 venció al campeón mundial de Go —un juego que se creía fuera del alcance de las máquinas—, y <b>AlphaFold</b>, que resolvió el problema de 50 años del <b>plegamiento de proteínas</b>. Su apuesta: combinar aprendizaje por refuerzo, búsqueda y memoria inspirada en el cerebro.',
      'Hassabis encarna el puente mente→máquina: estudió cómo <b>recordamos e imaginamos</b> para construir agentes que <b>planean</b>. En 2024 recibió el <b>Premio Nobel de Química</b> por AlphaFold, señal de que la IA inspirada en la cognición ya transforma la ciencia.'
    ] });

    cog.persona(cont, { slug: "geoffrey-hinton", nombre: "Geoffrey Hinton", color: MO, etiqueta: "El padrino del deep learning", meta: "n. 1947 · Psicólogo e informático (Reino Unido / Canadá)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Formado en <b>psicología experimental</b> en Cambridge, dedicó su vida a una idea impopular durante décadas: que la inteligencia podía emerger de <b>redes de neuronas artificiales</b> que ajustan sus conexiones, y no de reglas lógicas escritas a mano.',
      'Popularizó la <b>retropropagación</b> (1986) para entrenar redes profundas, co-creó las <b>Máquinas de Boltzmann</b> con Sejnowski e inventó técnicas como el <i>dropout</i>. En 2012, su equipo ganó <b>ImageNet</b> con <b>AlexNet</b> y detonó la revolución del deep learning.',
      'Recibió el <b>Premio Turing</b> (2018) y el <b>Nobel de Física</b> (2024). En 2023 dejó Google para advertir sobre los <b>riesgos</b> de la IA que ayudó a crear. Es la prueba de que mirar al cerebro —aun de forma simplificada— podía superar a la IA simbólica.'
    ] });

    cog.persona(cont, { slug: "fei-fei-li", nombre: "Fei-Fei Li", color: VE, etiqueta: "Visión y datos", meta: "n. 1976 · Informática, codirectora de Stanford HAI (China / EE. UU.)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Investigadora cuyo doctorado unió la <b>neurociencia computacional del sistema visual</b> con la visión por computadora. Emigró de China a EE. UU. siendo adolescente; hoy codirige el Instituto de <b>IA Centrada en el Humano (HAI)</b> de Stanford.',
      'Intuyó que a los algoritmos de visión no les faltaban modelos sino <b>datos</b>: creó <b>ImageNet</b> (2009), una base de ~14 millones de imágenes etiquetadas. El concurso que organizó alrededor de ImageNet fue el campo de pruebas donde el deep learning demostró su poder.',
      'Sin ImageNet no habría habido AlexNet ni la revolución visual. Además lidera la agenda de <b>ética e IA centrada en el humano</b>, insistiendo en que la tecnología debe ampliar —no reemplazar— la dignidad de las personas.'
    ] });

    cog.persona(cont, { slug: "karl-friston", nombre: "Karl Friston", color: AZ, etiqueta: "Energía libre", meta: "n. 1959 · Neurocientífico, UCL (Reino Unido)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Uno de los <b>neurocientíficos más citados de la historia</b>. Antes de su teoría unificadora, revolucionó la <b>neuroimagen</b>: creó el <b>SPM</b> (Statistical Parametric Mapping), el estándar para analizar las resonancias del cerebro.',
      'Formuló el <b>Principio de Energía Libre</b>: el cerebro es una máquina de predicción que busca minimizar su <b>sorpresa</b>. La <b>Inferencia Activa</b> añade que un agente puede reducir esa sorpresa <b>actuando</b> sobre el mundo para que coincida con lo que esperaba, no solo aprendiendo.',
      'Su marco ofrece una teoría única de <b>percepción, acción y aprendizaje</b> sin necesidad de un “maestro” que etiquete los datos. Inspira a una generación de agentes <b>autónomos</b> que exploran y planean guiados por su propia incertidumbre.'
    ] });

    cog.persona(cont, { slug: "tomaso-poggio", nombre: "Tomaso Poggio", color: AZ, etiqueta: "Teoría del aprendizaje y visión", meta: "n. 1947 · Físico y neurocientífico computacional, MIT (Italia / EE. UU.)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Director del <b>Center for Brains, Minds and Machines</b> del MIT, dedicó su carrera a una pregunta doble: cómo <b>ve</b> el cerebro y cómo lograr que una máquina vea igual.',
      'Desarrolló <b>teoría del aprendizaje estadístico</b> y modelos como <b>HMAX</b>: jerarquías inspiradas en la corteza visual que anticiparon ideas de las redes convolucionales. Formó a decenas de líderes del campo, incluidos mentores del entorno de DeepMind.',
      'Poggio insistió en que no basta con que la IA <b>funcione</b>: hay que <b>entender por qué</b>, con teoría matemática. Es el puente entre la biología de la visión y el silicio que hoy reconoce rostros y objetos.'
    ] });

    cog.persona(cont, { slug: "josh-tenenbaum", nombre: "Josh Tenenbaum", color: MO, etiqueta: "Aprender como un niño", meta: "n. 1972 · Científico cognitivo computacional, MIT (EE. UU.)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Lidera en el MIT la <b>ciencia cognitiva computacional</b>: modelar matemáticamente cómo la mente humana —sobre todo la de los niños— aprende tanto a partir de tan poco.',
      'Combina modelos <b>Bayesianos</b> con la <b>inducción de programas</b>: aprender la “receta” que genera los datos, no solo memorizarlos. Con ello emula la <b>física intuitiva</b> y la <b>psicología intuitiva</b> humanas, y aprende conceptos con un puñado de ejemplos.',
      'Frente a redes que necesitan millones de datos, Tenenbaum representa la apuesta por la <b>eficiencia</b> y la <b>estructura</b>. Su trabajo marca el rumbo hacia una IA que razone y generalice como las personas, no solo que prediga.'
    ] });

    cog.persona(cont, { slug: "steven-pinker", nombre: "Steven Pinker", color: AM, etiqueta: "El instinto del lenguaje", meta: "n. 1954 · Psicólogo y lingüista, Harvard (Canadá / EE. UU.)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Psicólogo cognitivo y divulgador, estudia la <b>mente y el lenguaje</b> desde la psicología evolutiva. Es autor de obras como <i>El instinto del lenguaje</i> y <i>Los ángeles que llevamos dentro</i>.',
      'Argumentó que la <b>gramática</b> es un <b>módulo computacional</b> innato del cerebro, un “instinto” moldeado por la evolución. Para él, hablar no es solo cultura: es un órgano mental con reglas propias.',
      'Su visión del lenguaje como <b>cómputo</b> influye en el PLN y alimenta un debate vigente: ¿los <b>LLMs</b> realmente <b>entienden</b> el significado o solo manipulan estadística de palabras? Pinker es una voz crítica y matizada en esa discusión.'
    ] });

    cog.persona(cont, { slug: "terry-sejnowski", nombre: "Terry Sejnowski", color: MO, etiqueta: "Neurociencia computacional", meta: "n. 1947 · Neurocientífico computacional, Instituto Salk · UCSD (EE. UU.)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Físico convertido en <b>neurocientífico computacional</b>, dirige el laboratorio de neurobiología computacional del Instituto Salk y es una figura central de la comunidad del aprendizaje profundo (presidió la fundación de NeurIPS).',
      'Co-creó con Hinton la <b>Máquina de Boltzmann</b>, fue pionero del <b>Análisis de Componentes Independientes (ICA)</b> —separar señales mezcladas, como aislar una voz entre el ruido— y construyó <b>NETtalk</b> (1987), una red que aprendió a <b>leer en voz alta</b>.',
      'Sejnowski mantuvo viva la idea de que estudiar <b>neuronas reales</b> y redes artificiales se iluminan mutuamente. NETtalk fue una demostración temprana y vívida de que una red podía aprender una regla compleja a partir de ejemplos.'
    ] });

    cog.persona(cont, { slug: "daniel-kahneman", nombre: "Daniel Kahneman", color: RO, etiqueta: "Sistema 1 y Sistema 2", meta: "1934–2024 · Psicólogo, Nobel de Economía (Israel / EE. UU.)",
      bloques: ["¿Quién fue?", "Su aporte", "Su legado"], parrafos: [
      'Psicólogo israelí-estadounidense que, junto a <b>Amos Tversky</b>, revolucionó nuestra comprensión de cómo <b>decidimos</b>. Ganó el <b>Premio Nobel de Economía</b> en 2002 por llevar la psicología al corazón de la teoría económica.',
      'Describió dos modos de pensar: el <b>Sistema 1</b> (rápido, automático, intuitivo) y el <b>Sistema 2</b> (lento, lógico, deliberado), y catalogó los <b>sesgos cognitivos</b> que nos desvían. Su libro <i>Pensar rápido, pensar despacio</i> lo volvió un clásico.',
      'Esa dicotomía se convirtió en <b>hoja de ruta</b> para la IA: un LLM que predice el siguiente token es puro Sistema 1, y la frontera es dotarlo de Sistema 2 (razonar paso a paso, deliberar antes de responder). Falleció en 2024.'
    ] });

    cog.persona(cont, { slug: "michael-i-jordan", nombre: "Michael I. Jordan", color: AZ, etiqueta: "Estadística, mente y máquina", meta: "n. 1956 · Científico de la computación y estadístico, UC Berkeley (EE. UU.)",
      bloques: ["¿Quién es?", "Su aporte", "Por qué importa"], parrafos: [
      'Uno de los puentes más importantes entre la <b>estadística</b>, el <b>aprendizaje automático</b> y la ciencia cognitiva. Empezó estudiando el <b>control motor</b> y la psicología antes de volverse referente de la IA probabilística.',
      'Pionero de los <b>modelos gráficos probabilísticos</b> y los métodos <b>Bayesianos</b> variacionales; co-creó <b>LDA</b> (asignación latente de Dirichlet) para descubrir temas en texto. Formó a buena parte de la élite actual del aprendizaje automático.',
      'Jordan defiende una IA con <b>fundamentos matemáticos</b> sólidos y cautela frente a la exageración: entender la <b>incertidumbre</b> es tan importante como acertar. Su linaje académico moldea el campo entero.'
    ] });

    cog.prosa(cont, '<h3>2 · Cuatro puentes mente → máquina</h3>' +
      '<p>Lo valioso no son los nombres sueltos, sino las ideas del cerebro que se volvieron arquitectura.</p>');
    cog.figura(cont, { color: MO, titulo: "Sistema 1 y Sistema 2: la hoja de ruta de la IA",
      svg: SVG_S1S2,
      pie: "<b>Kahneman</b> describió dos modos de pensar. Un LLM que predice el siguiente token es puro <b>Sistema 1</b>: rápido, intuitivo, a veces impulsivo. La frontera de la IA es dotarlo de <b>Sistema 2</b>: razonamiento lento y deliberado (<i>Chain-of-Thought</i>, cómputo en inferencia, agentes que piensan antes de responder)." });
    cog.grid(cont, [
      { color: MO, etiqueta: "Boltzmann", titulo: "Neurona + física estadística",
        cuerpo: '<b>Hinton + Sejnowski</b> unieron neurobiología, física estadística y redes en las <b>Máquinas de Boltzmann</b>: arquitecturas estocásticas que inspiraron el deep learning.' },
      { color: VE, etiqueta: "Visión", titulo: "De la biología al silicio",
        cuerpo: '<b>Poggio</b> modeló la visión biológica → <b>Fei-Fei Li</b> la volvió datos (ImageNet) → la revolución visual del deep learning.' },
      { color: AZ, etiqueta: "Pocos datos", titulo: "Conexionismo vs. razonamiento",
        cuerpo: '<b>Hinton</b> (redes que necesitan millones de ejemplos) vs. <b>Tenenbaum</b> (IA probabilística que aprende con poquísimos, como un niño): dos visiones de la eficiencia.' },
      { color: AM, etiqueta: "Acción", titulo: "Energía libre → autonomía",
        cuerpo: '<b>Friston</b> (minimizar la sorpresa actuando) alimenta la idea de agentes autónomos que, como en DeepMind, usan <b>memoria e imaginación</b> para planear.' }
    ]);

    cog.acordeon(cont, [
      { q: "Energía Libre e Inferencia Activa (Friston)", a: 'El cerebro es una <b>máquina de predicción</b>: construye un modelo del mundo y busca minimizar el <b>error de predicción</b> (la “sorpresa”). Puede hacerlo de dos formas: <b>cambiando el modelo</b> (aprender) o <b>cambiando el mundo</b> (actuar para que la realidad coincida con lo que esperaba) — eso último es la <b>Inferencia Activa</b>. A diferencia del aprendizaje supervisado, no hay un “maestro” con etiquetas: la meta es reducir la sorpresa propia.' },
      { q: "Sistema 1 y Sistema 2 en la IA", a: 'La dicotomía de Kahneman se volvió hoja de ruta técnica. <b>Chain-of-Thought</b>: pedirle al modelo que “piense en voz alta” paso a paso. <b>Inference-time compute</b>: darle más tiempo/cómputo para deliberar antes de responder. <b>Agentes</b>: modelos que planifican, usan herramientas y revisan su trabajo. Todo es intentar darle a un predictor de Sistema 1 las virtudes del Sistema 2.' },
      { q: "IA probabilística y programas (Tenenbaum)", a: 'Combina modelos <b>Bayesianos</b> (razonar con probabilidades y actualizar creencias) con la <b>inducción de programas</b> (aprender la “receta” generadora de los datos). Así emula la <b>física intuitiva</b> (sé que un vaso caerá) y la <b>psicología intuitiva</b> (sé que buscas tus llaves porque las quieres) de los humanos — con una fracción de los datos que necesita una red profunda.' },
      { q: "ICA y NETtalk (Sejnowski)", a: 'El <b>Análisis de Componentes Independientes</b> separa señales mezcladas en sus fuentes originales (como aislar una voz en una fiesta ruidosa): clave en procesamiento de señales neuronales. <b>NETtalk</b> (1987) fue una red que aprendió a convertir <b>texto en fonemas</b>, pronunciando en voz alta: una demostración temprana y vívida de que una red podía aprender una regla compleja desde ejemplos.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Asocia idea y autor. Elige y revisa.",
      reactivos: [
        { p: 'La teoría del Sistema 1 (rápido) y Sistema 2 (lento), hoja de ruta para razonar en IA, es de…',
          opciones: [{ t: "Daniel Kahneman", ok: true }, { t: "Karl Friston" }, { t: "Fei-Fei Li" }],
          porque: "Kahneman describió los dos sistemas del pensamiento; la IA busca llevar a los modelos del Sistema 1 (predecir) al 2 (razonar)." },
        { p: 'El Principio de Energía Libre —minimizar la sorpresa actuando sobre el mundo— es de…',
          opciones: [{ t: "Karl Friston", ok: true }, { t: "Geoffrey Hinton" }, { t: "Josh Tenenbaum" }],
          porque: "Friston propuso la minimización del error de predicción y la Inferencia Activa como principio del cerebro y de agentes autónomos." },
        { p: 'Aprender con muy pocos ejemplos, como un niño, usando modelos probabilísticos, es la apuesta de…',
          opciones: [{ t: "Josh Tenenbaum", ok: true }, { t: "Terry Sejnowski" }, { t: "Michael Jordan" }],
          porque: "Tenenbaum combina lo Bayesiano con la inducción de programas para la física y psicología intuitivas con pocos datos." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Daniel Kahneman", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Daniel_Kahneman", lang: "es" },
    { t: "Geoffrey Hinton", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Geoffrey_Hinton", lang: "es" },
    { t: "The free-energy principle: a unified brain theory? (Friston, 2010)", fuente: "Nature Reviews Neuroscience", url: "https://www.nature.com/articles/nrn2787", lang: "en" },
    { t: "Thinking, Fast and Slow", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow", lang: "en" },
    { t: "AlphaFold", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/AlphaFold", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Por qué se dice que la mente es el “plano” de la IA?", op: ["Porque la IA copia el cerebro célula por célula", "Porque las grandes ideas de la IA (memoria, visión, razonamiento) nacieron estudiando la mente", "Porque el cerebro es más rápido", "Porque la IA no usa matemáticas"], ok: 1, porque: "La neurociencia y la ciencia cognitiva aportaron los conceptos que la IA volvió arquitectura: redes, atención, memoria, aprendizaje." },
    { p: "Un LLM que predice el siguiente token se parece sobre todo al…", op: ["Sistema 2 (lento, lógico)", "Sistema 1 (rápido, intuitivo)", "ninguno de los dos", "razonamiento deductivo"], ok: 1, porque: "Es rápido, automático e intuitivo: Sistema 1. Técnicas como Chain-of-Thought buscan acercarlo al Sistema 2 deliberativo." },
    { p: "La Inferencia Activa de Friston sostiene que un agente…", op: ["Memoriza todos los datos", "Actúa para minimizar su error de predicción (su “sorpresa”)", "Necesita siempre etiquetas humanas", "Nunca cambia su modelo del mundo"], ok: 1, porque: "El agente reduce la sorpresa de dos formas: aprendiendo (cambiar el modelo) o actuando (cambiar el mundo)." },
    { p: "Las Máquinas de Boltzmann fueron creadas por…", op: ["Kahneman y Tversky", "Hinton y Sejnowski", "Fei-Fei Li y Poggio", "Tenenbaum y Jordan"], ok: 1, porque: "Hinton y Sejnowski las desarrollaron uniendo neurobiología, física estadística y redes neuronales estocásticas." },
    { p: "La apuesta de Josh Tenenbaum frente al deep learning clásico es…", op: ["Usar aún más datos", "Aprender con pocos datos vía modelos probabilísticos e inducción de programas", "Eliminar la probabilidad", "Copiar ImageNet"], ok: 1, porque: "Busca la eficiencia del aprendizaje infantil: física y psicología intuitivas con poquísimos ejemplos, no millones." }
  ];

  E.registrar({
    id: "fund-mente-plano-ia",
    grupo: "fund-mente",
    lenguaje: "fund",
    orden: 17,
    titulo: "La mente como plano de la IA",
    sub: "Diez puentes entre el cerebro y el silicio",
    resumen: "Diez figuras que cruzan neurociencia, cognición y computación (Hassabis, Hinton, Fei-Fei Li, Friston, Poggio, Tenenbaum, Pinker, Sejnowski, Kahneman, Jordan) y las ideas del cerebro que se volvieron IA: Sistema 1/2, energía libre, visión, aprendizaje con pocos datos.",
    chips: [{ k: "Bloque", v: "Mente e IA" }, { k: "Tipo", v: "Referentes y puentes" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-mente-plano-ia", QUIZ)
    }
  });
})();
