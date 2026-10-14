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
		printf("Lo siento la pila esta llena \n");
	}
	p->datos[++(p->tope)]=valor;
}


int pop(struct Pila *p){
	if(isEmpty(p)){
		printf("No es posible hacer POP la pila esta vacia\n");
		return 0;
	}
	return p->datos[(p->tope)--];
}

int peek(struct Pila *p){
	if(isEmpty(p)){
		printf("No es posible hacer PEEK la pila esta vacia \n");
		return 0;
	}
	return p->datos[p->tope];
}

void imprimirPila(struct Pila *p){
	if(isEmpty(p)){
		printf("No es posible imprimir la pila ya que esta vacia\n");
	}
	printf("\nElementos de la pila\n");
	for(int i=p->tope;i>=0;i--){
		printf("%d  ",p->datos[i]);
	}
	printf("\n");
}