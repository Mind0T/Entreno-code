//Aqui vamos a implementar la pila
//Como primer pasito vamos a exportar las librerias stdio, stdlib, y nuestra libreria

#include <stdio.h>
#include <stdlib.h>
#include "entrenoPilaDeclaracion.h"

//Iniciamos la pila asignado a su atributo tope -1 es decir vacia
void init(struct Pila *p){
	p->tope=-1;
}

//Validamos que la funcion este vacia es decir que el tope este en -1
int isEmpty(struct Pila *p){
	return p->tope==-1;
}

//Validamos que la funcion este llena es decir que este un valor debajo de nuestra variable MAX
int isFull(struct Pila *p){
	return p->tope==MAX-1;

}

//Aqui vamos hacer que entren valores a la pila en su atributo dato

void push(struct Pila *p, int valor){
	//Primero validamos que la pila no este llena
	if(isFull(p)){   
		printf("\nLo siento ya no puedo apilar el elementos\nLA PILA ESTA LLENA\n");
		return;
	}
	//Si no esta llena pues la agregamos
	printf("\nSe agrego %d a la pila\n",valor);
	p->dato[++(p->tope)]=valor;
	
}

//Aqui vamos extraer el ultimo valor lo vamos a retornar y lo vamos a quitar de la pila

int pop(struct Pila *p){
	//Primero vamos a validar que en efecto tenga algo si no pues no habra nada que retornar
	if(isEmpty(p)){
		printf("\nNo es posible extraer algun elemento\nLA PILA ESTA VACIA\n");
		return -1;
	}
	//Si hay algun elemento en la pila pues lo extraemos y lo retornamos

	return p->dato[(p->tope)--];

}

//Aqui practicamente es lo mismo pero sin quitar el elemento de la pila

int peek(struct Pila *p){
	if(isEmpty(p)){
		printf("\nNo es posible mostrarte algun elemento\nLA PILA ESTA VACIA\n");
		return -1;
	}	
	return p->dato[p->tope];
}


//Por ultimo este esta es la funcion para imprimir la pila

void printStack(struct Pila *p){
	if(isEmpty(p)){
		printf("\nNo es posible imprimir algun elemento\nLA PILA ESTA VACIA\n");
		return;
	}
	printf("\n\nELEMENTOS DE LA PILA\n\n");
	for(int i=p->tope;i>=0;i--){
		printf("%d  ",p->dato[i]);	
	}
	printf("\n");

}


//Me parece que ya es todo






