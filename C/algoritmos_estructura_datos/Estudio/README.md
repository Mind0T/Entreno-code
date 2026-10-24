# Estudio · Algoritmos y estructuras de datos en C

Sitio web interactivo para estudiar los programas de esta carpeta: explicaciones detalladas, animaciones SVG,
pruebas de escritorio que siguen tu código C línea por línea (con stack, heap y apuntadores), laboratorio y quiz.

**Temas:** burbuja · selección · inserción · mezcla · pila estática · paréntesis · pila dinámica · doble apuntador ·
infija → postfija · cola estática (circular) · cola dinámica · (próximamente: búsqueda secuencial y binaria).

Es HTML + CSS + JavaScript puro, sin build ni dependencias (tipografías incluidas en `fonts/`).

## Ver en tu computadora

```bash
cd C/algoritmos_estructura_datos/Estudio
python3 -m http.server 8000     # y abre http://localhost:8000
```
(También funciona abriendo `index.html` directamente.)

## Desplegar en Vercel

1. *Add New… → Project* e importa el repositorio.
2. **Root Directory:** `C/algoritmos_estructura_datos/Estudio`
3. **Framework Preset:** Other · sin *Build Command* ni *Output Directory*.
4. *Deploy*. `vercel.json` ya trae las cabeceras y la caché.

## Si cambias tu código C

Vercel solo publica esta carpeta, así que el código de tus `.c`/`.h` se copia (sin comentarios) a `js/datos/fuentes.js`:

```bash
python3 C/algoritmos_estructura_datos/Estudio/scripts/sincronizar_codigo.py
```

Las animaciones están escritas a mano siguiendo tu código; si cambias líneas, la página avisa en la consola del navegador
qué línea ya no encontró. Para comprobar que las animaciones siguen siendo fieles al programa real (compila con `gcc`
y compara salidas):

```bash
node C/algoritmos_estructura_datos/Estudio/scripts/verificar.js
```

## Estructura

- `index.html`, `css/`, `fonts/`, `vercel.json`
- `js/nucleo.js` (utilidades) · `jugador.js` (reproductor paso a paso) · `vistas.js` (SVG) · `ui.js` · `app.js`
- `js/modulos/*-trazas.js`: simulaciones que reproducen cada programa
- `js/contenido/*.js`: textos, anotaciones, laboratorios y quizzes por tema
- `c_extra/`: código C que **no** estaba en el repo y se escribió para esta página: cola estática, cola dinámica y
  dos ejemplos de apuntador simple vs. doble apuntador.
