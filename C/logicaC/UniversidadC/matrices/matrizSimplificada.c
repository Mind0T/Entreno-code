#include <stdio.h>

int main()
    {
        //Una matriz es un arreglo de 2 renglones
        /*
        
        */
        int ren,col;
        printf("Ingrese la cantidad de Renglones: ");
        scanf("%d",&ren);
        printf("Ingresse la cantidad de Columnas: ");
        scanf("%d",&col);

        int matriz[ren][col];

        for(int i=0;i<ren;i++)
            {
                printf("\nEstamos en el renglon [%d]",i);
                for(int j=0;j<col;j++)
                    {
                        printf("\nIngrese un dato en matriz[%d][%d]: ",i,j);
                        scanf("%d",&matriz[i][j]);
                    }
            }
        printf("\n");    
        for(int i=0;i<ren;i++)
            {
                printf("\nRenglon %d   ",i);
                for(int j=0;j<col;j++)
                    {
                           printf("[%d][%d] = %d , ",i,j,matriz[i][j]);
                    }
             
            }
        
    



        return 0;
    }