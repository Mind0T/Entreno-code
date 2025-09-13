


#sort
frutas=['platano','mango','naranja',"kiwi","durazno","Uva",'Pitaya','pepino','naranja'] 
print(f"Mi lista origianal: \n{frutas}\n")
frutas.sort()
print(f"Aqui se ven ordenada la lista de forma creciente\n{frutas}\n")
frutas.sort(reverse=True)
print(f"Aqui se ven ordenada la lista de forma decreciente\n{frutas}\n")

numeros=[2,5,6,4,8,2,3,43,5] 
print(f"Mi lista origianal: \n{numeros}\n")
numeros.sort()
print(f"Aqui se ven ordenada la lista de forma creciente\n{numeros}\n")
numeros.sort(reverse=True)
print(f"Aqui se ven ordenada la lista de forma decreciente\n{numeros}\n")

#sorted()


#Recordar el orden alnumerico que tiene

print("Es sensible a la mayusculas aqui un ejemplo de como hacer que no sea sensible a las mayusculas\n")

frutas.sort(key=str.lower)
print(f"Aqui ya aplique el miLista.sort(key=str.lower):\n{frutas}\n")

#invertir el orden solamente

frutas.reverse()
print(f"Aqui solo aplique miList.reverse() para invertir el orden \n{frutas}\n")