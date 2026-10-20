#define MAX 7
#define LONG 50

struct Pila{
	char dato[MAX][LONG];
	int tope;
};


void init(struct Pila *p);

int isEmpty(struct Pila *p);

int isFull(struct Pila *p);

void push(struct Pila *p,const char *valor);

int pop(struct Pila *p,char *destino);

int peek(struct Pila *p,char *destino);

void printStack(struct Pila *p);