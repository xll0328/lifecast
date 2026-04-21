const PREFER_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function activateReveal(scope){
  if(!scope)return;
  const els=scope.querySelectorAll('.reveal');
  if(!els.length)return;
  if(PREFER_REDUCED_MOTION||typeof IntersectionObserver==='undefined'){
    els.forEach(el=>el.classList.add('visible'));
    return;
  }
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.1});
  els.forEach(el=>obs.observe(el));
}

/* ===== MOBILE NAV ===== */
(function(){
  const toggle=document.getElementById('nav-toggle');
  const links=document.getElementById('nav-links');
  if(!toggle||!links)return;

  function setOpen(open){
    links.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',open?'true':'false');
    document.body.classList.toggle('nav-open',open);
  }

  toggle.addEventListener('click',()=>setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  window.addEventListener('resize',()=>{ if(window.innerWidth>700) setOpen(false); });
})();

/* ===== HERO STAT COUNT-UP ===== */
(function(){
  if(PREFER_REDUCED_MOTION)return;
  const hmVs=document.querySelectorAll('.hm-v');
  const targets=[914,921,45,9,31,9];
  const suffixes=['K','','','','M',''];
  hmVs.forEach((el,i)=>{
    const target=targets[i];
    if(target==null)return;
    const suffix=suffixes[i]||'';
    const original=el.textContent;
    el.textContent='0'+suffix;
    const obs=new IntersectionObserver(entries=>{
      if(!entries[0].isIntersecting)return;
      obs.disconnect();
      const dur=1400;
      const start=performance.now();
      function step(now){
        const p=Math.min((now-start)/dur,1);
        const ease=1-Math.pow(1-p,4);
        const val=Math.round(ease*target);
        el.textContent=val+suffix;
        if(p<1)requestAnimationFrame(step);
        else el.textContent=original;
      }
      requestAnimationFrame(step);
    },{threshold:0.5});
    obs.observe(el);
  });
})();

/* ===== CANVAS GRID ===== */
(function(){
  const c=document.getElementById('grid-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let particles=[];
  const N=120;
  const LINK_DIST=140;
  const COLORS=[
    'rgba(67,98,137,',
    'rgba(108,170,196,',
    'rgba(97,132,125,',
    'rgba(204,85,54,',
    'rgba(88,139,193,',
  ];

  function resize(){
    c.width=c.offsetWidth;c.height=c.offsetHeight;
    particles=[];
    for(let i=0;i<N;i++){
      const cr=COLORS[i%COLORS.length];
      particles.push({
        x:Math.random()*c.width,
        y:Math.random()*c.height,
        vx:(Math.random()-0.5)*0.4,
        vy:(Math.random()-0.5)*0.4,
        r:Math.random()*2.5+0.8,
        a:Math.random()*0.5+0.25,
        col:cr,
        phase:Math.random()*Math.PI*2,
        speed:0.3+Math.random()*0.4,
      });
    }
  }

  let mouse={x:-9999,y:-9999};
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    mouse.x=e.clientX-r.left;
    mouse.y=e.clientY-r.top;
  });
  c.addEventListener('mouseleave',()=>{mouse.x=-9999;mouse.y=-9999;});

  let frame=0;
  function draw(){
    if(PREFER_REDUCED_MOTION){
      ctx.clearRect(0,0,c.width,c.height);
      return;
    }
    ctx.clearRect(0,0,c.width,c.height);
    frame++;
    // draw links
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<LINK_DIST){
          const alpha=(1-dist/LINK_DIST)*0.13;
          ctx.beginPath();
          ctx.strokeStyle=`rgba(67,98,137,${alpha})`;
          ctx.lineWidth=0.7;
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.stroke();
        }
      }
    }
    // draw particles
    particles.forEach(p=>{
      // mouse attraction
      const mdx=mouse.x-p.x;
      const mdy=mouse.y-p.y;
      const mdist=Math.sqrt(mdx*mdx+mdy*mdy);
      if(mdist<160&&mdist>0){
        const force=0.012*(1-mdist/160);
        p.vx+=mdx/mdist*force;
        p.vy+=mdy/mdist*force;
        // clamp speed
        const spd=Math.sqrt(p.vx*p.vx+p.vy*p.vy);
        if(spd>1.2){p.vx=p.vx/spd*1.2;p.vy=p.vy/spd*1.2;}
      }
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>c.width)p.vx*=-1;
      if(p.y<0||p.y>c.height)p.vy*=-1;
      // pulse radius
      const pulse=p.r+Math.sin(frame*0.02*p.speed+p.phase)*0.6;
      // glow
      ctx.save();
      ctx.shadowColor=p.col+'0.5)';
      ctx.shadowBlur=8;
      ctx.beginPath();
      ctx.arc(p.x,p.y,pulse,0,Math.PI*2);
      ctx.fillStyle=p.col+p.a+')';
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener('resize',()=>{resize();});
  draw();
})();

