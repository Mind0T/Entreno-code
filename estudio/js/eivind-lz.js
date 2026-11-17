/* ============================================================
   Eivind · Learning Zone — misma dinámica que el home del hub,
   pero el menú de abajo son CURSOS (no proyectos).
   API:  window.EivindLZ.mount(container, cfg)
   cfg = { lang, cursos:[...], icons:{...}, nav:fn(hash) }
   ============================================================ */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hex2rgb(h){ h=(h||"").replace("#",""); if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2]; var n=parseInt(h||"5b8def",16); return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}; }

  /* Identidad "Eivind" — esfera de NODOS INTERCONECTADOS + HUD + barrido
     (estilo Jarvis/Ultron): red neuronal que rota, con anillos de interfaz,
     ticks, barrido tipo radar y núcleo vivo. Reacciona al hablar. */
  function Identity(canvas) {
    var ctx = canvas.getContext("2d"), dpr = 1, S = 300, t = 0, amp = 0, ampT = 0, pulse = 0, raf = 0;
    var cur = hex2rgb("#5B8DEF"), tgt = hex2rgb("#5B8DEF"), ripples = [];
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
      var cx = S / 2, cy = S / 2, R = S * .30;
      cur.r += (tgt.r - cur.r) * .08; cur.g += (tgt.g - cur.g) * .08; cur.b += (tgt.b - cur.b) * .08;
      amp += (ampT - amp) * .12; if (pulse > 0) pulse *= .92;
      var en = Math.min(1, amp + pulse), br = .5 + .5 * Math.sin(t * 1.2);
      var ry = t * .33, rx = .44, ca = Math.cos(ry), sa = Math.sin(ry), cb = Math.cos(rx), sb = Math.sin(rx), pr = [];
      for (var i = 0; i < N; i++) { var n = nodes[i];
        var x = n.x * ca - n.z * sa, z = n.x * sa + n.z * ca, yy = n.y * cb - z * sb, z2 = n.y * sb + z * cb;
        pr.push({ sx: cx + x * R, sy: cy + yy * R, d: (z2 + 1) / 2 }); }
      var hg = ctx.createRadialGradient(cx, cy, R * .2, cx, cy, R * (1.7 + en * .5));
      hg.addColorStop(0, col(.14 + en * .12)); hg.addColorStop(.5, col(.04)); hg.addColorStop(1, col(0));
      ctx.fillStyle = hg; ctx.fillRect(0, 0, S, S);
      for (var r = ripples.length - 1; r >= 0; r--) { var o = ripples[r]; o.rad += 1.9; o.life -= .012; if (o.life <= 0) { ripples.splice(r, 1); continue; } ctx.strokeStyle = col(o.life * .4); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(cx, cy, R * .6 + o.rad, 0, 6.283); ctx.stroke(); }
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .18);
      ctx.strokeStyle = col(.16); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, R * 1.22, 0, 6.283); ctx.stroke();
      ctx.strokeStyle = col(.3 + en * .3); ctx.lineWidth = 1.4;
      for (var a2 = 0; a2 < 48; a2++) { var an = a2 / 48 * 6.283, r1 = R * 1.18, r2 = (a2 % 4 === 0) ? R * 1.29 : R * 1.24; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r1, Math.sin(an) * r1); ctx.lineTo(Math.cos(an) * r2, Math.sin(an) * r2); ctx.stroke(); }
      ctx.restore();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * .12); ctx.strokeStyle = col(.22 + en * .25); ctx.lineWidth = 1.6;
      for (var g = 0; g < 3; g++) { var s0 = g * 2.094 + .3; ctx.beginPath(); ctx.arc(0, 0, R * 1.4, s0, s0 + 1.12); ctx.stroke(); }
      ctx.restore();
      var sweep = (t * .9) % 6.283, sg = ctx.createLinearGradient(cx, cy, cx + Math.cos(sweep) * R * 1.15, cy + Math.sin(sweep) * R * 1.15);
      sg.addColorStop(0, col(0)); sg.addColorStop(1, col(.5 + en * .3));
      ctx.strokeStyle = sg; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * R * 1.12, cy + Math.sin(sweep) * R * 1.12); ctx.stroke();
      ctx.lineWidth = 1;
      for (var e = 0; e < edges.length; e++) { var ea = pr[edges[e][0]], eb = pr[edges[e][1]], da = (ea.d + eb.d) / 2, fl = .6 + .4 * Math.sin(t * 2 + edges[e][2]);
        ctx.strokeStyle = col((.04 + .28 * da) * (.6 + en * .7) * fl); ctx.beginPath(); ctx.moveTo(ea.sx, ea.sy); ctx.lineTo(eb.sx, eb.sy); ctx.stroke(); }
      for (var i2 = 0; i2 < N; i2++) { var p = pr[i2], n2 = nodes[i2], tw = .6 + .4 * Math.sin(n2.tw + t * n2.sp), rad = (.5 + 1.7 * p.d) * (1 + en * .3);
        ctx.fillStyle = col((.25 + .6 * p.d) * tw); ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, 6.283); ctx.fill();
        if (p.d > .82) { ctx.fillStyle = "rgba(255,255,255," + (.5 * tw).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad * .5, 0, 6.283); ctx.fill(); } }
      var coreR = R * (.26 + br * .04 + en * .14), cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, "rgba(255,255,255,.95)"); cg.addColorStop(.4, col(.8)); cg.addColorStop(1, col(0));
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, 6.283); ctx.fill();
      t += reduce ? 0 : .016;
    }
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    this.setColor = function (h) { tgt = hex2rgb(h); };
    this.refreshColor = function (h) { cur = hex2rgb(h); tgt = hex2rgb(h); };
    this.setSpeaking = function (b) { ampT = b ? 1 : 0; if (b) ripples.push({ rad: 0, life: 1 }); };
    this.pulse = function () { pulse = .6; ripples.push({ rad: 0, life: .8 }); };
    this.resize = size;
    this.start = function () { size(); if (reduce) draw(); else loop(); };
    this.stop = function () { cancelAnimationFrame(raf); };
  }


  /* ---- voz cálida ---- */
  function Voice(){
    var synth=window.speechSynthesis,chosen=null,on=true,gestured=false;
    try{on=localStorage.getItem("irvin.voz")!=="off";}catch(e){}
    function pick(){if(!synth)return;var vs=synth.getVoices()||[],es=vs.filter(function(v){return /^es/i.test(v.lang);});
      var pref=["paulina","sabina","mónica","monica","esperanza","helena","laura","marisol","google español","angelica","female","mujer"];
      for(var i=0;i<pref.length;i++){var f=es.find(function(v){return v.name.toLowerCase().indexOf(pref[i])>=0;});if(f){chosen=f;return;}}
      chosen=es.find(function(v){return /es-MX/i.test(v.lang);})||es[0]||null;}
    if(synth){pick();synth.onvoiceschanged=pick;}
    this.gesture=function(){gestured=true;};
    this.enabled=function(){return on;};
    this.toggle=function(){on=!on;try{localStorage.setItem("irvin.voz",on?"on":"off");}catch(e){}if(!on&&synth)synth.cancel();return on;};
    this.say=function(text,a,b){if(!synth||!on||!gestured||!text)return;try{synth.cancel();var u=new SpeechSynthesisUtterance(text);if(chosen)u.voice=chosen;u.lang=chosen?chosen.lang:"es-MX";u.rate=.98;u.pitch=1.18;u.onstart=a;u.onend=b;u.onerror=b;synth.speak(u);}catch(e){if(b)b();}};
    this.shush=function(){if(synth)synth.cancel();};
  }

  function mount(container, cfg){
    var lang=(cfg.lang==="en")?"en":"es", C=cfg.cursos||[], ICON=cfg.icons||{}, nav=cfg.nav||function(){};
    if(!C.length) return;
    var tx={
      es:{kick:'LEARNING ZONE · <b>CURSOS</b>', guide:"Eivind, tu guía", intro:"Soy Eivind. Toca un curso y te cuento de qué va — el de C ya está listo para empezar.",
          start:"Empezar", view:"Ver curso", soon:"pronto", explore:"Explorar C", topics:"Temas del curso", learn:"Lo que aprenderás", about:"De qué va", comingTitle:"Próximamente", comingMsg:"Este curso está en construcción. Mientras tanto, el curso de C ya tiene temas listos para ti."},
      en:{kick:'LEARNING ZONE · <b>COURSES</b>', guide:"Eivind, your guide", intro:"I'm Eivind. Tap a course and I'll tell you what it's about — the C one is ready to start.",
          start:"Start", view:"View course", soon:"soon", explore:"Explore C", topics:"Course topics", learn:"What you'll learn", about:"What it is", comingTitle:"Coming soon", comingMsg:"This course is in the works. Meanwhile, the C course already has topics ready for you."}
    }[lang];

    // sheet global (una vez)
    var sheet=document.getElementById("eivSheet");
    if(!sheet){ sheet=document.createElement("div"); sheet.className="eiv-sheet"; sheet.id="eivSheet"; sheet.setAttribute("aria-hidden","true");
      sheet.innerHTML='<div class="eiv-scrim"></div><aside class="eiv-panel" role="dialog" aria-modal="true" aria-label="Detalle del curso"><div id="eivPanelInner"></div></aside>';
      document.body.appendChild(sheet); }

    container.innerHTML=
      '<section class="eiv-stage">'+
        '<p class="eiv-kicker">'+tx.kick+'</p>'+
        '<div class="eiv-core" id="eivCore" role="button" tabindex="0" aria-label="'+tx.view+'"><canvas id="eivCanvas"></canvas><span class="eiv-hint">'+tx.guide+'</span></div>'+
        '<h1 class="eiv-name" id="eivName">Eivind</h1>'+
        '<p class="eiv-sub" id="eivSub"></p>'+
        '<p class="eiv-phrase" id="eivPhrase">'+tx.intro+'</p>'+
        '<div class="eiv-cta">'+
          '<button class="eiv-open" id="eivOpen">'+tx.view+' <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>'+
          '<button class="eiv-voice" id="eivVoice" aria-pressed="true"><svg class="on-live" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg><svg class="on-mute" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m22 9-6 6M16 9l6 6"/></svg></button>'+
        '</div>'+
      '</section>'+
      '<nav class="eiv-menu" aria-label="Cursos">'+
        '<button class="eiv-arrow" data-dir="-1" aria-label="Anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>'+
        '<div class="eiv-track-wrap"><ul class="eiv-track" id="eivTrack"></ul></div>'+
        '<button class="eiv-arrow" data-dir="1" aria-label="Siguiente"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>'+
      '</nav>'+
      '<div class="eiv-dial" id="eivDial" aria-hidden="true">'+
        '<svg class="eiv-dial-arc" viewBox="0 0 340 140" aria-hidden="true"><path id="eivDialArc" d=""/></svg>'+
        '<div class="eiv-dial-items" id="eivDialItems"></div>'+
        '<p class="eiv-dial-hint">'+(lang==="en"?"Swipe ← → · tap to open":"Desliza ← → · toca para abrir")+'</p>'+
      '</div>';

    var canvas=container.querySelector("#eivCanvas"), idn=new Identity(canvas); idn.start();
    var voice=new Voice();
    var nameEl=container.querySelector("#eivName"),subEl=container.querySelector("#eivSub"),
        phraseEl=container.querySelector("#eivPhrase"),kickEl=container.querySelector(".eiv-kicker"),
        core=container.querySelector("#eivCore"),track=container.querySelector("#eivTrack"),openBtn=container.querySelector("#eivOpen");

    function chipHTML(c,idx){
      return '<li class="eiv-item"><button class="eiv-chip islz" data-idx="'+idx+'" style="--c:'+c.area+'">'+
        '<span class="ic"><svg viewBox="0 0 24 24">'+(ICON[c.icon]||"")+'</svg></span>'+
        '<span class="nm">'+c.nombre[lang]+'</span>'+(c.real?'':'<span class="soon">'+tx.soon+'</span>')+'</button></li>';
    }
    var html=""; for(var s=0;s<3;s++)for(var i=0;i<C.length;i++)html+=chipHTML(C[i],i); track.innerHTML=html;

    // ---- menú de media luna (vista de celular) ----
    var DCX=170,DCY=255,DR=205,dslots=[];
    function dialArc(){var a=2.45*0.34,x1=(DCX-DR*Math.sin(a)).toFixed(1),x2=(DCX+DR*Math.sin(a)).toFixed(1),y=(DCY-DR*Math.cos(a)).toFixed(1);var p=container.querySelector("#eivDialArc");if(p)p.setAttribute("d","M"+x1+" "+y+" A"+DR+" "+DR+" 0 0 1 "+x2+" "+y);}
    function buildDial(){var host=container.querySelector("#eivDialItems");if(!host)return;host.innerHTML="";dslots=[];for(var i=0;i<5;i++){var b=document.createElement("button");b.className="eiv-dslot";b.type="button";b.innerHTML='<span class="ic"><svg viewBox="0 0 24 24"></svg></span><span class="dl"></span>';host.appendChild(b);dslots.push(b);}dialArc();}
    function updateDial(){if(!dslots.length||sel<0)return;for(var s2=0;s2<5;s2++){var off=s2-2,idx=(((sel+off)%C.length)+C.length)%C.length,p=C[idx],th=off*0.34,x=DCX+DR*Math.sin(th),y=DCY-DR*Math.cos(th),b=dslots[s2];b.style.left=x.toFixed(1)+"px";b.style.top=y.toFixed(1)+"px";b.style.setProperty("--c",p.area);b.dataset.idx=idx;b.classList.toggle("on",off===0);b.style.opacity=Math.abs(off)===2?".5":"1";b.querySelector(".ic svg").innerHTML=ICON[p.icon]||"";b.querySelector(".dl").textContent=off===0?(p.sub?p.sub[lang]:p.nombre[lang]):"";}}

    var segW=0,pos=0,auto=!reduce,dragging=false,dragX=0,dragPos=0,moved=false;
    function measure(){var it=track.children;segW=0;for(var i=0;i<C.length;i++)segW+=it[i].getBoundingClientRect().width+12;wrap();}
    function wrap(){if(segW>0)pos=((pos%segW)+segW)%segW;}
    function applyTrack(){track.style.transform="translateX("+(-(segW+pos)).toFixed(1)+"px)";}

    var sel=-1,paused=false;
    function markCurrent(idx){track.querySelectorAll(".eiv-chip").forEach(function(c){c.setAttribute("aria-current",String(+c.dataset.idx===idx));});}
    function setSel(idx,speak){
      if(idx<0||idx>=C.length)return; sel=idx; var c=C[idx];
      document.documentElement.style.setProperty("--acc",c.area); container.style.setProperty("--acc",c.area); kickEl.style.setProperty("--acc",c.area);
      nameEl.textContent=c.nombre[lang]; subEl.textContent=c.sub?c.sub[lang]:"";
      phraseEl.classList.remove("show"); setTimeout(function(){phraseEl.textContent=c.frase[lang];phraseEl.classList.add("show");},120);
      openBtn.firstChild && (openBtn.childNodes[0].nodeValue=(c.real?tx.start:tx.view)+" ");
      idn.setColor(c.area); idn.pulse(); markCurrent(idx); updateDial();
      if(speak) voice.say(c.frase[lang],function(){idn.setSpeaking(true);},function(){idn.setSpeaking(false);});
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
      sheet.classList.add("open"); sheet.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; paused=true; voice.shush();
      sheet.querySelector("#eivClose").addEventListener("click",closeDetail);
      sheet.querySelectorAll("[data-nav]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();closeDetail();nav(a.dataset.nav);});});
    }
    function closeDetail(){sheet.classList.remove("open");sheet.setAttribute("aria-hidden","true");document.body.style.overflow="";paused=false;setTimeout(function(){var p=sheet.querySelector("#eivPanelInner");if(p)p.innerHTML="";},300);}
    sheet.querySelector(".eiv-scrim").addEventListener("click",closeDetail);
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&sheet.classList.contains("open"))closeDetail();});

    // eventos menú
    track.addEventListener("pointerdown",function(e){dragging=true;moved=false;dragX=e.clientX;dragPos=pos;track.classList.add("drag");track.setPointerCapture(e.pointerId);});
    track.addEventListener("pointermove",function(e){if(!dragging)return;var dx=e.clientX-dragX;if(Math.abs(dx)>4)moved=true;pos=dragPos-dx;wrap();applyTrack();});
    track.addEventListener("pointerup",function(){dragging=false;track.classList.remove("drag");});
    track.addEventListener("pointercancel",function(){dragging=false;track.classList.remove("drag");});
    track.addEventListener("click",function(e){var b=e.target.closest(".eiv-chip");if(!b)return;if(moved){e.preventDefault();return;}var idx=+b.dataset.idx;setSel(idx,true);openDetail(idx);});
    track.addEventListener("pointerover",function(e){var b=e.target.closest(".eiv-chip");if(!b)return;var idx=+b.dataset.idx;if(idx!==sel)setSel(idx,true);});
    track.addEventListener("focusin",function(e){var b=e.target.closest(".eiv-chip");if(!b)return;setSel(+b.dataset.idx,true);});
    container.querySelectorAll(".eiv-arrow").forEach(function(a){a.addEventListener("click",function(){var d=+a.dataset.dir,n=C.length;setSel((sel+d+n)%n,true);pos+=d*(segW/C.length);wrap();applyTrack();});});
    // dial de media luna (móvil)
    buildDial();
    var dial=container.querySelector("#eivDial"),ddx=null,dmoved=false;
    if(dial){
      dial.addEventListener("pointerdown",function(e){ddx=e.clientX;dmoved=false;paused=true;});
      dial.addEventListener("pointermove",function(e){if(ddx==null)return;var dx=e.clientX-ddx;if(Math.abs(dx)>42){setSel((sel+(dx<0?1:-1)+C.length)%C.length,true);ddx=e.clientX;dmoved=true;}});
      dial.addEventListener("pointerup",function(){ddx=null;setTimeout(function(){if(!sheet.classList.contains("open"))paused=false;},3500);});
      dial.addEventListener("pointercancel",function(){ddx=null;});
      dial.addEventListener("click",function(e){var b=e.target.closest(".eiv-dslot");if(!b)return;if(dmoved){dmoved=false;return;}var idx=+b.dataset.idx;if(idx===sel)openDetail(idx);else setSel(idx,true);});
    }

    function openCurrent(){if(sel<0)setSel(0,true);openDetail(sel<0?0:sel);}
    core.addEventListener("click",openCurrent);
    core.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openCurrent();}});
    openBtn.addEventListener("click",openCurrent);

    var vbtn=container.querySelector("#eivVoice");
    vbtn.addEventListener("click",function(){var on=voice.toggle();vbtn.setAttribute("aria-pressed",String(on));if(on){voice.gesture();setSel(sel<0?0:sel,true);}});
    vbtn.setAttribute("aria-pressed",String(voice.enabled()));
    function fg(){voice.gesture();window.removeEventListener("pointerdown",fg);window.removeEventListener("keydown",fg);}
    window.addEventListener("pointerdown",fg);window.addEventListener("keydown",fg);

    var menu=container.querySelector(".eiv-menu");
    [menu,core].forEach(function(el){el.addEventListener("pointerenter",function(){paused=true;});el.addEventListener("pointerleave",function(){if(!sheet.classList.contains("open"))paused=false;});});

    var lastCycle=performance.now();
    function tick(now){
      if(auto&&!dragging&&!paused){pos+=.35;wrap();applyTrack();}
      if(!paused&&!sheet.classList.contains("open")&&now-lastCycle>5200){lastCycle=now;setSel((sel+1)%C.length,true);}
      requestAnimationFrame(tick);
    }
    function boot(){measure();applyTrack();setSel(0,false);if(!reduce)requestAnimationFrame(tick);}
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){setTimeout(boot,30);});else setTimeout(boot,60);

    var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){idn.resize();measure();applyTrack();},200);});
    window.addEventListener("temachange",function(){if(sel>=0){idn.refreshColor(C[sel].area);}});
  }

  window.EivindLZ={ mount:mount };
})();
