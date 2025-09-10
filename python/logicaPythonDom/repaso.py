#Este es un repaso del programa de en python hasta diccionarios
import os
from datetime import datetime

print("****************************")
print("******Bienvenido a**********")
print("****la tienda de mis********")
print("**********Tenis*************")
print("****************************")


inventarioTenis={
    "Nike":5,
    "Adidas":1,
    "Under armour":2,
    "Puma":3,
    "Pirma":4
}



totalMarcas=len(inventarioTenis)

compras=[]

nombre=input("Ingrese su nombre\n")
apellido=input("Ingrese su apellido\n")
print(f"\nBienvenido {nombre} {apellido}")

def mostrarMenu():
    print("\nElige una opcion")
    print("1- Mostrar inventario de tenis")
    print("2- Comprar tenis")
    print("3- Mostrar Compras hechas")
    print("4- Limpiar pantalla")
    print("5- Salir de la tienda")


def mostrarInventario():
    print("\n")
    print("Contamos con las siguientes marcas de tenis\n")
    for key, value in inventarioTenis.items():
        print(f"{key} --> {value}\n")
    
    totalTenis=0
    for valor in inventarioTenis.values():
        totalTenis+=valor
 
    print(f"Tenemos en total {totalMarcas} marcas\n")
    print(f"\nEn total contamos con: {totalTenis}")
    print("\n")

def comprarTenis():
    print("\n")
    carrito=[]
    while True:
        print("\nBienvenido a la tiendita\nElige que desas hacer")
        print("-Escribe f para finalizar la comprar")
        print("Escribe v para ve tu carrito de compras")
        print("Escribe de que marca te llevas tenis")
        opcionCompra=input("OPCION: ")
        print("\n")
        if opcionCompra=="f":
            print("Finalizar compra\n")
            break
        if opcionCompra=="v":
            print("Llevas esto en tu carrito: \n")
            print(f"   {carrito}")
            continue
        if opcionCompra not in inventarioTenis:
            print("Disculpa no vendemos esa marca de tenis\nIntenta con otra marca")
        elif inventarioTenis[opcionCompra]==0:
            print("Disculpa ya no tengo inventario de esa marca\nIntenta con otra marca")
        elif opcionCompra not in carrito:
            print(f"Se ha agregado {opcionCompra} a tu carrito\n")
            carrito.append(opcionCompra)
        else:
            print("Disculpa y tienes de esa marca en tu carrito\nIntenta con otra marca")
    
    print("\nTe llevas esto a tu casa\n")
    for opcionCompra in carrito:
        print(f"   {opcionCompra}\n")
        inventarioTenis[opcionCompra]-=1

    fecha=datetime.now()
    compras.append((nombre,carrito,fecha)) ##ojo aca no es un parentesis por cada tupla
    print("\n")

def mostrarCompras():
    print("\n")
    print("Estas han sido tus compras:\n")
    for pares in compras:
        print(f"{pares[0]} compro --> {pares[1]} el --> {pares[2]}\n")

    print("\n")



while True:
    mostrarMenu()
    opcionMenu=int(input("OPCION: "))
    if opcionMenu==1:
        mostrarInventario()
    elif opcionMenu==2:
        comprarTenis()
    elif opcionMenu==3:
        mostrarCompras()
    elif opcionMenu==4:
        os.system("cls")
    elif opcionMenu==5:
        print("Hasta luego, vuelve pronto")
        break
    else:
        print("Elige una opcion valida del 1 al ")
