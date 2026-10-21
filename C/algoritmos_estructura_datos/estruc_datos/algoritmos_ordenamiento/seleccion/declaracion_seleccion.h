/*
 * ============================================================================
 *  declaracion_seleccion.h
 * ============================================================================
 *  Archivo de CABECERA (header). Aqui SOLO se DECLARAN las funciones:
 *  nombre, que reciben y que regresan. El codigo de lo que hacen esta en
 *  implementacion_seleccion.c.
 *
 *  Piensalo como el "contrato": cualquier archivo que haga
 *  #include "declaracion_seleccion.h" sabe que puede llamar a estas
 *  funciones y con que parametros.
 *
 *      declaracion_seleccion.h      -> QUE funciones existen (este archivo)
 *      implementacion_seleccion.c   -> COMO funcionan por dentro
 *      main_seleccion.c             -> el programa que las USA
 * ============================================================================
 */

/*
 * Guardas de inclusion: evitan que el contenido se lea dos veces si el
 * header se incluye mas de una vez. La primera vez la etiqueta
 * DECLARACION_SELECCION_H no existe, entonces se define y se lee todo;
 * la segunda vez ya existe y se salta hasta el #endif.
 */
#ifndef DECLARACION_SELECCION_H
#define DECLARACION_SELECCION_H

/* Constante: cuantos numeros vamos a ordenar en el main */
#define TAM_ARREGLO 40

/*
 * ---------------------------------------------------------------------------
 *  seleccion
 * ---------------------------------------------------------------------------
 *  Ordena el arreglo de menor a mayor usando Selection Sort
 *  (ordenamiento por seleccion).
 *
 *  Recibe:
 *    int numeros[] -> el arreglo del main. En C un arreglo se pasa como
 *                     APUNTADOR a su primer elemento (int numeros[] es
 *                     igual a int *numeros). Por eso los cambios que haga
 *                     la funcion se reflejan en el arreglo original.
 *    int tam       -> cuantos elementos tiene. La funcion solo recibe
 *                     una direccion de memoria y no sabe donde termina
 *                     el arreglo, por eso hay que decirselo.
 *
 *  Regresa: void (nada), ordena directamente sobre el arreglo.
 */
void seleccion(int numeros[], int tam);

/*
 * ---------------------------------------------------------------------------
 *  imprimirArreglo
 * ---------------------------------------------------------------------------
 *  Imprime todos los elementos del arreglo en una linea.
 */
void imprimirArreglo(int numeros[], int tam);

#endif /* DECLARACION_SELECCION_H */
