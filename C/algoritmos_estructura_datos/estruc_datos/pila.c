#include <stdio.h>

#define MAX 100
struct Pila{
    int datos[MAX];
    int tope;
};

void inicializar(struct Pila *p){
    p->tope-1;
}

int isEmpy(struct Pila *p){
    if(p->tope==-1)
        return 1;
    else    
        return 0;
}
int isFull(struct Pila *p){
    return p->tope==MAX -1;
}
int main(){

    struct Pila pila;
    inicializar(&pila);

    push(&pila,10);
    push(&pila,30);
    push(&pila,30);
    imprimirPila(&pila);
    //printf("Elemento en el tope: %d\n", peek())
    return 0;
}