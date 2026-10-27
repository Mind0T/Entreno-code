/* GENERADO por scripts/sincronizar_codigo.py - no lo edites a mano */
window.EST = window.EST || {};
EST.fuentes = {
 "burbuja": {
  "dec": {
   "name": "declaracion_burbuja.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/burbuja/declaracion_burbuja.h",
   "code": "#ifndef DECLARACION_BURBUJA_H\n#define DECLARACION_BURBUJA_H\n\n#define TAM_ARREGLO 40\n\nvoid burbuja(int numeros[], int tam);\n\nvoid imprimirArreglo(int numeros[], int tam);\n\n#endif\n"
  },
  "impl": {
   "name": "implementacion_burbuja.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/burbuja/implementacion_burbuja.c",
   "code": "#include <stdio.h>\n\n#include \"declaracion_burbuja.h\"\n\nvoid burbuja(int numeros[], int tam) {\n\n    int i, j, aux;\n\n    for (i = 0; i < tam - 1; i++) {\n\n        for (j = 0; j < tam - 1 - i; j++) {\n\n            if (numeros[j] > numeros[j + 1]) {\n\n                aux = numeros[j];\n                numeros[j] = numeros[j + 1];\n                numeros[j + 1] = aux;\n            }\n        }\n    }\n\n}\n\nvoid imprimirArreglo(int numeros[], int tam) {\n    int i;\n\n    for (i = 0; i < tam; i++) {\n\n        printf(\"%d \", numeros[i]);\n    }\n\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "main_burbuja.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/burbuja/main_burbuja.c",
   "code": "#include <stdio.h>\n\n#include \"declaracion_burbuja.h\"\n\nint main() {\n\n    int numeros[TAM_ARREGLO] = {\n        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,\n        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,\n        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,\n        50,  2, 88, 23, 64, 12, 71, 30, 57,  9\n    };\n\n    printf(\"=== ORDENAMIENTO BURBUJA (Bubble Sort) ===\\n\\n\");\n\n    printf(\"Arreglo original:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    burbuja(numeros, TAM_ARREGLO);\n\n    printf(\"\\nArreglo ordenado:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    return 0;\n}\n"
  }
 },
 "seleccion": {
  "dec": {
   "name": "declaracion_seleccion.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/seleccion/declaracion_seleccion.h",
   "code": "#ifndef DECLARACION_SELECCION_H\n#define DECLARACION_SELECCION_H\n\n#define TAM_ARREGLO 40\n\nvoid seleccion(int numeros[], int tam);\n\nvoid imprimirArreglo(int numeros[], int tam);\n\n#endif\n"
  },
  "impl": {
   "name": "implementacion_seleccion.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/seleccion/implementacion_seleccion.c",
   "code": "#include <stdio.h>\n#include \"declaracion_seleccion.h\"\n\nvoid seleccion(int numeros[], int tam) {\n\n    int i, j, menor, aux;\n\n    for (i = 0; i < tam - 1; i++) {\n\n        menor = i;\n\n        for (j = i + 1; j < tam; j++) {\n\n            if (numeros[j] < numeros[menor]) {\n                menor = j;\n            }\n        }\n\n        aux = numeros[i];\n        numeros[i] = numeros[menor];\n        numeros[menor] = aux;\n\n    }\n}\n\nvoid imprimirArreglo(int numeros[], int tam) {\n    int i;\n\n    for (i = 0; i < tam; i++) {\n        printf(\"%d \", numeros[i]);\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "main_seleccion.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/seleccion/main_seleccion.c",
   "code": "#include <stdio.h>\n\n#include \"declaracion_seleccion.h\"\n\nint main() {\n\n    int numeros[TAM_ARREGLO] = {\n        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,\n        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,\n        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,\n        50,  2, 88, 23, 64, 12, 71, 30, 57,  9\n    };\n\n    printf(\"=== ORDENAMIENTO POR SELECCION (Selection Sort) ===\\n\\n\");\n\n    printf(\"Arreglo original:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    seleccion(numeros, TAM_ARREGLO);\n\n    printf(\"\\nArreglo ordenado:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    return 0;\n}\n"
  }
 },
 "insercion": {
  "dec": {
   "name": "declaracion_insercion.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/insercion/declaracion_insercion.h",
   "code": "#ifndef DECLARACION_INSERCION_H\n#define DECLARACION_INSERCION_H\n\n#define TAM_ARREGLO 40\n\nvoid insercion(int numeros[], int tam);\n\nvoid imprimirArreglo(int numeros[], int tam);\n\n#endif\n"
  },
  "impl": {
   "name": "implementacion_insercion.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/insercion/implementacion_insercion.c",
   "code": "#include <stdio.h>\n#include \"declaracion_insercion.h\"\n\nvoid insercion(int numeros[], int tam) {\n\n    int i, j, actual;\n\n    for (i = 1; i < tam; i++) {\n\n        actual = numeros[i];\n\n        j = i - 1;\n\n        while (j >= 0 && numeros[j] > actual) {\n\n            numeros[j + 1] = numeros[j];\n\n            j--;\n        }\n\n        numeros[j + 1] = actual;\n\n    }\n}\n\nvoid imprimirArreglo(int numeros[], int tam) {\n    int i;\n\n    for (i = 0; i < tam; i++) {\n        printf(\"%d \", numeros[i]);\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "main_insercion.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/insercion/main_insercion.c",
   "code": "#include <stdio.h>\n\n#include \"declaracion_insercion.h\"\n\nint main() {\n\n    int numeros[TAM_ARREGLO] = {\n        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,\n        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,\n        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,\n        50,  2, 88, 23, 64, 12, 71, 30, 57,  9\n    };\n\n    printf(\"=== ORDENAMIENTO POR INSERCION (Insertion Sort) ===\\n\\n\");\n\n    printf(\"Arreglo original:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    insercion(numeros, TAM_ARREGLO);\n\n    printf(\"\\nArreglo ordenado:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    return 0;\n}\n"
  }
 },
 "mezcla": {
  "dec": {
   "name": "declaracion_mezcla.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/mezcla/declaracion_mezcla.h",
   "code": "#ifndef DECLARACION_MEZCLA_H\n#define DECLARACION_MEZCLA_H\n\n#define TAM_ARREGLO 40\n\nvoid mezcla(int numeros[], int inicio, int fin);\n\nvoid juntar(int numeros[], int inicio, int mitad, int fin);\n\nvoid imprimirArreglo(int numeros[], int tam);\n\n#endif\n"
  },
  "impl": {
   "name": "implementacion_mezcla.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/mezcla/implementacion_mezcla.c",
   "code": "#include <stdio.h>\n#include \"declaracion_mezcla.h\"\n\nvoid mezcla(int numeros[], int inicio, int fin) {\n\n    int mitad;\n\n    if (inicio < fin) {\n\n        mitad = (inicio + fin) / 2;\n\n        mezcla(numeros, inicio, mitad);\n\n        mezcla(numeros, mitad + 1, fin);\n\n        juntar(numeros, inicio, mitad, fin);\n    }\n}\n\nvoid juntar(int numeros[], int inicio, int mitad, int fin) {\n\n    int izquierda[TAM_ARREGLO];\n    int derecha[TAM_ARREGLO];\n\n    int tamIzq = mitad - inicio + 1;\n    int tamDer = fin - mitad;\n\n    int i, j, k;\n\n    for (i = 0; i < tamIzq; i++) {\n        izquierda[i] = numeros[inicio + i];\n    }\n\n    for (j = 0; j < tamDer; j++) {\n        derecha[j] = numeros[mitad + 1 + j];\n    }\n\n    i = 0;\n    j = 0;\n    k = inicio;\n\n    while (i < tamIzq && j < tamDer) {\n\n        if (izquierda[i] <= derecha[j]) {\n            numeros[k] = izquierda[i];\n            i++;\n        } else {\n            numeros[k] = derecha[j];\n            j++;\n        }\n\n        k++;\n    }\n\n    while (i < tamIzq) {\n        numeros[k] = izquierda[i];\n        i++;\n        k++;\n    }\n\n    while (j < tamDer) {\n        numeros[k] = derecha[j];\n        j++;\n        k++;\n    }\n}\n\nvoid imprimirArreglo(int numeros[], int tam) {\n    int i;\n\n    for (i = 0; i < tam; i++) {\n        printf(\"%d \", numeros[i]);\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "main_mezcla.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/algoritmos_ordenamiento/mezcla/main_mezcla.c",
   "code": "#include <stdio.h>\n\n#include \"declaracion_mezcla.h\"\n\nint main() {\n\n    int numeros[TAM_ARREGLO] = {\n        87, 12, 45,  3, 66, 29, 91,  7, 54, 38,\n        -5, 73, 20, 99, 14, 61,  0, 48, 33, 82,\n        25, 58, 10, 77, 41, -12, 95, 19, 69, 36,\n        50,  2, 88, 23, 64, 12, 71, 30, 57,  9\n    };\n\n    printf(\"=== ORDENAMIENTO POR MEZCLA (Merge Sort) ===\\n\\n\");\n\n    printf(\"Arreglo original:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    mezcla(numeros, 0, TAM_ARREGLO - 1);\n\n    printf(\"\\nArreglo ordenado:\\n\");\n    imprimirArreglo(numeros, TAM_ARREGLO);\n\n    return 0;\n}\n"
  }
 },
 "pilaEstatica": {
  "dec": {
   "name": "pila_est_int_dec.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaEstatica/pila_est_int/pila_est_int_dec.h",
   "code": "#define MAX 7\n\nstruct Pila {\n    int dato[MAX];\n    int tope;\n};\n\nvoid init(struct Pila *p);\n\nint isFull(struct Pila *p);\n\nint isEmpty(struct Pila *p);\n\nvoid push(struct Pila *p,int valor);\n\nint pop(struct Pila *p);\n\nint peek(struct Pila *p);\n\nvoid printStack(struct Pila *p);\n"
  },
  "impl": {
   "name": "pila_est_int_impl.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaEstatica/pila_est_int/pila_est_int_impl.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n#include \"pila_est_int_dec.h\"\n\nvoid init(struct Pila *p){\n    p->tope=-1;\n}\n\nint isFull(struct Pila *p){\n    return p->tope==MAX-1;\n}\n\nint isEmpty(struct Pila *p){\n    return p->tope==-1;\n}\n\nvoid push(struct Pila *p,int valor){\n    if(isFull(p)){\n        printf(\"\\nLo siento \\nLA PILA ESTA LLENA \\n\");\n        return;\n    }\n    p->dato[++(p->tope)]=valor;\n    printf(\"\\nSe agrego %d a la pila\\n\",valor);\n\n}\n\nint pop(struct Pila *p){\n    if(isEmpty(p)){\n        printf(\"\\nLo siento \\nLA PILA ESTA VACIA \\n\");\n        return 0;\n    }\n    return p->dato[(p->tope)--];\n}\n\nint peek(struct Pila *p){\n    if(isEmpty(p)){\n        printf(\"\\nLo siento \\nLA PILA ESTA  VACIA\\n\");\n        return 0;\n    }\n    return p->dato[p->tope];\n}\n\nvoid printStack(struct Pila *p){\n    if(isEmpty(p)){\n        printf(\"\\nLo siento \\nLA PILA ESTA VACIA\\n\");\n        return;\n    }\n    printf(\"\\nElementos en la fila\\n\");\n    for(int i=p->tope;i>=0;i--){\n        printf(\"%d \",p->dato[i]);\n\n    }\n}\n"
  },
  "main": {
   "name": "pila_est_int.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaEstatica/pila_est_int/pila_est_int.c",
   "code": "#include <stdio.h>\n#include \"pila_est_int_dec.h\"\n\nint main(){\n    struct Pila pila;\n    init(&pila);\n    int entrada,valor;\n\n    do{\n        printf(\"\\n\\n\\n\\n\\nQUE DESEA HACER\\n\");\n        printf(\"\\n1- Imprimir pila\\n\");\n        printf(\"\\n2- Meter valor a la pila\\n\");\n        printf(\"\\n3- Extraer el ultimo elemento y quitarlo de la pila\\n\");\n        printf(\"\\n4- Enseniarte el ultimo elemento de la pila\\n\");\n        printf(\"\\n5- Salir\\n\\n\\n\\n\");\n        scanf(\"%d\",&entrada);\n\n        switch(entrada){\n            case 1:\n                printStack(&pila);\n                break;\n            case 2:\n                printf(\"\\nIngrese el valor a apilar\\n\");\n                scanf(\"%d\",&valor);\n\n                push(&pila,valor);\n                break;\n            case 3:\n                if(!isEmpty(&pila)){\n                    printf(\"\\nPOP:\\n%d\\n\",pop(&pila));\n                }\n                else{\n                    pop(&pila);\n                }\n\n                break;\n            case 4:\n                if(!isEmpty(&pila)){\n                    printf(\"\\nPEEK:\\n%d\\n\",peek(&pila));\n                }\n                else{\n                    peek(&pila);\n                }\n\n                break;\n            case 5:\n                printf(\"\\nFIN DEL PROGRAMA\\n\");\n                break;\n\n            default:\n                printf(\"\\nEntrada no valida\\n\");\n        }\n    } while(entrada!=5);\n\n    return 0;\n}\n"
  }
 },
 "parentesis": {
  "dec": {
   "name": "TADPilaEstatica.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaEstatica/TADPilaEstatica.h",
   "code": "#define MAX 100\n\nstruct Pila {\n    int datos[MAX];\n    int tope;\n};\n\nvoid inicializar(struct Pila *p);\nint isEmpty(struct Pila *p);\nint isFull(struct Pila *p);\nvoid push(struct Pila *p, int valor);\nint pop(struct Pila *p);\nint peek(struct Pila *p);\nvoid imprimirPila(struct Pila *p);\n"
  },
  "impl": {
   "name": "TADPilaEstatica.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaEstatica/TADPilaEstatica.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n#include \"TADPilaEstatica.h\"\n\nvoid inicializar(struct Pila *p) {\n    p->tope = -1;\n}\n\nint isEmpty(struct Pila *p) {\n    return p->tope == -1;\n}\n\nint isFull(struct Pila *p) {\n    return p->tope == MAX - 1;\n}\n\nvoid push(struct Pila *p, int valor) {\n    if (isFull(p)) {\n        printf(\"Error: la pila esta llena\\n\");\n        return;\n    }\n    p->datos[++(p->tope)]=valor;\n}\n\nint pop(struct Pila *p) {\n    if (isEmpty(p)) {\n        printf(\"Error: la pila esta vacia\\n\");\n        return -1;\n    }\n\n    return p->datos[(p->tope)--];\n}\n\nint peek(struct Pila *p) {\n    if (isEmpty(p)) {\n        printf(\"Error: la pila esta vacia\\n\");\n        return -1;\n    }\n    return p->datos[p->tope];\n}\n\nvoid imprimirPila(struct Pila *p) {\n    if (isEmpty(p)) {\n        printf(\"La pila esta vacia\\n\");\n        return;\n    }\n    printf(\"Elementos en la pila: \");\n    for (int i = p->tope; i >= 0; i--) {\n        printf(\"%d \", p->datos[i]);\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "practica.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaEstatica/practica.c",
   "code": "#include <stdio.h>\n#include \"TADPilaEstatica.h\"\n\nint main(){\n\n    struct Pila pila;\n    inicializar(&pila);\n    char parentesis[]={'(','(','(',')',')',')'};\n    int longitud=sizeof(parentesis)/sizeof(parentesis[0]);\n\n    for(int i=0;i<longitud;i++){\n    if(parentesis[i]=='('){\n        push(&pila, parentesis[i]);\n        }\n    else if(parentesis[i]==')'){\n        pop(&pila);\n    }\n    }\n\n    imprimirPila(&pila);\n\nreturn 0;\n\n}\n"
  }
 },
 "pilaDinamica": {
  "dec": {
   "name": "pilaDinamicaDeclaracion.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaDinamica/pila_din_int/pilaDinamicaDeclaracion.h",
   "code": "struct Nodo{\n    int dato;\n    struct Nodo* siguiente;\n};\n\nint isEmpty(struct Nodo *tope);\n\nvoid push(struct Nodo **tope, int valor);\n\nint pop(struct Nodo **tope);\n\nint peek(struct Nodo **tope);\n\nvoid destroy(struct Nodo **tope);\n\nvoid printStack(struct Nodo **tope);\n"
  },
  "impl": {
   "name": "pilaDinamicaImplementacion.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaDinamica/pila_din_int/pilaDinamicaImplementacion.c",
   "code": "#include<stdio.h>\n#include<stdlib.h>\n#include \"pilaDinamicaDeclaracion.h\"\n\nint isEmpty(struct Nodo *tope){\n    return tope==NULL;\n\n}\n\nvoid push(struct Nodo **tope, int valor){\n    struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));\n    if(nuevo==NULL){\n        printf(\"Error al asignar memoria\\n\");\n        return;\n    }\n    nuevo->dato=valor;\n    nuevo->siguiente=*tope;\n    *tope=nuevo;\n}\n\nint pop(struct Nodo **tope){\n    if(isEmpty(*tope)){\n        printf(\"Error: la pila esta vacia\\n\\n\");\n        return -1;\n    }\n    struct Nodo *temp=*tope;\n    int valor=temp->dato;\n    *tope=temp->siguiente;\n    free(temp);\n    return valor;\n}\n\nint peek(struct Nodo **tope){\n    if(isEmpty(*tope)){\n        printf(\"Error: la pila esta vacia\\n\");\n        return -1;\n    }\n    return (*tope)->dato;\n\n}\n\nvoid destroy(struct Nodo **tope){\n    struct Nodo *temp;\n    while(*tope!=NULL){\n        temp=*tope;\n        *tope=(*tope)->siguiente;\n        free(temp);\n    }\n}\n\nvoid printStack(struct Nodo **tope){\n    if(isEmpty(*tope)){\n        printf(\"La pila esta vacia\\n\");\n        return;\n    }\n    printf(\"Elementos de la pila\\n\");\n    struct Nodo *actual=*tope;\n    while(actual!=NULL){\n        printf(\"%d  \",actual->dato);\n        actual=actual->siguiente;\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "pilaDinamica.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/pilaDinamica/pila_din_int/pilaDinamica.c",
   "code": "#include <stdio.h>\n#include \"pilaDinamicaDeclaracion.h\"\n\nint main(){\n    struct Nodo *pila=NULL;\n    push(&pila,10);\n    push(&pila,20);\n    push(&pila,30);\n    push(&pila,40);\n\n    printStack(&pila);\n\n    printf(\"Elemento en el tope: %d\\n\", peek(&pila));\n    printf(\"Elemento extraido: %d\\n\",pop(&pila));\n    printStack(&pila);\n\n    destroy(&pila);\n\n    return 0;\n}\n"
  }
 },
 "infija": {
  "dec": {
   "name": "pilaDinamicaDeclaracion.h",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/examen/pilaDinamicaDeclaracion.h",
   "code": "struct Nodo{\n    int dato;\n    struct Nodo* siguiente;\n};\n\nint isEmpty(struct Nodo *tope);\n\nvoid push(struct Nodo **tope, int valor);\n\nint pop(struct Nodo **tope);\n\nint peek(struct Nodo **tope);\n\nvoid destroy(struct Nodo **tope);\n\nvoid printStack(struct Nodo **tope);\n"
  },
  "impl": {
   "name": "pilaDinamicaImplementacion.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/examen/pilaDinamicaImplementacion.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n#include \"pilaDinamicaDeclaracion.h\"\n\nint isEmpty(struct Nodo *tope){\n    return tope==NULL;\n}\n\nvoid push(struct Nodo **tope, int valor){\n\n    struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));\n\n    if(nuevo==NULL){\n        printf(\"Error al asignar memoria\\n\");\n        return;\n    }\n\n    nuevo->dato=valor;\n\n    nuevo->siguiente=*tope;\n\n    *tope=nuevo;\n}\n\nint pop(struct Nodo **tope){\n    if(isEmpty(*tope)){\n        printf(\"Error: la pila esta vacia\\n\\n\");\n        return -1;\n    }\n    struct Nodo *temp=*tope;\n    int valor=temp->dato;\n    *tope=temp->siguiente;\n    free(temp);\n    return valor;\n}\n\nint peek(struct Nodo **tope){\n    if(isEmpty(*tope)){\n        printf(\"Error: la pila esta vacia\\n\");\n        return -1;\n    }\n    return (*tope)->dato;\n}\n\nvoid destroy(struct Nodo **tope){\n    struct Nodo *temp;\n    while(*tope!=NULL){\n        temp=*tope;\n        *tope=(*tope)->siguiente;\n        free(temp);\n    }\n\n}\n\nvoid printStack(struct Nodo **tope){\n    if(isEmpty(*tope)){\n        printf(\"La pila esta vacia\\n\");\n        return;\n    }\n    printf(\"Elementos de la pila\\n\");\n    struct Nodo *actual=*tope;\n    while(actual!=NULL){\n        printf(\"%d  \",actual->dato);\n        actual=actual->siguiente;\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "main.c",
   "path": "C/algoritmos_estructura_datos/estruc_datos/pila/examen/main.c",
   "code": "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n#include \"pilaDinamicaDeclaracion.h\"\n\nint precedencia(int op){\n    if(op=='+' || op=='-') return 1;\n    if(op=='*' || op=='/') return 2;\n    if(op=='^') return 3;\n    return 0;\n}\n\nint esOperador(char c){\n    return c=='+' || c=='-' || c=='*' || c=='/' || c=='^';\n}\n\nvoid infijoAPostfijo(const char *expr, char *salida){\n    struct Nodo *pila=NULL;\n    int j=0;\n\n    for(int i=0; expr[i]!='\\0'; i++){\n        char c=expr[i];\n\n        if(c==' ') continue;\n\n        if(isdigit((unsigned char)c)){\n            salida[j++]=c;\n            salida[j++]=' ';\n        }\n\n        else if(c=='('){\n            push(&pila,c);\n        }\n\n        else if(c==')'){\n            while(!isEmpty(pila) && peek(&pila)!='('){\n                salida[j++]=(char)pop(&pila);\n                salida[j++]=' ';\n            }\n            pop(&pila);\n        }\n\n        else if(esOperador(c)){\n            while(!isEmpty(pila) && peek(&pila)!='(' &&\n                  precedencia(peek(&pila))>=precedencia(c)){\n                salida[j++]=(char)pop(&pila);\n                salida[j++]=' ';\n            }\n            push(&pila,c);\n        }\n    }\n\n    while(!isEmpty(pila)){\n        salida[j++]=(char)pop(&pila);\n        salida[j++]=' ';\n    }\n\n    if(j>0) j--;\n    salida[j]='\\0';\n\n    destroy(&pila);\n}\n\nint main(){\n    const char *infija=\"5+3*7+(2+1)*9\";\n    char postfija[128];\n\n    printf(\"Infija:   %s\\n\", infija);\n    infijoAPostfijo(infija, postfija);\n    printf(\"Postfija: %s\\n\", postfija);\n\n    return 0;\n}\n"
  }
 },
 "colaEstatica": {
  "dec": {
   "name": "cola_est_int_dec.h",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/colaEstatica/cola_est_int_dec.h",
   "code": "#define MAX 5\n\nstruct Cola {\n    int dato[MAX];\n    int frente;\n    int final;\n    int cantidad;\n};\n\nvoid init(struct Cola *c);\n\nint isEmpty(struct Cola *c);\n\nint isFull(struct Cola *c);\n\nvoid enqueue(struct Cola *c, int valor);\n\nint dequeue(struct Cola *c);\n\nint front(struct Cola *c);\n\nvoid printQueue(struct Cola *c);\n"
  },
  "impl": {
   "name": "cola_est_int_impl.c",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/colaEstatica/cola_est_int_impl.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n#include \"cola_est_int_dec.h\"\n\nvoid init(struct Cola *c){\n    c->frente=0;\n    c->final=-1;\n    c->cantidad=0;\n}\n\nint isEmpty(struct Cola *c){\n    return c->cantidad==0;\n}\n\nint isFull(struct Cola *c){\n    return c->cantidad==MAX;\n}\n\nvoid enqueue(struct Cola *c, int valor){\n    if(isFull(c)){\n        printf(\"Error: la cola esta llena\\n\");\n        return;\n    }\n    c->final=(c->final+1)%MAX;\n    c->dato[c->final]=valor;\n    c->cantidad++;\n}\n\nint dequeue(struct Cola *c){\n    if(isEmpty(c)){\n        printf(\"Error: la cola esta vacia\\n\");\n        return -1;\n    }\n    int valor=c->dato[c->frente];\n    c->frente=(c->frente+1)%MAX;\n    c->cantidad--;\n    return valor;\n}\n\nint front(struct Cola *c){\n    if(isEmpty(c)){\n        printf(\"Error: la cola esta vacia\\n\");\n        return -1;\n    }\n    return c->dato[c->frente];\n}\n\nvoid printQueue(struct Cola *c){\n    if(isEmpty(c)){\n        printf(\"La cola esta vacia\\n\");\n        return;\n    }\n    printf(\"Elementos de la cola (frente -> final): \");\n    for(int k=0;k<c->cantidad;k++){\n        printf(\"%d  \",c->dato[(c->frente+k)%MAX]);\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "cola_est_int.c",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/colaEstatica/cola_est_int.c",
   "code": "#include <stdio.h>\n#include \"cola_est_int_dec.h\"\n\nint main(){\n    struct Cola cola;\n    init(&cola);\n\n    enqueue(&cola,10);\n    enqueue(&cola,20);\n    enqueue(&cola,30);\n    printQueue(&cola);\n\n    printf(\"Atendido: %d\\n\",dequeue(&cola));\n    enqueue(&cola,40);\n    enqueue(&cola,50);\n    enqueue(&cola,60);\n    printQueue(&cola);\n\n    enqueue(&cola,70);\n    printf(\"Frente: %d\\n\",front(&cola));\n\n    return 0;\n}\n"
  }
 },
 "colaDinamica": {
  "dec": {
   "name": "cola_din_int_dec.h",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/colaDinamica/cola_din_int_dec.h",
   "code": "struct Nodo{\n    int dato;\n    struct Nodo* siguiente;\n};\n\nstruct Cola{\n    struct Nodo *frente;\n    struct Nodo *final;\n};\n\nvoid init(struct Cola *c);\n\nint isEmpty(struct Cola *c);\n\nvoid enqueue(struct Cola *c, int valor);\n\nint dequeue(struct Cola *c);\n\nint front(struct Cola *c);\n\nvoid destroy(struct Cola *c);\n\nvoid printQueue(struct Cola *c);\n"
  },
  "impl": {
   "name": "cola_din_int_impl.c",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/colaDinamica/cola_din_int_impl.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n#include \"cola_din_int_dec.h\"\n\nvoid init(struct Cola *c){\n    c->frente=NULL;\n    c->final=NULL;\n}\n\nint isEmpty(struct Cola *c){\n    return c->frente==NULL;\n}\n\nvoid enqueue(struct Cola *c, int valor){\n    struct Nodo *nuevo=(struct Nodo *)malloc(sizeof(struct Nodo));\n    if(nuevo==NULL){\n        printf(\"Error al asignar memoria\\n\");\n        return;\n    }\n    nuevo->dato=valor;\n    nuevo->siguiente=NULL;\n    if(isEmpty(c)){\n        c->frente=nuevo;\n        c->final=nuevo;\n    }\n    else{\n        c->final->siguiente=nuevo;\n        c->final=nuevo;\n    }\n}\n\nint dequeue(struct Cola *c){\n    if(isEmpty(c)){\n        printf(\"Error: la cola esta vacia\\n\");\n        return -1;\n    }\n    struct Nodo *temp=c->frente;\n    int dato=temp->dato;\n    c->frente=temp->siguiente;\n    if(c->frente==NULL){\n        c->final=NULL;\n    }\n    free(temp);\n    return dato;\n}\n\nint front(struct Cola *c){\n    if(isEmpty(c)){\n        printf(\"Error: la cola esta vacia\\n\");\n        return -1;\n    }\n    return c->frente->dato;\n}\n\nvoid destroy(struct Cola *c){\n    struct Nodo *temp;\n    while(c->frente!=NULL){\n        temp=c->frente;\n        c->frente=c->frente->siguiente;\n        free(temp);\n    }\n    c->final=NULL;\n}\n\nvoid printQueue(struct Cola *c){\n    if(isEmpty(c)){\n        printf(\"La cola esta vacia\\n\");\n        return;\n    }\n    printf(\"Elementos de la cola (frente -> final): \");\n    struct Nodo *actual=c->frente;\n    while(actual!=NULL){\n        printf(\"%d  \",actual->dato);\n        actual=actual->siguiente;\n    }\n    printf(\"\\n\");\n}\n"
  },
  "main": {
   "name": "cola_din_int.c",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/colaDinamica/cola_din_int.c",
   "code": "#include <stdio.h>\n#include \"cola_din_int_dec.h\"\n\nint main(){\n    struct Cola cola;\n    init(&cola);\n\n    enqueue(&cola,10);\n    enqueue(&cola,20);\n    enqueue(&cola,30);\n    printQueue(&cola);\n\n    printf(\"Atendido: %d\\n\",dequeue(&cola));\n    enqueue(&cola,40);\n    printQueue(&cola);\n\n    printf(\"Frente: %d\\n\",front(&cola));\n\n    destroy(&cola);\n    printQueue(&cola);\n\n    return 0;\n}\n"
  }
 },
 "dobleMal": {
  "impl": {
   "name": "push_un_apuntador.c",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/doble_apuntador/push_un_apuntador.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo{\n    int dato;\n    struct Nodo* siguiente;\n};\n\nvoid pushMal(struct Nodo *tope, int valor){\n    struct Nodo *nuevo = (struct Nodo *)malloc(sizeof(struct Nodo));\n    nuevo->dato = valor;\n    nuevo->siguiente = tope;\n    tope = nuevo;\n}\n\nint main(){\n    struct Nodo *pila = NULL;\n\n    pushMal(pila, 10);\n    pushMal(pila, 20);\n\n    return 0;\n}\n"
  }
 },
 "dobleBien": {
  "impl": {
   "name": "push_doble_apuntador.c",
   "path": "C/algoritmos_estructura_datos/Estudio/c_extra/doble_apuntador/push_doble_apuntador.c",
   "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo{\n    int dato;\n    struct Nodo* siguiente;\n};\n\nvoid pushBien(struct Nodo **tope, int valor){\n    struct Nodo *nuevo = (struct Nodo *)malloc(sizeof(struct Nodo));\n    nuevo->dato = valor;\n    nuevo->siguiente = *tope;\n    *tope = nuevo;\n}\n\nint main(){\n    struct Nodo *pila = NULL;\n\n    pushBien(&pila, 10);\n    pushBien(&pila, 20);\n\n    return 0;\n}\n"
  }
 }
};
