print("Bienvenido al conversor de millas a kilometros\n")
print("Ingrese el numero de millas\n")
millas=input()
print("\nSus millas ingresadas es: ",millas)

#Para castear un dato puedo usar int(variable) o float(variable) y asi poder operarlo
# Una milla es igual 1.609 km

#kilometro=millas*1.609  el input siempre regresa un tipo string 

millas=float(millas)
kilometro=millas*1.609 # para que pueda operar como numero debo de recastearlo

print("Kilometros: ", kilometro)

