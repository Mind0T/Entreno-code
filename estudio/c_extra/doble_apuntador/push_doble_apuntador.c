#include <stdio.h>
#include <stdlib.h>

struct Nodo{
	int dato;
	struct Nodo* siguiente;
};

void pushBien(struct Nodo **tope, int valor){
	struct Nodo *nuevo = (struct Nodo *)malloc(sizeof(struct Nodo));
	nuevo->dato = valor;
	nuevo->siguiente = *tope;
	*tope = nuevo;
}

int main(){
	struct Nodo *pila = NULL;

	pushBien(&pila, 10);
	pushBien(&pila, 20);

	return 0;
}
