/*
 * ============================================================================
 *  main_burbuja.c
 * ============================================================================
 *  Programa principal: crea un arreglo de 40 numeros desordenados,
 *  lo imprime, lo ordena con burbuja y lo vuelve a imprimir.
 *
 *  ¿COMO COMPILAR?
 *  ---------------
 *  Como el programa esta repartido en dos archivos .c, hay que darle
 *  AMBOS al compilador (el .h no se pone, se incluye solo):
 *
 *      gcc main_burbuja.c implementacion_burbuja.c -o burbuja
 *
 *  Y para ejecutarlo:
 *      ./burbuja        (Linux / Mac)
 *      burbuja.exe      (Windows)
 *
 *  Si solo compilas main_burbuja.c te va a salir un error tipo
 *  "undefined reference to burbuja": significa que el compilador vio
 *  la DECLARACION (en el .h) pero no encontro la IMPLEMENTACION.
 * ============================================================================
 */

#include <stdio.h>

/*
 * Al incluir el header, el main ya sabe que existen burbuja() e
 * imprimirArreglo(), que reciben y que regresan. Tambien trae la
 * constante TAM_ARREGLO (40).
 */
#include "declaracion_burbuja.h"

int main() {
    /*
     * Declaramos un arreglo de 40 enteros y lo llenamos de una vez con
     * valores desordenados (algunos repetidos y negativos, para probar
     * que el algoritmo los maneja bien).
     *
     * TAM_ARREGLO vale 40 (viene del header). Si pones mas o menos de 40
     * valores entre las llaves, el compilador avisa o rellena con ceros.
     */
    int numeros[TAM_ARREGLO] = {
        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,
        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,
        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,
        50,  2, 88, 23, 64, 12, 71, 30, 57,  9
    };

    printf("=== ORDENAMIENTO BURBUJA (Bubble Sort) ===\n\n");

    /* Mostramos el arreglo tal como esta, todavia desordenado */
    printf("Arreglo original:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    /*
     * Llamamos a burbuja. Le mandamos:
     *   numeros     -> el NOMBRE del arreglo sin corchetes. En C el
     *                  nombre de un arreglo equivale a la direccion de
     *                  su primer elemento (&numeros[0]). O sea, le
     *                  mandamos un apuntador, no una copia.
     *   TAM_ARREGLO -> cuantos elementos tiene (40).
     *
     * Como la funcion trabaja sobre la misma memoria, al regresar
     * aqui nuestro arreglo "numeros" ya va a estar ordenado.
     */
    burbuja(numeros, TAM_ARREGLO);

    /* Mostramos el resultado */
    printf("\nArreglo ordenado:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    /* return 0 le dice al sistema operativo que todo salio bien */
    return 0;
}
