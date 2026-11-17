/* ============================================================
   Python · Herramientas — Tema 7: Expresiones regulares
   Lección viva: el módulo re, búsqueda, metacaracteres, grupos y sub.
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
      '<h2>Expresiones regulares</h2>' +
      '<p>Una <b>expresión regular</b> (regex) es un patrón para buscar texto: validar un correo, extraer todos los números de un documento, encontrar fechas. Viven en el módulo <code>re</code> de la librería estándar — no necesitas instalar nada. Corre cada celda para verlas.</p>');

    prosa(cont, '<h3>1 · Buscar un patrón</h3><p><code>re.search</code> busca el patrón en cualquier parte del texto y devuelve una coincidencia (o <code>None</code>). Los patrones se escriben como <b>raw strings</b>: <code>r"..."</code>.</p>');
    tryHint(cont);
    celda(cont,
      'import re\n\n' +
      'texto = "Mi pedido es el 2024630533"\n' +
      'm = re.search(r"\\d+", texto)   # \\d+ = uno o mas digitos\n' +
      'if m:\n' +
      '    print("encontrado:", m.group())   # 2024630533\n' +
      'else:\n' +
      '    print("sin coincidencia")');

    prosa(cont, '<h3>2 · Metacaracteres básicos</h3>' +
      '<ul>' +
      '<li><code>\\d</code> dígito · <code>\\w</code> letra/dígito/_ · <code>\\s</code> espacio</li>' +
      '<li><code>.</code> cualquier carácter</li>' +
      '<li><code>+</code> uno o más · <code>*</code> cero o más · <code>?</code> opcional</li>' +
      '<li><code>[a-z]</code> un rango · <code>^</code> inicio · <code>$</code> final</li>' +
      '</ul>');
    celda(cont,
      'import re\n\n' +
      'print(re.search(r"\\w+@\\w+\\.\\w+", "esc: ana@correo.com"))\n' +
      'print(re.search(r"[A-Z]\\w+", "hola Mundo"))   # palabra con Mayuscula');

    prosa(cont, '<h3>3 · Encontrar todas con <code>findall</code></h3><p><code>re.findall</code> devuelve una <b>lista</b> con todas las coincidencias — ideal para extraer datos.</p>');
    tryHint(cont);
    celda(cont,
      'import re\n\n' +
      'texto = "Precios: $120, $85 y $1,300 pesos"\n' +
      'numeros = re.findall(r"\\d+", texto)\n' +
      'print(numeros)   # [\"120\", \"85\", \"1\", \"300\"]\n\n' +
      'palabras = re.findall(r"[A-Za-z]+", texto)\n' +
      'print(palabras)');

    prosa(cont, '<h3>4 · Grupos: capturar partes</h3><p>Los paréntesis <code>( )</code> capturan <b>trozos</b> de la coincidencia para extraerlos por separado.</p>');
    celda(cont,
      'import re\n\n' +
      'fecha = "17/11/2026"\n' +
      'm = re.search(r"(\\d{2})/(\\d{2})/(\\d{4})", fecha)\n' +
      'if m:\n' +
      '    dia, mes, anio = m.group(1), m.group(2), m.group(3)\n' +
      '    print("dia:", dia, "mes:", mes, "anio:", anio)');

    prosa(cont, '<h3>5 · Reemplazar con <code>re.sub</code></h3><p>Sustituye todo lo que coincida con el patrón. Útil para limpiar o censurar texto.</p>');
    celda(cont,
      'import re\n\n' +
      'texto = "Llamame al 55-1234-5678 hoy"\n' +
      'censurado = re.sub(r"\\d", "*", texto)   # cada digito -> *\n' +
      'print(censurado)');

    prosa(cont, '<h3>6 · Tu turno</h3><p>Completa el patrón para extraer <b>todos los números</b> de la cadena con <code>findall</code>. Pista: <code>\\d+</code>.</p>');
    celda(cont,
      'import re\n\n' +
      'texto = "Tengo 3 gatos, 2 perros y 11 peces"\n' +
      'nums = re.findall(r"", texto)\n' +
      'print(nums)   # [\"3\", \"2\", \"11\"]');
    callout(cont, 'Con <code>r"\\d+"</code> deberías obtener <code>["3", "2", "11"]</code>. Cuando lo logres, pasa al <b>Quiz</b> para cerrar Herramientas.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Qué módulo de Python se usa para expresiones regulares?", op: ["<code>regex</code>", "<code>re</code>", "<code>string</code>", "<code>pattern</code>"], ok: 1, porque: "El módulo <code>re</code> de la librería estándar; se importa con <code>import re</code>, sin instalar nada." },
    { p: "¿Qué coincide con <code>\\d+</code>?", op: ["Una sola letra", "Uno o más dígitos", "Cualquier carácter", "Un espacio"], ok: 1, porque: "<code>\\d</code> es un dígito y <code>+</code> significa \"uno o más\": uno o más dígitos seguidos." },
    { p: "¿Qué devuelve <code>re.findall</code>?", op: ["La primera coincidencia", "Una lista con todas las coincidencias", "True o False", "El texto sin cambios"], ok: 1, porque: "<code>findall</code> devuelve una <b>lista</b> con todas las coincidencias; ideal para extraer datos." },
    { p: "En un patrón, ¿para qué sirven los paréntesis <code>( )</code>?", op: ["Para hacer comentarios", "Para capturar partes (grupos) de la coincidencia", "Para repetir el patrón", "Para ignorar mayúsculas"], ok: 1, porque: "Los paréntesis definen <b>grupos</b> que capturan trozos de la coincidencia, accesibles con <code>.group(1)</code>, etc." },
    { p: "¿Qué hace <code>re.sub(r\"\\d\", \"*\", texto)</code>?", op: ["Borra el texto", "Reemplaza cada dígito por <code>*</code>", "Cuenta los dígitos", "Devuelve el primer dígito"], ok: 1, porque: "<code>re.sub</code> <b>sustituye</b> todo lo que coincide; aquí cada dígito pasa a ser <code>*</code>." }
  ];

  E.registrar({
    id: "py-regex",
    grupo: "py-herramientas",
    lenguaje: "py",
    orden: 7,
    titulo: "Expresiones regulares",
    sub: "Python · Herramientas",
    resumen: "El módulo re: buscar, metacaracteres, findall, grupos y sustitución — patrones para validar y extraer texto, ejecutables en vivo.",
    chips: [{ k: "Nivel", v: "Intermedio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-regex", QUIZ)
    }
  });
})();
