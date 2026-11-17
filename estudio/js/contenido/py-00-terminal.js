/* ============================================================
   Terminal, VS Code y entornos virtuales (week01)  (página de entorno)
   Prosa + imágenes + bloques de comandos (estáticos: la terminal
   y git no corren en el navegador). Derivado del .md del curso.
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, h = E.h;
  function prosa(cont, html) { cont.append(h("div", { class: "prosa", html: html })); }
  function callout(cont, html) {
    cont.append(h("div", { class: "lz-callout", style: { "--c": "var(--ambar)" },
      html: '<span class="ic"><svg viewBox="0 0 24 24"><path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg></span><p>' + html + '</p>' }));
  }
  function bloque(cont, code) { cont.append(h("div", { class: "prosa", html: '<pre class="bloque"><code>' + code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</code></pre>' })); }

  function instalacion(cont) {
    prosa(cont, "<h2>Antes de la primera clase — Instalación</h2>");
    prosa(cont, "<p>Necesitas tener instalados <b>3 programas</b> antes del martes 25 de agosto. Si llegas sin ellos, no podrás seguir la clase.</p><h3>1. Python 3.10 o superior</h3><p><b>Descarga:</b> <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">python.org/downloads</a></p><p><b>Pasos de instalación (Windows):</b></p><ol><li>Descargar el instalador de la versión más reciente (ej. Python 3.12.x).</li><li><b>MUY IMPORTANTE:</b> en la primera pantalla del instalador, marcar la casilla <b>\"Add python.exe to PATH\"</b> antes de hacer clic en \"Install Now\".</li></ol>");
    prosa(cont, "<figure class=\"lz-figura\"><img src=\"assets/entorno/week01/python_instalador_path.png\" alt=\"Instalador de Python — marcar Add to PATH\" loading=\"lazy\"><figcaption>Instalador de Python — marcar Add to PATH</figcaption></figure>");
    prosa(cont, "<ol><li>Clic en \"Install Now\" y esperar a que termine.</li><li>Verificar en la terminal:</li></ol>");
    bloque(cont, "$ python --version\nPython 3.12.4");
    prosa(cont, "<p>Si ves el número de versión (3.10 o superior), la instalación fue exitosa.</p><p><b>Mac:</b> Python 3 suele venir preinstalado en versiones recientes de macOS. Verificar con <code>python3 --version</code>. Si no está, instalar con <a href=\"https://brew.sh/\" target=\"_blank\" rel=\"noopener\">Homebrew</a>: <code>brew install python</code>.</p><p><b>Linux:</b> Verificar con <code>python3 --version</code>. Si no está, instalar con el gestor de paquetes de tu distribución: <code>sudo apt install python3 python3-venv python3-pip</code> (Ubuntu/Debian).</p><h3>2. Git (incluye Git Bash en Windows)</h3><p><b>Descarga:</b> <a href=\"https://git-scm.com/downloads\" target=\"_blank\" rel=\"noopener\">git-scm.com/downloads</a></p><p><b>Pasos de instalación (Windows):</b></p><ol><li>Descargar el instalador y ejecutarlo.</li><li>Durante la instalación, dejar todas las opciones por defecto excepto:</li></ol><ul><li>En <b>\"Choosing the default editor used by Git\"</b>, seleccionar <b>\"Use Visual Studio Code as Git's default editor\"</b> (en lugar de Vim).</li><li>En <b>\"Adjusting the name of the initial branch\"</b>, seleccionar <b>\"Override the default branch name\"</b> y escribir <code>main</code>.</li></ul><ol><li>Completar la instalación.</li><li>Verificar abriendo <b>Git Bash</b> (buscar en el menú de inicio) y ejecutar:</li></ol>");
    bloque(cont, "$ git --version\ngit version 2.45.1");
    prosa(cont, "<ol><li>Configurar tu nombre y correo (se usarán en cada commit):</li></ol>");
    bloque(cont, "$ git config --global user.name \"Tu Nombre\"\n$ git config --global user.email \"tu_correo@ejemplo.com\"");
    prosa(cont, "<p><b>Mac:</b> Instalar con <code>brew install git</code> o ejecutar <code>git --version</code> (macOS te ofrece instalarlo automáticamente si no lo tiene).</p><p><b>Linux:</b> <code>sudo apt install git</code> (Ubuntu/Debian).</p><h3>3. Visual Studio Code</h3><p><b>Descarga:</b> <a href=\"https://code.visualstudio.com/\" target=\"_blank\" rel=\"noopener\">code.visualstudio.com</a></p><p><b>Pasos de instalación (Windows):</b></p><ol><li>Descargar el instalador y ejecutarlo.</li><li>Durante la instalación, marcar estas opciones:</li></ol><ul><li><b>\"Add to PATH\"</b> (para poder abrir VS Code desde la terminal con <code>code .</code>)</li><li><b>\"Register Code as an editor for supported file types\"</b></li><li><b>\"Add 'Open with Code' action to Windows Explorer file context menu\"</b></li><li><b>\"Add 'Open with Code' action to Windows Explorer directory context menu\"</b></li></ul><ol><li>Completar la instalación.</li><li>Verificar desde la terminal:</li></ol>");
    bloque(cont, "$ code --version\n1.90.0");
    prosa(cont, "<p><b>Mac:</b> Descargar el <code>.zip</code>, descomprimir y mover la aplicación a la carpeta de Aplicaciones. Para habilitar el comando <code>code</code> en la terminal: abrir VS Code &gt; <code>Cmd + Shift + P</code> &gt; escribir \"Shell Command: Install 'code' command in PATH\".</p><p><b>Linux:</b> Descargar el <code>.deb</code> o <code>.rpm</code> desde la página oficial e instalar con el gestor de paquetes.</p><h3>4. Cuenta de GitHub</h3><p><b>Crear cuenta en:</b> <a href=\"https://github.com/\" target=\"_blank\" rel=\"noopener\">github.com</a></p><ol><li>Ir a github.com y hacer clic en <b>\"Sign up\"</b>.</li><li>Usar tu correo institucional o personal — el que prefieras.</li><li>Elegir un nombre de usuario profesional (ej. <code>mario-lopez</code>, no <code>xX_darkkiller_Xx</code>). Este nombre aparecerá en todos tus proyectos y es visible para futuros empleadores.</li><li>Completar la verificación y confirmar tu correo.</li><li>Una vez creada la cuenta, no necesitas configurar nada más por ahora — la conexión con Git la veremos en la semana 2.</li></ol><h3>Verificación final</h3><p>Abre una terminal (Git Bash en Windows) y ejecuta estos 3 comandos. Los 3 deben mostrar un número de versión:</p>");
    bloque(cont, "$ python --version\nPython 3.12.4\n\n$ git --version\ngit version 2.45.1\n\n$ code --version\n1.90.0");
    prosa(cont, "<p>Si alguno falla, revisa los pasos de instalación o busca al profesor antes de la primera clase.</p>");
  }

  function s1(cont) {
    prosa(cont, "<h2>Sesión 1 — Navegación en terminal</h2>");
    prosa(cont, "<h3>¿Por qué aprender a usar la terminal?</h3><p>La terminal (también llamada línea de comandos, consola o shell) es la herramienta más directa para comunicarte con tu sistema operativo. En ciencia de datos la vas a necesitar para:</p><ul><li>Ejecutar scripts de Python</li><li>Instalar librerías</li><li>Usar Git para versionar tu código</li><li>Navegar por carpetas y manipular archivos</li><li>Automatizar tareas repetitivas</li></ul><p>La terminal te da <b>control total</b> sobre lo que hace tu computadora — más que cualquier interfaz gráfica.</p><h3>Abrir la terminal</h3>");
    prosa(cont, "<table><thead><tr><th>Sistema</th><th>Cómo abrir</th></tr></thead><tbody><tr><td><b>Windows</b></td><td>Buscar \"Git Bash\" o \"PowerShell\" en el menú de inicio. Recomendamos <b>Git Bash</b> porque usa los mismos comandos que Linux/Mac.</td></tr><tr><td><b>Mac</b></td><td>Buscar \"Terminal\" en Spotlight (Cmd + Espacio)</td></tr><tr><td><b>Linux</b></td><td>Ctrl + Alt + T</td></tr></tbody></table>");
    callout(cont, "<p><b>Nota para Windows:</b> instalar <a href=\"https://git-scm.com/download/win\" target=\"_blank\" rel=\"noopener\">Git for Windows</a> incluye Git Bash, que es la terminal que usaremos en el curso. También pueden usar la terminal integrada de VS Code configurada para Git Bash.</p>");
    prosa(cont, "<figure class=\"lz-figura\"><img src=\"assets/entorno/week01/terminal_git_bash.png\" alt=\"Terminal Git Bash\" loading=\"lazy\"><figcaption>Terminal Git Bash</figcaption></figure>");
    prosa(cont, "<h3>El prompt</h3><p>Cuando abres la terminal ves algo como:</p>");
    bloque(cont, "usuario@computadora ~ $");
    prosa(cont, "<ul><li><code>usuario</code> — tu nombre de usuario</li><li><code>computadora</code> — el nombre de tu máquina</li><li><code>~</code> — la carpeta en la que estás (en este caso, tu carpeta personal/home)</li><li><code>$</code> — indica que la terminal está lista para recibir un comando</li></ul><h3>Comandos esenciales de navegación</h3><h4><code>pwd</code> — ¿Dónde estoy?</h4><p><b>P</b>rint <b>W</b>orking <b>D</b>irectory. Muestra la ruta completa de la carpeta en la que te encuentras.</p>");
    bloque(cont, "$ pwd\n/c/Users/mario");
    prosa(cont, "<h4><code>ls</code> — ¿Qué hay aquí?</h4><p><b>L</b>i<b>s</b>t. Lista los archivos y carpetas en el directorio actual.</p>");
    bloque(cont, "$ ls\nDocumentos  Descargas  Escritorio  Imágenes\n\n$ ls -l        # lista detallada (permisos, tamaño, fecha)\n$ ls -a        # incluye archivos ocultos (los que empiezan con .)\n$ ls -la       # ambas opciones combinadas");
    prosa(cont, "<h4><code>cd</code> — Moverse entre carpetas</h4><p><b>C</b>hange <b>D</b>irectory. Cambia la carpeta de trabajo.</p>");
    bloque(cont, "$ cd Documentos          # entrar a una carpeta\n$ cd ..                  # subir un nivel (carpeta padre)\n$ cd ../..               # subir dos niveles\n$ cd ~                   # ir a tu carpeta home\n$ cd /                   # ir a la raíz del sistema");
    prosa(cont, "<h4><code>mkdir</code> — Crear una carpeta</h4><p><b>M</b>a<b>k</b>e <b>Dir</b>ectory.</p>");
    bloque(cont, "$ mkdir mi_proyecto\n$ mkdir -p proyectos/curso/practica1    # crea toda la ruta de una vez");
    prosa(cont, "<h4><code>touch</code> — Crear un archivo vacío</h4>");
    bloque(cont, "$ touch notas.txt\n$ touch script.py");
    prosa(cont, "<h4><code>cp</code> — Copiar</h4>");
    bloque(cont, "$ cp archivo.txt copia.txt                    # copiar un archivo\n$ cp archivo.txt carpeta/                     # copiar a otra carpeta\n$ cp -r carpeta_original/ carpeta_copia/      # copiar una carpeta completa (-r = recursivo)");
    prosa(cont, "<h4><code>mv</code> — Mover o renombrar</h4>");
    bloque(cont, "$ mv archivo.txt nueva_carpeta/        # mover\n$ mv nombre_viejo.py nombre_nuevo.py   # renombrar");
    prosa(cont, "<h4><code>rm</code> — Eliminar</h4>");
    bloque(cont, "$ rm archivo.txt              # eliminar un archivo\n$ rm -r carpeta/              # eliminar una carpeta y todo su contenido");
    callout(cont, "<p><b>CUIDADO:</b> <code>rm</code> no envía archivos a la papelera — los borra permanentemente. No hay \"Ctrl+Z\". Verifica siempre qué vas a borrar antes de ejecutar.</p>");
    prosa(cont, "<h4><code>cat</code> — Ver el contenido de un archivo</h4>");
    bloque(cont, "$ cat notas.txt               # imprime todo el contenido en pantalla");
    prosa(cont, "<h4><code>clear</code> — Limpiar la pantalla</h4>");
    bloque(cont, "$ clear");
    prosa(cont, "<h3>Rutas absolutas vs relativas</h3><p>Hay dos formas de referirse a un archivo o carpeta:</p>");
    prosa(cont, "<table><thead><tr><th>Tipo</th><th>Empieza con</th><th>Ejemplo</th><th>Significado</th></tr></thead><tbody><tr><td><b>Absoluta</b></td><td><code>/</code> (raíz)</td><td><code>/c/Users/mario/Documentos/script.py</code></td><td>La ruta completa desde la raíz del sistema</td></tr><tr><td><b>Relativa</b></td><td>No empieza con <code>/</code></td><td><code>Documentos/script.py</code></td><td>Relativa a donde estás parado (<code>pwd</code>)</td></tr></tbody></table><p><b>Atajos de rutas:</b></p><ul><li><code>.</code> — la carpeta actual</li><li><code>..</code> — la carpeta padre (un nivel arriba)</li><li><code>~</code> — tu carpeta home</li></ul><p>Ejemplo: si estás en <code>/c/Users/mario/proyectos/</code>, estas dos rutas apuntan al mismo archivo:</p>");
    bloque(cont, "# Absoluta\n/c/Users/mario/Documentos/notas.txt\n\n# Relativa (desde /c/Users/mario/proyectos/)\n../Documentos/notas.txt");
    prosa(cont, "<h3>Tab para autocompletar</h3><p>Escribe las primeras letras de un archivo o carpeta y presiona <b>Tab</b>. La terminal autocompleta el nombre. Si hay varias opciones, presiona Tab dos veces para verlas todas. Esto evita errores de escritura y ahorra tiempo.</p><h3>Ejercicios de la sesión 1</h3><p>Practica estos ejercicios en tu terminal:</p><ol><li>Abre la terminal y verifica en qué carpeta estás con <code>pwd</code>.</li><li>Navega a tu carpeta de Documentos con <code>cd</code>.</li><li>Crea la siguiente estructura de carpetas:</li></ol>");
    bloque(cont, "pcd_curso/\n├── semana01/\n├── semana02/\n└── notas/");
    prosa(cont, "<ol><li>Dentro de <code>semana01/</code>, crea un archivo <code>hola.txt</code>.</li><li>Copia <code>hola.txt</code> a la carpeta <code>notas/</code>.</li><li>Renombra la copia a <code>apuntes_semana01.txt</code>.</li><li>Regresa a <code>pcd_curso/</code> y lista todo su contenido con <code>ls -la</code>.</li><li>Elimina la carpeta <code>semana02/</code> (que está vacía).</li></ol><h3>Resumen de comandos</h3>");
    prosa(cont, "<table><thead><tr><th>Comando</th><th>Acción</th><th>Ejemplo</th></tr></thead><tbody><tr><td><code>pwd</code></td><td>Mostrar directorio actual</td><td><code>pwd</code></td></tr><tr><td><code>ls</code></td><td>Listar contenido</td><td><code>ls -la</code></td></tr><tr><td><code>cd</code></td><td>Cambiar de directorio</td><td><code>cd proyectos/</code></td></tr><tr><td><code>mkdir</code></td><td>Crear carpeta</td><td><code>mkdir -p ruta/completa/</code></td></tr><tr><td><code>touch</code></td><td>Crear archivo vacío</td><td><code>touch script.py</code></td></tr><tr><td><code>cp</code></td><td>Copiar</td><td><code>cp -r origen/ destino/</code></td></tr><tr><td><code>mv</code></td><td>Mover / renombrar</td><td><code>mv viejo.py nuevo.py</code></td></tr><tr><td><code>rm</code></td><td>Eliminar</td><td><code>rm -r carpeta/</code></td></tr><tr><td><code>cat</code></td><td>Ver contenido de archivo</td><td><code>cat datos.csv</code></td></tr><tr><td><code>clear</code></td><td>Limpiar pantalla</td><td><code>clear</code></td></tr></tbody></table>");
  }

  function s2(cont) {
    prosa(cont, "<h2>Sesión 2 — VS Code y Entornos Virtuales</h2>");
    prosa(cont, "<h3>Parte 1: VS Code</h3><h4>¿Qué es VS Code?</h4><p>Visual Studio Code es un editor de código gratuito y de código abierto desarrollado por Microsoft. Es el editor más popular para Python y ciencia de datos. No es lo mismo que Visual Studio (que es un IDE pesado) — VS Code es ligero, rápido y extensible.</p><h4>Instalación</h4><p>Descargar de <a href=\"https://code.visualstudio.com/\" target=\"_blank\" rel=\"noopener\">code.visualstudio.com</a> e instalar con las opciones por defecto. En Windows, marcar la opción <b>\"Add to PATH\"</b> durante la instalación.</p><h4>Interfaz principal</h4>");
    prosa(cont, "<figure class=\"lz-figura\"><img src=\"assets/entorno/week01/vscode_interfaz.png\" alt=\"Interfaz de VS Code\" loading=\"lazy\"><figcaption>Interfaz de VS Code</figcaption></figure>");
    prosa(cont, "<p>Las áreas principales de VS Code son:</p><ol><li><b>Barra lateral izquierda (Activity Bar):</b> iconos para cambiar entre Explorer, Search, Source Control (Git), Extensions, etc.</li><li><b>Explorer:</b> muestra la estructura de archivos y carpetas de tu proyecto.</li><li><b>Editor:</b> donde escribes y editas código. Puedes tener varias pestañas abiertas.</li><li><b>Terminal integrada:</b> una terminal dentro de VS Code. Se abre con `<code> Ctrl + </code> `` (backtick) o desde el menú Terminal &gt; New Terminal.</li><li><b>Barra de estado (abajo):</b> muestra información como la rama de Git, el intérprete de Python activo, errores, etc.</li></ol><h4>Abrir una carpeta como proyecto</h4><p>VS Code trabaja con <b>carpetas</b>, no con archivos sueltos. Para abrir un proyecto:</p>");
    bloque(cont, "Menú File > Open Folder > seleccionar la carpeta del proyecto");
    prosa(cont, "<p>O desde la terminal:</p>");
    bloque(cont, "$ code mi_proyecto/");
    prosa(cont, "<h4>Terminal integrada</h4><p>La terminal integrada es una de las funciones más útiles. Te permite ejecutar comandos sin salir de VS Code:</p><ul><li>Abrir: `<code> Ctrl + </code> `` o menú <b>Terminal &gt; New Terminal</b></li><li>Puedes tener varias terminales abiertas (botón <code>+</code>)</li><li>En Windows, configurar Git Bash como terminal por defecto:</li></ul><ol><li>Abrir la paleta de comandos: <code>Ctrl + Shift + P</code></li><li>Escribir \"Terminal: Select Default Profile\"</li><li>Seleccionar \"Git Bash\"</li></ol><h4>Extensiones esenciales</h4><p>Las extensiones añaden funcionalidades a VS Code. Para instalarlas: clic en el icono de Extensions en la barra lateral (o <code>Ctrl + Shift + X</code>) y buscar por nombre.</p>");
    prosa(cont, "<figure class=\"lz-figura\"><img src=\"assets/entorno/week01/vscode_extensiones.png\" alt=\"Panel de extensiones\" loading=\"lazy\"><figcaption>Panel de extensiones</figcaption></figure>");
    prosa(cont, "<table><thead><tr><th>Extensión</th><th>Para qué sirve</th></tr></thead><tbody><tr><td><b>Python</b> (Microsoft)</td><td>Soporte para Python: autocompletado, linting, debugging, ejecución</td></tr><tr><td><b>GitLens</b></td><td>Visualiza quién escribió cada línea, historial de cambios, comparaciones</td></tr><tr><td><b>Jupyter</b></td><td>Permite abrir y ejecutar notebooks <code>.ipynb</code> dentro de VS Code</td></tr></tbody></table><p>Después de instalar la extensión de Python, VS Code te pedirá seleccionar un intérprete de Python. Selecciona el que corresponda a tu instalación (o al entorno virtual que crearás más adelante).</p><h4>Crear y ejecutar tu primer script</h4><ol><li>Abrir la carpeta de tu proyecto en VS Code</li><li>Crear un nuevo archivo: <code>Ctrl + N</code>, guardar como <code>hola.py</code></li><li>Escribir:</li></ol>");
    bloque(cont, "print(\"Hola, Programación para Ciencia de Datos!\")\nnombre = input(\"¿Cómo te llamas? \")\nprint(f\"Bienvenido al curso, {nombre}\")");
    prosa(cont, "<ol><li>Ejecutar de dos formas:</li></ol><ul><li><b>Desde la terminal integrada:</b> <code>python hola.py</code></li><li><b>Botón de play:</b> clic en el triángulo ▶ en la esquina superior derecha del editor</li></ul><h4>Atajos de teclado útiles</h4>");
    prosa(cont, "<table><thead><tr><th>Atajo</th><th>Acción</th></tr></thead><tbody><tr><td><code>Ctrl + S</code></td><td>Guardar</td></tr><tr><td><code>Ctrl + Shift + P</code></td><td>Paleta de comandos</td></tr><tr><td>`<code> Ctrl + </code> ``</td><td>Abrir/cerrar terminal</td></tr><tr><td><code>Ctrl + B</code></td><td>Mostrar/ocultar barra lateral</td></tr><tr><td><code>Ctrl + P</code></td><td>Buscar archivo por nombre</td></tr><tr><td><code>Ctrl + Shift + X</code></td><td>Panel de extensiones</td></tr><tr><td><code>Ctrl + /</code></td><td>Comentar/descomentar línea</td></tr><tr><td><code>Alt + ↑/↓</code></td><td>Mover línea arriba/abajo</td></tr></tbody></table><h3>Parte 2: Entornos Virtuales</h3><h4>El problema</h4><p>Imagina que tienes dos proyectos:</p><ul><li>Proyecto A necesita <code>pandas 1.5</code></li><li>Proyecto B necesita <code>pandas 2.0</code></li></ul><p>Si instalas ambas versiones en tu Python global, una romperá la otra. Los <b>entornos virtuales</b> resuelven esto: cada proyecto tiene su propia copia aislada de Python y sus librerías.</p><h4>¿Qué es un entorno virtual?</h4><p>Un entorno virtual es una carpeta que contiene:</p><ul><li>Una copia del intérprete de Python</li><li>Su propia carpeta de librerías instaladas</li><li>Independiente de cualquier otro proyecto</li></ul><h4>Crear un entorno virtual con <code>venv</code></h4><p><code>venv</code> viene incluido con Python 3.3+ — no necesitas instalar nada extra.</p>");
    bloque(cont, "# 1. Navegar a tu carpeta de proyecto\n$ cd mi_proyecto/\n\n# 2. Crear el entorno virtual (la carpeta se llamará .venv)\n$ python -m venv .venv");
    prosa(cont, "<p>Esto crea una carpeta <code>.venv/</code> dentro de tu proyecto con todo lo necesario.</p>");
    callout(cont, "<p><b>¿Por qué <code>.venv</code>?</b> El punto al inicio hace que sea una carpeta oculta en Linux/Mac. Es una convención — puedes usar otro nombre, pero <code>.venv</code> es el estándar.</p>");
    prosa(cont, "<h4>Activar el entorno virtual</h4><p><b>Debes activar el entorno cada vez que abras una nueva terminal</b> para que tu proyecto use las librerías correctas.</p>");
    prosa(cont, "<table><thead><tr><th>Sistema</th><th>Comando</th></tr></thead><tbody><tr><td><b>Git Bash (Windows)</b></td><td><code>source .venv/Scripts/activate</code></td></tr><tr><td><b>PowerShell (Windows)</b></td><td><code>.venv\\Scripts\\Activate.ps1</code></td></tr><tr><td><b>Mac / Linux</b></td><td><code>source .venv/bin/activate</code></td></tr></tbody></table><p>Cuando el entorno está activo, ves el nombre entre paréntesis al inicio del prompt:</p>");
    bloque(cont, "(.venv) usuario@computadora mi_proyecto $");
    prosa(cont, "<h4>Desactivar el entorno</h4>");
    bloque(cont, "$ deactivate");
    prosa(cont, "<p>El prompt vuelve a la normalidad (sin el <code>(.venv)</code>).</p><h4>Instalar librerías con <code>pip</code></h4><p><code>pip</code> es el instalador de paquetes de Python. Con el entorno virtual activo, las librerías se instalan <b>solo</b> dentro de ese entorno:</p>");
    bloque(cont, "# Activar primero\n$ source .venv/Scripts/activate\n\n# Instalar una librería\n(.venv) $ pip install numpy\n\n# Instalar una versión específica\n(.venv) $ pip install pandas==2.0.0\n\n# Instalar varias a la vez\n(.venv) $ pip install numpy pandas matplotlib\n\n# Ver qué librerías están instaladas\n(.venv) $ pip list");
    prosa(cont, "<h4>VS Code y entornos virtuales</h4><p>Cuando abres una carpeta que tiene un <code>.venv/</code>, VS Code generalmente lo detecta automáticamente y lo selecciona como intérprete de Python. Si no lo hace:</p><ol><li><code>Ctrl + Shift + P</code> &gt; \"Python: Select Interpreter\"</li><li>Seleccionar el que dice <code>.venv</code> en la ruta</li></ol><p>La terminal integrada de VS Code también activará el entorno automáticamente si está configurado como intérprete.</p>");
  }

  function s3(cont) {
    prosa(cont, "<h2>Sesión 3 — `requirements.txt` y Ejercicio Integrador</h2>");
    prosa(cont, "<h3><code>requirements.txt</code> — Reproducibilidad del entorno</h3><h4>¿Para qué sirve?</h4><p><code>requirements.txt</code> es un archivo de texto que lista las librerías que tu proyecto necesita, con sus versiones exactas. Permite que cualquier persona reproduzca tu entorno:</p>");
    bloque(cont, "numpy==1.24.3\npandas==2.0.1\nmatplotlib==3.7.1");
    prosa(cont, "<h4>Generar <code>requirements.txt</code></h4><p>Con el entorno virtual activo:</p>");
    bloque(cont, "(.venv) $ pip freeze > requirements.txt");
    prosa(cont, "<p><code>pip freeze</code> lista todas las librerías instaladas con sus versiones. El <code>&gt;</code> redirige esa salida a un archivo.</p><h4>Instalar desde <code>requirements.txt</code></h4><p>Cuando alguien clona tu proyecto y quiere reproducir tu entorno:</p>");
    bloque(cont, "# 1. Crear su propio entorno virtual\n$ python -m venv .venv\n\n# 2. Activarlo\n$ source .venv/Scripts/activate\n\n# 3. Instalar todo lo que dice requirements.txt\n(.venv) $ pip install -r requirements.txt");
    prosa(cont, "<p>Con estos 3 comandos, tu compañero tiene exactamente el mismo entorno que tú.</p><h4>Flujo completo de un proyecto reproducible</h4>");
    bloque(cont, "1. Crear carpeta del proyecto\n2. Crear entorno virtual (.venv)\n3. Activar entorno\n4. Instalar librerías con pip\n5. Generar requirements.txt\n6. Compartir el proyecto (sin la carpeta .venv — solo el código y requirements.txt)\n7. El receptor crea su propio .venv e instala desde requirements.txt");
    callout(cont, "<p><b>Importante:</b> la carpeta <code>.venv/</code> <b>no se comparte ni se sube a Git</b>. Es pesada y específica de cada sistema operativo. Solo se comparte <code>requirements.txt</code>.</p>");
    prosa(cont, "<h3>Ejercicio integrador — Tu primer proyecto</h3><p>Vas a crear la estructura completa de un proyecto desde cero, aplicando todo lo que viste en las 3 sesiones.</p><h4>Instrucciones</h4><ol><li><b>Abrir la terminal</b> (Git Bash o la terminal integrada de VS Code).</li></ol><ol><li><b>Crear la estructura del proyecto:</b></li></ol>");
    bloque(cont, "$ mkdir mi_primer_proyecto\n$ cd mi_primer_proyecto\n$ mkdir src\n$ mkdir datos\n$ mkdir resultados");
    prosa(cont, "<ol><li><b>Crear el entorno virtual y activarlo:</b></li></ol>");
    bloque(cont, "$ python -m venv .venv\n$ source .venv/Scripts/activate    # Windows con Git Bash");
    prosa(cont, "<ol><li><b>Crear el script principal.</b> Abrir VS Code con <code>code .</code> y crear el archivo <code>src/hola_pcd.py</code>:</li></ol>");
    bloque(cont, "\"\"\"\nMi primer script de Programación para Ciencia de Datos.\nDemuestra: print, input, f-strings y escritura de archivos.\n\"\"\"\n\nnombre = input(\"Nombre del estudiante: \")\npareja = input(\"Nombre de tu pareja de prácticas: \")\ntema = input(\"Tema asignado (ej. ventas_online): \")\n\nresumen = f\"\"\"\n=== Programación para Ciencia de Datos ===\nEstudiante: {nombre}\nPareja: {pareja}\nTema de prácticas: {tema}\nSemestre: Agosto - Diciembre 2026\n\"\"\"\n\nprint(resumen)\n\n# Guardar en un archivo\nwith open(\"resultados/mi_info.txt\", \"w\") as f:\n    f.write(resumen)\n\nprint(\"Archivo guardado en resultados/mi_info.txt\")");
    prosa(cont, "<ol><li><b>Ejecutar el script:</b></li></ol>");
    bloque(cont, "(.venv) $ python src/hola_pcd.py");
    prosa(cont, "<ol><li><b>Verificar que se creó el archivo de salida:</b></li></ol>");
    bloque(cont, "(.venv) $ cat resultados/mi_info.txt");
    prosa(cont, "<ol><li><b>Generar <code>requirements.txt</code>:</b></li></ol>");
    bloque(cont, "(.venv) $ pip freeze > requirements.txt");
    prosa(cont, "<p>(Estará vacío o casi vacío porque no instalamos librerías — eso es correcto para este ejercicio.)</p><ol><li><b>Verificar la estructura final:</b></li></ol>");
    bloque(cont, "(.venv) $ ls -la");
    prosa(cont, "<p>Deberías ver:</p>");
    bloque(cont, "mi_primer_proyecto/\n├── .venv/               # entorno virtual (no se sube a Git)\n├── requirements.txt     # librerías del proyecto\n├── src/\n│   └── hola_pcd.py\n├── datos/               # vacía por ahora\n└── resultados/\n    └── mi_info.txt");
    prosa(cont, "<h3>Formación de parejas</h3><p>En esta sesión también se forman las parejas para las prácticas del semestre:</p><ul><li>Las prácticas se hacen <b>en parejas</b> (2 personas).</li><li>Hay <b>10 temas</b> disponibles (ventas online, reseñas de cursos, boletos deportivos, etc.). Cada pareja elige un tema; máximo 2 parejas por tema.</li><li>Hoy se presentan los temas y se discuten preferencias.</li><li><b>Las parejas deben estar formadas a más tardar el viernes 4 de septiembre</b> (semana 2), cuando se asigna la primera práctica.</li></ul>");
    prosa(cont, "<h2>Resumen de la semana</h2>");
    prosa(cont, "<table><thead><tr><th>Sesión</th><th>Temas cubiertos</th><th>Lo que debes saber hacer</th></tr></thead><tbody><tr><td><b>Sesión 1</b></td><td>Terminal</td><td>Navegar carpetas, crear/copiar/mover/eliminar archivos y carpetas, distinguir rutas absolutas y relativas</td></tr><tr><td><b>Sesión 2</b></td><td>VS Code + Entornos virtuales</td><td>Abrir un proyecto en VS Code, usar la terminal integrada, instalar extensiones, crear y activar un entorno virtual, instalar librerías con <code>pip</code></td></tr><tr><td><b>Sesión 3</b></td><td><code>requirements.txt</code> + Ejercicio</td><td>Generar y usar <code>requirements.txt</code>, crear un proyecto completo con estructura de carpetas y entorno reproducible</td></tr></tbody></table>");
    prosa(cont, "<h2>Recursos adicionales</h2>");
    prosa(cont, "<ul><li><a href=\"https://www.git-tower.com/blog/command-line-cheat-sheet/\" target=\"_blank\" rel=\"noopener\">Cheat sheet de comandos de terminal (Linux/Mac/Git Bash)</a></li><li><a href=\"https://code.visualstudio.com/docs\" target=\"_blank\" rel=\"noopener\">Documentación oficial de VS Code</a></li><li><a href=\"https://docs.python.org/3/library/venv.html\" target=\"_blank\" rel=\"noopener\">Documentación oficial de venv (Python)</a></li><li><a href=\"https://pip.pypa.io/en/stable/getting-started/\" target=\"_blank\" rel=\"noopener\">Tutorial de pip (Python Packaging)</a></li></ul>");
  }

  E.registrar({
    id: "py-entorno-terminal",
    grupo: "py-entorno",
    lenguaje: "py",
    orden: 1,
    titulo: "Terminal, VS Code y entornos virtuales",
    sub: "Python · Entorno",
    resumen: "Instalación de Python, Git y VS Code; navegación en terminal, el editor, entornos virtuales (venv) y requirements.txt — la base para trabajar en el curso.",
    chips: [{"k": "Nivel", "v": "Inicio"}, {"k": "Tipo", "v": "Entorno"}],
    pestanas: {
      instalacion: { titulo: "Instalación", render: function (cont) { instalacion(cont); } },
      s1: { titulo: "Sesión 1", render: function (cont) { s1(cont); } },
      s2: { titulo: "Sesión 2", render: function (cont) { s2(cont); } },
      s3: { titulo: "Sesión 3", render: function (cont) { s3(cont); } }
    }
  });
})();
