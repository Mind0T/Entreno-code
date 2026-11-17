/* ============================================================
   Python · Fundamentos — Tema 3: Estructuras de datos
   Lección viva: listas, tuplas, diccionarios y conjuntos.
   Reorganizado por temas a partir de los notebooks del curso.
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
      '<h2>Estructuras de datos</h2>' +
      '<p>Una variable guarda <b>un</b> valor; estas estructuras guardan <b>colecciones</b>. Python trae cuatro de uso diario: <b>listas</b>, <b>tuplas</b>, <b>diccionarios</b> y <b>conjuntos</b>. Cada una brilla en una situación distinta. Corre cada celda para verlas en acción.</p>');

    prosa(cont, '<h3>1 · Listas <code>[ ]</code></h3><p>Ordenadas y <b>mutables</b> (puedes cambiarlas). Se indexan desde <b>0</b>, y los índices negativos cuentan desde el final.</p>');
    tryHint(cont);
    celda(cont,
      'frutas = ["manzana", "pera", "uva"]\n\n' +
      'print(frutas[0])      # primera: manzana\n' +
      'print(frutas[-1])     # ultima: uva\n' +
      'print(len(frutas))    # cuantas: 3\n\n' +
      'frutas.append("kiwi") # agregar al final\n' +
      'frutas[1] = "mango"   # reemplazar\n' +
      'print(frutas)');
    callout(cont, 'El <b>rebanado</b> (slicing) saca sub-listas: <code>frutas[0:2]</code> te da los dos primeros. Pruébalo agregando <code>print(frutas[0:2])</code>.');

    prosa(cont, '<h3>2 · Tuplas <code>( )</code></h3><p>Como listas, pero <b>inmutables</b>: una vez creadas no cambian. Ideales para datos que no deben moverse (coordenadas, un registro fijo). Y permiten <b>desempaque</b>.</p>');
    celda(cont,
      'punto = (10, 20)\n' +
      'x, y = punto          # desempaque\n' +
      'print("x =", x, "y =", y)\n\n' +
      '# intentar cambiarla da error (descomenta para verlo):\n' +
      '# punto[0] = 99');
    callout(cont, 'Quita el <code>#</code> de la última línea y ejecuta: verás un <code>TypeError</code>. Esa rigidez es justo lo que las hace útiles cuando un dato no debe alterarse.', 'var(--ambar)');

    prosa(cont, '<h3>3 · Diccionarios <code>{clave: valor}</code></h3><p>Guardan pares <b>clave → valor</b>. En lugar de buscar por posición, buscas por un nombre. Perfectos para representar un objeto con atributos.</p>');
    tryHint(cont);
    celda(cont,
      'alumno = {\n' +
      '    "nombre": "Maria",\n' +
      '    "edad": 21,\n' +
      '    "promedio": 9.2\n' +
      '}\n\n' +
      'print(alumno["nombre"])      # Maria\n' +
      'alumno["semestre"] = 5        # agregar clave\n\n' +
      'for clave, valor in alumno.items():\n' +
      '    print(clave, "->", valor)');

    prosa(cont, '<h3>4 · Conjuntos <code>set</code></h3><p>Colecciones <b>sin orden</b> y <b>sin duplicados</b>. Útiles para quedarte con elementos únicos o comparar grupos (unión, intersección).</p>');
    celda(cont,
      'numeros = [1, 2, 2, 3, 3, 3, 4]\n' +
      'unicos = set(numeros)\n' +
      'print(unicos)                 # {1, 2, 3, 4}\n\n' +
      'a = {1, 2, 3}\n' +
      'b = {3, 4, 5}\n' +
      'print("comunes:", a & b)      # interseccion: {3}\n' +
      'print("todos:", a | b)        # union: {1,2,3,4,5}');

    prosa(cont, '<h3>5 · ¿Cuál uso?</h3>' +
      '<ul>' +
      '<li><b>Lista</b> — una secuencia que cambia: una fila, un historial.</li>' +
      '<li><b>Tupla</b> — datos fijos que van juntos: un punto (x, y).</li>' +
      '<li><b>Diccionario</b> — buscar por nombre: un registro con campos.</li>' +
      '<li><b>Conjunto</b> — valores únicos o comparar grupos.</li>' +
      '</ul>');

    prosa(cont, '<h3>6 · Tu turno</h3><p>Tienes una lista con repetidos. Completa el código para imprimir <b>cuántos valores distintos</b> hay. Pista: conviértela a <code>set</code> y usa <code>len()</code>.</p>');
    celda(cont,
      'votos = ["si", "no", "si", "si", "no", "tal vez"]\n' +
      '# cuenta cuantas opciones distintas se votaron\n' +
      'distintos = \n' +
      'print("Opciones distintas:", distintos)');
    callout(cont, 'Debe dar <code>3</code> (si, no, tal vez). Cuando lo tengas, pasa al <b>Quiz</b> para cerrar el tema.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Qué índice tiene el <b>primer</b> elemento de una lista en Python?", op: ["1", "0", "-1", "El del tamaño de la lista"], ok: 1, porque: "Python indexa desde <b>0</b>: <code>lista[0]</code> es el primero. <code>lista[-1]</code> es el último." },
    { p: "¿Cuál es la diferencia clave entre una lista y una tupla?", op: ["La tupla solo guarda números", "La tupla es inmutable; la lista se puede modificar", "La lista es inmutable; la tupla no", "No hay diferencia"], ok: 1, porque: "La <b>tupla</b> no se puede cambiar una vez creada (inmutable); la <b>lista</b> sí se puede modificar." },
    { p: "Con <code>d = {\"a\": 1, \"b\": 2}</code>, ¿cómo obtienes el valor 2?", op: ["<code>d[1]</code>", "<code>d[\"b\"]</code>", "<code>d.b</code>", "<code>d(2)</code>"], ok: 1, porque: "En un diccionario accedes por su <b>clave</b>: <code>d[\"b\"]</code> devuelve 2. No se accede por posición." },
    { p: "¿Qué imprime <code>set([1, 1, 2, 2, 3])</code>?", op: ["[1, 1, 2, 2, 3]", "{1, 2, 3}", "[1, 2, 3]", "Error"], ok: 1, porque: "Un <b>conjunto</b> elimina los duplicados y no tiene orden fijo: <code>{1, 2, 3}</code>." },
    { p: "Quieres guardar un registro de alumno con nombre, edad y promedio buscables por campo. ¿Qué estructura es la natural?", op: ["Una lista", "Un diccionario", "Un conjunto", "Una tupla de una celda"], ok: 1, porque: "Un <b>diccionario</b> guarda pares clave→valor, así buscas por el nombre del campo (<code>alumno[\"edad\"]</code>) en vez de por posición." }
  ];

  E.registrar({
    id: "py-estructuras",
    grupo: "py-fundamentos",
    lenguaje: "py",
    orden: 3,
    titulo: "Estructuras de datos",
    sub: "Python · Fundamentos",
    resumen: "Listas, tuplas, diccionarios y conjuntos: cuándo usar cada colección, con código que corres y verificas al instante.",
    chips: [{ k: "Nivel", v: "Inicio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-estructuras", QUIZ)
    }
  });
})();
