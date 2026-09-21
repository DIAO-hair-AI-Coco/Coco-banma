/* ================================================================
   课程五：离合器 Clutch（按需加载模块）
=============================================================== */
(function(){
'use strict';

/* ================= 题库（25 题：20 选择 + 5 判断；选项全英文） ================= */
const QUESTIONS5=[
 {ty:'choice',q:'离合器在汽车中的主要用途是什么？',en:'In automotive applications, a clutch is used to ____.',
  opts:['Provide smooth engagement and disengagement of the engine and manual transmission','Increase the engine torque output','Cool the engine during gear changing','Supply fuel to the engine'],a:0,
  exp:'课文：离合器是一种用于平顺地接合和断开发动机与手动变速器之间动力传递的机械装置。'},
 {ty:'choice',q:'汽车上使用的离合器有几种类型？',en:'How many types of clutches are used in cars?',
  opts:['Two','Three','Four','Five'],a:1,
  exp:'三种：螺旋簧式（coil-pressure-spring type）、膜片簧式（diaphragm-spring type）和半离心式（semi-centrifugal type）。'},
 {ty:'choice',q:'下列哪一项<b>不属于</b>课文提到的离合器类型？',en:'Which of the following is NOT a type of clutch mentioned in the text?',
  opts:['Coil-pressure-spring type','Diaphragm-spring type','Semi-centrifugal type','Torque-converter type'],a:3,
  exp:'液力变矩器（torque converter）是自动变速器上取代离合器的部件，不属于课文所列的三种离合器。'},
 {ty:'choice',q:'离合器的第一项功用是什么？',en:'The first function of the clutch is to ____.',
  opts:['Engage the engine to the transmission system gradually so the vehicle can move from rest smoothly','Disengage the engine so the vehicle can stop','Limit the engine speed','Reduce fuel consumption'],a:0,
  exp:'课文：使发动机和传动系逐渐结合，保证汽车平稳起动。'},
 {ty:'choice',q:'为什么离合器要把发动机与变速箱分离？',en:'The clutch disengages the engine from the gearbox in order to ____.',
  opts:['Save fuel','Allow for gear changing','Cool the gearbox oil','Reduce engine noise'],a:1,
  exp:'课文：将发动机与变速器分离（切断动力），便于换挡。'},
 {ty:'choice',q:'离合器限制扭矩的目的是什么？',en:'The clutch limits the torque in order to ____.',
  opts:['Increase acceleration','Prevent the transmission system from overloading','Reduce pedal effort','Improve fuel economy'],a:1,
  exp:'课文：限制扭矩，防止传动系过载。'},
 {ty:'choice',q:'离合器系统包括几个基本部分？',en:'The clutch system includes how many basic parts?',
  opts:['Two','Three','Four','Five'],a:2,
  exp:'四个基本部分：主动部分、从动部分、压紧装置和操纵机构。'},
 {ty:'choice',q:'主动部分主要由哪三个零件组成？',en:'The driving member mainly consists of ____.',
  opts:['The flywheel, the pressure plate and the clutch cover','The flywheel, the driven disc and the input shaft','The pressure plate, the release fork and the pedal','The clutch cover, the release bearing and the pedal'],a:0,
  exp:'课文：主动部分主要由飞轮、压盘和离合器盖组成，它们随发动机曲轴一起转动。'},
 {ty:'choice',q:'发动机曲轴转动时，主动部分的零件会怎样？',en:'When the engine crankshaft turns, the parts of the driving member ____.',
  opts:['Stay stationary','Rotate together with it','Move axially along the shaft','Slide away from the flywheel'],a:1,
  exp:'课文：它们随发动机曲轴一起转动。'},
 {ty:'choice',q:'从动盘安装在什么位置？',en:'The driven disc is located ____.',
  opts:['Inside the gearbox','Between the flywheel and the pressure plate','Behind the release bearing','On the clutch pedal'],a:1,
  exp:'课文：从动盘位于飞轮和压盘之间。'},
 {ty:'choice',q:'从动盘通过什么零件装在变速器输入轴上？',en:'The driven disc is mounted on the gearbox input shaft by its ____.',
  opts:['Splined hub','Return spring','Clutch cover','Friction lining'],a:0,
  exp:'课文：从动盘通过花键毂（splined hub）装在变速器带花键的输入轴上。'},
 {ty:'choice',q:'花键毂与从动盘之间的弹簧有什么作用？',en:'The springs between the hub and the disc are used to ____.',
  opts:['Increase the clamping force','Absorb the shock when the clutch is engaged','Push the pedal back','Seal the gearbox oil'],a:1,
  exp:'课文：用来吸收离合器接合时产生的冲击振动。'},
 {ty:'choice',q:'压紧装置的作用是什么？',en:'The pressing device is used to ____.',
  opts:['Press the pressure plate and the driven disc tightly against the flywheel','Release the pressure from the clutch disc','Change gear ratios','Guide the release fork'],a:0,
  exp:'课文：弹簧装置将压盘和从动盘紧紧压向飞轮。'},
 {ty:'choice',q:'操纵机构由哪些零件组成？',en:'The operating members consist of the clutch pedal, return spring, clutch linkage, release fork and ____.',
  opts:['Release bearing (throw-out bearing)','Pressure plate','Splined hub','Flywheel ring gear'],a:0,
  exp:'课文：操纵机构由踏板、回位弹簧、联动装置、分离叉和分离轴承组成。'},
 {ty:'choice',q:'离合器靠什么原理工作？',en:'The clutch utilizes ____ for its operation.',
  opts:['Friction','Gear meshing','Hydraulic pressure only','Magnetic force'],a:0,
  exp:'课文：离合器的工作依靠摩擦力——通过从动盘和飞轮之间的摩擦来工作。这是本课最核心的一句话。'},
 {ty:'choice',q:'当驾驶员的脚离开离合器踏板时会发生什么？',en:'When the driver\'s foot is off the clutch pedal, the springs ____.',
  opts:['Pull the pressure plate away from the disc','Push the pressure plate against the driven disc, which presses against the flywheel','Release the release bearing','Stop the flywheel from turning'],a:1,
  exp:'课文：弹簧推着压盘压向从动盘，从动盘再被压向飞轮，扭矩便通过摩擦力传出。'},
 {ty:'choice',q:'从动盘又称为什么？',en:'The driven member is also named as ____.',
  opts:['Driven disc or friction disc','Pressure plate or clutch cover','Flywheel or ring gear','Release fork or pivot ball'],a:0,
  exp:'课文：从动部分又称从动盘或摩擦盘。'},
 {ty:'choice',q:'膜片弹簧式离合器相比螺旋簧式，主要优势是什么？',en:'Compared with the coil-pressure-spring type, the main advantages of the diaphragm-spring type are ____.',
  opts:['Fewer parts, lighter pedal effort and self-compensation as the disc wears','A much larger number of springs','A heavier pedal for better feel','No need for a clutch cover'],a:0,
  exp:'膜片弹簧一个零件同时完成"压紧"和"分离杠杆"两项任务，零件少、踏板轻；其非线性特性使摩擦片磨损后压紧力不会明显下降。'},
 {ty:'choice',q:'驾驶中离合器持续打滑（加速时转速上升但车速上不去）说明什么？',en:'If the clutch slips continuously while driving, it means ____.',
  opts:['Normal operation during starting','A fault such as a worn friction lining, weak spring or oil contamination','The gearbox is in neutral','The pedal has too much free play'],a:1,
  exp:'起步时短暂打滑是正常的；行驶中持续打滑则是故障，常见原因有摩擦片磨损、压紧力不足、摩擦面沾油或自由行程过小。'},
 {ty:'choice',q:'为什么离合器踏板必须留有一定自由行程？',en:'Why must the clutch pedal have some free play?',
  opts:['To make the pedal easier to reach','To keep the release bearing clear of the diaphragm spring fingers when the pedal is released','To increase the clamping force','To reduce fuel consumption'],a:1,
  exp:'若没有自由行程，分离轴承会长期接触并空转膜片弹簧指端，导致轴承烧毁，同时离合器会打滑。'},
 {ty:'tf',q:'离合器是通过齿轮啮合把扭矩传递出去的。',en:'The clutch transmits torque through meshing gear teeth.',a:false,
  exp:'离合器内部没有齿轮传动，完全靠从动盘与飞轮/压盘之间的摩擦力传递扭矩。'},
 {ty:'tf',q:'飞轮属于主动部分，随发动机曲轴一起转动。',en:'The flywheel is part of the driving member and rotates together with the engine crankshaft.',a:true,
  exp:'课文：主动部分由飞轮、压盘和离合器盖组成，它们随曲轴一起转动。'},
 {ty:'tf',q:'等红灯时应该一直踩着离合器踏板。',en:'You should keep the clutch pedal pressed while waiting at traffic lights.',a:false,
  exp:'长时间踩住会让分离轴承持续受力空转，加速损坏，也让膜片弹簧长期处于大变形状态。正确做法是挂空挡、松踏板。'},
 {ty:'tf',q:'起步时离合器出现短暂的打滑是正常现象。',en:'A brief period of clutch slip during starting is normal.',a:true,
  exp:'起步时发动机与静止的传动系必须"逐渐接合"，打滑正是平稳起步的前提；只有行驶中持续打滑才是故障。'},
 {ty:'tf',q:'上坡起步时用半联动把车"吊"在坡上对离合器没有损害。',en:'Holding the car on a hill with the clutch at the biting point does no harm to the clutch.',a:false,
  exp:'持续摩擦会大量生热，导致摩擦片烧蚀、热衰退甚至冒烟烧毁；应配合驻车制动或上坡辅助。'},
];

/* ================= 单词表（28 个，含音标） ================= */
const VOCAB5=[
 {en:'clutch',ipa:"[klʌtʃ]",zh:'离合器',ty:'n.'},
 {en:'transmission',ipa:"[træns'mɪʃn]",zh:'变速器；传动',ty:'n.'},
 {en:'gearbox',ipa:"['ɡɪəbɒks]",zh:'变速箱',ty:'n.'},
 {en:'transmission system',ipa:"[træns'mɪʃn 'sɪstəm]",zh:'传动系',ty:'n.'},
 {en:'torque',ipa:"[tɔːk]",zh:'转力；扭矩',ty:'n.'},
 {en:'coil-pressure-spring type',ipa:'[kɔɪl ˈpreʃə sprɪŋ taɪp]',zh:'螺旋簧式',ty:'n.'},
 {en:'diaphragm-spring type',ipa:"['daɪəfræm sprɪŋ taɪp]",zh:'膜片簧式',ty:'n.'},
 {en:'semi-centrifugal type',ipa:'[ˌsemi senˈtrɪfjʊɡl taɪp]',zh:'半离心式',ty:'n.'},
 {en:'driving member',ipa:"['draɪvɪŋ 'membə]",zh:'主动部分',ty:'n.'},
 {en:'driven member',ipa:"['drɪvn 'membə]",zh:'从动部分',ty:'n.'},
 {en:'pressing device',ipa:"['presɪŋ dɪ'vaɪs]",zh:'压紧装置',ty:'n.'},
 {en:'operating member',ipa:"['ɒpəreɪtɪŋ 'membə]",zh:'操纵机构',ty:'n.'},
 {en:'flywheel',ipa:"['flaɪwiːl]",zh:'飞轮',ty:'n.'},
 {en:'flywheel ring gear',ipa:"['flaɪwiːl rɪŋ ɡɪə]",zh:'飞轮齿圈',ty:'n.'},
 {en:'pressure plate',ipa:"['preʃə pleɪt]",zh:'压盘',ty:'n.'},
 {en:'clutch cover',ipa:"[klʌtʃ 'kʌvə]",zh:'离合器盖',ty:'n.'},
 {en:'crankshaft',ipa:"['kræŋkʃɑːft]",zh:'曲轴',ty:'n.'},
 {en:'driven disc',ipa:"['drɪvn dɪsk]",zh:'从动盘',ty:'n.'},
 {en:'friction disc',ipa:"['frɪkʃn dɪsk]",zh:'摩擦盘',ty:'n.'},
 {en:'friction lining',ipa:"['frɪkʃn 'laɪnɪŋ]",zh:'摩擦衬片',ty:'n.'},
 {en:'splined hub',ipa:"[splaɪnd hʌb]",zh:'花键毂',ty:'n.'},
 {en:'input shaft',ipa:"['ɪnpʊt ʃɑːft]",zh:'输入轴',ty:'n.'},
 {en:'torsional damper spring',ipa:"['tɔːʃənl 'dæmpə sprɪŋ]",zh:'扭转减震弹簧',ty:'n.'},
 {en:'spring',ipa:"[sprɪŋ]",zh:'弹簧',ty:'n.'},
 {en:'clutch pedal',ipa:"[klʌtʃ 'pedl]",zh:'离合器踏板',ty:'n.'},
 {en:'return spring',ipa:"[rɪ'tɜːn sprɪŋ]",zh:'回位弹簧',ty:'n.'},
 {en:'release fork',ipa:"[rɪ'liːs fɔːk]",zh:'分离叉',ty:'n.'},
 {en:'release bearing',ipa:"[rɪ'liːs 'beərɪŋ]",zh:'分离轴承（推力轴承）',ty:'n.'}
];
(function(){
  const box=$('#vocab5Card'); if(!box)return;
  let html='<div class="card" style="padding:8px;overflow-x:auto"><table class="vocab-table"><tr><th style="width:44px">序号</th><th>英文 English</th><th>音标 IPA</th><th style="width:80px">词性</th><th>中文</th><th style="width:64px">发音</th></tr>';
  VOCAB5.forEach((v,i)=>{ html+='<tr><td>5.'+(i+1)+'</td><td class="en">'+v.en+'</td><td class="ipa">'+(v.ipa||'—')+'</td><td style="color:var(--muted);font-size:12.5px">'+v.ty+'</td><td class="zh">'+v.zh+'</td><td><button class="speak-btn" data-t="'+v.en+'" data-l="en-US">🔊</button></td></tr>'; });
  html+='</table></div>';
  box.innerHTML=html;
  box.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
})();

/* ================= 数据：18 个零件（主动 4 / 从动 4 / 压紧与变速器侧 4 / 操纵 6） ================= */
const CLUTCH_PARTS=[
 /* ---- 主动部分（飞轮侧）---- */
 {id:11,en:'crankshaft',zh:'曲轴',group:'主动',b:[120,70],ex:[-36,-48],
  desc:'发动机的功率输出轴。飞轮用螺栓固定在它的后端，因此主动部分的零件都随它一起旋转。',
  draw(g,H){
    H.rect(g,100,18,40,44,'#94a3b8',{rx:6});
    H.rect(g,84,58,72,20,'#64748b',{rx:6});
    H.rect(g,86,74,68,16,'#475569',{rx:5});
    H.circ(g,120,40,9,'#334155');
    H.rect(g,132,26,26,10,'#64748b',{rx:3});
  }},
 {id:1,en:'flywheel',zh:'飞轮',group:'主动',b:[120,240],ex:[-49,-35],
  desc:'装在曲轴后端的大惯量圆盘，是离合器的主动摩擦面之一，同时储存能量使发动机运转平稳。',
  draw(g,H){
    H.ellipse(g,120,150,96,27,'#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.ellipse(g,120,150,70,19,'#64748b');
    H.ellipse(g,120,150,34,10,'#334155');
    for(let i=0;i<6;i++){const a=i*Math.PI/3;H.circ(g,120+52*Math.cos(a),150+15*Math.sin(a),6,'#334155');}
    H.ellipse(g,120,178,96,20,'#64748b',{opacity:.75});
  }},
 {id:2,en:'flywheel ring gear',zh:'飞轮齿圈',group:'主动',b:[120,410],ex:[-60,-4],
  desc:'压装在飞轮外缘的齿圈，与起动机驱动齿轮啮合，用来起动发动机。',
  draw(g,H){
    H.ellipse(g,120,340,104,28,'none',{stroke:'#f59e0b','stroke-width':11});
    for(let i=0;i<26;i++){const a=i*Math.PI*2/26;
      H.line(g,120+98*Math.cos(a),340+26*Math.sin(a),120+110*Math.cos(a),340+29*Math.sin(a),'#fbbf24',3);}
    H.ellipse(g,120,340,104,28,'none',{stroke:'#b45309','stroke-width':1.5});
  }},
 {id:3,en:'clutch cover',zh:'离合器盖',group:'主动',b:[120,580],ex:[-52,29],
  desc:'用螺栓固定在飞轮上的盖形零件，为膜片弹簧提供支承点，并随飞轮一起旋转。',
  draw(g,H){
    H.ellipse(g,120,500,98,28,'#475569',{stroke:'#64748b','stroke-width':2});
    H.path(g,'M22 500 L22 462 Q120 428 218 462 L218 500','#52525b',{stroke:'#64748b','stroke-width':2,opacity:.95});
    H.ellipse(g,120,462,98,22,'#64748b');
    for(let i=0;i<4;i++)H.rect(g,36+i*56,508,14,16,'#334155',{rx:3});
    H.ellipse(g,120,500,40,12,'#334155');
  }},
 /* ---- 从动部分 ---- */
 {id:6,en:'clutch disc',zh:'从动盘（摩擦盘）',group:'从动',b:[460,70],ex:[11,-59],
  desc:'位于飞轮与压盘之间，两面都铆有摩擦衬片。它是离合器的从动摩擦面，靠摩擦被飞轮带动。',
  draw(g,H){
    H.ellipse(g,460,18,92,26,'#cbd5e1',{stroke:'#94a3b8','stroke-width':2});
    for(let i=0;i<8;i++){const a=i*Math.PI/4;H.circ(g,460+62*Math.cos(a),18+17*Math.sin(a),4.5,'#64748b');}
    H.ellipse(g,460,18,44,13,'#94a3b8');
    H.ellipse(g,460,42,92,20,'#94a3b8',{opacity:.7});
  }},
 {id:7,en:'friction lining',zh:'摩擦衬片',group:'从动',b:[460,240],ex:[21,-56],
  desc:'铆接或粘接在从动盘两面的摩擦材料，直接决定摩擦系数与扭矩容量。磨损到极限就必须更换。',
  draw(g,H){
    H.ellipse(g,460,176,90,25,'none',{stroke:'#b45309','stroke-width':13});
    H.ellipse(g,460,176,76,20,'none',{stroke:'#f59e0b','stroke-width':4,opacity:.6});
    for(let i=0;i<10;i++){const a=i*Math.PI/5;H.circ(g,460+83*Math.cos(a),176+23*Math.sin(a),3.4,'#78350f');}
    H.ellipse(g,460,204,90,19,'none',{stroke:'#b45309','stroke-width':10,opacity:.55});
  }},
 {id:8,en:'torsional damper spring',zh:'扭转减震弹簧',group:'从动',b:[460,410],ex:[58,-16],
  desc:'装在花键毂与盘体之间，吸收接合瞬间的冲击与传动系扭振，降低噪声和顿挫。',
  draw(g,H){
    for(let i=0;i<6;i++){const a=i*Math.PI/3;
      H.circ(g,460+48*Math.cos(a),336+14*Math.sin(a),10,'#0ea5e9',{stroke:'#0369a1','stroke-width':2});}
    H.ellipse(g,460,336,30,10,'none',{stroke:'#7dd3fc','stroke-width':3});
    H.ellipse(g,460,360,74,18,'none',{stroke:'#38bdf8','stroke-width':2,'stroke-dasharray':'6 5'});
  }},
 {id:9,en:'splined hub',zh:'花键毂',group:'从动',b:[460,580],ex:[25,54],
  desc:'从动盘中央带内花键的轮毂，套装在变速器输入轴的花键上：既能传递扭矩，又允许从动盘沿轴向滑动。',
  draw(g,H){
    H.ellipse(g,508,506,52,16,'#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.ellipse(g,508,506,26,8,'#334155');
    for(let i=0;i<14;i++){const a=i*Math.PI*2/14;
      H.line(g,508+22*Math.cos(a),506+7*Math.sin(a),508+30*Math.cos(a),506+9.5*Math.sin(a),'#64748b',3);}
    H.ellipse(g,508,528,52,14,'#64748b',{opacity:.8});
  }},
 /* ---- 压紧装置与变速器侧 ---- */
 {id:4,en:'pressure plate',zh:'压盘',group:'压紧',b:[800,70],ex:[45,-40],
  desc:'由膜片弹簧压紧的金属盘，把从动盘紧紧压在飞轮上。它是离合器的另一个主动摩擦面。',
  draw(g,H){
    H.ellipse(g,800,18,94,26,'#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.ellipse(g,800,18,72,19,'#64748b');
    H.ellipse(g,800,18,34,10,'#334155');
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3-Math.PI/2;
      H.rect(g,800+82*Math.cos(a)-7,18+23*Math.sin(a)-6,14,14,'#475569',{rx:3});}
    H.ellipse(g,800,42,94,20,'#64748b',{opacity:.7});
  }},
 {id:5,en:'diaphragm spring',zh:'膜片弹簧',group:'压紧',b:[800,240],ex:[44,-25],
  desc:'碟形弹簧，一个零件同时完成"压紧压盘"和"分离杠杆"两项任务：外缘压紧压盘，内圈指端供分离轴承推动。',
  draw(g,H){
    H.ellipse(g,800,176,88,24,'#f59e0b',{stroke:'#b45309','stroke-width':2});
    H.ellipse(g,800,176,40,11,'none',{stroke:'#b45309','stroke-width':2});
    for(let i=0;i<18;i++){const a=i*Math.PI*2/18;
      H.line(g,800+42*Math.cos(a),176+11.5*Math.sin(a),800+86*Math.cos(a),176+23*Math.sin(a),'#b45309',1.6,{opacity:.65});}
    H.ellipse(g,800,200,88,19,'#d97706',{opacity:.55});
  }},
 {id:10,en:'input shaft',zh:'输入轴',group:'压紧',b:[800,410],ex:[60,-3],
  desc:'变速器的输入轴（第一轴）。它带外花键的一端插入从动盘花键毂，把动力送进变速器。',
  draw(g,H){
    H.rect(g,782,318,36,60,'#94a3b8',{rx:6});
    for(let i=0;i<7;i++)H.line(g,784,322+i*8,816,322+i*8,'#475569',2.5);
    H.rect(g,790,376,20,14,'#64748b',{rx:3});
    H.rect(g,788,388,24,22,'#94a3b8',{rx:5});
  }},
 {id:12,en:'pilot bearing',zh:'导向轴承',group:'压紧',b:[800,580],ex:[56,21],
  desc:'装在曲轴后端中心孔内的小轴承，支承变速器输入轴的前端，保证输入轴与曲轴同轴。',
  draw(g,H){
    H.circ(g,856,516,30,'#64748b',{stroke:'#475569','stroke-width':2});
    H.circ(g,856,516,19,'#334155');
    for(let i=0;i<9;i++){const a=i*Math.PI*2/9;H.circ(g,856+24*Math.cos(a),516+24*Math.sin(a),3.6,'#cbd5e1');}
    H.circ(g,856,516,8,'#94a3b8');
    H.circ(g,856,516,3.5,'#1e293b');
  }},
 /* ---- 操纵机构 ---- */
 {id:13,en:'release bearing',zh:'分离轴承（推力轴承）',group:'操纵',b:[-43,770],ex:[0,50],
  desc:'套装在变速器输入轴套管上的推力轴承。踩下踏板时它被分离叉推动，压住膜片弹簧的指端。',
  draw(g,H){
    H.circ(g,-43,706,34,'#64748b',{stroke:'#475569','stroke-width':2});
    H.circ(g,-43,706,22,'#334155');
    for(let i=0;i<10;i++){const a=i*Math.PI*2/10;H.circ(g,-43+28*Math.cos(a),706+28*Math.sin(a),3.6,'#cbd5e1');}
    H.circ(g,-43,706,10,'#94a3b8');
    H.rect(g,-72,730,58,12,'#94a3b8',{rx:5});
  }},
 {id:14,en:'release fork',zh:'分离叉',group:'操纵',b:[130,770],ex:[-36,48],
  desc:'绕支点球摆动的叉形杠杆，把操纵机构传来的力放大后推动分离轴承。',
  draw(g,H){
    H.path(g,'M78 706 Q126 668 182 700','none',{stroke:'#94a3b8','stroke-width':13,fill:'none','stroke-linecap':'round'});
    H.path(g,'M78 706 L60 730','none',{stroke:'#94a3b8','stroke-width':13,fill:'none','stroke-linecap':'round'});
    H.path(g,'M182 700 L200 726','none',{stroke:'#94a3b8','stroke-width':13,fill:'none','stroke-linecap':'round'});
    H.circ(g,126,690,13,'#64748b');
    H.circ(g,126,690,5,'#334155');
    H.rect(g,150,690,34,10,'#64748b',{rx:4});
  }},
 {id:15,en:'pivot ball',zh:'分离叉支点球',group:'操纵',b:[303,770],ex:[-15,58],
  desc:'分离叉的摆动支点，是一个球头螺栓。它保证分离叉只能绕固定点摆动，从而把运动准确地传给分离轴承。',
  draw(g,H){
    H.circ(g,288,706,22,'#cbd5e1',{stroke:'#94a3b8','stroke-width':2});
    H.path(g,'M278 700 Q288 690 298 700','none',{stroke:'#f8fafc','stroke-width':4,fill:'none',opacity:.8});
    H.rect(g,281,724,14,26,'#64748b',{rx:3});
    for(let i=0;i<3;i++)H.line(g,281,730+i*8,295,730+i*8,'#475569',2.5);
    H.rect(g,275,748,26,10,'#94a3b8',{rx:4});
  }},
 {id:16,en:'clutch pedal',zh:'离合器踏板',group:'操纵',b:[477,770],ex:[15,58],
  desc:'驾驶员施加操纵力的部件。踏板力经联动装置或液压系统放大后传到分离叉。',
  draw(g,H){
    H.path(g,'M508 648 L508 720','none',{stroke:'#94a3b8','stroke-width':12,fill:'none','stroke-linecap':'round'});
    H.path(g,'M508 648 L478 640','none',{stroke:'#94a3b8','stroke-width':10,fill:'none','stroke-linecap':'round'});
    H.rect(g,466,626,58,20,'#64748b',{rx:7});
    H.circ(g,508,728,14,'#475569');
    H.circ(g,508,728,5,'#1e293b');
    H.rect(g,494,700,28,10,'#64748b',{rx:4});
  }},
 {id:17,en:'return spring',zh:'回位弹簧',group:'操纵',b:[650,770],ex:[36,48],
  desc:'使踏板自动回到放松位置。回位弹簧失效会导致踏板不回位、离合器打滑。',
  draw(g,H){
    H.path(g,'M650 686 Q664 694 650 702 Q636 710 650 718 Q664 726 650 734','none',{stroke:'#f59e0b','stroke-width':6,fill:'none'});
    H.circ(g,650,680,7,'#94a3b8');
    H.circ(g,650,740,7,'#94a3b8');
    H.line(g,650,668,650,652,'#64748b',4);
  }},
 {id:18,en:'clutch slave cylinder',zh:'离合器工作缸',group:'操纵',b:[823,770],ex:[15,45],
  desc:'液压操纵机构的执行缸。主缸把踏板力转成液压，工作缸再把液压变回机械推力去推动分离叉。',
  draw(g,H){
    H.rect(g,780,668,86,50,'#52525b',{rx:11});
    H.rect(g,790,678,44,14,'#71717a',{rx:5});
    H.rect(g,866,684,34,10,'#94a3b8',{rx:4});
    H.rect(g,896,678,20,20,'#64748b',{rx:5});
    H.circ(g,806,692,7,'#334155');
    H.rect(g,796,660,16,12,'#94a3b8',{rx:3});
  }}
];

let clutchExploded=false, clutchTour=null, clutchSel=null;

function buildClutchAnim(){
  const svg=$('#clutchSvg'); if(!svg)return;
  svg.innerHTML='';
  const H={
    rect(g,x,y,w,h,fill,ex){const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex||{}),g);r.classList.add('shp');return r;},
    circ(g,cx,cy,r,fill,ex){const c=el('circle',Object.assign({cx,cy,r,fill},ex||{}),g);c.classList.add('shp');return c;},
    ellipse(g,cx,cy,rx,ry,fill,ex){const e=el('ellipse',Object.assign({cx,cy,rx,ry,fill},ex||{}),g);e.classList.add('shp');return e;},
    path(g,d,fill,ex){const p=el('path',Object.assign({d,fill},ex||{}),g);p.classList.add('shp');return p;},
    line(g,x1,y1,x2,y2,stroke,w,ex){const l=el('line',Object.assign({x1,y1,x2,y2,stroke,'stroke-width':w||2},ex||{}),g);l.classList.add('shp');return l;}
  };
  el('rect',{x:-130,y:-90,width:1100,height:1040,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=-130;x<=970;x+=34)el('line',{x1:x,y1:-90,x2:x,y2:950},grid);
  for(let y=-90;y<=950;y+=34)el('line',{x1:-130,y1:y,x2:970,y2:y},grid);
  el('text',{x:420,y:-58,text:'CLUTCH · EXPLODED VIEW 离合器零件爆炸图',fill:'#c7d2fe','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:120,y:-30,text:'DRIVING 主动部分',fill:'#a78bfa','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:460,y:-30,text:'DRIVEN 从动部分',fill:'#a78bfa','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:820,y:-30,text:'PRESSING 压紧装置 · 变速器侧',fill:'#a78bfa','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:390,y:626,text:'OPERATING MEMBERS 操纵机构',fill:'#a78bfa','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  CLUTCH_PARTS.forEach(p=>{
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
    g.addEventListener('click',()=>selectClutchPart(p.id));
  });
}
function selectClutchPart(id){
  $$('#clutchSvg .pt').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const n=$('#clutchInfoN'),e=$('#clutchInfoE'),z=$('#clutchInfoZ'),d=$('#clutchInfoD');
  if(id==null){ n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明'; d.innerHTML='离合器由四个基本部分组成：<b>主动部分</b>（1 飞轮、2 齿圈、3 离合器盖、4 压盘）、<b>从动部分</b>（6 从动盘、7 摩擦衬片、8 减震弹簧、9 花键毂）、<b>压紧装置</b>（5 膜片弹簧）、<b>操纵机构</b>（13 分离轴承、14 分离叉、15 支点球、16 踏板、17 回位弹簧、18 工作缸），另有 11 曲轴、12 导向轴承、10 输入轴作为连接件。'; clutchSel=null; return; }
  const p=CLUTCH_PARTS.find(x=>x.id===id); clutchSel=id;
  n.textContent=p.id; e.textContent=p.en; z.textContent=p.zh+' · '+p.group+'部分'; d.textContent=p.desc;
}
function setClutchExplode(on){
  clutchExploded=on;
  const svg=$('#clutchSvg'); if(svg)svg.classList.toggle('exploded',on);
  CLUTCH_PARTS.forEach(p=>{ const g=$('#clutchSvg .pt[data-id="'+p.id+'"]'); if(g)g.style.transform=on?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):''; });
  const b=$('#btnClutchExplode'); if(b)b.textContent=on?'🔩 重新组装':'💥 爆炸拆解';
}
(function(){
  buildClutchAnim();
  const be=$('#btnClutchExplode'), bt=$('#btnClutchTour');
  if(be)be.addEventListener('click',()=>setClutchExplode(!clutchExploded));
  if(bt)bt.addEventListener('click',()=>{
    if(clutchTour){ clearTimeout(clutchTour); clutchTour=null; bt.textContent='▶ 零件巡讲'; selectClutchPart(null); return; }
    if(clutchExploded)setClutchExplode(false);
    bt.textContent='⏹ 停止巡讲';
    let i=0;
    const step=()=>{ if(i>=CLUTCH_PARTS.length){ clutchTour=null; bt.textContent='▶ 零件巡讲'; selectClutchPart(null); return; } selectClutchPart(CLUTCH_PARTS[i].id); i++; clutchTour=setTimeout(step,1400); };
    step();
  });
})();

/* ================= 接合 / 分离工作原理动画（2D 剖面示意） ================= */
let clutchPedal=0, clutchAuto=true, clutchDir=1, clutchRaf=null;
function buildClutchWork(){
  const svg=$('#clutchSvg2'); if(!svg)return;
  svg.innerHTML='';
  el('rect',{x:0,y:0,width:720,height:380,fill:'#0d1b36',rx:12},svg);
  /* 曲轴 / 飞轮（固定不动） */
  el('rect',{x:20,y:168,width:52,height:26,fill:'#94a3b8',rx:5},svg);
  el('text',{x:46,y:214,text:'crankshaft',fill:'#93a9d8','font-size':10.5,'text-anchor':'middle'},svg);
  el('rect',{x:72,y:96,width:34,height:170,fill:'#94a3b8',rx:6},svg);
  el('text',{x:89,y:86,text:'flywheel 飞轮',fill:'#e2e8f0','font-size':11,'font-weight':800,'text-anchor':'middle'},svg);
  /* 从动盘（可轴向微动） */
  el('rect',{x:110,y:104,width:16,height:154,fill:'#f59e0b',id:'cwDisc',rx:3},svg);
  el('text',{x:118,y:284,text:'driven disc 从动盘',fill:'#fbbf24','font-size':10.5,'text-anchor':'middle'},svg);
  /* 压盘（随踏板移动） */
  el('rect',{x:130,y:100,width:26,height:162,fill:'#94a3b8',id:'cwPlate',rx:5},svg);
  el('text',{x:143,y:290,text:'pressure plate 压盘',fill:'#cbd5e1','font-size':10.5,'text-anchor':'middle'},svg);
  /* 离合器盖 */
  el('rect',{x:160,y:92,width:16,height:178,fill:'#52525b',rx:5},svg);
  /* 膜片弹簧（随踏板变形） */
  el('path',{d:'M176 100 L252 132 L252 236 L176 268',fill:'#f59e0b',id:'cwSpring',opacity:.85},svg);
  el('text',{x:226,y:290,text:'diaphragm spring 膜片弹簧',fill:'#fbbf24','font-size':10.5,'text-anchor':'middle'},svg);
  /* 分离轴承 */
  el('rect',{x:258,y:158,width:30,height:46,fill:'#64748b',id:'cwBearing',rx:6},svg);
  el('text',{x:273,y:222,text:'release bearing 分离轴承',fill:'#93a9d8','font-size':10.5,'text-anchor':'middle'},svg);
  /* 分离叉 */
  el('path',{d:'M292 181 L370 132',fill:'none',stroke:'#94a3b8','stroke-width':11,'stroke-linecap':'round',id:'cwFork'},svg);
  el('circle',{cx:370,cy:132,r:9,fill:'#64748b',id:'cwPivot'},svg);
  el('text',{x:340,y:112,text:'release fork 分离叉',fill:'#93a9d8','font-size':10.5,'text-anchor':'middle'},svg);
  /* 输入轴 */
  el('rect',{x:288,y:172,width:410,height:18,fill:'#64748b',rx:5},svg);
  el('text',{x:600,y:166,text:'input shaft 输入轴 → 变速器',fill:'#93a9d8','font-size':11,'text-anchor':'middle'},svg);
  /* 踏板 */
  el('path',{d:'M660 300 L660 220',fill:'none',stroke:'#94a3b8','stroke-width':10,'stroke-linecap':'round',id:'cwPedal',transform:''},svg);
  el('rect',{x:634,y:296,width:52,height:16,fill:'#64748b',rx:6,id:'cwPad'},svg);
  el('text',{x:660,y:330,text:'clutch pedal 踏板',fill:'#93a9d8','font-size':11,'text-anchor':'middle'},svg);
  /* 扭矩箭头区 */
  el('text',{x:400,y:250,text:'',fill:'#22c55e','font-size':15,'font-weight':800,'text-anchor':'middle',id:'cwTorque'},svg);
  el('text',{x:400,y:276,text:'',fill:'#38bdf8','font-size':12,'text-anchor':'middle',id:'cwHint'},svg);
}
function clutchApply(){
  const d=document.getElementById('cwDisc');
  const plate=document.getElementById('cwPlate');
  const spring=document.getElementById('cwSpring');
  const bearing=document.getElementById('cwBearing');
  const fork=document.getElementById('cwFork');
  const pad=document.getElementById('cwPad');
  if(!plate)return;
  const p=clutchPedal/100;                       /* 0 = 松开（接合），1 = 踩到底（分离） */
  const gap=Math.round(26*p);                    /* 压盘后移量 */
  plate.setAttribute('x', String(130+gap));
  if(d)d.setAttribute('x', String(110+Math.round(gap*0.25)));
  if(bearing)bearing.setAttribute('x', String(258+Math.round(gap*1.5)));
  if(fork)fork.setAttribute('d','M'+ (292+Math.round(gap*1.5)) +' 181 L370 132');
  if(pad)pad.setAttribute('x', String(634 - Math.round(p*0)));
  if(spring){
    const bulge=252+14*p;   /* 注意：必须保持数值相加，字符串相加会得到 2520 之类的大坐标 */
    spring.setAttribute('d','M176 100 L'+bulge.toFixed(1)+' 132 L'+bulge.toFixed(1)+' 236 L176 268');
  }
  const t=document.getElementById('cwTorque'), h=document.getElementById('cwHint');
  if(p<0.06){
    if(t){t.textContent='⬅ 扭矩传递中 Torque transmitted';t.setAttribute('fill','#22c55e');}
    if(h)h.textContent='从动盘被夹紧在飞轮与压盘之间，靠摩擦力带动输入轴';
  } else if(p<0.94){
    if(t){t.textContent='⚠ 半联动 Slipping';t.setAttribute('fill','#f59e0b');}
    if(h)h.textContent='压紧力减小，摩擦力不足，从动盘打滑——起步与换挡过渡都发生在这个区间';
  } else {
    if(t){t.textContent='✕ 动力已切断 Torque interrupted';t.setAttribute('fill','#ef4444');}
    if(h)h.textContent='压盘完全后移，从动盘空转，此时可以换挡';
  }
  const st=$('#clutchState'), val=$('#clutchPedalVal'), rng=$('#clutchPedalRange');
  if(val)val.textContent=(p<0.06?'松开 ':(p<0.94?'半联动 ':'踩到底 '))+Math.round(p*100)+'%';
  if(rng&&document.activeElement!==rng)rng.value=String(Math.round(p*100));
  if(st){
    st.textContent = p<0.06
      ? '当前：踏板完全松开 · 离合器接合 · 动力经摩擦力传给变速器'
      : (p<0.94
        ? '当前：半联动 · 压紧力部分释放 · 从动盘打滑，用于平稳起步'
        : '当前：踏板踩到底 · 离合器分离 · 压盘后移、动力切断，可以换挡');
  }
}
function clutchTick(){
  if(!clutchAuto)return;
  clutchPedal+=clutchDir*1.1;
  if(clutchPedal>=100){clutchPedal=100;clutchDir=-1;}
  if(clutchPedal<=0){clutchPedal=0;clutchDir=1;}
  clutchApply();
  clutchRaf=requestAnimationFrame(clutchTick);
}
(function(){
  buildClutchWork(); clutchApply(); clutchTick();
  const btn=$('#btnClutchPlay'), rng=$('#clutchPedalRange');
  if(btn)btn.addEventListener('click',()=>{
    clutchAuto=!clutchAuto;
    btn.textContent=clutchAuto?'⏸ 暂停自动演示':'▶ 继续自动演示';
    if(clutchAuto)clutchTick(); else if(clutchRaf)cancelAnimationFrame(clutchRaf);
  });
  if(rng)rng.addEventListener('input',()=>{
    clutchAuto=false; if(clutchRaf)cancelAnimationFrame(clutchRaf);
    if(btn)btn.textContent='▶ 继续自动演示';
    clutchPedal=Number(rng.value); clutchApply();
  });
})();

/* ================= 3D 离合器总成模型（three.js） ================= */
let clutch3dInited=false;
function initClutch3D(){
  const box=$('#clutch3dBox'), note=$('#clutch3dNote');
  if(!box)return;
  box.style.display=''; note.textContent='正在加载 three.js 组件…（首次可能需 10~20 秒）';
  loadThree().then(ok=>{
    if(!ok){ note.textContent='⚠️ 3D 组件加载失败（网络原因），可稍后重试。'; box.style.display='none'; clutch3dInited=false; const b=$('#btnClutch3D'); if(b){b.disabled=false;b.textContent='▶ 加载 3D 模型';} return; }
    note.textContent='🖱️ 拖拽旋转 · 滚轮缩放 · 观察飞轮、从动盘、压盘与膜片弹簧的同轴装配';
    const b=$('#btnClutch3D'); if(b){b.disabled=false;b.textContent='🙈 隐藏 3D';}
    buildClutch3D(box);
  });
}
function buildClutch3D(box){
  const THREE=window.THREE;
  const W=box.clientWidth||600, H=box.clientHeight||430;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0d1b36);
  const camera=new THREE.PerspectiveCamera(45,W/H,0.1,200);
  camera.position.set(3.4,2.6,6.0); camera.lookAt(0,0,0);
  let renderer=null;
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }
  catch(e){ const n=$('#clutch3dNote'); if(n)n.textContent='⚠️ 当前设备不支持 3D（WebGL 不可用）。'; return; }
  renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  box.innerHTML=''; box.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x2a3f6e,1.0));
  const dl=new THREE.DirectionalLight(0xffffff,0.8); dl.position.set(4,7,6); scene.add(dl);
  const grp=new THREE.Group(); scene.add(grp);

  const mat=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:.5,roughness:.45},o));
  /* 全部零件同轴，轴向 = X */
  const add=(geo,m,x)=>{const s=new THREE.Mesh(geo,m);s.rotation.z=Math.PI/2;s.position.x=x;grp.add(s);return s;};
  add(new THREE.CylinderGeometry(0.36,0.36,0.7,20),mat(0x94a3b8),-2.0);                 /* 曲轴 */
  add(new THREE.CylinderGeometry(1.6,1.6,0.34,40),mat(0x94a3b8),-1.35);                /* 飞轮 */
  const ring=add(new THREE.TorusGeometry(1.62,0.10,10,44),mat(0xf59e0b,{metalness:.7}),-1.35); /* 齿圈 */
  const disc=add(new THREE.CylinderGeometry(1.35,1.35,0.14,36),mat(0xcbd5e1),-0.62);   /* 从动盘 */
  const hub=add(new THREE.CylinderGeometry(0.30,0.30,0.34,20),mat(0x64748b),-0.62);    /* 花键毂 */
  const plate=add(new THREE.CylinderGeometry(1.5,1.5,0.26,36),mat(0x94a3b8),0.05);     /* 压盘 */
  const spring=add(new THREE.CylinderGeometry(1.30,1.05,0.16,32),mat(0xf59e0b,{metalness:.6}),0.52); /* 膜片弹簧 */
  const cover=add(new THREE.CylinderGeometry(1.62,1.62,0.30,40),mat(0x52525b),0.90);   /* 离合器盖 */
  add(new THREE.CylinderGeometry(0.20,0.20,3.4,16),mat(0x94a3b8),1.9);                 /* 输入轴 */
  /* 从动盘上的减震弹簧 */
  for(let i=0;i<6;i++){const a=i*Math.PI/3;const s=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.11,0.22,10),mat(0x0ea5e9));s.rotation.z=Math.PI/2;s.position.set(-0.62,1.0*Math.cos(a),1.0*Math.sin(a));grp.add(s);}
  /* 分离轴承 */
  const rb=add(new THREE.CylinderGeometry(0.42,0.42,0.24,20),mat(0x64748b),1.45);
  /* 旋转标记：主动部分一起转 */
  const mark=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.34,0.34),mat(0x22c55e,{emissive:0x166534,emissiveIntensity:.6}));
  mark.position.set(-1.35,1.30,0); grp.add(mark);
  const mark2=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.30,0.30),mat(0x38bdf8,{emissive:0x0369a1,emissiveIntensity:.6}));
  mark2.position.set(-0.62,1.08,0); grp.add(mark2);

  let rx=0.16, ry=0.5, zoom=1, dragging=false, px=0, py=0, phase=0;
  const el2=renderer.domElement; el2.style.cursor='grab';
  const down=e=>{dragging=true;px=e.clientX;py=e.clientY;el2.style.cursor='grabbing';};
  const move=e=>{ if(!dragging)return; ry+=(e.clientX-px)*0.008; rx+=(e.clientY-py)*0.006; rx=Math.max(-1.1,Math.min(1.1,rx)); px=e.clientX; py=e.clientY; };
  const up=()=>{dragging=false;el2.style.cursor='grab';};
  el2.addEventListener('pointerdown',down); window.addEventListener('pointermove',move); window.addEventListener('pointerup',up);
  el2.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(0.5,Math.min(2.2,zoom+(e.deltaY>0?0.08:-0.08)));},{passive:false});
  function loop(){
    if(!dragging)ry+=0.0026;
    phase+=0.012;
    const sep=Math.max(0, Math.sin(phase)*0.5);   /* 压盘/弹簧/盖周期性分离，演示接合与分离 */
    plate.position.x=0.05+sep;
    spring.position.x=0.52+sep;
    cover.position.x=0.90+sep*0.9;
    rb.position.x=1.45+sep*0.9;
    grp.rotation.y=ry; grp.rotation.x=rx;
    camera.position.set(3.4*zoom,2.6*zoom,6.0*zoom); camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize',()=>{ const w=box.clientWidth,h=box.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
}
(function(){
  const b=$('#btnClutch3D'); if(!b)return;
  b.addEventListener('click',()=>{
    if(clutch3dInited){
      const box=$('#clutch3dBox'); const hidden=box.style.display==='none';
      box.style.display=hidden?'':'none';
      b.textContent=hidden?'🙈 隐藏 3D':'🔄 显示 3D';
      return;
    }
    clutch3dInited=true; b.disabled=true; b.textContent='⏳ 加载中…'; initClutch3D();
  });
})();

