#include <stdio.h>
#include <stdlib.h>
#include "cola_din_int_dec.h"

void init(struct Cola *c){
	c->frente=NULL;
	c->final=NULL;
}

int isEmpty(struct Cola *c){
	return c->frente==NULL;
}

void enqueue(struct Cola *c, int valor){
	struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));
	if(nuevo==NULL){
		printf("Error al asignar memoria\n");
		return;
	}
	nuevo->dato=valor;
	nuevo->siguiente=NULL;
	if(isEmpty(c)){
		c->frente=nuevo;
		c->final=nuevo;
	}
	else{
		c->final->siguiente=nuevo;
		c->final=nuevo;
	}
}

int dequeue(struct Cola *c){
	if(isEmpty(c)){
		printf("Error: la cola esta vacia\n");
		return -1;
	}
	struct Nodo *temp=c->frente;
	int dato=temp->dato;
	c->frente=temp->siguiente;
	if(c->frente==NULL){
		c->final=NULL;
	}
	free(temp);
	return dato;
}

int front(struct Cola *c){
	if(isEmpty(c)){
		printf("Error: la cola esta vacia\n");
		return -1;
	}
	return c->frente->dato;
}

void destroy(struct Cola *c){
	struct Nodo *temp;
	while(c->frente!=NULL){
		temp=c->frente;
		c->frente=c->frente->siguiente;
		free(temp);
	}
	c->final=NULL;
}

void printQueue(struct Cola *c){
	if(isEmpty(c)){
		printf("La cola esta vacia\n");
		return;
	}
	printf("Elementos de la cola (frente -> final): ");
	struct Nodo *actual=c->frente;
	while(actual!=NULL){
		printf("%d  ",actual->dato);
		actual=actual->siguiente;
	}
	printf("\n");
}
