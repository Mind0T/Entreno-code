/* ============================================================
   Contenido: algoritmos de ordenamiento
   burbuja · seleccion · insercion · mezcla · comparativa
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const ui = E.ui;
  const n = ui.n;

  const SU_ARREGLO = [87, 12, 45, 3, 66, 29, 91, 7, 54, 38, -5, 73, 20, 99, 14, 61, 0, 48, 33, 82, 25, 58, 10, 77, 41, -12, 95, 19, 69, 36, 50, 2, 88, 23, 64, 12, 71, 30, 57, 9];

  const LEY = {
    burbuja: [{ c: "cmp", t: "comparando j y j+1" }, { c: "swap", t: "intercambio" }, { c: "sorted", t: "ya está en su lugar definitivo" }],
    seleccion: [{ c: "cmp", t: "comparando con el menor actual" }, { c: "min", t: "menor encontrado hasta ahora" }, { c: "swap", t: "intercambio" }, { c: "sorted", t: "zona ya ordenada" }],
    insercion: [{ c: "key", t: "actual (la carta que se inserta)" }, { c: "cmp", t: "comparando" }, { c: "swap", t: "desplazado a la derecha" }, { c: "sorted", t: "zona ordenada" }],
    mezcla: [{ c: "izq", t: "mitad izquierda" }, { c: "der", t: "mitad derecha" }, { c: "hecho", t: "ya mezclado" }, { c: "fuera", t: "fuera del tramo actual" }],
  };

  /* ---------- pestaña: prueba de escritorio con arreglo editable ---------- */
  function pestanaEscritorio(nombre, ejemploInicial) {
    return {
      titulo: "Prueba de escritorio",
      render(cont) {
        const A = E.codigoDe(nombre);
        const entrada = h("input", { type: "text", value: ejemploInicial.join(", "), "aria-label": "Arreglo a ordenar", spellcheck: "false", autocomplete: "off" });
        const aviso = h("p", { class: "aviso" }, "Escribe tus números (2 a 40, enteros) o elige un ejemplo. Con más de 12 números la animación empieza en modo «Resumido» (puedes cambiarlo abajo).");
        const jugCont = h("div");
        let jug = null;
        function ejecutar(nums) {
          const T = E.ord[nombre](nums, A);
          jug.cargar(T.pasos, "Ordenando [" + (nums.length > 14 ? nums.slice(0, 12).join(", ") + ", … (" + nums.length + " números)" : nums.join(", ")) + "]");
          jug.fijarDetalle(nums.length > 12 ? "resumido" : "fino");
        }
        function desdeTexto() {
          const r = ui.numeros(entrada.value);
          if (r.error) {
            aviso.className = "aviso aviso-err";
            aviso.textContent = r.error;
            return;
          }
          aviso.className = "aviso";
          aviso.textContent = "Listo: " + r.nums.length + " números. Usa ▶ o las flechas ← → del teclado.";
          ejecutar(r.nums);
        }
        function pon(arr) {
          entrada.value = arr.join(", ");
          desdeTexto();
        }
        const presets = h(
          "div",
          { class: "preajustes" },
          h("span", { class: "suave" }, "Ejemplos:"),
          [
            ["Corto (7)", () => pon(ejemploInicial)],
            ["Aleatorio (8)", () => pon(E.aleatorio(8, 1, 30))],
            ["Ya ordenado (7)", () => pon([1, 2, 3, 4, 5, 6, 7])],
            ["Al revés (7)", () => pon([7, 6, 5, 4, 3, 2, 1])],
            ["Con repetidos (8)", () => pon([4, 2, 4, 1, 2, 3, 1, 4])],
            ["Tu arreglo de main (40)", () => pon(SU_ARREGLO)],
          ].map(([t, f]) => h("button", { type: "button", class: "btn btn-chico", onclick: f }, t))
        );
        cont.append(
          ui.panelCtl(
            h("label", { class: "grande" }, "Arreglo (separado por comas)", entrada),
            h("button", { type: "button", class: "btn btn-azul", onclick: desdeTexto }, "Ejecutar"),
            presets,
            aviso
          )
        );
        entrada.addEventListener("keydown", (ev) => { if (ev.key === "Enter") desdeTexto(); });
        cont.append(jugCont);
        jug = E.Jugador(jugCont, {
          archivos: A,
          orden: ["dec", "impl", "main"],
          inicial: "impl",
          vista: (c) => E.vistas.barras(c, { leyenda: LEY[nombre] }),
          pilaLlamadas: true,
          tabla: { cols: E.ord[nombre].cols, titulo: "Tu prueba de escritorio (como la harías en papel)" },
        });
        ejecutar(ejemploInicial);
      },
    };
  }

  /* ---------- anotaciones comunes (declaracion, main, imprimirArreglo) ---------- */
  function anotComunes(fn, tituloMain, llamada) {
    return {
      dec: [
        { f: "dec", ln: "#define TAM_ARREGLO 40", t: "Una constante para el tamaño|<code>#define</code> es una instrucción del <b>preprocesador</b>: antes de compilar, reemplaza cada <code>TAM_ARREGLO</code> por <code>40</code>. No ocupa memoria ni es una variable; es un “buscar y reemplazar”. Si algún día quieres 100 números, cambias un solo lugar." },
        { f: "dec", ln: "void " + fn + "(", t: "Prototipo de <code>" + fn + "</code>|El prototipo le <b>avisa al compilador</b> que existe esta función (qué recibe y qué devuelve) para que <code>main</code> pueda llamarla aunque su cuerpo esté en otro archivo (<code>implementacion_…c</code>). Es el contrato: “recibo un arreglo de enteros y su tamaño, no devuelvo nada”." },
        { f: "dec", ln: "void imprimirArreglo(", t: "Prototipo de <code>imprimirArreglo</code>|Otra función del mismo módulo. Se separa de " + fn + " para que cada función haga una sola cosa: ordenar <i>o</i> imprimir." },
      ],
      main: [
        { f: "main", ln: "int numeros[TAM_ARREGLO]", t: "El arreglo vive en <code>main</code>|Se reservan 40 enteros <b>seguidos</b> en el stack de <code>main</code> (40 × 4 bytes = 160 bytes) y se llenan con la lista entre llaves. El nombre <code>numeros</code>, cuando lo pasas a una función, se convierte en la <b>dirección del primer elemento</b>." },
        { f: "main", ln: "imprimirArreglo(numeros, TAM_ARREGLO);", nth: 1, t: "Se imprime el arreglo original|Primero lo mostramos desordenado para poder comparar el antes y el después." },
        { f: "main", ln: llamada, t: "Se llama al algoritmo|Pasamos <code>numeros</code> (la dirección, <b>no una copia</b>) y el tamaño. Por eso, cuando la función regrese, <code>main</code> verá el arreglo ya ordenado: se modificó el original." },
        { f: "main", ln: "imprimirArreglo(numeros, TAM_ARREGLO);", nth: 2, t: "Se imprime el resultado|Misma función, otro momento: ahora el arreglo está ordenado de menor a mayor." },
        { f: "main", ln: "return 0;", t: "Fin del programa|<code>return 0</code> le dice al sistema operativo “todo salió bien”." },
      ],
      impl: [
        { f: "impl", ln: "void imprimirArreglo(int numeros[], int tam) {", t: "<code>imprimirArreglo</code>|Recorre el arreglo con un <code>for</code> y lo muestra en una línea. No modifica nada." },
        { f: "impl", ln: 'printf("%d ", numeros[i]);', t: "Imprimir un elemento|<code>%d</code> es el “hueco” donde <code>printf</code> pone un entero; después del número va un espacio para separar." },
      ],
    };
  }
  const todas = (comunes, propias) => [].concat(comunes.dec, propias, comunes.impl, comunes.main);

  /* ====================================================================
     BURBUJA
     ==================================================================== */
  const comB = anotComunes("burbuja", "", "burbuja(numeros, TAM_ARREGLO);");
  const anotBurbuja = todas(comB, [
    { f: "impl", ln: "void burbuja(int numeros[], int tam) {", t: "La función recibe la dirección del arreglo|<code>int numeros[]</code> en un parámetro es en realidad un <b>apuntador</b> al primer elemento. Por eso la función puede cambiar el arreglo de <code>main</code>. El tamaño <code>tam</code> se pasa aparte porque dentro de la función no hay manera de saber cuántos elementos hay." },
    { f: "impl", ln: "int i, j, aux;", t: "Tres variables locales|<code>i</code> cuenta las <b>pasadas</b>, <code>j</code> recorre los vecinos dentro de una pasada y <code>aux</code> es la “manita libre” para intercambiar dos valores sin perder ninguno." },
    { f: "impl", ln: "for (i = 0; i < tam - 1; i++) {", t: "Ciclo externo: las pasadas|Se necesitan como máximo <b>tam − 1</b> pasadas: cuando ya acomodaste los tam − 1 mayores, el último elemento queda solo y ya está en su lugar. Con 40 números son 39 pasadas." },
    { f: "impl", ln: "for (j = 0; j < tam - 1 - i; j++) {", t: "Ciclo interno: recorrer a los vecinos|En cada pasada se comparan pares <code>(j, j+1)</code>. El límite <code>tam − 1 − i</code> tiene dos razones: el <b>−1</b> evita que <code>j+1</code> se salga del arreglo, y el <b>−i</b> evita revisar la cola que ya quedó ordenada (después de <code>i</code> pasadas, los últimos <code>i</code> ya son los mayores)." },
    { f: "impl", ln: "if (numeros[j] > numeros[j + 1]) {", t: "La comparación|Si el de la izquierda es <b>mayor estricto</b> que el de la derecha, están “al revés” y hay que intercambiarlos. Como es <code>&gt;</code> y no <code>&gt;=</code>, dos números iguales <b>no</b> se intercambian: el algoritmo es <b>estable</b>." },
    { f: "impl", ln: "aux = numeros[j];", t: "Intercambio, paso 1/3|Se guarda en <code>aux</code> una copia del de la izquierda. Si no lo guardáramos, el siguiente paso lo pisaría y se perdería." },
    { f: "impl", ln: "numeros[j] = numeros[j + 1];", t: "Intercambio, paso 2/3|El de la derecha se copia a la izquierda. Ahora los dos lugares valen lo mismo… por un instante." },
    { f: "impl", ln: "numeros[j + 1] = aux;", t: "Intercambio, paso 3/3|Se escribe en la derecha el valor que guardamos en <code>aux</code>. Listo: los dos cambiaron de lugar. El mayor “burbujea” un lugar hacia la derecha." },
  ]);

  const htmlBurbuja = () => `
    <h2>La idea en una frase</h2>
    <p><b>Burbuja</b> (<i>Bubble Sort</i>) recorre el arreglo comparando <mark>solo vecinos</mark>: si el de la izquierda es mayor que el de la derecha, los intercambia. Al terminar cada pasada, el número más grande que quedaba sin acomodar “sube como burbuja” hasta su lugar final, al fondo.</p>
    ${n("idea", "Imagina una fila", "<p>Una fila de personas que quieres formar de menor a mayor estatura, pero con una regla: <b>solo puedes comparar a dos personas que están una junto a la otra</b>. Empiezas por la izquierda: si la primera es más alta que la segunda, se cambian. Sigues con la segunda y la tercera, y así hasta el final. El más alto de todos habrá ido pasando de mano en mano hasta quedar al final de la fila.</p>")}
    <h2>Míralo una pasada a la vez</h2>
    <p>Aquí tienes un arreglo de 4 números. Presiona <b>Siguiente</b> y fíjate en los colores: <mark>amarillo/ámbar</mark> = se están comparando, <b>morado</b> = se intercambian, <b>verde</b> = ya quedó en su lugar definitivo.</p>
    <div data-demo="pasada"></div>
    <h2>Cómo funciona tu código</h2>
    <p>Son dos ciclos <code>for</code> uno dentro del otro:</p>
    <ul>
      <li><b>El ciclo de afuera (<code>i</code>)</b> cuenta las pasadas. Cada pasada deja <i>un</i> número más en su lugar definitivo, empezando por el mayor.</li>
      <li><b>El ciclo de adentro (<code>j</code>)</b> camina por el arreglo comparando <code>numeros[j]</code> con <code>numeros[j + 1]</code>.</li>
      <li>Como el final ya está ordenado después de cada pasada, el ciclo interno se acorta: <code>j &lt; tam - 1 - i</code>.</li>
    </ul>
    <p>El intercambio necesita <b>tres pasos</b> y una variable auxiliar. Si escribieras solo <code>numeros[j] = numeros[j+1]; numeros[j+1] = numeros[j];</code> los dos lugares terminarían con el mismo valor, porque el primero se perdió.</p>
    ${n("tip", "Dónde seguir", "<p>En la pestaña <b>Código explicado</b> hay una nota por cada línea de tu archivo. En <b>Prueba de escritorio</b> puedes ver, con tus propios números, cómo cambian <code>i</code>, <code>j</code> y <code>aux</code> en cada paso.</p>")}
    <h2>¿Cuánto trabajo hace?</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Concepto</th><th>Tu versión</th><th>Por qué</th></tr>
      <tr><td>Comparaciones</td><td class="num">n(n−1)/2 siempre</td><td>Los dos ciclos no se detienen aunque el arreglo ya esté ordenado.</td></tr>
      <tr><td>Intercambios (mejor)</td><td class="num">0</td><td>Si ya está ordenado, nunca entra al <code>if</code>.</td></tr>
      <tr><td>Intercambios (peor)</td><td class="num">n(n−1)/2</td><td>Si está al revés, cada comparación termina en intercambio.</td></tr>
      <tr><td>Tiempo</td><td class="num">O(n²)</td><td>Dos ciclos anidados que dependen de n.</td></tr>
      <tr><td>Memoria extra</td><td class="num">O(1)</td><td>Solo <code>i</code>, <code>j</code> y <code>aux</code>: ordena <i>en el lugar</i>.</td></tr>
      <tr><td>¿Estable?</td><td>Sí</td><td>Usa <code>&gt;</code> estricto: los iguales no se cruzan.</td></tr>
    </table></div>
    <div data-demo="cuentas"></div>
    <h2>Errores típicos</h2>
    <ul>
      <li><b>Límite <code>j &lt; tam - i</code></b> (sin el −1): en la primera pasada <code>j + 1</code> llegaría a <code>tam</code>, y <code>numeros[tam]</code> está <i>fuera del arreglo</i>. C no avisa: lee basura.</li>
      <li><b>Olvidar <code>aux</code></b>: se pierde un valor y se duplica otro.</li>
      <li><b>Usar <code>&gt;=</code></b>: funciona, pero hace intercambios inútiles entre iguales y deja de ser estable.</li>
    </ul>
    ${n("idea", "Reto para ti", "<p>Tu versión hace las 780 comparaciones aunque el arreglo ya esté ordenado. Agrega una variable <code>int huboCambio</code> que valga 0 al empezar cada pasada y 1 cuando se intercambie algo; si al terminar la pasada sigue en 0, haz <code>break</code>. Con eso, un arreglo ya ordenado se resuelve en <b>una sola pasada</b> (O(n)).</p>")}
    <h2>¿Cuándo se usa?</h2>
    <p>Casi nunca en programas reales (hay algoritmos mucho mejores), pero es perfecta para <b>entender</b> cómo se ordena con comparaciones e intercambios, y es muy común en exámenes.</p>
  `;

  const quizBurbuja = [
    { p: "Después de la <b>primera pasada completa</b> de burbuja, ¿qué se garantiza?", op: ["El menor quedó en la posición 0", "El mayor quedó en la última posición", "El arreglo quedó ordenado", "Nada, depende del arreglo"], ok: 1, porque: "El mayor va siendo “arrastrado” por cada intercambio hacia la derecha, hasta que ya no encuentra a nadie mayor que él. Por eso, tras cada pasada, un elemento más queda fijo al final." },
    { p: "Con un arreglo de <b>6</b> elementos, ¿cuántas comparaciones hace <i>tu</i> versión de burbuja (sin bandera de parada)?", op: ["5", "15", "30", "36"], ok: 1, porque: "Son 5 + 4 + 3 + 2 + 1 = 15, o sea n(n−1)/2 = 6·5/2. Siempre las mismas, esté o no ordenado el arreglo." },
    { p: "¿Qué pasa si cambias el ciclo interno a <code>j &lt; tam - i</code>?", op: ["Nada, es equivalente", "Se ordena al revés", "En la primera pasada se lee numeros[tam], fuera del arreglo", "Se hacen menos comparaciones y es más rápido"], ok: 2, porque: "Cuando i = 0, j llega a tam − 1 y la comparación usa numeros[j + 1] = numeros[tam], una posición que no existe. En C eso es comportamiento indefinido: puede leer basura o fallar." },
    { p: "El arreglo ya está ordenado: <code>{1, 2, 3, 4}</code>. ¿Cuántos <b>intercambios</b> hace tu burbuja?", op: ["0", "3", "6", "4"], ok: 0, porque: "Nunca se cumple numeros[j] > numeros[j+1], así que no entra al if. Eso sí: igual hace sus 6 comparaciones." },
    { p: "¿Por qué burbuja es <b>estable</b> en tu código?", op: ["Porque usa una variable auxiliar", "Porque compara con > y no con >=, así los iguales no se cruzan", "Porque recorre de izquierda a derecha", "No es estable"], ok: 1, porque: "Estable significa que dos elementos iguales conservan su orden original. Al no intercambiar cuando son iguales, nunca se adelantan entre sí." },
  ];

  /* ====================================================================
     SELECCION
     ==================================================================== */
  const comS = anotComunes("seleccion", "", "seleccion(numeros, TAM_ARREGLO);");
  const anotSeleccion = todas(comS, [
    { f: "impl", ln: "void seleccion(int numeros[], int tam) {", t: "Recibe la dirección del arreglo|Igual que en burbuja: <code>numeros[]</code> es un apuntador al primer elemento, así que lo que cambies aquí cambia el arreglo de <code>main</code>." },
    { f: "impl", ln: "int i, j, menor, aux;", t: "Cuatro variables|<code>i</code>: la posición que estamos llenando. <code>j</code>: el que explora. <code>menor</code>: el <b>índice</b> (no el valor) del menor encontrado. <code>aux</code>: para el intercambio." },
    { f: "impl", ln: "for (i = 0; i < tam - 1; i++) {", t: "Ciclo externo: llenar posiciones|En la vuelta <code>i</code> decidimos quién va en la posición <code>i</code>. Basta llegar a <code>tam − 2</code>: cuando solo queda un elemento sin acomodar, ya está en su lugar." },
    { f: "impl", ln: "menor = i;", t: "Primer candidato|Empezamos suponiendo que el menor es el que ya está en la posición <code>i</code>. Guardamos su <b>posición</b>, no su valor, porque la necesitaremos para intercambiar." },
    { f: "impl", ln: "for (j = i + 1; j < tam; j++) {", t: "Buscar en lo que falta|<code>j</code> empieza en <code>i + 1</code> y recorre hasta el final: los que están antes de <code>i</code> ya están ordenados y no se tocan." },
    { f: "impl", ln: "if (numeros[j] < numeros[menor]) {", t: "¿Encontré uno menor?|Se compara contra <code>numeros[menor]</code> (el mejor candidato <i>hasta ahora</i>), no contra <code>numeros[i]</code>." },
    { f: "impl", ln: "menor = j;", t: "Nuevo candidato|Solo se anota el índice. <b>Todavía no se mueve nada</b>: eso es lo que distingue a selección de burbuja." },
    { f: "impl", ln: "aux = numeros[i];", t: "Un solo intercambio por vuelta, paso 1/3|Terminada la búsqueda, se guarda lo que hay en la posición <code>i</code>." },
    { f: "impl", ln: "numeros[i] = numeros[menor];", t: "Intercambio, paso 2/3|El menor encontrado se coloca en la posición <code>i</code>: ahora esa posición ya es <b>definitiva</b>." },
    { f: "impl", ln: "numeros[menor] = aux;", t: "Intercambio, paso 3/3|Lo que estaba en <code>i</code> se manda al hueco que dejó el menor. Si <code>menor == i</code> el intercambio no cambia nada (es inofensivo)." },
  ]);
  const htmlSeleccion = () => `
    <h2>La idea en una frase</h2>
    <p><b>Selección</b> (<i>Selection Sort</i>) hace esto: <mark>busca el menor de todos y lo manda al principio</mark>; luego busca el menor de los que quedan y lo pone en segundo lugar; y así sucesivamente. Cada vuelta fija una posición para siempre.</p>
    ${n("idea", "Imagina una fila", "<p>Tienes a todos desordenados. Recorres con la mirada <b>toda</b> la fila, identificas a la persona más baja y la mandas al primer lugar (intercambiándola con quien estaba ahí). Después ignoras ese primer lugar y repites con el resto.</p>")}
    <h2>Míralo en acción</h2>
    <p>El marcador rojo <b>menor</b> muestra a la persona más baja encontrada <i>hasta ahora</i>. Ojo: durante la búsqueda no se mueve nada; solo al final de cada vuelta hay <b>un</b> intercambio.</p>
    <div data-demo="pasada"></div>
    <h2>Cómo funciona tu código</h2>
    <ul>
      <li><code>i</code> es la posición que estamos llenando ahora.</li>
      <li><code>menor</code> guarda el <b>índice</b> del más pequeño visto en esta vuelta (empieza siendo <code>i</code>).</li>
      <li><code>j</code> recorre todo lo que queda a la derecha de <code>i</code>; si encuentra uno menor, actualiza <code>menor</code>.</li>
      <li>Al terminar de recorrer, se intercambia <code>numeros[i]</code> con <code>numeros[menor]</code>.</li>
    </ul>
    <h2>Burbuja vs. selección</h2>
    <div class="dos-col">
      <div class="tarjeta"><h3>Burbuja</h3><p>Muchos intercambios pequeños entre vecinos. En tu arreglo de 40: <b>394</b> intercambios.</p></div>
      <div class="tarjeta"><h3>Selección</h3><p>Muchas comparaciones, pero <b>como máximo n − 1 intercambios</b>. En tu arreglo de 40: <b>39</b>. Es útil cuando escribir en memoria es caro.</p></div>
    </div>
    <h2>¿Cuánto trabajo hace?</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Concepto</th><th>Selección</th><th>Por qué</th></tr>
      <tr><td>Comparaciones</td><td class="num">n(n−1)/2 siempre</td><td>Para encontrar el menor debe revisar <i>todo</i> lo que falta, haya o no suerte.</td></tr>
      <tr><td>Intercambios</td><td class="num">n − 1 (máximo)</td><td>Uno por vuelta, sin importar el orden inicial.</td></tr>
      <tr><td>Tiempo</td><td class="num">O(n²)</td><td>Mejor, promedio y peor caso son iguales.</td></tr>
      <tr><td>Memoria extra</td><td class="num">O(1)</td><td>Ordena en el lugar.</td></tr>
      <tr><td>¿Estable?</td><td>No</td><td>Al intercambiar saltándose posiciones puede cruzar dos iguales.</td></tr>
    </table></div>
    ${n("ojo", "¿Por qué no es estable?", "<p>Mira <code>{ 3<sub>a</sub>, 3<sub>b</sub>, 1 }</code>. En la vuelta 0 el menor es el 1 (posición 2) y se intercambia con el 3<sub>a</sub>: queda <code>{ 1, 3<sub>b</sub>, 3<sub>a</sub> }</code>. Los dos treses <b>invirtieron su orden relativo</b>. Con números enteros sueltos no se nota, pero con registros (por ejemplo alumnos con la misma calificación) sí importa.</p>")}
    <div data-demo="cuentas"></div>
    <h2>Errores típicos</h2>
    <ul>
      <li>Guardar el <b>valor</b> del menor en lugar de su <b>índice</b>: ya no sabrías en qué posición está para intercambiarlo.</li>
      <li>Empezar <code>j</code> en <code>i</code> en vez de <code>i + 1</code>: funciona, pero compara a <code>numeros[i]</code> consigo mismo.</li>
      <li>Intercambiar <i>dentro</i> del ciclo de <code>j</code>: se convierte en otro algoritmo y hace muchos más intercambios.</li>
    </ul>
  `;
  const quizSeleccion = [
    { p: "En selección, ¿cuántos <b>intercambios</b> hace como máximo con n elementos?", op: ["n(n−1)/2", "n − 1", "n", "log n"], ok: 1, porque: "Hay un intercambio por cada vuelta del ciclo externo y ese ciclo da n − 1 vueltas." },
    { p: "¿Qué guarda la variable <code>menor</code>?", op: ["El valor más pequeño encontrado", "El índice (posición) del más pequeño encontrado", "La cantidad de elementos menores", "El último valor comparado"], ok: 1, porque: "Guarda la posición. Con el índice puedes leer el valor (numeros[menor]) <i>y</i> saber con quién intercambiar." },
    { p: "Con 7 elementos, ¿cuántas comparaciones hace selección?", op: ["6", "21", "28", "49"], ok: 1, porque: "6 + 5 + 4 + 3 + 2 + 1 = 21 = 7·6/2. Siempre las mismas, aunque el arreglo ya esté ordenado." },
    { p: "El arreglo es <code>{ 5, 5, 1 }</code> con los cincos distinguibles (5ᵃ, 5ᵇ). Después de ordenar con tu selección, ¿en qué orden quedan?", op: ["1, 5ᵃ, 5ᵇ", "1, 5ᵇ, 5ᵃ", "5ᵃ, 5ᵇ, 1", "Depende del compilador"], ok: 1, porque: "En la vuelta 0 el 1 se intercambia con 5ᵃ: queda {1, 5ᵇ, 5ᵃ}. En la vuelta 1 no hay nada menor y no cambia. Los cincos se invirtieron: no es estable." },
    { p: "¿Cuándo conviene elegir selección frente a burbuja?", op: ["Nunca, es igual", "Cuando mover datos es muy caro (pocos intercambios)", "Cuando el arreglo está casi ordenado", "Cuando hay muchos repetidos"], ok: 1, porque: "Selección hace muy pocos intercambios (máximo n − 1). Si cada escritura cuesta mucho (por ejemplo memoria flash), eso importa." },
  ];

  /* ====================================================================
     INSERCION
     ==================================================================== */
  const comI = anotComunes("insercion", "", "insercion(numeros, TAM_ARREGLO);");
  const anotInsercion = todas(comI, [
    { f: "impl", ln: "void insercion(int numeros[], int tam) {", t: "Recibe la dirección del arreglo|Igual que los demás: el arreglo no se copia, se trabaja sobre el original." },
    { f: "impl", ln: "int i, j, actual;", t: "Tres variables|<code>i</code>: el elemento que vamos a insertar. <code>actual</code>: copia de ese elemento (la “carta en la mano”). <code>j</code>: camina hacia la izquierda buscando su lugar." },
    { f: "impl", ln: "for (i = 1; i < tam; i++) {", t: "Empieza en 1, no en 0|Un solo elemento (el de la posición 0) ya es una “zona ordenada” de tamaño 1. Por eso el primero que hay que insertar es el de la posición 1." },
    { f: "impl", ln: "actual = numeros[i];", t: "Levantar la carta|Se guarda el valor porque su lugar va a ser <b>pisado</b> cuando desplacemos a los mayores hacia la derecha." },
    { f: "impl", ln: "j = i - 1;", t: "Empezar justo a la izquierda|<code>j</code> apunta al último de la zona ordenada: el primero con quien se compara <code>actual</code>." },
    { f: "impl", ln: "while (j >= 0 && numeros[j] > actual) {", t: "Mientras haya alguien mayor a la izquierda|Dos condiciones unidas con <code>&amp;&amp;</code>. <b>El orden importa</b>: C evalúa de izquierda a derecha y se detiene si la primera es falsa (<i>evaluación en cortocircuito</i>). Así, cuando <code>j</code> vale −1, nunca se llega a leer <code>numeros[-1]</code>, que estaría fuera del arreglo." },
    { f: "impl", ln: "numeros[j + 1] = numeros[j];", t: "Desplazar un lugar a la derecha|No es un intercambio: el mayor simplemente se <b>copia</b> un lugar adelante, tapando el hueco de <code>actual</code>. Es 1 escritura en vez de las 3 de un intercambio." },
    { f: "impl", ln: "j--;", t: "Seguir hacia la izquierda|Se mira al siguiente de la zona ordenada." },
    { f: "impl", ln: "numeros[j + 1] = actual;", t: "Soltar la carta en su lugar|Al salir del <code>while</code>, <code>j + 1</code> es exactamente el hueco donde <code>actual</code> debe ir: a su izquierda hay alguien menor o igual (o nadie)." },
  ]);
  const htmlInsercion = () => `
    <h2>La idea en una frase</h2>
    <p><b>Inserción</b> (<i>Insertion Sort</i>) mantiene a la izquierda una <mark>zona ya ordenada</mark> que va creciendo. En cada vuelta toma el siguiente elemento y lo <b>desliza hacia la izquierda</b> hasta encontrar su lugar dentro de esa zona.</p>
    ${n("idea", "Como cartas en la mano", "<p>Cuando juegas cartas, las ordenas así: tomas una carta nueva, la comparas con las que ya tienes ordenadas (de derecha a izquierda), recorres las mayores un lugar para hacerle espacio y la metes en el hueco. Eso es <b>exactamente</b> este algoritmo.</p>")}
    <h2>Míralo en acción</h2>
    <p>La carta <b>actual</b> aparece en el recuadro de arriba a la izquierda y en cian. Las barras verdes son la zona ordenada. Fíjate que las barras mayores se <i>corren</i> un lugar a la derecha para hacer hueco.</p>
    <div data-demo="pasada"></div>
    <h2>Cómo funciona tu código</h2>
    <ol>
      <li><code>i</code> empieza en 1 (el elemento 0 ya es una zona ordenada de uno).</li>
      <li>Se guarda <code>actual = numeros[i]</code> y <code>j</code> apunta al elemento de su izquierda.</li>
      <li>Mientras <code>j</code> no se salga y <code>numeros[j] &gt; actual</code>, ese mayor se <b>copia un lugar a la derecha</b> y <code>j</code> retrocede.</li>
      <li>Al terminar, <code>actual</code> se escribe en <code>numeros[j + 1]</code>: su lugar.</li>
    </ol>
    ${n("tip", "Desplazar ≠ intercambiar", "<p>Burbuja intercambia (3 asignaciones por movimiento). Inserción <b>desplaza</b> (1 asignación por movimiento) y solo escribe <code>actual</code> una vez al final. Por eso, aunque hacen un número parecido de movimientos, inserción trabaja menos.</p>")}
    <h2>¿Cuánto trabajo hace?</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Concepto</th><th>Inserción</th><th>Por qué</th></tr>
      <tr><td>Mejor caso (ya ordenado)</td><td class="num">n − 1 comparaciones · O(n)</td><td>El <code>while</code> falla de inmediato en cada vuelta: nadie es mayor que <code>actual</code>.</td></tr>
      <tr><td>Peor caso (al revés)</td><td class="num">n(n−1)/2 · O(n²)</td><td>Cada elemento recorre toda la zona ordenada.</td></tr>
      <tr><td>Memoria extra</td><td class="num">O(1)</td><td>Ordena en el lugar.</td></tr>
      <tr><td>¿Estable?</td><td>Sí</td><td>El <code>&gt;</code> estricto detiene el desplazamiento ante un igual.</td></tr>
      <tr><td>¿Adaptativo?</td><td>Sí</td><td>Entre más ordenado venga el arreglo, menos trabajo hace.</td></tr>
    </table></div>
    <div data-demo="cuentas"></div>
    ${n("idea", "Por qué importa", "<p>Inserción es lo mejor para arreglos <b>pequeños</b> o <b>casi ordenados</b>. Muchas implementaciones profesionales de algoritmos rápidos (como los de las bibliotecas estándar) cambian a inserción cuando el trozo a ordenar es de unas pocas decenas de elementos.</p>")}
    <h2>Errores típicos</h2>
    <ul>
      <li>Invertir las condiciones: <code>numeros[j] &gt; actual &amp;&amp; j &gt;= 0</code> lee <code>numeros[-1]</code> cuando <code>j</code> vale −1.</li>
      <li>Olvidar guardar <code>actual</code>: al desplazar, el valor se pisa y se pierde.</li>
      <li>Escribir <code>numeros[j] = actual</code> al final (sin el +1): <code>j</code> ya pasó un lugar de más.</li>
    </ul>
  `;
  const quizInsercion = [
    { p: "¿Por qué el ciclo externo de inserción empieza en <code>i = 1</code> y no en 0?", op: ["Para ahorrar una vuelta por tontería", "Porque un solo elemento (el 0) ya es una zona ordenada", "Porque el elemento 0 es el menor", "Porque numeros[-1] no existe"], ok: 1, porque: "Con un solo elemento no hay nada que ordenar; la zona ordenada inicial es {numeros[0]} y se empieza insertando desde el elemento 1." },
    { p: "En <code>while (j &gt;= 0 &amp;&amp; numeros[j] &gt; actual)</code>, ¿por qué <code>j &gt;= 0</code> va <b>primero</b>?", op: ["Es solo estilo", "Para que si j vale −1 no se evalúe numeros[j] (fuera del arreglo)", "Porque && evalúa de derecha a izquierda", "Para que sea más rápido en todos los casos"], ok: 1, porque: "&& evalúa de izquierda a derecha y se detiene en cuanto una condición es falsa (cortocircuito). Si j es −1, la primera condición ya falló y numeros[-1] nunca se lee." },
    { p: "El arreglo ya está ordenado y tiene <b>n</b> elementos. ¿Cuántas comparaciones hace inserción?", op: ["n(n−1)/2", "n − 1", "n²", "0"], ok: 1, porque: "En cada vuelta del for externo (n − 1 vueltas) el while compara una sola vez y falla. Por eso es O(n) en este caso." },
    { p: "¿Cuál es la diferencia clave entre el movimiento de inserción y el de burbuja?", op: ["Inserción desplaza (1 escritura); burbuja intercambia (3)", "Ninguna", "Inserción usa recursión", "Burbuja no usa variables auxiliares"], ok: 0, porque: "Desplazar solo copia el mayor un lugar a la derecha; la carta actual se escribe una sola vez al final. Intercambiar requiere guardar en aux y hacer tres asignaciones." },
    { p: "Al terminar el while, ¿en qué posición se escribe <code>actual</code>?", op: ["numeros[j]", "numeros[j + 1]", "numeros[i]", "numeros[j − 1]"], ok: 1, porque: "j se quedó en el primer elemento que NO es mayor que actual (o en −1). El hueco está justo a su derecha: j + 1." },
  ];

  /* ====================================================================
     MEZCLA
     ==================================================================== */
  const comM = anotComunes("mezcla", "", "mezcla(numeros, 0, TAM_ARREGLO - 1);");
  comM.dec[1] = { f: "dec", ln: "void mezcla(int numeros[], int inicio, int fin);", t: "Prototipo de <code>mezcla</code>|Recibe el arreglo y el <b>tramo</b> que debe ordenar: de <code>inicio</code> a <code>fin</code> (inclusive). Esos dos números son los que permiten dividir el problema." };
  comM.dec.splice(2, 0, { f: "dec", ln: "void juntar(int numeros[], int inicio, int mitad, int fin);", t: "Prototipo de <code>juntar</code>|La función que hace el trabajo de verdad: combina dos mitades que <b>ya están ordenadas</b> en un tramo ordenado." });
  const anotMezcla = todas(comM, [
    { f: "impl", ln: "void mezcla(int numeros[], int inicio, int fin) {", t: "La función recursiva|Se llama a sí misma con trozos cada vez más pequeños. Cada llamada ordena el tramo <code>[inicio, fin]</code>." },
    { f: "impl", ln: "int mitad;", t: "Dónde partir|Guardará el índice donde se corta el tramo en dos." },
    { f: "impl", ln: "if (inicio < fin) {", t: "Caso base|Si <code>inicio ≥ fin</code> el tramo tiene 0 o 1 elementos: <b>ya está ordenado</b> y no se hace nada. Sin este <code>if</code> la recursión no pararía nunca (desbordamiento de pila)." },
    { f: "impl", ln: "mitad = (inicio + fin) / 2;", t: "Partir por la mitad|División <b>entera</b>: por ejemplo (0 + 5) / 2 = 2 (se descarta el .5). La mitad izquierda es <code>[inicio, mitad]</code> y la derecha <code>[mitad + 1, fin]</code>." },
    { f: "impl", ln: "mezcla(numeros, inicio, mitad);", t: "Ordenar la mitad izquierda|Llamada recursiva. No avanza a la siguiente línea hasta que <b>toda</b> la mitad izquierda esté ordenada (y eso incluye todas las llamadas que ella haga)." },
    { f: "impl", ln: "mezcla(numeros, mitad + 1, fin);", t: "Ordenar la mitad derecha|Igual, con el otro pedazo. Cuando regrese, las dos mitades ya están ordenadas por separado." },
    { f: "impl", ln: "juntar(numeros, inicio, mitad, fin);", t: "Mezclar las dos mitades|Aquí ocurre la magia: dos mitades ordenadas se fusionan en una sola ordenada. Esta línea se ejecuta “de regreso” de la recursión, de los trozos pequeños a los grandes." },
    { f: "impl", ln: "void juntar(int numeros[], int inicio, int mitad, int fin) {", t: "<code>juntar</code>: fusionar|Recibe un tramo cuyas dos mitades ya están ordenadas y las combina." },
    { f: "impl", ln: "int izquierda[TAM_ARREGLO];", t: "Arreglos temporales (copias)|Son variables locales: viven en el stack mientras dura <code>juntar</code>. Cada llamada reserva 2 × 40 enteros = 320 bytes. Es la <b>memoria extra</b> de mezcla. (Por eso este código solo sirve hasta 40 elementos: más desbordaría estos arreglos.)" },
    { f: "impl", ln: "int tamIzq = mitad - inicio + 1;", t: "Tamaño de cada mitad|Izquierda: de <code>inicio</code> a <code>mitad</code> (inclusive, por eso el +1). Derecha: de <code>mitad + 1</code> a <code>fin</code>." },
    { f: "impl", ln: "for (i = 0; i < tamIzq; i++) {", t: "Copiar la mitad izquierda|Se copia a <code>izquierda[]</code> para no perder los datos cuando empecemos a sobrescribir <code>numeros</code>." },
    { f: "impl", ln: "for (j = 0; j < tamDer; j++) {", t: "Copiar la mitad derecha|Lo mismo con la otra mitad." },
    { f: "impl", ln: "k = inicio;", t: "Dónde escribir|<code>k</code> es la posición de <code>numeros</code> que se va llenando; arranca al inicio del tramo. <code>i</code> y <code>j</code> se reinician en 0: apuntan al primer elemento de cada copia." },
    { f: "impl", ln: "while (i < tamIzq && j < tamDer) {", t: "Mientras haya elementos en ambas copias|Se comparan los dos “frentes” de las filas." },
    { f: "impl", ln: "if (izquierda[i] <= derecha[j]) {", t: "Elegir el menor de los dos frentes|Como ambas copias están ordenadas, el menor de todo lo que falta es uno de los dos frentes. El <code>&lt;=</code> (con igual) hace que, en empate, salga primero el de la izquierda: eso hace a mezcla <b>estable</b>." },
    { f: "impl", ln: "numeros[k] = izquierda[i];", t: "Gana el de la izquierda|Se escribe en <code>numeros</code> y se avanza <code>i</code> en la copia izquierda." },
    { f: "impl", ln: "numeros[k] = derecha[j];", t: "Gana el de la derecha|Se escribe en <code>numeros</code> y se avanza <code>j</code>." },
    { f: "impl", ln: "while (i < tamIzq) {", t: "Sobras de la izquierda|Si la derecha se acabó primero, lo que queda de la izquierda ya es mayor que todo lo escrito y está ordenado: se copia tal cual." },
    { f: "impl", ln: "while (j < tamDer) {", t: "Sobras de la derecha|Lo mismo, si la que sobró es la derecha. Solo uno de estos dos <code>while</code> hará algo." },
  ]);

  /* arbol de llamadas de mezcla (SVG) */
  function dibujarArbol(cont, N) {
    const nodos = [];
    let contador = 0;
    function rec(ini, fin, nivel) {
      const nodo = { ini, fin, nivel, hijos: [], orden: null };
      nodos.push(nodo);
      if (ini < fin) {
        const m = Math.floor((ini + fin) / 2);
        nodo.hijos.push(rec(ini, m, nivel + 1), rec(m + 1, fin, nivel + 1));
        nodo.orden = ++contador; // orden en que se ejecuta juntar
      }
      return nodo;
    }
    const raizN = rec(0, N - 1, 0);
    const niveles = Math.max(...nodos.map((x) => x.nivel)) + 1;
    const W = 760;
    const CW = (W - 20) / N;
    const alto = 46;
    const H = niveles * 78 + 20;
    const svg = E.svg("svg", { viewBox: "0 0 " + W + " " + H, class: "arbol-mezcla", role: "img", "aria-label": "Árbol de llamadas de mezcla para " + N + " elementos", style: { width: "100%", height: "auto", fontFamily: "var(--f-mono)" } });
    function pos(nd) {
      const x1 = 10 + nd.ini * CW + 3;
      const x2 = 10 + (nd.fin + 1) * CW - 3;
      return { x: x1, w: x2 - x1, y: 10 + nd.nivel * 78 };
    }
    nodos.forEach((nd) => {
      const p = pos(nd);
      nd.hijos.forEach((hj) => {
        const q = pos(hj);
        svg.append(E.svg("path", { d: "M" + (p.x + p.w / 2) + " " + (p.y + alto) + " L" + (q.x + q.w / 2) + " " + q.y, stroke: "var(--tinta2)", "stroke-width": 1.5, fill: "none" }));
      });
    });
    nodos.forEach((nd) => {
      const p = pos(nd);
      const hoja = nd.ini === nd.fin;
      svg.append(E.svg("rect", { x: p.x, y: p.y, width: p.w, height: alto, rx: 8, fill: hoja ? "var(--verde-bg)" : "var(--azul-bg)", stroke: hoja ? "var(--verde)" : "var(--azul)", "stroke-width": 2 }));
      svg.append(E.svg("text", { x: p.x + p.w / 2, y: p.y + 19, "text-anchor": "middle", "font-size": 12.5, "font-weight": 600, fill: "var(--tinta)" }, "mezcla(" + nd.ini + "," + nd.fin + ")"));
      svg.append(E.svg("text", { x: p.x + p.w / 2, y: p.y + 36, "text-anchor": "middle", "font-size": 11.5, fill: "var(--tinta2)" }, hoja ? "caso base" : "juntar #" + nd.orden));
    });
    cont.append(svg);
  }

  const htmlMezcla = () => `
    <h2>La idea en una frase</h2>
    <p><b>Mezcla</b> (<i>Merge Sort</i>) usa <mark>divide y vencerás</mark>: parte el arreglo a la mitad una y otra vez hasta que cada pedazo tiene un solo elemento (un solo elemento ya está ordenado), y luego va <b>fusionando</b> pedazos ordenados de dos en dos hasta reconstruir todo el arreglo, ya ordenado.</p>
    ${n("idea", "Como juntar dos filas ordenadas", "<p>Si te dan dos filas de personas, cada una ya ordenada por estatura, mezclarlas es facilísimo: miras a los dos primeros de cada fila, el más bajo pasa a la fila final, y repites. Nunca tienes que mirar más allá del frente de cada fila. Ordenar un arreglo grande es eso mismo, pero empezando desde filas de una sola persona.</p>")}
    <h2>Fase 1 · dividir (recursión)</h2>
    <p>Así se reparten las llamadas con 8 elementos. Cada recuadro es una llamada a <code>mezcla(inicio, fin)</code>. Los números <b>juntar #n</b> te dicen en qué <i>orden</i> se ejecutan las fusiones: de abajo hacia arriba, de izquierda a derecha.</p>
    <div data-demo="arbol"></div>
    <p>Una idea clave: <code>mezcla(numeros, inicio, mitad)</code> <b>no pasa a la siguiente línea</b> hasta que esa llamada (y todas las que ella hace) terminen. Por eso la primera fusión que ocurre es la de los dos elementos más a la izquierda. En la animación, el panel <b>Llamadas activas</b> te muestra la pila de llamadas.</p>

    <h2>¿En qué momento se pasa a <code>juntar</code>? (lo que más confunde)</h2>
    <p>El error típico es pensar: «cuando <code>if (inicio &lt; fin)</code> es <b>falso</b>, entonces se va a <code>juntar</code>». <b>No es así.</b> Fíjate dónde vive <code>juntar</code> en tu código:</p>
    <div class="bloque"><code>if (inicio &lt; fin) {
    mitad = (inicio + fin) / 2;
    mezcla(numeros, inicio, mitad);      // mitad izquierda
    mezcla(numeros, mitad + 1, fin);     // mitad derecha
    juntar(numeros, inicio, mitad, fin); // &lt;-- ESTÁ DENTRO del if, al final
}</code></div>
    <p><code>juntar</code> está <b>dentro</b> del <code>if</code> y es la <b>última</b> línea. Entonces:</p>
    <ul>
      <li>Si <code>inicio &lt; fin</code> es <b>falso</b> → <b>no</b> entra al <code>if</code>, <b>no hace nada</b> y la función regresa. Ese es el <b>caso base</b>. <b>No</b> llama a <code>juntar</code>.</li>
      <li>Se llega a <code>juntar</code> <b>cuando <code>inicio &lt; fin</code> fue cierto Y además ya terminaron las dos llamadas recursivas</b> de arriba.</li>
    </ul>
    <p>Es decir: <mark>no pasas a <code>juntar</code> porque dejaste de dividir; pasas a <code>juntar</code> porque las dos mitades de esa llamada ya regresaron ordenadas.</mark></p>
    ${n("idea", "Las 3 fases de cada llamada (y por qué se parece a Fibonacci)", "<p>Cada vez que <code>mezcla</code> entra con <code>inicio &lt; fin</code>, hace tres cosas <b>en orden</b>: <b>1) dividir</b> (<code>mitad = (inicio+fin)/2</code>), <b>2) conquistar</b> (<code>mezcla</code> izquierda y luego <code>mezcla</code> derecha), <b>3) combinar</b> (<code>juntar</code>). La fase 3 <b>siempre</b> ocurre <b>después</b> de la 2. Es la misma forma que Fibonacci: <code>return fib(n-1) + fib(n-2)</code> = llamo a la izquierda, llamo a la derecha y <i>combino</i> (sumo). La única diferencia: Fibonacci combina con un valor que <code>return</code>; mezcla combina con <code>juntar</code>, que no devuelve nada, sino que reordena el arreglo en su lugar. Por eso cuesta más «verlo».</p>")}
    <h3>La clave: la función se «congela»</h3>
    <p>Cuando <code>mezcla</code> ejecuta la línea <code>mezcla(numeros, inicio, mitad)</code>, se queda <b>congelada</b> ahí: no avanza a la siguiente línea hasta que esa llamada termine por completo. Es como platos apilados: no puedes quitar el de abajo hasta quitar los de arriba. Eso es la <b>pila de llamadas</b>. Cada <code>mezcla</code> pausada espera en su línea de <code>mezcla(...)</code>, y solo cuando sus dos llamadas regresaron, ejecuta su <code>juntar</code> y por fin regresa.</p>
    <h3>La ejecución completa, paso a paso, con <code>[38, 27, 43, 3]</code></h3>
    <p>Léelo de arriba hacia abajo: ese es el orden <b>real</b> en que corre. &nbsp;⏸ = se congela esperando. &nbsp;↩ = regresa (caso base: no hace nada). &nbsp;★ = aquí se ejecuta <code>juntar</code>.</p>
    <div class="bloque"><code>mezcla(0,3)   0 &lt; 3 ✓   mitad = 1
 ├─ ⏸ llama mezcla(0,1)
 │    mezcla(0,1)   0 &lt; 1 ✓   mitad = 0
 │     ├─ ⏸ llama mezcla(0,0)   0 &lt; 0 ✗  → caso base ↩ (nada)   pedazo {38}
 │     ├─ ⏸ llama mezcla(1,1)   1 &lt; 1 ✗  → caso base ↩ (nada)   pedazo {27}
 │     └─ ★ juntar(0,0,1)   une {38} y {27}  →  numeros[0..1] = {27, 38}
 │    mezcla(0,1) regresa ↩
 ├─ ⏸ llama mezcla(2,3)   2 &lt; 3 ✓   mitad = 2
 │     ├─ ⏸ llama mezcla(2,2)   2 &lt; 2 ✗  → caso base ↩   pedazo {43}
 │     ├─ ⏸ llama mezcla(3,3)   3 &lt; 3 ✗  → caso base ↩   pedazo {3}
 │     └─ ★ juntar(2,2,3)   une {43} y {3}  →  numeros[2..3] = {3, 43}
 │    mezcla(2,3) regresa ↩
 └─ ★ juntar(0,1,3)   une {27,38} y {3,43}  →  numeros[0..3] = {3, 27, 38, 43}
mezcla(0,3) regresa ↩   ← arreglo ordenado</code></div>
    <p>Fíjate en tres cosas: <b>(1)</b> la recursión baja <b>primero todo por la izquierda</b> hasta tocar fondo (<code>mezcla(0,0)</code>) antes de tocar la derecha; <b>(2)</b> el <b>primer <code>juntar</code></b> que corre es el más chico (unir dos pedazos de un elemento); <b>(3)</b> cada <code>juntar</code> aparece <b>justo después de sus dos llamadas</b>, nunca cuando el <code>if</code> da falso.</p>
    <p>Entonces, respondiendo directo: <mark>se pasa a <code>juntar</code> en el instante en que una llamada <code>mezcla(inicio, fin)</code> termina su <b>segunda</b> llamada recursiva</mark>. En ese momento sus dos mitades ya están ordenadas en <code>numeros</code>, y la siguiente línea es <code>juntar</code>.</p>

    <h2>Fase 2 · fusionar (<code>juntar</code>)</h2>
    <p>Mira cómo se fusionan dos mitades ya ordenadas. Las filas de abajo son las <b>copias temporales</b> <code>izquierda[]</code> y <code>derecha[]</code>; el marcador indica qué elemento de cada una se está considerando.</p>
    <div data-demo="pasada"></div>
    <h2>Cómo funciona tu código</h2>
    <ul>
      <li><code>mezcla</code> solo <b>divide</b>: calcula la mitad, se llama dos veces y luego llama a <code>juntar</code>. Si <code>inicio &lt; fin</code> es falso, no hace nada (caso base).</li>
      <li><code>juntar</code> copia las dos mitades a arreglos temporales y después las va «vaciando» en orden de menor a mayor sobre <code>numeros</code>.</li>
      <li>El <code>&lt;=</code> de la comparación garantiza que en empates salga primero el de la izquierda: <b>estabilidad</b>.</li>
    </ul>
    <h2>¿Cuánto trabajo hace?</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Concepto</th><th>Mezcla</th><th>Por qué</th></tr>
      <tr><td>Tiempo (todos los casos)</td><td class="num">O(n log n)</td><td>Hay log₂ n niveles de división y en cada nivel se mezclan en total n elementos.</td></tr>
      <tr><td>Memoria extra</td><td class="num">O(n)</td><td>Las copias temporales (aquí: 2 × 40 enteros por llamada a <code>juntar</code>).</td></tr>
      <tr><td>Profundidad de recursión</td><td class="num">⌈log₂ n⌉</td><td>Con 40 elementos, unas 6 llamadas anidadas.</td></tr>
      <tr><td>¿Estable?</td><td>Sí</td><td>Por el <code>&lt;=</code>.</td></tr>
    </table></div>
    <div data-demo="cuentas"></div>
    ${n("ojo", "Límite de tu código", "<p>Los arreglos <code>izquierda[TAM_ARREGLO]</code> y <code>derecha[TAM_ARREGLO]</code> miden 40. Si ordenas más de 40 elementos, <code>juntar</code> escribiría fuera de ellos (desbordamiento del buffer). La solución profesional es reservar la memoria con <code>malloc</code> del tamaño exacto necesario y liberarla con <code>free</code>.</p>")}
    <h2>Errores típicos</h2>
    <ul>
      <li>Olvidar el caso base (<code>inicio &lt; fin</code>): recursión infinita y el programa se cae.</li>
      <li>Dividir mal: la derecha debe empezar en <code>mitad + 1</code>, no en <code>mitad</code>, o un elemento se procesa dos veces.</li>
      <li>Escribir sobre <code>numeros</code> sin haber copiado antes las mitades: se pierden datos.</li>
      <li>Olvidar los dos <code>while</code> finales: los elementos sobrantes nunca se copian.</li>
    </ul>
  `;
  const quizMezcla = [
    { p: "¿Qué hace el caso base <code>if (inicio &lt; fin)</code>?", op: ["Evita que el arreglo se ordene dos veces", "Detiene la recursión cuando el tramo tiene 0 o 1 elementos", "Reserva memoria para los temporales", "Decide cuál mitad es la menor"], ok: 1, porque: "Un tramo de uno o cero elementos ya está ordenado. Sin esta condición, mezcla se llamaría infinitamente hasta agotar la pila." },
    { p: "Para <code>mezcla(numeros, 0, 5)</code>, ¿cuánto vale <code>mitad</code>?", op: ["2", "3", "2.5", "5"], ok: 0, porque: "(0 + 5) / 2 es una división entera en C: 5 / 2 = 2. Queda izquierda = [0, 2] (3 elementos) y derecha = [3, 5] (3 elementos)." },
    { p: "¿En qué momento se ejecuta por primera vez <code>juntar</code>?", op: ["Antes de cualquier llamada recursiva", "Cuando ya se dividió hasta tener trozos de un elemento y la recursión regresa", "Solo al final del programa", "En la primera línea de mezcla"], ok: 1, porque: "juntar está después de las dos llamadas recursivas, así que solo se ejecuta cuando éstas regresan: primero con los trozos más pequeños." },
    { p: "¿Por qué la comparación usa <code>&lt;=</code> y no <code>&lt;</code>?", op: ["Para que sea más rápido", "Para que en empates salga primero el de la izquierda (estable)", "Porque < daría error", "No importa, es igual"], ok: 1, porque: "Con <= los iguales conservan el orden en que estaban. Con < saldría primero el de la derecha en cada empate y se perdería la estabilidad." },
    { p: "Comparado con burbuja, mezcla en el peor caso es…", op: ["Igual de lento, O(n²)", "Más rápido, O(n log n), pero usa memoria extra", "Más lento pero sin memoria extra", "Igual de rápido y sin memoria extra"], ok: 1, porque: "Mezcla garantiza O(n log n) siempre, a cambio de usar O(n) de memoria auxiliar. Es el clásico intercambio tiempo ↔ espacio." },
  ];

  /* ---------- demos compartidas ---------- */
  function demoPasada(nombre, arr, ms) {
    return (el) => {
      const A = E.codigoDe(nombre);
      const gen = () => E.ord[nombre](arr, A).pasos;
      ui.MiniDemo(el, {
        sello: "Pruébalo",
        titulo: "Arreglo de " + arr.length + " números · " + arr.join(", "),
        pasos: gen(),
        filtro: (p) => p.f === "impl" && p.lv === 0,
        vista: (c) => E.vistas.barras(c, { leyenda: LEY[nombre] }),
        ms: ms || 1400,
        regenerar: () => {
          const nuevo = E.aleatorio(arr.length, 1, 20);
          return E.ord[nombre](nuevo, A).pasos;
        },
        etqRegenerar: "Otros números",
      });
    };
  }
  function demoCuentas(nombre) {
    return (el) => {
      const A = E.codigoDe(nombre);
      const T = E.ord[nombre](SU_ARREGLO, A);
      const mov = { burbuja: "intercambios", seleccion: "intercambios", insercion: "desplazamientos", mezcla: "copias a numeros[]" }[nombre];
      el.append(
        h(
          "div",
          { class: "nota idea ancha" },
          h("span", { class: "nota-tit" }, "Con tu arreglo de main (40 números)"),
          h("p", { html: "Tu código hace <b>" + T.cont.cmp + "</b> comparaciones y <b>" + T.cont.inter + "</b> " + mov + ". Compruébalo tú mismo en la pestaña <b>Prueba de escritorio</b> → botón «Tu arreglo de main (40)»: los contadores aparecen arriba a la derecha de la animación." })
        )
      );
    };
  }

  function cabecera(id, orden, titulo, sub, resumen, chips) {
    return { id, grupo: "ordenamiento", orden, titulo, sub, resumen, chips };
  }

  E.registrar(
    Object.assign(cabecera("burbuja", 1, "Burbuja", "Bubble Sort", "Compara vecinos y los intercambia si están al revés; el mayor «burbujea» hasta el final.", [
      { k: "Tiempo", v: "O(n²)" }, { k: "Memoria extra", v: "O(1)" }, { k: "Estable", v: "sí" },
    ]), {
      pestanas: {
        explicacion: ui.pestanaExplicacion(htmlBurbuja, { pasada: demoPasada("burbuja", [4, 2, 3, 1]), cuentas: demoCuentas("burbuja") }),
        codigo: ui.pestanaCodigo("burbuja", anotBurbuja, ["dec", "impl", "main"]),
        escritorio: pestanaEscritorio("burbuja", [7, 3, 9, 1, 5, 2, 8]),
        quiz: ui.pestanaQuiz("burbuja", quizBurbuja),
      },
    })
  );
  E.registrar(
    Object.assign(cabecera("seleccion", 2, "Selección", "Selection Sort", "Busca el menor de lo que falta y lo coloca al principio; un solo intercambio por vuelta.", [
      { k: "Tiempo", v: "O(n²)" }, { k: "Intercambios", v: "≤ n−1" }, { k: "Estable", v: "no" },
    ]), {
      pestanas: {
        explicacion: ui.pestanaExplicacion(htmlSeleccion, { pasada: demoPasada("seleccion", [64, 25, 12, 22, 11]), cuentas: demoCuentas("seleccion") }),
        codigo: ui.pestanaCodigo("seleccion", anotSeleccion, ["dec", "impl", "main"]),
        escritorio: pestanaEscritorio("seleccion", [7, 3, 9, 1, 5, 2, 8]),
        quiz: ui.pestanaQuiz("seleccion", quizSeleccion),
      },
    })
  );
  E.registrar(
    Object.assign(cabecera("insercion", 3, "Inserción", "Insertion Sort", "Toma el siguiente elemento y lo desliza a su lugar dentro de la zona ya ordenada, como cartas en la mano.", [
      { k: "Tiempo", v: "O(n²) · mejor O(n)" }, { k: "Memoria extra", v: "O(1)" }, { k: "Estable", v: "sí" },
    ]), {
      pestanas: {
        explicacion: ui.pestanaExplicacion(htmlInsercion, { pasada: demoPasada("insercion", [5, 2, 4, 6, 1, 3]), cuentas: demoCuentas("insercion") }),
        codigo: ui.pestanaCodigo("insercion", anotInsercion, ["dec", "impl", "main"]),
        escritorio: pestanaEscritorio("insercion", [7, 3, 9, 1, 5, 2, 8]),
        quiz: ui.pestanaQuiz("insercion", quizInsercion),
      },
    })
  );
  E.registrar(
    Object.assign(cabecera("mezcla", 4, "Mezcla", "Merge Sort", "Divide el arreglo a la mitad recursivamente y luego fusiona las mitades ya ordenadas.", [
      { k: "Tiempo", v: "O(n log n)" }, { k: "Memoria extra", v: "O(n)" }, { k: "Estable", v: "sí" },
    ]), {
      pestanas: {
        explicacion: ui.pestanaExplicacion(htmlMezcla, {
          arbol: (el) => dibujarArbol(el, 8),
          pasada: demoPasada("mezcla", [6, 2, 5, 1], 1100),
          cuentas: demoCuentas("mezcla"),
        }),
        codigo: ui.pestanaCodigo("mezcla", anotMezcla, ["dec", "impl", "main"]),
        escritorio: pestanaEscritorio("mezcla", [38, 27, 43, 3, 9, 82, 10]),
        quiz: ui.pestanaQuiz("mezcla", quizMezcla),
      },
    })
  );

  /* ====================================================================
     COMPARATIVA
     ==================================================================== */
  const NOMBRES = { burbuja: "Burbuja", seleccion: "Selección", insercion: "Inserción", mezcla: "Mezcla" };
  const MOV = { burbuja: "intercambios", seleccion: "intercambios", insercion: "desplazamientos", mezcla: "copias" };
  function pestanaCarrera() {
    return {
      titulo: "Carrera",
      render(cont) {
        const entrada = h("input", { type: "text", value: SU_ARREGLO.join(", "), spellcheck: "false", "aria-label": "Arreglo para la carrera" });
        const aviso = h("p", { class: "aviso" }, "Mismo arreglo para los cuatro algoritmos. Mide cuántas comparaciones y movimientos necesita cada uno.");
        const salida = h("div");
        function correr(nums) {
          E.vaciar(salida);
          const res = Object.keys(NOMBRES).map((k) => {
            const T = E.ord[k](nums, E.codigoDe(k));
            return { k, cmp: T.cont.cmp, mov: T.cont.inter, pasos: T.pasos.length };
          });
          const maxC = Math.max(...res.map((r) => r.cmp), 1);
          const maxM = Math.max(...res.map((r) => r.mov), 1);
          const tabla = h(
            "table",
            { class: "comp-tabla" },
            h("thead", {}, h("tr", {}, h("th", {}, "Algoritmo"), h("th", {}, "Comparaciones"), h("th", {}, ""), h("th", {}, "Movimientos"), h("th", {}, ""))),
            h(
              "tbody",
              {},
              res.map((r) =>
                h(
                  "tr",
                  {},
                  h("td", {}, h("b", {}, NOMBRES[r.k]), h("div", { class: "suave", style: { fontSize: "12px" } }, "mueve con: " + MOV[r.k])),
                  h("td", { class: "num" }, r.cmp),
                  h("td", { style: { width: "26%" } }, h("div", { class: "barra-h", style: { width: Math.max(1, (r.cmp / maxC) * 100) + "%" } })),
                  h("td", { class: "num" }, r.mov),
                  h("td", { style: { width: "26%" } }, h("div", { class: "barra-h v", style: { width: Math.max(1, (r.mov / maxM) * 100) + "%" } }))
                )
              )
            )
          );
          salida.append(h("div", { class: "prosa ancha" }, h("div", { class: "tabla-wrap" }, tabla)));
        }
        function leer() {
          const r = ui.numeros(entrada.value);
          if (r.error) { aviso.className = "aviso aviso-err"; aviso.textContent = r.error; return; }
          aviso.className = "aviso";
          aviso.textContent = r.nums.length + " números.";
          correr(r.nums);
        }
        const pon = (arr) => { entrada.value = arr.join(", "); leer(); };
        const sorted = (m) => E.rango(m).map((x) => x + 1);
        cont.append(
          ui.panelCtl(
            h("label", { class: "grande" }, "Arreglo", entrada),
            h("button", { type: "button", class: "btn btn-azul", onclick: leer }, "Correr la carrera"),
            h("div", { class: "preajustes" }, h("span", { class: "suave" }, "Ejemplos:"), [
              ["Tu arreglo (40)", () => pon(SU_ARREGLO)],
              ["Aleatorio (30)", () => pon(E.aleatorio(30, 1, 99))],
              ["Ya ordenado (30)", () => pon(sorted(30))],
              ["Al revés (30)", () => pon(sorted(30).reverse())],
              ["Casi ordenado (30)", () => { const a = sorted(30); [a[3], a[4]] = [a[4], a[3]]; [a[20], a[22]] = [a[22], a[20]]; pon(a); }],
            ].map(([t, f]) => h("button", { type: "button", class: "btn btn-chico", onclick: f }, t))),
            aviso
          )
        );
        cont.append(salida);
        cont.append(
          h("div", { class: "prosa", html:
            n("tip", "Cómo leer los resultados", "<ul><li><b>Ya ordenado:</b> inserción casi no trabaja (n − 1 comparaciones); burbuja y selección siguen haciendo todas las suyas.</li><li><b>Al revés:</b> es el peor caso para burbuja e inserción. Selección sigue con pocos intercambios.</li><li><b>Mezcla</b> casi no se ve afectada por el orden inicial: siempre ronda n log n.</li></ul><p>Un «movimiento» no es lo mismo en cada algoritmo (un intercambio son 3 asignaciones; un desplazamiento, 1). Compáralos con cuidado.</p>") })
        );
        leer();
      },
    };
  }
  const htmlComp = () => `
    <h2>Cuatro formas de resolver lo mismo</h2>
    <div class="tabla-wrap"><table>
      <tr><th>Algoritmo</th><th>Mejor</th><th>Promedio</th><th>Peor</th><th>Memoria extra</th><th>Estable</th><th>Se distingue por…</th></tr>
      <tr><td><b>Burbuja</b></td><td class="num">O(n²)*</td><td class="num">O(n²)</td><td class="num">O(n²)</td><td class="num">O(1)</td><td>sí</td><td>Comparar solo vecinos. Fácil de entender.</td></tr>
      <tr><td><b>Selección</b></td><td class="num">O(n²)</td><td class="num">O(n²)</td><td class="num">O(n²)</td><td class="num">O(1)</td><td>no</td><td>Muy pocos intercambios (≤ n−1).</td></tr>
      <tr><td><b>Inserción</b></td><td class="num">O(n)</td><td class="num">O(n²)</td><td class="num">O(n²)</td><td class="num">O(1)</td><td>sí</td><td>Excelente con pocos datos o casi ordenados.</td></tr>
      <tr><td><b>Mezcla</b></td><td class="num">O(n log n)</td><td class="num">O(n log n)</td><td class="num">O(n log n)</td><td class="num">O(n)</td><td>sí</td><td>Rápida y predecible; usa recursión y memoria extra.</td></tr>
    </table></div>
    <p class="suave">* Tu versión de burbuja no tiene la bandera de «ya no hubo cambios», así que su mejor caso también es O(n²). Con esa bandera sería O(n).</p>
    <h2>¿Qué significa O(n²) o O(n log n)?</h2>
    <p>Es una forma de decir <b>cómo crece el trabajo cuando crecen los datos</b>, ignorando constantes:</p>
    <div class="tabla-wrap"><table>
      <tr><th>n (elementos)</th><th class="num">n² (cuadrático)</th><th class="num">n · log₂ n</th></tr>
      <tr><td>10</td><td class="num">100</td><td class="num">≈ 33</td></tr>
      <tr><td>40 <span class="suave">(tu main)</span></td><td class="num">1,600</td><td class="num">≈ 213</td></tr>
      <tr><td>1,000</td><td class="num">1,000,000</td><td class="num">≈ 9,966</td></tr>
      <tr><td>1,000,000</td><td class="num">1,000,000,000,000</td><td class="num">≈ 19,931,568</td></tr>
    </table></div>
    <p>Con 40 elementos la diferencia casi no se siente; con un millón, el algoritmo cuadrático tardaría <b>días</b> y el de n log n, <b>segundos</b>. Por eso importa.</p>
    <h2>¿Cuál elijo?</h2>
    <ul>
      <li><b>Pocos datos (menos de ~50) o casi ordenados</b> → Inserción.</li>
      <li><b>Necesito garantizar tiempo y puedo pagar memoria</b> → Mezcla.</li>
      <li><b>Escribir en memoria es carísimo</b> → Selección.</li>
      <li><b>Estoy aprendiendo y quiero ver la idea más simple</b> → Burbuja.</li>
    </ul>
    <p>Ve a la pestaña <b>Carrera</b> para medirlo con tus propios arreglos.</p>
  `;
  E.registrar({
    id: "comparativa",
    grupo: "ordenamiento",
    orden: 5,
    titulo: "Comparativa",
    sub: "los cuatro frente a frente",
    resumen: "Mismo arreglo, cuatro algoritmos: cuántas comparaciones y movimientos hace cada uno.",
    chips: [],
    pestanas: {
      explicacion: ui.pestanaExplicacion(htmlComp, {}),
      carrera: pestanaCarrera(),
      quiz: ui.pestanaQuiz("comparativa", [
        { p: "Con 1,000,000 de elementos, ¿cuál de estos tardaría <b>mucho</b> más?", op: ["Mezcla", "Burbuja", "Los dos igual", "Depende solo del compilador"], ok: 1, porque: "Burbuja es O(n²): del orden de 10¹² operaciones. Mezcla es O(n log n): unos 2·10⁷." },
        { p: "El arreglo viene <b>casi ordenado</b>. ¿Cuál se beneficia más?", op: ["Selección", "Inserción", "Ninguno", "Mezcla"], ok: 1, porque: "Inserción es adaptativa: si cada elemento ya está cerca de su lugar, el while casi no se ejecuta, y se acerca a O(n)." },
        { p: "¿Qué algoritmo hace siempre el mismo número de comparaciones sin importar el orden inicial (en tu código)?", op: ["Inserción", "Burbuja y selección", "Solo mezcla", "Ninguno"], ok: 1, porque: "Los dos recorren sus ciclos completos (n(n−1)/2 comparaciones) aunque no haya nada que cambiar." },
        { p: "¿Cuál de estos NO es estable?", op: ["Burbuja", "Inserción", "Selección", "Mezcla"], ok: 2, porque: "Selección intercambia el menor con la posición i saltándose elementos, y eso puede cruzar iguales." },
      ]),
    },
  });
})();
