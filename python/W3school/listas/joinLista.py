#Existen deferentes formas de unir o concatenar dos o mas listas

'''
sumandolas solamente 

usando append si lo uso asi pelon recuerda que sobre la lista base con 4 elementos se agregaria como quinto elemento la lista 
con los elementos de la lista osea agregarias un dimension en es parte

usando el extend este si lo agrega uno por uno

si quisiera agregar cada elemento de la lista copiada a la base tendri que iterar de la siguente manera:

'''

numero1=[1,2,3,4,5]
print(f"lista 1:\n{numero1}\n")
numero2=[6,7,8,9,]
print(f"Lista 2: \n{numero2}\n")
numero1.append(numero2)
print(f"Si usara el append asi pelon: \n{numero1}\n")
print(f"Ahora si lo iterando")


for x in numero2:
    numero1.append(x)
del numero1[5]
print(f"\n{numero1}\n")



