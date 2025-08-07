#include <stdio.h>
//Inicializacion de la funcin palindromo
int esPalindromo(char *ptr);

//Funcion principal
int main()
    {
        //Se define la variable
        char cad[300];
        
        //Entrada de valor por parte del usuario
        puts("Escriba una palabra o frase y le dire si es un palindromo");
        fgets(cad, sizeof(cad),stdin);

        //Resultado de acuerdo de si es un palindromo o no desde la funcion esPalindromo
        if(esPalindromo(cad))
            {
                printf("La palabra o frase:%s\nES UN PALINDROMO\n",cad);
            }
        else    
            {
                printf("La palabra o frase:%s\nNO ES UN PALINDROMO\n",cad);
            }

        return 0;
    }
int esPalindromo(char *ptr)
    {
        //Declara dos apuntadores
        char *end=ptr, *star=ptr;

        //Mover puntero end hasta el final de la cadena sin contemplar el valor de escape
        for(;*end!='\n';end++);
        end--;

        //funcion while, se deja la cadena en condiciones para compararla.
        while(*star<*end)
            {
                //Convertir mayusculas en minusculas
                if(*star>=65 && *star<=90)
                    *star+=32;
                if(*end>=65 && *end<=90)
                    *end+=32;

                //Ignorar cualquier caracter que no sea minuscula o numero
                if((*end<97 || *end>122) && (*end<47 || *end>57))
                    {
                        end--;
                        continue;
                    }
                if(*end!=*star)
                    return 0;  //No es palindromo
                end--;
                star++;
            
            }
        return 1;//Es palindromo
    }