#include <stdio.h>
// Variables globales el maximo alcance de todos
int variableGlobal=10;
void miFuncion(int variableLocalFuncion)
    {
        variableLocalFuncion=40;
        variableGlobal=50;
    }

int main()
    {
        //Variable local limitado a la ejecucion de la funcion
        int variableLocalMain=20;
        
        miFuncion(30);

        variableGlobal=60;

        //Imprimiendo los valores
        printf("Variable local main %d\n",variableLocalMain);
        printf("Variable Global %d",variableGlobal);
        /* printf("variable funcion",variableLocalFuncion); */
        return 0;
    }