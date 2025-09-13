#check string
#check if not


# nombre_completo=input("Ingresa de favor tu nombre completo\n")
apellido_materno=input("Ingresa el apellido materno y veremos si coincide con el que ingresaste\n")

if apellido_materno=="Reyes" and apellido_materno in nombre_completo:
    print(f"En efecto {apellido_materno} es el apellido materno")
elif apellido_materno in nombre_completo:
    print(f"Mira {apellido_materno} es parte del nombre, sin embargo no es el apellido materno")
else:
    print(f"Ufff que crees que {apellido_materno} no es el apellido ni es parte del nombre")


#Otra forma es usar in Not

'''
not in 
'''