##Este es mi ulti mo entrene de python antes de entrar al curso de IA de domestika
import os
from datetime import datetime

print("*****************************")
print("*****************************")
print("***** Bienvenido a la *******")
print("** tienda de celulares ******")
print("*****************************")
print("*****************************")

inventario={
        "xiaomi":4,
        "samsung":5,
        "iphone":3,
        "huaweii":1,
        "oppo":4
    }



compras=[]


nombre=input("Como se llama: ")
apellido=input("Cual es su apellido: ")
print(f"\nBienvenido {nombre} {apellido}\n")


def mostrarMenu():
    print("Escoge una opcion:")
    print("1- Mostrar Inventario de marcas de celulares")
    print("2- Comprar un celular")
    print("3- Mostrar la compras hechas")
    print("4- Limpiar pantalla")
    print("5- Salir de la tienda de celulares")
    print("\n")

def mostrarInventario():
    print("\n")
    print("Actualmente este es nuestro inventari\n")
    for clave, valor in inventario.items():
        print(f"{clave}:  {valor}\n")
    totalInventario=0
    marcasTotales=len(inventario)
    for val in inventario.values():
        totalInventario+=val
    print(f"Es decir en total tenemos {totalInventario} de {marcasTotales} marcas distintas\n")    
    print("\n")

def hacerCompra():
    carrito=[]
    print("\n")
    while True:
        print("Bienvenido a la tiendita de celulares")
        print("Elige una opcion:")
        print("- Escribe f para finalizar la compra")
        print("- Escribe v para ver el carrito de compras")
        print("- Escribe una marca coprar")
        opcionCompras=input("\nOpcion: ")
        if opcionCompras=="f":
            print("\nFinalizando compra...")
            break
        if opcionCompras=="v":
            print(f"\nEsto es lo que llevas en tus compras --> {carrito}\n")
            continue
        if opcionCompras not in inventario:
            print(f"\nDisculpa no vendemos {opcionCompras}\nIntenta con otra marca\n")
        elif inventario[opcionCompras]==0:
            print(f"\nDisculpa ya no tengo inventario de {opcionCompras}\nIntenta con otra marca\n")
        elif opcionCompras not in carrito:
            print(f"\nSe ha agregado {opcionCompras} a tu carito\n")
            carrito.append(opcionCompras)

    print("\nTe llevas esto a tu casa:")
    for opcionCompras in carrito:
        print(f"     {opcionCompras}\n")
        inventario[opcionCompras]-=1

    fecha=datetime.now()

    compras.append((nombre,carrito,fecha))
    print("\n")
    
def mostrarCompras():
    print("\n")
    print("Historial de Compras:\n")
    for equipos in compras:
        print(f"El {equipos[2]}:  {equipos[0]} compro --> {equipos[1]}")
    print("\n")


while True:
    mostrarMenu()
    opcionMenu=int(input("Opcion: "))
    if opcionMenu==1:
        mostrarInventario()
    elif opcionMenu==2:
        hacerCompra()
    elif opcionMenu==3:
        mostrarCompras()
    elif opcionMenu==4:
        os.system("cls")
    elif opcionMenu==5:
        print("\nHasta luego esperamos que vuelvas pronto\n")
        break
    else:
        print("\nIngrese una opcion valida\n")