#include <stdio.h>

//Un arreglo nos permite almacenar multiples valores en una sola variable, el lugar
// de defunir varias variables.

int main()
    {
        int numerosArreglo[5];
        numerosArreglo[0]=13;
        numerosArreglo[1]=21;
      /*   numerosArreglo[2]=;
        numerosArreglo[3]=; */
        numerosArreglo[4]=62;

        printf("Elemento 1 - Arreglo [0] = %d\n",numerosArreglo[0]);
        printf("Elemento 2 - Arreglo [1] = %d\n",numerosArreglo[1]);
        printf("Elemento 3 - Arreglo [2] = %d\n",numerosArreglo[2]);
        printf("Elemento 4 - Arreglo [3] = %d\n",numerosArreglo[3]);
        printf("Elemento 5 - Arreglo [4] = %d\n",numerosArreglo[4]);
    


        return 0;
    }