#!/usr/bin/env python3
"""
sincronizar_codigo.py
=====================
Lee TUS archivos .c / .h del repositorio, les quita los comentarios
(la pagina trae sus propias explicaciones) y genera js/datos/fuentes.js.

Cuando cambies un archivo .c, vuelve a correr:

    python3 C/algoritmos_estructura_datos/Estudio/scripts/sincronizar_codigo.py

y haz commit del fuentes.js nuevo. Asi la pagina siempre muestra tu codigo real.
(Vercel solo despliega la carpeta Estudio, por eso el resultado se guarda aqui.)

OJO: las animaciones buscan lineas por su texto (por ejemplo
"if (numeros[j] > numeros[j + 1])"). Si renombras variables o reescribes
una linea, la animacion avisara en la consola del navegador que no la encontro.
"""
import json
import os
import re
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
ESTUDIO = os.path.dirname(AQUI)
RAIZ_REPO = os.path.abspath(os.path.join(ESTUDIO, "..", "..", ".."))
ED = "C/algoritmos_estructura_datos/estruc_datos"
EST = "C/algoritmos_estructura_datos/Estudio/c_extra"

# modulo -> carpeta (relativa a la raiz del repo) + archivos [dec, impl, main]
MANIFIESTO = {
    "burbuja": (f"{ED}/algoritmos_ordenamiento/burbuja",
                ["declaracion_burbuja.h", "implementacion_burbuja.c", "main_burbuja.c"]),
    "seleccion": (f"{ED}/algoritmos_ordenamiento/seleccion",
                  ["declaracion_seleccion.h", "implementacion_seleccion.c", "main_seleccion.c"]),
    "insercion": (f"{ED}/algoritmos_ordenamiento/insercion",
                  ["declaracion_insercion.h", "implementacion_insercion.c", "main_insercion.c"]),
    "mezcla": (f"{ED}/algoritmos_ordenamiento/mezcla",
               ["declaracion_mezcla.h", "implementacion_mezcla.c", "main_mezcla.c"]),
    "pilaEstatica": (f"{ED}/pila/pilaEstatica/pila_est_int",
                     ["pila_est_int_dec.h", "pila_est_int_impl.c", "pila_est_int.c"]),
    "parentesis": (f"{ED}/pila/pilaEstatica",
                   ["TADPilaEstatica.h", "TADPilaEstatica.c", "practica.c"]),
    "pilaDinamica": (f"{ED}/pila/pilaDinamica/pila_din_int",
                     ["pilaDinamicaDeclaracion.h", "pilaDinamicaImplementacion.c", "pilaDinamica.c"]),
    "infija": (f"{ED}/pila/examen",
               ["pilaDinamicaDeclaracion.h", "pilaDinamicaImplementacion.c", "main.c"]),
    "colaEstatica": (f"{EST}/colaEstatica",
                     ["cola_est_int_dec.h", "cola_est_int_impl.c", "cola_est_int.c"]),
    "colaDinamica": (f"{EST}/colaDinamica",
                     ["cola_din_int_dec.h", "cola_din_int_impl.c", "cola_din_int.c"]),
    # ejemplos de la leccion "un * vs dos **" (un solo archivo cada uno)
    "dobleMal": (f"{EST}/doble_apuntador", ["push_un_apuntador.c"], ["impl"]),
    "dobleBien": (f"{EST}/doble_apuntador", ["push_doble_apuntador.c"], ["impl"]),
}
ROLES = ["dec", "impl", "main"]


def quitar_comentarios(src: str) -> str:
    """Quita /* ... */ y // ... respetando cadenas y caracteres."""
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if c in "\"'":
            q = c
            out.append(c)
            i += 1
            while i < n and src[i] != q:
                if src[i] == "\\":
                    out.append(src[i])
                    i += 1
                out.append(src[i])
                i += 1
            out.append(q)
            i += 1
        elif src.startswith("/*", i):
            j = src.find("*/", i + 2)
            i = n if j < 0 else j + 2
        elif src.startswith("//", i):
            j = src.find("\n", i)
            i = n if j < 0 else j
        else:
            out.append(c)
            i += 1
    return "".join(out)


def limpiar(src: str) -> str:
    src = src.replace("\r\n", "\n").replace("\r", "\n")
    src = quitar_comentarios(src)
    src = src.expandtabs(4)
    src = re.sub(r"[ ]+\n", "\n", src)
    src = re.sub(r"\n{3,}", "\n\n", src)
    return src.strip("\n") + "\n"


def main() -> int:
    fuentes = {}
    for modulo, entrada in MANIFIESTO.items():
        carpeta, archivos = entrada[0], entrada[1]
        roles = entrada[2] if len(entrada) > 2 else ROLES
        fuentes[modulo] = {}
        for rol, nombre in zip(roles, archivos):
            ruta = os.path.join(RAIZ_REPO, carpeta, nombre)
            if not os.path.isfile(ruta):
                print(f"[x] No encontre {carpeta}/{nombre}", file=sys.stderr)
                return 1
            with open(ruta, encoding="utf-8", errors="replace") as f:
                codigo = limpiar(f.read())
            fuentes[modulo][rol] = {
                "name": nombre,
                "path": f"{carpeta}/{nombre}",
                "code": codigo,
            }
    destino = os.path.join(ESTUDIO, "js", "datos", "fuentes.js")
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    with open(destino, "w", encoding="utf-8") as f:
        f.write("/* GENERADO por scripts/sincronizar_codigo.py - no lo edites a mano */\n")
        f.write("window.EST = window.EST || {};\n")
        f.write("EST.fuentes = ")
        json.dump(fuentes, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    total = sum(len(v["code"].splitlines()) for m in fuentes.values() for v in m.values())
    print(f"[ok] {len(fuentes)} modulos, {total} lineas de C -> {os.path.relpath(destino, RAIZ_REPO)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
