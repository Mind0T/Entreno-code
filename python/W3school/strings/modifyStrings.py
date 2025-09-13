'''
Podemos modificar los stings de distantas formas 

'''

#ANTE TODO RECUERDA KE LOS STRINGS SON IMUTABLES
#upper

nombres='''
            Irving Soriano
        Dylan Soriano
    Jaime Soriano
Brenda Martinez
'''
print(f"String original {nombres}\n")
#modifico el string
nombres.upper()
#Se manda a imprimir despues  de upper pero se vera que no tiene efecto
print(f"String depues de usar el metodo .upper{nombres}\nComo se puede apreciar no la modifica como .append\n")

#Para eso o se manda imprimir print(nombre.upper()) o:
mayusculas=nombres.upper()  # Se cre una variable nuevo y se le da nombre ya modificada
print(f"Aqui si se modifica al asignarla a otra variable: {mayusculas}\n")

#Lo mismo sucede con lower
print("Usando la funcion miString.lower()")
print(nombres.lower())

#Ahora con strip quita los espacios al inicio o al final de un string no se mete con espacios intermedios
#tambien se debe o imprimir y que se ejecute en tiempo real o crear una varible
sin_espacios=nombres.strip()
print(f"Sin espacios usanfo miString.strip() :\n{sin_espacios}\n")
'''
Asi lo imprime
Irving Soriano
        Dylan soriano
    Jaime Soriano
Brenda Martinez

'''
print("Como se ve solo modifica los espacio al inicio o al final de la cadena\n")


#Usando miString.replace("aCambiar","porEste")
nombres.replace("Soriano","Rosales") # no va funcionar
#otro_apellido=nombres.replace("Soriano","Rosales")   --> Esta seria otra forma
print(f"Esta es mi string despues de miString.replace() {nombres.replace('Soriano','Rosales')}") #<----Se puede pero aguas tuve que usar comillas sencillas dentro de las llaves de variable
#ya que se estaba confundinedo

#Usando miString.split() para convertir en este caso mi sting largo por una lista
print("Lo convierto en una lista")
print(f"Convierto el string en una lista: usando miString.split() {nombres.split()}\n") 
#Si no especifio algo en los parentesis por default toma los espacios como corte entre palabras pero bien les puedo miString.split("-") guion o, miString.split("_") guion bajo
#? Bueno esto no del todo cierto dado que al parecer lo que le pongas es mas bien lo que va descartar no tanto lo que va tomar como separador

print("Ahora en este espacio aprovechare para cambiar el nombre de Brenda Martinez por el Isabel Rosales\n")

##Como no lo asigne a ninguna varia lo hare ahora para poder modificarla

stringToList=nombres.split()
#['Irving', 'Soriano', 'Dylan', 'Soriano', 'Jaime', 'Soriano', 'Brenda', 'Martinez']

stringToList[-2:]=["Isabel","Rosales"] #aqui aprovecho al mutabilidad de las listas para hacer cambios
print(f"Cabio Brenda Martinez por Isabel Rosales {stringToList}\nMira el tipo de dato: {type(stringToList)}\n")
#['Irving', 'Soriano', 'Dylan', 'Soriano', 'Jaime', 'Soriano', 'Isabel', 'Rosales']

#Ahora pasare de nuevo mi lista con el metodo join
print("Ahora lo juntara con ' '.join(miList)\n")
news_string=" ".join(stringToList)
print(f"Este es mi string de nuevo {news_string}\nMira el tipo de dato {type(news_string)}\n")
#Irving Soriano Dylan Soriano Jaime Soriano Isabel Rosales

#Como nota me los guarda en el nuevo string en una sola linea a diferencia de como estaba pero eso no es tan importante
