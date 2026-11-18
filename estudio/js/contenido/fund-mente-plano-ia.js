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

  function p(color, base, nombre, cuerpo) { return { color: color, etiqueta: base, titulo: nombre, cuerpo: cuerpo }; }

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>La mente como plano de la IA</h2>' +
      '<p>Antes de que existiera el <i>deep learning</i>, ya existía su plano: el cerebro. Casi todas las grandes ideas de la IA moderna nacieron mirando a la mente —la memoria, la visión, el razonamiento con pocos datos, los sesgos—. Diez figuras encarnan ese puente entre <b>neurociencia, cognición y computación</b>. No son “los de la IA”: son quienes entendieron que para construir una inteligencia artificial primero hay que entender la natural.</p>');

    cog.epigrafe(cont, "“Para construir una mente, primero hay que estudiar una.”", "Espíritu de la neurociencia computacional");

    cog.prosa(cont, '<h3>1 · Los diez perfiles</h3>');
    cog.grid(cont, [
      p(VE, "DeepMind · UCL", "Demis Hassabis", 'Neurocientífico y prodigio del ajedrez; estudió <b>memoria e imaginación</b> antes de fundar DeepMind y crear <b>AlphaGo</b> y <b>AlphaFold</b>. <b>Nobel de Química 2024</b>.'),
      p(MO, "Toronto · Google", "Geoffrey Hinton", 'El “padrino del deep learning”: impulsó la <b>retropropagación</b> y las <b>Máquinas de Boltzmann</b>. Era psicólogo experimental. <b>Turing</b> y <b>Nobel de Física 2024</b>.'),
      p(VE, "Stanford · HAI", "Fei-Fei Li", 'Su doctorado en <b>neurociencia computacional</b> del sistema visual la llevó a crear <b>ImageNet</b>. Pionera de la <b>IA centrada en el humano</b> y la ética.'),
      p(AZ, "UCL", "Karl Friston", 'El neurocientífico más citado de la historia; creó el <b>Principio de Energía Libre</b> y la <b>Inferencia Activa</b>: agentes que actúan para <b>minimizar su sorpresa</b>.'),
      p(AZ, "MIT · CBMM", "Tomaso Poggio", 'Teoría del aprendizaje estadístico y modelos computacionales de la <b>visión</b> biológica y artificial.'),
      p(MO, "MIT", "Josh Tenenbaum", 'Líder de la ciencia cognitiva computacional; <b>IA probabilística</b> y aprendizaje con <b>pocos datos</b> (como los niños): física y psicología “intuitivas”.'),
      p(AM, "Harvard", "Steven Pinker", 'Teoría del <b>instinto del lenguaje</b>: la gramática como módulo computacional del cerebro. Influye en el NLP y en la crítica a la semántica de los LLMs.'),
      p(MO, "Salk · UCSD", "Terry Sejnowski", 'Co-creó la <b>Máquina de Boltzmann</b> con Hinton; pionero del <b>ICA</b> y creador de <b>NETtalk</b>, una red que aprendió a leer en voz alta.'),
      p(RO, "Princeton", "Daniel Kahneman", 'Los dos sistemas del pensamiento (<b>Sistema 1</b> rápido, <b>Sistema 2</b> lento) y los <b>sesgos cognitivos</b>. <b>Nobel de Economía</b>.'),
      p(AZ, "UC Berkeley", "Michael I. Jordan", 'Puente entre estadística, psicología y computación; pionero de los <b>modelos gráficos probabilísticos</b> y el aprendizaje Bayesiano.')
    ]);

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
  }

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
