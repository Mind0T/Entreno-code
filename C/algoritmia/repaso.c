#include <stdio.h>

int esPalindromo(char *frase);

int main()
    {
        // 1 declarar mi variable cadena
        char cad[100];
        // 2 pedir una cadena al usuario
        printf("Ingrese una frase o palabra y le dire si es un palindromo o no\n");
        scanf("%[^'\n']s",cad);
        //3 Someto a evaluacion la cadena para ver sis es un palindromo
        if(esPalindromo(cad))
            {
                printf("La palabra o frase  %s\nES UN PALINDROMO\n",cad);
            }
        else   
            {
                printf("La palabra o frase %s\nNO ES UN PALINDROMO\n",cad);
            }
        return 0;
    }

int esPalindromo(char *frase) // Desarrollo de la funcion
    {
        //4 Se declaran lo punteros y se les asigna la frase que viene desde el main
        char *start=frase;
        char *end=frase;
        //5 mover el puntero end al final de la cadena
        while(*end!='\0') //mientras el puntero sea diferente al valor de salida
            {
                end++;
            }
        end--;
        // 6 Comparar los caracteres de inicio y fin
        while(start<end)
            {
                //7 Convertir las letras de mayusculas a minusculas
                if(*start>=65 && *start<=90)
                    *start+=32;
                if(*end>=65 && *end<=90)
                    *end+=32;
                // 8 Ignorar espacios y caracteres especiales
                if((*start<97 || *start>122) && (*start<48 || *start>57))
                    {
                        start++;
                        continue;
                    }
                if((*end<97 || *end>122) && (*end<48 || *end>57))
                    {
                        end--;
                        continue;
                    }
                // 9 Compara los caracteres
                if(*start!=*end)
                    {
                        return 0;
                    }
                start++;
                end--;
                
            }
        return 1;
    }