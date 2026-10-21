/*
 * ============================================================================
 *  implementacion_seleccion.c
 * ============================================================================
 *  Codigo real de las funciones declaradas en declaracion_seleccion.h
 *
 *  ¿Como funciona Selection Sort (seleccion)?
 *  ------------------------------------------
 *  Imagina que tienes cartas en la mesa y quieres acomodarlas:
 *    1) Buscas la carta MAS CHICA de todas y la pones en la posicion 0.
 *    2) De las que quedan, buscas la mas chica y la pones en la posicion 1.
 *    3) Y asi hasta acabar.
 *
 *  Es decir, en cada vuelta SELECCIONA el minimo de la parte que falta
 *  por ordenar y lo intercambia con el primer lugar de esa parte.
 *
 *  El arreglo se divide en dos partes que van cambiando:
 *     [ ya ordenado | todavia desordenado ]
 *  y en cada vuelta la parte ordenada crece en 1.
 *
 *  Ejemplo con [29, 10, 14, 37, 13]:
 *    i=0: el minimo de todo es 10 (pos 1)  -> cambio con pos 0
 *         [10, 29, 14, 37, 13]
 *    i=1: minimo de [29,14,37,13] es 13    -> cambio con pos 1
 *         [10, 13, 14, 37, 29]
 *    i=2: minimo de [14,37,29] es 14       -> ya esta en su lugar
 *         [10, 13, 14, 37, 29]
 *    i=3: minimo de [37,29] es 29          -> cambio con pos 3
 *         [10, 13, 14, 29, 37]  <- listo
 *
 *  Diferencia con burbuja: burbuja hace MUCHOS intercambios (cada vez que
 *  dos vecinos estan al reves). Seleccion hace como maximo UN intercambio
 *  por vuelta; primero busca y al final cambia.
 *
 *  Complejidad: O(n^2), siempre, aunque el arreglo ya venga ordenado
 *  (porque igual tiene que buscar el minimo en cada vuelta).
 * ============================================================================
 */

#include <stdio.h>
#include "declaracion_seleccion.h"


/* ---------------------------------------------------------------------------
 *  seleccion
 * ---------------------------------------------------------------------------
 *  Recibe el arreglo desde el main (como apuntador) y su tamaño.
 *  Lo ordena de menor a mayor.
 */
void seleccion(int numeros[], int tam) {
    /*
     * Variables:
     *   i     -> la posicion que queremos "llenar" en esta vuelta. Todo lo
     *            que esta antes de i ya esta ordenado.
     *   j     -> recorre la parte desordenada buscando el minimo.
     *   menor -> guarda la POSICION (el indice), NO el valor, del numero
     *            mas chico encontrado hasta ahora. Guardamos la posicion
     *            porque al final necesitamos saber DONDE esta para
     *            intercambiarlo.
     *   aux   -> variable temporal para el intercambio.
     */
    int i, j, menor, aux;

    /*
     * CICLO EXTERNO: i va de 0 hasta tam - 2.
     * Cuando ya acomodaste las primeras tam - 1 posiciones, el ultimo
     * numero que queda es forzosamente el mas grande, asi que no hace
     * falta una vuelta mas.
     */
    for (i = 0; i < tam - 1; i++) {

        /*
         * Suponemos que el mas chico de la parte desordenada es el
         * primero de esa parte (el que esta en i). Luego lo comprobamos.
         */
        menor = i;

        /*
         * CICLO INTERNO: j empieza en i + 1 (el que sigue de nuestro
         * candidato) y llega hasta el final (tam - 1).
         * Su trabajo es BUSCAR si hay alguien mas chico que numeros[menor].
         */
        for (j = i + 1; j < tam; j++) {

            /*
             * Si el numero en j es mas chico que nuestro "menor actual",
             * actualizamos: ahora el candidato a minimo esta en j.
             */
            if (numeros[j] < numeros[menor]) {
                menor = j;
            }
        }

        /*
         * Al salir del for interno, "menor" tiene la posicion del numero
         * mas chico de toda la parte desordenada.
         *
         * Lo intercambiamos con la posicion i para que quede en su lugar.
         * (Si menor == i, el intercambio no cambia nada, el numero ya
         * estaba bien. Podriamos poner un if para evitarlo, pero asi es
         * mas simple.)
         */
        aux = numeros[i];
        numeros[i] = numeros[menor];
        numeros[menor] = aux;

        /*
         * En este punto, de la posicion 0 a la i ya esta ordenado.
         */
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
