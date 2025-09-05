#include <stdio.h>

int main()
    {
        /* //Realizar la suma de los primeros 5 numeros utilizando un ciclo For:
        int max=100;
        int sumaAcumulada;

        for(int a=1;a<=max;a++)
            {
                sumaAcumulada=sumaAcumulada+a;
                
            }
        printf("La suma acumulada del 1 al 100 con for es:%d\n",sumaAcumulada);

        sumaAcumulada=(max*(max+1))/2;
        printf("La suma acumulada del 1 al 100 con la formula de Gauss %d\n",sumaAcumulada); */




       /*  const int MAX=5;
        int sumaAcumulada=0;
        int i=1;
        while(i<=5)
            {
                printf("Se sumara a el numero %d, siguiente %d",sumaAcumulada,i);
                sumaAcumulada+=i;
                printf(" y quedara %d\n",sumaAcumulada);
                i++;
            }
        printf("El resultado de la suma acumulada con While es: %d\n",sumaAcumulada);
 */

        const int MAX=5;
        int sumaAcumulada=0;
        int i=1;
        do
            {
                printf("Al numero %d se le sumara %d",sumaAcumulada,i);
                sumaAcumulada+=i;
                printf(" y quedara %d\n",sumaAcumulada);
                i++;
            }while(i<=MAX);
        
        printf("El acumulado de la suma con Dowhile es %d",sumaAcumulada);

        return 0;
    }