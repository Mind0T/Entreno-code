#include <stdio.h>

// 5 Declaro una funcion con un parametro a puntero
int esPalindromo(char *ptr);

int main()
    {
        //1 Declaramacion una cadena para 300 caracteres
        char cad[300];
        // 2 Pedimos al usario ingrese una palabra o frase 
        puts("Ke hongo ingresa una palabra o frase y te tire si es un palindromo");
        // 3 Permitimos que el usuario pueda ingresar su palabra o frase
        scanf("%[^'\n']s",cad);
        // 4 Generamos la condicional para que apartir del resultado de una funcion genere cierto mensaje
        if(esPalindromo(cad))
            {
                printf("Vientos la palabra o frase:%s\nES UN PALINDROMO\n",cad); // mensaje en caso de que la funcion nos indique que si es un palindromo = 1
            }
        else    
            {
                printf("Pfffff la palabra o frase:%s\nNO ES UN PALINDROMO\n",cad); // mensaje en case de que la funcion nos indique que no es un palindromo =2
            }
        return 0;
    }

    // 6 Desarrollamos la funcion para evaluar que la palabra o frase si es un palindromo
int esPalindromo(char *ptr)
    {
        // 7 Declaramos dos cadenas y le asigmos el apuntador de la cadena recibida
        char *end=ptr;
        char *start=ptr;
        
        // 8 Creamos un ciclo para recorrer el puntero end hasta el final de la cadena
        while(*end!='\0')
            {
                end++; // En este punto la cadena habra quedado hasta el valor de salida '\0'
            }
        end--; // 9 Regresamo un valor de la cadena para que quede  no en el de salida si no en el ultimo

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