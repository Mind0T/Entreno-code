#subconjuntos de listas

#Solo para destacar de entre todos los temas dados al chingadazo en el curso este es los nuevo

areas=[11.25,18.0,20.0,10.75,9.50]

# si copio de la siguiente forma

areas_copy=areas

print(f"Lista original: {areas}\nLista copiada1 :{areas_copy}\n\n")

#modifico areas
print("Modifico areas en indice 1 de 18 por 35\n al imprimir veras que se modifican ambas")
areas[1]=35
print(f"Lista original: {areas}\nLista copiada1: {areas_copy}\n")
print("Se modifican ambas listas\n\n")
# para modifica necesito 
# pasar toda la lista es decir areas[:]
areas_copy2=areas[:]
print(f"Lista original antes de modificar el indice 0 de 11.25 a 45 con lista2=areas[:]")
areas[0]=45
print(f"Lista original: {areas}\nLista copiada2: {areas_copy2}\n")
print("Solo se modifica en la lista original\n\n")
# pasar la lista del modo =list(areas)
areas_copy3=list(areas)
print(f"Lista antes de la ultima modificaciones en el  indice  3 de 10.75 por 100 con lista3=list(areas)\n")
areas[3]=100
print(f"Lista original: {areas}\nLista copiada3: {areas_copy3}\n")
print("Tambien solo se modifica la lista original\n")

# pasar la lista del modo =list.copy()
areas_copy4=areas.copy()
print(f"Lista antes de la ultima modificaciones en el  indice  4 de 9.5 por 233 con lista4=areas.copy()\n")
areas[4]=233
print(f"Lista original: {areas}\nLista copiada3: {areas_copy4}\n")
print("Tambien solo se modifica la lista original\n")


