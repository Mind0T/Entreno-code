#include <stdio.h>

int main()
    {
        // Para los tipos de datos primitivos o basicos cuando se ingresa un dato por consola se debe poner &

        // 1 Declara variable e inicilizarla
        int miNumero=10;
        printf("Imprimir el valor de la variable: %d\n",miNumero); 
        printf("Imprimir la direccion de memoria: %p\n",&miNumero); // p es pointer

        // 2 Solicitamos al usuario que proporcione un valor
        printf("Proporciona un numero:\n");
        
        // 3 Leemos la informacion y la asignamos a la variable
        scanf("%d",&miNumero); // se usa el formato de la variable y se utiliza de igual forma el & para indicar la direccion de memori
        // 4 Imprimir el valor asignado y checar si la direccion sigue siendo la misma
        printf("El numero ingresado es: %d\n",miNumero);
        printf("La direccion de memoria sigue siendo: %p\n",&miNumero);

        //Introducir una cadena

      
        return 0;
    }