#include <stdio.h>
#include <stdlib.h>

int main()
    {
        char cadena1[]="10";
        char cadena2[]="20";
        //atoi -- Ascii to int   para esto debemos instalar la libreria estandar
        //atof -- Ascii to float
        //Si no es numero regresa el valor de 0
        int resultado=atoi(cadena1)+atoi(cadena2);
        printf("El resultado de la suma de ambas cadenas ya convertidas es : %d",resultado);

        return 0;
    }