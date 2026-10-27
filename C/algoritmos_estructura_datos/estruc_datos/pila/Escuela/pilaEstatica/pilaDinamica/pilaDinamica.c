#include <stdio.h>
#include "pilaDinamicaDeclaracion.h"


int main(){
	struct Nodo *pila=NULL;
	push(&pila,10);
	push(&pila,20);
	push(&pila,30);
	push(&pila,40);
	
	printStack(&pila);
	
	printf("Elemento en el tope: %d\n", peek(&pila));
	printf("Elemento extraido: %d\n",pop(&pila));
	printStack(&pila);

	destroy(&pila);

	return 0;
}






