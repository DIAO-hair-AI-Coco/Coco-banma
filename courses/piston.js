/* ================================================================
   课程二：活塞与连杆总成（按需加载模块）
================================================================ */
(function(){
'use strict';
const QUESTIONS2=[
 {ty:'choice',q:'活塞在发动机气缸内做什么运动？',en:'The piston moves ____ inside the engine cylinder.',
  opts:['Linear reciprocating (up-and-down) motion','Rotary motion','Horizontal swinging','Remaining stationary'],a:1,exp:'活塞在气缸内做上下往复的直线运动，再由连杆、曲轴转为旋转运动。'},
 {ty:'choice',q:'活塞是什么形状的零件？',en:'The piston is a ____ shaped hollow part.',
  opts:['Solid cylinder','Cylindrical and hollow','Cube shaped','Spherical'],a:1,exp:'课文：The piston is a cylindrical shaped hollow part.（圆筒状中空零件）'},
 {ty:'choice',q:'活塞从气体中吸收热量后，必须怎样做？',en:'The heat absorbed by the piston must be ____.',
  opts:['Continue to rise in temperature','Be carried away (dissipated)','Be converted into electrical energy','Need no treatment'],a:1,exp:'必须散热，使金属温度保持在安全限度（safe limits）以内。'},
 {ty:'choice',q:'活塞由哪几部分组成？',en:'The piston consists of piston head, piston rings, piston lands, piston skirt and ____.',
  opts:['Piston pinhole','Crankshaft','Flywheel','Oil pan'],a:0,exp:'活塞由顶部、活塞环、环槽岸、裙部和活塞销座孔组成。'},
 {ty:'choice',q:'燃烧产生的爆炸力（explosive force）作用在活塞的哪个部位？',en:'The explosive force is exerted on the ____.',
  opts:['Piston skirt','Piston head (crown)','Pinhole','Piston ring'],a:1,exp:'The piston head is the top surface against which the explosive force is exerted.'},
 {ty:'choice',q:'活塞环安装在什么地方？',en:'The piston rings are installed in ____.',
  opts:['Pinhole','Grooves','Cylinder head','Oil pan'],a:1,exp:'活塞环安装在活塞的环槽（grooves）中。'},
 {ty:'choice',q:'活塞环分为哪两种类型？',en:'There are two types of rings: ____.',
  opts:['Compression rings and oil rings','Large rings and small rings','Copper rings and iron rings','Upper rings and lower rings'],a:0,exp:'compression rings（气环）和 oil-control rings（油环）。'},
 {ty:'choice',q:'环槽岸（piston land）的作用是什么？',en:'The piston land provides a ____ for the sides of piston rings.',
  opts:['Bearing (supporting) surface','Oil passage','Coolant passage','Sealing gasket'],a:0,exp:'环槽岸为活塞环两端提供支承面（seating surface）。'},
 {ty:'choice',q:'活塞裙部（piston skirt）的作用是什么？',en:'The piston skirt forms a bearing area in contact with the ____.',
  opts:['Crankshaft','Cylinder wall','Connecting rod','Flywheel'],a:1,exp:'活塞裙部形成活塞与气缸壁的接触支承面（导向与承压）。'},
 {ty:'choice',q:'活塞销座孔（pinhole）的作用是什么？',en:'The piston pinhole is used to connect the ____.',
  opts:['Crankshaft','Connecting rod','Flywheel','Cylinder head'],a:1,exp:'活塞销座孔用来安装活塞销，从而连接活塞与连杆。'},
 {ty:'choice',q:'连杆大头（big end）连接在什么零件上？',en:'The connecting rod is attached to the crankshaft at ____.',
  opts:['Piston','Crankshaft','Camshaft','Cylinder head'],a:1,exp:'连杆大头与曲轴（曲柄销 crankpin）相连，小头与活塞相连。'},
 {ty:'choice',q:'连杆小头（small end）连接在什么零件上？',en:'The connecting rod is attached to the piston at the ____.',
  opts:['Crankshaft','Piston','Flywheel','Timing belt'],a:1,exp:'连杆小头套在活塞销上，与活塞连接。'},
 {ty:'choice',q:'连杆必须满足什么要求？',en:'The connecting rod must be strong and rigid and ____.',
  opts:['The heavier the better','As light as possible','The longer the better','Strength is not required'],a:1,exp:'连杆须有足够的强度和刚度，并且质量要尽可能轻（light in weight）。'},
 {ty:'choice',q:'连杆由哪几部分组成？',en:'The connecting rod is composed of small end, shank, big end, cap and ____.',
  opts:['Bearing half shells','Piston ring','Crankshaft','Groove'],a:0,exp:'连杆由小头、杆身、大头、连杆盖和轴瓦（bearing half shells）组成。'},
 {ty:'choice',q:'“cylindrical” 的中文意思是？',en:'cylindrical',
  opts:['Hollow','Cylindrical','Rigid','Explosive'],a:1,exp:'cylindrical adj. 圆筒状的。'},
 {ty:'choice',q:'“hollow” 的中文意思是？',en:'hollow',
  opts:['Hollow','Solid','Cylindrical','Bent'],a:0,exp:'hollow adj. 中空的。'},
 {ty:'choice',q:'“piston skirt” 的中文意思是？',en:'piston skirt',
  opts:['Piston ring','Piston skirt','Piston pin','Piston head'],a:1,exp:'piston skirt 活塞裙部。'},
 {ty:'choice',q:'“crankpin” 的中文意思是？',en:'crankpin',
  opts:['Crankpin','Pinhole','Groove','Thrust'],a:0,exp:'crankpin n. 曲柄销、曲柄针。'},
 {ty:'choice',q:'“thrust” 的中文意思是？',en:'thrust',
  opts:['Pull','Thrust','Pressure','Torque'],a:1,exp:'thrust n. 推力。'},
 {ty:'choice',q:'“rigid” 的中文意思是？',en:'rigid',
  opts:['Soft','Rigid','Hollow','Cylindrical'],a:1,exp:'rigid adj. 坚硬的（连杆要求强、刚、轻）。'},
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
/* ---------- 数据：活塞连杆总成爆炸图（18 个零件，自上而下编号，全部矢量绘制） ---------- */
const PISTON_PARTS=[
 {id:1,en:'piston crown',zh:'活塞顶部',b:[236,100],ex:[0,-110],
  desc:'活塞的上表面，燃烧产生的爆炸力（explosive force）直接作用于此。顶部形状直接影响燃烧室形状与燃烧质量。',
  draw(g,H){
    H.path(g,'M215 106 L215 72 Q215 58 231 58 L409 58 Q425 58 425 72 L425 106 Z','#e2e8f0',{stroke:'#94a3b8','stroke-width':2});
    H.line(g,232,74,408,74,'#cbd5e1',2,{opacity:.7});
    H.rect(g,300,46,40,12,'#cbd5e1',{rx:4,opacity:.5});
    H.path(g,'M262 92 L378 92','none',{stroke:'#94a3b8','stroke-width':1.5,fill:'none',opacity:.6});
  }},
 {id:2,en:'piston ring land',zh:'活塞环槽岸',b:[224,164],ex:[0,-50],
  desc:'环槽之间的部位（ring land），为活塞环提供支承面并把活塞的热量传给活塞环。环岸高度与环槽间隙是活塞设计的关键尺寸。',
  draw(g,H){
    H.rect(g,215,106,210,64,'#cbd5e1',{stroke:'#94a3b8','stroke-width':2});
    H.rect(g,215,112,210,9,'#5b6b80');
    H.rect(g,215,132,210,9,'#5b6b80');
    H.rect(g,215,152,210,9,'#5b6b80');
    H.rect(g,215,164,210,6,'#94a3b8');
  }},
 {id:3,en:'top compression ring',zh:'第一道气环',b:[216,132],ex:[230,-60],
  desc:'承受最高燃气压力与温度的一道环，通常为桶面环或锥面环。它把燃烧气体密封在气缸内，同时把活塞热量传给缸壁。图中缺口即环开口间隙（ring end gap）。',
  draw(g,H){
    const e=el('ellipse',{cx:320,cy:116.5,rx:100,ry:7,fill:'none',stroke:'#fbbf24','stroke-width':6,'stroke-dasharray':'430 24'},g);
    e.classList.add('shp');
    H.line(g,300,110,340,123,'#fde68a',2,{opacity:.75});
  }},
 {id:4,en:'second compression ring',zh:'第二道气环',b:[300,150],ex:[230,20],
  desc:'辅助第一道气环密封，并起一定的刮油与控油作用（backup sealing and oil control）。',
  draw(g,H){
    const e=el('ellipse',{cx:320,cy:136.5,rx:100,ry:7,fill:'none',stroke:'#f59e0b','stroke-width':6},g);
    e.classList.add('shp');
    H.line(g,300,130,340,143,'#fde68a',2,{opacity:.75});
  }},
 {id:5,en:'oil control ring',zh:'油环',b:[216,168],ex:[230,100],
  desc:'把气缸壁上多余的机油刮回油底壳（scrapes surplus oil back to the sump），防止机油窜入燃烧室造成烧机油。多带衬簧（expander）。',
  draw(g,H){
    const e1=el('ellipse',{cx:320,cy:153,rx:100,ry:6,fill:'none',stroke:'#0ea5e9','stroke-width':5},g);
    e1.classList.add('shp');
    const e2=el('ellipse',{cx:320,cy:161,rx:100,ry:6,fill:'none',stroke:'#7dd3fc','stroke-width':4},g);
    e2.classList.add('shp');
    H.line(g,300,150,340,164,'#bae6fd',2,{opacity:.8});
  }},
 {id:6,en:'piston skirt',zh:'活塞裙部',b:[224,286],ex:[0,-10],
  desc:'活塞下部的导向与承压面（guides the piston and carries the side thrust）。铝合金活塞膨胀大于缸套，故裙部多做成椭圆（仿形）并留有间隙。',
  draw(g,H){
    H.path(g,'M215 170 L425 170 L425 266 Q425 292 399 292 L241 292 Q215 292 215 266 Z','#cbd5e1',{stroke:'#94a3b8','stroke-width':2});
    H.line(g,228,184,412,184,'#94a3b8',1.5,{opacity:.6});
    H.path(g,'M226 226 Q226 280 262 284','none',{stroke:'#94a3b8','stroke-width':1.5,fill:'none',opacity:.7});
    H.path(g,'M414 226 Q414 280 378 284','none',{stroke:'#94a3b8','stroke-width':1.5,fill:'none',opacity:.7});
  }},
 {id:7,en:'piston pin bore',zh:'活塞销座孔',b:[276,270],ex:[0,30],
  desc:'加工在活塞销座（boss）内的圆孔，用来安装活塞销；孔内油孔为活塞销提供压力润滑。',
  draw(g,H){
    H.circ(g,320,238,38,'#0f172a',{stroke:'#64748b','stroke-width':3});
    H.circ(g,320,238,27,'none',{stroke:'#475569','stroke-width':1.5,'stroke-dasharray':'4 4'});
    H.circ(g,320,214,4,'#f59e0b');
  }},
 {id:8,en:'piston pin',zh:'活塞销',b:[300,240],ex:[-225,-112],
  desc:'把活塞与连杆小头连接起来的铰接轴（pivoting joint），承受往复惯性力。全浮式活塞销用卡环定位，销可在活塞与连杆中转动。',
  draw(g,H){
    H.rect(g,268,222,104,32,'#cbd5e1',{rx:10,stroke:'#64748b','stroke-width':2});
    H.circ(g,282,238,9,'#94a3b8');
    H.circ(g,358,238,9,'#94a3b8');
    H.rect(g,300,228,40,6,'#e2e8f0',{rx:3,opacity:.8});
  }},
 {id:9,en:'pin retaining clip',zh:'活塞销卡环',b:[360,268],ex:[-300,60],
  desc:'装在销座孔两端的弹性卡环（circlip），防止全浮式活塞销横向窜动刮伤气缸壁。',
  draw(g,H){
    H.path(g,'M268 226 A14 14 0 1 0 268 254','none',{stroke:'#f59e0b','stroke-width':4,fill:'none'});
    H.path(g,'M372 226 A14 14 0 1 1 372 254','none',{stroke:'#f59e0b','stroke-width':4,fill:'none'});
  }},
 {id:10,en:'connecting rod small end',zh:'连杆小头',b:[346,330],ex:[0,60],
  desc:'套在活塞销上的那一端，内装青铜衬套（small end bushing）作为活塞销的轴承面。',
  draw(g,H){
    H.circ(g,320,300,36,'#94a3b8');
    H.circ(g,320,300,22,'#0f172a',{stroke:'#64748b','stroke-width':3});
    H.circ(g,320,300,16,'#fde68a',{stroke:'#b45309','stroke-width':1.5});
  }},
 {id:11,en:'connecting rod shank',zh:'连杆杆身',b:[302,424],ex:[0,120],
  desc:'连接小头与大头的杆部（I-beam shank），做成工字形截面，以最小重量承受拉压载荷并传递往复运动。',
  draw(g,H){
    H.path(g,'M301 332 L339 332 L349 430 L291 430 Z','#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.path(g,'M311 340 L329 340 L337 422 L303 422 Z','#64748b',{opacity:.55});
  }},
 {id:12,en:'connecting rod big end',zh:'连杆大头',b:[252,524],ex:[0,170],
  desc:'与曲轴曲柄销连接的一端（big end），内装连杆轴瓦，是承受最大交变载荷的部位。',
  draw(g,H){
    H.circ(g,320,470,52,'#94a3b8');
    H.circ(g,320,470,32,'#0f172a',{stroke:'#64748b','stroke-width':3});
    H.path(g,'M268 470 L372 470','none',{stroke:'#64748b','stroke-width':2});
  }},
 {id:13,en:'connecting rod cap',zh:'连杆盖',b:[380,500],ex:[150,150],
  desc:'连杆大头的分体部分（rod cap），用连杆螺栓与大头合装，把轴瓦压紧在曲柄销上。装配时有方向标记，不能装反。',
  draw(g,H){
    H.path(g,'M270 470 A50 50 0 0 0 370 470 L370 496 A50 50 0 0 1 270 496 Z','#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.rect(g,294,500,16,8,'#64748b',{rx:3});
    H.rect(g,330,500,16,8,'#64748b',{rx:3});
  }},
 {id:14,en:'rod bearing insert',zh:'连杆轴瓦',b:[300,462],ex:[200,80],
  desc:'薄壁可更换的软质轴瓦（replaceable bearing shell），靠流体动压油膜把轴颈与轴瓦隔开。间隙过小会烧瓦，过大则油压不足并敲击。',
  draw(g,H){
    H.path(g,'M290 470 A30 30 0 0 1 350 470 L350 486 A30 30 0 0 0 290 486 Z','#fde68a',{stroke:'#b45309','stroke-width':2});
    H.path(g,'M290 470 A30 30 0 0 0 350 470 L350 454 A30 30 0 0 1 290 454 Z','#fcd34d',{stroke:'#b45309','stroke-width':2});
    H.line(g,294,478,346,478,'#b45309',1.2,{opacity:.6});
  }},
 {id:15,en:'connecting rod bolt',zh:'连杆螺栓',b:[400,532],ex:[170,190],
  desc:'把连杆盖与大头夹紧的螺栓。多为屈服点拧紧（torque-to-yield）螺栓，拆下后必须更换；专业维修常以测量伸长量判定拧紧程度。',
  draw(g,H){
    H.rect(g,288,494,12,32,'#64748b',{rx:3});
    H.rect(g,340,494,12,32,'#64748b',{rx:3});
    H.rect(g,284,522,20,10,'#94a3b8',{rx:3});
    H.rect(g,336,522,20,10,'#94a3b8',{rx:3});
  }},
 {id:16,en:'crankpin',zh:'曲柄销',b:[320,500],ex:[-180,170],
  desc:'曲轴上与连杆大头相连的销轴（crankpin）。曲柄销与主轴颈之间的偏置把活塞的往复力转变为曲轴扭矩。',
  draw(g,H){
    H.circ(g,320,470,20,'#fbbf24',{stroke:'#b45309','stroke-width':2});
    H.circ(g,320,470,8,'#92400e');
    H.rect(g,196,446,54,48,'#94a3b8',{rx:8,opacity:.85});
    H.rect(g,390,446,54,48,'#94a3b8',{rx:8,opacity:.85});
  }},
 {id:17,en:'cylinder liner',zh:'气缸套',b:[200,310],ex:[-146,-62],
  desc:'为活塞环提供硬质珩磨滑动表面的缸孔（cylinder liner / bore）。缸壁经过珩磨形成交叉网纹（cross-hatch），用于存留润滑油膜。',
  draw(g,H){
    H.rect(g,203,52,234,248,'none',{stroke:'#38bdf8','stroke-width':2.5,'stroke-dasharray':'8 6',rx:8});
    H.rect(g,197,52,12,248,'#334155',{rx:4,opacity:.5,'stroke':'#38bdf8','stroke-width':1,'stroke-dasharray':'6 5'});
    H.rect(g,431,52,12,248,'#334155',{rx:4,opacity:.5,'stroke':'#38bdf8','stroke-width':1,'stroke-dasharray':'6 5'});
    for(let y=76;y<296;y+=24)H.line(g,209,y,431,y,'#1e3a5f',1,{opacity:.45});
  }},
 {id:18,en:'piston cooling jet',zh:'活塞冷却喷嘴',b:[214,358],ex:[-154,30],
  desc:'向活塞底部喷油的喷嘴（oil squirt），专门冷却活塞顶部，控制顶部温度、防止爆震与积碳。增压与高强化发动机几乎必备。',
  draw(g,H){
    H.rect(g,236,340,60,18,'#64748b',{rx:6});
    H.path(g,'M236 349 L208 349','none',{stroke:'#64748b','stroke-width':10,fill:'none','stroke-linecap':'round'});
    H.circ(g,296,349,7,'#94a3b8');
    H.path(g,'M296 340 L296 316','none',{stroke:'#38bdf8','stroke-width':3,'stroke-dasharray':'6 5',fill:'none'});
    H.circ(g,296,310,4,'#38bdf8');
  }}
];
let pistonExploded=false, pistonSel=null, pistonTour=null;
function buildPistonAnim(){
  const svg=$('#pistonSvg'); if(!svg)return;
  svg.innerHTML='';
  const H={
    rect(g,x,y,w,h,fill,ex){const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex||{}),g);r.classList.add('shp');return r;},
    circ(g,cx,cy,r,fill,ex){const c=el('circle',Object.assign({cx,cy,r,fill},ex||{}),g);c.classList.add('shp');return c;},
    path(g,d,fill,ex){const p=el('path',Object.assign({d,fill},ex||{}),g);p.classList.add('shp');return p;},
    line(g,x1,y1,x2,y2,stroke,w,ex){const l=el('line',Object.assign({x1,y1,x2,y2,stroke,'stroke-width':w||2},ex||{}),g);l.classList.add('shp');return l;}
  };
  /* 背景与网格（四周留内边距，保证爆炸态零件与标签不被裁切） */
  el('rect',{x:-70,y:-70,width:780,height:900,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=-70;x<=710;x+=32)el('line',{x1:x,y1:-70,x2:x,y2:830},grid);
  for(let y=-70;y<=830;y+=32)el('line',{x1:-70,y1:y,x2:710,y2:y},grid);
  el('text',{x:320,y:-58,text:'PISTON & CONNECTING ROD · EXPLODED VIEW 活塞连杆总成爆炸图',fill:'#7dd3fc','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:-66,y:140,text:'PISTON ASSEMBLY',fill:'#3b5b8f','font-size':12,'font-weight':800},svg);
  el('text',{x:-66,y:156,text:'活塞组',fill:'#2f4a75','font-size':11,'font-weight':700},svg);
  el('text',{x:-66,y:440,text:'CONNECTING ROD',fill:'#3b5b8f','font-size':12,'font-weight':800},svg);
  el('text',{x:-66,y:456,text:'连杆组',fill:'#2f4a75','font-size':11,'font-weight':700},svg);
  PISTON_PARTS.forEach(p=>{
    const g=el('g',{'class':'pt','data-id':p.id},svg);
    if(p.draw)p.draw(g,H);
    const bg=el('g',{},g);
    el('circle',{class:'badge-circle',cx:p.b[0],cy:p.b[1],r:11},bg);
    el('text',{class:'badge-text',x:p.b[0],y:p.b[1],text:p.id},bg);
    const lg=el('g',{'class':'pt-label'},g);
    const t1=el('text',{class:'part-label',x:p.b[0],y:p.b[1]+26,text:p.en},lg);
    t1.setAttribute('text-anchor','middle');
    const t2=el('text',{class:'part-label zh',x:p.b[0],y:p.b[1]+39,text:p.zh},lg);
    t2.setAttribute('text-anchor','middle');
    g.addEventListener('click',()=>selectPistonPart(p.id));
  });
}
function selectPistonPart(id){
  $$('#pistonSvg .pt').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const n=$('#pistonInfoN'),e=$('#pistonInfoE'),z=$('#pistonInfoZ'),d=$('#pistonInfoD');
  if(id==null){ n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明'; d.textContent='活塞连杆组由活塞、活塞环、活塞销、连杆、轴瓦等 18 个主要零件组成，按自上而下顺序编号 1→18。'; pistonSel=null; return; }
  const p=PISTON_PARTS.find(x=>x.id===id); pistonSel=id;
  n.textContent=p.id; e.textContent=p.en; z.textContent=p.zh; d.textContent=p.desc;
}
function setPistonExplode(on){
  pistonExploded=on;
  const svg=$('#pistonSvg');
  if(svg)svg.classList.toggle('exploded',on);
  PISTON_PARTS.forEach(p=>{
    const g=$('#pistonSvg .pt[data-id="'+p.id+'"]');
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
