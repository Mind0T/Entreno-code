#include <stdio.h>
#include <stdbool.h>
/*
TIPOS DE DATOS
-int entero                     (4 bytes)
-float flotante                 (4 bytes)
-double flotante doble info     (8 bytes)
-char un caracter               (1 byte)
-bool logico (false true)       (1 byte)

*/
int main()
    {
        int entero=10;
        printf("Tipo entero: %d\n",entero);
        float flotante=3.5;
        printf("Tipo flotante %.1f\n",flotante);
        double doble=15.4;
        printf("Tipo doble: %.2lf\n",doble);
        char caracter='i';
        char caracteresascii=106;
        printf("Tipo caracter %c: \n",caracter);
        printf("Tipo caracter en decimal ascii: %d\n",caracter);
        printf("Tipo de caracter desde ascci a letra: %c\n",caracteresascii);
        bool boleano=true;
        printf("Tipo logico: %d\n",boleano);
        //el tipo de cadena no esta implementado en c
        char cadena[]="Mi cadena";// los [] indican que es una cadena de caracteres, agregar los caracteres y el null
        printf("Tipo cadena: %s\n",cadena);
        char cadena2[20]="Mi cadena 2";
        printf("Tipo cadena 2: %s\n",cadena2);
        return 0;
    }