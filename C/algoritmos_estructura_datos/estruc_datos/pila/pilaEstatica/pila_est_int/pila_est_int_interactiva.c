#include <stdio.h>
#include "pila_est_int_dec.h"

int main(){
	struct Pila pila;
	int entrada,valor;

	init(&pila);

	//Menu
	do{
		printf("\n\n\n\n\nQUE DESEA HACER\n");
		printf("\n1- Imprimir pila\n");
		printf("\n2- Meter valor a la pila\n");
		printf("\n3- Extraer el ultimo elemento y quitarlo de la pila\n");
		printf("\n4- Enseniarte el ultimo elemento de la pila\n");
		printf("\n5- Limpiar pila\n");
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
				printf("\nIngrese el valor a apilar\n");
				if(scanf("%d",&valor)!=1){
					printf("\nValor no valido\n");
					while(getchar()!='\n');
					break;
				}
				while(getchar()!='\n');
				push(&pila,valor);
				break;
			case 3:
				if(!isEmpty(&pila)){
					printf("\nPOP:\n%d\n",pop(&pila));
				}
				else{
					pop(&pila);
				}
				break;
			case 4:
				if(!isEmpty(&pila)){
					printf("\nPEEK:\n%d\n",peek(&pila));
				}
				else{
					peek(&pila);
				}
				break;
			case 5:
				printf("\nVaciado de la pila\n");
				init(&pila);
				break;
			case 6:
				printf("\nFIN DEL PROGRAMA\n");
				break;
			default:
				printf("\nEntrada no valida\n");
		}
	} while(entrada!=6);

	init(&pila);
	printf("\nFin del programa\nVACIADO DE LA PILA\n");

	return 0;
}
