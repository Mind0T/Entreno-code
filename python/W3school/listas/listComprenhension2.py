#Para cualquier objeto iterable

new_list=[x for x in range(10)]
print(f"{new_list}\n")
# llenara la lista
#[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]  omite el 10 Recuerda que el limite algo ya sea un index o el rango mayor en un random o aqui es excluyente

new_list2=[x for x in range(10) if x<5]
print(f"{new_list2}\n")
#dara los siguiente
#[0, 1, 2, 3, 4]


#Este siguiente es un uso muy interesante
frutas=['platano','mango','naranja',"kiwi","durazno","Uva",'Pitaya','pepino','naranja']  #como ves no todas las frutas empiezan con mayusculas
print(f"Lista original, no todas las palabras en inician con mayuscula:\n{frutas}\n")
#['platano', 'mango', 'naranja', 'kiwi', 'durazno', 'Uva', 'Pitaya', 'pepino']
frutas_capital_letter=[x.capitalize() for x in frutas]
print(f"Aqui ya cada palabra inicia con mayuscula: \n{frutas_capital_letter}\n")
#['Platano', 'Mango', 'Naranja', 'Kiwi', 'Durazno', 'Uva', 'Pitaya', 'Pepino']

#Sirve para remplazar algo las opciones son infinitas por ejemplo
nueva_lista_frutas=[x if x !="naranja" else "papaya" for x in frutas] #wacha como es un if else lo que va antes del for es lo que se va como que agregar
print(f"Lista\n{nueva_lista_frutas}\n")
#['platano', 'mango', 'papaya', 'kiwi', 'durazno', 'Uva', 'Pitaya', 'pepino', 'papaya']

#Kiero remplazar todas las frutas que tengan n por otra fruta KEDA PENDIENTE

