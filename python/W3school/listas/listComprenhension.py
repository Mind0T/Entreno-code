#List comprenhension

#Ofrecen un sintaxis corta cuando queremos crear una nueva lista con base a una lista ya existente

# un ejemplo 

#Forma tradicional de iterar que solo imprima los elementos de un lista que tengan a

""" fruits=['apple',"banana","cherry","kiwi","mango"]
new_list=[]

for x in fruits:
    if "a" in x:
        new_list.append(x)
print(new_list)

#Forma con comprehension lists

newlist2=[x for x in fruits if "a" in x] #---> Es mucho mas corto pedir que me lo explique Gemini
print(newlist2)
 """


frutas=['Platano','Mango','Naranja',"kiwi","Durazno","Uva",'Pitaya','Pepino']

print(f"Una impresion simple de mi lista {frutas}\n")

print(f"ahora creare una lista que contenga la frutas que tengan una \"n\" en el nombre\n")

print("Metodo tradicional:")
frutasWithN=[]
for x in frutas:
    if "n" in x:
        frutasWithN.append(x)

print(f"Mira esta es la lista con las fruta con una\"n\" en su nombre (con el metodo tradicional un for): {frutasWithN}\n")
frutasWithN2=[x for x in frutas if "n" in x]
print(f"Mira esta es la lista con las fruta con una\"n\" en su nombre (con una comprenhension list): {frutasWithN2}\n")
frutasWithoutA=[x for x in frutas if "a" not in x]
print(f"Mira esta es la lista con las fruta que no tengan \"a\" en su nombre (con una comprenhension list): {frutasWithoutA}\n")