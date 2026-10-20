//Comentario 


struct Nodo{
	int dato;
	struct Nodo* siguiente;
};



int isEmpty(struct Nodo *tope);

void push(struct Nodo **tope, int valor);

int pop(struct Nodo **tope);

int peek(struct Nodo **tope);

void destroy(struct Nodo **tope);

void printStack(struct Nodo **tope);



