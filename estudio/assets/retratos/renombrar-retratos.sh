#!/usr/bin/env bash
# ============================================================
# renombrar-retratos.sh
# Renombra las fotos numeradas (1..98) al sistema de slugs de la
# Learning Zone, detectando el FORMATO REAL de cada imagen.
#
# Uso (en WSL, dentro de la carpeta con las fotos, o pasando la ruta):
#   bash renombrar-retratos.sh [CARPETA]           # VISTA PREVIA (no cambia nada)
#   bash renombrar-retratos.sh [CARPETA] --apply   # aplica los cambios
#
# Ejemplos:
#   bash renombrar-retratos.sh                     # previsualiza la carpeta actual
#   bash renombrar-retratos.sh . --apply           # renombra la carpeta actual
#   bash renombrar-retratos.sh ~/Descargas/fotos --apply
#
# El sitio acepta .jpg, .png y .webp: el script CONSERVA el formato real
# (no reconvierte) y solo arregla el nombre y la extensión.
# ============================================================
set -euo pipefail

DIR="."
APPLY=0
for a in "$@"; do
  case "$a" in
    --apply) APPLY=1 ;;
    -*) echo "Opción desconocida: $a"; exit 1 ;;
    *) DIR="$a" ;;
  esac
done

# --- Lista de slugs en el orden 1..98 (igual que la relación que te pasé) ---
SLUGS=(
  "ada-lovelace"
  "alan-turing"
  "anders-hejlsberg"
  "andrej-karpathy"
  "andrew-ng"
  "anima-anandkumar"
  "arthur-samuel"
  "barbara-grosz"
  "barbara-liskov"
  "bjarne-stroustrup"
  "brendan-burns"
  "brendan-eich"
  "cathy-oneil"
  "charles-babbage"
  "chris-lattner"
  "claude-shannon"
  "cynthia-breazeal"
  "cynthia-dwork"
  "daniela-rus"
  "daphne-koller"
  "david-patterson"
  "demis-hassabis"
  "dennis-ritchie"
  "doina-precup"
  "donald-knuth"
  "doug-cutting"
  "douglas-engelbart"
  "edsger-w-dijkstra"
  "elaine-rich"
  "eric-brewer"
  "fei-fei-li"
  "frances-allen"
  "francoise-beaufays"
  "frank-rosenblatt"
  "geoffrey-hinton"
  "george-boole"
  "grace-hopper"
  "guido-van-rossum"
  "herbert-simon"
  "ian-goodfellow"
  "ilya-sutskever"
  "james-gosling"
  "james-hamilton"
  "jeff-dean"
  "joe-armstrong"
  "john-backus"
  "john-mccarthy"
  "john-von-neumann"
  "joseph-weizenbaum"
  "joy-buolamwini"
  "jurgen-schmidhuber"
  "karen-sparck-jones"
  "kate-crawford"
  "kelsey-hightower"
  "ken-thompson"
  "larry-wall"
  "latanya-sweeney"
  "leslie-lamport"
  "linus-torvalds"
  "luciano-floridi"
  "margaret-boden"
  "margaret-hamilton"
  "margaret-mitchell"
  "martin-fowler"
  "marvin-minsky"
  "matei-zaharia"
  "milind-tambe"
  "mitchell-hashimoto"
  "nathaniel-rochester"
  "niklaus-wirth"
  "pieter-abbeel"
  "radia-perlman"
  "rasmus-lerdorf"
  "rich-hickey"
  "richard-stallman"
  "richard-sutton"
  "rosalind-picard"
  "ruha-benjamin"
  "rumman-chowdhury"
  "ruzena-bajcsy"
  "safiya-umoja-noble"
  "sanjay-ghemawat"
  "sebastian-thrun"
  "shafi-goldwasser"
  "solomon-hykes"
  "stuart-russell"
  "swami-sivasubramanian"
  "tim-berners-lee"
  "timnit-gebru"
  "tony-hoare"
  "urs-holzle"
  "vint-cerf"
  "virginia-dignum"
  "werner-vogels"
  "yann-lecun"
  "yejin-choi"
  "yoshua-bengio"
  "yukihiro-matsumoto"
)

