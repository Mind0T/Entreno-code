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
      '</section>'+
      '<div class="eiv-dial" id="eivDial" aria-label="'+(lang==="en"?"Courses":"Cursos")+'">'+
        '<button class="eiv-arrow" data-dir="-1" aria-label="'+(lang==="en"?"Previous":"Anterior")+'"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>'+
        '<div class="eiv-dial-stage" id="eivDialStage">'+
          '<svg class="eiv-dial-arc" id="eivDialSvg" aria-hidden="true"><path id="eivDialArc" d=""/></svg>'+
          '<div class="eiv-dial-items" id="eivDialItems"></div>'+
        '</div>'+
        '<button class="eiv-arrow" data-dir="1" aria-label="'+(lang==="en"?"Next":"Siguiente")+'"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>'+
        '<p class="eiv-dial-hint">'+(lang==="en"?"Swipe or use the arrows · tap to open":"Desliza o usa las flechas · toca para abrir")+'</p>'+
      '</div>';

    var canvas=container.querySelector("#eivCanvas"), idn=new Identity(canvas); idn.start();
    var core=container.querySelector("#eivCore");

    // ---- selección ----
    var sel=-1;
    function setSel(idx){
      if(idx<0||idx>=C.length)return; sel=idx; var c=C[idx];
      document.documentElement.style.setProperty("--acc",c.area); container.style.setProperty("--acc",c.area);
      idn.setColor(c.area); idn.pulse(); updateDial();
    }

    // ---- menú de media luna (todos los dispositivos, estilo ORBI, infinito) ----
    var DN=5, SP=0.30, dslots=[];
    var dialStage=container.querySelector("#eivDialStage"),
        dialSvg=container.querySelector("#eivDialSvg"),
        dialPath=container.querySelector("#eivDialArc"),
        dialItems=container.querySelector("#eivDialItems");
    function buildDial(){
      dialItems.innerHTML=""; dslots=[];
      for(var i=0;i<DN;i++){var b=document.createElement("button");b.className="eiv-dslot islz";b.type="button";
        b.innerHTML='<span class="ic"><svg viewBox="0 0 24 24"></svg></span><span class="dl"></span><span class="dsoon">'+tx.soon+'</span>';dialItems.appendChild(b);dslots.push(b);}
    }
    function updateDial(){
      if(!dslots.length||sel<0)return;
      var W=dialStage.clientWidth||340, H=dialStage.clientHeight||150, R=W*0.58, cx=W/2, cy=R+16;
      if(dialSvg)dialSvg.setAttribute("viewBox","0 0 "+W+" "+H);
      if(dialPath){var am=2.4*SP,x1=(cx-R*Math.sin(am)).toFixed(1),x2=(cx+R*Math.sin(am)).toFixed(1),ay=(cy-R*Math.cos(am)).toFixed(1);dialPath.setAttribute("d","M"+x1+" "+ay+" A"+R.toFixed(1)+" "+R.toFixed(1)+" 0 0 1 "+x2+" "+ay);}
      for(var s2=0;s2<DN;s2++){var off=s2-(DN-1)/2,idx=(((sel+off)%C.length)+C.length)%C.length,p=C[idx],th=off*SP,x=cx+R*Math.sin(th),y=cy-R*Math.cos(th),b=dslots[s2];
        b.style.left=x.toFixed(1)+"px";b.style.top=y.toFixed(1)+"px";b.style.setProperty("--c",p.area);
        b.dataset.idx=idx;b.classList.toggle("on",off===0);b.classList.toggle("issoon",!p.real);b.style.opacity=Math.abs(off)>=2?".5":"1";
        b.querySelector(".ic svg").innerHTML=ICON[p.icon]||"";b.querySelector(".dl").textContent=off===0?(p.sub?p.sub[lang]:p.nombre[lang]):"";}
    }

    function topicsHTML(c){
      if(!c.topics||!c.topics.length) return "";
      return '<div class="eiv-sec"><h3>'+tx.topics+'</h3><div class="eiv-topics">'+c.topics.map(function(t){
        if(t.pronto) return '<span class="pronto"><span class="tdot"></span>'+t.titulo+'<span class="etq">'+tx.soon+'</span></span>';
        return '<a href="#/'+t.id+'" data-nav="#/'+t.id+'"'+(t.done?' class="done"':'')+'><span class="tdot"></span>'+t.titulo+'</a>';
      }).join("")+'</div></div>';
    }
    function openDetail(idx){
      var c=C[idx]; sheet.style.setProperty("--c",c.area); sheet.querySelector(".eiv-panel").scrollTop=0;
      var body=
        (c.real? topicsHTML(c) : '<div class="eiv-sec"><h3>'+tx.comingTitle+'</h3><div class="eiv-soonbox">'+tx.comingMsg+'</div></div>')+
        '<div class="eiv-sec"><h3>'+tx.about+'</h3><p class="lead">'+c.resumen[lang]+'</p></div>'+
        (c.aprende?'<div class="eiv-sec"><h3>'+tx.learn+'</h3><ul class="eiv-hl">'+c.aprende[lang].map(function(x){return '<li>'+x+'</li>';}).join("")+'</ul></div>':'')+
        '<div class="eiv-links">'+(c.real?'<a class="eiv-link live" href="#/'+c.first+'" data-nav="#/'+c.first+'"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'+tx.start+'</a>':'<a class="eiv-link live" href="#/'+(cfg.cId||"")+'" data-nav="#/'+(cfg.cFirst||"")+'"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'+tx.explore+'</a>')+'</div>';
      sheet.querySelector("#eivPanelInner").innerHTML=
        '<div class="eiv-ph">'+
          '<button class="eiv-close" id="eivClose" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'+
          '<span class="eiv-area"><span class="dot"></span>'+(c.sub?c.sub[lang].toUpperCase():"")+(c.real?"":" · "+tx.soon.toUpperCase())+'</span>'+
          '<h2>'+c.nombre[lang]+'</h2><p class="pf">“'+c.frase[lang]+'”</p>'+
        '</div><div class="eiv-body">'+body+'</div>';
      sheet.classList.add("open"); sheet.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
      sheet.querySelector("#eivClose").addEventListener("click",closeDetail);
      sheet.querySelectorAll("[data-nav]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();closeDetail();nav(a.dataset.nav);});});
    }
    function closeDetail(){sheet.classList.remove("open");sheet.setAttribute("aria-hidden","true");document.body.style.overflow="";setTimeout(function(){var p=sheet.querySelector("#eivPanelInner");if(p)p.innerHTML="";},300);}
    sheet.querySelector(".eiv-scrim").addEventListener("click",closeDetail);
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&sheet.classList.contains("open"))closeDetail();});

    // ---- interacción del dial ----
    buildDial();
    var dial=container.querySelector("#eivDial"), ddx=null, dmoved=false;
    function rotate(step){ setSel(((sel+step)%C.length+C.length)%C.length); }
    dialStage.addEventListener("pointerdown",function(e){ddx=e.clientX;dmoved=false;});
    dialStage.addEventListener("pointermove",function(e){if(ddx==null)return;var dx=e.clientX-ddx;if(Math.abs(dx)>38){rotate(dx<0?1:-1);ddx=e.clientX;dmoved=true;}});
    dialStage.addEventListener("pointerup",function(){ddx=null;});
    dialStage.addEventListener("pointercancel",function(){ddx=null;});
    dialStage.addEventListener("click",function(e){var b=e.target.closest(".eiv-dslot");if(!b)return;if(dmoved){dmoved=false;return;}var idx=+b.dataset.idx;setSel(idx);openDetail(idx);});
    dial.addEventListener("wheel",function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)&&Math.abs(e.deltaX)>4){e.preventDefault();rotate(e.deltaX>0?1:-1);}},{passive:false});
    dial.querySelectorAll(".eiv-arrow").forEach(function(a){a.addEventListener("click",function(){rotate(+a.dataset.dir);});});

    function openCurrent(){if(sel<0)setSel(0);openDetail(sel<0?0:sel);}
    core.addEventListener("click",openCurrent);
    core.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openCurrent();}});

    // arranque (el menú NO avanza solo: lo recorre el usuario)
    function boot(){setSel(0);updateDial();}
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){setTimeout(boot,30);});else setTimeout(boot,60);

    var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){idn.resize();updateDial();},150);});
    window.addEventListener("temachange",function(){if(sel>=0){idn.refreshColor(C[sel].area);updateDial();}});
  }

  window.EivindLZ={ mount:mount };
})();
