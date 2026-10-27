#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "pilaDinamicaDeclaracion.h"



int main(){
	struct Nodo *pila=NULL;
	int entrada;
	char valor[MAX_CADENA];
	char *extraido;

	//Menu
	do{
		printf("\n\n\n\n\nQUE DESEA HACER\n");
		printf("\n1- Imprimir pila\n");
		printf("\n2- Meter cadena a la pila\n");
		printf("\n3- Extraer el ultimo elemento y quitarlo de la pila\n");
		printf("\n4- Enseniarte el ultimo elemento de la pila\n");
		printf("\n5- Limpiar Pila\n");
		printf("\n6- Salir\n\n\n\n");
		if(scanf("%d",&entrada)!=1){
			printf("\nEntrada no valida\n");
			while(getchar()!='\n');
			entrada=0;
			continue;
		}
		while(getchar()!='\n');

		switch(entrada){
			case 1:
				printStack(&pila);
				break;
			case 2:
				printf("\nIngrese la cadena a apilar\n");
				if(fgets(valor,MAX_CADENA,stdin)!=NULL){
					valor[strcspn(valor,"\n")]='\0';
					push(&pila,valor);
				}
				break;
			case 3:
				if(!isEmpty(pila)){
					extraido=pop(&pila);
					printf("\nPOP:\n%s\n",extraido);
					free(extraido);
				}
				else{
					pop(&pila);
				}

				break;
			case 4:
				if(!isEmpty(pila)){
					printf("\nPEEK:\n%s\n",peek(&pila));
				}
				else{
					peek(&pila);
				}

				break;
			case 5:
				printf("\nVaciado de la pila\n");
				destroy(&pila);
				break;
			case 6:
				printf("\nFIN DEL PROGRAMA\n");
				break;
			default:
				printf("\nEntrada no valida\n");
		}
	} while(entrada!=6);
	destroy(&pila);
	printf("\nFin del programa\nVACIADO DE LA PILA\n");


	return 0;
}
