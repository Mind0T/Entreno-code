#include <stdio.h>

//Un arreglo nos permite almacenar multiples valores en una sola variable, el lugar
// de defunir varias variables.

int main()
    {
        
        int numeroElementos;
        printf("Proporciona el tamanio del arreglo: ");
        scanf("%d",&numeroElementos);

        int numero[numeroElementos];

        for(int i=0;i<numeroElementos;i++)
            {
                printf("Proporciona el valor arreglo[%d}:\n",i);
                scanf("%d",&numero[i]);

            }
        printf("\n");
        for(int i=0;i<numeroElementos;i++)
            {
                printf("Arreglo [%d] es: %d\n",i,numero[i]);
            }

        return 0;
    }