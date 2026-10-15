#include <stdio.h>
#include <stdlib.h>
#include "entrenoPilaDeclaracion.h"


void init(struct Pila *p){
	p->tope=-1;
}

int isEmpty(struct Pila *p){
	return p->tope==-1;
}

int isFull(struct Pila *p){
	return p->tope==MAX-1;
}

void push(struct Pila *p, int valor){
	if(isFull(p)){
		printf("\nLo siento no puedo seguir apilando overflow\n");
	}
	p->datos[++(p->tope)]=valor;
}

int pop(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no es posible hacer pop la pila esta vacia\n");
		return 0;
	}
	return p->datos[(p->tope)--];
}

int peek(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no es posible hacer peek la pila esta vacia\n");
		return 0;
	}
	return p->datos[p->tope];
}


void printStack(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no hay nada que imprimir underflow\n");
	}
	else{
		printf("\nContenido de la pila\n");
		for(int i=p->tope;i>=0;i--){
			printf("%d  ",p->datos[i]);
		}
	}
	
	printf("\n\n");
}

