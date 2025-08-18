#include <stdio.h>

int main()
    {
         //if (condicion boleana)
        //Verificamos si sel numero proporcionado es positvo
        printf("Proporciona un numero:\n");
        int miNumero;
        scanf("%d",&miNumero);

        (miNumero>0) ? printf("Positivo") : printf("Cero o Negativo");


        

        return 0;
    }