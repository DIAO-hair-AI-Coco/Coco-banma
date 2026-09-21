/* ================================================================
   课程一：发动机基本概念与运行原理（按需加载模块）
================================================================ */
(function(){
'use strict';
/* ---------- 数据：单词表（3 张表格） ---------- */
const VOCAB=[
 {en:'engine',ipa:"['endʒɪn]",zh:'发动机',ty:'n.',cat:1},
 {en:'automobile',ipa:"['ɔːtəməbiːl]",zh:'汽车',ty:'n.',cat:1},
 {en:'component',ipa:"[kəm'pəʊnənt]",zh:'零部件',ty:'n.',cat:1},
 {en:'system',ipa:"['sɪstəm]",zh:'系统',ty:'n.',cat:1},
 {en:'fuel',ipa:"['fjuːəl]",zh:'燃料',ty:'n.',cat:1},
 {en:'cylinder',ipa:"['sɪlɪndə(r)]",zh:'气缸',ty:'n.',cat:1},
 {en:'piston',ipa:"['pɪstən]",zh:'活塞',ty:'n.',cat:1},
 {en:'stroke',ipa:'[strəuk]',zh:'冲程',ty:'n.',cat:1},
 {en:'position',ipa:'[pəˈziʃən]',zh:'位置',ty:'n.',cat:1},
 {en:'bottom',ipa:"['bɔtəm]",zh:'末端',ty:'n.',cat:1},
 {en:'ignition',ipa:"[ɪɡ'nɪʃn]",zh:'点火',ty:'n.',cat:2},
 {en:'lubrication',ipa:"[ˌluːbrɪ'keɪʃn]",zh:'润滑',ty:'n.',cat:2},
 {en:'intake stroke',ipa:'',zh:'进气冲程',ty:'n.短语',cat:2},
 {en:'compression',ipa:'[kənˈpreʃən]',zh:'压缩',ty:'n.',cat:2},
 {en:'power stroke',ipa:'',zh:'做功冲程',ty:'n.短语',cat:2},
 {en:'exhaust stroke',ipa:'',zh:'排气冲程',ty:'n.短语',cat:2},
 {en:'inlet valve',ipa:'',zh:'进气门',ty:'n.短语',cat:2},
 {en:'exhaust valve',ipa:'',zh:'排气门',ty:'n.短语',cat:2},
 {en:'V-type',ipa:'',zh:'V型',ty:'adj.',cat:3},
 {en:'horizontally',ipa:"[ˌhɒrɪ'zɒntəli]",zh:'水平地',ty:'adv.',cat:3},
 {en:'operate',ipa:'[ˈɔpəreit]',zh:'运转',ty:'v.',cat:3},
 {en:'continuously',ipa:'[kənˈtinjuəsli]',zh:'连续不断地',ty:'adv.',cat:3},
];
const VOCAB_CATS=[
 {cat:1,title:'表 1 · 基础名词',en:'Basic Nouns'},
 {cat:2,title:'表 2 · 发动机系统与机构',en:'Systems & Mechanisms'},
 {cat:3,title:'表 3 · 类型 / 动词 / 副词',en:'Types, Verbs & Adverbs'},
];

/* ---------- 数据：16 个零部件（爆炸图） ---------- */
const PARTS=[
 {id:1,en:'intake manifold',zh:'进气管',desc:'把可燃混合气（或空气）从节气门送入气缸盖进气口。',b:[76,104],ex:[-64,0]},
 {id:2,en:'throttle valve',zh:'节流阀',desc:'像一扇"油门蝴蝶阀"，控制进入发动机的空气量，从而控制转速与功率。',b:[118,176],ex:[-64,0]},
 {id:3,en:'cylinder head',zh:'气缸盖',desc:'气缸顶部的盖子，上面有进/排气道、气门和火花塞安装孔。',b:[206,148],ex:[0,-44]},
 {id:4,en:'cylinder',zh:'气缸',desc:'活塞在其中做直线往复运动的圆筒形空间。',b:[398,352],ex:[0,6]},
 {id:5,en:'cylinder block',zh:'气缸体',desc:'发动机最大的基础件，内部加工出气缸，并支承曲轴等部件。',b:[186,520],ex:[0,16]},
 {id:6,en:'flywheel',zh:'飞轮',desc:'装在曲轴端部的大惯量圆盘，储存能量，让发动机运转更平稳。',b:[562,300],ex:[60,0]},
 {id:7,en:'cylinder jacket',zh:'气缸套',desc:'气缸壁外的冷却水套，冷却液在其中循环带走热量。',b:[176,248],ex:[0,6]},
 {id:8,en:'piston',zh:'活塞',desc:'在气缸内做往复直线运动，把燃气膨胀的压力转化为机械力。',b:[300,326],ex:[0,-96]},
 {id:9,en:'oil pan',zh:'油底壳',desc:'发动机最底部的"油盆"，储存机油供润滑系统使用。',b:[228,588],ex:[0,72]},
 {id:10,en:'crankshaft',zh:'曲轴',desc:'把活塞的直线运动转换为旋转运动，向外输出动力。',b:[300,470],ex:[0,40]},
 {id:11,en:'timing belt pulley',zh:'同步带轮',desc:'装在凸轮轴端的带轮，与曲轴保持精确同步旋转。',b:[548,84],ex:[74,0]},
 {id:12,en:'crankshaft pulley',zh:'曲轴带轮',desc:'装在曲轴端的带轮，通过正时带驱动凸轮轴。',b:[552,540],ex:[74,0]},
 {id:13,en:'timing belt',zh:'正时带',desc:'连接曲轴带轮与凸轮轴带轮，保证气门开闭时刻与活塞位置精确配合。',b:[528,330],ex:[66,0]},
 {id:14,en:'camshaft',zh:'凸轮轴',desc:'轴上的凸轮按一定时刻顶开进、排气门，控制配气。',b:[300,68],ex:[0,-50]},
 {id:15,en:'timing belt cover',zh:'正时带护罩',desc:'保护正时带不受灰尘油污侵蚀，防止意外卷入异物。',b:[556,40],ex:[70,0]},
 {id:16,en:'spark plug',zh:'火花塞',desc:'产生高压电火花，点燃气缸内的可燃混合气（汽油机）。',b:[332,74],ex:[0,-50]},
];

/* ---------- 数据：发动机五大系统 ---------- */
const SYSTEMS=[
 {k:'fuel',en:'Fuel System',zh:'燃油系统',ico:'⛽',desc:'向气缸供应按比例混合好的可燃混合气（汽油机）或高压柴油（柴油机）。'},
 {k:'cooling',en:'Cooling System',zh:'冷却系统',ico:'🌡️',desc:'带走燃烧产生的大量热量，防止发动机过热损坏。'},
 {k:'lubrication',en:'Lubrication System',zh:'润滑系统',ico:'🛢️',desc:'向活塞、曲轴等运动部件供给机油，减少摩擦与磨损。'},
 {k:'ignition',en:'Ignition System',zh:'点火系统',ico:'⚡',desc:'在压缩行程末由火花塞产生电火花点燃混合气（汽油机）。'},
 {k:'starting',en:'Starting System',zh:'起动系统',ico:'🔑',desc:'起动机带动曲轴旋转，让发动机从静止进入运转。'},
];

/* ---------- 数据：气缸排列 ---------- */
const ARRS=[
 {k:'inline',en:'Inline',zh:'直列式',cn:'<b>直列式（Inline）</b>发动机使用一个独立的气缸体，所有气缸垂直排列成一条直线。它是最常见、也是最简单的排列方式（如 4 缸直列 L4）。'},
 {k:'v',en:'V-type',zh:'V型',cn:'<b>V型（V-type）</b>发动机采用两组数目相同的气缸，通常相互倾斜 <b>60° 或 90°</b>（如 V6、V8）。长度更短，适合横置前驱等布置。'},
 {k:'opposed',en:'Horizontally Opposed',zh:'水平对置',cn:'<b>水平对置（Horizontally Opposed）</b>发动机有两排互为 <b>180°</b> 的气缸（左右对置，像拳击手出拳，又称 Boxer）。重心低、振动小，常见于保时捷、斯巴鲁。'},
];

/* ---------- 数据：四冲程 ---------- */
const STROKES=[
 {n:1,en:'Intake Stroke',zh:'进气行程',c:'#0ea5e9',tag:'n1',
  narr:'① <b>进气行程 Intake Stroke</b>：活塞从上止点（TDC）<b>下行</b>到下止点（BDC），<b>进气门打开</b>、排气门关闭，空气与燃油的<b>混合气</b>被吸入气缸。',
  state:'进气门开 · 排气门关 · 活塞下行 · 吸入混合气'},
 {n:2,en:'Compression Stroke',zh:'压缩行程',c:'#f59e0b',tag:'n2',
  narr:'② <b>压缩行程 Compression Stroke</b>：活塞从下止点<b>上行</b>至上止点，<b>两气门均关闭</b>，混合气被压缩，温度、压力迅速升高，为燃烧做准备。',
  state:'两气门关闭 · 活塞上行 · 混合气被压缩'},
 {n:3,en:'Power Stroke',zh:'做功行程',c:'#f97316',tag:'n3',
  narr:'③ <b>做功行程 Power Stroke</b>：压缩行程末，<b>火花塞点火</b>，混合气猛烈燃烧膨胀，高温高压燃气推动活塞<b>下行</b>，经连杆带动曲轴旋转——这是发动机<b>唯一输出动力</b>的行程！',
  state:'两气门关闭 · 火花点火 · 燃气膨胀推动活塞'},
 {n:4,en:'Exhaust Stroke',zh:'排气行程',c:'#64748b',tag:'n4',
  narr:'④ <b>排气行程 Exhaust Stroke</b>：活塞从下止点<b>上行</b>，<b>排气门打开</b>、进气门关闭，燃烧后的废气被推出气缸。之后进入下一个循环的进气行程……',
  state:'排气门开 · 进气门关 · 活塞上行 · 排出废气'},
];

/* ---------- 数据：练习题 ---------- */
const QUESTIONS=[
 {ty:'choice',q:'发动机被称为汽车的 ______ ？',en:'Engine is called the "____" of an automobile.',
  opts:['Heart','Brain','Wheel','Fuel'],a:0,
  exp:'课文原句：Engine is called the "heart" of an automobile. 发动机被称为汽车的"心脏"。'},
 {ty:'choice',q:'一台高效工作的汽油发动机需要 ______ 个系统协同工作？',en:'A gasoline engine requires ____ systems.',
  opts:['3 systems','4 systems','5 systems','6 systems'],a:2,
  exp:'燃油、冷却、润滑、点火、起动——共 5 大系统。'},
 {ty:'choice',q:'柴油发动机与汽油发动机最大的区别是柴油机 ______ ？',en:'A diesel engine has no ____ system.',
  opts:['No lubrication system','No ignition system','No cooling system','No fuel system'],a:1,
  exp:'柴油机靠压缩空气产生高温"压燃"，因此没有点火系统（no ignition system）。'},
 {ty:'choice',q:'V 型发动机的两组气缸通常相互倾斜 ______ ？',en:'V-type engines incline ____ degrees.',
  opts:['30° or 45°','60° or 90°','90° or 120°','45° or 60°'],a:1,
  exp:'V 型发动机两组气缸通常相互倾斜 60° 或 90°。'},
 {ty:'choice',q:'水平对置发动机的两排气缸相差 ______？',en:'Horizontally opposed engines are ____ apart.',
  opts:['60°','90°','120°','180°'],a:3,
  exp:'水平对置（Boxer）发动机两排气缸互为 180°。'},
 {ty:'choice',q:'四个冲程的正确顺序是 ______？',en:'The correct order of the four strokes is ____.',
  opts:['Intake → Compression → Power → Exhaust','Power → Intake → Compression → Exhaust','Intake → Power → Compression → Exhaust','Compression → Intake → Power → Exhaust'],a:0,
  exp:'四冲程循环顺序：Intake（进气）→ Compression（压缩）→ Power（做功）→ Exhaust（排气）。'},
 {ty:'choice',q:'做功冲程中，火花塞点火的时刻是 ______？',en:'When does the spark plug ignite the mixture?',
  opts:['End of intake stroke','End of compression stroke','End of power stroke','Start of exhaust stroke'],a:1,
  exp:'压缩行程末，活塞接近上止点时火花塞点火，混合气燃烧膨胀进入做功行程。'},
 {ty:'choice',q:'进气行程中，哪个气门处于打开状态？',en:'During the intake stroke, which valve is open?',
  opts:['Intake valve','Exhaust valve','Both open','Both closed'],a:0,
  exp:'进气行程中进气门打开、排气门关闭，吸入混合气。'},
 {ty:'tf',q:'发动机拥有的气缸数目越多，产生的动力冲程就越多。',en:'The more cylinders an engine has, the more power strokes it produces.',
  a:true,exp:'课文原句：The more cylinders an engine has, the more power strokes produced.（气缸越多，做功冲程越多，动力越大。）'},
 {ty:'tf',q:'压缩行程中，进气门和排气门都是关闭的。',en:'During the compression stroke, both valves are closed.',
  a:true,exp:'压缩行程两气门均关闭，混合气才能被压缩升压。'},
 {ty:'tf',q:'柴油发动机与汽油发动机一样，也配有点火系统。',en:'The diesel engine has an ignition system like a gasoline engine.',
  a:false,exp:'柴油机没有点火系统，靠压缩自燃（压燃）。'},
 {ty:'tf',q:'活塞在气缸内做直线往复运动。',en:'The piston moves linearly (up and down) in the cylinder.',
  a:true,exp:'动力由活塞在气缸内做直线运动产生，曲轴再把它转为旋转运动。'},
 {ty:'choice',q:'课文说发动机与汽车的什么有着直接关系？',en:'Engine is in direct relation to the power take-off and ____ of an automobile.',
  opts:['Smoothness','Color','Weight','Price'],a:0,
  exp:'课文原句：与汽车的 power take-off（动力输出）和 smoothness（平稳性）直接相关。'},
 {ty:'choice',q:'“power take-off” 的中文意思是？',en:'power take-off',
  opts:['Power take-off','Take-off','Parking','Acceleration'],a:0,
  exp:'power take-off = 动力输出，即发动机经曲轴向外传递的动力。'},
 {ty:'choice',q:'曲轴把活塞的什么运动转变为什么运动？',en:'The crankshaft changes the piston\'s linear motion into ____ motion.',
  opts:['Linear motion into rotary motion','Rotary motion into linear motion','Up-and-down motion into side-to-side motion','Rest into motion'],a:0,
  exp:'活塞在气缸内做直线往复运动，由连杆、曲轴转变为旋转运动输出。'},
 {ty:'choice',q:'爆炸图中「飞轮」的英文是？',en:'flywheel',
  opts:['Flywheel','Oil pan','Crankshaft','Camshaft'],a:0,
  exp:'flywheel n.飞轮——装在曲轴端部的大惯量圆盘，使运转更平稳。'},
 {ty:'choice',q:'爆炸图中「油底壳」的英文是？',en:'oil pan',
  opts:['Oil pan','Oil pump','Fuel tank','Cylinder jacket'],a:0,
  exp:'oil pan n.油底壳——储存机油，位于发动机最底部。'},
 {ty:'choice',q:'「气缸盖」的英文是？',en:'cylinder head',
  opts:['Cylinder head','Cylinder block','Cylinder jacket','Cylinder liner'],a:0,
  exp:'cylinder head 气缸盖；cylinder block 气缸体；cylinder jacket 气缸套。'},
 {ty:'choice',q:'正时带（timing belt）的主要作用是什么？',en:'The timing belt keeps the camshaft in step with the ____.',
  opts:['Keeping valve events in step with piston position','Cooling the engine','Filtering the engine oil','Storing the fuel'],a:0,
  exp:'正时带连接曲轴带轮与凸轮轴带轮，保证配气相位与活塞位置精确同步。'},
 {ty:'choice',q:'活塞从上止点运动到下止点的距离称为什么？',en:'The distance the piston travels from TDC to BDC is called a ____.',
  opts:['One stroke','One cycle','Compression ratio','Bore'],a:0,
  exp:'活塞一个冲程 = 上止点到下止点的距离；一个完整循环曲轴转 720°。'},
 {ty:'choice',q:'汽油机中，产生电火花点燃混合气的零件是？',en:'Which part produces the electric spark to ignite the mixture?',
  opts:['Spark plug','Fuel injector','Camshaft','Flywheel'],a:0,
  exp:'火花塞产生高压电火花点燃混合气（汽油机）；柴油机没有点火系统。'},
 {ty:'choice',q:'“camshaft” 的中文意思是？',en:'camshaft',
  opts:['Camshaft','Crankshaft','Piston','Cylinder'],a:0,
  exp:'camshaft n.凸轮轴——控制进、排气门开闭时刻的配气机构。'},
 {ty:'tf',q:'发动机是汽车的动力源（power source）。',en:'The engine is the power source of an automobile.',a:true,
  exp:'发动机把燃料的化学能转化为机械能，是汽车的动力源。'},
 {ty:'tf',q:'四冲程循环中，只有做功行程向外输出动力。',en:'Only the power stroke produces useful power output.',a:true,
  exp:'进气、压缩、排气行程都消耗能量，只有做功（Power）行程输出动力。'},
 {ty:'tf',q:'直列式发动机的所有气缸垂直排列成一条直线。',en:'In an inline engine all cylinders are arranged vertically in line.',a:true,
  exp:'直列式（Inline）发动机气缸垂直排列呈一线，是最常见最简单的排列方式。'},
];

/* ---------- 数据：思维导图知识树 ---------- */
const TREE={
 id:'engine',en:'Engine',zh:'发动机',c:'#2563eb',
 d:'发动机是汽车的动力源（power source），被称为汽车的"心脏"。它把燃料燃烧的化学能转化为机械能，通过曲轴输出动力。',
 kids:[
  {id:'concept',en:'Basic Concepts',zh:'基本概念',c:'#0ea5e9',
   d:'发动机的基本概念：汽油机（gasoline engine）靠火花塞点燃混合气（Spark Ignition），柴油机（diesel engine）靠压缩空气产生高温自燃（Compression Ignition）。',
   kids:[{id:'heart',en:'Heart of Auto',zh:'汽车的心脏',c:'#ef4444',
    d:'Engine is called the "heart" of an automobile. 它与汽车的动力输出（power take-off）和运行平稳性（smoothness）直接相关。'}]},
  {id:'parts',en:'16 Parts',zh:'16 个零部件',c:'#8b5cf6',
   d:'发动机主要零部件：进气管、节流阀、气缸盖、气缸、气缸体、飞轮、气缸套、活塞、油底壳、曲轴、同步带轮、曲轴带轮、正时带、凸轮轴、正时带护罩、火花塞。',
   kids:[
    {id:'piston',en:'Piston',zh:'活塞',c:'#a78bfa',d:'在气缸内做直线往复运动，把燃气膨胀压力变成机械力。'},
    {id:'crankshaft',en:'Crankshaft',zh:'曲轴',c:'#a78bfa',d:'把活塞的直线运动转变成旋转运动，向外输出动力。'},
    {id:'camshaft',en:'Camshaft',zh:'凸轮轴',c:'#a78bfa',d:'控制进、排气门的开闭时刻（配气机构）。'},
    {id:'sparkplug',en:'Spark Plug',zh:'火花塞',c:'#a78bfa',d:'产生电火花点燃混合气（汽油机专用）。'}]},
  {id:'systems',en:'5 Systems',zh:'五大系统',c:'#10b981',
   d:'汽油机正常高效工作需要的五个系统：燃油、冷却、润滑、点火、起动。',
   kids:[
    {id:'sfuel',en:'Fuel',zh:'燃油系统',c:'#6ee7b7',d:'供应可燃混合气。'},
    {id:'scool',en:'Cooling',zh:'冷却系统',c:'#6ee7b7',d:'带走热量，防止过热。'},
    {id:'slube',en:'Lubrication',zh:'润滑系统',c:'#6ee7b7',d:'供给机油，减少摩擦磨损。'},
    {id:'sign',en:'Ignition',zh:'点火系统',c:'#6ee7b7',d:'火花塞点火（柴油机没有！）。'},
    {id:'sstart',en:'Starting',zh:'起动系统',c:'#6ee7b7',d:'带动发动机起动。'}]},
  {id:'arr',en:'Arrangement',zh:'气缸排列',c:'#f59e0b',
   d:'多缸发动机的气缸有三种排列方式：直列式、V型、水平对置。',
   kids:[
    {id:'ainline',en:'Inline',zh:'直列式',c:'#fcd34d',d:'所有气缸垂直排成一条直线，最常见最简单。'},
    {id:'av',en:'V-type',zh:'V型',c:'#fcd34d',d:'两组气缸倾斜 60° 或 90°。'},
    {id:'aopp',en:'Opposed',zh:'水平对置',c:'#fcd34d',d:'两排气缸互为 180°（Boxer）。'}]},
  {id:'cycle',en:'4 Strokes',zh:'四冲程循环',c:'#f43f5e',
   d:'四冲程循环：进气 → 压缩 → 做功 → 排气，一个完整循环曲轴转两圈（720°）。',
   kids:[
    {id:'cin',en:'Intake',zh:'进气',c:'#fda4af',d:'活塞下行，吸入混合气。'},
    {id:'ccom',en:'Compression',zh:'压缩',c:'#fda4af',d:'两门关闭，混合气被压缩。'},
    {id:'cpow',en:'Power',zh:'做功',c:'#fda4af',d:'点火燃烧，推动活塞输出动力。'},
    {id:'cex',en:'Exhaust',zh:'排气',c:'#fda4af',d:'排出废气。'}]},
 ]
};


/* ---------- 导入：打字机 ---------- */
(function(){
  const txt='带着这个问题，我们进入今天的课程——从 22 个专业单词、16 个零部件、五大系统、三种气缸排列，一路讲到四冲程工作原理。全程动画演示、双语对照，一步一步，保证看得懂！Let\'s go! 🚀';
  const box=$('#typedIntro'); let i=0;
  const step=()=>{
    if(i<=txt.length){
      box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>';
      i++; setTimeout(step,55);
    }else{ box.innerHTML=txt+'<span class="caret"></span>'; }
  };
  setTimeout(step,600);
})();

/* ---------- 单词：表格 + 闪卡 ---------- */
const vocabMode=$('#vocabMode');
function renderVocabTables(){
  const wrap=document.createElement('div'); wrap.className='table-mode';
  VOCAB_CATS.forEach(ct=>{
    const items=VOCAB.filter(v=>v.cat===ct.cat);
    const h=document.createElement('h3'); h.style.cssText='margin:22px 0 8px;font-size:16px;color:var(--primary-d)';
    h.innerHTML=ct.title+' <span style="font-size:12px;color:var(--muted);font-weight:600">'+ct.en+' · '+items.length+' 词</span>';
    wrap.appendChild(h);
    const tb=document.createElement('div'); tb.className='card'; tb.style.padding='8px'; tb.style.overflowX='auto';
    let html='<table class="vocab-table"><tr><th style="width:44px">序号</th><th>英文 English</th><th>音标 IPA</th><th style="width:64px">词性</th><th>中文</th><th style="width:64px">发音</th></tr>';
    items.forEach((v,i)=>{
      html+=`<tr><td>${ct.cat}.${i+1}</td><td class="en">${v.en}</td><td class="ipa">${v.ipa||'—'}</td><td style="color:var(--muted);font-size:12.5px">${v.ty}</td><td class="zh">${v.zh}</td><td><button class="speak-btn" data-t="${v.en}" data-l="en-US">🔊</button></td></tr>`;
    });
    html+='</table>';
    tb.innerHTML=html;
    tb.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
    wrap.appendChild(tb);
  });
  return wrap;
}
function renderFlash(){
  const st=document.createElement('div'); st.className='flash-stage on';
  st.innerHTML=`<div class="flash-card" id="flashCard">
      <div class="flash-inner">
        <div class="flash-face front"><div class="big" id="fcEn">engine</div><div class="ipa" id="fcIpa">['endʒɪn]</div><div style="font-size:12.5px;color:#dbeafe">点击卡片翻面查看中文</div></div>
        <div class="flash-face back"><div class="zh" id="fcZh">发动机</div><div class="en" id="fcEn2">engine</div><button class="speak-btn" id="fcSpeak" style="width:42px;height:42px;font-size:18px">🔊</button></div>
      </div>
    </div>
    <div class="flash-nav">
      <button class="btn ghost" id="fcPrev" style="padding:8px 18px;font-size:13px">‹ 上一张</button>
      <span class="cnt" id="fcCnt">1 / 22</span>
      <button class="btn ghost" id="fcNext" style="padding:8px 18px;font-size:13px">下一张 ›</button>
      <button class="btn ghost" id="fcShuffle" style="padding:8px 18px;font-size:13px">🔀 乱序</button>
    </div>`;
  const card=st.querySelector('#flashCard'), inner=st.querySelector('.flash-inner');
  const eEn=st.querySelector('#fcEn'),eIpa=st.querySelector('#fcIpa'),eZh=st.querySelector('#fcZh'),eEn2=st.querySelector('#fcEn2'),eCnt=st.querySelector('#fcCnt'),eSpeak=st.querySelector('#fcSpeak');
  let order=VOCAB.map((_,i)=>i), idx=0;
  const show=()=>{
    const v=VOCAB[order[idx]];
    eEn.textContent=v.en; eIpa.textContent=v.ipa||''; eZh.textContent=v.zh; eEn2.textContent=v.en;
    eCnt.textContent=(idx+1)+' / '+order.length;
    eSpeak.dataset.t=v.en;
  };
  card.addEventListener('click',()=>card.classList.toggle('flip'));
  st.querySelector('#fcPrev').addEventListener('click',e=>{e.stopPropagation();card.classList.remove('flip');idx=(idx-1+order.length)%order.length;show();});
  st.querySelector('#fcNext').addEventListener('click',e=>{e.stopPropagation();card.classList.remove('flip');idx=(idx+1)%order.length;show();});
  st.querySelector('#fcShuffle').addEventListener('click',e=>{e.stopPropagation();for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}idx=0;card.classList.remove('flip');show();});
  bindSpeak(eSpeak,eSpeak.dataset.t,'en-US');
  show();
  return st;
}
let tableMode=null;
function setVocabMode(m){
  vocabMode.innerHTML='';
  if(m==='table'){ vocabMode.appendChild(renderVocabTables()); }
  else{ vocabMode.appendChild(renderFlash()); }
}
$$('.tab-switch button').forEach(b=>b.addEventListener('click',()=>{
  $$('.tab-switch button').forEach(x=>x.classList.remove('on')); b.classList.add('on');
  setVocabMode(b.dataset.mode);
}));
setVocabMode('table');

/* ---------- 课文 1 渲染 + 句子朗读 + 扩展词汇 ---------- */
(function(){
  const en1='<span class="hl">Engine</span> is called the <span class="hl">"heart"</span> of an automobile. It\'s in <span class="hl">direct relation</span> to the <span class="hl">power take-off</span> and <span class="hl">smoothness</span> of an automobile. Let\'s read about the <span class="hl">engines</span>.';
  const zh1='发动机被称为汽车的<b>"心脏"</b>。它与汽车<b>动力输出</b>和<b>平稳性</b>有着直接的关系。下面让我们来学习更多有关于发动机的知识。';
  $('#readingEn1').innerHTML=en1;
  $('#readingZh1').innerHTML=zh1;
  const card1=$('#readingCard1');
  const btn=document.createElement('button'); btn.className='tgl-btn'; btn.textContent='🙈 隐藏中文翻译';
  btn.addEventListener('click',()=>{
    const z=$('#readingZh1'); const hidden=z.style.display==='none';
    z.style.display=hidden?'':'none';
    btn.textContent=hidden?'🙈 隐藏中文翻译':'👀 显示中文翻译';
  });
  card1.querySelector('h3').appendChild(btn);
  /* 朗读课文 */
  const speakBtn=document.createElement('button'); speakBtn.className='tgl-btn'; speakBtn.textContent='🔊 朗读课文';
  speakBtn.style.marginLeft='8px';
  speakBtn.addEventListener('click',()=>{
    if(!('speechSynthesis'in window)){ toast('当前浏览器不支持朗读'); return; }
    speechSynthesis.cancel();
    const text='Engine is called the heart of an automobile. It is in direct relation to the power take-off and smoothness of an automobile. Let us read about the engines.';
    const u=new SpeechSynthesisUtterance(text);
    u.lang='en-US'; u.rate=.9;
    const v=voices.find(x=>x.lang&&x.lang.toLowerCase().startsWith('en'));
    if(v)u.voice=v;
    speechSynthesis.speak(u);
  });
  card1.querySelector('h3').appendChild(speakBtn);
  /* 扩展词汇（故障与保养） */
  const EXTRA=[
    {en:'overheat',zh:'过热'},{en:'oil leak',zh:'漏油'},{en:'coolant',zh:'冷却液'},
    {en:'spark',zh:'火花'},{en:'fuel consumption',zh:'油耗'},{en:'maintenance',zh:'保养'},
    {en:'repair',zh:'维修'},{en:'wear',zh:'磨损'},{en:'abnormal noise',zh:'异响'},{en:'start',zh:'启动'}
  ];
  const box=$('#extraVocab');
  if(box){
    box.innerHTML=EXTRA.map(v=>`<div class="qa-card" style="padding:12px 14px"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div><div style="font-weight:800;font-size:15px">${v.en}</div><div style="font-size:13px;color:var(--primary-d)">${v.zh}</div></div><button class="speak-btn" data-t="${v.en}" data-l="en-US">🔊</button></div></div>`).join('');
    box.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
  }
})();

/* ================================================================
   PART 2 · 爆炸图 + 系统模拟 + 气缸排列
================================================================ */
/* 动态 CSS */
document.head.insertAdjacentHTML('beforeend',`<style>
.pt{transition:transform .55s cubic-bezier(.5,0,.2,1);transform-box:view-box;cursor:pointer}
.pt .shp{transition:stroke .2s,filter .2s}
.pt:hover .shp{filter:drop-shadow(0 0 6px rgba(56,189,248,.85))}
.pt.sel .shp{filter:drop-shadow(0 0 8px rgba(251,191,36,.95))}
.pt-label{opacity:0;transition:opacity .3s .25s}
.exploded .pt-label{opacity:1}
.exploded .badge-circle{fill:#38bdf8}
.sysPiston{animation:sysPistonMove .55s ease-in-out infinite alternate}
@keyframes sysPistonMove{from{transform:translateY(0)}to{transform:translateY(-24px)}}
.flySpin{transform-origin:120px 34px;animation:spin2 1s linear infinite}
@keyframes spin2{to{transform:rotate(360deg)}}
.spark-flash{animation:sparkFlash .16s steps(2) infinite}
@keyframes sparkFlash{0%,100%{opacity:0}50%{opacity:1}}
.spark-glow{animation:sparkGlow .16s ease-out infinite}
@keyframes sparkGlow{0%,100%{opacity:.2}50%{opacity:.95}}
.cyl-g{transition:.15s}
</style>`);


/* ================= 04 爆炸图 ================= */
function buildExplode(){
  const svg=$('#explodeSvg'); svg.innerHTML='';
  el('rect',{x:0,y:0,width:640,height:760,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=0;x<=640;x+=32)el('line',{x1:x,y1:0,x2:x,y2:760},grid);
  for(let y=0;y<=760;y+=32)el('line',{x1:0,y1:y,x2:640,y2:y},grid);
  const rect=(g,x,y,w,h,fill,ex={})=>{const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex),g);r.classList.add('shp');return r;};
  const circ=(g,cx,cy,r,fill,ex={})=>{const c=el('circle',Object.assign({cx,cy,r,fill},ex),g);c.classList.add('shp');return c;};
  const path=(g,d,fill,ex={})=>{const p=el('path',Object.assign({d,fill},ex),g);p.classList.add('shp');return p;};
  const line=(g,x1,y1,x2,y2,stroke,w=2)=>{const l=el('line',{x1,y1,x2,y2,stroke,'stroke-width':w},g);l.classList.add('shp');return l;};

  PARTS.forEach(p=>{
    const g=el('g',{'class':'pt','data-id':p.id},svg);
    /* 形状 */
    switch(p.id){
      case 1:
        rect(g,86,126,84,20,'#94a3b8',{rx:6});
        rect(g,166,116,14,40,'#64748b',{rx:3});
        break;
      case 2:
        circ(g,120,136,13,'#0f172a',{stroke:'#f59e0b','stroke-width':2});
        line(g,110,136,130,136,'#94a3b8',3);
        break;
      case 3:
        rect(g,170,110,260,66,'#475569',{rx:8});
        rect(g,178,122,32,16,'#64748b');
        rect(g,390,122,32,16,'#64748b');
        break;
      case 4:
        rect(g,212,176,176,330,'none',{stroke:'#38bdf8','stroke-width':2,'stroke-dasharray':'6 5'});
        break;
      case 5:
        rect(g,170,176,260,344,'#334155',{rx:8,stroke:'#475569'});
        line(g,186,230,414,230,'#475569',1.5);
        line(g,186,280,414,280,'#475569',1.5);
        line(g,186,330,414,330,'#475569',1.5);
        break;
      case 6:
        circ(g,486,300,64,'none',{stroke:'#64748b','stroke-dasharray':'4 5'});
        circ(g,486,300,56,'#1e293b',{stroke:'#94a3b8','stroke-width':3});
        circ(g,486,300,18,'#0f172a',{stroke:'#475569'});
        for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;circ(g,486+38*Math.cos(a),300+38*Math.sin(a),3.5,'#94a3b8');}
        break;
      case 7:
        rect(g,196,196,208,296,'none',{stroke:'#22d3ee','stroke-width':2,'stroke-dasharray':'3 6'});
        break;
      case 8:
        rect(g,292,384,12,112,'#cbd5e1',{rx:5});
        rect(g,220,352,156,52,'#e2e8f0',{rx:6,stroke:'#94a3b8'});
        rect(g,220,354,156,3,'#94a3b8');
        rect(g,220,362,156,3,'#94a3b8');
        circ(g,298,378,8,'#64748b');
        circ(g,298,492,7,'#94a3b8');
        break;
      case 9:
        path(g,'M170 520 L170 600 Q170 622 192 622 L408 622 Q430 622 430 600 L430 520 Z','#475569');
        rect(g,184,598,232,12,'#1e293b',{opacity:.55});
        break;
      case 10:
        rect(g,186,492,228,18,'#94a3b8',{rx:6});
        circ(g,300,502,30,'#475569',{stroke:'#94a3b8'});
        circ(g,300,502,10,'#1e293b');
        break;
      case 11:
        circ(g,486,92,30,'none',{stroke:'#64748b','stroke-dasharray':'3 4'});
        circ(g,486,92,24,'#0f172a',{stroke:'#94a3b8','stroke-width':3});
        circ(g,486,92,8,'#1e293b');
        break;
      case 12:
        circ(g,486,536,34,'none',{stroke:'#64748b','stroke-dasharray':'3 4'});
        circ(g,486,536,28,'#0f172a',{stroke:'#94a3b8','stroke-width':3});
        circ(g,486,536,9,'#1e293b');
        break;
      case 13:
        rect(g,492,64,14,504,'#155e75',{rx:7,stroke:'#22d3ee','stroke-width':1.5});
        line(g,499,70,499,560,'#67e8f9',1);
        break;
      case 14:
        rect(g,182,88,236,16,'#94a3b8',{rx:8});
        circ(g,238,96,14,'#64748b');
        circ(g,362,96,14,'#64748b');
        break;
      case 15:
        rect(g,452,56,86,524,'#0f172a',{rx:16,opacity:.5,stroke:'#38bdf8','stroke-width':1.5,'stroke-dasharray':'5 4'});
        circ(g,466,70,4,'#38bdf8',{opacity:.7});
        circ(g,524,70,4,'#38bdf8',{opacity:.7});
        circ(g,466,566,4,'#38bdf8',{opacity:.7});
        circ(g,524,566,4,'#38bdf8',{opacity:.7});
        break;
      case 16:
        line(g,301,114,301,168,'#94a3b8',2);
        circ(g,301,56,5,'#e2e8f0');
        rect(g,294,58,14,56,'#f8fafc',{rx:3,stroke:'#94a3b8'});
        rect(g,288,64,26,12,'#e2e8f0',{rx:2,stroke:'#94a3b8'});
        break;
    }
    /* 编号徽标 */
    const bg=el('g',{},g);
    el('circle',{class:'badge-circle',cx:p.b[0],cy:p.b[1],r:11},bg);
    el('text',{class:'badge-text',x:p.b[0],y:p.b[1],text:p.id},bg);
    /* 爆炸态标签 */
    const rightSide=[6,11,12,13,14,15].includes(p.id);
    const lg=el('g',{class:'pt-label'},g);
    const tx=rightSide?p.b[0]-24:p.b[0]+24;
    const t1=el('text',{class:'part-label',x:tx,y:p.b[1]+2,text:p.en},lg);
    t1.setAttribute('text-anchor',rightSide?'end':'start');
    const t2=el('text',{class:'part-label zh',x:tx,y:p.b[1]+16,text:p.zh},lg);
    t2.setAttribute('text-anchor',rightSide?'end':'start');
    /* 点击 */
    g.addEventListener('click',()=>selectPart(p.id));
  });
  /* 底部装饰文字 */
  el('text',{x:320,y:740,text:'ENGINE · EXPLODED VIEW 发动机爆炸图',fill:'#3b5b8f','font-size':13,'text-anchor':'middle','font-weight':700,opacity:.7},svg);
}
let selectedPart=null;
function selectPart(id){
  $$('#explodeSvg .pt').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const pn=$('#partInfoN'),pe=$('#partInfoE'),pz=$('#partInfoZ'),pd=$('#partInfoD');
  if(id==null){
    pn.textContent='?'; pe.textContent='点击任意零件编号'; pz.textContent='查看中英文名称与说明';
    pd.textContent='发动机由曲柄连杆机构、配气机构、润滑/冷却/燃油/点火系统等众多零部件组成。';
    selectedPart=null; return;
  }
  const p=PARTS.find(x=>x.id===id); selectedPart=id;
  pn.textContent=p.id; pe.textContent=p.en; pz.textContent=p.zh; pd.textContent=p.desc;
}
let exploded=false, tourTimer=null, touring=false;
$('#btnExplode').addEventListener('click',()=>{
  exploded=!exploded;
  $('#explodeSvg').classList.toggle('exploded',exploded);
  $('#btnExplode').textContent=exploded?'🔩 重新组装':'💥 爆炸拆解';
  PARTS.forEach(p=>{
    const g=$('#explodeSvg .pt[data-id="'+p.id+'"]');
    if(g)g.style.transform=exploded?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):'';
  });
  if(exploded&&touring)stopTour();
});
function stopTour(){clearTimeout(tourTimer);touring=false;$('#btnAutoTour').disabled=false;$('#btnAutoTour').textContent='▶ 自动巡讲';selectPart(null);}
$('#btnAutoTour').addEventListener('click',()=>{
  if(touring){stopTour();return;}
  if(exploded){$('#btnExplode').click();}
  touring=true; const b=$('#btnAutoTour'); b.disabled=false; b.textContent='⏹ 停止巡讲';
  let i=0;
  const step=()=>{
    if(!touring)return;
    if(i>=PARTS.length){stopTour();return;}
    selectPart(PARTS[i].id); i++;
    tourTimer=setTimeout(step,1500);
  };
  step();
});

