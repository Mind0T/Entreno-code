/* ============================================================
   Python · Fundamentos — Tema 2: Control de flujo
   Lección viva: condicionales, bucles y control (break/continue).
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
      '<h2>Control de flujo</h2>' +
      '<p>Hasta ahora el código corría de arriba a abajo, una línea tras otra. El <b>control de flujo</b> le da decisiones y repeticiones: ejecutar algo <b>solo si</b> se cumple una condición, o <b>repetirlo</b> muchas veces. Todas las celdas de abajo las puedes correr aquí mismo.</p>');
    callout(cont, 'En Python los bloques se marcan con <b>sangría</b> (indentación), no con llaves. Cuatro espacios es el estándar. Si la sangría no cuadra, Python avisa con un <code>IndentationError</code>.', 'var(--azul)');

    prosa(cont, '<h3>1 · <code>if</code> / <code>elif</code> / <code>else</code></h3><p>La estructura condicional más básica. Python evalúa de arriba a abajo y entra en el <b>primer</b> bloque cuya condición sea verdadera.</p>');
    tryHint(cont);
    celda(cont,
      'calif = 8.5\n\n' +
      'if calif >= 9:\n' +
      '    print("Excelente")\n' +
      'elif calif >= 6:\n' +
      '    print("Aprobado")\n' +
      'else:\n' +
      '    print("Reprobado")');
    callout(cont, 'Cambia <code>calif</code> a 9.2 o a 5 y vuelve a ejecutar: verás cómo entra en otra rama. Solo se ejecuta <b>una</b> de ellas.');

    prosa(cont, '<h3>2 · El bucle <code>for</code></h3><p>Recorre una secuencia elemento por elemento. Con <code>range(n)</code> generas los números de 0 a n−1; con <code>range(a, b)</code> de a hasta b−1.</p>');
    tryHint(cont);
    celda(cont,
      '# Recorrer numeros\n' +
      'for i in range(1, 6):\n' +
      '    print("vuelta", i)\n\n' +
      '# Recorrer una lista de texto\n' +
      'for fruta in ["manzana", "pera", "uva"]:\n' +
      '    print(fruta.upper())');

    prosa(cont, '<h3>3 · El bucle <code>while</code></h3><p>Repite <b>mientras</b> una condición siga siendo verdadera. Úsalo cuando no sabes de antemano cuántas vueltas darás. Cuida siempre que la condición llegue a hacerse falsa, o el bucle no terminará.</p>');
    celda(cont,
      'cuenta = 3\n' +
      'while cuenta > 0:\n' +
      '    print("despegue en", cuenta)\n' +
      '    cuenta = cuenta - 1\n' +
      'print("¡Despegue!")');
    callout(cont, 'La línea <code>cuenta = cuenta - 1</code> es la que acerca el final. Si la quitas, el bucle sería infinito — bórrala mentalmente y verás por qué importa.', 'var(--ambar)');

    prosa(cont, '<h3>4 · <code>break</code> y <code>continue</code></h3><p>Dentro de un bucle: <code>break</code> lo <b>corta</b> por completo; <code>continue</code> <b>salta</b> a la siguiente vuelta sin ejecutar el resto.</p>');
    celda(cont,
      'for n in range(1, 11):\n' +
      '    if n == 7:\n' +
      '        print("encontre el 7, me detengo")\n' +
      '        break\n' +
      '    if n % 2 == 0:\n' +
      '        continue   # salta los pares\n' +
      '    print("impar:", n)');

    prosa(cont, '<h3>5 · Combinando todo</h3><p>Un condicional dentro de un bucle es el pan de cada día. Aquí clasificamos una lista de temperaturas.</p>');
    celda(cont,
      'temperaturas = [12, 28, 35, 19, 40]\n\n' +
      'for t in temperaturas:\n' +
      '    if t >= 35:\n' +
      '        estado = "calor extremo"\n' +
      '    elif t >= 20:\n' +
      '        estado = "templado"\n' +
      '    else:\n' +
      '        estado = "fresco"\n' +
      '    print(f"{t}C -> {estado}")');

    prosa(cont, '<h3>6 · Tu turno</h3><p>Completa el código para contar <b>cuántos números del 1 al 20 son múltiplos de 3</b>. Pista: usa <code>%</code> y una variable que vaya sumando.</p>');
    celda(cont,
      'total = 0\n' +
      'for n in range(1, 21):\n' +
      '    # si n es multiplo de 3, suma 1 a total\n' +
      '    if :\n' +
      '        total = \n' +
      'print("Multiplos de 3:", total)');
    callout(cont, 'La respuesta correcta es <code>6</code> (3, 6, 9, 12, 15, 18). Cuando lo logres, pasa al <b>Quiz</b>.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Cómo marca Python que un bloque está dentro de un <code>if</code> o un <code>for</code>?", op: ["Con llaves <code>{ }</code>", "Con la sangría (indentación)", "Con un <code>;</code> al final", "Con la palabra <code>end</code>"], ok: 1, porque: "Python usa la <b>sangría</b> para delimitar bloques; no hay llaves ni <code>end</code>. Lo estándar son 4 espacios." },
    { p: "¿Cuántas ramas se ejecutan en un <code>if / elif / else</code> cuando varias condiciones son verdaderas?", op: ["Todas las verdaderas", "Solo la primera verdadera", "Solo la última", "Ninguna"], ok: 1, porque: "Entra únicamente en la <b>primera</b> condición verdadera (de arriba a abajo) y se salta el resto." },
    { p: "¿Qué imprime <code>for i in range(1, 4): print(i)</code>?", op: ["1 2 3 4", "1 2 3", "0 1 2 3", "0 1 2"], ok: 1, porque: "<code>range(1, 4)</code> va de 1 hasta <b>3</b> (el límite superior no se incluye): 1, 2, 3." },
    { p: "Dentro de un bucle, ¿qué hace <code>continue</code>?", op: ["Corta el bucle por completo", "Salta a la siguiente vuelta sin ejecutar el resto", "Reinicia el bucle desde cero", "Repite la vuelta actual"], ok: 1, porque: "<code>continue</code> salta a la <b>siguiente iteración</b>. El que corta todo el bucle es <code>break</code>." },
    { p: "¿Qué riesgo tiene este bucle? <code>while x > 0: print(x)</code>", op: ["Ninguno, está bien", "Es infinito: nada cambia x", "Da un error de sintaxis", "Solo corre una vez"], ok: 1, porque: "Nunca se modifica <code>x</code>, así que la condición siempre es verdadera: es un <b>bucle infinito</b>. Faltaría algo como <code>x = x - 1</code>." }
  ];

  E.registrar({
    id: "py-control",
    grupo: "py-fundamentos",
    lenguaje: "py",
    orden: 2,
    titulo: "Control de flujo",
    sub: "Python · Fundamentos",
    resumen: "Condicionales (if/elif/else) y bucles (for, while) con break y continue — decisiones y repeticiones, ejecutando código real.",
    chips: [{ k: "Nivel", v: "Inicio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-control", QUIZ)
    }
  });
})();
