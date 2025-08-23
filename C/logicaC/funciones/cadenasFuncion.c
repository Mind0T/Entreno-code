#include <stdio.h>



void imprimirMensaje(char *frase) // otra forma de char *frase     seria char frase[] si solo seria cadena de caracteres 
    {
        
        printf("Hola desde la funcion imprimir Mensaje\n");
        printf("%s",frase);
    }

int main()
    {
        char cadena[300];
        printf("Proporciona el mensaje a mostrar\n");
        scanf("%[^'\n']s",cadena);
        imprimirMensaje(cadena);

        return 0;
    }