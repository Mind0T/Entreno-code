#include <stdio.h>

int main()
    {
        //Para una cadena sin espacios se pone normal scanf("%s,nombre");
        //Pero para ingresar una cadena donde habra espacios se usa scanf("%[^'\n']s,nombre");
        //Otra forma de ingresar cadena con espacion es con fgets y gets abajo viene su aplicacion
        // 1 Definir la variable
        int tamCadena=20;
        char nombre[tamCadena];
        char nombre2[tamCadena]; // Si solo se define se debe indicar a fuerzas el tamanio de la cadena
        printf("Ingrese su nombre:\n",nombre);
        scanf("%[^'\n']s",nombre); // En un cadena de caracteres no es necesario poner &
        printf("Bienvenide %s\n",nombre);
        //otra forma
        getchar();
        printf("Ingrese otro nombre:\n");
        fgets(nombre2,tamCadena,stdin);//fgets(cadena,tamaniodelacadena,dondeentrara);
        //gets(nombre);//Es mas simple pero creo que ya nose recomienda
        printf("Bienvenide con fgets %s\n",nombre2);

        return 0;
    }