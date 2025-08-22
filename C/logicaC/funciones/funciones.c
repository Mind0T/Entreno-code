#include <stdio.h>

/*
    tipod de dato, nombre en accion(parametros)      
    
    int 
    float
    void

    Direncia entre Procedimiento y una funcion

    Procedimiento como el de mandar a imprimir nombre no va returnar ningun tipo de valor
    Funcino regresa un resultado return que debe ser del mismo tipo de como defininieron las parametros

    tipos de funciones

    =Definidas por el usario

    =Funcinoes incorporadas Built in

`   Paso por valor

    Paso por referencia
    
    

*/
void imprimir(int parametro);

int main()
    {
        int arg;
        printf("Ingrese el primer argunemto, NUMERO para a la funcion imprimir\n");
        scanf("%d",&arg);
        imprimir(arg);  //La variable que se manda es el argumaento
        printf("Ingrese el segundo argunemto, NUMERO para a la funcion imprimir\n");
        scanf("%d",&arg);
        imprimir(arg);
        printf("Ingrese el tercer argunemto, NUMERO para a la funcion imprimir\n");
        scanf("%d",&arg);
        imprimir(arg);
        
    }
void imprimir(int parametro) //La variable que recibe al argumento es el parametro
    {
        printf("Numero: %d\n",parametro);
    }
