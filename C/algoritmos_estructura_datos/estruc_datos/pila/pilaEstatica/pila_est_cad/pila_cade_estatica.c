//Aqui vamos a darle a la funcion main donde ocuparemos nuestra estructura de datos pila
//Primero importamos nuestras librerias stdio y nuestra libreria

#include <stdio.h>
#include "pila_cade_estatica_dec.h"

int main(){
	struct Pila pila;
	char nombre[LONG];
	init(&pila);

	printf("\nVamos a imprimir la pila sin nada\n");
	printStack(&pila);

	printf("\nVamos a hacer un POP y un PEEK a la pila vacia\n");
	pop(&pila,nombre);
	peek(&pila,nombre);
	printf("\nAhora ingrese los valores\n'Irvin Soriano'\n'Brenda Martinez'\n'Dilan Soriano'\n'Diana Martinez'\n'Jaime Soriano'\n");
	push(&pila,"Irvin Soriano");
	push(&pila,"Brenda Martinez");
	push(&pila,"Dilan Soriano");
	push(&pila,"Diana Martinez");
	push(&pila,"Jaime Soriano");
	printStack(&pila);

	printf("\nAhora si vamos a aplicar un POP y un PEEK\n");
	if(pop(&pila,nombre))
		printf("\nSe extrajo: %s\n",nombre);
	printStack(&pila);
	if(peek(&pila,nombre))
		printf("\nTe muestro: %s\n",nombre);
	printStack(&pila);

	printf("\nMeto otros tres elementos para quedar full\n");
	push(&pila,"Maru Reyes");
	push(&pila,"Isabel Rosales");
	push(&pila,"Jaime Soriano");
	printStack(&pila);

	printf("\nAhora intento meter un octavo elemento\n");
	push(&pila,"Lalo Martinez");
	
	return 0;	
}