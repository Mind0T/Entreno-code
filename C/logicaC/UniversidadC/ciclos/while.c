#include <stdio.h>
#include <stdbool.h>

int main()
    {
        int contador=1, repeticiones=100;
        while(contador<=repeticiones)
            {
                printf("%d\n",contador);
                contador++;
                bool condicion=contador<=repeticiones;
                printf("%d<%d->%d\n",contador,repeticiones,condicion);
            }
        printf("Ya estamos fuera del ciclo");
        return 0;
    }