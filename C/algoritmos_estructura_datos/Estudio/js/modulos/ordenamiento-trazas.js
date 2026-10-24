/* ============================================================
   ordenamiento-trazas.js
   Reproduce, linea por linea, TU codigo C de burbuja, seleccion,
   insercion y mezcla. Cada "paso" dice que linea se ejecuta,
   como quedan las variables y el arreglo, y explica por que.
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  E.ord = E.ord || {};

  const fmtArr = (a) => (a.length > 10 ? "{" + a.slice(0, 8).join(", ") + ", … (" + a.length + ")}" : "{" + a.join(", ") + "}");
  const code = (s) => "<code>" + s + "</code>";

  /* ---------- parte comun: lo que hace main antes y despues ---------- */
  function mainInicio(T, Lm, a, titulo, pilaMain) {
    T.paso({
      f: "main",
      l: Lm("int numeros[TAM_ARREGLO]"),
      nota: "<b>main</b> declara el arreglo <code>numeros</code>. En tu archivo trae 40 números; aquí usamos el que escribiste arriba (" + a.length + " números). Ojo: el arreglo vive en la memoria de <code>main</code>.",
      viz: { a: a.slice(), marks: {}, ptr: {}, cont: { cmp: 0, inter: 0 } },
      v: { numeros: fmtArr(a) },
      pila: pilaMain,
    });
    T.paso({
      f: "main",
      l: Lm("imprimirArreglo(numeros, TAM_ARREGLO);", 1),
      lv: 1,
      nota: "Se imprime el arreglo <b>original</b> con <code>imprimirArreglo</code> (un <code>for</code> que hace <code>printf(\"%d \", numeros[i])</code>).",
      viz: { a: a.slice(), marks: {}, ptr: {}, cont: { cmp: 0, inter: 0 } },
      v: { numeros: fmtArr(a) },
      pila: pilaMain,
      sal: titulo + "\n\nArreglo original:\n" + a.join(" ") + " \n",
    });
  }
  function mainFin(T, Lm, a, cont, pilaMain, etqFinal) {
    const marks = {};
    a.forEach((_, i) => (marks[i] = "sorted"));
    T.paso({
      f: "main",
      l: Lm("printf(\"\\nArreglo ordenado:\\n\");"),
      lv: 1,
      nota: "La función regresó. Como <code>numeros</code> se pasó por dirección, <code>main</code> ya ve el arreglo <b>ordenado</b> (no hubo copia).",
      viz: { a: a.slice(), marks, ptr: {}, cont },
      v: { numeros: fmtArr(a) },
      pila: pilaMain,
      sal: "\nArreglo ordenado:\n",
      etiqueta: "ok",
    });
    T.paso({
      f: "main",
      l: Lm("imprimirArreglo(numeros, TAM_ARREGLO);", 2),
      nota: "Se imprime el arreglo ordenado. " + (etqFinal || "") + " <b>Fin del programa.</b>",
      viz: { a: a.slice(), marks, ptr: {}, cont },
      v: { numeros: fmtArr(a) },
      pila: pilaMain,
      sal: a.join(" ") + " \n",
      etiqueta: "ok",
    });
  }

  /* =======================================================
     BURBUJA
     ======================================================= */
  E.ord.burbuja = function (entrada, A) {
    const Li = E.anclas(A.impl, "burbuja");
    const Lm = E.anclas(A.main, "burbuja");
    const T = E.nuevoTrazo();
    const a = entrada.slice();
    const n = a.length;
    const c = { cmp: 0, inter: 0 };
    const v = { tam: n, i: "?", j: "?", aux: "?" };
    const PM = ["main()"];
    const PF = ["burbuja(numeros, tam = " + n + ")", "main()"];
    const viz = (marks, ptr, aux) => ({ a: a.slice(), marks: marks || {}, ptr: ptr || {}, aux: aux || null, cont: { cmp: c.cmp, inter: c.inter } });
    const ordenados = (desde, marks) => {
      marks = marks || {};
      for (let k = desde; k < n; k++) if (!(k in marks)) marks[k] = "sorted";
      return marks;
    };
    const L = {
      fn: Li("void burbuja(int numeros[], int tam) {"),
      vars: Li("int i, j, aux;"),
      forI: Li("for (i = 0; i < tam - 1; i++) {"),
      forJ: Li("for (j = 0; j < tam - 1 - i; j++) {"),
      si: Li("if (numeros[j] > numeros[j + 1]) {"),
      s1: Li("aux = numeros[j];"),
      s2: Li("numeros[j] = numeros[j + 1];"),
      s3: Li("numeros[j + 1] = aux;"),
      fin: Li.fin("void burbuja(int numeros[], int tam) {"),
    };
    const resumen = () => a.join(" ");

    mainInicio(T, Lm, a, "=== ORDENAMIENTO BURBUJA (Bubble Sort) ===", PM);
    T.paso({
      f: "main",
      l: Lm("burbuja(numeros, TAM_ARREGLO);"),
      nota: "<b>main</b> llama a " + code("burbuja(numeros, TAM_ARREGLO)") + ". Se pasa la <b>dirección</b> del arreglo y su tamaño (" + n + "). Empieza el algoritmo.",
      viz: viz(),
      v: { numeros: fmtArr(a) },
      pila: PM,
    });
    T.paso({
      f: "impl",
      l: L.fn,
      nota: "Entramos a <b>burbuja</b>. <code>numeros</code> es la MISMA memoria que la de main (no una copia) y <code>tam = " + n + "</code>.",
      viz: viz(),
      v: Object.assign({}, v),
      pila: PF,
    });
    T.paso({
      f: "impl",
      l: L.vars,
      lv: 1,
      nota: "Se reservan tres variables locales: <code>i</code> (cuenta las pasadas), <code>j</code> (recorre el arreglo) y <code>aux</code> (para intercambiar). Todavía no tienen valor: contienen basura.",
      viz: viz(),
      v: Object.assign({}, v),
      pila: PF,
    });

    for (let i = 0; i < n - 1; i++) {
      v.i = i;
      const limite = n - 1 - i;
      T.paso({
        f: "impl",
        l: L.forI,
        lv: i === 0 ? 0 : 1,
        nota:
          (i === 0 ? "" : "<code>i++</code> → ") +
          "<code>i = " + i + "</code>. Condición <code>i &lt; tam - 1</code> → " + i + " &lt; " + (n - 1) + " es <b>verdadera</b>. Comienza la <b>pasada " + (i + 1) + "</b>: " +
          (i === 0 ? "el número más grande va a “flotar” hasta la última posición." : "ahora el segundo más grande llegará a su lugar."),
        viz: viz(ordenados(n - i)),
        v: Object.assign({}, v),
        pila: PF,
      });
      for (let j = 0; j < limite; j++) {
        v.j = j;
        T.paso({
          f: "impl",
          l: L.forJ,
          lv: 1,
          nota:
            (j === 0 ? "" : "<code>j++</code> → ") +
            "<code>j = " + j + "</code>. Condición <code>j &lt; tam - 1 - i</code> → " + j + " &lt; " + limite + " es <b>verdadera</b>." +
            (j === 0 ? " Cada pasada revisa un elemento menos porque el final ya quedó ordenado." : ""),
          viz: viz(ordenados(n - i)),
          v: Object.assign({}, v),
          pila: PF,
        });
        const x = a[j];
        const y = a[j + 1];
        c.cmp++;
        const marcasCmp = ordenados(n - i, {});
        marcasCmp[j] = "cmp";
        marcasCmp[j + 1] = "cmp";
        const hayCambio = x > y;
        T.paso({
          f: "impl",
          l: L.si,
          nota:
            "¿<code>numeros[" + j + "] &gt; numeros[" + (j + 1) + "]</code>? → ¿" + x + " &gt; " + y + "? <b>" + (hayCambio ? "SÍ" : "NO") + "</b>. " +
            (hayCambio ? "Están en desorden: hay que intercambiarlos." : "Ya están en orden: no se hace nada."),
          viz: viz(marcasCmp, { j: j, "j+1": j + 1 }),
          v: Object.assign({}, v),
          pila: PF,
          etiqueta: "cmp",
          fila: hayCambio ? null : { i: i, j: j, x: x, y: y, cambio: "no", aux: v.aux, arr: resumen() },
        });
        if (hayCambio) {
          v.aux = x;
          T.paso({
            f: "impl",
            l: L.s1,
            lv: 1,
            nota: "<code>aux = numeros[" + j + "]</code> → guardo <b>" + x + "</b> en <code>aux</code> para no perderlo.",
            viz: viz(marcasCmp, { j: j, "j+1": j + 1 }, { etq: "aux", v: x }),
            v: Object.assign({}, v),
            pila: PF,
            etiqueta: "swap",
          });
          a[j] = y;
          const m2 = Object.assign({}, marcasCmp);
          m2[j] = "swap";
          T.paso({
            f: "impl",
            l: L.s2,
            lv: 1,
            nota: "<code>numeros[" + j + "] = numeros[" + (j + 1) + "]</code> → copio <b>" + y + "</b> a la posición " + j + ". Fíjate: ahora " + y + " aparece dos veces; el " + x + " solo sobrevive en <code>aux</code>.",
            viz: viz(m2, { j: j, "j+1": j + 1 }, { etq: "aux", v: x }),
            v: Object.assign({}, v),
            pila: PF,
            etiqueta: "swap",
          });
          a[j + 1] = x;
          c.inter++;
          const m3 = Object.assign({}, marcasCmp);
          m3[j] = "swap";
          m3[j + 1] = "swap";
          T.paso({
            f: "impl",
            l: L.s3,
            nota: "<code>numeros[" + (j + 1) + "] = aux</code> → pongo <b>" + x + "</b> en la posición " + (j + 1) + ". <b>Intercambio completo</b>: " + y + " y " + x + " cambiaron de lugar.",
            viz: viz(m3, { j: j, "j+1": j + 1 }, { etq: "aux", v: x }),
            v: Object.assign({}, v),
            pila: PF,
            etiqueta: "swap",
            fila: { i: i, j: j, x: x, y: y, cambio: "sí", aux: x, arr: resumen() },
          });
        }
      }
      // la condicion falla y termina la pasada
      v.j = limite;
      T.paso({
        f: "impl",
        l: L.forJ,
        nota:
          "<code>j++</code> → <code>j = " + limite + "</code>. Condición <code>j &lt; " + limite + "</code> es <b>falsa</b>: termina la pasada " + (i + 1) + ". El <b>" + a[limite] + "</b> ya quedó en su lugar definitivo (posición " + limite + ").",
        viz: viz(ordenados(limite)),
        v: Object.assign({}, v),
        pila: PF,
        etiqueta: "ok",
      });
    }
    v.i = n - 1;
    T.paso({
      f: "impl",
      l: L.forI,
      nota: "<code>i++</code> → <code>i = " + (n - 1) + "</code>. Condición <code>i &lt; tam - 1</code> → " + (n - 1) + " &lt; " + (n - 1) + " es <b>falsa</b>. El <code>for</code> termina; el elemento de la posición 0 queda solo y, por lo tanto, ordenado.",
      viz: viz(ordenados(0)),
      v: Object.assign({}, v),
      pila: PF,
      etiqueta: "ok",
    });
    T.paso({
      f: "impl",
      l: L.fin,
      nota: "Llega la llave <code>}</code> de la función: <b>burbuja termina</b> (no regresa nada: es <code>void</code>) y desaparecen <code>i</code>, <code>j</code> y <code>aux</code>.",
      viz: viz(ordenados(0)),
      v: null,
      pila: PF,
    });
    mainFin(T, Lm, a, { cmp: c.cmp, inter: c.inter }, PM, "Hubo " + c.cmp + " comparaciones y " + c.inter + " intercambios.");
    T.resultado = a;
    T.cont = c;
    return T;
  };
  E.ord.burbuja.cols = [
    { k: "i", label: "i" },
    { k: "j", label: "j" },
    { k: "x", label: "numeros[j]" },
    { k: "y", label: "numeros[j+1]" },
    { k: "cambio", label: "¿x > y?" },
    { k: "aux", label: "aux" },
    { k: "arr", label: "arreglo después", clase: "td-arr" },
  ];

  /* =======================================================
     SELECCION
     ======================================================= */
  E.ord.seleccion = function (entrada, A) {
    const Li = E.anclas(A.impl, "seleccion");
    const Lm = E.anclas(A.main, "seleccion");
    const T = E.nuevoTrazo();
    const a = entrada.slice();
    const n = a.length;
    const c = { cmp: 0, inter: 0 };
    const v = { tam: n, i: "?", j: "?", menor: "?", aux: "?" };
    const PM = ["main()"];
    const PF = ["seleccion(numeros, tam = " + n + ")", "main()"];
    const viz = (marks, ptr, aux) => ({ a: a.slice(), marks: marks || {}, ptr: ptr || {}, aux: aux || null, cont: { cmp: c.cmp, inter: c.inter } });
    const ordenadosHasta = (hasta, marks) => {
      marks = marks || {};
      for (let k = 0; k < hasta; k++) if (!(k in marks)) marks[k] = "sorted";
      return marks;
    };
    const L = {
      fn: Li("void seleccion(int numeros[], int tam) {"),
      vars: Li("int i, j, menor, aux;"),
      forI: Li("for (i = 0; i < tam - 1; i++) {"),
      menor: Li("menor = i;"),
      forJ: Li("for (j = i + 1; j < tam; j++) {"),
      si: Li("if (numeros[j] < numeros[menor]) {"),
      nuevo: Li("menor = j;"),
      s1: Li("aux = numeros[i];"),
      s2: Li("numeros[i] = numeros[menor];"),
      s3: Li("numeros[menor] = aux;"),
      fin: Li.fin("void seleccion(int numeros[], int tam) {"),
    };
    const resumen = () => a.join(" ");

    mainInicio(T, Lm, a, "=== ORDENAMIENTO POR SELECCION (Selection Sort) ===", PM);
    T.paso({
      f: "main",
      l: Lm("seleccion(numeros, TAM_ARREGLO);"),
      nota: "<b>main</b> llama a " + code("seleccion(numeros, TAM_ARREGLO)") + ". Se pasa la dirección del arreglo y su tamaño (" + n + ").",
      viz: viz(),
      v: { numeros: fmtArr(a) },
      pila: PM,
    });
    T.paso({ f: "impl", l: L.fn, nota: "Entramos a <b>seleccion</b>. Trabajamos sobre el arreglo original de <code>main</code>.", viz: viz(), v: Object.assign({}, v), pila: PF });
    T.paso({
      f: "impl",
      l: L.vars,
      lv: 1,
      nota: "Variables locales: <code>i</code> (posición que vamos a llenar), <code>j</code> (explorador), <code>menor</code> (índice del menor encontrado) y <code>aux</code> (para el intercambio).",
      viz: viz(),
      v: Object.assign({}, v),
      pila: PF,
    });

    for (let i = 0; i < n - 1; i++) {
      v.i = i;
      v.j = "?";
      T.paso({
        f: "impl",
        l: L.forI,
        lv: i === 0 ? 0 : 1,
        nota:
          (i === 0 ? "" : "<code>i++</code> → ") +
          "<code>i = " + i + "</code>. Condición <code>i &lt; tam - 1</code> → " + i + " &lt; " + (n - 1) + " <b>verdadera</b>. Vamos a buscar quién va en la posición " + i + ": el menor de todo lo que queda a la derecha.",
        viz: viz(ordenadosHasta(i), { i: i }),
        v: Object.assign({}, v),
        pila: PF,
      });
      let menor = i;
      v.menor = menor;
      T.paso({
        f: "impl",
        l: L.menor,
        lv: 1,
        nota: "<code>menor = i</code> → suponemos que el menor es el de la posición <b>" + i + "</b> (" + a[i] + "). Si encontramos uno más pequeño, lo cambiamos.",
        viz: viz(ordenadosHasta(i, { [i]: "min" }), { i: i, menor: menor }),
        v: Object.assign({}, v),
        pila: PF,
      });
      for (let j = i + 1; j < n; j++) {
        v.j = j;
        T.paso({
          f: "impl",
          l: L.forJ,
          lv: 1,
          nota: (j === i + 1 ? "<code>j = i + 1</code> → " : "<code>j++</code> → ") + "<code>j = " + j + "</code>. Condición <code>j &lt; tam</code> → " + j + " &lt; " + n + " <b>verdadera</b>.",
          viz: viz(ordenadosHasta(i, { [menor]: "min", [j]: "cmp" }), { i: i, menor: menor, j: j }),
          v: Object.assign({}, v),
          pila: PF,
        });
        c.cmp++;
        const nuevoMenor = a[j] < a[menor];
        const mk = ordenadosHasta(i, { [menor]: "min", [j]: "cmp" });
        T.paso({
          f: "impl",
          l: L.si,
          nota:
            "¿<code>numeros[" + j + "] &lt; numeros[menor]</code>? → ¿" + a[j] + " &lt; " + a[menor] + "? <b>" + (nuevoMenor ? "SÍ" : "NO") + "</b>. " +
            (nuevoMenor ? "Encontramos uno más pequeño." : "El menor actual sigue siendo " + a[menor] + "."),
          viz: viz(mk, { i: i, menor: menor, j: j }),
          v: Object.assign({}, v),
          pila: PF,
          etiqueta: "cmp",
          fila: nuevoMenor ? null : { i: i, j: j, menor: menor, x: a[j], y: a[menor], nuevo: "no", arr: resumen() },
        });
        if (nuevoMenor) {
          menor = j;
          v.menor = menor;
          T.paso({
            f: "impl",
            l: L.nuevo,
            nota: "<code>menor = j</code> → ahora el menor está en la posición <b>" + j + "</b> (" + a[j] + ").",
            viz: viz(ordenadosHasta(i, { [menor]: "min" }), { i: i, menor: menor, j: j }),
            v: Object.assign({}, v),
            pila: PF,
            etiqueta: "swap",
            fila: { i: i, j: j, menor: menor, x: a[j], y: a[menor], nuevo: "sí", arr: resumen() },
          });
        }
      }
      v.j = n;
      T.paso({
        f: "impl",
        l: L.forJ,
        lv: 1,
        nota: "<code>j++</code> → <code>j = " + n + "</code>. Condición <code>j &lt; tam</code> es <b>falsa</b>: ya revisamos todo a la derecha de " + i + ". El menor está en la posición <b>" + menor + "</b> (" + a[menor] + ").",
        viz: viz(ordenadosHasta(i, { [menor]: "min" }), { i: i, menor: menor }),
        v: Object.assign({}, v),
        pila: PF,
      });
      // intercambio
      const vi = a[i];
      v.aux = vi;
      const mkSw = ordenadosHasta(i, { [i]: "swap", [menor]: "min" });
      T.paso({
        f: "impl",
        l: L.s1,
        lv: 1,
        nota: "<code>aux = numeros[i]</code> → guardo <b>" + vi + "</b> (lo que hay en la posición " + i + ").",
        viz: viz(mkSw, { i: i, menor: menor }, { etq: "aux", v: vi }),
        v: Object.assign({}, v),
        pila: PF,
        etiqueta: "swap",
      });
      a[i] = a[menor];
      T.paso({
        f: "impl",
        l: L.s2,
        lv: 1,
        nota: "<code>numeros[i] = numeros[menor]</code> → el menor (<b>" + a[i] + "</b>) viaja a la posición " + i + (menor === i ? ". Como <code>menor == i</code>, es el mismo lugar: no cambia nada." : "."),
        viz: viz(mkSw, { i: i, menor: menor }, { etq: "aux", v: vi }),
        v: Object.assign({}, v),
        pila: PF,
        etiqueta: "swap",
      });
      a[menor] = vi;
      c.inter++;
      const hecho = ordenadosHasta(i + 1);
      T.paso({
        f: "impl",
        l: L.s3,
        nota:
          "<code>numeros[menor] = aux</code> → el valor guardado (<b>" + vi + "</b>) se va a la posición " + menor + ". <b>La posición " + i + " ya es definitiva</b>: " + a[i] + "." +
          (menor === i ? " (El elemento ya estaba en su lugar.)" : ""),
        viz: viz(hecho, { i: i }),
        v: Object.assign({}, v),
        pila: PF,
        etiqueta: "ok",
        fila: { i: i, j: "fin", menor: menor, x: "", y: "", nuevo: "swap(" + i + "," + menor + ")", arr: resumen() },
      });
    }
    v.i = n - 1;
    T.paso({
      f: "impl",
      l: L.forI,
      nota: "<code>i++</code> → <code>i = " + (n - 1) + "</code>. Condición <code>i &lt; tam - 1</code> es <b>falsa</b>: el último elemento queda automáticamente en su lugar.",
      viz: viz(ordenadosHasta(n)),
      v: Object.assign({}, v),
      pila: PF,
      etiqueta: "ok",
    });
    T.paso({ f: "impl", l: L.fin, nota: "Termina <b>seleccion</b>. Siempre hace exactamente <b>n − 1 intercambios</b> (aquí " + c.inter + "), aunque el arreglo ya estuviera ordenado.", viz: viz(ordenadosHasta(n)), v: null, pila: PF });
    mainFin(T, Lm, a, { cmp: c.cmp, inter: c.inter }, PM, "Comparaciones: " + c.cmp + ", intercambios: " + c.inter + ".");
    T.resultado = a;
    T.cont = c;
    return T;
  };
  E.ord.seleccion.cols = [
    { k: "i", label: "i" },
    { k: "j", label: "j" },
    { k: "menor", label: "menor" },
    { k: "x", label: "numeros[j]" },
    { k: "y", label: "numeros[menor]" },
    { k: "nuevo", label: "¿nuevo menor?" },
    { k: "arr", label: "arreglo después", clase: "td-arr" },
  ];

  /* =======================================================
     INSERCION
     ======================================================= */
  E.ord.insercion = function (entrada, A) {
    const Li = E.anclas(A.impl, "insercion");
    const Lm = E.anclas(A.main, "insercion");
    const T = E.nuevoTrazo();
    const a = entrada.slice();
    const n = a.length;
    const c = { cmp: 0, inter: 0 }; // inter = desplazamientos
    const v = { tam: n, i: "?", j: "?", actual: "?" };
    const PM = ["main()"];
    const PF = ["insercion(numeros, tam = " + n + ")", "main()"];
    const viz = (marks, ptr, aux, extra) => ({ a: a.slice(), marks: marks || {}, ptr: ptr || {}, aux: aux || null, cont: { cmp: c.cmp, inter: c.inter }, extra: extra || null });
    const prefijo = (hasta, marks) => {
      marks = marks || {};
      for (let k = 0; k <= hasta; k++) if (!(k in marks)) marks[k] = "sorted";
      return marks;
    };
    const L = {
      fn: Li("void insercion(int numeros[], int tam) {"),
      vars: Li("int i, j, actual;"),
      forI: Li("for (i = 1; i < tam; i++) {"),
      actual: Li("actual = numeros[i];"),
      j: Li("j = i - 1;"),
      mientras: Li("while (j >= 0 && numeros[j] > actual) {"),
      corre: Li("numeros[j + 1] = numeros[j];"),
      dec: Li("j--;"),
      pon: Li("numeros[j + 1] = actual;"),
      fin: Li.fin("void insercion(int numeros[], int tam) {"),
    };
    const resumen = () => a.join(" ");

    mainInicio(T, Lm, a, "=== ORDENAMIENTO POR INSERCION (Insertion Sort) ===", PM);
    T.paso({
      f: "main",
      l: Lm("insercion(numeros, TAM_ARREGLO);"),
      nota: "<b>main</b> llama a " + code("insercion(numeros, TAM_ARREGLO)") + ".",
      viz: viz(),
      v: { numeros: fmtArr(a) },
      pila: PM,
    });
    T.paso({ f: "impl", l: L.fn, nota: "Entramos a <b>insercion</b>. Idea: como ordenar las cartas de tu mano, una por una.", viz: viz(), v: Object.assign({}, v), pila: PF });
    T.paso({
      f: "impl",
      l: L.vars,
      lv: 1,
      nota: "<code>i</code> = carta que vamos a acomodar, <code>j</code> = explorador hacia la izquierda, <code>actual</code> = copia de la carta que sostenemos en la mano.",
      viz: viz(),
      v: Object.assign({}, v),
      pila: PF,
    });

    for (let i = 1; i < n; i++) {
      v.i = i;
      T.paso({
        f: "impl",
        l: L.forI,
        lv: i === 1 ? 0 : 1,
        nota:
          (i === 1 ? "<code>i = 1</code>: el elemento 0 se considera una “mano” de una sola carta, ya ordenada. " : "<code>i++</code> → <code>i = " + i + "</code>. ") +
          "Condición <code>i &lt; tam</code> → " + i + " &lt; " + n + " <b>verdadera</b>. A la izquierda de " + i + " todo está ordenado (verde).",
        viz: viz(prefijo(i - 1), { i: i }),
        v: Object.assign({}, v),
        pila: PF,
      });
      const actual = a[i];
      v.actual = actual;
      T.paso({
        f: "impl",
        l: L.actual,
        nota: "<code>actual = numeros[i]</code> → levanto el <b>" + actual + "</b> con la mano (lo copio en <code>actual</code>). Su casilla quedará libre para recibir desplazamientos.",
        viz: viz(prefijo(i - 1, { [i]: "key" }), { i: i }, { etq: "actual", v: actual }),
        v: Object.assign({}, v),
        pila: PF,
        etiqueta: "swap",
      });
      let j = i - 1;
      v.j = j;
      T.paso({
        f: "impl",
        l: L.j,
        lv: 1,
        nota: "<code>j = i - 1</code> → empiezo a mirar justo a la izquierda: posición <b>" + j + "</b>.",
        viz: viz(prefijo(i - 1, { [i]: "key" }), { i: i, j: j }, { etq: "actual", v: actual }),
        v: Object.assign({}, v),
        pila: PF,
      });
      for (;;) {
        const cumpleJ = j >= 0;
        let cumple = false;
        let nota;
        if (!cumpleJ) {
          nota = "<code>j &gt;= 0</code> es falso (<code>j = " + j + "</code>): ya no hay más elementos a la izquierda. <b>Corto-circuito</b>: ni siquiera se evalúa <code>numeros[j]</code> (sería leer fuera del arreglo). Se sale del <code>while</code>.";
        } else {
          c.cmp++;
          cumple = a[j] > actual;
          nota =
            "<code>j &gt;= 0</code> ✔ y ¿<code>numeros[" + j + "] &gt; actual</code>? → ¿" + a[j] + " &gt; " + actual + "? <b>" + (cumple ? "SÍ" : "NO") + "</b>. " +
            (cumple ? "Ese elemento es mayor: hay que correrlo a la derecha para hacer espacio." : "Ese elemento es menor o igual: aquí se detiene el desplazamiento; <code>actual</code> va justo después.");
        }
        const mk = prefijo(i - 1, { [i]: "key" });
        if (cumpleJ) mk[j] = "cmp";
        T.paso({
          f: "impl",
          l: L.mientras,
          lv: cumple ? 0 : 0,
          nota: nota,
          viz: viz(mk, { i: i, j: j }, { etq: "actual", v: actual }),
          v: Object.assign({}, v),
          pila: PF,
          etiqueta: "cmp",
          fila: { i: i, actual: actual, j: j, x: cumpleJ ? a[j] : "—", mover: cumple ? "sí" : "no", arr: resumen() },
        });
        if (!cumple) break;
        a[j + 1] = a[j];
        c.inter++;
        const mk2 = prefijo(i - 1, { [i]: "key" });
        mk2[j] = "cmp";
        mk2[j + 1] = "swap";
        T.paso({
          f: "impl",
          l: L.corre,
          nota: "<code>numeros[j + 1] = numeros[j]</code> → corro el <b>" + a[j + 1] + "</b> una casilla a la derecha (posición " + (j + 1) + "). Ahora ese número aparece dos veces; la copia vieja se sobrescribirá.",
          viz: viz(mk2, { i: i, j: j }, { etq: "actual", v: actual }),
          v: Object.assign({}, v),
          pila: PF,
          etiqueta: "swap",
        });
        j--;
        v.j = j;
        T.paso({
          f: "impl",
          l: L.dec,
          lv: 1,
          nota: "<code>j--</code> → ahora <code>j = " + j + "</code>. Miramos un lugar más a la izquierda.",
          viz: viz(prefijo(i - 1, { [i]: "key", [j + 1]: "swap" }), { i: i, j: j }, { etq: "actual", v: actual }),
          v: Object.assign({}, v),
          pila: PF,
        });
      }
      a[j + 1] = actual;
      T.paso({
        f: "impl",
        l: L.pon,
        nota: "<code>numeros[j + 1] = actual</code> → suelto el <b>" + actual + "</b> en la posición <b>" + (j + 1) + "</b>. Ahora las posiciones 0 a " + i + " están ordenadas.",
        viz: viz(prefijo(i, { [j + 1]: "key" }), { i: i }),
        v: Object.assign({}, v),
        pila: PF,
        etiqueta: "ok",
      });
    }
    v.i = n;
    T.paso({
      f: "impl",
      l: L.forI,
      nota: "<code>i++</code> → <code>i = " + n + "</code>. Condición <code>i &lt; tam</code> es <b>falsa</b>: terminamos, todo el arreglo es la “mano ordenada”.",
      viz: viz(prefijo(n - 1)),
      v: Object.assign({}, v),
      pila: PF,
      etiqueta: "ok",
    });
    T.paso({ f: "impl", l: L.fin, nota: "Termina <b>insercion</b>.", viz: viz(prefijo(n - 1)), v: null, pila: PF });
    mainFin(T, Lm, a, { cmp: c.cmp, inter: c.inter }, PM, "Comparaciones: " + c.cmp + ", desplazamientos: " + c.inter + ".");
    T.resultado = a;
    T.cont = c;
    return T;
  };
  E.ord.insercion.cols = [
    { k: "i", label: "i" },
    { k: "actual", label: "actual" },
    { k: "j", label: "j" },
    { k: "x", label: "numeros[j]" },
    { k: "mover", label: "¿mover?" },
    { k: "arr", label: "arreglo después", clase: "td-arr" },
  ];

  /* =======================================================
     MEZCLA (merge sort)
     ======================================================= */
  E.ord.mezcla = function (entrada, A) {
    const Li = E.anclas(A.impl, "mezcla");
    const Lm = E.anclas(A.main, "mezcla");
    const T = E.nuevoTrazo();
    const a = entrada.slice();
    const n = a.length;
    const c = { cmp: 0, inter: 0 }; // inter = escrituras en numeros[k]
    const PM = ["main()"];
    const hechos = []; // rangos ya mezclados
    const pilaLl = []; // {tipo, ...}
    const L = {
      fnM: Li("void mezcla(int numeros[], int inicio, int fin) {"),
      si: Li("if (inicio < fin) {"),
      mitad: Li("mitad = (inicio + fin) / 2;"),
      izq: Li("mezcla(numeros, inicio, mitad);"),
      der: Li("mezcla(numeros, mitad + 1, fin);"),
      juntar: Li("juntar(numeros, inicio, mitad, fin);"),
      finM: Li.fin("void mezcla(int numeros[], int inicio, int fin) {"),
      fnJ: Li("void juntar(int numeros[], int inicio, int mitad, int fin) {"),
      arrs: Li("int izquierda[TAM_ARREGLO];"),
      tams: Li("int tamDer = fin - mitad;"),
      ijk: Li("int i, j, k;"),
      for1: Li("for (i = 0; i < tamIzq; i++) {"),
      cp1: Li("izquierda[i] = numeros[inicio + i];"),
      for2: Li("for (j = 0; j < tamDer; j++) {"),
      cp2: Li("derecha[j] = numeros[mitad + 1 + j];"),
      k0: Li("k = inicio;"),
      w1: Li("while (i < tamIzq && j < tamDer) {"),
      cmp: Li("if (izquierda[i] <= derecha[j]) {"),
      tomaI: Li("numeros[k] = izquierda[i];", 1),
      iInc: Li("i++;", 1),
      tomaD: Li("numeros[k] = derecha[j];", 1),
      jInc: Li("j++;", 1),
      kInc: Li("k++;", 1),
      w2: Li("while (i < tamIzq) {"),
      sobraI: Li("numeros[k] = izquierda[i];", 2),
      iInc2: Li("i++;", 2),
      kInc2: Li("k++;", 2),
      w3: Li("while (j < tamDer) {"),
      sobraD: Li("numeros[k] = derecha[j];", 2),
      jInc2: Li("j++;", 2),
      kInc3: Li("k++;", 3),
      finJ: Li.fin("void juntar(int numeros[], int inicio, int mitad, int fin) {"),
    };
    const resumen = () => a.join(" ");
    const pilaTxt = () => {
      const r = ["main()"];
      pilaLl.forEach((f) => {
        if (f.tipo === "mezcla") r.push("mezcla(inicio = " + f.inicio + ", fin = " + f.fin + ")" + (f.mitad != null ? " · mitad = " + f.mitad : ""));
        else r.push("juntar(inicio = " + f.inicio + ", mitad = " + f.mitad + ", fin = " + f.fin + ")");
      });
      return r.reverse();
    };
    const marcasRango = (lo, hi, mitad) => {
      const m = {};
      for (let k = 0; k < n; k++) {
        if (k < lo || k > hi) m[k] = "fuera";
      }
      hechos.forEach(([x, y]) => {
        for (let k = x; k <= y; k++) if (m[k] === undefined || m[k] === "fuera") m[k] = k >= lo && k <= hi ? "hecho" : "hechoFuera";
      });
      if (mitad != null) {
        for (let k = lo; k <= mitad; k++) m[k] = "izq";
        for (let k = mitad + 1; k <= hi; k++) m[k] = "der";
      }
      return m;
    };
    const viz = (marks, rango, ptr, extra) => ({ a: a.slice(), marks: marks || {}, rango: rango || null, ptr: ptr || {}, cont: { cmp: c.cmp, inter: c.inter }, extra: extra || null });

    mainInicio(T, Lm, a, "=== ORDENAMIENTO POR MEZCLA (Merge Sort) ===", PM);
    T.paso({
      f: "main",
      l: Lm("mezcla(numeros, 0, TAM_ARREGLO - 1);"),
      nota: "<b>main</b> llama a " + code("mezcla(numeros, 0, TAM_ARREGLO - 1)") + ": ordena el rango completo, de la posición <b>0</b> a la <b>" + (n - 1) + "</b>.",
      viz: viz(),
      v: { numeros: fmtArr(a) },
      pila: PM,
    });

    function juntar(inicio, mitad, fin) {
      pilaLl.push({ tipo: "juntar", inicio, mitad, fin });
      const tamIzq = mitad - inicio + 1;
      const tamDer = fin - mitad;
      const izq = new Array(tamIzq).fill(null);
      const der = new Array(tamDer).fill(null);
      const v = { inicio, mitad, fin, tamIzq: "?", tamDer: "?", i: "?", j: "?", k: "?" };
      const ex = (i, j, k, nuevoI, nuevoD) => ({
        izq: { etq: "izquierda[]", vals: izq.slice(), i: i, ptr: i == null ? [] : [{ i: i, et: "i" }], nuevo: nuevoI },
        der: { etq: "derecha[]", vals: der.slice(), i: j, ptr: j == null ? [] : [{ i: j, et: "j" }], nuevo: nuevoD },
      });
      const mk = () => marcasRango(inicio, fin, mitad);
      T.paso({
        f: "impl",
        l: L.fnJ,
        nota:
          "Entra <b>juntar</b>: mezcla dos mitades que YA están ordenadas: izquierda = posiciones <b>" + inicio + "–" + mitad + "</b> y derecha = <b>" + (mitad + 1) + "–" + fin + "</b>. Es el verdadero trabajo del algoritmo.",
        viz: viz(mk(), [inicio, fin]),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      T.paso({
        f: "impl",
        l: L.arrs,
        lv: 1,
        nota: "Se crean dos arreglos auxiliares <code>izquierda</code> y <code>derecha</code> (en el stack, de tamaño <code>TAM_ARREGLO</code>). Sirven para guardar copias de las dos mitades mientras reescribimos <code>numeros</code>.",
        viz: viz(mk(), [inicio, fin], {}, ex(null, null, null)),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      v.tamIzq = tamIzq;
      v.tamDer = tamDer;
      T.paso({
        f: "impl",
        l: L.tams,
        nota: "<code>tamIzq = mitad - inicio + 1 = " + tamIzq + "</code> y <code>tamDer = fin - mitad = " + tamDer + "</code>. (El <code>+1</code> es porque los dos extremos cuentan.)",
        viz: viz(mk(), [inicio, fin], {}, ex(null, null, null)),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      T.paso({ f: "impl", l: L.ijk, lv: 1, nota: "Tres contadores: <code>i</code> recorre <code>izquierda</code>, <code>j</code> recorre <code>derecha</code> y <code>k</code> escribe en <code>numeros</code>.", viz: viz(mk(), [inicio, fin], {}, ex(null, null, null)), v: Object.assign({}, v), pila: pilaTxt() });
      for (let i = 0; i < tamIzq; i++) {
        izq[i] = a[inicio + i];
        v.i = i;
        T.paso({
          f: "impl",
          l: L.cp1,
          lv: i === tamIzq - 1 ? 0 : 1,
          nota: "<code>izquierda[" + i + "] = numeros[inicio + " + i + "]</code> → copio <b>" + izq[i] + "</b>." + (i === tamIzq - 1 ? " Mitad izquierda copiada completa." : ""),
          viz: viz(mk(), [inicio, fin], { [i === 0 ? "origen" : "origen"]: inicio + i }, ex(null, null, null, i)),
          v: Object.assign({}, v),
          pila: pilaTxt(),
        });
      }
      for (let j = 0; j < tamDer; j++) {
        der[j] = a[mitad + 1 + j];
        v.j = j;
        T.paso({
          f: "impl",
          l: L.cp2,
          lv: j === tamDer - 1 ? 0 : 1,
          nota: "<code>derecha[" + j + "] = numeros[mitad + 1 + " + j + "]</code> → copio <b>" + der[j] + "</b>." + (j === tamDer - 1 ? " Mitad derecha copiada completa: ahora tenemos las dos mitades a salvo." : ""),
          viz: viz(mk(), [inicio, fin], { origen: mitad + 1 + j }, ex(null, null, null, null, j)),
          v: Object.assign({}, v),
          pila: pilaTxt(),
        });
      }
      let i = 0;
      let j = 0;
      let k = inicio;
      v.i = i;
      v.j = j;
      v.k = k;
      T.paso({
        f: "impl",
        l: L.k0,
        nota: "<code>i = 0; j = 0; k = inicio</code> → empezamos al principio de cada mitad; <code>k = " + k + "</code> es donde se escribirá el siguiente número ordenado.",
        viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      while (i < tamIzq && j < tamDer) {
        T.paso({
          f: "impl",
          l: L.w1,
          lv: 1,
          nota: "<code>while (i &lt; tamIzq &amp;&amp; j &lt; tamDer)</code> → " + i + " &lt; " + tamIzq + " y " + j + " &lt; " + tamDer + ": <b>verdadero</b>, ambas mitades aún tienen elementos.",
          viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)),
          v: Object.assign({}, v),
          pila: pilaTxt(),
        });
        c.cmp++;
        const izqMenor = izq[i] <= der[j];
        T.paso({
          f: "impl",
          l: L.cmp,
          nota: "¿<code>izquierda[" + i + "] &lt;= derecha[" + j + "]</code>? → ¿" + izq[i] + " &lt;= " + der[j] + "? <b>" + (izqMenor ? "SÍ" : "NO") + "</b>. Se toma " + (izqMenor ? "el de la izquierda (" + izq[i] + ")" : "el de la derecha (" + der[j] + ")") + (izq[i] === der[j] ? " (empate: gana la izquierda; por eso el algoritmo es <b>estable</b>)" : "") + ".",
          viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)),
          v: Object.assign({}, v),
          pila: pilaTxt(),
          etiqueta: "cmp",
          fila: { acc: "junta", inicio: inicio, fin: fin, mitad: mitad, i: i, j: j, k: k, x: izq[i], y: der[j], arr: resumen() },
        });
        if (izqMenor) {
          a[k] = izq[i];
          c.inter++;
          const m = mk();
          m[k] = "swap";
          T.paso({
            f: "impl",
            l: L.tomaI,
            nota: "<code>numeros[k] = izquierda[i]</code> → escribo <b>" + a[k] + "</b> en la posición " + k + " de <code>numeros</code>.",
            viz: viz(m, [inicio, fin], { k: k }, ex(i, j, k)),
            v: Object.assign({}, v),
            pila: pilaTxt(),
            etiqueta: "swap",
          });
          i++;
          v.i = i;
          T.paso({ f: "impl", l: L.iInc, lv: 1, nota: "<code>i++</code> → avanzo en la mitad izquierda (<code>i = " + i + "</code>).", viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt() });
        } else {
          a[k] = der[j];
          c.inter++;
          const m = mk();
          m[k] = "swap";
          T.paso({
            f: "impl",
            l: L.tomaD,
            nota: "<code>numeros[k] = derecha[j]</code> → escribo <b>" + a[k] + "</b> en la posición " + k + " de <code>numeros</code>.",
            viz: viz(m, [inicio, fin], { k: k }, ex(i, j, k)),
            v: Object.assign({}, v),
            pila: pilaTxt(),
            etiqueta: "swap",
          });
          j++;
          v.j = j;
          T.paso({ f: "impl", l: L.jInc, lv: 1, nota: "<code>j++</code> → avanzo en la mitad derecha (<code>j = " + j + "</code>).", viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt() });
        }
        k++;
        v.k = k;
        T.paso({ f: "impl", l: L.kInc, lv: 1, nota: "<code>k++</code> → el siguiente número ordenado se escribirá en la posición " + k + ".", viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt() });
      }
      T.paso({
        f: "impl",
        l: L.w1,
        lv: 1,
        nota: "<code>while (i &lt; tamIzq &amp;&amp; j &lt; tamDer)</code> → <b>falso</b>: una de las dos mitades ya se acabó. Lo que sobre de la otra ya está ordenado y solo hay que copiarlo.",
        viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      T.paso({
        f: "impl",
        l: L.w2,
        lv: 1,
        nota: i < tamIzq ? "<code>while (i &lt; tamIzq)</code> → " + i + " &lt; " + tamIzq + " <b>verdadero</b>: sobraron elementos en la izquierda; los copio tal cual." : "<code>while (i &lt; tamIzq)</code> → <b>falso</b>: la izquierda no tiene sobrantes.",
        viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      while (i < tamIzq) {
        a[k] = izq[i];
        c.inter++;
        const m = mk();
        m[k] = "swap";
        T.paso({ f: "impl", l: L.sobraI, nota: "<code>numeros[k] = izquierda[i]</code> → copio el sobrante <b>" + a[k] + "</b> a la posición " + k + ".", viz: viz(m, [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt(), etiqueta: "swap", fila: { acc: "sobra", inicio: inicio, fin: fin, mitad: mitad, i: i, j: j, k: k, x: izq[i], y: "—", arr: resumen() } });
        i++;
        k++;
        v.i = i;
        v.k = k;
        T.paso({ f: "impl", l: L.kInc2, lv: 1, nota: "<code>i++</code> y <code>k++</code> → <code>i = " + i + "</code>, <code>k = " + k + "</code>.", viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt() });
      }
      T.paso({
        f: "impl",
        l: L.w3,
        lv: 1,
        nota: j < tamDer ? "<code>while (j &lt; tamDer)</code> → " + j + " &lt; " + tamDer + " <b>verdadero</b>: sobraron elementos a la derecha; los copio." : "<code>while (j &lt; tamDer)</code> → <b>falso</b>: la derecha no tiene sobrantes.",
        viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      while (j < tamDer) {
        a[k] = der[j];
        c.inter++;
        const m = mk();
        m[k] = "swap";
        T.paso({ f: "impl", l: L.sobraD, nota: "<code>numeros[k] = derecha[j]</code> → copio el sobrante <b>" + a[k] + "</b> a la posición " + k + ".", viz: viz(m, [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt(), etiqueta: "swap", fila: { acc: "sobra", inicio: inicio, fin: fin, mitad: mitad, i: i, j: j, k: k, x: "—", y: der[j], arr: resumen() } });
        j++;
        k++;
        v.j = j;
        v.k = k;
        T.paso({ f: "impl", l: L.kInc3, lv: 1, nota: "<code>j++</code> y <code>k++</code> → <code>j = " + j + "</code>, <code>k = " + k + "</code>.", viz: viz(mk(), [inicio, fin], { k: k }, ex(i, j, k)), v: Object.assign({}, v), pila: pilaTxt() });
      }
      hechos.push([inicio, fin]);
      const mHecho = {};
      for (let q = 0; q < n; q++) mHecho[q] = q >= inicio && q <= fin ? "sorted" : "fuera";
      hechos.forEach(([x, y]) => {
        for (let q = x; q <= y; q++) if (!(q >= inicio && q <= fin)) mHecho[q] = "hechoFuera";
      });
      T.paso({
        f: "impl",
        l: L.finJ,
        nota: "Termina <b>juntar</b>: las posiciones <b>" + inicio + "–" + fin + "</b> de <code>numeros</code> quedaron <b>ordenadas</b>: " + a.slice(inicio, fin + 1).join(" ") + ". Los arreglos auxiliares desaparecen.",
        viz: viz(mHecho, [inicio, fin]),
        v: null,
        pila: pilaTxt(),
        etiqueta: "ok",
        fila: { acc: "listo", inicio: inicio, fin: fin, mitad: mitad, i: "", j: "", k: "", x: "", y: "", arr: resumen() },
      });
      pilaLl.pop();
    }

    function mezcla(inicio, fin) {
      const marco = { tipo: "mezcla", inicio, fin, mitad: null };
      pilaLl.push(marco);
      const v = { inicio, fin, mitad: "?" };
      T.paso({
        f: "impl",
        l: L.fnM,
        nota: "Entra <code>mezcla(numeros, " + inicio + ", " + fin + ")</code>: se encarga del rango <b>[" + inicio + "…" + fin + "]</b> (" + (fin - inicio + 1) + " elemento" + (fin - inicio + 1 === 1 ? "" : "s") + ").",
        viz: viz(marcasRango(inicio, fin), [inicio, fin]),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      const partir = inicio < fin;
      T.paso({
        f: "impl",
        l: L.si,
        nota: partir
          ? "¿<code>inicio &lt; fin</code>? → ¿" + inicio + " &lt; " + fin + "? <b>SÍ</b>: hay más de un elemento, hay que partir el rango."
          : "¿<code>inicio &lt; fin</code>? → ¿" + inicio + " &lt; " + fin + "? <b>NO</b>: queda un solo elemento. Es el <b>caso base</b>: un elemento solo ya está ordenado; la función regresa sin hacer nada.",
        viz: viz(marcasRango(inicio, fin), [inicio, fin]),
        v: Object.assign({}, v),
        pila: pilaTxt(),
        etiqueta: partir ? "cmp" : "ok",
      });
      if (partir) {
        const mitad = Math.floor((inicio + fin) / 2);
        marco.mitad = mitad;
        v.mitad = mitad;
        T.paso({
          f: "impl",
          l: L.mitad,
          nota: "<code>mitad = (inicio + fin) / 2</code> → (" + inicio + " + " + fin + ") / 2 = <b>" + mitad + "</b> (división entera). Partimos en <b>[" + inicio + "…" + mitad + "]</b> y <b>[" + (mitad + 1) + "…" + fin + "]</b>.",
          viz: viz(marcasRango(inicio, fin, mitad), [inicio, fin]),
          v: Object.assign({}, v),
          pila: pilaTxt(),
          fila: { acc: "divide", inicio: inicio, fin: fin, mitad: mitad, i: "", j: "", k: "", x: "", y: "", arr: resumen() },
        });
        T.paso({
          f: "impl",
          l: L.izq,
          nota: "<b>Primera llamada recursiva</b>: <code>mezcla(numeros, " + inicio + ", " + mitad + ")</code>. Esta llamada queda “en pausa” (en la pila) hasta que la mitad izquierda esté ordenada.",
          viz: viz(marcasRango(inicio, fin, mitad), [inicio, fin]),
          v: Object.assign({}, v),
          pila: pilaTxt(),
        });
        mezcla(inicio, mitad);
        T.paso({
          f: "impl",
          l: L.der,
          nota: "La izquierda ya regresó ordenada. <b>Segunda llamada recursiva</b>: <code>mezcla(numeros, " + (mitad + 1) + ", " + fin + ")</code> para la mitad derecha.",
          viz: viz(marcasRango(inicio, fin, mitad), [inicio, fin]),
          v: Object.assign({}, v),
          pila: pilaTxt(),
        });
        mezcla(mitad + 1, fin);
        T.paso({
          f: "impl",
          l: L.juntar,
          nota: "Las dos mitades regresaron ordenadas. Ahora <code>juntar(numeros, " + inicio + ", " + mitad + ", " + fin + ")</code> las mezcla en una sola.",
          viz: viz(marcasRango(inicio, fin, mitad), [inicio, fin]),
          v: Object.assign({}, v),
          pila: pilaTxt(),
        });
        juntar(inicio, mitad, fin);
      }
      T.paso({
        f: "impl",
        l: L.finM,
        lv: 1,
        nota: "Llega la llave <code>}</code>: <b>termina</b> <code>mezcla(" + inicio + ", " + fin + ")</code> y regresa a quien la llamó.",
        viz: viz(marcasRango(inicio, fin), [inicio, fin]),
        v: Object.assign({}, v),
        pila: pilaTxt(),
      });
      pilaLl.pop();
    }

    mezcla(0, n - 1);
    mainFin(T, Lm, a, { cmp: c.cmp, inter: c.inter }, PM, "Comparaciones: " + c.cmp + ", escrituras en numeros: " + c.inter + ".");
    T.resultado = a;
    T.cont = c;
    return T;
  };
  E.ord.mezcla.cols = [
    { k: "acc", label: "acción" },
    { k: "inicio", label: "inicio" },
    { k: "fin", label: "fin" },
    { k: "mitad", label: "mitad" },
    { k: "i", label: "i" },
    { k: "j", label: "j" },
    { k: "k", label: "k" },
    { k: "x", label: "izquierda[i]" },
    { k: "y", label: "derecha[j]" },
    { k: "arr", label: "arreglo después", clase: "td-arr" },
  ];
})();
