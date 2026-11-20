/* ============================================================
   Fundamentos · Diseño
   Epistémica del diseño — procesos cognitivos en el acto de diseñar
   Basado en la clase del Dr. Raúl Gregorio Torres Maya
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Dos miradas: epistemología (sobre el diseño) vs. epistémica (en el acto) */
  var SVG_DOS =
    '<svg viewBox="0 0 580 210" role="img" aria-label="Epistemología del diseño frente a epistémica del diseño">' +
    '<circle cx="290" cy="112" r="44" fill="none" stroke="currentColor" stroke-width="2" opacity=".35"/>' +
    '<text x="290" y="108" text-anchor="middle" font-size="13" fill="currentColor" opacity=".85">DISEÑO</text>' +
    '<text x="290" y="126" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">como conocimiento</text>' +
    '<g>' +
    '<rect x="24" y="54" width="158" height="116" rx="14" fill="none" stroke="var(--azul)" stroke-width="2"/>' +
    '<text x="103" y="42" text-anchor="middle" font-size="12.5" fill="var(--azul)" font-weight="600">EPISTEMOLOGÍA</text>' +
    '<text x="103" y="92" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".75">mira desde afuera</text>' +
    '<text x="103" y="112" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".75">reflexión crítica</text>' +
    '<text x="103" y="150" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">¿qué valida el saber</text>' +
    '<text x="103" y="163" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">del diseño?</text>' +
    '<line x1="182" y1="112" x2="244" y2="112" stroke="var(--azul)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>' +
    '</g>' +
    '<g>' +
    '<rect class="cog-pulse" x="398" y="54" width="158" height="116" rx="14" fill="none" stroke="var(--verde)" stroke-width="2"/>' +
    '<text x="477" y="42" text-anchor="middle" font-size="12.5" fill="var(--verde)" font-weight="600">EPISTÉMICA</text>' +
    '<text x="477" y="92" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".75">ocurre adentro</text>' +
    '<text x="477" y="112" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".75">en el acto de diseñar</text>' +
    '<text x="477" y="150" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">¿cómo se genera el</text>' +
    '<text x="477" y="163" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">saber al proyectar?</text>' +
    '<line x1="398" y1="112" x2="336" y2="112" stroke="var(--verde)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>' +
    '</g></svg>';

  /* SVG 2 — El puente inter-semiótico: palabra <-> imagen */
  var SVG_PUENTE =
    '<svg viewBox="0 0 560 160" role="img" aria-label="Traducción inter-semiótica entre palabra e imagen">' +
    '<defs><marker id="eArr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".6"/></marker></defs>' +
    '<g text-anchor="middle">' +
    '<rect x="30" y="54" width="150" height="56" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="105" y="80" font-size="14" fill="var(--azul)">PALABRA</text><text x="105" y="98" font-size="9.5" fill="currentColor" opacity=".6">lineal · lógica · abstracta</text>' +
    '<rect x="380" y="54" width="150" height="56" rx="12" fill="none" stroke="var(--morado)" stroke-width="2"/><text x="455" y="80" font-size="14" fill="var(--morado)">IMAGEN</text><text x="455" y="98" font-size="9.5" fill="currentColor" opacity=".6">holística · sintética</text>' +
    '<path d="M182 76h196" stroke="var(--verde)" stroke-width="1.6" fill="none" marker-end="url(#eArr)"/><text x="280" y="66" font-size="10.5" fill="var(--verde)">écfrasis → imaginar</text>' +
    '<path d="M378 92h-196" stroke="var(--ambar)" stroke-width="1.6" fill="none" marker-end="url(#eArr)"/><text x="280" y="112" font-size="10.5" fill="var(--ambar)">descripción ← nombrar</text>' +
    '<text x="280" y="140" font-size="9.5" fill="currentColor" opacity=".55">en toda traducción entre lenguajes hay sesgo</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Epistémica del diseño</h2>' +
      '<p>Diseñar no es solo dibujar: es <b>conocer de una forma particular</b>. Antes de que exista un objeto, en la mente del diseñador ocurre un proceso que interpreta, conceptualiza, imagina, traduce y configura. Este módulo, basado en la clase del <b>Dr. Raúl Gregorio Torres Maya</b>, estudia ese proceso: los <b>procesos cognitivos en el acto de diseñar</b> y cómo, entre palabras e imágenes, el diseño genera y valida su propio conocimiento.</p>');

    cog.epigrafe(cont, "“El acto de diseño: solucionar problemas complejos a través de la síntesis pre-figurativa de artefactos pertinentes, a partir de la eficacia funcional, la eficiencia tecnológica, la pertinencia significativa y la sostenibilidad.”", "Dr. Raúl Gregorio Torres Maya");

    cog.prosa(cont, '<h3>1 · Dos palabras que se confunden: epistemología y epistémica</h3>' +
      '<p>Suenan casi igual, pero miran hacia lados distintos del mismo fenómeno —el conocimiento del diseño—.</p>');
    cog.figura(cont, { color: MO, titulo: "Mirar el saber desde afuera vs. generarlo desde adentro",
      svg: SVG_DOS,
      pie: "La <b>epistemología del diseño</b> reflexiona críticamente, desde afuera, sobre la naturaleza, los fundamentos y los criterios de validez del conocimiento que constituye al diseño como disciplina proyectual. La <b>epistémica del diseño</b> ocurre adentro: son los procesos cognitivos mediante los cuales se genera, organiza, interpreta y valida conocimiento <i>durante</i> el acto de diseñar." });
    cog.tabla(cont, {
      criterio: "¿En qué se fija?",
      cols: [{ nombre: "Epistemología", color: AZ }, { nombre: "Epistémica", color: VE }],
      filas: [
        { k: "Punto de vista", v: ["Desde afuera, reflexiva", "Desde adentro, en acción"] },
        { k: "Pregunta", v: ["¿Qué valida el saber del diseño?", "¿Cómo se genera al proyectar?"] },
        { k: "Objeto", v: ["Métodos, fundamentos, criterios", "Procesos cognitivos del acto de diseñar"] },
        { k: "Ejemplo", v: ["Métodos de investigación en diseño", "Interpretar, conceptualizar, configurar"] }
      ]
    });
    cog.nota(cont, 'La epistemología estudia <b>la relación entre el conocimiento y la práctica</b> del diseño: los métodos para diseñar y los métodos de investigación <i>en</i> diseño. La epistémica entra al taller mental y observa los procesos <b>interpretativos, conceptuales, configurativos, representacionales y experimentales</b> con que se evalúan propuestas y se toman decisiones.', AZ);

    cog.prosa(cont, '<h3>2 · Los procesos del acto de diseño</h3>' +
      '<p>El acto de diseñar no es un salto mágico de la nada al objeto: es una secuencia (no siempre lineal) de operaciones cognitivas. Estos son los procesos que lo componen:</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "Entrada", titulo: "Comprender", cuerpo: '<b>Descripción</b> · <b>Identificación</b> · <b>Interpretación</b> · <b>Análisis</b> · <b>Síntesis de datos</b>.<br><span class="cog-mini">Recibir el problema y descomponerlo para entenderlo.</span>' },
      { color: MO, etiqueta: "Chispa", titulo: "Conceptualizar", cuerpo: '<b>Relaciones / conexiones conceptuales</b> · <b>Heurística / serendipia</b> · <b>Conceptualización</b> · <b>Extrapolación</b> · <b>Abstracción</b>.<br><span class="cog-mini">Encontrar relaciones que no estaban presentes.</span>' },
      { color: VE, etiqueta: "Dar forma", titulo: "Configurar", cuerpo: '<b>Traducción inter-semiótica</b> · <b>Coherencia</b> · <b>Prefiguración</b> · <b>Configuración</b> · <b>Síntesis configurativa</b> · <b>Composición</b>.<br><span class="cog-mini">Convertir el concepto en forma.</span>' },
      { color: AM, etiqueta: "Comunicar", titulo: "Representar", cuerpo: '<b>Representación</b> · <b>Canal lingüístico</b> y <b>extra-lingüístico</b> · <b>Significado / significante — semántica</b>.<br><span class="cog-mini">Hacer visible y comunicable la propuesta.</span>' }
    ]);

    cog.prosa(cont, '<h3>3 · Palabras: la materia prima del pensamiento proyectual</h3>' +
      '<p>El diseño empieza, casi siempre, en <b>palabras</b>: un requerimiento, una narrativa, una especificación. Vale la pena entender qué son.</p>');
    cog.grid(cont, [
      { color: AZ, etiqueta: "¿Qué son?", titulo: "Unidades de significado",
        cuerpo: 'Unidades básicas del lenguaje que comunican ideas, conceptos y emociones. Una combinación de sonidos o caracteres con un <b>significado asignado</b> dentro de un idioma — lo que Saussure estudió como <b>semiología</b>: la relación entre <i>significante</i> (la forma) y <i>significado</i> (el concepto).' },
      { color: MO, etiqueta: "Características", titulo: "Abstractas y lineales",
        cuerpo: 'Son <b>abstractas</b> (representan sin parecerse a lo representado), portan <b>significado</b>, siguen una <b>lógica</b> y son <b>lineales</b>: se leen una tras otra, en el tiempo. Además del sentido literal, cargan <b>connotaciones</b> y asociaciones culturales e históricas.' }
    ]);
    cog.nota(cont, '<b>Écfrasis</b>: describir con palabras una imagen hasta hacerla aparecer en la mente de quien escucha. El álbum <i>Allí donde van nuestros padres</i>, de <b>Shaun Tan</b>, es puro ejercicio de imaginar: "un hombre con traje, sombrero y maletín mira con curiosidad una criatura extraña…". Las palabras <b>generan imágenes</b> — esa es su potencia para el diseño.', AM);

    cog.prosa(cont, '<h3>4 · Imágenes: mentales y visuales</h3>' +
      '<p>Si la palabra es lineal, la imagen es su opuesto complementario: <b>compleja, sintética y holística</b> —se capta de golpe, entera—. ¿Qué importancia tienen las imágenes en el diseño? Son el territorio natural donde la forma se piensa. Y no todas las imágenes son iguales:</p>');
    cog.grid(cont, [
      { color: MO, etiqueta: "Del sueño", titulo: "Oníricas", cuerpo: 'Las que surgen al soñar: libres, asociativas, sin control voluntario.' },
      { color: RO, etiqueta: "Sin estímulo", titulo: "Alucinaciones", cuerpo: 'Imágenes vividas como percepción real pero sin un estímulo externo que las origine.' },
      { color: VE, etiqueta: "Del recuerdo", titulo: "Mnémicas", cuerpo: 'Las que recuperamos de la memoria. <b>Las palabras las generan.</b>' },
      { color: AZ, etiqueta: "Vívidas", titulo: "Eidéticas", cuerpo: 'Imágenes mentales tan nítidas que casi se "ven". También las detonan las palabras y otras imágenes.' }
    ]);

    cog.prosa(cont, '<h3>5 · Conceptualizar: relacionar lo inconexo</h3>' +
      '<p>El corazón creativo del diseño es la <b>conceptualización</b>: dar con una idea que ordena el problema. Y su chispa suele ser <b>relacionar cosas que no estaban conectadas</b>.</p>');
    cog.grid(cont, [
      { color: VE, etiqueta: "Qué implica", titulo: "Relación · Coherencia · Síntesis",
        cuerpo: 'Conceptualizar es tender <b>relaciones</b>, darles <b>coherencia</b> y <b>sintetizarlas</b> en una idea única que sostiene el proyecto. El requerimiento específico es, literalmente, <b>encontrar relaciones que no estaban presentes</b>.' },
      { color: AM, etiqueta: "El motor", titulo: "Heurística y serendipia",
        cuerpo: 'La <b>heurística</b> —el atajo creativo— y la <b>serendipia</b> —el hallazgo afortunado e inesperado— empujan ese salto. El ejemplo de clase: unir un <b>cactus</b> con algo ajeno para que de su choque nazca un concepto nuevo.' }
    ]);

    cog.prosa(cont, '<h3>6 · Traducir entre lenguajes (y el sesgo inevitable)</h3>' +
      '<p>Diseñar es traducir sin cesar: de la palabra a la imagen y de vuelta, de lo intangible a lo tangible. A esa conversión entre sistemas de signos distintos se le llama <b>traducción inter-semiótica</b>.</p>');
    cog.figura(cont, { color: VE, titulo: "El vaivén entre la palabra y la imagen",
      svg: SVG_PUENTE,
      pie: "La <b>écfrasis</b> va de la palabra a la imagen mental (imaginar); la <b>descripción</b> va de la imagen a la palabra (nombrar lo que se ve, como un boceto verbal). Traducir un <b>metalenguaje</b> a otro busca expresar la misma información manteniendo la significación original — pero, como advierte la clase, <b>en toda traducción siempre hay sesgos</b>: se cuela la experiencia personal, la emoción, la intuición y la subjetividad." });

    cog.acordeon(cont, [
      { q: "¿Por qué “pre-figurativa”? (la definición de Torres Maya)", a: 'El diseñador <b>pre-figura</b>: configura el artefacto en su mente <i>antes</i> de que exista, anticipando su forma y su desempeño. Por eso el acto de diseño resuelve problemas complejos mediante una <b>síntesis pre-figurativa</b>, evaluada por cuatro criterios: eficacia <b>funcional</b>, eficiencia <b>tecnológica</b>, pertinencia <b>significativa</b> (que signifique algo para alguien) y <b>sostenibilidad</b>.' },
      { q: "Significado y significante (Saussure) en el diseño", a: 'Saussure separó el <b>significante</b> (la forma material del signo: la palabra escrita, la forma del objeto) del <b>significado</b> (el concepto que evoca). Un diseño es un signo: su forma (significante) debe comunicar un sentido (significado). La <b>semántica</b> del producto —qué dice un objeto por su forma— nace de esta relación.' },
      { q: "Palabra vs. imagen: lineal vs. holística", a: 'La palabra es <b>lineal</b> (una tras otra, en el tiempo) y abstracta; la imagen es <b>holística</b> (todo a la vez) y sintética. El diseñador necesita ambas: las palabras para analizar y especificar, las imágenes para sintetizar y configurar. Saber traducir entre las dos es una competencia central del oficio.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Identifica el proceso o concepto. Elige y revisa el porqué.",
      reactivos: [
        { p: 'Reflexionar <i>desde afuera</i> sobre qué valida el conocimiento del diseño como disciplina es…',
          opciones: [{ t: "epistemología del diseño", ok: true }, { t: "epistémica del diseño" }, { t: "semántica" }],
          porque: "La <b>epistemología</b> es la reflexión crítica sobre los fundamentos y la validez del saber; la epistémica ocurre <i>dentro</i> del acto de diseñar." },
        { p: 'Describir con palabras una imagen hasta hacerla aparecer en la mente de quien escucha es…',
          opciones: [{ t: "écfrasis", ok: true }, { t: "abstracción" }, { t: "configuración" }],
          porque: "La <b>écfrasis</b> traduce de la palabra a la imagen mental; es el ejercicio de <i>imaginar</i> con el lenguaje (como en Shaun Tan)." },
        { p: 'Convertir un sistema de signos en otro (palabra ↔ imagen) manteniendo el sentido, aun con sesgos, es…',
          opciones: [{ t: "traducción inter-semiótica", ok: true }, { t: "síntesis de datos" }, { t: "identificación" }],
          porque: "La <b>traducción inter-semiótica</b> pasa entre lenguajes distintos; siempre arrastra algo de subjetividad y sesgo." }
      ]
    });
    cog.nota(cont, 'Material basado en la clase <i>Procesos cognitivos en el acto de diseño</i> del <b>Dr. Raúl Gregorio Torres Maya</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', MO);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Ferdinand de Saussure (significado y significante)", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Ferdinand_de_Saussure", lang: "es" },
    { t: "Écfrasis", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Écfrasis", lang: "es" },
    { t: "Epistemología", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Epistemología", lang: "es" },
    { t: "Semiótica", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Semiótica", lang: "es" },
    { t: "Mental image", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Mental_image", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Cuál es la diferencia entre epistemología y epistémica del diseño?", op: ["Son sinónimos exactos", "La epistemología reflexiona desde afuera sobre el saber; la epistémica es el proceso cognitivo durante el acto de diseñar", "La epistemología es práctica y la epistémica teórica", "Ninguna tiene que ver con el conocimiento"], ok: 1, porque: "La epistemología mira críticamente, desde afuera, los fundamentos y la validez del saber del diseño; la epistémica ocurre <i>dentro</i>, al proyectar." },
    { p: "Según el Dr. Torres Maya, el acto de diseño resuelve problemas complejos mediante…", op: ["La copia de referentes", "La síntesis pre-figurativa de artefactos pertinentes", "La producción en serie", "La intuición pura sin método"], ok: 1, porque: "Lo define como una síntesis <b>pre-figurativa</b> evaluada por eficacia funcional, eficiencia tecnológica, pertinencia significativa y sostenibilidad." },
    { p: "La écfrasis consiste en…", op: ["Dibujar un objeto", "Describir con palabras una imagen para imaginarla mentalmente", "Traducir de un idioma a otro", "Fabricar un prototipo"], ok: 1, porque: "Es el puente de la palabra a la imagen mental: narrar algo con tal detalle que aparece en la mente de quien escucha." },
    { p: "En la semiología de Saussure, el <b>significante</b> es…", op: ["El concepto evocado", "La forma material del signo (la palabra, la forma)", "El objeto real", "El sesgo de la traducción"], ok: 1, porque: "El significante es la forma (sonido, grafía, forma del objeto); el significado es el concepto. El diseño une ambos como un signo." },
    { p: "Frente a la palabra (lineal y abstracta), la imagen es…", op: ["Más lenta", "Holística y sintética: se capta de golpe, entera", "Siempre literal", "Incapaz de comunicar"], ok: 1, porque: "La imagen es compleja, sintética y holística; la palabra es lineal. El diseño traduce constantemente entre ambas." }
  ];

  E.registrar({
    id: "fund-diseno-epistemica",
    grupo: "fund-diseno",
    lenguaje: "fund",
    orden: 18,
    titulo: "Epistémica del diseño",
    sub: "Procesos cognitivos en el acto de diseñar",
    resumen: "Cómo el diseño genera y valida su propio conocimiento: epistemología vs. epistémica, los procesos del acto de diseñar, las palabras y las imágenes (mentales y visuales), la conceptualización y la traducción inter-semiótica. Basado en la clase del Dr. Raúl Gregorio Torres Maya.",
    chips: [{ k: "Bloque", v: "Diseño" }, { k: "Tipo", v: "Teoría y procesos" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-diseno-epistemica", QUIZ)
    }
  });
})();
