#include <stdio.h>
#include "entrenoPilaDeclaracion.h"

int main (){

	struct Pila pila;
	init(&pila);
	printf("Aqui hay un pop con la pila vacia\n");

	printf("%d",pop(&pila));
	push(&pila,20);
	push(&pila,40);
	push(&pila, 60);
	imprimirPila(&pila);

	printf("Aqui hay un pop con la pila ya con elementos\n");

	printf("Elemento extraido: %d\n",pop(&pila));

	imprimirPila(&pila);	

	printf("\nAqui hay un peek con la pila ya con elementos\n");
	printf("Elemento extraido con peek: %d\n",peek(&pila));
	imprimirPila(&pila);
	printf("\nAgregando otros 5 elementos a la pila");
	push(&pila,60);
	push(&pila,80);
	push(&pila, 100);
	push(&pila,120);
	push(&pila, 140);
	imprimirPila(&pila);
	printf("Mi pila es de 7 elementos esto es lo que sucede si agrego otro:\n");
	push(&pila,160);

	return 0;
}
