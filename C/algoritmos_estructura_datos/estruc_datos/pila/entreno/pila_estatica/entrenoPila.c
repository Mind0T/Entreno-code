//Aqui vamos a darle a la funcion main donde ocuparemos nuestra estructura de datos pila
//Primero importamos nuestras librerias stdio y nuestra libreria

#include <stdio.h>
#include "entrenoPilaDeclaracion.h"


int main(){
	struct Pila pila;		//Declaramos una variable pila de tipo struct Pila
	char nombre[LONG];
	init(&pila);

	printf("\nVamos a imprimir la pila sin nada\n");
	printStack(&pila);

	printf("\nVamos a hacer un POP y un PEEK a la pila vacia\n");
	pop(&pila,nombre);
	peek(&pila,nombre);
	printf("\nAhora ingrese los valores 10,20,30,40,50 y la imprimo\n");
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

	
	
	return 0;	
}