#include <stdio.h>
#include <string.h>

int main()
    {
        char cadena[]="Hola Mundo";
        char subcadena[10];
        //strncpy --> string copy
        //char* strncpy(destino,cadenaOriginal,numeroCarecteres);
        int inicio=0, nCaracteres=4;
        strncpy(subcadena,&cadena[inicio],nCaracteres);
        subcadena[nCaracteres]='\0';
        printf("Cadena original: %s\nSubacdena: %s",cadena,subcadena);
        return 0;
    }