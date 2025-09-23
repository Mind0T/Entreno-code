#metodos van con un.  como lista.append   contrario a una funcion que va con funcion()


'''
algunos ejemplos 

EN LISTAS
.append(valor)
.reverse() para invertir el orden de los elementos
.index(valor)
.count(valor)
.remove(valor) -->si hay varios elementos iguales elimina el primero solamente

EN STRING
.replace("z","sa")
capitalize()
'''





fam=['irving',33,'jaime',62,'dilan',29,'brenda',29]

buscar_indice=fam.index("dilan")
print(f"Este es la lista {fam}")
print(f"El indice de dilan en la lista es {buscar_indice}")

conteo_elementos=fam.count(29)
print(f"El numero 29 aparece : {conteo_elementos}")