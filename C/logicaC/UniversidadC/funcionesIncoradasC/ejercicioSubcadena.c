#include <stdio.h>
#include <string.h>
//Objetivo del ejercicio es hacer una subcadena que solo contenga mundo de la cadena original Hola mundo
int main()
    {
        char cadena[]="Hola mundo";
        char subcadena[10];
        int inicio=5, nCaracteres=5;
        strncpy(subcadena,&cadena[inicio],nCaracteres);
        subcadena[nCaracteres]='\0';
        printf("Cadena original: %s\n",cadena);
        printf("Esta es la subcadena: %s\n",subcadena);
        return 0;
    }