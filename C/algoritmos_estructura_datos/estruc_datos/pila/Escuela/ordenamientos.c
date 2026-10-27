#include <stdio.h>

/* ---------- funcion para imprimir el arreglo ---------- */
void imprimir(int numeros[], int tam) {
    int i;
    for (i = 0; i < tam; i++) {
        printf("%d ", numeros[i]);
    }
    printf("\n");
}

/* ---------- BUBBLE SORT ---------- */
/* compara de dos en dos y si estan al reves los cambia */
void burbuja(int numeros[], int tam) {
    int i, j, aux;
    for (i = 0; i < tam - 1; i++) {
        for (j = 0; j < tam - 1 - i; j++) {
            if (numeros[j] > numeros[j + 1]) {
                aux = numeros[j];
                numeros[j] = numeros[j + 1];
                numeros[j + 1] = aux;
            }
        }
    }
}

/* ---------- SELECTION SORT ---------- */
/* busca el mas chico y lo pone al principio */
void seleccion(int numeros[], int tam) {
    int i, j, menor, aux;
    for (i = 0; i < tam - 1; i++) {
        menor = i; /* guardo la posicion del mas chico */
        for (j = i + 1; j < tam; j++) {
            if (numeros[j] < numeros[menor]) {
                menor = j;
            }
        }
        aux = numeros[i];
        numeros[i] = numeros[menor];
        numeros[menor] = aux;
    }
}

/* ---------- INSERTION SORT ---------- */
/* agarra un numero y lo mete en su lugar como cartas */
void insercion(int numeros[], int tam) {
    int i, j, actual;
    for (i = 1; i < tam; i++) {
        actual = numeros[i];
        j = i - 1;
        while (j >= 0 && numeros[j] > actual) {
            numeros[j + 1] = numeros[j]; /* recorro a la derecha */
            j--;
        }
        numeros[j + 1] = actual;
    }
}

/* ---------- MERGE SORT ---------- */
/* junta dos mitades que ya estan ordenadas */
void juntar(int numeros[], int inicio, int mitad, int fin) {
    int izquierda[100], derecha[100];
    int tam1 = mitad - inicio + 1;
    int tam2 = fin - mitad;
    int i, j, k;

    /* copio las mitades */
    for (i = 0; i < tam1; i++) {
        izquierda[i] = numeros[inicio + i];
    }
    for (j = 0; j < tam2; j++) {
        derecha[j] = numeros[mitad + 1 + j];
    }

    i = 0;
    j = 0;
    k = inicio;
    /* voy poniendo el mas chico de los dos */
    while (i < tam1 && j < tam2) {
        if (izquierda[i] <= derecha[j]) {
            numeros[k] = izquierda[i];
            i++;
        } else {
            numeros[k] = derecha[j];
            j++;
        }
        k++;
    }
    /* lo que sobro de la izquierda */
    while (i < tam1) {
        numeros[k] = izquierda[i];
        i++;
        k++;
    }
    /* lo que sobro de la derecha */
    while (j < tam2) {
        numeros[k] = derecha[j];
        j++;
        k++;
    }
}

void mezcla(int numeros[], int inicio, int fin) {
    int mitad;
    if (inicio < fin) {
        mitad = (inicio + fin) / 2;
        mezcla(numeros, inicio, mitad);   /* ordeno la parte izquierda */
        mezcla(numeros, mitad + 1, fin);  /* ordeno la parte derecha */
        juntar(numeros, inicio, mitad, fin);
    }
}

/* ---------- MAIN ---------- */
int main() {
    int numeros[100];
    int tam, i, opcion;

    printf("Cuantos numeros quieres ordenar? (max 100): ");
    scanf("%d", &tam);

    for (i = 0; i < tam; i++) {
        printf("Numero %d: ", i + 1);
        scanf("%d", &numeros[i]);
    }

    printf("\n1. Bubble sort\n");
    printf("2. Selection sort\n");
    printf("3. Insertion sort\n");
    printf("4. Merge sort\n");
    printf("Elige una opcion: ");
    scanf("%d", &opcion);

    printf("\nAntes: ");
    imprimir(numeros, tam);

    if (opcion == 1) {
        burbuja(numeros, tam);
    } else if (opcion == 2) {
        seleccion(numeros, tam);
    } else if (opcion == 3) {
        insercion(numeros, tam);
    } else if (opcion == 4) {
        mezcla(numeros, 0, tam - 1);
    } else {
        printf("Opcion no valida\n");
        return 0;
    }

    printf("Despues: ");
    imprimir(numeros, tam);

    return 0;
}
