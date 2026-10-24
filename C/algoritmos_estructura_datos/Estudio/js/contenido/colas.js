/* ============================================================
   Contenido: colas (FIFO)
     colaEstatica  -> arreglo circular (frente, final, cantidad)
     colaDinamica  -> nodos enlazados con frente y final
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const ui = E.ui;
  const n = ui.n;

  const AVISO_C_EXTRA =
    "<p class='suave'>Nota: los archivos de colas los escribí yo para esta página, con el mismo estilo que tus pilas (<code>init</code>, <code>isEmpty</code>, <code>enqueue</code>, <code>dequeue</code>, <code>front</code>, <code>printQueue</code>). Están en <code>Estudio/c_extra/</code>; compílalos y compáralos con lo que hayas visto en clase.</p>";

  function pasosDe(fabrica, nombreCodigo, ops, desde) {
    const A = E.codigoDe(nombreCodigo);
    const M = fabrica(A);
    const arr = M.inicioLab();
    void arr;
    let ini = 0;
    ops.forEach(([op, a], k) => {
      if (k === desde) ini = M.pasos.length;
      M.lab(op, a);
    });
    return M.pasos.slice(ini);
  }
  const miniEst = (titulo, ops, desde, ms) => (el) =>
    ui.MiniDemo(el, {
      sello: "Pruébalo",
      titulo: titulo,
      pasos: pasosDe(E.est.colaEstatica, "colaEstatica", ops, desde),
      filtro: (p) => p.lv === 0 && p.f === "impl",
      vista: (c) => E.vistas.colaEst(c),
      ms: ms || 1500,
    });
  const miniDin = (titulo, ops, desde) => (el) =>
    ui.MiniDemo(el, {
      sello: "Pruébalo",
      titulo: titulo,
      pasos: pasosDe(E.est.colaDinamica, "colaDinamica", ops, desde),
      filtro: (p) => p.lv === 0,
      vista: (c) => E.vistas.memoria(c),
      ms: 1700,
    });

  /* ====================================================================
     COLA ESTATICA (circular)
     ==================================================================== */
  const anotCE = [
    { f: "dec", ln: "#define MAX 5", t: "Capacidad|La cola guarda como máximo 5 elementos. Se eligió un número chico para que veas fácil cómo se llena y cómo «da la vuelta»." },
    { f: "dec", ln: "struct Cola {", t: "La cola completa en una struct|Junta el arreglo y <b>tres</b> números que lo controlan." },
    { f: "dec", ln: "int dato[MAX];", t: "El almacén|Un arreglo de 5 enteros. Se usa como si fuera un <b>círculo</b>: después de la casilla 4 viene la 0." },
    { f: "dec", ln: "int frente;", t: "Quién sale primero|Índice del elemento que lleva más tiempo esperando. <code>dequeue</code> lo saca y avanza este índice." },
    { f: "dec", ln: "int final;", t: "Quién entró al último|Índice del último elemento agregado. <code>enqueue</code> avanza este índice y escribe ahí." },
    { f: "dec", ln: "int cantidad;", t: "Cuántos hay|Es lo que permite distinguir «llena» de «vacía». Sin él, ambas se verían igual (frente justo detrás de final)." },
    { f: "impl", ln: "c->frente=0;", t: "<code>init</code>: el primero será la casilla 0|Cuando llegue el primer elemento, se guardará en la casilla 0 y será a la vez el frente." },
    { f: "impl", ln: "c->final=-1;", t: "<code>final</code> empieza en −1|Porque <code>enqueue</code> primero <i>avanza</i> final y después escribe: (−1 + 1) % 5 = 0. Así el primer elemento cae en la casilla 0." },
    { f: "impl", ln: "c->cantidad=0;", t: "Cola vacía|Cero elementos." },
    { f: "impl", ln: "return c->cantidad==0;", t: "<code>isEmpty</code>|Vacía ⇔ no hay elementos." },
    { f: "impl", ln: "return c->cantidad==MAX;", t: "<code>isFull</code>|Llena ⇔ hay tantos como casillas." },
    { f: "impl", ln: "if(isFull(c)){", t: "Primero: ¿cabe?|Si está llena, escribir en <code>final + 1</code> pisaría al elemento del frente (el más viejo): se perdería un dato." },
    { f: "impl", ln: "c->final=(c->final+1)%MAX;", t: "La línea circular|<code>%</code> es el <b>residuo</b> de la división. Avanza <code>final</code> en 1, pero si llega a 5 se regresa a 0: <code>(4 + 1) % 5 = 0</code>. Así se reutilizan los huecos del principio que dejó <code>dequeue</code>." },
    { f: "impl", ln: "c->dato[c->final]=valor;", t: "Guardar|El nuevo elemento se escribe en la posición recién calculada." },
    { f: "impl", ln: "c->cantidad++;", t: "Ahora hay uno más|" },
    { f: "impl", ln: "int valor=c->dato[c->frente];", t: "<code>dequeue</code>: recordar el valor|Se guarda el dato del frente para devolverlo." },
    { f: "impl", ln: "c->frente=(c->frente+1)%MAX;", t: "Avanzar el frente (también circular)|El elemento sacado <b>no se borra</b>: simplemente el frente se mueve y esa casilla queda libre para reutilizarse." },
    { f: "impl", ln: "c->cantidad--;", t: "Uno menos|" },
    { f: "impl", ln: "return c->dato[c->frente];", t: "<code>front</code>: mirar sin sacar|Devuelve el primero de la fila, sin mover nada." },
    { f: "impl", ln: "for(int k=0;k<c->cantidad;k++){", t: "<code>printQueue</code>: recorrer en orden|Se recorre <code>cantidad</code> veces, no «de 0 a MAX»: los elementos pueden estar repartidos «dando la vuelta»." },
    { f: "impl", ln: 'printf("%d  ",c->dato[(c->frente+k)%MAX]);', t: "El índice real|<code>(frente + k) % MAX</code> convierte «el k-ésimo elemento desde el frente» en su posición verdadera en el arreglo, aunque dé la vuelta." },
    { f: "main", ln: "struct Cola cola;", t: "La cola vive en el stack de <code>main</code>|Las 5 casillas y los tres contadores: 32 bytes." },
    { f: "main", ln: "init(&cola);", t: "Inicializar|Pasa la dirección para que <code>init</code> modifique la cola real." },
    { f: "main", ln: "enqueue(&cola,10);", t: "Entran 10, 20 y 30|Quedan en las casillas 0, 1 y 2. El frente es 0 (el 10) y el final es 2 (el 30)." },
    { f: "main", ln: 'printf("Atendido: %d\\n",dequeue(&cola));', t: "Sale el primero en llegar|FIFO: sale el 10, no el 30. Ahora el frente es 1." },
    { f: "main", ln: "enqueue(&cola,60);", t: "Aquí se da la vuelta|Después de 40 y 50, <code>final</code> está en 4 (la última casilla). Al entrar el 60, <code>(4+1)%5 = 0</code>: se guarda en la casilla 0, que el 10 dejó libre. ¡Circular!" },
    { f: "main", ln: "enqueue(&cola,70);", t: "Esta vez no cabe|La cola ya tiene 5 elementos (20, 30, 40, 50, 60): <code>isFull</code> la detiene." },
    { f: "main", ln: 'printf("Frente: %d\\n",front(&cola));', t: "<code>front</code> no saca|Solo muestra que el siguiente en salir es el 20." },
  ];

  const htmlCE = () => `
    ${AVISO_C_EXTRA}
    <h2>¿Qué es una cola?</h2>
    <p>Una <b>cola</b> (<i>queue</i>) es una fila: el primero que llega es el primero en ser atendido. Se llama <b>FIFO</b>: <i>First In, First Out</i>. Se mete por un extremo (el <b>final</b>) y se saca por el otro (el <b>frente</b>).</p>
    ${n("idea", "Pila vs. cola", "<p>La pila (LIFO) es una pila de platos: el último que pones es el primero que quitas. La cola (FIFO) es la fila del banco: el primero que llegó es el primero que pasa a ventanilla. Ejemplos de colas: impresora, turnos de un servidor, mensajes de WhatsApp pendientes, procesos esperando CPU.</p>")}
    <div class="tabla-wrap"><table>
      <tr><th>Operación</th><th>Qué hace</th><th>Costo</th></tr>
      <tr><td><code>enqueue(valor)</code></td><td>Mete un elemento al <b>final</b>.</td><td class="num">O(1)</td></tr>
      <tr><td><code>dequeue()</code></td><td>Saca y devuelve el del <b>frente</b>.</td><td class="num">O(1)</td></tr>
      <tr><td><code>front()</code></td><td>Mira el del frente sin sacarlo.</td><td class="num">O(1)</td></tr>
      <tr><td><code>isEmpty()</code> / <code>isFull()</code></td><td>¿Vacía? / ¿Llena?</td><td class="num">O(1)</td></tr>
    </table></div>
    <h2>El problema de usar un arreglo normal</h2>
    <p>Imagina una cola en un arreglo de 5 casillas. Entran 5 elementos y salen 2. Quedan dos casillas libres <b>al principio</b>… pero el «final» ya está en la última casilla. La cola parecería llena sin estarlo (<i>falsa llenura</i>). Mover todos los elementos a la izquierda en cada <code>dequeue</code> arreglaría el problema, pero costaría O(n).</p>
    <h2>La solución: un arreglo <mark>circular</mark></h2>
    <p>Hacemos de cuenta que la casilla 4 está pegada a la 0, como en un reloj. Los índices avanzan con el operador <code>%</code> (residuo):</p>
    <div class="tabla-wrap"><table>
      <tr><th>Índice actual</th><th>(indice + 1) % 5</th></tr>
      <tr><td class="num">0</td><td class="num">1</td></tr><tr><td class="num">3</td><td class="num">4</td></tr>
      <tr><td class="num"><b>4</b></td><td class="num"><b>0</b> ← da la vuelta</td></tr>
    </table></div>
    <p>Así <code>frente</code> y <code>final</code> pueden girar por el arreglo indefinidamente, reutilizando los huecos que dejan los elementos atendidos. Presiona <b>Siguiente</b>: con la cola llena, atendemos dos y metemos 60 y 70. Mira arriba la tira de casillas y abajo el mismo estado como anillo.</p>
    <div data-demo="vuelta"></div>
    <h2>¿Para qué sirve <code>cantidad</code>?</h2>
    <p>Con solo <code>frente</code> y <code>final</code> hay una ambigüedad: cuando la cola está <b>llena</b> y cuando está <b>vacía</b>, <code>final</code> queda justo antes de <code>frente</code> en ambos casos. Hay dos soluciones clásicas: dejar siempre una casilla sin usar, o llevar un contador. Tu estructura usa el contador <code>cantidad</code>: <code>isEmpty ⇔ cantidad == 0</code>, <code>isFull ⇔ cantidad == MAX</code>. Más simple y usa las 5 casillas.</p>
    <h2>Dos detalles que hay que entender</h2>
    <h3>1. <code>final</code> empieza en −1</h3>
    <p>Porque <code>enqueue</code> primero avanza <code>final</code> y luego escribe. Con −1: <code>(−1+1)%5 = 0</code> → el primer elemento cae en la casilla 0.</p>
    <h3>2. <code>dequeue</code> no borra</h3>
    <p>Igual que en la pila de arreglo, el dato sigue en la casilla (en gris en la animación), pero ya no cuenta porque el frente se movió. Por eso <code>printQueue</code> recorre <code>cantidad</code> elementos desde el frente con <code>(frente + k) % MAX</code>, y <b>no</b> de 0 a MAX−1.</p>
    <div data-demo="llena"></div>
    <h2>Pila estática vs. cola estática</h2>
    <div class="tabla-wrap"><table>
      <tr><th></th><th>Pila</th><th>Cola circular</th></tr>
      <tr><td>Orden</td><td>LIFO</td><td>FIFO</td></tr>
      <tr><td>Marcadores</td><td>1 (<code>tope</code>)</td><td>3 (<code>frente</code>, <code>final</code>, <code>cantidad</code>)</td></tr>
      <tr><td>¿Se necesita <code>%</code>?</td><td>No</td><td>Sí, para dar la vuelta</td></tr>
      <tr><td>Operaciones</td><td class="num">O(1)</td><td class="num">O(1)</td></tr>
    </table></div>
    ${n("ojo", "Errores típicos", "<ul><li>Olvidar el <code>% MAX</code> al avanzar: <code>final</code> llegaría a 5 y escribiría fuera del arreglo.</li><li>Imprimir de <code>0</code> a <code>MAX−1</code>: muestra basura y elementos ya atendidos.</li><li>No actualizar <code>cantidad</code>: <code>isFull</code> e <code>isEmpty</code> mentirían.</li></ul>")}
  `;

  function pestanaEscritorioCE() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>La ejecución completa de <code>cola_est_int.c</code>: tres <code>enqueue</code>, <code>printQueue</code>, <code>dequeue</code>, tres <code>enqueue</code> más (el último da la vuelta), uno que no cabe y <code>front</code>. Fíjate cómo el <b>anillo</b> de abajo se llena y se vacía.</p>" }));
        const A = E.codigoDe("colaEstatica");
        const M = E.est.colaEstatica(A);
        M.guion();
        const jug = E.Jugador(cont.appendChild(h("div")), {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "main",
          vista: (c) => E.vistas.colaEst(c),
          pilaLlamadas: true,
        });
        jug.cargar(M.pasos, "Tu cola circular · MAX = 5");
      },
    };
  }
  function pestanaLabCE() {
    return {
      titulo: "Laboratorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>Experimenta: llena la cola (5 <code>enqueue</code>), atiende dos con <code>dequeue</code> y vuelve a meter. Observa cómo <code>final</code> pasa de la casilla 4 a la 0.</p>" }));
        const A = E.codigoDe("colaEstatica");
        ui.Laboratorio(cont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "impl",
          vista: (c) => E.vistas.colaEst(c),
          pilaLlamadas: true,
          crear: () => E.est.colaEstatica(A),
          arranque: (M) => M.inicioLab(),
          ops: [
            { id: "enqueue", etq: "enqueue(&cola, ▢)", arg: true, llamada: (a) => "enqueue(&cola, " + a + ");" },
            { id: "dequeue", etq: "dequeue(&cola)", llamada: () => "dequeue(&cola);" },
            { id: "front", etq: "front(&cola)", llamada: () => "front(&cola);" },
            { id: "print", etq: "printQueue(&cola)", llamada: () => "printQueue(&cola);" },
          ],
          aliases: { enqueue: "enqueue", dequeue: "dequeue", front: "front", print: "print", printqueue: "print" },
          ejemploSecuencia: "enqueue 1, enqueue 2, dequeue, enqueue 3",
          estado: (M) => { const e = M.estado(); return "frente = " + e.frente + " · final = " + e.final + " · cantidad = " + e.cantidad + "/" + e.max; },
        });
      },
    };
  }
  const quizCE = [
    { p: "¿Qué significa FIFO?", op: ["Last In, First Out", "First In, First Out", "Fast In, Fast Out", "First In, Final Out"], ok: 1, porque: "El primero que entra es el primero que sale: como una fila." },
    { p: "Con <code>MAX = 5</code> y <code>final = 4</code>, ¿qué valor toma <code>final</code> tras <code>(final + 1) % MAX</code>?", op: ["5", "0", "4", "1"], ok: 1, porque: "(4 + 1) % 5 = 5 % 5 = 0. Así da la vuelta al inicio del arreglo." },
    { p: "¿Por qué <code>init</code> deja <code>final = −1</code>?", op: ["Es un error", "Porque enqueue primero avanza final y luego escribe: (−1+1)%MAX = 0", "Para marcar cola llena", "Porque los índices empiezan en −1"], ok: 1, porque: "Así el primer enqueue guarda en la casilla 0. Si final empezara en 0, el primer elemento iría a la casilla 1." },
    { p: "¿Para qué sirve el campo <code>cantidad</code>?", op: ["Es decorativo", "Distinguir entre cola llena y vacía", "Guardar el último valor", "Contar los dequeue fallidos"], ok: 1, porque: "Con frente y final solos, llena y vacía se ven iguales. El contador lo resuelve." },
    { p: "Después de <code>enqueue</code> de 1,2,3,4,5 y dos <code>dequeue</code>, haces <code>enqueue(6)</code>. ¿En qué casilla se guarda?", op: ["5", "0", "2", "No cabe"], ok: 1, porque: "final estaba en 4; (4+1)%5 = 0. La casilla 0 quedó libre cuando salió el 1." },
    { p: "¿Qué está mal en este <code>printQueue</code>: <code>for(i=0;i&lt;MAX;i++) printf(c-&gt;dato[i]);</code>?", op: ["Nada", "Imprime también casillas vacías o ya atendidas y no respeta el orden FIFO", "Es muy lento", "No compila"], ok: 1, porque: "Los elementos reales empiezan en frente y pueden dar la vuelta. Hay que recorrer cantidad elementos desde frente con %MAX." },
  ];
  E.registrar({
    id: "colaEstatica",
    grupo: "cola",
    orden: 1,
    titulo: "Cola estática",
    sub: "arreglo circular",
    resumen: "FIFO con un arreglo que «da la vuelta»: frente, final, cantidad y el operador %.",
    chips: [{ k: "Estructura", v: "arreglo[5] circular" }, { k: "enqueue / dequeue", v: "O(1)" }, { k: "Capacidad", v: "fija" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlCE, {
        vuelta: miniEst("5 elementos, salen 2 y entran 60 y 70", [["enqueue", 10], ["enqueue", 20], ["enqueue", 30], ["enqueue", 40], ["enqueue", 50], ["dequeue"], ["dequeue"], ["enqueue", 60], ["enqueue", 70]], 5),
        llena: miniEst("intentar meter un 6.º elemento", [["enqueue", 1], ["enqueue", 2], ["enqueue", 3], ["enqueue", 4], ["enqueue", 5], ["enqueue", 6]], 5, 1200),
      }),
      codigo: ui.pestanaCodigo("colaEstatica", anotCE, ["dec", "impl", "main"], AVISO_C_EXTRA),
      escritorio: pestanaEscritorioCE(),
      laboratorio: pestanaLabCE(),
      quiz: ui.pestanaQuiz("colaEstatica", quizCE),
    },
  });

  /* ====================================================================
     COLA DINAMICA
     ==================================================================== */
  const anotCD = [
    { f: "dec", ln: "struct Nodo{", t: "El mismo nodo de la pila|Un dato y un apuntador al <b>siguiente</b>. En la cola, «siguiente» apunta hacia el que está <i>detrás</i> en la fila." },
    { f: "dec", ln: "struct Cola{", t: "La cola es una struct con DOS apuntadores|A diferencia de la pila (un solo apuntador <code>tope</code>), aquí guardamos el <b>primer</b> nodo y el <b>último</b>." },
    { f: "dec", ln: "struct Nodo *frente;", t: "Frente|Apunta al nodo que saldrá primero. <code>NULL</code> si la cola está vacía." },
    { f: "dec", ln: "struct Nodo *final;", t: "Final|Apunta al último nodo. Existe para que <code>enqueue</code> pueda agregar al final en <b>O(1)</b>: sin él habría que recorrer toda la lista para encontrar el último." },
    { f: "dec", ln: "void init(struct Cola *c);", t: "Un solo asterisco|Las funciones reciben <code>struct Cola *c</code>: la dirección de la <b>struct</b>. Como <code>frente</code> y <code>final</code> viven <i>dentro</i> de ella, con <code>c-&gt;frente</code> y <code>c-&gt;final</code> se pueden modificar. Por eso <b>no hace falta doble apuntador</b> como en la pila." },
    { f: "impl", ln: "c->frente=NULL;", t: "<code>init</code>|Cola vacía: ambos apuntadores en <code>NULL</code>." },
    { f: "impl", ln: "c->final=NULL;", nth: 1, t: "Final también en NULL|Si dejaras uno sin inicializar tendría basura y el primer <code>enqueue</code> podría escribir en memoria que no es tuya." },
    { f: "impl", ln: "return c->frente==NULL;", t: "<code>isEmpty</code>|Vacía ⇔ no hay nodo al frente. No existe <code>isFull</code>: crece mientras haya memoria." },
    { f: "impl", ln: "struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));", t: "<code>enqueue</code>: crear el nodo|Un <code>malloc</code> por elemento, igual que en la pila dinámica." },
    { f: "impl", ln: "nuevo->siguiente=NULL;", t: "El nuevo siempre es el último|Detrás de él no hay nadie, así que su <code>siguiente</code> es <code>NULL</code>. (En la pila apuntaba al tope anterior; aquí no.)" },
    { f: "impl", ln: "if(isEmpty(c)){", nth: 1, t: "Dos casos|<b>Cola vacía:</b> el nuevo es a la vez el primero y el último. <b>Cola con elementos:</b> hay que engancharlo detrás del último actual." },
    { f: "impl", ln: "c->frente=nuevo;", t: "Caso vacía: es el frente|Solo en este caso se toca <code>frente</code>." },
    { f: "impl", ln: "c->final->siguiente=nuevo;", t: "Caso con elementos: enganchar|El último nodo actual deja de apuntar a <code>NULL</code> y apunta al nuevo. Si hicieras esto con la cola vacía, <code>c-&gt;final</code> sería <code>NULL</code> y el programa se caería (dereferenciar NULL)." },
    { f: "impl", ln: "c->final=nuevo;", t: "El nuevo es el último|Se ejecuta en <b>ambos</b> casos: después de agregar, <code>final</code> siempre apunta al recién llegado." },
    { f: "impl", ln: "struct Nodo *temp=c->frente;", t: "<code>dequeue</code>: recordar al que sale|Como en el <code>pop</code> de la pila: guardar el nodo para poder liberarlo." },
    { f: "impl", ln: "c->frente=temp->siguiente;", t: "Avanzar el frente|El segundo de la fila ahora es el primero." },
    { f: "impl", ln: "if(c->frente==NULL){", t: "¿Se atendió al último?|Si el frente quedó en <code>NULL</code>, la cola se vació." },
    { f: "impl", ln: "c->final=NULL;", nth: 2, t: "¡No olvides el final!|Si la cola se vació, <code>final</code> todavía apunta al nodo que vamos a liberar: sería un <b>puntero colgante</b>. El siguiente <code>enqueue</code> haría <code>c-&gt;final-&gt;siguiente</code> sobre memoria liberada. Es el error más común en colas enlazadas." },
    { f: "impl", ln: "free(temp);", nth: 1, t: "Liberar el nodo|Devuelve la memoria al sistema." },
    { f: "impl", ln: "return c->frente->dato;", t: "<code>front</code>|Lee el dato del primer nodo sin tocar nada." },
    { f: "impl", ln: "void destroy(struct Cola *c){", t: "<code>destroy</code>|Libera todos los nodos al terminar." },
    { f: "impl", ln: "temp=c->frente;", nth: 2, t: "Mismo patrón que <code>pop</code> / <code>dequeue</code>|Guardar, avanzar, liberar." },
    { f: "impl", ln: "c->frente=c->frente->siguiente;", t: "Avanzar antes de liberar|Si liberaras primero, <code>c-&gt;frente-&gt;siguiente</code> leería memoria ya liberada." },
    { f: "impl", ln: "c->final=NULL;", nth: 3, t: "Dejar la cola consistente|Tras vaciarla, <code>final</code> también a <code>NULL</code>. La cola queda lista para reutilizarse." },
    { f: "impl", ln: "struct Nodo *actual=c->frente;", t: "<code>printQueue</code>|Se recorre con <code>actual</code> desde el frente hasta llegar a <code>NULL</code>." },
    { f: "main", ln: "struct Cola cola;", t: "La cola es una struct local|En el stack de <code>main</code> hay solo <b>dos apuntadores</b> (16 bytes). Los nodos estarán en el heap." },
    { f: "main", ln: "init(&cola);", t: "Se pasa la dirección de la struct|Un solo <code>&amp;</code>: no es un apuntador a apuntador porque lo que se pasa es la dirección de la <b>struct</b> que contiene los dos apuntadores." },
    { f: "main", ln: "enqueue(&cola,10);", t: "Entran 10, 20, 30|Cada uno va al final: el frente se queda en el 10." },
    { f: "main", ln: 'printf("Atendido: %d\\n",dequeue(&cola));', t: "Sale el primero|FIFO: sale el 10. Su nodo se libera y el frente pasa al 20." },
    { f: "main", ln: "destroy(&cola);", t: "Liberar lo que queda|Libera los nodos 20, 30 y 40. Después, <code>printQueue</code> muestra que está vacía." },
  ];

  const htmlCD = () => `
    ${AVISO_C_EXTRA}
    <h2>La misma cola, con nodos</h2>
    <p>La cola dinámica sigue siendo FIFO, pero en vez de un arreglo circular usa <b>nodos enlazados en el heap</b>, como la pila dinámica. No hay límite fijo ni «dar la vuelta»: cada <code>enqueue</code> hace un <code>malloc</code> y cada <code>dequeue</code> un <code>free</code>.</p>
    <h2>Dos extremos, dos apuntadores</h2>
    <p>La pila solo opera por un extremo, así que le basta un apuntador (<code>tope</code>). La cola opera por <b>los dos</b>: saca por el frente y mete por el final. Por eso guarda dos:</p>
    <div class="bloque"><code>struct Cola {
    struct Nodo *frente;   // el que sale primero
    struct Nodo *final;    // el último que llegó
};</code></div>
    <p>¿Para qué <code>final</code>? Sin él, para agregar al final habría que caminar toda la cadena desde el frente: O(n). Con <code>final</code> es <b>O(1)</b>.</p>
    <h2>¿Y el doble apuntador?</h2>
    <p>En la pila, <code>pila</code> era un apuntador suelto en <code>main</code>, y para cambiarlo había que pasar su dirección (<code>struct Nodo **</code>). Aquí los dos apuntadores viven <i>dentro de una struct</i>. A las funciones les pasas la dirección de la <b>struct</b> (<code>struct Cola *c</code>) y con <code>c-&gt;frente</code> y <code>c-&gt;final</code> modificas ambos. <mark>Un solo asterisco basta.</mark></p>
    ${n("idea", "Regla práctica", "<p>Para modificar <i>una variable</i>, pásale su dirección. Si la variable es un <code>int</code>, la función recibe <code>int *</code>. Si es un apuntador suelto, <code>struct Nodo **</code>. Si es una <code>struct</code> que contiene los apuntadores, <code>struct Cola *</code>. Siempre «un nivel más» que lo que quieres cambiar.</p>")}
    <h2><code>enqueue</code>: dos casos</h2>
    <p>Mira cómo el <b>primer</b> elemento se anota en <code>frente</code> y en <code>final</code>, y cómo el <b>segundo</b> se engancha detrás del último con <code>c-&gt;final-&gt;siguiente = nuevo</code>:</p>
    <div data-demo="enq"></div>
    <h2><code>dequeue</code>: sacar por el frente</h2>
    <div class="bloque"><code>struct Nodo *temp = c->frente;  // 1. recordar al que sale
int valor = temp->dato;         // 2. rescatar su dato
c->frente = temp->siguiente;    // 3. el siguiente pasa al frente
if (c->frente == NULL)          // 4. ¿se vació?
    c->final = NULL;            //    → final también a NULL
free(temp);                     // 5. liberar el nodo</code></div>
    <div data-demo="deq"></div>
    ${n("ojo", "El paso que todos olvidan", "<p>Cuando <code>dequeue</code> saca al <b>último</b> elemento, <code>frente</code> queda en <code>NULL</code> pero <code>final</code> sigue apuntando al nodo recién liberado. Es un <i>puntero colgante</i>. El siguiente <code>enqueue</code> vería la cola vacía (por <code>frente</code>), pero otro código que use <code>final</code> leería memoria muerta. Por eso <code>if(c-&gt;frente==NULL) c-&gt;final=NULL;</code>.</p>")}
    <div data-demo="ultimo"></div>
    <h2>Pila dinámica vs. cola dinámica</h2>
    <div class="tabla-wrap"><table>
      <tr><th></th><th>Pila dinámica</th><th>Cola dinámica</th></tr>
      <tr><td>Orden</td><td>LIFO</td><td>FIFO</td></tr>
      <tr><td>Apuntadores</td><td>1 (<code>tope</code>)</td><td>2 (<code>frente</code>, <code>final</code>)</td></tr>
      <tr><td>Los pasas como</td><td><code>struct Nodo **</code></td><td><code>struct Cola *</code></td></tr>
      <tr><td>El nodo nuevo apunta a…</td><td>el tope anterior</td><td><code>NULL</code> (es el último)</td></tr>
      <tr><td>Agregar</td><td>por el tope</td><td>por el final (engancha detrás del último)</td></tr>
      <tr><td>Quitar</td><td>por el tope</td><td>por el frente (hay que cuidar <code>final</code>)</td></tr>
      <tr><td>Operaciones</td><td class="num">O(1)</td><td class="num">O(1)</td></tr>
    </table></div>
    <h2>Estática vs. dinámica (cola)</h2>
    <div class="tabla-wrap"><table>
      <tr><th></th><th>Circular (arreglo)</th><th>Dinámica (nodos)</th></tr>
      <tr><td>Capacidad</td><td>Fija</td><td>Sin límite fijo</td></tr>
      <tr><td>Memoria por elemento</td><td>4 bytes</td><td>≈ 16 bytes + malloc</td></tr>
      <tr><td>¿Hay que liberar?</td><td>No</td><td>Sí (<code>free</code> / <code>destroy</code>)</td></tr>
      <tr><td>Casos especiales</td><td>Dar la vuelta con <code>%</code></td><td>Cola vacía ↔ <code>frente</code>/<code>final</code> en NULL</td></tr>
    </table></div>
  `;

  function pestanaEscritorioCD() {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>Ejecución completa de <code>cola_din_int.c</code>. Observa cómo <code>cola.frente</code> y <code>cola.final</code> (dentro de la struct, en el stack) se mueven y cómo los nodos se enlazan y se liberan en el heap.</p>" }));
        const A = E.codigoDe("colaDinamica");
        const M = E.est.colaDinamica(A);
        M.guion();
        const jug = E.Jugador(cont.appendChild(h("div")), {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "main",
          vista: (c) => E.vistas.memoria(c),
          panelVars: false,
        });
        jug.cargar(M.pasos, "Tu cola dinámica · stack y heap");
      },
    };
  }
  function pestanaLabCD() {
    return {
      titulo: "Laboratorio",
      render(cont) {
        cont.append(h("div", { class: "prosa ancha", html: "<p>Prueba el caso límite: <code>enqueue</code> un solo elemento y <code>dequeue</code> inmediatamente. Fíjate en que tanto <code>frente</code> como <code>final</code> terminan en <code>NULL</code>.</p>" }));
        const A = E.codigoDe("colaDinamica");
        ui.Laboratorio(cont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "impl",
          vista: (c) => E.vistas.memoria(c),
          panelVars: false,
          crear: () => E.est.colaDinamica(A),
          arranque: (M) => M.inicioLab(),
          ops: [
            { id: "enqueue", etq: "enqueue(&cola, ▢)", arg: true, llamada: (a) => "enqueue(&cola, " + a + ");" },
            { id: "dequeue", etq: "dequeue(&cola)", llamada: () => "dequeue(&cola);" },
            { id: "front", etq: "front(&cola)", llamada: () => "front(&cola);" },
            { id: "print", etq: "printQueue(&cola)", llamada: () => "printQueue(&cola);" },
            { id: "destroy", etq: "destroy(&cola)", llamada: () => "destroy(&cola);" },
          ],
          aliases: { enqueue: "enqueue", dequeue: "dequeue", front: "front", print: "print", printqueue: "print", destroy: "destroy" },
          ejemploSecuencia: "enqueue 1, enqueue 2, dequeue, destroy",
          estado: (M) => "nodos en el heap: " + M.nodos(),
        });
      },
    };
  }
  const quizCD = [
    { p: "¿Por qué la cola dinámica guarda un apuntador <code>final</code> además de <code>frente</code>?", op: ["Por adorno", "Para agregar al final en O(1) sin recorrer toda la cadena", "Para detectar cola llena", "Porque la lista es circular"], ok: 1, porque: "Sin final habría que caminar desde el frente hasta el último nodo en cada enqueue: O(n)." },
    { p: "Las funciones de la cola reciben <code>struct Cola *c</code> (un asterisco). ¿Por qué no <code>**</code>, como la pila?", op: ["Porque la cola no cambia", "Porque frente y final están dentro de la struct, y con c-> se modifican", "Porque la cola no usa malloc", "Por un error de estilo"], ok: 1, porque: "La dirección de la struct basta para llegar a ambos campos. En la pila el apuntador estaba suelto, no dentro de una struct." },
    { p: "Cola vacía, haces <code>enqueue(5)</code>. ¿Qué apuntadores se actualizan?", op: ["Solo frente", "Solo final", "Frente y final", "Ninguno"], ok: 2, porque: "El único nodo es el primero y el último a la vez: frente = final = nuevo." },
    { p: "En <code>dequeue</code> sacas al <b>único</b> elemento. Si olvidas <code>c-&gt;final = NULL</code>…", op: ["No pasa nada", "final queda apuntando a un nodo liberado (puntero colgante)", "El programa no compila", "Se pierde el dato"], ok: 1, porque: "frente ya es NULL pero final apunta a memoria liberada. Un enqueue posterior que use final causaría un error grave." },
    { p: "El nodo nuevo en <code>enqueue</code> lleva <code>siguiente = NULL</code>. ¿Por qué?", op: ["Porque va a ser el último de la fila", "Porque malloc lo exige", "Para liberar memoria", "Es un error"], ok: 0, porque: "Entra por el final: detrás de él no hay nadie. (En la pila, en cambio, apunta al tope anterior.)" },
    { p: "Si hay 3 elementos en la cola, ¿cuántos <code>free</code> tienen que ejecutarse antes de terminar sin fugas?", op: ["0", "1", "3", "Depende de frente"], ok: 2, porque: "Uno por nodo: ya sea con tres dequeue o con destroy." },
  ];
  E.registrar({
    id: "colaDinamica",
    grupo: "cola",
    orden: 2,
    titulo: "Cola dinámica",
    sub: "nodos con frente y final",
    resumen: "FIFO con nodos enlazados: dos apuntadores dentro de una struct, y por qué aquí basta un solo *.",
    chips: [{ k: "Estructura", v: "lista enlazada" }, { k: "enqueue / dequeue", v: "O(1)" }, { k: "Capacidad", v: "sin límite fijo" }],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlCD, {
        enq: miniDin("enqueue(&cola, 10) y luego enqueue(&cola, 20)", [["enqueue", 10], ["enqueue", 20]], 0),
        deq: miniDin("dequeue sobre una cola con 10, 20 y 30", [["enqueue", 10], ["enqueue", 20], ["enqueue", 30], ["dequeue"]], 3),
        ultimo: miniDin("el caso límite: dequeue del único elemento", [["enqueue", 10], ["dequeue"]], 1),
      }),
      codigo: ui.pestanaCodigo("colaDinamica", anotCD, ["dec", "impl", "main"], AVISO_C_EXTRA),
      escritorio: pestanaEscritorioCD(),
      laboratorio: pestanaLabCD(),
      quiz: ui.pestanaQuiz("colaDinamica", quizCD),
    },
  });
})();
