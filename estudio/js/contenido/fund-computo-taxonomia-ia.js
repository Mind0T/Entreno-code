/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Taxonomía Avanzada y Dinámicas Adaptativas de la IA
   Más allá de IA>ML>DL: bioinspiración, modelo POE, ML y DL
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Línea de tiempo neuro-matemática */
  var SVG_TIMELINE =
    '<svg viewBox="0 0 620 150" role="img" aria-label="Línea de tiempo de hitos de la IA">' +
    '<line x1="20" y1="80" x2="600" y2="80" stroke="currentColor" opacity=".3"/>' +
    '<g font-size="10" text-anchor="middle">' +
    '<g><circle cx="60" cy="80" r="5" fill="var(--azul)"/><text x="60" y="64" fill="currentColor" opacity=".8">1949</text><text x="60" y="104" fill="currentColor" opacity=".55">Hebb</text></g>' +
    '<g><circle cx="150" cy="80" r="5" fill="var(--azul)"/><text x="150" y="64" fill="currentColor" opacity=".8">1957</text><text x="150" y="104" fill="currentColor" opacity=".55">Perceptrón</text></g>' +
    '<g><circle cx="250" cy="80" r="5" fill="var(--morado)"/><text x="250" y="64" fill="currentColor" opacity=".8">1986</text><text x="250" y="104" fill="currentColor" opacity=".55">Backprop</text></g>' +
    '<g><circle cx="350" cy="80" r="5" fill="var(--verde)"/><text x="350" y="64" fill="currentColor" opacity=".8">1997</text><text x="350" y="104" fill="currentColor" opacity=".55">LeNet / LSTM</text></g>' +
    '<g><circle cx="440" cy="80" r="5" fill="var(--verde)"/><text x="440" y="64" fill="currentColor" opacity=".8">2009</text><text x="440" y="104" fill="currentColor" opacity=".55">ImageNet</text></g>' +
    '<g><circle cx="520" cy="80" r="5" fill="var(--ambar)"/><text x="520" y="64" fill="currentColor" opacity=".8">2014</text><text x="520" y="104" fill="currentColor" opacity=".55">GANs</text></g>' +
    '<g><circle class="cog-pulse" cx="585" cy="80" r="6" fill="var(--ambar)"/><text x="585" y="64" fill="currentColor" opacity=".8">2017</text><text x="585" y="104" fill="currentColor" opacity=".55">Transformer</text></g>' +
    '</g></svg>';

  /* SVG 2 — Modelo POE: tres escalas de adaptación */
  var SVG_POE =
    '<svg viewBox="0 0 560 180" role="img" aria-label="Modelo POE: filogenia, epigénesis, ontogenia">' +
    '<g text-anchor="middle" font-size="11.5">' +
    '<rect x="14" y="40" width="168" height="110" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="98" y="30" fill="var(--azul)" font-weight="600" font-size="12.5">Filogenia</text><text x="98" y="78" fill="currentColor" opacity=".75">escala lenta</text><text x="98" y="96" fill="currentColor" opacity=".75">generacional</text><text x="98" y="124" font-size="10" fill="currentColor" opacity=".55">computación evolutiva</text>' +
    '<rect x="196" y="40" width="168" height="110" rx="12" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="280" y="30" fill="var(--morado)" font-weight="600" font-size="12.5">Epigénesis</text><text x="280" y="78" fill="currentColor" opacity=".75">escala intermedia</text><text x="280" y="96" fill="currentColor" opacity=".75">ciclo de vida</text><text x="280" y="124" font-size="10" fill="currentColor" opacity=".55">robótica del desarrollo</text>' +
    '<rect class="cog-pulse" x="378" y="40" width="168" height="110" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="462" y="30" fill="var(--verde)" font-weight="600" font-size="12.5">Ontogenia</text><text x="462" y="78" fill="currentColor" opacity=".75">escala rápida</text><text x="462" y="96" fill="currentColor" opacity=".75">tiempo real</text><text x="462" y="124" font-size="10" fill="currentColor" opacity=".55">redes neuronales</text>' +
    '<text x="280" y="170" fill="currentColor" opacity=".6" font-size="10">← más lento · velocidad de adaptación · más rápido →</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Taxonomía Avanzada de la IA</h2>' +
      '<p>“IA ⊃ ML ⊃ DL” es un buen comienzo, pero una mentira por simplificación. La IA real es un <b>ecosistema</b> de paradigmas que ni siquiera comparten raíz: unos optimizan con cálculo diferencial, otros imitan a las hormigas; unos adaptan en milisegundos, otros a lo largo de generaciones. Este módulo es el mapa grande: la genealogía, las ramas bioinspiradas, las <b>escalas de adaptación</b> y el zoológico de algoritmos del ML clásico y el deep learning.</p>');

    cog.epigrafe(cont, "“La inteligencia no es una escalera lineal: es un árbol con muchas ramas que resuelven problemas distintos.”", "Síntesis del módulo");

    cog.prosa(cont, '<h3>1 · Genealogía: siete décadas en una línea</h3>');
    cog.figura(cont, { color: AM, titulo: "De la neurona de Hebb al Transformer",
      svg: SVG_TIMELINE,
      pie: "<b>1949</b> Hebb · <b>1957</b> Perceptrón (Rosenblatt) · <b>1986</b> retropropagación (Werbos la formuló en 1974; Hinton, Rumelhart y Williams la popularizaron) · <b>1997</b> LeNet-5 (LeCun) y LSTM (Schmidhuber) · <b>2009</b> ImageNet (Fei-Fei Li) · <b>2014</b> GANs (Goodfellow) · <b>2017</b> Transformer (<i>Attention Is All You Need</i>)." });
    cog.nota(cont, 'La <b>línea neuro-matemática</b> es el hilo rojo: Hebb (1949) → Perceptrón (1957) → límite de separabilidad lineal → retropropagación → deep learning moderno. La regla que ajusta los pesos es el gradiente descendente:<br><code>Δwᵢⱼ = −η · (∂E / ∂wᵢⱼ)</code><br>“cambia cada peso en la dirección opuesta al gradiente del error, a pasos de tamaño η (la tasa de aprendizaje)”.', MO);

    cog.prosa(cont, '<h3>2 · El mapa taxonómico ampliado</h3>' +
      '<p>Más allá del eje conexionista, hay toda una familia <b>bioinspirada</b> que optimiza <b>sin gradientes</b>.</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "Reglas y lógica", titulo: "IA Simbólica (GOFAI)",
        cuerpo: 'Sistemas expertos, representación del conocimiento (ontologías, lógica de primer orden), <b>búsqueda heurística</b> (A*, Minimax) y planificación.' },
      { color: VE, etiqueta: "Darwin sin derivadas", titulo: "Computación Evolutiva",
        cuerpo: 'Optimización <i>gradient-free</i>, filogenética: Algoritmos Genéticos (cadenas de bits), Programación Genética (árboles de código), Estrategias Evolutivas (números reales) y Programación Evolutiva.' },
      { color: AM, etiqueta: "Sabiduría de la multitud", titulo: "Inteligencia de Enjambre",
        cuerpo: 'Colectiva, sin muerte ni reproducción: Colonia de Hormigas (ACO, feromonas), Enjambre de Partículas (PSO) y Colonia de Abejas (ABC).' },
      { color: RO, etiqueta: "Lo propio vs. lo extraño", titulo: "Sistemas Inmunológicos (AIS)",
        cuerpo: 'Inspirados en el sistema inmune: detección de <b>anomalías</b> y ciberseguridad distinguiendo lo normal de lo intruso.' }
    ]);
    cog.nota(cont, 'Y también: la <b>Lógica Difusa</b> (grados de verdad continuos, no solo 0/1), el <b>Machine Learning</b> (aprender de datos) y las <b>fronteras híbridas</b>: sistemas <b>neuro-simbólicos</b> (DL + lógica explicable) y <b>neuroevolución</b> (evolucionar arquitecturas de red).', AZ);

    cog.prosa(cont, '<h3>3 · Dinámica temporal: el modelo POE</h3>' +
      '<p>Otra forma de clasificar la IA: no por <i>qué</i> es, sino por <b>a qué velocidad se adapta</b>. En entornos <b>estacionarios</b> (reglas fijas) basta <i>predecir</i>; en entornos <b>no estacionarios</b> (caóticos) hay que <i>adaptarse</i>. Y la adaptación ocurre en tres escalas de tiempo.</p>');
    cog.figura(cont, { color: MO, titulo: "Tres relojes de la adaptación",
      svg: SVG_POE,
      pie: "<b>Filogenia</b> (lenta, generacional): la computación evolutiva cambia la arquitectura base a nivel de población. <b>Epigénesis</b> (intermedia, ciclo de vida): la robótica del desarrollo inspirada en Piaget y Vygotsky —andamiaje cognitivo, curiosidad artificial, imitación—. <b>Ontogenia</b> (rápida, tiempo real): las redes neuronales ajustan pesos al instante." });
    cog.acordeon(cont, [
      { q: "Fusión de escalas: Evo-Devo y el Efecto Baldwin", a: 'Cuando combinas escalas, aparecen híbridos potentes: <b>Evo-Devo</b> evoluciona “recetas de crecimiento” en vez de diseños fijos; el <b>Efecto Baldwin</b> (Baldwin, 1896) describe cómo el <b>aprendizaje</b> individual guía la <b>evolución</b> genética; y <b>Evo-Devo-Learn</b> junta las tres —evolución, desarrollo y aprendizaje— en una trinidad adaptativa.' },
      { q: "Puente psicología → IA", a: 'El <b>conductismo</b> (condicionamiento operante) inspira el Aprendizaje por Refuerzo: Q-Learning → DQN → PPO/RLHF (el método que alinea a los LLMs). La <b>psicología del desarrollo</b> (Piaget/Vygotsky) inspira la robótica epigenética. La mente humana sigue siendo el plano.' }
    ], "Profundiza: fusiones y puentes");

    cog.prosa(cont, '<h3>4 · El zoológico del Machine Learning</h3>' +
      '<p>El ML clásico se ordena por <b>cómo</b> aprende.</p>');
    cog.tabla(cont, {
      criterio: "Paradigma",
      cols: [{ nombre: "Qué recibe", color: AZ }, { nombre: "Ejemplos", color: VE }],
      filas: [
        { k: "Supervisado", v: ["Datos <b>etiquetados</b>", "Reg. logística, SVM, Naive Bayes, K-NN, Árboles"] },
        { k: "No supervisado", v: ["Datos <b>sin etiqueta</b>", "K-Means, jerárquico, DBSCAN, PCA, t-SNE, UMAP"] },
        { k: "Semi-supervisado", v: ["Pocas etiquetas", "Pseudo-Labeling"] },
        { k: "Ensamblaje", v: ["Muchos modelos juntos", "Bagging (Random Forest), Boosting (XGBoost)"] }
      ]
    });
    cog.nota(cont, 'Dos joyas matemáticas del ML clásico: el <b>Kernel Trick</b> de las SVM —proyectar los datos a más dimensiones donde <i>sí</i> son separables por un plano, sin calcular esas dimensiones explícitamente— y la <b>Maldición de la Dimensionalidad</b> —al añadir dimensiones, el espacio se vuelve tan vasto que todo queda “lejos” de todo y los datos se vuelven dispersos—. Naive Bayes, por su parte, aplica Bayes: <code>P(y|X) = P(X|y)·P(y) / P(X)</code>.', MO);

    cog.prosa(cont, '<h3>5 · El zoológico del Deep Learning</h3>' +
      '<p>Cada arquitectura profunda resuelve un tipo de dato.</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "Tabular", titulo: "MLP / Densas",
        cuerpo: 'El perceptrón multicapa: <code>y = σ(Wx + b)</code>. La base de todo.' },
      { color: VE, etiqueta: "Espacio (visión)", titulo: "CNN · ResNet · YOLO",
        cuerpo: 'Filtros convolucionales y campos receptivos; <b>ResNets</b> con <i>skip connections</i> contra el gradiente que se desvanece; <b>YOLO</b> detecta en una sola pasada.' },
      { color: MO, etiqueta: "Secuencia (tiempo)", titulo: "RNN · LSTM · GRU",
        cuerpo: 'Memoria para datos secuenciales; <b>LSTM</b> con compuertas de olvido, entrada y salida para recordar a largo plazo.' },
      { color: AM, etiqueta: "Atención", titulo: "Transformers",
        cuerpo: 'El mecanismo <code>Attention(Q,K,V) = softmax(QKᵀ/√dₖ)·V</code>; Encoders (BERT), Decoders (GPT, Claude, Llama), Seq2Seq (T5).' },
      { color: VE, etiqueta: "Generativos", titulo: "VAE · GAN · Difusión",
        cuerpo: 'VAEs (espacio latente probabilístico), GANs (juego de suma cero), Difusión (destruir y revertir ruido: DALL·E, Stable Diffusion).' },
      { color: RO, etiqueta: "Refuerzo profundo", titulo: "DQN · PPO",
        cuerpo: 'DQN (CNN + Q-Learning); <b>PPO</b>, base del <b>RLHF</b> que alinea a los grandes modelos de lenguaje.' }
    ]);

    cog.acordeon(cont, [
      { q: "Los “Inviernos de la IA”", a: 'Dos grandes congelamientos de financiamiento: el <b>primero</b> (tras 1969) por el límite del perceptrón monocapa y las promesas incumplidas de la IA simbólica; el <b>segundo</b> (fines de los 80) por el colapso de los sistemas expertos. Se superaron con <b>retropropagación</b>, <b>datos masivos</b> (ImageNet) y <b>GPUs</b>.' },
      { q: "Sistemas Inmunológicos Artificiales (AIS)", a: 'Imitan dos mecanismos del sistema inmune: la <b>selección negativa</b> (entrenar detectores que NO reaccionan a lo propio, de modo que cualquier reacción señala un intruso) y la <b>selección clonal</b> (amplificar los detectores que sí captaron la amenaza). Se usan en <b>ciberseguridad</b> para detectar intrusiones y anomalías.' },
      { q: "Evo-Devo y el diseño (Esfera 3)", a: 'Si evolucionas a la vez la <b>forma</b> del robot y su <b>control</b>, obtienes <b>diseño generativo</b>: morfologías que ningún humano habría dibujado, optimizadas por la tarea. Es el corazón de la <b>robótica blanda</b> (<i>soft robotics</i>), donde cuerpo y cómputo se co-diseñan.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Ubica cada técnica en su rama. Elige y revisa.",
      reactivos: [
        { p: 'Optimizas el diseño de un ala usando población, selección, cruce y mutación. Eso es…',
          opciones: [{ t: "computación evolutiva (gradient-free)", ok: true }, { t: "deep learning" }, { t: "un sistema experto" }],
          porque: "Es optimización <b>evolutiva</b>, inspirada en Darwin y sin derivadas: genera, selecciona y muta a lo largo de generaciones." },
        { p: 'Las redes neuronales que ajustan pesos en tiempo real corresponden, en el modelo POE, a la escala…',
          opciones: [{ t: "ontogenia (rápida)", ok: true }, { t: "filogenia (lenta)" }, { t: "epigénesis (intermedia)" }],
          porque: "La <b>ontogenia</b> es la adaptación rápida, en tiempo real: justo el ajuste inmediato de pesos de una red." },
        { p: 'La arquitectura detrás de GPT y Claude, basada en el mecanismo de atención, es el…',
          opciones: [{ t: "Transformer", ok: true }, { t: "Perceptrón" }, { t: "DBSCAN" }],
          porque: "El <b>Transformer</b> (2017) y su mecanismo de atención son la base de los grandes modelos de lenguaje modernos." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "¿Por qué “IA ⊃ ML ⊃ DL” se queda corto como taxonomía?", op: ["Porque el DL no existe", "Porque hay ramas (evolutiva, enjambre, difusa) que no son conexionistas", "Porque el ML es más grande que la IA", "Porque todo es deep learning"], ok: 1, porque: "La IA incluye paradigmas bioinspirados (evolutivos, de enjambre, inmunológicos) y la lógica difusa, que no derivan del conexionismo." },
    { p: "En el modelo POE, la <b>filogenia</b> corresponde a…", op: ["Ajuste de pesos en tiempo real", "Adaptación lenta y generacional (computación evolutiva)", "Desarrollo durante el ciclo de vida", "Reglas simbólicas"], ok: 1, porque: "La filogenia es la escala lenta y poblacional: la computación evolutiva cambia la arquitectura base entre generaciones." },
    { p: "El “Kernel Trick” de las SVM sirve para…", op: ["Comprimir la red", "Separar datos proyectándolos a más dimensiones sin calcularlas explícitamente", "Etiquetar datos automáticamente", "Evolucionar arquitecturas"], ok: 1, porque: "Proyecta los datos a un espacio de mayor dimensión donde sí son linealmente separables, usando funciones kernel sin computar esas coordenadas." },
    { p: "PPO (y el RLHF que deriva de él) es importante porque…", op: ["Genera imágenes", "Es la base para alinear los grandes modelos de lenguaje", "Detecta anomalías", "Reduce dimensionalidad"], ok: 1, porque: "PPO es un método de aprendizaje por refuerzo profundo; el RLHF construido sobre él alinea a los LLMs con las preferencias humanas." },
    { p: "¿Qué ayudó a superar los “Inviernos de la IA”?", op: ["Volver a los sistemas expertos", "Retropropagación, datos masivos (ImageNet) y GPUs", "Prohibir las redes neuronales", "Usar solo lógica difusa"], ok: 1, porque: "La combinación de backpropagation, datasets masivos etiquetados y cómputo paralelo en GPUs destrabó el deep learning moderno." }
  ];

  E.registrar({
    id: "fund-computo-taxonomia-ia",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 11,
    titulo: "Taxonomía Avanzada de la IA",
    sub: "Bioinspiración, escalas de adaptación y arquitecturas",
    resumen: "Más allá de IA>ML>DL: genealogía histórica, ramas bioinspiradas (evolutiva, enjambre, inmunológica), el modelo POE (filogenia/epigénesis/ontogenia) y el zoológico del ML clásico y el deep learning.",
    chips: [{ k: "Bloque", v: "Mapa de la IA" }, { k: "Tipo", v: "Taxonomía y arquitecturas" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-taxonomia-ia", QUIZ)
    }
  });
})();
