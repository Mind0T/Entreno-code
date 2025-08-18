nombre=["Rodrigo","Juan","Pedro","Santiago","Jorge","Raymundo"]
print(nombre)

#obtener los primeros tres

#para imprimir los primeros tres nombre
print("Bienvenidos a la fiesta: ",nombre[:3])
#para imprimir los ultimos se puede dejar el ultimo vacio ya sabra que debe ir hasta el final
print("Lo sentimos: ", nombre[3:])


#Esta es una forma de imprimir los nombres que se inscribieron en uuna lista
""" for  miembro in (nombre):
    print("Se inscribio en la lista",miembro)

RESULTADO
Se inscribio en la lista Rodrigo
Se inscribio en la lista Juan
Se inscribio en la lista Pedro
Se inscribio en la lista Santiago
Se inscribio en la lista Jorge
Se inscribio en la lista Raymundo """


""" 
for i,miembro in enumerate(nombre):
    print("Se Inscribieron en la lista",i,miembro)

RESULTADO CON LOS INDICES
Se inscribio en la lista 0 Rodrigo
Se inscribio en la lista 1 Juan
Se inscribio en la lista 2 Pedro
Se inscribio en la lista 3 Santiago
Se inscribio en la lista 4 Jorge
Se inscribio en la lista 5 Raymundo
 """

#F-strings

for i,n in enumerate(nombre):
    print(f"Se inscribio: {n}, con el indice- {i}")




