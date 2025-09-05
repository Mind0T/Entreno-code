#include <stdio.h>
#include <stdlib.h>

int main()
    {
        //Convertir de numero a texto
        int edad=28;

        char edadTexto[10]; //Suficientes caracteres para 
        //itoa --> int to ascii
        //ftoa --> float to ascii
        //Se necesita proporcionar la base numero en este caso es base 10 decimal
        itoa(edad,edadTexto,10);
        printf("Esta es una cadena con el valor: %s",edadTexto);

        return 0;
    }