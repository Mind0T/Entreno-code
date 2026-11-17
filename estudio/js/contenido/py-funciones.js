/* ============================================================
   Python · Fundamentos — Tema 4: Funciones
   Lección viva: def, parámetros, return, argumentos y lambda.
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
      '<h2>Funciones</h2>' +
      '<p>Una <b>función</b> es un bloque de código con nombre que ejecutas cuando quieras. Te deja <b>reutilizar</b> lógica sin repetirla y leer el programa como una receta: "calcula el promedio", "manda el correo". Corre cada celda para verlas trabajar.</p>');

    prosa(cont, '<h3>1 · Definir y llamar: <code>def</code></h3><p>Se define con <code>def</code>, recibe <b>parámetros</b> entre paréntesis y devuelve un resultado con <code>return</code>. Llamarla es escribir su nombre con los valores (argumentos).</p>');
    tryHint(cont);
    celda(cont,
      'def saludar(nombre):\n' +
      '    return f"Hola, {nombre}!"\n\n' +
      '# llamarla:\n' +
      'print(saludar("Maria"))\n' +
      'print(saludar("Carlos"))');
    callout(cont, 'La misma función sirve para infinitos nombres. Esa es toda la idea: escribirla una vez, usarla muchas.', 'var(--azul)');

    prosa(cont, '<h3>2 · <code>return</code> vs <code>print</code></h3><p>Son distintos: <code>print</code> <b>muestra</b> en pantalla; <code>return</code> <b>entrega</b> un valor que puedes guardar y seguir usando. Una función sin <code>return</code> devuelve <code>None</code>.</p>');
    celda(cont,
      'def cuadrado(n):\n' +
      '    return n * n\n\n' +
      'resultado = cuadrado(5)   # lo guardo\n' +
      'print(resultado + 1)       # y lo sigo usando: 26');

    prosa(cont, '<h3>3 · Varios parámetros y valores por defecto</h3><p>Una función puede recibir varios parámetros. Si das un <b>valor por defecto</b>, ese parámetro se vuelve opcional.</p>');
    tryHint(cont);
    celda(cont,
      'def precio_final(precio, iva=0.16):\n' +
      '    return precio * (1 + iva)\n\n' +
      'print(precio_final(100))         # usa iva por defecto: 116.0\n' +
      'print(precio_final(100, 0.08))   # iva de 8%: 108.0');

    prosa(cont, '<h3>4 · Argumentos por nombre</h3><p>Puedes pasar los argumentos <b>nombrándolos</b>, sin importar el orden. Hace el código más legible.</p>');
    celda(cont,
      'def perfil(nombre, edad, ciudad):\n' +
      '    return f"{nombre}, {edad}, {ciudad}"\n\n' +
      '# por nombre, en cualquier orden:\n' +
      'print(perfil(edad=21, ciudad="CDMX", nombre="Ana"))');

    prosa(cont, '<h3>5 · Funciones <code>lambda</code></h3><p>Una <b>lambda</b> es una función diminuta de una sola línea, útil para cosas rápidas (por ejemplo, ordenar por un criterio).</p>');
    celda(cont,
      'doble = lambda x: x * 2\n' +
      'print(doble(7))   # 14\n\n' +
      '# ordenar palabras por longitud:\n' +
      'palabras = ["python", "c", "java"]\n' +
      'palabras.sort(key=lambda p: len(p))\n' +
      'print(palabras)   # ["c", "java", "python"]');

    prosa(cont, '<h3>6 · Tu turno</h3><p>Escribe una función <code>es_par</code> que reciba un número y devuelva <code>True</code> si es par. Pista: un número es par si <code>n % 2 == 0</code>.</p>');
    celda(cont,
      'def es_par(n):\n' +
      '    # devuelve True si n es par\n' +
      '    return \n\n' +
      'print(es_par(4))   # True\n' +
      'print(es_par(7))   # False');
    callout(cont, 'Si <code>es_par(4)</code> da <code>True</code> y <code>es_par(7)</code> da <code>False</code>, lo lograste. Pasa al <b>Quiz</b>.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Con qué palabra clave se define una función en Python?", op: ["<code>function</code>", "<code>def</code>", "<code>func</code>", "<code>define</code>"], ok: 1, porque: "Se usa <code>def</code> seguido del nombre y los parámetros entre paréntesis." },
    { p: "¿Qué diferencia hay entre <code>return</code> y <code>print</code>?", op: ["Son lo mismo", "<code>print</code> muestra en pantalla; <code>return</code> entrega un valor usable", "<code>return</code> muestra; <code>print</code> entrega", "Ninguno devuelve nada"], ok: 1, porque: "<code>print</code> solo <b>muestra</b>; <code>return</code> <b>entrega</b> un valor que puedes guardar y seguir usando." },
    { p: "Con <code>def f(x, y=10):</code>, ¿qué pasa al llamar <code>f(5)</code>?", op: ["Da error: falta y", "y toma su valor por defecto, 10", "y vale 0", "x e y valen 5"], ok: 1, porque: "<code>y</code> tiene <b>valor por defecto</b> (10), así que es opcional: <code>f(5)</code> usa x=5, y=10." },
    { p: "¿Qué devuelve una función que no tiene <code>return</code>?", op: ["0", "Una cadena vacía", "<code>None</code>", "Da error"], ok: 2, porque: "Sin <code>return</code>, la función devuelve <code>None</code> (ausencia de valor)." },
    { p: "¿Para qué sirve una <code>lambda</code>?", op: ["Para crear clases", "Para una función corta de una sola línea", "Para importar módulos", "Para manejar errores"], ok: 1, porque: "Una <b>lambda</b> es una función anónima de una línea, útil para tareas rápidas como un criterio de ordenamiento." }
  ];

  E.registrar({
    id: "py-funciones",
    grupo: "py-fundamentos",
    lenguaje: "py",
    orden: 4,
    titulo: "Funciones",
    sub: "Python · Fundamentos",
    resumen: "def, parámetros, return, valores por defecto, argumentos por nombre y lambdas — reutilizar lógica, ejecutando código real.",
    chips: [{ k: "Nivel", v: "Inicio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-funciones", QUIZ)
    }
  });
})();
