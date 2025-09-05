#include <stdio.h>
#include <math.h>
int main()
    {
        //Redondeo y truncado
        float numero;
        int redondeo, truncado;
        numero=8.6;
        //redondeo
        //round -> .5 redondea al entero mayor mas  cercano
        redondeo=round(numero);
        //truncado
        //trunc -> Se queda solo con la parte entera
        truncado=trunc(numero);
        printf("El numero original es: %.2f\nRedondeado es: %d\n\n",numero,redondeo);
        printf("El numero original es: %.2f\nTrucado es: %d",numero,truncado);
        
        return 0;
    }