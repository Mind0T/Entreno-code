#!/usr/bin/env node
/* Verifica (sin navegador) que las pruebas de escritorio coinciden con el codigo C real.
   Uso:  node C/algoritmos_estructura_datos/Estudio/scripts/verificar.js            */
"use strict";
const path = require("path");
const fs = require("fs");
global.window = global;
const J = (...p) => path.join(__dirname, "..", "js", ...p);
require(J("nucleo.js"));
require(J("datos", "fuentes.js"));
const E = global.EST;
E.estricto = true;
const cargar = (f) => { if (fs.existsSync(J(...f))) require(J(...f)); };
cargar(["modulos", "ordenamiento-trazas.js"]);
cargar(["modulos", "trazas-pila-estatica.js"]);
cargar(["modulos", "trazas-pila-dinamica.js"]);
cargar(["modulos", "trazas-colas.js"]);

let fallos = 0;
const ok = (c, msg) => { if (!c) { fallos++; console.error("  ✗ " + msg); } };
const alea = (n, lo, hi) => Array.from({ length: n }, () => lo + Math.floor(Math.random() * (hi - lo + 1)));

function validarPasos(T, A, nombre) {
  T.pasos.forEach((p, i) => {
    const f = A[p.f];
    ok(!!f, `${nombre} paso ${i}: archivo ${p.f} no existe`);
    if (f) ok(p.l >= 1 && p.l <= f.lines.length, `${nombre} paso ${i}: linea ${p.l} fuera de rango en ${f.name}`);
  });
}

/* ---------- ordenamientos ---------- */
const sorters = ["burbuja", "seleccion", "insercion", "mezcla"];
const indep = {
  burbuja(a) { a = a.slice(); let c = 0, s = 0; const n = a.length; for (let i = 0; i < n - 1; i++) for (let j = 0; j < n - 1 - i; j++) { c++; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; s++; } } return { c, s }; },
  seleccion(a) { a = a.slice(); let c = 0, s = 0; const n = a.length; for (let i = 0; i < n - 1; i++) { let m = i; for (let j = i + 1; j < n; j++) { c++; if (a[j] < a[m]) m = j; } [a[i], a[m]] = [a[m], a[i]]; s++; } return { c, s }; },
  insercion(a) { a = a.slice(); let c = 0, s = 0; for (let i = 1; i < a.length; i++) { const x = a[i]; let j = i - 1; while (j >= 0) { c++; if (a[j] > x) { a[j + 1] = a[j]; s++; j--; } else break; } a[j + 1] = x; } return { c, s }; },
  mezcla(a) { a = a.slice(); let c = 0, s = 0; function m(i, f) { if (i < f) { const mi = Math.floor((i + f) / 2); m(i, mi); m(mi + 1, f); const L = a.slice(i, mi + 1), R = a.slice(mi + 1, f + 1); let x = 0, y = 0, k = i; while (x < L.length && y < R.length) { c++; if (L[x] <= R[y]) a[k] = L[x++]; else a[k] = R[y++]; s++; k++; } while (x < L.length) { a[k++] = L[x++]; s++; } while (y < R.length) { a[k++] = R[y++]; s++; } } } m(0, a.length - 1); return { c, s }; },
};
if (E.ord) {
  for (const nombre of sorters) {
    const A = E.codigoDe(nombre);
    let total = 0;
    for (let t = 0; t < 120; t++) {
      const n = 2 + Math.floor(Math.random() * 13);
      const arr = alea(n, -9, 30);
      const T = E.ord[nombre](arr, A);
      total += T.pasos.length;
      const esperado = arr.slice().sort((x, y) => x - y);
      ok(JSON.stringify(T.resultado) === JSON.stringify(esperado), `${nombre}: resultado mal para [${arr}] -> [${T.resultado}]`);
      const ref = indep[nombre](arr);
      ok(T.cont.cmp === ref.c, `${nombre}: comparaciones ${T.cont.cmp} != ${ref.c} para [${arr}]`);
      ok(T.cont.inter === ref.s, `${nombre}: movimientos ${T.cont.inter} != ${ref.s} para [${arr}]`);
      validarPasos(T, A, nombre);
    }
    // el arreglo de tu main (40)
    const T40 = E.ord[nombre]([87,12,45,3,66,29,91,7,54,38,-5,73,20,99,14,61,0,48,33,82,25,58,10,77,41,-12,95,19,69,36,50,2,88,23,64,12,71,30,57,9], A);
    ok(JSON.stringify(T40.resultado) === JSON.stringify(T40.resultado.slice().sort((x, y) => x - y)), `${nombre}: 40 elementos no ordenado`);
    console.log(`ordenamiento ${nombre}: ok (pasos medios ${(total / 120) | 0}, con 40 elementos: ${T40.pasos.length} pasos)`);
  }
}

