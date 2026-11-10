/* Fondo animado: partículas cuánticas + cometas, muy sutil.
   Reutilizable en el hub y en la plataforma de estudio. Respeta reduce-motion. */
(function () {
  var cv = document.getElementById("sky"), cx = cv && cv.getContext && cv.getContext("2d");
  if (!cx) return;
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W, H, dpr, P = [], comet = null, last = 0, raf = 0;
  function size() {
    dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(72, W * H / 24000)); P = [];
    for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .11, vy: (Math.random() - .5) * .11, r: .6 + Math.random() * 1.1, ph: Math.random() * 6.28, o: Math.random() < .11 });
  }
  function frame(tm) {
    var dt = Math.min(50, tm - last || 16); last = tm; cx.clearRect(0, 0, W, H);
    for (var i = 0; i < P.length; i++) {
      var p = P[i]; p.x += p.vx * dt / 16; p.y += p.vy * dt / 16; p.ph += .012;
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
      var a = .15 + .11 * Math.sin(p.ph);
      cx.fillStyle = "rgba(200,214,235," + a.toFixed(3) + ")"; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill();
      if (p.o) {
        cx.strokeStyle = "rgba(157,180,207,.06)"; cx.lineWidth = 1; cx.beginPath(); cx.ellipse(p.x, p.y, 14, 5, p.ph * .3, 0, 6.28); cx.stroke();
        var ex = p.x + 14 * Math.cos(p.ph * 2) * Math.cos(p.ph * .3) - 5 * Math.sin(p.ph * 2) * Math.sin(p.ph * .3),
            ey = p.y + 14 * Math.cos(p.ph * 2) * Math.sin(p.ph * .3) + 5 * Math.sin(p.ph * 2) * Math.cos(p.ph * .3);
        cx.fillStyle = "rgba(220,230,245,.32)"; cx.beginPath(); cx.arc(ex, ey, .9, 0, 6.28); cx.fill();
      }
      for (var j = i + 1; j < P.length; j++) {
        var q = P[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000) { cx.strokeStyle = "rgba(157,180,207," + (.06 * (1 - d2 / 12000)).toFixed(3) + ")"; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); }
      }
    }
    if (!still) {
      if (!comet && Math.random() < .0015) comet = { x: Math.random() * W * .8, y: -20, vx: 2.2 + Math.random() * 1.5, vy: 1.3 + Math.random(), life: 1 };
      if (comet) {
        comet.x += comet.vx * dt / 16; comet.y += comet.vy * dt / 16; comet.life -= .004 * dt / 16;
        var tx = comet.x - comet.vx * 38, ty = comet.y - comet.vy * 38, gr = cx.createLinearGradient(comet.x, comet.y, tx, ty);
        gr.addColorStop(0, "rgba(235,240,250," + (.4 * comet.life).toFixed(3) + ")"); gr.addColorStop(1, "rgba(235,240,250,0)");
        cx.strokeStyle = gr; cx.lineWidth = 1.3; cx.beginPath(); cx.moveTo(comet.x, comet.y); cx.lineTo(tx, ty); cx.stroke();
        if (comet.life <= 0 || comet.x > W + 80 || comet.y > H + 80) comet = null;
      }
      raf = requestAnimationFrame(frame);
    }
  }
  size(); raf = requestAnimationFrame(frame);
  var rs; addEventListener("resize", function () { clearTimeout(rs); rs = setTimeout(function () { size(); if (still) frame(0); }, 250); });
  document.addEventListener("visibilitychange", function () { cancelAnimationFrame(raf); if (!document.hidden && !still) { last = 0; raf = requestAnimationFrame(frame); } });
})();
