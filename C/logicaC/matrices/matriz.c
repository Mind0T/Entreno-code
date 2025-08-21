#include <stdio.h>

int main()
    {
        //Una matriz es un arreglo de 2 renglones
        /*
        
        */
        const int RENGLONES=2;
        const int COLUMNAS=3;
        int matriz[RENGLONES][COLUMNAS];

        // Modificar los valoress de la matriz
        matriz[0][0]=100;
        matriz[0][1]=200;
        matriz[0][2]=300;
        matriz[1][0]=400;
        matriz[1][1]=500;
        matriz[1][2]=600;

        //leer

        printf("valor matriz[0][1]: %d\n",matriz[0][1]);
        printf("valor matriz[0][1]: %d",matriz[1][2]);
        


        return 0;
    }