/* ================= 05 发动机系统 ================= */
function buildSystems(){
  let running=false,isDiesel=false,rpm=0,rpmInt=null,startTimer=null;
  const grid=$('#sysGrid');
  SYSTEMS.forEach(s=>{
    const d=document.createElement('div'); d.className='sys-chip'; d.dataset.k=s.k;
    d.innerHTML=`<span class="ico">${s.ico}</span><div class="nm">${s.zh}</div><div class="en2">${s.en}</div>`;
    d.addEventListener('click',()=>{ $('#sysMsg').innerHTML=`${s.ico} <b>${s.zh} ${s.en}</b>：${s.desc}`; });
    grid.appendChild(d);
  });
  /* 小发动机 SVG（放大 + 真实曲柄连杆机构联动） */
  const svg=$('#sysEngineSvg');
  /* 静态：气缸盖、缸体、bore、火花塞、曲轴箱、TDC/BDC 刻度、飞轮 */
  el('rect',{x:104,y:28,width:112,height:20,rx:4,fill:'#334155',stroke:'#475569'},svg);
  el('rect',{x:110,y:48,width:100,height:104,rx:6,fill:'#1e293b',stroke:'#334155','stroke-width':2},svg);
  el('rect',{x:118,y:48,width:84,height:104,fill:'#0f172a'},svg);
  el('rect',{x:156,y:10,width:8,height:22,rx:2,fill:'#f8fafc',stroke:'#94a3b8'},svg);
  el('rect',{x:153,y:16,width:14,height:6,rx:1,fill:'#e2e8f0',stroke:'#94a3b8'},svg);
  el('line',{x1:160,y1:32,x2:160,y2:46,stroke:'#94a3b8','stroke-width':2},svg);
  el('circle',{cx:160,cy:170,r:58,fill:'none',stroke:'#2a3f6e','stroke-width':2},svg);
  el('line',{x1:88,y1:50,x2:36,y2:50,stroke:'#38bdf8','stroke-width':1.5},svg);
  el('text',{x:34,y:54,text:'TDC',fill:'#38bdf8','font-size':9,'text-anchor':'end','font-weight':700},svg);
  el('line',{x1:88,y1:98,x2:36,y2:98,stroke:'#64748b','stroke-width':1.5},svg);
  el('text',{x:34,y:102,text:'BDC',fill:'#94a3b8','font-size':9,'text-anchor':'end','font-weight':700},svg);
  el('circle',{cx:250,cy:120,r:50,fill:'none',stroke:'#4b5b7a','stroke-dasharray':'4 5'},svg);
  el('circle',{cx:250,cy:120,r:45,fill:'#0f172a',stroke:'#94a3b8','stroke-width':2.5},svg);
  el('circle',{cx:250,cy:120,r:8,fill:'#475569'},svg);
  /* 动态组：活塞/连杆/曲柄/曲柄销/飞轮标记 */
  const dynG=el('g',{},svg);
  const rodG=el('line',{stroke:'#94a3b8','stroke-width':9,'stroke-linecap':'round'},dynG);
  const crankArm=el('line',{stroke:'#fbbf24','stroke-width':7,'stroke-linecap':'round'},dynG);
  el('circle',{cx:160,cy:170,r:30,fill:'#334155',stroke:'#475569'},dynG);
  const cpin=el('circle',{r:9,fill:'#fbbf24',stroke:'#b45309'},dynG);
  const pistonG=el('g',{},dynG);
  el('rect',{x:118,y:0,width:86,height:44,rx:5,fill:'#e2e8f0',stroke:'#94a3b8'},pistonG);
  el('rect',{x:118,y:3,width:86,height:3,fill:'#94a3b8'},pistonG);
  el('rect',{x:118,y:9,width:86,height:3,fill:'#94a3b8'},pistonG);
  el('circle',{cx:161,cy:22,r:6,fill:'#64748b'},pistonG);
  const flyMark=el('line',{x1:250,y1:120,x2:250,y2:78,stroke:'#fbbf24','stroke-width':3.5,'stroke-linecap':'round'},dynG);
  /* 真实曲柄连杆机构动画 */
  const CR_R=24, CR_L=74, CR_CY=170, CR_CX=160;
  const pinYfn=ang=>CR_CY-CR_R*Math.cos(ang)-Math.sqrt(Math.max(0,CR_L*CR_L-Math.pow(CR_R*Math.sin(ang),2)));
  let ang=0;
  (function miniLoop(){
    if(running) ang+=0.05+(rpm/820)*0.12;
    const cpx=CR_CX+CR_R*Math.sin(ang), cpy=CR_CY-CR_R*Math.cos(ang);
    const py=pinYfn(ang), pTop=py-22;
    pistonG.setAttribute('transform','translate(0,'+pTop+')');
    rodG.setAttribute('x1',CR_CX); rodG.setAttribute('y1',py);
    rodG.setAttribute('x2',cpx); rodG.setAttribute('y2',cpy);
    crankArm.setAttribute('x1',CR_CX); crankArm.setAttribute('y1',CR_CY);
    crankArm.setAttribute('x2',cpx); crankArm.setAttribute('y2',cpy);
    cpin.setAttribute('cx',cpx); cpin.setAttribute('cy',cpy);
    flyMark.setAttribute('transform','rotate('+(ang*180/Math.PI)+' 250 120)');
    requestAnimationFrame(miniLoop);
  })();
  /* 启动流程 */
  const chips=()=>$$('#sysGrid .sys-chip');
  const setRpm=()=>{ $('#rpmText').textContent='RPM '+rpm+(running?' · 怠速运转中':' · 已停机'); };
  const engineBox=$('#engineBox');
  $('#btnStart').addEventListener('click',()=>{
    if(running){toast('发动机已经在运转啦');return;}
    if(startTimer)clearTimeout(startTimer);
    $('#btnStart').disabled=true; $('#btnStop').disabled=false;
    let step=0;
    const order=isDiesel?['fuel','cooling','lubrication','starting']:['fuel','cooling','lubrication','ignition','starting'];
    const seq=()=>{
      if(step<order.length){
        const k=order[step];
        chips().forEach(c=>c.classList.remove('on'));
        chips().forEach(c=>c.classList.add(c.dataset.k===k?'on':'off'));
        const s=SYSTEMS.find(x=>x.k===k);
        $('#sysMsg').innerHTML=`${s.ico} 第 ${step+1} 步：<b>${s.zh} ${s.en}</b> 已启动…`;
        step++; startTimer=setTimeout(seq,900);
      }else{
        running=true; engineBox.classList.add('running');
        chips().forEach(c=>{c.classList.remove('off');c.classList.add('on');});
        if(isDiesel){ const ig=$('#sysGrid .sys-chip[data-k="ignition"]'); ig.classList.remove('on'); ig.classList.add('off'); }
        $('#sysMsg').innerHTML='✅ <b>发动机启动成功！</b>各系统协同工作，活塞往复运动，动力源源不断输出。';
        rpm=0; clearInterval(rpmInt);
        rpmInt=setInterval(()=>{ if(running&&rpm<820)rpm+=40; setRpm(); },90);
        $('#btnStart').disabled=false;
      }
    };
    seq();
  });
  $('#btnStop').addEventListener('click',()=>{
    running=false; engineBox.classList.remove('running');
    clearInterval(rpmInt);
    rpmInt=setInterval(()=>{ if(rpm>0)rpm-=60; setRpm(); if(rpm<=0){clearInterval(rpmInt);setRpm();} },90);
    chips().forEach(c=>c.classList.remove('on','off'));
    $('#sysMsg').innerHTML='⏹ 发动机已熄火。再点"启动发动机"体验一次吧！';
  });
  $('#btnFuelToggle').addEventListener('click',()=>{
    isDiesel=!isDiesel;
    $('#btnFuelToggle').textContent=isDiesel?'🔄 切换：柴油机':'🔄 切换：汽油机';
    $('#dieselTip').style.display=isDiesel?'':'none';
    if(running){$('#btnStop').click();}
    const ig=$('#sysGrid .sys-chip[data-k="ignition"]');
    if(isDiesel){ ig.classList.add('off'); ig.querySelector('.nm').textContent='点火系统（无）'; }
    else{ ig.classList.remove('off'); ig.querySelector('.nm').textContent='点火系统'; }
  });
}

