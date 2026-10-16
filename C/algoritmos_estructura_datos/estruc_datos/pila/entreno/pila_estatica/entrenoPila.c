//Aqui vamos a darle a la funcion main donde ocuparemos nuestra estructura de datos pila
//Primero importamos nuestras librerias stdio y nuestra libreria

#include <stdio.h>
#include "entrenoPilaDeclaracion.h"


int main(){
	struct Pila pila;		//Declaramos una variable pila de tipo struct Pila
	init(&pila);

	printf("\nVamos a imprimir la pila sin nada\n");
	printStack(&pila);

	printf("\nVamos a hacer un POP y un PEEK a la pila vacia\n");
	pop(&pila);
	peek(&pila);
	printf("\nAhora ingrese los valores 10,20,30,40,50 y la imprimo\n");
	push(&pila,10);
	push(&pila,20);
	push(&pila,30);
	push(&pila,40);
	push(&pila,50);
	printStack(&pila);

	printf("\nAhora si vamos a aplicar un POP y un PEEK\n");
	printf("\nSe extrajo: %d\n",pop(&pila));
	printStack(&pila);
	printf("\nTe muestro: %d\n",peek(&pila));
	printStack(&pila);

	printf("\nMi pila es de 7 elementos si agrego otros tres elementos\n");
	push(&pila,60);
	push(&pila,70);
	push(&pila,80);
	printStack(&pila);
	printf("\nYa tiene 7 elementos apilados si trato de apilar un octavo:\n");
	push(&pila,90);
	
	return 0;	
}