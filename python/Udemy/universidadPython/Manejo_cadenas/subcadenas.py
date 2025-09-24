#Manejo Subcaenas

cadena="Hola, Mundo!"
print(cadena)
subcadena=cadena[6:-1]
print("Subcadenas")
print(subcadena)
subcadena2=cadena[:4]
print(subcadena2)
#Busqueda de subcadenas
posicion=cadena.find("Mundo")
print(f"Indice donde inicia la subcade Mundo: {posicion}")
posicion=cadena.find("Hola")
print(f"Indice donde inicia la subcade Hola: {posicion}")
cadena_replace=cadena.replace("Mundo","a todos")
print(cadena_replace)