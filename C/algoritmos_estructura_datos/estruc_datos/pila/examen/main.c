/*
 * ============================================================================
 *                CONVERSIÓN DE NOTACIÓN INFIJA A POSTFIJA
 *                 Examen de Estructuras de Datos — Pila
 * ============================================================================
 *
 *  Autor:   Irvin
 *  Problema que resuelve:  dada la expresión  5+3*7+(2+1)*9
 *                          debe entregar en consola la postfija:
 *                              5 3 7 * + 2 1 + 9 * +
 *
 * ============================================================================
 *  1. ¿QUÉ ES NOTACIÓN INFIJA, PREFIJA Y POSTFIJA?
 * ============================================================================
 *
 *  Las tres son formas de ESCRIBIR una expresión matemática. Lo único
 *  que cambia es DÓNDE va el operador respecto de sus operandos:
 *
 *      INFIJA     →  el operador va EN MEDIO:        A + B
 *      PREFIJA    →  el operador va ANTES:           + A B
 *      POSTFIJA   →  el operador va DESPUÉS:         A B +
 *
 *  La infija es la que usamos los humanos, pero tiene un problema: NO
 *  es suficiente por sí sola, necesita REGLAS de precedencia (* antes
 *  de +, por ejemplo) y PARÉNTESIS para desambiguar.
 *
 *  La postfija NO necesita ni precedencia ni paréntesis: el orden de
 *  lectura ES el orden de ejecución. Por eso las calculadoras HP y los
 *  intérpretes de muchos lenguajes (incluso Java bytecode) la usan por
 *  dentro: con una pila y una pasada, evalúas la expresión.
 *
 *  La postfija también se llama "Notación Polaca Inversa" (RPN, por
 *  Reverse Polish Notation), en honor al lógico polaco Jan Łukasiewicz
 *  (1878–1956), que inventó la prefija. La postfija es la "versión al
 *  revés" de su notación.
 *
 * ============================================================================
 *  2. ¿POR QUÉ UNA PILA?
 * ============================================================================
 *
 *  Cuando lees una expresión infija de izquierda a derecha, los
 *  operandos pueden salir INMEDIATAMENTE a la postfija (su orden no
 *  cambia). Pero los operadores NO: hay que esperar a saber si viene
 *  otro operador de mayor precedencia que ellos.
 *
 *  Ejemplo: al leer "5 + 3 * 7"
 *      - Imprimes el 5.
 *      - El '+' lo tienes que ESPERAR, porque podría venir un '*' que
 *        es más prioritario.
 *      - Imprimes el 3.
 *      - Viene '*' (más prioritario que '+'). Lo guardas también.
 *      - Imprimes el 7.
 *      - Se acaba. Sacas los operadores guardados en orden LIFO
 *        (último en entrar, primero en salir): primero '*', luego '+'.
 *      - Resultado: 5 3 7 * +
 *
 *  "Guardar hasta saber cuándo soltar, en orden LIFO" = PILA. Por eso
 *  este problema vive en una pila.
 *
 * ============================================================================
 *  3. ALGORITMO SHUNTING-YARD (de Edsger Dijkstra, 1961)
 * ============================================================================
 *
 *  Se llama "shunting-yard" (patio de maniobras de trenes) porque la
 *  pila funciona como una vía auxiliar donde los operadores "esperan"
 *  antes de salir hacia la vía principal (la salida).
 *
 *  Reglas al leer cada carácter de la expresión:
 *
 *      - DÍGITO       → mándalo directo a la salida.
 *      - '('          → mete a la pila SIEMPRE, sin preguntar.
 *      - ')'          → saca de la pila hacia la salida HASTA encontrar
 *                       un '('. Descarta ese '(' (no sale, no se imprime).
 *      - OPERADOR     → mientras en el tope de la pila haya otro
 *                       operador de PRECEDENCIA MAYOR O IGUAL (y no sea
 *                       un '('), sácalo hacia la salida. Luego mete el
 *                       operador actual.
 *      - FIN DE LÍNEA → saca lo que quede en la pila hacia la salida.
 *
 *  Precedencias que usamos:
 *      ^           → 3 (potencia, la más alta)
 *      * , /       → 2
 *      + , -       → 1
 *      '('         → tratado aparte, nunca sale por un operador.
 *
 * ============================================================================
 *  4. ¿POR QUÉ LA PILA ES DE int SI GUARDAMOS CARACTERES?
 * ============================================================================
 *
 *  La consigna del examen pedía reutilizar la pila dinámica tal como
 *  está, y nuestra pila tiene "int dato". Resulta que en C, un char es
 *  un entero de 1 byte, así que push(&pila, '+') funciona: el '+' se
 *  convierte automáticamente al int 43 (su código ASCII). Al sacarlo
 *  con pop(), lo recuperamos como int y lo volvemos a tratar como
 *  char al imprimirlo con %c o convertirlo con (char).
 *
 *  Este tipo de reutilización es intencional: muestra que entendemos
 *  cómo funcionan los tipos primitivos de C.
 *
 * ============================================================================
 */