/* ================= 课程五练习：连线 + 读音 ================= */
(function(){
  const PAIRS5=[['离合器','clutch'],['变速器','transmission'],['扭矩','torque'],['飞轮','flywheel'],['压盘','pressure plate'],['从动盘','driven disc'],['花键毂','splined hub'],['分离叉','release fork']];
  const mb=$('#matchBox5');
  if(mb){
    const left=PAIRS5.map((p,i)=>({i,zh:p[0]}));
    const right=PAIRS5.map((p,i)=>({i,en:p[1]})).sort(()=>Math.random()-.5);
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
            $('#matchMsg5').textContent='已配对 '+done+' / '+PAIRS5.length+(done===PAIRS5.length?' 🎉 全部正确！':'');
          } else { b.classList.add('wrong'); setTimeout(()=>b.classList.remove('wrong'),420); toast('❌ 配对错误，再想想'); }
        });
        colR.appendChild(b);
      });
    };
    mb.appendChild(colL); mb.appendChild(colR); render();
  }
  const READ5=['clutch','transmission','gearbox','torque','driving member','driven member','pressing device','operating member','flywheel','pressure plate','clutch cover','crankshaft','driven disc','friction disc','friction lining','splined hub','input shaft','spring','clutch pedal','return spring','release fork','release bearing','diaphragm spring','coil-pressure-spring type'];
  const rb=$('#readBox5');
  if(rb){
    rb.innerHTML=READ5.map(w=>'<span style="display:inline-flex;align-items:center;gap:6px;background:var(--accent-l);border:1px solid #fcd34d;color:#92400e;font-size:13.5px;padding:5px 10px 5px 14px;border-radius:999px;font-weight:700">'+w+'<button class="speak-btn" data-t="'+w+'" data-l="en-US" style="width:26px;height:26px;font-size:13px">🔊</button></span>').join('');
    rb.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
  }
})();

/* 课程五导入打字机 */
(function(){
  const txt='发动机只要启动就不停地转，可汽车起步时是从静止开始的，换挡时又必须把动力切断——发动机和变速器之间靠什么"又连又断"？答案就是离合器！它内部没有齿轮啮合，而是靠摩擦力把动力"摩擦"过去的，还能在传动系过载时打滑保护。这节课我们拆开离合器：飞轮、从动盘、压盘、膜片弹簧、分离轴承……看看动力是怎样被接合与切断的！🔗';
  const box=$('#typedIntro5'); if(!box)return;
  const io=new IntersectionObserver(es=>{
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=()=>{ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();

createQuiz({box:'#quizBox5',bar:'#qBar5',questions:QUESTIONS5});
window.__COURSE_REGISTER('chassis',{track:'track-chassis'});
})();
