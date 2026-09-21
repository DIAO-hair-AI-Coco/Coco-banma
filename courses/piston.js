/* ================================================================
   课程二：活塞与连杆总成（按需加载模块）
================================================================ */
(function(){
'use strict';
const QUESTIONS2=[
 {ty:'choice',q:'活塞在发动机气缸内做什么运动？',en:'The piston moves ____ inside the engine cylinder.',
  opts:['旋转运动','上下往复直线运动','水平摆动','静止不动'],a:1,exp:'活塞在气缸内做上下往复的直线运动，再由连杆、曲轴转为旋转运动。'},
 {ty:'choice',q:'活塞是什么形状的零件？',en:'The piston is a ____ shaped hollow part.',
  opts:['圆柱实心','圆筒状中空','方块形','球形'],a:1,exp:'课文：The piston is a cylindrical shaped hollow part.（圆筒状中空零件）'},
 {ty:'choice',q:'活塞从气体中吸收热量后，必须怎样做？',en:'The heat absorbed by the piston must be ____.',
  opts:['继续升温','被带走（散热）','转化为电能','不需要处理'],a:1,exp:'必须散热，使金属温度保持在安全限度（safe limits）以内。'},
 {ty:'choice',q:'活塞由哪几部分组成？',en:'The piston consists of piston head, piston rings, piston lands, piston skirt and ____.',
  opts:['piston pinhole 销座孔','crankshaft 曲轴','flywheel 飞轮','oil pan 油底壳'],a:0,exp:'活塞由顶部、活塞环、环槽岸、裙部和活塞销座孔组成。'},
 {ty:'choice',q:'燃烧产生的爆炸力（explosive force）作用在活塞的哪个部位？',en:'The explosive force is exerted on the ____.',
  opts:['活塞裙部','活塞顶（活塞顶部）','销座孔','活塞环'],a:1,exp:'The piston head is the top surface against which the explosive force is exerted.'},
 {ty:'choice',q:'活塞环安装在什么地方？',en:'The piston rings are installed in ____.',
  opts:['销座孔 pinhole','凹槽 grooves','气缸盖','油底壳'],a:1,exp:'活塞环安装在活塞的环槽（grooves）中。'},
 {ty:'choice',q:'活塞环分为哪两种类型？',en:'There are two types of rings: ____.',
  opts:['气环和油环','大环和小环','铜环和铁环','上环和下环'],a:0,exp:'compression rings（气环）和 oil-control rings（油环）。'},
 {ty:'choice',q:'环槽岸（piston land）的作用是什么？',en:'The piston land provides a ____ for the sides of piston rings.',
  opts:['支承面（座面）','润滑油道','冷却水路','密封垫片'],a:0,exp:'环槽岸为活塞环两端提供支承面（seating surface）。'},
 {ty:'choice',q:'活塞裙部（piston skirt）的作用是什么？',en:'The piston skirt forms a bearing area in contact with the ____.',
  opts:['曲轴','气缸壁','连杆','飞轮'],a:1,exp:'活塞裙部形成活塞与气缸壁的接触支承面（导向与承压）。'},
 {ty:'choice',q:'活塞销座孔（pinhole）的作用是什么？',en:'The piston pinhole is used to connect the ____.',
  opts:['曲轴','连杆','飞轮','气缸盖'],a:1,exp:'活塞销座孔用来安装活塞销，从而连接活塞与连杆。'},
 {ty:'choice',q:'连杆大头（big end）连接在什么零件上？',en:'The connecting rod is attached to the crankshaft at ____.',
  opts:['活塞','曲轴','凸轮轴','气缸盖'],a:1,exp:'连杆大头与曲轴（曲柄销 crankpin）相连，小头与活塞相连。'},
 {ty:'choice',q:'连杆小头（small end）连接在什么零件上？',en:'The connecting rod is attached to the piston at the ____.',
  opts:['曲轴','活塞','飞轮','正时带'],a:1,exp:'连杆小头套在活塞销上，与活塞连接。'},
 {ty:'choice',q:'连杆必须满足什么要求？',en:'The connecting rod must be strong and rigid and ____.',
  opts:['越重越好','尽可能轻','越长越好','不需要强度'],a:1,exp:'连杆须有足够的强度和刚度，并且质量要尽可能轻（light in weight）。'},
 {ty:'choice',q:'连杆由哪几部分组成？',en:'The connecting rod is composed of small end, shank, big end, cap and ____.',
  opts:['bearing half shells 轴瓦','piston ring 活塞环','crankshaft 曲轴','groove 凹槽'],a:0,exp:'连杆由小头、杆身、大头、连杆盖和轴瓦（bearing half shells）组成。'},
 {ty:'choice',q:'“cylindrical” 的中文意思是？',en:'cylindrical',
  opts:['中空的','圆筒状的','坚硬的','易爆的'],a:1,exp:'cylindrical adj. 圆筒状的。'},
 {ty:'choice',q:'“hollow” 的中文意思是？',en:'hollow',
  opts:['中空的','实心的','圆筒状的','弯曲的'],a:0,exp:'hollow adj. 中空的。'},
 {ty:'choice',q:'“piston skirt” 的中文意思是？',en:'piston skirt',
  opts:['活塞环','活塞裙部','活塞销','活塞顶'],a:1,exp:'piston skirt 活塞裙部。'},
 {ty:'choice',q:'“crankpin” 的中文意思是？',en:'crankpin',
  opts:['曲柄销','销座孔','凹槽','推力'],a:0,exp:'crankpin n. 曲柄销、曲柄针。'},
 {ty:'choice',q:'“thrust” 的中文意思是？',en:'thrust',
  opts:['拉力','推力','压力','扭力'],a:1,exp:'thrust n. 推力。'},
 {ty:'choice',q:'“rigid” 的中文意思是？',en:'rigid',
  opts:['柔软的','坚硬的','中空的','圆筒状的'],a:1,exp:'rigid adj. 坚硬的（连杆要求强、刚、轻）。'},
 {ty:'tf',q:'活塞环包括气环（compression ring）和油环（oil-control ring）两种。',en:'There are two types of piston rings.',a:true,exp:'课文明确：两种类型——气环 compression rings 与油环 oil-control rings。'},
 {ty:'tf',q:'活塞顶部（piston head）承受燃烧产生的爆炸力。',en:'The explosive force is exerted on the piston head.',a:true,exp:'活塞顶部是承受爆炸力的上表面。'},
 {ty:'tf',q:'连杆大头与活塞相连，小头与曲轴相连。',en:'The big end is attached to the piston.',a:false,exp:'说反了：连杆大头连曲轴，小头连活塞。'},
 {ty:'tf',q:'曲柄销（crankpin）把活塞传来的力传递给曲轴。',en:'The crankpin transmits force to the crankshaft.',a:true,exp:'曲柄销是曲轴上与连杆大头相连的销轴，把力传给曲轴。'},
 {ty:'tf',q:'活塞在气缸中吸热后无需散热，温度不会影响性能。',en:'The heat absorbed by the piston need not be carried away.',a:false,exp:'错。必须散热，否则金属温度超出安全限度会损坏活塞。'},
];
/* 课程三：燃油系统 */

/* ================= 课程二：活塞与连杆总成 ================= */
const VOCAB2=[
 {en:'cylindrical',ipa:"[si'lindrikl]",zh:'圆筒状的',ty:'adj.'},
 {en:'hollow',ipa:"['hɒləʊ]",zh:'中空的',ty:'adj.'},
 {en:'piston ring',ipa:'',zh:'活塞环',ty:'n.短语'},
 {en:'piston land',ipa:'',zh:'活塞环槽岸',ty:'n.短语'},
 {en:'piston skirt',ipa:'',zh:'活塞裙部',ty:'n.短语'},
 {en:'pinhole',ipa:"['pinhəul]",zh:'销座孔',ty:'n.'},
 {en:'explosive force',ipa:'',zh:'爆破力、爆炸力',ty:'n.短语'},
 {en:'groove',ipa:'[gru:v]',zh:'凹槽',ty:'n.'},
 {en:'crankpin',ipa:"['kræŋkpin]",zh:'曲柄销、曲柄针',ty:'n.'},
 {en:'piston pin',ipa:'',zh:'活塞销',ty:'n.短语'},
 {en:'thrust',ipa:'[θrʌst]',zh:'推力',ty:'n.'},
 {en:'rigid',ipa:"['ridʒid]",zh:'坚硬的',ty:'adj.'}
];
(function(){
  const box=$('#vocab2Card'); if(!box)return;
  let html='<div class="card" style="padding:8px;overflow-x:auto"><table class="vocab-table"><tr><th style="width:44px">序号</th><th>英文 English</th><th>音标 IPA</th><th style="width:70px">词性</th><th>中文</th><th style="width:64px">发音</th></tr>';
  VOCAB2.forEach((v,i)=>{ html+='<tr><td>2.'+(i+1)+'</td><td class="en">'+v.en+'</td><td class="ipa">'+(v.ipa||'—')+'</td><td style="color:var(--muted);font-size:12.5px">'+v.ty+'</td><td class="zh">'+v.zh+'</td><td><button class="speak-btn" data-t="'+v.en+'" data-l="en-US">🔊</button></td></tr>'; });
  html+='</table></div>';
  box.innerHTML=html;
  box.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
})();
/* 活塞组件组成列表 */
const PISTON_COMPONENTS=[
 {en:'piston head',zh:'活塞顶',d:'活塞的上表面，燃烧产生的爆炸力作用于此。'},
 {en:'piston ring',zh:'活塞环',d:'安装在环槽中，分气环（compression ring）和油环（oil-control ring）。'},
 {en:'piston land',zh:'环槽岸',d:'活塞环槽之间的部位，为活塞环两端提供支承面。'},
 {en:'piston skirt',zh:'活塞裙部',d:'形成活塞与气缸壁的接触支承面（导向与承压）。'},
 {en:'piston pinhole',zh:'销座孔',d:'用来安装活塞销，连接活塞与连杆。'},
 {en:'connecting rod',zh:'连杆',d:'小头连活塞、大头连曲轴，须有足够强度、刚度且质量轻。'}
];
(function(){
  const box=$('#pistonPartsList'); if(!box)return;
  box.innerHTML=PISTON_COMPONENTS.map(c=>'<div class="qa-card" style="padding:14px"><div style="font-weight:800;font-size:15px">'+c.en+'</div><div style="font-size:13.5px;color:var(--primary-d);font-weight:700;margin-top:2px">'+c.zh+'</div><div style="font-size:13px;color:var(--muted);margin-top:6px;line-height:1.7">'+c.d+'</div></div>').join('');
})();
/* ---------- 活塞组件爆炸图（SVG + 爆炸/组装 + 点击标注 + 巡讲） ---------- */
const PISTON_PARTS=[
 {id:1,en:'piston ring',zh:'活塞环',desc:'安装在活塞环槽中，分气环与油环，起密封燃气、刮油布油的作用。',b:[470,158],ex:[0,-168]},
 {id:2,en:'piston pin',zh:'活塞销',desc:'穿过活塞销座孔，把活塞与连杆小头连接起来，承受往复惯性力。',b:[470,282],ex:[0,-104]},
 {id:3,en:'piston head',zh:'活塞顶',desc:'活塞的上表面，燃烧产生的爆炸力（explosive force）作用于此。',b:[190,168],ex:[0,0]},
 {id:4,en:'piston land',zh:'环槽岸',desc:'活塞环槽之间的部位，为活塞环两侧提供支承面。',b:[190,212],ex:[0,0]},
 {id:5,en:'piston skirt',zh:'活塞裙部',desc:'活塞下部的导向承压面，形成与气缸壁的接触支承面。',b:[190,330],ex:[0,0]},
 {id:6,en:'pinhole',zh:'销座孔',desc:'活塞上的圆孔，用来安装活塞销以连接连杆。',b:[320,398],ex:[0,0]},
 {id:7,en:'connecting rod small end',zh:'连杆小头',desc:'套在活塞销上，与活塞连接的一端。',b:[470,352],ex:[0,64]},
 {id:8,en:'connecting rod shank',zh:'连杆杆身',desc:'连接小头与大头的杆部，传递往复与旋转运动，须强、刚、轻。',b:[470,432],ex:[0,64]},
 {id:9,en:'connecting rod big end',zh:'连杆大头',desc:'与曲轴（曲柄销 crankpin）连接的一端。',b:[470,522],ex:[0,120]},
 {id:10,en:'connecting rod cap',zh:'连杆盖',desc:'连杆大头的分体部分，用螺栓与大头合装夹紧曲柄销。',b:[470,608],ex:[0,196]},
 {id:11,en:'bearing half shells',zh:'轴瓦',desc:'装在大头与连杆盖内的减摩轴承，保护曲柄销。',b:[380,560],ex:[0,152]},
 {id:12,en:'crankpin',zh:'曲柄销',desc:'曲轴上与连杆大头相连的销轴，把活塞的力传给曲轴。',b:[250,560],ex:[0,120]}
];
let pistonExploded=false, pistonSel=null, pistonTour=null;
function buildPistonAnim(){
  const svg=$('#pistonSvg'); if(!svg)return;
  svg.innerHTML='';
  const rect=(g,x,y,w,h,fill,ex)=>{const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex||{}),g);r.classList.add('shp');return r;};
  const circ=(g,cx,cy,r,fill,ex)=>{const c=el('circle',Object.assign({cx,cy,r,fill},ex||{}),g);c.classList.add('shp');return c;};
  const path=(g,d,fill,ex)=>{const p=el('path',Object.assign({d,fill},ex||{}),g);p.classList.add('shp');return p;};
  PISTON_PARTS.forEach(p=>{
    const g=el('g',{'class':'part','data-id':p.id},svg);
    switch(p.id){
      case 1: /* 活塞环 ×2 */
        rect(g,236,190,168,16,'#fbbf24',{rx:6,stroke:'#b45309','stroke-width':2});
        rect(g,236,216,168,14,'#f59e0b',{rx:6,stroke:'#92400e','stroke-width':2});
        break;
      case 2: /* 活塞销 */
        rect(g,272,266,96,32,'#cbd5e1',{rx:8,stroke:'#64748b','stroke-width':2});
        circ(g,320,282,9,'#475569');
        break;
      case 3: /* 活塞顶 */
        path(g,'M232 150 L408 150 L408 186 L232 186 Z','#e2e8f0',{stroke:'#94a3b8','stroke-width':2});
        break;
      case 4: /* 环槽岸（环槽之间的部位） */
        rect(g,232,186,176,58,'#cbd5e1',{stroke:'#94a3b8','stroke-width':2});
        rect(g,232,200,176,5,'#64748b');
        rect(g,232,224,176,5,'#64748b');
        break;
      case 5: /* 裙部 */
        path(g,'M232 244 L408 244 L408 396 L232 396 Z','#cbd5e1',{stroke:'#94a3b8','stroke-width':2});
        break;
      case 6: /* 销座孔 */
        circ(g,320,282,40,'#0f172a',{stroke:'#64748b','stroke-width':3});
        break;
      case 7: /* 连杆小头 */
        circ(g,320,340,40,'none',{stroke:'#94a3b8','stroke-width':14});
        break;
      case 8: /* 连杆杆身 */
        path(g,'M304 372 L336 372 L346 486 L294 486 Z','#94a3b8');
        break;
      case 9: /* 连杆大头（含轴瓦孔） */
        circ(g,320,520,58,'#94a3b8');
        circ(g,320,520,34,'#0f172a',{stroke:'#64748b','stroke-width':3});
        break;
      case 10: /* 连杆盖 */
        path(g,'M262 520 A58 58 0 0 0 378 520 L378 552 A58 58 0 0 1 262 552 Z','#94a3b8',{stroke:'#64748b','stroke-width':2});
        break;
      case 11: /* 轴瓦 */
        path(g,'M286 520 A34 34 0 0 0 354 520 L354 536 A34 34 0 0 1 286 536 Z','#fde68a',{stroke:'#b45309','stroke-width':2});
        break;
      case 12: /* 曲柄销 */
        circ(g,320,520,20,'#fbbf24',{stroke:'#b45309','stroke-width':2});
        break;
    }
    const bg=el('g',{},g);
    el('circle',{class:'badge-circle',cx:p.b[0],cy:p.b[1],r:12},bg);
    el('text',{class:'badge-text',x:p.b[0],y:p.b[1],text:p.id},bg);
    g.addEventListener('click',()=>selectPistonPart(p.id));
  });
}
function selectPistonPart(id){
  $$('#pistonSvg .part').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const n=$('#pistonInfoN'),e=$('#pistonInfoE'),z=$('#pistonInfoZ'),d=$('#pistonInfoD');
  if(id==null){ n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明'; d.textContent='活塞连杆组由活塞、活塞环、活塞销、连杆等零件组成。'; pistonSel=null; return; }
  const p=PISTON_PARTS.find(x=>x.id===id); pistonSel=id;
  n.textContent=p.id; e.textContent=p.en; z.textContent=p.zh; d.textContent=p.desc;
}
function setPistonExplode(on){
  pistonExploded=on;
  PISTON_PARTS.forEach(p=>{
    const g=$('#pistonSvg .part[data-id="'+p.id+'"]');
    if(g)g.style.transform=on?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):'';
  });
  const b=$('#btnPistonExplode'); if(b)b.textContent=on?'🔩 重新组装':'💥 爆炸拆解';
}
(function(){
  buildPistonAnim();
  const be=$('#btnPistonExplode'), bt=$('#btnPistonTour');
  if(be)be.addEventListener('click',()=>setPistonExplode(!pistonExploded));
  if(bt)bt.addEventListener('click',()=>{
    if(pistonTour){ clearTimeout(pistonTour); pistonTour=null; bt.textContent='▶ 零件巡讲'; selectPistonPart(null); return; }
    if(pistonExploded)setPistonExplode(false);
    bt.textContent='⏹ 停止巡讲';
    let i=0;
    const step=()=>{
      if(i>=PISTON_PARTS.length){ pistonTour=null; bt.textContent='▶ 零件巡讲'; selectPistonPart(null); return; }
      selectPistonPart(PISTON_PARTS[i].id); i++;
      pistonTour=setTimeout(step,1500);
    };
    step();
  });
})();
/* ---------- 3D 活塞-连杆-曲轴机构（three.js） ---------- */
let piston3dInited=false;
function initPiston3D(){
  const box=$('#piston3dBox'), note=$('#piston3dNote');
  if(!box)return;
  box.style.display='';
  note.textContent='正在加载 three.js 组件…';
  loadThree().then(ok=>{
    if(!ok){ note.textContent='⚠️ 3D 组件加载失败（网络原因），可稍后重试；不影响其他内容。'; box.style.display='none'; piston3dInited=false; const b=$('#btnPiston3D'); if(b){b.disabled=false;b.textContent='▶ 加载 3D 机构动画';} return; }
    note.textContent='🖱️ 拖拽旋转 · 滚轮缩放 · 活塞往复 / 连杆摆动 / 曲轴旋转';
    const b=$('#btnPiston3D'); if(b){b.disabled=false;b.textContent='🙈 隐藏 3D';}
    buildPiston3D(box);
  });
}
function buildPiston3D(box){
  const THREE=window.THREE;
  const W=box.clientWidth||600, H=box.clientHeight||430;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0d1b36);
  const camera=new THREE.PerspectiveCamera(45,W/H,0.1,100);
  camera.position.set(2.4,1.4,4.6);
  let renderer=null;
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }
  catch(e){ const n=$('#piston3dNote'); if(n)n.textContent='⚠️ 当前设备不支持 3D（WebGL 不可用）。'; return; }
  renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  box.innerHTML=''; box.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x2a3f6e,0.8));
  const key=new THREE.DirectionalLight(0xffffff,1.0); key.position.set(4,7,6); scene.add(key);
  const fill=new THREE.DirectionalLight(0x66aaff,0.45); fill.position.set(-5,-3,-5); scene.add(fill);
  const grid=new THREE.GridHelper(7,14,0x2a3f6e,0x1b2b4d); grid.position.y=-1.5; scene.add(grid);
  const grp=new THREE.Group(); scene.add(grp);
  const M=(c,o)=>new THREE.MeshPhysicalMaterial(Object.assign({color:c,metalness:.75,roughness:.3,clearcoat:.6},o||{}));
  const matAl=M(0xcbd5e1), matSteel=M(0x94a3b8), matGold=M(0xfbbf24,{metalness:.9,roughness:.25});
  const matGlass=new THREE.MeshPhysicalMaterial({color:0x38bdf8,metalness:.2,roughness:.15,transparent:true,opacity:.16,side:THREE.DoubleSide});
  /* 气缸（半透明）+ 缸盖 */
  const cyl=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,2.0,36,1,true),matGlass);
  cyl.position.y=1.3; grp.add(cyl);
  const head=new THREE.Mesh(new THREE.CylinderGeometry(0.53,0.53,0.14,36),M(0x475569));
  head.position.y=2.36; grp.add(head);
  /* 活塞组（活塞 + 活塞环 + 活塞销） */
  const pistonG=new THREE.Group(); grp.add(pistonG);
  pistonG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.46,0.44,36),matAl));
  const r1=new THREE.Mesh(new THREE.TorusGeometry(0.465,0.03,8,36),matGold); r1.rotation.x=Math.PI/2; r1.position.y=0.14; pistonG.add(r1);
  const r2=new THREE.Mesh(new THREE.TorusGeometry(0.465,0.026,8,36),matGold); r2.rotation.x=Math.PI/2; r2.position.y=0.04; pistonG.add(r2);
  const pinMesh=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.94,20),matSteel); pinMesh.rotation.z=Math.PI/2; pistonG.add(pinMesh);
  /* 曲轴 */
  const R=0.42, L=1.3;
  const shaft=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,1.6,20),matSteel); shaft.rotation.z=Math.PI/2; grp.add(shaft);
  const webG=new THREE.Group(); grp.add(webG);
  const web=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.42*2,0.14),matSteel); web.position.y=0; webG.add(web);
  const counter=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,0.4,20),matSteel); counter.rotation.x=Math.PI/2; counter.position.y=-0.3; webG.add(counter);
  /* 连杆（动态） */
  const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
  const up=new THREE.Vector3(0,1,0), dir=new THREE.Vector3();
  function cylBetween(v1,v2,r,mat){
    const d=new THREE.Vector3().subVectors(v2,v1); const len=d.length();
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,14),mat);
    mesh.position.copy(v1).add(v2).multiplyScalar(.5);
    mesh.quaternion.setFromUnitVectors(up,d.clone().normalize());
    return mesh;
  }
  const rod=cylBetween(V3(0,0,0),V3(0,0.9,0),0.075,matSteel); grp.add(rod);
  const rodSmall=new THREE.Mesh(new THREE.TorusGeometry(0.13,0.045,10,24),matGold); grp.add(rodSmall);
  const rodBig=new THREE.Mesh(new THREE.TorusGeometry(0.19,0.055,10,26),matGold); grp.add(rodBig);
  /* 交互 */
  let ry=0.5, rx=0.12, zoom=1, dragging=false, px=0, py=0;
  renderer.domElement.style.cursor='grab';
  renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;px=e.clientX;py=e.clientY;renderer.domElement.style.cursor='grabbing';});
  window.addEventListener('pointermove',e=>{ if(!dragging)return; ry+=(e.clientX-px)*0.008; rx+=(e.clientY-py)*0.008; rx=Math.max(-1.2,Math.min(1.2,rx)); px=e.clientX;py=e.clientY; });
  window.addEventListener('pointerup',()=>{dragging=false;renderer.domElement.style.cursor='grab';});
  renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(0.55,Math.min(2.4,zoom*(e.deltaY>0?1.08:0.93)));},{passive:false});
  /* 运动动画：真实曲柄连杆 */
  const pinY=t=>R*Math.cos(t)+Math.sqrt(Math.max(0,L*L-Math.pow(R*Math.sin(t),2)));
  let t=0;
  function loop(){
    t+=0.016; const a=t;
    const py=pinY(a);
    const cp=V3(0,R*Math.cos(a),R*Math.sin(a));      /* 曲柄销 */
    const pp=V3(0,py,0);                              /* 活塞销 */
    pistonG.position.set(0,py,0);
    rod.position.copy(pp).add(cp).multiplyScalar(.5);
    dir.subVectors(cp,pp); rod.quaternion.setFromUnitVectors(up,dir.clone().normalize());
    rodSmall.position.copy(pp);
    rodBig.position.copy(cp);
    webG.rotation.x=a;
    if(!dragging) ry+=0.0022;
    grp.rotation.y=ry; grp.rotation.x=rx;
    camera.position.set(2.4*zoom,1.4*zoom,4.6*zoom);
    camera.lookAt(0,1.1,0);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize',()=>{ const w=box.clientWidth,h=box.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
}
(function(){
  const b=$('#btnPiston3D'); if(!b)return;
  b.addEventListener('click',()=>{
    if(piston3dInited){
      const box=$('#piston3dBox'); const hidden=box.style.display==='none';
      box.style.display=hidden?'':'none'; b.textContent=hidden?'🙈 隐藏 3D':'🔄 显示 3D'; return;
    }
    piston3dInited=true; b.disabled=true; b.textContent='⏳ 加载中…';
    initPiston3D();
  });
})();
/* 课程二导入打字机 */
(function(){
  const txt='活塞是发动机的"心脏瓣膜"——它在气缸里不断上下往复，承受着燃烧的爆炸力，还要把热量散出去。这节课我们用零件模型动画，把活塞和连杆一层层拆开看清楚！Let\'s go! ⚙️';
  const box=$('#typedIntro2'); if(!box)return;
  let started=false;
  const io=new IntersectionObserver(es=>{
    if(es[0].isIntersecting&&!started){ started=true; io.disconnect();
      let i=0; const step=()=>{ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,55); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
  window.__PARTS={auto(){ if(!started){ started=true; io.disconnect(); let i=0; const step=()=>{ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,55); } else box.innerHTML=txt+'<span class="caret"></span>'; }; step(); } }};
})();
/* ---------- 课程二练习：连线配对 / 课文填空 / 读音练习 ---------- */
(function(){
  const PAIRS=[['气缸套','cylinder sleeve'],['浇铸','cast'],['铝','aluminum'],['铁','iron'],['钢','steel'],['曲轴','crankshaft'],['气缸盖','cylinder head'],['飞轮','flywheel']];
  const mb=$('#matchBox');
  if(mb){
    const left=PAIRS.map((p,i)=>({i,zh:p[0]}));
    const right=PAIRS.map((p,i)=>({i,en:p[1]})).sort(()=>Math.random()-.5);
    let sel=null, done=0;
    const colL=document.createElement('div'); colL.className='match-col';
    const colR=document.createElement('div'); colR.className='match-col';
    const render=()=>{
      colL.innerHTML=''; colR.innerHTML='';
      left.forEach((it,idx)=>{
        const b=document.createElement('button');
        b.className='match-item'+(it.ok?' done':''); b.textContent=it.zh;
        if(!it.ok)b.addEventListener('click',()=>{ sel=it; render(); });
        else if(sel===it)sel=null;
        if(sel===it)b.classList.add('sel');
        colL.appendChild(b);
      });
      right.forEach(it=>{
        const b=document.createElement('button');
        b.className='match-item'+(it.ok?' done':''); b.textContent=it.en;
        if(!it.ok)b.addEventListener('click',()=>{
          if(!sel){ toast('请先点左边的中文'); return; }
          if(sel.i===it.i){ sel.ok=true; it.ok=true; done++; sel=null; render();
            $('#matchMsg').textContent='已配对 '+done+' / '+PAIRS.length+(done===PAIRS.length?' 🎉 全部正确！':'');
          } else { b.classList.add('wrong'); setTimeout(()=>b.classList.remove('wrong'),420); toast('❌ 配对错误，再想想'); }
        });
        colR.appendChild(b);
      });
    };
    mb.appendChild(colL); mb.appendChild(colR); render();
  }
  const READ=['avoid','arc','brace','brush','cage','charge','chuck','dissipate','crank','curb','drain','draught','drum','employ','fail','float','gauge','horn','hose','jig'];
  const rb=$('#readBox');
  if(rb){
    rb.innerHTML=READ.map(w=>'<span style="display:inline-flex;align-items:center;gap:6px;background:var(--accent-l);border:1px solid #fcd34d;color:#92400e;font-size:13.5px;padding:5px 10px 5px 14px;border-radius:999px;font-weight:700">'+w+'<button class="speak-btn" data-t="'+w+'" data-l="en-US" style="width:26px;height:26px;font-size:13px">🔊</button></span>').join('');
    rb.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
  }
})();


createQuiz({box:'#quizBox2',bar:'#qBar2',questions:QUESTIONS2});
window.__COURSE_REGISTER('piston',{track:'track-piston'});
})();
