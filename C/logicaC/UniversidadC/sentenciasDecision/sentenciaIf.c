#include <stdio.h>

int main()
    {
        //if (condicion boleana)
        //Verificamos si sel numero proporcionado es positvo
        printf("Proporciona un numero:\n");
        int miNumero;
        scanf("%d",&miNumero);


        if(miNumero>0)
            {
                printf("El numero es positivo\n");
            }
        else if (miNumero==0)
            {
                printf("El numero es igual a 0\n");
            }
        else    
            {
                printf("El numero es negativo\n");
            }


        return 0;
    }