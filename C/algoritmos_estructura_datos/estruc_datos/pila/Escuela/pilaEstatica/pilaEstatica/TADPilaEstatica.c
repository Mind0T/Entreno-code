#include <stdio.h>
#include <stdlib.h>
#include "TADPilaEstatica.h"


// Inicializar la pila
void inicializar(struct Pila *p) {
    p->tope = -1;
}

//Validar si esta vacia
int isEmpty(struct Pila *p) {
    return p->tope == -1;
}

//Validar si esta llena
int isFull(struct Pila *p) {
    return p->tope == MAX - 1;
}

// Push funcion para apilar
void push(struct Pila *p, int valor) {
    if (isFull(p)) {
        printf("Error: la pila esta llena\n");
        return;
    }
    p->datos[++(p->tope)]=valor;
}

//Pop
int pop(struct Pila *p) {
    if (isEmpty(p)) {
        printf("Error: la pila esta vacia\n");
        return -1;             
    }
                         
    return p->datos[(p->tope)--];
}

// Peek
int peek(struct Pila *p) {
    if (isEmpty(p)) {
        printf("Error: la pila esta vacia\n");
        return -1;
    }
    return p->datos[p->tope];
}

// Imprime nuestra pila 
void imprimirPila(struct Pila *p) {
    if (isEmpty(p)) {
        printf("La pila esta vacia\n");
        return;
    }
    printf("Elementos en la pila: ");
    for (int i = p->tope; i >= 0; i--) {
        printf("%d ", p->datos[i]);
    }
    printf("\n");
}
