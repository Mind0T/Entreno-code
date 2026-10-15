#include <stdio.h>
#include "entrenoPilaDeclaracion.h"

int main(){

	struct Pila pila;

	init(&pila);
	
	printf("\n==ENTRENO PILA==\n");
	printf("\nINTENTAR IMPRIMIR LA PILA VACIA\n");
	printStack(&pila);
	printf("\nINTENTAR HACER POP Y PEEK EN LA PILA VACIA\n");
	pop(&pila);
	peek(&pila);

	printf("\nHACER 7 PUSH EN LA PILA 10,20,30,40,50,60,70\n");
	
	push(&pila,10);
	push(&pila,20);
	push(&pila,30);
	push(&pila,40);
	push(&pila,50);
	push(&pila,60);
	push(&pila,70);

	printStack(&pila);
	printf("\nINTENTAR HACER POP Y PEEK EN LA PILA YA CON CONTENIDO\n");
	printf("POP: %d\n",pop(&pila));
	printStack(&pila);
	printf("PEEL: %d",peek(&pila));
	printStack(&pila);

	printf("\nMI PILA TIENE UN TAMANIO DE 7 LOS CUALES YA ESTAN OCUPADOS SI INTENTO METER UN ELEMENTO MAS:\n");
	push(&pila,70);
	printf("\nY OTRO MAS\n");
	push(&pila,80);
	
	return 0;

}