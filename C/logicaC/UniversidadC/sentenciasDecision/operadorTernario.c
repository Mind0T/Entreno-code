#include <stdio.h>

int main()
    {
        printf("Ingresa un valor y te dire si es positivo o negativo\n");
        int numero;
        scanf("%d",&numero);
        (numero<=0) ? printf("El numero es negativo")  : printf("El numero es positivo");
        return 0;
    }