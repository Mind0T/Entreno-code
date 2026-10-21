/*
 * ============================================================================
 *  declaracion_burbuja.h
 * ============================================================================
 *  Este es un archivo de CABECERA (header). Su extension es .h
 *
 *  ¿Para que sirve un header?
 *  ---------------------------
 *  Aqui SOLO DECLARAMOS las funciones (decimos como se llaman, que reciben
 *  y que regresan), pero NO escribimos lo que hacen por dentro.
 *  Es como el "indice" o el "menu" de un restaurante: te dice que platillos
 *  hay, pero la receta esta en otro lado (en implementacion_burbuja.c).
 *
 *  El main hace  #include "declaracion_burbuja.h"  y con eso ya "conoce"
 *  las funciones y las puede llamar, aunque el codigo real este en otro
 *  archivo .c. El compilador junta todo al final.
 *
 *  Como se divide el programa:
 *      declaracion_burbuja.h      -> QUE funciones existen (este archivo)
 *      implementacion_burbuja.c   -> COMO funcionan por dentro
 *      main_burbuja.c             -> el programa que las USA
 * ============================================================================
 */

/*
 * ---------------- GUARDAS DE INCLUSION (include guards) ----------------
 * Estas tres lineas (#ifndef, #define y el #endif del final) evitan que
 * este archivo se incluya DOS veces en el mismo programa. Si pasara eso,
 * el compilador se quejaria de que las funciones estan declaradas
 * repetidas.
 *
 *  #ifndef DECLARACION_BURBUJA_H  -> "si NO esta definida esta etiqueta..."
 *  #define DECLARACION_BURBUJA_H  -> "...definela ahora y lee el archivo"
 *  #endif                         -> "fin del si"
 *
 * La segunda vez que alguien lo incluya, la etiqueta ya existe y el
 * compilador se salta todo el contenido.
 */
#ifndef DECLARACION_BURBUJA_H
#define DECLARACION_BURBUJA_H

/*
 * #define crea una CONSTANTE. Antes de compilar, el compilador cambia
 * cada TAM_ARREGLO que encuentre por el numero 40.
 * Asi, si un dia quieres ordenar 100 numeros, solo cambias este valor.
 */
#define TAM_ARREGLO 40

/*
 * ---------------------------------------------------------------------------
 *  burbuja
 * ---------------------------------------------------------------------------
 *  Ordena el arreglo de menor a mayor usando Bubble Sort (ordenamiento
 *  burbuja).
 *
 *  Recibe:
 *    int numeros[] -> el arreglo que viene desde el main.
 *                     OJO: en C, cuando pasas un arreglo a una funcion,
 *                     en realidad se pasa un APUNTADOR a su primer
 *                     elemento (la direccion de memoria de numeros[0]).
 *                     Escribir  int numeros[]  es lo mismo que escribir
 *                     int *numeros. Por eso, si la funcion cambia el
 *                     arreglo, el cambio SI se ve en el main: las dos
 *                     estan trabajando sobre la misma memoria.
 *    int tam       -> cuantos elementos tiene el arreglo. La funcion
 *                     no tiene forma de saberlo sola (solo recibe una
 *                     direccion), por eso se lo mandamos.
 *
 *  Regresa:
 *    void -> no regresa nada, porque ordena el arreglo "en su lugar".
 */
void burbuja(int numeros[], int tam);

/*
 * ---------------------------------------------------------------------------
 *  imprimirArreglo
 * ---------------------------------------------------------------------------
 *  Muestra en pantalla todos los elementos del arreglo, separados por
 *  espacios. Sirve para ver el "antes" y el "despues".
 *
 *  Recibe: el arreglo y su tamaño (igual que burbuja).
 *  Regresa: nada (void).
 */
void imprimirArreglo(int numeros[], int tam);

#endif /* DECLARACION_BURBUJA_H */
