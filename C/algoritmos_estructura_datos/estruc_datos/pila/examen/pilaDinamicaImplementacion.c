/*
 * ============================================================================
 *  pilaDinamicaImplementacion.c
 * ============================================================================
 *
 *  Aquí vive el CÓDIGO REAL de las seis funciones de la pila dinámica
 *  (las que se "prometieron" en pilaDinamicaDeclaracion.h).
 *
 *  LIBRERÍAS QUE SE USAN:
 *      - <stdio.h>  → para printf (mostrar mensajes de error o imprimir).
 *      - <stdlib.h> → para malloc y free, que son LA razón de que esta
 *                     pila sea DINÁMICA. malloc pide memoria del heap en
 *                     tiempo de ejecución; free la devuelve al sistema.
 *      - "pilaDinamicaDeclaracion.h" → donde está definido struct Nodo
 *                     y los prototipos. Sin este include, el compilador
 *                     no sabría qué es "struct Nodo".
 *
 * ============================================================================
 */
#include <stdio.h>
#include <stdlib.h>
#include "pilaDinamicaDeclaracion.h"


/* ----------------------------------------------------------------------------
 * isEmpty
 * ----------------------------------------------------------------------------
 *
 *  Recibe: el apuntador al nodo tope (puede ser NULL).
 *  Devuelve: 1 si la pila está vacía, 0 si tiene al menos un nodo.
 *
 *  ¿POR QUÉ FUNCIONA ASÍ?
 *  Porque la convención de la pila dinámica es que "pila vacía" se
 *  representa con tope == NULL. Entonces basta con comparar.
 *
 *  La expresión "tope == NULL" devuelve directamente 1 (verdadero) o 0
 *  (falso), así que podemos retornarla sin un if.
 * ----------------------------------------------------------------------------
 */
int isEmpty(struct Nodo *tope){
	return tope==NULL;
}


/* ----------------------------------------------------------------------------
 * push — APILAR un valor
 * ----------------------------------------------------------------------------
 *
 *  Recibe:
 *      - struct Nodo **tope: la DIRECCIÓN del apuntador tope en main.
 *        Doble asterisco porque vamos a modificarlo (ver header).
 *      - int valor: el dato a apilar.
 *
 *  Pasos conceptuales (los famosos "cuatro pasos del push"):
 *      1. Pedir memoria para un nodo nuevo con malloc.
 *      2. Verificar que malloc tuvo éxito (si devolvió NULL, el sistema
 *         no tenía memoria disponible → no podemos continuar).
 *      3. Encadenar: el campo 'siguiente' del nodo nuevo debe apuntar
 *         al tope VIEJO. Así el nodo nuevo "queda arriba" de la pila.
 *      4. Mover el tope: ahora el tope es el nodo nuevo.
 *
 *  EL ORDEN DE 3 Y 4 ES CRUCIAL. Si pusieras primero "*tope = nuevo" y
 *  después "nuevo->siguiente = *tope", el nodo nuevo acabaría apuntando
 *  a sí mismo y perderías TODA la pila anterior.
 * ----------------------------------------------------------------------------
 */
void push(struct Nodo **tope, int valor){
	/* Paso 1: pedir memoria del heap para UN nodo */
	struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));

	/* Paso 2: ¿malloc nos dio memoria? Si devuelve NULL, no hay espacio */
	if(nuevo==NULL){
		printf("Error al asignar memoria\n");
		return;
	}

	/* Guardamos el dato que nos pidieron apilar */
	nuevo->dato=valor;

	/* Paso 3: el nodo nuevo "se agarra" del tope viejo */
	nuevo->siguiente=*tope;

	/* Paso 4: el tope ahora ES el nodo nuevo */
	*tope=nuevo;
}


/* ----------------------------------------------------------------------------
 * pop — DESAPILAR (extraer el tope)
 * ----------------------------------------------------------------------------
 *
 *  Recibe: la dirección del tope (doble apuntador, porque lo vamos a bajar).
 *  Devuelve: el valor que estaba en el tope. Si la pila estaba vacía,
 *            devuelve -1 como "código de error".
 *
 *  Pasos conceptuales:
 *      1. Si la pila está vacía, no hay nada que extraer → avisamos y
 *         devolvemos -1.
 *      2. Guardamos en 'temp' una copia del tope. ¿Por qué? Porque
 *         vamos a mover el tope en el paso 4 y después queremos
 *         liberar el nodo viejo con free. Si no lo "sostuviéramos" con
 *         temp, perderíamos su dirección y quedaría memoria fugada.
 *      3. Rescatamos su dato antes de destruirlo.
 *      4. Bajamos el tope al segundo nodo (temp->siguiente).
 *      5. Liberamos la memoria del nodo que ya quitamos.
 *      6. Devolvemos el valor rescatado.
 * ----------------------------------------------------------------------------
 */
