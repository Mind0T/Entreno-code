
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include "pilaDinamicaDeclaracion.h"


int isEmpty(struct Nodo *tope){
	return tope==NULL;

}

void push(struct Nodo **tope,char *valor){
	struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));
	if(nuevo==NULL){
		printf("Error al asignar memoria para el nodo\n");
		return;
	}
	nuevo->dato=(char *)malloc(strlen(valor)+1);
	if(nuevo->dato==NULL){
		printf("Error al asignar memoria para la cadena\n");
		free(nuevo);
		return;
	}
	strcpy(nuevo->dato,valor);
	nuevo->siguiente=*tope;
	*tope=nuevo;
}

char *pop(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n\n");
		return NULL;
	}
	struct Nodo *temp=*tope;
	char *valor=temp->dato;
	*tope=temp->siguiente;
	free(temp);
	return (*tope)->dato;
}

char *peek(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n");
		return NULL;
	}
	return (*tope)->dato;

}

void destroy(struct Nodo **tope){
	struct Nodo *temp;
	while(*tope!=NULL){
		temp=*tope;
		*tope=(*tope)->siguiente;
		free(temp->dato);
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
		printf("%s  ",actual->dato);
		actual=actual->siguiente;
	}
	printf("\n");
}




