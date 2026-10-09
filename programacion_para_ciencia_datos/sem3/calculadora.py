##Calculadora
print("==Calculadora==")

num_1=float(input("Ingrese el primer numero:\n"))
num_2=float(input("Ingrese el segundo numero:\n"))

print(f"{f'En la operacion suma {num_1} + {num_2} el resultado es:':<100}{num_1+num_2:>30.2f}")
print(f"{f'En la operacion resta {num_1} - {num_2} el resultado es:':<100}{num_1-num_2:>30.2f}")
print(f"{f'En la operacion multiplicacionmultiplicacionmultiplicacionmultiplicacion {num_1} * {num_2} el resultado es:':<100}{num_1*num_2:>30.2f}")

if num_2!=0:
    print(f"{f'En la operacion division {num_1} / {num_2} el resultado es:':<100}{num_1/num_2:>30.2f}")
else:
    print(f"Lo siento no es posible dividir entre 0")
