#include <stdio.h>

int main()
    {
        //Declaracion de las variables
        int numUser;
        //Instrucciones y entrada de informacion
        puts("Hola aqui probando el switch");
        puts("Ingrese de favor un numero del 1 al 7 y te dire un dia de la semana");
        scanf("%d",&numUser);
        //Evaluacion del numero con switch

        switch(numUser)
            {
                case 1:
                    printf("Ingresaste %d por lo que el dia es Lunes",numUser);
                    break;
                case 2:
                    printf("Ingresaste %d por lo que el dia es Martes",numUser);
                    break;
                case 3:
                    printf("Ingresaste %d por lo que el dia es Miercoles",numUser);
                    break;
                case 4:
                    printf("Ingresaste %d por lo que el dia es Jueves",numUser);
                    break;
                case 5:
                    printf("Ingresaste %d por lo que el dia es Viernes",numUser);
                    break;
                case 6:
                    printf("Ingresaste %d por lo que el dia es Sabado",numUser);
                case 7:
                    printf("Ingresaste %d por lo que el dia es Domingo",numUser);
                    break;
                default:
                    printf("Ingresaste una opcion no valida");
            }
        printf("\nFin del programa");
        return 0;
    }