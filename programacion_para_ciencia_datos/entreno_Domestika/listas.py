#listas

nombres=["Irving","Brenda","Dilan"]
print(nombres)
nombres.append("Jaime")
nombres.append("Isabel")
print(nombres)
#nombres.remove("Irving")
del nombres[1]
print(nombres)

nombres.append("Jandy")
nombres.append("Maru")
nombres.append("Diana")
nombres.append("Lalo")

print(nombres)

print(f"\nLos Soriano Rosales: {nombres[:-4]}")
print(f"\nLos Martinez Reyes: {nombres[-4:]}")

for i,nombre in enumerate(nombres):
    print(f"Se inscribio {i}-{nombre}")

#print(f"{'Irving' in nombres}")


