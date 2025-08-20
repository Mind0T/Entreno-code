#Vamos a hacer una tienda de musica

import os
from datetime import datetime

print("\n")
print("*******************************")
print("*********Bienvenido************")
print("****a mi tienda de musica******")
print("*******************************")
print("*******************************")

bancoAlbumes={
        "Billie Ellish":6,
        "Lana del Rey":7,
        "Radio Head":8,
        "Taylor Swift":9
    }

totalAlbumes=0

for val in bancoAlbumes.values():
    totalAlbumes+=val

compras=[]

print("Primero presentate:\n")
nombre=input("Cual es tu nombre:\n")
apellido=input("Cual es tu apellido\n")
print(f"Hola {nombre} {apellido}")

def mostrarMenu():
    print("Que deseas hacer:")
    print("1- Ver albums disponibles")
    print("2- Comprar un album")
    print("3- Mostrar canciones compradas")
    print("4- Limpiar pantalla")
    print("5- Saliir de la tienda")

def mostrarAlbumes():
    print("\n")
    print("Contamos con los siguientes artistas:\n")
    for key, val in bancoAlbumes.items():
        print(f"   {key}: {val}\n")
    print(f"En total son {totalAlbumes} albumes")
    print("\n")
def comprarAlbum():
    carrito=[]
   

    while True:
        print("\n")
        print("Bieeen que deseas hacer:")
        print("- Esribe f para finalizar la compra")
        print("-Escribe v para ver tu carrito")
        print("-De que artistta deseas comprar un album")
        opcionCompras=input("Opcion: ")
        if opcionCompras=="f":
            print("\nFinalizando compra")
            break
        if opcionCompras=="v":
            print("\nLLevas esto en tu carrito\n")
            print(carrito)
            continue
        if opcionCompras not in bancoAlbumes:
            print("\nLo siento no cuento con ese Artista")
        elif bancoAlbumes[opcionCompras]==0:
            print("\nLo siento ya no tengo albumes de ese Artista\nIntenta con otro\n")
        elif opcionCompras not in carrito:
            print(f"Has agregado {opcionCompras} a tu carrito")
            carrito.append(opcionCompras)
        else:
            print("Ya tienes ese album en tu carrito")


    print("Te llevaras un album de los siguientes artistas:\n")
    for opcionCompras in carrito:
        print(f"      {opcionCompras}\n")
        bancoAlbumes[opcionCompras]-=1
    
    fecha=datetime.now()
    compras.append((nombre,carrito,fecha))

    print("\n")

def mostrarCompras():
    print("\n")
    for album in compras:
        print(f"{album[0]} compro: {album[1]} el {album[2]}\n")

    print("\n")

while True:
    mostrarMenu()
    opcionMenu=int(input("Opcion: "))
    if opcionMenu==1:
        mostrarAlbumes()
    elif opcionMenu==2:
        comprarAlbum()
    elif opcionMenu==3:
        mostrarCompras()
    elif opcionMenu==4:
        os.system("cls")
    elif opcionMenu==5:
        print("\n")
        print("Hasta luego, esperamos que regreses pronto")
        break
    else:
        print("\n")
        print("Opcion invalida por favor ingese alguna opcion del 1 al 5\n")
    