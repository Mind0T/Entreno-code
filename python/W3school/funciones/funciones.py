'''
RECORDATORIO
-Se crea con la palabra def
def my_function():
    cuerpo de la funcion

-Los arrgumentos que recibe en los parentesis pueden ser los que sean
def my_function(num1,num2):

-Aunque si defines con dos argumentos al mandarla llamar es necesario que reciba las dos
NO MENOS, NO MAS.

-Parametro o Argumentos
Desde la perspectiva de la funcion
-Un parametro es la variable listada dentro de los parentesis de la definicion de la funcion
-Un argumento es el valor que se manda cuando se llama a la funcion

-Se puede retornar valor con return (el clasico ejemplo de mandar numero sumarlos en la funcion y retornar el resultado)

-Usar pass para cuando aun no se construye el cuepor de la funcion

***TEMA NUEVO pero que no provee abajo
Se puede deternmiar que la funcion solo recibira argumentos posicionales o argumentos de palabra clave

Posicionales
def funcino(a,/):    con esto si quisiera pasar palabras clave como argumento me generara un error

palabra clave
def funcion(*,a):   con esto si quisiera pasar argumento de posicion me generara un error

los mas loco es que se pueden combinar ese si lo codeo abajo


'''

#Cosas nuevas

#Argumentos arbitrarios

'''Si no se conoce cuantos argumentos se pasaran se puede agregar UJ * antes del parametro
este recibe una tupla a la cual se puede accede con indices
'''
print("Arbitrary Arguments")
def my_function(*kids):
    print(f"Este es mi segundo nombre {kids[1]}") #Y aqui se manda a llamar nadamas


my_function("Irvin","Brenda","Dilan","Jaime","Maru","Diana","Lalo","Isabel")


print("\nKeyword Arguments")
#Keyword Arguments
def funcion2(child3,child1,child2):
    print(f"The youngest child is {child2}")

funcion2(child1="Irving",child2="Diloncio",child3="Brenda")

#Arbitraty keyword arguments
'''
Lo mismo de hace rato si no se conoce el numero de para metros y si se usa los palabras clave
se puede usar en este caso DOBLE ** antes del argumento
Este lo que recibira es un diccionario al cual se puede acceder con el nombre de la clave
'''
print("\nArbitrary keyword arguments")

def funcion3(**kids):
    print(f"El apellido es {kids['lname']}")

funcion3(fname="Irvin",lname="Soriano")

#Default parameter value
print("\nDeafault parameter value")
'''
Se puede definir el valor de un parametro en la definicion de una funcion asi si no recibe un
argumente usara el valor asignado por default

'''
def saludaFamilia(nombre="Irvin"):
    print(f"Hola que tal buen dia {nombre}")

saludaFamilia("Jaime")
saludaFamilia("Brenda")
saludaFamilia()
saludaFamilia("Dilan")

#Pasar una lista como un argumento
print("\nPasar una lista como un argumento")
def funcion4(food):
    print("Hola desde la funcion")
    for x in food:
        print(x)

fruits=["apple","banana","cherry"]
funcion4(fruits)

#Combine PositionalOnly and keyword only
print(f"\nCombinar solo argumentos solo posicionales y argumentos solo palabra clave")

def funcion5(a,b,/,*,c,d):
    print(a+b+c+d)

funcion5(5,6,c=7,d=8)

#Funciones Recursivas
'''Estas son muy buenas para eficientizar procesos pero se debe
tener mucho cuidado con su uso ya que podemos caer en loops infinitos que nos puedes
dejar sin memoria y sin capacidad de procesamiento'''
print(f"Funcinoes Recursivas")
def tri_recursion(k):
    if(k>0):
        result=k+tri_recursion(k-1)
        print(result)
    else:
        result=0
    return result


print(f"Recursion Example result:")
tri_recursion(6)