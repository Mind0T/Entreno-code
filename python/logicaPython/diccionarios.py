""" 
Lista de elementos en modo llave:valor
En otros lenguajes se les conoce cmo Arreglos asociativos

 """

persona={"nombre":"Irving",
         "edad":33,
         "apellido":"Soriano"}

print(persona)

persona["nombre"]="Dilan"

print(persona["apellido"])
print(persona)

#agregar otro valor

persona["profesion"]="Ingeniero"
print(persona)

#ver las listas de la llave
"""
print("keys: ",persona.keys())
print("values: ",persona.values())
print("items: ",persona.items()) 

"""


""" print("\nkeys\n")
for key in persona.keys():
    print(key)

print("values:\n")
for value in persona.values():
    print(value)

print("\nitems\n")
for item in persona.items():
    print(item)
 """


for key,value in persona.items():
    print(f"La llave {key} tiene el valor {value}")

print("\n","name" in persona)


