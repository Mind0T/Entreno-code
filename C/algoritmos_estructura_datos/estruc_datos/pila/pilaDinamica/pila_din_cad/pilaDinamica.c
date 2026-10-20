#include <stdio.h>
#include <stdlib.h>
#include "pilaDinamicaDeclaracion.h"


int main(){
	struct Nodo *pila=NULL;
	push(&pila,"Irving Soriano");
	push(&pila,"Brenda Martinez");

	printStack(&pila);

	printf("Elemento en el tope: %s\n", peek(&pila));

	char *extraido=pop(&pila);
	printf("Elemento extraido: %s\n", extraido);
	free(extraido);

	printStack(&pila);

	destroy(&pila);

	return 0;
}
