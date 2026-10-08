from datetime import datetime as dt

print("\n\n*************************************************")
print("******Bienvenida a la tienda de mascotas*********")
print("*************************************************")

num_perro=10
num_gatos=8
num_pajaros=25
total_animales=num_perro+num_gatos+num_pajaros
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
    print("\nActualmente contamos con:\n")
    print(f"Perros: {num_perro}\nGatos: {num_gatos}\nPajaro: {num_pajaros}\nEn total son: {total_animales} animalitos")

def comprar_animal():
    carrito=[]
    while True:
        
        animal_comprado=input("\nIngrese que animal quiere comprar\nO escribe f para terminar la compra o v para ver el carrito:\n\n")

        if animal_comprado=='f':
            break
        elif animal_comprado=="v":
            print(f"\nEste es tu carrito: {carrito}")
            continue
        elif animal_comprado not in carrito:
            print(f"Se agrego {animal_comprado} a tu carrito")
            carrito.append(animal_comprado)
        else:
            print("\nEse animal ya esta en tu carrito")
    fecha=dt.now()
    compras.append((nombre,carrito,fecha,))

    print(f"\nEste es su carrito:\n")
    for animal in carrito:
        print(animal)

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