cd "$DIR" 2>/dev/null || { echo "No existe la carpeta: $DIR"; exit 1; }
echo "Carpeta: $(pwd)"
if [ "$APPLY" -eq 1 ]; then echo "Modo: APLICAR cambios"; else echo "Modo: VISTA PREVIA (agrega --apply para renombrar)"; fi
echo

have_file=0; command -v file >/dev/null 2>&1 && have_file=1
have_magick=0
if command -v magick >/dev/null 2>&1; then have_magick=1; MAGICK="magick"
elif command -v convert >/dev/null 2>&1; then have_magick=1; MAGICK="convert"; fi

renamed=0; ok=0; warn=0

detect_ext() {
  # imprime jpg|png|webp|CONV|"" según el CONTENIDO real del archivo
  local f="$1" mime=""
  [ "$have_file" -eq 1 ] && mime=$(file --mime-type -b -- "$f" 2>/dev/null || echo "")
  case "$mime" in
    image/jpeg) echo jpg ;;
    image/png)  echo png ;;
    image/webp|image/x-webp) echo webp ;;
    image/gif|image/avif|image/bmp|image/x-ms-bmp|image/tiff) echo CONV ;;
    *) echo "" ;;
  esac
}

shopt -s nullglob
for f in *; do
  [ -f "$f" ] || continue
  base="${f%.*}"; ext="${f##*.}"
  [[ "$base" =~ ^[0-9]+$ ]] || continue          # solo archivos cuyo nombre es un número
  n=$((10#$base)); idx=$((n-1))
  if [ "$idx" -lt 0 ] || [ "$idx" -ge "${#SLUGS[@]}" ]; then
    echo "AVISO  $f -> número $n fuera de rango (1..${#SLUGS[@]})"; warn=$((warn+1)); continue
  fi
  slug="${SLUGS[$idx]}"

  realext="$(detect_ext "$f")"
  if [ -z "$realext" ]; then                       # sin 'file' o tipo desconocido: usar extensión
    el=$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')
    case "$el" in
      jpg|jpeg) realext=jpg ;;
      png) realext=png ;;
      webp) realext=webp ;;
      gif|avif|bmp|tif|tiff) realext=CONV ;;
      *) realext=jpg ;;
    esac
  fi

  if [ "$realext" = "CONV" ]; then                 # formato que el sitio no carga
    target="${slug}.jpg"
    if [ "$have_magick" -eq 1 ]; then
      echo "CONVERTIR  $f -> $target"
      if [ "$APPLY" -eq 1 ]; then
        if "$MAGICK" "$f" "$target" 2>/dev/null; then rm -f -- "$f"; renamed=$((renamed+1));
        else echo "AVISO  no pude convertir $f (archivo dañado?)"; warn=$((warn+1)); fi
      else
        renamed=$((renamed+1))
      fi
    else
      echo "AVISO  $f -> formato no soportado por el sitio; conviértelo a JPG/PNG/WEBP (nombre: $slug). Instala ImageMagick para que el script lo haga: sudo apt install imagemagick"
      warn=$((warn+1))
    fi
    continue
  fi

  target="${slug}.${realext}"
  if [ "$f" = "$target" ]; then ok=$((ok+1)); continue; fi
  if [ -e "$target" ]; then
    echo "AVISO  $f -> $target  (YA EXISTE, se omite)"; warn=$((warn+1)); continue
  fi
  echo "OK     $f -> $target"
  [ "$APPLY" -eq 1 ] && mv -n -- "$f" "$target"
  renamed=$((renamed+1))
done

echo
echo "Resumen: $renamed por renombrar/convertir, $ok ya correctos, $warn avisos."
if [ "$APPLY" -eq 0 ]; then
  echo "Nada se cambió (vista previa). Vuelve a correr con --apply para aplicar los cambios."
else
  echo "Listo. Verifica la carpeta y luego copia las fotos a estudio/assets/retratos/ y haz push."
fi
