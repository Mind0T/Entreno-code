#include <stdio.h>

int main()
    {
        const int MAX=10, MIN=-10;

        printf("Incremento de 3 en 3 tope 10\n");
        for(int a=1;a<=MAX;a+=3)
            {   
                printf("%d\n",a);
            }
        
        printf("\n");
        printf("Decremento de 3 en 3 tope -10\n");
        for(int a=1;a>=MIN;a-=3)
            {
                printf("%d\n",a);
            }
        
        printf("Fin del ejercicio\n");

        return 0;
    }