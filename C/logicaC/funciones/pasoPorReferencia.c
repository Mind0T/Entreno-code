#include <stdio.h>

void pasoRefetrncia(int *parametro)
    {
        *parametro=40;
    }

int main()
 {
    int argumento=20;
    printf("Antes de llamar la funcion de paso de referencia\n",argumento);
    pasoRefetrncia(&argumento);
    printf("Modificando el valor de la funcion %d",argumento);
    return 0;
 }