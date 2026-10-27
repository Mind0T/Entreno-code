//Pila est int imp

#include <stdio.h>
#include <stdlib.h>
#include "pila_est_int_dec.h"


void init(struct Pila *p){
	p->tope=-1;
}

int isFull(struct Pila *p){
	return p->tope==MAX-1;
}

int isEmpty(struct Pila *p){
	return p->tope==-1;
}

void push(struct Pila *p,int valor){
	if(isFull(p)){
		printf("\nLo siento \nLA PILA ESTA LLENA \n");
		return;
	}
	p->dato[++(p->tope)]=valor;
	printf("\nSe agrego %d a la pila\n",valor);

}


int pop(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento \nLA PILA ESTA VACIA \n");
		return 0;
	}
	return p->dato[(p->tope)--];
}

int peek(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento \nLA PILA ESTA  VACIA\n");
		return 0;
	}
	return p->dato[p->tope];
}

void printStack(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento \nLA PILA ESTA VACIA\n");
		return;
	}
	printf("\nElementos en la fila\n");
	for(int i=p->tope;i>=0;i--){
		printf("%d ",p->dato[i]);

	}	
}







