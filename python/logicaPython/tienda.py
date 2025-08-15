print("*****************************")
print("********BIENVENIDO A*********")
print("***A LA TIEDA DE MASCOTAS****")
print("*****************************")

num_perros=10
num_gatos=8
num_pajaros=25

print("Cual es Nombre")
nombre=input()
print("Cual es su Apellido: ")
apellido=input()


def mostraMenu():
    print("\nGracias por visitarnos:",nombre,"",apellido,"\n")
    print("Selecciona la opcion que desea")
    print("1- Conocer cuantos animales tiene la tienda")
    print("2- Comprar un animal")
    print("3- Salir del programa")

def mostrarInventario():
    print("\nActualmente contamos con:")
    print("Perros:",num_perros)
    print("Gatos:",num_gatos)
    print("Pajaros: ",num_pajaros)
    print("En total tenemos: ",num_perros+num_gatos+num_pajaros,"animales")

def comprarAnimal():
    animal=input("Ingresa el animal que deseas comprar: ")
    print("\nHaz comprado un:",animal)


while True:
    mostraMenu()
    respuesta=int(input("Respuesta: "))

    if respuesta== 1:
        mostrarInventario()

    elif respuesta==2:
        comprarAnimal()
    
    elif respuesta==3:
        print("\nHasta luego")
        break
