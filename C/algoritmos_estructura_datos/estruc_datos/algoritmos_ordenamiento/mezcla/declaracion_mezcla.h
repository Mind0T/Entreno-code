/*
 * ============================================================================
 *  declaracion_mezcla.h
 * ============================================================================
 *  Archivo de CABECERA (header). Solo DECLARA las funciones (nombre,
 *  parametros y tipo de retorno). El codigo esta en
 *  implementacion_mezcla.c.
 *
 *      declaracion_mezcla.h      -> QUE funciones existen (este archivo)
 *      implementacion_mezcla.c   -> COMO funcionan por dentro
 *      main_mezcla.c             -> el programa que las USA
 *
 *  A diferencia de los otros algoritmos, Merge Sort (mezcla) usa DOS
 *  funciones para ordenar:
 *    - mezcla() -> divide el arreglo en mitades (se llama a si misma:
 *                  RECURSIVIDAD).
 *    - juntar() -> une dos mitades que ya estan ordenadas.
 * ============================================================================
 */

/*
 * Guardas de inclusion: evitan que el header se lea dos veces.
 */
#ifndef DECLARACION_MEZCLA_H
#define DECLARACION_MEZCLA_H

/* Cuantos numeros vamos a ordenar */
#define TAM_ARREGLO 40

/*
 * ---------------------------------------------------------------------------
 *  mezcla
 * ---------------------------------------------------------------------------
 *  Ordena de menor a mayor la parte del arreglo que va desde la
 *  posicion "inicio" hasta la posicion "fin" (incluyendo ambas).
 *
 *  Recibe:
 *    int numeros[] -> el arreglo del main, como APUNTADOR a su primer
 *                     elemento (igual que int *numeros). Todas las
 *                     llamadas recursivas trabajan sobre ESE MISMO
 *                     arreglo, no sobre copias.
 *    int inicio    -> primera posicion del pedazo a ordenar.
 *    int fin       -> ultima posicion del pedazo a ordenar.
 *
 *  ¿Por que recibe inicio y fin en vez de tam?
 *  Porque la funcion se llama a si misma con PEDAZOS del arreglo
 *  (la mitad izquierda, la mitad derecha...). Con inicio y fin le
 *  decimos en que pedazo trabajar sin tener que copiar el arreglo.
 *  Desde el main se llama con todo el arreglo: mezcla(numeros, 0, 39).
 *
 *  Regresa: void (nada).
 */
void mezcla(int numeros[], int inicio, int fin);

/*
 * ---------------------------------------------------------------------------
 *  juntar
 * ---------------------------------------------------------------------------
 *  Une (mezcla) dos partes CONSECUTIVAS del arreglo que YA estan
 *  ordenadas, para que juntas queden ordenadas:
 *     parte izquierda: de "inicio"    a "mitad"
 *     parte derecha:   de "mitad + 1" a "fin"
 *
 *  Recibe: el arreglo (apuntador) y las tres posiciones.
 *  Regresa: void (nada).
 */
void juntar(int numeros[], int inicio, int mitad, int fin);

/*
 * ---------------------------------------------------------------------------
 *  imprimirArreglo
 * ---------------------------------------------------------------------------
 *  Imprime todos los elementos del arreglo en una linea.
 */
void imprimirArreglo(int numeros[], int tam);

#endif /* DECLARACION_MEZCLA_H */
