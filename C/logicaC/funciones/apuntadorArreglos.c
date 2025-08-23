#include <stdio.h>

int main ()
    {
        int arreglo1[]={100,200};
        int *arreglo2=arreglo1; // No es necesario usar & ya que un arreglo es una direccion de memoria

        for(int i=0;i<2;i++)
            {
                printf("%d\n",arreglo2[i]);
            }

        arreglo2[1]=300;
        printf("\n");

        for(int i=0;i<2;i++)
            {
                printf("%d\n",arreglo2[i]);
            }

        return 0;
    }