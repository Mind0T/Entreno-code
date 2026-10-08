nombre=input("Ingrese su nombre: ")
edad=int(input("Ingrese su edad: \n"))

if nombre=="Irving" and edad<30:
    print(f"Saludos {nombre}, todo fue un suenio")
elif nombre=="Irving" and edad>=30:
    print(f"Saludos {nombre} ya estas viejo raioz\n ")
elif nombre=="Dilan":
    print("Eres Genomico vete")
elif nombre=="Brenda":
    print("Eres Psicologa vete")
else:
    print("No te topo")