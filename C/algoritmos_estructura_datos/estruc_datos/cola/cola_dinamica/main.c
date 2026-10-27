/* Cola dinamica (nodos enlazados: frente y final) · main de prueba */
#include <stdio.h>
#include "declaracion.h"

int main(){
	struct Cola cola;
	init(&cola);

	enqueue(&cola,10);
	enqueue(&cola,20);
	enqueue(&cola,30);
	printQueue(&cola);

	printf("Atendido: %d\n",dequeue(&cola));
	enqueue(&cola,40);
	printQueue(&cola);

	printf("Frente: %d\n",front(&cola));

	destroy(&cola);
	printQueue(&cola);

	return 0;
}
