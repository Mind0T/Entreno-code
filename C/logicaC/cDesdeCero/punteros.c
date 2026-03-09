/*Punteros
Una variable tiene 5 atributos
1 Nombre (empezando con letra)
2 Direccion en memoria (para diferenciar de otros)  **
3 Valor (el valor que le ponemos)
4 Tipo (int, char, float..)
5 Tiempo de vida
6 Ambito (por ejemplo si son locales globales etc.)

*/
#include <stdio.h>
int main()
    {
        /*
        Variable de tio puntero que contiene direcciones de memoria de datos enteros
        puede ser de variable real,
        int num1=5;
        int *ptr1=&num;
        */
        


        /*
        Operador &
        Con este operador podemos obtener la direccion de memoria de una
        determinada variable
        */


        /*
        -Puntero Null: Es un puntero que no apunta a ninguna direccion de memoria
        valida. Es recomendable inicializar una variable en NULL para evitar problemas
        
        -Puntero generico: Hay ocasiones en las que no sabemos a que tipo de dato va a
        apuntar una variable determinada. Para eso podemos declarar una variable como puntero
        generico

        */
        void *ptr2; //ejemplo

        /*
        Indireccion de punteros
        -Obtener el valor al que apunta un puntero, es decir, su dato se denomina
        indireccionar el puntero (tambien conocido como desferenciar el puntero)

        */
       int num;
       int *ptr3=NULL;
       num=21;
       ptr3=&num;
       printf("Direccion de memoria de num: %p\n",&num);
       printf("Valor de num: %d\n",num);
       printf("valor de ptr: %p\n",ptr3);
       printf("Derreferencia de ptr osea que contiene donde apunta: %d\n",*ptr3);
       printf("Direccion de ptr: %p\n",&ptr3);


    }

