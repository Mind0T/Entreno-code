/*
 * ============================================================================
 *  implementacion_mezcla.c
 * ============================================================================
 *  Codigo real de las funciones declaradas en declaracion_mezcla.h
 *
 *  ¿Como funciona Merge Sort (mezcla)?
 *  -----------------------------------
 *  Usa la estrategia "DIVIDE Y VENCERAS":
 *
 *   1) DIVIDIR: parte el arreglo a la mitad, y cada mitad otra vez a la
 *      mitad, y asi... hasta que quedan pedazos de UN solo elemento.
 *      (Un pedazo de un elemento ya esta ordenado, no hay nada que hacer.)
 *
 *   2) JUNTAR: ahora va uniendo los pedazos de dos en dos, pero de forma
 *      ordenada. Como cada pedazo ya esta ordenado, unirlos es facil:
 *      comparas el primero de cada uno y tomas el mas chico, y repites.
 *
 *  Ejemplo con [38, 27, 43, 3]:
 *
 *      DIVIDIR:        [38, 27, 43, 3]
 *                      /              \
 *                 [38, 27]          [43, 3]
 *                 /     \           /     \
 *              [38]    [27]      [43]     [3]
 *
 *      JUNTAR:     [27, 38]          [3, 43]
 *                      \              /
 *                     [3, 27, 38, 43]   <- listo
 *
 *  ¿Que es la RECURSIVIDAD?
 *  ------------------------
 *  Es cuando una funcion se llama a SI MISMA. mezcla() se llama a si
 *  misma para ordenar la mitad izquierda y luego la mitad derecha.
 *  Toda funcion recursiva necesita un CASO BASE, una condicion en la que
 *  ya NO se vuelve a llamar; si no, se llamaria infinitamente y el
 *  programa truena ("stack overflow"). Aqui el caso base es cuando el
 *  pedazo tiene un solo elemento (inicio == fin).
 *
 *  Complejidad: O(n log n) SIEMPRE. Es mucho mas rapido que burbuja,
 *  seleccion e insercion cuando hay muchos datos. La desventaja es que
 *  necesita memoria extra (los arreglos temporales de juntar()).
 * ============================================================================
 */

#include <stdio.h>
#include "declaracion_mezcla.h"


/* ---------------------------------------------------------------------------
 *  mezcla  (funcion RECURSIVA)
 * ---------------------------------------------------------------------------
 *  Ordena el pedazo del arreglo que va de "inicio" a "fin".
 *  La primera vez el main la llama con todo el arreglo:
 *      mezcla(numeros, 0, TAM_ARREGLO - 1);
 */
void mezcla(int numeros[], int inicio, int fin) {
    /* mitad -> posicion donde vamos a partir el pedazo en dos */
    int mitad;

    /*
     * CASO BASE (implicito):
     * Si inicio NO es menor que fin, significa que el pedazo tiene
     * 1 elemento (inicio == fin) o esta vacio. En ese caso no entramos
     * al if, no hacemos nada y la funcion termina. Esto es lo que
     * detiene la recursividad.
     */
    if (inicio < fin) {

        /*
         * Calculamos la mitad. Como son enteros, la division corta los
         * decimales. Ej: inicio=0, fin=39 -> mitad = 39/2 = 19.
         * Entonces la izquierda es 0..19 y la derecha 20..39.
         */
        mitad = (inicio + fin) / 2;

        /*
         * Llamada RECURSIVA para la mitad IZQUIERDA (de inicio a mitad).
         * Esta llamada no regresa hasta que esa mitad quede ordenada
         * (ella a su vez se va a partir en mitades, y asi...).
         */
        mezcla(numeros, inicio, mitad);

        /* Llamada RECURSIVA para la mitad DERECHA (de mitad+1 a fin) */
        mezcla(numeros, mitad + 1, fin);

        /*
         * Cuando llegamos aqui, las dos mitades YA estan ordenadas
         * (cada una por separado). Solo falta unirlas en orden.
         */
        juntar(numeros, inicio, mitad, fin);
    }
}


/* ---------------------------------------------------------------------------
 *  juntar
 * ---------------------------------------------------------------------------
 *  Une dos partes ordenadas del arreglo:
 *     izquierda: numeros[inicio .. mitad]
 *     derecha:   numeros[mitad+1 .. fin]
 *  y deja todo ese tramo ordenado en el arreglo original.
 */
