#include <stdio.h>


#include <stdio.h>

void f(int arr[]) {
    printf("%zu\n", sizeof(arr));
}

int main() {
    int a[10];
    printf("%zu\n", sizeof(a));
    f(a);
    return 0;
}



/*#define MAX 20

int main(){
    int b[]={2,4,6,8,10};
    int tamanio=sizeof(b)/sizeof(b[0]);
    printf("Tamanio del arreglo: %d\n",tamanio);
    for (int i=0;i<tamanio;i++){
        printf("%d - %d\n",i,b[i]);
    }

    printf("Suma del arreglo:  ");
    int sum;
    for(int i=0;i<tamanio;i++){
        sum+=b[i];
    }

    printf("%d\n",sum);
    return 0;
}*/



//Vamos a escribir un funcion para duplicar los valores de un arreglo duplicados

/*void duplicar_valores(int *arr, int tam){
    for(int i=0;i<tam;i++){
        arr[i]=arr[i]*2;
    }
}

void imprimir_arreglo(int *arr,int tam){
    for(int i=0;i<tam;i++){
        printf("Indice: %d-  Valor: %d\n",i,arr[i]);
    }
}

int main (){

    int numeros[]={1,2,3,4,5,6,7,8,9,10};
    int tamanio_arr=sizeof(numeros)/sizeof(numeros[0]);
    printf("Imprimir arreglo antes de la funcion:\n");
    imprimir_arreglo(numeros,tamanio_arr);

    duplicar_valores(numeros,tamanio_arr);
    printf("\nImprimir arreglo despues de la funcion:\n");
    imprimir_arreglo(numeros,tamanio_arr);
    return 0;
}*/


//Respuestas ejercios 
/*
1-
Imprime lo siguiente
2 8 6 8 8

2-
secc a
En el ciclo for el i debe de llegar hasta <3 ya que el indice 4 no existe

secc b 
Si la intencion es duplicar los valores de x[] y [] debe hacerce mediante un
for ya que asi no funcionaria.

secc c 
No esta inicializada el arreglo z[] asi no podra sumar los valores 

3-

void suma_arreglo(int *arr,int tam, int *sum){
    *sum=0;
    for(int i=0;i<tam;i++){
        *sum= arr[i]+*sum;
    }
    
}

int valor_mayor(int *arr, int n){
    int mayor=arr[0];
    for(int i=1;i<n;i++){
        if(mayor<arr[i]){
            mayor=arr[i];
        }
    }
    return mayor;
}
void prom_arreglo(int tam,int sum,float *prom){
    *prom=(float)sum/tam;
}

void imprimir_arr(int *arr,int tam){
    printf("El contenido del arreglo es:\n");
    for(int i=0;i<tam;i++){
        printf("%d- %d\n",i,arr[i]);
    }
}

int main(){
    int notas[]={-5,-2,-9};
    int tamanio_arr=sizeof(notas)/sizeof(notas[0]);
    int sum;
    int mayor=valor_mayor(notas,tamanio_arr);
    float prom;

    suma_arreglo(notas,tamanio_arr,&sum);
    prom_arreglo(tamanio_arr,sum,&prom);
    imprimir_arr(notas,tamanio_arr);
    printf("La suma de los valores del arreglo es de %d\n",sum);
    printf("El promedio de los valores del arreglo es: %.1f\n",prom);
    printf("El valor mayor es: %d\n",mayor);    
    return 0;
}



4-
void invertir(int *arr,int n){
    for(int i=0, j=n-1;i<j;i++,j--){
        int temp= arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
}



int main(){
    int numeros[]={1,2,3,4,5};
    int tamanio=sizeof(numeros)/sizeof(numeros[0]);

    printf("Arreglo original\n");
    for(int i=0;i<tamanio;i++){
        printf("%d - %d\n",i,numeros[i]);
    }

    invertir(numeros,tamanio);
    
    //imprimir desde main
    printf("Arreglo invertido\n");
    for(int i=0;i<tamanio;i++){
        printf("%d - %d\n",i,numeros[i]);
    }
    return 0;
}



5-Aun no nos metamos con la pila

6- Por un arreglo en si es una un puntero hacia su primer elemento

*/