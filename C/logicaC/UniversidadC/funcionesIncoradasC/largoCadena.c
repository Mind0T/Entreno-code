#include <stdio.h>
#include <string.h> //directiva include y la libreria string.h
int main ()
    {
        char cadena[]="Hola";
        //Obtenemos el largo de una cadena
        int largoCadena=strlen(cadena);
        printf("Esta es mi cadena: %s\n",cadena);
        printf("El largo de la cadena con strlen: %d\n",largoCadena);
        largoCadena=sizeof(cadena);
        printf("El largo de la cadena con sizeof: %d\n",largoCadena);
        
        //Aqui vamos a utilizar la funcion strlen para iterar y que se imprima cada caracter de la cadena en un renglon a parte.
        printf("Recorriendo la cadena\n");
        char c;
        
        for(int i=0;i<sizeof(cadena);i++)
            {
                c=cadena[i];
                printf("\n%c",c);
            }

        return 0;
    }