/* ================= 06 气缸排列 ================= */
const CYL={
  inline:{draw:(svg,t)=>{/* 直列：侧视图 4 缸 */
    el('rect',{x:40,y:50,width:540,height:150,rx:12,fill:'#e8eef7',stroke:'#94a3b8'},svg);
    el('text',{x:70,y:38,text:'直列式 Inline · 垂直排成一线',fill:'#2563eb','font-size':15,'font-weight':800},svg);
    const bores=[80,180,280,380];
    bores.forEach((bx,i)=>{
      el('rect',{x:bx,y:80,width:90,height:118,rx:6,fill:'#f8fafc',stroke:'#94a3b8'},svg);
      el('text',{x:bx+45,y:72,text:'缸 '+(i+1),fill:'#64748b','font-size':12,'font-weight':700,'text-anchor':'middle'},svg);
    });
    const crankY=210, R=26;
    bores.forEach((bx,i)=>{
      const off=[0,Math.PI,3*Math.PI,2*Math.PI][i];
      const a=t+off;
      const py=88+92*(0.5-0.5*Math.cos(a));
      const pin=[bx+45+R*Math.sin(a), crankY-R*Math.cos(a)];
      el('line',{x1:bx+45,y1:py+38,x2:pin[0],y2:pin[1],stroke:'#94a3b8','stroke-width':5,'stroke-linecap':'round'},svg);
      const g=el('g',{class:'piston-cyl','data-cyl':i+1},svg);
      el('circle',{cx:bx+45,cy:crankY,r:R,fill:'#475569',stroke:'#94a3b8'},g);
      el('circle',{cx:pin[0],cy:pin[1],r:5,fill:'#fbbf24'},g);
      el('rect',{class:'piston-body',x:bx+5,y:py,width:80,height:38,rx:4,fill:'#3b82f6',stroke:'#1d4ed8'},g);
    });
    el('line',{x1:40,y1:236,x2:580,y2:236,stroke:'#1e293b','stroke-width':4},svg);
  }},
  v:{draw:(svg,t)=>{
    el('text',{x:310,y:36,text:'V型 V-type · 两组气缸倾斜 60°',fill:'#2563eb','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
    const cx=310,cy=205,Rc=44;
    const banks=[[210,3],[330,3]]; /* 每组 3 缸，bank 方向角 */
    const offL=[0,Math.PI,3*Math.PI], offR=[Math.PI,3*Math.PI,2*Math.PI];
    let ci=1;
    banks.forEach((bk,bi)=>{
      const ang=bk[0]*Math.PI/180, n=bk[1];
      for(let i=0;i<n;i++){
        const d=78+i*64;
        const cxx=cx+d*Math.cos(ang), cyy=cy+d*Math.sin(ang);
        const off=(bi===0?offL[i]:offR[i]);
        const a=t+off;
        const ext=10*Math.sin(a);
        const px=cxx+Math.cos(ang)*ext, py=cyy+Math.sin(ang)*ext;
        el('circle',{cx:cxx,cy:cyy,r:36,fill:'#eef2f8',stroke:'#94a3b8'},svg);
        el('line',{x1:cx,y1:cy,x2:cxx,y2:cyy,stroke:'#cbd5e1','stroke-width':4},svg);
        const g=el('g',{class:'piston-cyl','data-cyl':ci++},svg);
        el('circle',{class:'piston-body',cx:px,cy:py,r:21,fill:'#f59e0b',stroke:'#b45309'},g);
      }
    });
    el('circle',{cx,cy,r:Rc,fill:'#475569',stroke:'#94a3b8'},svg);
    el('circle',{cx:cx+Rc*0.5*Math.sin(t),cy:cy-Rc*0.5*Math.cos(t),r:6,fill:'#fbbf24'},svg);
    el('path',{d:'M180 118 L310 205 L440 118',fill:'none',stroke:'#94a3b8','stroke-width':2,'stroke-dasharray':'5 4'},svg);
    el('text',{x:180,y:106,text:'60°',fill:'#64748b','font-size':13,'font-weight':700,'text-anchor':'middle'},svg);
    el('text',{x:310,y:330,text:'V6 · 每组 3 缸',fill:'#64748b','font-size':12,'font-weight':700,'text-anchor':'middle'},svg);
  }},
  opposed:{draw:(svg,t)=>{
    el('text',{x:310,y:36,text:'水平对置 Opposed · 两排气缸互为 180°',fill:'#2563eb','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
    const cy=180,Rc=36;
    const offL=[0,Math.PI], offR=[Math.PI,3*Math.PI];
    let ci=1;
    [[-1,offL],[1,offR]].forEach((bk,bi)=>{
      const sgn=bk[0];
      for(let i=0;i<2;i++){
        const dx=(70+i*74)*sgn;
        const off=(bi===0?offL[i]:offR[i]);
        const a=t+off;
        const ext=13*Math.sin(a);
        el('circle',{cx:310+dx,cy,r:38,fill:'#eef2f8',stroke:'#94a3b8'},svg);
        el('line',{x1:310,y1:cy,x2:310+dx,y2:cy,stroke:'#cbd5e1','stroke-width':4},svg);
        const g=el('g',{class:'piston-cyl','data-cyl':ci++},svg);
        el('circle',{class:'piston-body',cx:310+dx+ext*sgn,cy,r:23,fill:'#16a34a',stroke:'#15803d'},g);
      }
    });
    el('circle',{cx:310,cy,r:Rc,fill:'#475569',stroke:'#94a3b8'},svg);
    el('circle',{cx:310+Rc*0.5*Math.sin(t),cy:cy-Rc*0.5*Math.cos(t),r:6,fill:'#fbbf24'},svg);
    el('text',{x:310,y:320,text:'Boxer 拳击手 · 左右各 2 缸',fill:'#64748b','font-size':12,'font-weight':700,'text-anchor':'middle'},svg);
  }},
};
function buildCylinders(){
  const tabs=$('#arrTabs');
  ARRS.forEach(a=>{
    const b=document.createElement('button'); b.className='arr-tab'+(a.k==='inline'?' on':''); b.dataset.k=a.k;
    b.textContent=a.zh+' '+a.en; tabs.appendChild(b);
  });
  const svg=$('#cylSvg');
  let cur='inline', t=0, hl=null;
  const draw=()=>{
    svg.innerHTML='';
    CYL[cur].draw(svg,t);
    if(hl){ svg.querySelectorAll('.piston-cyl').forEach(g=>g.classList.toggle('cyl-hl',g.dataset.cyl==String(hl))); }
  };
  const info=$('#cylInfo'), note=$('#cylCrankNote');
  const showInfo=()=>{
    const a=ARRS.find(x=>x.k===cur);
    info.innerHTML=a.cn;
  };
  showInfo();
  tabs.addEventListener('click',e=>{
    const b=e.target.closest('.arr-tab'); if(!b)return;
    $$('.arr-tab').forEach(x=>x.classList.remove('on')); b.classList.add('on');
    cur=b.dataset.k; hl=null; showInfo();
  });
  svg.addEventListener('click',e=>{
    const pt=e.target.closest('.piston-cyl');
    if(pt){ hl=Number(pt.dataset.cyl); info.innerHTML=`<b>第 ${hl} 缸 Cylinder ${hl}</b>：活塞在缸内做直线往复运动。${ARRS.find(x=>x.k===cur).cn}`; }
  });
  (function loop(){ t+=0.035; draw(); requestAnimationFrame(loop); })();
  setInterval(()=>{ note.textContent='曲轴转角 θ = '+Math.round((t*57.2958)%360)+'° · 活塞往复运动带动曲轴连续旋转'; },400);
}

/* ================================================================
   PART 3 · 四冲程核心动画 + 练习 + 思维导图 + 初始化
================================================================ */
document.head.insertAdjacentHTML('beforeend',`<style>
.part-label.zh{fill:#7dd3fc;font-size:10.5px}
</style>`);

/* ================= 07 四冲程动画 ================= */
const FOUR=(function(){
  const svg=$('#fourSvg');
  const CRANK={cx:260,cy:470,R:70,L:170};
  const PTOP={tdc:181,bdc:321};           /* 活塞顶 y 范围（与连杆机构一致） */
  const pinY=θ=>CRANK.cy-CRANK.R*Math.cos(θ)-Math.sqrt(CRANK.L*CRANK.L-Math.pow(CRANK.R*Math.sin(θ),2));
  const pistonTop=θ=>pinY(θ)-49;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const lerpColor=(c1,c2,u)=>{const p=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const a=p(c1),b=p(c2);return 'rgb('+Math.round(lerp(a[0],b[0],u))+','+Math.round(lerp(a[1],b[1],u))+','+Math.round(lerp(a[2],b[2],u))+')';};

  /* ---- 静态部件 ---- */
  const head=el('g',{},svg);
  el('rect',{x:110,y:104,width:300,height:66,rx:8,fill:'#334155',stroke:'#475569'},head);
  el('rect',{x:64,y:112,width:46,height:20,rx:4,fill:'#475569'},head);            /* 进气道 */
  el('rect',{x:110,y:118,width:22,height:16,fill:'#0f172a'},head);
  el('rect',{x:450,y:112,width:46,height:20,rx:4,fill:'#475569'},head);           /* 排气道 */
  el('rect',{x:428,y:118,width:22,height:16,fill:'#0f172a'},head);
  el('text',{x:86,y:104,text:'IN 进气',fill:'#7dd3fc','font-size':10,'font-weight':700,'text-anchor':'middle'},svg);
  el('text',{x:474,y:104,text:'EX 排气',fill:'#94a3b8','font-size':10,'font-weight':700,'text-anchor':'middle'},svg);
  /* 火花塞 */
  el('rect',{x:252,y:64,width:18,height:42,rx:3,fill:'#f8fafc',stroke:'#94a3b8'},svg);
  el('rect',{x:247,y:70,width:28,height:12,rx:2,fill:'#e2e8f0',stroke:'#94a3b8'},svg);
  el('circle',{cx:261,cy:58,r:5,fill:'#e2e8f0'},svg);
  el('line',{x1:261,y1:106,x2:261,y2:126,stroke:'#94a3b8','stroke-width':2},svg);
  /* 缸体 */
  el('rect',{x:124,y:170,width:272,height:300,rx:8,fill:'#1e293b',stroke:'#334155'},svg);
  el('rect',{x:140,y:170,width:240,height:200,fill:'#0f172a'},svg);
  /* TDC / BDC 标记 */
  el('line',{x1:116,y1:181,x2:134,y2:181,stroke:'#38bdf8','stroke-width':2},svg);
  el('text',{x:110,y:185,text:'TDC 上止点',fill:'#38bdf8','font-size':9.5,'font-weight':700,'text-anchor':'end'},svg);
  el('line',{x1:116,y1:321,x2:134,y2:321,stroke:'#64748b','stroke-width':2},svg);
  el('text',{x:110,y:325,text:'BDC 下止点',fill:'#94a3b8','font-size':9.5,'font-weight':700,'text-anchor':'end'},svg);
  /* 曲轴箱 + 飞轮 */
  el('circle',{cx:CRANK.cx,cy:CRANK.cy,r:88,fill:'none',stroke:'#2a3f6e'},svg);
  el('circle',{cx:455,cy:320,r:58,fill:'none',stroke:'#475569','stroke-dasharray':'4 5'},svg);
  el('circle',{cx:455,cy:320,r:52,fill:'#0f172a',stroke:'#475569'},svg);
  el('text',{x:455,y:398,text:'飞轮 Flywheel',fill:'#8fa6d4','font-size':9.5,'text-anchor':'middle'},svg);
  /* 压力表 */
  el('rect',{x:514,y:200,width:12,height:220,rx:6,fill:'#0f172a',stroke:'#334155'},svg);
  el('text',{x:520,y:448,text:'压力',fill:'#8fa6d4','font-size':9.5,'text-anchor':'middle'},svg);
  /* 气门组 */
  const iv=el('g',{class:'valve-intake'},svg);  /* 进气门（红） */
  el('rect',{x:128,y:114,width:8,height:38,fill:'#ef4444'},iv);
  el('ellipse',{cx:132,cy:152,rx:17,ry:7,fill:'#ef4444',stroke:'#b91c1c'},iv);
  const ev=el('g',{class:'valve-exhaust'},svg);  /* 排气门（蓝） */
  el('rect',{x:344,y:114,width:8,height:38,fill:'#3b82f6'},ev);
  el('ellipse',{cx:348,cy:152,rx:17,ry:7,fill:'#3b82f6',stroke:'#1d4ed8'},ev);
  /* 火花（动态组） */
  const spark=el('g',{},svg);
  el('circle',{class:'spark-glow',cx:261,cy:146,r:20,fill:'#fbbf24',opacity:.5},spark);
  el('path',{class:'spark-flash',d:'M257 158 L262 146 L258 146 L265 132 L260 132 L268 116 L264 128 L268 128 L261 140 L265 140 L259 152 Z',fill:'#fef08a',stroke:'#f97316','stroke-width':1},spark);
  /* 大标题文本 */
  const bigEn=el('text',{class:'fourTitle',x:280,y:54,fill:'#ffffff','font-size':17,'font-weight':800,'text-anchor':'middle'},svg);
  const bigZh=el('text',{x:280,y:74,fill:'#38bdf8','font-size':13.5,'font-weight':800,'text-anchor':'middle'},svg);
  const infoT1=el('text',{x:280,y:606,fill:'#8fa6d4','font-size':11,'text-anchor':'middle'},svg);
  const infoT2=el('text',{x:280,y:624,fill:'#8fa6d4','font-size':11,'text-anchor':'middle'},svg);
  const infoT3=el('text',{x:280,y:644,fill:'#cbd5e1','font-size':11,'font-weight':700,'text-anchor':'middle'},svg);
  /* 动态组 */
  const dyn=el('g',{},svg);
  const pgroup=el('g',{},dyn);
  const rod=el('line',{stroke:'#94a3b8','stroke-width':11,'stroke-linecap':'round'},pgroup);
  el('rect',{class:'fourPiston',x:152,y:198,width:216,height:46,rx:6,fill:'#e2e8f0',stroke:'#94a3b8'},pgroup);
  const pistonRect=pgroup.querySelector('.fourPiston');
  el('rect',{x:152,y:200,width:216,height:4,fill:'#94a3b8'},pgroup);
  el('rect',{x:152,y:207,width:216,height:4,fill:'#94a3b8'},pgroup);
  const pinDot=el('circle',{r:8,fill:'#64748b'},pgroup);
  const disc=el('circle',{cx:CRANK.cx,cy:CRANK.cy,r:46,fill:'#334155',stroke:'#475569'},dyn);
  const cw=el('circle',{r:22,fill:'#475569'},dyn);            /* 平衡重 */
  const cpin=el('circle',{r:8,fill:'#fbbf24'},dyn);           /* 曲柄销 */
  const flyMark=el('g',{},dyn);
  el('line',{x1:455,y1:320,x2:455,y2:276,stroke:'#fbbf24','stroke-width':3,'stroke-linecap':'round'},flyMark);
  const gaugeFill=el('rect',{class:'gaugeFill',x:517,y:420,width:6,height:0,fill:'#f97316'},dyn);
  const partsG=el('g',{},dyn);

  /* ---- 状态 ---- */
  let t=0, speed=1, running=false, prevP=-1;
  let particles=[];
  const FIRE=['#fef08a','#fde047','#fb923c','#f97316','#ef4444','#facc15'];
  const rand=Math.random;

  function onPhaseEnter(p){
    if(p===2){ /* 做功：全部变火焰 + 火花附近迸发 */
      particles.forEach(pt2=>{pt2.col=FIRE[(rand()*FIRE.length)|0];pt2.r=3+rand()*1.6;});
      for(let k=0;k<6;k++)particles.push({x:238+rand()*46,y:176+rand()*14,vx:(rand()-.5)*2.2,vy:1.2+rand()*2.6,col:FIRE[(rand()*FIRE.length)|0],r:3+rand()*1.8});
      if(particles.length>60)particles=particles.slice(-60);
    }
    if(p===3){ particles.forEach(pt2=>{pt2.col='#94a3b8';pt2.r=2.6;}); }
  }
  function spawnIntake(){
    if(particles.length<46)for(let k=0;k<3;k++)particles.push({x:142+rand()*36,y:172+rand()*10,vx:.15+rand()*.5,vy:.4+rand()*.9,col:'#7dd3fc',r:2.6+rand()*1.2});
  }

  function draw(){
    const θ=t*Math.PI, p=Math.floor(t), u=t-p;
    const pTop=pistonTop(θ);
    const prevTop=pistonTop(θ-dt*Math.PI)||PTOP.bdc;
    const scale=(pTop-170)/Math.max(20,(prevTop-170));
    /* 粒子 */
    if(p===0)spawnIntake();
    particles.forEach(pt2=>{
      if(p===0){ pt2.y+=pt2.vy; pt2.x+=pt2.vx; if(pt2.y>pTop-5){pt2.y=pTop-5;pt2.x=Math.min(Math.max(pt2.x,150),366);} pt2.col='#7dd3fc'; }
      else if(p===1){ pt2.y=170+(pt2.y-170)*scale; if(pt2.y>pTop-5)pt2.y=pTop-5; pt2.col=lerpColor('#7dd3fc','#a855f7',u); pt2.r=3+u*1.6; }
      else if(p===2){ pt2.y=170+(pt2.y-170)*scale; pt2.y+=pt2.vy*.4; if(pt2.y>pTop-5)pt2.y=pTop-5; }
      else if(p===3){ pt2.y=170+(pt2.y-170)*scale; pt2.y-=1.7; if(pt2.y<180){pt2.x+=(352-pt2.x)*.16;} }
    });
    if(p===3)particles=particles.filter(pt2=>!(pt2.x>326&&pt2.y<174));
    /* 绘制粒子 */
    partsG.innerHTML='';
    particles.forEach(pt2=>{
      const c=el('circle',{cx:pt2.x,cy:pt2.y,r:pt2.r,fill:pt2.col},partsG);
      c.setAttribute('opacity',p===2?(1-u*.45):1);
    });
    /* 活塞 + 曲柄连杆 */
    const pin=[CRANK.cx, pinY(θ)];
    const cp=[CRANK.cx+CRANK.R*Math.sin(θ), CRANK.cy-CRANK.R*Math.cos(θ)];
    pgroup.setAttribute('transform','translate(0,'+(pTop-198)+')');
    rod.setAttribute('x1',CRANK.cx); rod.setAttribute('y1',pin[1]-pTop+198);
    rod.setAttribute('x2',cp[0]); rod.setAttribute('y2',cp[1]);
    pinDot.setAttribute('cx',CRANK.cx); pinDot.setAttribute('cy',pin[1]);
    cw.setAttribute('cx',CRANK.cx-CRANK.R*.72*Math.sin(θ));
    cw.setAttribute('cy',CRANK.cy+CRANK.R*.72*Math.cos(θ));
    cpin.setAttribute('cx',cp[0]); cpin.setAttribute('cy',cp[1]);
    flyMark.setAttribute('transform','rotate('+(θ*180/Math.PI)+' 455 320)');
    /* 气门 */
    const iOpen=(p===0)?(u<.08?u/.08:(u>.86?Math.max(0,1-(u-.86)/.14):1)):0;
    const eOpen=(p===3)?(u<.08?u/.08:(u>.86?Math.max(0,1-(u-.86)/.14):1)):0;
    iv.setAttribute('transform','rotate('+(-38*iOpen)+' 132 112)');
    ev.setAttribute('transform','rotate('+(38*eOpen)+' 348 112)');
    /* 火花 */
    spark.style.display=(p===2&&u<.16)?'':'none';
    /* 压力表 */
    let pv=p===0?.18:(p===1?.2+.65*u:(p===2?(u<.12?1:Math.max(.35,1-(u-.12)*.9)):.22));
    gaugeFill.setAttribute('y',420-pv*216); gaugeFill.setAttribute('height',pv*216);
    gaugeFill.setAttribute('fill',pv>.7?'#ef4444':(pv>.45?'#f97316':'#fbbf24'));
    /* 文本 */
    const S=STROKES[p];
    bigEn.textContent=S.en;
    bigEn.setAttribute('fill',S.c);
    bigZh.textContent=S.zh+'  Stroke '+(p+1)+'/4';
    infoT1.textContent='曲轴转角 θ = '+Math.round((θ*180/Math.PI)%360)+'° · 一个循环共 720°';
    infoT2.textContent='气门状态：进气门 '+(iOpen>.4?'开':'关')+' · 排气门 '+(eOpen>.4?'开':'关')+' | '+S.state;
    infoT3.textContent='活塞：'+(pTop<251?'上行 ↑':'下行 ↓')+' · 当前位置 '+(pTop<=PTOP.tdc+2?'上止点':pTop>=PTOP.bdc-2?'下止点':'行程中');
    /* 外部同步 */
    if(p!==prevP){ prevP=p; onPhaseEnter(p); }
    syncUI(p);
  }
  function syncUI(p){
    $$('.phase-btn').forEach(b=>b.classList.toggle('on',Number(b.dataset.p)===p+1));
    $$('.leg-item').forEach(l=>l.classList.toggle('on',Number(l.dataset.p)===p+1));
    const S=STROKES[p];
    $('#narration').querySelector('.ntag').className='ntag '+S.tag;
    $('#narrText').innerHTML=S.narr;
  }
  /* 控制（先构建按钮，再绑定事件） */
  const pb=$('#btnPlayPause');
  const setPlay=()=>{ pb.textContent=running?'⏸':'▶'; };
  (function(){
    const pbx=$('#fourPhaseBtns'), lg=$('#fourLegend');
    STROKES.forEach(s=>{
      const b=document.createElement('button');
      b.className='phase-btn'; b.dataset.p=s.n;
      b.innerHTML=s.n+' · '+s.zh; pbx.appendChild(b);
      const li=document.createElement('div'); li.className='leg-item'; li.dataset.p=s.n;
      li.innerHTML='<div class="t">'+s.n+' '+s.zh+'</div><div class="s">'+s.en+'</div>';
      lg.appendChild(li);
    });
  })();
  $('#btnPlayPause').addEventListener('click',()=>{ running=!running; setPlay(); });
  $('#btnRestart').addEventListener('click',()=>{ running=false; t=0; prevP=-1; setPlay(); });
  $('#btnStepFwd').addEventListener('click',()=>{ running=false; setPlay(); t=Math.floor(t+1e-4)+1; if(t>=4)t=0; prevP=-1; });
  $('#btnStepBack').addEventListener('click',()=>{ running=false; setPlay(); t=Math.ceil(t-1e-4)-1; if(t<0)t=3; prevP=-1; });
  $('#speedRange').addEventListener('input',e=>{ speed=Number(e.target.value); });
  $$('.phase-btn').forEach(b=>b.addEventListener('click',()=>{ running=false; setPlay(); t=Number(b.dataset.p)-1; prevP=-1; }));
  $$('.leg-item').forEach(l=>l.addEventListener('click',()=>{ running=false; setPlay(); t=Number(l.dataset.p)-1; prevP=-1; }));
  /* 主循环 */
  let dt=1/132;
  (function loop(){
    if(running){ t=(t+dt*speed)%4; }
    draw();
    requestAnimationFrame(loop);
  })();
  /* 首次可见自动播放 */
  let autoStarted=false;
  const autoplay=()=>{ if(!autoStarted){ autoStarted=true; running=true; setPlay(); ob.disconnect(); } };
  const ob=new IntersectionObserver(es=>{
    if(es[0].isIntersecting&&!autoStarted){ autoplay(); }
  },{threshold:.05});
  ob.observe($('#sec-four'));
  window.__FOUR={ get t(){return t;}, get p(){return Math.floor(t);}, get running(){return running;}, autoplay };
  return {};
})();


/* ================= 09 思维导图 ================= */
/* mermaid 流程图模式 */
const MERMAID_CDNS=[
  'https://cdn.staticfile.org/mermaid/10.9.1/mermaid.min.js',
  'https://cdn.bootcdn.net/ajax/libs/mermaid/10.9.1/mermaid.min.js',
  'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js'
];
function loadMermaid(){
  return new Promise(res=>{
    if(window.mermaid){ res(true); return; }
    let i=0;
    const tryNext=()=>{
      if(i>=MERMAID_CDNS.length){ res(false); return; }
      const s=document.createElement('script');
      s.src=MERMAID_CDNS[i++];
      s.onload=()=>{ if(window.mermaid){ mermaid.initialize({startOnLoad:false,theme:'neutral',securityLevel:'loose'}); res(true);} else res(false); };
      s.onerror=tryNext;
      document.head.appendChild(s);
    };
    tryNext();
  });
}
function mindMode(m){
  const cls=document.getElementById('mindClassic'), mer=document.getElementById('mindMermaid');
  if(!cls||!mer)return;
  if(m==='mermaid'){
    cls.style.display='none'; mer.style.display='';
    document.getElementById('btnMindClassic').classList.remove('act');
    document.getElementById('btnMindMermaid').classList.add('act');
    loadMermaid().then(ok=>{
      if(ok&&window.mermaid){
        try{ document.querySelectorAll('#mindMermaid .mermaid').forEach(e=>e.removeAttribute('data-processed')); mermaid.run({nodes:[document.querySelector('#mindMermaid .mermaid')]}); }catch(err){}
      }else{ toast('流程图组件加载失败（网络原因），已保持经典知识树'); }
    });
  }else{
    cls.style.display=''; mer.style.display='none';
    document.getElementById('btnMindMermaid').classList.remove('act');
    document.getElementById('btnMindClassic').classList.add('act');
  }
}

/* ---------- 3D 发动机（three.js）加载器：本模块自带，避免依赖框架全局 ---------- */
let threeInited=false;
function init3D(){
  const box=document.getElementById('threeBox'), note=document.getElementById('threeNote');
  if(!box)return;
  box.style.display='';
  note.textContent='正在加载 three.js 组件…';
  loadThree().then(ok=>{
    if(!ok){ note.textContent='⚠️ 3D 组件加载失败（网络原因），可稍后重试；不影响其他内容。'; box.style.display='none'; threeInited=false; const b=document.getElementById('btn3D'); if(b){b.disabled=false;b.textContent='▶ 加载 3D 模型';} return; }
    note.textContent='🖱️ 拖拽旋转 · 滚轮缩放 · 活塞自动往复';
    const b=document.getElementById('btn3D');
    if(b){ b.disabled=false; b.textContent='🙈 隐藏 3D'; }
    buildEngine3D(box);
  });
}
function buildEngine3D(box){
  const THREE=window.THREE;
  const W=box.clientWidth||600, H=box.clientHeight||430;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0d1b36);
  const camera=new THREE.PerspectiveCamera(45,W/H,0.1,100);
  camera.position.set(3.2,2.0,4.4);
  let renderer=null;
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }
  catch(e){ const n=document.getElementById('threeNote'); if(n)n.textContent='⚠️ 当前设备不支持 3D（WebGL 不可用）。'; return; }
  renderer.setSize(W,H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  box.innerHTML=''; box.appendChild(renderer.domElement);
  /* 灯光 */
  scene.add(new THREE.HemisphereLight(0xffffff,0x2a3f6e,0.7));
  const key=new THREE.DirectionalLight(0xffffff,1.0); key.position.set(5,9,7); scene.add(key);
  const fill=new THREE.DirectionalLight(0x66aaff,0.45); fill.position.set(-6,-3,-6); scene.add(fill);
  const rim=new THREE.DirectionalLight(0xffaa66,0.4); rim.position.set(0,2,-8); scene.add(rim);
  /* 地面 */
  const grid=new THREE.GridHelper(10,20,0x2a3f6e,0x1b2b4d); grid.position.y=-1.98; scene.add(grid);
  const floor=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,0.05,48),new THREE.MeshStandardMaterial({color:0x111c33,metalness:.8,roughness:.4}));
  floor.position.y=-1.95; floor.receiveShadow=true; scene.add(floor);
  const grp=new THREE.Group(); scene.add(grp);
  /* 材质（金属 + 清漆） */
  const M=(c,opt={})=>new THREE.MeshPhysicalMaterial(Object.assign({color:c,metalness:.75,roughness:.3,clearcoat:.6,clearcoatRoughness:.3},opt));
  const matAl=M(0xcbd5e1), matAl2=M(0x94a3b8), matGold=M(0xfbbf24,{metalness:.9,roughness:.25});
  const matBlock=M(0x2b3a55,{metalness:.4,transparent:true,opacity:.85});
  const matHead=M(0x475569), matDark=M(0x0f172a,{metalness:.5,roughness:.5}), matWhite=M(0xf8fafc,{metalness:.1,roughness:.4});
  /* 缸体（半透明）+ 4 个气缸 */
  const block=new THREE.Mesh(new THREE.BoxGeometry(2.6,0.95,1.4),matBlock); block.position.y=-0.9; block.castShadow=true; grp.add(block);
  const boreMat=new THREE.MeshPhysicalMaterial({color:0x0f172a,metalness:.4,roughness:.4,transparent:true,opacity:.3,side:THREE.DoubleSide});
  const xs=[-0.9,-0.3,0.3,0.9];
  xs.forEach(x=>{ const b=new THREE.Mesh(new THREE.CylinderGeometry(0.255,0.255,0.95,28,1,true),boreMat); b.position.set(x,-0.9,0); grp.add(b); });
  /* 气缸盖 + 火花塞 */
  const head=new THREE.Mesh(new THREE.BoxGeometry(2.6,0.2,1.4),matHead); head.position.y=-0.4; head.castShadow=true; grp.add(head);
  xs.forEach(x=>{ const sp=new THREE.Mesh(new THREE.CylinderGeometry(0.032,0.032,0.32,10),matWhite); sp.position.set(x,-0.22,0); grp.add(sp); });
  /* 油底壳 + 进/排气歧管 */
  const pan=new THREE.Mesh(new THREE.BoxGeometry(2.4,0.22,1.2),matHead); pan.position.y=-1.46; grp.add(pan);
  const intake=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,1.0,12),matAl2); intake.position.set(-1.5,-0.52,0); intake.rotation.z=Math.PI/2.4; grp.add(intake);
  const exhaust=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.11,1.0,12),matAl2); exhaust.position.set(1.5,-0.52,0); exhaust.rotation.z=-Math.PI/2.4; grp.add(exhaust);
  /* 飞轮（右端，随曲轴旋转） */
  const flyG=new THREE.Group(); flyG.position.set(1.42,0,0); grp.add(flyG);
  const fly=new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.46,0.09,40),matDark); fly.rotation.z=Math.PI/2; flyG.add(fly);
  const flyRing=new THREE.Mesh(new THREE.TorusGeometry(0.42,0.028,10,42),matGold); flyRing.position.x=0.07; flyRing.rotation.y=Math.PI/2; flyG.add(flyRing);
  const flyMark=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.08,0.05),matGold); flyMark.position.set(0.07,0.30,0); flyG.add(flyMark);
  /* 曲轴：主轴 + 曲柄臂 + 连杆 + 活塞 */
  const mainShaft=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,2.9,16),matAl2); mainShaft.rotation.z=Math.PI/2; grp.add(mainShaft);
  const R=0.34, L=0.95;
  const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
  const up=new THREE.Vector3(0,1,0), dir=new THREE.Vector3();
  const pinY=ang=>-R*Math.cos(ang)-Math.sqrt(Math.max(0,L*L-Math.pow(R*Math.sin(ang),2)));
  function cylBetween(v1,v2,r,mat){
    const d=new THREE.Vector3().subVectors(v2,v1); const len=d.length();
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,10),mat);
    mesh.position.copy(v1).add(v2).multiplyScalar(.5);
    mesh.quaternion.setFromUnitVectors(up,d.clone().normalize());
    return mesh;
  }
  const pistons=[], rods=[], arms=[], pins=[];
  const PHASE=[0,Math.PI,3*Math.PI,2*Math.PI];
  xs.forEach((x,i)=>{
    const piston=new THREE.Mesh(new THREE.CylinderGeometry(0.235,0.235,0.18,22),matAl); piston.castShadow=true; grp.add(piston); pistons.push(piston);
    const rod=cylBetween(V3(x,-R-L,0),V3(x,-R,0),0.032,matAl2); grp.add(rod); rods.push(rod);
    const arm=cylBetween(V3(x,0,0),V3(x,-R,0),0.05,matAl2); grp.add(arm); arms.push(arm);
    const pin=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.15,10),matGold); pin.rotation.z=Math.PI/2; grp.add(pin); pins.push(pin);
  });
  /* 交互：拖拽旋转 + 滚轮缩放 + 自动缓慢旋转 */
  let ry=0.55, rx=0.18, zoom=1, dragging=false, px=0, py=0;
  renderer.domElement.style.cursor='grab';
  renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;px=e.clientX;py=e.clientY;renderer.domElement.style.cursor='grabbing';});
  window.addEventListener('pointermove',e=>{ if(!dragging)return; ry+=(e.clientX-px)*0.008; rx+=(e.clientY-py)*0.008; rx=Math.max(-1.3,Math.min(1.3,rx)); px=e.clientX;py=e.clientY; });
  window.addEventListener('pointerup',()=>{dragging=false;renderer.domElement.style.cursor='grab';});
  renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(0.5,Math.min(2.6,zoom*(e.deltaY>0?1.08:0.93)));},{passive:false});
  /* 动画：真实曲柄连杆联动 + 飞轮旋转 */
  let t=0;
  function loop(){
    t+=0.016; const A=t;
    pistons.forEach((p,i)=>{ const py=pinY(A+PHASE[i]); p.position.set(xs[i],py,0); });
    rods.forEach((rod,i)=>{ const py=pinY(A+PHASE[i]); const cp=V3(xs[i],-R*Math.cos(A+PHASE[i]),R*Math.sin(A+PHASE[i])); const pp=V3(xs[i],py,0); rod.position.copy(pp).add(cp).multiplyScalar(.5); dir.subVectors(cp,pp); rod.quaternion.setFromUnitVectors(up,dir.clone().normalize()); });
    arms.forEach((arm,i)=>{ const cp=V3(xs[i],-R*Math.cos(A+PHASE[i]),0); const c0=V3(xs[i],0,0); arm.position.copy(c0).add(cp).multiplyScalar(.5); dir.subVectors(cp,c0); arm.quaternion.setFromUnitVectors(up,dir.clone().normalize()); });
    pins.forEach((pin,i)=>{ pin.position.set(xs[i],-R*Math.cos(A+PHASE[i]),0); });
    flyG.rotation.x=A;
    if(!dragging) ry+=0.0022;
    grp.rotation.y=ry; grp.rotation.x=rx;
    camera.position.set(3.2*zoom,2.0*zoom,4.4*zoom);
    camera.lookAt(0,-0.55,0);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize',()=>{ const w=box.clientWidth,h=box.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
}
document.getElementById('btn3D').addEventListener('click',()=>{
  const btn=document.getElementById('btn3D');
  if(threeInited){
    const box=document.getElementById('threeBox');
    const hidden=box.style.display==='none';
    box.style.display=hidden?'':'none';
    btn.textContent=hidden?'🙈 隐藏 3D':'🔄 显示 3D';
    return;
  }
  threeInited=true;
  btn.disabled=true; btn.textContent='⏳ 加载中…';
  init3D();
});

