#include <stdio.h>
#include <stdlib.h>


int main(){
    int a = 5, b = 10;
    int *p = &a;
    int *q = &b;
    *p = *q;      // ¿que hace esto?
    q = p;        // ¿y esto?
    *q = 99;
    printf("%d %d %d %d\n", a, b, *p, *q);

    return 0;
}