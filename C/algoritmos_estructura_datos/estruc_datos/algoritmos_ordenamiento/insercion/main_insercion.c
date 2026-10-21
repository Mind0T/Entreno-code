/*
 * ============================================================================
 *  main_insercion.c
 * ============================================================================
 *  Programa principal: crea un arreglo de 40 numeros desordenados,
 *  lo imprime, lo ordena con insercion y lo vuelve a imprimir.
 *
 *  ¿COMO COMPILAR?
 *  ---------------
 *      gcc main_insercion.c implementacion_insercion.c -o insercion
 *
 *  Ejecutar:
 *      ./insercion        (Linux / Mac)
 *      insercion.exe      (Windows)
 * ============================================================================
 */

#include <stdio.h>

/* Con esto el main conoce insercion(), imprimirArreglo() y TAM_ARREGLO */
#include "declaracion_insercion.h"

int main() {
    /* Arreglo de 40 enteros desordenados (con repetidos y negativos) */
    int numeros[TAM_ARREGLO] = {
        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,
        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,
        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,
        50,  2, 88, 23, 64, 12, 71, 30, 57,  9
    };

    printf("=== ORDENAMIENTO POR INSERCION (Insertion Sort) ===\n\n");

    printf("Arreglo original:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    /*
     * Mandamos el arreglo (como apuntador a su primer elemento) y su
     * tamaño. La funcion lo ordena directamente en memoria.
     */
    insercion(numeros, TAM_ARREGLO);

    printf("\nArreglo ordenado:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    return 0;
}