/* ===== HERO DNA STRIP ===== */
(function(){
  const bar=document.getElementById('hero-dna-bar');
  const lbl=document.getElementById('hero-dna-label');
  if(!bar||!lbl)return;
  const ACTS=[
    {id:'sleep',c:'#c8c4bc'},{id:'work',c:'#436289'},{id:'meal',c:'#b8b283'},
    {id:'commute',c:'#7c83aa'},{id:'leisure',c:'#8accc9'},{id:'housework',c:'#bc9da8'},
    {id:'childcare',c:'#cc5536'},{id:'personal',c:'#6caac4'},{id:'social',c:'#aad498'},
    {id:'education',c:'#568bc1'},
  ];
  const PROFILES=[
    {label:'Employed · Low income · Weekday',  inc:'low', eco:'employed',  sex:'male',   day:'weekday'},
    {label:'Retired · Mid income · Weekday',   inc:'mid', eco:'retired',   sex:'female', day:'weekday'},
    {label:'Student · Low income · Weekend',   inc:'low', eco:'student',   sex:'male',   day:'weekend'},
    {label:'Homemaker · Mid income · Weekday', inc:'mid', eco:'homemaker', sex:'female', day:'weekday'},
    {label:'Employed · High income · Weekend', inc:'high',eco:'employed',  sex:'male',   day:'weekend'},
    {label:'Unemployed · Low income · Weekday',inc:'low', eco:'unemployed',sex:'female', day:'weekday'},
  ];
  const fill=(s,a,b,v)=>{for(let i=a;i<b&&i<144;i++)s[i]=v;};
  function buildDay(inc,eco,sex,day){
    const s=new Array(144).fill('sleep');
    if(eco==='employed'){
      if(day==='weekend'){fill(s,0,34,'sleep');fill(s,34,40,'personal');fill(s,40,46,'meal');fill(s,46,90,'leisure');fill(s,90,96,'meal');fill(s,96,inc==='high'?120:108,'social');fill(s,inc==='high'?120:108,132,'leisure');fill(s,132,144,'sleep');}
      else{fill(s,0,28,'sleep');fill(s,28,32,'personal');fill(s,32,38,'meal');fill(s,38,44,'commute');fill(s,44,96,'work');fill(s,96,102,'commute');fill(s,102,108,'meal');if(inc==='high'){fill(s,108,114,'social');fill(s,114,132,'leisure');}else{fill(s,108,120,'leisure');if(sex==='female')fill(s,120,126,'housework');fill(s,126,132,'leisure');}fill(s,132,144,'sleep');}}
    else if(eco==='retired'){fill(s,0,30,'sleep');fill(s,30,36,'personal');fill(s,36,42,'meal');fill(s,42,54,'leisure');fill(s,54,66,'housework');fill(s,66,72,'meal');fill(s,72,96,'leisure');fill(s,96,102,'social');fill(s,102,108,'meal');fill(s,108,120,'leisure');fill(s,120,144,'sleep');}
    else if(eco==='student'){fill(s,0,28,'sleep');fill(s,28,34,'personal');fill(s,34,40,'meal');fill(s,40,day==='weekend'?55:78,'education');if(day==='weekend')fill(s,55,90,'leisure');fill(s,78,84,'meal');fill(s,84,108,'leisure');fill(s,108,114,'meal');fill(s,114,126,'education');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    else if(eco==='homemaker'){fill(s,0,28,'sleep');fill(s,28,34,'personal');fill(s,34,40,'meal');fill(s,40,66,'housework');fill(s,66,72,'childcare');fill(s,72,78,'meal');fill(s,78,96,'housework');fill(s,96,108,'leisure');fill(s,108,114,'meal');fill(s,114,126,'childcare');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    else{fill(s,0,36,'sleep');fill(s,36,42,'personal');fill(s,42,48,'meal');fill(s,48,72,'leisure');fill(s,72,84,'housework');fill(s,84,90,'meal');fill(s,90,120,'leisure');fill(s,120,126,'meal');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    return s;
  }
  function renderProfile(p){
    const slots=buildDay(p.inc,p.eco,p.sex,p.day);
    // compress to segments
    const segs=[];
    let cur={id:slots[0],n:1};
    for(let i=1;i<slots.length;i++){
      if(slots[i]===cur.id)cur.n++;
      else{segs.push({...cur});cur={id:slots[i],n:1};}
    }
    segs.push(cur);
    // fade out
    bar.style.opacity='0';
    lbl.style.opacity='0';
    setTimeout(()=>{
      bar.innerHTML=segs.map(s=>{
        const act=ACTS.find(a=>a.id===s.id);
        const c=act?act.c:'#ccc';
        return `<div class="hero-dna-seg" style="width:${s.n/144*100}%;background:${c}"></div>`;
      }).join('');
      lbl.textContent=p.label;
      bar.style.opacity='1';
      lbl.style.opacity='1';
    },300);
  }
  bar.style.transition='opacity 0.3s';
  lbl.style.transition='opacity 0.3s';
  let idx=0;
  renderProfile(PROFILES[0]);
  setInterval(()=>{
    idx=(idx+1)%PROFILES.length;
    renderProfile(PROFILES[idx]);
  },3200);
})();

/* ===== SCROLL REVEAL ===== */
(function(){
  // reading progress bar
  const pb=document.getElementById('progress-bar');
  if(pb){
    window.addEventListener('scroll',()=>{
      const h=document.documentElement;
      const pct=(h.scrollTop||document.body.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
      pb.style.width=Math.min(pct,100).toFixed(1)+'%';
    },{passive:true});
  }
})();

/* ===== SCROLL REVEAL (elements) ===== */
(function(){
  if(PREFER_REDUCED_MOTION){
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
    return;
  }
  const obs=new IntersectionObserver(e=>e.forEach(x=>{
    if(x.isIntersecting){x.target.classList.add('visible');obs.unobserve(x.target);}
  }),{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

/* ===== 24H ACTIVITY HEATMAP ===== */
(function(){
  const ACTS=[
    {id:'sleep',    l:'Sleep',        c:'#d0cfc8'},
    {id:'work',     l:'Work',         c:'#436289'},
    {id:'meal',     l:'Meal',         c:'#b8b283'},
    {id:'commute',  l:'Commute',      c:'#7c83aa'},
    {id:'leisure',  l:'Leisure',      c:'#8accc9'},
    {id:'housework',l:'Housework',    c:'#bc9da8'},
    {id:'childcare',l:'Childcare',    c:'#cc5536'},
    {id:'personal', l:'Personal care',c:'#6caac4'},
    {id:'social',   l:'Social',       c:'#aad498'},
    {id:'education',l:'Education',    c:'#568bc1'},
  ];
  const color=id=>{const a=ACTS.find(x=>x.id===id);return a?a.c:'#e0ddd8';};

  const fill=(s,a,b,v)=>{for(let i=a;i<b&&i<144;i++)s[i]=v;};
  function buildDay(inc,eco,sex,day){
    const s=new Array(144).fill('sleep');
    if(eco==='employed'){
      if(day==='weekend'){fill(s,0,34,'sleep');fill(s,34,40,'personal');fill(s,40,46,'meal');fill(s,46,90,'leisure');fill(s,90,96,'meal');fill(s,96,inc==='high'?120:108,'social');fill(s,inc==='high'?120:108,132,'leisure');fill(s,132,144,'sleep');}
      else{fill(s,0,28,'sleep');fill(s,28,32,'personal');fill(s,32,38,'meal');fill(s,38,44,'commute');fill(s,44,96,'work');fill(s,96,102,'commute');fill(s,102,108,'meal');if(inc==='high'){fill(s,108,114,'social');fill(s,114,132,'leisure');}else{fill(s,108,120,'leisure');if(sex==='female')fill(s,120,126,'housework');fill(s,126,132,'leisure');}fill(s,132,144,'sleep');}}
    else if(eco==='retired'){fill(s,0,30,'sleep');fill(s,30,36,'personal');fill(s,36,42,'meal');fill(s,42,54,'leisure');fill(s,54,66,'housework');fill(s,66,72,'meal');fill(s,72,96,'leisure');fill(s,96,102,'social');fill(s,102,108,'meal');fill(s,108,120,'leisure');fill(s,120,144,'sleep');}
    else if(eco==='student'){fill(s,0,28,'sleep');fill(s,28,34,'personal');fill(s,34,40,'meal');fill(s,40,day==='weekend'?55:78,'education');if(day==='weekend')fill(s,55,90,'leisure');fill(s,78,84,'meal');fill(s,84,108,'leisure');fill(s,108,114,'meal');fill(s,114,126,'education');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    else if(eco==='homemaker'){fill(s,0,28,'sleep');fill(s,28,34,'personal');fill(s,34,40,'meal');fill(s,40,66,'housework');fill(s,66,72,'childcare');fill(s,72,78,'meal');fill(s,78,96,'housework');fill(s,96,108,'leisure');fill(s,108,114,'meal');fill(s,114,126,'childcare');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    else{fill(s,0,36,'sleep');fill(s,36,42,'personal');fill(s,42,48,'meal');fill(s,48,72,'leisure');fill(s,72,84,'housework');fill(s,84,90,'meal');fill(s,90,120,'leisure');fill(s,120,126,'meal');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    return s;
  }

  // compute dominant activity per hour (6 slots) for a group
  function dominantByHour(slots){
    const hours=[];
    for(let h=0;h<24;h++){
      const window=slots.slice(h*6,(h+1)*6);
      const counts={};
      window.forEach(a=>{counts[a]=(counts[a]||0)+1;});
      const dom=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
      hours.push(dom);
    }
    return hours;
  }

  const MODES={
    income:[
      {label:'High income', inc:'high', eco:'employed', sex:'male',  day:'weekday'},
      {label:'Mid income',  inc:'mid',  eco:'employed', sex:'male',  day:'weekday'},
      {label:'Low income',  inc:'low',  eco:'employed', sex:'male',  day:'weekday'},
    ],
    econstat:[
      {label:'Employed',   inc:'mid', eco:'employed',   sex:'male',   day:'weekday'},
      {label:'Student',    inc:'mid', eco:'student',    sex:'male',   day:'weekday'},
      {label:'Retired',    inc:'low', eco:'retired',    sex:'male',   day:'weekday'},
      {label:'Homemaker',  inc:'low', eco:'homemaker',  sex:'female', day:'weekday'},
      {label:'Unemployed', inc:'low', eco:'unemployed', sex:'male',   day:'weekday'},
    ],
    sex:[
      {label:'Male (weekday)',   inc:'mid', eco:'employed', sex:'male',   day:'weekday'},
      {label:'Female (weekday)', inc:'mid', eco:'employed', sex:'female', day:'weekday'},
      {label:'Male (weekend)',   inc:'mid', eco:'employed', sex:'male',   day:'weekend'},
      {label:'Female (weekend)', inc:'mid', eco:'employed', sex:'female', day:'weekend'},
    ],
  };

  const wrap=document.getElementById('hmap-wrap');
  const axisEl=document.getElementById('hmap-axis');
  const legendEl=document.getElementById('hmap-legend');
  if(!wrap)return;

  // build axis once
  if(axisEl){
    for(let h=0;h<24;h++){
      const s=document.createElement('span');
      s.textContent=h%3===0?String(h).padStart(2,'0')+'h':'';
      axisEl.appendChild(s);
    }
  }

  // build legend once
  if(legendEl){
    legendEl.innerHTML=ACTS.map(a=>
      `<div class="hmap-li"><div class="hmap-dot" style="background:${a.c}"></div><span>${a.l}</span></div>`
    ).join('');
  }

  function renderMode(key){
    const rows=MODES[key];
    if(!rows||!wrap)return;
    // build shared tooltip
    let tipEl=document.getElementById('hmap-tip');
    if(!tipEl){
      tipEl=document.createElement('div');
      tipEl.id='hmap-tip';
      tipEl.style.cssText='display:none;position:fixed;z-index:300;background:#1a2030;color:#f7f6f2;font-family:var(--mono);font-size:0.65rem;padding:0.35rem 0.7rem;border-radius:5px;border:1px solid rgba(67,98,137,0.3);pointer-events:none;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.18);transition:opacity 0.1s;';
      document.body.appendChild(tipEl);
    }
    wrap.innerHTML=rows.map(r=>{
      const slots=buildDay(r.inc,r.eco,r.sex,r.day);
      const hours=dominantByHour(slots);
      const cells=hours.map((act,h)=>{
        const actObj=ACTS.find(a=>a.id===act)||{l:act};
        return `<div class="hmap-cell" style="background:${color(act)}" data-h="${h}" data-act="${actObj.l}" data-row="${r.label}"></div>`;
      }).join('');
      return `<div class="hmap-row"><div class="hmap-row-lbl">${r.label}</div><div class="hmap-cells">${cells}</div></div>`;
    }).join('');
    // tooltip events
    wrap.querySelectorAll('.hmap-cell').forEach(cell=>{
      cell.addEventListener('mouseenter',e=>{
        const h=parseInt(cell.dataset.h);
        const hStr=String(h).padStart(2,'0')+':00–'+String(h+1).padStart(2,'0')+':00';
        tipEl.innerHTML=`<span style="opacity:0.6">${cell.dataset.row}</span>&nbsp;&middot;&nbsp;<span>${hStr}</span><br><strong style="color:#aad498">${cell.dataset.act}</strong>`;
        tipEl.style.display='block';
      });
      cell.addEventListener('mousemove',e=>{
        tipEl.style.left=(e.clientX+14)+'px';
        tipEl.style.top=(e.clientY-36)+'px';
      });
      cell.addEventListener('mouseleave',()=>{ tipEl.style.display='none'; });
    });
  }

  document.querySelectorAll('.hmap-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.hmap-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderMode(btn.dataset.hmap);
    });
  });

  renderMode('income');
})();

/* ===== UK vs US COMPARISON ===== */
(function(){
  const UK=[
    {label:'High inc', val:86.6, color:'#8accc9'},
    {label:'Mid inc',  val:89.8, color:'#6caac4'},
    {label:'Low inc',  val:91.1, color:'#436289'},
  ];
  const US=[
    {label:'High inc', val:85.88, color:'#8accc9'},
    {label:'Mid inc',  val:88.76, color:'#6caac4'},
    {label:'Low inc',  val:91.14, color:'#436289'},
  ];
  const MIN=82,MAX=94;
  function renderBars(rows,containerId){
    const wrap=document.getElementById(containerId);
    if(!wrap)return;
    rows.forEach(r=>{
      const pct=((r.val-MIN)/(MAX-MIN)*100).toFixed(1);
      wrap.insertAdjacentHTML('beforeend',
        `<div class="ukus-bar-row">
          <div class="ukus-bar-lbl">${r.label}</div>
          <div class="ukus-bar-track"><div class="ukus-bar-fill" data-w="${pct}" style="background:${r.color}"><span>${r.val}%</span></div></div>
        </div>`);
    });
    // animate on scroll
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          wrap.querySelectorAll('.ukus-bar-fill').forEach(el=>{
            el.style.width=el.dataset.w+'%';
          });
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.2});
    obs.observe(wrap);
  }
  renderBars(UK,'ukus-bars-uk');
  renderBars(US,'ukus-bars-us');
})();

/* ===== US PHASE 2 FINDINGS ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const findings=RESEARCH_DATA.us_phase2_findings;
  if(!findings)return;
  const wrap=document.getElementById('p2-findings');
  if(!wrap)return;
  const colors=['#436289','#6caac4','#7c83aa','#b8b283','#8accc9','#bc9da8','#61847d','#568bc1','#cc5536'];
  Object.values(findings).forEach((f,i)=>{
    wrap.insertAdjacentHTML('beforeend',
      `<div class="finding-card reveal" style="--fc-accent:${colors[i%colors.length]}">
        <div class="fc-num" style="color:${colors[i%colors.length]}">${f.code}</div>
        <h3>${f.title}</h3>
        <p>${f.detail}</p>
      </div>`);
  });
  activateReveal(wrap);
})();

/* ===== PROJECT PROGRAM ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const summary=RESEARCH_DATA.project_summary;
  const phases=RESEARCH_DATA.project_phases;
  const statsWrap=document.getElementById('program-stats');
  if(statsWrap&&summary){
    const stats=summary.stats||[
      {value:summary.phases,label:'program layers'},
      {value:summary.country_settings,label:'national settings'},
      {value:summary.figures,label:'curated figures'},
      {value:summary.result_json_artifacts,label:'result JSONs'},
      {value:summary.report_sets,label:'report sets'}
    ];
    statsWrap.innerHTML=stats.map(s=>
      `<div class="program-stat"><span class="program-stat-v">${s.value}</span><span class="program-stat-k">${s.label}</span></div>`
    ).join('');
  }
  const grid=document.getElementById('program-grid');
  if(grid&&phases){
    grid.innerHTML=phases.map(p=>
      `<article class="program-card reveal">
        <div class="program-top">
          <span class="program-code">${p.code}</span>
          <span class="program-dataset">${p.dataset}</span>
        </div>
        <h3>${p.title}</h3>
        <div class="program-scope">${p.scope}</div>
        <p>${p.insight}</p>
        <div class="program-output">${p.output}</div>
      </article>`
    ).join('');
  }
  activateReveal(document.getElementById('program'));
})();

/* ===== PROJECT SHOWCASE ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const scales=RESEARCH_DATA.phase_scale_panels||[];
  const gallery=RESEARCH_DATA.showcase_gallery||[];

  const scaleWrap=document.getElementById('phase-scale-grid');
  if(scaleWrap&&scales.length){
    scaleWrap.innerHTML=scales.map(item=>
      `<article class="phase-scale-card reveal">
        <div class="phase-scale-top">
          <span class="phase-scale-code">${item.code}</span>
          <span class="phase-scale-tag">evidence scale</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
        <div class="phase-scale-badges">
          ${(item.badges||[]).map(b=>`<span class="phase-scale-badge">${b}</span>`).join('')}
        </div>
      </article>`
    ).join('');
  }

  const galleryWrap=document.getElementById('showcase-grid');
  if(galleryWrap&&gallery.length){
    galleryWrap.innerHTML=gallery.map(item=>
      `<article class="showcase-card reveal">
        <div class="showcase-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="showcase-meta">${item.phase} · ${item.code}</div>
        <h3>${item.title}</h3>
        <p>${item.caption}</p>
        <div class="showcase-actions">
          <a class="showcase-link" href="${item.href}" target="_blank" rel="noopener noreferrer">${item.link_label||'Open report'}</a>
        </div>
      </article>`
    ).join('');
  }

  activateReveal(document.getElementById('showcase'));
})();

/* ===== PHASE 4+ DELIVERY ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const delivery=RESEARCH_DATA.phase4_plus_delivery;
  if(!delivery)return;

  const toneClass=tone=>{
    if(tone==='pass')return 'delivery-status-card--pass';
    if(tone==='hold')return 'delivery-status-card--hold';
    return 'delivery-status-card--boundary';
  };

  const statusWrap=document.getElementById('delivery-status-grid');
  if(statusWrap&&delivery.status_cards){
    statusWrap.innerHTML=delivery.status_cards.map(item=>
      `<article class="delivery-status-card reveal ${toneClass(item.tone)}">
        <div class="delivery-status-top">
          <span class="delivery-status-code">${item.code}</span>
          <span class="delivery-status-pill">${item.status}</span>
        </div>
        <h3>${item.label}</h3>
        <p>${item.detail}</p>
      </article>`
    ).join('');
  }

  const order=['pdf','html','md','json'];
  const docsWrap=document.getElementById('delivery-doc-grid');
  if(docsWrap&&delivery.documents){
    docsWrap.innerHTML=delivery.documents.map(item=>
      `<article class="report-card reveal">
        <div class="report-code">${item.code}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="report-files">${Object.keys(item.links||{}).map(key=>key.toUpperCase()).join(' · ')}</div>
        <div class="report-actions">
          ${order.filter(key=>item.links&&item.links[key]).map((key,idx)=>
            `<a class="report-btn${idx===0?' report-btn--primary':''}" href="${item.links[key]}" target="_blank" rel="noopener noreferrer">${key.toUpperCase()}</a>`
          ).join('')}
        </div>
      </article>`
    ).join('');
  }

  const note=document.getElementById('delivery-note');
  if(note&&delivery.note){
    note.innerHTML=`<strong>Current rule.</strong> ${delivery.note}`;
    note.classList.add('reveal');
  }

  activateReveal(document.getElementById('delivery'));
})();

/* ===== PHASE 3 FULL DASHBOARD ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const rows=[...(RESEARCH_DATA.phase3_country_delta||[])];
  if(!rows.length)return;
  const signed=v=>`${v>=0?'+':''}${v.toFixed(2)}`;
  function animateBars(wrap){
    if(!wrap)return;
    const fills=wrap.querySelectorAll('.p3-bar-fill');
    if(!fills.length)return;
    if(PREFER_REDUCED_MOTION||typeof IntersectionObserver==='undefined'){
      fills.forEach(fill=>fill.style.width=fill.dataset.w+'%');
      return;
    }
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          fills.forEach(fill=>fill.style.width=fill.dataset.w+'%');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.25});
    obs.observe(wrap);
  }

  const countryWrap=document.getElementById('phase3-country-bars');
  if(countryWrap){
    const max=Math.max(...rows.map(r=>r.transformer),0.01);
    countryWrap.innerHTML=rows.map(r=>{
      const pct=(r.transformer/max*100).toFixed(1);
      return `<div class="p3-bar-row">
        <div class="p3-bar-lbl">${r.country}</div>
        <div class="p3-bar-track"><div class="p3-bar-fill" role="img" aria-label="${r.country} Transformer delta ${signed(r.transformer)} pp, SGD ${signed(r.sgd)} pp" data-w="${pct}" style="background:linear-gradient(90deg,#436289,#6caac4);width:0"><span>${signed(r.transformer)} pp</span></div></div>
        <div class="p3-bar-meta">SGD ${signed(r.sgd)}</div>
      </div>`;
    }).join('');
    animateBars(countryWrap);
  }

  const upliftWrap=document.getElementById('phase3-uplift-bars');
  if(upliftWrap){
    const max=Math.max(...rows.map(r=>r.full-r.quick),0.01);
    upliftWrap.innerHTML=rows.map(r=>{
      const uplift=r.full-r.quick;
      const pct=(uplift/max*100).toFixed(1);
      return `<div class="p3-bar-row">
        <div class="p3-bar-lbl">${r.country}</div>
        <div class="p3-bar-track"><div class="p3-bar-fill" role="img" aria-label="${r.country} quick to full uplift ${signed(uplift)} pp, quick delta ${signed(r.quick)} pp" data-w="${pct}" style="background:linear-gradient(90deg,#cc5536,#e4a3a1);width:0"><span>${signed(uplift)} pp</span></div></div>
        <div class="p3-bar-meta">Q ${signed(r.quick)}</div>
      </div>`;
    }).join('');
    animateBars(upliftWrap);
  }

  const heatmap=document.getElementById('phase3-heatmap');
  if(heatmap){
    const cols=[
      {key:'age_bin',label:'age_bin',rgb:'67,98,137'},
      {key:'sex',label:'sex',rgb:'108,170,196'}
    ];
    const max=Math.max(...rows.flatMap(r=>cols.map(c=>r[c.key])),0.01);
    heatmap.innerHTML=
      `<div class="p3-heatmap-head"><span></span>${cols.map(c=>`<span>${c.label}</span>`).join('')}</div>`+
      rows.map(r=>
        `<div class="p3-heatmap-row">
          <div class="p3-heatmap-country">${r.country}</div>
          ${cols.map(c=>{
            const val=r[c.key];
            const alpha=(0.22+(val/max)*0.62).toFixed(3);
            return `<div class="p3-heatmap-cell" role="img" aria-label="${r.country} ${c.label} grouped delta ${signed(val)} pp" style="background:rgba(${c.rgb},${alpha})"><strong>${signed(val)} pp</strong><span>${c.label}</span></div>`;
          }).join('')}
        </div>`
      ).join('');
  }
})();

/* ===== REPORT PACKAGE ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const pkg=RESEARCH_DATA.advisor_package;
  if(!pkg)return;
  const toolbar=document.getElementById('reports-toolbar');
  if(toolbar){
    const firstRecommended=pkg.recommended&&pkg.recommended[0];
    const actions=(pkg.toolbar_actions&&pkg.toolbar_actions.length
      ? pkg.toolbar_actions
      : [
          pkg.hub_path ? {label:'Open report hub', href:pkg.hub_path, primary:true} : null,
          pkg.bundle_zip ? {label:'Download advisor zip', href:pkg.bundle_zip} : null,
          pkg.raw_assets_hub ? {label:'Raw figure assets', href:pkg.raw_assets_hub} : null,
          firstRecommended ? {label:`Start with ${firstRecommended.label}`, href:firstRecommended.href} : null,
          pkg.package_index ? {label:'Package note', href:pkg.package_index} : null
        ].filter(Boolean)
    );
    toolbar.innerHTML=actions.map(action=>
      `<a class="report-toolbar-link${action.primary?' report-toolbar-link--primary':''}" href="${action.href}" target="_blank" rel="noopener noreferrer">${action.label}</a>`
    ).join('');
  }
  const statsWrap=document.getElementById('reports-stats');
  if(statsWrap){
    const zipSize=pkg.bundle_size_mb!=null?`${Number(pkg.bundle_size_mb).toFixed(1)} MB`:'—';
    const stats=pkg.stats||[
      {value:pkg.report_sets,label:'report sets'},
      {value:pkg.files,label:'package docs'},
      {value:pkg.result_json_artifacts,label:'result JSONs'},
      {value:pkg.raw_figure_assets,label:'raw figure assets'},
      {value:zipSize,label:'zip download'}
    ];
    statsWrap.innerHTML=stats.map(s=>
      `<div class="report-stat"><span class="report-stat-v">${s.value}</span><span class="report-stat-k">${s.label}</span></div>`
    ).join('');
  }
  const grid=document.getElementById('reports-grid');
  if(grid&&pkg.items){
    const order=['pdf','html','md','json'];
    grid.innerHTML=pkg.items.map(item=>
      (() => {
        const preferredKey=(item.recommended_format||'').toLowerCase();
        const fallbackKey=order.find(key=>item.links&&item.links[key]);
        const primaryKey=preferredKey&&item.links&&item.links[preferredKey]?preferredKey:fallbackKey;
        const primaryHref=primaryKey&&item.links?item.links[primaryKey]:'';
        return `<article class="report-card reveal">
        <div class="report-code">${item.code}</div>
        <h3>${primaryHref?`<a class="report-title-link" href="${primaryHref}" target="_blank" rel="noopener noreferrer">${item.title}</a>`:item.title}</h3>
        <p>${item.desc}</p>
        <div class="report-files">${item.files}</div>
        <div class="report-actions">
          ${order.filter(key=>item.links&&item.links[key]).map(key=>{
            const label=key.toUpperCase();
            const primary=item.recommended_format&&item.recommended_format.toLowerCase()===key;
            return `<a class="report-btn${primary?' report-btn--primary':''}" href="${item.links[key]}" target="_blank" rel="noopener noreferrer">${label}</a>`;
          }).join('')}
        </div>
      </article>`;
      })()
    ).join('');
  }
  activateReveal(document.getElementById('reports'));
})();

/* ===== BOOTSTRAP CI CHART ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const boot=RESEARCH_DATA.boot_income_activity;
  if(!boot)return;
  const wrap=document.getElementById('boot-ci-chart');
  if(!wrap)return;
  const groups=[
    {key:'low', label:'Low income',  color:'#436289'},
    {key:'mid', label:'Mid income',  color:'#6caac4'},
    {key:'high',label:'High income', color:'#8accc9'},
  ];
  const min=84,max=93;
  wrap.innerHTML=groups.map(g=>{
    const d=boot[g.key];if(!d)return '';
    const meanPct=((d.mean-min)/(max-min)*100).toFixed(1);
    const loPct=((d.ci_lower-min)/(max-min)*100).toFixed(1);
    const hiPct=((d.ci_upper-min)/(max-min)*100).toFixed(1);
    const rangePct=(parseFloat(hiPct)-parseFloat(loPct)).toFixed(1);
    return `<div class="ci-row">
      <div class="ci-lbl">${g.label}</div>
      <div class="ci-track">
        <div class="ci-range" data-lo="${loPct}" data-hi="${hiPct}" style="left:0%;width:0%;background:${g.color}22;border:1.5px solid ${g.color}55"></div>
        <div class="ci-mean" data-pos="${meanPct}" style="left:0%;background:${g.color}"></div>
      </div>
      <div class="ci-vals"><span style="color:${g.color};font-weight:600">${d.mean}%</span> <span class="ci-ci">[${d.ci_lower}–${d.ci_upper}]</span></div>
    </div>`;
  }).join('');
  // animate on scroll
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      wrap.querySelectorAll('.ci-range').forEach(el=>{
        el.style.transition='left 0.9s cubic-bezier(0.16,1,0.3,1),width 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.left=el.dataset.lo+'%';
        el.style.width=(parseFloat(el.dataset.hi)-parseFloat(el.dataset.lo))+'%';
      });
      wrap.querySelectorAll('.ci-mean').forEach(el=>{
        el.style.transition='left 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.left=el.dataset.pos+'%';
      });
      obs.unobserve(e.target);
    });
  },{threshold:0.3});
  obs.observe(wrap);
})();

/* ===== UK vs US BARS ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const d=RESEARCH_DATA;
  function renderBars(containerId,rows){
    const wrap=document.getElementById(containerId);
    if(!wrap)return;
    const minV=83,maxV=94;
    wrap.innerHTML=rows.map(r=>{
      if(r.val==null||isNaN(r.val))return '';
      const pct=((r.val-minV)/(maxV-minV)*100).toFixed(1);
      return `<div class="ukus-bar-row"><div class="ukus-bar-lbl">${r.label}</div><div class="ukus-bar-track"><div class="ukus-bar-fill" data-w="${pct}" style="background:${r.color};width:0"><span>${r.val}%</span></div></div></div>`;
    }).join('');
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          wrap.querySelectorAll('.ukus-bar-fill').forEach(f=>f.style.width=f.dataset.w+'%');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.3});
    obs.observe(wrap);
  }
  // UK bars — from b_income
  const bi=d.b_income||{};
  renderBars('ukus-bars-uk',[
    {label:'Low',   val:bi.low&&bi.low.activity,   color:'linear-gradient(90deg,#436289,#6caac4)'},
    {label:'Mid',   val:bi.mid&&bi.mid.activity,   color:'linear-gradient(90deg,#6caac4,#8accc9)'},
    {label:'High',  val:bi.high&&bi.high.activity,  color:'linear-gradient(90deg,#8accc9,#aad498)'},
  ]);
  // US bars — from deep_income (transformer)
  const di=d.deep_income||{};
  renderBars('ukus-bars-us',[
    {label:'Low',   val:di.low&&di.low.transformer,   color:'linear-gradient(90deg,#cc5536,#e09070)'},
    {label:'Mid',   val:di.mid&&di.mid.transformer,   color:'linear-gradient(90deg,#b0a060,#c8b878)'},
    {label:'High',  val:di.high&&di.high.transformer,  color:'linear-gradient(90deg,#568bc1,#8accc9)'},
  ]);
})();

/* ===== BACK TO TOP ===== */
(function(){
  const btn=document.getElementById('back-to-top');
  if(!btn)return;
  window.addEventListener('scroll',()=>{
    btn.classList.toggle('visible',window.scrollY>400);
  },{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:PREFER_REDUCED_MOTION?'auto':'smooth'}));
})();

/* ===== NAV SCROLL + SCROLL SPY ===== */
(function(){
  const nav=document.getElementById('nav');
  const navAs=document.querySelectorAll('.nav-links a[href^="#"]');
  const sections=[...navAs].map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll(){
    if(nav) nav.style.borderBottomColor=window.scrollY>10?'rgba(67,98,137,0.18)':'rgba(67,98,137,0.1)';
    // scroll spy
    const scrollMid=window.scrollY+window.innerHeight*0.35;
    let active=sections[0];
    sections.forEach(s=>{ if(s.offsetTop<=scrollMid) active=s; });
    navAs.forEach(a=>{
      const match=a.getAttribute('href')==='#'+active.id;
      a.classList.toggle('active',match);
      if(match)a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();

/* ===== CHANNEL BARS + E1 TABLE ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const d=RESEARCH_DATA;
  const CHDEFS=[
    {key:'location', label:'Location', sub:'3 classes',  grad:'linear-gradient(90deg,#6caac4,#8accc9)'},
    {key:'with_whom',label:'With Whom',sub:'7 classes',  grad:'linear-gradient(90deg,#7c83aa,#a6c9c1)'},
    {key:'enjoyment',label:'Enjoyment',sub:'7 levels',   grad:'linear-gradient(90deg,#bc9da8,#b0a0bb)'},
    {key:'activity', label:'Activity', sub:'37 classes', grad:'linear-gradient(90deg,#436289,#568bc1)'},
  ];
  const MDEFS=[
    {k:'majority',     l:'Majority (baseline)', base:true},
    {k:'naive_bayes',  l:'Naive Bayes'},
    {k:'logistic',     l:'Logistic Regression'},
    {k:'sgd',          l:'SGD'},
    {k:'random_forest',l:'Random Forest'},
    {k:'xgboost',      l:'XGBoost', best:true},
    {k:'markov',       l:'Markov (order=2)'},
  ];
  const CHKEYS=['activity','enjoyment','location','with_whom'];

  const barsWrap=document.getElementById('channel-bars');
  if(barsWrap){
    CHDEFS.forEach(ch=>{
      const v=d.e1[ch.key]&&d.e1[ch.key]['sgd'];
      if(!v)return;
      barsWrap.insertAdjacentHTML('beforeend',
        `<div class="ch-row">
          <div class="ch-meta">
            <div><span class="ch-name">${ch.label}</span> <span class="ch-sub">${ch.sub}</span></div>
            <span class="ch-pct">${Number(v).toFixed(1)}%</span>
          </div>
          <div class="ch-track"><div class="ch-fill" data-target="${v}" style="background:${ch.grad}"></div></div>
        </div>`);
    });
    const obs=new IntersectionObserver(e=>e.forEach(x=>{
      if(x.isIntersecting){
        if(PREFER_REDUCED_MOTION) x.target.style.width=x.target.dataset.target+'%';
        else x.target.style.width=x.target.dataset.target+'%';
        obs.unobserve(x.target);
      }
    }),{threshold:0.5});
    barsWrap.querySelectorAll('.ch-fill').forEach(f=>{
      if(PREFER_REDUCED_MOTION){f.style.transition='none';}
      obs.observe(f);
    });
  }

  const tbody=document.getElementById('e1-tbody');
  if(tbody){
    MDEFS.forEach(m=>{
      const cells=CHKEYS.map(ch=>{
        const v=d.e1[ch]&&d.e1[ch][m.k];
        return `<td data-ch="${ch}" data-v="${v!=null?v:''}">${v!=null?v:'\u2014'}</td>`;
      }).join('');
      tbody.insertAdjacentHTML('beforeend',
        `<tr class="${m.base?'tr-base':m.best?'tr-best':''}">
          <td>${m.l}</td>${cells}
        </tr>`);
    });
    // highlight best per column
    CHKEYS.forEach(ch=>{
      const cells=[...tbody.querySelectorAll(`td[data-ch="${ch}"]`)].filter(td=>td.dataset.v!=='');
      const best=cells.reduce((a,b)=>parseFloat(b.dataset.v)>parseFloat(a.dataset.v)?b:a,cells[0]);
      if(best)best.classList.add('best');
    });
  }
})();

/* ===== HOURLY ERROR CHART ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const hourly=RESEARCH_DATA.hourly_errors;
  if(!hourly||!hourly.length)return;
  const wrap=document.getElementById('hourly-chart');
  const axis=document.getElementById('hourly-axis');
  if(!wrap)return;
  const max=Math.max(...hourly.map(h=>h.error_rate));
  // tooltip element
  const tip=document.createElement('div');
  tip.className='h-tooltip';
  wrap.parentElement.style.position='relative';
  wrap.parentElement.appendChild(tip);
  hourly.forEach(h=>{
    const pct=h.error_rate/max*100;
    const hot=h.error_rate>12;
    const bar=document.createElement('div');
    bar.className='h-bar';
    bar.style.cssText=`height:${pct}%;background:${hot?'rgba(204,85,54,0.75)':'rgba(67,98,137,0.28)'}`;
    bar.setAttribute('role','img');
    bar.setAttribute('aria-label',`${h.hour}: ${h.error_rate.toFixed(1)}% error`);
    bar.addEventListener('mouseenter',e=>{
      tip.textContent=`${h.hour}  ${h.error_rate.toFixed(1)}%`;
      tip.style.cssText='display:block;position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#1a2030;color:#f7f6f2;font-family:var(--mono);font-size:0.62rem;padding:0.3rem 0.6rem;border-radius:4px;border:1px solid rgba(67,98,137,0.2);white-space:nowrap;pointer-events:none;';
    });
    bar.addEventListener('mouseleave',()=>{ tip.style.display='none'; });
    wrap.appendChild(bar);
  });
  if(axis)['06:00','09:00','12:00','15:00','18:00','21:00','00:00','03:00'].forEach(l=>{
    const s=document.createElement('span');s.textContent=l;axis.appendChild(s);
  });
})();

/* ===== GROUP CHARTS ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const d=RESEARCH_DATA;
  const bi=d.b_income,be=d.b_econstat,bs=d.b_sex,di=d.deep_income;
  const TABS={
    income:{rows:[
      {label:'Low income', val:bi.low&&bi.low.activity,   color:'#436289'},
      {label:'Mid income', val:bi.mid&&bi.mid.activity,   color:'#6caac4'},
      {label:'High income',val:bi.high&&bi.high.activity,  color:'#8accc9'},
    ],note:`<strong>Income is the strongest structural axis (5.26 pp gap).</strong> Low-income groups live highly constrained, predictable lives \u2014 SGD achieves <strong>${Number(bi.low&&bi.low.activity).toFixed(1)}%</strong>. High-income groups exhibit richer complexity: <strong>${Number(bi.high&&bi.high.activity).toFixed(1)}%</strong>. Non-overlapping Bootstrap 95% CIs confirm significance.`},
    econstat:{rows:[
      {label:'Employed',        val:be.employed&&be.employed.activity,             color:'#436289'},
      {label:'Student',         val:be.student&&be.student.activity,               color:'#6caac4'},
      {label:'Retired',         val:be.retired&&be.retired.activity,               color:'#7c83aa'},
      {label:'Unemployed/Sick', val:be.unemployed_sick&&be.unemployed_sick.activity,color:'#cc5536'},
      {label:'Homemaker',       val:be.homemaker&&be.homemaker.activity,            color:'#b8b283'},
    ],note:`<strong>Employment status shows a 3.44 pp gap.</strong> Employed at <strong>${Number(be.employed&&be.employed.activity).toFixed(2)}%</strong>. Homemakers at <strong>${Number(be.homemaker&&be.homemaker.activity).toFixed(2)}%</strong>. Work schedules are the primary structural constraint on daily life.`},
    sex:(()=>{
      const ps=d.us_pooled_sex||{};
      return {rows:[
        {label:'Male (UK SGD)',        val:bs.male&&bs.male.activity,              color:'#436289'},
        {label:'Female (UK SGD)',      val:bs.female&&bs.female.activity,            color:'#bc9da8'},
        {label:'Male (US pooled TF)',  val:ps.male&&ps.male.activity_model,          color:'#2d4a6e'},
        {label:'Female (US pooled TF)',val:ps.female&&ps.female.activity_model,       color:'#9b6fa8'},
      ],note:`<strong>Gender effects are sample-dependent.</strong> UK gap: <strong>0.46 pp</strong> (Male ${Number(bs.male&&bs.male.activity).toFixed(2)}% vs Female ${Number(bs.female&&bs.female.activity).toFixed(2)}%). US pooled activity: male <strong>${Number(ps.male&&ps.male.activity_model).toFixed(2)}%</strong> (\u0394=+${Number(ps.male&&ps.male.activity_delta).toFixed(2)} pp), female <strong>${Number(ps.female&&ps.female.activity_model).toFixed(2)}%</strong> (\u0394=+${Number(ps.female&&ps.female.activity_delta).toFixed(2)} pp). <strong>Full ATUS dataset: male = female = 87.51%</strong>, so the gap vanishes at full scale.`};
    })(),
    age:(()=>{
      const pa=d.us_pooled_age||{};
      return {rows:[
        {label:'Young (US pooled)',  val:pa.young&&pa.young.activity_model,  color:'#6caac4'},
        {label:'Middle (US pooled)', val:pa.middle&&pa.middle.activity_model, color:'#436289'},
        {label:'Old (US pooled)',    val:pa.old&&pa.old.activity_model,       color:'#2d4a6e'},
      ],note:`<strong>Age gradient: older = more predictable.</strong> Old: <strong>${Number(pa.old&&pa.old.activity_model).toFixed(2)}%</strong> (\u0394=+${pa.old&&pa.old.activity_delta}pp vs persistence). Location gap even stronger: old location <strong>${Number(pa.old&&pa.old.location_model).toFixed(2)}%</strong> (\u0394=+${pa.old&&pa.old.location_delta}pp). US pooled 2003\u20132024.`};
    })(),
    temporal:(()=>{
      const pt=d.us_pooled_temporal||{};
      return {rows:[
        {label:'Weekday (US pooled)',  val:pt.weekday&&pt.weekday.activity_model,  color:'#436289'},
        {label:'Weekend (US pooled)',  val:pt.weekend&&pt.weekend.activity_model,  color:'#7c83aa'},
        {label:'Pre-COVID (2003–19)',  val:pt.pre_covid&&pt.pre_covid.activity_model, color:'#2d7a4f'},
      ],note:`<strong>Pre-COVID achieves highest delta (+0.52 pp, n_train=1.18M).</strong> Weekend activity slightly higher (84.80% vs 84.59%). Weekend <em>location</em> gain largest: <strong>+${Number(pt.weekend&&pt.weekend.location_delta).toFixed(2)} pp</strong> over persistence. Pre-COVID regularity is maximally learnable — COVID disrupted the social routines that make life predictable. US pooled 2003–2024.`};
    })(),
    deep:{rows:[
      {label:'Low: SGD',         val:di.low&&di.low.sgd,         color:'#436289aa'},
      {label:'Low: Transformer', val:di.low&&di.low.transformer,  color:'#436289'},
      {label:'Mid: SGD',         val:di.mid&&di.mid.sgd,         color:'#6caac4aa'},
      {label:'Mid: Transformer', val:di.mid&&di.mid.transformer,  color:'#6caac4'},
      {label:'High: SGD',        val:di.high&&di.high.sgd,        color:'#8accc9aa'},
      {label:'High: Transformer',val:di.high&&di.high.transformer,color:'#8accc9'},
    ],note:`<strong>Deep models help only where life is complex.</strong> High-income Transformer: <strong>${Number(di.high&&di.high.transformer).toFixed(2)}%</strong> vs SGD: <strong>${Number(di.high&&di.high.sgd).toFixed(2)}%</strong>. Low-income lift: <0.03 pp. Deep models expose hidden behavioural complexity invisible to linear models.`},
  };
  const chartEl=document.getElementById('groups-chart');
  const noteEl=document.getElementById('groups-note');
  function renderTab(key){
    if(!chartEl)return;
    const tab=TABS[key];if(!tab)return;
    const minV=83,maxV=93;
    chartEl.innerHTML=tab.rows.map(r=>{
      if(r.val==null)return '';
      const pct=((r.val-minV)/(maxV-minV)*100).toFixed(1);
      return `<div class="gc-row"><div class="gc-lbl">${r.label}</div><div class="gc-bars"><div class="gc-track"><div class="gc-fill" data-w="${pct}" style="background:${r.color};width:0"><span>${Number(r.val).toFixed(1)}%</span></div></div></div></div>`;
    }).join('');
    // fade note transition
    if(noteEl){
      noteEl.classList.add('fading');
      setTimeout(()=>{ noteEl.innerHTML=tab.note; noteEl.classList.remove('fading'); },220);
    }
    setTimeout(()=>chartEl.querySelectorAll('.gc-fill').forEach(f=>f.style.width=f.dataset.w+'%'),60);
  }
  document.querySelectorAll('.gtab').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.gtab').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false');});
    t.classList.add('active');t.setAttribute('aria-selected','true');renderTab(t.dataset.tab);
  }));
  // keyboard nav for tabs
  document.querySelector('.gtabs')&&document.querySelector('.gtabs').addEventListener('keydown',e=>{
    const tabs=[...document.querySelectorAll('.gtab')];
    const idx=tabs.indexOf(document.activeElement);
    if(idx===-1)return;
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();const next=tabs[(idx+1)%tabs.length];next.focus();next.click();}
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();const prev=tabs[(idx-1+tabs.length)%tabs.length];prev.focus();prev.click();}
  });
  renderTab('income');
})();

/* ===== DEMO TIMELINE (animated) ===== */
(function(){
  const ACTS=[
    {id:'sleep',    l:'Sleep',        c:'#d0cfc8'},
    {id:'work',     l:'Work',         c:'#436289'},
    {id:'meal',     l:'Meal',         c:'#b8b283'},
    {id:'commute',  l:'Commute',      c:'#7c83aa'},
    {id:'leisure',  l:'Leisure',      c:'#8accc9'},
    {id:'housework',l:'Housework',    c:'#bc9da8'},
    {id:'childcare',l:'Childcare',    c:'#cc5536'},
    {id:'personal', l:'Personal care',c:'#6caac4'},
    {id:'social',   l:'Social',       c:'#aad498'},
    {id:'education',l:'Education',    c:'#568bc1'},
  ];
  const fill=(s,a,b,v)=>{for(let i=a;i<b&&i<144;i++)s[i]=v;};
  function buildDay(inc,eco,sex,day){
    const s=new Array(144).fill('sleep');
    if(eco==='employed'){
      if(day==='weekend'){fill(s,0,34,'sleep');fill(s,34,40,'personal');fill(s,40,46,'meal');fill(s,46,90,'leisure');fill(s,90,96,'meal');fill(s,96,inc==='high'?120:108,'social');fill(s,inc==='high'?120:108,132,'leisure');fill(s,132,144,'sleep');}
      else{fill(s,0,28,'sleep');fill(s,28,32,'personal');fill(s,32,38,'meal');fill(s,38,44,'commute');fill(s,44,96,'work');fill(s,96,102,'commute');fill(s,102,108,'meal');if(inc==='high'){fill(s,108,114,'social');fill(s,114,132,'leisure');}else{fill(s,108,120,'leisure');if(sex==='female')fill(s,120,126,'housework');fill(s,126,132,'leisure');}fill(s,132,144,'sleep');}}
    else if(eco==='retired'){fill(s,0,30,'sleep');fill(s,30,36,'personal');fill(s,36,42,'meal');fill(s,42,54,'leisure');fill(s,54,66,'housework');fill(s,66,72,'meal');fill(s,72,96,'leisure');fill(s,96,102,'social');fill(s,102,108,'meal');fill(s,108,120,'leisure');fill(s,120,144,'sleep');}
    else if(eco==='student'){fill(s,0,28,'sleep');fill(s,28,34,'personal');fill(s,34,40,'meal');fill(s,40,day==='weekend'?55:78,'education');if(day==='weekend')fill(s,55,90,'leisure');fill(s,78,84,'meal');fill(s,84,108,'leisure');fill(s,108,114,'meal');fill(s,114,126,'education');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    else if(eco==='homemaker'){fill(s,0,28,'sleep');fill(s,28,34,'personal');fill(s,34,40,'meal');fill(s,40,66,'housework');fill(s,66,72,'childcare');fill(s,72,78,'meal');fill(s,78,96,'housework');fill(s,96,108,'leisure');fill(s,108,114,'meal');fill(s,114,126,'childcare');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    else{fill(s,0,36,'sleep');fill(s,36,42,'personal');fill(s,42,48,'meal');fill(s,48,72,'leisure');fill(s,72,84,'housework');fill(s,84,90,'meal');fill(s,90,120,'leisure');fill(s,120,126,'meal');fill(s,126,132,'leisure');fill(s,132,144,'sleep');}
    return s;
  }
  const color=id=>{const a=ACTS.find(x=>x.id===id);return a?a.c:'#ccc';};
  const lbl=id=>{const a=ACTS.find(x=>x.id===id);return a?a.l:id;};
  const getSel=ctrl=>{const el=document.querySelector(`[data-ctrl="${ctrl}"] .dp2-opt.active`);return el&&el.dataset.v;};
  document.querySelectorAll('.dp2-opts').forEach(grp=>{
    grp.addEventListener('click',e=>{
      const btn=e.target.closest('.dp2-opt');if(!btn)return;
      grp.querySelectorAll('.dp2-opt').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  let animFrame=null;
  function runAnimation(slots,acc){
    const tlEl=document.getElementById('demo2-tl');
    const timeEl=document.getElementById('demo2-time');
    const actEl=document.getElementById('demo2-act');
    const accEl=document.getElementById('demo2-acc');
    const slotsEl=document.getElementById('demo2-slots');
    const actsEl=document.getElementById('demo2-acts');
    const legendEl=document.getElementById('demo2-legend');
    const runBtn=document.getElementById('run-sim');
    if(!tlEl)return;
    if(animFrame)cancelAnimationFrame(animFrame);
    tlEl.innerHTML='';
    const segs=[];
    let cur={act:slots[0],start:0,end:1};
    for(let i=1;i<slots.length;i++){
      if(slots[i]===cur.act)cur.end=i+1;
      else{segs.push({...cur});cur={act:slots[i],start:i,end:i+1};}
    }
    segs.push(cur);
    const segEls=segs.map(s=>{
      const div=document.createElement('div');
      div.className='demo2-tl-seg';
      div.style.background=color(s.act);
      div.style.width='0';
      tlEl.appendChild(div);
      return {el:div,target:(s.end-s.start)/144*100,act:s.act,start:s.start,end:s.end};
    });
    const cursor=document.createElement('div');
    cursor.className='demo2-tl-cursor';
    cursor.style.left='0';
    tlEl.appendChild(cursor);
    const TOTAL_MS=3200;
    const startTime=performance.now();
    if(runBtn)runBtn.classList.add('running');
    function step(now){
      const elapsed=now-startTime;
      const p=Math.min(elapsed/TOTAL_MS,1);
      const ease=p<1?1-Math.pow(1-p,2.5):1;
      const curSlot=Math.floor(ease*144);
      segEls.forEach(s=>{
        if(s.start>=curSlot){s.el.style.width='0';}
        else if(s.end<=curSlot){s.el.style.width=s.target+'%';}
        else{const partial=(curSlot-s.start)/(s.end-s.start)*s.target;s.el.style.width=partial+'%';}
      });
      const h=Math.floor(curSlot/6);
      const m=(curSlot%6)*10;
      if(timeEl)timeEl.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
      const curAct=slots[Math.min(curSlot,143)];
      if(actEl)actEl.textContent=lbl(curAct);
      cursor.style.left=(curSlot/144*100)+'%';
      if(p<1){
        animFrame=requestAnimationFrame(step);
      } else {
        if(runBtn)runBtn.classList.remove('running');
        if(timeEl)timeEl.textContent='24:00';
        if(actEl)actEl.textContent='Day complete — prediction done';
        cursor.style.left='100%';
        const distinct=[...new Set(slots)].length;
        if(accEl)accEl.textContent=acc?acc+'%':'—';
        if(slotsEl)slotsEl.textContent='144';
        if(actsEl)actsEl.textContent=String(distinct);
        // activity breakdown bar
        const bdEl=document.getElementById('demo2-breakdown');
        if(bdEl){
          const counts={};
          slots.forEach(a=>{counts[a]=(counts[a]||0)+1;});
          const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
          bdEl.innerHTML=sorted.map(([id,n])=>`<div class="demo2-breakdown-seg" style="width:${n/144*100}%;background:${color(id)}" title="${lbl(id)}: ${Math.round(n/144*100)}%"></div>`).join('');
        }
        if(legendEl){
          const used=[...new Set(slots)];
          const counts2={};
          slots.forEach(a=>{counts2[a]=(counts2[a]||0)+1;});
          const sorted2=used.sort((a,b)=>(counts2[b]||0)-(counts2[a]||0));
          legendEl.innerHTML=sorted2.map(id=>`<div class="demo2-li"><div class="demo2-dot" style="background:${color(id)}"></div><span>${lbl(id)} <span style="opacity:0.55">${Math.round((counts2[id]||0)/144*100)}%</span></span></div>`).join('');
        }
      }
    }
    animFrame=requestAnimationFrame(step);
  }
  const runBtn=document.getElementById('run-sim');
  if(runBtn)runBtn.addEventListener('click',()=>{
    const inc=getSel('income')||'low';
    const eco=getSel('econstat')||'employed';
    const sex=getSel('sex')||'male';
    const day=getSel('day')||'weekday';
    const slots=buildDay(inc,eco,sex,day);
    let acc=null;
    if(typeof RESEARCH_DATA!=='undefined'){try{acc=RESEARCH_DATA.b_income[inc]&&RESEARCH_DATA.b_income[inc].activity;}catch(e){}}
    runAnimation(slots,acc);
    if(typeof window._swarmStart==='function')window._swarmStart(inc,eco,sex,day);
  });
})();

/* ===== PHASE2 + INERTIA VIS ===== */
(function(){
  if(typeof RESEARCH_DATA==='undefined')return;
  const comp=RESEARCH_DATA.inertia_compare;
  if(!comp)return;
  const wrap=document.getElementById('inertia-bars');
  if(!wrap)return;

  const rows=[
    {k:'uk_activity',label:'UK Activity (10-min)'},
    {k:'us_activity',label:'US Activity (10-min)'},
    {k:'us_location',label:'US Location (10-min)'},
    {k:'us_activity_coarse',label:'US Activity (coarse)'},
    {k:'us_activity_30min',label:'US Activity (30-min)'}
  ];

  wrap.innerHTML=rows.map(r=>{
    const d=comp[r.k];
    if(!d)return '';
    return `<div class="ib-row">
      <div class="ib-head"><span class="ib-title">${r.label}</span><span class="ib-ds">${d.dataset}</span></div>
      <div class="ib-tracks">
        <div class="ib-line"><span class="ib-lbl">Model</span><div class="ib-track"><div class="ib-fill model" data-w="${d.model}"><span>${d.model.toFixed(2)}%</span></div></div></div>
        <div class="ib-line"><span class="ib-lbl">Persistence</span><div class="ib-track"><div class="ib-fill base" data-w="${d.persistence}"><span>${d.persistence.toFixed(2)}%</span></div></div></div>
      </div>
      <div class="ib-delta ${d.model>=d.persistence?'good':'bad'}">Δ ${(d.model-d.persistence).toFixed(2)} pp</div>
    </div>`;
  }).join('');

  // animate inertia bars when they scroll into view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.ib-fill').forEach(el => {
          el.style.width = Math.max(0, Math.min(100, parseFloat(el.dataset.w))) + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  wrap.querySelectorAll('.ib-row').forEach(row => observer.observe(row));
  // also trigger immediately if already in view
  if(PREFER_REDUCED_MOTION) wrap.querySelectorAll('.ib-fill').forEach(el=>el.style.width=Math.max(0,Math.min(100,parseFloat(el.dataset.w)))+'%');
})();

/* ===== CITY SWARM SIMULATION ===== */
(function(){
  const ACTS=[
    {id:'sleep',    l:'Sleep',        c:'#b8bec9'},
    {id:'work',     l:'Work',         c:'#768eaf'},
    {id:'meal',     l:'Meal',         c:'#b6af95'},
    {id:'commute',  l:'Commute',      c:'#9a9fb1'},
    {id:'leisure',  l:'Leisure',      c:'#8fb4a8'},
    {id:'housework',l:'Housework',    c:'#b5a7b3'},
    {id:'childcare',l:'Childcare',    c:'#c19b93'},
    {id:'personal', l:'Personal care',c:'#91afc2'},
    {id:'social',   l:'Social',       c:'#9fb8a3'},
    {id:'education',l:'Education',    c:'#8297bc'},
  ];
  const ZONES={
    sleep:    {x:0.03,y:0.56,w:0.22,h:0.38,label:'Residential'},
    personal: {x:0.03,y:0.56,w:0.22,h:0.38,label:'Residential'},
    housework:{x:0.03,y:0.56,w:0.22,h:0.38,label:'Residential'},
    childcare:{x:0.30,y:0.68,w:0.14,h:0.24,label:'Nursery'},
    meal:     {x:0.30,y:0.30,w:0.14,h:0.22,label:'Cafes & Dining'},
    commute:  {x:0.48,y:0.52,w:0.11,h:0.13,label:'Transit Hub'},
    work:     {x:0.63,y:0.08,w:0.33,h:0.30,label:'Business District'},
    education:{x:0.63,y:0.44,w:0.20,h:0.22,label:'University'},
    leisure:  {x:0.03,y:0.08,w:0.24,h:0.34,label:'City Park'},
    social:   {x:0.63,y:0.70,w:0.33,h:0.24,label:'Social Quarter'},
  };
  const fillS=(s,a,b,v)=>{for(let i=a;i<b&&i<144;i++)s[i]=v;};
  function buildDay(inc,eco,sex,day){
    const s=new Array(144).fill('sleep');
    if(eco==='employed'){
      if(day==='weekend'){fillS(s,0,34,'sleep');fillS(s,34,40,'personal');fillS(s,40,46,'meal');fillS(s,46,90,'leisure');fillS(s,90,96,'meal');fillS(s,96,inc==='high'?120:108,'social');fillS(s,inc==='high'?120:108,132,'leisure');fillS(s,132,144,'sleep');}
      else{fillS(s,0,28,'sleep');fillS(s,28,32,'personal');fillS(s,32,38,'meal');fillS(s,38,44,'commute');fillS(s,44,96,'work');fillS(s,96,102,'commute');fillS(s,102,108,'meal');if(inc==='high'){fillS(s,108,114,'social');fillS(s,114,132,'leisure');}else{fillS(s,108,120,'leisure');if(sex==='female')fillS(s,120,126,'housework');fillS(s,126,132,'leisure');}fillS(s,132,144,'sleep');}}
    else if(eco==='retired'){fillS(s,0,30,'sleep');fillS(s,30,36,'personal');fillS(s,36,42,'meal');fillS(s,42,54,'leisure');fillS(s,54,66,'housework');fillS(s,66,72,'meal');fillS(s,72,96,'leisure');fillS(s,96,102,'social');fillS(s,102,108,'meal');fillS(s,108,120,'leisure');fillS(s,120,144,'sleep');}
    else if(eco==='student'){fillS(s,0,28,'sleep');fillS(s,28,34,'personal');fillS(s,34,40,'meal');fillS(s,40,day==='weekend'?55:78,'education');if(day==='weekend')fillS(s,55,90,'leisure');fillS(s,78,84,'meal');fillS(s,84,108,'leisure');fillS(s,108,114,'meal');fillS(s,114,126,'education');fillS(s,126,132,'leisure');fillS(s,132,144,'sleep');}
    else if(eco==='homemaker'){fillS(s,0,28,'sleep');fillS(s,28,34,'personal');fillS(s,34,40,'meal');fillS(s,40,66,'housework');fillS(s,66,72,'childcare');fillS(s,72,78,'meal');fillS(s,78,96,'housework');fillS(s,96,108,'leisure');fillS(s,108,114,'meal');fillS(s,114,126,'childcare');fillS(s,126,132,'leisure');fillS(s,132,144,'sleep');}
    else{fillS(s,0,36,'sleep');fillS(s,36,42,'personal');fillS(s,42,48,'meal');fillS(s,48,72,'leisure');fillS(s,72,84,'housework');fillS(s,84,90,'meal');fillS(s,90,120,'leisure');fillS(s,120,126,'meal');fillS(s,126,132,'leisure');fillS(s,132,144,'sleep');}
    return s;
  }
  function rndZ(zid,W,H){const z=ZONES[zid]||ZONES.sleep;const p=0.014;return{x:(z.x+p+Math.random()*Math.max(0.001,z.w-p*2))*W,y:(z.y+p+Math.random()*Math.max(0.001,z.h-p*2))*H};}
  function zBounds(zid,W,H){const z=ZONES[zid]||ZONES.sleep;return{x1:z.x*W+5,y1:z.y*H+5,x2:(z.x+z.w)*W-5,y2:(z.y+z.h)*H-5};}
  function slotToTime(s){const m=(s*10)%(24*60);return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
  function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
  function h2r(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return r+','+g+','+b;}
  const N=2000;
  let particles=[],slot=0,running=false,rafId=null,lastTs=null,accumulated=0,msPerSlot=150;
  let canvas,ctx,W,H,frameN=0,DPR=1;
  let particleStride=1;
  let autoMode=false,fpsEMA=60;

  function initParticles(inc,eco,sex,day){
    particles=[];
    const incs=['low','mid','high'],ecos=['employed','retired','student','homemaker','unemployed'];
    for(let i=0;i<N;i++){
      const pi=Math.random()<0.6?inc:incs[i%3];
      const pe=Math.random()<0.6?eco:ecos[i%5];
      const ps=Math.random()<0.78?sex:(sex==='male'?'female':'male');
      const sched=buildDay(pi,pe,ps,day);
      const act=sched[0];
      const pos=rndZ(act,W,H);
      particles.push({
        x:pos.x,y:pos.y,
        tx:pos.x,ty:pos.y,
        act,sched,
        r:0.75+Math.random()*0.5,
        phase:Math.random()*Math.PI*2,
        moveT:1.0
      });
    }
  }

  function advanceSlot(){
    slot=(slot+1)%144;
    particles.forEach(p=>{
      const na=p.sched[slot]||'sleep';
      if(na!==p.act){
        p.act=na;
        const np=rndZ(na,W,H);
        p.tx=np.x; p.ty=np.y;
        p.moveT=0;
      }
    });
  }

  function updateParticlePositions(){
    const ease=0.028;
    particles.forEach(p=>{
      if(p.moveT<1){
        p.moveT=Math.min(1,p.moveT+ease);
      }
      // smooth lerp toward target always
      p.x+=(p.tx-p.x)*0.05;
      p.y+=(p.ty-p.y)*0.05;
      // gentle idle drift inside zone
      if(p.moveT>=1){
        const b=zBounds(p.act,W,H);
        const idleX=p.tx+Math.sin(frameN*0.018+p.phase)*3.5;
        const idleY=p.ty+Math.cos(frameN*0.015+p.phase)*3.5;
        p.tx=Math.max(b.x1,Math.min(b.x2,idleX));
        p.ty=Math.max(b.y1,Math.min(b.y2,idleY));
      }
    });
  }

  function slotToTimeFloat(sf){
    const mins=((sf*10)%(24*60)+24*60)%(24*60);
    const h=Math.floor(mins/60);
    const m=Math.floor(mins%60);
    return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
  }

  function drawZones(){
    const done=new Set();
    Object.entries(ZONES).forEach(([id,z])=>{
      const key=z.x+','+z.y;
      if(done.has(key))return;done.add(key);
      const act=ACTS.find(a=>a.id===id);
      const c=act?act.c:'#436289';
      const rgb=h2r(c);
      const px=z.x*W,py=z.y*H,pw=z.w*W,ph=z.h*H;
      ctx.save();
      const grad=ctx.createLinearGradient(px,py,px+pw,py+ph);
      grad.addColorStop(0,'rgba('+rgb+',0.045)');
      grad.addColorStop(1,'rgba('+rgb+',0.02)');
      ctx.fillStyle=grad;
      rr(ctx,px,py,pw,ph,10);ctx.fill();
      ctx.shadowColor='rgba('+rgb+',0.0)';ctx.shadowBlur=0;
      ctx.strokeStyle='rgba('+rgb+',0.34)';ctx.lineWidth=1;
      rr(ctx,px,py,pw,ph,10);ctx.stroke();
      ctx.shadowBlur=0;
      ctx.font='600 11px "JetBrains Mono",monospace';ctx.textAlign='left';
      ctx.fillStyle='rgba(68,82,110,0.92)';
      ctx.fillText(z.label,px+10,py+18);
      const shareIds=Object.keys(ZONES).filter(k=>ZONES[k].x===z.x&&ZONES[k].y===z.y);
      const otherActs=[...new Set(shareIds)].filter(k=>k!==id);
      const zoneActs=[id,...otherActs].map(k=>{const a=ACTS.find(x=>x.id===k);return a?a.l:k;});
      if(zoneActs.length){
        ctx.fillStyle='rgba(102,116,142,0.55)';
        ctx.font='500 7px "JetBrains Mono",monospace';
        ctx.fillText(zoneActs.join(' · '),px+10,py+29);
      }
      ctx.restore();
    });
  }

  function drawRoads(){
    const pairs=[['sleep','commute'],['commute','work'],['commute','meal'],['leisure','commute'],['commute','education'],['social','commute'],['childcare','commute']];
    ctx.save();
    ctx.strokeStyle='rgba(101,128,176,0.035)';ctx.lineWidth=1;ctx.setLineDash([2,10]);
    pairs.forEach(([a,b])=>{
      const za=ZONES[a],zb=ZONES[b];if(!za||!zb)return;
      ctx.beginPath();
      ctx.moveTo((za.x+za.w/2)*W,(za.y+za.h/2)*H);
      ctx.lineTo((zb.x+zb.w/2)*W,(zb.y+zb.h/2)*H);
      ctx.stroke();
    });
    ctx.setLineDash([]);ctx.restore();
  }

  function drawBadges(){
    const counts={};
    particles.forEach(p=>{counts[p.act]=(counts[p.act]||0)+1;});
    const done=new Set();
    Object.entries(ZONES).forEach(([id,z])=>{
      const key=z.x+','+z.y;
      if(done.has(key))return;done.add(key);
      const share=Object.keys(ZONES).filter(k=>ZONES[k].x===z.x&&ZONES[k].y===z.y);
      const cnt=share.reduce((s,k)=>s+(counts[k]||0),0);
      if(!cnt)return;
      const pct=Math.round(cnt/N*100);
      const act=ACTS.find(a=>a.id===id);
      const bc=act?act.c:'#436289';
      const rgb=h2r(bc);
      const bx=(z.x+z.w)*W-4,by=z.y*H+20;
      ctx.save();
      ctx.shadowColor='rgba('+rgb+',0.0)';ctx.shadowBlur=0;
      ctx.fillStyle='rgba('+rgb+',0.55)';
      rr(ctx,bx-30,by-10,30,16,8);ctx.fill();
      ctx.shadowBlur=0;
      ctx.fillStyle='rgba(255,255,255,0.92)';
      ctx.font='600 8px "JetBrains Mono",monospace';ctx.textAlign='center';
      ctx.fillText(pct+'%',bx-15,by+2.8);
      ctx.restore();
    });
  }

  function drawParticles(){
    // batch by activity color to minimize fillStyle switches
    const groups={};
    particles.forEach(p=>{
      if(!groups[p.act])groups[p.act]=[];
      groups[p.act].push(p);
    });
    Object.entries(groups).forEach(([actId,ps])=>{
      const act=ACTS.find(a=>a.id===actId);
      const c=act?act.c:'#888';
      ctx.fillStyle=c+'b8'; // ~72% opacity via hex alpha
      ctx.beginPath();
      for(let i=0;i<ps.length;i+=particleStride){
        const p=ps[i];
        ctx.moveTo(p.x+p.r,p.y);
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      }
      ctx.fill();
    });
  }

  function loop(ts){
    if(!running)return;
    if(lastTs===null)lastTs=ts;
    const dt=ts-lastTs;
    if(dt>0&&dt<1000){
      const fps=1000/dt;
      fpsEMA=fpsEMA*0.9+fps*0.1;
      if(autoMode){
        if(fpsEMA<40)particleStride=3;
        else if(fpsEMA<52)particleStride=2;
        else particleStride=1;
      }
      const perfEl=document.getElementById('swarm-perf');
      if(perfEl&&autoMode){
        perfEl.textContent='FPS '+Math.round(fpsEMA)+' · S'+particleStride;
      }
    }
    accumulated+=dt;lastTs=ts;
    while(accumulated>=msPerSlot){
      accumulated-=msPerSlot;
      advanceSlot();
      frameN++;
    }
    updateParticlePositions();

    ctx.fillStyle='rgba(247,249,252,0.78)';ctx.fillRect(0,0,W,H);

    drawZones();drawRoads();drawBadges();drawParticles();

    const slotFloat=slot+(accumulated/msPerSlot);
    const timeEl=document.getElementById('swarm-time');
    if(timeEl){
      timeEl.textContent=slotToTimeFloat(slotFloat);
      const phaseEl=document.getElementById('swarm-phase');
      const h=Math.floor(((slotFloat*10)/60)%24);
      const phase=h<6?'Night':h<12?'Morning':h<18?'Afternoon':'Evening';
      if(phaseEl)phaseEl.textContent=phase;
    }
    const progressEl=document.getElementById('swarm-progress');
    if(progressEl){
      progressEl.style.width=((slotFloat%144)/143*100).toFixed(1)+'%';
    }
    rafId=requestAnimationFrame(loop);
  }

  function resizeCanvas(){
    if(!canvas)return;
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    DPR=dpr;
    W=canvas.offsetWidth;
    H=canvas.offsetHeight;
    canvas.width=Math.floor(W*dpr);
    canvas.height=Math.floor(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=true;
  }

  function startSim(inc,eco,sex,day){
    slot=0;lastTs=null;accumulated=0;frameN=0;
    resizeCanvas();
    ctx.fillStyle='#f7f9fc';ctx.fillRect(0,0,W,H);
    const pb=document.getElementById('swarm-progress');
    if(pb)pb.style.width='0%';
    initParticles(inc,eco,sex,day);
    updateParticlePositions();
    if(!running){running=true;rafId=requestAnimationFrame(loop);}
  }
  function stopSim(){running=false;if(rafId)cancelAnimationFrame(rafId);rafId=null;}

  window._swarmStart=function(inc,eco,sex,day){
    stopSim();
    const sec=document.getElementById('swarm-section');
    if(sec)sec.scrollIntoView({behavior:'smooth',block:'nearest'});
    setTimeout(()=>startSim(inc,eco,sex,day),200);
  };

  canvas=document.getElementById('swarm-canvas');
  if(!canvas)return;
  ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
  resizeCanvas();

  // populate legend
  const legendEl=document.getElementById('swarm-legend');
  if(legendEl)legendEl.innerHTML=ACTS.map(a=>`<div class="swarm-li"><div class="swarm-dot" style="background:${a.c}"></div><span>${a.l}</span></div>`).join('');

  document.getElementById('swarm-play')?.addEventListener('click',()=>{
    const btn=document.getElementById('swarm-play');
    if(running){
      stopSim();
      if(btn)btn.innerHTML='&#9654; Play';
    } else {
      running=true;lastTs=null;rafId=requestAnimationFrame(loop);
      if(btn)btn.innerHTML='&#9646;&#9646; Pause';
    }
  });
  document.getElementById('swarm-restart')?.addEventListener('click',()=>{
    stopSim();
    const i=document.querySelector('[data-ctrl="income"] .dp2-opt.active')?.dataset.v||'low';
    const e=document.querySelector('[data-ctrl="econstat"] .dp2-opt.active')?.dataset.v||'employed';
    const s=document.querySelector('[data-ctrl="sex"] .dp2-opt.active')?.dataset.v||'male';
    const d=document.querySelector('[data-ctrl="day"] .dp2-opt.active')?.dataset.v||'weekday';
    setTimeout(()=>startSim(i,e,s,d),50);
  });
  ['x1','x2','x4'].forEach(id=>{
    document.getElementById('swarm-spd-'+id)?.addEventListener('click',()=>{
      document.querySelectorAll('.swarm-spd').forEach(b=>{
        if(b.id.startsWith('swarm-spd-')) b.classList.remove('active');
      });
      document.getElementById('swarm-spd-'+id)?.classList.add('active');
      msPerSlot=id==='x1'?220:id==='x4'?90:150;
    });
  });

  function setModeButtons(activeId){
    ['swarm-mode-balanced','swarm-mode-performance','swarm-mode-auto'].forEach(id=>{
      document.getElementById(id)?.classList.toggle('active',id===activeId);
    });
    const perfEl=document.getElementById('swarm-perf');
    if(perfEl)perfEl.style.display=activeId==='swarm-mode-auto'?'inline-flex':'none';
  }

  document.getElementById('swarm-mode-balanced')?.addEventListener('click',()=>{
    autoMode=false;
    particleStride=1;
    setModeButtons('swarm-mode-balanced');
  });
  document.getElementById('swarm-mode-performance')?.addEventListener('click',()=>{
    autoMode=false;
    particleStride=2;
    setModeButtons('swarm-mode-performance');
  });
  document.getElementById('swarm-mode-auto')?.addEventListener('click',()=>{
    autoMode=true;
    setModeButtons('swarm-mode-auto');
  });
  window.addEventListener('resize',()=>{
    if(!canvas)return;
    resizeCanvas();
    if(running){
      drawZones();drawRoads();drawBadges();drawParticles();
    }
  });
  // Defer start until canvas is visible with real dimensions
  let autoStarted=false;
  function tryAutoStart(){
    if(autoStarted)return;
    const w=canvas.offsetWidth||canvas.clientWidth;
    const h=canvas.offsetHeight||canvas.clientHeight||560;
    if(w>20&&h>20){
      autoStarted=true;
      startSim('low','employed','male','weekday');
    } else {
      setTimeout(tryAutoStart,150);
    }
  }
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(e=>{
      if(e[0].isIntersecting){obs.disconnect();setTimeout(tryAutoStart,100);}
    },{threshold:0.1});
    obs.observe(canvas);
  } else {
    setTimeout(tryAutoStart,500);
  }
})();
