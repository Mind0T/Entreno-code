#Adivina

import random as rd

def tirar_dados():
    return rd.randint(2,12)

def pedir_respuesta():
    print("Ingresa tu respuesta:")
    print("1- Numero Par")
    print("2- Numero Impar")
    print("3- Salir del juego")
    return int(input(": "))

def imprimir_resultado(num,pred):
    #not
    es_par=num%2==0

    if pred==1:
        texto_elegido="NUMERO PAR"
    else:
        texto_elegido="NUMERO IMPAR"

    if es_par and pred==1:
        print(f"\nEl numero es: {num} y elegiste: {texto_elegido} por tanto: GANASTE\n")
    elif not es_par and pred==2:
        print(f"\nEl numero es: {num} y elgiste {texto_elegido} por tanto: GANASTE\n")
    else: 
        print(f"\nEl numero es: {num} y elegiste {texto_elegido} por tanto: PERDISTE\n")

print(f"\n==TIRO DE DADOS==\n")

while True:
    numero=tirar_dados()
    prediccion=pedir_respuesta()
    if prediccion==3:
        break
    imprimir_resultado(numero,prediccion)

print("\nSaliendo el juego")
