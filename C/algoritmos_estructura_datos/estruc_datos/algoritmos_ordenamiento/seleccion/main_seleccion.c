/*
 * ============================================================================
 *  main_seleccion.c
 * ============================================================================
 *  Programa principal: crea un arreglo de 40 numeros desordenados,
 *  lo imprime, lo ordena con seleccion y lo vuelve a imprimir.
 *
 *  ¿COMO COMPILAR?
 *  ---------------
 *  Se le pasan al compilador LOS DOS archivos .c:
 *
 *      gcc main_seleccion.c implementacion_seleccion.c -o seleccion
 *
 *  Ejecutar:
 *      ./seleccion        (Linux / Mac)
 *      seleccion.exe      (Windows)
 * ============================================================================
 */

#include <stdio.h>

/* Con esto el main conoce seleccion(), imprimirArreglo() y TAM_ARREGLO */
#include "declaracion_seleccion.h"

int main() {
    /*
     * Arreglo de 40 enteros desordenados (con repetidos y negativos).
     */
    int numeros[TAM_ARREGLO] = {
        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,
        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,
        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,
        50,  2, 88, 23, 64, 12, 71, 30, 57,  9
    };

    printf("=== ORDENAMIENTO POR SELECCION (Selection Sort) ===\n\n");

    printf("Arreglo original:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    /*
     * Le mandamos a seleccion el arreglo (su nombre = direccion de su
     * primer elemento, o sea un apuntador) y el tamaño.
     * La funcion modifica la memoria del arreglo directamente, por eso
     * no necesitamos que nos "regrese" nada.
     */
    seleccion(numeros, TAM_ARREGLO);

    printf("\nArreglo ordenado:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    return 0;
}
