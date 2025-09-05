#include <stdio.h>
#include <stdbool.h>

int main()  
    {
        //operadores relacionales o de comparacion

        int a=5, b=6;
        printf("valor a %d\n",a);
        printf("valor b %d\n",b);
        bool c=a==b;
        printf("\na igual a b?: %d",c);
        c=a!=b;
        printf("\na distinto a b?: %d",c);
        c=a>b;
        printf("\na mayor a b?: %d",c);
        c=a<b;
        printf("\na menor a b?: %d",c);

        return 0;
    }