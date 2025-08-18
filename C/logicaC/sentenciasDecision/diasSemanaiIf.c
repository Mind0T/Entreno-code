#include <stdio.h>

int main()
    {
        printf("Ingrese un numero del 1 al 7 y le dire que dia de la Semana es:\n");
        int numUser;
        scanf("%d",&numUser);

        if(numUser==1)
            {
                printf("Ingresaste el numero %d\nPor tanto es: LUNES",numUser);
            }
        else if(numUser==2)
            {
                printf("Ingresaste el numero %d\nPor tanto es: MARTES",numUser);
            }
        else if(numUser==3)
            {
                printf("Ingresaste el numero %d\nPor tanto es: MIERCOLES",numUser);
            }
        else if(numUser==4)
            {
                printf("Ingresaste el numero %d\nPor tanto es: JUEVES",numUser);
            }
        else if(numUser==5)
            {
                printf("Ingresaste el numero %d\nPor tanto es: VIERNES",numUser);
            }
        else if(numUser==6)
            {
                printf("Ingresaste el numero %d\nPor tanto es: SABADO",numUser);
            }
        else if(numUser==7)
            {
                printf("Ingresaste el numero %d\nPor tanto es: DOMINGO",numUser);
            }
        else    
            {
                printf("Esa no es una opcion valida");
            }
        return 0;
    }