int pop(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n\n");
		return -1;
	}
	struct Nodo *temp=*tope;      /* 2. sostenemos el tope */
	int valor=temp->dato;         /* 3. rescatamos el dato */
	*tope=temp->siguiente;        /* 4. el tope baja uno */
	free(temp);                   /* 5. devolvemos la memoria al sistema */
	return valor;                 /* 6. le damos su valor al que nos llamó */
}


/* ----------------------------------------------------------------------------
 * peek — MIRAR el tope SIN QUITARLO
 * ----------------------------------------------------------------------------
 *
 *  Recibe: la dirección del tope. (Aquí NO modificamos la pila, pero
 *  dejamos ** por coherencia con las demás funciones. Técnicamente
 *  podría ser *tope solamente.)
 *  Devuelve: el valor del tope, o -1 si está vacía.
 *
 *  DETALLE DE SINTAXIS: (*tope)->dato.
 *      - *tope      → "ve a la dirección que guarda tope y dame lo que
 *                     hay allí" (es decir, el struct Nodo* que apunta
 *                     al primer nodo).
 *      - (*tope)->  → de ESE apuntador, accede a su campo dato.
 *      - Los paréntesis son OBLIGATORIOS: sin ellos, *tope->dato se
 *        interpreta como *(tope->dato), que no compila (tope es un
 *        doble apuntador, no tiene campos directamente).
 * ----------------------------------------------------------------------------
 */
int peek(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n");
		return -1;
	}
	return (*tope)->dato;
}


/* ----------------------------------------------------------------------------
 * destroy — DESTRUIR toda la pila (liberar TODA la memoria)
 * ----------------------------------------------------------------------------
 *
 *  Recibe: la dirección del tope.
 *
 *  Lógica: hacer pop en bucle hasta que la pila quede vacía, pero sin
 *  interesarnos por el valor que sale. Al terminar, *tope == NULL y
 *  no queda NI UN byte reservado por esta pila en el heap.
 *
 *  ¿POR QUÉ IMPORTA?
 *  Cada nodo lo pedimos con malloc, y malloc NO se libera solo. Si al
 *  terminar el programa dejamos nodos sin free, se llama "memory leak"
 *  (fuga de memoria). En un programa pequeño no se nota, pero en uno
 *  que corre horas o días puede comerse toda la RAM.
 * ----------------------------------------------------------------------------
 */
void destroy(struct Nodo **tope){
	struct Nodo *temp;
	while(*tope!=NULL){
		temp=*tope;                   /* sostengo el tope */
		*tope=(*tope)->siguiente;     /* el tope baja uno */
		free(temp);                   /* libero el que acabo de dejar atrás */
	}
	/* Al salir del while, *tope ya es NULL automáticamente. */
}


/* ----------------------------------------------------------------------------
 * printStack — IMPRIMIR los elementos de la pila
 * ----------------------------------------------------------------------------
 *
 *  Recorre la pila SIN modificarla. La idea del recorrido:
 *      - Empiezo en el tope (actual = *tope).
 *      - Mientras actual no sea NULL, imprimo su dato y avanzo
 *        con actual = actual->siguiente.
 *      - Cuando actual sea NULL, llegué al final.
 *
 *  Este patrón "while (actual != NULL) { ... actual = actual->siguiente; }"
 *  es LA forma estándar de recorrer una lista enlazada en C. Lo verás
 *  en todas las estructuras basadas en nodos: colas, listas simples,
 *  listas dobles, árboles, grafos (adaptado).
 * ----------------------------------------------------------------------------
 */
void printStack(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("La pila esta vacia\n");
		return;
	}
	printf("Elementos de la pila\n");
	struct Nodo *actual=*tope;
	while(actual!=NULL){
		printf("%d  ",actual->dato);
		actual=actual->siguiente;
	}
	printf("\n");
}
