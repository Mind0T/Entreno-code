/* ============================================================
   trazas-colas.js
   Cola estatica circular y cola dinamica (frente / final).
   El codigo C de estas colas esta en Estudio/c_extra/ con tu mismo
   estilo (init, isEmpty, enqueue, dequeue, front, printQueue).
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  E.est = E.est || {};
  const V = E.V;

  /* =======================================================
     COLA ESTATICA (arreglo circular)
     ======================================================= */
  E.est.colaEstatica = function (A) {
    const Li = E.anclas(A.impl, "colaEstatica");
    const Lm = E.anclas(A.main, "colaEstatica");
    const MAX = 5;
    const S = { dato: new Array(MAX).fill(null), frente: null, final: null, cantidad: null };
    const T = E.nuevoTrazo();
    const M = { T: T, pasos: T.pasos, salImpl: "" };
    const PM = ["main()"];
    const L = {
      initSig: Li("void init(struct Cola *c){"),
      initF: Li("c->frente=0;"),
      initL: Li("c->final=-1;"),
      initC: Li("c->cantidad=0;"),
      emptyRet: Li("return c->cantidad==0;"),
      fullRet: Li("return c->cantidad==MAX;"),
      enqSig: Li("void enqueue(struct Cola *c, int valor){"),
      enqIf: Li("if(isFull(c)){"),
      enqErr: Li("Error: la cola esta llena"),
      enqRet: Li("return;", 1),
      enqFinal: Li("c->final=(c->final+1)%MAX;"),
      enqDato: Li("c->dato[c->final]=valor;"),
      enqCant: Li("c->cantidad++;"),
      enqFin: Li.fin("void enqueue(struct Cola *c, int valor){"),
      deqSig: Li("int dequeue(struct Cola *c){"),
      deqIf: Li("if(isEmpty(c)){", 1),
      deqErr: Li("Error: la cola esta vacia", 1),
      deqRetErr: Li("return -1;", 1),
      deqValor: Li("int valor=c->dato[c->frente];"),
      deqFrente: Li("c->frente=(c->frente+1)%MAX;"),
      deqCant: Li("c->cantidad--;"),
      deqRet: Li("return valor;"),
      deqFin: Li.fin("int dequeue(struct Cola *c){"),
      frSig: Li("int front(struct Cola *c){"),
      frIf: Li("if(isEmpty(c)){", 2),
      frErr: Li("Error: la cola esta vacia", 2),
      frRetErr: Li("return -1;", 2),
      frRet: Li("return c->dato[c->frente];"),
      prSig: Li("void printQueue(struct Cola *c){"),
      prIf: Li("if(isEmpty(c)){", 3),
      prVacia: Li("La cola esta vacia"),
      prRetV: Li("return;", 2),
      prHead: Li("Elementos de la cola"),
      prFor: Li("for(int k=0;k<c->cantidad;k++){"),
      prItem: Li("printf(\"%d  \",c->dato[(c->frente+k)%MAX]);"),
      prNl: Li("printf(\"\\n\");"),
      mCola: Lm("struct Cola cola;"),
      mInit: Lm("init(&cola);"),
      mAt: Lm("printf(\"Atendido: %d\\n\",dequeue(&cola));"),
      mFrente: Lm("printf(\"Frente: %d\\n\",front(&cola));"),
      mRet: Lm("return 0;"),
    };
    const vizS = (marca) => ({ dato: S.dato.slice(), frente: S.frente === null ? -1 : S.frente, final: S.final === null ? -1 : S.final, cantidad: S.cantidad === null ? 0 : S.cantidad, max: MAX, marca: marca || null, sinInit: S.frente === null });
    function emit(f, l, nota, o) {
      o = o || {};
      if (o.sal && f === "impl") M.salImpl += o.sal;
      return T.paso({
        f: f,
        l: l,
        nota: nota,
        lv: o.lv || 0,
        viz: vizS(o.marca),
        v: o.v || (f === "main" ? { "cola.frente": S.frente === null ? "?" : S.frente, "cola.final": S.final === null ? "?" : S.final, "cola.cantidad": S.cantidad === null ? "?" : S.cantidad } : null),
        pila: o.pila || PM,
        sal: o.sal,
        etiqueta: o.etiqueta,
      });
    }
    const pf = (n, base) => [n].concat(base);

    function init(base) {
      const pl = pf("init(c = &cola)", base);
      const v = { c: "&cola" };
      emit("impl", L.initSig, "Entra <b>init</b>: deja la cola en su estado inicial.", { v, pila: pl });
      S.frente = 0;
      emit("impl", L.initF, "<code>c-&gt;frente = 0</code> → el primer elemento en salir estará en la posición <b>0</b>.", { v, pila: pl });
      S.final = -1;
      emit("impl", L.initL, "<code>c-&gt;final = -1</code> → <code>final</code> es la posición del <b>último</b> elemento. Vale -1 porque todavía no hay ninguno: el primer <code>enqueue</code> lo moverá a 0.", { v, pila: pl });
      S.cantidad = 0;
      emit("impl", L.initC, "<code>c-&gt;cantidad = 0</code> → llevamos la cuenta de cuántos elementos hay. Con este contador es fácil saber si está llena o vacía.", { v, pila: pl, etiqueta: "ok" });
    }
    function isFull(base) {
      const pl = pf("isFull(c = &cola)", base);
      const r = S.cantidad === MAX ? 1 : 0;
      emit("impl", L.fullRet, "<code>isFull</code>: <code>return c-&gt;cantidad == MAX</code> → " + S.cantidad + " == " + MAX + " → <b>" + (r ? "verdadero (1)" : "falso (0)") + "</b>.", { lv: 1, v: { c: "&cola" }, pila: pl });
      return r;
    }
    function isEmpty(base) {
      const pl = pf("isEmpty(c = &cola)", base);
      const r = S.cantidad === 0 ? 1 : 0;
      emit("impl", L.emptyRet, "<code>isEmpty</code>: <code>return c-&gt;cantidad == 0</code> → " + S.cantidad + " == 0 → <b>" + (r ? "verdadero (1)" : "falso (0)") + "</b>.", { lv: 1, v: { c: "&cola" }, pila: pl });
      return r;
    }
    function enqueue(valor, base) {
      const pl = pf("enqueue(c = &cola, valor = " + valor + ")", base);
      const v = { c: "&cola", valor: valor };
      emit("impl", L.enqSig, "Entra <b>enqueue</b>: quiere formar al <b>" + valor + "</b> al <b>final</b> de la cola.", { v, pila: pl });
      emit("impl", L.enqIf, "¿Hay lugar? Se llama a <code>isFull(c)</code>.", { lv: 1, v, pila: pl });
      const llena = isFull(pl);
      if (llena) {
        emit("impl", L.enqIf, "<code>isFull</code> devolvió 1: <code>cantidad == MAX</code>. La cola está <b>llena</b>.", { v, pila: pl, etiqueta: "err" });
        emit("impl", L.enqErr, "Mensaje de error.", { v, pila: pl, sal: "Error: la cola esta llena\n", etiqueta: "err" });
        emit("impl", L.enqRet, "<code>return;</code> no se guarda nada.", { v, pila: pl, etiqueta: "err" });
        return;
      }
      emit("impl", L.enqIf, "<code>isFull</code> devolvió 0: hay lugar.", { lv: 1, v, pila: pl });
      const antes = S.final;
      S.final = (S.final + 1) % MAX;
      const vuelta = antes === MAX - 1;
      emit("impl", L.enqFinal, "<code>c-&gt;final = (c-&gt;final + 1) % MAX</code> → (" + antes + " + 1) % " + MAX + " = <b>" + S.final + "</b>." + (vuelta ? " ¡<b>Dio la vuelta</b>! Al llegar al índice " + (MAX - 1) + ", el siguiente es el 0: por eso es una cola <b>circular</b>, y por eso se reutilizan los huecos que dejó <code>dequeue</code>." : " El operador <code>%</code> (residuo) mantiene el índice entre 0 y " + (MAX - 1) + "."), { v, pila: pl, marca: { nuevo: S.final } });
      S.dato[S.final] = valor;
      emit("impl", L.enqDato, "<code>c-&gt;dato[c-&gt;final] = valor</code> → se guarda el <b>" + valor + "</b> en <code>dato[" + S.final + "]</code>.", { v, pila: pl, marca: { nuevo: S.final }, etiqueta: "swap" });
      S.cantidad++;
      emit("impl", L.enqCant, "<code>c-&gt;cantidad++</code> → ahora hay <b>" + S.cantidad + "</b> elemento" + (S.cantidad === 1 ? "" : "s") + ".", { v, pila: pl, marca: { nuevo: S.final }, etiqueta: "ok" });
      emit("impl", L.enqFin, "Termina <b>enqueue</b>.", { lv: 1, v, pila: pl });
    }
    function dequeue(base) {
      const pl = pf("dequeue(c = &cola)", base);
      const v = { c: "&cola", valor: "?" };
      emit("impl", L.deqSig, "Entra <b>dequeue</b>: atiende (saca) al que lleva más tiempo esperando: el del <b>frente</b>.", { v, pila: pl });
      emit("impl", L.deqIf, "Primero se pregunta <code>isEmpty(c)</code>.", { lv: 1, v, pila: pl });
      const vacia = isEmpty(pl);
      if (vacia) {
        emit("impl", L.deqIf, "<code>isEmpty</code> devolvió 1: nadie en la cola.", { v, pila: pl, etiqueta: "err" });
        emit("impl", L.deqErr, "Mensaje de error.", { v, pila: pl, sal: "Error: la cola esta vacia\n", etiqueta: "err" });
        emit("impl", L.deqRetErr, "<code>return -1;</code>", { v, pila: pl, etiqueta: "err" });
        return -1;
      }
      emit("impl", L.deqIf, "<code>isEmpty</code> devolvió 0: hay a quién atender.", { lv: 1, v, pila: pl });
      const x = S.dato[S.frente];
      v.valor = x;
      emit("impl", L.deqValor, "<code>valor = c-&gt;dato[c-&gt;frente]</code> → se guarda el <b>" + x + "</b> (está en <code>dato[" + S.frente + "]</code>) para poder devolverlo.", { v, pila: pl, marca: { sacado: S.frente } });
      const antes = S.frente;
      S.frente = (S.frente + 1) % MAX;
      emit("impl", L.deqFrente, "<code>c-&gt;frente = (c-&gt;frente + 1) % MAX</code> → (" + antes + " + 1) % " + MAX + " = <b>" + S.frente + "</b>. El frente avanza; el " + x + " queda como residuo (ya no cuenta).", { v, pila: pl, marca: { sacado: antes } });
      S.cantidad--;
      emit("impl", L.deqCant, "<code>c-&gt;cantidad--</code> → quedan <b>" + S.cantidad + "</b>.", { v, pila: pl, etiqueta: "swap" });
      emit("impl", L.deqRet, "<code>return valor</code> → regresa <b>" + x + "</b>.", { v, pila: pl, etiqueta: "ok" });
      emit("impl", L.deqFin, "Termina <b>dequeue</b>.", { lv: 1, v, pila: pl });
      return x;
    }
    function front(base) {
      const pl = pf("front(c = &cola)", base);
      const v = { c: "&cola" };
      emit("impl", L.frSig, "Entra <b>front</b>: solo <b>mira</b> quién está al frente.", { v, pila: pl });
      emit("impl", L.frIf, "Pregunta <code>isEmpty(c)</code>.", { lv: 1, v, pila: pl });
      const vacia = isEmpty(pl);
      if (vacia) {
        emit("impl", L.frIf, "<code>isEmpty</code> devolvió 1.", { v, pila: pl, etiqueta: "err" });
        emit("impl", L.frErr, "Mensaje de error.", { v, pila: pl, sal: "Error: la cola esta vacia\n", etiqueta: "err" });
        emit("impl", L.frRetErr, "<code>return -1;</code>", { v, pila: pl, etiqueta: "err" });
        return -1;
      }
      emit("impl", L.frIf, "<code>isEmpty</code> devolvió 0.", { lv: 1, v, pila: pl });
      const x = S.dato[S.frente];
      emit("impl", L.frRet, "<code>return c-&gt;dato[c-&gt;frente]</code> → <code>dato[" + S.frente + "]</code> = <b>" + x + "</b>. Nada cambia.", { v, pila: pl, marca: { nuevo: S.frente }, etiqueta: "ok" });
      return x;
    }
    function printQueue(base) {
      const pl = pf("printQueue(c = &cola)", base);
      const v = { c: "&cola", k: "?" };
      emit("impl", L.prSig, "Entra <b>printQueue</b>: recorre desde el frente <code>cantidad</code> elementos (¡no desde 0 hasta MAX!).", { v, pila: pl });
      emit("impl", L.prIf, "Pregunta <code>isEmpty(c)</code>.", { lv: 1, v, pila: pl });
      const vacia = isEmpty(pl);
      if (vacia) {
        emit("impl", L.prIf, "<code>isEmpty</code> devolvió 1.", { v, pila: pl });
        emit("impl", L.prVacia, "Imprime que está vacía.", { v, pila: pl, sal: "La cola esta vacia\n" });
        emit("impl", L.prRetV, "<code>return;</code>", { v, pila: pl });
        return;
      }
      emit("impl", L.prIf, "<code>isEmpty</code> devolvió 0.", { lv: 1, v, pila: pl });
      emit("impl", L.prHead, "Encabezado.", { lv: 1, v, pila: pl, sal: "Elementos de la cola (frente -> final): " });
      for (let k = 0; k < S.cantidad; k++) {
        v.k = k;
        const idx = (S.frente + k) % MAX;
        emit("impl", L.prFor, (k === 0 ? "<code>k = 0</code>. " : "<code>k++</code> → <code>k = " + k + "</code>. ") + "Condición <code>k &lt; cantidad</code> → " + k + " &lt; " + S.cantidad + " <b>verdadera</b>.", { lv: 1, v, pila: pl, marca: { nuevo: idx } });
        emit("impl", L.prItem, "<code>dato[(frente + k) % MAX]</code> = <code>dato[(" + S.frente + " + " + k + ") % " + MAX + "]</code> = <code>dato[" + idx + "]</code> = <b>" + S.dato[idx] + "</b>.", { v, pila: pl, marca: { nuevo: idx }, sal: S.dato[idx] + "  " });
      }
      v.k = S.cantidad;
      emit("impl", L.prFor, "<code>k++</code> → <code>k = " + S.cantidad + "</code>; <code>k &lt; cantidad</code> es <b>falsa</b>.", { lv: 1, v, pila: pl });
      emit("impl", L.prNl, "Salto de línea.", { lv: 1, v, pila: pl, sal: "\n" });
    }

    M.guion = function () {
      emit("main", L.mCola, "<code>struct Cola cola;</code> → la cola completa vive en el stack de <code>main</code>: <code>dato[5]</code>, <code>frente</code>, <code>final</code> y <code>cantidad</code>. Todo es basura todavía.", {});
      emit("main", L.mInit, "<code>init(&amp;cola)</code>: se pasa la dirección para que <code>init</code> pueda modificarla.", {});
      init(PM);
      [10, 20, 30].forEach((n) => {
        emit("main", Lm("enqueue(&cola," + n + ");"), "<code>enqueue(&amp;cola, " + n + ")</code>.", {});
        enqueue(n, PM);
      });
      emit("main", Lm("printQueue(&cola);", 1), "<code>printQueue(&amp;cola)</code>.", {});
      printQueue(PM);
      emit("main", L.mAt, "Se evalúa <code>dequeue(&amp;cola)</code> para el <code>printf</code>.", { lv: 1 });
      const x = dequeue(PM);
      emit("main", L.mAt, "<code>dequeue</code> regresó <b>" + x + "</b> y <code>printf</code> lo muestra.", { sal: "Atendido: " + x + "\n" });
      [40, 50, 60].forEach((n) => {
        emit("main", Lm("enqueue(&cola," + n + ");"), "<code>enqueue(&amp;cola, " + n + ")</code>." + (n === 60 ? " Este es el que va a dar la vuelta." : ""), {});
        enqueue(n, PM);
      });
      emit("main", Lm("printQueue(&cola);", 2), "<code>printQueue(&amp;cola)</code>: fíjate cómo imprime en orden aunque los datos estén “revueltos” en el arreglo.", {});
      printQueue(PM);
      emit("main", Lm("enqueue(&cola,70);"), "<code>enqueue(&amp;cola, 70)</code> con la cola <b>llena</b>.", {});
      enqueue(70, PM);
      emit("main", L.mFrente, "Se evalúa <code>front(&amp;cola)</code> para el <code>printf</code>.", { lv: 1 });
      const y = front(PM);
      emit("main", L.mFrente, "<code>front</code> regresó <b>" + y + "</b>.", { sal: "Frente: " + y + "\n" });
      emit("main", L.mRet, "Fin del programa.", { etiqueta: "ok" });
    };
    M.lab = function (op, arg) {
      const ini = T.pasos.length;
      const base = PM;
      let txt;
      if (op === "enqueue") { txt = "Tú escribiste: <code>enqueue(&amp;cola, " + arg + ");</code> — "; enqueue(arg, base); }
      else if (op === "dequeue") { txt = "Tú escribiste: <code>dequeue(&amp;cola);</code> — "; dequeue(base); }
      else if (op === "front") { txt = "Tú escribiste: <code>front(&amp;cola);</code> — "; front(base); }
      else if (op === "print") { txt = "Tú escribiste: <code>printQueue(&amp;cola);</code> — "; printQueue(base); }
      if (T.pasos[ini]) T.pasos[ini].nota = txt + T.pasos[ini].nota;
      return T.pasos.slice(ini);
    };
    M.inicioLab = function () {
      S.frente = 0;
      S.final = -1;
      S.cantidad = 0;
      return [emit("main", L.mInit, "Laboratorio listo: <code>init(&amp;cola)</code> ya se ejecutó. La cola tiene capacidad para <b>" + MAX + "</b> elementos. Prueba a llenarla y a sacar algunos para ver cómo <b>da la vuelta</b>.", {})];
    };
    M.estado = () => ({ dato: S.dato.slice(), frente: S.frente, final: S.final, cantidad: S.cantidad, max: MAX });
    M.llena = () => S.cantidad === MAX;
    M.vacia = () => S.cantidad === 0;
    return M;
  };

  /* =======================================================
     COLA DINAMICA (nodos con frente y final)
     ======================================================= */
  E.est.colaDinamica = function (A) {
    const Li = E.anclas(A.impl, "colaDinamica");
    const Lm = E.anclas(A.main, "colaDinamica");
    const T = E.nuevoTrazo();
    const mem = E.mem();
    const M = { T: T, pasos: T.pasos, salImpl: "", mem: mem };
    const COLA_A = E.dirStack(0, 0);
    const main = {
      fn: "main()",
      vars: [
        {
          n: "cola",
          t: "struct Cola",
          a: COLA_A,
          campos: [
            { n: "frente", t: "struct Nodo *", a: COLA_A, val: V.unk() },
            { n: "final", t: "struct Nodo *", a: E.dirStack(0, 1), val: V.unk() },
          ],
        },
      ],
    };
    const cola = main.vars[0];
    const campo = (n) => cola.campos.find((c) => c.n === n);
    const FR = campo("frente");
    const FI = campo("final");
    let extra = [];
    const frames = () => [main].concat(extra);
    const L = {
      initSig: Li("void init(struct Cola *c){"),
      initF: Li("c->frente=NULL;"),
      initL: Li("c->final=NULL;", 1),
      emptySig: Li("int isEmpty(struct Cola *c){"),
      emptyRet: Li("return c->frente==NULL;"),
      enqSig: Li("void enqueue(struct Cola *c, int valor){"),
      malloc: Li("struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));"),
      nulo: Li("if(nuevo==NULL){"),
      dato: Li("nuevo->dato=valor;"),
      sigNull: Li("nuevo->siguiente=NULL;"),
      enqIf: Li("if(isEmpty(c)){", 1),
      frNuevo: Li("c->frente=nuevo;"),
      finSig: Li("c->final->siguiente=nuevo;"),
      finNuevo: Li("c->final=nuevo;"),
      enqFin: Li.fin("void enqueue(struct Cola *c, int valor){"),
      deqSig: Li("int dequeue(struct Cola *c){"),
      deqIf: Li("if(isEmpty(c)){", 2),
      deqErr: Li("Error: la cola esta vacia", 1),
      deqRetErr: Li("return -1;", 1),
      deqTemp: Li("struct Nodo *temp=c->frente;"),
      deqValor: Li("int valor=temp->dato;"),
      deqFrente: Li("c->frente=temp->siguiente;"),
      deqIfNull: Li("if(c->frente==NULL){"),
      deqFinNull: Li("c->final=NULL;", 2),
      deqFree: Li("free(temp);", 1),
      deqRet: Li("return valor;"),
      deqFin: Li.fin("int dequeue(struct Cola *c){"),
      frSig: Li("int front(struct Cola *c){"),
      frIf: Li("if(isEmpty(c)){", 3),
      frErr: Li("Error: la cola esta vacia", 2),
      frRetErr: Li("return -1;", 2),
      frRet: Li("return c->frente->dato;"),
      desSig: Li("void destroy(struct Cola *c){"),
      desTemp: Li("struct Nodo *temp;"),
      desWhile: Li("while(c->frente!=NULL){"),
      desA: Li("temp=c->frente;", 2),
      desB: Li("c->frente=c->frente->siguiente;"),
      desFree: Li("free(temp);", 2),
      desFinal: Li("c->final=NULL;", 3),
      desFin: Li.fin("void destroy(struct Cola *c){"),
      prSig: Li("void printQueue(struct Cola *c){"),
      prIf: Li("if(isEmpty(c)){", 4),
      prVacia: Li("La cola esta vacia"),
      prRetV: Li("return;", 2),
      prHead: Li("Elementos de la cola"),
      prActual: Li("struct Nodo *actual=c->frente;"),
      prWhile: Li("while(actual!=NULL){"),
      prItem: Li("printf(\"%d  \",actual->dato);"),
      prAvanza: Li("actual=actual->siguiente;"),
      prNl: Li("printf(\"\\n\");"),
      mCola: Lm("struct Cola cola;"),
      mInit: Lm("init(&cola);"),
      mAt: Lm("printf(\"Atendido: %d\\n\",dequeue(&cola));"),
      mFrente: Lm("printf(\"Frente: %d\\n\",front(&cola));"),
      mDestroy: Lm("destroy(&cola);"),
      mRet: Lm("return 0;"),
    };
    const lEnq = (n) => Lm("enqueue(&cola," + n + ");");
    function emit(f, l, nota, o) {
      o = o || {};
      if (o.sal && f === "impl") M.salImpl += o.sal;
      return T.paso({
        f: f,
        l: l,
        nota: nota,
        lv: o.lv || 0,
        viz: { frames: JSON.parse(JSON.stringify(frames())), heap: mem.viz(o.nuevo), foco: o.foco || [] },
        sal: o.sal,
        etiqueta: o.etiqueta,
      });
    }
    const valTxt = (v) => (v.k === "null" ? "NULL" : v.k === "ptr" ? v.to : "?");
    const copia = (x) => JSON.parse(JSON.stringify(x));
    const abrir = (fn, vars) => {
      const nivel = extra.length + 1;
      const f = { fn: fn, vars: vars.map((v, i) => Object.assign({ a: E.dirStack(nivel, i) }, v)) };
      extra.push(f);
      return f;
    };
    const cerrar = () => extra.pop();
    const getV = (f, n) => f.vars.find((x) => x.n === n);
    const ptrCola = () => V.ptr(COLA_A);

    function init() {
      abrir("init(c)", [{ n: "c", t: "struct Cola *", val: ptrCola() }]);
      emit("impl", L.initSig, "Entra <b>init</b>. <code>c</code> guarda " + COLA_A + ": la dirección de la <code>cola</code> de main. Aquí <b>no</b> hace falta doble apuntador: la cola es un <code>struct</code> que <b>contiene</b> a <code>frente</code> y <code>final</code>, y con <code>c-&gt;</code> llegamos a ambos.", { foco: ["init.c", "main.cola"] });
      FR.val = V.nul();
      emit("impl", L.initF, "<code>c-&gt;frente = NULL</code> → no hay nadie al frente.", { foco: ["main.cola.frente"] });
      FI.val = V.nul();
      cerrar();
      emit("impl", L.initL, "<code>c-&gt;final = NULL</code> → ni al final. Cola vacía: los dos apuntadores valen NULL.", { foco: ["main.cola.final"], etiqueta: "ok" });
    }
    function isEmpty() {
      abrir("isEmpty(c)", [{ n: "c", t: "struct Cola *", val: ptrCola() }]);
      emit("impl", L.emptySig, "Entra <b>isEmpty</b>.", { lv: 1, foco: ["isEmpty.c", "main.cola"] });
      const r = FR.val.k === "null" ? 1 : 0;
      emit("impl", L.emptyRet, "<code>return c-&gt;frente == NULL</code> → " + valTxt(FR.val) + " == NULL → <b>" + (r ? "verdadero (1)" : "falso (0)") + "</b>. La cola está vacía cuando no hay nodo al frente.", { lv: 1, foco: ["main.cola.frente"] });
      cerrar();
      return r;
    }
    function enqueue(valor, ll) {
      mem.limpiar();
      if (ll) emit("main", ll, "<code>main</code> llama a <code>enqueue(&amp;cola, " + valor + ")</code>.", { foco: ["main.cola"] });
      const f = abrir("enqueue(c, valor)", [
        { n: "c", t: "struct Cola *", val: ptrCola() },
        { n: "valor", t: "int", val: V.int(valor) },
        { n: "nuevo", t: "struct Nodo *", val: V.unk() },
      ]);
      emit("impl", L.enqSig, "Entra <b>enqueue</b>: va a agregar el <b>" + valor + "</b> al <b>final</b> de la cola.", { foco: ["enqueue.c", "main.cola"] });
      const a = mem.malloc();
      getV(f, "nuevo").val = V.ptr(a);
      emit("impl", L.malloc, "<code>malloc</code> reserva un nodo nuevo en el heap: <b>" + a + "</b>" + (mem.ultimaReutilizada ? " (reutiliza un bloque liberado antes)" : "") + ".", { foco: ["enqueue.nuevo", a], nuevo: a, etiqueta: "alloc" });
      emit("impl", L.nulo, "<code>nuevo == NULL</code> → falso (hubo memoria).", { lv: 1, foco: ["enqueue.nuevo"] });
      mem.nodo(a).dato = V.int(valor);
      emit("impl", L.dato, "<code>nuevo-&gt;dato = valor</code> → <b>" + valor + "</b>.", { foco: [a] });
      mem.nodo(a).sig = V.nul();
      emit("impl", L.sigNull, "<code>nuevo-&gt;siguiente = NULL</code> → como entrará al <b>final</b>, detrás de él no hay nadie: su <code>siguiente</code> es NULL. (En la pila apuntaba al tope anterior; aquí no.)", { foco: [a], etiqueta: "swap" });
      emit("impl", L.enqIf, "¿la cola está vacía? Se llama a <code>isEmpty(c)</code>.", { lv: 1, foco: ["main.cola.frente"] });
      const vacia = isEmpty();
      if (vacia) {
        emit("impl", L.enqIf, "<code>isEmpty</code> devolvió 1: <b>es el primer nodo</b>. Hay que acomodar <code>frente</code> Y <code>final</code>.", { foco: ["main.cola.frente"] });
        FR.val = V.ptr(a);
        emit("impl", L.frNuevo, "<code>c-&gt;frente = nuevo</code> → el único nodo es también el frente.", { foco: ["main.cola.frente", a], etiqueta: "ok" });
      } else {
        emit("impl", L.enqIf, "<code>isEmpty</code> devolvió 0: ya hay nodos. El nuevo se <b>engancha detrás del último</b>.", { lv: 1, foco: ["main.cola.final"] });
        const ult = FI.val.to;
        mem.nodo(ult).sig = V.ptr(a);
        emit("impl", L.finSig, "<code>c-&gt;final-&gt;siguiente = nuevo</code> → <code>c-&gt;final</code> es el último nodo (" + ult + "); su <code>siguiente</code> pasa de NULL a <b>" + a + "</b>. Así queda enlazado.", { foco: [ult, a, "main.cola.final"], etiqueta: "swap" });
      }
      FI.val = V.ptr(a);
      emit("impl", L.finNuevo, "<code>c-&gt;final = nuevo</code> → <code>final</code> apunta al nodo recién agregado. <code>frente</code> no se mueve (sale primero el más viejo).", { foco: ["main.cola.final", a], etiqueta: "ok" });
      cerrar();
      emit("impl", L.enqFin, "Termina <b>enqueue</b>. El nodo sigue en el heap.", { lv: 1, foco: [a] });
    }
    function dequeue(ll) {
      mem.limpiar();
      if (ll) emit("main", ll, "<code>main</code> llama a <code>dequeue(&amp;cola)</code>.", { foco: ["main.cola"] });
      const f = abrir("dequeue(c)", [
        { n: "c", t: "struct Cola *", val: ptrCola() },
        { n: "temp", t: "struct Nodo *", val: V.unk() },
        { n: "valor", t: "int", val: V.unk() },
      ]);
      emit("impl", L.deqSig, "Entra <b>dequeue</b>: atiende al nodo del <b>frente</b>.", { foco: ["dequeue.c", "main.cola"] });
      emit("impl", L.deqIf, "Pregunta <code>isEmpty(c)</code>.", { lv: 1 });
      const vacia = isEmpty();
      if (vacia) {
        emit("impl", L.deqIf, "<code>isEmpty</code> devolvió 1.", { etiqueta: "err" });
        emit("impl", L.deqErr, "Mensaje de error.", { sal: "Error: la cola esta vacia\n", etiqueta: "err" });
        emit("impl", L.deqRetErr, "<code>return -1;</code>", { etiqueta: "err" });
        cerrar();
        emit("impl", L.deqFin, "Termina <b>dequeue</b>.", { lv: 1 });
        return -1;
      }
      emit("impl", L.deqIf, "<code>isEmpty</code> devolvió 0.", { lv: 1 });
      const a = FR.val.to;
      getV(f, "temp").val = V.ptr(a);
      emit("impl", L.deqTemp, "<code>temp = c-&gt;frente</code> → <code>temp</code> apunta al primer nodo (" + a + ") para poder liberarlo después.", { foco: ["dequeue.temp", a, "main.cola.frente"] });
      const nd = mem.nodo(a);
      getV(f, "valor").val = copia(nd.dato);
      emit("impl", L.deqValor, "<code>valor = temp-&gt;dato</code> → <b>" + nd.dato.v + "</b>.", { foco: ["dequeue.valor", a] });
      FR.val = copia(nd.sig);
      emit("impl", L.deqFrente, "<code>c-&gt;frente = temp-&gt;siguiente</code> → el frente avanza al siguiente nodo (" + valTxt(nd.sig) + ").", { foco: ["main.cola.frente"], etiqueta: "swap" });
      const quedoVacia = FR.val.k === "null";
      emit("impl", L.deqIfNull, "<code>c-&gt;frente == NULL</code> → <b>" + (quedoVacia ? "SÍ" : "NO") + "</b>. " + (quedoVacia ? "Se sacó al único nodo: la cola quedó vacía y <code>final</code> aún apunta al nodo que vamos a liberar." : "Aún quedan nodos: <code>final</code> sigue siendo válido."), { lv: quedoVacia ? 0 : 1, foco: ["main.cola.frente"], etiqueta: "cmp" });
      if (quedoVacia) {
        FI.val = V.nul();
        emit("impl", L.deqFinNull, "<code>c-&gt;final = NULL</code> → ¡importante! Si no, <code>final</code> quedaría apuntando a memoria liberada (puntero colgante) y el siguiente <code>enqueue</code> fallaría.", { foco: ["main.cola.final"], etiqueta: "ok" });
      }
      mem.free(a);
      emit("impl", L.deqFree, "<code>free(temp)</code> libera el nodo " + a + ".", { foco: [a, "dequeue.temp"], etiqueta: "free" });
      mem.limpiar();
      const x = nd.dato.v;
      emit("impl", L.deqRet, "<code>return valor</code> → <b>" + x + "</b>.", { foco: ["dequeue.valor"], etiqueta: "ok" });
      cerrar();
      emit("impl", L.deqFin, "Termina <b>dequeue</b>.", { lv: 1 });
      return x;
    }
    function front(ll) {
      mem.limpiar();
      if (ll) emit("main", ll, "<code>main</code> llama a <code>front(&amp;cola)</code>.", { foco: ["main.cola"] });
      abrir("front(c)", [{ n: "c", t: "struct Cola *", val: ptrCola() }]);
      emit("impl", L.frSig, "Entra <b>front</b>.", { foco: ["front.c"] });
      emit("impl", L.frIf, "Pregunta <code>isEmpty(c)</code>.", { lv: 1 });
      const vacia = isEmpty();
      if (vacia) {
        emit("impl", L.frIf, "<code>isEmpty</code> devolvió 1.", { etiqueta: "err" });
        emit("impl", L.frErr, "Mensaje de error.", { sal: "Error: la cola esta vacia\n", etiqueta: "err" });
        emit("impl", L.frRetErr, "<code>return -1;</code>", { etiqueta: "err" });
        cerrar();
        return -1;
      }
      emit("impl", L.frIf, "<code>isEmpty</code> devolvió 0.", { lv: 1 });
      const a = FR.val.to;
      const x = mem.nodo(a).dato.v;
      emit("impl", L.frRet, "<code>return c-&gt;frente-&gt;dato</code> → el nodo " + a + " tiene <b>" + x + "</b>.", { foco: [a, "main.cola.frente"], etiqueta: "ok" });
      cerrar();
      return x;
    }
    function destroy(ll) {
      mem.limpiar();
      if (ll) emit("main", ll, "<code>main</code> llama a <code>destroy(&amp;cola)</code> para liberar todos los nodos.", { foco: ["main.cola"] });
      const f = abrir("destroy(c)", [
        { n: "c", t: "struct Cola *", val: ptrCola() },
        { n: "temp", t: "struct Nodo *", val: V.unk() },
      ]);
      emit("impl", L.desSig, "Entra <b>destroy</b>.", { foco: ["destroy.c"] });
      emit("impl", L.desTemp, "<code>temp</code> es una variable local (basura).", { lv: 1 });
      while (FR.val.k !== "null") {
        emit("impl", L.desWhile, "<code>c-&gt;frente != NULL</code> → todavía hay nodos: <b>verdadero</b>.", { lv: 1, foco: ["main.cola.frente"] });
        const a = FR.val.to;
        getV(f, "temp").val = V.ptr(a);
        emit("impl", L.desA, "<code>temp = c-&gt;frente</code> → apunta al nodo " + a + ".", { foco: ["destroy.temp", a] });
        const nd = mem.nodo(a);
        FR.val = copia(nd.sig);
        emit("impl", L.desB, "<code>c-&gt;frente = c-&gt;frente-&gt;siguiente</code> → el frente avanza (" + valTxt(nd.sig) + ").", { foco: ["main.cola.frente"], etiqueta: "swap" });
        mem.free(a);
        emit("impl", L.desFree, "<code>free(temp)</code> libera " + a + ".", { foco: [a], etiqueta: "free" });
        mem.limpiar();
      }
      emit("impl", L.desWhile, "<code>c-&gt;frente != NULL</code> → <b>falso</b>: no quedan nodos.", { lv: 1, foco: ["main.cola.frente"] });
      FI.val = V.nul();
      emit("impl", L.desFinal, "<code>c-&gt;final = NULL</code> → también se limpia <code>final</code> (apuntaba al último nodo, ya liberado).", { foco: ["main.cola.final"], etiqueta: "ok" });
      cerrar();
      emit("impl", L.desFin, "Termina <b>destroy</b>: heap limpio.", { lv: 1, etiqueta: "ok" });
    }
    function printQueue(ll) {
      mem.limpiar();
      if (ll) emit("main", ll, "<code>main</code> llama a <code>printQueue(&amp;cola)</code>.", { foco: ["main.cola"] });
      const f = abrir("printQueue(c)", [
        { n: "c", t: "struct Cola *", val: ptrCola() },
        { n: "actual", t: "struct Nodo *", val: V.unk() },
      ]);
      emit("impl", L.prSig, "Entra <b>printQueue</b>.", { foco: ["printQueue.c"] });
      emit("impl", L.prIf, "Pregunta <code>isEmpty(c)</code>.", { lv: 1 });
      const vacia = isEmpty();
      if (vacia) {
        emit("impl", L.prIf, "<code>isEmpty</code> devolvió 1.", {});
        emit("impl", L.prVacia, "Imprime que está vacía.", { sal: "La cola esta vacia\n" });
        emit("impl", L.prRetV, "<code>return;</code>", {});
        cerrar();
        return;
      }
      emit("impl", L.prIf, "<code>isEmpty</code> devolvió 0.", { lv: 1 });
      emit("impl", L.prHead, "Encabezado.", { lv: 1, sal: "Elementos de la cola (frente -> final): " });
      getV(f, "actual").val = copia(FR.val);
      emit("impl", L.prActual, "<code>actual = c-&gt;frente</code> → empezamos en el frente. (Se recorre con <code>actual</code> para no perder <code>frente</code>.)", { foco: ["printQueue.actual", FR.val.to] });
      let cur = getV(f, "actual").val;
      while (cur.k !== "null") {
        const nd = mem.nodo(cur.to);
        emit("impl", L.prWhile, "<code>actual != NULL</code> → verdadero.", { lv: 1, foco: ["printQueue.actual", cur.to] });
        emit("impl", L.prItem, "<code>printf</code> → imprime <b>" + nd.dato.v + "</b>.", { foco: [cur.to], sal: nd.dato.v + "  " });
        getV(f, "actual").val = copia(nd.sig);
        cur = getV(f, "actual").val;
        emit("impl", L.prAvanza, "<code>actual = actual-&gt;siguiente</code> → " + valTxt(cur) + ".", { foco: ["printQueue.actual"] });
      }
      emit("impl", L.prWhile, "<code>actual != NULL</code> → falso: se recorrió toda la cola.", { lv: 1, foco: ["printQueue.actual"] });
      emit("impl", L.prNl, "Salto de línea.", { lv: 1, sal: "\n" });
      cerrar();
    }

    M.guion = function () {
      emit("main", L.mCola, "<code>struct Cola cola;</code> → en el stack de <code>main</code> nace la cola: un <code>struct</code> con <b>dos apuntadores</b>, <code>frente</code> y <code>final</code> (basura por ahora). Los nodos irán al heap.", {});
      emit("main", L.mInit, "<code>init(&amp;cola)</code>.", { foco: ["main.cola"] });
      init();
      [10, 20, 30].forEach((n) => enqueue(n, lEnq(n)));
      printQueue(Lm("printQueue(&cola);", 1));
      emit("main", L.mAt, "Se evalúa <code>dequeue(&amp;cola)</code> para el <code>printf</code>.", { lv: 1, foco: ["main.cola"] });
      const x = dequeue(null);
      emit("main", L.mAt, "<code>dequeue</code> regresó <b>" + x + "</b>.", { sal: "Atendido: " + x + "\n" });
      enqueue(40, lEnq(40));
      printQueue(Lm("printQueue(&cola);", 2));
      emit("main", L.mFrente, "Se evalúa <code>front(&amp;cola)</code>.", { lv: 1, foco: ["main.cola"] });
      const y = front(null);
      emit("main", L.mFrente, "<code>front</code> regresó <b>" + y + "</b>.", { sal: "Frente: " + y + "\n" });
      destroy(L.mDestroy);
      printQueue(Lm("printQueue(&cola);", 3));
      emit("main", L.mRet, "Fin del programa. Cada <code>malloc</code> tuvo su <code>free</code>.", { etiqueta: "ok" });
    };
    M.inicioLab = function () {
      FR.val = V.nul();
      FI.val = V.nul();
      return [emit("main", L.mInit, "Laboratorio listo: <code>init(&amp;cola)</code> ya se ejecutó (<code>frente</code> y <code>final</code> en NULL). Agrega y atiende elementos y mira cómo se mueven los dos apuntadores.", { foco: ["main.cola"] })];
    };
    M.lab = function (op, arg) {
      const ini = T.pasos.length;
      let txt;
      if (op === "enqueue") { txt = "Tú escribiste: <code>enqueue(&amp;cola, " + arg + ");</code> — "; enqueue(arg, null); }
      else if (op === "dequeue") { txt = "Tú escribiste: <code>dequeue(&amp;cola);</code> — "; dequeue(null); }
      else if (op === "front") { txt = "Tú escribiste: <code>front(&amp;cola);</code> — "; front(null); }
      else if (op === "print") { txt = "Tú escribiste: <code>printQueue(&amp;cola);</code> — "; printQueue(null); }
      else if (op === "destroy") { txt = "Tú escribiste: <code>destroy(&amp;cola);</code> — "; destroy(null); }
      if (T.pasos[ini]) T.pasos[ini].nota = txt + T.pasos[ini].nota;
      return T.pasos.slice(ini);
    };
    M.nodos = () => mem.cuantos();
    M.vacia = () => FR.val.k === "null";
    return M;
  };
})();
