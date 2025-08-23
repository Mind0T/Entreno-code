#include <stdio.h>



void pasoReferencia(int tamArreglo, int *parametro)
    {
        printf("\nHola desde la funcion pasoReferencia\n");
        for(int i=0;i<tamArreglo;i++)
            {
                printf("Ingresa el valor del arreglo[%d]\n",i);
                scanf("%d",&parametro[i]);
            }
    }

int main()
    {
        int tamArreglo;
        printf("Hola desde el main Ingrese la cantidad de Renglones \n");
        scanf("%d",&tamArreglo);
        
        int argumento[tamArreglo];
        for(int i=0;i<tamArreglo;i++)
            {
                printf("Ingresa el valor del arreglo[%d]\n",i);
                scanf("%d",&argumento[i]);
            }

        for(int i=0;i<tamArreglo;i++)
            {
                printf("Valores originales del arreglo: %d\n",argumento[i]);
            }

        pasoReferencia(tamArreglo,argumento);
        printf("\n");

        printf("\nHola de nuevo desde la funcion main\n");
        for(int i=0;i<tamArreglo;i++)
            {
                printf("Valores cambiados en la funcion: %d\n",argumento[i]);
            }

        return 0;
    }