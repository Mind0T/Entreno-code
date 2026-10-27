/* Cola estatica (arreglo circular) · implementacion */
#include <stdio.h>
#include <stdlib.h>
#include "declaracion.h"

void init(struct Cola *c){
	c->frente=0;
	c->final=-1;
	c->cantidad=0;
}

int isEmpty(struct Cola *c){
	return c->cantidad==0;
}

int isFull(struct Cola *c){
	return c->cantidad==MAX;
}

void enqueue(struct Cola *c, int valor){
	if(isFull(c)){
		printf("Error: la cola esta llena\n");
		return;
	}
	c->final=(c->final+1)%MAX;
	c->dato[c->final]=valor;
	c->cantidad++;
}

int dequeue(struct Cola *c){
	if(isEmpty(c)){
		printf("Error: la cola esta vacia\n");
		return -1;
	}
	int valor=c->dato[c->frente];
	c->frente=(c->frente+1)%MAX;
	c->cantidad--;
	return valor;
}

int front(struct Cola *c){
	if(isEmpty(c)){
		printf("Error: la cola esta vacia\n");
		return -1;
	}
	return c->dato[c->frente];
}

void printQueue(struct Cola *c){
	if(isEmpty(c)){
		printf("La cola esta vacia\n");
		return;
	}
	printf("Elementos de la cola (frente -> final): ");
	for(int k=0;k<c->cantidad;k++){
		printf("%d  ",c->dato[(c->frente+k)%MAX]);
	}
	printf("\n");
}
