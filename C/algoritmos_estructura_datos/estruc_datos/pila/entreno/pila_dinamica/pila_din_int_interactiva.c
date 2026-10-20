#include <stdio.h>
#include "pila_din_int_dec.h"


int main(){
        struct Nodo *pila=NULL;
        int entrada,valor;

        //Menu
        do{
                printf("\n\n\n\n\nQUE DESEA HACER\n");
                printf("\n1- Imprimir pila\n");
                printf("\n2- Meter valor a la pila\n");
                printf("\n3- Extraer el ultimo elemento y quitarlo de la pila\n");
                printf("\n4- Enseniarte el ultimo elemento de la pila\n");
                printf("\n5- Limpiar Pila\n");
                printf("\n6- Salir\n\n\n\n");
                scanf("%d",&entrada);

                switch(entrada){
                        case 1:
                                printStack(&pila);
                                break;
                        case 2:
                                printf("\nIngrese el valor a apilar\n");
                                scanf("%d",&valor);
                                push(&pila,valor);
                                break;
                        case 3:
                                if(!isEmpty(pila)){
                                        printf("\nPOP:\n%d\n",pop(&pila));
                                }
                                else{
                                        pop(&pila);
                                }

                                break;
                        case 4:
                                if(!isEmpty(pila)){
                                        printf("\nPEEK:\n%d\n",peek(&pila));
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