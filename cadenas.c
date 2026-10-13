#include <stdio.h>


void imprimir_cadena(char *nom){
    int i=0;
    while(nom[i]!='\n'){
        printf("%c  ",nom[i]);
        i++;
    }
    
}

int tam_cadena(char *nom){
    int i=0;
    while(nom[i]!='\n'){
        i++;
    }
    return i;
}



int contar_vocales(char *nom){
    int i=0;
    int contar=0;
    while(nom[i]!='\n'){
        if(nom[i]=='a' || nom[i]=='e' || nom[i]=='i' || nom[i]=='o' || nom[i]=='u'){
            contar++;
        }
        i++;
    }
    return contar;
}

void invertir_cadena(char *nom, int n){
    char key;
    for(int i=0, j=n-1;i<j;i++,j--){
        if(nom[i]!='\n' || nom[j]!='\n'){
            key=nom[i];
            nom[i]=nom[j];
            nom[j]=key;
        }            
    }

}


int main(){
    char nombre[50];
    char vocal;
    printf("Introduce una cadena y te dire su longitud y la imprimire:\n");
    fgets(nombre,sizeof(nombre),stdin);
    //printf("Introduce la vocal que quieres que contenmos en palabra frase:\n");
    //scanf("%c",&vocal);
    int tamanio=tam_cadena(nombre);

    int conteo=contar_vocales(nombre);


    printf("El tamanio de la cadena - %s - es de %d\n\n",nombre,tamanio);
    imprimir_cadena(nombre);
    printf("\nLa cantidad de vocales minusculas  en %s es de %d",nombre,conteo);
    printf("\n\nInvertir cadena:\n");
    invertir_cadena(nombre, tamanio);
    imprimir_cadena(nombre);
    return 0;
}



/*

Ejercicios de cadenas

1 -
5 bytes, long es de 4
2 byte, long es de 1
1 byte, long es de 0

2.
10001  10004    10008    10012
['S'  ,  'O'  ,  'l'  ,  '\0']


3 c-a-s-a-

4
int conta_a(char *s){
    int cuenta=0;
    int i=0;
    while(s[i]!='\0'){
        if(s[i]=='a'){
            cuenta++;
        }
        i++;
    }
    return cueneta;
}

5 Es el caracter de escape de la caddena y las cadenas lo necesitan para saber donde termine la cadena



REPASOO

1- 


int contar_vocales(char *nom,char vocal){
    int i=0;
    int contar;
    while(nom[i]!='\n'){
        if(nom[i]=='a' || nom[i]=='e' || nom[i]=='i' || nom[i]=='o' || nom[i]=='u'){
            contar++;
        }
        i++;
    }
    return contar;
}
*/