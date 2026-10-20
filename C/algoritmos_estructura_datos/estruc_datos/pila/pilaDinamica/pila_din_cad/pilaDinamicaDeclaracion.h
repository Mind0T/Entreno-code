//Comentario

#define MAX_CADENA 128

struct Nodo{
	char *dato;
	struct Nodo* siguiente;
};



int isEmpty(struct Nodo *tope);

void push(struct Nodo **tope, const char *valor);

char *pop(struct Nodo **tope);

char *peek(struct Nodo **tope);

void destroy(struct Nodo **tope);

void printStack(struct Nodo **tope);




