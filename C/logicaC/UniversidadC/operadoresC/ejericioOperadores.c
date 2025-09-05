#include <stdio.h>
#include <stdbool.h>

int main()
    {
        //validar si un valor esta dentro de rango

        int limMin=0,limMax=5,valorUsuario;
        printf("Proporciona un dato entre 0 y 5\n");
        scanf("%d",&valorUsuario);
        if(valorUsuario>=limMin && valorUsuario<=limMax)
            {
                printf("El numero que proporcionaste esta dentro de rango\n");
            }
        else
            {
                printf("El numero que proporcionaste no esta dentro de rango\n");
            }
        bool dentroRango=valorUsuario>=limMin && valorUsuario<=limMax;
        printf("%d",dentroRango);
        
        return 0;
    }