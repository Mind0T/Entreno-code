/* ============================================================
   Eivind · Learning Zone — misma dinámica que el home del hub,
   pero el menú de abajo son CURSOS (no proyectos).
   API:  window.EivindLZ.mount(container, cfg)
   cfg = { lang, cursos:[...], icons:{...}, nav:fn(hash) }
   ============================================================ */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hex2rgb(h){ h=(h||"").replace("#",""); if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2]; var n=parseInt(h||"5b8def",16); return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}; }

  /* Identidad "Eivind" — esfera de NODOS INTERCONECTADOS + núcleo.
     Solo puntos y conexiones (sin anillos, ticks ni barrido). El aura
     se desvanece antes del borde para no verse "en recuadro". Al navegar
     el menú, reacciona con un pulso de brillo. */
  function Identity(canvas) {
    var ctx = canvas.getContext("2d"), dpr = 1, S = 300, t = 0, en = 0, enT = 0, pulse = 0, raf = 0;
    var cur = hex2rgb("#5B8DEF"), tgt = hex2rgb("#5B8DEF");
    var N = 118, nodes = [];
    for (var i = 0; i < N; i++) {
      var y = 1 - 2 * (i + .5) / N, rr = Math.sqrt(Math.max(0, 1 - y * y)), ph = i * 2.399963;
      nodes.push({ x: Math.cos(ph) * rr, y: y, z: Math.sin(ph) * rr, tw: Math.random() * 6.28, sp: .6 + Math.random() * .9 });
    }
    var edges = [];
    for (var a = 0; a < N; a++) {
      var ds = [];
      for (var b = 0; b < N; b++) { if (a === b) continue; var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, dz = nodes[a].z - nodes[b].z; ds.push([dx * dx + dy * dy + dz * dz, b]); }
      ds.sort(function (p, q) { return p[0] - q[0]; });
      for (var k = 0; k < 3; k++) { var bb = ds[k][1]; if (bb > a) edges.push([a, bb, Math.random() * 6.28]); }
    }
    function size() { dpr = Math.min(2, window.devicePixelRatio || 1); var box = canvas.getBoundingClientRect(); S = Math.max(180, box.width || 300); canvas.width = S * dpr; canvas.height = S * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function col(a) { return "rgba(" + Math.round(cur.r) + "," + Math.round(cur.g) + "," + Math.round(cur.b) + "," + a + ")"; }
    function draw() {
      ctx.clearRect(0, 0, S, S);
      var cx = S / 2, cy = S / 2, R = S * .175;
      cur.r += (tgt.r - cur.r) * .08; cur.g += (tgt.g - cur.g) * .08; cur.b += (tgt.b - cur.b) * .08;
      en += (enT - en) * .1; if (pulse > 0) pulse *= .93;
      var energy = Math.min(1, en + pulse), br = .5 + .5 * Math.sin(t * 1.2);
      var ry = t * .33, rx = .44, ca = Math.cos(ry), sa = Math.sin(ry), cb = Math.cos(rx), sb = Math.sin(rx), pr = [];
      for (var i = 0; i < N; i++) { var n = nodes[i];
        var x = n.x * ca - n.z * sa, z = n.x * sa + n.z * ca, yy = n.y * cb - z * sb, z2 = n.y * sb + z * cb;
        pr.push({ sx: cx + x * R, sy: cy + yy * R, d: (z2 + 1) / 2 }); }
      // aura libre: se desvanece a 0 antes de tocar el borde (sin recuadro)
      var hg = ctx.createRadialGradient(cx, cy, R * .2, cx, cy, S * .42);
      hg.addColorStop(0, col(.16 + energy * .14)); hg.addColorStop(.55, col(.04)); hg.addColorStop(1, col(0));
      ctx.fillStyle = hg; ctx.fillRect(0, 0, S, S);
      ctx.lineWidth = 1;
      for (var e = 0; e < edges.length; e++) { var ea = pr[edges[e][0]], eb = pr[edges[e][1]], da = (ea.d + eb.d) / 2, fl = .6 + .4 * Math.sin(t * 2 + edges[e][2]);
        ctx.strokeStyle = col((.04 + .28 * da) * (.6 + energy * .7) * fl); ctx.beginPath(); ctx.moveTo(ea.sx, ea.sy); ctx.lineTo(eb.sx, eb.sy); ctx.stroke(); }
      for (var i2 = 0; i2 < N; i2++) { var p = pr[i2], n2 = nodes[i2], tw = .6 + .4 * Math.sin(n2.tw + t * n2.sp), rad = (.5 + 1.7 * p.d) * (1 + energy * .3);
        ctx.fillStyle = col((.25 + .6 * p.d) * tw); ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, 6.283); ctx.fill();
        if (p.d > .82) { ctx.fillStyle = "rgba(255,255,255," + (.5 * tw).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad * .5, 0, 6.283); ctx.fill(); } }
      var coreR = R * (.26 + br * .04 + energy * .16), cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, "rgba(255,255,255,.95)"); cg.addColorStop(.4, col(.8)); cg.addColorStop(1, col(0));
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, 6.283); ctx.fill();
      t += reduce ? 0 : .016;
    }
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    this.setColor = function (h) { tgt = hex2rgb(h); };
    this.refreshColor = function (h) { cur = hex2rgb(h); tgt = hex2rgb(h); };
    this.setSpeaking = function (b) { enT = b ? .6 : 0; };
    this.pulse = function () { pulse = .7; };
    this.resize = size;
    this.start = function () { size(); if (reduce) draw(); else loop(); };
    this.stop = function () { cancelAnimationFrame(raf); };
  }


  function mount(container, cfg){
    var lang=(cfg.lang==="en")?"en":"es", C=cfg.cursos||[], ICON=cfg.icons||{}, nav=cfg.nav||function(){};
    if(!C.length) return;
    var tx={
      es:{titulo:"Learning Zone", subtitulo:"Cursos", hint:"Abrir curso",
          start:"Empezar", view:"Ver curso", soon:"pronto", explore:"Explorar C", topics:"Temas del curso", learn:"Lo que aprenderás", about:"De qué va", comingTitle:"Próximamente", comingMsg:"Este curso está en construcción. Mientras tanto, el curso de C ya tiene temas listos para ti."},
      en:{titulo:"Learning Zone", subtitulo:"Courses", hint:"Open course",
          start:"Start", view:"View course", soon:"soon", explore:"Explore C", topics:"Course topics", learn:"What you'll learn", about:"What it is", comingTitle:"Coming soon", comingMsg:"This course is in the works. Meanwhile, the C course already has topics ready for you."}
    }[lang];

    // sheet global (una vez)
    var sheet=document.getElementById("eivSheet");
    if(!sheet){ sheet=document.createElement("div"); sheet.className="eiv-sheet"; sheet.id="eivSheet"; sheet.setAttribute("aria-hidden","true");
      sheet.innerHTML='<div class="eiv-scrim"></div><aside class="eiv-panel" role="dialog" aria-modal="true" aria-label="Detalle del curso"><div id="eivPanelInner"></div></aside>';
      document.body.appendChild(sheet); }

    container.innerHTML=
      '<section class="eiv-stage">'+
        '<h1 class="eiv-name">'+tx.titulo+'</h1>'+
        '<p class="eiv-sub eiv-role">'+tx.subtitulo+'</p>'+
        '<div class="eiv-core" id="eivCore" role="button" tabindex="0" aria-label="'+tx.view+'"><canvas id="eivCanvas"></canvas><span class="eiv-hint">'+tx.hint+'</span></div>'+
        '<p class="eiv-current" id="eivCurrent" aria-live="polite"></p>'+
      '</section>'+
      '<div class="eiv-dial" id="eivDial" aria-label="'+(lang==="en"?"Courses":"Cursos")+'">'+
        '<div class="eiv-dial-stage" id="eivDialStage">'+
          '<svg class="eiv-dial-arc" id="eivDialSvg" aria-hidden="true"><path id="eivDialArc" d=""/></svg>'+
          '<div class="eiv-dial-items" id="eivDialItems"></div>'+
        '</div>'+
      '</div>';

    var canvas=container.querySelector("#eivCanvas"), idn=new Identity(canvas); idn.start();
    var core=container.querySelector("#eivCore");

    // ---- selección (posición fraccional continua, giro fluido e infinito) ----
    // sel  = índice entero objetivo (hacia donde se asienta el anillo)
    // selF = posición fraccional real; el contenido se centra en round(selF)
    var sel=0, selF=0, dialRAF=0, lastBase=null;
    var curEl=container.querySelector("#eivCurrent");
    function idxOf(u){ return ((u % C.length)+C.length)%C.length; }
    function nombreDe(c){ return c.nombre?c.nombre[lang]:(c.sub?c.sub[lang]:""); }
    function applyAccent(ix){
      var c=C[ix];
      document.documentElement.style.setProperty("--acc",c.area); container.style.setProperty("--acc",c.area);
      idn.setColor(c.area); idn.pulse();
    }
    function updateCurrent(ix){ if(curEl) curEl.textContent=nombreDe(C[ix]); }

    // ---- menú de media luna ----
    var DN=7, SP=0.30, center=(DN-1)/2, dslots=[];
    var dialStage=container.querySelector("#eivDialStage"),
        dialSvg=container.querySelector("#eivDialSvg"),
        dialPath=container.querySelector("#eivDialArc"),
        dialItems=container.querySelector("#eivDialItems");
    function buildDial(){
      dialItems.innerHTML=""; dslots=[];
      for(var i=0;i<DN;i++){var b=document.createElement("button");b.className="eiv-dslot islz";b.type="button";
        b.innerHTML='<span class="ic"><svg viewBox="0 0 24 24"></svg></span><span class="dl"></span><span class="dsoon">'+tx.soon+'</span>';dialItems.appendChild(b);dslots.push(b);}
    }
    function renderDial(){
      if(!dslots.length)return;
      var W=dialStage.clientWidth||340, H=dialStage.clientHeight||150, R=W*0.58, cx=W/2, cy=R+16;
      if(dialSvg)dialSvg.setAttribute("viewBox","0 0 "+W+" "+H);
      if(dialPath){var am=2*SP,x1=(cx-R*Math.sin(am)).toFixed(1),x2=(cx+R*Math.sin(am)).toFixed(1),ay=(cy-R*Math.cos(am)).toFixed(1);dialPath.setAttribute("d","M"+x1+" "+ay+" A"+R.toFixed(1)+" "+R.toFixed(1)+" 0 0 1 "+x2+" "+ay);}
      var base=Math.round(selF), nearest=-1, nearestAbs=1e9;
      for(var s2=0;s2<DN;s2++){
        var off=s2-center, u=base+off, ix=idxOf(u), p=C[ix], b=dslots[s2];
        var ang=(off+(base-selF))*SP, aa=Math.abs(ang);
        b.style.left=(cx+R*Math.sin(ang)).toFixed(1)+"px";
        b.style.top=(cy-R*Math.cos(ang)).toFixed(1)+"px";
        b.style.opacity=Math.max(0,1-Math.pow(aa/(SP*2.4),1.5)).toFixed(3);
        if(aa<nearestAbs){nearestAbs=aa;nearest=s2;}
        if(b._ix!==ix){ b._ix=ix; b.dataset.idx=ix; b.style.setProperty("--c",p.area);
          b.classList.toggle("issoon",!p.real); b.querySelector(".ic svg").innerHTML=ICON[p.icon]||""; }
        b.dataset.off=off;
      }
      for(var s3=0;s3<DN;s3++) dslots[s3].classList.toggle("on", s3===nearest);
      if(base!==lastBase){ lastBase=base; applyAccent(idxOf(base)); updateCurrent(idxOf(base)); }
    }
    var updateDial=renderDial;
    // física: resorte amortiguado hacia 'sel' + momentum → sensación ligera y fluida
    var vel=0;
    function stepDial(){
      vel=(vel+(sel-selF)*0.20)*0.62;
      selF+=vel;
      if(Math.abs(sel-selF)<0.0012 && Math.abs(vel)<0.0012){ selF=sel; vel=0; renderDial(); dialRAF=0; return; }
      renderDial(); dialRAF=requestAnimationFrame(stepDial);
    }
    function startDialAnim(){ if(!dialRAF) dialRAF=requestAnimationFrame(stepDial); }
    function setSel(u){ sel=u; if(reduce){ selF=u; vel=0; renderDial(); } else startDialAnim(); }
    function rotate(step){ setSel(Math.round(selF)+step); }

    function topicLink(t){
      if(t.pronto) return '<span class="pronto"><span class="tdot"></span>'+t.titulo+'<span class="etq">'+tx.soon+'</span></span>';
      if(t.enlace) return '<a href="'+t.enlace+'" target="_blank" rel="noopener" class="enlace"><span class="tdot"></span>'+t.titulo+'<svg class="tlink" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>';
      return '<a href="#/'+t.id+'" data-nav="#/'+t.id+'"'+(t.done?' class="done"':'')+'><span class="tdot"></span>'+t.titulo+'</a>';
    }
    function topicsHTML(c){
      // Curso con esferas: cada esfera es una sección plegable (details/summary).
      if(c.grupos&&c.grupos.length){
        return '<div class="eiv-sec"><h3>'+tx.topics+'</h3>'+c.grupos.map(function(g,i){
          var subs=(g.subgrupos||[]);
          var n=g.topics.length+subs.reduce(function(a,s){return a+s.topics.length;},0);
          var cortinas=subs.map(function(s){
            return '<details class="eiv-cortina">'+
              '<summary>'+(s.icono?'<span class="eiv-cortina-ico" aria-hidden="true"><svg viewBox="0 0 24 24">'+s.icono+'</svg></span>':'')+
                '<span class="eiv-cortina-tit">'+s.titulo+'</span>'+
                '<span class="eiv-esf-n">'+s.topics.length+'</span>'+
                '<svg class="eiv-esf-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>'+
              '<div class="eiv-topics eiv-topics-cortina">'+s.topics.map(topicLink).join("")+'</div></details>';
          }).join("");
          return '<details class="eiv-esfera">'+
            '<summary>'+(g.icono?'<span class="eiv-esf-ico" aria-hidden="true"><svg viewBox="0 0 24 24">'+g.icono+'</svg></span>':'')+
              '<span class="eiv-esf-tit">'+g.titulo+'</span>'+
              '<span class="eiv-esf-n">'+n+'</span>'+
              '<svg class="eiv-esf-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>'+
            '<div class="eiv-topics">'+g.topics.map(topicLink).join("")+cortinas+'</div></details>';
        }).join("")+'</div>';
      }
      if(!c.topics||!c.topics.length) return "";
      return '<div class="eiv-sec"><h3>'+tx.topics+'</h3><div class="eiv-topics">'+c.topics.map(topicLink).join("")+'</div></div>';
    }
    function wireGrab(panel, grab){
      if(!grab) return; var sy=null, dy=0;
      grab.addEventListener("pointerdown",function(e){sy=e.clientY;dy=0;panel.style.transition="none";try{grab.setPointerCapture(e.pointerId);}catch(_){}});
      grab.addEventListener("pointermove",function(e){if(sy==null)return;dy=Math.max(0,e.clientY-sy);panel.style.transform="translateY("+dy+"px)";});
      grab.addEventListener("pointerup",function(){if(sy==null)return;sy=null;panel.style.transition="";if(dy>120)closeDetail();else panel.style.transform="";});
      grab.addEventListener("pointercancel",function(){sy=null;panel.style.transition="";panel.style.transform="";});
    }
    function openDetail(idx){
      var c=C[idx], panel=sheet.querySelector(".eiv-panel"); sheet.style.setProperty("--c",c.area); panel.scrollTop=0; panel.style.transform="";
      var media = (c.real? topicsHTML(c) : '<div class="eiv-sec"><h3>'+tx.comingTitle+'</h3><div class="eiv-soonbox">'+tx.comingMsg+'</div></div>');
      var text =
        '<div class="eiv-sec"><h3>'+tx.about+'</h3><p class="lead">'+c.resumen[lang]+'</p></div>'+
        (c.aprende?'<div class="eiv-sec"><h3>'+tx.learn+'</h3><ul class="eiv-hl">'+c.aprende[lang].map(function(x){return '<li>'+x+'</li>';}).join("")+'</ul></div>':'')+
        '<div class="eiv-links">'+(c.real?'<a class="eiv-link live" href="#/'+c.first+'" data-nav="#/'+c.first+'"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'+tx.start+'</a>':'<a class="eiv-link live" href="#/'+(cfg.cId||"")+'" data-nav="#/'+(cfg.cFirst||"")+'"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'+tx.explore+'</a>')+'</div>';
      sheet.querySelector("#eivPanelInner").innerHTML=
        '<div class="eiv-grab" id="eivGrab"><span></span></div>'+
        '<div class="eiv-ph">'+
          '<button class="eiv-close" id="eivClose" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'+
          '<span class="eiv-area"><span class="dot"></span>'+(c.sub?c.sub[lang].toUpperCase():"")+(c.real?"":" · "+tx.soon.toUpperCase())+'</span>'+
          '<h2>'+c.nombre[lang]+'</h2><p class="pf">“'+c.frase[lang]+'”</p>'+
        '</div><div class="eiv-body"><div class="eiv-col-media">'+media+'</div><div class="eiv-col-text">'+text+'</div></div>';
      sheet.classList.add("open"); sheet.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
      sheet.querySelector("#eivClose").addEventListener("click",closeDetail);
      sheet.querySelectorAll("[data-nav]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();
        // deja el índice de ESTE curso en el historial: "atrás" vuelve aquí, no a la portada de LZ
        try{ history.replaceState(null,"","#/inicio/"+c.id); }catch(_){}
        closeDetail();nav(a.dataset.nav);});});
      wireGrab(panel, sheet.querySelector("#eivGrab"));
    }
    function closeDetail(){sheet.classList.remove("open");sheet.setAttribute("aria-hidden","true");document.body.style.overflow="";setTimeout(function(){var p=sheet.querySelector("#eivPanelInner");if(p)p.innerHTML="";var pp=sheet.querySelector(".eiv-panel");if(pp){pp.style.transform="";pp.style.transition="";}},300);}
    sheet.querySelector(".eiv-scrim").addEventListener("click",closeDetail);
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&sheet.classList.contains("open"))closeDetail();});

    // ---- interacción del dial (arrastre continuo: el anillo sigue al dedo) ----
    buildDial();
    var dial=container.querySelector("#eivDial"), dragX=null, dragSelF=0, dragMoved=false, dragStep=1, lastSelF=0, lastT=0;
    dialStage.addEventListener("pointerdown",function(e){
      dragX=e.clientX; dragSelF=selF; dragMoved=false; vel=0;
      dragStep=(dialStage.clientWidth||340)*0.16;
      lastSelF=selF; lastT=performance.now();
      if(dialRAF){cancelAnimationFrame(dialRAF);dialRAF=0;}
    });
    dialStage.addEventListener("pointermove",function(e){
      if(dragX==null)return; var dx=e.clientX-dragX;
      if(Math.abs(dx)>4){ if(!dragMoved){ try{dialStage.setPointerCapture(e.pointerId);}catch(_){} } dragMoved=true; }
      selF=dragSelF-dx/dragStep;
      var now=performance.now(), dt=now-lastT;
      if(dt>0){ var inst=(selF-lastSelF)/(dt/16); vel=vel*0.6+inst*0.4; lastSelF=selF; lastT=now; }
      renderDial();
    });
    function endDrag(){
      if(dragX==null)return; dragX=null;
      if(reduce){ sel=Math.round(selF); selF=sel; vel=0; renderDial(); return; }
      // inercia: el "flick" proyecta el aterrizaje; el resorte lo asienta
      var v=Math.max(-1.2,Math.min(1.2,vel)), base=Math.round(selF);
      var tgt=Math.round(selF+v*6);
      tgt=Math.max(base-4,Math.min(base+4,tgt));
      sel=tgt; startDialAnim();
    }
    dialStage.addEventListener("pointerup",endDrag);
    dialStage.addEventListener("pointercancel",endDrag);
    dialStage.addEventListener("click",function(e){
      var b=e.target.closest(".eiv-dslot"); if(!b)return;
      if(dragMoved){dragMoved=false;return;}
      var off=+b.dataset.off, tgt=Math.round(selF)+off;
      if(off===0 && Math.abs(selF-Math.round(selF))<0.08) openDetail(idxOf(tgt)); else setSel(tgt);
    });
    dial.addEventListener("wheel",function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)&&Math.abs(e.deltaX)>4){e.preventDefault();rotate(e.deltaX>0?1:-1);}},{passive:false});

    function openCurrent(){ openDetail(idxOf(Math.round(selF))); }
    core.addEventListener("click",openCurrent);
    core.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openCurrent();}});

    // arranque (el menú NO avanza solo: lo recorre el usuario)
    function idxDeCurso(cid){ for(var i=0;i<C.length;i++){ if(C[i].id===cid) return i; } return -1; }
    function boot(){
      var si=0; if(cfg.abrir){ var k=idxDeCurso(cfg.abrir); if(k>=0) si=k; }
      selF=si; sel=si; lastBase=null; renderDial();
      // si se pidió abrir un curso (p. ej. al volver de una lección), abre su índice
      if(cfg.abrir){ var j=idxDeCurso(cfg.abrir); if(j>=0) setTimeout(function(){ openDetail(j); }, 40); }
    }
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){setTimeout(boot,30);});else setTimeout(boot,60);

    var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){idn.resize();renderDial();},150);});
    window.addEventListener("temachange",function(){idn.refreshColor(C[idxOf(Math.round(selF))].area);renderDial();});
  }

  window.EivindLZ={ mount:mount };
})();
