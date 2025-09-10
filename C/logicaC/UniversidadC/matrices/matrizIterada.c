#include <stdio.h>

int main()
    {
        int ren,col;
        printf("Ingrese la cantidad de renglones de la matriz\n");
        scanf("%d",&ren);
        printf("Ingrese la cantidad de columnas de la matriz\n");
        scanf("%d",&col);
        int matriz[ren][col];
        
        for(int i=0;i<ren;i++)
            {
                printf("\nEstamos en el renglon %d\n",i);
                for(int j=0;j<col;j++)
                    {
                        printf("Estamos en la columla %d\n",j);
                        printf("Ingrese el valor para matriz[%d][%d]: ",i,j);
                        scanf("%d",&matriz[i][j]);
                    }
            }
        for(int i=0;i<ren;i++)
            {
                printf("\nRenglon: %d    ----> ",i);
                for(int j=0;j<col;j++)
                    {
                        printf("[%d][%d] = %d , ",i,j,matriz[i][j]);
                    }
            }
        
        printf("\n\nImprimiendo solo los valores de pares\n");
        for(int i=0;i<ren;i++)
            {
                printf("\nRen %d --->",i);
                for(int j=1;j<col;j+=2)
                    {
                        printf("%d , ",matriz[i][j]);
                    }
            }

        return 0;
    }
