#18 importar la libreria para mi variable tiempo
from datetime import datetime

print("**********************")
print("******Bienvenido********")
print("***a la tienda de******")
print("********mascotas******")


#8 Defino la variable de tipo Global diccionario clave valor
# para la funcion de mostrar inventario
inventario={
    "perro":10,
    "gato":8,
    "pajaro":25,
    "iguana":2,
    "conejo":1
}
totalAnimales=0
#9 Defino la variable de totalAnimales y la itero para obtener el total de animales
for val in inventario.values():
    totalAnimales+=val

#11 Defino la variable compra que ocupare en hacer compras y mostrare en mostrar compras
compras=[]

#1 genero variables de nombre y apellido y mando a saludar
nombre=input("Cual es su nombre\n")
apellido=input("Cual es su apellido\n")
print(f"\nBienvenido {nombre} {apellido}\n")


#2 Creo una funcion con el menu


def mostrarMenu():
    print("Escoge una opcion")
    print("1- Mostrar el inventario")
    print("2 Compra un animal")
    print("3 Mostrar las compras")
    print("4 Salir de la tienda")
#3 con base al menu declaro las funciones

def mostrarInventario():
    #7 Desarrollo la funcion de mostrar inventario
    print("\n")
    print("Actualmente contamos con:\n")
    for key, val in inventario.items():
        print(f"{key}: {val}")
    print(f"\nEn total son {totalAnimales} animales")
    print("\n")

def comprarAnimal():
    #10 Desarrollo la funcion de hacer comprar
    print("\n")
    #12 Defino la variable carrito que solo vivira aqui
    carrito=[]
    
    #14 Hago un while para controlar las opciones
    while True:
        #13 Doy indicacions
        print("Que bueno que te animes a comprar un animalito")
        print("Elige una opcion:\n")
        print("-Escribe f para terminar tus compras")
        print("-Escribe v para ver tu carrito")
        print("-Elige un animal\n")
        comprasOpcion=input("Opcion: ")

        if comprasOpcion=="f":
            print("Finalizando compra\n")
            break
        if comprasOpcion=="v":
            print("\nLlevas esto en tu carrito:")
            print(f"{carrito}\n")
            continue
        #15 aqui va la parte dificil de los diccionario
        if comprasOpcion not in inventario:
            print(f"\nLo sentimos no vendemos {comprasOpcion}\nPrueba con otro\n")
        elif inventario[comprasOpcion]==0:
            print(f"\nLo siento ya no tengo inventario de {comprasOpcion}\nPrueba con otro\n")
        elif comprasOpcion not in carrito:
            carrito.append(comprasOpcion)
            print(f"\nSe ha agregado {comprasOpcion} a tu carrito\n")
        else:
            print(f"\nYa tienes agregado {comprasOpcion} en tu carrito\nPrueba con otro\n")
        
    #16 Indicar que haz finalizado compras y mostrar lita
    print(f"\nCompra finalizada compraste:\n")
    for comprasOpcion in carrito:
        print(f"  ",comprasOpcion)
        inventario[comprasOpcion]-=1
    #17 Definir variable fecha e importar la variable compras
    fecha=datetime.now()
    compras.append((nombre,carrito,fecha))

    print("\n")

def mostrarCompras():
    print("\n")
    for compra in compras:
        print(f"   {compra[0]} compro {compra[1]} el {compra[2]}")
    print("\n")

#4 Construye el while para que mande a las funcione

while True:
    mostrarMenu() #5 Muestro el menu
    opcion=int(input("\nOpcion: \n"))

    #6 Evaluo la opcion del usuario y doy las likeo a las funciones
    if opcion==1: 
        mostrarInventario()
    elif opcion==2:
        comprarAnimal()
    elif opcion==3:
        mostrarCompras()
    elif opcion==4:
        print("\n")
        print("Hasta luego, regrese pronto")
        break
    else:
        print("\n")
        print("Ingrese una opcion valida")
        print("\n")
        continue
        