#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "pilaDinamicaDeclaracion.h"


/* ----------------------------------------------------------------------------
 * precedencia
 * ----------------------------------------------------------------------------
 *
 *  Recibe: un operador como int (porque los chars se promueven a int).
 *  Devuelve: un número que indica su precedencia. A mayor número,
 *            mayor prioridad.
 *
 *  Esta función es la BRÚJULA del algoritmo: cuando lee un operador
 *  nuevo, se usa para decidir "¿este operador tiene que pelearse con
 *  los que están en la pila o puede entrar directo?".
 * ----------------------------------------------------------------------------
 */
int precedencia(int op){
	if(op=='+' || op=='-') return 1;
	if(op=='*' || op=='/') return 2;
	if(op=='^') return 3;
	return 0;  /* cualquier otra cosa (ej. '(') no es un operador normal */
}


/* ----------------------------------------------------------------------------
 * esOperador
 * ----------------------------------------------------------------------------
 *
 *  Pregunta corta: ¿este carácter es uno de los operadores que
 *  manejamos? Si sí, devuelve 1; si no, 0.
 *
 *  Se usa en el bucle principal para elegir qué rama ejecutar.
 * ----------------------------------------------------------------------------
 */
int esOperador(char c){
	return c=='+' || c=='-' || c=='*' || c=='/' || c=='^';
}


/* ----------------------------------------------------------------------------
 * infijoAPostfijo — EL CORAZÓN DEL PROGRAMA
 * ----------------------------------------------------------------------------
 *
 *  Recibe:
 *      - const char *expr:  cadena de caracteres con la expresión
 *                           infija. Es "const" porque prometemos NO
 *                           modificar la cadena original.
 *      - char *salida:      cadena donde ESCRIBIREMOS la postfija.
 *                           Quien nos llame debe reservar suficiente
 *                           espacio (en main lo hacemos con un arreglo
 *                           char postfija[128]).
 *
 *  Variables locales:
 *      - struct Nodo *pila = NULL;  → nuestra pila local (vacía al
 *        inicio). Como es local, cada llamada tiene SU propia pila
 *        independiente.
 *      - int j = 0;                  → el índice donde escribiremos el
 *        siguiente carácter en 'salida'.
 *
 *  Lógica del for principal:
 *      Recorremos la cadena 'expr' carácter por carácter hasta
 *      encontrar el '\0' (el terminador nulo que marca el fin de la
 *      cadena en C).
 *
 *      En cada iteración, el carácter 'c' entra por UNA de 4 ramas:
 *          (a) espacio       → ignorar.
 *          (b) dígito        → mandarlo a salida con un espacio.
 *          (c) '(' o ')'     → manejo de paréntesis.
 *          (d) operador      → shunting-yard puro.
 *
 *  Al final, cuando se acaba la expresión, vaciamos lo que quede en
 *  la pila hacia la salida y cerramos la cadena con '\0'.
 * ----------------------------------------------------------------------------
 */
