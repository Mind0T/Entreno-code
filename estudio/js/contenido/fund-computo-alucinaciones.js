/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Alucinaciones en LLMs — las "Máquinas de Sueños" (Karpathy)
   Ilusión · Alucinación · Confabulación · RAG
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Predicción del siguiente token: la mecánica del "sueño" */
  var SVG_TOKEN =
    '<svg viewBox="0 0 640 210" role="img" aria-label="Predicción del siguiente token mediante distribución de probabilidad">' +
    '<text x="20" y="34" font-size="12.5" fill="currentColor" opacity=".75">Contexto: “La capital de Francia es…”</text>' +
    '<rect x="20" y="46" width="250" height="36" rx="9" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".4"/>' +
    '<text x="145" y="69" text-anchor="middle" font-size="12" fill="currentColor" opacity=".7">tokens de entrada → vectores</text>' +
    '<path d="M145 82v22" stroke="currentColor" opacity=".45" stroke-width="1.5" marker-end="url(#hArr)"/>' +
    '<defs><marker id="hArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<text x="300" y="60" font-size="11" fill="currentColor" opacity=".6">Softmax → distribución</text>' +
    // barras de probabilidad
    '<g font-size="11" text-anchor="start">' +
    '<rect class="cog-draw" x="300" y="78" width="150" height="16" rx="4" fill="var(--verde)" opacity=".85"/><text x="458" y="90" fill="var(--verde)">París · 0.71</text>' +
    '<rect x="300" y="100" width="54" height="16" rx="4" fill="var(--azul)" opacity=".7"/><text x="458" y="112" fill="currentColor" opacity=".7">Lyon · 0.09</text>' +
    '<rect x="300" y="122" width="30" height="16" rx="4" fill="var(--morado)" opacity=".7"/><text x="458" y="134" fill="currentColor" opacity=".7">la… · 0.05</text>' +
    '<rect x="300" y="144" width="14" height="16" rx="4" fill="var(--rojo)" opacity=".6"/><text x="458" y="156" fill="currentColor" opacity=".6">Berlín · 0.01</text>' +
    '</g>' +
    '<text x="20" y="128" font-size="11.5" fill="currentColor" opacity=".7" width="250">El modelo no “busca” el dato:</text>' +
    '<text x="20" y="146" font-size="11.5" fill="currentColor" opacity=".7">calcula qué fragmento es</text>' +
    '<text x="20" y="164" font-size="11.5" fill="currentColor" opacity=".7">estadísticamente más probable.</text>' +
    '<text x="20" y="190" font-size="11" fill="var(--ambar)" opacity=".9">La “temperatura” decide cuánto arriesga fuera del pico.</text>' +
    '</svg>';

  /* SVG 2 — Tres fenómenos, un eje: estímulo presente/ausente */
  var SVG_TRES =
    '<svg viewBox="0 0 600 180" role="img" aria-label="Ilusión, alucinación y confabulación según el estímulo">' +
    '<g text-anchor="middle">' +
    '<rect x="20" y="40" width="170" height="104" rx="14" fill="none" stroke="var(--azul)" stroke-width="2"/>' +
    '<text x="105" y="30" font-size="13" fill="var(--azul)" font-weight="600">ILUSIÓN</text>' +
    '<text x="105" y="74" font-size="11" fill="currentColor" opacity=".75">estímulo REAL</text>' +
    '<text x="105" y="92" font-size="11" fill="currentColor" opacity=".75">mal interpretado</text>' +
    '<text x="105" y="124" font-size="10" fill="currentColor" opacity=".55">espejismo en el asfalto</text>' +
    '<rect x="215" y="40" width="170" height="104" rx="14" fill="none" stroke="var(--morado)" stroke-width="2"/>' +
    '<text x="300" y="30" font-size="13" fill="var(--morado)" font-weight="600">ALUCINACIÓN</text>' +
    '<text x="300" y="74" font-size="11" fill="currentColor" opacity=".75">SIN estímulo</text>' +
    '<text x="300" y="92" font-size="11" fill="currentColor" opacity=".75">percepción creada</text>' +
    '<text x="300" y="124" font-size="10" fill="currentColor" opacity=".55">oír una voz que no existe</text>' +
    '<rect class="cog-pulse" x="410" y="40" width="170" height="104" rx="14" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<text x="495" y="30" font-size="13" fill="var(--verde)" font-weight="600">CONFABULACIÓN</text>' +
    '<text x="495" y="74" font-size="11" fill="currentColor" opacity=".75">vacío rellenado</text>' +
    '<text x="495" y="92" font-size="11" fill="currentColor" opacity=".75">sin querer engañar</text>' +
    '<text x="495" y="124" font-size="10" fill="currentColor" opacity=".55">← aquí vive el LLM</text>' +
    '</g></svg>';

  /* SVG 3 — RAG: anclar el sueño a documentos reales */
  var SVG_RAG =
    '<svg viewBox="0 0 620 170" role="img" aria-label="Flujo de Generación Aumentada por Recuperación (RAG)">' +
    '<defs><marker id="rArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<g text-anchor="middle" font-size="11.5">' +
    '<rect x="14" y="62" width="96" height="46" rx="10" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/><text x="62" y="82" fill="currentColor" opacity=".8">Pregunta</text><text x="62" y="98" font-size="10" fill="currentColor" opacity=".55">del usuario</text>' +
    '<line x1="110" y1="85" x2="140" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#rArr)"/>' +
    '<rect x="144" y="52" width="110" height="66" rx="10" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="199" y="78" fill="var(--azul)">Búsqueda</text><text x="199" y="94" fill="var(--azul)">vectorial</text>' +
    '<text x="199" y="138" font-size="10" fill="currentColor" opacity=".55">base determinista ↑</text>' +
    '<g stroke="var(--azul)" fill="none" opacity=".6"><rect x="166" y="20" width="22" height="16" rx="2"/><rect x="188" y="20" width="22" height="16" rx="2"/><rect x="210" y="20" width="22" height="16" rx="2"/><path d="M199 52v-16" marker-end="url(#rArr)"/></g>' +
    '<line x1="254" y1="85" x2="284" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#rArr)"/>' +
    '<rect x="288" y="52" width="120" height="66" rx="10" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="348" y="78" fill="var(--morado)">Inyecta en el</text><text x="348" y="94" fill="var(--morado)">contexto</text>' +
    '<line x1="408" y1="85" x2="438" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#rArr)"/>' +
    '<rect class="cog-pulse" x="442" y="52" width="110" height="66" rx="10" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="497" y="78" fill="var(--verde)">LLM genera</text><text x="497" y="94" fill="var(--verde)">anclado</text>' +
    '<text x="497" y="138" font-size="10" fill="currentColor" opacity=".55">motor probabilístico</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Alucinaciones en LLMs: las “Máquinas de Sueños”</h2>' +
      '<p>Cuando un modelo de lenguaje inventa una cita, una fecha o un autor con <b>total seguridad</b>, decimos que “alucina”. Pero el término engaña: lo que hace un LLM no se parece a oír voces. Se parece más a <b>soñar con los ojos abiertos</b> y, de vez en cuando, acertar. Este módulo desarma el fenómeno desde tres frentes —la mecánica que lo produce, la psicología que lo nombra mal y la ingeniería que lo mitiga— para que dejes de tratar a un modelo como un oráculo y empieces a tratarlo como lo que es.</p>');

    cog.epigrafe(cont, "“Los LLMs son máquinas de sueños. Soñar no es el error: es la función. El <i>prompt</i> solo dirige el sueño.”", "Andrej Karpathy");

    cog.prosa(cont, '<h3>1 · La mecánica: predecir el siguiente token</h3>' +
      '<p>Un LLM no tiene una base de datos de hechos que consulta. Durante el preentrenamiento comprime <b>correlaciones estadísticas</b> —no documentos literales— en un <b>espacio latente</b>. En inferencia hace una sola cosa, millones de veces: dado un contexto, calcula qué <b>fragmento de palabra (token)</b> es más probable que venga después, y lo elige.</p>');
    cog.figura(cont, { color: VE, titulo: "El modelo no recuerda: apuesta",
      svg: SVG_TOKEN,
      pie: "Los <i>embeddings</i> convierten el texto en vectores; una función <b>Softmax</b> los vuelve una distribución de probabilidad sobre el vocabulario. La <b>temperatura</b> es el “atrevimiento”: baja → siempre el pico (“París”); alta → explora la cola, y es ahí donde brotan las falsedades fluidas." });
    cog.nota(cont, 'Que a veces acierte (“Capital de Francia” → “París”) no significa que <i>sepa</i> geografía: es una <b>alucinación correcta</b>, una coincidencia entre lo más probable y lo real. El mismo mecanismo que acierta en lo frecuente <b>inventa</b> en lo raro: en temas de nicho o cruces poco vistos, los <b>vacíos de datos</b> dejan el pico en un lugar falso pero gramaticalmente perfecto.', AZ);

    cog.prosa(cont, '<h3>2 · El nombre correcto: no es alucinación, es confabulación</h3>' +
      '<p>La psicología clínica distingue tres fenómenos que el habla cotidiana mezcla. Ubicar al LLM en el eje correcto cambia cómo lo entiendes.</p>');
    cog.figura(cont, { color: MO, titulo: "Un solo eje: ¿hay estímulo, y qué pasa con él?",
      svg: SVG_TRES,
      pie: "La <b>ilusión</b> malinterpreta algo real; la <b>alucinación</b> percibe sin estímulo alguno; la <b>confabulación</b> rellena un hueco de memoria con una historia coherente y <b>sin intención de engañar</b>. Un LLM no percibe nada: ante un vacío, fabrica lo plausible. Es, en rigor, un <b>confabulador</b>." });
    cog.grid(cont, [
      { color: AZ, etiqueta: "Estímulo real, mal leído", titulo: "Ilusión",
        cuerpo: 'Hay <b>algo ahí afuera</b>, pero el sistema lo interpreta mal.<br><span class="cog-mini">Ej.: ver “agua” en una carretera caliente por refracción de la luz.</span>' },
      { color: MO, etiqueta: "Sin estímulo", titulo: "Alucinación (clínica)",
        cuerpo: 'Se genera una <b>percepción sin ninguna fuente externa</b>. Es un término sensorial.<br><span class="cog-mini">Ej.: escuchar una voz que no existe.</span>' },
      { color: VE, etiqueta: "Vacío rellenado", titulo: "Confabulación",
        cuerpo: 'Se <b>llena un hueco</b> de información con un relato fabricado para mantener la coherencia, <b>sin querer engañar</b>.<br><span class="cog-mini">Ej.: un LLM “cita” un paper que nunca existió. Aquí vive el modelo.</span>' }
    ]);
    cog.nota(cont, 'Esto conecta con una pregunta filosófica de fondo (Esfera 1): ¿puede un sistema estadístico <b>saber</b> algo, o solo <b>predecir patrones</b>? Un LLM carece de <b>metacognición</b>: no “sabe lo que no sabe”, y por eso no puede frenar antes de inventar. Es el <i>symbol grounding problem</i> —el anclaje del símbolo al mundo— en estado puro.', MO);

    cog.prosa(cont, '<h3>3 · La ingeniería: anclar el sueño con RAG</h3>' +
      '<p>Si reentrenar no borra las alucinaciones (el mecanismo probabilístico sigue ahí), la salida es <b>híbrida</b>: unir el motor que “sueña” con un sistema externo <b>determinista</b>. Eso es <b>RAG</b> — <i>Retrieval-Augmented Generation</i>, Generación Aumentada por Recuperación.</p>');
    cog.figura(cont, { color: VE, titulo: "RAG: recuperar primero, generar después",
      svg: SVG_RAG,
      pie: "La pregunta se convierte en vector y recupera, por <b>similitud</b>, fragmentos reales de una base documental. Esos fragmentos se <b>inyectan en la ventana de contexto</b> (una memoria de corto plazo), y el LLM genera <b>anclado</b> a ellos. No elimina el riesgo: si recupera mal, o ignora lo recuperado, vuelve a soñar." });
    cog.acordeon(cont, [
      { q: "¿Por qué RAG mitiga pero no cura?", a: 'Porque el generador sigue siendo probabilístico. RAG mejora el <b>contexto</b>, no la naturaleza del modelo: si el recuperador trae documentos irrelevantes, o si el modelo “prefiere” su patrón interno al texto inyectado, la confabulación regresa. Reduce la frecuencia; no cambia la física.' },
      { q: "Temperatura: el dial del riesgo", a: 'A <b>temperatura 0</b> el modelo toma siempre el token más probable (determinista, repetitivo). Subirla reparte probabilidad hacia la cola: más creatividad, más diversidad… y más espacio para falsedades fluidas. Para datos verificables conviene baja; para lluvia de ideas, alta.' },
      { q: "Recuperar ≠ generar (bases de datos vs. redes)", a: 'Una base de datos clásica <b>recupera</b> lo que guardó, exacto. Una red neuronal generativa <b>reconstruye</b> algo plausible desde correlaciones. RAG es el matrimonio de ambos: lo determinista aporta el hecho, lo probabilístico aporta la redacción.' }
    ], "Profundiza");

    cog.prosa(cont, '<h3>4 · Diseñar para un sistema que sueña (Esfera 3)</h3>' +
      '<p>Si el modelo no es un oráculo, la <b>interfaz</b> no debe hacerlo parecer uno. El diseño honesto de productos de IA se vuelve una forma de ética.</p>');
    cog.grid(cont, [
      { color: AM, etiqueta: "Mostrar la fuente", titulo: "Citas verificables",
        cuerpo: 'Enlazar cada afirmación a su documento (como hace RAG) permite al usuario <b>auditar</b> en vez de creer. La transparencia reemplaza a la fe.' },
      { color: AZ, etiqueta: "Mostrar la duda", titulo: "Indicadores de incertidumbre",
        cuerpo: 'Señalar cuándo el modelo está en terreno de baja probabilidad combate el <b>sesgo de automatización</b>: nuestra tendencia a confiar de más en lo que dice una máquina con tono seguro.' },
      { color: RO, etiqueta: "No fingir certeza", titulo: "Lenguaje calibrado",
        cuerpo: 'Un tono “confiado” en una respuesta inventada es el diseño trabajando <b>en tu contra</b>. La interfaz debe comunicar el carácter probabilístico, no esconderlo.' }
    ]);

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Clasifica cada caso. Al responder verás por qué.",
      reactivos: [
        { p: 'Ves un “charco” en una carretera ardiente; es el cielo refractado por el aire caliente. Es una…',
          opciones: [{ t: "ilusión", ok: true }, { t: "alucinación" }, { t: "confabulación" }],
          porque: "Hay un <b>estímulo real</b> (la luz refractada) mal interpretado: eso es una <b>ilusión</b>, no una invención desde cero." },
        { p: 'Un LLM te da la referencia de un artículo con autor, revista y año… que no existe. Eso es, en rigor clínico, una…',
          opciones: [{ t: "confabulación", ok: true }, { t: "ilusión" }, { t: "alucinación sensorial" }],
          porque: "Rellena un <b>vacío de datos</b> con un relato coherente y sin intención de engañar: es una <b>confabulación</b>, el fenómeno más cercano a lo que hace un modelo." },
        { p: 'Quieres que el modelo respete hechos verificables de un documento tuyo. La arquitectura adecuada es…',
          opciones: [{ t: "RAG (recuperar y anclar)", ok: true }, { t: "subir la temperatura" }, { t: "reentrenar sin más" }],
          porque: "<b>RAG</b> inyecta los documentos reales en el contexto para anclar la generación. Subir la temperatura <i>aumenta</i> el riesgo; reentrenar no borra el mecanismo." }
      ]
    });
    cog.nota(cont, 'Cuando termines, mide lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Alucinaciones de ChatGPT: qué son y por qué ocurren", fuente: "Digital Trends en Español", url: "https://es.digitaltrends.com/computadoras/alucinaciones-chatgpt-que-son/", lang: "es" },
    { t: "¿Qué son las alucinaciones de la IA y cómo evitarlas?", fuente: "Arsys", url: "https://www.arsys.es/blog/que-son-las-alucinaciones-de-la-ia-y-como-evitarlas", lang: "es" },
    { t: "An interesting take on LLM hallucinations by Andrej Karpathy", fuente: "The Decoder", url: "https://the-decoder.com/here-is-an-interesting-take-on-llm-hallucinations-by-andrej-karpathy/", lang: "en" },
    { t: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)", fuente: "arXiv 2005.11401", url: "https://arxiv.org/abs/2005.11401", lang: "en" },
    { t: "Hallucination (artificial intelligence)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)", lang: "en" }
  ];

  var QUIZ = [
    { p: "Según Karpathy, alucinar en un LLM es…", op: ["Un bug que se corrige reentrenando", "La función principal del modelo (soñar), que el prompt dirige", "Un fallo del hardware", "Un problema solo de los modelos pequeños"], ok: 1, porque: "Para Karpathy los LLMs son <b>máquinas de sueños</b>: generar es soñar, y el <i>prompt</i> dirige el sueño. Alucinar no es la excepción, es el modo de operar." },
    { p: "¿Qué hace realmente un LLM para producir texto?", op: ["Consulta una base de datos de hechos", "Calcula el siguiente token más probable dado el contexto", "Copia frases de su entrenamiento", "Razona con lógica formal"], ok: 1, porque: "Predice el <b>siguiente token</b> con una distribución de probabilidad (Softmax) sobre correlaciones comprimidas; no recupera hechos literales." },
    { p: "El fenómeno clínico más parecido a una “alucinación” de IA es la…", op: ["Ilusión", "Alucinación sensorial", "Confabulación", "Amnesia"], ok: 2, porque: "La <b>confabulación</b> rellena vacíos con relatos coherentes sin intención de engañar: justo lo que hace el modelo ante un vacío de datos." },
    { p: "¿Para qué sirve RAG?", op: ["Para subir la creatividad del modelo", "Para anclar la generación a documentos reales recuperados", "Para entrenar el modelo más rápido", "Para eliminar por completo las alucinaciones"], ok: 1, porque: "RAG recupera fragmentos reales por similitud y los inyecta en el contexto para <b>anclar</b> la respuesta. Mitiga, pero no elimina al 100%." },
    { p: "El parámetro de <b>temperatura</b> controla…", op: ["La velocidad de inferencia", "Cuánto se aleja el modelo del token más probable", "El tamaño de la ventana de contexto", "El número de parámetros"], ok: 1, porque: "La temperatura reparte probabilidad hacia la cola: baja = conservador y determinista; alta = creativo y más propenso a falsedades fluidas." }
  ];

  E.registrar({
    id: "fund-computo-alucinaciones",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 12,
    titulo: "Alucinaciones en LLMs",
    sub: "Las “Máquinas de Sueños” de Karpathy",
    resumen: "Por qué un modelo inventa con total seguridad: la predicción del siguiente token, la diferencia entre ilusión, alucinación y confabulación, y cómo RAG y el diseño honesto mitigan el riesgo.",
    chips: [{ k: "Bloque", v: "IA moderna" }, { k: "Tipo", v: "Mecánica y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-alucinaciones", QUIZ)
    }
  });
})();
