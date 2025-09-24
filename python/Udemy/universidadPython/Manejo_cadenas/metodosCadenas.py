#Metodos cadenas

'''

.upper()
.lower()
.capitalize()
.strip()
.split()
.replace()
cadena.title()
string.capword(cadena)
" ".join(cadena)

'''
import string
import string

# Variable inicial con espacios al inicio
nombre="   irvin Jair soriano"
print("Texto original con espacios al inicio:")
print(nombre)

# Pasar todo a mayúsculas con .upper()
print("\nConvertir todo a MAYÚSCULAS con .upper():")
mayus=nombre.upper()
print(mayus)

# Pasar todo a minúsculas con .lower()
print("\nConvertir todo a minúsculas con .lower():")
minus=nombre.lower()
print(minus)

# Quitar espacios al inicio y final con .strip()
print("\nEliminar espacios al inicio y al final con .strip():")
sin_espacios=minus.strip()
print(sin_espacios)

# Capitalizar cada palabra con string.capwords()
print("\nCapitalizar cada palabra con string.capwords():")
capital=string.capwords(sin_espacios)
print(capital)

# Capitalizar cada palabra con .title()
print("\nCapitalizar cada palabra con .title():")
capital2=sin_espacios.title()
print(capital2)

# Reemplazar espacios por guiones bajos con .replace()
print("\nReemplazar espacios por guiones bajos con .replace():")
con_guiones_como_separadores=capital.replace(" ","_")
print(con_guiones_como_separadores)

# Convertir el string en lista separando por "_"
print("\nConvertir el string en lista con .split('_'):")
a_lista=con_guiones_como_separadores.split("_")
print(a_lista)

# Modificar el último elemento de la lista (apellido)
print("\nModificar el último elemento (apellido):")
a_lista[-1]="Rosales"
print(a_lista)

# Unir la lista en un string separado por espacios con .join()
print("\nUnir la lista en un string de nuevo con ' '.join():")
a_string_again=" ".join(a_lista)
print(a_string_again)