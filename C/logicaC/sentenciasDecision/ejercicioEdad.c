#include <stdio.h>

int main()
    {
        const int EDAD_ADULTA=18;

        printf("Ingrese su edad y le dire si es mayor de edad\n");
        int edad;
        scanf("%d",&edad);

        if(edad<0)
            {
                printf("Edad invalida aun no has nacido\n");
            }
        else if(edad>100)
            {
                printf("Wooow espera eres muy longevo");
            }
        else if(edad>=EDAD_ADULTA)
            {
                printf("Usted es mayor de edad\n");
            }    
        else    
            {
                printf("Usted es menor de edad\n");
            }

        return 0;
    }