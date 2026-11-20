/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Personajes importantes en tecnología y computación
   Bloque C — Ingeniería de software, compiladores y lenguajes
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";
  var C = MO;

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Ingeniería de software y lenguajes</h2>' +
      '<p>Programar es, en el fondo, un acto de lenguaje. Cada idioma de programación es una forma distinta de pensar los problemas: unos priorizan la velocidad, otros la legibilidad, otros la seguridad o la concurrencia. Este bloque reúne a quienes inventaron esos idiomas —de Fortran a TypeScript— y a quienes dieron rigor y estructura a la disciplina de construir software.</p>');
    cog.epigrafe(cont, "“Los lenguajes de programación son cómo le hablamos a las máquinas, pero también cómo pensamos entre humanos sobre los problemas.”", "Síntesis del bloque");

    cog.persona(cont, { slug: "frances-allen", nombre: "Frances Allen", color: C, etiqueta: "Compiladores", meta: "1932–2020 · Informática (IBM)", parrafos: [
      'Pionera de la <b>optimización de compiladores</b>: las técnicas que permiten que un programa escrito por humanos se traduzca a un código máquina que corra lo más rápido posible. Su trabajo hizo que los lenguajes de alto nivel fueran además eficientes.',
      'Durante décadas en IBM trabajó en cómo analizar y transformar programas para exprimir el máximo rendimiento del hardware, sentando bases que todo compilador moderno sigue usando. Sin esa optimización, muchos lenguajes habrían sido demasiado lentos para la práctica.',
      'En 2006 se convirtió en la <b>primera mujer en ganar el Premio Turing</b>, un hito histórico para el campo. Dedicó parte de su vida a promover la presencia de mujeres en la computación. Su carrera demostró que el trabajo “invisible” de los compiladores es lo que hace práctica a toda la programación.'
    ] });

    cog.persona(cont, { slug: "barbara-liskov", nombre: "Barbara Liskov", color: C, etiqueta: "Abstracción de datos", meta: "n. 1939 · Informática (MIT)", parrafos: [
      'Una de las grandes teóricas de cómo organizar programas grandes. Desarrolló la idea de la <b>abstracción de datos</b>: agrupar datos y las operaciones que los manipulan en unidades coherentes, ocultando los detalles internos. Es la base de la programación orientada a objetos.',
      'Su nombre vive en el <b>Principio de Sustitución de Liskov</b>, la “L” de los principios SOLID: si un tipo hereda de otro, debe poder usarse en su lugar sin romper el programa. Es una regla fundamental del buen diseño orientado a objetos.',
      'También hizo aportes decisivos a la <b>computación distribuida</b> y a la tolerancia a fallos en sistemas con múltiples máquinas. Ganó el Premio Turing en 2008. Su trabajo convirtió la construcción de software complejo de un arte caótico en una disciplina con principios.'
    ] });

    cog.persona(cont, { slug: "john-backus", nombre: "John Backus", color: C, etiqueta: "Fortran", meta: "1924–2007 · Informático (IBM)", parrafos: [
      'Lideró en IBM, en los años 50, la creación de <b>Fortran</b>, el primer lenguaje de programación de alto nivel de uso general ampliamente adoptado. Antes de él, programar significaba escribir en el críptico lenguaje de la máquina.',
      'Fortran permitió a científicos e ingenieros escribir fórmulas casi como en matemáticas, y un compilador las traducía a código máquina eficiente. Fue una revolución: multiplicó la productividad y democratizó el acceso a las computadoras. Aún se usa en cómputo científico de alto rendimiento.',
      'Backus también ideó la notación <b>BNF</b> para describir formalmente la sintaxis de los lenguajes, herramienta esencial para diseñar compiladores. Ganó el Premio Turing en 1977. Curiosamente, dedicó su vida posterior a criticar el propio paradigma que había popularizado, buscando alternativas funcionales.'
    ] });

    cog.persona(cont, { slug: "niklaus-wirth", nombre: "Niklaus Wirth", color: C, etiqueta: "Pascal", meta: "1934–2024 · Informático suizo", parrafos: [
      'Informático suizo, creó <b>Pascal</b> (1970), un lenguaje diseñado para <b>enseñar a programar bien</b>, con una estructura clara y disciplinada. Durante décadas fue el idioma con el que generaciones de estudiantes aprendieron los fundamentos.',
      'Fue un gran defensor de la <b>programación estructurada</b> y de la simplicidad. Su famosa máxima —“los programas son algoritmos más estructuras de datos”— dio título a un libro clásico y resume una forma de pensar la computación.',
      'Creó además otros lenguajes influyentes (Modula-2, Oberon) siempre con la misma filosofía: hacer lo más con lo menos, favorecer la claridad sobre la complejidad. Ganó el Premio Turing en 1984. Su legado es una estética de la ingeniería: elegancia es quitar, no añadir.'
    ] });

    cog.persona(cont, { slug: "bjarne-stroustrup", nombre: "Bjarne Stroustrup", color: C, etiqueta: "C++", meta: "n. 1950 · Informático danés", parrafos: [
      'Informático danés, creó <b>C++</b> a principios de los años 80, añadiendo al lenguaje C la <b>programación orientada a objetos</b> y otras abstracciones, sin renunciar al control y la eficiencia de bajo nivel que hicieron famoso a C.',
      'C++ se convirtió en el lenguaje de los sistemas que exigen máximo rendimiento: motores de videojuegos, navegadores, sistemas financieros, software de alta exigencia. Permite programar “cerca del metal” pero con herramientas para gestionar la complejidad de proyectos enormes.',
      'Su filosofía de diseño —no imponer costos que no pidas, confiar en el programador— marcó a toda una familia de lenguajes. Sigue activo guiando su evolución. C++ es un ejemplo de cómo un lenguaje puede durar décadas reinventándose sin perder su identidad.'
    ] });

    cog.persona(cont, { slug: "larry-wall", nombre: "Larry Wall", color: C, etiqueta: "Perl", meta: "n. 1954 · Programador y lingüista (EE. UU.)", parrafos: [
      'Lingüista de formación, creó <b>Perl</b> en 1987, un lenguaje famoso por su flexibilidad y su potencia para <b>procesar y transformar texto</b>. Fue durante años la “navaja suiza” de los administradores de sistemas y de la primera web dinámica (CGI).',
      'Su formación lingüística impregnó el diseño: Perl abraza la idea de que “hay más de una forma de hacerlo”, dando al programador enorme libertad expresiva, como un lenguaje natural. Eso lo hizo amado por unos y criticado por otros.',
      'Wall popularizó además una idea cultural influyente: que las tres grandes virtudes del programador son la <b>pereza, la impaciencia y la soberbia</b> —bien entendidas, las que impulsan a automatizar, optimizar y escribir código del que estar orgulloso—. Su humor y su filosofía marcaron la cultura hacker.'
    ] });

    cog.persona(cont, { slug: "guido-van-rossum", nombre: "Guido van Rossum", color: C, etiqueta: "Python", meta: "n. 1956 · Informático neerlandés", parrafos: [
      'Informático neerlandés, creó <b>Python</b> a inicios de los años 90 con una obsesión por la <b>legibilidad</b>: que el código se leyera casi como pseudocódigo en inglés, con una sintaxis limpia donde hasta la indentación tiene significado.',
      'Esa apuesta por la claridad hizo de Python uno de los lenguajes más populares del mundo y el idioma por excelencia de la <b>ciencia de datos, la inteligencia artificial y la enseñanza</b>. Bibliotecas como NumPy, pandas, PyTorch y TensorFlow lo convirtieron en la lengua franca del machine learning.',
      'Durante años fue el “Dictador Benévolo Vitalicio” del proyecto, guiando sus decisiones. Su filosofía —recogida en el <i>Zen de Python</i>: “lo bello es mejor que lo feo, lo explícito mejor que lo implícito”— moldeó una comunidad entera. Python es, hoy, la puerta de entrada de millones a la programación.'
    ] });

    cog.persona(cont, { slug: "james-gosling", nombre: "James Gosling", color: C, etiqueta: "Java", meta: "n. 1955 · Informático canadiense", parrafos: [
      'Informático canadiense, es el padre de <b>Java</b>, creado en los años 90 bajo un lema poderoso: “<b>escribe una vez, ejecuta en cualquier lugar</b>”. Un programa Java corre igual en cualquier máquina gracias a una máquina virtual que lo interpreta.',
      'Esa portabilidad hizo de Java el lenguaje dominante del software empresarial, de los servidores y, durante años, de los teléfonos móviles. Android se construyó sobre él. Es uno de los lenguajes más usados del mundo y la base de incontables sistemas que operan a gran escala.',
      'Java introdujo o popularizó ideas —gestión automática de memoria, fuerte orientación a objetos, enormes bibliotecas estándar— que influyeron en casi todos los lenguajes posteriores. Gosling diseñó un idioma pensado para equipos grandes construyendo software que debe durar y mantenerse por décadas.'
    ] });

    cog.persona(cont, { slug: "yukihiro-matsumoto", nombre: "Yukihiro Matsumoto", color: C, etiqueta: "Ruby", meta: "n. 1965 · Informático japonés", parrafos: [
      'Informático japonés conocido como “Matz”, creó <b>Ruby</b> en los años 90 con un objetivo poco común: la <b>felicidad del programador</b>. Diseñó el lenguaje para que escribir código fuera placentero, natural y expresivo.',
      'Ruby combina influencias de Perl, Smalltalk y Lisp en una sintaxis elegante y flexible. Saltó a la fama con el framework <b>Ruby on Rails</b>, que revolucionó el desarrollo web por su rapidez y simplicidad, e impulsó a innumerables startups.',
      'Su filosofía —“optimizado para la alegría del programador”— es una declaración de que las herramientas deben servir a las personas, no al revés. Matz representa una corriente que pone el bienestar y la productividad humana en el centro del diseño de lenguajes.'
    ] });

    cog.persona(cont, { slug: "rasmus-lerdorf", nombre: "Rasmus Lerdorf", color: C, etiqueta: "PHP", meta: "n. 1968 · Programador danés-canadiense", parrafos: [
      'Creó <b>PHP</b> en 1994, inicialmente como un conjunto de herramientas para su página personal. Casi por accidente, se convirtió en el lenguaje que impulsó la primera gran ola de la <b>web dinámica</b>: páginas que se generan en el servidor según cada usuario.',
      'PHP se volvió omnipresente por ser fácil de empezar y de desplegar. Es la base de <b>WordPress</b>, que mueve una porción enorme de los sitios del mundo, y durante años fue el motor de buena parte de internet, incluyendo los inicios de Facebook y Wikipedia.',
      'Lerdorf resume con honestidad su creación: nunca pretendió diseñar un lenguaje “bonito”, sino resolver problemas reales de forma pragmática. Esa practicidad —criticada por los puristas pero amada por quienes necesitaban publicar rápido— explica buena parte de la historia de la web.'
    ] });

    cog.persona(cont, { slug: "brendan-eich", nombre: "Brendan Eich", color: C, etiqueta: "JavaScript", meta: "n. 1961 · Informático (EE. UU.)", parrafos: [
      'En 1995, trabajando en Netscape, creó <b>JavaScript</b> en apenas <b>diez días</b>. Su misión era dar algo de interactividad a las páginas web. Nadie imaginó en qué se convertiría ese encargo apresurado.',
      'JavaScript es hoy el <b>lenguaje más usado del mundo</b> y el único que corre nativamente en todos los navegadores: mueve prácticamente todo lo interactivo de la web, y con Node.js también los servidores. Esta misma Learning Zone está escrita en JavaScript.',
      'Que un lenguaje hecho a toda prisa acabara sosteniendo internet dice mucho sobre cómo la tecnología evoluciona por caminos imprevistos. A pesar de sus rarezas heredadas de aquel origen acelerado, su ubicuidad lo volvió imprescindible. Eich cofundó después el navegador Brave.'
    ] });

    cog.persona(cont, { slug: "anders-hejlsberg", nombre: "Anders Hejlsberg", color: C, etiqueta: "C# · TypeScript", meta: "n. 1960 · Informático danés", parrafos: [
      'Diseñador de lenguajes danés con un historial excepcional: creó <b>Turbo Pascal</b> y <b>Delphi</b> en sus inicios, y luego, en Microsoft, fue el arquitecto principal de <b>C#</b>, el lenguaje insignia de la plataforma .NET.',
      'Su obra más influyente en la web moderna es <b>TypeScript</b>: una extensión de JavaScript que le añade <b>tipos</b>, ayudando a detectar errores antes de ejecutar el código y a gestionar proyectos enormes. Se ha vuelto el estándar de facto para el desarrollo web serio a gran escala.',
      'Hejlsberg tiene un don raro: diseñar lenguajes que son a la vez potentes y agradables de usar, equilibrando rigor y pragmatismo. Pocas personas han moldeado tanto el día a día de los programadores en las últimas tres décadas, desde el escritorio hasta el navegador.'
    ] });

    cog.persona(cont, { slug: "chris-lattner", nombre: "Chris Lattner", color: C, etiqueta: "Swift · LLVM", meta: "n. 1978 · Informático (EE. UU.)", parrafos: [
      'Creó <b>LLVM</b>, una infraestructura de compiladores moderna y modular que se volvió fundamental en la industria: la usan Apple, Google y muchos lenguajes nuevos como cimiento para traducir código a distintas plataformas de forma eficiente.',
      'En Apple diseñó <b>Swift</b>, el lenguaje moderno para crear apps de iPhone y Mac, pensado para ser seguro, rápido y más amable que su predecesor Objective-C. Swift mostró cómo un lenguaje de sistemas podía ser también accesible para principiantes.',
      'Ha trabajado en la intersección de lenguajes e inteligencia artificial, buscando herramientas que hagan el desarrollo de IA más rápido y eficiente. Su carrera ejemplifica una figura clave pero poco visible: quien construye las herramientas con las que otros construyen todo lo demás.'
    ] });

    cog.persona(cont, { slug: "joe-armstrong", nombre: "Joe Armstrong", color: C, etiqueta: "Erlang · Concurrencia", meta: "1950–2019 · Informático británico", parrafos: [
      'Co-creó en los años 80, en Ericsson, el lenguaje <b>Erlang</b>, diseñado para un problema brutal: los sistemas telefónicos que <b>no pueden caerse nunca</b> y deben atender millones de llamadas simultáneas sin fallar.',
      'Erlang resolvió eso con una filosofía distinta: miles de procesos ligeros y aislados que se comunican por mensajes, de modo que si uno falla, los demás siguen. Su lema, “<b>deja que falle</b>”, propone recuperarse de errores en lugar de intentar evitarlos todos.',
      'Esas ideas sobre <b>concurrencia y tolerancia a fallos</b> influyeron en sistemas modernos que exigen enorme disponibilidad; el lenguaje Elixir y plataformas como WhatsApp (que usa Erlang) heredan su legado. Armstrong mostró que construir sistemas confiables requiere abrazar el fallo, no negarlo.'
    ] });

    cog.persona(cont, { slug: "rich-hickey", nombre: "Rich Hickey", color: C, etiqueta: "Clojure · Funcional", meta: "n. 1959 · Informático (EE. UU.)", parrafos: [
      'Creó <b>Clojure</b>, un dialecto moderno de Lisp que corre sobre la máquina virtual de Java. Su propuesta pone en el centro la <b>programación funcional</b> y la <b>inmutabilidad</b>: tratar los datos como valores que no cambian, lo que facilita razonar sobre programas concurrentes.',
      'Hickey es también un pensador influyente sobre el diseño de software. Su charla “<i>Simple Made Easy</i>” distingue entre lo <b>simple</b> (sin complejidades entrelazadas) y lo <b>fácil</b> (familiar), y argumenta que buscar lo primero —aunque cueste al principio— produce sistemas más mantenibles.',
      'Su filosofía va contra la corriente de la moda tecnológica: desconfía de la complejidad acumulada y aboga por diseñar con cuidado desde los fundamentos. Influyó en cómo muchos programadores modernos piensan sobre el estado, los datos y la gestión de la complejidad.'
    ] });

    cog.nota(cont, 'Serie <b>Personajes importantes en tecnología y computación</b>. Al terminar, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', C);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "Lenguaje de programación", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Lenguaje_de_programación", lang: "es" },
    { t: "Python (lenguaje de programación)", fuente: "Wikipedia en español", url: "https://es.wikipedia.org/wiki/Python", lang: "es" },
    { t: "History of programming languages", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/History_of_programming_languages", lang: "en" },
    { t: "SOLID (Liskov substitution principle)", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/SOLID", lang: "en" },
    { t: "Turing Award", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Turing_Award", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Quién fue la primera mujer en ganar el Premio Turing?", op: ["Barbara Liskov", "Frances Allen", "Ada Lovelace", "Grace Hopper"], ok: 1, porque: "Frances Allen, pionera de la optimización de compiladores, ganó el Turing en 2006: la primera mujer en recibirlo." },
    { p: "Python se volvió la lengua franca de la IA y la ciencia de datos sobre todo por…", op: ["Su velocidad extrema", "Su legibilidad y su ecosistema (NumPy, pandas, PyTorch)", "Correr en el navegador", "Ser el más antiguo"], ok: 1, porque: "Guido van Rossum priorizó la legibilidad; junto a sus bibliotecas, eso lo hizo el idioma por excelencia del machine learning." },
    { p: "JavaScript es notable porque…", op: ["Lo creó IBM en los 50", "Se hizo en 10 días y hoy mueve casi todo lo interactivo de la web", "Solo corre en servidores", "Reemplazó a C++"], ok: 1, porque: "Brendan Eich lo creó en diez días en 1995; hoy es el lenguaje más usado y el único nativo de todos los navegadores." },
    { p: "El Principio de Sustitución de Liskov es clave en…", op: ["Las redes", "El diseño orientado a objetos (la “L” de SOLID)", "La criptografía", "La compresión de datos"], ok: 1, porque: "Un subtipo debe poder usarse donde se espera su tipo base sin romper el programa: regla central del buen diseño OO." }
  ];

  E.registrar({
    id: "fund-computo-personajes-c-lenguajes",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 8.3,
    titulo: "Personajes en TyC · C. Lenguajes",
    sub: "Ingeniería de software, compiladores y lenguajes",
    resumen: "Quienes inventaron los idiomas de la programación: Allen, Liskov, Backus, Wirth, Stroustrup, Wall, van Rossum, Gosling, Matsumoto, Lerdorf, Eich, Hejlsberg, Lattner, Armstrong y Hickey.",
    chips: [{ k: "Serie", v: "Personajes en TyC" }, { k: "Bloque", v: "C · Lenguajes" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-personajes-c-lenguajes", QUIZ)
    }
  });
})();
