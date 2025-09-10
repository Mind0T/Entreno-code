""" nombre="Irving"
print("Longitud del nombre ",len(nombre)) """

""" print(abs(-10)) """

""" #random 
import random
#randint(min,max)
resultado=random.randint(1,100)
print(resultado) """

def saludar_y_sumar(nombre,num1=0,num2=0): #Por ejemplo el inicializar num2 con 0 me permite que si no se agrega ningun numero pues este se pueda ejecutar

    print("Saludos",nombre)
    print("Resultado de la suma",num1+num2)

nom=input("Ingresa tu nombre: ")
no1=int(input("Ingresa un numero: "))
no2=int(input("Ingrese un segundo numero: "))

saludar_y_sumar(nom,no1,no2)
nom=input("Ingresa tu nombre: ")
no1=int(input("Ingresa un numero: "))
no2=int(input("Ingrese un segundo numero: "))
saludar_y_sumar(nom,no1,no2)

    



