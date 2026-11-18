/* ============================================================
   Ciencias Cognitivas — Tema 2: El Eje Biológico-Evolutivo
   Filogenia · Filogenético · Ontogenia  (especie vs individuo)
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)";

  /* SVG — Árbol filogenético (especie, ramifica) vs tallo ontogénico (individuo, crece) */
  var SVG_ARBOL =
    '<svg viewBox="0 0 600 260" role="img" aria-label="Filogenia como árbol ramificado frente a ontogenia como un solo tallo">' +
    // --- Filogenia: árbol que ramifica ---
    '<g stroke="var(--morado)" fill="none" stroke-width="2" stroke-linecap="round">' +
    '<path class="cog-draw" d="M70 232V150"/>' +
    '<path class="cog-draw" style="animation-delay:.2s" d="M70 150C70 120 40 112 40 80"/>' +
    '<path class="cog-draw" style="animation-delay:.2s" d="M70 150C70 120 100 112 100 80"/>' +
    '<path class="cog-draw" style="animation-delay:.45s" d="M40 80C40 56 24 50 24 30"/>' +
    '<path class="cog-draw" style="animation-delay:.45s" d="M40 80C40 56 56 50 56 30"/>' +
    '<path class="cog-draw" style="animation-delay:.45s" d="M100 80C100 56 86 50 86 30"/>' +
    '<path class="cog-draw" style="animation-delay:.45s" d="M100 80C100 56 116 50 116 30"/>' +
    '</g>' +
    '<g fill="var(--morado)">' +
    '<circle cx="24" cy="28" r="4"/><circle cx="56" cy="28" r="4"/><circle cx="86" cy="28" r="4"/><circle cx="116" cy="28" r="4"/></g>' +
    '<circle cx="70" cy="236" r="5" fill="none" stroke="var(--morado)" stroke-width="2"/>' +
    '<text x="70" y="256" text-anchor="middle" font-size="11" fill="var(--morado)">ancestro común</text>' +
    '<text x="70" y="16" text-anchor="middle" font-size="12" fill="var(--morado)" font-weight="600">FILOGENIA</text>' +
    '<text x="150" y="80" font-size="10.5" fill="currentColor" opacity=".6" transform="rotate(90 150 80)">millones de años →</text>' +
    // separador
    '<line x1="300" y1="20" x2="300" y2="240" stroke="currentColor" opacity=".18" stroke-dasharray="3 6"/>' +
    // --- Ontogenia: un solo individuo que madura ---
    '<text x="450" y="16" text-anchor="middle" font-size="12" fill="var(--verde)" font-weight="600">ONTOGENIA</text>' +
    '<path class="cog-draw" style="animation-delay:.3s" d="M450 236V40" stroke="var(--verde)" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    '<g fill="var(--verde)">' +
    '<circle cx="450" cy="236" r="6"/><text x="470" y="240" font-size="10.5" fill="currentColor" opacity=".7">cigoto</text>' +
    '<circle cx="450" cy="186" r="5" opacity=".85"/><text x="470" y="190" font-size="10.5" fill="currentColor" opacity=".6">embrión</text>' +
    '<circle cx="450" cy="130" r="5" opacity=".85"/><text x="470" y="134" font-size="10.5" fill="currentColor" opacity=".6">infancia</text>' +
    '<circle cx="450" cy="70" r="5" opacity=".85"/><text x="470" y="74" font-size="10.5" fill="currentColor" opacity=".6">madurez</text>' +
    '<circle cx="450" cy="40" r="7"/></g>' +
    '<text x="408" y="150" font-size="10.5" fill="currentColor" opacity=".6" transform="rotate(-90 408 150)">una sola vida →</text>' +
    '</svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>El Eje Biológico-Evolutivo</h2>' +
      '<p>Dos palabras casi idénticas al oído —<b>filogenia</b> y <b>ontogenia</b>— nombran dos historias de escala radicalmente distinta. Una cuenta el pasado de <i>toda una especie</i> a lo largo de eones; la otra, la <i>biografía</i> de un solo ser vivo. Separarlas ordena de golpe media biología y buena parte de cómo pensamos el aprendizaje — natural y artificial.</p>');

    cog.figura(cont, { color: MO, titulo: "Especie que ramifica vs. individuo que madura",
      svg: SVG_ARBOL,
      pie: "La <b>filogenia</b> es un <b>árbol</b> que se bifurca a lo largo de millones de años desde un ancestro común. La <b>ontogenia</b> es un <b>solo tallo</b>: la vida de un individuo, del cigoto a la madurez." });

    cog.prosa(cont, '<h3>1 · Filogenia — la biografía de la especie</h3>' +
      '<p>La <b>filogenia</b> es la <b>historia evolutiva</b> y el árbol genealógico de toda una especie (o grupo) a lo largo de millones de años. Es el relato de de dónde venimos como linaje: qué ramas se separaron, cuáles se extinguieron, qué rasgos se heredaron. Su unidad de tiempo son las <b>eras</b>; su protagonista, la <b>población</b>, no el individuo.</p>');

    cog.prosa(cont, '<h3>2 · Filogenético — lo que la evolución dejó grabado</h3>' +
      '<p><b>Filogenético</b> es el adjetivo: lo relativo a la filogenia. Es útil cuando hablamos de lo que <i>heredamos por evolución</i>, no por experiencia propia.</p>');
    cog.grid(cont, [
      { color: MO, etiqueta: "Heredado por evolución", titulo: "Memoria filogenética",
        cuerpo: 'Lo que la especie “recuerda” sin haberlo vivido: el miedo casi innato a las serpientes, el reflejo de succión del bebé, el asco ante lo podrido. <b>Instintos</b> escritos en el genoma por millones de años de selección.' },
      { color: VE, etiqueta: "Aprendido en vida", titulo: "Memoria ontogenética",
        cuerpo: 'Lo que <i>este</i> individuo aprende por experiencia: tu idioma, andar en bici, el camino a tu casa. No viaja en los genes; se construye durante <b>una sola vida</b>.' }
    ]);
    cog.nota(cont, 'Una forma de recordarlo: <b>filo-</b> viene del griego <i>phŷlon</i>, “tribu, raza” → la especie. <b>Onto-</b> viene de <i>ón/óntos</i>, “el ser, el ente” → el individuo que existe. Filo = muchos, a lo largo del tiempo profundo. Onto = uno, a lo largo de su vida.', MO);

    cog.prosa(cont, '<h3>3 · Ontogenia — la biografía del individuo</h3>' +
      '<p>La <b>ontogenia</b> es el desarrollo de <b>un solo organismo</b>, desde la concepción hasta su madurez física: la secuencia cigoto → embrión → cría → adulto. Es historia también, pero de una vida, no de un linaje.</p>');
    cog.tabla(cont, {
      criterio: "¿Quién y en cuánto tiempo?",
      cols: [{ nombre: "Filogenia", color: MO }, { nombre: "Ontogenia", color: VE }],
      filas: [
        { k: "Protagonista", v: ["La especie / el linaje", "Un solo individuo"] },
        { k: "Escala de tiempo", v: ["Millones de años", "Una vida"] },
        { k: "Forma", v: ["Árbol que se ramifica", "Trayectoria única"] },
        { k: "Motor", v: ["Selección natural, herencia", "Crecimiento y maduración"] },
        { k: "“Memoria” típica", v: ["Instinto (filogenético)", "Experiencia (ontogenético)"] }
      ]
    });

    cog.prosa(cont, '<h3>4 · La tentación de mezclarlas (y por qué es famosa)</h3>' +
      '<p>En el siglo XIX, Ernst Haeckel propuso que “<i>la ontogenia recapitula la filogenia</i>”: que un embrión repasa, en su desarrollo, las formas de sus ancestros evolutivos. La frase es pegajosa y la biología moderna la considera <b>exagerada y en gran parte incorrecta</b> — el embrión no “revive” a sus ancestros. Pero la idea de que estas dos escalas <i>dialogan</i> sigue viva, y ahí es donde se vuelve fértil para la tecnología.</p>');
    cog.epigrafe(cont, "“Nada en biología tiene sentido si no es a la luz de la evolución.”", "Theodosius Dobzhansky");

    cog.prosa(cont, '<h3>5 · El eco en los datos y la IA</h3>');
    cog.acordeon(cont, [
      { q: "Árboles filogenéticos ↔ clustering jerárquico", a: 'El <b>dendrograma</b> que produce el clustering jerárquico en machine learning es, literalmente, un árbol filogenético de tus datos: agrupa por similitud y muestra qué “ramas” se separan antes. La bioinformática usa los mismos algoritmos para reconstruir la historia evolutiva real a partir del ADN.' },
      { q: "La “filogenia” de tu repositorio", a: 'El árbol de <i>commits</i> de git —ramas que se bifurcan desde un ancestro común, <i>merges</i>, ramas muertas— es una filogenia perfecta de tu código. <code>git log --graph</code> dibuja el mismo tipo de árbol.' },
      { q: "Preentrenamiento (filo) vs. fine-tuning (onto)", a: 'Un modelo preentrenado trae “instintos” de todo un corpus: su sesgo heredado, su <b>memoria filogenética</b> artificial. Cuando lo afinas (<i>fine-tuning</i>) sobre tus datos, le das una <b>ontogenia</b>: el aprendizaje de <i>esta</i> instancia para <i>tu</i> tarea.' },
      { q: "Algoritmos evolutivos", a: 'Los algoritmos genéticos resuelven problemas imitando la filogenia: poblaciones de soluciones que mutan, se cruzan y son seleccionadas generación tras generación. Evolución, pero en silicio y en minutos.' }
    ], "Conexiones con IA, datos y diseño");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "¿Filogenia u ontogenia? Elige y descubre por qué.",
      reactivos: [
        { p: 'El reflejo de succión con el que nace un bebé, sin haberlo aprendido, es memoria…',
          opciones: [{ t: "filogenética", ok: true }, { t: "ontogenética" }, { t: "cultural" }],
          porque: "Es un instinto <b>heredado por evolución</b> (la especie), no algo aprendido en vida: <b>filogenético</b>." },
        { p: 'El desarrollo de una rana desde huevo → renacuajo → adulto describe su…',
          opciones: [{ t: "ontogenia", ok: true }, { t: "filogenia" }, { t: "epistemología" }],
          porque: "Es la biografía biológica de <b>un individuo</b> hasta su madurez: <b>ontogenia</b>." },
        { p: 'Reconstruir, con ADN, cómo se separaron humanos, chimpancés y gorilas de un ancestro común es trabajo de…',
          opciones: [{ t: "filogenia", ok: true }, { t: "ontogenia" }, { t: "ontología" }],
          porque: "Es la historia evolutiva de <b>un linaje</b> a lo largo de millones de años: <b>filogenia</b>." }
      ]
    });
    cog.nota(cont, 'Cuando lo tengas claro, pasa al <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "La <b>filogenia</b> cuenta la historia de…", op: ["Un solo individuo", "Toda una especie o linaje a lo largo de eones", "Una sola célula", "Un idioma"], ok: 1, porque: "La <b>filogenia</b> es el árbol evolutivo de <b>toda una especie</b> a lo largo de millones de años." },
    { p: "La <b>ontogenia</b> se refiere a…", op: ["La evolución de la especie", "El desarrollo de un individuo, de la concepción a la madurez", "El estudio del ser en filosofía", "La herencia de instintos"], ok: 1, porque: "La <b>ontogenia</b> es la biografía biológica de <b>un solo organismo</b>." },
    { p: "El miedo casi innato a las serpientes es un ejemplo de memoria…", op: ["Ontogenética", "Filogenética (heredada por evolución)", "De trabajo", "Semántica"], ok: 1, porque: "Es un instinto <b>heredado</b> por la especie, no aprendido en vida: memoria <b>filogenética</b>." },
    { p: "La frase “la ontogenia recapitula la filogenia” hoy se considera…", op: ["Una ley exacta", "Exagerada y en gran parte incorrecta", "Un teorema matemático", "Irrelevante para la biología"], ok: 1, porque: "La propuesta de Haeckel es <b>exagerada y mayormente incorrecta</b>: el embrión no revive a sus ancestros." },
    { p: "¿Qué pareja tecnológica refleja mejor “filogenia vs. ontogenia”?", op: ["Preentrenamiento vs. fine-tuning", "CPU vs. GPU", "Frontend vs. backend", "HTTP vs. HTTPS"], ok: 0, porque: "El <b>preentrenamiento</b> trae un sesgo heredado (filo) y el <b>fine-tuning</b> es el aprendizaje de esa instancia (onto)." }
  ];

  E.registrar({
    id: "cog-evolutivo",
    grupo: "cog-conceptos",
    lenguaje: "cog",
    orden: 2,
    titulo: "El Eje Biológico-Evolutivo",
    sub: "Filogenia · Filogenético · Ontogenia",
    resumen: "Especie vs. individuo: la historia evolutiva de un linaje (filogenia) frente a la biografía de un solo ser (ontogenia), y su eco en el aprendizaje de máquinas.",
    chips: [{ k: "Bloque", v: "Evolución" }, { k: "Tipo", v: "Conceptos y comparativa" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("cog-evolutivo", QUIZ)
    }
  });
})();
