/* ================================================================
   课程三：燃油系统（按需加载模块）
================================================================ */
(function(){
'use strict';
const QUESTIONS3=[
 {ty:'choice',q:'化油器燃油系统和燃油喷射系统的共同功用是什么？',en:'The function of both systems is to supply a ____ mixture to the engine.',
  opts:['可燃混合气','纯机油','冷却液','废气'],a:0,exp:'共同功用是向发动机供给可燃混合气（combustible mixture of air and fuel）。'},
 {ty:'choice',q:'汽油机燃油系统从油箱吸出燃油后送入什么装置？',en:'A gasoline fuel system forces fuel into the fuel-____ device.',
  opts:['计量装置（化油器/喷油器）','冷却装置','点火装置','润滑装置'],a:0,exp:'送入燃油计量装置（fuel-metering device）：化油器 carburetor 或汽油喷射器 injectors。'},
 {ty:'choice',q:'下列哪个不属于燃油供给系统的基本部件？',en:'Which is NOT a basic part of the fuel supply system?',
  opts:['Fuel Tank 油箱','Fuel Pump 燃油泵','Spark Plug 火花塞','Fuel Filter 燃油滤清器'],a:2,exp:'燃油供给系统基本部件：油箱、油泵、滤清器、油管；火花塞属于点火系统。'},
 {ty:'choice',q:'燃油滤清器（fuel filter）的作用是什么？',en:'The fuel filter removes ____ in the fuel.',
  opts:['水分','污染物（杂质）','热量','空气'],a:1,exp:'Fuel Filter: removes contaminants in the fuel.（滤除燃料中的杂质）'},
 {ty:'choice',q:'燃油泵（fuel pump）的作用是什么？',en:'The fuel pump draws fuel from the tank and forces it to the ____.',
  opts:['油箱','燃油计量装置','气缸盖','排气歧管'],a:1,exp:'从油箱吸出燃油并加压送入燃油计量装置。'},
 {ty:'choice',q:'EFI 是指什么？',en:'EFI stands for ____.',
  opts:['电子燃油喷射','废气再循环','可变气门正时','涡轮增压'],a:0,exp:'EFI = Electronic Fuel Injection 电子（电控）燃油喷射。'},
 {ty:'choice',q:'电控燃油喷射系统可分为几个子系统？',en:'An EFI system can be divided into ____ subsystems.',
  opts:['2 个','3 个','4 个','5 个'],a:2,exp:'四个：燃油传输、空气供给、传感器、计算机控制。'},
 {ty:'choice',q:'下列哪个不属于 EFI 的四个子系统？',en:'Which is NOT one of the four EFI subsystems?',
  opts:['Fuel delivery system 燃油传输','Air induction system 空气供给','Sensor system 传感器','Exhaust system 排气系统'],a:3,exp:'EFI 四子系统：燃油传输、空气供给、传感器、计算机控制。'},
 {ty:'choice',q:'燃油压力调节器（fuel pressure regulator）的作用是什么？',en:'The fuel pressure regulator controls the ____ entering the injector valves.',
  opts:['油量','压力','温度','流量计'],a:1,exp:'调节进入喷油阀的燃油压力；压力足够时把多余燃油送回油箱，保持预设压力。'},
 {ty:'choice',q:'当燃油压力足够时，压力调节器会把多余燃油送到哪里？',en:'When sufficient pressure is attained, the regulator returns excess fuel to the ____.',
  opts:['气缸','油箱','进气歧管','滤清器'],a:1,exp:'多余燃油经回油管（fuel return line）返回油箱。'},
 {ty:'choice',q:'电控喷射系统的喷油器本质上是什么？',en:'The fuel injector is a coil or solenoid-operated fuel ____.',
  opts:['阀（fuel valve）','泵','滤清器','传感器'],a:0,exp:'喷油器是一个由线圈/螺线管操纵的燃油阀（fuel valve）。'},
 {ty:'choice',q:'喷油器未通电（not energized）时处于什么状态？',en:'When not energized, the injector is ____.',
  opts:['打开','关闭','半开','抖动'],a:1,exp:'弹簧压力（spring pressure）使喷油器保持关闭，燃油不能进入发动机。'},
 {ty:'choice',q:'电流通过喷油器线圈时产生什么，从而使喷油器打开？',en:'The magnetic field attracts the injector ____, opening the injector.',
  opts:['磁场，吸引电枢','高温','高压油','真空'],a:0,exp:'电流通过线圈产生磁场，吸引喷油器电枢（armature），喷油器打开喷油。'},
 {ty:'choice',q:'空气供给系统中的节气门（throttle valve）调节什么？',en:'The throttle valve regulates how much ____ flows into the engine.',
  opts:['燃油','空气','机油','冷却液'],a:1,exp:'节气门调节进入发动机的空气量，从而控制发动机输出功率。'},
 {ty:'choice',q:'踩下油门踏板时，节气门会怎样？',en:'When the pedal is depressed, the throttle valve swings ____.',
  opts:['关闭','开大（允许更多空气进入）','反转','脱落'],a:1,exp:'踏板被踩下时节气门开大，更多空气进入气缸。'},
 {ty:'choice',q:'传感器系统的作用是什么？',en:'The EFI sensor system monitors engine operating conditions and reports to the ____.',
  opts:['控制器（computer）','油箱','排气口','驾驶员'],a:0,exp:'传感器监测发动机运行状态并把信息反馈给控制器（computer）。'},
 {ty:'choice',q:'传感器的本质是什么？',en:'A sensor is an electrical device that changes circuit resistance or ____.',
  opts:['电流','电压','电阻或电压','温度'],a:2,exp:'传感器是随条件（温度、压力、位置等）变化而改变电路电阻或电压的电气装置。'},
 {ty:'choice',q:'“carburetor” 的中文意思是？',en:'carburetor',
  opts:['化油器','喷油器','传感器','滤清器'],a:0,exp:'carburetor n. 化油器。'},
 {ty:'choice',q:'“injector” 的中文意思是？',en:'injector',
  opts:['化油器','喷油器','线圈','电枢'],a:1,exp:'injector n. 喷油器。'},
 {ty:'choice',q:'“contaminant” 的中文意思是？',en:'contaminant',
  opts:['污染物','燃料','压力','电压'],a:0,exp:'contaminant n. 污染物、致污物。'},
 {ty:'choice',q:'“solenoid” 的中文意思是？',en:'solenoid',
  opts:['弹簧','螺线管','电枢','踏板'],a:1,exp:'solenoid n. 螺线管。'},
 {ty:'choice',q:'“voltage” 的中文意思是？',en:'voltage',
  opts:['电流','电压','电阻','电路'],a:1,exp:'voltage n. 电压。'},
 {ty:'tf',q:'柴油机供给系统和汽油机供给系统的主要功用都是把燃油或油气混合物送入发动机气缸。',en:'Both diesel and gasoline fuel systems supply fuel/air-fuel mixture into the cylinder.',a:true,exp:'课文原句说明了这一共同功用。'},
 {ty:'tf',q:'喷油器通电后，磁场吸引电枢，喷油器打开并把燃油喷入进气歧管。',en:'When current flows, the magnetic field opens the injector and fuel is squirted into the intake manifold.',a:true,exp:'课文：电流通过线圈→磁场吸引电枢→喷油器打开→压力喷油入进气歧管。'},
 {ty:'tf',q:'节气门开度越大，进入发动机的空气越多，发动机输出功率越大。',en:'The larger the throttle opening, the more air enters and the greater the power output.',a:true,exp:'节气门调节进气量，进而控制发动机输出功率。'},
];


/* ================= 课程三：燃油系统 ================= */
const VOCAB3=[
 {en:'carburetor',ipa:"['kɑ:bjuretə]",zh:'化油器',ty:'n.'},
 {en:'injection',ipa:"[in'dʒekʃən]",zh:'喷射；注射',ty:'n.'},
 {en:'supply',ipa:"[sə'plai]",zh:'供给，补给',ty:'v.'},
 {en:'combustible',ipa:"[kəm'bʌstəbl]",zh:'易燃的',ty:'adj.'},
 {en:'injector',ipa:"[in'dʒektə]",zh:'喷油器',ty:'n.'},
 {en:'contaminant',ipa:"[kən'tæminənt]",zh:'污染物；致污物',ty:'n.'},
 {en:'subsystem',ipa:"['sʌb'sistəm]",zh:'子系统；次要系统',ty:'n.'},
 {en:'sensor',ipa:"['sensə]",zh:'传感器',ty:'n.'},
 {en:'hose',ipa:'[həuz]',zh:'软管',ty:'n.'},
 {en:'preset',ipa:"[ˌpri:'set]",zh:'预先装置的；预先调整的',ty:'adj.'},
 {en:'energize',ipa:"['enədʒaiz]",zh:'供给……能量',ty:'vt.'},
 {en:'spring',ipa:'[spriŋ]',zh:'弹簧',ty:'n.'},
 {en:'current',ipa:"['kʌrənt]",zh:'（水、气、电）流',ty:'n.'},
 {en:'coil',ipa:'[kɔil]',zh:'卷；线圈',ty:'n.'},
 {en:'solenoid',ipa:"['sɔlənɔid]",zh:'螺线管',ty:'n.'},
 {en:'magnetic',ipa:'[mægˈnetik]',zh:'有磁性的',ty:'adj.'},
 {en:'armature',ipa:"['ɑ:mətʃə]",zh:'（电机的）转子，电枢',ty:'n.'},
 {en:'squirt',ipa:'[skwə:t]',zh:'注射；喷射',ty:'v.'},
 {en:'throttle',ipa:'[ˈθrɔtl]',zh:'节流阀、节气门',ty:'n.'},
 {en:'pedal',ipa:'[ˈpedl]',zh:'踏板',ty:'n.'},
 {en:'depress',ipa:"[di'pres]",zh:'压低',ty:'vt.'},
 {en:'circuit',ipa:"['sə:kit]",zh:'电路',ty:'n.'},
 {en:'resistance',ipa:"[ri'zistəns]",zh:'抵抗；电阻；阻力',ty:'n.'},
 {en:'voltage',ipa:"['vəultidʒ]",zh:'[电]电压',ty:'n.'}
];
(function(){
  const box=$('#vocab3Card'); if(!box)return;
  let html='<div class="card" style="padding:8px;overflow-x:auto"><table class="vocab-table"><tr><th style="width:44px">序号</th><th>英文 English</th><th>音标 IPA</th><th style="width:70px">词性</th><th>中文</th><th style="width:64px">发音</th></tr>';
  VOCAB3.forEach((v,i)=>{ html+='<tr><td>3.'+(i+1)+'</td><td class="en">'+v.en+'</td><td class="ipa">'+(v.ipa||'—')+'</td><td style="color:var(--muted);font-size:12.5px">'+v.ty+'</td><td class="zh">'+v.zh+'</td><td><button class="speak-btn" data-t="'+v.en+'" data-l="en-US">🔊</button></td></tr>'; });
  html+='</table></div>';
  box.innerHTML=html;
  box.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
})();
/* ---------- 燃油系统零件爆炸图 ---------- */
const FUEL_PARTS=[
 {id:1,en:'fuel tank',zh:'燃油箱',desc:'储存汽油（stores gasoline），是燃油系统的起点。',b:[110,300],ex:[-40,-70],ico:'🛢️'},
 {id:2,en:'fuel pump',zh:'燃油泵',desc:'从油箱吸出燃油并加压送入燃油计量装置（draws and forces fuel）。',b:[215,300],ex:[0,-110],ico:'⛽'},
 {id:3,en:'fuel filter',zh:'燃油滤清器',desc:'滤除燃油中的污染物（removes contaminants in the fuel）。',b:[320,300],ex:[0,-150],ico:'🧯'},
 {id:4,en:'fuel line',zh:'油管',desc:'在油箱、油泵与其他部件之间输送燃油（carries fuel）。',b:[425,300],ex:[0,-110],ico:'🧵'},
 {id:5,en:'fuel pressure regulator',zh:'燃油压力调节器',desc:'控制进入喷油阀的压力；压力足够时把多余燃油送回油箱。',b:[530,300],ex:[0,-70],ico:'🎛️'},
 {id:6,en:'fuel injector',zh:'喷油器',desc:'由线圈/螺线管操纵的燃油阀，把燃油喷入进气歧管。',b:[620,300],ex:[0,-30],ico:'💉'},
 {id:7,en:'fuel return line',zh:'回油管',desc:'把多余的燃油送回油箱（returns excess fuel to the tank）。',b:[110,470],ex:[-40,70],ico:'↩️'},
 {id:8,en:'computer (ECU)',zh:'控制器',desc:'计算机控制系统，根据传感器信号控制喷油量与喷油时刻。',b:[215,470],ex:[0,110],ico:'💻'},
 {id:9,en:'manifold pressure sensor',zh:'进气歧管压力传感器',desc:'监测进气歧管压力，为控制器提供负荷信息。',b:[320,470],ex:[0,150],ico:'📉'},
 {id:10,en:'intake air temperature sensor',zh:'进气温度传感器',desc:'监测进气温度，修正喷油量。',b:[425,470],ex:[0,150],ico:'🌡️'},
 {id:11,en:'throttle valve position sensor',zh:'节气门位置传感器',desc:'监测节气门开度，反映发动机负荷与工况。',b:[530,470],ex:[0,110],ico:'📐'},
 {id:12,en:'intake airflow meter',zh:'空气流量计',desc:'测量进入发动机的空气量，是电控喷油的基本信号。',b:[620,470],ex:[0,70],ico:'🌬️'}
];
let fuelExploded=false, fuelTour=null;
function buildFuelAnim(){
  const svg=$('#fuelSvg'); if(!svg)return;
  svg.innerHTML='';
  el('text',{x:340,y:60,text:'燃油供给路径 Fuel Delivery Path',fill:'#7dd3fc','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
  el('path',{d:'M110 340 L620 340',stroke:'#2a3f6e','stroke-width':6,'stroke-dasharray':'10 8'},svg);
  el('text',{x:340,y:226,text:'电控部分 Electronic Control',fill:'#fbbf24','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
  FUEL_PARTS.forEach(p=>{
    const g=el('g',{'class':'part','data-id':p.id},svg);
    const isFlow=p.id<=6;
    el('rect',{class:'shp',x:p.b[0]-52,y:p.b[1]-42,width:104,height:84,rx:14,fill:isFlow?'#1e3a5f':'#3a2f14',stroke:isFlow?'#38bdf8':'#fbbf24','stroke-width':2},g);
    el('text',{x:p.b[0],y:p.b[1]-6,text:p.ico,'font-size':26,'text-anchor':'middle'},g);
    el('text',{x:p.b[0],y:p.b[1]+22,text:p.zh,fill:'#e2e8f0','font-size':11.5,'font-weight':700,'text-anchor':'middle'},g);
    const bg=el('g',{},g);
    el('circle',{class:'badge-circle',cx:p.b[0]-52,cy:p.b[1]-42,r:12},bg);
    el('text',{class:'badge-text',x:p.b[0]-52,y:p.b[1]-42,text:p.id},bg);
    g.addEventListener('click',()=>selectFuelPart(p.id));
  });
}
function selectFuelPart(id){
  $$('#fuelSvg .part').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const n=$('#fuelInfoN'),e=$('#fuelInfoE'),z=$('#fuelInfoZ'),d=$('#fuelInfoD');
  if(id==null){ n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明'; d.textContent='燃油系统由油箱、燃油泵、滤清器、油管、喷油器等部件组成。'; return; }
  const p=FUEL_PARTS.find(x=>x.id===id);
  n.textContent=p.id; e.textContent=p.en; z.textContent=p.zh; d.textContent=p.desc;
}
function setFuelExplode(on){
  fuelExploded=on;
  FUEL_PARTS.forEach(p=>{ const g=$('#fuelSvg .part[data-id="'+p.id+'"]'); if(g)g.style.transform=on?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):''; });
  const b=$('#btnFuelExplode'); if(b)b.textContent=on?'🔩 重新组装':'💥 爆炸拆解';
}
/* ---------- 喷油器工作原理动画（断面） ---------- */
let injectorOn=false, injectorAmt=0, injectorRaf=null;
function buildInjector(){
  const svg=$('#injectorSvg'); if(!svg)return;
  svg.innerHTML='';
  /* 外壳 */
  el('rect',{x:250,y:30,width:140,height:300,rx:16,fill:'#1e293b',stroke:'#475569','stroke-width':2},svg);
  el('text',{x:320,y:22,text:'喷油器断面 Fuel Injector',fill:'#7dd3fc','font-size':13,'font-weight':800,'text-anchor':'middle'},svg);
  /* 线圈 */
  el('rect',{x:262,y:60,width:26,height:120,rx:6,fill:'#b45309',stroke:'#fbbf24','stroke-width':2},svg);
  el('rect',{x:352,y:60,width:26,height:120,rx:6,fill:'#b45309',stroke:'#fbbf24','stroke-width':2},svg);
  el('text',{x:275,y:126,text:'coil',fill:'#fff','font-size':11,'text-anchor':'middle'},svg);
  el('text',{x:365,y:126,text:'coil',fill:'#fff','font-size':11,'text-anchor':'middle'},svg);
  /* 弹簧 */
  el('path',{d:'M300 62 L340 74 L300 86 L340 98 L300 110 L340 122',fill:'none',stroke:'#94a3b8','stroke-width':3},svg);
  el('text',{x:320,y:52,text:'spring 弹簧',fill:'#94a3b8','font-size':11,'text-anchor':'middle'},svg);
  /* 燃油入口 */
  el('rect',{x:390,y:90,width:60,height:26,rx:6,fill:'#334155',stroke:'#64748b'},svg);
  el('text',{x:450,y:108,text:'fuel inlet 燃油入口',fill:'#94a3b8','font-size':10.5},svg);
  el('line',{x1:390,y1:103,x2:352,y2:103,stroke:'#64748b','stroke-width':6},svg);
  /* 动态组：电枢 + 针阀 */
  const dyn=el('g',{},svg);
  el('rect',{x:292,y:150,width:56,height:70,rx:8,fill:'#cbd5e1',stroke:'#94a3b8','stroke-width':2},dyn);
  el('text',{x:320,y:192,text:'armature',fill:'#0f172a','font-size':10.5,'text-anchor':'middle','font-weight':700},dyn);
  el('rect',{x:312,y:220,width:16,height:70,rx:4,fill:'#e2e8f0',stroke:'#94a3b8'},dyn);
  el('path',{d:'M296 290 L344 290 L332 312 L308 312 Z',fill:'#e2e8f0',stroke:'#94a3b8','stroke-width':2},dyn);
  el('text',{x:398,y:300,text:'needle 针阀',fill:'#94a3b8','font-size':10.5},dyn);
  /* 喷孔与油雾 */
  el('rect',{x:300,y:312,width:40,height:12,fill:'#475569'},svg);
  el('text',{x:352,y:338,text:'nozzle 喷孔',fill:'#94a3b8','font-size':10.5},svg);
  const spray=el('g',{},svg);
  for(let i=0;i<14;i++){
    const ox=(i-6.5)/7;
    el('circle',{class:'spray',cx:320,cy:330,r:3.4,fill:'#fbbf24','data-ox':ox.toFixed(3),'data-oy':(0.5+Math.random()*0.5).toFixed(3)},spray);
  }
  /* 状态提示 */
  el('text',{x:320,y:392,text:'断电：弹簧压紧针阀 → 关闭',fill:'#94a3b8','font-size':12.5,'text-anchor':'middle'} ,svg).setAttribute('id','injTip');
  /* 磁场示意 */
  const mag=el('g',{opacity:0},svg); mag.setAttribute('id','injMag');
  el('path',{d:'M262 100 Q320 150 378 100',fill:'none',stroke:'#fbbf24','stroke-width':3,'stroke-dasharray':'6 5'},mag);
  el('path',{d:'M262 170 Q320 220 378 170',fill:'none',stroke:'#fbbf24','stroke-width':3,'stroke-dasharray':'6 5'},mag);
  el('text',{x:430,y:150,text:'magnetic field 磁场',fill:'#fbbf24','font-size':11},mag);
  window.__INJ={dyn,mag,spray};
  requestAnimationFrame(injLoop);
}
function injLoop(){
  const o=window.__INJ;
  if(o){
    injectorAmt+= (injectorOn?0.12:-0.12);
    injectorAmt=Math.max(0,Math.min(1,injectorAmt));
    o.dyn.setAttribute('transform','translate(0,'+(injectorAmt*26)+')');
    o.mag.setAttribute('opacity',injectorAmt*0.95);
    o.spray.querySelectorAll('.spray').forEach(c=>{
      const life=injectorAmt;
      c.setAttribute('opacity',life*0.85);
      c.setAttribute('cx',320+(+c.dataset.ox)*life*80);
      c.setAttribute('cy',330+(+c.dataset.oy)*life*110);
    });
    const t=document.getElementById('injTip');
    if(t)t.textContent=injectorAmt>0.5?'通电：磁场吸引电枢 → 针阀打开喷油':'断电：弹簧压紧针阀 → 关闭';
  }
  requestAnimationFrame(injLoop);
}
(function(){
  buildFuelAnim(); buildInjector();
  const be=$('#btnFuelExplode'), bt=$('#btnFuelTour');
  if(be)be.addEventListener('click',()=>setFuelExplode(!fuelExploded));
  if(bt)bt.addEventListener('click',()=>{
    if(fuelTour){ clearTimeout(fuelTour); fuelTour=null; bt.textContent='▶ 零件巡讲'; selectFuelPart(null); return; }
    if(fuelExploded)setFuelExplode(false);
    bt.textContent='⏹ 停止巡讲';
    let i=0;
    const step=()=>{ if(i>=FUEL_PARTS.length){ fuelTour=null; bt.textContent='▶ 零件巡讲'; selectFuelPart(null); return; } selectFuelPart(FUEL_PARTS[i].id); i++; fuelTour=setTimeout(step,1400); };
    step();
  });
  const bo=$('#btnInjectorToggle');
  if(bo)bo.addEventListener('click',()=>{
    injectorOn=!injectorOn;
    bo.textContent=injectorOn?'⏹ 断电（关闭）':'⚡ 通电（喷油）';
    const st=$('#injectorState'); if(st)st.textContent=injectorOn?'当前状态：通电 · 磁场吸引电枢，针阀打开喷油':'当前状态：断电 · 弹簧关闭';
  });
})();
/* ---------- 3D 燃油系统模型（three.js，含燃油流动） ---------- */
let fuel3dInited=false;
function initFuel3D(){
  const box=$('#fuel3dBox'), note=$('#fuel3dNote');
  if(!box)return;
  box.style.display=''; note.textContent='正在加载 three.js 组件…（首次可能需 10~20 秒）';
  loadThree().then(ok=>{
    if(!ok){ note.textContent='⚠️ 3D 组件加载失败（网络原因），可稍后重试。'; box.style.display='none'; fuel3dInited=false; const b=$('#btnFuel3D'); if(b){b.disabled=false;b.textContent='▶ 加载 3D 模型';} return; }
    note.textContent='🖱️ 拖拽旋转 · 滚轮缩放 · 观察燃油流动路径';
    const b=$('#btnFuel3D'); if(b){b.disabled=false;b.textContent='🙈 隐藏 3D';}
    buildFuel3D(box);
  });
}
function buildFuel3D(box){
  const THREE=window.THREE;
  const W=box.clientWidth||600, H=box.clientHeight||430;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0d1b36);
  const camera=new THREE.PerspectiveCamera(45,W/H,0.1,100);
  camera.position.set(0,2.2,7.2);
  let renderer=null;
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }
  catch(e){ const n=$('#fuel3dNote'); if(n)n.textContent='⚠️ 当前设备不支持 3D（WebGL 不可用）。'; return; }
  renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  box.innerHTML=''; box.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x2a3f6e,0.85));
  const key=new THREE.DirectionalLight(0xffffff,1.0); key.position.set(3,7,6); scene.add(key);
  const fill=new THREE.DirectionalLight(0x66aaff,0.45); fill.position.set(-5,-2,-5); scene.add(fill);
  const grid=new THREE.GridHelper(10,20,0x2a3f6e,0x1b2b4d); grid.position.y=-1.5; scene.add(grid);
  const grp=new THREE.Group(); scene.add(grp);
  const M=(c,o)=>new THREE.MeshPhysicalMaterial(Object.assign({color:c,metalness:.7,roughness:.3,clearcoat:.5},o||{}));
  const matBlue=M(0x1e3a5f,{metalness:.4}), matGold=M(0xfbbf24,{metalness:.9,roughness:.25}), matSteel=M(0x94a3b8), matGlass=new THREE.MeshPhysicalMaterial({color:0x38bdf8,transparent:true,opacity:.25,roughness:.15});
  /* 部件沿 x 轴排列：油箱 → 油泵 → 滤清器 → 压力调节器 → 喷油器 */
  const parts=[
    {x:-3.4,label:'油箱 fuel tank',mesh:new THREE.Mesh(new THREE.BoxGeometry(1.1,1.0,1.1),matBlue)},
    {x:-1.9,label:'燃油泵 fuel pump',mesh:new THREE.Mesh(new THREE.CylinderGeometry(0.36,0.36,1.0,20),matSteel)},
    {x:-0.6,label:'滤清器 filter',mesh:new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.42,0.9,20),matGold)},
    {x:0.8,label:'压力调节器 regulator',mesh:new THREE.Mesh(new THREE.BoxGeometry(0.8,0.7,0.8),matSteel)},
    {x:2.2,label:'喷油器 injector',mesh:new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,1.1,18),matGold)}
  ];
  parts.forEach((p,i)=>{
    p.mesh.position.set(p.x,(i===4?0.5:0),0); grp.add(p.mesh);
    const lbl=makeLabel(p.label); lbl.position.set(p.x,1.15,0); grp.add(lbl);
  });
  /* 油管 */
  for(let i=0;i<parts.length-1;i++){
    const x1=parts[i].x+0.5, x2=parts[i+1].x-0.5;
    const tube=new THREE.Mesh(new THREE.CylinderGeometry(0.075,0.075,Math.max(0.2,x2-x1),12),matGlass);
    tube.rotation.z=Math.PI/2; tube.position.set((x1+x2)/2,0,0); grp.add(tube);
  }
  /* 燃油粒子（沿 x 轴流动） */
  const drops=[];
  for(let i=0;i<26;i++){
    const d=new THREE.Mesh(new THREE.SphereGeometry(0.075,10,10),matGold);
    d.userData.t=i/26; grp.add(d); drops.push(d);
  }
  /* 文字标签（用 canvas 贴图） */
  function makeLabel(text){
    const c=document.createElement('canvas'); c.width=512; c.height=64;
    const g=c.getContext('2d');
    g.fillStyle='rgba(13,27,54,0.85)'; g.fillRect(0,0,512,64);
    g.font='bold 30px sans-serif'; g.fillStyle='#7dd3fc'; g.textAlign='center'; g.textBaseline='middle';
    g.fillText(text,256,32);
    const tex=new THREE.CanvasTexture(c);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));
    sp.scale.set(2.0,0.25,1);
    return sp;
  }
  /* 交互 */
  let ry=0, rx=0.1, zoom=1, dragging=false, px=0, py=0;
  renderer.domElement.style.cursor='grab';
  renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;px=e.clientX;py=e.clientY;renderer.domElement.style.cursor='grabbing';});
  window.addEventListener('pointermove',e=>{ if(!dragging)return; ry+=(e.clientX-px)*0.008; rx+=(e.clientY-py)*0.006; rx=Math.max(-0.8,Math.min(0.8,rx)); px=e.clientX;py=e.clientY; });
  window.addEventListener('pointerup',()=>{dragging=false;renderer.domElement.style.cursor='grab';});
  renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(0.55,Math.min(2.2,zoom*(e.deltaY>0?1.08:0.93)));},{passive:false});
  let t=0;
  function loop(){
    t+=0.006;
    drops.forEach(d=>{
      d.userData.t=(d.userData.t+0.004)%1;
      const x=-3.9+d.userData.t*6.2;
      d.position.set(x,Math.sin(d.userData.t*Math.PI*6)*0.06,0);
    });
    grp.rotation.y=ry; grp.rotation.x=rx;
    camera.position.set(0,2.2*zoom,7.2*zoom);
    camera.lookAt(0,0.2,0);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize',()=>{ const w=box.clientWidth,h=box.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
}
(function(){
  const b=$('#btnFuel3D'); if(!b)return;
  b.addEventListener('click',()=>{
    if(fuel3dInited){
      const box=$('#fuel3dBox'); const hidden=box.style.display==='none';
      box.style.display=hidden?'':'none'; b.textContent=hidden?'🙈 隐藏 3D':'🔄 显示 3D'; return;
    }
    fuel3dInited=true; b.disabled=true; b.textContent='⏳ 加载中…';
    initFuel3D();
  });
})();
/* ---------- 课程三练习：连线 + 读音 ---------- */
(function(){
  const PAIRS3=[['化油器','carburetor'],['喷油器','injector'],['燃油滤清器','fuel filter'],['燃油泵','fuel pump'],['燃油箱','fuel tank'],['传感器','sensor'],['螺线管','solenoid'],['节流阀','throttle']];
  const mb=$('#matchBox3');
  if(mb){
    const left=PAIRS3.map((p,i)=>({i,zh:p[0]}));
    const right=PAIRS3.map((p,i)=>({i,en:p[1]})).sort(()=>Math.random()-.5);
    let sel=null, done=0;
    const colL=document.createElement('div'); colL.className='match-col';
    const colR=document.createElement('div'); colR.className='match-col';
    const render=()=>{
      colL.innerHTML=''; colR.innerHTML='';
      left.forEach(it=>{
        const b=document.createElement('button');
        b.className='match-item'+(it.ok?' done':''); b.textContent=it.zh;
        if(!it.ok)b.addEventListener('click',()=>{ sel=it; render(); });
        if(sel===it)b.classList.add('sel');
        colL.appendChild(b);
      });
      right.forEach(it=>{
        const b=document.createElement('button');
        b.className='match-item'+(it.ok?' done':''); b.textContent=it.en;
        if(!it.ok)b.addEventListener('click',()=>{
          if(!sel){ toast('请先点左边的中文'); return; }
          if(sel.i===it.i){ sel.ok=true; it.ok=true; done++; sel=null; render();
            $('#matchMsg3').textContent='已配对 '+done+' / '+PAIRS3.length+(done===PAIRS3.length?' 🎉 全部正确！':'');
          } else { b.classList.add('wrong'); setTimeout(()=>b.classList.remove('wrong'),420); toast('❌ 配对错误，再想想'); }
        });
        colR.appendChild(b);
      });
    };
    mb.appendChild(colL); mb.appendChild(colR); render();
  }
  const READ3=['carburetor','injection','supply','combustible','injector','contaminant','subsystem','sensor','hose','preset','energize','spring','current','coil','solenoid','magnetic','armature','squirt','throttle','pedal','depress','circuit','resistance','voltage'];
  const rb=$('#readBox3');
  if(rb){
    rb.innerHTML=READ3.map(w=>'<span style="display:inline-flex;align-items:center;gap:6px;background:var(--accent-l);border:1px solid #fcd34d;color:#92400e;font-size:13.5px;padding:5px 10px 5px 14px;border-radius:999px;font-weight:700">'+w+'<button class="speak-btn" data-t="'+w+'" data-l="en-US" style="width:26px;height:26px;font-size:13px">🔊</button></span>').join('');
    rb.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
  }
})();
/* 课程三导入打字机 */
(function(){
  const txt='俗话说"人是铁，饭是钢"——发动机也要"吃饭"，它喝的这种液体就是燃料。这节课我们拆开燃油系统：从油箱、油泵、滤清器，一直到电控喷油器，看看燃油是怎么被精确喷进发动机的！⛽';
  const box=$('#typedIntro3'); if(!box)return;
  const io=new IntersectionObserver(es=>{
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=()=>{ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();


createQuiz({box:'#quizBox3',bar:'#qBar3',questions:QUESTIONS3});
window.__COURSE_REGISTER('efi',{track:'track-efi'});
})();
