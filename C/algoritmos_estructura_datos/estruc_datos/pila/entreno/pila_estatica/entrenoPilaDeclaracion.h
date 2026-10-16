//vamos a definir nuestras funciones
#define MAX 7
#define LONG 50


//Definimos tal cual la estructura

struct Pila{
	char dato[MAX][LONG];
	int tope;
};

//Aqui iran las funciones principales de pila init, isEmpty, isFull, push, pop, peek y la funcion para imprimir la pila printStack


//inicializa la pila
void init(struct Pila *p);

//Valida si la pila esta vacia
int isEmpty(struct Pila *p);

//Valida si la pila es llena
int isFull(struct Pila *p);

//Se aniaden elemento a la pila
void push(struct Pila *p, const char *valor);

//Se extrae el ultimo dato de la pila y se quita de la pila
int pop(struct Pila *p,char *destino);

//Se extrar el ultimo dato de la pila pero no se quita de la pila
int peek(struct Pila *p,char *destino);

//Se hace una funcion para imprimir la pila

void printStack(struct Pila *pila);