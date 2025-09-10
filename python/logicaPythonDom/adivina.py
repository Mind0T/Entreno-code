#Un pequeno juego de adivinar el numero

import random


def numSecreto():
    return random.randint(2,12)
        


def imprimir_respuesta(numSe,numUsuario):
    if(numSe==numUsuario):    
        print("Increible adivinaste el numero\nEl numero de los dados fue:",numSe,"\nY que el numero era ")
    
    else:
        print("Lo siento no adivinaste el numero\nEl numero de los dados fue:",numSe)


def menu():
    while True:
        print("Bienvenido al juego del numero secreto\n")
        print("Seleccione una opcion\n")
        print("1- Adivine los dados\n")
        print("2- Salir del juego\n")
        opcion=int(input("OPCION: "))
        if opcion==1:
            numero=int(input("\n1- Adivine que numero total nos dara dos dados (del 1 al 12)\n"))    
            imprimir_respuesta(numSecreto(),numero)
        elif opcion==2:
            print("Hasta pronto")
            break
        else:
            print("INGRESE UNA OPCION VALIDA\n")

menu()
print("Fin del juego")