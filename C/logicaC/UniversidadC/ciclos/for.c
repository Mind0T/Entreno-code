#include <stdio.h>

int main()
    {
        //Con ciclo for especificamos cuantas veces queremos repetir su bloque de codigo

        //Imprimir del 1 al 5
        const int REPETICIONES=10;
        for(int a=1;a<=REPETICIONES;a++)
            {
                printf("%d\n",a);
            }
        printf("Fuera del ciclo for\n");
        
        return 0;
    }