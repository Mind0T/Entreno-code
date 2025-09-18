'''
Lo que ya venimos manejando hace un rato

if condicion:
else:
elif condicion:

NOTA la identacion es muy importante

Nuevo
IF CORTO
Si solo se tiene una sentencia a ejecutar se puede usar la misma linea 

if a>b: print("a is a greater than b")


IF ELSE CORTO
Si solo se tiene una sentencia a ejecutar se puede usar la misma linea
a=2
b=330
print("A") if a>b else print("B")   --> Este se parece bastante al ternario


MULTIPLES Sentencias

a=330
b=330
print("A") if a<b else print("=") if a==b else print("B")


Aqui se pueden emplear 
and
or
not


PASS
Al igual que las funciones no se pueden dejar vacias por lo que podemos hacer uso de pass para que no genere error
'''

#Ejemplo de if else corto

a=2
b=330
print("A") if a>b else print("B") #notas como se parece mucho al ternario fijate que no se emplean ni : ni nada es recorrido

a=330
b=330

#Ke Bello ejemplo se tiene aquik
print("A") if a<b else print("=") if a==b else print("B")