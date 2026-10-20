//Comentario 
#include<stdio.h>
#include<stdlib.h>
#include "pilaDinamicaDeclaracion.h"


int isEmpty(struct Nodo *tope){
	return tope==NULL;

}

void push(struct Nodo **tope, int valor){
	struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));
	if(nuevo==NULL){
		printf("Error al asignar memoria\n");
		return;
	}
	nuevo->dato=valor;
	nuevo->siguiente=*tope;
	*tope=nuevo;
}

int pop(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n\n");
		return -1;
	}
	struct Nodo *temp=*tope;
	int valor=temp->dato;
	*tope=temp->siguiente;
	free(temp);
	return valor;
}

int peek(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n");
		return -1;
	}
	return (*tope)->dato;

}

void destroy(struct Nodo **tope){
	struct Nodo *temp;
	while(*tope!=NULL){
		temp=*tope;
		*tope=(*tope)->siguiente;
		free(temp);
	}
}

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



