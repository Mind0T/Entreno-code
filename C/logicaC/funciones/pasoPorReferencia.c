#include <stdio.h>

void pasoRefetrncia(int *parametro)
    {
        *parametro=40;
    }

int main()
 {
    int argumento=20;
    printf("Antes de llamar la funcionde paso de referencoa");
    pasoRefetrncia(&argumento);
    printf("%d",argumento);
    return 0;
 }