/* ---------- estructuras: se compara contra el C real compilado con gcc ---------- */
const cp = require("child_process");
const os = require("os");
const REPO = path.join(__dirname, "..", "..", "..", "..");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "estudio-"));
function compilarYCorrer(nombre, archivosC, main, extra) {
  const src = path.join(TMP, nombre + ".c");
  fs.writeFileSync(src, main);
  const exe = path.join(TMP, nombre);
  const r = cp.spawnSync("gcc", ["-w", "-o", exe, src, ...archivosC.map((f) => path.join(REPO, f)), ...(extra || [])], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("gcc fallo:\n" + r.stderr);
  const run = cp.spawnSync(exe, [], { encoding: "utf8" });
  return run.stdout;
}
const ED = "C/algoritmos_estructura_datos/estruc_datos";
const EXTRA = "C/algoritmos_estructura_datos/Estudio/c_extra";

if (E.est && E.est.pilaEstatica) {
  const A = E.codigoDe("pilaEstatica");
  for (let t = 0; t < 40; t++) {
    const M = E.est.pilaEstatica(A);
    let c = '#include <stdio.h>\n#include "' + path.join(REPO, ED, "pila/pilaEstatica/pila_est_int/pila_est_int_dec.h") + '"\nint main(){struct Pila pila;\n';
    M.inicio();
    c += "init(&pila);\n";
    const nOps = 5 + Math.floor(Math.random() * 25);
    for (let k = 0; k < nOps; k++) {
      const r = Math.random();
      if (r < 0.45) { const v = Math.floor(Math.random() * 90); M.lab("push", v); c += "push(&pila," + v + ");\n"; }
      else if (r < 0.7) { M.lab("pop"); c += "pop(&pila);\n"; }
      else if (r < 0.85) { M.lab("peek"); c += "peek(&pila);\n"; }
      else { M.lab("print"); c += "printStack(&pila);\n"; }
    }
    c += "return 0;}\n";
    const real = compilarYCorrer("pe" + t, [ED + "/pila/pilaEstatica/pila_est_int/pila_est_int_impl.c"], c);
    ok(real === M.salImpl, "pila estatica: la salida difiere del C real\n--- C ---\n" + JSON.stringify(real) + "\n--- JS ---\n" + JSON.stringify(M.salImpl));
    validarPasos(M.T, A, "pilaEstatica");
  }
  // guion con el menu real de tu main
  const M2 = E.est.pilaEstatica(A);
  M2.inicio();
  [[2, 10], [2, 20], [2, 30], [1], [3], [4], [5]].forEach(([o, v]) => M2.menu(o, v));
  validarPasos(M2.T, A, "pilaEstatica(menu)");
  console.log("pila estatica: ok (40 secuencias aleatorias contra el C real, " + M2.pasos.length + " pasos en el guion del menu)");
}

/* ---------- pila dinamica ---------- */
if (E.est && E.est.pilaDinamica) {
  const A = E.codigoDe("pilaDinamica");
  const dir = ED + "/pila/pilaDinamica/pila_din_int/";
  for (let t = 0; t < 40; t++) {
    const M = E.est.pilaDinamica(A);
    M.inicioLab();
    let c = '#include <stdio.h>\n#include <stdlib.h>\n#include "' + path.join(REPO, dir, "pilaDinamicaDeclaracion.h") + '"\nint main(){struct Nodo *pila=NULL;\n';
    const nOps = 5 + Math.floor(Math.random() * 25);
    for (let k = 0; k < nOps; k++) {
      const r = Math.random();
      if (r < 0.45) { const v = Math.floor(Math.random() * 90); M.lab("push", v); c += "push(&pila," + v + ");\n"; }
      else if (r < 0.7) { M.lab("pop"); c += "pop(&pila);\n"; }
      else if (r < 0.8) { M.lab("peek"); c += "peek(&pila);\n"; }
      else if (r < 0.95) { M.lab("print"); c += "printStack(&pila);\n"; }
      else { M.lab("destroy"); c += "destroy(&pila);\n"; }
    }
    c += "return 0;}\n";
    const real = compilarYCorrer("pd" + t, [dir + "pilaDinamicaImplementacion.c"], c);
    ok(real === M.salImpl, "pila dinamica: la salida difiere del C real\n--- C ---\n" + JSON.stringify(real) + "\n--- JS ---\n" + JSON.stringify(M.salImpl));
    validarPasos(M.T, A, "pilaDinamica");
  }
  const M2 = E.est.pilaDinamica(A);
  M2.guion();
  validarPasos(M2.T, A, "pilaDinamica(guion)");
  console.log("pila dinamica: ok (40 secuencias contra el C real, " + M2.pasos.length + " pasos en el guion)");
}

/* ---------- leccion doble apuntador ---------- */
if (E.est && E.est.dobleApuntador) {
  for (const v of ["mal", "bien"]) {
    const A = E.codigoDe(v === "mal" ? "dobleMal" : "dobleBien");
    const T = E.est.dobleApuntador(v, A);
    validarPasos(T, A, "doble-" + v);
    console.log("doble apuntador (" + v + "): ok (" + T.pasos.length + " pasos)");
  }
}

/* ---------- infija -> postfija ---------- */
if (E.est && E.est.infija) {
  const A = E.codigoDe("infija");
  const srcMain = fs.readFileSync(path.join(REPO, ED, "pila/examen/main.c"), "utf8");
  const dirE = ED + "/pila/examen/";
  const exprs = ["5+3*7+(2+1)*9", "1+2", "(1+2)*3", "2^3^2", "9-4-3", "8/4/2", "1+(2*(3+4))", "((1))", "1+2)", "(1+2", "((1+2)*3", "1 + 2 * 3", "7"];
  const ops = ["+", "-", "*", "/", "^"];
  for (let t = 0; t < 40; t++) {
    let e = "", depth = 0;
    const n = 1 + Math.floor(Math.random() * 5);
    for (let k = 0; k < n; k++) {
      if (Math.random() < 0.25) { e += "("; depth++; }
      e += Math.floor(Math.random() * 10);
      if (depth > 0 && Math.random() < 0.4) { e += ")"; depth--; }
      if (k < n - 1) e += ops[Math.floor(Math.random() * ops.length)];
    }
    while (depth-- > 0) e += ")";
    exprs.push(e);
  }
  for (const e of exprs) {
    const T = E.est.infija(e, A);
    const prog = srcMain.replace('const char *infija="5+3*7+(2+1)*9";', 'const char *infija="' + e + '";');
    ok(prog !== srcMain || e === "5+3*7+(2+1)*9", "no pude reemplazar la expresion");
    const real = compilarYCorrer("inf", [dirE + "pilaDinamicaImplementacion.c"], prog, ["-I", path.join(REPO, dirE)]);
    ok(real === T.consola, "infija '" + e + "': difiere del C real\n--- C ---\n" + JSON.stringify(real) + "\n--- JS ---\n" + JSON.stringify(T.consola));
    validarPasos(T, A, "infija " + e);
  }
  console.log("infija: ok (" + exprs.length + " expresiones contra el C real)");
}

/* ---------- colas ---------- */
if (E.est && E.est.colaEstatica) {
  const A = E.codigoDe("colaEstatica");
  const dir = EXTRA + "/colaEstatica/";
  for (let t = 0; t < 40; t++) {
    const M = E.est.colaEstatica(A);
    M.inicioLab();
    let c = '#include <stdio.h>\n#include "' + path.join(REPO, dir, "cola_est_int_dec.h") + '"\nint main(){struct Cola cola;\ninit(&cola);\n';
    const nOps = 8 + Math.floor(Math.random() * 30);
    for (let k = 0; k < nOps; k++) {
      const r = Math.random();
      if (r < 0.45) { const v = Math.floor(Math.random() * 90); M.lab("enqueue", v); c += "enqueue(&cola," + v + ");\n"; }
      else if (r < 0.75) { M.lab("dequeue"); c += "dequeue(&cola);\n"; }
      else if (r < 0.85) { M.lab("front"); c += "front(&cola);\n"; }
      else { M.lab("print"); c += "printQueue(&cola);\n"; }
    }
    c += "return 0;}\n";
    const real = compilarYCorrer("ce" + t, [dir + "cola_est_int_impl.c"], c);
    ok(real === M.salImpl, "cola estatica: difiere del C real\n--- C ---\n" + JSON.stringify(real) + "\n--- JS ---\n" + JSON.stringify(M.salImpl));
    validarPasos(M.T, A, "colaEstatica");
  }
  const G = E.est.colaEstatica(A);
  G.guion();
  validarPasos(G.T, A, "colaEstatica(guion)");
  const realMain = compilarYCorrer("cemain", [dir + "cola_est_int_impl.c"], fs.readFileSync(path.join(REPO, dir, "cola_est_int.c"), "utf8"), ["-I", path.join(REPO, dir)]);
  const salJs = G.pasos.map((p) => p.sal || "").join("");
  ok(realMain === salJs, "cola estatica (guion): consola difiere\n" + JSON.stringify(realMain) + "\n" + JSON.stringify(salJs));
  console.log("cola estatica: ok (40 secuencias contra el C real, " + G.pasos.length + " pasos en el guion)");
}
if (E.est && E.est.colaDinamica) {
  const A = E.codigoDe("colaDinamica");
  const dir = EXTRA + "/colaDinamica/";
  for (let t = 0; t < 40; t++) {
    const M = E.est.colaDinamica(A);
    M.inicioLab();
    let c = '#include <stdio.h>\n#include <stdlib.h>\n#include "' + path.join(REPO, dir, "cola_din_int_dec.h") + '"\nint main(){struct Cola cola;\ninit(&cola);\n';
    const nOps = 8 + Math.floor(Math.random() * 30);
    for (let k = 0; k < nOps; k++) {
      const r = Math.random();
      if (r < 0.45) { const v = Math.floor(Math.random() * 90); M.lab("enqueue", v); c += "enqueue(&cola," + v + ");\n"; }
      else if (r < 0.7) { M.lab("dequeue"); c += "dequeue(&cola);\n"; }
      else if (r < 0.8) { M.lab("front"); c += "front(&cola);\n"; }
      else if (r < 0.95) { M.lab("print"); c += "printQueue(&cola);\n"; }
      else { M.lab("destroy"); c += "destroy(&cola);\n"; }
    }
    c += "return 0;}\n";
    const real = compilarYCorrer("cd" + t, [dir + "cola_din_int_impl.c"], c);
    ok(real === M.salImpl, "cola dinamica: difiere del C real\n--- C ---\n" + JSON.stringify(real) + "\n--- JS ---\n" + JSON.stringify(M.salImpl));
    validarPasos(M.T, A, "colaDinamica");
  }
  const G = E.est.colaDinamica(A);
  G.guion();
  validarPasos(G.T, A, "colaDinamica(guion)");
  const realMain = compilarYCorrer("cdmain", [dir + "cola_din_int_impl.c"], fs.readFileSync(path.join(REPO, dir, "cola_din_int.c"), "utf8"), ["-I", path.join(REPO, dir)]);
  const salJs = G.pasos.map((p) => p.sal || "").join("");
  ok(realMain === salJs, "cola dinamica (guion): consola difiere\n" + JSON.stringify(realMain) + "\n" + JSON.stringify(salJs));
  console.log("cola dinamica: ok (40 secuencias contra el C real, " + G.pasos.length + " pasos en el guion)");
}

/* ---------- parentesis (practica.c) ---------- */
if (E.est && E.est.parentesis) {
  const A = E.codigoDe("parentesis");
  const dirP = ED + "/pila/pilaEstatica/";
  const src = fs.readFileSync(path.join(REPO, dirP, "practica.c"), "utf8");
  const corte = src.indexOf("imprimirPila(&pila);") + "imprimirPila(&pila);".length;
  const base = src.slice(0, corte) + "\nreturn 0;}\n";
  const casos = ["((()))", "(()", "())", ")(", "()()()", "(((((", ")))"];
  for (let t = 0; t < 40; t++) casos.push(Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => (Math.random() < 0.5 ? "(" : ")")).join(""));
  for (const txt of casos) {
    const R = E.est.parentesis(txt, A);
    const lit = "{" + txt.split("").map((c) => "'" + c + "'").join(",") + "}";
    const prog = base.replace(/char\s+parentesis\[\]\s*=\s*\{[^}]*\};/, "char parentesis[]=" + lit + ";");
    const real = compilarYCorrer("par", [dirP + "TADPilaEstatica.c"], prog, ["-I", path.join(REPO, dirP)]);
    ok(real === R.salImpl, "parentesis '" + txt + "': difiere del C real\n--- C ---\n" + JSON.stringify(real) + "\n--- JS ---\n" + JSON.stringify(R.salImpl));
    validarPasos(R.T, A, "parentesis " + txt);
  }
  console.log("parentesis: ok (" + casos.length + " cadenas contra el C real)");
}

if (E.verificarEstructuras) E.verificarEstructuras({ ok, validarPasos, alea, compilarYCorrer, REPO, ED, EXTRA, TMP, path, fs });

if (fallos) { console.error("\n" + fallos + " fallo(s)"); process.exit(1); }
console.log("\nTodo bien ✔");
