
""" i=0
while i<=10:
    if i<5:
        print("El numero",i,"es menor a 5")
    elif i==5:
        print("El numero",i,"es igual a 5")
    else:    
        print("El numero",i,"es mayor a 5")
    i+=1

print("Se termino la iteracion") """


""" #Para cada x en Rodrigo
#Toma el text y lo descompone

for x in "Irving":
    print(x)

print("\n")
for x in range(1,10):
    print(x) """


while True:
        print("Escribe la opcion deseada\n")
        print("1: Saludar")
        print("2: Salir")

        respuesta=int(input("Opcion: "))

        if respuesta==1:
            print("\nSaludos terricola\n")
        elif respuesta==2:
              break
        
print("Terminando Programa")

