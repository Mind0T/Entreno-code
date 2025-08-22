#Ahora hare una tienda de palomitas
import os
from datetime import datetime

print("\n")
print("*********************")
print("*********************")
print("*****Bienvennido*****")
print("**a Miss Palomitas***")
print("*********************")
print("*********************")

inventarioPalomitas={
        "mango":5,
        "mantequilla":4,
        "chedar":6,
        "limon y sal":3,
        "vainilla":2,
        "doritos nacho":3,
        "ruffles de queso":1,
        "tajin":2,
        "chipotle":4,
    }

totalPalomitas=0
for valor in inventarioPalomitas.values():
    totalPalomitas+=valor
totalSabores=len(inventarioPalomitas)

compras=[]



print("\n")
print("Hola fan de las palomitas presentate\n")
nombre=input("Tu nombre:  ")
apellido=input("Tu apellido:  ")
print("\n")
print(f"Bienvenido {nombre} {apellido}")

def mostrarMenu():
    print("Que deseas hacer?")
    print("1- Ver mi inventario de palomitas")
    print("2- Comprarme Palomitas")
    print("3- Ver tus compras de palimtas")
    print("4- Limpiar Pantalla")
    print("5- Salir de la tienda")
    print("\n")

def mostrarInventario():
    print("\n")
    print("Mira tenemos todas estas palomitas disponibles en tamanio mediana 250 grs\n")
    for key,val in inventarioPalomitas.items():
        print(f"Sabor - {key}, quedan: {val}\n")
    print(f"EN TOTAL TENEMOS {totalSabores} sabores, y {totalPalomitas} bolsas")
    print("\n")

def comprarPalomitas():
    print("\n")
    carrito=[]
    while True:
        print("Esta es la tiendita\nQue deseas hacer?\n")
        print("-Ingrese el sabor de palomitas que desea comprar")
        print("-Escriba v para ver su carrito")
        print("Escriba f para finalizar su compra")
        opcionTiendita=input("Opcion:  ")
        if opcionTiendita=="f":
            print("Finalizando Compra\n")
            break
        if opcionTiendita=="v":
            print("\nLlevas estos sabores en tu carrito")
            print(f"{carrito}\n")
            continue
        if opcionTiendita not in inventarioPalomitas:
            print("\n")
            print(f"Lo siento no vendemos el sabor {opcionTiendita}\nIntenta con otro sabor\n")
            print("\n")
        elif inventarioPalomitas[opcionTiendita]==0:
            print("\n")
            print(f"Lo siento no tenemos inventario del sabor {opcionTiendita}\nIntenta con otro sabor\n")
            print("\n")
        elif opcionTiendita not in carrito:
            print(f"\nSe ha agreagado {opcionTiendita} a tu carrito\n")
            carrito.append(opcionTiendita)
        else:
            print("\n")
            print(f"Disculpa el sabor {opcionTiendita} ya lo tienes en tu tiendita\nIntenta con otro sabor\n")
            print("\n")
    
    print("\nTe llevas:")
    for opcionTiendita in carrito:
        print(f"          {opcionTiendita}\n")
        inventarioPalomitas[opcionTiendita]-=1
    
    fecha=datetime.now()
    compras.append((nombre,carrito,fecha))
    
    print("\n")

def mostrarCompras():
    print("\n")
    print("Historial de compras\n")
    for bolsitas in compras:
        print(f"{bolsitas[0]} compro -->{bolsitas[1]} el: {bolsitas [2]}\n")
    print("\n")


while True:
    mostrarMenu()
    opcionMenu=int(input("Opcion: "))
    if opcionMenu==1:
        mostrarInventario()
    elif opcionMenu==2:
        comprarPalomitas()
    elif opcionMenu==3:
        mostrarCompras()
    elif opcionMenu==4:
        os.system("cls")
    elif opcionMenu==5:
        print("\n")
        print("Hata pronto\nDisfruta de todas tus palomitas")
        break
    else:
        print("\n")
        print("Ingrese una opcion valida")
        print("\n")
