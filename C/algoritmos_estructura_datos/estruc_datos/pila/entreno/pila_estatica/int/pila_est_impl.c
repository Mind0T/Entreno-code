
#include <stdio.h>
#include "pila_est_dec.h"

void init(struct Pila *p){
	p->tope=-1;
}

int isEmpty(struct Pila *p){
	return p->tope==-1;
}

int isFull(struct Pila *p){
	return p->tope==MAX-1;
}

void push(struct Pila *p,int valor){
	if(isFull(p)){
		printf("\nLo siento no puedo seguir apilando\nLA PILA ESTA LLENA\n");
		return;
	}
	p->dato[++(p->tope)]=valor;
}

int pop(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no puedo extraer el ultimo elemento\nLA PILA ESTA VACIA\n");
		return 0;
	}
	return p->dato[(p->tope)--];
}

int peek(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no puedo mostrarte el ultimo elemento\nLA PILA ESTA VACIA\n");
		return 0;
	}
	return p->dato[p->tope];
}

void printStack(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no puedo imprimir la pila\nLA PILA ESTA VACIA\n");
		return;
	}

	for(int i=p->tope;i>=0;i--){
		printf("%d ",p->dato[i]);
	}
	printf("\n\n");
}

void limpiarPantalla() {
    printf("\033[2J\033[H");
}