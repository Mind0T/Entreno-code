#define MAX 100

struct Pila {
    int datos[MAX];
    int tope;
};


void inicializar(struct Pila *p);
int isEmpty(struct Pila *p);
int isFull(struct Pila *p);
void push(struct Pila *p, int valor);
int pop(struct Pila *p);
int peek(struct Pila *p);
void imprimirPila(struct Pila *p);