/*
 * ============================================================================
 *  main_mezcla.c
 * ============================================================================
 *  Programa principal: crea un arreglo de 40 numeros desordenados,
 *  lo imprime, lo ordena con mezcla (Merge Sort) y lo vuelve a imprimir.
 *
 *  ¿COMO COMPILAR?
 *  ---------------
 *      gcc main_mezcla.c implementacion_mezcla.c -o mezcla
 *
 *  Ejecutar:
 *      ./mezcla        (Linux / Mac)
 *      mezcla.exe      (Windows)
 * ============================================================================
 */

#include <stdio.h>

/* Con esto el main conoce mezcla(), juntar(), imprimirArreglo() y TAM_ARREGLO */
#include "declaracion_mezcla.h"

int main() {
    /* Arreglo de 40 enteros desordenados (con repetidos y negativos) */
    int numeros[TAM_ARREGLO] = {
        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,
        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,
        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,
        50,  2, 88, 23, 64, 12, 71, 30, 57,  9
    };

    printf("=== ORDENAMIENTO POR MEZCLA (Merge Sort) ===\n\n");

    printf("Arreglo original:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    /*
     * OJO: aqui NO mandamos el tamaño, sino el rango de posiciones:
     *   inicio = 0                -> primera posicion
     *   fin    = TAM_ARREGLO - 1  -> ultima posicion (39)
     * Es TAM_ARREGLO - 1 porque las posiciones van de 0 a 39; la 40 no
     * existe.
     *
     * Desde aqui mezcla() se va a ir llamando a si misma con pedazos
     * cada vez mas chicos, todos sobre este mismo arreglo.
     */
    mezcla(numeros, 0, TAM_ARREGLO - 1);

    printf("\nArreglo ordenado:\n");
    imprimirArreglo(numeros, TAM_ARREGLO);

    return 0;
}
