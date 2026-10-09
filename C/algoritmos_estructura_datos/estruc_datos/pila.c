#include <stdio.h>

#define MAX 100 // tamanio maximo de la pila

//Definicion de la pila
struct Pila{
    int datos[MAX];
    int tope;
};
//Inicializar la pila
void inicializar(struct Pila *p){
    p->tope-1;
}
//Validar si esta vacia

int isEmpy(struct Pila *p){
    if(p->tope==-1)
        return 1;
    else    
        return 0;
}
//Validar si esta llena
int isFull(struct Pila *p){
    return p->tope==MAX -1;
}

//Funcion para apilar
void push(struct Pila* p, int valor){
    if(isFull(p)){
        printf("Pila llena\n");
        return;
    }
    p->datos[++(p->tope)]=valor;
}

int pop(struct Pila* p){
    if(isEmpy(p)){
        print("La pila esta vacia\n");
        return -1;
    }
    return p->datos[(p->tope)--];
}

int peek(struct Pila* p){
    if(isEmpy(p)){
        printf("La pila esta vacia\n");
        return -1;
    }
    return p->datos[p->tope];
}

//Principal
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