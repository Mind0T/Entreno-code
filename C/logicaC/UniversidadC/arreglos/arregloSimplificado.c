#include <stdio.h>

//Un arreglo nos permite almacenar multiples valores en una sola variable, el lugar
// de defunir varias variables.

int main()
    {
        
        int numerosArreglo[]={100,200,300,400,500};
        int tamArreglo=sizeof(numerosArreglo);
         //Memoria ocupado del arreglo
        printf("El tamanio del arreglo es de %d\n", tamArreglo);
        int tamUnElemento=sizeof(numerosArreglo[0]);
        printf("Tamanio de un elemento %d\n",tamUnElemento);
        int largoArreglo=tamArreglo/tamUnElemento;
        printf("Largo del arreglo: %d\n",largoArreglo);
       
        for(int i=0;i<largoArreglo;i++)
            printf("Elemento del arreglo %d - arreglo[%d] %d \n",i+1,i,numerosArreglo[i]);

        return 0;
    }