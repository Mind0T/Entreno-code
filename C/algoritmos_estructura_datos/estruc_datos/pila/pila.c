#include <stdio.h>

#define MAX 100

struct Pila {
    int datos[MAX];
    int tope;
};

// Inicializar
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

// Push
void push(struct Pila *p, int valor) {
    if (isFull(p)) {
        printf("Error: la pila esta llena (overflow)\n");
        return;
    }
    p->tope++;                  // 1) sube el tope
    p->datos[p->tope] = valor;  // 2) guarda el dato
}

//Pop
int pop(struct Pila *p) {
    if (isEmpty(p)) {
        printf("Error: la pila esta vacia (underflow)\n");
        return -1;              // valor de error
    }
    int valor = p->datos[p->tope];  // 1) guarda el dato
    p->tope--;                      // 2) baja el tope
    return valor;
}

// Peek
int peek(struct Pila *p) {
    if (isEmpty(p)) {
        printf("Error: la pila esta vacia\n");
        return -1;
    }
    return p->datos[p->tope];
}

// Imprime
void imprimirPila(struct Pila *p) {
    if (isEmpty(p)) {
        printf("La pila esta vacia\n");
        return;
    }
    printf("Pila (tope -> base): ");
    for (int i = p->tope; i >= 0; i--) {
        printf("%d ", p->datos[i]);
    }
    printf("\n");
}

int main() {
    struct Pila pila;
    inicializar(&pila);

    push(&pila, 10);
    push(&pila, 20);
    push(&pila, 30);
    imprimirPila(&pila);
    printf("Elemento en el tope: %d\n", peek(&pila));

    printf("Saco: %d\n", pop(&pila));
    imprimirPila(&pila);

    return 0;
}