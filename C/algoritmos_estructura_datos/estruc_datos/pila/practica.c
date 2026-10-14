#include <stdio.h>
#include "TADPilaEstatica.h"



int main(){
    
    struct Pila pila;
    inicializar(&pila);
    char parentesis[]={'(','(','(',')',')',')'};
    int longitud=sizeof(parentesis)/sizeof(parentesis[0]);
   
    for(int i=0;i<longitud;i++){
	if(parentesis[i]=='('){
	    push(&pila, parentesis[i]);
        }
	else if(parentesis[i]==')'){
	    pop(&pila);
	}
    }

    imprimirPila(&pila);


    /*
    push(&pila, 20);
    push(&pila, 20);
    push(&pila, 30);
    push(&pila, 40);
    push(&pila, 50);
    push(&pila, 60);
   

    imprimirPila(&pila);
    printf("Elemento en el tope: %d\n", peek(&pila));
    printf("Elemento extraido: %d\n",pop(&pila));
    imprimirPila(&pila);
    */

return 0;


}