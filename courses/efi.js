/* ================================================================
   课程三：燃油系统（按需加载模块）
================================================================ */
(function(){
'use strict';
const QUESTIONS3=[
 {ty:'choice',q:'化油器燃油系统和燃油喷射系统的共同功用是什么？',en:'The function of both systems is to supply a ____ mixture to the engine.',
  opts:['A combustible air-fuel mixture','Pure engine oil','Coolant','Exhaust gas'],a:0,exp:'共同功用是向发动机供给可燃混合气（combustible mixture of air and fuel）。'},
 {ty:'choice',q:'汽油机燃油系统从油箱吸出燃油后送入什么装置？',en:'A gasoline fuel system forces fuel into the fuel-____ device.',
  opts:['A fuel-metering device (carburetor / injectors)','A cooling device','An ignition device','A lubrication device'],a:0,exp:'送入燃油计量装置（fuel-metering device）：化油器 carburetor 或汽油喷射器 injectors。'},
 {ty:'choice',q:'下列哪个不属于燃油供给系统的基本部件？',en:'Which is NOT a basic part of the fuel supply system?',
  opts:['Fuel tank','Fuel pump','Spark plug','Fuel filter'],a:2,exp:'燃油供给系统基本部件：油箱、油泵、滤清器、油管；火花塞属于点火系统。'},
 {ty:'choice',q:'燃油滤清器（fuel filter）的作用是什么？',en:'The fuel filter removes ____ in the fuel.',
  opts:['Water','Contaminants (dirt)','Heat','Air'],a:1,exp:'Fuel Filter: removes contaminants in the fuel.（滤除燃料中的杂质）'},
 {ty:'choice',q:'燃油泵（fuel pump）的作用是什么？',en:'The fuel pump draws fuel from the tank and forces it to the ____.',
  opts:['The fuel tank','The fuel-metering device','The cylinder head','The exhaust manifold'],a:1,exp:'从油箱吸出燃油并加压送入燃油计量装置。'},
 {ty:'choice',q:'EFI 是指什么？',en:'EFI stands for ____.',
  opts:['Electronic Fuel Injection','Exhaust Gas Recirculation','Variable Valve Timing','Turbocharging'],a:0,exp:'EFI = Electronic Fuel Injection 电子（电控）燃油喷射。'},
 {ty:'choice',q:'电控燃油喷射系统可分为几个子系统？',en:'An EFI system can be divided into ____ subsystems.',
  opts:['Two','Three','Four','Five'],a:2,exp:'四个：燃油传输、空气供给、传感器、计算机控制。'},
 {ty:'choice',q:'下列哪个不属于 EFI 的四个子系统？',en:'Which is NOT one of the four EFI subsystems?',
  opts:['Fuel delivery system','Air induction system','Sensor system','Exhaust system'],a:3,exp:'EFI 四子系统：燃油传输、空气供给、传感器、计算机控制。'},
 {ty:'choice',q:'燃油压力调节器（fuel pressure regulator）的作用是什么？',en:'The fuel pressure regulator controls the ____ entering the injector valves.',
  opts:['Quantity','Pressure','Temperature','Flow meter'],a:1,exp:'调节进入喷油阀的燃油压力；压力足够时把多余燃油送回油箱，保持预设压力。'},
 {ty:'choice',q:'当燃油压力足够时，压力调节器会把多余燃油送到哪里？',en:'When sufficient pressure is attained, the regulator returns excess fuel to the ____.',
  opts:['The cylinder','The fuel tank','The intake manifold','The filter'],a:1,exp:'多余燃油经回油管（fuel return line）返回油箱。'},
 {ty:'choice',q:'电控喷射系统的喷油器本质上是什么？',en:'The fuel injector is a coil or solenoid-operated fuel ____.',
  opts:['A valve (fuel valve)','A pump','A filter','A sensor'],a:0,exp:'喷油器是一个由线圈/螺线管操纵的燃油阀（fuel valve）。'},
 {ty:'choice',q:'喷油器未通电（not energized）时处于什么状态？',en:'When not energized, the injector is ____.',
  opts:['Open','Closed','Half open','Chattering'],a:1,exp:'弹簧压力（spring pressure）使喷油器保持关闭，燃油不能进入发动机。'},
 {ty:'choice',q:'电流通过喷油器线圈时产生什么，从而使喷油器打开？',en:'The magnetic field attracts the injector ____, opening the injector.',
  opts:['A magnetic field that attracts the armature','High temperature','High-pressure fuel','Vacuum'],a:0,exp:'电流通过线圈产生磁场，吸引喷油器电枢（armature），喷油器打开喷油。'},
 {ty:'choice',q:'空气供给系统中的节气门（throttle valve）调节什么？',en:'The throttle valve regulates how much ____ flows into the engine.',
  opts:['Fuel','Air','Engine oil','Coolant'],a:1,exp:'节气门调节进入发动机的空气量，从而控制发动机输出功率。'},
 {ty:'choice',q:'踩下油门踏板时，节气门会怎样？',en:'When the pedal is depressed, the throttle valve swings ____.',
  opts:['Closed','Opened wider (more air enters)','Reversed','Disconnected'],a:1,exp:'踏板被踩下时节气门开大，更多空气进入气缸。'},
 {ty:'choice',q:'传感器系统的作用是什么？',en:'The EFI sensor system monitors engine operating conditions and reports to the ____.',
  opts:['The computer (controller)','The fuel tank','The exhaust port','The driver'],a:0,exp:'传感器监测发动机运行状态并把信息反馈给控制器（computer）。'},
 {ty:'choice',q:'传感器的本质是什么？',en:'A sensor is an electrical device that changes circuit resistance or ____.',
  opts:['Current','Voltage','Resistance or voltage','Temperature'],a:2,exp:'传感器是随条件（温度、压力、位置等）变化而改变电路电阻或电压的电气装置。'},
 {ty:'choice',q:'“carburetor” 的中文意思是？',en:'carburetor',
  opts:['Carburetor','Injector','Sensor','Filter'],a:0,exp:'carburetor n. 化油器。'},
 {ty:'choice',q:'“injector” 的中文意思是？',en:'injector',
  opts:['Carburetor','Injector','Coil','Armature'],a:1,exp:'injector n. 喷油器。'},
 {ty:'choice',q:'“contaminant” 的中文意思是？',en:'contaminant',
  opts:['Contaminant','Fuel','Pressure','Voltage'],a:0,exp:'contaminant n. 污染物、致污物。'},
 {ty:'choice',q:'“solenoid” 的中文意思是？',en:'solenoid',
  opts:['Spring','Solenoid','Armature','Pedal'],a:1,exp:'solenoid n. 螺线管。'},
 {ty:'choice',q:'“voltage” 的中文意思是？',en:'voltage',
  opts:['Current','Voltage','Resistance','Circuit'],a:1,exp:'voltage n. 电压。'},
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
/* ---------- 数据：燃油系统零件爆炸图（18 个零件，按燃油走向编号，全部矢量绘制） ---------- */
const FUEL_PARTS=[
 {id:1,en:'fuel tank',zh:'燃油箱',b:[140,628],side:'l',ex:[0,88],
  desc:'储存汽油的容器（stores gasoline）。现代轿车油箱多由多层塑料吹塑成型，内部设隔板抑制油液晃动，并集成油泵与油位传感器。',
  draw(g,H){
    H.path(g,'M130 648 Q130 620 158 620 L492 620 Q520 620 520 648 L520 752 Q520 780 492 780 L158 780 Q130 780 130 752 Z','#334155',{stroke:'#475569','stroke-width':2});
    H.path(g,'M144 708 L506 708 L506 750 Q506 766 490 766 L160 766 Q144 766 144 750 Z','#1d4ed8',{opacity:.4});
    H.line(g,144,708,506,708,'#38bdf8',2);
    H.rect(g,264,620,48,14,'#64748b',{rx:4});
  }},
 {id:2,en:'electric fuel pump',zh:'电动燃油泵',b:[208,668],side:'l',ex:[-52,132],
  desc:'浸在油箱内的电动泵（in-tank electric fuel pump），把燃油加压后送出。汽油机供油压力约 0.25～0.4 MPa，靠燃油本身冷却与润滑。',
  draw(g,H){
    H.rect(g,204,664,86,106,'#64748b',{rx:12});
    H.rect(g,214,674,66,30,'#94a3b8',{rx:6});
    H.circ(g,247,730,17,'#475569');
    H.circ(g,247,730,7,'#1e293b');
    H.line(g,247,664,247,614,'#94a3b8',6);
    H.circ(g,247,612,8,'#cbd5e1');
    H.rect(g,236,644,22,14,'#334155',{rx:3});
  }},
 {id:3,en:'fuel level sending unit',zh:'油位传感器',b:[314,668],side:'l',ex:[72,132],
  desc:'由浮子、摆臂和可变电阻组成（float, arm and variable resistor），随油面高度改变电阻值，把油量信号送给仪表。',
  draw(g,H){
    H.rect(g,310,664,16,92,'#94a3b8',{rx:5});
    H.circ(g,318,676,10,'#64748b');
    H.line(g,318,682,374,712,'#cbd5e1',5);
    H.circ(g,378,716,14,'#f59e0b');
    H.circ(g,378,716,6,'#fbbf24',{opacity:.6});
  }},
 {id:4,en:'fuel filter',zh:'燃油滤清器',b:[96,472],side:'l',ex:[-86,-34],
  desc:'滤除燃油中的杂质与水分（removes contaminants and water）。滤芯堵塞会造成供油不足、加速无力，需按里程更换。',
  draw(g,H){
    H.rect(g,88,468,78,58,'#475569',{rx:11});
    H.rect(g,96,478,62,10,'#64748b',{rx:4});
    H.rect(g,96,506,62,10,'#64748b',{rx:4});
    H.circ(g,127,497,11,'#334155');
    H.line(g,127,468,127,440,'#94a3b8',6);
    H.line(g,127,526,127,554,'#94a3b8',6);
  }},
 {id:5,en:'fuel feed line',zh:'供油管',b:[200,586],side:'l',ex:[-70,10],
  desc:'把加压后的燃油从滤清器输送到燃油导轨（delivers pressurized fuel to the rail）。多为钢制或尼龙管，带快速接头。',
  draw(g,H){
    H.path(g,'M247 612 L247 586 L127 586 L127 554','none',{stroke:'#38bdf8','stroke-width':7,fill:'none','stroke-linecap':'round'});
    H.path(g,'M127 440 L127 325 L172 325','none',{stroke:'#38bdf8','stroke-width':7,fill:'none','stroke-linecap':'round'});
    H.circ(g,247,612,5,'#0ea5e9');
  }},
 {id:6,en:'fuel rail',zh:'燃油导轨',b:[262,314],side:'l',ex:[0,-6],
  desc:'储存高压燃油并均匀分配到各缸喷油器（distributes fuel to each injector）。导轨上装有压力调节器与脉动阻尼器。',
  draw(g,H){
    H.rect(g,250,310,190,32,'#94a3b8',{rx:16});
    H.rect(g,258,318,174,8,'#cbd5e1',{rx:4,opacity:.5});
    [270,315,360,405].forEach(x=>H.rect(g,x,336,20,16,'#64748b',{rx:4}));
    H.circ(g,250,326,10,'#475569');
    H.circ(g,440,326,10,'#475569');
  }},
 {id:7,en:'fuel pressure regulator',zh:'燃油压力调节器',b:[468,304],side:'r',ex:[86,-12],
  desc:'把油轨压力稳定在设定值（keeps rail pressure constant）。压力过高时旁通多余燃油回油箱，保证喷油量只由喷油脉宽决定。',
  draw(g,H){
    H.rect(g,462,306,72,40,'#64748b',{rx:9});
    H.path(g,'M470 306 Q498 280 526 306','#94a3b8');
    H.circ(g,498,282,7,'#cbd5e1');
    H.line(g,498,268,498,258,'#94a3b8',4);
    H.rect(g,472,344,52,10,'#475569',{rx:4});
    H.circ(g,498,326,9,'#334155');
  }},
 {id:8,en:'fuel damper',zh:'燃油脉动阻尼器',b:[178,306],side:'l',ex:[-80,-6],
  desc:'吸收喷油器开闭引起的高频压力脉动（absorbs pressure pulsation），降低供油系统噪声，让各缸喷油量更一致。',
  draw(g,H){
    H.rect(g,172,308,70,36,'#52525b',{rx:9});
    H.circ(g,207,326,11,'#71717a');
    H.circ(g,207,326,5,'#a1a1aa',{opacity:.7});
    H.circ(g,172,326,9,'#475569');
    H.circ(g,242,326,9,'#475569');
  }},
 {id:9,en:'fuel injector',zh:'喷油器',b:[268,240],side:'l',ex:[0,-40],
  desc:'电磁阀式喷油器（solenoid fuel injector）：ECU 通电时电磁线圈吸起针阀开始喷油，断电时弹簧关闭。喷油脉宽决定喷油量。',
  draw(g,H){
    [268,313,358,403].forEach(x=>{
      H.rect(g,x,300,18,36,'#cbd5e1',{rx:4});
      H.rect(g,x+3,240,12,62,'#e2e8f0',{rx:3});
      H.rect(g,x+5,272,8,16,'#64748b',{rx:2});
      H.rect(g,x,232,18,10,'#94a3b8',{rx:3});
      H.path(g,'M'+(x+2)+' 236 L'+(x+16)+' 236','none',{stroke:'#f59e0b','stroke-width':3});
    });
  }},
 {id:10,en:'engine cylinder',zh:'发动机气缸',b:[258,66],side:'l',ex:[0,-78],
  desc:'燃油最终喷入的地方（where fuel is finally injected）。汽油与空气在这里混合、压缩，被火花塞点燃后膨胀做功。',
  draw(g,H){
    H.rect(g,250,62,196,116,'#334155',{rx:11,stroke:'#475569','stroke-width':2});
    H.rect(g,424,86,22,68,'#475569',{rx:5});
    H.rect(g,268,80,120,80,'none',{stroke:'#38bdf8','stroke-width':2,'stroke-dasharray':'6 5',rx:7});
    H.rect(g,286,120,84,30,'#94a3b8',{rx:4});
    H.rect(g,318,96,20,26,'#64748b',{rx:3});
    H.line(g,328,96,328,78,'#94a3b8',3);
    H.circ(g,328,74,6,'#e2e8f0');
  }},
 {id:11,en:'fuel return line',zh:'回油管',b:[496,532],side:'r',ex:[64,44],
  desc:'把压力调节器旁通的燃油送回油箱（returns excess fuel to the tank）。回油还能带走热量、排出油路中的气泡。',
  draw(g,H){
    H.path(g,'M498 354 L498 560 L470 560 L470 618','none',{stroke:'#f59e0b','stroke-width':6,fill:'none','stroke-dasharray':'13 8','stroke-linecap':'round'});
    H.rect(g,486,348,24,14,'#94a3b8',{rx:4});
    H.rect(g,458,606,24,14,'#94a3b8',{rx:4});
    H.rect(g,486,548,24,16,'#64748b',{rx:4});
  }},
 {id:12,en:'EVAP canister',zh:'碳罐',b:[562,390],side:'r',ex:[74,10],
  desc:'内装活性炭，吸附油箱蒸发的汽油蒸气（adsorbs fuel vapor），再由进气管吸入燃烧，防止碳氢化合物排入大气。',
  draw(g,H){
    H.rect(g,556,386,110,74,'#3f3f46',{rx:13});
    [402,420,438].forEach(y=>H.line(g,568,y,654,y,'#71717a',3,{opacity:.85}));
    H.circ(g,611,386,8,'#a1a1aa');
    H.path(g,'M611 460 L611 500','none',{stroke:'#a1a1aa','stroke-width':5,'stroke-dasharray':'9 6',fill:'none'});
  }},
 {id:13,en:'purge valve',zh:'碳罐电磁阀',b:[576,330],side:'r',ex:[78,-22],
  desc:'由 ECU 按工况开启，把碳罐里收集的汽油蒸气定量吸入进气管（purges vapor into the intake）。',
  draw(g,H){
    H.rect(g,566,330,90,44,'#52525b',{rx:9});
    H.rect(g,578,340,60,24,'#71717a',{rx:5});
    H.rect(g,596,316,24,14,'#94a3b8',{rx:3});
    H.line(g,611,374,611,386,'#a1a1aa',5);
    H.line(g,566,352,548,352,'#a1a1aa',5);
  }},
 {id:14,en:'air filter',zh:'空气滤清器',b:[566,176],side:'r',ex:[78,-52],
  desc:'滤除进气中的灰尘与砂粒（removes dust from intake air）。堵塞会使进气阻力增大、混合气变浓、动力下降。',
  draw(g,H){
    H.rect(g,556,172,116,76,'#475569',{rx:13});
    for(let i=0;i<7;i++)H.line(g,570+i*14,184,570+i*14,236,'#94a3b8',4,{opacity:.75});
    H.circ(g,614,248,8,'#64748b');
    H.rect(g,596,282,36,16,'#64748b',{rx:4});
  }},
 {id:15,en:'mass airflow sensor',zh:'空气流量计',b:[572,118],side:'r',ex:[78,-74],
  desc:'测量单位时间进入发动机的空气量（measures intake air mass），是 ECU 计算基本喷油量的最主要信号。',
  draw(g,H){
    H.rect(g,556,118,116,42,'#64748b',{rx:10});
    H.rect(g,592,104,44,22,'#94a3b8',{rx:5});
    H.circ(g,614,139,11,'#334155');
    H.line(g,604,139,624,139,'#f59e0b',3);
    H.line(g,614,130,614,148,'#f59e0b',3);
  }},
 {id:16,en:'throttle body',zh:'节气门体',b:[572,282],side:'r',ex:[78,-34],
  desc:'内含由油门踏板（或电机）控制的蝶形阀，改变进气通道截面积，从而控制进气量与发动机功率。',
  draw(g,H){
    H.rect(g,556,282,116,60,'#52525b',{rx:11});
    H.circ(g,614,312,22,'#0f172a',{stroke:'#f59e0b','stroke-width':2});
    H.line(g,596,312,632,312,'#94a3b8',5);
    H.circ(g,614,312,5,'#94a3b8');
    H.rect(g,600,268,28,14,'#94a3b8',{rx:3});
  }},
 {id:17,en:'intake manifold',zh:'进气歧管',b:[262,194],side:'l',ex:[0,-58],
  desc:'把空气均匀分配到各缸（distributes air to each cylinder）。歧管长度与容积会影响不同转速下的进气惯性增压效果。',
  draw(g,H){
    H.rect(g,258,196,164,30,'#475569',{rx:14});
    [276,319,362,405].forEach(x=>{
      H.path(g,'M'+x+' 196 L'+x+' 182','none',{stroke:'#64748b','stroke-width':15,'stroke-linecap':'round'});
    });
    H.path(g,'M422 211 L540 211','none',{stroke:'#475569','stroke-width':24,'stroke-linecap':'round'});
    H.circ(g,262,211,10,'#64748b');
  }},
 {id:18,en:'filler cap and neck',zh:'加油口盖与加油管',b:[548,582],side:'r',ex:[84,26],
  desc:'加油口盖带压力阀与真空阀（pressure and vacuum relief valves），既防止汽油蒸气外泄，又能在油路真空过大时补气。',
  draw(g,H){
    H.path(g,'M600 596 Q600 660 536 686','none',{stroke:'#64748b','stroke-width':17,fill:'none','stroke-linecap':'round'});
    H.rect(g,586,572,52,30,'#94a3b8',{rx:9});
    H.rect(g,594,562,36,12,'#64748b',{rx:5});
    H.line(g,600,572,600,562,'#cbd5e1',3);
  }}
];
let fuelExploded=false, fuelTour=null;
function buildFuelAnim(){
  const svg=$('#fuelSvg'); if(!svg)return;
  svg.innerHTML='';
  /* 通用绘图助手（带 .shp 类，便于悬停/选中发光） */
  const H={
    rect(g,x,y,w,h,fill,ex){const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex||{}),g);r.classList.add('shp');return r;},
    circ(g,cx,cy,r,fill,ex){const c=el('circle',Object.assign({cx,cy,r,fill},ex||{}),g);c.classList.add('shp');return c;},
    path(g,d,fill,ex){const p=el('path',Object.assign({d,fill},ex||{}),g);p.classList.add('shp');return p;},
    line(g,x1,y1,x2,y2,stroke,w,ex){const l=el('line',Object.assign({x1,y1,x2,y2,stroke,'stroke-width':w||2},ex||{}),g);l.classList.add('shp');return l;}
  };
  /* 背景与网格（viewBox 四周留出内边距，保证爆炸态零件与标签不被裁切） */
  el('rect',{x:-70,y:-80,width:860,height:1070,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=-70;x<=790;x+=34)el('line',{x1:x,y1:-80,x2:x,y2:990},grid);
  for(let y=-80;y<=990;y+=34)el('line',{x1:-70,y1:y,x2:790,y2:y},grid);
  /* 分区标题（标题上移到内边距区，避免爆炸态零件标签压住标题） */
  el('text',{x:340,y:-36,text:'FUEL SYSTEM · EXPLODED VIEW 燃油系统爆炸图',fill:'#7dd3fc','font-size':15,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:-56,y:210,text:'AIR INTAKE',fill:'#3b5b8f','font-size':12,'font-weight':800},svg);
  el('text',{x:-56,y:226,text:'进气',fill:'#2f4a75','font-size':11,'font-weight':700},svg);
  el('text',{x:-56,y:410,text:'FUEL DELIVERY',fill:'#3b5b8f','font-size':12,'font-weight':800},svg);
  el('text',{x:-56,y:426,text:'供油',fill:'#2f4a75','font-size':11,'font-weight':700},svg);
  el('text',{x:-56,y:610,text:'TANK & EVAP',fill:'#3b5b8f','font-size':12,'font-weight':800},svg);
  el('text',{x:-56,y:626,text:'油箱与蒸发排放',fill:'#2f4a75','font-size':11,'font-weight':700},svg);
  /* 零件 */
  FUEL_PARTS.forEach(p=>{
    const g=el('g',{'class':'pt','data-id':p.id},svg);
    if(p.draw)p.draw(g,H);
    /* 编号徽标 */
    const bg=el('g',{},g);
    el('circle',{class:'badge-circle',cx:p.b[0],cy:p.b[1],r:11},bg);
    el('text',{class:'badge-text',x:p.b[0],y:p.b[1],text:p.id},bg);
    /* 爆炸态标签（居中于徽标下方，避免与零件图形打架） */
    const lg=el('g',{'class':'pt-label'},g);
    const t1=el('text',{class:'part-label',x:p.b[0],y:p.b[1]+26,text:p.en},lg);
    t1.setAttribute('text-anchor','middle');
    const t2=el('text',{class:'part-label zh',x:p.b[0],y:p.b[1]+39,text:p.zh},lg);
    t2.setAttribute('text-anchor','middle');
    g.addEventListener('click',()=>selectFuelPart(p.id));
  });
}
function selectFuelPart(id){
  $$('#fuelSvg .pt').forEach(g=>g.classList.toggle('sel',g.dataset.id==String(id)));
  const n=$('#fuelInfoN'),e=$('#fuelInfoE'),z=$('#fuelInfoZ'),d=$('#fuelInfoD');
  if(id==null){ n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明'; d.textContent='燃油系统由燃油箱、电动燃油泵、滤清器、供油管、燃油导轨、喷油器、压力调节器、碳罐等 18 个主要部件组成，按燃油走向编号 1→18。'; return; }
  const p=FUEL_PARTS.find(x=>x.id===id);
  n.textContent=p.id; e.textContent=p.en; z.textContent=p.zh; d.textContent=p.desc;
}
function setFuelExplode(on){
  fuelExploded=on;
  const svg=$('#fuelSvg');
  if(svg)svg.classList.toggle('exploded',on);
  FUEL_PARTS.forEach(p=>{ const g=$('#fuelSvg .pt[data-id="'+p.id+'"]'); if(g)g.style.transform=on?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):''; });
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