function buildMindmap(){
  const svg=$('#mindSvg'); svg.innerHTML='';
  const NODE_W={0:200,1:150,2:108};
  const NODE_H={0:54,1:58,2:52};
  const nodes=[];
  TREE._x=500; TREE._y=50; TREE._l=0; nodes.push(TREE);
  const L1X=[120,300,480,660,840];
  TREE.kids.forEach((k,i)=>{ k._x=L1X[i]; k._y=240; k._l=1; nodes.push(k); });
  /* 二级节点：在每个一级节点下方纵向排列（列式布局，杜绝横向重叠） */
  TREE.kids.forEach(k=>{
    if(!k.kids)return;
    k.kids.forEach((c,i)=>{ c._x=k._x; c._y=398+i*78; c._l=2; nodes.push(c); });
  });
  /* 连线：树干 + 垂直下降 */
  el('line',{x1:120,y1:104,x2:840,y2:104,stroke:'#c3d2e8','stroke-width':2},svg);
  el('line',{x1:500,y1:77,x2:500,y2:104,stroke:'#c3d2e8','stroke-width':2},svg);
  nodes.forEach(n=>{
    if(!n.kids)return;
    if(n._l===0){
      n.kids.forEach(k=>el('line',{x1:k._x,y1:104,x2:k._x,y2:211,stroke:'#c3d2e8','stroke-width':2},svg));
    }else{
      n.kids.forEach(k=>el('line',{x1:k._x,y1:n._y+NODE_H[1]/2,x2:k._x,y2:k._y-NODE_H[2]/2,stroke:'#c3d2e8','stroke-width':2},svg));
    }
  });
  /* 节点 */
  const detail=$('#mindDetail');
  function show(n){
    detail.innerHTML='<div class="dt" style="color:'+(n.c||'#2563eb')+'">'+n.zh+'</div><div class="de">'+n.en+'</div><div class="dd">'+n.d+'</div>';
  }
  nodes.forEach(n=>{
    const w=NODE_W[n._l], h=NODE_H[n._l], x=n._x-w/2, y=n._y-h/2, c=n.c||'#2563eb';
    const g=el('g',{class:'mnode'},svg);
    const r=el('rect',{x,y,width:w,height:h,rx:14,fill:c,opacity:n._l===0?.95:.14,stroke:c,'stroke-width':2.5},g);
    const zhSize=n._l===0?17:(n._l===1?14:12.5);
    el('text',{x:n._x,y:n._y+1,text:n.zh,fill:n._l===0?'#fff':(n._l===1?'#1e3a8a':'#17233b'),'font-size':zhSize,'font-weight':800,'text-anchor':'middle','dominant-baseline':'middle'},g);
    el('text',{x:n._x,y:n._y+(n._l===0?19:17),text:n.en,fill:n._l===0?'#dbeafe':'#64748b','font-size':n._l===0?11.5:10,'text-anchor':'middle','dominant-baseline':'middle'},g);
    el('title',{text:n.en+' · '+n.zh},g);
    g.style.cursor='pointer';
    g.addEventListener('click',()=>{
      show(n);
      $$('#mindSvg .mnode rect').forEach(x=>x.setAttribute('opacity',.14));
      $$('#mindSvg .mnode rect').forEach(x=>x.setAttribute('stroke-width',2.5));
      r.setAttribute('opacity',.32); r.setAttribute('stroke-width',4);
    });
  });
  show(TREE);
}


/* ---------- 课程一初始化 ---------- */
setVocabMode('table');
buildExplode();
buildSystems();
buildCylinders();
buildMindmap();
createQuiz({box:'#quizBox',bar:'#qBar',questions:QUESTIONS});
if(window.initReveal)initReveal();
window.mindMode=mindMode;
window.__COURSE_REGISTER('engine',{track:'track-engine'});
})();
