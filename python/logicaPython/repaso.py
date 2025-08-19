from datetime import datetime

print("*********************")
print("****Bienvenido a*****")
print("****la tienda de*****")
print("******mascotas********")


inventario={
    "perro":10,
    "conejo":30,
    "hamster":20,
    "gato":15,
    "capibara":1
}


animalesTotales=0
for val in inventario.values():
    animalesTotales+=val

nombre=input("Cual es su nombre: ")
apellido=input("Cual es su apellido: ")
print(f"\nBienvenido {nombre} {apellido}\n")

compras=[]

def mostrarMenu():
    print("\nSeleccione la opcion que desea")
    print("1 - Conocer cuantos animales tien la tienda")
    print("2- Comprar un animal")
    print("3- Mostrar compras")
    print("4- Salir del programa")

def mostrarInventario():
    print("\nINVENTARIO\n")
    for key, value in inventario.items():
        print(f"{key}: {value}")
    print(f"\nEn total contamos con {animalesTotales} animales\n")
    

def comprarAnimal():
    carrito=[]
    while True:
        print("\n-Escribe f para terminar la lista")
        print("-Escribe v para ver tu carrito")
        animal=input("-Ingresa el animal que desea comprar,(Solo puedes agregar uno de cada especie\nOPCION: ")
        if animal=="f":
            break
        if animal=="v":
            print(f"Tu carrito de comprar contiene {carrito}")
            continue
        if animal not in inventario:
            print(f"\nLo sentimos no contamos con el animal {animal}")
        elif inventario[animal]==0:
            print(f"Lo sentimos no tenemos en existencia el animal: {animal}")
        elif animal not in carrito:
            carrito.append(animal)
        else:
            print("\nLo siento ese animal ya esta en tu carrito")

    print("\nEl contenido de tu carrito es:")
    for animal in carrito:
        print(" ",animal)
        inventario[animal]-=1
    fecha=datetime.now()
    compras.append((nombre,carrito,fecha))


def mostrarCompras():
    print("")
    print("Compras Realizadas")
    for compra in compras:
        print(f"    {compra[0]} compro:{compra[1]} el {compra[2]}")


while True:
    mostrarMenu()
    respuesta=int(input("Opcion: "))
    
    if respuesta==1:
        mostrarInventario()

    elif respuesta==2:
        comprarAnimal()

    elif respuesta==3:
        mostrarCompras()

    elif respuesta==4:
        print("Hasta luego esperamos verte de regreso")
        break
    
    
        


