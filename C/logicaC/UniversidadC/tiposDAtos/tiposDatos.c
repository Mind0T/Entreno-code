#include <stdio.h>
#include <stdbool.h>
/*tipos de datos
-int tipo entero                (4 bytes) 
-float tipo flotante            (4 bytes)    
-double tipo flotante pero      (8 bytes)
    el doble de informacion
-char un caracter               (1 byte)
-bool logico true false         (1 byte)
*/
int main()
    {
        /*
        // 1 Declaramos una variavle
        int miNumero;
        // 2 Inicializamos nuestra variable
        miNumero=10;
        // 3 Imprimir la variable siempre se le pone formato 
        // %d --> decimal
        printf("Mi numero es %d\n", miNumero); //place holder es el lugar donde se mostraria mi variable dentro del mensaje

        // 1 Declaramos e inicializamos la variable
        int miNumero2=20, miNumero3=30;

        printf("Mi numero 2 es: %d\nMi numero 3 es: %d",miNumero2,miNumero3);
        */

        int entero=10;
        printf("Tipo entero: %d\n",entero);
        float flotante=3.5;
        printf("Tipo flotnte: %.1f\n",flotante);
        double doble=15.4;
        printf("Tipo doble: %.2lf\n",doble);
        char caracter='i';
        char caracterascii=106;
        printf("Tipo caracter %c: \n",caracter);
        printf("Tipo caracter en decimal ascci: %d\n",caracter);
        printf("Tipo de caracter desde ascii a letra: %c\n",caracterascii);
        bool boleano=true;
        printf("Tipo logico: %d\n",boleano);
        //cadena no esta implementado
        char cadena[]="Mi cadena"; // los [] indican que es una cadena de caracteres, agregar los caracteres y el null
        printf("Tipo cadena: %s\n",cadena);
        char cadena2[20]="Mi cadena 2";
        printf("Tipo cadena 2: %s\n",cadena2);
        
        return 0;
    }