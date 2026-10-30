#include <stdio.h>


void minmax(int a, int b, int *menor, int *mayor){
    if(a>b){
        *mayor=a;
        *menor=b;
    }
    else{
        *mayor=b;
        *menor=a;
    }
}

int main(){
    int a,b;
    printf("Escribre un valor para a\n\n");
    scanf("%d",&a);
    printf("Escribe un valor para b\n\n");
    scanf("%d",&b);

    int menor,mayor;
    minmax(a,b,&menor,&mayor);

    printf("El valor mayor es:%d\nEl valor menor es:%d\n\n",mayor,menor);
    return 0;
}