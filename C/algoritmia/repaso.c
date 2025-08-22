#include <stdio.h>

int esPalindromo(char *frase);

int main()
    {
        char cadena[200];
        printf("Hola 22 Ago Ingresa una palabra o frase y te dire si es un palindromo\n");
        scanf("%[^'\n']s",cadena);
        if (esPalindromo(cadena))
            {
                printf("La palabra o frase %s\nES UN PALINDROMO\n",cadena);
            }
        else
            {
                printf("La palabra o frase %s\nNO ES UN PALINDROMO\n",cadena);
            }
        return 0;
    }

int esPalindromo(char *frase)
    {
        char *end=frase, *start=frase;
        while(*end!='\0')
            {
                end++;
            }
        end--;
        while(start<end)
            {
                if(*start>=65 && *start<=90)
                    *start+=32;
                if(*end>=65 && *end<=90)
                    *end+=32;

                if((*start<48 || *start>57) && (*start<97 || *start>122))
                    {
                        start++;
                        continue;
                    }
                if((*end<48 || *end>57) && (*end<97 || *end>122))
                    {
                        end--;
                        continue;
                    }
                if(*end!=*start)
                    return 0;
                
                end--;
                start++;
            }
        return 1;
    }