#include <stdio.h>
// Lo operadores nos permiten realizar operaciones al usasr valores
// +suma, -resta, *multiplicacion, /division, %modulo, ++incremento, --decremento
//Normalmente se evaluan de izquierda a derecha
//


int main ()
    {
        //operadores arimeticos

        int a,b,c,e,f;
        float d;
        //suma
        a=3+4;
        printf("Suma%d: ",a);

        // resta
        b=6-2;
        printf("\nResta: %d",b);

        // multiplicacion

        c=a*2;

        printf("\nMultiplicacion: %d",c);

        //division
        d=b/2.5;
        printf("\nDivision: %.2f",d);

        f=9%2;
        printf("\nModulo: %d",f);

        return 0;
    }