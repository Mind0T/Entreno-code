/* ============================================================
   Eivind · Learning Zone — misma dinámica que el home del hub,
   pero el menú de abajo son CURSOS (no proyectos).
   API:  window.EivindLZ.mount(container, cfg)
   cfg = { lang, cursos:[...], icons:{...}, nav:fn(hash) }
   ============================================================ */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hex2rgb(h){ h=(h||"").replace("#",""); if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2]; var n=parseInt(h||"5b8def",16); return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}; }

  /* ---- identidad (núcleo + arcos orbitales + motes) ---- */
  function Identity(canvas){
    var ctx=canvas.getContext("2d"),dpr=1,S=300,t=0,amp=0,ampT=0,pulse=0,raf=0;
    var cur=hex2rgb("#9DB4CF"),tgt=hex2rgb("#9DB4CF"),ripples=[];
    var rings=[{tilt:.30,rot:0,spd:.22,w:2.2},{tilt:.62,rot:1.1,spd:-.15,w:1.6},{tilt:.90,rot:2.4,spd:.33,w:1.3}];
    var motes=[]; for(var i=0;i<22;i++)motes.push({ring:i%3,a:Math.random()*6.28,sp:.4+Math.random()*.7,r:.7+Math.random()*1.5});
    function size(){dpr=Math.min(2,window.devicePixelRatio||1);var b=canvas.getBoundingClientRect();S=Math.max(180,b.width||300);canvas.width=S*dpr;canvas.height=S*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
    function col(a){return "rgba("+cur.r+","+cur.g+","+cur.b+","+a+")";}
    function rp(ring,ang,R){var rot=ring.rot+t*ring.spd,x=Math.cos(ang)*R,y=Math.sin(ang)*R*ring.tilt;return {x:x*Math.cos(rot)-y*Math.sin(rot),y:x*Math.sin(rot)+y*Math.cos(rot),depth:Math.sin(ang)*ring.tilt};}
    function draw(){
      ctx.clearRect(0,0,S,S);var cx=S/2,cy=S/2,R=S*.33;
      cur.r+=(tgt.r-cur.r)*.08;cur.g+=(tgt.g-cur.g)*.08;cur.b+=(tgt.b-cur.b)*.08;
      amp+=(ampT-amp)*.12; if(pulse>0)pulse*=.92;
      var en=Math.min(1,amp+pulse),br=.5+.5*Math.sin(t*1.1);
      var hg=ctx.createRadialGradient(cx,cy,R*.2,cx,cy,R*(1.5+en*.5));
      hg.addColorStop(0,col(.16+en*.12));hg.addColorStop(.5,col(.05));hg.addColorStop(1,col(0));
      ctx.fillStyle=hg;ctx.fillRect(0,0,S,S);
      for(var r=ripples.length-1;r>=0;r--){var o=ripples[r];o.rad+=1.8;o.life-=.012;if(o.life<=0){ripples.splice(r,1);continue;}ctx.strokeStyle=col(o.life*.4);ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(cx,cy,R*.55+o.rad,0,6.28);ctx.stroke();}
      for(var k=0;k<rings.length;k++){var ring=rings[k],N=120;ctx.lineWidth=ring.w*(1+en*.6);
        for(var pass=0;pass<2;pass++){ctx.beginPath();var st=false;
          for(var s=0;s<=N;s++){var ang=s/N*6.28,pt=rp(ring,ang,R),front=pt.depth>=0;if((pass===0)===front){st=false;continue;}var X=cx+pt.x,Y=cy+pt.y;if(!st){ctx.moveTo(X,Y);st=true;}else ctx.lineTo(X,Y);}
          ctx.strokeStyle=col(pass===0?.12:.5+en*.35);ctx.stroke();}}
      for(var m=0;m<motes.length;m++){var mo=motes[m];mo.a+=mo.sp*.01*(1+en);var pt=rp(rings[mo.ring],mo.a,R),dep=(pt.depth+1)/2;ctx.fillStyle=col(.25+dep*.55);ctx.beginPath();ctx.arc(cx+pt.x,cy+pt.y,mo.r*(.6+dep*.9),0,6.28);ctx.fill();}
      var coreR=R*(.34+br*.05+en*.16),cg=ctx.createRadialGradient(cx,cy,0,cx,cy,coreR);
      cg.addColorStop(0,"rgba(255,255,255,.9)");cg.addColorStop(.35,col(.85));cg.addColorStop(1,col(0));
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx,cy,coreR,0,6.28);ctx.fill();
      t+=reduce?0:.016;
    }
    function loop(){draw();raf=requestAnimationFrame(loop);}
    this.setColor=function(h){tgt=hex2rgb(h);};
    this.refreshColor=function(h){cur=hex2rgb(h);tgt=hex2rgb(h);};
    this.setSpeaking=function(b){ampT=b?1:0;if(b)ripples.push({rad:0,life:1});};
    this.pulse=function(){pulse=.55;ripples.push({rad:0,life:.8});};
    this.resize=size;this.start=function(){size();if(reduce)draw();else loop();};
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
      '</nav>';

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
      idn.setColor(c.area); idn.pulse(); markCurrent(idx);
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
