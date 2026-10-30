#include <stdio.h>

int main(){

    int a[5] = {10, 20, 30, 40, 50};
    int *p=a;
    int tamanio_arr=sizeof(a)/sizeof(a[0]);
    for(int *q=a;q<tamanio_arr;q++){
        printf("%d, ",*q);
    }
    return 0;
}