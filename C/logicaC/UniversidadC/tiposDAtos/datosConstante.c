#include <stdio.h>
#define PI 3.1416
//#define USE_MATH_DEFINES
#include<math.h>


/*
Variable de solo lectura es decir que no se puede modificar su valor

*/


int main()
    {
        const  int MI_CONSTANTE=10;
        printf("El valor de mi constante es es: %d\n",MI_CONSTANTE);
        //MI_CONSTANTE=20;  esto no  seria posible
        printf("Valor de pi: %.2f\n",PI);
        printf("Valor de Pi en math: %f\n",M_PI); // si lo imprime solo que desde aca como que lo detecta como error
        const int SEGUNDOS_POR_MINUTO=60;
        printf("Constante de SEGUNDOS_POR_MINUTO: %d",SEGUNDOS_POR_MINUTO);


        return 0;
    }