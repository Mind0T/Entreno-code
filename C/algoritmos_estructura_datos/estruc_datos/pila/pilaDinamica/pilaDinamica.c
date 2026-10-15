//Vamos con la pila dinamica
#include <stdio.h>
#include <stdlib.h>


//Estructura de nodo

struct Nodo{
	int datos;
	struct Nodo* siguiente;
};

//Verifica si la pila esta vacia'

int isEmpty(struct Nodo* tope){
	return tope==NULL;
}

//PUSH Agrega un elemento a la pila

void push(struct Nodo* tope, int valor){
	struct Nodo *nuevo= (struc Nodo*) malloc(sizeof(struct Nodo));
	if(nuevo==NULL){
		printf("Error al asignar memoria\n");
		return;
	}
	nuevo->dato=valor;
	nuevo->siguiente=*tope;
	*tope=nuevo;

}

//POP Elimina y devuelve el elemento del tope 

int pop(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: la pila esta vacia\n");
		return -1;
	}
	struct Nodo* temp=*tope;
	int valor=temp->dato;
	*tope=temp->siguiente;
	free(temp);
	return valor;
}

//PEEK Devuelve el valor en el tope sin eliminarlo 

int peek(struct Nodo **tope){
	if(isEmpty(*tope)){
		printf("Error: La pila esta vacia\n");
		return -1;
	}
	return tope->dato;
}


//Libera los nodos de la pila

void destroy(struct Nodo **tope){

	struct Nodo *temp;
	while(*tope !=NULL){
		temp=*tope;
		*tope=(*tope)->siguiente;
		free(temp);
	
	}
}

//Imprime la pila

void printStack(struct Nodo **tope){
	if(isEmpty(*tope){
		printf("La pila esta vacia\n\n");
		return:
	}
	printf("Elementos en la pila:\n\n");
	struct Nodo *actual=*tope;
	while(actual !=NULL){
		printf("%d",actual->dato);
		actual=actuall->siguiente;
	}
	printf("\n");
}

int main(){

	struct Nodo *pila==NULL;
	push(&pila,10);
	push(&pila,20);
	push(&pila,30);
	push(&pila,40);

	printStack(&pila);

	printf("Elemento en el tope %d\n:",peek(&pila));
	printf("Elemento extraido: %d\n",pop(&pila));
	destroy(&pila);

	return 0;
}





