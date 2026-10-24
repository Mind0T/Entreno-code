/* ============================================================
   trazas-pila-estatica.js
   Reproduce tu pila estatica (pila_est_int_*) y la aplicacion de
   parentesis (TADPilaEstatica + practica.c).
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  E.est = E.est || {};

  /* ---------------------------------------------------------
     PILA ESTATICA (pila_est_int): struct Pila { int dato[7]; int tope; }
     --------------------------------------------------------- */
  E.est.pilaEstatica = function (A) {
    const Li = E.anclas(A.impl, "pilaEstatica");
    const Lm = E.anclas(A.main, "pilaEstatica");
    const MAX = 7;
    const S = { dato: new Array(MAX).fill(null), tope: null }; // tope null = basura (aun sin init)
    const T = E.nuevoTrazo();
    const M = { T: T, salImpl: "", pasos: T.pasos };
    let entrada = "?";
    let valorMain = "?";
    const PM = ["main()"];

    const L = {
      initSig: Li("void init(struct Pila *p){"),
      initBody: Li("p->tope=-1;"),
      fullSig: Li("int isFull(struct Pila *p){"),
      fullRet: Li("return p->tope==MAX-1;"),
      emptySig: Li("int isEmpty(struct Pila *p){"),
      emptyRet: Li("return p->tope==-1;"),
      pushSig: Li("void push(struct Pila *p,int valor){"),
      pushIf: Li("if(isFull(p)){"),
      pushErr: Li("LA PILA ESTA LLENA"),
      pushRet: Li("return;", 1),
      pushBody: Li("p->dato[++(p->tope)]=valor;"),
      pushOk: Li("Se agrego %d a la pila"),
      pushFin: Li.fin("void push(struct Pila *p,int valor){"),
      popSig: Li("int pop(struct Pila *p){"),
      popIf: Li("if(isEmpty(p)){", 1),
      popErr: Li("LA PILA ESTA VACIA", 1),
      popRetErr: Li("return 0;", 1),
      popBody: Li("return p->dato[(p->tope)--];"),
      peekSig: Li("int peek(struct Pila *p){"),
      peekIf: Li("if(isEmpty(p)){", 2),
      peekErr: Li("LA PILA ESTA VACIA", 2),
      peekRetErr: Li("return 0;", 2),
      peekBody: Li("return p->dato[p->tope];"),
      prSig: Li("void printStack(struct Pila *p){"),
      prIf: Li("if(isEmpty(p)){", 3),
      prErr: Li("LA PILA ESTA VACIA", 3),
      prRetErr: Li("return;", 2),
      prHead: Li("Elementos en la fila"),
      prFor: Li("for(int i=p->tope;i>=0;i--){"),
      prItem: Li("printf(\"%d \",p->dato[i]);"),
      prFin: Li.fin("void printStack(struct Pila *p){"),
      // main
      mStruct: Lm("struct Pila pila;"),
      mInit: Lm("init(&pila);"),
      mDecl: Lm("int entrada,valor;"),
      mDo: Lm("do{"),
      mMenu: Lm("QUE DESEA HACER"),
      mScan: Lm("scanf(\"%d\",&entrada);"),
      mSwitch: Lm("switch(entrada){"),
      mCase1: Lm("case 1:"),
      mPrint: Lm("printStack(&pila);"),
      mCase2: Lm("case 2:"),
      mPedir: Lm("Ingrese el valor a apilar"),
      mScanV: Lm("scanf(\"%d\",&valor);"),
      mPush: Lm("push(&pila,valor);"),
      mCase3: Lm("case 3:"),
      mIf3: Lm("if(!isEmpty(&pila)){", 1),
      mPopOk: Lm("printf(\"\\nPOP:\\n%d\\n\",pop(&pila));"),
      mPopErr: Lm("pop(&pila);"),
      mCase4: Lm("case 4:"),
      mIf4: Lm("if(!isEmpty(&pila)){", 2),
      mPeekOk: Lm("printf(\"\\nPEEK:\\n%d\\n\",peek(&pila));"),
      mPeekErr: Lm("peek(&pila);"),
      mCase5: Lm("case 5:"),
      mFinMsg: Lm("FIN DEL PROGRAMA"),
      mDefault: Lm("default:"),
      mDefaultMsg: Lm("Entrada no valida"),
      mWhile: Lm("} while(entrada!=5);"),
      mRet: Lm("return 0;"),
    };

    const vizS = (marca) => ({ dato: S.dato.slice(), tope: S.tope, max: MAX, fmt: "int", marca: marca || null });
    const mainV = () => ({ entrada: entrada, valor: valorMain, "pila.tope": S.tope === null ? "?" : S.tope });
    function emit(f, l, nota, o) {
      o = o || {};
      if (o.sal && f === "impl") M.salImpl += o.sal;
      return T.paso({
        f: f,
        l: l,
        nota: nota,
        lv: o.lv || 0,
        viz: vizS(o.marca),
        v: o.v || (f === "main" ? mainV() : null),
        pila: o.pila || PM,
        sal: o.sal,
        ent: o.ent,
        etiqueta: o.etiqueta,
      });
    }
    const pf = (nombre, base) => [nombre].concat(base);

    /* --- funciones de tu implementacion --- */
    function init(base, desdeMain) {
      const pl = pf("init(p = &pila)", base);
      const v = { p: "&pila" };
      emit("impl", L.initSig, "Entra <b>init</b>. Recibe <code>p</code>, la <b>dirección</b> de la <code>pila</code> de main (no una copia).", { v, pila: pl });
      S.tope = -1;
      emit("impl", L.initBody, "<code>p-&gt;tope = -1</code> → la pila queda <b>vacía</b>. El valor <b>-1</b> significa “no hay ningún elemento”: el primer <code>push</code> usará la posición 0. El arreglo <code>dato</code> no se toca (sigue con basura).", { v, pila: pl, etiqueta: "ok" });
    }
    function isFull(base) {
      const pl = pf("isFull(p = &pila)", base);
      const v = { p: "&pila" };
      emit("impl", L.fullSig, "Entra <b>isFull</b>: dice si la pila ya no tiene espacio.", { lv: 1, v, pila: pl });
      const r = S.tope === MAX - 1 ? 1 : 0;
      emit("impl", L.fullRet, "<code>return p-&gt;tope == MAX-1</code> → " + S.tope + " == " + (MAX - 1) + " → <b>" + (r ? "verdadero (1)" : "falso (0)") + "</b>.", { lv: 1, v, pila: pl });
      return r;
    }
    function isEmpty(base) {
      const pl = pf("isEmpty(p = &pila)", base);
      const v = { p: "&pila" };
      emit("impl", L.emptySig, "Entra <b>isEmpty</b>: dice si no hay elementos.", { lv: 1, v, pila: pl });
      const r = S.tope === -1 ? 1 : 0;
      emit("impl", L.emptyRet, "<code>return p-&gt;tope == -1</code> → " + S.tope + " == -1 → <b>" + (r ? "verdadero (1)" : "falso (0)") + "</b>.", { lv: 1, v, pila: pl });
      return r;
    }
    function push(valor, base) {
      const pl = pf("push(p = &pila, valor = " + valor + ")", base);
      const v = { p: "&pila", valor: valor };
      emit("impl", L.pushSig, "Entra <b>push</b>: quiere apilar el <b>" + valor + "</b>.", { v, pila: pl });
      emit("impl", L.pushIf, "Primero hay que saber si cabe: se llama a <code>isFull(p)</code>.", { lv: 1, v, pila: pl });
      const lleno = isFull(pl);
      if (lleno) {
        emit("impl", L.pushIf, "<code>isFull</code> devolvió 1: la pila está <b>llena</b> (tope = " + (MAX - 1) + "). Si siguiéramos, escribiríamos fuera del arreglo (<i>desbordamiento / overflow</i>).", { v, pila: pl, etiqueta: "err" });
        emit("impl", L.pushErr, "Se avisa al usuario.", { v, pila: pl, sal: "\nLo siento \nLA PILA ESTA LLENA \n", etiqueta: "err" });
        emit("impl", L.pushRet, "<code>return;</code> sale de <code>push</code> sin guardar nada. La pila queda igual.", { v, pila: pl, etiqueta: "err" });
        return;
      }
      emit("impl", L.pushIf, "<code>isFull</code> devolvió 0: hay espacio, así que el <code>if</code> no se cumple y seguimos.", { lv: 1, v, pila: pl });
      S.tope++;
      S.dato[S.tope] = valor;
      emit("impl", L.pushBody, "<code>p-&gt;dato[++(p-&gt;tope)] = valor</code>: el <code>++</code> va <b>antes</b>, así que primero <code>tope</code> sube a <b>" + S.tope + "</b> y luego se guarda el <b>" + valor + "</b> en <code>dato[" + S.tope + "]</code>.", { v, pila: pl, marca: { nuevo: S.tope }, etiqueta: "swap" });
      emit("impl", L.pushOk, "Se imprime la confirmación.", { lv: 1, v, pila: pl, sal: "\nSe agrego " + valor + " a la pila\n" });
      emit("impl", L.pushFin, "Termina <b>push</b>. El elemento quedó arriba de la pila.", { lv: 1, v, pila: pl });
    }
    function pop(base) {
      const pl = pf("pop(p = &pila)", base);
      const v = { p: "&pila" };
      emit("impl", L.popSig, "Entra <b>pop</b>: saca el elemento de arriba.", { v, pila: pl });
      emit("impl", L.popIf, "Se revisa con <code>isEmpty(p)</code> que haya algo que sacar.", { lv: 1, v, pila: pl });
      const vacia = isEmpty(pl);
      if (vacia) {
        emit("impl", L.popIf, "<code>isEmpty</code> devolvió 1: la pila está <b>vacía</b>. Sacar de aquí leería <code>dato[-1]</code>, fuera del arreglo (<i>subdesbordamiento / underflow</i>).", { v, pila: pl, etiqueta: "err" });
        emit("impl", L.popErr, "Mensaje de error.", { v, pila: pl, sal: "\nLo siento \nLA PILA ESTA VACIA \n", etiqueta: "err" });
        emit("impl", L.popRetErr, "<code>return 0;</code> devuelve un 0 “de relleno” (ojo: un 0 también podría ser un dato válido; por eso <code>main</code> revisa <code>isEmpty</code> antes de usar el resultado).", { v, pila: pl, etiqueta: "err" });
        return 0;
      }
      emit("impl", L.popIf, "<code>isEmpty</code> devolvió 0: sí hay elementos, seguimos.", { lv: 1, v, pila: pl });
      const x = S.dato[S.tope];
      const antes = S.tope;
      S.tope--;
      emit("impl", L.popBody, "<code>return p-&gt;dato[(p-&gt;tope)--]</code>: el <code>--</code> va <b>después</b>: se lee <code>dato[" + antes + "]</code> = <b>" + x + "</b> y luego <code>tope</code> baja a <b>" + S.tope + "</b>. Mira: el " + x + " <b>no se borra</b> del arreglo (queda como residuo gris); simplemente <code>tope</code> ya no lo cuenta.", { v, pila: pl, marca: { sacado: antes }, etiqueta: "swap" });
      return x;
    }
    function peek(base) {
      const pl = pf("peek(p = &pila)", base);
      const v = { p: "&pila" };
      emit("impl", L.peekSig, "Entra <b>peek</b>: solo MIRA el elemento de arriba, sin sacarlo.", { v, pila: pl });
      emit("impl", L.peekIf, "Se revisa con <code>isEmpty(p)</code>.", { lv: 1, v, pila: pl });
      const vacia = isEmpty(pl);
      if (vacia) {
        emit("impl", L.peekIf, "<code>isEmpty</code> devolvió 1: no hay nada que mirar.", { v, pila: pl, etiqueta: "err" });
        emit("impl", L.peekErr, "Mensaje de error.", { v, pila: pl, sal: "\nLo siento \nLA PILA ESTA  VACIA\n", etiqueta: "err" });
        emit("impl", L.peekRetErr, "<code>return 0;</code>", { v, pila: pl, etiqueta: "err" });
        return 0;
      }
      emit("impl", L.peekIf, "<code>isEmpty</code> devolvió 0: seguimos.", { lv: 1, v, pila: pl });
      const x = S.dato[S.tope];
      emit("impl", L.peekBody, "<code>return p-&gt;dato[p-&gt;tope]</code> → <code>dato[" + S.tope + "]</code> = <b>" + x + "</b>. <code>tope</code> NO cambia: la pila queda intacta.", { v, pila: pl, marca: { nuevo: S.tope } });
      return x;
    }
    function printStack(base) {
      const pl = pf("printStack(p = &pila)", base);
      const v = { p: "&pila", i: "?" };
      emit("impl", L.prSig, "Entra <b>printStack</b>: recorre la pila de arriba hacia abajo.", { v, pila: pl });
      emit("impl", L.prIf, "Se revisa con <code>isEmpty(p)</code>.", { lv: 1, v, pila: pl });
      const vacia = isEmpty(pl);
      if (vacia) {
        emit("impl", L.prIf, "<code>isEmpty</code> devolvió 1: no hay nada que imprimir.", { v, pila: pl });
        emit("impl", L.prErr, "Mensaje de error.", { v, pila: pl, sal: "\nLo siento \nLA PILA ESTA VACIA\n" });
        emit("impl", L.prRetErr, "<code>return;</code>", { v, pila: pl });
        return;
      }
      emit("impl", L.prIf, "<code>isEmpty</code> devolvió 0: hay elementos, seguimos.", { lv: 1, v, pila: pl });
      emit("impl", L.prHead, "Se imprime el encabezado.", { lv: 1, v, pila: pl, sal: "\nElementos en la fila\n" });
      for (let i = S.tope; i >= 0; i--) {
        v.i = i;
        emit("impl", L.prFor, (i === S.tope ? "<code>i = p-&gt;tope</code> = " + i + ". " : "<code>i--</code> → <code>i = " + i + "</code>. ") + "Condición <code>i &gt;= 0</code> <b>verdadera</b>: se recorre de arriba (tope) hacia abajo (base).", { lv: 1, v, pila: pl, marca: { nuevo: i } });
        emit("impl", L.prItem, "<code>printf(\"%d \", p-&gt;dato[" + i + "])</code> → imprime <b>" + S.dato[i] + "</b>.", { v, pila: pl, marca: { nuevo: i }, sal: S.dato[i] + " " });
      }
      v.i = -1;
      emit("impl", L.prFor, "<code>i--</code> → <code>i = -1</code>. <code>i &gt;= 0</code> es <b>falsa</b>: terminó el recorrido. Nota: el tope se imprime primero (orden LIFO).", { lv: 1, v, pila: pl });
      emit("impl", L.prFin, "Termina <b>printStack</b> (no modificó la pila).", { lv: 1, v, pila: pl });
    }

    /* --- main de tu archivo pila_est_int.c --- */
    M.inicio = function () {
      emit("main", L.mStruct, "<code>struct Pila pila;</code> reserva la pila <b>completa</b> en el stack de <code>main</code>: 7 enteros + <code>tope</code>. Todavía no tiene nada útil: puro basura (<code>?</code>).", {});
      emit("main", L.mInit, "<code>init(&amp;pila)</code>: pasa la <b>dirección</b> de la pila para que <code>init</code> pueda modificarla.", {});
      init(PM);
      emit("main", L.mDecl, "Se declaran <code>entrada</code> y <code>valor</code> (basura por ahora). Empieza el menú.", { lv: 1 });
    };
    /* una vuelta del do-while del menu */
    M.menu = function (opcion, val) {
      entrada = opcion;
      const menuTxt = "\n── menú: 1 imprimir · 2 meter · 3 extraer · 4 ver tope · 5 salir ──\n";
      emit("main", L.mMenu, "Dentro del <code>do { … } while</code> se imprime el menú (aquí lo resumimos en la consola).", { lv: 1, sal: menuTxt });
      emit("main", L.mScan, "<code>scanf</code> espera al usuario... y teclea <b>" + opcion + "</b>.", { ent: opcion + "\n" });
      emit("main", L.mSwitch, "<code>switch(entrada)</code> salta al caso <b>" + opcion + "</b>.", { lv: 1 });
      if (opcion === 1) {
        emit("main", L.mCase1, "<b>Opción 1</b>: imprimir la pila.", { lv: 1 });
        emit("main", L.mPrint, "Llama a <code>printStack(&amp;pila)</code>.", {});
        printStack(PM);
      } else if (opcion === 2) {
        emit("main", L.mCase2, "<b>Opción 2</b>: meter un valor.", { lv: 1 });
        emit("main", L.mPedir, "Se pide el valor.", { lv: 1, sal: "\nIngrese el valor a apilar\n" });
        valorMain = val;
        emit("main", L.mScanV, "El usuario teclea <b>" + val + "</b> y <code>scanf</code> lo guarda en <code>valor</code>.", { ent: val + "\n" });
        emit("main", L.mPush, "Llama a <code>push(&amp;pila, valor)</code> con valor = " + val + ".", {});
        push(val, PM);
      } else if (opcion === 3) {
        emit("main", L.mCase3, "<b>Opción 3</b>: extraer el último elemento.", { lv: 1 });
        const vacia = S.tope === -1;
        emit("main", L.mIf3, "<code>if(!isEmpty(&amp;pila))</code>: antes de sacar, <code>main</code> comprueba que no esté vacía.", { lv: 1 });
        const r = isEmpty(PM);
        if (!r) {
          emit("main", L.mPopOk, "Hay elementos: se ejecuta <code>pop(&amp;pila)</code> dentro del <code>printf</code>.", {});
          const x = pop(PM);
          emit("main", L.mPopOk, "<code>pop</code> regresó <b>" + x + "</b> y <code>printf</code> lo muestra.", { sal: "\nPOP:\n" + x + "\n" });
        } else {
          emit("main", L.mPopErr, "Está vacía: se llama a <code>pop</code> solo para que muestre su mensaje de error.", {});
          pop(PM);
        }
      } else if (opcion === 4) {
        emit("main", L.mCase4, "<b>Opción 4</b>: ver el último elemento.", { lv: 1 });
        emit("main", L.mIf4, "<code>if(!isEmpty(&amp;pila))</code>", { lv: 1 });
        const r = isEmpty(PM);
        if (!r) {
          emit("main", L.mPeekOk, "Hay elementos: se ejecuta <code>peek(&amp;pila)</code> dentro del <code>printf</code>.", {});
          const x = peek(PM);
          emit("main", L.mPeekOk, "<code>peek</code> regresó <b>" + x + "</b> y <code>printf</code> lo muestra. La pila no cambió.", { sal: "\nPEEK:\n" + x + "\n" });
        } else {
          emit("main", L.mPeekErr, "Está vacía: se llama a <code>peek</code> solo para que muestre su error.", {});
          peek(PM);
        }
      } else if (opcion === 5) {
        emit("main", L.mCase5, "<b>Opción 5</b>: salir.", { lv: 1 });
        emit("main", L.mFinMsg, "Se imprime el mensaje de despedida.", { sal: "\nFIN DEL PROGRAMA\n" });
      } else {
        emit("main", L.mDefault, "Ningún caso coincide: se va a <code>default</code>.", { lv: 1 });
        emit("main", L.mDefaultMsg, "Mensaje de error de entrada.", { sal: "\nEntrada no valida\n" });
      }
      emit("main", L.mWhile, opcion === 5 ? "<code>while(entrada != 5)</code> → 5 != 5 es <b>falso</b>: el ciclo termina." : "<code>while(entrada != 5)</code> → " + opcion + " != 5 es <b>verdadero</b>: el menú se repite.", { lv: 1 });
      if (opcion === 5) emit("main", L.mRet, "<code>return 0;</code> Fin de <code>main</code>. (La pila era una variable local: desaparece sola, no hay que liberar nada.)", { etiqueta: "ok" });
    };

    /* --- laboratorio: llamar funciones sueltas --- */
    M.lab = function (op, arg) {
      const inicio = T.pasos.length;
      const base = ["main()"];
      const pre = {
        init: "Tú escribiste: <code>init(&amp;pila);</code> — ",
        push: "Tú escribiste: <code>push(&amp;pila, " + arg + ");</code> — ",
        pop: "Tú escribiste: <code>pop(&amp;pila);</code> — ",
        peek: "Tú escribiste: <code>peek(&amp;pila);</code> — ",
        print: "Tú escribiste: <code>printStack(&amp;pila);</code> — ",
      }[op];
      if (op === "init") init(base);
      else if (op === "push") push(arg, base);
      else if (op === "pop") pop(base);
      else if (op === "peek") peek(base);
      else if (op === "print") printStack(base);
      if (T.pasos[inicio]) T.pasos[inicio].nota = pre + T.pasos[inicio].nota;
      return T.pasos.slice(inicio);
    };
    M.estado = () => ({ dato: S.dato.slice(), tope: S.tope, max: MAX });
    M.llena = () => S.tope === MAX - 1;
    M.vacia = () => S.tope === -1;
    M.stackVisible = S;
    M.ops = { init, push, pop, peek, printStack };
    return M;
  };

  /* ---------------------------------------------------------
     PARENTESIS: TADPilaEstatica (MAX 100) + practica.c
     --------------------------------------------------------- */
  E.est.parentesis = function (txt, A) {
    const Li = E.anclas(A.impl, "parentesis");
    const Lm = E.anclas(A.main, "parentesis");
    const MAX = 100;
    const S = { dato: new Array(MAX).fill(null), tope: null };
    const T = E.nuevoTrazo();
    const chars = txt.split("");
    const longitud = chars.length;
    const PM = ["main()"];
    const L = {
      initSig: Li("void inicializar(struct Pila *p) {"),
      initBody: Li("p->tope = -1;"),
      fullRet: Li("return p->tope == MAX - 1;"),
      emptyRet: Li("return p->tope == -1;"),
      pushSig: Li("void push(struct Pila *p, int valor) {"),
      pushIf: Li("if (isFull(p)) {"),
      pushBody: Li("p->datos[++(p->tope)]=valor;"),
      popSig: Li("int pop(struct Pila *p) {"),
      popIf: Li("if (isEmpty(p)) {", 1),
      popErr: Li("Error: la pila esta vacia", 1),
      popRetErr: Li("return -1;", 1),
      popBody: Li("return p->datos[(p->tope)--];"),
      prSig: Li("void imprimirPila(struct Pila *p) {"),
      prIf: Li("if (isEmpty(p)) {", 3),
      prVacia: Li("La pila esta vacia"),
      prRetV: Li("return;", 2),
      prHead: Li("Elementos en la pila: "),
      prFor: Li("for (int i = p->tope; i >= 0; i--) {"),
      prItem: Li("printf(\"%d \", p->datos[i]);"),
      prNl: Li("printf(\"\\n\");"),
      mStruct: Lm("struct Pila pila;"),
      mInit: Lm("inicializar(&pila);"),
      mArr: Lm("char parentesis[]"),
      mLong: Lm("int longitud=sizeof(parentesis)/sizeof(parentesis[0]);"),
      mFor: Lm("for(int i=0;i<longitud;i++){"),
      mIfA: Lm("if(parentesis[i]=='('){"),
      mPush: Lm("push(&pila, parentesis[i]);"),
      mIfC: Lm("else if(parentesis[i]==')'){"),
      mPop: Lm("pop(&pila);"),
      mPrint: Lm("imprimirPila(&pila);"),
      mRet: Lm("return 0;"),
    };
    const vizS = (marca, i) => ({ dato: S.dato.slice(), tope: S.tope, max: MAX, fmt: "chr", marca: marca || null, entrada: { txt: txt, i: i == null ? -1 : i } });
    let iActual = null;
    let salImpl = "";
    function emit(f, l, nota, o) {
      o = o || {};
      if (o.sal && f === "impl") salImpl += o.sal;
      return T.paso({
        f: f,
        l: l,
        nota: nota,
        lv: o.lv || 0,
        viz: vizS(o.marca, o.i !== undefined ? o.i : iActual),
        v: o.v || (f === "main" ? { longitud: longitud, i: iActual === null ? "?" : iActual, "pila.tope": S.tope === null ? "?" : S.tope } : null),
        pila: o.pila || PM,
        sal: o.sal,
        etiqueta: o.etiqueta,
      });
    }
    const pf = (n) => [n].concat(PM);
    const chrTxt = (c) => "'" + c + "' (código " + c.charCodeAt(0) + ")";

    emit("main", L.mStruct, "Se reserva <code>pila</code> en el stack de <code>main</code>: <code>datos[100]</code> + <code>tope</code>. Aún sin valores útiles.", {});
    emit("main", L.mInit, "<code>inicializar(&amp;pila)</code> → deja <code>tope = -1</code>.", {});
    S.tope = -1;
    emit("impl", L.initBody, "<code>p-&gt;tope = -1</code>: pila vacía. (El arreglo <code>datos</code> no se limpia.)", { pila: pf("inicializar(p = &pila)"), v: { p: "&pila" }, etiqueta: "ok" });
    emit("main", L.mArr, "Se declara el arreglo <code>parentesis[]</code> con los símbolos que vamos a revisar: <b>" + txt + "</b>.", { lv: 1 });
    emit("main", L.mLong, "<code>longitud = sizeof(parentesis) / sizeof(parentesis[0])</code> = " + longitud + " (bytes totales entre bytes de un elemento = cuántos hay).", { lv: 1 });

    for (let i = 0; i < longitud; i++) {
      iActual = i;
      const c = chars[i];
      emit("main", L.mFor, (i === 0 ? "<code>i = 0</code>. " : "<code>i++</code> → <code>i = " + i + "</code>. ") + "Condición <code>i &lt; longitud</code> → " + i + " &lt; " + longitud + " <b>verdadera</b>. Símbolo actual: <b>" + c + "</b>.", { lv: 1, i: i });
      emit("main", L.mIfA, "¿<code>parentesis[" + i + "] == '('</code>? → ¿" + c + " == ( ? <b>" + (c === "(" ? "SÍ" : "NO") + "</b>.", { i: i, etiqueta: "cmp", lv: c === "(" ? 0 : 1 });
      if (c === "(") {
        emit("main", L.mPush, "Es un paréntesis que abre: se apila con <code>push(&amp;pila, parentesis[i])</code>. Se guarda como <b>int</b>: " + chrTxt(c) + ".", { i: i });
        const pl = pf("push(p = &pila, valor = " + c.charCodeAt(0) + ")");
        const v = { p: "&pila", valor: c.charCodeAt(0) };
        emit("impl", L.pushSig, "Entra <b>push</b> de <code>TADPilaEstatica</code>.", { lv: 1, i: i, v, pila: pl });
        emit("impl", L.pushIf, "<code>isFull(p)</code> → " + S.tope + " == " + (MAX - 1) + " → falso: hay espacio.", { lv: 1, i: i, v, pila: pl });
        S.tope++;
        S.dato[S.tope] = c.charCodeAt(0);
        emit("impl", L.pushBody, "<code>datos[++(p-&gt;tope)] = valor</code> → <code>tope</code> sube a <b>" + S.tope + "</b> y ahí se guarda '('.", { i: i, v, pila: pl, marca: { nuevo: S.tope }, etiqueta: "swap" });
      } else {
        emit("main", L.mIfC, "¿<code>parentesis[" + i + "] == ')'</code>? → ¿" + c + " == ) ? <b>" + (c === ")" ? "SÍ" : "NO") + "</b>." + (c === ")" ? "" : " Ni abre ni cierra: se ignora este símbolo."), { i: i, etiqueta: "cmp", lv: c === ")" ? 0 : 0 });
        if (c === ")") {
          emit("main", L.mPop, "Es un paréntesis que cierra: se saca el último '(' con <code>pop(&amp;pila)</code>. (El valor que regresa se ignora; solo importa que se quite.)", { i: i });
          const pl = pf("pop(p = &pila)");
          const v = { p: "&pila" };
          emit("impl", L.popSig, "Entra <b>pop</b>.", { lv: 1, i: i, v, pila: pl });
          if (S.tope === -1) {
            emit("impl", L.popIf, "<code>isEmpty(p)</code> → verdadero: ¡hay un <b>)</b> que no tiene su <b>(</b>! La pila está vacía.", { i: i, v, pila: pl, etiqueta: "err" });
            emit("impl", L.popErr, "Imprime el error. <b>Pero el programa sigue</b> (tu <code>main</code> no guarda que hubo un error).", { i: i, v, pila: pl, sal: "Error: la pila esta vacia\n", etiqueta: "err" });
            emit("impl", L.popRetErr, "<code>return -1;</code> (nadie lo usa en <code>main</code>).", { i: i, v, pila: pl, etiqueta: "err" });
          } else {
            emit("impl", L.popIf, "<code>isEmpty(p)</code> → falso: hay un '(' esperando.", { lv: 1, i: i, v, pila: pl });
            const antes = S.tope;
            S.tope--;
            emit("impl", L.popBody, "<code>return datos[(p-&gt;tope)--]</code> → se lee el '(' de <code>datos[" + antes + "]</code> y <code>tope</code> baja a <b>" + S.tope + "</b>. Ese ')' quedó <b>emparejado</b>.", { i: i, v, pila: pl, marca: { sacado: antes }, etiqueta: "swap" });
          }
        }
      }
    }
    iActual = longitud;
    emit("main", L.mFor, "<code>i++</code> → <code>i = " + longitud + "</code>. <code>i &lt; longitud</code> es <b>falsa</b>: se revisaron todos los símbolos.", { lv: 1, i: longitud });
    emit("main", L.mPrint, "<code>imprimirPila(&amp;pila)</code>: muestra lo que quedó en la pila. Si quedó vacía, todos los '(' encontraron su ')'.", { i: longitud });
    const plp = pf("imprimirPila(p = &pila)");
    const vp = { p: "&pila" };
    emit("impl", L.prSig, "Entra <b>imprimirPila</b>.", { lv: 1, i: longitud, v: vp, pila: plp });
    const sinSobrantes = S.tope === -1;
    if (sinSobrantes) {
      emit("impl", L.prIf, "<code>isEmpty(p)</code> → verdadero.", { lv: 1, i: longitud, v: vp, pila: plp });
      emit("impl", L.prVacia, "Imprime <b>La pila esta vacia</b>.", { i: longitud, v: vp, pila: plp, sal: "La pila esta vacia\n", etiqueta: "ok" });
    } else {
      emit("impl", L.prIf, "<code>isEmpty(p)</code> → falso: quedaron paréntesis sin cerrar.", { lv: 1, i: longitud, v: vp, pila: plp });
      emit("impl", L.prHead, "Imprime el encabezado.", { lv: 1, i: longitud, v: vp, pila: plp, sal: "Elementos en la pila: " });
      for (let k = S.tope; k >= 0; k--) {
        emit("impl", L.prItem, "Imprime <code>datos[" + k + "]</code> = " + S.dato[k] + " (el código del carácter '(').", { i: longitud, v: vp, pila: plp, sal: S.dato[k] + " ", marca: { nuevo: k } });
      }
      emit("impl", L.prNl, "Salto de línea.", { lv: 1, i: longitud, v: vp, pila: plp, sal: "\n", etiqueta: "err" });
    }
    emit("main", L.mRet, "Fin de <code>main</code>.", { i: longitud, etiqueta: "ok" });
    return { T: T, salImpl: salImpl, balanceado: sinSobrantes, sobranCierres: salImpl.indexOf("Error") >= 0 };
  };
})();
