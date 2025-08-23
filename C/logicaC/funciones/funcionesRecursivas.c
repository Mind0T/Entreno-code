#include <stdio.h>

//Declarar una funcion

void funcionRecursiva(int numero)
    {
        //caso base
        if (numero==1)
            {
                printf("%d\n",numero);
            }
        else
            {
                //caso recursivo
                
                funcionRecursiva(numero -1);
                printf("%d\n",numero);
            }
    }
int main ()
    {
        //Reglas para una funcion recursiva
        //Una funcino que se llama asi misma
        //Debe avanzar hacia un caso base de lo contrario caemos en ciclos infinitos
        //Con cada llamado recursiva nos acercamos al caso base
        int valor=10;
        funcionRecursiva(valor);

        return 0;
    }