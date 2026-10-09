from datetime import datetime as dt

print("\n\n*************************************************")
print("******Bienvenida a la tienda de mascotas*********")
print("*************************************************")



inventario={"perro":10,"gato":8,"pajaros":25,"iguana":2}
total_animales=0

for val in inventario.values():
    total_animales+=val

nombre=input("Porfavor ingresa tu nombre: ")
apellido=input("Ahora ingresa tu apellido: ")

print(f"\nBienvenido {nombre} {apellido}\n ")

compras=[]

def mostrar_menu():
    print("\nIngrese una opcion:")
    print("1- Conocer cuantos animales tiene la tienda")
    print("2- Comprar un animal")
    print("3- Mostrar Compras")
    print("4- Salir del programa")
def mostrar_stock():
    print("\n==INVENTARIO==\n")
    total_animales=0
    for animal, cant in inventario.items():
        print(f"    {animal} -> {cant}")
    
    for val in inventario.values():
            total_animales+=val
    print(f"En total contamos con {total_animales} animalitos")

    

def comprar_animal():
    carrito=[]
    while True:
        
        animal_comprado=input("\nIngrese que animal quiere comprar\nO escribe f para terminar la compra o v para ver el carrito:\n\n")

        if animal_comprado=='f':
            break
        elif animal_comprado=="v":
            print(f"\nEste es tu carrito: {carrito}")
            continue
        elif animal_comprado not in inventario:
            print(f"\nLo siento no vendemos con {animal_comprado} ")
        elif inventario[animal_comprado]==0:
            print(f"\nLo siento si vendemos {animal_comprado} pero ya no tenemos disponibles")
        elif animal_comprado not in carrito:
            print(f"\nSe agrego {animal_comprado} a tu carrito")
            carrito.append(animal_comprado)
        else:
            print("\nEse animal ya esta en tu carrito")
    fecha=dt.now()
    compras.append((nombre,carrito,fecha,))

    print(f"\nEste es su carrito:\n")
    for animal in carrito:
        print(" ",animal)
        inventario[animal]-=1
    
   
   


def mostrar_compras():
        print("")
        print(f"Compras realizadas:\n")
        for compra in compras:
            print(f"    {compra[0]} compro: {compra[1]} en {compra[2]}")

while True:
    
    mostrar_menu()
    respuesta=int(input("\n"))
    if respuesta==1:
        mostrar_stock()        
    elif respuesta==2:
        comprar_animal()
    elif respuesta==3:
        mostrar_compras()
    elif respuesta==4:
        break

print(f"\nFin del programa")
