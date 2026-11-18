/* ============================================================
   Ciencias Cognitivas — Tema 4: Operaciones Mentales y Diseño
   Síntesis · Abstracción · Affordance · Écfrasis
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)";

  /* SVG 1 — Análisis (romper) vs Síntesis (construir algo nuevo) */
  var SVG_ANA_SIN =
    '<svg viewBox="0 0 600 180" role="img" aria-label="Análisis descompone; síntesis combina en un todo nuevo">' +
    '<defs><marker id="opA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".5"/></marker></defs>' +
    // todo inicial
    '<circle cx="78" cy="90" r="34" fill="none" stroke="var(--azul)" stroke-width="2"/>' +
    '<text x="78" y="94" text-anchor="middle" font-size="11" fill="var(--azul)">un todo</text>' +
    '<text x="78" y="150" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".6">problema</text>' +
    // análisis -> partes
    '<path d="M120 82h46" stroke="currentColor" opacity=".5" stroke-width="1.6" marker-end="url(#opA)"/>' +
    '<text x="143" y="72" text-anchor="middle" font-size="11" fill="currentColor" opacity=".8">análisis</text>' +
    '<g stroke="var(--morado)" stroke-width="1.8" fill="none">' +
    '<circle cx="196" cy="54" r="13"/><rect x="184" y="84" width="26" height="26" rx="4"/><path d="M196 122l13 24h-26z"/></g>' +
    '<text x="196" y="162" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".6">partes</text>' +
    // sintesis -> todo NUEVO
    '<path d="M228 90h58" stroke="currentColor" opacity=".5" stroke-width="1.6" marker-end="url(#opA)"/>' +
    '<text x="257" y="80" text-anchor="middle" font-size="11" fill="var(--verde)" font-weight="600">síntesis</text>' +
    '<path d="M360 90m-40 0a40 40 0 1 0 80 0a40 40 0 1 0 -80 0" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<g stroke="var(--verde)" stroke-width="1.5" fill="none" opacity=".9"><circle cx="348" cy="84" r="7"/><rect x="360" y="80" width="14" height="14" rx="3"/><path d="M360 104l6 10h-12z"/></g>' +
    '<text x="360" y="150" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".6">todo NUEVO</text>' +
    // nota resumen
    '<text x="505" y="86" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75">Síntesis ≠ resumen:</text>' +
    '<text x="505" y="104" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".6">no acorta, <tspan fill="var(--verde)">crea</tspan></text>' +
    '</svg>';

  /* SVG 2 — Escalera de abstracción: de lo concreto a lo general */
  var SVG_ABST =
    '<svg viewBox="0 0 440 210" role="img" aria-label="Escalera de abstracción de lo concreto a lo abstracto">' +
    '<text x="330" y="24" text-anchor="middle" font-size="11.5" fill="var(--azul)">ABSTRACCIÓN</text>' +
    '<text x="330" y="40" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">menos detalle →</text>' +
    '<path d="M60 190V26" stroke="currentColor" opacity=".3" stroke-width="1.4" marker-end="url(#abA)"/>' +
    '<defs><marker id="abA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".5"/></marker></defs>' +
    // nivel concreto (3 perros distintos)
    '<g stroke="var(--morado)" stroke-width="1.6" fill="none">' +
    '<path d="M96 176c0-8 6-10 10-10s10 2 10 10"/><circle cx="106" cy="160" r="6"/>' +
    '<path d="M150 176c0-10 7-12 12-12s12 2 12 12"/><circle cx="162" cy="158" r="7"/>' +
    '<path d="M214 176c0-7 5-9 9-9s9 2 9 9"/><circle cx="223" cy="162" r="5"/></g>' +
    '<text x="300" y="172" font-size="10.5" fill="currentColor" opacity=".7">Fido, Luna, Rex (concreto)</text>' +
    // nivel medio
    '<rect x="120" y="106" width="150" height="30" rx="8" fill="none" stroke="var(--azul)" stroke-width="1.8"/>' +
    '<text x="195" y="126" text-anchor="middle" font-size="12" fill="var(--azul)">“perros”</text>' +
    '<text x="330" y="126" font-size="10.5" fill="currentColor" opacity=".6">una clase</text>' +
    // nivel abstracto
    '<rect x="140" y="46" width="110" height="30" rx="8" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<text x="195" y="66" text-anchor="middle" font-size="12.5" fill="var(--verde)" font-weight="600">ANIMAL</text>' +
    '<text x="330" y="66" font-size="10.5" fill="currentColor" opacity=".6">concepto puro</text>' +
    '</svg>';

  /* SVG 3 — Affordance: la forma sugiere el uso */
  var SVG_AFFORD =
    '<svg viewBox="0 0 520 150" role="img" aria-label="Affordance: la forma sugiere cómo usar un objeto">' +
    // boton que invita a presionar
    '<g>' +
    '<rect x="40" y="52" width="120" height="46" rx="12" fill="var(--azul)" opacity=".16"/>' +
    '<rect x="40" y="48" width="120" height="46" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/>' +
    '<text x="100" y="76" text-anchor="middle" font-size="13" fill="var(--azul)">Presióname</text>' +
    '<g class="cog-pulse" stroke="var(--azul)" stroke-width="1.6" fill="none"><path d="M100 110v16"/><path d="M92 120l8 8 8-8"/></g>' +
    '<text x="100" y="146" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">el relieve invita a pulsar</text>' +
    '</g>' +
    // manija: empujar/jalar
    '<g transform="translate(300 0)">' +
    '<rect x="20" y="30" width="90" height="100" rx="6" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<rect x="92" y="66" width="10" height="30" rx="5" fill="var(--verde)"/>' +
    '<text x="150" y="78" font-size="11" fill="currentColor" opacity=".75">una manija dice</text>' +
    '<text x="150" y="96" font-size="11" fill="var(--verde)">“jala aquí”</text>' +
    '</g>' +
    '</svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Operaciones Mentales y Diseño de Interacción</h2>' +
      '<p>Cuatro herramientas de la mente que usas sin nombrarlas y que son el puente entre pensar, diseñar y comunicar: <b>síntesis</b>, <b>abstracción</b>, <b>affordance</b> y <b>écfrasis</b>. Las dos primeras son operaciones del pensamiento; la tercera, un principio de diseño; la cuarta, una figura del lenguaje. Juntas explican cómo convertimos el mundo en ideas y las ideas en experiencia.</p>');

    cog.prosa(cont, '<h3>1 · Síntesis — reunir para crear algo nuevo</h3>' +
      '<p>La <b>síntesis</b> es reunir, integrar y combinar elementos o ideas separadas para formar un <b>todo unificado y nuevo</b>. Su gemelo opuesto es el <b>análisis</b>, que <i>descompone</i> un todo en sus partes. Y ojo: síntesis <b>no es resumen</b>. Un resumen acorta lo que ya existe; una síntesis <i>construye</i> algo que antes no estaba.</p>');
    cog.figura(cont, { color: VE, titulo: "Analizar es romper; sintetizar es construir",
      svg: SVG_ANA_SIN,
      pie: "El <b>análisis</b> parte el todo en piezas para entenderlo. La <b>síntesis</b> toma piezas —a veces de orígenes distintos— y crea un todo <i>nuevo</i>. No es lo mismo que resumir." });
    cog.nota(cont, 'En ciencia de datos haces las dos todo el tiempo: <b>analizas</b> al descomponer un dataset en variables, distribuciones y correlaciones; <b>sintetizas</b> al integrar esos hallazgos en un modelo o una conclusión que no estaba en ningún dato suelto.', VE);

    cog.prosa(cont, '<h3>2 · Abstracción — aislar la idea, soltar el detalle</h3>' +
      '<p>La <b>abstracción</b> es la operación de <b>aislar una característica o idea</b> ignorando los detalles particulares. Es pasar de “Fido, Luna y Rex” al concepto puro de <b>perro</b>, y de ahí a <b>animal</b>. Cuanto más subes, menos detalle y más generalidad. Su opuesto es lo <b>concreto</b>.</p>');
    cog.figura(cont, { color: AZ, titulo: "La escalera de la abstracción",
      svg: SVG_ABST,
      pie: "Subes soltando detalles: de individuos concretos (Fido, Luna, Rex) a una clase (“perros”) y a un concepto general (animal). Abstraer es elegir qué ignorar." });
    cog.nota(cont, 'La abstracción es <i>el</i> superpoder de la computación. Una función, una clase, una API: todas esconden el detalle y te dan solo lo esencial. Y el <i>deep learning</i> abstrae por capas — de píxeles a bordes, de bordes a formas, de formas a “gato”.', AZ);

    cog.prosa(cont, '<h3>3 · Affordance — cuando la forma dice cómo se usa</h3>' +
      '<p>Un <b>affordance</b> es la cualidad de un objeto o interfaz que <b>sugiere intuitivamente cómo usarlo</b>. Un botón con relieve invita a pulsarlo; una manija, a jalarla; un campo de texto parpadeante, a escribir. Es el <b>puente entre el diseño y la cognición</b>: buen diseño es el que no necesita instrucciones porque la forma ya las da.</p>');
    cog.figura(cont, { color: AZ, titulo: "La forma es la instrucción",
      svg: SVG_AFFORD,
      pie: "El relieve de un botón y la posición de una manija comunican su uso sin una sola palabra. Donald Norman popularizó la idea en el diseño de interacción." });
    cog.nota(cont, 'En UX se distingue el <b>affordance</b> (lo que el objeto permite hacer) del <b>significante</b> (la pista visible que lo anuncia). Un buen diseño alinea ambos: la acción posible <i>se ve</i> posible. Cuando no coinciden, aparece la frustración de “no sabía que se podía hacer clic ahí”.', MO);

    cog.prosa(cont, '<h3>4 · Écfrasis — traducir lo visual a palabras</h3>' +
      '<p>La <b>écfrasis</b> es la figura retórica que <b>traduce lo visual al lenguaje</b>: una descripción verbal tan detallada y vívida de una imagen (un cuadro, una escena, un rostro) que permite <i>verla</i> en la mente. Es, en cierto sentido, lo <b>opuesto a la abstracción</b>: en vez de soltar detalles para generalizar, los acumula para hacer presente lo singular.</p>');
    cog.epigrafe(cont, "La écfrasis más célebre de Occidente es la descripción del escudo de Aquiles en la <i>Ilíada</i>: cientos de versos para una sola imagen.", "Homero");

    cog.prosa(cont, '<h3>5 · Las cuatro, de un vistazo</h3>');
    cog.tabla(cont, {
      criterio: "¿Qué hace?",
      cols: [{ nombre: "Operación", color: AZ }],
      filas: [
        { k: "Síntesis", v: ["Combina partes en un <b>todo nuevo</b> (opuesto: análisis; no es resumen)"] },
        { k: "Abstracción", v: ["<b>Aísla</b> una idea soltando detalles (opuesto: lo concreto)"] },
        { k: "Affordance", v: ["La <b>forma sugiere el uso</b> (puente diseño ↔ cognición)"] },
        { k: "Écfrasis", v: ["<b>Describe en palabras</b> lo visual (opuesto: abstracción)"] }
      ]
    });

    cog.prosa(cont, '<h3>6 · El eco en los datos, el código y la IA</h3>');
    cog.acordeon(cont, [
      { q: "Abstracción = el oficio de programar", a: 'Toda la ingeniería de software es gestión de abstracción: funciones, clases, módulos, APIs y capas que ocultan el detalle para que puedas razonar a mayor nivel. “Buen código” suele significar “abstraído en el nivel correcto”.' },
      { q: "Écfrasis automática: image captioning y alt text", a: 'Cuando un modelo describe una foto en palabras (<i>image captioning</i>) o generas <i>alt text</i> para accesibilidad, estás haciendo écfrasis a máquina: traducir lo visual a lenguaje. La dirección inversa —palabras a imagen— es lo que hace un generador tipo texto-a-imagen.' },
      { q: "Affordances en toda interfaz que diseñes", a: 'Cada botón, <i>slider</i>, menú y gesto de una app vive o muere por sus affordances. Un dashboard de datos “legible” es uno cuyas acciones (filtrar, ordenar, hacer <i>hover</i>) se anuncian solas.' },
      { q: "Análisis y síntesis en el ciclo de datos", a: 'El flujo clásico: <b>analizas</b> (EDA: descompones y exploras los datos) y luego <b>sintetizas</b> (integras hallazgos en un modelo, un <i>insight</i> o una narrativa). El <i>storytelling</i> de datos es síntesis más écfrasis: construir una conclusión y describirla para que se vea.' }
    ], "Conexiones con IA, datos y diseño");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Identifica la operación mental. Al elegir verás el porqué.",
      reactivos: [
        { p: 'Combinar hallazgos de tres estudios distintos para proponer una teoría nueva es un acto de…',
          opciones: [{ t: "síntesis", ok: true }, { t: "resumen" }, { t: "análisis" }],
          porque: "Integra partes separadas en un <b>todo nuevo</b>: es <b>síntesis</b> (no un mero resumen, que solo acortaría)." },
        { p: 'Pasar de “Fido, Luna y Rex” a la idea general de “perro” es…',
          opciones: [{ t: "abstracción", ok: true }, { t: "écfrasis" }, { t: "síntesis" }],
          porque: "Se aísla la idea general soltando los detalles de cada individuo: <b>abstracción</b>." },
        { p: 'Un botón con sombra y relieve que “pide” ser pulsado es un buen…',
          opciones: [{ t: "affordance", ok: true }, { t: "abstracción" }, { t: "écfrasis" }],
          porque: "Su forma <b>sugiere el uso</b> sin instrucciones: es un <b>affordance</b>." },
        { p: 'Describir un cuadro con tanto detalle que el lector puede verlo en su mente es…',
          opciones: [{ t: "écfrasis", ok: true }, { t: "abstracción" }, { t: "síntesis" }],
          porque: "Traducir lo visual a palabras vívidas es <b>écfrasis</b> (lo contrario de abstraer)." }
      ]
    });
    cog.nota(cont, 'Remátalo en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "La <b>síntesis</b> consiste en…", op: ["Acortar un texto (resumir)", "Combinar partes para formar un todo nuevo", "Descomponer un todo en partes", "Describir una imagen"], ok: 1, porque: "<b>Síntesis</b> = integrar elementos en un <b>todo nuevo</b>. No es resumir (acortar) ni analizar (descomponer)." },
    { p: "El opuesto del <b>análisis</b> es…", op: ["La abstracción", "La síntesis", "La écfrasis", "El affordance"], ok: 1, porque: "<b>Análisis</b> descompone; <b>síntesis</b> compone. Son operaciones inversas." },
    { p: "Pasar de ejemplos concretos a un concepto general, ignorando detalles, es…", op: ["Écfrasis", "Abstracción", "Síntesis", "Affordance"], ok: 1, porque: "Aislar la idea soltando detalles es <b>abstracción</b>; su opuesto es lo concreto." },
    { p: "Un <b>affordance</b> es…", op: ["Una figura retórica", "Una cualidad que sugiere cómo usar un objeto o interfaz", "Un resumen visual", "Un tipo de dato"], ok: 1, porque: "El <b>affordance</b> es la cualidad que <b>sugiere el uso</b>: el puente entre diseño y cognición." },
    { p: "Cuando un modelo describe una foto en palabras (image captioning), se parece a…", op: ["La abstracción", "La écfrasis", "El análisis", "El affordance"], ok: 1, porque: "Traducir lo visual a lenguaje es <b>écfrasis</b>; el <i>captioning</i> es écfrasis automática." }
  ];

  E.registrar({
    id: "cog-operaciones",
    grupo: "fund-diseno",
    lenguaje: "fund",
    orden: 4,
    titulo: "Operaciones Mentales y Diseño",
    sub: "Síntesis · Abstracción · Affordance · Écfrasis",
    resumen: "Cuatro herramientas para pensar, diseñar y comunicar: construir un todo (síntesis), aislar la idea (abstracción), sugerir el uso (affordance) y pintar con palabras (écfrasis).",
    chips: [{ k: "Bloque", v: "Mente y diseño" }, { k: "Tipo", v: "Conceptos y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("cog-operaciones", QUIZ)
    }
  });
})();
