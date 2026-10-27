/* Cola estatica (arreglo circular) · declaracion */
#define MAX 5

struct Cola {
	int dato[MAX];
	int frente;
	int final;
	int cantidad;
};

void init(struct Cola *c);

int isEmpty(struct Cola *c);

int isFull(struct Cola *c);

void enqueue(struct Cola *c, int valor);

int dequeue(struct Cola *c);

int front(struct Cola *c);

void printQueue(struct Cola *c);
