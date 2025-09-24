#cadenas
cadena_larga='''
Este es el ejemplo
de una cadena larga
en python
'''
print(cadena_larga)
#meanejo de indices en cadenas
nombre='IrvinS'
apellido='Soriano'

for x in nombre:
    print(x)

print(f"El indice de la S en nombrees : {nombre.index("S")}")
print(f"La letra en el ultimo indice es de :{nombre[-1]}")
print(f"La cantidad de caracteres en la cadena es : {len(nombre)}")

#Algo muy importante es que las cadena son inmutables
try:
    nombre[0]="i"
    print(nombre)
except:
    print("Sabes que no una cadena es inmutable")
#
#TypeError: 'str' object does not support item assignment
#print(nombre.reverse())

print("\tMi nombre \"Verdadero\" es Irving")

#Concatenacion

concatenaion=nombre+" "+apellido
print(concatenaion)
concatenacion2=''.join([nombre," ",apellido])
print(concatenacion2)
concatenacion3=f"-{nombre} {apellido}"
print(concatenacion3)
# concatenacion4="{} {}".format(nombre,apellido)
concatenacion4="{a} {b}".format(b=apellido,a=nombre)
print(concatenacion4)
