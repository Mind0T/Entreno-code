#Diccionarios



persona={"Nombre": "Irving","Apellido":"Soriano","Edad":34}

print(persona)
print(persona["Apellido"])


persona["Apellido"]="Rosales"

print(persona)

persona["Apodo"]="EivindLeso"

print(persona["Apodo"])

print("LLave")
for key in persona.keys():
    print(key)
for value in persona.values():
    print(value)

for key, value in persona.items():
    print(f"La llave {key} tiene el valor: {value}")


print("Nombre" in persona)