#include <stdio.h>
#include <stdbool.h>

int main()
    {
        //Declaracion de variables
        int edad;
        double sueldo;
        int tamanioCad=40;
        char nombre [tamanioCad];
        bool empleadoConfianza;
        printf("Hola requiero de alguno datos \n");
        printf("Cual es tu nombre?:\n");
        scanf("%[^\n]",nombre);
        printf("Cual es tu edad?\n");
        scanf("%d",&edad);
        printf("Cual es su salario mensual?\n\\n");
        scanf("%lf",&sueldo);
        printf("Tiene contrato de empleado de confianza (si-1, no-2)?");
        scanf("%d",&empleadoConfianza);

        printf("Tus datos son los siguientes:\n");
        printf("Nombre:%s\nEdad: %d\nSalario:%.2lf\nEmpleado de confianza:%d",nombre,edad,sueldo,empleadoConfianza);
        return 0;
    
    }