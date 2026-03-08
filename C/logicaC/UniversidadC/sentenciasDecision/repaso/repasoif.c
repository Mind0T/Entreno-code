#include <stdio.h>

int main()
    {
        //if (condicion boleana)
        //Verificamos si el numero proporcionado es positivo
        int numero;
        printf("Hola vamos a ver si tu numero es positivo\n");
        printf("Ingrese un numero porfavor:\n");
        scanf("%d",&numero);

        if(numero<0)
            {
                printf("El numero %d es negativo",numero);
            }
        else if(numero==0)
            {
                printf("El numero %d es cero",numero);
            }
        else
            {
                printf("El numero: %d es positivo",numero);
            }
        printf("\n\nFin del programa");
        
        return 0;
    }