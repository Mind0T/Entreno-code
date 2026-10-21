/*
 * ============================================================================
 *  declaracion_insercion.h
 * ============================================================================
 *  Archivo de CABECERA (header). Solo DECLARA las funciones (nombre,
 *  parametros y tipo de retorno). El codigo esta en
 *  implementacion_insercion.c.
 *
 *      declaracion_insercion.h      -> QUE funciones existen (este archivo)
 *      implementacion_insercion.c   -> COMO funcionan por dentro
 *      main_insercion.c             -> el programa que las USA
 * ============================================================================
 */

/*
 * Guardas de inclusion: si este header se incluye dos veces, la segunda
 * vez se ignora (porque DECLARACION_INSERCION_H ya quedo definida).
 */
#ifndef DECLARACION_INSERCION_H
#define DECLARACION_INSERCION_H

/* Cuantos numeros vamos a ordenar */
#define TAM_ARREGLO 40

/*
 * ---------------------------------------------------------------------------
 *  insercion
 * ---------------------------------------------------------------------------
 *  Ordena el arreglo de menor a mayor usando Insertion Sort
 *  (ordenamiento por insercion).
 *
 *  Recibe:
 *    int numeros[] -> el arreglo del main. Se recibe como APUNTADOR a su
 *                     primer elemento (equivale a int *numeros), asi que
 *                     la funcion modifica el arreglo ORIGINAL, no una
 *                     copia.
 *    int tam       -> cantidad de elementos del arreglo.
 *
 *  Regresa: void (nada).
 */
void insercion(int numeros[], int tam);

/*
 * ---------------------------------------------------------------------------
 *  imprimirArreglo
 * ---------------------------------------------------------------------------
 *  Imprime todos los elementos del arreglo en una linea.
 */
void imprimirArreglo(int numeros[], int tam);

#endif /* DECLARACION_INSERCION_H */
