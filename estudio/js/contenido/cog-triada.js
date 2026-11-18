/* ============================================================
   Ciencias Cognitivas — Tema 1: La Tríada de la Mente
   Cognición · Cognitivo · Cognoscitivo
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)";

  /* SVG 1 — El motor de la cognición: tubería percepción→atención→memoria→comprensión */
  var SVG_MOTOR =
    '<svg viewBox="0 0 640 170" role="img" aria-label="Flujo de la cognición">' +
    '<defs><marker id="cogArrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<text x="20" y="90" font-size="12" fill="currentColor" opacity=".7">Información</text>' +
    '<line x1="92" y1="85" x2="120" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#cogArrow)"/>' +
    // 4 estaciones
    '<g font-size="12.5" text-anchor="middle">' +
    '<g><rect class="cog-pulse" x="126" y="56" width="104" height="58" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="178" y="80" fill="var(--azul)">Percepción</text><text x="178" y="98" font-size="10" fill="currentColor" opacity=".6">recibir</text></g>' +
    '<line x1="230" y1="85" x2="254" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#cogArrow)"/>' +
    '<g><rect class="cog-pulse" style="animation-delay:.4s" x="260" y="56" width="104" height="58" rx="12" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="312" y="80" fill="var(--morado)">Atención</text><text x="312" y="98" font-size="10" fill="currentColor" opacity=".6">filtrar</text></g>' +
    '<line x1="364" y1="85" x2="388" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#cogArrow)"/>' +
    '<g><rect class="cog-pulse" style="animation-delay:.8s" x="394" y="56" width="104" height="58" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="446" y="80" fill="var(--verde)">Memoria</text><text x="446" y="98" font-size="10" fill="currentColor" opacity=".6">guardar</text></g>' +
    '<line x1="498" y1="85" x2="522" y2="85" stroke="currentColor" opacity=".5" marker-end="url(#cogArrow)"/>' +
    '<g><rect class="cog-pulse" style="animation-delay:1.2s" x="528" y="56" width="96" height="58" rx="12" fill="none" stroke="var(--ambar)" stroke-width="2"/><text x="576" y="80" fill="var(--ambar)">Compren-</text><text x="576" y="96" fill="var(--ambar)">sión</text></g>' +
    '</g>' +
    '<text x="576" y="138" font-size="11" fill="currentColor" opacity=".7" text-anchor="middle">→ Conocimiento</text>' +
    '</svg>';

  /* SVG 2 — Dos lentes sobre el mismo proceso: cognitivo (máquina) vs cognoscitivo (saber) */
  var SVG_LENTES =
    '<svg viewBox="0 0 560 220" role="img" aria-label="Cognitivo y cognoscitivo: dos miradas de la cognición">' +
    '<circle cx="280" cy="110" r="46" fill="none" stroke="currentColor" stroke-width="2" opacity=".35"/>' +
    '<text x="280" y="106" text-anchor="middle" font-size="14" fill="currentColor" opacity=".85">COGNICIÓN</text>' +
    '<text x="280" y="124" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".55">el proceso</text>' +
    // lente izquierda: cognitivo
    '<g>' +
    '<rect x="26" y="52" width="150" height="116" rx="14" fill="none" stroke="var(--azul)" stroke-width="2"/>' +
    '<text x="101" y="40" text-anchor="middle" font-size="13" fill="var(--azul)" font-weight="600">COGNITIVO</text>' +
    '<text x="101" y="86" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75">la maquinaria</text>' +
    '<g stroke="var(--azul)" stroke-width="1.6" fill="none" opacity=".8"><circle cx="78" cy="118" r="9"/><circle cx="118" cy="118" r="9"/><path d="M87 118h22"/><path d="M78 127v10M118 127v10"/></g>' +
    '<text x="101" y="158" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">¿cómo procesa?</text>' +
    '<line x1="176" y1="110" x2="232" y2="110" stroke="var(--azul)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>' +
    '</g>' +
    // lente derecha: cognoscitivo
    '<g>' +
    '<rect x="384" y="52" width="150" height="116" rx="14" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<text x="459" y="40" text-anchor="middle" font-size="13" fill="var(--verde)" font-weight="600">COGNOSCITIVO</text>' +
    '<text x="459" y="86" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75">la facultad</text>' +
    '<g stroke="var(--verde)" stroke-width="1.6" fill="none" opacity=".85"><path d="M441 128a18 18 0 1 1 36 0c0 7-5 10-5 16h-26c0-6-5-9-5-16z"/><path d="M448 150h22"/></g>' +
    '<text x="459" y="158" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">¿llega a saber?</text>' +
    '<line x1="384" y1="110" x2="328" y2="110" stroke="var(--verde)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>' +
    '</g>' +
    '</svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>La Tríada de la Mente</h2>' +
      '<p>Tres palabras que parecen la misma y no lo son: <b>cognición</b>, <b>cognitivo</b> y <b>cognoscitivo</b>. Confundirlas es normal —incluso los diccionarios titubean—, pero distinguirlas te da un bisturí conceptual: te deja nombrar con precisión <i>el proceso</i>, <i>la máquina</i> que lo ejecuta y <i>la facultad</i> de llegar a saber. Este es el vocabulario base de todo lo que viene después.</p>');

    cog.epigrafe(cont, "“La mente es lo que el cerebro hace.”", "Steven Pinker");

    cog.prosa(cont, '<h3>1 · Cognición — el proceso en marcha</h3>' +
      '<p>La <b>cognición</b> es el <b>fenómeno y el proceso</b>: todo lo que ocurre cuando tu cerebro recibe información, la asimila y la comprende. No es una cosa, es una <i>actividad</i> — el motor encendido. Y como todo motor, tiene etapas encadenadas:</p>');
    cog.figura(cont, { color: AZ, titulo: "El motor de la cognición",
      svg: SVG_MOTOR,
      pie: "La información cruza cuatro estaciones —<b>percepción</b> (recibir), <b>atención</b> (filtrar), <b>memoria</b> (guardar) y <b>comprensión</b> (integrar)— y sale convertida en conocimiento utilizable." });
    cog.nota(cont, 'Si esta tubería te suena a un <i>pipeline</i> de datos, no es casualidad. La psicología cognitiva nació en los años 50 tomando prestada la metáfora del computador: la mente como <b>procesador de información</b> (entrada → proceso → salida). Es el mismo esquema que hoy usas al pensar <code>datos crudos → features → modelo → predicción</code>.', AZ);

    cog.prosa(cont, '<h3>2 · Cognitivo vs. Cognoscitivo — la máquina y la facultad</h3>' +
      '<p>Aquí está el matiz fino. Ambos son <b>adjetivos</b> que derivan de la cognición, pero miran hacia lados distintos del mismo fenómeno:</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "La maquinaria", titulo: "Cognitivo",
        cuerpo: 'Apunta al <b>mecanismo biológico y operativo</b>: <i>cómo</i> procesa el cerebro los datos físicos. Es el lenguaje de la ciencia cognitiva y la neurociencia.<br><span class="cog-mini">Ej.: “carga <b>cognitiva</b>”, “sesgo <b>cognitivo</b>”, “procesos <b>cognitivos</b>”.</span>' },
      { color: VE, etiqueta: "La facultad", titulo: "Cognoscitivo",
        cuerpo: 'Apunta a la <b>facultad humana y su resultado</b>: la <i>capacidad de llegar a conocer</i>, aprender y construir el saber. Es el lenguaje de la filosofía y la epistemología.<br><span class="cog-mini">Ej.: “desarrollo <b>cognoscitivo</b>” (Piaget), “facultad <b>cognoscitiva</b>”.</span>' }
    ]);
    cog.figura(cont, { color: MO, titulo: "Dos lentes sobre el mismo proceso",
      svg: SVG_LENTES,
      pie: "No describen cosas distintas: describen la <b>misma</b> cognición desde dos preguntas. <b>Cognitivo</b> pregunta <i>¿cómo procesa?</i>; <b>cognoscitivo</b> pregunta <i>¿llega a saber?</i>" });

    cog.tabla(cont, {
      criterio: "¿En qué se fijan?",
      cols: [{ nombre: "Cognitivo", color: AZ }, { nombre: "Cognoscitivo", color: VE }],
      filas: [
        { k: "Foco", v: ["El mecanismo (la máquina)", "La facultad (el saber)"] },
        { k: "Pregunta", v: ["¿Cómo procesa el cerebro?", "¿Cómo llega a conocer?"] },
        { k: "Campo típico", v: ["Neurociencia, psicología, IA", "Filosofía, epistemología, pedagogía"] },
        { k: "Énfasis", v: ["El <i>proceso</i> físico", "El <i>producto</i>: el conocimiento"] },
        { k: "Ejemplo", v: ["Carga cognitiva de una interfaz", "Desarrollo cognoscitivo del niño"] }
      ]
    });
    cog.nota(cont, 'Honestidad intelectual: en el uso cotidiano —y en muchos textos— <b>cognitivo</b> y <b>cognoscitivo</b> se emplean como sinónimos, y la RAE los admite así. La distinción máquina/facultad es una convención útil para pensar con filo, no una ley rígida. Lo importante es que <i>tú</i> sepas cuál matiz estás invocando.', MO);

    cog.prosa(cont, '<h3>3 · Por qué le importa a quien trabaja con datos y tecnología</h3>' +
      '<p>Esta tríada no es trivia de lingüista. Vive en el corazón de la IA y el diseño:</p>');
    cog.acordeon(cont, [
      { q: "La “atención” que mueve a los Transformers", a: 'El mecanismo <b>attention</b> que hace funcionar a GPT y a los modelos modernos toma su nombre —y su intuición— de la <b>atención</b> cognitiva: asignar peso a lo relevante e ignorar el ruido. La estación 2 de nuestro motor, vuelta matemática.' },
      { q: "Memoria de trabajo ↔ ventana de contexto", a: 'La <b>memoria</b> de corto plazo del cerebro (limitada, se satura) es un espejo de la <b>ventana de contexto</b> de un modelo de lenguaje: un espacio finito donde cabe solo lo que estás “sosteniendo” ahora. Diseñar prompts es gestionar esa memoria.' },
      { q: "Carga cognitiva en UX", a: 'Cuando una interfaz te abruma, hablamos de exceso de <b>carga cognitiva</b> (término <i>cognitivo</i>: la máquina se satura). Reducir pasos, agrupar y dar jerarquía visual es bajar esa carga para que la <b>facultad cognoscitiva</b> —entender y decidir— quede libre.' },
      { q: "Procesar ≠ comprender", a: 'Un modelo puede <b>procesar</b> (cognitivo) sin <b>comprender</b> (cognoscitivo). El experimento mental del <i>Cuarto Chino</i> de Searle vive justo en esa grieta: manipular símbolos no es, por sí mismo, saber lo que significan. La gran pregunta abierta de la IA.' }
    ], "Conexiones con IA, datos y diseño");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Elige el término que mejor encaja. Al responder verás por qué.",
      reactivos: [
        { p: 'Un estudio mide <i>cuántos milisegundos</i> tarda el cerebro en reconocer una cara. Se investiga el…',
          opciones: [{ t: "proceso cognitivo", ok: true }, { t: "resultado cognoscitivo" }, { t: "la cognición entera" }],
          porque: "Se estudia el <b>mecanismo</b> y su tiempo: lenguaje <b>cognitivo</b> (la máquina en operación)." },
        { p: 'Piaget describe cómo un niño <i>construye</i> la noción de número con los años. Describe su desarrollo…',
          opciones: [{ t: "cognoscitivo", ok: true }, { t: "cognitivo (hardware)" }, { t: "perceptual" }],
          porque: "Habla de la <b>facultad</b> de llegar a conocer y construir saber: término <b>cognoscitivo</b>." },
        { p: '“Recibir, filtrar, guardar y comprender la información” es, en conjunto, la…',
          opciones: [{ t: "cognición", ok: true }, { t: "percepción" }, { t: "memoria" }],
          porque: "Es el <b>proceso completo</b>: la <b>cognición</b>. Percepción y memoria son solo etapas suyas." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "¿Qué es la <b>cognición</b>?", op: ["Un adjetivo sobre el cerebro", "El proceso de recibir, asimilar y comprender información", "Una parte del cerebro", "Un sinónimo de memoria"], ok: 1, porque: "La <b>cognición</b> es el <b>proceso/fenómeno</b> completo (percepción, atención, memoria, comprensión), no una parte ni un adjetivo." },
    { p: "El término <b>cognitivo</b> pone el foco en…", op: ["La facultad de llegar a saber", "El mecanismo: cómo procesa el cerebro", "La historia evolutiva", "La ética del conocimiento"], ok: 1, porque: "<b>Cognitivo</b> mira la <b>maquinaria</b> (el cómo del procesamiento): carga cognitiva, sesgos cognitivos, procesos cognitivos." },
    { p: "“Desarrollo <b>cognoscitivo</b>” se refiere sobre todo a…", op: ["El hardware neuronal", "La capacidad de llegar a conocer y construir saber", "La velocidad de reacción", "La percepción visual"], ok: 1, porque: "<b>Cognoscitivo</b> apunta a la <b>facultad</b> y su resultado: aprender y construir conocimiento (uso clásico en Piaget)." },
    { p: "¿Cuál NO es una etapa del “motor” de la cognición que vimos?", op: ["Percepción", "Atención", "Fotosíntesis", "Memoria"], ok: 2, porque: "La <b>fotosíntesis</b> es un proceso vegetal, ajeno a la cognición. Las etapas eran percepción, atención, memoria y comprensión." },
    { p: "El mecanismo <i>attention</i> de los Transformers se inspira en qué etapa cognitiva:", op: ["La percepción", "La atención (dar peso a lo relevante)", "La memoria a largo plazo", "La comprensión"], ok: 1, porque: "La <b>atención</b> —asignar peso a lo relevante e ignorar el ruido— es justo la intuición detrás del mecanismo <i>attention</i>." }
  ];

  E.registrar({
    id: "cog-triada",
    grupo: "fund-mente",
    lenguaje: "fund",
    orden: 1,
    titulo: "La Tríada de la Mente",
    sub: "Cognición · Cognitivo · Cognoscitivo",
    resumen: "Tres términos que parecen gemelos y no lo son: el proceso (cognición), la maquinaria (cognitivo) y la facultad de saber (cognoscitivo) — con su eco en la IA y el diseño.",
    chips: [{ k: "Bloque", v: "La mente" }, { k: "Tipo", v: "Conceptos y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("cog-triada", QUIZ)
    }
  });
})();
