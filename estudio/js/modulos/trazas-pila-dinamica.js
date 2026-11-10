/* ============================================================
   trazas-pila-dinamica.js
   - E.mem: memoria simulada (heap con malloc/free, direcciones)
   - E.est.pilaDinamica: tu pila con nodos y struct Nodo **tope
   - E.est.dobleApuntador: lección "un * vs dos **"
   - E.est.infija: tu examen (infija -> postfija) con pila dinámica
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  E.est = E.est || {};

  /* ---------- valores para mostrar ---------- */
  const V = {
    int: (n) => ({ k: "int", v: n }),
    chr: (c) => ({ k: "chr", v: c }),
    ptr: (a) => ({ k: "ptr", to: a }),
    nul: () => ({ k: "null" }),
    unk: () => ({ k: "unk" }),
  };
  E.V = V;
  const hex8 = (n) => "0x" + n.toString(16);
  /* direccion de variable en el stack: main arriba, cada llamada mas abajo */
  E.dirStack = (profundidad, idx) => hex8(0x7ffe3c10 - profundidad * 0x30 - idx * 8);

  /* ---------- memoria dinamica simulada ---------- */
  E.mem = function () {
    let proximo = 0x5581a2c0;
    const libres = []; // LIFO: asi se comporta malloc/free en la practica (tcache)
    const vivos = new Map();
    let fantasmas = [];
    const api = {
      malloc() {
        let n;
        let reutiliza = false;
        if (libres.length) {
          n = libres.pop();
          reutiliza = true;
        } else {
          n = proximo;
          proximo += 0x20; // 16 bytes de nodo + cabecera del bloque
        }
        const a = hex8(n);
        vivos.set(a, { a: a, dato: V.unk(), sig: V.unk() });
        api.ultimaReutilizada = reutiliza;
        return a;
      },
      free(a) {
        const nd = vivos.get(a);
        if (!nd) return;
        vivos.delete(a);
        libres.push(parseInt(a, 16));
        fantasmas.push(Object.assign({}, nd, { est: "libre" }));
      },
      nodo: (a) => vivos.get(a),
      limpiar() {
        fantasmas = [];
      },
      viz(nuevo, fugas) {
        const r = [];
        vivos.forEach((nd) => {
          const c = JSON.parse(JSON.stringify(nd));
          if (nuevo && nuevo === nd.a) c.est = "nuevo";
          if (fugas && fugas.indexOf(nd.a) >= 0) c.fuga = true;
          r.push(c);
        });
        fantasmas.forEach((f) => r.push(JSON.parse(JSON.stringify(f))));
        return r;
      },
      vivos: () => Array.from(vivos.keys()),
      cuantos: () => vivos.size,
      ultimaReutilizada: false,
    };
    return api;
  };

  /* ---------- armado de marcos (stack frames) para la vista de memoria ---------- */
  function copiaViz(frames, mem, foco, nuevo, fugas) {
    return {
      frames: JSON.parse(JSON.stringify(frames)),
      heap: mem.viz(nuevo, fugas),
      foco: foco || [],
    };
  }
  function marco(fn, nivel, vars) {
    return {
      fn: fn,
      vars: vars.map((v, i) => Object.assign({ a: E.dirStack(nivel, i) }, v)),
    };
  }
  const idVar = (fr, n) => fr.fn.split("(")[0] + "." + n;
  const getVar = (fr, n) => fr.vars.find((x) => x.n === n);

  /* =======================================================
     PILA DINAMICA (pilaDinamica/pila_din_int)
     ======================================================= */
  E.est.pilaDinamica = function (A) {
    const Li = E.anclas(A.impl, "pilaDinamica");
    const Lm = E.anclas(A.main, "pilaDinamica");
    const T = E.nuevoTrazo();
    const mem = E.mem();
    const M = { T: T, pasos: T.pasos, salImpl: "", mem: mem };
    const MAIN_A = E.dirStack(0, 0);
    const main = marco("main()", 0, [{ n: "pila", t: "struct Nodo *", val: V.unk() }]);
    const pila = getVar(main, "pila"); // la variable de main
    let extra = []; // marcos de las funciones en ejecucion
    const frames = () => [main].concat(extra);

    const L = {
      emptySig: Li("int isEmpty(struct Nodo *tope){"),
      emptyRet: Li("return tope==NULL;"),
      pushSig: Li("void push(struct Nodo **tope, int valor){"),
      malloc: Li("struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));"),
      nulo: Li("if(nuevo==NULL){"),
      errMem: Li("Error al asignar memoria"),
      retPush: Li("return;", 1),
      dato: Li("nuevo->dato=valor;"),
      sig: Li("nuevo->siguiente=*tope;"),
      tope: Li("*tope=nuevo;"),
      pushFin: Li.fin("void push(struct Nodo **tope, int valor){"),
      popSig: Li("int pop(struct Nodo **tope){"),
      popIf: Li("if(isEmpty(*tope)){", 1),
      popErr: Li("Error: la pila esta vacia", 1),
      popRetErr: Li("return -1;", 1),
      popTemp: Li("struct Nodo *temp=*tope;"),
      popValor: Li("int valor=temp->dato;"),
      popTope: Li("*tope=temp->siguiente;"),
      popFree: Li("free(temp);", 1),
      popRet: Li("return valor;"),
      popFin: Li.fin("int pop(struct Nodo **tope){"),
      peekSig: Li("int peek(struct Nodo **tope){"),
      peekIf: Li("if(isEmpty(*tope)){", 2),
      peekErr: Li("Error: la pila esta vacia", 2),
      peekRetErr: Li("return -1;", 2),
      peekRet: Li("return (*tope)->dato;"),
      peekFin: Li.fin("int peek(struct Nodo **tope){"),
      desSig: Li("void destroy(struct Nodo **tope){"),
      desTemp: Li("struct Nodo *temp;"),
      desWhile: Li("while(*tope!=NULL){"),
      desA: Li("temp=*tope;", 2),
      desB: Li("*tope=(*tope)->siguiente;"),
      desFree: Li("free(temp);", 2),
      desFin: Li.fin("void destroy(struct Nodo **tope){"),
      prSig: Li("void printStack(struct Nodo **tope){"),
      prIf: Li("if(isEmpty(*tope)){", 3),
      prVacia: Li("La pila esta vacia"),
      prRetV: Li("return;", 2),
      prHead: Li("Elementos de la pila"),
      prActual: Li("struct Nodo *actual=*tope;"),
      prWhile: Li("while(actual!=NULL){"),
      prItem: Li("printf(\"%d  \",actual->dato);"),
      prAvanza: Li("actual=actual->siguiente;"),
      prNl: Li("printf(\"\\n\");"),
      prFin: Li.fin("void printStack(struct Nodo **tope){"),
      // main
      mPila: Lm("struct Nodo *pila=NULL;"),
      mTope: Lm("printf(\"Elemento en el tope: %d\\n\", peek(&pila));"),
      mPop: Lm("printf(\"Elemento extraido: %d\\n\",pop(&pila));"),
      mDestroy: Lm("destroy(&pila);"),
      mPrint1: Lm("printStack(&pila);", 1),
      mPrint2: Lm("printStack(&pila);", 2),
      mRet: Lm("return 0;"),
    };
    const lPush = (v) => Lm("push(&pila," + v + ");");

    function emit(f, l, nota, o) {
      o = o || {};
      if (o.sal && f === "impl") M.salImpl += o.sal;
      return T.paso({
        f: f,
        l: l,
        nota: nota,
        lv: o.lv || 0,
        viz: copiaViz(frames(), mem, o.foco, o.nuevo, o.fugas),
        sal: o.sal,
        etiqueta: o.etiqueta,
      });
    }
    const valTxt = (v) => (v.k === "null" ? "NULL" : v.k === "ptr" ? v.to : "?");
    const abrir = (fn, vars) => {
      const f = marco(fn, extra.length + 1, vars);
      extra.push(f);
      return f;
    };
    const cerrar = () => extra.pop();

    /* ---- isEmpty(tope) recibe el VALOR de *tope ---- */
    function isEmpty(valor) {
      const f = abrir("isEmpty(tope)", [{ n: "tope", t: "struct Nodo *", val: JSON.parse(JSON.stringify(valor)) }]);
      emit("impl", L.emptySig, "Entra <b>isEmpty</b>. Ojo: aquí recibe <code>*tope</code> (el <b>valor</b> de <code>pila</code>), no su dirección; solo necesita saber si es NULL.", { lv: 1, foco: ["isEmpty.tope"] });
      const r = valor.k === "null" ? 1 : 0;
      emit("impl", L.emptyRet, "<code>return tope == NULL</code> → " + valTxt(valor) + " == NULL → <b>" + (r ? "verdadero (1)" : "falso (0)") + "</b>.", { lv: 1, foco: ["isEmpty.tope"] });
      cerrar();
      return r;
    }

    function push(valor, lineaLlamada) {
      mem.limpiar();
      if (lineaLlamada) {
        emit("main", lineaLlamada, "<code>main</code> llama a <code>push(&amp;pila, " + valor + ")</code>. Fíjate en el <b><code>&amp;</code></b>: se pasa la <b>dirección</b> de la variable <code>pila</code> (" + MAIN_A + "), no su valor.", { foco: ["main.pila"] });
      }
      const f = abrir("push(tope, valor)", [
        { n: "tope", t: "struct Nodo **", val: V.ptr(MAIN_A) },
        { n: "valor", t: "int", val: V.int(valor) },
        { n: "nuevo", t: "struct Nodo *", val: V.unk() },
      ]);
      emit("impl", L.pushSig, "Entra <b>push</b>. <code>tope</code> guarda " + MAIN_A + ": la dirección de la variable <code>pila</code> de main. Por eso su tipo es <code>struct Nodo **</code> (apuntador a un apuntador a nodo). <code>valor = " + valor + "</code>.", { foco: ["push.tope", "main.pila"] });
      const a = mem.malloc();
      getVar(f, "nuevo").val = V.ptr(a);
      emit("impl", L.malloc, "<code>malloc(sizeof(struct Nodo))</code> pide al <b>heap</b> 16 bytes (un <code>int</code> + un apuntador). Devuelve la dirección <b>" + a + "</b>" + (mem.ultimaReutilizada ? " (¡la misma de un nodo que liberamos antes: malloc reutiliza el último bloque liberado!)" : "") + " y se guarda en <code>nuevo</code>. El contenido es basura (<code>?</code>) hasta que lo llenemos.", { foco: ["push.nuevo", a], nuevo: a, etiqueta: "alloc" });
      emit("impl", L.nulo, "<code>nuevo == NULL</code> → falso. (<code>malloc</code> regresa <code>NULL</code> solo si ya no hay memoria; entonces habría que avisar y salir.)", { lv: 1, foco: ["push.nuevo"] });
      mem.nodo(a).dato = V.int(valor);
      emit("impl", L.dato, "<code>nuevo-&gt;dato = valor</code> → la flecha <code>-&gt;</code> significa “ve a la dirección que guarda <code>nuevo</code> y escribe en su campo <code>dato</code>”: queda <b>" + valor + "</b>.", { foco: [a, "push.valor"], etiqueta: "swap" });
      const antes = JSON.parse(JSON.stringify(pila.val));
      mem.nodo(a).sig = antes;
      emit("impl", L.sig, "<code>nuevo-&gt;siguiente = *tope</code> → <code>*tope</code> es “lo que hay dentro de <code>pila</code>” (" + valTxt(antes) + "). " + (antes.k === "null" ? "Es NULL: este será el <b>último nodo</b> de la cadena." : "Es el antiguo tope: el nodo nuevo queda <b>apuntando hacia el que estaba arriba</b>.") + " Todavía <code>pila</code> no se ha movido.", { foco: [a, "main.pila", "push.tope"], etiqueta: "swap" });
      pila.val = V.ptr(a);
      emit("impl", L.tope, "<code>*tope = nuevo</code> → aquí está la magia del doble apuntador: <code>*tope</code> <b>es</b> la variable <code>pila</code> de main. Al asignarle <code>nuevo</code>, <b>pila ahora apunta al nodo nuevo</b>: es el nuevo tope.", { foco: ["main.pila", "push.nuevo", a], etiqueta: "ok" });
      cerrar();
      emit("impl", L.pushFin, "Termina <b>push</b>: sus variables locales (<code>tope</code>, <code>valor</code>, <code>nuevo</code>) <b>desaparecen del stack</b>. Pero el nodo <b>sigue vivo en el heap</b> porque <code>pila</code> lo apunta.", { lv: 1, foco: [a, "main.pila"] });
    }

    function pop(lineaLlamada, esPrintf) {
      mem.limpiar();
      if (lineaLlamada) emit("main", lineaLlamada, "<code>main</code> llama a <code>pop(&amp;pila)</code>.", { foco: ["main.pila"] });
      const f = abrir("pop(tope)", [
        { n: "tope", t: "struct Nodo **", val: V.ptr(MAIN_A) },
        { n: "temp", t: "struct Nodo *", val: V.unk() },
        { n: "valor", t: "int", val: V.unk() },
      ]);
      emit("impl", L.popSig, "Entra <b>pop</b> con <code>tope = &amp;pila</code>.", { foco: ["pop.tope", "main.pila"] });
      emit("impl", L.popIf, "Primero se pregunta <code>isEmpty(*tope)</code>: se le pasa el <b>valor</b> de <code>pila</code>.", { lv: 1, foco: ["main.pila"] });
      const vacia = isEmpty(pila.val);
      if (vacia) {
        emit("impl", L.popIf, "<code>isEmpty</code> devolvió 1: <b>no hay nodos</b> que sacar.", { foco: ["main.pila"], etiqueta: "err" });
        emit("impl", L.popErr, "Mensaje de error.", { sal: "Error: la pila esta vacia\n\n", etiqueta: "err" });
        emit("impl", L.popRetErr, "<code>return -1;</code> (valor centinela: como -1 también podría ser un dato real, conviene preguntar <code>isEmpty</code> antes).", { etiqueta: "err" });
        cerrar();
        emit("impl", L.popFin, "Termina <b>pop</b> sin cambiar nada.", { lv: 1 });
        return -1;
      }
      emit("impl", L.popIf, "<code>isEmpty</code> devolvió 0: hay nodos, seguimos.", { lv: 1, foco: ["main.pila"] });
      const a = pila.val.to;
      getVar(f, "temp").val = V.ptr(a);
      emit("impl", L.popTemp, "<code>temp = *tope</code> → <code>temp</code> también apunta al nodo del tope (" + a + "). Lo guardamos porque en un momento <code>pila</code> dejará de apuntarlo y lo necesitaremos para liberarlo.", { foco: ["pop.temp", a, "main.pila"] });
      const nd = mem.nodo(a);
      getVar(f, "valor").val = JSON.parse(JSON.stringify(nd.dato));
      emit("impl", L.popValor, "<code>valor = temp-&gt;dato</code> → guardamos el dato (<b>" + nd.dato.v + "</b>) antes de liberar el nodo.", { foco: ["pop.valor", a] });
      pila.val = JSON.parse(JSON.stringify(nd.sig));
      emit("impl", L.popTope, "<code>*tope = temp-&gt;siguiente</code> → <code>pila</code> (la variable de main) ahora apunta al <b>siguiente</b> nodo (" + valTxt(nd.sig) + "): el de abajo es el nuevo tope. El nodo viejo quedó “desconectado”.", { foco: ["main.pila", a], etiqueta: "swap" });
      mem.free(a);
      emit("impl", L.popFree, "<code>free(temp)</code> devuelve al sistema la memoria del nodo " + a + ". <code>temp</code> sigue guardando esa dirección pero <b>ya no es válida</b> (puntero colgante): por eso no se vuelve a usar.", { foco: ["pop.temp", a], etiqueta: "free" });
      mem.limpiar();
      const x = nd.dato.v;
      emit("impl", L.popRet, "<code>return valor</code> → devuelve <b>" + x + "</b> a quien llamó.", { foco: ["pop.valor"], etiqueta: "ok" });
      cerrar();
      emit("impl", L.popFin, "Termina <b>pop</b>: se van <code>tope</code>, <code>temp</code> y <code>valor</code>. Al nodo " + a + " ya lo liberamos, así que no hay fuga.", { lv: 1, foco: ["main.pila"] });
      return x;
    }

    function peek(lineaLlamada) {
      mem.limpiar();
      if (lineaLlamada) emit("main", lineaLlamada, "<code>main</code> llama a <code>peek(&amp;pila)</code> dentro de un <code>printf</code>.", { foco: ["main.pila"] });
      abrir("peek(tope)", [{ n: "tope", t: "struct Nodo **", val: V.ptr(MAIN_A) }]);
      emit("impl", L.peekSig, "Entra <b>peek</b>: solo <b>mira</b> el dato del tope.", { foco: ["peek.tope", "main.pila"] });
      emit("impl", L.peekIf, "Pregunta <code>isEmpty(*tope)</code>.", { lv: 1, foco: ["main.pila"] });
      const vacia = isEmpty(pila.val);
      if (vacia) {
        emit("impl", L.peekIf, "<code>isEmpty</code> devolvió 1: no hay nada que ver.", { etiqueta: "err" });
        emit("impl", L.peekErr, "Mensaje de error.", { sal: "Error: la pila esta vacia\n", etiqueta: "err" });
        emit("impl", L.peekRetErr, "<code>return -1;</code>", { etiqueta: "err" });
        cerrar();
        emit("impl", L.peekFin, "Termina <b>peek</b>.", { lv: 1 });
        return -1;
      }
      emit("impl", L.peekIf, "<code>isEmpty</code> devolvió 0: seguimos.", { lv: 1 });
      const a = pila.val.to;
      const x = mem.nodo(a).dato.v;
      emit("impl", L.peekRet, "<code>return (*tope)-&gt;dato</code> → <code>*tope</code> es <code>pila</code> (apunta a " + a + "); los paréntesis son necesarios porque <code>-&gt;</code> manda sobre <code>*</code>. Se lee el dato <b>" + x + "</b> y no se toca nada más.", { foco: [a, "main.pila"], etiqueta: "ok" });
      cerrar();
      emit("impl", L.peekFin, "Termina <b>peek</b>. La pila no cambió.", { lv: 1 });
      return x;
    }

    function destroy(lineaLlamada) {
      mem.limpiar();
      if (lineaLlamada) emit("main", lineaLlamada, "<code>main</code> llama a <code>destroy(&amp;pila)</code> para <b>liberar todos los nodos</b> antes de terminar (si no, quedarían reservados: fuga de memoria).", { foco: ["main.pila"] });
      const f = abrir("destroy(tope)", [
        { n: "tope", t: "struct Nodo **", val: V.ptr(MAIN_A) },
        { n: "temp", t: "struct Nodo *", val: V.unk() },
      ]);
      emit("impl", L.desSig, "Entra <b>destroy</b>.", { foco: ["destroy.tope"] });
      emit("impl", L.desTemp, "<code>temp</code> es una variable local (basura por ahora).", { lv: 1, foco: ["destroy.temp"] });
      let primera = true;
      while (pila.val.k !== "null") {
        emit("impl", L.desWhile, "<code>*tope != NULL</code> → <code>pila</code> vale " + valTxt(pila.val) + ": todavía quedan nodos. <b>Verdadero</b>.", { lv: 1, foco: ["main.pila"] });
        const a = pila.val.to;
        getVar(f, "temp").val = V.ptr(a);
        emit("impl", L.desA, "<code>temp = *tope</code> → <code>temp</code> apunta al nodo del tope (" + a + ").", { foco: ["destroy.temp", a] });
        const nd = mem.nodo(a);
        pila.val = JSON.parse(JSON.stringify(nd.sig));
        emit("impl", L.desB, "<code>*tope = (*tope)-&gt;siguiente</code> → <code>pila</code> avanza al siguiente nodo (" + valTxt(nd.sig) + ").", { foco: ["main.pila"], etiqueta: "swap" });
        mem.free(a);
        emit("impl", L.desFree, "<code>free(temp)</code> libera el nodo " + a + ".", { foco: [a, "destroy.temp"], etiqueta: "free" });
        mem.limpiar();
        primera = false;
      }
      emit("impl", L.desWhile, "<code>*tope != NULL</code> → <code>pila</code> es NULL: <b>falso</b>. " + (primera ? "No había nodos que liberar." : "Ya se liberaron todos los nodos."), { lv: 1, foco: ["main.pila"], etiqueta: "ok" });
      cerrar();
      emit("impl", L.desFin, "Termina <b>destroy</b>: el heap quedó limpio y <code>pila</code> vale NULL otra vez.", { foco: ["main.pila"], etiqueta: "ok" });
    }

    function printStack(lineaLlamada) {
      mem.limpiar();
      if (lineaLlamada) emit("main", lineaLlamada, "<code>main</code> llama a <code>printStack(&amp;pila)</code>.", { foco: ["main.pila"] });
      const f = abrir("printStack(tope)", [
        { n: "tope", t: "struct Nodo **", val: V.ptr(MAIN_A) },
        { n: "actual", t: "struct Nodo *", val: V.unk() },
      ]);
      emit("impl", L.prSig, "Entra <b>printStack</b>: recorre la cadena de nodos desde el tope.", { foco: ["printStack.tope"] });
      emit("impl", L.prIf, "Pregunta <code>isEmpty(*tope)</code>.", { lv: 1, foco: ["main.pila"] });
      const vacia = isEmpty(pila.val);
      if (vacia) {
        emit("impl", L.prIf, "<code>isEmpty</code> devolvió 1.", { foco: ["main.pila"] });
        emit("impl", L.prVacia, "Imprime que está vacía.", { sal: "La pila esta vacia\n" });
        emit("impl", L.prRetV, "<code>return;</code>", {});
        cerrar();
        emit("impl", L.prFin, "Termina <b>printStack</b>.", { lv: 1 });
        return;
      }
      emit("impl", L.prIf, "<code>isEmpty</code> devolvió 0: hay nodos.", { lv: 1 });
      emit("impl", L.prHead, "Se imprime el encabezado.", { lv: 1, sal: "Elementos de la pila\n" });
      getVar(f, "actual").val = JSON.parse(JSON.stringify(pila.val));
      emit("impl", L.prActual, "<code>actual = *tope</code> → <code>actual</code> empieza apuntando al tope. Usamos <code>actual</code> para recorrer; <b>no</b> movemos <code>pila</code> (si lo hiciéramos perderíamos la pila).", { foco: ["printStack.actual", pila.val.to] });
      let cur = getVar(f, "actual").val;
      while (cur.k !== "null") {
        const nd = mem.nodo(cur.to);
        emit("impl", L.prWhile, "<code>actual != NULL</code> → actual vale " + cur.to + ": <b>verdadero</b>.", { lv: 1, foco: ["printStack.actual", cur.to] });
        emit("impl", L.prItem, "<code>printf(\"%d  \", actual-&gt;dato)</code> → imprime <b>" + nd.dato.v + "</b>.", { foco: [cur.to], sal: nd.dato.v + "  " });
        getVar(f, "actual").val = JSON.parse(JSON.stringify(nd.sig));
        cur = getVar(f, "actual").val;
        emit("impl", L.prAvanza, "<code>actual = actual-&gt;siguiente</code> → avanza al siguiente nodo (" + valTxt(cur) + ").", { foco: ["printStack.actual"] });
      }
      emit("impl", L.prWhile, "<code>actual != NULL</code> → actual es NULL: <b>falso</b>. Se recorrió toda la pila.", { lv: 1, foco: ["printStack.actual"] });
      emit("impl", L.prNl, "Salto de línea.", { lv: 1, sal: "\n" });
      cerrar();
      emit("impl", L.prFin, "Termina <b>printStack</b> (no cambió nada).", { lv: 1 });
    }

    /* --- el main de pilaDinamica.c --- */
    M.guion = function () {
      emit("main", L.mPila, "<code>struct Nodo *pila = NULL;</code> → en el stack de <code>main</code> nace la variable <code>pila</code>, un apuntador. Vale <b>NULL</b>: “pila vacía, no apunto a nada”. <b>Esta variable es la pila completa</b>: solo guarda quién es el tope.", {});
      pila.val = V.nul();
      emit("main", L.mPila, "Ya inicializada: <code>pila = NULL</code>. El heap está vacío.", { lv: 1, foco: ["main.pila"] });
      [10, 20, 30, 40].forEach((n) => push(n, lPush(n)));
      printStack(L.mPrint1);
      emit("main", L.mTope, "Se evalúa <code>peek(&amp;pila)</code> para el <code>printf</code>.", { lv: 1, foco: ["main.pila"] });
      const x = peek(null);
      emit("main", L.mTope, "<code>peek</code> regresó <b>" + x + "</b> y <code>printf</code> lo muestra.", { sal: "Elemento en el tope: " + x + "\n", foco: ["main.pila"] });
      emit("main", L.mPop, "Se evalúa <code>pop(&amp;pila)</code> para el <code>printf</code>.", { lv: 1, foco: ["main.pila"] });
      const y = pop(null);
      emit("main", L.mPop, "<code>pop</code> regresó <b>" + y + "</b> y <code>printf</code> lo muestra.", { sal: "Elemento extraido: " + y + "\n", foco: ["main.pila"] });
      printStack(L.mPrint2);
      destroy(L.mDestroy);
      emit("main", L.mRet, "<code>return 0;</code> Fin del programa. El heap quedó vacío: <b>cada malloc tuvo su free</b>.", { etiqueta: "ok" });
    };

    /* --- laboratorio --- */
    M.iniciar = function () {
      pila.val = V.nul();
    };
    M.lab = function (op, arg) {
      const ini = T.pasos.length;
      let txt;
      if (op === "push") { txt = "Tú escribiste: <code>push(&amp;pila, " + arg + ");</code> — "; push(arg, null); }
      else if (op === "pop") { txt = "Tú escribiste: <code>pop(&amp;pila);</code> — "; pop(null); }
      else if (op === "peek") { txt = "Tú escribiste: <code>peek(&amp;pila);</code> — "; peek(null); }
      else if (op === "print") { txt = "Tú escribiste: <code>printStack(&amp;pila);</code> — "; printStack(null); }
      else if (op === "destroy") { txt = "Tú escribiste: <code>destroy(&amp;pila);</code> — "; destroy(null); }
      if (T.pasos[ini]) T.pasos[ini].nota = txt + T.pasos[ini].nota;
      return T.pasos.slice(ini);
    };
    M.estado = () => ({ nodos: mem.cuantos(), pila: JSON.parse(JSON.stringify(pila.val)) });
    M.vacia = () => pila.val.k === "null";
    M.nodos = () => mem.cuantos();
    M.inicioLab = function () {
      pila.val = V.nul();
      return [
        T.paso({
          f: "main",
          l: L.mPila,
          nota: "Laboratorio listo: <code>struct Nodo *pila = NULL;</code>. Usa los botones para llamar a las funciones de tu código y mira qué pasa en el stack y el heap.",
          viz: copiaViz(frames(), mem, ["main.pila"]),
        }),
      ];
    };
    return M;
  };

  /* =======================================================
     LECCION: un * (copia) vs dos ** (la variable original)
     version 'mal' | 'bien'
     ======================================================= */
  E.est.dobleApuntador = function (version, A) {
    const Lf = E.anclas(A.impl, "doble-" + version);
    const mal = version === "mal";
    const nombreFn = mal ? "pushMal" : "pushBien";
    const T = E.nuevoTrazo();
    const mem = E.mem();
    const MAIN_A = E.dirStack(0, 0);
    const main = marco("main()", 0, [{ n: "pila", t: "struct Nodo *", val: V.unk() }]);
    const pila = getVar(main, "pila");
    let extra = [];
    const frames = () => [main].concat(extra);
    const fugas = () => {
      // nodos a los que nadie llega desde main.pila
      const alcanzables = new Set();
      let p = pila.val;
      while (p && p.k === "ptr") {
        alcanzables.add(p.to);
        const nd = mem.nodo(p.to);
        p = nd ? nd.sig : null;
      }
      return mem.vivos().filter((a) => !alcanzables.has(a));
    };
    function emit(l, nota, o) {
      o = o || {};
      return T.paso({ f: "impl", l: l, nota: nota, lv: o.lv || 0, viz: copiaViz(frames(), mem, o.foco, o.nuevo, fugas()), etiqueta: o.etiqueta });
    }
    const L = {
      sig: Lf(mal ? "void pushMal(struct Nodo *tope, int valor){" : "void pushBien(struct Nodo **tope, int valor){"),
      malloc: Lf("malloc(sizeof(struct Nodo));"),
      dato: Lf("nuevo->dato = valor;"),
      sig2: Lf(mal ? "nuevo->siguiente = tope;" : "nuevo->siguiente = *tope;"),
      tope: Lf(mal ? "tope = nuevo;" : "*tope = nuevo;"),
      fin: Lf.fin(mal ? "void pushMal(struct Nodo *tope, int valor){" : "void pushBien(struct Nodo **tope, int valor){"),
      mPila: Lf("struct Nodo *pila = NULL;"),
      mRet: Lf("return 0;"),
    };
    const lLlamada = (v) => Lf(nombreFn + (mal ? "(pila, " : "(&pila, ") + v + ");");
    const valTxt = (v) => (v.k === "null" ? "NULL" : v.k === "ptr" ? v.to : "?");

    function empuja(valor) {
      emit(lLlamada(valor), mal
        ? "<code>main</code> llama a <code>pushMal(pila, " + valor + ")</code>. Se pasa el <b>valor</b> de <code>pila</code> (" + valTxt(pila.val) + "): C <b>copia</b> ese valor en el parámetro."
        : "<code>main</code> llama a <code>pushBien(&amp;pila, " + valor + ")</code>. Se pasa la <b>dirección</b> de la variable <code>pila</code> (" + MAIN_A + ").", { foco: ["main.pila"] });
      const tipo = mal ? "struct Nodo *" : "struct Nodo **";
      const f = marco(nombreFn + "(tope, valor)", 1, [
        { n: "tope", t: tipo, val: mal ? JSON.parse(JSON.stringify(pila.val)) : V.ptr(MAIN_A) },
        { n: "valor", t: "int", val: V.int(valor) },
        { n: "nuevo", t: "struct Nodo *", val: V.unk() },
      ]);
      extra.push(f);
      emit(L.sig, mal
        ? "Entra <b>pushMal</b>. <code>tope</code> es una <b>copia</b> de <code>pila</code> (vale " + valTxt(pila.val) + "). Son dos variables distintas con el mismo contenido."
        : "Entra <b>pushBien</b>. <code>tope</code> guarda " + MAIN_A + ": la <b>dirección de la variable</b> <code>pila</code>. Con esa dirección puede llegar hasta la variable original.", { foco: ["pushMal.tope", "pushBien.tope", "main.pila"] });
      const a = mem.malloc();
      getVar(f, "nuevo").val = V.ptr(a);
      emit(L.malloc, "<code>malloc</code> reserva un nodo en el heap (" + a + ") y <code>nuevo</code> lo apunta.", { foco: [nombreFn + ".nuevo", a], nuevo: a, etiqueta: "alloc" });
      mem.nodo(a).dato = V.int(valor);
      emit(L.dato, "Se guarda el dato <b>" + valor + "</b> en el nodo.", { foco: [a] });
      const prev = getVar(f, "tope");
      const antes = mal ? JSON.parse(JSON.stringify(prev.val)) : JSON.parse(JSON.stringify(pila.val));
      mem.nodo(a).sig = antes;
      emit(L.sig2, mal
        ? "<code>nuevo-&gt;siguiente = tope</code> → el nodo apunta a lo que dice la <b>copia</b> (" + valTxt(antes) + ")."
        : "<code>nuevo-&gt;siguiente = *tope</code> → <code>*tope</code> es el valor de <code>pila</code> (" + valTxt(antes) + "). El nodo nuevo apunta al antiguo tope.", { foco: [a] });
      if (mal) {
        prev.val = V.ptr(a);
        emit(L.tope, "<code>tope = nuevo</code> → ¡cambia la <b>copia local</b>! Mira: <code>pushMal.tope</code> ya apunta al nodo, pero <code>main.pila</code> sigue valiendo <b>" + valTxt(pila.val) + "</b>. Modificar un parámetro nunca modifica la variable original.", { foco: ["pushMal.tope", "main.pila"], etiqueta: "err" });
      } else {
        pila.val = V.ptr(a);
        emit(L.tope, "<code>*tope = nuevo</code> → el <code>*</code> dice “ve a la dirección que guarda <code>tope</code> (" + MAIN_A + ") y cambia lo que haya ahí”. Esa dirección es la de <code>pila</code>, así que <b>main.pila</b> ahora apunta al nodo nuevo.", { foco: ["main.pila", "pushBien.tope"], etiqueta: "ok" });
      }
      extra.pop();
      const lost = fugas();
      emit(L.fin, mal
        ? "Termina <b>pushMal</b>: se destruyen <code>tope</code> (la copia), <code>valor</code> y <code>nuevo</code>. <b>Nadie apunta al nodo " + a + "</b>: sigue ocupando memoria en el heap pero es inalcanzable → <b>fuga de memoria</b>. Y <code>pila</code> sigue en NULL."
        : "Termina <b>pushBien</b>. Los locales se van, pero <code>pila</code> sí cambió y apunta al nodo " + a + ": cero fugas.", { foco: ["main.pila"], etiqueta: mal ? "err" : "ok" });
    }

    emit(L.mPila, "<code>pila</code> nace en NULL: una pila vacía.", {});
    pila.val = V.nul();
    emit(L.mPila, "Ya vale NULL.", { lv: 1, foco: ["main.pila"] });
    empuja(10);
    empuja(20);
    emit(L.mRet, mal
      ? "Fin del programa. Resultado de la versión <b>incorrecta</b>: <code>pila</code> sigue en NULL (¡la pila “está vacía” aunque hicimos dos push!) y hay <b>2 nodos perdidos</b> en el heap. Eso es lo que el <code>**</code> evita."
      : "Fin del programa. Con el doble apuntador: <code>pila</code> → 20 → 10 → NULL. Dos <code>push</code>, dos nodos enlazados, cero pérdidas (en tu pila real <code>destroy</code> los liberaría).", { foco: ["main.pila"], etiqueta: mal ? "err" : "ok" });
    return T;
  };

  /* =======================================================
     INFIJA -> POSTFIJA (examen/main.c con pila dinámica)
     ======================================================= */
  E.est.infija = function (expr, A) {
    const Lm = E.anclas(A.main, "infija");
    const T = E.nuevoTrazo();
    const mem = E.mem();
    const pilaNodos = []; // [{ch, a}] base ... tope
    let salida = []; // tokens
    let salidaTxt = ""; // salida[] en C (con espacios)
    let sal = "";
    const resultado = { postfija: "" };
    const PM = ["main()"];
    const PF = ["infijoAPostfijo(expr, salida)", "main()"];
    const L = {
      prec: Lm("int precedencia(int op){"),
      fn: Lm("void infijoAPostfijo(const char *expr, char *salida){"),
      pilaNull: Lm("struct Nodo *pila=NULL;"),
      jInit: Lm("int j=0;"),
      forI: Lm("for(int i=0; expr[i]!='\\0'; i++){"),
      c: Lm("char c=expr[i];"),
      esp: Lm("if(c==' ') continue;"),
      dig: Lm("if(isdigit((unsigned char)c)){"),
      digSal: Lm("salida[j++]=c;"),
      digEsp: Lm("salida[j++]=' ';", 1),
      abre: Lm("else if(c=='('){"),
      abrePush: Lm("push(&pila,c);", 1),
      cierra: Lm("else if(c==')'){"),
      cierraW: Lm("while(!isEmpty(pila) && peek(&pila)!='('){"),
      cierraPop: Lm("salida[j++]=(char)pop(&pila);", 1),
      cierraEsp: Lm("salida[j++]=' ';", 2),
      cierraPop2: Lm("pop(&pila);", 2),
      op: Lm("else if(esOperador(c)){"),
      opW: Lm("while(!isEmpty(pila) && peek(&pila)!='(' &&"),
      opW2: Lm("precedencia(peek(&pila))>=precedencia(c)){"),
      opPop: Lm("salida[j++]=(char)pop(&pila);", 2),
      opEsp: Lm("salida[j++]=' ';", 3),
      opPush: Lm("push(&pila,c);", 2),
      finW: Lm("while(!isEmpty(pila)){"),
      finPop: Lm("salida[j++]=(char)pop(&pila);", 3),
      finEsp: Lm("salida[j++]=' ';", 4),
      jMenos: Lm("if(j>0) j--;"),
      nulo: Lm("salida[j]='\\0';"),
      destroy: Lm("destroy(&pila);"),
      // main
      mInfija: Lm("const char *infija="),
      mPrintI: Lm("printf(\"Infija:   %s\\n\", infija);"),
      mLlama: Lm("infijoAPostfijo(infija, postfija);"),
      mPrintP: Lm("printf(\"Postfija: %s\\n\", postfija);"),
      mRet: Lm("return 0;"),
    };
    const precedencia = (op) => (op === "+" || op === "-" ? 1 : op === "*" || op === "/" ? 2 : op === "^" ? 3 : 0);
    const esOperador = (c) => "+-*/^".indexOf(c) >= 0;
    const esDigito = (c) => c >= "0" && c <= "9";
    const pilaTxt = () => (pilaNodos.length ? pilaNodos.slice().reverse().map((n) => n.ch).join(" ") : "∅");
    const ESTADO = { i: null, c: null, j: 0 };
    let enFn = false; // estamos dentro de infijoAPostfijo

    function viz(opts) {
      opts = opts || {};
      return {
        expr: expr,
        i: ESTADO.i,
        c: ESTADO.c,
        pila: pilaNodos.slice().reverse().map((n, k) => ({ ch: n.ch, a: n.a, est: opts.nuevoTope && k === 0 ? "nuevo" : "" })),
        salida: salida.slice(),
        salidaNueva: !!opts.salidaNueva,
        estado: opts.estado || "",
      };
    }
    function emit(f, l, nota, o) {
      o = o || {};
      return T.paso({
        f: f,
        l: l,
        nota: nota,
        lv: o.lv || 0,
        viz: viz(o),
        v: o.v || (enFn
          ? { i: ESTADO.i === null ? "?" : ESTADO.i, c: ESTADO.c === null ? "?" : "'" + ESTADO.c + "'", j: ESTADO.j, "pila →": pilaNodos.length ? pilaNodos[pilaNodos.length - 1].a : "NULL" }
          : { infija: "\"" + expr + "\"" }),
        pila: enFn ? PF : PM,
        sal: o.sal,
        etiqueta: o.etiqueta,
        fila: o.fila,
      });
    }
    const fila = (accion) => ({ i: ESTADO.i, c: ESTADO.c == null ? "—" : ESTADO.c === " " ? "␣" : ESTADO.c, accion: accion, pila: pilaTxt() + (pilaNodos.length ? "  ← tope" : ""), salida: salida.join(" ") });
    function empujar(ch) {
      const a = mem.malloc();
      pilaNodos.push({ ch: ch, a: a });
      return a;
    }
    function sacar() {
      const n = pilaNodos.pop();
      mem.free(n.a);
      mem.limpiar();
      return n;
    }
    function escribirSalida(tok) {
      salida.push(tok);
      salidaTxt += tok + " ";
      ESTADO.j = salidaTxt.length;
    }

    /* main */
    emit("main", L.mInfija, "<code>infija</code> apunta a la cadena <b>" + expr + "</b> (en tu archivo es <code>5+3*7+(2+1)*9</code>; aquí puedes probar otras). Se reserva <code>postfija[128]</code> para el resultado.", {});
    sal += "Infija:   " + expr + "\n";
    emit("main", L.mPrintI, "Se imprime la expresión infija.", { lv: 1, sal: "Infija:   " + expr + "\n" });
    emit("main", L.mLlama, "<code>main</code> llama a <code>infijoAPostfijo(infija, postfija)</code>: la función leerá la cadena símbolo por símbolo usando una <b>pila dinámica de operadores</b> y escribirá el resultado en <code>postfija</code>.", {});
    enFn = true;
    emit("main", L.fn, "Entra <b>infijoAPostfijo</b>. Recibe la cadena <code>expr</code> y el arreglo <code>salida</code> donde escribirá.", {});
    emit("main", L.pilaNull, "<code>struct Nodo *pila = NULL</code> → pila de operadores <b>vacía</b>. (Es la misma pila dinámica de tu práctica: nodos en el heap, con <code>push</code>/<code>pop</code>/<code>peek</code>.)", {});
    emit("main", L.jInit, "<code>int j = 0</code>: <code>j</code> es la posición donde se escribirá el siguiente carácter en <code>salida</code>.", { lv: 1 });

    const reglas = "<b>Regla:</b> un dígito va directo a la salida; un <b>(</b> se apila; un <b>)</b> saca operadores hasta encontrar el <b>(</b>; un operador saca antes a los que tengan <b>igual o mayor</b> precedencia y luego se apila.";
    for (let i = 0; i < expr.length; i++) {
      ESTADO.i = i;
      ESTADO.c = expr[i];
      const c = expr[i];
      emit("main", L.forI, (i === 0 ? "<code>i = 0</code>. " : "<code>i++</code> → <code>i = " + i + "</code>. ") + "Condición <code>expr[i] != '\\0'</code> → hay símbolo: <b>verdadera</b>.", { lv: 1 });
      emit("main", L.c, "<code>c = expr[" + i + "]</code> → leo el símbolo <b>" + (c === " " ? "(espacio)" : c) + "</b>. " + (i === 0 ? reglas : ""), { estado: "c = '" + c + "'" });
      if (c === " ") {
        emit("main", L.esp, "<code>if (c == ' ') continue;</code> → es un espacio: se salta, no se hace nada con él.", { lv: 1, etiqueta: "cmp" });
        continue;
      }
      emit("main", L.esp, "¿es un espacio? No: sigue.", { lv: 1 });
      if (esDigito(c)) {
        emit("main", L.dig, "<code>isdigit(c)</code> → <b>" + c + "</b> es un dígito (un operando): los operandos <b>pasan directo a la salida</b>.", { etiqueta: "cmp" });
        emit("main", L.digSal, "<code>salida[j++] = c</code> → se escribe <b>" + c + "</b> en la salida.", { lv: 1 });
        escribirSalida(c);
        emit("main", L.digEsp, "<code>salida[j++] = ' '</code> → se agrega un espacio para separar. La salida va: <b>" + salida.join(" ") + "</b>.", { salidaNueva: true, etiqueta: "swap", fila: fila("sale " + c), estado: "salida ← " + c });
        continue;
      }
      emit("main", L.dig, "<code>isdigit(c)</code> → '" + c + "' no es dígito.", { lv: 1 });
      if (c === "(") {
        emit("main", L.abre, "<code>c == '('</code> → es un paréntesis que <b>abre</b>: se apila siempre; marca el inicio de un subgrupo.", { etiqueta: "cmp" });
        const a = empujar(c);
        emit("main", L.abrePush, "<code>push(&amp;pila, c)</code> → se crea el nodo " + a + " con '(' y es el nuevo tope. Pila: <b>" + pilaTxt() + "</b>.", { nuevoTope: true, etiqueta: "alloc", fila: fila("push ("), estado: "pila ← (" });
        continue;
      }
      emit("main", L.abre, "<code>c == '('</code> → no.", { lv: 1 });
      if (c === ")") {
        emit("main", L.cierra, "<code>c == ')'</code> → paréntesis que <b>cierra</b>: hay que vaciar la pila hasta encontrar su '(' y mandar todo a la salida.", { etiqueta: "cmp" });
        for (;;) {
          const vacia = pilaNodos.length === 0;
          const tope = vacia ? null : pilaNodos[pilaNodos.length - 1].ch;
          const cond = !vacia && tope !== "(";
          emit("main", L.cierraW, "<code>while (!isEmpty(pila) &amp;&amp; peek(&amp;pila) != '(')</code> → " + (vacia ? "la pila está vacía: <b>falso</b> (se corta)." : "la pila no está vacía y el tope es <b>" + tope + "</b>: " + (cond ? "no es '(' → <b>verdadero</b>, hay que sacarlo." : "es '(' → <b>falso</b>: llegamos al inicio del grupo.")), { lv: cond ? 0 : 1 });
          if (!cond) break;
          const n = sacar();
          emit("main", L.cierraPop, "<code>salida[j++] = (char) pop(&amp;pila)</code> → se saca el <b>" + n.ch + "</b> (se libera su nodo con <code>free</code>) y se escribe en la salida.", { etiqueta: "free" });
          escribirSalida(n.ch);
          emit("main", L.cierraEsp, "Espacio. Salida: <b>" + salida.join(" ") + "</b>.", { salidaNueva: true, etiqueta: "swap", fila: fila("pop " + n.ch + " → salida"), estado: "salida ← " + n.ch });
        }
        if (pilaNodos.length) {
          const n = sacar();
          emit("main", L.cierraPop2, "<code>pop(&amp;pila)</code> → se saca y <b>descarta</b> el '(' (los paréntesis no existen en postfija). Pila: <b>" + pilaTxt() + "</b>.", { etiqueta: "free", fila: fila("pop ( (descartar)"), estado: "se descarta (" });
        } else {
          sal += "Error: la pila esta vacia\n\n";
          emit("main", L.cierraPop2, "<code>pop(&amp;pila)</code> con la pila <b>vacía</b>: este ')' no tenía su '(' (expresión mal escrita). Tu <code>pop</code> imprime un error y el programa sigue.", { sal: "Error: la pila esta vacia\n\n", etiqueta: "err", fila: fila("pop en pila vacía (error)") });
        }
        continue;
      }
      emit("main", L.cierra, "<code>c == ')'</code> → no.", { lv: 1 });
      if (esOperador(c)) {
        emit("main", L.op, "<code>esOperador(c)</code> → <b>" + c + "</b> es un operador (precedencia " + precedencia(c) + "). Antes de apilarlo hay que sacar los operadores que ya estaban y que deben ejecutarse primero.", { etiqueta: "cmp" });
        for (;;) {
          const vacia = pilaNodos.length === 0;
          if (vacia) {
            emit("main", L.opW, "<code>while (!isEmpty(pila) …)</code> → la pila está <b>vacía</b>: la condición es falsa y no hay nada que sacar.", { lv: 1 });
            break;
          }
          const tope = pilaNodos[pilaNodos.length - 1].ch;
          if (tope === "(") {
            emit("main", L.opW, "<code>peek(&amp;pila) != '('</code> → el tope es '(': <b>falso</b>. Un '(' es un muro: nada se saca más allá de él.", { lv: 1 });
            break;
          }
          const pt = precedencia(tope);
          const pc = precedencia(c);
          const saca = pt >= pc;
          emit("main", L.opW2, "<code>precedencia(peek(&amp;pila)) &gt;= precedencia(c)</code> → precedencia('" + tope + "') = " + pt + " &gt;= precedencia('" + c + "') = " + pc + " → <b>" + (saca ? "verdadero: el '" + tope + "' debe ejecutarse antes, se saca." : "falso: '" + c + "' manda más, el '" + tope + "' se queda abajo.") + "</b>", { etiqueta: "cmp", lv: saca ? 0 : 0 });
          if (!saca) break;
          const n = sacar();
          emit("main", L.opPop, "<code>salida[j++] = (char) pop(&amp;pila)</code> → sale el <b>" + n.ch + "</b> a la salida.", { etiqueta: "free" });
          escribirSalida(n.ch);
          emit("main", L.opEsp, "Espacio. Salida: <b>" + salida.join(" ") + "</b>.", { salidaNueva: true, etiqueta: "swap", fila: fila("pop " + n.ch + " → salida"), estado: "salida ← " + n.ch });
        }
        const a = empujar(c);
        emit("main", L.opPush, "<code>push(&amp;pila, c)</code> → ahora sí se apila el <b>" + c + "</b> (nodo " + a + "). Pila: <b>" + pilaTxt() + "</b>.", { nuevoTope: true, etiqueta: "alloc", fila: fila("push " + c), estado: "pila ← " + c });
        continue;
      }
      emit("main", L.op, "<code>esOperador(c)</code> → '" + c + "' no es operador, ni dígito, ni paréntesis: <b>se ignora</b> (tu código no marca error).", { etiqueta: "err", fila: fila("ignorado") });
    }
    ESTADO.c = null;
    emit("main", L.forI, "<code>i++</code> → <code>i = " + expr.length + "</code>. <code>expr[i] != '\\0'</code> es <b>falso</b>: ya se leyó toda la expresión. Solo falta vaciar la pila.", { lv: 1, i: null });
    ESTADO.i = expr.length;
    for (;;) {
      const vacia = pilaNodos.length === 0;
      emit("main", L.finW, "<code>while (!isEmpty(pila))</code> → " + (vacia ? "la pila está vacía: <b>falso</b>, terminamos de vaciar." : "quedan operadores (" + pilaTxt() + "): <b>verdadero</b>."), { lv: vacia ? 1 : 0 });
      if (vacia) break;
      const n = sacar();
      emit("main", L.finPop, "<code>salida[j++] = (char) pop(&amp;pila)</code> → sale el <b>" + n.ch + "</b>.", { etiqueta: "free" });
      escribirSalida(n.ch);
      emit("main", L.finEsp, "Espacio. Salida: <b>" + salida.join(" ") + "</b>.", { salidaNueva: true, etiqueta: "swap", fila: fila("pop " + n.ch + " → salida"), estado: "salida ← " + n.ch });
    }
    if (salidaTxt.length > 0) {
      salidaTxt = salidaTxt.slice(0, -1);
      ESTADO.j = salidaTxt.length;
    }
    emit("main", L.jMenos, "<code>if (j &gt; 0) j--</code> → hay un espacio de más al final; <code>j</code> retrocede una posición para pisarlo.", {});
    emit("main", L.nulo, "<code>salida[j] = '\\0'</code> → se cierra la cadena en C. Resultado: <b>" + salidaTxt + "</b>.", { lv: 1 });
    emit("main", L.destroy, "<code>destroy(&amp;pila)</code> libera cualquier nodo que quedara (aquí ninguno: la pila ya está vacía).", { lv: 1 });
    resultado.postfija = salidaTxt;
    enFn = false;
    emit("main", L.mPrintP, "Regresamos a <code>main</code> y se imprime el resultado.", { sal: "Postfija: " + salidaTxt + "\n", etiqueta: "ok" });
    sal += "Postfija: " + salidaTxt + "\n";
    emit("main", L.mRet, "Fin del programa.", { etiqueta: "ok" });
    T.postfija = salidaTxt;
    T.consola = sal;
    return T;
  };
  E.est.infija.cols = [
    { k: "i", label: "i" },
    { k: "c", label: "símbolo c" },
    { k: "accion", label: "acción" },
    { k: "pila", label: "pila (tope →)" },
    { k: "salida", label: "salida", clase: "td-arr" },
  ];
})();
