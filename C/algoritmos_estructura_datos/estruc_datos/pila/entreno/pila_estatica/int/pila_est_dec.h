#ifndef PILA_EST_DEC_H
#define PILA_EST_DEC_H
#define MAX 7

struct Pila{
	int dato[MAX];
	int tope;
};


void init(struct Pila *p);

int isEmpty(struct Pila *p);

int isFull(struct Pila *p);

void push(struct Pila *p,int valor);

int pop(struct Pila *p);

int peek(struct Pila *p);

void printStack(struct Pila *p);

void limpiarPantalla();

#endif