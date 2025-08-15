#include <stdio.h>

int main() 
    {     
        //Incremento  
        //Pre-incremento  
        int a,b,c;
        a=0;
        printf("Valor de la variable a de inicio: %d\n",a); 
        ++a; //primero se incrementa el  valor de nuestra variable  
        printf("Nuevo valor de a con el pre incremento declarado ++a: %d\n",a); 
         //Post-incremento
        printf("Valor de a cin el post incremento declarado a++: %d\n",a++);
        printf("Valor de a con el post incremento %d\n",a);

        a=5;
        b=2;
        c=++a * b++; //aqui se usa por primera vez b y se mantiene en 2 postincremento y a sube 6 por se preincremento
        printf("Valor de a %d\n",a);
        printf("Valor de b %d\n",b); //aqui se usa por segunda vez y ya ase aplica el postincremento a 3
        printf("Valor de c %d\n",c);

        // Decremento   
        //Pre-decremento   
        //Post-decremento  
        a=5;
        b=2;
        c=--a * b--; //aqui se usa por primera vez b y se mantiene en 2 por ser postdecremento y a si baja 4 por ser predecremento
        printf("Valor de a %d\n",a);
        printf("Valor de b %d\n",b); //aqui se usa por segunda vez y ya ase aplica el postdecremento a 1
        printf("Valor de c %d\n",c);

        

        return 0;
    }