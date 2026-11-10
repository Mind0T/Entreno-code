/* ============================================================
   Contenido: Pila estatica (arreglo + tope) y paréntesis balanceados
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const ui = E.ui;
  const n = ui.n;

  /* ---------- guion para mini-demos ---------- */
  function guionPila(nombre, ops) {
    const A = E.codigoDe(nombre);
    const M = E.est.pilaEstatica(A);
    M.inicio();
    ops.forEach(([op, a]) => M.lab(op, a));
    return M.pasos;
  }
  const miniPila = (titulo, ops, filtro) => (el) => {
    ui.MiniDemo(el, {
      sello: "Pruébalo",
      titulo: titulo,
      pasos: guionPila("pilaEstatica", ops),
      filtro: filtro || ((p) => p.f === "impl" && p.lv === 0),
      vista: (c) => E.vistas.pilaEst(c),
      ms: 1500,
    });
  };

  /* ====================================================================
     PILA ESTATICA
     ==================================================================== */
  const anotPila = [
    { f: "dec", ln: "#define MAX 7", t: "Capacidad máxima|La pila guarda como máximo <b>7</b> elementos. Se decide al escribir el programa y <b>no puede cambiar</b> mientras corre: por eso se llama <i>estática</i>." },
    { f: "dec", ln: "struct Pila {", t: "Un <code>struct</code> agrupa datos relacionados|Una <code>struct</code> junta variables distintas bajo un solo nombre. Aquí junta el arreglo que guarda los datos y el índice del último." },
    { f: "dec", ln: "int dato[MAX];", t: "El almacén|Un arreglo de 7 enteros, consecutivos en memoria. Aquí viven los elementos. Observa: <b>nadie los borra</b> cuando se sacan; solo dejan de contar." },
    { f: "dec", ln: "int tope;", t: "El índice del último elemento|<code>tope</code> es la posición (en <code>dato[]</code>) del elemento que está arriba de la pila. Con <b>−1</b> significa «pila vacía» porque no existe <code>dato[-1]</code>." },
    { f: "dec", ln: "void init(struct Pila *p);", t: "Todas reciben un apuntador|Cada función recibe <code>struct Pila *p</code>: la <b>dirección</b> de la pila. Si recibieran la pila por valor, trabajarían con una <b>copia</b> y los cambios se perderían al salir." },
    { f: "impl", ln: "void init(struct Pila *p){", t: "<code>init</code>|Deja la pila lista para usarse. Una variable local recién declarada trae <b>basura</b>: sin <code>init</code>, <code>tope</code> valdría cualquier cosa." },
    { f: "impl", ln: "p->tope=-1;", t: "Pila vacía = −1|La flecha <code>-&gt;</code> significa «el campo <code>tope</code> de la struct a la que apunta <code>p</code>». Es lo mismo que <code>(*p).tope</code>." },
    { f: "impl", ln: "return p->tope==MAX-1;", t: "<code>isFull</code>: ¿llena?|El último índice válido es <code>MAX − 1 = 6</code>. Si <code>tope</code> ya llegó ahí, no cabe nada más. Devuelve 1 (verdadero) o 0 (falso): en C la comparación <code>==</code> produce un entero." },
    { f: "impl", ln: "return p->tope==-1;", t: "<code>isEmpty</code>: ¿vacía?|Vacía cuando <code>tope</code> vale −1." },
    { f: "impl", ln: "void push(struct Pila *p,int valor){", t: "<code>push</code>: meter|Agrega <code>valor</code> arriba de la pila, si hay lugar." },
    { f: "impl", ln: "if(isFull(p)){", t: "Primero checar si cabe|Si está llena, meter otro elemento escribiría <code>dato[7]</code>, <b>fuera del arreglo</b>: eso es un <i>desbordamiento</i> (overflow) y puede corromper otras variables. Mejor avisar." },
    { f: "impl", ln: 'printf("\\nLo siento \\nLA PILA ESTA LLENA \\n");', t: "Mensaje de error|Aviso al usuario. Hay otras formas de reportar el error (devolver un código), pero ésta es la más simple." },
    { f: "impl", ln: "return;", nth: 1, t: "Salir sin hacer nada|En una función <code>void</code>, <code>return;</code> termina de inmediato. La pila queda igual." },
    { f: "impl", ln: "p->dato[++(p->tope)]=valor;", t: "La línea clave de <code>push</code>|<code>++(p-&gt;tope)</code> es <b>pre-incremento</b>: primero sube <code>tope</code> en 1 y <i>luego</i> usa ese nuevo valor como índice. Con tope = −1: sube a 0 y se guarda en <code>dato[0]</code>. Si fuera <code>tope++</code> (post-incremento) usaría el índice viejo (−1) ¡y escribiría fuera del arreglo!" },
    { f: "impl", ln: 'printf("\\nSe agrego %d a la pila\\n",valor);', t: "Confirmación|Imprime el valor que se guardó." },
    { f: "impl", ln: "int pop(struct Pila *p){", t: "<code>pop</code>: sacar|Quita y <b>devuelve</b> el elemento de arriba." },
    { f: "impl", ln: "if(isEmpty(p)){", nth: 1, t: "Checar que haya algo|Si estuviera vacía, leeríamos <code>dato[-1]</code>: fuera del arreglo (<i>subdesbordamiento</i>, underflow)." },
    { f: "impl", ln: "return 0;", nth: 1, t: "Un valor de relleno|Hay que devolver <i>algo</i>. Pero ojo: el 0 también podría ser un dato válido. Por eso <code>main</code> pregunta <code>isEmpty</code> <b>antes</b> de usar lo que regrese <code>pop</code>." },
    { f: "impl", ln: "return p->dato[(p->tope)--];", t: "La línea clave de <code>pop</code>|<code>(p-&gt;tope)--</code> es <b>post-decremento</b>: primero se usa el valor actual como índice (se lee <code>dato[tope]</code>) y <i>después</i> <code>tope</code> baja. El dato <b>no se borra</b>: simplemente deja de contar porque <code>tope</code> ya no lo alcanza." },
    { f: "impl", ln: "return p->dato[p->tope];", t: "<code>peek</code>|Igual que <code>pop</code> pero <b>sin</b> mover <code>tope</code>: solo mira." },
    { f: "impl", ln: "for(int i=p->tope;i>=0;i--){", t: "Recorrer de arriba hacia abajo|Empieza en el tope y baja hasta el 0: así el primero que se imprime es el último que entró (orden LIFO)." },
    { f: "main", ln: "struct Pila pila;", t: "La pila es una variable local|Toda la pila (7 enteros + <code>tope</code> = 32 bytes) vive en el stack de <code>main</code>. Cuando <code>main</code> termina desaparece sola; no hay que liberar nada." },
    { f: "main", ln: "init(&pila);", t: "Se pasa la dirección|<code>&amp;pila</code> es «la dirección de pila». Así <code>init</code> modifica <i>esta</i> pila y no una copia." },
    { f: "main", ln: "do{", t: "Menú repetitivo|El <code>do { … } while</code> ejecuta el menú <b>al menos una vez</b> y lo repite hasta que el usuario elija 5." },
    { f: "main", ln: 'scanf("%d",&entrada);', nth: 1, t: "Leer la opción|<code>scanf</code> necesita la <b>dirección</b> de la variable (<code>&amp;entrada</code>) para poder escribir en ella." },
    { f: "main", ln: "switch(entrada){", t: "Elegir qué hacer|Salta al <code>case</code> que coincide con el valor de <code>entrada</code>. Cada <code>break</code> evita que «se caiga» al siguiente caso." },
    { f: "main", ln: "push(&pila,valor);", t: "Opción 2: apilar|Pide un número y lo mete con <code>push</code>." },
    { f: "main", ln: "if(!isEmpty(&pila)){", nth: 1, t: "Opción 3: extraer, con cuidado|Primero se pregunta si hay algo. Si lo hay, <code>pop</code> se llama <i>dentro del printf</i> para mostrar lo que sacó. Si no, se llama a <code>pop</code> solo para que imprima su mensaje de error." },
    { f: "main", ln: 'printf("\\nPOP:\\n%d\\n",pop(&pila));', t: "<code>pop</code> dentro de <code>printf</code>|C primero evalúa <code>pop(&amp;pila)</code> (que modifica la pila y devuelve el valor) y luego <code>printf</code> lo imprime." },
    { f: "main", ln: "while(entrada!=5);", t: "Condición de salida|El menú se repite mientras <code>entrada</code> sea distinta de 5." },
  ];

  const htmlPila = () => `
    <h2>¿Qué es una pila?</h2>
    <p>Una <b>pila</b> (<i>stack</i>) es una colección donde solo puedes meter y sacar elementos <mark>por un extremo</mark>: el de arriba. El último que entra es el primero que sale. A eso se le llama <b>LIFO</b>: <i>Last In, First Out</i>.</p>
    ${n("idea", "Piensa en platos", "<p>Una pila de platos: si pones un plato nuevo, va arriba; si quieres uno, tomas el de arriba. No puedes sacar el de en medio sin quitar antes los de encima. Más ejemplos que usas todos los días: el botón <b>Deshacer</b> (Ctrl+Z), el historial del botón «atrás» del navegador, y la <b>pila de llamadas</b> de tu propio programa en C (la que ves en «Llamadas activas»).</p>")}
    <h2>Las operaciones</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Operación</th><th>Qué hace</th><th>Costo</th></tr>
      <tr><td><code>push(valor)</code></td><td>Mete un elemento arriba.</td><td class="num">O(1)</td></tr>
      <tr><td><code>pop()</code></td><td>Saca y devuelve el de arriba.</td><td class="num">O(1)</td></tr>
      <tr><td><code>peek()</code></td><td>Devuelve el de arriba <b>sin</b> sacarlo.</td><td class="num">O(1)</td></tr>
      <tr><td><code>isEmpty()</code></td><td>¿No hay elementos?</td><td class="num">O(1)</td></tr>
      <tr><td><code>isFull()</code></td><td>¿Ya no cabe otro? (solo en la versión de arreglo)</td><td class="num">O(1)</td></tr>
    </table></div>
    <p>Todas cuestan <b>O(1)</b>: tardan lo mismo con 3 elementos que con 3 millones, porque siempre trabajan en el mismo lugar (el tope).</p>
    <h2>Cómo la guarda tu código: un arreglo y un índice</h2>
    <p>La pila estática usa un <b>arreglo de tamaño fijo</b> (<code>dato[7]</code>) y un entero, <code>tope</code>, que dice <i>en qué posición está el último elemento</i>. Vacía = <code>tope</code> en −1.</p>
    <div class="bloque"><code>struct Pila {
    int dato[MAX];   // el almacén: 7 casillas
    int tope;        // posición del último elemento (−1 = vacía)
};</code></div>
    <p>Presiona <b>Siguiente</b>: mira cómo sube <code>tope</code> con cada <code>push</code> y cómo, tras un <code>pop</code>, el número <b>sigue ahí</b> (gris) pero ya no cuenta.</p>
    <div data-demo="basico"></div>
    <h2>Tres detalles que hay que entender</h2>
    <h3>1. <code>++(p-&gt;tope)</code> vs. <code>(p-&gt;tope)--</code></h3>
    <p>En <code>push</code> el <code>++</code> va <b>antes</b>: primero sube el tope, luego se usa como índice. En <code>pop</code> el <code>--</code> va <b>después</b>: primero se usa el índice (para leer) y luego baja. Si los intercambias, el programa escribe o lee una casilla equivocada.</p>
    <h3>2. <code>pop</code> no borra nada</h3>
    <p>Sacar un elemento solo mueve <code>tope</code>. El valor sigue físicamente en el arreglo hasta que otro <code>push</code> lo sobrescriba. Es más rápido que borrar, y es la razón por la que en la animación los sacados aparecen en gris.</p>
    <h3>3. ¿Por qué <code>struct Pila *p</code> y no <code>struct Pila p</code>?</h3>
    <p>En C los parámetros se pasan <b>por valor</b>: la función recibe una <i>copia</i>. Si <code>push</code> recibiera la pila completa, modificaría su copia, y al regresar la pila original seguiría igual. Pasando <code>&amp;pila</code> (su dirección) la función trabaja sobre la pila real. Con <code>-&gt;</code> accedes a sus campos desde el apuntador.</p>
    <div data-demo="errores"></div>
    <h2>Cuando sale mal</h2>
    <ul>
      <li><b>Desbordamiento (overflow):</b> hacer <code>push</code> con la pila llena. Tu código lo evita con <code>isFull</code>.</li>
      <li><b>Subdesbordamiento (underflow):</b> hacer <code>pop</code> o <code>peek</code> con la pila vacía. Tu código lo evita con <code>isEmpty</code>.</li>
      <li><b>Valor de error ambiguo:</b> <code>pop</code> devuelve 0 cuando está vacía, pero 0 también es un dato válido. Por eso <code>main</code> pregunta <code>!isEmpty</code> antes de confiar en el resultado.</li>
    </ul>
    <h2>Limitaciones de la versión estática</h2>
    <ul>
      <li>Tamaño <b>fijo</b>: 7 casillas aunque necesites 8. (La pila <b>dinámica</b> soluciona esto.)</li>
      <li>Si reservas muchas casillas y usas pocas, desperdicias memoria.</li>
      <li>A cambio: es simple, rápida y no necesita <code>malloc</code> ni <code>free</code>.</li>
    </ul>
    <h2>¿Para qué sirve en la vida real?</h2>
    <p>Deshacer/rehacer, revisar paréntesis balanceados (siguiente tema), convertir expresiones infijas a postfijas (tu examen), recorridos en profundidad de grafos, y la <i>call stack</i> que hace posible que las funciones se llamen unas a otras.</p>
  `;

  function demoErrores(el) {
    const A = E.codigoDe("pilaEstatica");
    const M = E.est.pilaEstatica(A);
    M.inicio();
    for (let i = 1; i <= 8; i++) M.lab("push", i * 10);
    M.lab("print");
    el.append(h("p", { class: "suave", html: "<b>Prueba esto:</b> llenamos la pila con 7 números y se intenta meter un octavo. Avanza hasta el final para ver cómo <code>isFull</code> lo detiene." }));
    ui.MiniDemo(el, {
      sello: "¿Y si se llena?",
      titulo: "8 push en una pila de 7",
      pasos: M.pasos,
      filtro: (p) => p.f === "impl" && (p.lv === 0 && (p.etiqueta === "err" || p.etiqueta === "swap" || /Entra <b>push/.test(p.nota))),
      vista: (c) => E.vistas.pilaEst(c),
      ms: 1100,
    });
  }

  /* ---------- prueba de escritorio: tu menu con teclas ---------- */
  function parseTeclas(txt) {
    const t = txt.trim().split(/[\s,;]+/).filter(Boolean);
    if (!t.length) return { error: "Escribe las teclas que pulsarías, por ejemplo: 2 10  2 20  1  3  5" };
    const nums = [];
    for (const x of t) {
      if (!/^-?\d+$/.test(x)) return { error: "“" + x + "” no es un número entero." };
      nums.push(parseInt(x, 10));
    }
    const pasos = [];
    let i = 0;
    while (i < nums.length) {
      const op = nums[i++];
      if (op === 2) {
        if (i >= nums.length) return { error: "Después de la opción 2 falta el número que quieres apilar." };
        pasos.push([2, nums[i++]]);
      } else pasos.push([op]);
      if (op === 5) break;
      if (pasos.length > 40) return { error: "Máximo 40 opciones del menú." };
    }
    return { pasos, terminaCon5: pasos[pasos.length - 1][0] === 5, sobran: i < nums.length };
  }
  function pestanaEscritorioPila() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        const A = E.codigoDe("pilaEstatica");
        const entrada = h("input", { type: "text", value: "2 10  2 20  2 30  1  3  4  5", spellcheck: "false", "aria-label": "Teclas del menú" });
        const aviso = h("p", { class: "aviso" }, "Escribe lo que tecleará el «usuario»: la opción del menú y, si es la 2, el número a apilar. Opciones: 1 imprimir · 2 meter · 3 extraer · 4 ver tope · 5 salir.");
        const jugCont = h("div");
        let jug = null;
        function ejecutar() {
          const r = parseTeclas(entrada.value);
          if (r.error) { aviso.className = "aviso aviso-err"; aviso.textContent = r.error; return; }
          const M = E.est.pilaEstatica(A);
          M.inicio();
          r.pasos.forEach(([op, v]) => M.menu(op, v));
          aviso.className = "aviso";
          aviso.textContent = r.pasos.length + " opciones del menú" + (r.terminaCon5 ? "." : ". Nota: no terminaste con 5, así que el programa seguiría esperando teclas.") + (r.sobran ? " (Lo que escribiste después del 5 se ignora: el programa ya terminó.)" : "");
          jug.cargar(M.pasos, "Tu main con menú · teclas: " + entrada.value.trim().replace(/\s+/g, " "));
        }
        const preset = (t, v) => h("button", { type: "button", class: "btn btn-chico", onclick: () => { entrada.value = v; ejecutar(); } }, t);
        cont.append(
          ui.panelCtl(
            h("label", { class: "grande" }, "Teclas que se escriben (separadas por espacio)", entrada),
            h("button", { type: "button", class: "btn btn-azul", onclick: ejecutar }, "Ejecutar"),
            h("div", { class: "preajustes" }, h("span", { class: "suave" }, "Ejemplos:"),
              preset("Lo básico", "2 10  2 20  2 30  1  3  4  5"),
              preset("Llenarla (¡overflow!)", "2 1 2 2 2 3 2 4 2 5 2 6 2 7 2 8 1 5"),
              preset("Sacar de vacía (¡underflow!)", "3 4 1 5"),
              preset("Opción inválida", "9 5")),
            aviso
          )
        );
        entrada.addEventListener("keydown", (ev) => { if (ev.key === "Enter") ejecutar(); });
        cont.append(jugCont);
        jug = E.Jugador(jugCont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "main",
          vista: (c) => E.vistas.pilaEst(c),
          pilaLlamadas: true,
        });
        ejecutar();
      },
    };
  }

  function pestanaLaboratorioPila() {
    return {
      titulo: "Laboratorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>Aquí tú eres <code>main</code>: llama a las funciones de tu pila en el orden que quieras y observa qué ocurre con <code>tope</code>, el arreglo y las variables. Cada llamada se agrega al final de la animación.</p>" }));
        const A = E.codigoDe("pilaEstatica");
        ui.Laboratorio(cont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "impl",
          vista: (c) => E.vistas.pilaEst(c),
          pilaLlamadas: true,
          crear: () => E.est.pilaEstatica(A),
          arranque: (M) => { M.inicio(); return M.pasos.slice(); },
          ops: [
            { id: "push", etq: "push(&pila, ▢)", arg: true, llamada: (a) => "push(&pila, " + a + ");" },
            { id: "pop", etq: "pop(&pila)", llamada: () => "pop(&pila);" },
            { id: "peek", etq: "peek(&pila)", llamada: () => "peek(&pila);" },
            { id: "print", etq: "printStack(&pila)", llamada: () => "printStack(&pila);" },
          ],
          aliases: { push: "push", pop: "pop", peek: "peek", print: "print", printstack: "print" },
          ejemploSecuencia: "push 10, push 20, pop, print",
          estado: (M) => { const e = M.estado(); return "tope = " + e.tope + " · " + (e.tope + 1) + "/" + e.max + " ocupadas"; },
        });
      },
    };
  }

  const quizPila = [
    { p: "Partiendo de una pila vacía, haces <code>push(10)</code>, <code>push(20)</code>, <code>pop()</code>. ¿Cuánto vale <code>tope</code>?", op: ["−1", "0", "1", "2"], ok: 1, porque: "init: −1 → push 10: 0 → push 20: 1 → pop: baja a 0. El 20 sigue en dato[1] pero ya no cuenta." },
    { p: "Después de ese <code>pop()</code>, ¿dónde está el 20?", op: ["Se borró de la memoria", "Sigue en dato[1], pero ya no cuenta para la pila", "Se movió a dato[0]", "Está en una variable aparte"], ok: 1, porque: "pop solo decrementa tope. El valor permanece en el arreglo hasta que otro push lo sobrescriba." },
    { p: "Con <code>tope = 2</code>, la línea <code>p-&gt;dato[++(p-&gt;tope)] = valor;</code> guarda el valor en…", op: ["dato[2]", "dato[3]", "dato[1]", "dato[4]"], ok: 1, porque: "El ++ antes del operando es pre-incremento: primero tope pasa a 3 y luego se usa 3 como índice." },
    { p: "¿Por qué las funciones reciben <code>struct Pila *p</code> y se llaman con <code>&amp;pila</code>?", op: ["Para ahorrar memoria solamente", "Porque C pasa por valor: sin la dirección modificarían una copia", "Porque las struct no pueden pasarse a funciones", "Es obligatorio por el compilador"], ok: 1, porque: "El ahorro de memoria es un efecto secundario. La razón principal: queremos modificar la pila original, no una copia." },
    { p: "Con <code>MAX = 7</code>, la pila tiene 7 elementos (<code>tope = 6</code>) y haces <code>push(99)</code>. ¿Qué ocurre en tu código?", op: ["Se sobrescribe dato[6]", "Se escribe en dato[7], fuera del arreglo", "Imprime que está llena y no cambia nada", "El programa se cierra"], ok: 2, porque: "isFull devuelve 1, push imprime el aviso y hace return antes de tocar el arreglo." },
    { p: "Metes 1, 2, 3 (en ese orden) y haces dos <code>pop</code>. ¿Qué devolvieron, en orden?", op: ["1 y 2", "3 y 2", "2 y 3", "3 y 1"], ok: 1, porque: "LIFO: el último en entrar (3) es el primero en salir; luego el 2." },
  ];

  E.registrar({
    id: "pilaEstatica",
    grupo: "pila",
    orden: 1,
    titulo: "Pila estática",
    sub: "arreglo + tope",
    resumen: "LIFO con un arreglo de tamaño fijo y un índice «tope». Tu menú de pila_est_int paso a paso.",
    chips: [{ k: "Estructura", v: "arreglo[7] + tope" }, { k: "push / pop / peek", v: "O(1)" }, { k: "Capacidad", v: "fija" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlPila, {
        basico: miniPila("push 10, 20, 30 y luego pop", [["push", 10], ["push", 20], ["push", 30], ["pop"]]),
        errores: demoErrores,
      }),
      codigo: ui.pestanaCodigo("pilaEstatica", anotPila, ["dec", "impl", "main"]),
      escritorio: pestanaEscritorioPila(),
      laboratorio: pestanaLaboratorioPila(),
      quiz: ui.pestanaQuiz("pilaEstatica", quizPila),
    },
  });

  /* ====================================================================
     PARENTESIS BALANCEADOS
     ==================================================================== */
  const anotPar = [
    { f: "main", ln: "struct Pila pila;", t: "La pila de apoyo|Reutiliza el TAD (tipo abstracto de datos) de pila estática, ahora con <code>MAX = 100</code>. Aquí solo hace falta guardar los <code>(</code> que quedan «abiertos»." },
    { f: "main", ln: "inicializar(&pila);", t: "Inicializar|Mismo papel que <code>init</code>: deja <code>tope</code> en −1." },
    { f: "main", ln: "char parentesis[]={", t: "La cadena a revisar|Un arreglo de <code>char</code>. Tu ejemplo tiene tres <code>(</code> seguidos de tres <code>)</code>. Cada carácter se guarda como su código ASCII ('(' = 40, ')' = 41)." },
    { f: "main", ln: "int longitud=sizeof(parentesis)/sizeof(parentesis[0]);", t: "Calcular cuántos hay|<code>sizeof(parentesis)</code> son los bytes de todo el arreglo; dividido entre los bytes de un elemento da la <b>cantidad de elementos</b>. Funciona aquí porque <code>parentesis</code> es un arreglo real (no un apuntador)." },
    { f: "main", ln: "for(int i=0;i<longitud;i++){", t: "Revisar símbolo por símbolo|De izquierda a derecha, una sola pasada." },
    { f: "main", ln: "if(parentesis[i]=='('){", t: "Si abre…|Un paréntesis que abre queda <b>pendiente</b> de cerrarse." },
    { f: "main", ln: "push(&pila, parentesis[i]);", t: "…se apila|Se guarda el paréntesis. Lo que esté arriba de la pila siempre es el <b>último</b> que se abrió." },
    { f: "main", ln: "else if(parentesis[i]==')'){", t: "Si cierra…|Un <code>)</code> debe cerrar al <code>(</code> más reciente que siga abierto." },
    { f: "main", ln: "pop(&pila);", t: "…se desapila|Se quita el <code>(</code> de arriba: ya quedó emparejado. Si la pila está vacía, <code>pop</code> imprime «Error: la pila esta vacia»: hay un <code>)</code> de más." },
    { f: "main", ln: "imprimirPila(&pila);", t: "El veredicto|Si la pila quedó vacía, todos los paréntesis se emparejaron. Si quedó algo, sobran <code>(</code>. Si <code>pop</code> imprimió error durante el recorrido, sobran <code>)</code>." },
    { f: "impl", ln: "p->tope = -1;", t: "<code>inicializar</code>|Pila vacía." },
    { f: "impl", ln: "p->datos[++(p->tope)]=valor;", t: "<code>push</code>|Pre-incremento de <code>tope</code> y luego se guarda. Igual que en la otra pila." },
    { f: "impl", ln: "return p->datos[(p->tope)--];", t: "<code>pop</code>|Lee el de arriba y baja <code>tope</code>." },
    { f: "impl", ln: "for (int i = p->tope; i >= 0; i--) {", t: "<code>imprimirPila</code>|Recorre de arriba hacia abajo. Imprime los números ASCII (40 = '(')." },
  ];

  const htmlPar = () => `
    <h2>El problema</h2>
    <p>Dada una cadena de paréntesis, ¿cada <code>(</code> tiene su <code>)</code> y en el orden correcto? <code>((()))</code> y <code>()()</code> sí; <code>(()</code>, <code>())</code> y <code>)(</code> no.</p>
    ${n("idea", "¿Por qué una pila?", "<p>Cada <code>)</code> debe cerrar al <code>(</code> <b>más reciente</b> que siga abierto. «El más reciente» es justo lo que te da una pila (LIFO): lo último que entró es lo primero que sale.</p>")}
    <h2>El algoritmo en tres reglas</h2>
    <ol>
      <li>Si el símbolo es <code>(</code> → <b>push</b> a la pila.</li>
      <li>Si el símbolo es <code>)</code> → <b>pop</b> (sacas el <code>(</code> con el que se empareja).</li>
      <li>Al terminar → la cadena está <mark>balanceada</mark> si la pila quedó <b>vacía</b> y nunca hubo que hacer pop con la pila vacía.</li>
    </ol>
    <div data-demo="demo"></div>
    <h2>Los tres tipos de desbalance</h2>
    <div class="dos-col">
      <div class="tarjeta"><h3><code>(()</code></h3><p>Se acaba la cadena y en la pila queda un <code>(</code>: <b>sobra una apertura</b>.</p></div>
      <div class="tarjeta"><h3><code>())</code></h3><p>Al llegar al último <code>)</code> la pila ya está vacía y <code>pop</code> reclama: <b>sobra un cierre</b>.</p></div>
      <div class="tarjeta"><h3><code>)(</code></h3><p>Primero un cierre sin apertura (error) y luego una apertura que nunca se cierra. <b>Cuentan igual</b> (uno y uno), pero el orden lo hace inválido: por eso un simple contador no basta con ciertos órdenes.</p></div>
    </div>
    ${n("ojo", "Lo que hace (y no hace) tu código", "<ul><li>Solo revisa <code>(</code> y <code>)</code>. Con <code>[ ]</code> y <code>{ }</code> habría que guardar <i>cuál</i> se abrió y comprobar que el que cierra coincida.</li><li>Si hay un <code>)</code> de más, <code>pop</code> imprime el error pero el programa <b>sigue</b>. Para dar un veredicto automático habría que contar los errores o devolver 1/0 desde una función <code>estaBalanceada</code>.</li><li>El veredicto lo da <code>imprimirPila</code>: «La pila esta vacia» (todo emparejado) o la lista de los <code>(</code> pendientes.</li></ul>")}
    <h2>Complejidad</h2>
    <p>Una sola pasada: <b>O(n)</b> en tiempo. La pila crece como máximo n/2 (si todo son aperturas, n). Con <code>MAX = 100</code> este programa soporta hasta 100 aperturas pendientes.</p>
    ${n("idea", "Reto", "<p>Agrega <code>[</code> <code>]</code> y <code>{</code> <code>}</code>. Pista: apila el carácter de apertura, y al leer un cierre haz <code>pop</code> y compara que sea del <i>mismo tipo</i>.</p>")}
  `;

  function pestanaEscritorioPar() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        const A = E.codigoDe("parentesis");
        const entrada = h("input", { type: "text", value: "((()))", maxlength: 24, spellcheck: "false", "aria-label": "Cadena de paréntesis" });
        const aviso = h("p", { class: "aviso" }, "Escribe solo ( y ), máximo 24 símbolos. Tu archivo practica.c trae ((())).");
        const veredicto = h("div", { class: "nota ancha", "aria-live": "polite" });
        const jugCont = h("div");
        let jug = null;
        function ejecutar() {
          const txt = entrada.value.replace(/\s+/g, "");
          if (!txt.length || !/^[()]+$/.test(txt)) {
            aviso.className = "aviso aviso-err";
            aviso.textContent = "Usa solo los símbolos ( y ), sin otros caracteres.";
            return;
          }
          aviso.className = "aviso";
          aviso.textContent = txt.length + " símbolos.";
          const R = E.est.parentesis(txt, A);
          jug.cargar(R.T.pasos, "Revisando  " + txt);
          const bien = R.balanceado && !R.sobranCierres;
          veredicto.className = "nota ancha " + (bien ? "idea" : "ojo");
          veredicto.innerHTML = '<span class="nota-tit">' + (bien ? "Balanceada ✔" : "No balanceada ✘") + "</span>" +
            (bien ? "<p>Cada <code>(</code> encontró su <code>)</code>: la pila terminó vacía y nunca hubo errores.</p>"
              : "<p>" + (R.sobranCierres ? "Hay <code>)</code> de más (el <code>pop</code> encontró la pila vacía). " : "") + (!R.balanceado ? "Quedaron <code>(</code> sin cerrar en la pila. " : "") + "</p>");
        }
        cont.append(
          ui.panelCtl(
            h("label", { class: "grande" }, "Cadena", entrada),
            h("button", { type: "button", class: "btn btn-azul", onclick: ejecutar }, "Ejecutar"),
            h("div", { class: "preajustes" }, h("span", { class: "suave" }, "Ejemplos:"),
              ...[["((()))", "((()))"], ["()()()", "()()()"], ["(()", "(()"], ["())", "())"], [")(", ")("], ["(()(()))", "(()(()))"]].map(([t, v]) => h("button", { type: "button", class: "btn btn-chico", onclick: () => { entrada.value = v; ejecutar(); } }, t))),
            aviso
          )
        );
        entrada.addEventListener("keydown", (ev) => { if (ev.key === "Enter") ejecutar(); });
        cont.append(veredicto, jugCont);
        jug = E.Jugador(jugCont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "main",
          vista: (c) => E.vistas.pilaEst(c),
          pilaLlamadas: true,
        });
        ejecutar();
      },
    };
  }

  const quizPar = [
    { p: "¿Qué estructura permite emparejar cada <code>)</code> con el <code>(</code> correcto?", op: ["Una cola", "Una pila", "Un arreglo ordenado", "Un contador"], ok: 1, porque: "El cierre debe emparejarse con la apertura más reciente: último en entrar, primero en salir." },
    { p: "Para <code>(()</code>, ¿qué muestra <code>imprimirPila</code> al final?", op: ["La pila esta vacia", "Un 40 (un paréntesis sin cerrar)", "Un error de pop", "Dos elementos"], ok: 1, porque: "Se apila (, se apila (, el ) saca uno. Queda un ( pendiente: el código ASCII 40." },
    { p: "Para <code>())</code>, ¿qué ocurre en el último símbolo?", op: ["push de ')'", "pop con la pila vacía: imprime error", "La pila queda con 2 elementos", "No pasa nada"], ok: 1, porque: "( se apila, el primer ) lo saca, y el segundo ) hace pop con la pila vacía." },
    { p: "¿Por qué un simple contador (suma 1 con '(' y resta 1 con ')') no basta?", op: ["Sí basta siempre", "Porque )( termina en 0 pero no es válida", "Porque los contadores no pueden ser negativos", "Porque es más lento"], ok: 1, porque: "El contador de )( termina en 0, pero el orden está mal. (Un contador sí sirve si además verificas que nunca baje de 0, y solo con un tipo de paréntesis.)" },
    { p: "Si quisieras aceptar también <code>[ ]</code> y <code>{ }</code>, ¿qué cambia?", op: ["Nada", "Se apilan las aperturas y, al cerrar, se compara que el pop sea del mismo tipo", "Se necesitan tres pilas", "Se debe ordenar la cadena"], ok: 1, porque: "Con varios tipos importa cuál abrió: ([)] es inválida aunque haya el mismo número de cada uno." },
  ];

  E.registrar({
    id: "parentesis",
    grupo: "pila",
    orden: 2,
    titulo: "Paréntesis balanceados",
    sub: "aplicación de la pila estática",
    resumen: "Tu practica.c: comprobar con una pila que cada « ( » tenga su « ) ».",
    chips: [{ k: "Tiempo", v: "O(n)" }, { k: "Usa", v: "TADPilaEstatica" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlPar, {
        demo: (el) => {
          const A = E.codigoDe("parentesis");
          ui.MiniDemo(el, {
            sello: "Pruébalo",
            titulo: "Revisando ( ( ) ( ) )",
            pasos: E.est.parentesis("(()())", A).T.pasos,
            filtro: (p) => p.lv === 0 && (p.f === "main" || p.etiqueta === "swap" || p.etiqueta === "err"),
            vista: (c) => E.vistas.pilaEst(c),
            ms: 1400,
            regenerar: () => E.est.parentesis(["(()", "())", "((()))", "()()", ")("][Math.floor(Math.random() * 5)], A).T.pasos,
            etqRegenerar: "Otra cadena",
          });
        },
      }),
      codigo: ui.pestanaCodigo("parentesis", anotPar, ["dec", "impl", "main"]),
      escritorio: pestanaEscritorioPar(),
      quiz: ui.pestanaQuiz("parentesis", quizPar),
    },
  });
})();
