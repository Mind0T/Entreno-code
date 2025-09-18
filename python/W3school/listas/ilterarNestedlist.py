'''
Varias formas de iterar una lista anidada
'''

print('''
Forma tradicional
a=[[1,2],[3,4],[5,6]]

for sublist in a:
    for item in sublist:
        print(item)
''')
print("Resultado")
a=[[1,2],[3,4],[5,6]]

for sublist in a:
    for item in sublist:
        print(item)



print('''
Usando Itertools.chain
import itertools

a=[[1,2],[3,4],[5,6]]
b=itertools.chain(*a)
print([i for i in b])
''')
import itertools

print("Resultado")
a=[[1,2],[3,4],[5,6]]
b=itertools.chain(*a)
print([i for i in b])



print('''
Usando List comprenhension
a=[[1,2],[3,4],[5,6]]
items=[item for sublist in a for item in sublist]
print(items)
''')
print("Resultado")
a=[[1,2],[3,4],[5,6]]
items=[item for sublist in a for item in sublist]
print(items)



print('''
Usando numpy.flatten()
import numpy as np
a=[[1,2],[3,4],[5,6]]
b=np.array(a).flatten()
print(b)
''')
print("Resultado")
import numpy as np
a=[[1,2],[3,4],[5,6]]
b=np.array(a).flatten()
print(b)
