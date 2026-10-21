/*
 * ============================================================================
 *  implementacion_burbuja.c
 * ============================================================================
 *  Aqui va el CODIGO REAL de las funciones que declaramos en
 *  declaracion_burbuja.h.
 *
 *  ¿Como funciona Bubble Sort (burbuja)?
 *  -------------------------------------
 *  Recorre el arreglo comparando los numeros de DOS EN DOS (vecinos):
 *  numeros[0] con numeros[1], numeros[1] con numeros[2], etc.
 *  Si el de la izquierda es MAYOR que el de la derecha, estan al reves,
 *  asi que los INTERCAMBIA.
 *
 *  Al terminar una vuelta completa, el numero mas grande ya "subio"
 *  hasta el final del arreglo, como una burbuja que sube a la
 *  superficie del agua. De ahi el nombre.
 *
 *  Luego se repite otra vuelta, pero ya sin revisar el ultimo (porque
 *  ya esta en su lugar), y asi sucesivamente.
 *
 *  Ejemplo con [5, 3, 8, 1]:
 *    Vuelta 1: 5>3 cambio -> [3,5,8,1]
 *              5>8? no    -> [3,5,8,1]
 *              8>1 cambio -> [3,5,1,8]   <- el 8 ya quedo al final
 *    Vuelta 2: 3>5? no    -> [3,5,1,8]
 *              5>1 cambio -> [3,1,5,8]   <- el 5 ya quedo en su lugar
 *    Vuelta 3: 3>1 cambio -> [1,3,5,8]   <- listo
 *
 *  Complejidad: O(n^2) -> si duplicas los datos, tarda ~4 veces mas.
 *  Es facil de entender pero lento con muchos datos.
 * ============================================================================
 */

/* stdio.h trae printf, que usamos en imprimirArreglo */
#include <stdio.h>

/*
 * Incluimos NUESTRO header. Se usan comillas " " (y no < >) porque es un
 * archivo nuestro que esta en la misma carpeta; los < > son para las
 * librerias del sistema como stdio.h.
 * Incluirlo aqui sirve para que el compilador revise que lo que
 * implementamos coincide con lo que declaramos.
 */
#include "declaracion_burbuja.h"


/* ---------------------------------------------------------------------------
 *  burbuja
 * ---------------------------------------------------------------------------
 *  Recibe desde el main el arreglo (como apuntador a su primer elemento)
 *  y cuantos elementos tiene. Lo ordena de menor a mayor.
 */
void burbuja(int numeros[], int tam) {
    /*
     * Variables:
     *   i   -> cuenta cuantas VUELTAS completas llevamos sobre el arreglo.
     *   j   -> la posicion que estamos comparando dentro de una vuelta.
     *   aux -> "auxiliar": guarda un valor temporalmente para poder
     *          intercambiar dos numeros sin perder ninguno.
     */
    int i, j, aux;

    /*
     * CICLO EXTERNO (las vueltas):
     * i va desde 0 hasta tam - 2 (porque la condicion es i < tam - 1).
     * ¿Por que tam - 1 vueltas y no tam? Porque si ya acomodaste
     * correctamente tam - 1 numeros, el que sobra forzosamente ya esta
     * en su lugar (es el mas chico y queda al inicio).
     * Con 40 numeros -> 39 vueltas.
     */
    for (i = 0; i < tam - 1; i++) {

        /*
         * CICLO INTERNO (las comparaciones dentro de una vuelta):
         * j va desde 0 hasta tam - 2 - i.
         *
         * - El "- 1" es porque comparamos numeros[j] con numeros[j + 1].
         *   Si j llegara a tam - 1, entonces j + 1 seria tam, y esa
         *   posicion NO existe (el arreglo va de 0 a tam - 1). Nos
         *   saldriamos del arreglo y leeriamos basura de la memoria.
         *
         * - El "- i" es una optimizacion: despues de i vueltas, los
         *   ultimos i numeros ya son los mas grandes y ya estan en su
         *   lugar, asi que no tiene caso volver a revisarlos.
         */
        for (j = 0; j < tam - 1 - i; j++) {

            /*
             * Comparamos al numero actual con su vecino de la derecha.
             * Si el de la izquierda es mas grande, estan en desorden.
             * (Si cambias > por < ordenarias de MAYOR a menor.)
             */
            if (numeros[j] > numeros[j + 1]) {

                /*
                 * INTERCAMBIO (swap) en 3 pasos usando aux.
                 * Es como cambiar el contenido de dos vasos: necesitas
                 * un tercer vaso vacio para no derramar nada.
                 *
                 *   1) guardo el de la izquierda en aux
                 *   2) en la izquierda pongo el de la derecha
                 *   3) en la derecha pongo lo que guarde en aux
                 */
                aux = numeros[j];
                numeros[j] = numeros[j + 1];
                numeros[j + 1] = aux;
            }
        }
    }
    /*
     * No hay return porque la funcion es void. El arreglo del main YA
     * quedo ordenado, porque trabajamos directamente sobre su memoria
     * (recuerda: recibimos un apuntador, no una copia).
     */
}


/* ---------------------------------------------------------------------------
 *  imprimirArreglo
 * ---------------------------------------------------------------------------
 *  Recorre el arreglo de la posicion 0 a la tam - 1 e imprime cada valor.
 */
void imprimirArreglo(int numeros[], int tam) {
    int i;

    for (i = 0; i < tam; i++) {
        /* %d es el formato para imprimir un entero (int) */
        printf("%d ", numeros[i]);
    }
    /* salto de linea al final para que lo siguiente no quede pegado */
    printf("\n");
}
