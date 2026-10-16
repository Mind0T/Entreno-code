//vamos a definir nuestras funciones
#define MAX 7


//Definimos tal cual la estructura

struct Pila{
	int dato[MAX];
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
void push(struct Pila *p,int valor);

//Se extrae el ultimo dato de la pila y se quita de la pila
int pop(struct Pila *p);

//Se extrar el ultimo dato de la pila pero no se quita de la pila
int peek(struct Pila *p);

//Se hace una funcion para imprimir la pila

void printStack(struct Pila *pila);