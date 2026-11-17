/* ============================================================
   Python · Fundamentos — Tema 1: Tipos, variables y operadores
   Lección viva: prosa pedagógica + celdas ejecutables (Pyodide) + quiz.
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
      '<h2>Tipos, variables y operadores</h2>' +
      '<p>Esta es una lección <b>viva</b>: cada bloque de código de abajo lo puedes <b>editar y ejecutar aquí mismo</b>, como en un cuaderno de Jupyter. No necesitas instalar nada.</p>');
    callout(cont, 'La <b>primera</b> vez que ejecutes, Python tarda unos segundos en cargar en tu navegador. Después, cada ejecución es inmediata. Tip: <b>Ctrl/Cmd + Enter</b> ejecuta la celda.', 'var(--azul)');

    prosa(cont, '<h3>1 · Los cuatro tipos básicos</h3><p>Todo valor en Python tiene un <b>tipo</b>. Con <code>type()</code> puedes preguntárselo. Los que más usarás al empezar son cuatro:</p>' +
      '<ul><li><b>int</b> — enteros: <code>21</code></li><li><b>float</b> — decimales: <code>850.50</code></li><li><b>str</b> — texto (entre comillas): <code>"María"</code></li><li><b>bool</b> — verdadero/falso: <code>True</code> / <code>False</code></li></ul>');
    tryHint(cont);
    celda(cont,
      'edad = 21\n' +
      'precio = 850.50\n' +
      'nombre = "Maria Garcia"\n' +
      'es_estudiante = True\n\n' +
      'print(type(edad), type(precio), type(nombre), type(es_estudiante))\n' +
      'print(nombre, "tiene", edad, "anios")');

    prosa(cont, '<h3>2 · Variables y tipado dinámico</h3><p>Una variable es un <b>nombre</b> que apunta a un valor. En Python no declaras el tipo: se infiere, y una misma variable puede cambiar de tipo (tipado <b>dinámico</b>).</p>');
    celda(cont,
      'x = 10\n' +
      'print(x, type(x))\n\n' +
      'x = "ahora soy texto"\n' +
      'print(x, type(x))\n\n' +
      '# Asignacion multiple\n' +
      'a, b, c = 1, 2, 3\n' +
      'print(a, b, c)');
    callout(cont, 'Nombres: usa minúsculas y guiones bajos (<code>precio_con_iva</code>), empieza con letra, y evita palabras reservadas (<code>for</code>, <code>if</code>, <code>class</code>…).');

    prosa(cont, '<h3>3 · Operadores aritméticos</h3><p>Los esperados, más tres útiles: <code>/</code> división real, <code>//</code> división entera, <code>%</code> residuo y <code>**</code> potencia.</p>');
    tryHint(cont);
    celda(cont,
      'a = 17\n' +
      'b = 5\n' +
      'print("suma", a + b)\n' +
      'print("division", a / b)      # 3.4\n' +
      'print("entera ", a // b)      # 3\n' +
      'print("residuo", a % b)       # 2\n' +
      'print("potencia", a ** 2)     # 289');

    prosa(cont, '<h3>4 · Comparación y lógica</h3><p>Las comparaciones (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>) devuelven un <b>bool</b>. Con <code>and</code>, <code>or</code> y <code>not</code> combinas condiciones.</p>');
    celda(cont,
      'edad = 21\n' +
      'tiene_credencial = True\n\n' +
      'print(edad >= 18)                      # True\n' +
      'print(edad >= 18 and tiene_credencial) # True\n' +
      'print(edad < 18 or tiene_credencial)   # True\n' +
      'print(not tiene_credencial)            # False');

    prosa(cont, '<h3>5 · Conversiones de tipo</h3><p>Convierte entre tipos con <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>. Clave cuando lees texto que representa números.</p>');
    celda(cont,
      'texto = "42"\n' +
      'print(texto + "8")        # "428"  (concatena)\n' +
      'print(int(texto) + 8)      # 50     (suma de verdad)\n' +
      'print(float("3.14") * 2)   # 6.28');
    callout(cont, 'Si conviertes algo imposible, Python lanza un error. Edita la celda y prueba <code>int("hola")</code>: verás un <b>ValueError</b>. Equivocarse aquí es parte de aprender.', 'var(--ambar)');

    prosa(cont, '<h3>6 · <code>print()</code>, f-strings e <code>input()</code></h3><p>Las <b>f-strings</b> (texto con <code>f"..."</code>) insertan variables entre llaves y hasta dan formato: <code>{promedio:.2f}</code> muestra 2 decimales.</p>');
    celda(cont,
      'nombre = "Carlos"\n' +
      'promedio = 8.567\n' +
      'print(f"Estudiante: {nombre}")\n' +
      'print(f"Promedio: {promedio:.2f}")   # 8.57\n' +
      'print(f"Doble: {promedio * 2}")');
    callout(cont, '<code>input()</code> también funciona aquí: te lo preguntará con una ventanita. Pruébalo abajo.');
    celda(cont,
      'nombre = input("Como te llamas? ")\n' +
      'print(f"Hola, {nombre}! Bienvenido a Python.")');

    prosa(cont, '<h3>7 · Tu turno</h3><p>Un producto cuesta <b>$850.50</b> antes de IVA (16&nbsp;%). Completa el código para mostrar el precio final con 2 decimales. Si te atoras, usa lo que viste arriba.</p>');
    celda(cont,
      '# Pista: precio_final = precio * (1 + iva)\n' +
      'precio = 850.50\n' +
      'iva = 0.16\n\n' +
      '# escribe tu solucion y ejecuta:\n' +
      'precio_final = \n' +
      'print(f"Precio con IVA: ${precio_final:.2f}")');
    callout(cont, 'Cuando lo resuelvas, deberías ver <code>Precio con IVA: $986.58</code>. Luego pasa al <b>Quiz</b> para fijar lo aprendido.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Qué imprime <code>type(850.50)</code>?", op: ["&lt;class 'int'&gt;", "&lt;class 'float'&gt;", "&lt;class 'str'&gt;", "&lt;class 'double'&gt;"], ok: 1, porque: "Tiene decimales, así que es un <b>float</b>. Python no usa <code>double</code>: su tipo decimal se llama float." },
    { p: "¿Cuánto vale <code>17 // 5</code>?", op: ["3.4", "3", "2", "4"], ok: 1, porque: "<code>//</code> es la división <b>entera</b>: se queda con la parte entera del cociente (3). Para 3.4 usarías <code>/</code>." },
    { p: "¿Qué muestra <code>print(\"7\" + \"3\")</code>?", op: ["10", "73", "Error", "21"], ok: 1, porque: "Ambos son <b>texto</b> (str). El <code>+</code> entre cadenas las <b>concatena</b>: \"73\". Para sumar como números: <code>int(\"7\") + int(\"3\")</code>." },
    { p: "Con <code>edad = 15</code>, ¿qué da <code>edad &gt;= 18 and True</code>?", op: ["True", "False", "15", "Error"], ok: 1, porque: "<code>edad &gt;= 18</code> es <b>False</b>, y <code>False and</code> cualquier cosa es <b>False</b>: basta con que una parte del <code>and</code> falle." },
    { p: "Si <code>p = 3.14159</code>, ¿qué imprime <code>f\"{p:.2f}\"</code>?", op: ["3.14159", "3.14", "3.1", "{p:.2f}"], ok: 1, porque: "<code>:.2f</code> formatea el número con <b>2 decimales</b>: 3.14. Las f-strings son ideales para mostrar resultados limpios." }
  ];

  E.registrar({
    id: "py-tipos",
    grupo: "py-fundamentos",
    lenguaje: "py",
    orden: 1,
    titulo: "Tipos, variables y operadores",
    sub: "Python · Fundamentos",
    resumen: "Los tipos básicos (int, float, str, bool), variables, operadores y f-strings — con código que ejecutas aquí mismo.",
    chips: [{ k: "Nivel", v: "Inicio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-tipos", QUIZ)
    }
  });
})();