void juntar(int numeros[], int inicio, int mitad, int fin) {
    /*
     * Arreglos TEMPORALES donde copiamos cada mitad.
     * ¿Por que copiar? Porque vamos a ir escribiendo el resultado en el
     * arreglo original, y si no tuvieramos una copia, sobrescribiriamos
     * numeros que todavia no hemos comparado.
     *
     * Les damos tamaño TAM_ARREGLO (40) porque es lo maximo que podria
     * medir una mitad; normalmente usaremos solo una parte.
     */
    int izquierda[TAM_ARREGLO];
    int derecha[TAM_ARREGLO];

    /*
     * Cuantos elementos tiene cada mitad.
     *   Ej: inicio=0, mitad=4, fin=9
     *       tamIzq = 4 - 0 + 1 = 5   (posiciones 0,1,2,3,4)
     *       tamDer = 9 - 4     = 5   (posiciones 5,6,7,8,9)
     * El "+ 1" es porque contamos ambos extremos.
     */
    int tamIzq = mitad - inicio + 1;
    int tamDer = fin - mitad;

    /*
     * Tres "dedos" o indices para ir recorriendo:
     *   i -> posicion actual en el arreglo "izquierda"
     *   j -> posicion actual en el arreglo "derecha"
     *   k -> posicion donde vamos a escribir en el arreglo original
     */
    int i, j, k;

    /* ---- PASO 1: copiar cada mitad a su arreglo temporal ---- */

    /* izquierda[0] = numeros[inicio], izquierda[1] = numeros[inicio+1]... */
    for (i = 0; i < tamIzq; i++) {
        izquierda[i] = numeros[inicio + i];
    }

    /* derecha[0] = numeros[mitad+1], derecha[1] = numeros[mitad+2]... */
    for (j = 0; j < tamDer; j++) {
        derecha[j] = numeros[mitad + 1 + j];
    }

    /* ---- PASO 2: mezclar comparando el primero de cada mitad ---- */

    i = 0;       /* empezamos al inicio de "izquierda" */
    j = 0;       /* empezamos al inicio de "derecha" */
    k = inicio;  /* escribimos a partir de "inicio" en el original */

    /*
     * Mientras a LAS DOS mitades les queden elementos:
     * comparamos el elemento actual de cada una y copiamos el MAS CHICO
     * al arreglo original. Luego avanzamos en la mitad de donde lo
     * tomamos.
     *
     * Ej: izquierda = [27, 38]   derecha = [3, 43]
     *     27 vs 3  -> pongo 3,  avanzo j
     *     27 vs 43 -> pongo 27, avanzo i
     *     38 vs 43 -> pongo 38, avanzo i
     *     (izquierda se acabo, salimos del while)
     */
    while (i < tamIzq && j < tamDer) {

        /*
         * Usamos <= (y no <) para que, si hay dos numeros iguales, se
         * tome primero el de la izquierda. Asi se respeta el orden en
         * que venian (a eso se le llama ordenamiento "estable").
         */
        if (izquierda[i] <= derecha[j]) {
            numeros[k] = izquierda[i];
            i++;
        } else {
            numeros[k] = derecha[j];
            j++;
        }
        /* Siempre avanzamos k, porque siempre escribimos un numero */
        k++;
    }

    /* ---- PASO 3: copiar lo que haya sobrado ---- */
    /*
     * Cuando una mitad se acaba, a la otra todavia le pueden quedar
     * elementos. Como esa mitad ya estaba ordenada, simplemente los
     * copiamos tal cual al final. Solo UNO de estos dos while se va a
     * ejecutar de verdad (el de la mitad que sobro).
     */

    /* Lo que sobro de la izquierda */
    while (i < tamIzq) {
        numeros[k] = izquierda[i];
        i++;
        k++;
    }

    /* Lo que sobro de la derecha (en el ejemplo, el 43) */
    while (j < tamDer) {
        numeros[k] = derecha[j];
        j++;
        k++;
    }
}


/* ---------------------------------------------------------------------------
 *  imprimirArreglo
 * ---------------------------------------------------------------------------
 *  Recorre de 0 a tam - 1 e imprime cada elemento.
 */
void imprimirArreglo(int numeros[], int tam) {
    int i;

    for (i = 0; i < tam; i++) {
        printf("%d ", numeros[i]);
    }
    printf("\n");
}
