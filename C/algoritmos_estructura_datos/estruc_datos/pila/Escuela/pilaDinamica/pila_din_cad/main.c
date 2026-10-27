//comentario


#include <stdio.h>
#include "pilaDinamicaDeclaracion.h"

int main(){

 	struct Nodo *pila=NULL;
        int entrada;
	char salida[MAX_CADENA];
        char valor[]={'5','+','3','*','7','+','(','2','+','1',')','*','9'};
	int tam=sizeof(valor)/sizeof(valor[0]);
	for(int i=0;i<tam;i++){
		printf("%c",valor[i]);
		if(valor[i]=='5' || valor[i]=='3' || valor[i]=='7' || valor[i]=='2' || valor[i]=='1' || valor[i]=='9'){
			salida[i]=valor[i];
		}
		else if(valor[i]=='('){
			push(&pila,&valor[i]);

		}
		else if(valor[i]==')'){
			salida[i]=pop(&pila);
		}
		else if(valor[i]=='+' || valor[i]=='*' ){

		}

		
	}
	printf("\nSalida:\n");
	for(int i=0;i<tam;i++){
		printf("%c",salida[i]);
	}
	printf("\nPila:\n");
	printStack(&pila);

	//destroy(&pila);
        printf("\nFin del programa\nVACIADO DE LA PILA\n");
	return 0;
}