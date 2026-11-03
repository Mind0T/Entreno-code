#include <stdio.h>
#include <string.h>
#include "dec.h"
#include <stdlib.h>


int main(){
	struct Pila pila;
	int entrada;
	char valor[LONG];
	char extraido[LONG];

	init(&pila);

	//Menu
	do{
		printf("\n\n\n\n\nQUE DESEA HACER\n");
		printf("\n1- Imprimir pila\n");
		printf("\n2- Meter cadena a la pila\n");
		printf("\n3- Extraer el ultimo elemento y quitarlo de la pila\n");
		printf("\n4- Enseniarte el ultimo elemento de la pila\n");
		printf("\n5- Limpiar Pila\n");
		printf("\n6- Limpiar Consola\n");
		printf("\n7- Salir\n\n\n\n\n");
		if(scanf("%d",&entrada)!=1){
			entrada=0;
		}
		int c;
		while((c=getchar())!='\n' && c!=EOF);

		switch(entrada){
			case 1:
				printStack(&pila);
				break;
			case 2:
				printf("\nIngrese la cadena a apilar\n");
				fgets(valor,LONG,stdin);
				valor[strcspn(valor,"\n")]='\0';
					push(&pila,valor);
				break;
			case 3:
				if(pop(&pila,extraido)){
					printf("\nPOP:\n%s\n",extraido);
				}
				break;
			case 4:
				if(peek(&pila,extraido)){
					printf("\nPEEK:\n%s\n",extraido);
				}
				break;
			case 5:
				printf("\nVaciado de la pila\n");
				init(&pila);
				break;
			case 6:
				system("clear");
				break;
			case 7:
				printf("\nFIN DEL PROGRAMA\n");
				break;
			default:
				printf("\nEntrada no valida\n");

		}
	} while(entrada!=7);
	init(&pila);
	printf("\nFin del programa\nVACIADO DE LA PILA\n");


	return 0;
}
