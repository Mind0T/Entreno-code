from datetime import datetime # libreria para fechas

print("*****************************")
print("********BIENVENIDO A*********")
print("***A LA TIEDA DE MASCOTAS****")
print("*****************************")


inventario={ ##este afuerza si tiene que ir aca
        "perro":10,
        "gato":8,
        "pajaros":25,
        "iguana":2
    }

""" num_perros=10
num_gatos=8
num_pajaros=25
 """

animalesTotales=0

for val in inventario.values():
    animalesTotales+=val

print("Cual es Nombre")
nombre=input()
print("Cual es su Apellido: ")
apellido=input()
print("\nGracias por visitarnos:",nombre,"",apellido,"\n")

compras=[]


def mostraMenu():
    print("Selecciona la opcion que desea")
    print("1- Conocer cuantos animales tiene la tienda")
    print("2- Comprar un animal")
    print("3- Mostrar compras")
    print("4. Salir del programa")

def mostrarInventario():

    print("\n***INVENTARIO***\n")
    for key, value in inventario.items():
        print(f"  {key}: {value}")
    print("\nEn total tenemos: ",animalesTotales,"animales\n")

    """   print("\nActualmente contamos con:")
    print("Perros:",num_perros)
    print("Gatos:",num_gatos)
    print("Pajaros: ",num_pajaros)
    print("En total tenemos: ",num_perros+num_gatos+num_pajaros,"animales") """



def mostrarCompras():
    print("")
    print("Compras Realizadas")

    for compra in compras:
        print(f"   {compra[0]} compro {compra[1]} el {compra[2]}")


def comprarAnimal():
    carrito=[]
    while True:

        print("\n-Escribe f para terminar la lista")
        print("-Escribe v para ver tu carrito")
        animal=input("-Ingresa el animal que deseas comprar,(Solo puedes agregar uno de cada especie)\nOPCION: ")
        if animal=="f":
            break
        if animal=="v":
            print(f"Tu carrito de compras contien {carrito}")
            continue
        if animal not in inventario:
            print(f"Lo sentimos no contamos con el animal {animal}")
        elif inventario[animal]==0:
            print(f"Lo sentimos, no tenemos en existencia el animal: {animal}")
        elif animal not in carrito:
            carrito.append(animal)
        else:
            print("\nLo sieto ese animal ya esta en tu carrito")

    print("\nEl contenido de tu carrito es:")
    for animal in carrito:
        print("  ",animal)
        inventario[animal]-=1
    
    fecha=datetime.now() #asi invoca la fecha
    compras.append((nombre,carrito,fecha))
    #Compras tiene longitud 1 (solo tengo 1 compra)
    # Es una tupla, Nombre, Carrito, Fecha        


while True:
    mostraMenu()
    respuesta=int(input("Respuesta: "))

    if respuesta== 1:
        mostrarInventario()

    elif respuesta==2:
        comprarAnimal()
    
    elif respuesta==3:
        mostrarCompras()

    elif respuesta==4:
        print("\nHasta luego")
        break
