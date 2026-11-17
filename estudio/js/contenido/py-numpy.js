/* ============================================================
   Python · Herramientas — Tema 6: NumPy
   Lección viva: arrays, operaciones vectorizadas y agregaciones.
   Requiere cargar el paquete numpy (lo hace la celda automáticamente).
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, h = E.h, ui = E.ui;

  function prosa(cont, html) { cont.append(h("div", { class: "prosa", html: html })); }
  function callout(cont, html, color) {
    cont.append(h("div", { class: "lz-callout", style: color ? { "--c": color } : null,
      html: '<span class="ic"><svg viewBox="0 0 24 24"><path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg></span><p>' + html + '</p>' }));
  }
  function tryHint(cont) { cont.append(h("p", { class: "lz-try" }, "▶ Pruébalo: edita y ejecuta")); }
  function celda(cont, code) { ui.PyCell(cont, { code: code }); }

  function leccion(cont) {
    prosa(cont,
      '<h2>NumPy</h2>' +
      '<p><b>NumPy</b> es la base del cómputo numérico en Python y el cimiento de la ciencia de datos. Su protagonista es el <b>array</b>: como una lista, pero mucho más rápido y pensado para operar con muchos números a la vez. Es tu primer paso hacia pandas y el machine learning.</p>');
    callout(cont, 'La primera celda que uses <code>import numpy</code> tarda un poco más: el navegador descarga el paquete. Después, las demás celdas van rápido.', 'var(--azul)');

    prosa(cont, '<h3>1 · Crear un array</h3><p>Se importa como <code>np</code> por convención. Un array se crea desde una lista, o con generadores como <code>arange</code>, <code>zeros</code> y <code>ones</code>.</p>');
    tryHint(cont);
    celda(cont,
      'import numpy as np\n\n' +
      'a = np.array([1, 2, 3, 4])\n' +
      'print(a)\n' +
      'print(np.arange(0, 10, 2))   # de 0 a 8, paso 2\n' +
      'print(np.zeros(3))            # [0. 0. 0.]\n' +
      'print(np.ones(3))            # [1. 1. 1.]');

    prosa(cont, '<h3>2 · Operaciones vectorizadas</h3><p>La gran ventaja: operas sobre <b>todo</b> el array de una vez, sin bucles. Es más corto y mucho más rápido.</p>');
    tryHint(cont);
    celda(cont,
      'import numpy as np\n\n' +
      'precios = np.array([100, 200, 350])\n' +
      'con_iva = precios * 1.16     # multiplica cada elemento\n' +
      'print(con_iva)\n\n' +
      'a = np.array([1, 2, 3])\n' +
      'b = np.array([10, 20, 30])\n' +
      'print(a + b)                 # suma elemento a elemento');
    callout(cont, 'Con listas normales, <code>[1,2,3] * 1.16</code> no funciona así. NumPy entiende la operación como "a cada número". Eso es <b>vectorización</b>.');

    prosa(cont, '<h3>3 · Indexar y rebanar</h3><p>Igual que las listas: índices desde 0, slicing con <code>:</code>, y además <b>máscaras</b> booleanas para filtrar.</p>');
    celda(cont,
      'import numpy as np\n\n' +
      'datos = np.array([5, 12, 8, 20, 3, 15])\n' +
      'print(datos[0], datos[-1])    # 5 20\n' +
      'print(datos[1:4])             # [12  8 20]\n\n' +
      '# mascara: quedarse con los mayores a 10\n' +
      'print(datos[datos > 10])      # [12 20 15]');

    prosa(cont, '<h3>4 · Agregaciones</h3><p>Resúmenes en una línea: <code>sum</code>, <code>mean</code> (promedio), <code>max</code>, <code>min</code>, <code>std</code> (desviación estándar).</p>');
    celda(cont,
      'import numpy as np\n\n' +
      'calificaciones = np.array([8.5, 9.0, 7.5, 10.0, 6.5])\n' +
      'print("promedio:", calificaciones.mean())\n' +
      'print("maxima:", calificaciones.max())\n' +
      'print("minima:", calificaciones.min())\n' +
      'print("suma:", calificaciones.sum())');

    prosa(cont, '<h3>5 · Arrays 2D (matrices)</h3><p>Un array puede tener varias dimensiones. <code>shape</code> te dice su forma (filas, columnas).</p>');
    celda(cont,
      'import numpy as np\n\n' +
      'm = np.array([[1, 2, 3],\n' +
      '              [4, 5, 6]])\n' +
      'print("forma:", m.shape)      # (2, 3)\n' +
      'print("elemento [1][2]:", m[1, 2])   # 6\n' +
      'print("promedio total:", m.mean())');

    prosa(cont, '<h3>6 · Tu turno</h3><p>Dada la lista de temperaturas, crea un array y calcula su <b>promedio</b>. Pista: <code>np.array(...)</code> y <code>.mean()</code>.</p>');
    celda(cont,
      'import numpy as np\n\n' +
      'temps = [22, 25, 19, 30, 28]\n' +
      'arr = \n' +
      'print("Promedio:", arr.mean())');
    callout(cont, 'Debe dar <code>24.8</code>. Cuando lo tengas, pasa al <b>Quiz</b>.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Cuál es el objeto central de NumPy?", op: ["El diccionario", "El array", "La tupla", "El DataFrame"], ok: 1, porque: "El <b>array</b> (ndarray) es el corazón de NumPy: como una lista, pero rápido y pensado para cálculo numérico. (El DataFrame es de pandas.)" },
    { p: "¿Qué hace <code>np.array([1, 2, 3]) * 2</code>?", op: ["Repite la lista: [1,2,3,1,2,3]", "Multiplica cada elemento: [2, 4, 6]", "Da error", "Solo multiplica el primero"], ok: 1, porque: "NumPy aplica la operación a <b>cada elemento</b> (vectorización): [2, 4, 6]. Con listas normales el <code>*</code> repetiría." },
    { p: "¿Qué devuelve <code>datos[datos > 10]</code>?", op: ["Un error", "Los elementos mayores a 10", "El índice del primer mayor a 10", "True o False"], ok: 1, porque: "Es una <b>máscara booleana</b>: filtra y devuelve solo los elementos que cumplen la condición." },
    { p: "¿Cómo obtienes el promedio de un array <code>a</code>?", op: ["<code>a.avg()</code>", "<code>a.mean()</code>", "<code>average(a)</code>", "<code>a.promedio()</code>"], ok: 1, porque: "El método es <code>.mean()</code>. NumPy también trae <code>sum</code>, <code>max</code>, <code>min</code>, <code>std</code>." },
    { p: "Para una matriz 2D, ¿qué te dice <code>m.shape</code>?", op: ["El número total de elementos", "La forma: (filas, columnas)", "El valor máximo", "El tipo de dato"], ok: 1, porque: "<code>shape</code> describe la <b>forma</b> del array; en 2D es <code>(filas, columnas)</code>." }
  ];

  E.registrar({
    id: "py-numpy",
    grupo: "py-herramientas",
    lenguaje: "py",
    orden: 6,
    titulo: "NumPy",
    sub: "Python · Herramientas",
    resumen: "Arrays, operaciones vectorizadas, indexado con máscaras y agregaciones — la base del cómputo numérico y la ciencia de datos, ejecutable en vivo.",
    chips: [{ k: "Nivel", v: "Intermedio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-numpy", QUIZ)
    }
  });
})();
