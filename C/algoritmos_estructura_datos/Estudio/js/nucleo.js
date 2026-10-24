/* ============================================================
   nucleo.js - utilidades compartidas
   - h()/svg(): crear elementos del DOM
   - almacen: guardar progreso en localStorage
   - resaltarC(): colorear codigo C
   - anclas(): encontrar lineas del codigo por su texto
   - nuevoTrazo(): grabadora de pasos para las pruebas de escritorio
   ============================================================ */
(function () {
  "use strict";
  window.EST = window.EST || {};
  const E = window.EST;

  /* ---------- DOM ---------- */
  const NS_SVG = "http://www.w3.org/2000/svg";

  function aplicarAttrs(el, attrs) {
    for (const k in attrs || {}) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") el.setAttribute("class", v);
      else if (k === "html") el.innerHTML = v;
      else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
  }
  function agregarHijos(el, kids) {
    for (const c of kids.flat(Infinity)) {
      if (c == null || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
  }
  E.h = function (tag, attrs, ...kids) {
    const el = document.createElement(tag);
    aplicarAttrs(el, attrs);
    agregarHijos(el, kids);
    return el;
  };
  E.svg = function (tag, attrs, ...kids) {
    const el = document.createElementNS(NS_SVG, tag);
    aplicarAttrs(el, attrs);
    agregarHijos(el, kids);
    return el;
  };
  E.esc = function (s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  E.vaciar = function (el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  };

  /* ---------- almacenamiento (progreso) ---------- */
  E.almacen = {
    leer(k, def) {
      try {
        const v = window.localStorage.getItem("estudioC:" + k);
        return v == null ? def : JSON.parse(v);
      } catch (e) {
        return def;
      }
    },
    guardar(k, v) {
      try {
        window.localStorage.setItem("estudioC:" + k, JSON.stringify(v));
      } catch (e) {
        /* modo privado: ignorar */
      }
    },
  };

  /* ---------- resaltado de sintaxis para C ---------- */
  const KW = new Set(
    "if else for while do switch case default break continue return sizeof typedef const static struct".split(" ")
  );
  const TIPOS = new Set(
    "void int char float double long short unsigned signed FILE size_t".split(" ")
  );
  const RE_TOKEN =
    /("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+)|(.)/g;

  E.resaltarC = function (linea) {
    const t = linea.trim();
    if (t.startsWith("#")) {
      const m = /^(\s*)(#\s*\w+)(\s*)(.*)$/.exec(linea);
      if (m) {
        const resto = m[4];
        const cola = /^[<"]/.test(resto)
          ? '<span class="t-str">' + E.esc(resto) + "</span>"
          : E.resaltarC(resto);
        return E.esc(m[1]) + '<span class="t-pre">' + E.esc(m[2]) + "</span>" + m[3] + cola;
      }
    }
    let out = "";
    RE_TOKEN.lastIndex = 0;
    let m;
    while ((m = RE_TOKEN.exec(linea))) {
      if (m[1] || m[2]) out += '<span class="t-str">' + E.esc(m[0]) + "</span>";
      else if (m[3]) out += '<span class="t-num">' + m[0] + "</span>";
      else if (m[4]) {
        const w = m[4];
        const sig = linea.slice(RE_TOKEN.lastIndex).match(/^\s*\(/);
        if (KW.has(w)) out += '<span class="t-kw">' + w + "</span>";
        else if (TIPOS.has(w)) out += '<span class="t-ty">' + w + "</span>";
        else if (w === "NULL" || /^[A-Z][A-Z0-9_]{2,}$/.test(w)) out += '<span class="t-cn">' + w + "</span>";
        else if (sig) out += '<span class="t-fn">' + w + "</span>";
        else out += w;
      } else out += E.esc(m[0]);
    }
    return out;
  };

  /* ---------- acceso al codigo y anclas ---------- */
  E.estricto = false; // los tests lo ponen en true
  function sinEspacios(s) {
    return s.replace(/\s+/g, "");
  }
  E.codigoDe = function (modulo) {
    const f = (E.fuentes || {})[modulo];
    if (!f) throw new Error("No hay codigo para el modulo " + modulo);
    const r = {};
    for (const rol of Object.keys(f)) {
      const lines = f[rol].code.replace(/\n$/, "").split("\n");
      r[rol] = { rol, name: f[rol].name, path: f[rol].path, code: f[rol].code, lines };
    }
    return r;
  };

  /* anclas(archivo): devuelve ln('texto', nth) -> numero de linea (1..n) */
  E.anclas = function (archivo, etiqueta) {
    const norm = archivo.lines.map(sinEspacios);
    const ln = function (txt, nth) {
      nth = nth || 1;
      const buscado = sinEspacios(txt);
      let cuenta = 0;
      for (let i = 0; i < norm.length; i++) {
        if (norm[i].indexOf(buscado) >= 0) {
          cuenta++;
          if (cuenta === nth) return i + 1;
        }
      }
      const msg =
        "[Estudio] No encontre la linea \"" + txt + "\" (#" + nth + ") en " + archivo.name +
        (etiqueta ? " (" + etiqueta + ")" : "") + ". Si cambiaste ese archivo, actualiza la animacion.";
      if (E.estricto) throw new Error(msg);
      console.warn(msg);
      return 1;
    };
    /* fin('void push') -> linea de la llave } que cierra esa funcion */
    ln.fin = function (txt, nth) {
      const ini = ln(txt, nth) - 1;
      let prof = 0;
      let visto = false;
      for (let i = ini; i < archivo.lines.length; i++) {
        for (const ch of archivo.lines[i]) {
          if (ch === "{") {
            prof++;
            visto = true;
          } else if (ch === "}") prof--;
        }
        if (visto && prof === 0) return i + 1;
      }
      return ini + 1;
    };
    return ln;
  };

  /* ---------- grabadora de pasos ---------- */
  const copia = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
  E.copia = copia;

  /*
    const T = E.nuevoTrazo();
    T.paso({ f:'impl', l:12, nota:'...', lv:0, viz:{...}, v:{i:0}, pila:[..], fila:{..}, sal:'texto', ent:'2' })
    T.pasos -> arreglo de pasos (cada uno con copia propia)
  */
  E.nuevoTrazo = function () {
    const T = { pasos: [] };
    T.paso = function (p) {
      const q = {
        f: p.f,
        l: p.l,
        nota: p.nota || "",
        lv: p.lv || 0,
        viz: copia(p.viz),
        v: copia(p.v) || null,
        pila: copia(p.pila) || null,
        fila: copia(p.fila) || null,
        sal: p.sal || "",
        ent: p.ent || "",
        foco: copia(p.foco) || null,
        etiqueta: p.etiqueta || "",
      };
      T.pasos.push(q);
      return q;
    };
    return T;
  };

  /* ---------- varios ---------- */
  E.rango = (n) => Array.from({ length: n }, (_, i) => i);
  E.clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  E.aleatorio = function (n, min, max) {
    const r = [];
    for (let i = 0; i < n; i++) r.push(min + Math.floor(Math.random() * (max - min + 1)));
    return r;
  };
  E.hex = (n) => "0x" + n.toString(16);
  E.modulos = []; // se llenan en cada js/modulos/*.js con E.registrar(...)
  E.registrar = function (m) {
    E.modulos.push(m);
  };
  E.moduloPorId = (id) => E.modulos.find((m) => m.id === id);
})();
