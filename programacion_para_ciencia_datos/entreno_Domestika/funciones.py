def convertir_fahrenheit(cel):
    return (cel*1.8)+32

celcius=float(input("Ingrese los grados en celcius y se convertiran en Fahrenheit: "))
print(f"Ingresaste {celcius} celcius\nEquivale a: {convertir_fahrenheit(celcius)} faherenheit")
