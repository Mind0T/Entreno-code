#include <stdio.h>

//? Vamos a practicar un poquillo con el viejo y clasico ejemplo de palindromo

int esPalindromo(char *frase);

int main()
    {
        printf("Hola que tal ingresa un palabra o frase y te dire si es un palindromo o no\n");
        char cad[300]; // Recuerda que siempre debes espicificar el tamanion en C
        scanf("%[^'\n']s",cad);
        printf("%s\n",cad);
        if (esPalindromo(cad))
            {
                printf("Genial la palabra o frase: %s\nES UN PALINDROMO\n",cad);
            }
        else    
            {
                printf("Uuuuf que crees que la palabra o frase: %s\nNO ES UN PALINDROMO\n",cad);
            }

    }

int esPalindromo(char *frase)
    {
        char *end=frase;
        char *start=frase;

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
                if((*start <48 || *start>57) && (*start<97 || *start>122))
                    {
                        start++;
                        continue;
                    }
                if((*end<48 || *end>57) && (*end<97 || *end>122))
                    {
                        end--;
                        continue;
                    }
                if(*start!=*end)
                    return 0;

                end--;
                start++;
            }
        return 1;
    }