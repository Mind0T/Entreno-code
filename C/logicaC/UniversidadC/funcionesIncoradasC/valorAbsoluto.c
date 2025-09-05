#include <stdio.h>
#include <math.h>

int main()
    {
        int numero, numeroAbs;
        printf("Ingrese un numero y le dare su valor absoluto\n");
        scanf("%d",&numero);
        numeroAbs=abs(numero);
        printf("El valor absoluto de %d es ---> %d",numero,numeroAbs);
        

        return 0;
    }