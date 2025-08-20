//Vamos a practicar el plalindromo
#include <stdio.h>


int esPalindromo(char *frase);

int main()
    {
        printf("Bienvedido este 20 de Ago al palindromo\nYa te la sabes escribre algo y te dire si es un palindromo\n");
        char cad [300];
        scanf(" %[^'\n']s",cad);
        if(esPalindromo(cad))
            {
                printf("La palabra o frase %s\nES UN PALINDROMO\n",cad);
            }
        else
            {
                printf("La palabra o frase %s\nNO ES UN PALINDROMO\n",cad);
            }
        return 0;
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

                if((*start<48 || *start>57) && (*start<97 || *start>122 ))
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
