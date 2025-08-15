#include <stdio.h>

int esPalindromo(char *ptr);

int main()
    {
        char cad[200];
        printf("Que tal ingresa una palabra o frase y te dire si es un palindromo\n");
        scanf("%[^'\n']s",cad);
        if(esPalindromo(cad))
            {
                printf("Bien la palabra o frase %s\nES UN PALINDROMO\n",cad);
            }
        else
            {
                printf("Oye la palabra o frase %s\nNO ES UN PALINDROMO\n",cad);
            }
        return 0;
    }

    int esPalindromo(char *ptr)
        {
            char *end=ptr;
            char *start=ptr;
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
                    if(*start!=*end)
                        {
                            return 0;
                        }
                    end--;
                    start++;
                }
            return 1;
        }