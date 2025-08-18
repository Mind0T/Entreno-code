#include <stdio.h>
#include <stdbool.h>

int main()
    {
        //A diferecia del ciclo while el ciclo do while se ejecuta al menos una vez
        int miNumero;
        bool condicion;
        do
            {
                printf("Ingrese un numero positivo\n");
                scanf("%d",&miNumero);
                condicion=miNumero>0;
            }while(!condicion);

        printf("Increible ingresaste el numero %d que es positivo",miNumero);
        return 0;
    }