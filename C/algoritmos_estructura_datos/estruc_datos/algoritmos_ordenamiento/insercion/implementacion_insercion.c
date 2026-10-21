/*
 * ============================================================================
 *  implementacion_insercion.c
 * ============================================================================
 *  Codigo real de las funciones declaradas en declaracion_insercion.h
 *
 *  ¿Como funciona Insertion Sort (insercion)?
 *  ------------------------------------------
 *  Es exactamente como acomodas las cartas en tu mano cuando juegas:
 *  vas tomando una carta nueva y la METES (insertas) en el lugar que le
 *  toca entre las que ya tienes acomodadas, recorriendo las mas grandes
 *  hacia la derecha para hacerle espacio.
 *
 *  El arreglo se ve asi:
 *     [ parte ya ordenada | parte por acomodar ]
 *  Al inicio, la parte ordenada es solo el primer elemento (un solo
 *  numero siempre esta "ordenado").
 *
 *  Ejemplo con [5, 2, 4, 1]:
 *    i=1: tomo el 2. ¿5 > 2? si, recorro el 5 a la derecha.
 *         Inserto el 2 al inicio          -> [2, 5, 4, 1]
 *    i=2: tomo el 4. ¿5 > 4? si, recorro el 5. ¿2 > 4? no, me detengo.
 *         Inserto el 4 despues del 2      -> [2, 4, 5, 1]
 *    i=3: tomo el 1. Recorro 5, 4 y 2 a la derecha.
 *         Inserto el 1 al inicio          -> [1, 2, 4, 5]  <- listo
 *
 *  Ventaja: si el arreglo ya viene CASI ordenado, es muy rapido, porque
 *  casi no tiene que recorrer nada.
 *
 *  Complejidad: O(n^2) en el peor caso, O(n) si ya viene ordenado.
 * ============================================================================
 */

#include <stdio.h>
#include "declaracion_insercion.h"


/* ---------------------------------------------------------------------------
 *  insercion
 * ---------------------------------------------------------------------------
 *  Recibe el arreglo desde el main (como apuntador) y su tamaño.
 *  Lo ordena de menor a mayor.
 */
void insercion(int numeros[], int tam) {
    /*
     * Variables:
     *   i      -> posicion de la "carta nueva" que vamos a acomodar.
     *   j      -> recorre HACIA ATRAS la parte ya ordenada, buscando
     *             donde meter la carta nueva.
     *   actual -> guarda el VALOR de la carta nueva. Es importante
     *             guardarlo, porque al recorrer los numeros a la derecha
     *             vamos a "pisar" la posicion i y perderiamos ese valor.
     */
    int i, j, actual;

    /*
     * CICLO EXTERNO: i va desde 1 hasta tam - 1.
     * Empieza en 1 (no en 0) porque el elemento 0 por si solo ya es una
     * parte ordenada; la primera "carta nueva" es la de la posicion 1.
     */
    for (i = 1; i < tam; i++) {

        /* Tomamos la carta nueva y la guardamos aparte */
        actual = numeros[i];

        /*
         * j empieza justo a la izquierda de la carta nueva: es el ultimo
         * elemento de la parte ya ordenada.
         */
        j = i - 1;

        /*
         * CICLO INTERNO (while): mientras...
         *   j >= 0                -> no nos salgamos por la izquierda
         *                            del arreglo (la posicion -1 no existe)
         *   numeros[j] > actual   -> el numero de la izquierda sea MAS
         *                            GRANDE que la carta nueva
         * ...seguimos recorriendo.
         *
         * IMPORTANTE: el orden de las condiciones importa. Primero se
         * revisa j >= 0. Si eso es falso, C ya no evalua la segunda
         * parte (se llama "evaluacion en cortocircuito"), y asi nunca
         * leemos numeros[-1].
         *
         * Usamos while y no for porque NO sabemos cuantas veces se va a
         * repetir: depende de los valores.
         */
        while (j >= 0 && numeros[j] > actual) {

            /*
             * Recorremos el numero grande UNA posicion a la derecha para
             * abrir un hueco. (El valor que estaba en j + 1 no se pierde
             * porque o ya lo movimos antes, o era la carta nueva y la
             * tenemos guardada en "actual".)
             */
            numeros[j + 1] = numeros[j];

            /* Nos movemos una posicion a la izquierda */
            j--;
        }

        /*
         * Al salir del while, j quedo en la posicion del primer numero
         * que es MENOR O IGUAL a "actual" (o en -1 si todos eran mas
         * grandes). Por eso la carta nueva va justo a su derecha: j + 1.
         */
        numeros[j + 1] = actual;

        /* Ahora de la posicion 0 a la i ya esta ordenado */
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
