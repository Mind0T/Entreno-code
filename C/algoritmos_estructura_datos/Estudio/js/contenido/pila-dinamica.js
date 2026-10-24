/* ============================================================
   Contenido: Pila dinamica (nodos en el heap) y leccion de
   apuntadores: un * (copia) vs dos ** (la variable original)
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const ui = E.ui;
  const n = ui.n;
  const V = E.V;

  /* ---------- guiones cortos para las demos de la explicacion ---------- */
  function pasosPila(ops, desde) {
    const A = E.codigoDe("pilaDinamica");
    const M = E.est.pilaDinamica(A);
    M.inicioLab();
    let ini = 0;
    ops.forEach(([op, a], k) => {
      if (k === desde) ini = M.pasos.length;
      M.lab(op, a);
    });
    return M.pasos.slice(ini);
  }
  const miniPila = (titulo, ops, desde) => (el) => {
    ui.MiniDemo(el, {
      sello: "Pruébalo",
      titulo: titulo,
      pasos: pasosPila(ops, desde || 0),
      filtro: (p) => p.lv === 0,
      vista: (c) => E.vistas.memoria(c),
      ms: 1700,
    });
  };

  /* foto fija de la memoria al final del guion (4 push) */
  function demoFoto(el) {
    const A = E.codigoDe("pilaDinamica");
    const M = E.est.pilaDinamica(A);
    M.guion();
    const idx = M.pasos.findIndex((p) => p.f === "main" && p.l === A.main.lines.findIndex((l) => /printStack/.test(l)) + 1);
    const p = M.pasos[Math.max(0, idx)];
    const caja = h("div", { class: "demo" }, h("div", { class: "demo-cab" }, h("span", { class: "demo-sello" }, "Así se ve"), h("span", {}, "tu pila después de push 10, 20, 30, 40")), h("div", { class: "demo-cuerpo" }));
    el.append(caja);
    E.vistas.memoria(caja.querySelector(".demo-cuerpo")).pintar(p.viz);
  }

  /* ====================================================================
     PILA DINAMICA
     ==================================================================== */
  const anotPD = [
    { f: "dec", ln: "struct Nodo{", t: "El nodo: la pieza básica|Cada elemento de la pila vive en un <b>nodo</b>. Un nodo es una <code>struct</code> con dos partes: el <b>dato</b> y un apuntador al <b>siguiente</b> nodo (el que quedó debajo)." },
    { f: "dec", ln: "int dato;", t: "El dato|Aquí va el número que guardas en la pila." },
    { f: "dec", ln: "struct Nodo* siguiente;", t: "El enlace|Guarda la <b>dirección</b> de otro nodo (o <code>NULL</code> si no hay más). Una <code>struct</code> puede contener un apuntador a su propio tipo; lo que <i>no</i> puede es contenerse a sí misma entera. Ese enlace es lo que forma la cadena." },
    { f: "dec", ln: "int isEmpty(struct Nodo *tope);", t: "<code>isEmpty</code> recibe UN asterisco|Solo necesita <i>mirar</i> el tope, no cambiarlo. Le basta una copia de la dirección." },
    { f: "dec", ln: "void push(struct Nodo **tope, int valor);", t: "<code>push</code> recibe DOS asteriscos|<code>push</code> sí tiene que <b>cambiar</b> quién es el tope. Para cambiar una variable de <code>main</code> (la que guarda el tope) hay que recibir <i>su dirección</i>. Y como esa variable ya es un apuntador (<code>struct Nodo *</code>), su dirección es un apuntador a apuntador: <code>struct Nodo **</code>. Mira la lección «Un * vs dos **» para verlo animado." },
    { f: "impl", ln: "int isEmpty(struct Nodo *tope){", t: "<code>isEmpty</code>|Recibe una copia del apuntador al tope." },
    { f: "impl", ln: "return tope==NULL;", t: "¿Vacía?|La pila está vacía cuando <b>no hay ningún nodo arriba</b>: el tope vale <code>NULL</code>. A diferencia de la versión de arreglo, no existe «llena»: la pila crece mientras haya memoria." },
    { f: "impl", ln: "void push(struct Nodo **tope, int valor){", t: "<code>push</code>|<code>tope</code> aquí NO es el nodo de arriba: es la <b>dirección de la variable</b> (en <code>main</code>) que guarda al nodo de arriba. Por eso <code>*tope</code> es «el tope actual»." },
    { f: "impl", ln: "struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));", t: "Pedir memoria al heap|<code>malloc(sizeof(struct Nodo))</code> reserva en el <b>heap</b> los bytes que mide un nodo (16 en la mayoría de sistemas de 64 bits: 4 del int + relleno + 8 del apuntador) y devuelve su dirección. <code>nuevo</code> (una variable local, en el stack) guarda esa dirección. El <code>(struct Nodo *)</code> es un «cast»: convierte el <code>void *</code> genérico de malloc al tipo correcto." },
    { f: "impl", ln: "if(nuevo==NULL){", t: "¿Hubo memoria?|<code>malloc</code> devuelve <code>NULL</code> si el sistema no puede darte más memoria. Si ignoras eso y escribes en <code>nuevo-&gt;dato</code>, el programa se cae." },
    { f: "impl", ln: "return;", nth: 1, t: "Salir sin romper nada|Si no hubo memoria, se termina <code>push</code> sin tocar la pila." },
    { f: "impl", ln: "nuevo->dato=valor;", t: "Llenar el nodo, 1/3|Se guarda el dato en el nodo recién creado. Antes de esto el nodo contiene basura." },
    { f: "impl", ln: "nuevo->siguiente=*tope;", t: "Llenar el nodo, 2/3: enganchar hacia abajo|El nodo nuevo apunta a lo que <i>era</i> el tope (<code>*tope</code>). Así no perdemos el resto de la pila. Si la pila estaba vacía, <code>*tope</code> es <code>NULL</code> y el nodo queda como el último." },
    { f: "impl", ln: "*tope=nuevo;", t: "Llenar el nodo, 3/3: coronar|<b>Aquí se modifica la variable de <code>main</code></b>: ahora el tope es el nodo nuevo. <b>El orden importa</b>: si hicieras esta línea antes de la anterior, perderías el tope viejo y toda la pila quedaría inalcanzable." },
    { f: "impl", ln: "int pop(struct Nodo **tope){", t: "<code>pop</code>|También recibe la dirección de la variable, porque va a <b>cambiar</b> el tope." },
    { f: "impl", ln: "if(isEmpty(*tope)){", nth: 1, t: "Checar que haya qué sacar|Se le pasa a <code>isEmpty</code> el <b>contenido</b> de la variable (<code>*tope</code>), que es el apuntador al nodo de arriba." },
    { f: "impl", ln: "struct Nodo *temp=*tope;", t: "Guardar el nodo a sacar|Se apunta con <code>temp</code> al nodo de arriba. Lo necesitamos porque en el siguiente paso el tope se moverá, y sin <code>temp</code> ya no sabríamos qué nodo liberar." },
    { f: "impl", ln: "int valor=temp->dato;", t: "Rescatar el dato|Se copia el número antes de liberar el nodo: después de <code>free</code> ya no se puede leer." },
    { f: "impl", ln: "*tope=temp->siguiente;", t: "Bajar el tope|La variable de <code>main</code> ahora apunta al nodo de abajo (o a <code>NULL</code> si era el único)." },
    { f: "impl", ln: "free(temp);", nth: 1, t: "Devolver la memoria|<code>free</code> regresa el nodo al sistema. <b>Si lo olvidas</b>, el nodo sigue reservado aunque nadie lo use: eso es una <i>fuga de memoria</i> (memory leak). Después de <code>free</code> no debes usar <code>temp</code> (apunta a memoria ya no tuya)." },
    { f: "impl", ln: "return valor;", t: "Devolver el dato|Se regresa la copia rescatada." },
    { f: "impl", ln: "return (*tope)->dato;", t: "<code>peek</code>|Los paréntesis importan: <code>(*tope)</code> es el apuntador al nodo de arriba y <code>-&gt;dato</code> su campo. Sin paréntesis, <code>*tope-&gt;dato</code> se leería como <code>*(tope-&gt;dato)</code> y no compila (tope no es una struct)." },
    { f: "impl", ln: "void destroy(struct Nodo **tope){", t: "<code>destroy</code>: limpiar todo|Libera <b>todos</b> los nodos. Debes llamarla al terminar de usar la pila." },
    { f: "impl", ln: "while(*tope!=NULL){", t: "Mientras haya nodos|Repite hasta que no quede ninguno." },
    { f: "impl", ln: "temp=*tope;", nth: 2, t: "Apuntar al nodo de arriba|Igual que en <code>pop</code>: guardar quién se va a liberar." },
    { f: "impl", ln: "*tope=(*tope)->siguiente;", t: "Avanzar antes de liberar|Primero se baja el tope; si se liberara primero, <code>(*tope)-&gt;siguiente</code> leería memoria ya liberada." },
    { f: "impl", ln: "free(temp);", nth: 2, t: "Liberar|Un <code>free</code> por cada <code>malloc</code>: la regla de oro." },
    { f: "impl", ln: "void printStack(struct Nodo **tope){", t: "<code>printStack</code>|Recorre sin modificar. (Podría recibir un solo <code>*</code>, pero se mantiene la firma igual al resto.)" },
    { f: "impl", ln: "struct Nodo *actual=*tope;", t: "Un recorredor|Se usa <code>actual</code> para caminar. <b>Nunca</b> muevas el tope real para recorrer: lo perderías." },
    { f: "impl", ln: "while(actual!=NULL){", t: "Hasta salirse de la cadena|El último nodo apunta a <code>NULL</code>, esa es la señal de fin." },
    { f: "impl", ln: "actual=actual->siguiente;", t: "Dar un paso|Se mueve <code>actual</code> al nodo de abajo." },
    { f: "main", ln: "struct Nodo *pila=NULL;", t: "<b>La pila entera es esta variable</b>|Un solo apuntador en el stack de <code>main</code>. Vale <code>NULL</code> = pila vacía. Todos los nodos vivirán en el heap y se alcanzan a partir de aquí." },
    { f: "main", ln: "push(&pila,10);", t: "Se pasa la dirección de <code>pila</code>|<code>&amp;pila</code> es la dirección de la <b>variable</b>, no del nodo. Así <code>push</code> puede cambiar a quién apunta <code>pila</code>." },
    { f: "main", ln: 'printf("Elemento en el tope: %d\\n", peek(&pila));', t: "<code>peek</code> dentro de <code>printf</code>|Se ejecuta <code>peek</code>, que devuelve el dato del tope sin tocar la pila, y luego se imprime." },
    { f: "main", ln: 'printf("Elemento extraido: %d\\n",pop(&pila));', t: "<code>pop</code> dentro de <code>printf</code>|Saca el 40 (el último que entró) y libera su nodo." },
    { f: "main", ln: "destroy(&pila);", t: "Limpieza final|Libera los 3 nodos que quedaron. Sin esta línea habría 3 fugas." },
  ];

  const htmlPD = () => `
    <h2>Lo que cambia respecto a la pila estática</h2>
    <p>La pila de arreglo tiene un límite fijo (7 casillas). La <b>pila dinámica</b> no: cada elemento vive en un pequeño bloque de memoria llamado <mark>nodo</mark>, que se pide con <code>malloc</code> cuando entra un elemento y se devuelve con <code>free</code> cuando sale. Crece y se encoge según lo necesites.</p>
    <p>Pero hay un precio: para no perder los nodos (que quedan desperdigados por la memoria) cada uno guarda <b>la dirección del que está debajo</b>. Se forma una cadena: una <i>lista enlazada</i>.</p>
    <h2>Stack y heap: dos zonas de memoria</h2>
    <div class="dos-col">
      <div class="tarjeta"><h3>Stack (pila de llamadas)</h3><p>Aquí viven las variables locales y los parámetros de cada función. Se crea al entrar a la función y <b>desaparece sola</b> al salir. Es rápido y de tamaño limitado. <code>main</code>, <code>pila</code>, <code>nuevo</code>, <code>temp</code>, <code>tope</code> están aquí.</p></div>
      <div class="tarjeta"><h3>Heap (memoria dinámica)</h3><p>Aquí viven los bloques que pides con <code>malloc</code>. <b>No desaparecen solos</b>: duran hasta que llames a <code>free</code>. Tú decides cuándo nacen y cuándo mueren. Los <b>nodos</b> de tu pila están aquí.</p></div>
    </div>
    <p>Esta es la foto de tu pila después de cuatro <code>push</code>. A la izquierda el stack (las variables), a la derecha el heap (los nodos). Las flechas son <b>direcciones guardadas</b>.</p>
    <div data-demo="foto"></div>
    ${n("idea", "Cómo leer la foto", "<ul><li>En <code>main</code> solo hay <b>una</b> variable: <code>pila</code>. Guarda la dirección del nodo de arriba (el 40).</li><li>Cada nodo tiene arriba su <b>dirección</b> en el heap y dos casillas: <code>dato</code> y <code>siguiente</code>.</li><li><code>siguiente</code> del 40 apunta al 30, el del 30 al 20, el del 20 al 10, y el del 10 vale <code>NULL</code>: fin de la cadena.</li><li>Las direcciones son ilustrativas (en tu máquina serán otras) pero la lógica es idéntica.</li></ul>")}
    <h2><code>push</code> en cuatro líneas</h2>
    <div class="bloque"><code>struct Nodo *nuevo = malloc(sizeof(struct Nodo));  // 1. pedir un nodo al heap
nuevo->dato = valor;                               // 2. guardar el dato
nuevo->siguiente = *tope;                          // 3. enganchar al tope anterior
*tope = nuevo;                                     // 4. ahora el tope es el nuevo</code></div>
    <p>Avanza paso a paso con <b>Siguiente</b> y observa cómo aparece el nodo, cómo se rellena, y cómo se mueve la variable <code>pila</code>:</p>
    <div data-demo="push"></div>
    ${n("ojo", "El orden de las líneas 3 y 4 no es negociable", "<p>Si pones <code>*tope = nuevo;</code> <b>antes</b> de <code>nuevo-&gt;siguiente = *tope;</code>, la segunda línea ya encuentra <code>*tope</code> igual a <code>nuevo</code>: el nodo se apunta a sí mismo, y toda la pila anterior queda <b>inalcanzable</b> (nadie guarda su dirección). Primero se enlaza hacia abajo; <i>después</i> se corona.</p>")}
    <h2><code>pop</code>: cuatro pasos y un <code>free</code></h2>
    <div class="bloque"><code>struct Nodo *temp = *tope;   // 1. recordar qué nodo se va a sacar
int valor = temp->dato;      // 2. rescatar su dato
*tope = temp->siguiente;     // 3. bajar el tope
free(temp);                  // 4. devolver el nodo al sistema</code></div>
    <p>¿Por qué <code>temp</code>? Porque tras el paso 3 el nodo viejo ya no es el tope y <b>nadie más</b> guarda su dirección. Sin <code>temp</code> no podrías liberarlo: fuga de memoria.</p>
    <div data-demo="pop"></div>
    <h2>Cuándo sale mal</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Error</th><th>Qué es</th><th>Cómo lo evita tu código</th></tr>
      <tr><td><b>Fuga de memoria</b></td><td>Un <code>malloc</code> sin su <code>free</code>: bloques reservados que nadie usa.</td><td><code>free(temp)</code> en <code>pop</code> y <code>destroy</code> al final.</td></tr>
      <tr><td><b>Usar memoria liberada</b></td><td>Leer o escribir un nodo después de <code>free</code>.</td><td>Se rescata <code>valor</code> antes de liberar y no se usa <code>temp</code> después.</td></tr>
      <tr><td><b>Doble liberación</b></td><td>Hacer <code>free</code> dos veces al mismo bloque: el programa puede abortar.</td><td>Cada nodo se libera exactamente una vez.</td></tr>
      <tr><td><b>Perder el tope</b></td><td>Cambiar el apuntador sin guardar el anterior.</td><td>El orden de las líneas en <code>push</code> y el uso de <code>temp</code>.</td></tr>
      <tr><td><b>malloc falla</b></td><td>No hay memoria: devuelve <code>NULL</code>.</td><td><code>if(nuevo==NULL)</code> en <code>push</code>.</td></tr>
    </table></div>
    <h2>Estática vs. dinámica</h2>
    <div class="tabla-wrap"><table>
      <tr><th></th><th>Estática (arreglo)</th><th>Dinámica (nodos)</th></tr>
      <tr><td>Capacidad</td><td>Fija (MAX)</td><td>Hasta que se acabe la memoria</td></tr>
      <tr><td>push / pop / peek</td><td class="num">O(1)</td><td class="num">O(1)</td></tr>
      <tr><td>Memoria por elemento</td><td>4 bytes</td><td>≈ 16 bytes (dato + apuntador + relleno) más el costo de <code>malloc</code></td></tr>
      <tr><td>Hay que liberar</td><td>No</td><td><b>Sí</b>: <code>free</code> / <code>destroy</code></td></tr>
      <tr><td>Complejidad del código</td><td>Baja</td><td>Media (apuntadores)</td></tr>
      <tr><td>¿isFull?</td><td>Sí</td><td>No existe</td></tr>
    </table></div>
    <p>El siguiente tema, <b>Un * vs dos **</b>, explica con animaciones por qué <code>push</code> y <code>pop</code> reciben <code>struct Nodo **tope</code>. Es la parte que más se pregunta en exámenes.</p>
  `;

  function pestanaEscritorioPD() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>Esta es la ejecución completa de tu <code>pilaDinamica.c</code> (4 <code>push</code>, <code>printStack</code>, <code>peek</code>, <code>pop</code>, <code>printStack</code>, <code>destroy</code>). Observa cómo nacen y mueren los nodos en el heap, y cómo se llenan los marcos del stack al llamar a cada función. Usa el nivel <b>Resumido</b> si quieres ir más rápido.</p>" }));
        const A = E.codigoDe("pilaDinamica");
        const M = E.est.pilaDinamica(A);
        M.guion();
        const jug = E.Jugador(cont.appendChild(h("div")), {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "main",
          vista: (c) => E.vistas.memoria(c),
          panelVars: false,
          pilaLlamadas: false,
        });
        jug.cargar(M.pasos, "Tu pilaDinamica.c · stack y heap");
      },
    };
  }
  function pestanaLaboratorioPD() {
    return {
      titulo: "Laboratorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>Tú decides qué se llama. Prueba: <code>push</code> varias veces y luego <code>pop</code>; haz <code>pop</code> con la pila vacía; o mete elementos y termina <b>sin</b> llamar a <code>destroy</code> para ver cuántos nodos quedan reservados (en el contador de arriba a la derecha).</p>" }));
        const A = E.codigoDe("pilaDinamica");
        ui.Laboratorio(cont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "impl",
          vista: (c) => E.vistas.memoria(c),
          panelVars: false,
          crear: () => E.est.pilaDinamica(A),
          arranque: (M) => M.inicioLab(),
          ops: [
            { id: "push", etq: "push(&pila, ▢)", arg: true, llamada: (a) => "push(&pila, " + a + ");" },
            { id: "pop", etq: "pop(&pila)", llamada: () => "pop(&pila);" },
            { id: "peek", etq: "peek(&pila)", llamada: () => "peek(&pila);" },
            { id: "print", etq: "printStack(&pila)", llamada: () => "printStack(&pila);" },
            { id: "destroy", etq: "destroy(&pila)", llamada: () => "destroy(&pila);" },
          ],
          aliases: { push: "push", pop: "pop", peek: "peek", print: "print", printstack: "print", destroy: "destroy" },
          ejemploSecuencia: "push 10, push 20, pop, destroy",
          estado: (M) => "nodos en el heap: " + M.nodos(),
        });
      },
    };
  }
  const quizPD = [
    { p: "¿En qué zona de memoria reserva <code>malloc</code> los nodos?", op: ["Stack", "Heap", "En el registro del CPU", "En el código del programa"], ok: 1, porque: "El heap guarda los bloques dinámicos. Duran hasta que llamas a free; el stack, en cambio, se limpia solo al salir de cada función." },
    { p: "En <code>pop</code>, ¿para qué sirve la variable <code>temp</code>?", op: ["Para contar elementos", "Para recordar qué nodo liberar después de mover el tope", "Para guardar el dato", "No sirve; se puede quitar"], ok: 1, porque: "Después de *tope = temp->siguiente nadie más guarda la dirección del nodo viejo. Sin temp no podrías hacer free y habría una fuga." },
    { p: "Dentro de <code>push</code>, <code>*tope</code> es…", op: ["El dato del nodo de arriba", "La variable pila de main (la que apunta al nodo de arriba)", "La dirección del heap", "El nodo nuevo"], ok: 1, porque: "tope guarda la dirección de la variable pila. Con * llegas a la variable: su valor es la dirección del nodo de arriba." },
    { p: "¿Qué pasa si intercambias <code>nuevo-&gt;siguiente = *tope;</code> y <code>*tope = nuevo;</code>?", op: ["Nada, es equivalente", "El nodo se apunta a sí mismo y se pierde el resto de la pila", "Se ordena la pila", "El compilador lo corrige"], ok: 1, porque: "Al hacer primero *tope = nuevo, la siguiente línea copia ese mismo valor en nuevo->siguiente. La pila anterior queda inalcanzable." },
    { p: "Haces 5 <code>push</code> y ningún <code>pop</code> ni <code>destroy</code>, y el programa termina. ¿Cuántos nodos quedaron sin liberar?", op: ["0", "1", "5", "Depende del sistema"], ok: 2, porque: "Cada push hizo un malloc y nadie hizo free: 5 fugas. (El sistema operativo los recupera al terminar el proceso, pero en un programa largo serían un problema serio.)" },
    { p: "¿Por qué <code>isEmpty</code> recibe <code>struct Nodo *tope</code> (un asterisco) pero <code>push</code> recibe <code>struct Nodo **tope</code>?", op: ["Por error de estilo", "isEmpty solo mira el valor; push debe modificar la variable pila", "Porque isEmpty devuelve int", "Porque push usa malloc"], ok: 1, porque: "Para solo leer basta una copia. Para cambiar la variable original hace falta su dirección: apuntador a apuntador." },
  ];
  E.registrar({
    id: "pilaDinamica",
    grupo: "pila",
    orden: 3,
    titulo: "Pila dinámica",
    sub: "nodos en el heap",
    resumen: "LIFO con nodos enlazados: malloc, free, stack vs heap y por qué push recibe struct Nodo **.",
    chips: [{ k: "Estructura", v: "lista enlazada" }, { k: "push / pop / peek", v: "O(1)" }, { k: "Capacidad", v: "sin límite fijo" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlPD, {
        foto: demoFoto,
        push: miniPila("push(&pila, 10) y luego push(&pila, 20)", [["push", 10], ["push", 20]], 0),
        pop: miniPila("pop(&pila) sobre una pila con 10, 20 y 30", [["push", 10], ["push", 20], ["push", 30], ["pop"]], 3),
      }),
      codigo: ui.pestanaCodigo("pilaDinamica", anotPD, ["dec", "impl", "main"]),
      escritorio: pestanaEscritorioPD(),
      laboratorio: pestanaLaboratorioPD(),
      quiz: ui.pestanaQuiz("pilaDinamica", quizPD),
    },
  });

  /* ====================================================================
     LECCION: UN * vs DOS **
     ==================================================================== */
  /* mini trazas hechas a mano con enteros (sin archivo C): duplica */
  function trazaEntero(version) {
    const T = E.nuevoTrazo();
    const bien = version === "bien";
    const A_MAIN = E.dirStack(0, 0);
    const main = (v) => ({ fn: "main()", vars: [{ n: "numero", t: "int", a: A_MAIN, val: V.int(v) }] });
    const hijo = (v, apunta) => ({
      fn: bien ? "duplicaBien(x)" : "duplicaMal(x)",
      vars: [bien ? { n: "x", t: "int *", a: E.dirStack(1, 0), val: V.ptr(A_MAIN) } : { n: "x", t: "int", a: E.dirStack(1, 0), val: V.int(v) }],
    });
    const viz = (frames, foco) => ({ frames, heap: [], foco: foco || [] });
    T.paso({ nota: "<code>numero</code> es una variable <code>int</code> en el stack de <code>main</code>. Vale <b>5</b> y su dirección es " + A_MAIN + ".", viz: viz([main(5)], ["main.numero"]), lv: 0 });
    if (!bien) {
      T.paso({ nota: "<code>duplicaMal(numero)</code>: C <b>copia el valor</b> 5 en el parámetro <code>x</code>. Ahora hay <b>dos</b> variables distintas, cada una en su propia dirección, que casualmente valen lo mismo.", viz: viz([main(5), hijo(5)], ["duplicaMal.x"]), lv: 0 });
      T.paso({ nota: "<code>x = x * 2;</code> → la copia vale <b>10</b>. Pero <code>numero</code>, la original, sigue valiendo 5: nadie la tocó.", viz: viz([main(5), hijo(10)], ["duplicaMal.x"]), lv: 0, etiqueta: "err" });
      T.paso({ nota: "La función termina y su marco (con <code>x</code>) desaparece del stack. Resultado: <b>numero sigue en 5</b>. Duplicamos una copia que ya no existe.", viz: viz([main(5)], ["main.numero"]), lv: 0, etiqueta: "err" });
    } else {
      T.paso({ nota: "<code>duplicaBien(&amp;numero)</code>: ahora se pasa la <b>dirección</b> de <code>numero</code>. El parámetro <code>x</code> es un apuntador (<code>int *</code>) y guarda " + A_MAIN + ": «la casa donde vive numero».", viz: viz([main(5), hijo(5)], ["duplicaBien.x", "main.numero"]), lv: 0 });
      T.paso({ nota: "<code>*x = *x * 2;</code> → el <code>*</code> significa «ve a esa dirección». Se lee 5 de ahí, se multiplica y <b>se escribe 10 en la variable original</b>.", viz: viz([main(10), hijo(10)], ["main.numero", "duplicaBien.x"]), lv: 0, etiqueta: "ok" });
      T.paso({ nota: "La función termina y <code>x</code> desaparece, pero <code>numero</code> ya fue modificada: vale <b>10</b>. Para cambiar una variable de otra función, hay que pasarle su dirección.", viz: viz([main(10)], ["main.numero"]), lv: 0, etiqueta: "ok" });
    }
    return T.pasos;
  }
  const demoEntero = (version) => (el) => {
    ui.MiniDemo(el, {
      sello: version === "mal" ? "Con una copia" : "Con la dirección",
      titulo: version === "mal" ? "duplicaMal(numero)" : "duplicaBien(&numero)",
      pasos: trazaEntero(version),
      filtro: () => true,
      vista: (c) => E.vistas.memoria(c),
      ms: 2000,
    });
  };

  const htmlDoble = () => `
    <h2>Primero: C siempre pasa copias</h2>
    <p>Cuando llamas a una función, C <b>copia</b> el valor de cada argumento en el parámetro. La función trabaja con la copia; lo que le hagas no afecta la variable original. Compara estas dos funciones:</p>
    <div class="dos-col">
      <div class="bloque"><code>void duplicaMal(int x) {
    x = x * 2;
}
// duplicaMal(numero);</code></div>
      <div class="bloque"><code>void duplicaBien(int *x) {
    *x = *x * 2;
}
// duplicaBien(&numero);</code></div>
    </div>
    <div class="dos-col">
      <div><div data-demo="entMal"></div></div>
      <div><div data-demo="entBien"></div></div>
    </div>
    ${n("idea", "Regla de oro", "<p><b>Si una función necesita CAMBIAR una variable tuya, no le des el valor: dale la dirección.</b> Con <code>&amp;variable</code> envías la dirección, y dentro de la función <code>*parametro</code> es «la variable original».</p>")}
    <h2>Ahora con apuntadores</h2>
    <p>En tu pila, la variable que quieres cambiar es <code>pila</code>, y es un <b>apuntador</b> (<code>struct Nodo *</code>). Cambiar un apuntador es igual que cambiar un <code>int</code>: si le das a la función su valor, recibe una copia; para modificar el original necesitas <b>la dirección del apuntador</b>.</p>
    <p>La dirección de un <code>int</code> es de tipo <code>int *</code>. La dirección de un <code>struct Nodo *</code> es de tipo <code>struct Nodo **</code>: un <mark>apuntador a un apuntador</mark>. De ahí los dos asteriscos.</p>
    <div class="tabla-wrap"><table>
      <tr><th>Quieres cambiar…</th><th>La variable es de tipo</th><th>La función recibe</th><th>Se llama con</th></tr>
      <tr><td>un número</td><td><code>int</code></td><td><code>int *x</code></td><td><code>f(&amp;numero)</code></td></tr>
      <tr><td>la pila (el tope)</td><td><code>struct Nodo *</code></td><td><code>struct Nodo **tope</code></td><td><code>push(&amp;pila, 10)</code></td></tr>
    </table></div>
    <h2>Las dos versiones de <code>push</code>, lado a lado</h2>
    <p>Elige la versión en la pestaña <b>Prueba de escritorio</b>. Mira especialmente el momento en que se ejecuta <code>tope = nuevo</code> (versión incorrecta) frente a <code>*tope = nuevo</code> (versión correcta).</p>
    <div class="dos-col">
      <div class="tarjeta"><h3>Con un <code>*</code> (incorrecta)</h3><div class="bloque"><code>void pushMal(struct Nodo *tope, int valor) {
    struct Nodo *nuevo = malloc(...);
    nuevo->dato = valor;
    nuevo->siguiente = tope;
    tope = nuevo;     // ¡cambia la COPIA!
}</code></div><p><code>pila</code> en <code>main</code> nunca se entera. Además, cada nodo queda <b>perdido en el heap</b>: fuga de memoria.</p></div>
      <div class="tarjeta"><h3>Con dos <code>**</code> (correcta)</h3><div class="bloque"><code>void pushBien(struct Nodo **tope, int valor) {
    struct Nodo *nuevo = malloc(...);
    nuevo->dato = valor;
    nuevo->siguiente = *tope;
    *tope = nuevo;    // cambia pila de main
}</code></div><p><code>*tope</code> <i>es</i> <code>pila</code>. Al asignarle, <code>main</code> ve el cambio.</p></div>
    </div>
    <h2>Cómo leer <code>*tope</code> y <code>tope</code> sin marearte</h2>
    <ul>
      <li><code>tope</code> → una dirección: la de la variable <code>pila</code> de <code>main</code>.</li>
      <li><code>*tope</code> → «ve a esa dirección y lee lo que hay»: el contenido de <code>pila</code>, que a su vez es la dirección del nodo de arriba.</li>
      <li><code>(*tope)-&gt;dato</code> → de ese nodo, su campo <code>dato</code>.</li>
    </ul>
    <p>Son <b>dos saltos</b>: variable → variable pila → nodo. Por eso «doble apuntador».</p>
    ${n("tip", "¿Y las funciones que solo leen?", "<p><code>isEmpty(struct Nodo *tope)</code> solo mira el tope, no lo cambia, así que se le pasa una copia del apuntador: <code>isEmpty(*tope)</code> desde <code>pop</code>. En general: <b>si la función no modifica la variable, no hace falta el doble apuntador.</b></p>")}
    <h2>Alternativa: devolver el nuevo tope</h2>
    <p>Hay otro estilo que evita el <code>**</code>: que <code>push</code> <i>devuelva</i> el nuevo tope y <code>main</code> lo guarde: <code>pila = push(pila, 10);</code>. Funciona, pero es fácil olvidar el <code>pila =</code>. El doble apuntador hace que la función cambie la variable «por sí misma».</p>
  `;
  const quizDoble = [
    { p: "En <code>void pushMal(struct Nodo *tope, int valor)</code>, ¿qué es <code>tope</code>?", op: ["La variable pila de main", "Una copia del valor de pila", "La dirección de pila", "Un nodo nuevo"], ok: 1, porque: "C pasa por valor: tope es una variable distinta que guarda lo mismo que pila. Cambiar tope no cambia pila." },
    { p: "Después de dos llamadas a <code>pushMal(pila, …)</code>, ¿cuánto vale <code>pila</code> en main?", op: ["Apunta al segundo nodo", "Apunta al primero", "NULL", "Basura"], ok: 2, porque: "Nunca se modificó. Y los dos nodos quedaron en el heap sin que nadie los apunte." },
    { p: "En <code>pushBien</code>, ¿qué significa <code>*tope = nuevo;</code>?", op: ["Cambia la copia local", "Cambia la variable pila de main", "Libera el nodo", "Copia el dato"], ok: 1, porque: "tope guarda la dirección de pila; * va a esa dirección. Asignar ahí cambia pila de verdad." },
    { p: "¿Por qué en main se escribe <code>push(&amp;pila, 10)</code> y no <code>push(pila, 10)</code>?", op: ["Por estilo", "Porque push necesita la dirección de la variable para poder modificarla", "Porque pila es un arreglo", "Porque 10 es un int"], ok: 1, porque: "&pila produce un struct Nodo ** que es justo lo que push espera." },
    { p: "¿Qué tipo tiene <code>&amp;pila</code> si <code>pila</code> es <code>struct Nodo *</code>?", op: ["struct Nodo", "struct Nodo *", "struct Nodo **", "int"], ok: 2, porque: "Cada & agrega un asterisco al tipo: la dirección de un struct Nodo * es un struct Nodo **." },
    { p: "Quieres una función que solo <b>imprima</b> la pila. ¿Necesita <code>**</code>?", op: ["Sí, siempre", "No: con una copia del apuntador basta", "Sí, por el malloc", "Depende del compilador"], ok: 1, porque: "Solo lee. El doble apuntador es necesario únicamente cuando hay que cambiar a dónde apunta la variable original." },
  ];

  function pestanaEscritorioDoble() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        const caja = h("div");
        const sel = h("select", { "aria-label": "Versión", onchange: () => cargar() }, h("option", { value: "mal" }, "Con un * (incorrecta)"), h("option", { value: "bien" }, "Con dos ** (correcta)"));
        cont.append(
          ui.panelCtl(h("label", {}, "Versión de push", sel), h("p", { class: "aviso" }, "Cambia de versión y compara. Fíjate en el stack (izquierda): en la incorrecta, el marco de pushMal tiene su propia copia de «tope»; en la correcta, «tope» guarda la dirección de «pila».")),
          caja
        );
        let jug = null;
        let version = null;
        function cargar() {
          version = sel.value;
          E.vaciar(caja);
          const A = E.codigoDe(version === "mal" ? "dobleMal" : "dobleBien");
          const T = E.est.dobleApuntador(version, A);
          jug = E.Jugador(caja, { archivos: A, orden: ["impl"], inicial: "impl", vista: (c) => E.vistas.memoria(c), panelVars: false, consola: false });
          jug.cargar(T.pasos, version === "mal" ? "pushMal · recibe una copia (un *)" : "pushBien · recibe la dirección de pila (dos **)");
        }
        cargar();
      },
    };
  }

  E.registrar({
    id: "dobleApuntador",
    grupo: "pila",
    orden: 4,
    titulo: "Un * vs dos **",
    sub: "apuntadores a apuntadores",
    resumen: "Por qué push recibe struct Nodo **tope: pasar copias vs. pasar la dirección de la variable.",
    chips: [{ k: "Tema clave", v: "paso por valor" }, { k: "Se pregunta mucho", v: "en exámenes" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlDoble, { entMal: demoEntero("mal"), entBien: demoEntero("bien") }),
      escritorio: pestanaEscritorioDoble(),
      quiz: ui.pestanaQuiz("dobleApuntador", quizDoble),
    },
  });
})();
