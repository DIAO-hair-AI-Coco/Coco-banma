/* ================================================================
   课程四：发动机润滑与冷却系统（按需加载模块）
=============================================================== */
(function(){
'use strict';

/* ================= 题库（25 题：选择题 + 判断题；选择题选项全英文） ================= */
const QUESTIONS4=[
 {ty:'choice',q:'机油泵的主要作用是什么？',en:'What is the main function of the oil pump?',
  opts:['To store the engine oil supply','To pressurize oil and deliver it to the engine oil galleries','To lower the temperature of the coolant','To filter the fuel before injection'],a:1,
  exp:'机油泵从油底壳吸油并加压送入油道；储存机油是油底壳的功能。'},
 {ty:'choice',q:'在压力润滑系统中，机油通常经什么从油底壳被吸出？',en:'In a pressure-fed lubrication system, oil is normally drawn from the sump through the ____.',
  opts:['Radiator cap','Thermostat','Suction strainer and pickup tube','Heater core'],a:2,
  exp:'集滤器（吸油滤网）和吸油管从油底壳吸油，同时阻挡大颗粒杂质。'},
 {ty:'choice',q:'主油道（main oil gallery）是指什么？',en:'The main oil gallery is ____.',
  opts:['A coolant passage inside the radiator','A drilled passage in the cylinder block that distributes pressurized oil','The clearance between the piston and the cylinder wall','A pipe that carries exhaust gas to the turbocharger'],a:1,
  exp:'课文：机油被加压后送入缸体油道，这些油道称为主油道。'},
 {ty:'choice',q:'全流式机油滤清器的作用是？',en:'A full-flow oil filter ____.',
  opts:['Filters only part of the pump output while the rest bypasses it','Filters all the oil delivered by the pump before it reaches the engine bearings','Filters the coolant instead of the oil','Is mounted inside the oil pan'],a:1,
  exp:'全流式过滤让机油泵的全部出油都经过滤清器清洁。'},
 {ty:'choice',q:'机油滤清器内的旁通阀（bypass valve）的作用是？',en:'The bypass valve inside an oil filter exists in order to ____.',
  opts:['Increase oil pressure at idle','Permit oil flow if the filter element becomes restricted','Open whenever the engine is cold and close when hot','Drain oil back to the pan when the engine is switched off'],a:1,
  exp:'滤芯堵塞时旁通阀打开，未过滤的机油仍能到达轴承——脏油远胜于无油。'},
 {ty:'choice',q:'机油牌号 5W-30 中的 “5W” 表示什么？',en:'In the oil grade 5W-30, the "5W" refers to ____.',
  opts:['The oil\'s kinematic viscosity at 100 °C','The oil\'s low-temperature (winter) performance','The total amount of additive in the oil','The oil\'s flash point'],a:1,
  exp:'SAE J300 中 “W” 代表低温（冬季）等级，规定冷启动与低温泵送性能。'},
 {ty:'choice',q:'与 5W-30 相比，15W-40 机油一般？',en:'Compared with 5W-30, a 15W-40 oil is generally ____.',
  opts:['Thinner at low temperature and thinner at high temperature','Thicker at low temperature and thicker at high temperature','Thinner at low temperature and thicker at high temperature','Identical to 5W-30 in every respect'],a:1,
  exp:'15W 的低温性能不如 5W；40 号在 100 ℃ 时比 30 号黏。'},
 {ty:'choice',q:'关于冷却系统，下列哪项说法正确？',en:'Which statement about the cooling system is correct?',
  opts:['The thermostat is closed when the engine is hot','Coolant always flows through the radiator, whatever the temperature','When the engine is cold the thermostat is closed and coolant circulates through the engine only','The radiator heats the coolant before it returns to the engine'],a:2,
  exp:'冷机时节温器关闭，冷却液不流经散热器，只走旁通（短路）循环，从而快速暖机。'},
 {ty:'choice',q:'冷却系统加压的主要目的是什么？',en:'The main reason the cooling system is pressurized is to ____.',
  opts:['Increase the coolant flow rate','Raise the boiling point of the coolant','Lower the freezing point of the coolant','Lubricate the water pump bearing'],a:1,
  exp:'加压提高冷却液沸点，使发动机能安全地在更高温度下运行。'},
 {ty:'choice',q:'一个 15 psi 的散热器盖大约把冷却液沸点提高多少？',en:'A 15 psi radiator cap raises the boiling point of the coolant by approximately ____.',
  opts:['3 °F','45 °F','100 °F','212 °F'],a:1,
  exp:'沸点大约每 1 psi 升高 3 °F，15 psi 约提高 45 °F。'},
 {ty:'choice',q:'哪个部件使冷却液在发动机与散热器之间循环？',en:'Which component circulates coolant through the engine and radiator?',
  opts:['The oil pump','The water pump','The fuel pump','The vacuum pump'],a:1,
  exp:'水泵是冷却系统中唯一产生流动的部件。'},
 {ty:'choice',q:'下列哪项对风扇离合器的描述是<b>不正确</b>的？',en:'Which statement does NOT correctly describe a fan clutch?',
  opts:['It engages and disengages a mechanical cooling fan','It allows the fan to be driven only when it is needed','It is the component that opens and closes the coolant passage to the radiator','It reduces fan noise and saves power compared with a fixed-drive fan'],a:2,
  exp:'开闭通往散热器的水路是节温器的功能，不是风扇离合器的。'},
 {ty:'choice',q:'水套（water jacket）是什么？',en:'A water jacket is ____.',
  opts:['A pipe that carries coolant to the heater core','The open space within the cylinder block and cylinder head where coolant flows','A metal cover that protects the radiator','A valve that controls the coolant temperature'],a:1,
  exp:'课文：水套是气缸体和气缸盖周围的开放空间，冷却液在其中流动。'},
 {ty:'choice',q:'节温器（thermostat）的主要作用是什么？',en:'The main purpose of the thermostat is to ____.',
  opts:['Keep the engine coolant at the most efficient temperature','Increase the pressure of the cooling system','Drive the water pump','Filter the coolant'],a:0,
  exp:'课文：节温器用于使发动机冷却液保持在最佳温度，它决定工作温度的下限。'},
 {ty:'choice',q:'机油压力报警灯亮起通常说明什么问题？',en:'If the oil pressure warning light stays on, what does it most likely indicate?',
  opts:['The oil level is too high','A lubrication fault such as low pressure from a weak pump, clogged filter or thin oil','The coolant temperature is too low','The battery is not charging'],a:1,
  exp:'报警灯监测的是压力而非油位；持续亮起应立即停机检查。'},
 {ty:'choice',q:'散热器（radiator）冷却的是什么？',en:'What does the radiator actually cool?',
  opts:['Engine oil','The coolant','Fuel','The transmission fluid only'],a:1,
  exp:'散热器冷却冷却液。机油由独立的机油冷却器冷却，变速器油冷器是第三条回路。'},
 {ty:'choice',q:'压力润滑相比早期的飞溅润滑（splash lubrication）主要优势是什么？',en:'Compared with splash lubrication, the main advantage of pressure lubrication is that it ____.',
  opts:['Needs no oil pump at all','Delivers metered, filtered oil under pressure to every bearing and the valve train','Uses much less oil','Works only at high engine speed'],a:1,
  exp:'压力润滑能定量、经过滤、带压地向每个轴承和配气机构供油；飞溅润滑供油不可控且随转速变化。'},
 {ty:'choice',q:'机油在发动机中除了润滑，还承担什么作用？',en:'Besides lubrication, engine oil also ____.',
  opts:['Cools, cleans, seals, prevents corrosion and acts as a hydraulic medium','Only cools the engine','Only cleans the engine','Has no other function'],a:0,
  exp:'机油的五大作用：润滑、冷却、清洁、密封、防腐蚀，同时还是液压介质。'},
 {ty:'choice',q:'限压阀（relief valve）在润滑系统中的作用是？',en:'The purpose of the relief valve in the lubrication system is to ____.',
  opts:['Filter the oil before it reaches the bearings','Limit the maximum oil pressure by dumping excess oil back to the sump','Open when the engine is cold only','Measure the oil level in the pan'],a:1,
  exp:'限压阀把多余油量泄回油底壳，使油压保持在规定范围内。'},
 {ty:'choice',q:'机油尺（dipstick）的用途是什么？',en:'The dipstick is used to ____.',
  opts:['Measure oil pressure','Check the engine oil level in the crankcase','Drain the old oil','Check the coolant level'],a:1,
  exp:'机油尺用于检查曲轴箱油位；油位与油压由各自独立的装置监测。'},
 {ty:'tf',q:'机油黏度越高越好。',en:'Thicker engine oil is always better for a modern engine.',a:false,
  exp:'黏度必须符合厂家规定并与发动机间隙匹配；过黏会冷启动供油不足、增加泵送损失与油耗。'},
 {ty:'tf',q:'机油只有润滑一个作用。',en:'Engine oil only lubricates the moving parts and has no other function.',a:false,
  exp:'机油还承担冷却、清洁、密封、防腐蚀和液压介质等功能。'},
 {ty:'tf',q:'同一台发动机，怠速时的机油压力通常低于巡航转速时。',en:'For a given engine, oil pressure at idle is normally lower than oil pressure at cruising speed.',a:true,
  exp:'压力来自容积式机油泵，在限压阀上限以内随转速升高。'},
 {ty:'tf',q:'长期拆掉节温器行驶没有影响。',en:'You can safely run an engine for a long period with the thermostat removed.',a:false,
  exp:'没有节温器时暖机极慢，会加剧磨损、油泥、燃油稀释，并使暖风失效、排放升高。'},
 {ty:'tf',q:'冷却液不足时应该补充纯防冻液。',en:'When the coolant level is low, the correct top-up is pure antifreeze.',a:false,
  exp:'纯防冻液传热比水差，浓度过高反而提高冰点；应加入同种预混冷却液（通常 50/50）。'},
];

/* ================= 单词表（26 个，含音标） ================= */
const VOCAB4=[
 {en:'lubrication',ipa:"[ˌlu:brɪ'keɪʃn]",zh:'润滑',ty:'n.'},
 {en:'lubricant',ipa:"['lu:brɪkənt]",zh:'润滑剂',ty:'n.'},
 {en:'friction',ipa:"['frɪkʃn]",zh:'摩擦',ty:'n.'},
 {en:'wear',ipa:'[weə(r)]',zh:'磨损',ty:'n./v.'},
 {en:'viscosity',ipa:"[vɪ'skɒsəti]",zh:'黏度',ty:'n.'},
 {en:'multigrade oil',ipa:"[ˌmʌlti'greɪd ɔɪl]",zh:'多级油（复级油）',ty:'n.'},
 {en:'oil pan (sump)',ipa:'[ɔɪl pæn]',zh:'油底壳',ty:'n.'},
 {en:'oil pump',ipa:'[ɔɪl pʌmp]',zh:'机油泵',ty:'n.'},
 {en:'filter',ipa:"['fɪltə]",zh:'滤清器；过滤器',ty:'n./v.'},
 {en:'suction strainer',ipa:"['sʌkʃn 'streɪnə]",zh:'集滤器（吸油滤网）',ty:'n.'},
 {en:'oil pressure regulator',ipa:"[ɔɪl 'preʃə 'regjuleɪtə]",zh:'机油压力调节器',ty:'n.'},
 {en:'relief valve',ipa:"[rɪ'li:f vælv]",zh:'（卸）限压阀',ty:'n.'},
 {en:'oil gallery',ipa:"[ɔɪl 'gæləri]",zh:'油道',ty:'n.'},
 {en:'main oil gallery',ipa:"[meɪn ɔɪl 'gæləri]",zh:'主油道',ty:'n.'},
 {en:'oil cooler',ipa:"[ɔɪl 'ku:lə]",zh:'机油冷却器',ty:'n.'},
 {en:'dipstick',ipa:"['dɪpstɪk]",zh:'机油尺',ty:'n.'},
 {en:'sensor',ipa:"['sensə]",zh:'传感器',ty:'n.'},
 {en:'maintain',ipa:"[meɪn'teɪn]",zh:'维持；维修',ty:'vt.'},
 {en:'jacket (water jacket)',ipa:"['dʒækɪt]",zh:'（水）套、护封',ty:'n.'},
 {en:'coolant',ipa:"['ku:lənt]",zh:'冷却液',ty:'n.'},
 {en:'antifreeze',ipa:"['æntifri:z]",zh:'防冻液',ty:'n.'},
 {en:'water pump',ipa:"['wɔ:tə pʌmp]",zh:'水泵',ty:'n.'},
 {en:'thermostat',ipa:"['θɜ:məstæt]",zh:'节温器，温度调节装置',ty:'n.'},
 {en:'radiator',ipa:"['reɪdieɪtə]",zh:'散热器',ty:'n.'},
 {en:'radiator hose',ipa:"['reɪdieɪtə həuz]",zh:'散热器软管',ty:'n.'},
 {en:'idle operation',ipa:"['aɪdl ˌɒpə'reɪʃn]",zh:'怠速工况',ty:'n.'}
];
(function(){
  const box=$('#vocab4Card'); if(!box)return;
  let html='<div class="card" style="padding:8px;overflow-x:auto"><table class="vocab-table"><tr><th style="width:44px">序号</th><th>英文 English</th><th>音标 IPA</th><th style="width:80px">词性</th><th>中文</th><th style="width:64px">发音</th></tr>';
  VOCAB4.forEach((v,i)=>{ html+='<tr><td>4.'+(i+1)+'</td><td class="en">'+v.en+'</td><td class="ipa">'+(v.ipa||'—')+'</td><td style="color:var(--muted);font-size:12.5px">'+v.ty+'</td><td class="zh">'+v.zh+'</td><td><button class="speak-btn" data-t="'+v.en.replace(/\s*\(.*?\)/,'')+'" data-l="en-US">🔊</button></td></tr>'; });
  html+='</table></div>';
  box.innerHTML=html;
  box.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
})();

/* ================= 数据：18 个零件爆炸图（1~11 润滑 / 12~18 冷却） ================= */
const LUBE_PARTS=[
 /* ---------- 润滑系统 ---------- */
 {id:1,en:'oil pan (sump)',zh:'油底壳',b:[76,796],ex:[0,60],
  desc:'储存机油并帮助散热（stores the oil supply and helps cool it），吸油管伸入其中。是润滑系统的起点与终点。',
  draw(g,H){
    H.path(g,'M60 690 L300 690 L292 792 Q290 806 276 806 L84 806 Q70 806 68 792 Z','#334155',{stroke:'#475569','stroke-width':2});
    H.path(g,'M76 746 L284 746 L280 796 Q279 800 274 800 L86 800 Q81 800 80 796 Z','#b45309',{opacity:.55});
    H.line(g,76,746,284,746,'#f59e0b',2);
    H.rect(g,168,678,44,14,'#64748b',{rx:4});
  }},
 {id:2,en:'oil pump',zh:'机油泵',b:[108,670],ex:[-70,10],
  desc:'从油底壳吸油并加压（draws oil and pressurizes it）。现代发动机多为曲轴驱动的转子泵（gerotor），泵内集成限压阀限制最高油压。',
  draw(g,H){
    H.rect(g,96,600,70,64,'#64748b',{rx:10});
    H.circ(g,131,632,20,'#94a3b8',{stroke:'#475569','stroke-width':2});
    H.circ(g,131,632,8,'#334155');
    H.rect(g,120,586,22,16,'#94a3b8',{rx:4});
    H.line(g,166,632,190,632,'#94a3b8',6);
  }},
 {id:3,en:'suction strainer',zh:'集滤器（吸油滤网）',b:[186,686],ex:[-70,90],
  desc:'粗滤网与吸油管（coarse screen and pickup tube）：让机油泵顺利吸油，同时阻挡大颗粒杂质进入油泵。',
  draw(g,H){
    H.rect(g,100,670,80,30,'#475569',{rx:8});
    for(let i=0;i<5;i++)H.line(g,108+i*16,676,108+i*16,694,'#94a3b8',2.5);
    H.line(g,140,670,140,640,'#94a3b8',7);
    H.circ(g,140,636,7,'#cbd5e1');
  }},
 {id:4,en:'oil filter',zh:'机油滤清器',b:[76,506],ex:[-80,-30],
  desc:'全流式滤清器（full-flow filter）清除加压机油中的有害杂质。内置旁通阀：滤芯堵塞时自动打开，保证机油仍能到达轴承。',
  draw(g,H){
    H.rect(g,60,430,70,70,'#52525b',{rx:12});
    H.rect(g,68,442,54,10,'#71717a',{rx:4});
    H.circ(g,95,482,14,'#3f3f46');
    H.line(g,95,430,95,410,'#94a3b8',7);
    H.line(g,95,500,95,520,'#94a3b8',7);
  }},
 {id:5,en:'oil pressure regulator',zh:'机油压力调节器（限压阀）',b:[202,656],ex:[90,60],
  desc:'把机油压力维持在规定范围（keeps oil pressure within a specified range）：压力过高时把多余油量泄回油底壳。常与机油泵集成为一体。',
  draw(g,H){
    H.rect(g,190,600,70,50,'#64748b',{rx:9});
    H.rect(g,200,610,50,14,'#94a3b8',{rx:4});
    for(let i=0;i<4;i++)H.line(g,206+i*13,628,206+i*13,642,'#94a3b8',3);
    H.circ(g,190,625,8,'#475569');
    H.circ(g,260,625,8,'#475569');
  }},
 {id:6,en:'oil cooler',zh:'机油冷却器',b:[262,506],ex:[110,-20],
  desc:'外部换热器（external heat exchanger），带走机油的热量、控制油温。机油经下油道流向冷却器，再回到油底壳进油道。',
  draw(g,H){
    H.rect(g,250,430,70,70,'#475569',{rx:8});
    for(let i=0;i<6;i++)H.line(g,256,442+i*10,314,442+i*10,'#94a3b8',3,{opacity:.8});
    H.line(g,285,430,285,412,'#38bdf8',7);
    H.line(g,285,500,285,520,'#38bdf8',7);
  }},
 {id:7,en:'main oil gallery',zh:'主油道',b:[70,336],ex:[0,-6],
  desc:'缸体上钻出的主要油道（main drilled passage），把加压机油分配到曲轴和凸轮轴各轴承。课文中的 “passages in the block” 就是它。',
  draw(g,H){
    H.rect(g,56,330,248,26,'#475569',{rx:13});
    H.rect(g,64,338,232,10,'#94a3b8',{rx:5,opacity:.55});
    for(let i=0;i<4;i++){H.rect(g,86+i*56,356,14,26,'#64748b',{rx:4});}
  }},
 {id:8,en:'cylinder-head oil gallery',zh:'缸盖油道',b:[70,206],ex:[0,-56],
  desc:'上油道（upper gallery）：把机油送往配气机构——挺柱、推杆、摇臂和气门杆，保证气门机构得到压力润滑。',
  draw(g,H){
    H.rect(g,56,200,248,26,'#475569',{rx:13});
    H.rect(g,64,208,232,10,'#94a3b8',{rx:5,opacity:.55});
    for(let i=0;i<3;i++){H.circ(g,110+i*74,213,9,'#64748b');}
  }},
 {id:9,en:'oil return hole',zh:'回油孔',b:[300,326],ex:[96,-130],
  desc:'回油通道（drain-back）：完成润滑的机油在曲轴挡油板导流下靠重力流回油底壳，使循环得以重复。',
  draw(g,H){
    H.rect(g,258,240,30,80,'#334155',{rx:6,stroke:'#475569','stroke-width':2});
    H.path(g,'M273 250 L273 320','none',{stroke:'#f59e0b','stroke-width':4,'stroke-dasharray':'9 7',fill:'none'});
    H.path(g,'M262 236 L284 236 L273 224 Z','#64748b');
  }},
 {id:10,en:'oil pressure sensor',zh:'机油压力传感器',b:[318,346],ex:[120,-60],
  desc:'监测机油压力并驱动仪表或报警灯（drives the gauge or warning light）。读数过低是润滑故障的直接信号，必须立即停机检查。',
  draw(g,H){
    H.rect(g,306,300,50,40,'#64748b',{rx:8});
    H.rect(g,318,288,26,14,'#94a3b8',{rx:4});
    H.circ(g,331,320,12,'#334155');
    H.line(g,331,320,331,308,'#f59e0b',3);
    H.line(g,356,320,376,320,'#94a3b8',5);
  }},
 {id:11,en:'dipstick',zh:'机油尺',b:[30,776],ex:[-100,40],
  desc:'供维修人员检查曲轴箱油位（check the crankcase oil level）。注意：油位与油压由各自独立的装置监测，油位正常不代表油压正常。',
  draw(g,H){
    H.rect(g,42,610,14,160,'#94a3b8',{rx:6});
    H.rect(g,38,606,22,14,'#f59e0b',{rx:4});
    H.line(g,49,640,49,760,'#cbd5e1',3);
    for(let i=0;i<3;i++)H.line(g,42,690+i*24,56,690+i*24,'#64748b',2);
  }},
 /* ---------- 冷却系统 ---------- */
 {id:12,en:'water pump',zh:'水泵',b:[502,676],ex:[-90,110],
  desc:'离心式水泵（centrifugal pump），通常由皮带或链条驱动，使冷却液在缸体和缸盖中循环——它是系统中唯一产生流动的部件。',
  draw(g,H){
    H.circ(g,530,635,38,'#475569');
    H.circ(g,530,635,24,'#64748b',{stroke:'#94a3b8','stroke-width':2});
    for(let i=0;i<6;i++){const a=i*Math.PI/3;H.rect(g,527+22*Math.cos(a),632+22*Math.sin(a),8,26,'#94a3b8',{rx:3,transform:'rotate('+(a*180/Math.PI+90)+' '+(530+22*Math.cos(a))+' '+(635+22*Math.sin(a))+')'});}
    H.rect(g,514,586,32,18,'#94a3b8',{rx:4});
    H.circ(g,530,635,9,'#1e293b');
  }},
 {id:13,en:'water jacket',zh:'水套',b:[492,436],ex:[0,-6],
  desc:'铸造在缸体和缸盖内、充满冷却液的空腔（the open space within the block and head where coolant flows），把金属的热量带走。',
  draw(g,H){
    H.rect(g,480,300,120,130,'none',{stroke:'#38bdf8','stroke-width':2.5,'stroke-dasharray':'9 6',rx:10});
    for(let i=0;i<4;i++){H.circ(g,510+i*24,340,10,'#0ea5e9',{opacity:.55});H.circ(g,510+i*24,392,10,'#0ea5e9',{opacity:.55});}
    H.rect(g,494,318,92,20,'#1e3a5f',{opacity:.8,rx:6});
    H.rect(g,494,398,92,20,'#1e3a5f',{opacity:.8,rx:6});
  }},
 {id:14,en:'thermostat',zh:'节温器',b:[492,566],ex:[-90,30],
  desc:'蜡式阀门（wax-pellet valve），位于发动机与散热器之间：冷车关闭使发动机快速升温，达到开启温度后打开走散热器。它决定工作温度的下限。',
  draw(g,H){
    H.rect(g,480,500,70,60,'#52525b',{rx:10});
    H.circ(g,515,530,20,'#0f172a',{stroke:'#f59e0b','stroke-width':2.5});
    H.rect(g,505,524,20,12,'#94a3b8',{rx:4});
    H.rect(g,505,542,20,10,'#f59e0b',{rx:3});
    H.rect(g,496,486,38,14,'#94a3b8',{rx:4});
  }},
 {id:15,en:'radiator',zh:'散热器',b:[632,486],ex:[40,0],
  desc:'带散热片的换热器（finned heat exchanger），把冷却液的热量传给流过的空气。散热片倒伏或管路堵塞都会显著降低散热能力。',
  draw(g,H){
    H.rect(g,600,200,160,280,'#334155',{rx:10,stroke:'#475569','stroke-width':2});
    for(let i=0;i<12;i++)H.line(g,612,216+i*22,748,216+i*22,'#64748b',4);
    for(let i=0;i<8;i++)H.line(g,620+i*18,208,620+i*18,472,'#475569',1.5,{opacity:.7});
    H.rect(g,592,196,176,14,'#475569',{rx:6});
    H.rect(g,592,470,176,14,'#475569',{rx:6});
    H.line(g,612,486,612,506,'#38bdf8',7);
    H.line(g,748,486,748,506,'#38bdf8',7);
  }},
 {id:16,en:'radiator hose',zh:'散热器软管',b:[560,470],ex:[-30,120],
  desc:'连接发动机与散热器的柔性橡胶软管（flexible rubber hose），须承受压力、高温与振动。开裂会导致冷却液流失和过热。',
  draw(g,H){
    H.path(g,'M600 300 Q560 280 548 250 Q536 226 504 226','none',{stroke:'#1f2937','stroke-width':16,fill:'none','stroke-linecap':'round'});
    H.path(g,'M600 440 Q566 452 550 484 Q538 510 520 512','none',{stroke:'#1f2937','stroke-width':16,fill:'none','stroke-linecap':'round'});
    H.path(g,'M600 300 Q560 280 548 250 Q536 226 504 226','none',{stroke:'#4b5563','stroke-width':6,fill:'none','stroke-linecap':'round'});
    H.path(g,'M600 440 Q566 452 550 484 Q538 510 520 512','none',{stroke:'#4b5563','stroke-width':6,fill:'none','stroke-linecap':'round'});
  }},
 {id:17,en:'radiator cap',zh:'散热器盖（压力阀）',b:[672,196],ex:[30,-70],
  desc:'密封系统以建立压力（seals the system so it can be pressurized），从而提高冷却液沸点；压力过高时泄压，保护软管、垫片与密封件。',
  draw(g,H){
    H.rect(g,660,150,72,40,'#94a3b8',{rx:10});
    H.rect(g,672,138,48,14,'#64748b',{rx:5});
    H.rect(g,684,126,24,14,'#94a3b8',{rx:4});
    H.line(g,696,150,696,196,'#cbd5e1',4);
    H.circ(g,696,206,10,'#64748b');
  }},
 {id:18,en:'cooling fan and belt',zh:'冷却风扇与皮带',b:[512,296],ex:[-60,-70],
  desc:'在迎风不足时（低速、怠速）使空气流过散热器（draws air through the radiator）。离合器风扇会按需接合/分离，皮带同时驱动风扇与水泵。',
  draw(g,H){
    H.circ(g,550,245,44,'none',{stroke:'#475569','stroke-width':3});
    for(let i=0;i<5;i++){const a=i*2*Math.PI/5;H.path(g,'M550 245 L'+(550+42*Math.cos(a-0.25))+' '+(245+42*Math.sin(a-0.25))+' L'+(550+42*Math.cos(a+0.25))+' '+(245+42*Math.sin(a+0.25))+' Z','#64748b');}
    H.circ(g,550,245,12,'#94a3b8');
    H.circ(g,550,245,5,'#334155');
    H.path(g,'M508 200 L592 200','none',{stroke:'#1f2937','stroke-width':9,fill:'none'});
    H.path(g,'M508 290 L592 290','none',{stroke:'#1f2937','stroke-width':9,fill:'none'});
  }}
];

let lubeExploded=false, lubeTour=null, lubeSel=null;

function buildLubeAnim(){
  const svg=$('#lubeSvg'); if(!svg)return;
  svg.innerHTML='';
  const H={
    rect(g,x,y,w,h,fill,ex){const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex||{}),g);r.classList.add('shp');return r;},
    circ(g,cx,cy,r,fill,ex){const c=el('circle',Object.assign({cx,cy,r,fill},ex||{}),g);c.classList.add('shp');return c;},
    path(g,d,fill,ex){const p=el('path',Object.assign({d,fill},ex||{}),g);p.classList.add('shp');return p;},
    line(g,x1,y1,x2,y2,stroke,w,ex){const l=el('line',Object.assign({x1,y1,x2,y2,stroke,'stroke-width':w||2},ex||{}),g);l.classList.add('shp');return l;}
  };
  el('rect',{x:-120,y:-80,width:960,height:1000,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=-120;x<=840;x+=34)el('line',{x1:x,y1:-80,x2:x,y2:920},grid);
  for(let y=-80;y<=920;y+=34)el('line',{x1:-120,y1:y,x2:840,y2:y},grid);
  el('text',{x:360,y:-52,text:'LUBRICATION & COOLING · EXPLODED VIEW 润滑与冷却系统爆炸图',fill:'#7dd3fc','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
  /* 发动机缸体轮廓（背景参考） */
  el('rect',{x:56,y:170,width:248,height:520,fill:'#132039',opacity:.55,rx:12},svg);
  el('text',{x:180,y:880,text:'LUBRICATION SYSTEM 润滑系统',fill:'#3b5b8f','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:600,y:880,text:'COOLING SYSTEM 冷却系统',fill:'#3b5b8f','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  LUBE_PARTS.forEach(p=>{
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
    g.addEventListener('click',()=>selectLubePart(p.id));
  });
}
function selectLubePart(id){
  $$('#lubeSvg .pt').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const n=$('#lubeInfoN'),e=$('#lubeInfoE'),z=$('#lubeInfoZ'),d=$('#lubeInfoD');
  if(id==null){ n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明'; d.textContent='润滑与冷却系统由 18 个主要部件组成：1~11 为润滑系统（油底壳、机油泵、集滤器、滤清器、限压阀、机油冷却器、主油道、缸盖油道、回油孔、油压传感器、机油尺），12~18 为冷却系统（水泵、水套、节温器、散热器、散热器软管、散热器盖、冷却风扇与皮带）。'; lubeSel=null; return; }
  const p=LUBE_PARTS.find(x=>x.id===id); lubeSel=id;
  n.textContent=p.id; e.textContent=p.en; z.textContent=p.zh; d.textContent=p.desc;
}
function setLubeExplode(on){
  lubeExploded=on;
  const svg=$('#lubeSvg'); if(svg)svg.classList.toggle('exploded',on);
  LUBE_PARTS.forEach(p=>{ const g=$('#lubeSvg .pt[data-id="'+p.id+'"]'); if(g)g.style.transform=on?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):''; });
  const b=$('#btnLubeExplode'); if(b)b.textContent=on?'🔩 重新组装':'💥 爆炸拆解';
}
(function(){
  buildLubeAnim();
  const be=$('#btnLubeExplode'), bt=$('#btnLubeTour');
  if(be)be.addEventListener('click',()=>setLubeExplode(!lubeExploded));
  if(bt)bt.addEventListener('click',()=>{
    if(lubeTour){ clearTimeout(lubeTour); lubeTour=null; bt.textContent='▶ 零件巡讲'; selectLubePart(null); return; }
    if(lubeExploded)setLubeExplode(false);
    bt.textContent='⏹ 停止巡讲';
    let i=0;
    const step=()=>{ if(i>=LUBE_PARTS.length){ lubeTour=null; bt.textContent='▶ 零件巡讲'; selectLubePart(null); return; } selectLubePart(LUBE_PARTS[i].id); i++; lubeTour=setTimeout(step,1400); };
    step();
  });
})();

/* ================= 机油循环动画（2D 流动示意） ================= */
const OIL_STEPS=[
 '① 机油储存在油底壳中，并在循环间隙散热',
 '② 机油泵经集滤器与吸油管从油底壳吸油',
 '③ 机油泵加压，限压阀把油压限制在规定范围',
 '④ 全部机油经全流式滤清器清除杂质',
 '⑤ 清洁机油进入缸体油道与主油道',
 '⑥ 曲轴斜油道把机油送到连杆轴承，形成动压油膜',
 '⑦ 上油道把机油送往缸盖，润滑配气机构',
 '⑧ 机油经回油孔靠重力返回油底壳，循环重复'
];
let oilPlaying=true, oilStep=0, oilTimer=null;
function buildOilFlow(){
  const svg=$('#oilFlowSvg'); if(!svg)return;
  svg.innerHTML='';
  const box=(x,y,w,h,fill,txt,sub)=> {
    el('rect',{x,y,width:w,height:h,rx:10,fill,stroke:'#64748b','stroke-width':2},svg);
    el('text',{x:x+w/2,y:y+h/2-2,text:txt,fill:'#e2e8f0','font-size':12.5,'font-weight':800,'text-anchor':'middle'},svg);
    if(sub)el('text',{x:x+w/2,y:y+h/2+14,text:sub,fill:'#93a9d8','font-size':10.5,'text-anchor':'middle'},svg);
  };
  /* 回路管道（带流动虚线） */
  const pipe=(d,color)=>el('path',{d,fill:'none',stroke:color,'stroke-width':7,'stroke-linecap':'round','stroke-dasharray':'13 9','class':'oil-flow'},svg);
  pipe('M120 372 L120 300 L560 300 L560 372','#f59e0b');
  pipe('M120 372 L120 300','#f59e0b');
  /* 部件 */
  box(60,372,120,52,'#334155','oil pan','油底壳');
  box(60,222,120,52,'#52525b','oil pump','机油泵');
  box(210,222,120,52,'#475569','oil filter','滤清器');
  box(360,222,120,52,'#3f3f46','main gallery','主油道');
  box(510,120,130,52,'#0e7490','bearings','轴承/配气');
  box(510,258,130,52,'#7c2d12','oil cooler','机油冷却器');
  box(210,120,120,52,'#3f3f46','relief valve','限压阀');
  /* 连接细管 */
  el('path',{d:'M120 300 L120 274',fill:'none',stroke:'#f59e0b','stroke-width':7},svg);
  el('path',{d:'M180 248 L210 248',fill:'none',stroke:'#f59e0b','stroke-width':7},svg);
  el('path',{d:'M330 248 L360 248',fill:'none',stroke:'#f59e0b','stroke-width':7},svg);
  el('path',{d:'M480 248 L510 246',fill:'none',stroke:'#f59e0b','stroke-width':7},svg);
  el('path',{d:'M575 172 L575 258',fill:'none',stroke:'#f59e0b','stroke-width':7},svg);
  el('path',{d:'M575 310 L575 300',fill:'none',stroke:'#f59e0b','stroke-width':7},svg);
  el('path',{d:'M270 274 L270 300',fill:'none',stroke:'#f59e0b','stroke-width':7,'stroke-dasharray':'10 8'},svg);
  /* 方向箭头 */
  el('path',{d:'M300 300 l16 -8 l0 16 Z',fill:'#fbbf24'},svg);
  el('text',{x:340,y:404,text:'机油流向 Oil flow direction',fill:'#93a9d8','font-size':11.5,'text-anchor':'middle'},svg);
}
function oilTick(){
  const tip=$('#oilStepTip');
  if(tip)tip.textContent=OIL_STEPS[oilStep];
  oilStep=(oilStep+1)%OIL_STEPS.length;
}
(function(){
  buildOilFlow();
  const btn=$('#btnOilPlay');
  const svg=$('#oilFlowSvg');
  const apply=()=>{
    if(svg)svg.querySelectorAll('.oil-flow').forEach(p=>p.style.animationPlayState=oilPlaying?'running':'paused');
    if(btn)btn.textContent=oilPlaying?'⏸ 暂停':'▶ 继续';
  };
  oilTick(); apply();
  oilTimer=setInterval(()=>{ if(oilPlaying)oilTick(); },1600);
  if(btn)btn.addEventListener('click',()=>{ oilPlaying=!oilPlaying; apply(); });
})();

/* ================= 节温器工作原理动画 ================= */
let thermoTemp=20, thermoAuto=true, thermoRaf=null, thermoDir=1;
function buildThermo(){
  const svg=$('#thermoSvg'); if(!svg)return;
  svg.innerHTML='';
  el('rect',{x:0,y:0,width:680,height:300,fill:'#0d1b36',rx:12},svg);
  /* 发动机侧 */
  el('rect',{x:40,y:60,width:200,height:180,rx:12,fill:'#132039',stroke:'#475569','stroke-width':2},svg);
  el('text',{x:140,y:84,text:'ENGINE 发动机',fill:'#93a9d8','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  el('rect',{x:70,y:104,width:140,height:60,rx:8,fill:'#1e3a5f',id:'thermoJacket'},svg);
  el('text',{x:140,y:140,text:'water jacket 水套',fill:'#7dd3fc','font-size':11.5,'text-anchor':'middle'},svg);
  /* 散热器侧 */
  el('rect',{x:440,y:60,width:200,height:180,rx:12,fill:'#132039',stroke:'#475569','stroke-width':2},svg);
  el('text',{x:540,y:84,text:'RADIATOR 散热器',fill:'#93a9d8','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  for(let i=0;i<7;i++)el('line',{x1:462,y1:100+i*20,x2:618,y2:100+i*20,stroke:'#334155','stroke-width':5},svg);
  /* 节温器阀 */
  el('rect',{x:296,y:120,width:88,height:60,rx:9,fill:'#52525b',stroke:'#94a3b8','stroke-width':2},svg);
  el('text',{x:340,y:112,text:'thermostat 节温器',fill:'#fbbf24','font-size':11.5,'font-weight':800,'text-anchor':'middle'},svg);
  el('circle',{cx:340,cy:150,r:20,fill:'#0f172a',stroke:'#f59e0b','stroke-width':2.5},svg);
  const valve=el('rect',{id:'thermoValve',x:322,y:142,width:36,height:10,rx:3,fill:'#94a3b8'},svg);
  el('text',{x:340,y:196,text:'wax pellet 蜡丸',fill:'#93a9d8','font-size':10.5,'text-anchor':'middle'},svg);
  /* 旁通管与散热器管 */
  el('path',{d:'M240 134 L296 134',fill:'none',stroke:'#0ea5e9','stroke-width':8,'stroke-linecap':'round'},svg);
  el('path',{d:'M384 134 L440 134',fill:'none',stroke:'#0ea5e9','stroke-width':8,'stroke-linecap':'round',id:'thermoRadPipe'},svg);
  el('path',{d:'M240 200 L540 200 L540 240 L140 240 L140 164',fill:'none',stroke:'#0ea5e9','stroke-width':8,'stroke-linecap':'round','stroke-dasharray':'14 10',id:'thermoBypass'},svg);
  el('text',{x:340,y:262,text:'旁通（短路）回路 bypass / short circuit',fill:'#38bdf8','font-size':11,'text-anchor':'middle'},svg);
  /* 温度条 */
  el('rect',{x:40,y:20,width:600,height:16,rx:8,fill:'#1e293b',stroke:'#334155'},svg);
  const bar=el('rect',{id:'thermoBar',x:40,y:20,width:60,height:16,rx:8,fill:'#38bdf8'},svg);
  const lab=el('text',{id:'thermoLab',x:340,y:14,text:'',fill:'#e2e8f0','font-size':12,'font-weight':800,'text-anchor':'middle'},svg);
  return {valve,bar,lab};
}
function thermoApply(){
  const valve=$('#thermoValve'), bar=$('#thermoBar'), lab=$('#thermoLab');
  const radPipe=$('#thermoRadPipe');
  if(!valve)return;
  const open=Math.max(0,Math.min(1,(thermoTemp-82)/12));   /* 82 ℃ 开始开启，94 ℃ 全开 */
  valve.setAttribute('y', String(142-open*18));
  valve.setAttribute('fill', open>0.5?'#f59e0b':'#94a3b8');
  if(radPipe)radPipe.setAttribute('opacity', String(0.15+0.85*open));
  if(bar)bar.setAttribute('width', String(Math.max(8,(thermoTemp+20)/140*600)));
  if(bar)bar.setAttribute('fill', thermoTemp<60?'#38bdf8':(thermoTemp<100?'#22c55e':'#ef4444'));
  if(lab)lab.textContent='coolant temperature 冷却液温度 '+Math.round(thermoTemp)+' ℃';
  const st=$('#thermoState');
  if(st)st.textContent = thermoTemp<82
    ? '当前：冷车 · 节温器关闭 · 冷却液只走旁通（短路）循环，发动机快速升温'
    : (thermoTemp<94
      ? '当前：升温中 · 节温器开始开启（' + Math.round(open*100) + '%）· 部分冷却液开始流向散热器'
      : '当前：热车 · 节温器全开 · 冷却液经散热器散热后再回到水泵');
  const jacket=$('#thermoJacket');
  if(jacket)jacket.setAttribute('fill', thermoTemp<60?'#1e3a5f':(thermoTemp<100?'#7c2d12':'#991b1b'));
}
function thermoTick(){
  if(!thermoAuto)return;
  thermoTemp+=thermoDir*0.45;
  if(thermoTemp>=108){ thermoDir=-1; }
  if(thermoTemp<=22){ thermoDir=1; }
  thermoApply();
  thermoRaf=requestAnimationFrame(thermoTick);
}
(function(){
  buildThermo(); thermoApply(); thermoTick();
  const btn=$('#btnThermoPlay');
  if(btn)btn.addEventListener('click',()=>{
    thermoAuto=!thermoAuto;
    btn.textContent=thermoAuto?'⏸ 暂停自动演示':'▶ 继续自动演示';
    if(thermoAuto)thermoTick(); else if(thermoRaf)cancelAnimationFrame(thermoRaf);
  });
})();

/* ================= 3D 模型（three.js：机体 + 润滑油路 + 冷却水路） ================= */
let lube3dInited=false;
function initLube3D(){
  const box=$('#lube3dBox'), note=$('#lube3dNote');
  if(!box)return;
  box.style.display=''; note.textContent='正在加载 three.js 组件…（首次可能需 10~20 秒）';
  loadThree().then(ok=>{
    if(!ok){ note.textContent='⚠️ 3D 组件加载失败（网络原因），可稍后重试。'; box.style.display='none'; lube3dInited=false; const b=$('#btnLube3D'); if(b){b.disabled=false;b.textContent='▶ 加载 3D 模型';} return; }
    note.textContent='🖱️ 拖拽旋转 · 滚轮缩放 · 观察机油（橙）与冷却液（蓝）的循环路径';
    const b=$('#btnLube3D'); if(b){b.disabled=false;b.textContent='🙈 隐藏 3D';}
    buildLube3D(box);
  });
}
function buildLube3D(box){
  const THREE=window.THREE;
  const W=box.clientWidth||600, H=box.clientHeight||430;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0d1b36);
  const camera=new THREE.PerspectiveCamera(45,W/H,0.1,200);
  camera.position.set(4.6,3.0,6.2); camera.lookAt(0,0.2,0);
  let renderer=null;
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }
  catch(e){ const n=$('#lube3dNote'); if(n)n.textContent='⚠️ 当前设备不支持 3D（WebGL 不可用）。'; return; }
  renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  box.innerHTML=''; box.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x2a3f6e,0.9));
  const dl=new THREE.DirectionalLight(0xffffff,0.7); dl.position.set(5,8,6); scene.add(dl);
  const grp=new THREE.Group(); scene.add(grp);

  const mk=(geo,color,opts={})=>{const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial(Object.assign({color,metalness:.45,roughness:.5},opts)));grp.add(m);return m;};

  /* 缸体与缸盖 */
  const block=mk(new THREE.BoxGeometry(3.2,2.0,1.8),0x3b4a63);
  block.position.set(0,0.6,0);
  /* 水套（半透明蓝色外套） */
  const jacket=mk(new THREE.BoxGeometry(3.5,1.5,2.1),0x38bdf8,{transparent:true,opacity:.22});
  jacket.position.set(0,0.7,0);
  /* 油底壳 */
  const pan=mk(new THREE.BoxGeometry(3.4,0.7,2.0),0x334155);
  pan.position.set(0,-0.75,0);
  /* 机油泵 */
  const pump=mk(new THREE.CylinderGeometry(0.34,0.34,0.5,20),0x94a3b8);
  pump.position.set(-1.1,-0.5,0.55); pump.rotation.z=Math.PI/2;
  /* 机油滤清器 */
  const filter=mk(new THREE.CylinderGeometry(0.32,0.32,0.8,18),0x52525b);
  filter.position.set(-0.4,-0.45,-1.05); filter.rotation.x=Math.PI/2;
  /* 主油道 */
  const gallery=mk(new THREE.CylinderGeometry(0.13,0.13,3.0,12),0xf59e0b);
  gallery.position.set(0,0.25,0.55); gallery.rotation.z=Math.PI/2;
  /* 曲轴 */
  const crank=mk(new THREE.CylinderGeometry(0.3,0.3,3.0,20),0xcbd5e1);
  crank.position.set(0,-0.15,0); crank.rotation.z=Math.PI/2;
  /* 水泵 */
  const wpump=mk(new THREE.CylinderGeometry(0.34,0.34,0.5,20),0x0ea5e9);
  wpump.position.set(1.25,-0.5,0.62); wpump.rotation.z=Math.PI/2;
  /* 散热器 */
  const rad=mk(new THREE.BoxGeometry(0.35,2.3,1.7),0x475569);
  rad.position.set(2.5,0.7,0);
  for(let i=0;i<9;i++){const f=mk(new THREE.BoxGeometry(0.06,2.0,0.06),0x7dd3fc);f.position.set(2.3,0.7,-0.75+i*0.19);}
  /* 水泵—水套—散热器管 */
  const hoseMat=new THREE.MeshStandardMaterial({color:0x1f2937,metalness:.3,roughness:.8});
  const hose1=new THREE.Mesh(new THREE.TorusGeometry(0.9,0.11,10,24,Math.PI),hoseMat); hose1.position.set(1.5,1.7,0.6); grp.add(hose1);
  const hose2=new THREE.Mesh(new THREE.TorusGeometry(0.9,0.11,10,24,Math.PI),hoseMat); hose2.position.set(1.5,-0.6,0.6); hose2.rotation.z=Math.PI; grp.add(hose2);

  /* 流动粒子：机油（橙）与冷却液（蓝） */
  const oilPath=[[-1.1,-0.45,0.55],[0,0.25,0.55],[0,0.25,-0.4],[-0.4,-0.4,-1.0],[-0.2,-0.7,0],[0.6,-0.7,0],[-1.1,-0.5,0.4]];
  const coolPath=[[1.25,-0.5,0.62],[0.6,0.7,0.8],[-0.6,0.7,0.8],[1.2,0.7,0.6],[2.4,1.5,0],[2.4,-0.2,0],[1.4,-0.6,0.6]];
  const mkFlow=(path,color)=>{
    const g=new THREE.Group();
    const geo=new THREE.SphereGeometry(0.085,10,10);
    const mat=new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.6});
    for(let i=0;i<14;i++){const s=new THREE.Mesh(geo,mat);s.userData.t=i/14;g.add(s);}
    grp.add(g); return {group:g,path};
  };
  const oilFlow=mkFlow(oilPath,0xfbbf24);
  const coolFlow=mkFlow(coolPath,0x38bdf8);
  const sample=(path,t)=>{
    const seg=(path.length-1)*t, i=Math.min(path.length-2,Math.floor(seg)), f=seg-i;
    const a=path[i], b=path[i+1];
    return [a[0]+(b[0]-a[0])*f, a[1]+(b[1]-a[1])*f, a[2]+(b[2]-a[2])*f];
  };

  let rx=0.18, ry=0, zoom=1, dragging=false, px=0, py=0;
  const el2=renderer.domElement;
  el2.style.cursor='grab';
  const down=e=>{dragging=true;px=e.clientX;py=e.clientY;el2.style.cursor='grabbing';};
  const move=e=>{ if(!dragging)return; ry+=(e.clientX-px)*0.008; rx+=(e.clientY-py)*0.006; rx=Math.max(-0.9,Math.min(0.9,rx)); px=e.clientX; py=e.clientY; };
  const up=()=>{dragging=false;el2.style.cursor='grab';};
  el2.addEventListener('pointerdown',down); window.addEventListener('pointermove',move); window.addEventListener('pointerup',up);
  el2.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(0.5,Math.min(2.2,zoom+(e.deltaY>0?0.08:-0.08)));},{passive:false});
  let tt=0;
  function loop(){
    if(!dragging)ry+=0.0022;
    tt=(tt+0.0042)%1;
    grp.rotation.y=ry; grp.rotation.x=rx;
    camera.position.set(4.6*zoom,3.0*zoom,6.2*zoom); camera.lookAt(0,0.2,0);
    oilFlow.group.children.forEach((s,i)=>{
      const t=(tt+i/14)%1; const p=sample(oilFlow.path,t);
      s.position.set(p[0],p[1],p[2]); s.visible=true;
    });
    coolFlow.group.children.forEach((s,i)=>{
      const t=(tt*0.8+i/14)%1; const p=sample(coolFlow.path,t);
      s.position.set(p[0],p[1],p[2]);
    });
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize',()=>{ const w=box.clientWidth,h=box.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
}
(function(){
  const b=$('#btnLube3D'); if(!b)return;
  b.addEventListener('click',()=>{
    if(lube3dInited){
      const box=$('#lube3dBox'); const hidden=box.style.display==='none';
      box.style.display=hidden?'':'none';
      b.textContent=hidden?'🙈 隐藏 3D':'🔄 显示 3D';
      return;
    }
    lube3dInited=true; b.disabled=true; b.textContent='⏳ 加载中…'; initLube3D();
  });
})();

