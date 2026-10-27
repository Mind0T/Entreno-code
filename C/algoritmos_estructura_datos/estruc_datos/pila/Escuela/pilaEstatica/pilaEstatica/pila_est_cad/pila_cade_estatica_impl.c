#include <stdio.h>
#include <stdio.h>
#include <string.h>
#include "pila_cade_estatica_dec.h"


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
	if(isFull(p)){
		printf("\nLo siento no puedo apilar algun elemento\nLA PILA ESTA LLENA\n");
		return;
	}
	else{
		p->tope++;
		strncpy(p->dato[p->tope],valor,LONG-1);
		p->dato[p->tope][LONG-1]='\0';
	}
}

int pop(struct Pila *p,char *destino){
	if(isEmpty(p)){
		printf("\nLo siento no puedo extraer ningun elemento\nLA PILA ESTA VACIA\n");
		return 0;
	}
	strcpy(destino,p->dato[p->tope]);
	p->tope--;
	return 1;
}

int peek(struct Pila *p,char *destino){
	if(isEmpty(p)){
		printf("\nLo siento no puedo mostrar el ultimo elemento\nLA PILA ESTA VACIA\n");
		return 0;
	}
	strcpy(destino,p->dato[p->tope]);
	return 1;
}

void printStack(struct Pila *p){
	if(isEmpty(p)){
		printf("\nLo siento no puedo imprimir algun elemento\nLA PILA ESTA VACIA\n");
		return;
	}
	printf("\nElementos de la fila\n");
	for(int i=p->tope;i>=0;i--){
		printf("%s\n",p->dato[i]);
	}
	printf("\n\n");
}



















