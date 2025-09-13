'''
caracteres de salid


\'
\\
\n
\r retorno de carro regresa al inicio de la linea y sobreescribe
\t
\b Back space regresa un espacio
\f Este esta interesante ya que baja el contenido restante un renglon abajo pero a la misma altura a la que estaria en su linea original
\000 Te saca la letra del numero que sea en octal
\x00 Y este del hexadecimal
'''


#\r
print("1234567\rABC") 
#Si lo imprimo si se puede ver 

#?ABC4567

print("Irving Soriano Rosales")
print(f"Este es mi nombre en Octal : \111\162\166\151\156\147") #
print(f"Este es mi nombre en hexadecimal : \x49\x72\x76\x69\x6E\x67")