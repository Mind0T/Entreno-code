#include <stdio.h>

int main()
    {
        int a=10;
        int *b=&a;//pasasr direccion de memoria
        printf("direccion de memoria desde a %p\ndireccion de memoria desde b %p\n",&a,b);
        printf("%d\n",b); //explicame esto
        printf("%p\n",&b);


        printf("\na=%d b=%d\n",a,*b);
        *b=20;
        printf("a=%d b=%d\n",a,*b);
        return 0; 
    }