import os
import json

# --- Rutas ---
ruta_base = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ruta_datos = os.path.join(ruta_base, "datos", "streaming_musical-ruido_100000.csv")
ruta_resultado = os.path.join(ruta_base, "practica2", "resultados", "analisis_python.json")

# --- Columnas de nuestro tema: streaming_musical ---
COL_CATEGORICA = "genero_musical"
COL_NUMERICA_1 = "reproducciones"
COL_NUMERICA_2 = "calificacion_promedio"

PAREJA = "Cruz Salgado Oscar, Gonzalez Aceves Luis Fernando, Soriano Rosales Irvin Jair"
SEED = 377


# ======================================================================
# PARTE DE IRVIN: lectura + categoricas
# ======================================================================

def leer_datos(ruta):
    """Lee el CSV (separado por |) y regresa una lista de diccionarios.
    Cada fila es un dict {nombre_columna: valor}."""
    datos = []
    with open(ruta, mode="r", encoding="utf-8") as archivo:
        encabezado = archivo.readline().rstrip("\r\n")
        columnas = encabezado.split("|")
        for linea in archivo:
            linea = linea.rstrip("\r\n")
            if not linea:
                continue
            valores = linea.split("|")
            datos.append(dict(zip(columnas, valores)))
    return datos


def valores_unicos(datos, columna):
    """Regresa el set de valores unicos de una columna.
    Solo .strip() (sin .lower()); descarta vacios."""
    unicos = set()
    for fila in datos:
        valor = fila.get(columna, "").strip()
        if valor != "":
            unicos.add(valor)
    return unicos


def conteo_por_categoria(datos, columna):
    """Regresa un diccionario {valor: conteo} de una columna.
    Solo .strip() (sin .lower()); no cuenta vacios."""
    conteo = {}
    for fila in datos:
        valor = fila.get(columna, "").strip()
        if valor != "":
            conteo[valor] = conteo.get(valor, 0) + 1
    return conteo


def categoria_mas_frecuente(conteo):
    """A partir del dict de conteos, regresa (valor, conteo) del mas frecuente.
    Desempata por nombre en orden alfabetico."""
    mejor = sorted(conteo.items(), key=lambda par: (-par[1], par[0]))
    return mejor[0]


def top_3_categorias(conteo):
    """Las 3 categorias con mas apariciones, de mayor a menor.
    Empate -> orden alfabetico. Lista de dicts {valor, conteo}."""
    ordenado = sorted(conteo.items(), key=lambda par: (-par[1], par[0]))
    return [{"valor": v, "conteo": c} for v, c in ordenado[:3]]


# ======================================================================
# PARTE DE COMPANERO A: estadisticas numericas + promedio por categoria
#   - estadisticas(datos, columna): min, max, promedio Y MEDIANA
#     (usar filter() primero, luego map() para convertir a float)
#   - promedio_por_categoria(datos, categorica, numerica)
# ======================================================================

def estadisticas(datos, columna):
    pass  # TODO companero A


def promedio_por_categoria(datos, categorica, numerica):
    pass  # TODO companero A


# ======================================================================
# PARTE DE COMPANERO B: filtrado (percentil 90) + armar y guardar JSON
#   - filtrar con filter() + lambda, umbral = lista_ordenada[int(0.9*n)]
#   - construir el dict final y json.dump(..., indent=2, ensure_ascii=False)
# ======================================================================

def filtrado_percentil_90(datos, numerica):
    pass  # TODO companero B


# ======================================================================
# Prueba temporal de la parte de Irvin (se quita al integrar todo)
# ======================================================================
if __name__ == "__main__":
    datos = leer_datos(ruta_datos)
    print("Filas leidas:", len(datos))
    print("Llaves de la fila 0:", list(datos[0].keys()))

    unicos = valores_unicos(datos, COL_CATEGORICA)
    print("Generos unicos:", len(unicos))

    conteo = conteo_por_categoria(datos, COL_CATEGORICA)
    valor, cuenta = categoria_mas_frecuente(conteo)
    print("Mas frecuente:", valor, cuenta)

    print("Top 3:", top_3_categorias(conteo))
