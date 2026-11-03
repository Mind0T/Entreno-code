
//Aqui mando a llamar mi libreria estandar in out y la libreria dec.h que es donde tengo la declaracion de mis funciones
#include <stdio.h>
#include "dec.h"

//Tengo la funcion merge que basicamente recibe al arreglo lo de puse como apuntador y al inicio y al final

void merge(int *num,int start,int end){
	int middle; //declaro una variable que es la mitatr
	if(start<end){ // mientras el inicio sea menor que el final
		middle=(start+end)/2; //calculo la mitad sumando el inicio y el final y dividiendolo entre dos dara division entera
		merge(num,start,middle); // vuelvo a mandar a llamar a merge con inicio en start pero ahora mi final para la parte derecha sera middle
		merge(num,middle+1,end); // lo mismo al mandar llamar merge para la parte izquierda mi inicio es middle +1 y mi final es end
		joinMerge(num,start,middle,end); // y cuando entre en accion join se le manda el arreglo, el inicio, el medio, y el final
	}
}


void joinMerge(int *num,int start,int middle,int end){  // aqui ya esta listo para recibir el arreglo, el inicio, el enmedio y el final
	//aqui declaro dos arreglos para poner los elementos de la izquierda y derecha
	int izq[TAM_ARREGLO]; 
	int der[TAM_ARREGLO];
	//calculo el tam de izq y dere
	int tamIzq=middle-start+1;
	int tamDer=end-middle;
	//declaro mis variables indices i , j y el indice que recorrera num k
	int i,j,k; 

	//aqui voy a llenar con los valores correspondientes a mi arreglo izq y der

	for(i=0;i<tamIzq;i++){
		izq[i]=num[start+i];
	}

	for(j=0;j<tamDer;j++){
		der[j]=num[middle+1+j];
	}
	
	//reinicio mis variables e incializo k en start
	i=0;
	j=0;
	k=start;

	//aqui viene el corazon del algoritmo antes de esto solo prepare
	while(i<tamIzq && j<tamDer){
		if(izq[i]<der[j]){
			num[k]=izq[i];
			i++;
		}
		else{
			num[k]=der[j];
			j++;
		}
		k++;

	}

	//Aqui relleno num con el sobrante de cada mitad

	while(i<tamIzq){
		num[k]=izq[i];
		i++;
		k++;
	
	}
	while(j<tamDer){
		num[k]=der[j];
		j++;
		k++;
	}
	
}

void printMerge(int *num,int tam){
	for(int i=0;i<tam;i++){
		printf("%d ",num[i]);
	}
	printf("\n\n");
}