/* ============================================================
   Contenido: tu examen · infija -> postfija con pila dinamica
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const ui = E.ui;
  const n = ui.n;

  const SU_EXPR = "5+3*7+(2+1)*9";

  /* ---------- evaluar una postfija (bono): vista y pasos ---------- */
  function pasosEval(post) {
    const toks = post.trim().split(/\s+/).filter(Boolean);
    const pasos = [];
    const pila = [];
    const viz = (i, estado) => ({ tokens: toks, i: i, pila: pila.slice(), estado: estado || "" });
    pasos.push({ lv: 0, nota: "Empezamos con la pila de números <b>vacía</b>. Leemos la postfija de izquierda a derecha.", viz: viz(null) });
    let error = null;
    for (let i = 0; i < toks.length && !error; i++) {
      const t = toks[i];
      if (/^-?\d+$/.test(t)) {
        pila.push(parseInt(t, 10));
        pasos.push({ lv: 0, nota: "<b>" + t + "</b> es un número → se apila.", viz: viz(i, "push " + t), etiqueta: "swap" });
      } else if (/^[-+*/^]$/.test(t)) {
        if (pila.length < 2) { error = "Faltan operandos para «" + t + "»: la expresión postfija está mal formada."; break; }
        const b = pila.pop();
        const a = pila.pop();
        let r;
        if (t === "+") r = a + b;
        else if (t === "-") r = a - b;
        else if (t === "*") r = a * b;
        else if (t === "/") { if (b === 0) { error = "División entre cero."; break; } r = Math.trunc(a / b); }
        else r = Math.pow(a, b);
        pila.push(r);
        pasos.push({ lv: 0, nota: "<b>" + t + "</b> es un operador → saca <b>" + b + "</b> (el de arriba, es el operando derecho) y <b>" + a + "</b> (operando izquierdo), calcula <code>" + a + " " + t + " " + b + " = " + r + "</code> y apila el resultado.", viz: viz(i, a + " " + t + " " + b + " = " + r), etiqueta: "ok" });
      } else error = "No entiendo «" + t + "». Usa números enteros y los operadores + - * / ^ separados por espacios.";
    }
    if (error) pasos.push({ lv: 0, nota: error, viz: viz(null, "error"), etiqueta: "err" });
    else if (pila.length === 1) pasos.push({ lv: 0, nota: "Se acabó la expresión y queda un solo número en la pila: el <b>resultado es " + pila[0] + "</b>.", viz: viz(null, "resultado = " + pila[0]), etiqueta: "ok" });
    else pasos.push({ lv: 0, nota: "Sobraron " + pila.length + " números en la pila: la expresión postfija estaba mal formada.", viz: viz(null, "mal formada"), etiqueta: "err" });
    return pasos;
  }
  function vistaEval(cont) {
    const wrap = h("div", { class: "vi" });
    const tok = h("div", { class: "vi-expr" });
    const pilaEl = h("div", { class: "vi-sal-items" });
    const caja = h("div", { class: "vi-sal" }, h("div", { class: "vi-tit" }, "pila de números (el tope está a la derecha)"), pilaEl);
    const estado = h("div", { class: "vi-estado" });
    wrap.append(tok, caja, estado);
    cont.append(wrap);
    return {
      pintar(v) {
        if (!v) return;
        E.vaciar(tok);
        tok.append(h("span", { class: "vi-etq" }, "postfija:"));
        v.tokens.forEach((t, i) => tok.append(h("span", { class: "vi-ch" + (v.i === i ? " act" : v.i != null && i < v.i ? " hecho" : ""), style: { width: "auto", minWidth: "32px", padding: "0 6px" } }, t, h("small", {}, i))));
        E.vaciar(pilaEl);
        if (!v.pila.length) pilaEl.append(h("span", { class: "suave" }, "(vacía)"));
        v.pila.forEach((x, k) => pilaEl.append(h("span", { class: "vi-tok" + (k === v.pila.length - 1 ? " nuevo" : "") }, x)));
        estado.textContent = v.estado;
      },
    };
  }

  /* ---------- anotaciones ---------- */
  const anotInfija = [
    { f: "main", ln: "int precedencia(int op){", t: "Prioridad de cada operador|Devuelve un número: <b>mayor número = se hace antes</b>. <code>+ -</code> valen 1, <code>* /</code> valen 2 y <code>^</code> vale 3. Cualquier otro carácter (como un paréntesis) vale 0." },
    { f: "main", ln: "if(op=='+' || op=='-') return 1;", t: "Suma y resta|Prioridad baja: se hacen al último." },
    { f: "main", ln: "if(op=='*' || op=='/') return 2;", t: "Multiplicación y división|Prioridad media. Por eso <code>3*7</code> se agrupa antes que el <code>+</code>." },
    { f: "main", ln: "if(op=='^') return 3;", t: "Potencia|La más alta." },
    { f: "main", ln: "int esOperador(char c){", t: "¿Es un operador?|Responde 1 si <code>c</code> es uno de los cinco operadores. Es una condición reutilizable para no repetir la lista larga." },
    { f: "main", ln: "void infijoAPostfijo(const char *expr, char *salida){", t: "La función principal|Recibe la expresión (solo lectura: <code>const</code>) y un arreglo donde escribirá el resultado. Como <code>salida</code> es un arreglo de <code>main</code>, lo que escriba aquí lo verá <code>main</code>." },
    { f: "main", ln: "struct Nodo *pila=NULL;", t: "La pila de operadores|La misma pila dinámica de siempre: un apuntador en el stack que vale <code>NULL</code> = vacía. Aquí guardaremos operadores y paréntesis «en espera»." },
    { f: "main", ln: "int j=0;", t: "Posición de escritura|<code>j</code> es la siguiente posición libre en <code>salida</code>. Cada carácter que sale a la postfija se escribe ahí." },
    { f: "main", ln: "for(int i=0; expr[i]!='\\0'; i++){", t: "Leer la expresión de izquierda a derecha|Una sola pasada, carácter por carácter, hasta el fin de cadena <code>'\\0'</code>." },
    { f: "main", ln: "char c=expr[i];", t: "El símbolo actual|Se guarda en <code>c</code> para decidir qué hacer." },
    { f: "main", ln: "if(c==' ') continue;", t: "Ignorar espacios|<code>continue</code> salta a la siguiente vuelta del <code>for</code>." },
    { f: "main", ln: "if(isdigit((unsigned char)c)){", t: "Regla 1: un dígito|<code>isdigit</code> (de <code>ctype.h</code>) dice si es un número. El cast a <code>unsigned char</code> evita un comportamiento indefinido con caracteres negativos." },
    { f: "main", ln: "salida[j++]=c;", t: "El operando sale directo|Los números no necesitan esperar: su orden relativo no cambia al pasar a postfija. <code>j++</code> escribe en <code>j</code> y luego avanza." },
    { f: "main", ln: "salida[j++]=' ';", nth: 1, t: "Un espacio para separar|Sin él, «5» y «3» saldrían pegados como «53»." },
    { f: "main", ln: "else if(c=='('){", t: "Regla 2: abre paréntesis|Un <code>(</code> siempre se apila, sin comparar nada." },
    { f: "main", ln: "push(&pila,c);", nth: 1, t: "Apilar el «(»|Marca el inicio de un grupo. Funciona como una <b>pared</b>: los operadores de adentro no pueden sacar nada que esté debajo del paréntesis." },
    { f: "main", ln: "else if(c==')'){", t: "Regla 3: cierra paréntesis|Hay que sacar todo lo que se acumuló desde el «(» correspondiente." },
    { f: "main", ln: "while(!isEmpty(pila) && peek(&pila)!='('){", t: "Vaciar hasta encontrar el «(»|Mientras la pila no esté vacía <i>y</i> el tope no sea «(», se saca. El orden de las condiciones importa: <code>peek</code> sobre una pila vacía daría error." },
    { f: "main", ln: "salida[j++]=(char)pop(&pila);", nth: 1, t: "Operador a la salida|<code>pop</code> devuelve un <code>int</code>; se convierte a <code>char</code> para escribirlo en la cadena." },
    { f: "main", ln: "pop(&pila);", nth: 2, t: "Descartar el «(»|Se saca el paréntesis de apertura <b>sin escribirlo</b>: la postfija no tiene paréntesis. (Si no hubiera «(», este <code>pop</code> imprimiría «Error: la pila esta vacia».)" },
    { f: "main", ln: "else if(esOperador(c)){", t: "Regla 4: un operador|Aquí está el corazón del algoritmo." },
    { f: "main", ln: "while(!isEmpty(pila) && peek(&pila)!='(' &&", t: "¿El de arriba debe salir antes?|Mientras haya un operador en el tope (no un «(») y…" },
    { f: "main", ln: "precedencia(peek(&pila))>=precedencia(c)){", t: "…tenga prioridad <b>mayor o igual</b>|Si el operador del tope manda igual o más que el actual, debe ejecutarse <i>antes</i>, así que sale a la postfija. El <b>igual</b> (<code>&gt;=</code>) hace que <code>5-3-1</code> se agrupe de izquierda a derecha, como se espera." },
    { f: "main", ln: "salida[j++]=(char)pop(&pila);", nth: 2, t: "Sale el de mayor prioridad|Se desapila y se escribe." },
    { f: "main", ln: "push(&pila,c);", nth: 2, t: "Ahora sí, el operador actual espera|Cuando ya no hay nadie de mayor prioridad arriba, el actual se apila: tendrá que esperar a ver su segundo operando." },
    { f: "main", ln: "while(!isEmpty(pila)){", t: "Fin de la cadena: vaciar la pila|Los operadores que quedaron esperando salen en orden LIFO." },
    { f: "main", ln: "if(j>0) j--;", t: "Quitar el espacio sobrante|Cada token escribe un espacio detrás; el último sobra. <code>j--</code> retrocede para que el <code>'\\0'</code> lo pise." },
    { f: "main", ln: "salida[j]='\\0';", t: "Cerrar la cadena|En C, una cadena termina con el carácter nulo. Sin él, <code>printf(\"%s\")</code> seguiría leyendo basura." },
    { f: "main", ln: "destroy(&pila);", t: "Liberar la pila|Si quedara algún nodo (por ejemplo, un «(» sin cerrar), se libera aquí. Sin esto habría fugas de memoria." },
    { f: "main", ln: "const char *infija=", t: "La expresión de prueba|Un apuntador a una cadena literal (solo lectura)." },
    { f: "main", ln: "char postfija[128];", t: "Espacio para la respuesta|128 caracteres. El código no comprueba el límite: una expresión muy larga desbordaría el arreglo." },
    { f: "main", ln: "infijoAPostfijo(infija, postfija);", t: "La llamada|Se pasa la cadena y el arreglo; al regresar, <code>postfija</code> contiene el resultado." },
    { f: "impl", ln: "void push(struct Nodo **tope, int valor){", t: "Es la pila dinámica del tema anterior|Estos archivos son los mismos de la pila dinámica: <code>push</code> hace <code>malloc</code> del nodo, lo engancha al tope y actualiza la variable <code>pila</code> a través de <code>**tope</code>. Aquí lo único que cambia es que guarda <i>caracteres</i> (operadores) como si fueran enteros." },
    { f: "impl", ln: "int pop(struct Nodo **tope){", t: "<code>pop</code> con <code>free</code>|Saca el nodo de arriba, devuelve su dato y libera el nodo. Cada símbolo apilado hace un <code>malloc</code> y un <code>free</code>." },
  ];

  const htmlInfija = () => `
    <h2>Tres formas de escribir lo mismo</h2>
    <p>Una expresión se puede escribir según <b>dónde pones el operador</b>:</p>
    <div class="tabla-wrap"><table>
      <tr><th>Notación</th><th>Operador…</th><th><code>A + B</code></th><th><code>2 + 3 * 4</code></th></tr>
      <tr><td><b>Infija</b></td><td>en medio</td><td><code>A + B</code></td><td><code>2 + 3 * 4</code></td></tr>
      <tr><td><b>Prefija</b></td><td>antes</td><td><code>+ A B</code></td><td><code>+ 2 * 3 4</code></td></tr>
      <tr><td><b>Postfija</b></td><td>después</td><td><code>A B +</code></td><td><code>2 3 4 * +</code></td></tr>
    </table></div>
    <p>La infija es la que usamos las personas, pero necesita <b>reglas de prioridad</b> (¿primero el <code>*</code> o el <code>+</code>?) y <b>paréntesis</b>. La postfija no necesita ninguna de las dos: <mark>el orden en que lees es el orden en que se calcula</mark>. Por eso las calculadoras y muchos compiladores la usan por dentro.</p>
    <h2>Evaluar una postfija es muy fácil (con una pila)</h2>
    <p>Lees de izquierda a derecha: si es <b>número</b>, lo apilas; si es <b>operador</b>, sacas los dos de arriba, operas y apilas el resultado. Mira <code>2 3 4 * +</code>:</p>
    <div data-demo="evalCorta"></div>
    <p>Tu examen resuelve el paso <i>anterior</i>: convertir la infija (que escribe la persona) a postfija (que la máquina evalúa fácil).</p>
    <h2>El algoritmo (de Dijkstra, «shunting-yard»)</h2>
    <p>Se lee la infija de izquierda a derecha y se usa una <b>pila de operadores</b> como «vía de espera»:</p>
    <div class="tabla-wrap"><table>
      <tr><th>Símbolo leído</th><th>Qué hace tu código</th></tr>
      <tr><td><b>Dígito</b></td><td>Lo manda directo a la salida.</td></tr>
      <tr><td><b>(</b></td><td>Lo apila siempre.</td></tr>
      <tr><td><b>)</b></td><td>Saca operadores a la salida hasta encontrar el <code>(</code>; ese <code>(</code> se descarta.</td></tr>
      <tr><td><b>Operador</b></td><td>Mientras en el tope haya un operador de <b>prioridad ≥</b> a la del actual (y no sea <code>(</code>), lo saca a la salida. Luego apila el actual.</td></tr>
      <tr><td><b>Fin</b></td><td>Saca todo lo que quede en la pila.</td></tr>
    </table></div>
    <p>Prioridades en tu código: <code>+ -</code> = 1 · <code>* /</code> = 2 · <code>^</code> = 3.</p>
    ${n("idea", "¿Por qué funciona?", "<p>Un operador tiene que esperar porque quizá venga después otro más importante. Por ejemplo, en <code>5 + 3 * 7</code>: el <code>+</code> espera; llega <code>*</code> (más prioritario), también espera <i>encima</i> del <code>+</code>; al final salen en orden LIFO: primero <code>*</code>, luego <code>+</code>. Resultado: <code>5 3 7 * +</code>. Esa «espera en orden inverso a la llegada» es exactamente una <b>pila</b>.</p>")}
    <h2>Tu ejemplo, acción por acción</h2>
    <p>La expresión <code>${SU_EXPR}</code>. Cada paso es una decisión del algoritmo. Observa cómo la pila crece y decrece, y cómo la salida se va armando:</p>
    <div data-demo="ejemplo"></div>
    <p>Resultado: <code>5 3 7 * + 2 1 + 9 * +</code>. Si lo evalúas (pestaña <b>Evaluar postfija</b>), da <b>53</b>, igual que la infija original: 5 + 21 + 27.</p>
    <h2>Detalles de tu implementación</h2>
    <ul>
      <li><b>Pila dinámica de verdad:</b> cada operador apilado es un nodo con <code>malloc</code>; cada desapilado, un <code>free</code>. En la animación, las cajitas de la pila muestran la dirección (abreviada) de cada nodo; el tema <b>Pila dinámica</b> te enseña el heap completo.</li>
      <li><b>El <code>&gt;=</code> de la precedencia</b> hace que operadores del mismo nivel se agrupen de izquierda a derecha: <code>5-3-1</code> → <code>5 3 - 1 -</code> (es decir, (5−3)−1 = 1, correcto).</li>
      <li><b><code>destroy</code> al final</b> garantiza que no queden nodos si la expresión estaba mal escrita.</li>
    </ul>
    ${n("ojo", "Límites de la versión actual (por si el profe pregunta)", "<ul><li><b>Solo números de un dígito.</b> Cada dígito es un token: <code>12+3</code> produce <code>1 2 3 +</code> (¡mal!). Para soportar <code>12</code> habría que acumular dígitos consecutivos antes de escribir el espacio.</li><li><b>La potencia agrupa a la izquierda.</b> Por el <code>&gt;=</code>, <code>2^3^2</code> da <code>2 3 ^ 2 ^</code> = (2³)² = 64, pero en matemáticas la potencia agrupa a la derecha (2^(3²) = 512). Se arregla usando <code>&gt;</code> solo para <code>^</code>.</li><li><b>No valida la expresión.</b> Un <code>(</code> sin cerrar acaba escrito en la salida (<code>(1+2</code> → <code>1 2 + (</code>); un <code>)</code> de más hace que <code>pop</code> imprima «Error: la pila esta vacia» y siga.</li><li><b>No hay signos unarios</b> (<code>-5+2</code>) ni se comprueba que <code>postfija[128]</code> alcance.</li></ul>")}
    <h2>Complejidad</h2>
    <p>Cada símbolo se apila a lo más una vez y se desapila a lo más una vez: <b>O(n)</b> en tiempo. La pila crece como máximo al número de operadores y paréntesis pendientes.</p>
  `;

  function pestanaEscritorioInfija() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        const A = E.codigoDe("infija");
        const entrada = h("input", { type: "text", value: SU_EXPR, maxlength: 26, spellcheck: "false", "aria-label": "Expresión infija" });
        const aviso = h("p", { class: "aviso" }, "Usa dígitos sueltos (0-9) y los operadores + - * / ^ con paréntesis. Máximo 26 caracteres. Tu examen usa " + SU_EXPR + ".");
        const jugCont = h("div");
        let jug = null;
        function ejecutar() {
          const e = entrada.value.trim();
          if (!e.length) { aviso.className = "aviso aviso-err"; aviso.textContent = "Escribe una expresión."; return; }
          if (!/^[0-9+\-*/^() ]+$/.test(e)) { aviso.className = "aviso aviso-err"; aviso.textContent = "Solo se permiten dígitos, + - * / ^, paréntesis y espacios."; return; }
          const multi = /\d\d/.test(e);
          aviso.className = "aviso" + (multi ? " aviso-err" : "");
          aviso.textContent = multi ? "Ojo: tu código lee los números dígito por dígito, así que un número de dos cifras se parte en dos tokens (compruébalo)." : "Listo. Resultado: se ve en la consola al final.";
          const T = E.est.infija(e, A);
          jug.cargar(T.pasos, "Convirtiendo  " + e + "  →  " + T.postfija);
          jug.fijarDetalle("resumido");
        }
        const pre = (t, v) => h("button", { type: "button", class: "btn btn-chico", onclick: () => { entrada.value = v; ejecutar(); } }, t);
        cont.append(
          ui.panelCtl(
            h("label", { class: "grande" }, "Expresión infija", entrada),
            h("button", { type: "button", class: "btn btn-azul", onclick: ejecutar }, "Ejecutar"),
            h("div", { class: "preajustes" }, h("span", { class: "suave" }, "Ejemplos:"),
              pre("Tu examen", SU_EXPR), pre("2+3*4", "2+3*4"), pre("(1+2)*3", "(1+2)*3"), pre("5-3-1", "5-3-1"), pre("2^3^2", "2^3^2"), pre("(1+2 (mal escrita)", "(1+2"), pre("12+3 (2 cifras)", "12+3")),
            aviso
          )
        );
        entrada.addEventListener("keydown", (ev) => { if (ev.key === "Enter") ejecutar(); });
        cont.append(jugCont);
        jug = E.Jugador(jugCont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "main",
          vista: (c) => E.vistas.infija(c),
          pilaLlamadas: true,
          tabla: { cols: E.est.infija.cols, titulo: "Tu prueba de escritorio (una fila por decisión)" },
          detalleInicial: "resumido",
        });
        ejecutar();
      },
    };
  }

  function pestanaEvaluar() {
    return {
      titulo: "Evaluar postfija",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>El motivo de convertir a postfija: evaluarla es mecánico. <b>Número → apilar. Operador → sacar dos, operar, apilar el resultado.</b> Prueba con tu postfija o escribe otra (separa todo con espacios).</p>" }));
        const entrada = h("input", { type: "text", value: "5 3 7 * + 2 1 + 9 * +", spellcheck: "false", "aria-label": "Expresión postfija" });
        const zona = h("div");
        let mini = null;
        function correr() {
          const pasos = pasosEval(entrada.value);
          if (mini) mini.cargar(pasos);
          else mini = ui.MiniDemo(zona, { sello: "Evalúa", titulo: "postfija → valor", pasos: pasos, filtro: () => true, vista: vistaEval, ms: 1300 });
        }
        const pre = (v) => h("button", { type: "button", class: "btn btn-chico", onclick: () => { entrada.value = v; correr(); } }, v);
        cont.append(
          ui.panelCtl(
            h("label", { class: "grande" }, "Postfija", entrada),
            h("button", { type: "button", class: "btn btn-azul", onclick: correr }, "Evaluar"),
            h("div", { class: "preajustes" }, h("span", { class: "suave" }, "Ejemplos:"), pre("5 3 7 * + 2 1 + 9 * +"), pre("2 3 4 * +"), pre("8 2 / 3 -"), pre("2 3 +  *"))
          ),
          zona
        );
        entrada.addEventListener("keydown", (ev) => { if (ev.key === "Enter") correr(); });
        correr();
      },
    };
  }

  const quizInfija = [
    { p: "La postfija de <code>2+3*4</code> es…", op: ["2 3 + 4 *", "2 3 4 * +", "+ 2 * 3 4", "2 + 3 4 *"], ok: 1, porque: "El * tiene prioridad sobre el +: primero 3 4 *, y el resultado se suma a 2." },
    { p: "Al leer un <code>)</code>, ¿qué hace el algoritmo?", op: ["Lo apila", "Saca operadores a la salida hasta el ( y descarta el (", "Imprime error", "Vacía toda la pila"], ok: 1, porque: "El paréntesis de cierre dispara la salida de todo lo que se acumuló desde el «(» correspondiente. Ni «(» ni «)» aparecen en la postfija." },
    { p: "¿Por qué el <code>(</code> se apila siempre sin comparar prioridades?", op: ["Porque es un operador muy fuerte", "Porque funciona como una pared: marca dónde empieza el grupo", "Por un error del código", "Porque precedencia('(') es 3"], ok: 1, porque: "Lo que hay debajo del «(» no debe salir hasta que se cierre el grupo. Además precedencia('(') vale 0, y en el while hay una condición explícita peek != '('." },
    { p: "Con tu código, ¿cuál es la postfija de <code>5-3-1</code>?", op: ["5 3 1 - -", "5 3 - 1 -", "5 3 1 -", "- 5 - 3 1"], ok: 1, porque: "Al leer el segundo «-», en el tope hay un «-» de prioridad igual (1 >= 1): sale primero. Así (5−3)−1." },
    { p: "Para qué sirve el último <code>while(!isEmpty(pila))</code>?", op: ["Para liberar memoria", "Para sacar a la salida los operadores que quedaron esperando", "Para validar paréntesis", "Para contar operadores"], ok: 1, porque: "Al terminar de leer, los operadores pendientes salen en orden LIFO. (La memoria la libera destroy.)" },
    { p: "Evalúa la postfija <code>6 2 / 3 +</code>.", op: ["2", "5", "6", "9"], ok: 2, porque: "6 2 / = 3, la pila queda [3]. Se apila 3 → [3, 3]. El + da 3 + 3 = 6." },
    { p: "Con tu código, ¿qué pasa con <code>12+3</code>?", op: ["Da 12 3 +", "Da 1 2 3 + porque lee dígito por dígito", "Da error de compilación", "Da 15"], ok: 1, porque: "Cada dígito se considera un token: el 1 y el 2 salen separados. Para números de varias cifras habría que acumularlos." },
  ];

  E.registrar({
    id: "infija",
    grupo: "pila",
    orden: 5,
    titulo: "Infija → postfija",
    sub: "tu examen",
    resumen: "Convertir 5+3*7+(2+1)*9 a «5 3 7 * + 2 1 + 9 * +» con la pila dinámica de operadores.",
    chips: [{ k: "Algoritmo", v: "shunting-yard" }, { k: "Tiempo", v: "O(n)" }, { k: "Usa", v: "pila dinámica" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlInfija, {
        evalCorta: (el) => ui.MiniDemo(el, { sello: "Pruébalo", titulo: "evaluar 2 3 4 * +", pasos: pasosEval("2 3 4 * +"), filtro: () => true, vista: vistaEval, ms: 1400 }),
        ejemplo: (el) => {
          const A = E.codigoDe("infija");
          ui.MiniDemo(el, {
            sello: "Pruébalo",
            titulo: SU_EXPR,
            pasos: E.est.infija(SU_EXPR, A).pasos,
            filtro: (p) => !!p.fila,
            vista: (c) => E.vistas.infija(c),
            ms: 1500,
          });
        },
      }),
      codigo: ui.pestanaCodigo("infija", anotInfija, ["dec", "impl", "main"]),
      escritorio: pestanaEscritorioInfija(),
      evaluar: pestanaEvaluar(),
      quiz: ui.pestanaQuiz("infija", quizInfija),
    },
  });
})();
