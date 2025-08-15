""" #def para declarar una funcion

def saludar(nom):
    print("\nSaludos ",nom)

def saludoaNovia(nomNov):
    print("\nKe dures mucho tiempo con ",nomNov)

nombreUno=input("Ingrese su nombre:\n")
nombreDos=input("Ingrese el nombre de tu novia\n")

saludar(nombreUno)
saludoaNovia(nombreDos)


 """

"""
Celcios a fahrenheit: (c*1.8)+32
"""
def convertirCelciusToFahrenheit(cel):
    return (cel*1.8)+32
    
celcius=float(input("Ingrese los grados celcius a fahrenheit:\n"))

print("\nIngresaste",celcius,"celcius\nY en fahrenheit son: ",convertirCelciusToFahrenheit(celcius),"fahrenheit")

