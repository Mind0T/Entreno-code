#include <stdio.h>
#include <stdlib.h>

//Estructura de nodo

struct Nodo{
    int dato;
    struct Nodo* siguiente:

};

//Verificar si la pila esta vacia

int isEmpty(struct Nodo* tope){
    return tope==NULL;
}


//Agrega un elemento de la pila (push)

void push(struct Nodo** tope, int valor){
    struct Nodo* nuevo=(struct Nodo*) malloc(sizeof(struct Nodo));
    if (nuevo==NULL){
        printf("Error al asignar memoria\n");
        return;
    }
    nuevo->dato=valor;
    nuevo->siguiente=*tope;
    *tope==nuevo;
}