void infijoAPostfijo(const char *expr, char *salida){
	struct Nodo *pila=NULL;   /* nuestra pila dinámica local, empieza vacía */
	int j=0;                  /* próxima posición de escritura en 'salida' */

	/* for: iteramos desde i=0 hasta que expr[i] sea '\0' (fin de cadena).
	 * NO usamos strlen porque sería recorrer la cadena una vez de más;
	 * leer hasta '\0' es la forma idiomática en C. */
	for(int i=0; expr[i]!='\0'; i++){
		char c=expr[i];

		/* (a) Los espacios se ignoran: así "5 + 3" y "5+3" se tratan igual */
		if(c==' ') continue;

		/* (b) Dígito: va DIRECTO a la salida, con un espacio detrás para
		 *     que después no se confundan números pegados. */
		if(isdigit((unsigned char)c)){
			salida[j++]=c;
			salida[j++]=' ';
		}
		/* (c1) Paréntesis izquierdo: siempre entra a la pila sin preguntar.
		 *      Funciona como "marca" que después nos dirá hasta dónde
		 *      sacar cuando llegue su pareja ')'. */
		else if(c=='('){
			push(&pila,c);
		}
		/* (c2) Paréntesis derecho: saca TODO lo que esté sobre su '(' y
		 *      descarta ese '('. Así se "resuelve" lo que había dentro
		 *      del paréntesis. */
		else if(c==')'){
			while(!isEmpty(pila) && peek(&pila)!='('){
				salida[j++]=(char)pop(&pila);
				salida[j++]=' ';
			}
			pop(&pila);   /* descarta el '(' sin mandarlo a salida */
		}
		/* (d) Operador: el shunting-yard de verdad.
		 *     Mientras en la pila haya otro operador con precedencia
		 *     MAYOR O IGUAL (y que no sea '('), lo sacamos a la salida.
		 *     Luego metemos el operador actual.
		 *
		 *     ¿Por qué "mayor O IGUAL" y no solo "mayor"?
		 *     Para que operadores de IGUAL precedencia se resuelvan de
		 *     IZQUIERDA a DERECHA. Ejemplo: 5-3-2 debe ser (5-3)-2 = 0,
		 *     NO 5-(3-2) = 4. Con '>=' se logra la asociatividad
		 *     izquierda, que es la natural en matemáticas. */
		else if(esOperador(c)){
			while(!isEmpty(pila) && peek(&pila)!='(' &&
			      precedencia(peek(&pila))>=precedencia(c)){
				salida[j++]=(char)pop(&pila);
				salida[j++]=' ';
			}
			push(&pila,c);
		}
	}

	/* Terminó la expresión: vaciar lo que quede en la pila.
	 * (Si la expresión estaba bien formada, aquí solo hay operadores,
	 * nunca paréntesis sueltos.) */
	while(!isEmpty(pila)){
		salida[j++]=(char)pop(&pila);
		salida[j++]=' ';
	}

	/* Quitamos el último espacio sobrante y cerramos la cadena.
	 * En C, TODA cadena debe terminar en '\0' o printf la seguiría
	 * leyendo hacia memoria basura. */
	if(j>0) j--;
	salida[j]='\0';

	/* Buena higiene: liberamos cualquier nodo que, por error de la
	 * expresión, haya quedado en la pila (ej. paréntesis desbalanceado). */
	destroy(&pila);
}


/* ----------------------------------------------------------------------------
 * main — ENTRADA DEL PROGRAMA
 * ----------------------------------------------------------------------------
 *
 *  - Define la cadena infija del examen.
 *  - Reserva un arreglo 'postfija' suficientemente grande (128 bytes).
 *  - Llama a infijoAPostfijo y después imprime ambas.
 *
 *  Si se quisiera leer del usuario:
 *      char infija[128];
 *      fgets(infija, sizeof infija, stdin);
 *      infija[strcspn(infija, "\n")] = '\0';  // quitar el '\n' final
 * ----------------------------------------------------------------------------
 */
int main(){
	const char *infija="5+3*7+(2+1)*9";
	char postfija[128];

	printf("Infija:   %s\n", infija);
	infijoAPostfijo(infija, postfija);
	printf("Postfija: %s\n", postfija);

	return 0;
}
