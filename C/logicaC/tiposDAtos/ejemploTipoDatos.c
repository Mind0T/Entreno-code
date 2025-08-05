#include <stdio.h>
#include <stdbool.h>

int main()
    {
        int edad;
        bool empleadoConfianza;
        int empleadoConfianzaTemp;
        int largoCadena=50;
        char nombreCompleto[largoCadena];
        float sueldo;
        // 2 Solicitar valores a usuario
        printf("Proporciona tu nombre\n");
        scanf("%[^'\n']s",nombreCompleto);
        printf("Proporciona tu edad\n");
        scanf("%d",&edad);
        printf("Proporciona tu sueldo\n");
        scanf("%f",&sueldo);
        printf("Eres empleado de confianza (1/0)\n");
        scanf("%d",&empleadoConfianzaTemp);
        empleadoConfianza=empleadoConfianzaTemp;

        printf("La informacion proporcionada es:\n");
        printf("Nombre: %s\n",nombreCompleto);
        printf("Edad %d\n",edad);
        printf("Sueldo: %.2f\n",sueldo);
        printf("Empleado de confianza: %d\n",empleadoConfianza);
        return 0;
    }