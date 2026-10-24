#include <stdio.h>
#include "cola_est_int_dec.h"

int main(){
	struct Cola cola;
	init(&cola);

	enqueue(&cola,10);
	enqueue(&cola,20);
	enqueue(&cola,30);
	printQueue(&cola);

	printf("Atendido: %d\n",dequeue(&cola));
	enqueue(&cola,40);
	enqueue(&cola,50);
	enqueue(&cola,60);
	printQueue(&cola);

	enqueue(&cola,70);
	printf("Frente: %d\n",front(&cola));

	return 0;
}
