#listas

#permite tener varios elementos de funcion

nombre=["Irving","Dilan","Rodrigo","Jaime","Jose","Santiago"]
print(nombre)
print(nombre[2])
nombre[2]="Brenda"
print(nombre[2])
print("Longitud de la lista: ", len(nombre))
print("Tipo de dato de mi variables nombres ", type(nombre))

#Agregar nombres a la lista 
nombre.append("Maru")
print(nombre)

#Remover elementos de la lista por medio del nombre del elemeto

nombre.remove("Jose")
print(nombre)

#Remover elemento de la lista por medio del indice
del nombre[4]
nombre.append("Diana")

print(nombre)

#Encontrar un elemento en la lista

print("Irving esta en la lista?:","Irving" in nombre)





