struct Nodo{
	int dato;
	struct Nodo* siguiente;
};

struct Cola{
	struct Nodo *frente;
	struct Nodo *final;
};

void init(struct Cola *c);

int isEmpty(struct Cola *c);

void enqueue(struct Cola *c, int valor);

int dequeue(struct Cola *c);

int front(struct Cola *c);

void destroy(struct Cola *c);

void printQueue(struct Cola *c);
