#include <stdio.h>
#include <string.h>
#include "pila_cade_estatica_dec.h"


int main(){
	struct Pila pila;
	int entrada;
	int c;
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
		printf("\n6- Salir\n\n\n\n");
		int r=scanf("%d",&entrada);
		if(r==EOF) break;
		if(r!=1){
			printf("\nEntrada no valida\n");
			while((c=getchar())!='\n' && c!=EOF);
			entrada=0;
			continue;
		}
		while((c=getchar())!='\n' && c!=EOF);

		switch(entrada){
			case 1:	
				printStack(&pila);
				break;
			case 2:
				printf("\nIngrese la cadena a apilar\n");
				if(fgets(valor,LONG,stdin)!=NULL){
					if(strchr(valor,'\n')==NULL){
						while((c=getchar())!='\n' && c!=EOF);
					}
					valor[strcspn(valor,"\n")]='\0';
					if(valor[0]=='\0')
						printf("\nCadena vacia, no se apilo\n");
					else
						push(&pila,valor);
				}
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
				break;
			default:
				printf("\nEntrada no valida\n");
		}
	} while(entrada!=6);
	init(&pila);
	printf("\nFin del programa\nVACIADO DE LA PILA\n");


	return 0;
}
