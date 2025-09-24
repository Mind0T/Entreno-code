#Crear un email con los metodos de cadenas

'''def crear_email(nom,emp,dom):
    primer=nom.strip().lower().replace(" ",".")
    segundo=emp.strip().lower().replace(" ","")
    email=f"{primer}@{segundo}{dom}"

    return email'''

#pythonizado
def crear_email(nom,emp,dom):
    return f"{nom.strip().lower().replace(" ",".")}@{emp.strip().lower().replace(" ","")}{dom}"

nombre=input("Ingresa tu Nombre completo (pj: Brenda Martinez Reyes)\n")
empresa=input("Ingresa tu empresa (pg: Banco de Mexico\n")
dominio=input("Ingresa tu dominio (pj: .com.mx \\ .net)\n")

print(f"Con tus datos:\nNombre: {nombre.strip()}\nEmpresa: {empresa.strip()}\nDominio: {dominio.strip()}")
print("\nCreamos tu direccion de email:")

print(crear_email(nombre,empresa,dominio))
