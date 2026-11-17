/* ============================================================
   py.js — Python ejecutable en el navegador (Pyodide, WASM).
   - E.py.cargar(): carga Pyodide una sola vez (bajo demanda).
   - E.ui.PyCell(cont, {code, soloLectura}): celda tipo notebook
     con código editable, botón "Ejecutar" y salida real.
   input() funciona vía prompt(). Si no hay internet para cargar
   Python, la celda lo dice con claridad y el código sigue visible.
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST; E.ui = E.ui || {};
  var PYV = "0.26.4", BASE = "https://cdn.jsdelivr.net/pyodide/v" + PYV + "/full/";
  var _ready = null, _py = null;

  E.py = {
    disponible: function () { return !!_py; },
    cargar: function () {
      if (_ready) return _ready;
      _ready = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = BASE + "pyodide.js";
        s.onload = function () {
          try {
            window.loadPyodide({ indexURL: BASE }).then(function (py) {
              _py = py;
              // input() del usuario mediante prompt del navegador
              try {
                globalThis.__pyInput = function (p) { var r = window.prompt(p == null ? "" : String(p)); return r == null ? "" : r; };
                py.runPython("import builtins, js\nbuiltins.input = lambda prompt='': js.__pyInput(prompt)\n");
              } catch (e) {}
              resolve(py);
            }, reject);
          } catch (e) { reject(e); }
        };
        s.onerror = function () { reject(new Error("sin-red")); };
        document.head.appendChild(s);
      });
      return _ready;
    }
  };

  // escapa texto para innerHTML
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---- celda ejecutable ---- */
  E.ui.PyCell = function (cont, opts) {
    opts = opts || {};
    var h = E.h;
    var code0 = (opts.code || "").replace(/\s+$/, "");
    var ta = h("textarea", { class: "pc-code", spellcheck: "false", autocapitalize: "off", autocorrect: "off", "aria-label": "Código Python" });
    ta.value = code0;
    if (opts.soloLectura) ta.readOnly = true;
    var runBtn = h("button", { class: "pc-run", type: "button" },
      h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", html: '<path d="M7 5v14l11-7z"/>' }), "Ejecutar");
    var resetBtn = h("button", { class: "pc-reset", type: "button", title: "Restablecer", "aria-label": "Restablecer código", html: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"/></svg>' });
    var status = h("span", { class: "pc-status", "aria-live": "polite" });
    var out = h("pre", { class: "pc-out", hidden: true, tabindex: "0" });
    var cell = h("div", { class: "pycell" },
      h("div", { class: "pc-head" }, h("span", { class: "pc-dot" }), h("span", { class: "pc-lang" }, "Python"),
        h("div", { class: "pc-tools" }, resetBtn)),
      h("div", { class: "pc-codewrap" }, ta),
      h("div", { class: "pc-bar" }, runBtn, status),
      out);
    cont.append(cell);

    // autoajuste de altura del textarea
    function fit() { ta.style.height = "auto"; ta.style.height = Math.min(520, Math.max(64, ta.scrollHeight)) + "px"; }
    setTimeout(fit, 0); ta.addEventListener("input", fit);
    // Ctrl/Cmd+Enter ejecuta; Tab inserta 4 espacios
    ta.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); correr(); }
      else if (e.key === "Tab") { e.preventDefault(); var s = ta.selectionStart, en = ta.selectionEnd; ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(en); ta.selectionStart = ta.selectionEnd = s + 4; }
    });
    resetBtn.addEventListener("click", function () { ta.value = code0; fit(); out.hidden = true; out.textContent = ""; status.textContent = ""; cell.classList.remove("ok", "err"); });

    function mostrar(txt, err) {
      out.hidden = false; out.textContent = txt || (err ? "" : "(sin salida)");
      cell.classList.toggle("err", !!err); cell.classList.toggle("ok", !err);
    }
    function correr() {
      runBtn.disabled = true; cell.classList.remove("ok", "err");
      status.textContent = _py ? "Ejecutando…" : "Cargando Python… (unos segundos la primera vez)";
      E.py.cargar().then(function (py) {
        status.textContent = "Ejecutando…";
        var buf = "";
        try { py.setStdout({ batched: function (s) { buf += s + "\n"; } }); py.setStderr({ batched: function (s) { buf += s + "\n"; } }); } catch (e) {}
        return py.runPythonAsync(ta.value).then(function (val) {
          if (val !== undefined && val !== null) { var r = String(val); if (r !== "undefined") buf += r + "\n"; }
          try { if (val && val.destroy) val.destroy(); } catch (e) {}
          status.textContent = ""; runBtn.disabled = false; mostrar(buf.replace(/\n$/, ""), false);
        }).catch(function (err) {
          status.textContent = ""; runBtn.disabled = false;
          var msg = (err && err.message) ? err.message : String(err);
          // recorta el traceback interno de Pyodide y deja lo útil
          var m = msg.split("\n").filter(function (l) { return l.trim(); });
          mostrar((buf ? buf + "\n" : "") + m.slice(-6).join("\n"), true);
        });
      }).catch(function (e) {
        runBtn.disabled = false; status.textContent = "";
        mostrar("No se pudo cargar Python en este dispositivo (¿sin conexión?). El código de arriba es válido; vuelve a intentar con internet.", true);
      });
    }
    runBtn.addEventListener("click", correr);
    return cell;
  };
})();
