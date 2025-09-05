#include <stdio.h>

int main()
    {
        //Para una cadena sin espacios se pone normal scanf("%s",nombre);
        //Pero para ingresar una cadena donde habra espacios se usa scanf("%[^'\n']s",nombre);
        //Otra forma de ingresar cadena con espacios es con fgets  gets abajo viene su aplicacion

        // 1 Definir la variable
        int tamCadena=20;
        char nombre[tamCadena]; //Si solo se define se debe indicar a fuerzas el tamanio de la cadena
        printf("Ingrese su nombre\n");
        scanf("%[^'\n']s",nombre); // En una cadena de  caracteres no es necesario poner &
        //otra funcion
        fgets(nombre,tamCadena,stdin); // fgets(cadena,tamanio cadena, donde entrara);
        gets(nombre); // Es mas simple pero creo que ya no se recomienda tanto;
        printf("Bienvenido: %s",nombre);
        

        return 0;
    }