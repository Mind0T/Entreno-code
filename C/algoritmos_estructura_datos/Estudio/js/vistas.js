/* ============================================================
   vistas.js - las "escenas" donde ocurre la animacion
     barras       -> ordenamientos (barras + punteros + arreglos auxiliares)
     pilaEst      -> pila estatica (arreglo + tope)
     colaEst      -> cola estatica circular (tira + anillo)
     memoria      -> stack/heap con flechas (apuntadores, dobles apuntadores)
     infija       -> expresion, pila y salida (infija -> postfija)
   Cada vista: (contenedor, opciones) => { pintar(viz, paso, idx) }
   ============================================================ */
(function () {
  "use strict";
  const E = window.EST;
  const h = E.h;
  const esc = E.esc;
  E.vistas = {};

  const corto = (a) => (a ? "…" + a.slice(-3) : "");

  /* =======================================================
     BARRAS (ordenamientos)
     viz = {
       a:[...], marks:{idx:'cmp'|'swap'|'sorted'|'min'|'key'|'fuera'|'izq'|'der'},
       ptr:{ etiqueta: idx },           // punteros bajo las barras
       aux:{ etq:'aux', v:87 } | null,
       extra:{ izq:{etq,vals,i,k}, der:{...}, mez:{...} } | null,
       cont:{cmp:0, inter:0},
       rango:[lo,hi] | null
     }
     ======================================================= */
  E.vistas.barras = function (cont, opts) {
    opts = opts || {};
    const W = 760;
    const wrap = h("div", { class: "vb" });
    const svgEl = E.svg("svg", { class: "vb-svg", viewBox: "0 0 " + W + " 330", role: "img", "aria-label": "Barras del arreglo" });
    const leyenda = h("div", { class: "leyenda" });
    (opts.leyenda || []).forEach((l) => leyenda.append(h("span", { class: "ley" }, h("i", { class: "ley-c m-" + l.c }), l.t)));
    wrap.append(svgEl, leyenda);
    cont.append(wrap);

    let n = -1;
    const capas = {};
    function armar(nuevoN) {
      E.vaciar(svgEl);
      n = nuevoN;
      capas.rango = E.svg("rect", { class: "rango-caja", rx: 8, opacity: 0 });
      capas.barras = E.svg("g", { class: "barras" });
      capas.ptrs = E.svg("g", { class: "ptrs" });
      capas.extra = E.svg("g", { class: "extra" });
      capas.aux = E.svg("g", { class: "auxcaja" });
      capas.cont = E.svg("text", { class: "cont", x: W - 14, y: 22, "text-anchor": "end" });
      svgEl.append(capas.rango, capas.barras, capas.ptrs, capas.extra, capas.aux, capas.cont);
      capas.b = [];
      for (let i = 0; i < n; i++) {
        const g = E.svg("g", { class: "bar" });
        const r = E.svg("rect", { rx: 4 });
        const tv = E.svg("text", { class: "bar-v", "text-anchor": "middle" });
        const ti = E.svg("text", { class: "bar-i", "text-anchor": "middle" });
        g.append(r, tv, ti);
        capas.barras.append(g);
        capas.b.push({ g, r, tv, ti });
      }
    }

    function pintar(viz) {
      if (!viz) return;
      const a = viz.a;
      if (a.length !== n) armar(a.length);
      const MI = 34;
      const ancho = W - 2 * MI;
      const slot = ancho / n;
      const bw = Math.min(56, slot * 0.78);
      const CH = 130; // alto del area de barras
      const top = 44;
      const vmin = Math.min(0, ...a);
      const vmax = Math.max(1, ...a);
      const esc_ = CH / (vmax - vmin);
      const y0 = top + vmax * esc_; // linea base
      const mostrarVal = n <= 20;
      const idxY = top + CH + 18;

      for (let i = 0; i < n; i++) {
        const b = capas.b[i];
        const v = a[i];
        const x = MI + slot * i + (slot - bw) / 2;
        const alto = Math.max(3, Math.abs(v) * esc_);
        const y = v >= 0 ? y0 - alto : y0;
        b.r.setAttribute("x", x);
        b.r.setAttribute("width", bw);
        b.r.setAttribute("y", y);
        b.r.setAttribute("height", alto);
        b.r.style.y = y + "px";
        b.r.style.height = alto + "px";
        const m = (viz.marks && viz.marks[i]) || "";
        b.g.setAttribute("class", "bar " + (m ? "m-" + m : ""));
        b.tv.setAttribute("x", x + bw / 2);
        b.tv.setAttribute("y", v >= 0 ? y - 6 : y + alto + 14);
        b.tv.textContent = mostrarVal || m ? v : "";
        b.ti.setAttribute("x", x + bw / 2);
        b.ti.setAttribute("y", idxY);
        b.ti.textContent = mostrarVal || i % 5 === 0 || (viz.ptr && Object.values(viz.ptr).includes(i)) ? i : "";
      }

      // rango activo (mezcla)
      if (viz.rango) {
        const [lo, hi] = viz.rango;
        capas.rango.setAttribute("x", MI + slot * lo - 2);
        capas.rango.setAttribute("y", top - 22);
        capas.rango.setAttribute("width", slot * (hi - lo + 1) + 4);
        capas.rango.setAttribute("height", CH + 62);
        capas.rango.setAttribute("opacity", 1);
      } else capas.rango.setAttribute("opacity", 0);

      // punteros (i, j, j+1, menor...)
      E.vaciar(capas.ptrs);
      const porIdx = {};
      Object.keys(viz.ptr || {}).forEach((et) => {
        const k = viz.ptr[et];
        if (k == null || k < 0 || k >= n) return;
        (porIdx[k] = porIdx[k] || []).push(et);
      });
      Object.keys(porIdx).forEach((k) => {
        const cx = MI + slot * k + slot / 2;
        porIdx[k].forEach((et, nivel) => {
          const yy = idxY + 14 + nivel * 17;
          capas.ptrs.append(
            E.svg("path", { class: "flecha-p", d: "M" + cx + " " + (yy - 11) + " l-5 7 h10 z" }),
            E.svg("text", { class: "ptr-et", x: cx, y: yy + 7, "text-anchor": "middle" }, et)
          );
        });
      });

      // aux / actual
      E.vaciar(capas.aux);
      if (viz.aux) {
        capas.aux.append(
          E.svg("rect", { class: "aux-r", x: 14, y: 8, width: 118, height: 30, rx: 8 }),
          E.svg("text", { class: "aux-t", x: 26, y: 28 }, viz.aux.etq + " = " + viz.aux.v)
        );
      }

      // contadores
      capas.cont.textContent = viz.cont ? "comparaciones: " + viz.cont.cmp + "   ·   intercambios: " + viz.cont.inter : "";

      // filas extra (mezcla)
      E.vaciar(capas.extra);
      let altoTotal = 330;
      if (viz.extra) {
        const filas = ["izq", "der", "mez"].filter((k) => viz.extra[k]);
        const yIni = idxY + 52;
        filas.forEach((clave, r) => {
          const f = viz.extra[clave];
          const yy = yIni + r * 62;
          capas.extra.append(E.svg("text", { class: "ex-et", x: 14, y: yy + 22 }, f.etq));
          const cw = Math.min(44, (W - 150) / Math.max(1, f.vals.length));
          f.vals.forEach((v, i) => {
            const x = 130 + i * (cw + 4);
            let cls = "ex-c";
            if (f.i != null && i < f.i) cls += " usado";
            if (f.i === i) cls += " act";
            if (f.nuevo === i) cls += " nuevo";
            capas.extra.append(
              E.svg("rect", { class: cls, x, y: yy, width: cw, height: 30, rx: 5 }),
              E.svg("text", { class: "ex-v", x: x + cw / 2, y: yy + 20, "text-anchor": "middle" }, v === null ? "?" : v),
              E.svg("text", { class: "ex-i", x: x + cw / 2, y: yy + 44, "text-anchor": "middle" }, i)
            );
          });
          if (f.ptr) {
            f.ptr.forEach((p) => {
              if (p.i == null) return;
              const x = 130 + p.i * (cw + 4) + cw / 2;
              capas.extra.append(E.svg("text", { class: "ptr-et", x, y: yy - 4, "text-anchor": "middle" }, p.et + " ▾"));
            });
          }
        });
        altoTotal = yIni + filas.length * 62 + 10;
      }
      svgEl.setAttribute("viewBox", "0 0 " + W + " " + Math.max(330, altoTotal));
    }
    return { pintar };
  };

  /* =======================================================
     PILA ESTATICA (arreglo + tope)
     viz = { dato:[null|n...], tope:-1.., max:7, fmt:'int'|'chr',
             marca:{nuevo:idx, sacado:idx}, entrada:{txt,i} , etqPila:'pila' }
     ======================================================= */
  E.vistas.pilaEst = function (cont) {
    const wrap = h("div", { class: "vp" });
    const entrada = h("div", { class: "vp-entrada" });
    const svgHold = h("div", { class: "vp-svg" });
    wrap.append(entrada, svgHold);
    cont.append(wrap);

    function pintar(viz) {
      if (!viz) return;
      const max = viz.max;
      const topeBasura = viz.tope === null || viz.tope === undefined;
      const tope = topeBasura ? -99 : viz.tope;
      // ventana de indices visibles
      let V = max <= 10 ? max : E.clamp(tope + 3, 6, 10);
      V = Math.min(V, max);
      const celdas = E.rango(V);
      const hayCorte = V < max;
      const CW = 150;
      const CH = 36;
      const x0 = 120;
      const baseY = 36 + (V + (hayCorte ? 2 : 0)) * CH;
      const H = baseY + 40;
      let s = "";
      s += '<text class="v-tit" x="12" y="20">struct Pila</text>';
      const yDe = (i) => baseY - (i + 1) * CH - (hayCorte && i === max - 1 ? 0 : 0);
      // celdas
      celdas.forEach((i) => {
        const y = yDe(i);
        const val = viz.dato[i];
        const activa = i <= tope;
        const nuevo = viz.marca && viz.marca.nuevo === i;
        let txt = "?";
        let cls = "celda sin-dato";
        if (val !== null && val !== undefined) {
          txt = viz.fmt === "chr" ? "'" + String.fromCharCode(val) + "'" : val;
          cls = "celda " + (activa ? "viva" : "residuo");
        }
        if (nuevo) cls += " nuevo";
        s += '<rect class="' + cls + '" x="' + x0 + '" y="' + y + '" width="' + CW + '" height="' + CH + '" rx="6"/>';
        s += '<text class="celda-v ' + (activa ? "" : "res") + '" x="' + (x0 + CW / 2) + '" y="' + (y + 23) + '" text-anchor="middle">' + esc(txt) + "</text>";
        s += '<text class="celda-i" x="' + (x0 - 12) + '" y="' + (y + 23) + '" text-anchor="end">dato[' + i + "]</text>";
      });
      if (hayCorte) {
        const yy = yDe(V - 1) - CH;
        s += '<text class="celda-i" x="' + (x0 + CW / 2) + '" y="' + (yy + 24) + '" text-anchor="middle">⋮  (' + (max - V - 1) + " celdas más)</text>";
        const yl = yy - CH;
        const val = viz.dato[max - 1];
        s += '<rect class="celda sin-dato" x="' + x0 + '" y="' + yl + '" width="' + CW + '" height="' + CH + '" rx="6"/>';
        s += '<text class="celda-v" x="' + (x0 + CW / 2) + '" y="' + (yl + 23) + '" text-anchor="middle">' + (val == null ? "?" : val) + "</text>";
        s += '<text class="celda-i" x="' + (x0 - 12) + '" y="' + (yl + 23) + '" text-anchor="end">dato[' + (max - 1) + "]</text>";
      }
      // tope
      const yT = tope >= 0 ? yDe(tope) + CH / 2 : baseY + 18;
      if (tope >= 0) {
        s += '<path class="flecha-tope" d="M' + (x0 + CW + 46) + " " + yT + " L" + (x0 + CW + 8) + " " + yT + '"/>';
        s += '<path class="punta-tope" d="M' + (x0 + CW + 6) + " " + yT + " l10 -6 v12 z\"/>";
        s += '<text class="tope-et" x="' + (x0 + CW + 52) + '" y="' + (yT + 5) + '">tope = ' + tope + "</text>";
      } else if (topeBasura) {
        s += '<text class="tope-et" x="' + (x0 + CW / 2) + '" y="' + (baseY + 24) + '" text-anchor="middle">tope = ?  (basura: aún sin init)</text>';
      } else {
        s += '<text class="tope-et" x="' + (x0 + CW / 2) + '" y="' + (baseY + 24) + '" text-anchor="middle">tope = -1  (pila vacía)</text>';
      }
      s += '<line class="base" x1="' + (x0 - 8) + '" y1="' + baseY + '" x2="' + (x0 + CW + 8) + '" y2="' + baseY + '"/>';
      svgHold.innerHTML =
        '<svg viewBox="0 0 520 ' + H + '" class="vp-s" role="img" aria-label="Pila estática">' + s + "</svg>";

      // fila de entrada (parentesis)
      E.vaciar(entrada);
      if (viz.entrada) {
        entrada.hidden = false;
        entrada.append(h("span", { class: "suave" }, "parentesis[] = "));
        viz.entrada.txt.split("").forEach((c, i) => {
          entrada.append(h("span", { class: "chip-ch" + (i === viz.entrada.i ? " act" : i < viz.entrada.i ? " hecho" : "") }, c));
        });
      } else entrada.hidden = true;
    }
    return { pintar };
  };

  /* =======================================================
     COLA ESTATICA CIRCULAR
     viz = { dato:[], frente, final, cantidad, max, marca:{nuevo,sacado} }
     ======================================================= */
  E.vistas.colaEst = function (cont) {
    const wrap = h("div", { class: "vc" });
    cont.append(wrap);
    function pintar(viz) {
      if (!viz) return;
      const max = viz.max;
      const CW = 78;
      const CH = 46;
      const x0 = 20 + (5 - max > 0 ? ((5 - max) * CW) / 2 : 0);
      const y0 = 64;
      let s = '<text class="v-tit" x="14" y="22">struct Cola · dato[' + max + "]</text>";
      for (let i = 0; i < max; i++) {
        const x = x0 + i * (CW + 6);
        const ocupada = viz.cantidad > 0 && ((i - viz.frente + max) % max) < viz.cantidad;
        const val = viz.dato[i];
        let cls = "celda " + (val == null ? "sin-dato" : ocupada ? "viva" : "residuo");
        if (viz.marca && viz.marca.nuevo === i) cls += " nuevo";
        s += '<rect class="' + cls + '" x="' + x + '" y="' + y0 + '" width="' + CW + '" height="' + CH + '" rx="6"/>';
        s += '<text class="celda-v ' + (ocupada ? "" : "res") + '" x="' + (x + CW / 2) + '" y="' + (y0 + 29) + '" text-anchor="middle">' + (val == null ? "?" : val) + "</text>";
        s += '<text class="celda-i" x="' + (x + CW / 2) + '" y="' + (y0 + CH + 16) + '" text-anchor="middle">' + i + "</text>";
      }
      // marcadores frente / final
      const marcador = (idx, txt, cls, nivel) => {
        if (idx < 0 || idx >= max) return "";
        const cx = x0 + idx * (CW + 6) + CW / 2;
        const yy = y0 + CH + 26 + nivel * 18;
        return '<path class="' + cls + '-p" d="M' + cx + " " + (yy - 11) + ' l-6 8 h12 z"/><text class="mk-et ' + cls + '" x="' + cx + '" y="' + (yy + 8) + '" text-anchor="middle">' + txt + "</text>";
      };
      const vacia = viz.cantidad === 0;
      const mismo = viz.frente === viz.final && !vacia;
      s += marcador(viz.frente, "frente = " + viz.frente, "mk-frente", 0);
      if (viz.final >= 0) s += marcador(viz.final, "final = " + viz.final, "mk-final", mismo ? 1 : 0);
      else s += '<text class="mk-et mk-final" x="' + (x0) + '" y="' + (y0 + CH + 40) + '">final = -1</text>';
      s += '<text class="cant" x="' + (x0 + max * (CW + 6)) + '" y="22" text-anchor="end">cantidad = ' + viz.cantidad + "</text>";

      // anillo (vista circular)
      const cx = 110;
      const cy = 258;
      const R = 62;
      s += '<text class="v-tit" x="14" y="168">Así se ve como anillo (circular)</text>';
      s += '<circle class="anillo" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>';
      for (let i = 0; i < max; i++) {
        const ang = (-90 + (360 / max) * i) * (Math.PI / 180);
        const px = cx + R * Math.cos(ang);
        const py = cy + R * Math.sin(ang);
        const ocupada = viz.cantidad > 0 && ((i - viz.frente + max) % max) < viz.cantidad;
        let cls = "nodo-a " + (ocupada ? "viva" : "libre");
        s += '<circle class="' + cls + '" cx="' + px + '" cy="' + py + '" r="17"/>';
        s += '<text class="celda-v pq" x="' + px + '" y="' + (py + 4) + '" text-anchor="middle">' + (ocupada && viz.dato[i] != null ? viz.dato[i] : "") + "</text>";
        const lx = cx + (R + 34) * Math.cos(ang);
        const ly = cy + (R + 34) * Math.sin(ang);
        let et = "";
        if (i === viz.frente && !vacia) et += "F";
        if (i === viz.final && !vacia) et += (et ? "·" : "") + "L";
        s += '<text class="celda-i" x="' + lx + '" y="' + (ly + 4) + '" text-anchor="middle">' + i + (et ? " (" + et + ")" : "") + "</text>";
      }
      s += '<text class="celda-i" x="' + (cx + R + 90) + '" y="' + (cy - 14) + '">F = frente (sale)</text>';
      s += '<text class="celda-i" x="' + (cx + R + 90) + '" y="' + (cy + 6) + '">L = final (entra)</text>';
      s += '<text class="celda-i" x="' + (cx + R + 90) + '" y="' + (cy + 30) + '">al llegar al índice ' + (max - 1) + ', el siguiente es el 0</text>';
      wrap.innerHTML = '<svg viewBox="0 0 560 340" class="vc-s" role="img" aria-label="Cola estática circular">' + s + "</svg>";
    }
    return { pintar };
  };

  /* =======================================================
     MEMORIA: stack + heap con flechas
     viz = { frames:[{fn, vars:[{n,t,a,val,campos?}]}], heap:[{a,dato,sig,est,fuga}], foco:[ids] }
       val: {k:'int',v} | {k:'chr',v} | {k:'ptr',to} | {k:'null'} | {k:'unk'}
     ======================================================= */
  E.vistas.memoria = function (cont, opts) {
    opts = opts || {};
    const wrap = h("div", { class: "vm" });
    cont.append(wrap);
    const W = 980;
    const LW = 300;
    const HX = 362;
    const NW = 100;
    const NH = 64;
    const GAP = 26;
    const POR_FILA = 5;
    const ROW = 30;
    const marcaNombre = opts.nombreNodo || "Nodo";

    function fmtVal(val) {
      if (!val || val.k === "unk") return "?";
      if (val.k === "int") return String(val.v);
      if (val.k === "chr") return "'" + val.v + "'";
      if (val.k === "null") return "NULL";
      if (val.k === "ptr") return val.to;
      return "?";
    }

    function pintar(viz) {
      if (!viz) return;
      const foco = new Set(viz.foco || []);
      const rows = {}; // id -> {x,y} (borde derecho del cuadro de valor)
      let s = "";
      s += '<text class="v-tit" x="' + 4 + '" y="20">Pila de llamadas (stack)</text>';
      s += '<text class="v-tit" x="' + HX + '" y="20">Heap (memoria dinámica · malloc / free)</text>';

      /* --- columna izquierda: frames --- */
      let y = 34;
      const arrows = []; // {de, a, tipo}
      viz.frames.forEach((fr, fi) => {
        const activo = fi === viz.frames.length - 1;
        let nFilas = 0;
        fr.vars.forEach((v) => (nFilas += 1 + (v.campos ? v.campos.length : 0)));
        if (v_vacio(fr)) nFilas = 1;
        const hFrame = 28 + nFilas * ROW + 8;
        s += '<g class="frame' + (activo ? " activo" : "") + '">';
        s += '<rect class="frame-r" x="0" y="' + y + '" width="' + LW + '" height="' + hFrame + '" rx="9"/>';
        s += '<text class="frame-fn" x="12" y="' + (y + 19) + '">' + esc(fr.fn) + "</text>";
        let ry = y + 28;
        if (v_vacio(fr)) {
          s += '<text class="celda-i" x="12" y="' + (ry + 19) + '">(sin variables locales)</text>';
        }
        const fila = (v, sangria, idPref) => {
          const id = idPref;
          const esFoco = foco.has(id);
          const vx = LW - 118;
          s += '<g class="fila' + (esFoco ? " foco" : "") + '">';
          s += '<text class="v-nom" x="' + (12 + sangria) + '" y="' + (ry + 19) + '">' + esc(v.n) + "</text>";
          if (v.t) s += '<text class="v-tip" x="' + (12 + sangria + 8 + v.n.length * 7.6) + '" y="' + (ry + 19) + '">' + esc(v.t) + "</text>";
          if (v.val) {
            const txt = fmtVal(v.val);
            const cls = "v-caja " + (v.val.k === "unk" ? "unk" : v.val.k === "null" ? "nulo" : v.val.k === "ptr" ? "ptr" : "");
            s += '<rect class="' + cls + '" x="' + vx + '" y="' + (ry + 4) + '" width="104" height="22" rx="5"/>';
            s += '<text class="v-val ' + (v.val.k === "ptr" ? "mono-p" : "") + '" x="' + (vx + 52) + '" y="' + (ry + 19) + '" text-anchor="middle">' + esc(txt) + "</text>";
            rows[id] = { x: vx + 104, y: ry + 15, a: v.a };
            if (v.val.k === "ptr") arrows.push({ de: id, a: v.val.to, foco: esFoco });
          }
          if (v.a) s += '<text class="v-dir" x="' + (LW - 12) + '" y="' + (ry + 8) + '" text-anchor="end">' + esc(v.a) + "</text>";
          s += "</g>";
          ry += ROW;
        };
        fr.vars.forEach((v) => {
          const base = fr.fn.split("(")[0] + "." + v.n;
          if (v.campos) {
            // struct: etiqueta + campos
            s += '<text class="v-nom" x="12" y="' + (ry + 19) + '">' + esc(v.n) + "</text>";
            s += '<text class="v-tip" x="' + (12 + 8 + v.n.length * 7.6) + '" y="' + (ry + 19) + '">' + esc(v.t || "") + "</text>";
            if (v.a) s += '<text class="v-dir" x="' + (LW - 12) + '" y="' + (ry + 19) + '" text-anchor="end">' + esc(v.a) + "</text>";
            rows[base] = { x: LW - 14, y: ry + 15, a: v.a };
            ry += ROW;
            v.campos.forEach((c) => fila(c, 18, base + "." + c.n));
          } else fila(v, 0, base);
        });
        s += "</g>";
        y += hFrame + 14;
      });
      const altoIzq = y;

      /* --- columna derecha: nodos del heap --- */
      const nodos = viz.heap.slice().sort((p, q) => parseInt(p.a, 16) - parseInt(q.a, 16));
      const pos = {};
      nodos.forEach((nd, k) => {
        const fila = Math.floor(k / POR_FILA);
        const col = k % POR_FILA;
        pos[nd.a] = { x: HX + col * (NW + GAP), y: 44 + fila * 124, fila, col };
      });
      const filasHeap = Math.max(1, Math.ceil(nodos.length / POR_FILA));
      const altoDer = 44 + filasHeap * 124;
      if (!nodos.length) {
        s += '<text class="celda-i" x="' + HX + '" y="80">(el heap está vacío: todavía no hay malloc)</text>';
      }
      nodos.forEach((nd) => {
        const p = pos[nd.a];
        const esFoco = foco.has(nd.a);
        let cls = "nodo";
        if (nd.est === "nuevo") cls += " nuevo";
        if (nd.est === "libre") cls += " libre";
        if (nd.fuga) cls += " fuga";
        if (esFoco) cls += " foco";
        s += '<g class="' + cls + '">';
        s += '<rect class="nodo-r" x="' + p.x + '" y="' + p.y + '" width="' + NW + '" height="' + NH + '" rx="8"/>';
        s += '<text class="nodo-dir" x="' + (p.x + NW / 2) + '" y="' + (p.y + 13) + '" text-anchor="middle">' + esc(nd.a) + "</text>";
        s += '<line class="nodo-l" x1="' + p.x + '" y1="' + (p.y + 18) + '" x2="' + (p.x + NW) + '" y2="' + (p.y + 18) + '"/>';
        s += '<line class="nodo-l" x1="' + (p.x + NW / 2) + '" y1="' + (p.y + 18) + '" x2="' + (p.x + NW / 2) + '" y2="' + (p.y + NH) + '"/>';
        s += '<text class="nodo-et" x="' + (p.x + NW / 4) + '" y="' + (p.y + 30) + '" text-anchor="middle">dato</text>';
        s += '<text class="nodo-et" x="' + (p.x + (3 * NW) / 4) + '" y="' + (p.y + 30) + '" text-anchor="middle">siguiente</text>';
        s += '<text class="nodo-v" x="' + (p.x + NW / 4) + '" y="' + (p.y + 54) + '" text-anchor="middle">' + esc(fmtVal(nd.dato)) + "</text>";
        const sv = nd.sig;
        const sTxt = !sv || sv.k === "unk" ? "?" : sv.k === "null" ? "NULL" : "→" + corto(sv.to);
        s += '<text class="nodo-v ' + (sv && sv.k === "null" ? "nulo" : "") + '" x="' + (p.x + (3 * NW) / 4) + '" y="' + (p.y + 54) + '" text-anchor="middle">' + esc(sTxt) + "</text>";
        if (nd.est === "libre") s += '<text class="nodo-free" x="' + (p.x + NW / 2) + '" y="' + (p.y + NH + 16) + '" text-anchor="middle">free() → liberado</text>';
        if (nd.fuga) s += '<text class="nodo-fuga" x="' + (p.x + NW / 2) + '" y="' + (p.y + NH + 16) + '" text-anchor="middle">¡nadie lo apunta! (fuga)</text>';
        s += "</g>";
        if (nd.est !== "libre" && sv && sv.k === "ptr") arrows.push({ de: "n:" + nd.a, a: sv.to, nodo: true, foco: esFoco });
      });

      /* --- flechas --- */
      let flechas = "";
      arrows.forEach((ar) => {
        const clsF = "flecha" + (ar.foco ? " foco" : "") + (ar.nodo ? " entre-nodos" : "");
        if (ar.nodo) {
          const nodoOrigen = ar.de.slice(2);
          const o = pos[nodoOrigen];
          const t = pos[ar.a];
          if (!o || !t) return;
          const sx = o.x + (3 * NW) / 4;
          const sy = o.y + NH;
          const tx = t.x + NW / 2;
          const ty = t.y + NH + 3;
          const d = 26 + 12 * Math.abs(o.col - t.col) + 10 * Math.abs(o.fila - t.fila);
          flechas += '<path class="' + clsF + '" d="M' + sx + " " + sy + " C" + sx + " " + (sy + d) + " " + tx + " " + (ty + d) + " " + tx + " " + ty + '" marker-end="url(#pta)"/>';
          return;
        }
        const o = rows[ar.de];
        if (!o) return;
        const t = pos[ar.a];
        if (t) {
          const tx = t.x + NW / 2;
          const ty = t.y - 3;
          flechas += '<path class="' + clsF + '" d="M' + (o.x + 2) + " " + (o.y - 3) + " C" + (o.x + 80) + " " + (o.y - 3) + " " + tx + " " + (ty - 56) + " " + tx + " " + ty + '" marker-end="url(#pta)"/>';
          return;
        }
        // apunta a una variable del stack (doble apuntador)
        const destino = Object.keys(rows).find((k) => rows[k].a === ar.a);
        if (destino) {
          const t2 = rows[destino];
          const bulto = 44;
          flechas += '<path class="' + clsF + ' a-var" d="M' + (o.x + 2) + " " + (o.y - 3) + " C" + (o.x + bulto) + " " + (o.y - 3) + " " + (t2.x + bulto) + " " + (t2.y + 7) + " " + (t2.x + 3) + " " + (t2.y + 7) + '" marker-end="url(#pta)"/>';
        }
      });

      const H = Math.max(altoIzq, altoDer, 330) + 24;
      const defs =
        '<defs><marker id="pta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="punta"/></marker></defs>';
      wrap.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" class="vm-s" role="img" aria-label="Memoria: stack y heap">' + defs + flechas + s + "</svg>";
    }
    function v_vacio(fr) {
      return !fr.vars.length;
    }
    return { pintar };
  };

  /* =======================================================
     INFIJA -> POSTFIJA
     viz = { expr, i, c, pila:[{ch,a,est}] (tope primero), salida:[tokens], estado:'texto', salidaNueva:bool }
     ======================================================= */
  E.vistas.infija = function (cont) {
    const wrap = h("div", { class: "vi" });
    const expr = h("div", { class: "vi-expr" });
    const cuerpo = h("div", { class: "vi-cuerpo" });
    const cPila = h("div", { class: "vi-pila" }, h("div", { class: "vi-tit" }, "pila de operadores"), h("div", { class: "vi-pila-items" }));
    const cSal = h("div", { class: "vi-sal" }, h("div", { class: "vi-tit" }, "salida (postfija)"), h("div", { class: "vi-sal-items" }));
    const estado = h("div", { class: "vi-estado" });
    cuerpo.append(cPila, cSal);
    wrap.append(expr, cuerpo, estado);
    cont.append(wrap);
    function pintar(viz) {
      if (!viz) return;
      E.vaciar(expr);
      expr.append(h("span", { class: "vi-etq" }, "infija:"));
      viz.expr.split("").forEach((c, i) => {
        let cls = "vi-ch";
        if (viz.i === i) cls += " act";
        else if (viz.i != null && i < viz.i) cls += " hecho";
        expr.append(h("span", { class: cls }, c === " " ? "␣" : c, h("small", {}, i)));
      });
      const pi = cPila.querySelector(".vi-pila-items");
      E.vaciar(pi);
      if (!viz.pila.length) pi.append(h("div", { class: "vi-vacia" }, "pila = NULL (vacía)"));
      viz.pila.forEach((it, k) => {
        pi.append(
          h(
            "div",
            { class: "vi-nodo" + (it.est ? " " + it.est : "") + (k === 0 ? " tope" : "") },
            h("b", {}, it.ch),
            h("small", {}, corto(it.a)),
            k === 0 ? h("span", { class: "vi-tope" }, "tope") : null
          )
        );
      });
      const si = cSal.querySelector(".vi-sal-items");
      E.vaciar(si);
      if (!viz.salida.length) si.append(h("span", { class: "suave" }, "(vacía)"));
      viz.salida.forEach((t, k) => si.append(h("span", { class: "vi-tok" + (viz.salidaNueva && k === viz.salida.length - 1 ? " nuevo" : "") }, t)));
      estado.textContent = viz.estado || "";
    }
    return { pintar };
  };
})();

