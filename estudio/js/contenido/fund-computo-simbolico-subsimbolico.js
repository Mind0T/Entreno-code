/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   IA Simbólica (GOFAI) vs. Subsimbólica (Conexionismo)
   Reglas vs. experiencia · Caja negra · Neuro-simbólico · XAI
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Top-down vs bottom-up */
  var SVG_FLUJO =
    '<svg viewBox="0 0 600 190" role="img" aria-label="Top-down simbólico contra bottom-up conexionista">' +
    '<defs><marker id="sArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".55"/></marker></defs>' +
    '<g text-anchor="middle" font-size="11">' +
    // simbólico top-down
    '<text x="150" y="20" fill="var(--azul)" font-size="12.5" font-weight="600">SIMBÓLICO · top-down</text>' +
    '<rect x="70" y="30" width="160" height="26" rx="7" fill="none" stroke="var(--azul)" stroke-width="1.8"/><text x="150" y="47" fill="var(--azul)">Humano escribe reglas</text>' +
    '<path d="M150 56v16" stroke="var(--azul)" opacity=".6" marker-end="url(#sArr)"/>' +
    '<rect x="70" y="74" width="160" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><text x="150" y="91" fill="currentColor" opacity=".8">SI… ENTONCES…</text>' +
    '<path d="M150 100v16" stroke="var(--azul)" opacity=".6" marker-end="url(#sArr)"/>' +
    '<rect x="70" y="118" width="160" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><text x="150" y="135" fill="currentColor" opacity=".8">Decisión trazable</text>' +
    '<text x="150" y="166" fill="var(--verde)" font-size="10">transparente, pero rígido</text>' +
    // conexionista bottom-up
    '<text x="450" y="20" fill="var(--morado)" font-size="12.5" font-weight="600">SUBSIMBÓLICO · bottom-up</text>' +
    '<rect x="370" y="30" width="160" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><text x="450" y="47" fill="currentColor" opacity=".8">Datos crudos (píxeles)</text>' +
    '<path d="M450 56v16" stroke="var(--morado)" opacity=".6" marker-end="url(#sArr)"/>' +
    '<rect class="cog-pulse" x="370" y="74" width="160" height="26" rx="7" fill="none" stroke="var(--morado)" stroke-width="1.8"/><text x="450" y="91" fill="var(--morado)">Red ajusta pesos</text>' +
    '<path d="M450 100v16" stroke="var(--morado)" opacity=".6" marker-end="url(#sArr)"/>' +
    '<rect x="370" y="118" width="160" height="26" rx="7" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><text x="450" y="135" fill="currentColor" opacity=".8">Patrón emergente</text>' +
    '<text x="450" y="166" fill="var(--rojo)" font-size="10">robusto, pero “caja negra”</text>' +
    '</g></svg>';

  /* SVG 2 — Backpropagation: el error viaja hacia atrás */
  var SVG_BACKPROP =
    '<svg viewBox="0 0 560 170" role="img" aria-label="La retropropagación envía el error de vuelta para ajustar pesos">' +
    '<defs><marker id="pF" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="var(--verde)" opacity=".8"/></marker>' +
    '<marker id="pB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="var(--rojo)" opacity=".8"/></marker></defs>' +
    '<g stroke-width="1.6" fill="none">' +
    '<circle cx="70" cy="60" r="12" stroke="currentColor" opacity=".6"/><circle cx="70" cy="110" r="12" stroke="currentColor" opacity=".6"/>' +
    '<circle cx="240" cy="50" r="12" stroke="var(--azul)"/><circle cx="240" cy="90" r="12" stroke="var(--azul)"/><circle cx="240" cy="130" r="12" stroke="var(--azul)"/>' +
    '<circle cx="410" cy="85" r="12" stroke="var(--morado)"/>' +
    '<g stroke="currentColor" opacity=".3"><path d="M82 60l146-8M82 60l146 32M82 60l146 68M82 110l146-56M82 110l146-16M82 110l146 20M252 50l146 30M252 90l146-3M252 130l146-40"/></g>' +
    '</g>' +
    '<path d="M70 150q170 0 340 0" stroke="var(--verde)" stroke-width="1.6" fill="none" marker-end="url(#pF)" opacity=".7"/><text x="200" y="166" fill="var(--verde)" font-size="10.5">① predicción hacia adelante</text>' +
    '<path d="M410 20q-170 0-340 0" stroke="var(--rojo)" stroke-width="1.6" fill="none" marker-end="url(#pB)" opacity=".7" stroke-dasharray="5 4"/><text x="300" y="14" fill="var(--rojo)" font-size="10.5">② el error vuelve y corrige pesos</text>' +
    '<text x="70" y="40" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">entrada</text>' +
    '<text x="410" y="62" text-anchor="middle" font-size="10" fill="var(--morado)" opacity=".8">salida</text>' +
    '</svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Simbólico vs. Subsimbólico</h2>' +
      '<p>Toda la IA se reduce, en el fondo, a una pregunta pedagógica: ¿cómo le enseñas a una máquina? Hay dos respuestas históricas y rivales. La <b>simbólica</b> dice: <i>escríbele las reglas</i>. La <b>subsimbólica</b> (conexionista) dice: <i>muéstrale ejemplos y deja que aprenda</i>. Reglas contra experiencia. De esa tensión nació todo lo demás —incluidos los LLMs y el reto de explicarlos—.</p>');

    cog.epigrafe(cont, "“La pregunta no es si las máquinas piensan, sino si los humanos lo hacen.”", "B. F. Skinner");

    cog.prosa(cont, '<h3>1 · IA Simbólica (GOFAI): el camino de las reglas</h3>' +
      '<p><b>GOFAI</b> (<i>Good Old-Fashioned AI</i>) dominó de los años 50 a los 80, impulsada por <b>John McCarthy</b>. Su apuesta: la inteligencia es <b>manipular símbolos</b> con lógica. Un símbolo es una etiqueta (<code>Perro</code>, <code>Fiebre</code>) y un motor lógico la procesa con reglas explícitas <code>SI… ENTONCES…</code>. Es <i>top-down</i>: el humano programa el conocimiento.</p>');
    cog.nota(cont, 'Sistema experto médico: <code>SI [Temp > 38°C] Y [Tos] ENTONCES [Posible infección]</code>. Ventaja enorme: <b>transparencia total</b> —puedes trazar exactamente por qué decidió—. Desventaja fatal: <b>fragilidad</b> —con 37.9°C falla, y si falta una regla, se rompe—. El mundo real tiene demasiados casos borde para escribirlos todos.', AZ);

    cog.prosa(cont, '<h3>2 · IA Subsimbólica (Conexionismo): el camino de los datos</h3>' +
      '<p>Surgió al chocar con tareas imposibles de reglar: reconocer un rostro, entender el sarcasmo. La arquitectura son <b>redes neuronales</b>: nodos en capas, inspirados en neuronas. No hay reglas en el código; el conocimiento vive <b>distribuido en pesos</b> (números). Es <i>bottom-up</i>: la red aprende patrones de datos en bruto.</p>');
    cog.figura(cont, { color: MO, titulo: "Dos direcciones opuestas",
      svg: SVG_FLUJO,
      pie: "El <b>simbólico</b> baja del humano a la decisión (reglas → resultado trazable). El <b>subsimbólico</b> sube de los datos al patrón (píxeles → pesos → patrón emergente). Uno es transparente y rígido; el otro, robusto y opaco." });
    cog.prosa(cont, '<p>¿Cómo aprende una red? Con <b>retropropagación</b>: tras cada error, la señal viaja <b>hacia atrás</b> ajustando minúsculamente cada peso, miles de veces, hasta converger.</p>');
    cog.figura(cont, { color: VE, titulo: "El error que corrige la red",
      svg: SVG_BACKPROP,
      pie: "① La entrada fluye <b>hacia adelante</b> y produce una predicción. ② Se mide el error y este viaja <b>hacia atrás</b> (<i>backpropagation</i>), repartiendo la culpa entre los pesos según cuánto contribuyeron. Cada neurona se activa solo si supera un <b>umbral</b> (su función de activación). Repetido millones de veces, el patrón emerge." });
    cog.nota(cont, 'El precio de esa potencia es la <b>“Caja Negra”</b>: una red puede diagnosticar cáncer en una radiografía con enorme precisión y ser <b>incapaz de explicar por qué</b>. Alta robustez ante el ruido, explicabilidad casi nula.', RO);

    cog.prosa(cont, '<h3>3 · El trade-off, en una tabla</h3>');
    cog.tabla(cont, {
      criterio: "Criterio",
      cols: [{ nombre: "Simbólico (GOFAI)", color: AZ }, { nombre: "Subsimbólico (Conexionista)", color: MO }],
      filas: [
        { k: "Cómo aprende", v: ["Humano escribe reglas", "La red aprende de datos"] },
        { k: "Dirección", v: ["Top-down", "Bottom-up"] },
        { k: "Conocimiento", v: ["Símbolos y reglas explícitas", "Pesos numéricos distribuidos"] },
        { k: "Transparencia", v: ["Total (trazable)", "Baja (caja negra)"] },
        { k: "Flexibilidad", v: ["Rígido, frágil", "Robusto al ruido"] },
        { k: "Brilla en", v: ["Lógica, planificación, expertos", "Visión, voz, lenguaje (LLMs)"] }
      ]
    });

    cog.prosa(cont, '<h3>4 · Puentes modernos</h3>' +
      '<p>El debate no se cerró: se sintetizó. Y dejó un reto de diseño.</p>');
    cog.grid(cont, [
      { color: AM, etiqueta: "La paradoja", titulo: "LLMs: ¿símbolos o pesos?",
        cuerpo: 'Un LLM es por dentro <b>subsimbólico</b> (pesos y vectores), pero opera sobre entradas y salidas que <i>parecen</i> símbolos: palabras y <i>tokens</i>. Procesa símbolos sin manipularlos simbólicamente. Esa tensión es el centro de la IA actual.' },
      { color: VE, etiqueta: "La síntesis", titulo: "IA Neuro-simbólica",
        cuerpo: 'Lo mejor de ambos mundos: redes neuronales que <b>perciben</b> patrones + motores lógicos o <b>grafos de conocimiento</b> que <b>razonan</b> de forma explicable. La frontera activa de la investigación.' },
      { color: RO, etiqueta: "El reto de diseño", titulo: "XAI (IA Explicable)",
        cuerpo: 'Abrir la caja negra es ingeniería <b>y</b> diseño de interacción (Esfera 3): ¿cómo le comunicas a un médico <i>por qué</i> el modelo marcó esa radiografía, para que confíe sin obedecer ciegamente?' }
    ]);

    cog.acordeon(cont, [
      { q: "El problema del anclaje del símbolo (Symbol Grounding)", a: 'Searle lo ilustró con la <b>Habitación China</b>: alguien que sigue reglas para manipular símbolos chinos puede producir respuestas perfectas <b>sin entender una palabra</b>. Ese es el fantasma de la GOFAI (y de los LLMs): el ordenador no sabe qué es un “perro”, solo mueve el símbolo <code>Perro</code>. Conecta con la Hipótesis del Sistema de Símbolos Físicos de Newell y Simon.' },
      { q: "Backpropagation y umbral, paso a paso", a: '1) La red predice. 2) Se compara con la respuesta correcta → <b>error</b>. 3) Con la regla de la cadena, se calcula cuánto culpa cada peso del error. 4) Cada peso se ajusta en la dirección que reduce el error (gradiente descendente). La <b>función de activación</b> (el umbral) decide si una neurona “se enciende”, dando a la red su no-linealidad.' },
      { q: "¿Cómo luce una arquitectura neuro-simbólica?", a: 'Ejemplo: una red neuronal mira una imagen y extrae conceptos (“hay un cubo rojo a la izquierda”); un motor simbólico toma esos conceptos y <b>razona</b> con reglas lógicas para responder una pregunta compleja. La red aporta percepción; la lógica aporta razonamiento trazable.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "¿Simbólico o subsimbólico? Elige y revisa el porqué.",
      reactivos: [
        { p: 'Un sistema médico decide con reglas <code>SI síntoma ENTONCES diagnóstico</code> y puedes trazar cada paso. Es…',
          opciones: [{ t: "simbólico (GOFAI)", ok: true }, { t: "subsimbólico" }, { t: "neuro-simbólico" }],
          porque: "Reglas explícitas y decisión trazable = IA <b>simbólica</b>. Su virtud es la transparencia; su defecto, la rigidez." },
        { p: 'Una red entrenada con 200 000 fotos clasifica perros y gatos sin reglas, pero no sabe explicar por qué. Es…',
          opciones: [{ t: "subsimbólico (conexionista)", ok: true }, { t: "simbólico" }, { t: "un sistema experto" }],
          porque: "Aprende de datos, guarda el conocimiento en <b>pesos</b> y sufre la <b>caja negra</b>: IA <b>subsimbólica</b>." },
        { p: 'La Habitación China de Searle cuestiona si manipular símbolos equivale a…',
          opciones: [{ t: "comprender de verdad", ok: true }, { t: "calcular rápido" }, { t: "entrenar una red" }],
          porque: "Searle muestra que seguir reglas sobre símbolos puede producir salidas correctas <b>sin comprensión</b>: el problema del anclaje del símbolo." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Conexionismo", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Conexionismo", lang: "es" },
    { t: "Habitación china", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Habitación_china", lang: "es" },
    { t: "The Chinese Room Argument", fuente: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/chinese-room/", lang: "en" },
    { t: "Symbol grounding problem", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Symbol_grounding_problem", lang: "en" },
    { t: "Neuro-symbolic AI", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Neuro-symbolic_AI", lang: "en" }
  ];

  var QUIZ = [
    { p: "La IA simbólica (GOFAI) basa la inteligencia en…", op: ["Aprender de datos en bruto", "Manipular símbolos con reglas lógicas explícitas", "Ajustar pesos numéricos", "Imitar emociones"], ok: 1, porque: "GOFAI es <i>top-down</i>: el humano programa reglas <code>SI… ENTONCES…</code> sobre símbolos. Transparente pero rígida." },
    { p: "¿Cuál es la gran debilidad del enfoque subsimbólico (conexionista)?", op: ["Es demasiado rígido", "Es una “caja negra”: poca explicabilidad", "No puede aprender de datos", "Solo funciona con reglas"], ok: 1, porque: "Gana en robustez al ruido, pero el conocimiento vive distribuido en pesos: cuesta explicar <b>por qué</b> decidió algo." },
    { p: "La retropropagación (backpropagation) sirve para…", op: ["Escribir reglas automáticamente", "Enviar el error hacia atrás y ajustar los pesos de la red", "Comprimir la red", "Traducir símbolos a lógica"], ok: 1, porque: "Mide el error en la salida y lo propaga hacia atrás, repartiendo la corrección entre los pesos según su contribución." },
    { p: "La paradoja de los LLMs es que…", op: ["Son simbólicos por dentro y subsimbólicos por fuera", "Son subsimbólicos por dentro (pesos) pero operan sobre símbolos (palabras/tokens)", "No usan redes neuronales", "Solo razonan con lógica"], ok: 1, porque: "Internamente son pesos y vectores (subsimbólicos), pero sus entradas/salidas son tokens que parecen símbolos." },
    { p: "La IA neuro-simbólica busca…", op: ["Eliminar las redes neuronales", "Combinar percepción conexionista con razonamiento lógico explicable", "Volver a los sistemas expertos puros", "Entrenar sin datos"], ok: 1, porque: "Une lo mejor de ambos: redes que perciben + lógica/grafos que razonan de forma trazable (clave para la explicabilidad)." }
  ];

  E.registrar({
    id: "fund-computo-simbolico-subsimbolico",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 10,
    titulo: "Simbólico vs. Subsimbólico",
    sub: "Reglas contra experiencia: los dos paradigmas de la IA",
    resumen: "GOFAI (reglas lógicas, top-down, transparente pero frágil) frente al conexionismo (redes que aprenden, bottom-up, robusto pero caja negra); backpropagation, el Symbol Grounding Problem, la paradoja de los LLMs, la IA neuro-simbólica y XAI.",
    chips: [{ k: "Bloque", v: "Paradigmas de IA" }, { k: "Tipo", v: "Conceptos y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-simbolico-subsimbolico", QUIZ)
    }
  });
})();
