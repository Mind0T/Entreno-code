//Conversion de notacion infija a postfija usando tu pila dinamica (de int)
//La pila guarda operadores: aprovechamos que un char cabe en un int
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "pilaDinamicaDeclaracion.h"


//Mayor numero = mayor precedencia
int precedencia(int op){
	if(op=='+' || op=='-') return 1;
	if(op=='*' || op=='/') return 2;
	if(op=='^') return 3;
	return 0;
}

int esOperador(char c){
	return c=='+' || c=='-' || c=='*' || c=='/' || c=='^';
}

void infijoAPostfijo(const char *expr, char *salida){
	struct Nodo *pila=NULL;
	int j=0;

	for(int i=0; expr[i]!='\0'; i++){
		char c=expr[i];

		if(c==' ') continue;

		//Digito: va directo a la salida (separado por espacio)
		if(isdigit((unsigned char)c)){
			salida[j++]=c;
			salida[j++]=' ';
		}
		//Parentesis izquierdo: siempre entra
		else if(c=='('){
			push(&pila,c);
		}
		//Parentesis derecho: sacar hasta encontrar '(' y descartarlo
		else if(c==')'){
			while(!isEmpty(pila) && peek(&pila)!='('){
				salida[j++]=(char)pop(&pila);
				salida[j++]=' ';
			}
			pop(&pila);  //descarta el '('
		}
		//Operador: sacar los de precedencia mayor o igual, luego entrar
		else if(esOperador(c)){
			while(!isEmpty(pila) && peek(&pila)!='(' &&
			      precedencia(peek(&pila))>=precedencia(c)){
				salida[j++]=(char)pop(&pila);
				salida[j++]=' ';
			}
			push(&pila,c);
		}
	}

	//Vaciar lo que quede en la pila
	while(!isEmpty(pila)){
		salida[j++]=(char)pop(&pila);
		salida[j++]=' ';
	}

	if(j>0) j--;  //quita el ultimo espacio
	salida[j]='\0';

	destroy(&pila);
}

int main(){
	const char *infija="5+3*7+(2+1)*9";
	char postfija[128];

	printf("Infija:   %s\n", infija);
	infijoAPostfijo(infija, postfija);
	printf("Postfija: %s\n", postfija);

	return 0;
}
