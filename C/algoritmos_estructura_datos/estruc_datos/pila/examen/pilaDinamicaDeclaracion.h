/*
 * ============================================================================
 *  pilaDinamicaDeclaracion.h
 * ============================================================================
 *
 *  ARCHIVO DE CABECERA (header file). Su extensión es .h de "header".
 *
 *  ¿POR QUÉ SEPARAMOS .h Y .c?
 *  ---------------------------
 *  En C, un programa suele vivir en varios archivos .c que después se
 *  "pegan" (enlazan) para formar un ejecutable. El problema es que cada
 *  archivo .c solo conoce lo que ve dentro de sí mismo, así que si en
 *  main.c escribo "push(&pila, 10);", el compilador no sabe de dónde
 *  viene esa función y marca error.
 *
 *  La solución es escribir en un archivo .h las "promesas": aquí digo
 *  "existe una función que se llama push, recibe estos parámetros y no
 *  devuelve nada". Después, cualquier .c que haga
 *      #include "pilaDinamicaDeclaracion.h"
 *  ya sabe que esas funciones existen y puede llamarlas aunque su
 *  implementación esté en OTRO archivo (pilaDinamicaImplementacion.c).
 *
 *  Resumen de la convención:
 *      - .h  → QUÉ existe (tipos, prototipos de funciones, constantes).
 *      - .c  → CÓMO funciona (el cuerpo real de las funciones).
 *
 * ============================================================================
 *  LA ESTRUCTURA struct Nodo
 * ============================================================================
 *
 *  Una pila dinámica NO es un arreglo. Está hecha de pequeños bloques de
 *  memoria llamados "nodos" que se enlazan uno con otro, como vagones de
 *  un tren. Cada vagón (nodo) guarda:
 *
 *      1. UN DATO           → el valor que se apiló.
 *      2. UN APUNTADOR AL   → la "manita" que señala al siguiente nodo
 *         SIGUIENTE NODO      hacia abajo en la pila.
 *
 *  Visualmente:
 *
 *      tope ──► [ 30 | ●─┐
 *                        └► [ 20 | ●─┐
 *                                    └► [ 10 | NULL ]
 *
 *  El último nodo apunta a NULL para avisar "aquí termina la pila".
 *
 *  ¿POR QUÉ 'struct Nodo* siguiente' DENTRO DE struct Nodo?
 *  Porque un nodo necesita señalar a otro nodo del mismo tipo. A esto
 *  se le llama estructura AUTO-REFERENCIADA. Es legal porque un
 *  APUNTADOR siempre ocupa el mismo tamaño (típicamente 8 bytes en 64
 *  bits), aunque la estructura a la que apunta no esté definida por
 *  completo todavía.
 *
 * ============================================================================
 *  ¿POR QUÉ 'int dato' SI VAMOS A GUARDAR OPERADORES ('+', '-', ...)?
 * ============================================================================
 *
 *  Porque en C, un 'char' es técnicamente un entero de 1 byte. El
 *  carácter '+' por dentro ES el número 43 (su código ASCII). Entonces
 *  una pila de int acepta sin problema un char: el valor se "promueve"
 *  a int automáticamente al pasarlo a push.
 *
 *  Esta reutilización es parte de lo que se pide en el examen:
 *  "usen SU pila dinámica tal como la tienen". No cambiamos el tipo,
 *  solo cambiamos lo que METEMOS en ella.
 *
 * ============================================================================
 *  ¿POR QUÉ push/pop/destroy RECIBEN DOBLE APUNTADOR (Nodo **tope)?
 * ============================================================================
 *
 *  Porque esas funciones NECESITAN MODIFICAR el tope de la pila que
 *  vive en main. En C, cuando pasas algo a una función, lo que llega
 *  es una COPIA. Si push recibiera solo "struct Nodo *tope", podría
 *  cambiar la copia local pero NUNCA la variable original de main.
 *
 *  Para que una función pueda modificar una variable de quien la llamó,
 *  hay que pasarle la DIRECCIÓN de esa variable. Como "pila" en main
 *  ya es un apuntador (struct Nodo *), su dirección es un apuntador a
 *  apuntador (struct Nodo **). Por eso se llama con "push(&pila, ...)".
 *
 *  En cambio isEmpty NO modifica la pila, solo pregunta si está vacía,
 *  así que basta con pasarle el tope "tal cual" (un solo asterisco).
 *
 * ============================================================================
 */


/*
 * Definición del nodo (vagón) de la pila dinámica.
 * Cada vez que hagamos push, pediremos UNO de estos con malloc.
 */
struct Nodo{
	int dato;                 /* el valor almacenado (o un char promovido a int) */
	struct Nodo* siguiente;   /* apuntador al siguiente nodo, o NULL si no hay */
};



/*
 * PROTOTIPOS (declaraciones) de las funciones de la pila.
 * Aquí solo decimos QUÉ reciben y QUÉ devuelven. El código real
 * está en pilaDinamicaImplementacion.c.
 */

/* Devuelve 1 si la pila está vacía (tope == NULL), 0 si tiene al menos un nodo. */
int isEmpty(struct Nodo *tope);

/* Agrega 'valor' en el tope de la pila. Recibe la dirección del tope
 * para poder modificarlo (ver explicación arriba). */
void push(struct Nodo **tope, int valor);

/* Quita y devuelve el valor del tope. Si la pila está vacía, devuelve -1. */
int pop(struct Nodo **tope);

/* Devuelve el valor del tope SIN quitarlo. Si está vacía, devuelve -1. */
int peek(struct Nodo **tope);

/* Vacía por completo la pila liberando TODOS los nodos (evita fugas de memoria). */
void destroy(struct Nodo **tope);

/* Imprime los elementos de la pila, del tope hacia el fondo. */
void printStack(struct Nodo **tope);