/* ================= 课程四练习：连线 + 读音 ================= */
(function(){
  const PAIRS4=[['润滑','lubrication'],['油底壳','oil pan'],['机油泵','oil pump'],['滤清器','filter'],['节温器','thermostat'],['散热器','radiator'],['冷却液','coolant'],['传感器','sensor']];
  const mb=$('#matchBox4');
  if(mb){
    const left=PAIRS4.map((p,i)=>({i,zh:p[0]}));
    const right=PAIRS4.map((p,i)=>({i,en:p[1]})).sort(()=>Math.random()-.5);
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
            $('#matchMsg4').textContent='已配对 '+done+' / '+PAIRS4.length+(done===PAIRS4.length?' 🎉 全部正确！':'');
          } else { b.classList.add('wrong'); setTimeout(()=>b.classList.remove('wrong'),420); toast('❌ 配对错误，再想想'); }
        });
        colR.appendChild(b);
      });
    };
    mb.appendChild(colL); mb.appendChild(colR); render();
  }
  const READ4=['lubrication','lubricant','friction','wear','viscosity','oil pump','oil pan','filter','relief valve','oil gallery','oil cooler','dipstick','sensor','maintain','jacket','coolant','antifreeze','water pump','thermostat','radiator','radiator hose','idle operation','suction strainer','oil pressure regulator'];
  const rb=$('#readBox4');
  if(rb){
    rb.innerHTML=READ4.map(w=>'<span style="display:inline-flex;align-items:center;gap:6px;background:var(--accent-l);border:1px solid #fcd34d;color:#92400e;font-size:13.5px;padding:5px 10px 5px 14px;border-radius:999px;font-weight:700">'+w+'<button class="speak-btn" data-t="'+w+'" data-l="en-US" style="width:26px;height:26px;font-size:13px">🔊</button></span>').join('');
    rb.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
  }
})();

/* 课程四导入打字机 */
(function(){
  const txt='发动机不只要"吃饭"，还要有"血液"和"空调"——机油负责润滑、冷却、清洁、密封和防锈，冷却液负责把燃烧产生的巨量热量带走。这节课我们拆开润滑与冷却两套系统：从油底壳、机油泵、滤清器，到水泵、节温器和散热器，看看机油和冷却液是怎么循环起来的！🛢️🌡️';
  const box=$('#typedIntro4'); if(!box)return;
  const io=new IntersectionObserver(es=>{
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=()=>{ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();

createQuiz({box:'#quizBox4',bar:'#qBar4',questions:QUESTIONS4});
window.__COURSE_REGISTER('lube',{track:'track-lube'});
})();
