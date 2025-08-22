#include <stdio.h>

int main()
    {
        
        printf("Vamos a practicar la matriz iterada\n");
        int col, ren;
        printf("Ingresa la cantidad de renglones que quieres en la matriz\n");
        scanf("%d",&ren);
        printf("Ingresa la cantidad de columnas que quiers en la matriz\n");
        scanf("%d",&col);
        int matriz[ren][col];

        for(int i=0;i<ren;i++)
            {
                printf("Estamos en el renglon --> %d\n",i);
                for(int j=0;j<col;j++)
                    {
                        printf("Ingresa el valor para matriz[%d][%d]\n",i,j);
                        scanf("%d",&matriz[i][j]);
                    }
            }
        printf("Estos son los valores que introdujiste");
        for(int i=0;i<ren;i++)
            {
                printf("\nRenglon %d --->  ",i);
                for(int j=0;j<col;j++)
                    {
                        printf("Matriz [%d] [%d] : %d , ",i,j,matriz[i][j]);
                    }                
            }
    }