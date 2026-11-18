/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Sistemas Operativos (Unix/Linux) y Arquitectura del Deep Learning
   Dos pilares: la infraestructura y el cómputo que corre sobre ella
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — El árbol Unix: influencia sin herencia de código */
  var SVG_UNIX =
    '<svg viewBox="0 0 620 200" role="img" aria-label="Linaje de Unix y de Linux">' +
    '<defs><marker id="uArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<g text-anchor="middle" font-size="12">' +
    '<rect x="230" y="14" width="160" height="40" rx="10" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="310" y="32" fill="var(--azul)">Unix (1969)</text><text x="310" y="47" font-size="10" fill="currentColor" opacity=".6">AT&amp;T Bell Labs</text>' +
    // rama certificada
    '<path d="M250 54q-120 20-180 60" stroke="var(--azul)" fill="none" opacity=".5" marker-end="url(#uArr)"/>' +
    '<rect x="14" y="116" width="150" height="66" rx="10" fill="none" stroke="var(--azul)" stroke-width="1.6" opacity=".85"/><text x="89" y="138" fill="var(--azul)" font-size="11.5">Unix certificados</text><text x="89" y="156" font-size="10" fill="currentColor" opacity=".65">macOS · AIX</text><text x="89" y="170" font-size="10" fill="currentColor" opacity=".65">HP-UX · Solaris</text>' +
    // rama inspiración
    '<path d="M370 54q120 20 180 60" stroke="var(--verde)" fill="none" opacity=".5" stroke-dasharray="5 4" marker-end="url(#uArr)"/>' +
    '<text x="470" y="92" font-size="10" fill="var(--verde)" opacity=".8">“tipo Unix”, sin copiar código</text>' +
    '<rect x="456" y="116" width="150" height="40" rx="10" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="531" y="134" fill="var(--verde)" font-size="11.5">Linux (1991)</text><text x="531" y="149" font-size="10" fill="currentColor" opacity=".6">Torvalds, desde cero</text>' +
    '<rect x="456" y="162" width="150" height="30" rx="8" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".4"/><text x="531" y="181" font-size="10" fill="currentColor" opacity=".7">Android · Ubuntu · Debian</text>' +
    '</g></svg>';

  /* SVG 2 — Muñecas rusas: IA ⊃ ML ⊃ NN ⊃ DL */
  var SVG_TAX =
    '<svg viewBox="0 0 440 240" role="img" aria-label="Jerarquía IA contiene ML contiene NN contiene DL">' +
    '<rect x="20" y="16" width="400" height="208" rx="16" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="34" y="36" font-size="13" fill="var(--azul)" font-weight="600">Inteligencia Artificial</text>' +
    '<rect x="52" y="52" width="336" height="156" rx="14" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="66" y="72" font-size="12.5" fill="var(--morado)" font-weight="600">Machine Learning</text>' +
    '<text x="360" y="72" font-size="10" fill="currentColor" opacity=".6" text-anchor="end">SVM · Árboles · K-Means</text>' +
    '<rect x="84" y="86" width="272" height="106" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="98" y="106" font-size="12" fill="var(--verde)" font-weight="600">Redes Neuronales</text>' +
    '<rect class="cog-pulse" x="116" y="118" width="208" height="60" rx="10" fill="none" stroke="var(--ambar)" stroke-width="2"/><text x="220" y="146" text-anchor="middle" font-size="12" fill="var(--ambar)" font-weight="600">Deep Learning</text><text x="220" y="164" text-anchor="middle" font-size="9.5" fill="currentColor" opacity=".6">muchas capas ocultas</text>' +
    '</svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Sistemas Operativos y Deep Learning</h2>' +
      '<p>Dos pilares de la computación moderna que casi nunca se cuentan juntos, y deberían: el <b>sistema operativo</b> —la capa que gobierna el hardware— y el <b>aprendizaje profundo</b> —el cómputo que hoy define a la IA—. No son temas vecinos por azar: casi todo modelo masivo del mundo se entrena y se sirve sobre <b>Linux</b>. La infraestructura y la inteligencia que corre sobre ella son dos caras de la misma historia.</p>');

    cog.prosa(cont, '<h3>1 · Unix y Linux: influencia sin herencia</h3>' +
      '<p>El <b>kernel</b> (núcleo) es el programa que media entre tus aplicaciones y el hardware: reparte la memoria, agenda la CPU, gestiona los archivos. <b>Unix</b> nació en 1969 en los Laboratorios Bell de AT&amp;T y fijó un paradigma que todavía usamos: comandos componibles y un <b>sistema de archivos jerárquico</b> (carpetas dentro de carpetas). En 1991, Linus Torvalds escribió <b>Linux</b> desde cero —sin reutilizar una sola línea de Unix— como alternativa libre y gratuita.</p>');
    cog.figura(cont, { color: AZ, titulo: "Un paradigma, dos linajes",
      svg: SVG_UNIX,
      pie: "Rama izquierda: sistemas <b>Unix certificados</b> (macOS, AIX, HP-UX, Solaris). Rama derecha: sistemas <b>“tipo Unix”</b> basados en Linux (Android, Ubuntu, Debian, Red Hat). Linux no heredó el código de Unix: heredó sus <b>ideas</b>." });
    cog.acordeon(cont, [
      { q: "¿Por qué macOS es Unix “certificado” y Linux solo “tipo Unix”?", a: 'Porque Unix es hoy un <b>estándar</b> (POSIX / Single UNIX Specification), no un producto único. macOS <b>pagó y pasó</b> la certificación formal del estándar, así que puede llamarse “UNIX”. Linux implementa el mismo estándar POSIX de forma independiente y compatible, pero no se somete a esa certificación comercial: por eso es <b>Unix-like</b> (“tipo Unix”), funcionalmente hermano pero legalmente no idéntico.' },
      { q: "Propietario vs. código abierto", a: 'El software <b>propietario</b> (código cerrado, licencia comercial) esconde su fuente: lo usas, no lo lees ni lo modificas. El <b>código abierto</b> (Open Source) publica su fuente para inspeccionarla, cambiarla y redistribuirla. Linux es el emblema del segundo modelo, y por eso domina servidores, supercomputadoras e infraestructura crítica: cualquiera puede auditarlo y adaptarlo.' }
    ], "Profundiza: kernel y certificación");

    cog.prosa(cont, '<h3>2 · La taxonomía: IA ⊃ ML ⊃ NN ⊃ DL</h3>' +
      '<p>“IA”, “machine learning” y “deep learning” no son sinónimos: son <b>muñecas rusas</b>. Cada una vive dentro de la anterior.</p>');
    cog.figura(cont, { color: AM, titulo: "Cuatro cajas, una dentro de otra",
      svg: SVG_TAX,
      pie: "Todo <b>Deep Learning</b> usa redes neuronales, pero no toda red neuronal es profunda (hace falta <b>muchas capas ocultas</b>). Y no todo <b>Machine Learning</b> usa redes: los algoritmos clásicos —SVM, Árboles de Decisión, K-Means— viven en ML sin ser neuronales." });
    cog.tabla(cont, {
      criterio: "¿Cómo obtienen las características?",
      cols: [{ nombre: "ML clásico", color: MO }, { nombre: "Deep Learning", color: AM }],
      filas: [
        { k: "Features", v: ["Las diseña <b>un humano</b> (manual)", "La red las <b>aprende sola</b> (automática)"] },
        { k: "Datos crudos", v: ["Requiere preprocesamiento fuerte", "Aprende de píxeles/texto en bruto"] },
        { k: "Ejemplos", v: ["SVM, Árboles, K-Means", "CNN, Transformers"] },
        { k: "Profundidad", v: ["Pocas capas o ninguna", "Decenas o cientos de capas"] },
        { k: "Dato necesario", v: ["Funciona con menos datos", "Hambriento de datos y cómputo"] }
      ]
    });

    cog.prosa(cont, '<h3>3 · El cuello de botella que frenó todo (y cómo se rompió)</h3>' +
      '<p>El Perceptrón de Rosenblatt (años 50–60) era una red superficial de una o dos capas. Apilar más capas prometía más poder… pero chocaba con un muro matemático.</p>');
    cog.grid(cont, [
      { color: RO, etiqueta: "El muro", titulo: "Desvanecimiento del gradiente",
        cuerpo: 'Al entrenar, el “error” debe viajar hacia atrás por la red para corregir cada peso. En redes muy profundas, esa señal se <b>encoge</b> capa tras capa hasta casi desaparecer: las primeras capas apenas aprenden. Durante décadas eso hizo inviables las redes profundas.' },
      { color: VE, etiqueta: "La llave", titulo: "Retropropagación (1986)",
        cuerpo: 'Rumelhart, <b>Hinton</b> y Williams popularizaron el <i>backpropagation</i>: calcular, con la regla de la cadena, cuánto culpa cada peso del error y ajustarlo en consecuencia. Es el método que hace que una red <b>aprenda de sus errores</b>.' },
      { color: AZ, etiqueta: "El acelerador", titulo: "GPUs (década de 2010)",
        cuerpo: 'Entrenar es, sobre todo, <b>multiplicar matrices</b>. Las GPUs hacen miles de esas operaciones <b>en paralelo</b> (nacieron para pintar píxeles). Eso volvió viable entrenar redes de cientos de capas: así se consolidó el término <b>Deep Learning</b>.' }
    ]);
    cog.nota(cont, 'Fíjate en el arco: un obstáculo <b>matemático</b> (gradiente que se desvanece) se resolvió con un algoritmo (retropropagación) y se destrabó con <b>hardware</b> (GPUs) corriendo sobre <b>Linux</b>. Infraestructura e inteligencia, otra vez, de la mano.', AZ);

    cog.acordeon(cont, [
      { q: "¿Por qué una GPU y no una CPU?", a: 'Una CPU tiene pocos núcleos muy potentes, ideales para tareas secuenciales. Una GPU tiene <b>miles</b> de núcleos más simples, ideales para hacer la <b>misma</b> operación sobre muchos datos a la vez —exactamente el cálculo matricial del entrenamiento—. Para redes profundas, el paralelismo masivo gana por goleada.' },
      { q: "Del Perceptrón a los Transformers", a: 'El <b>Perceptrón</b> solo separaba datos linealmente (una raya recta). Las <b>CNN</b> añadieron visión jerárquica (bordes → formas → objetos). Los <b>Transformers</b> añadieron <i>atención</i>: pesar qué partes del contexto importan. Cada arquitectura amplió lo que una red podía representar.' }
    ], "Profundiza: hardware y arquitecturas");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Elige la opción correcta y revisa el porqué.",
      reactivos: [
        { p: 'Usas K-Means para agrupar clientes. ¿Dónde cae ese algoritmo?',
          opciones: [{ t: "ML clásico, no es deep learning", ok: true }, { t: "Deep learning" }, { t: "No es IA" }],
          porque: "K-Means es <b>Machine Learning clásico</b>: no usa redes neuronales ni capas ocultas. Es ML sin ser DL." },
        { p: 'macOS puede llamarse legalmente “UNIX” y Linux no, porque…',
          opciones: [{ t: "macOS pasó la certificación POSIX; Linux es compatible pero no certificado", ok: true }, { t: "Linux no es un sistema operativo real" }, { t: "macOS usa el código original de Unix de 1969" }],
          porque: "Unix es un <b>estándar certificable</b>. macOS se certificó; Linux implementa POSIX de forma independiente sin esa certificación: por eso es <b>Unix-like</b>." },
        { p: 'Las redes profundas estuvieron bloqueadas durante décadas sobre todo por…',
          opciones: [{ t: "el desvanecimiento del gradiente", ok: true }, { t: "falta de lenguajes de programación" }, { t: "la ausencia de internet" }],
          porque: "El <b>gradiente que se desvanece</b> impedía que las primeras capas aprendieran. Retropropagación + GPUs rompieron el muro." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "¿Qué relación hay entre Unix y Linux?", op: ["Linux es una versión de Unix con su mismo código", "Linux copió el paradigma de Unix pero se escribió desde cero", "Son el mismo sistema con otro nombre", "Unix se basó en Linux"], ok: 1, porque: "Torvalds escribió Linux en 1991 <b>desde cero</b>, sin reutilizar código de Unix; heredó sus ideas (comandos, jerarquía de archivos), no su fuente." },
    { p: "macOS es “Unix certificado” y Linux es “tipo Unix” porque…", op: ["macOS es más antiguo", "macOS pasó la certificación del estándar; Linux lo implementa sin certificar", "Linux no cumple ningún estándar", "macOS no usa kernel"], ok: 1, porque: "Unix es un <b>estándar (POSIX)</b>. macOS se certificó formalmente; Linux es compatible pero no certificado, por eso es <i>Unix-like</i>." },
    { p: "¿Cuál afirmación sobre la jerarquía IA/ML/NN/DL es correcta?", op: ["Todo ML usa redes neuronales", "Todo deep learning usa redes neuronales, pero no todo ML las usa", "Deep learning y machine learning son lo mismo", "Las redes neuronales no son parte del ML"], ok: 1, porque: "DL ⊂ NN ⊂ ML ⊂ IA. Todo DL es red neuronal profunda, pero existe ML sin redes (SVM, K-Means, Árboles)." },
    { p: "El “desvanecimiento del gradiente” es…", op: ["Un virus informático", "La señal de error que se encoge al retropropagarse en redes profundas", "Una técnica de compresión", "Un tipo de GPU"], ok: 1, porque: "Es el muro matemático: el gradiente se achica capa a capa y las primeras capas casi no aprenden. Frenó el deep learning por décadas." },
    { p: "¿Por qué las GPUs fueron clave para el deep learning?", op: ["Tienen más memoria que cualquier CPU", "Hacen cálculo matricial masivo en paralelo", "Fueron diseñadas para entrenar redes", "Consumen menos energía siempre"], ok: 1, porque: "Entrenar es multiplicar matrices; las GPUs hacen miles de esas operaciones <b>en paralelo</b>, lo que volvió viable entrenar redes de cientos de capas." }
  ];

  E.registrar({
    id: "fund-computo-so-y-deeplearning",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 9,
    titulo: "Sistemas Operativos y Deep Learning",
    sub: "La infraestructura y el cómputo que corre sobre ella",
    resumen: "Unix vs. Linux (kernel, POSIX, abierto vs. propietario) y la arquitectura del aprendizaje profundo: la jerarquía IA/ML/NN/DL, el desvanecimiento del gradiente, la retropropagación y el papel de las GPUs.",
    chips: [{ k: "Bloque", v: "Infraestructura e IA" }, { k: "Tipo", v: "Conceptos y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-so-y-deeplearning", QUIZ)
    }
  });
})();
