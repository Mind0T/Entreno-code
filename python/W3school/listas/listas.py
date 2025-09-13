'''


'''

#insertar elementos con miList.insert(index,"item")
thislist=["apple","banana","cherry"]
thislist.insert(2,"watermelon")
print(thislist)

#["apple","banana","watermelon","cherry"]

#insertar un elemento con miList.append("item")    lo agrega al final y solo se puede de a uno por uno

#insert varios elementos con miList.extend("item1","item2"...) o en su defento pasar una lista ya definida los agrega al ultimo

#Remover elementos con Remove
#Como nota si existieran varios elementos remove solo quitara la primer incurrencia
thislist.remove("banana")
print(thislist)

#Remover en un indice especifico con miList.pop(index) Si el para metro () estuviera vacio borrara el ultimo elemento de la lista OJO el parametro solo es un Index
#Remover en un indice espcifico con del miList(index)  este puede elminar una lista completa del miList la borara toda

#Se pueden remover todos los elementos de una lista conservando la lista con miList.clear() al imprimirla se vera la lista vacia
