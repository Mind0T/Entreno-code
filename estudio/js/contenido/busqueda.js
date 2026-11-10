/* ============================================================
   Algoritmos de busqueda: marcados como "proximamente"
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;

  const caja = (titulo, idea, lista) =>
    '<h2>Próximamente</h2>' +
    '<p>' + idea + "</p>" +
    "<p><b>Lo que traerá este tema:</b></p><ul>" + lista.map((x) => "<li>" + x + "</li>").join("") + "</ul>" +
    '<p class="suave">Cuando tengas tus archivos de ' + titulo + " en el repositorio, esta sección se construye igual que las demás: explicación, código línea por línea, prueba de escritorio animada, laboratorio y quiz.</p>";

  E.registrar({
    id: "secuencial",
    grupo: "busqueda",
    orden: 1,
    titulo: "Búsqueda secuencial",
    sub: "linear search",
    resumen: "Revisar uno por uno hasta encontrar el valor. (Todavía no la ves en clase.)",
    chips: [],
    pronto: caja("búsqueda secuencial", "Revisa los elementos uno por uno desde el principio hasta encontrar el que buscas (o llegar al final). Funciona con cualquier arreglo, ordenado o no.", [
      "Cómo se recorre el arreglo y cuándo se detiene.",
      "Mejor, promedio y peor caso (O(1), O(n), O(n)).",
      "Prueba de escritorio con tu propio arreglo y el valor a buscar.",
    ]),
    pestanas: { aviso: { titulo: "Próximamente", render() {} } },
  });
  E.registrar({
    id: "binaria",
    grupo: "busqueda",
    orden: 2,
    titulo: "Búsqueda binaria",
    sub: "binary search",
    resumen: "Dividir a la mitad un arreglo ordenado en cada paso. (Todavía no la ves en clase.)",
    chips: [],
    pronto: caja("búsqueda binaria", "En un arreglo <b>ordenado</b>, compara con el elemento del centro y descarta la mitad que no puede contener el valor. Repite hasta encontrarlo. Con un millón de elementos, bastan unas 20 comparaciones.", [
      "La relación con los algoritmos de ordenamiento: sin arreglo ordenado no funciona.",
      "Versión iterativa y recursiva, con los índices <code>inicio</code>, <code>mitad</code> y <code>fin</code> animados.",
      "Complejidad O(log n) y por qué es tan rápida.",
    ]),
    pestanas: { aviso: { titulo: "Próximamente", render() {} } },
  });
})();
