//implementacion

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dec.h"


void init(struct Pila *p){
	p->tope=-1;
}
int isEmpty(struct Pila *p){
	return p->tope==-1;
}
int isFull(struct Pila *p){
	return p->tope==MAX-1;
}
void push(struct Pila *p,const char *valor){

}
int pop(struct Pila *p,char *destino){

}

int peek(struct Pila *p,char *destino){

}

void printStack(struct Pila *p){

	}
