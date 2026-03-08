#include <stdio.h>

int main()
    {
        int numero;
        printf("Hola probando operador ternario\nIngrese un numero y te dire si es positivo o negativo\n");
        scanf("%d",&numero);
        (numero<0) ? printf("El numero es negativo") : printf("El numero es positivo");
        printf("\nFin del operador ternario");
        return 0;
    }