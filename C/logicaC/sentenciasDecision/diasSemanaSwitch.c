#include <stdio.h>

int main()
    {
        printf("Bienvenido ingrese un numero del numUser al 7 y te dire el dia del semana\n");
        int numUser;
        scanf("%d",&numUser);

        switch(numUser)
            {
                case 1:
                    printf("Ingresaste %d\nPor tanto es Lunes",numUser);
                    break;
                case 2:
                    printf("Ingresaste %d\nPor tanto es Martes",numUser);
                    break;
                case 3:
                    printf("Ingresaste %d\nPor tanto es Miercoles",numUser);
                    break;
                case 4:
                    printf("Ingresaste %d\nPor tanto es Jueves",numUser);
                    break;
                case 5:
                    printf("Ingresaste %d\nPor tanto es Viernes",numUser);
                    break;
                case 6:
                    printf("Ingresaste %d\nPor tanto es Sabado",numUser);
                    break;
                case 7:
                    printf("Ingresaste %d\nPor tanto es Domingo",numUser);
                    break;
                default:
                    printf("\nIngresaste un valor invalido");
                    break;
            }
        puts("\nHasta luego switch");
        return 0;
    }