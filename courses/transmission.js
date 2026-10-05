/* ================================================================
   课程六：变速器 Transmission（按需加载模块）
   来源课件：Chapter2-Chassis Module / 2-2.pptx（UNIT-2 Transmission，23 页）
================================================ */
(function(){
'use strict';

/* 模块级状态（集中声明，避免 'use strict' 下的 TDZ 错误） */
let transExploded=false, transSel=null;
let trans3DOn=false, trans3DInited=false;
let gear6Idx=0, gear6Ang=0, ratioRAF=null;

/* ================= 题库（25 题：20 选择 + 5 判断；选项全英文） ================= */
const QUESTIONS6=[
 {ty:'choice',q:'课文给变速器下的定义是什么？',en:'According to the text, a transmission is ____.',
  opts:['A speed and power changing device installed between the engine and the driving wheels','A device that produces engine power','A device that only reduces engine noise','A device that supplies fuel to the engine'],a:0,
  exp:'课文：变速器是一个改变速度和动力的装置，安装在发动机与驱动轮之间。它并不"创造"功率。'},
 {ty:'choice',q:'变速器在发动机与驱动轮之间提供什么？',en:'The transmission provides different ____ between the engine and the driving wheels.',
  opts:['Gear ratios','Fuel pressures','Oil clearances','Coolant temperatures'],a:0,
  exp:'课文：它在两者之间提供不同的传动比（gear ratios）。'},
 {ty:'choice',q:'传动比是如何计算的？',en:'The gear ratio of a gear pair is calculated as ____.',
  opts:['The number of teeth on the driven gear divided by the number of teeth on the driving gear','The number of teeth on the driving gear divided by the number of teeth on the driven gear','The diameter of the shaft divided by its length','The engine speed divided by the vehicle speed'],a:0,
  exp:'传动比 = 从动齿轮齿数 ÷ 主动齿轮齿数。比值大于 1 时降速增扭。'},
 {ty:'choice',q:'12 齿齿轮驱动 36 齿齿轮，传动比为 3∶1，结果是：',en:'A 12-tooth gear drives a 36-tooth gear, so the ratio is 3:1. The result is ____.',
  opts:['Speed divided by 3 and torque multiplied by 3','Speed multiplied by 3 and torque divided by 3','Both speed and torque divided by 3','Both speed and torque unchanged'],a:0,
  exp:'传动比把转速除以多少，就把扭矩乘以多少——因为功率 = 扭矩 × 转速，功率近似守恒。'},
 {ty:'choice',q:'低挡位（如 1 档）为什么能提供更大的驱动力？',en:'Why does a low gear such as first gear provide more driving force?',
  opts:['Because the gear ratio multiplies torque while reducing speed','Because the engine produces more power in low gear','Because more fuel is injected in low gear','Because the clutch slips more in low gear'],a:0,
  exp:'低挡传动比大：转速按同样倍数下降、扭矩按同样倍数上升。变速器不增加功率，是"以转速换扭矩"。'},
 {ty:'choice',q:'按图 2.2-1，动力从发动机传到驱动轮，下列哪一项<b>不在</b>这条传递路线上？',en:'According to Fig. 2.2-1, which of the following is NOT on the power path from the engine to the driving wheel?',
  opts:['Clutch','Transmission','Universal joint','Brake caliper'],a:3,
  exp:'图 2.2-1 的路线是：发动机—离合器—变速器—传动轴—万向节—主减速器—驱动轮。制动钳不属于动力传递路线。'},
 {ty:'choice',q:'后驱汽车动力传递的正确顺序是：',en:'The correct power path in a rear-wheel-drive vehicle is ____.',
  opts:['Engine - clutch - transmission - propeller shaft - universal joints - final drive - half shafts','Engine - clutch - propeller shaft - transmission - differential - half shafts','Engine - torque converter - half shafts - final drive - propeller shaft','Engine - differential - transmission - propeller shaft - half shafts'],a:0,
  exp:'变速器在传动轴之前，万向节属于传动轴总成，主减速器与差速器在后桥。'},
 {ty:'choice',q:'在前驱车上，动力被传递给什么？',en:'In a front-wheel-drive vehicle, engine power is transferred to the ____.',
  opts:['Axle half shafts and front wheels','Drive shaft and rear wheels','Propeller shaft only','Differential and rear axle'],a:0,
  exp:'课文：前驱车是传递给半轴（axle half shafts）和前轮。'},
 {ty:'choice',q:'前驱汽车为什么没有传动轴？',en:'A front-wheel-drive car has no propeller shaft because ____.',
  opts:['It uses a transaxle that combines the gearbox and the final drive on the front axle','Its engine is mounted at the rear','It uses a CVT instead of gears','Its half shafts are replaced by U-joints'],a:0,
  exp:'变速驱动桥（transaxle）把变速器与主减速器合装在前轴上，经两根半轴直接驱动前轮，因此不需要传动轴。'},
 {ty:'choice',q:'下列哪一项<b>不属于</b>课文列出的变速器三大具体功能？',en:'Which of the following is NOT one of the three specific functions of the transmission listed in the text?',
  opts:['Providing the operator with a selection of gear ratios','Reversing the vehicle movement','Interrupting the transmission of power','Cooling the engine oil'],a:3,
  exp:'课文三大功能：①选择传动比 ②改变行驶方向（倒车）③中断动力传送。冷却机油属于润滑与冷却系统。'},
 {ty:'choice',q:'“It is designed to interrupt the transmission of power” 说明变速器能做什么？',en:'"It is designed to interrupt the transmission of power" means the transmission can ____.',
  opts:['Cut off the flow of power to the driving wheels','Increase the engine displacement','Reduce the fuel tank pressure','Change the colour of the dashboard'],a:0,
  exp:'interrupt the transmission of power = 中断动力传送，也就是切断通往驱动轮的动力（对应空挡）。'},
 {ty:'choice',q:'课文说变速器一般由外壳、输入轴及齿轮、输出轴及齿轮、倒挡齿轮、齿轮组、换挡机构以及什么组成？',en:'The transmission generally consists of a housing, an input shaft and gear, an output shaft and gear, a reverse gear, a cluster of gears, a gear shift mechanism and a(n) ____.',
  opts:['Idler shaft','Exhaust pipe','Fuel injector','Brake disc'],a:0,
  exp:'课文：还有空转轴（idler shaft），也称中间轴（countershaft）。'},
 {ty:'choice',q:'下列哪一项<b>不是</b>变速器的组成零件？',en:'Which of the following is NOT a component of the transmission?',
  opts:['Housing','Input shaft and gear','Cluster of gears','Carburettor'],a:3,
  exp:'化油器（carburettor）属于燃油供给装置，不是变速器零件。'},
 {ty:'choice',q:'手动变速器有哪两种基本型式？',en:'There are two basic types of manual transmissions: ____.',
  opts:['The sliding-gear type and the constant-mesh design','The hydraulic type and the pneumatic type','The single-plate type and the multi-plate type','The front type and the rear type'],a:0,
  exp:'课文：两种基本型式是滑动型（sliding-gear type）和固定啮合型（constant-mesh design）。'},
 {ty:'choice',q:'哪一种手动变速器型式现在已经淘汰？',en:'Which type of manual transmission is obsolete now?',
  opts:['The sliding-gear type','The constant-mesh type','Both of them','Neither of them'],a:0,
  exp:'课文：滑动型变速器现在已经不用了（obsolete）。'},
 {ty:'choice',q:'滑动齿轮式变速器被淘汰的主要原因是：',en:'The sliding-gear type became obsolete mainly because ____.',
  opts:['Its gears clashed because there were no synchronizers','It was too heavy','It could not provide a reverse gear','It could not use helical gears'],a:0,
  exp:'滑动型挂挡瞬间两齿转速不同而互相撞击（打齿）；当时没有同步器，只能靠"两脚离合"操作。'},
 {ty:'choice',q:'现代变速器全部属于哪一类型？',en:'All modern transmissions are of the ____ type.',
  opts:['Constant-mesh','Sliding-gear','Friction-disc','Chain-drive'],a:0,
  exp:'课文：现代的变速器都是固定啮合型（constant-mesh）——所有前进挡齿轮始终啮合。'},
 {ty:'choice',q:'常啮合式变速器中，真正决定"用哪个挡"的是什么？',en:'In a constant-mesh transmission, what actually decides which gear is engaged?',
  opts:['The synchronizer, which locks the chosen gear to the shaft','The gear that slides along the shaft','The torque converter','The final drive ratio'],a:0,
  exp:'常啮合式的齿轮不移动，只是在轴上自由空转；同步器把选中的那只齿轮锁到轴上，才得到该挡。'},
 {ty:'choice',q:'同步器中起摩擦作用、使齿轮与轴转速一致的零件是：',en:'The part that rubs and equalises gear and shaft speed is the ____.',
  opts:['Synchronizer (blocker) ring','Output shaft gear','Shift fork','Detent ball'],a:0,
  exp:'锥形同步环构成一个"锥形离合器"，产生摩擦力矩使齿轮与轴转速一致，接合齿才能无冲击地挂入。'},
 {ty:'choice',q:'换挡拨叉通过什么驱动同步器滑套？',en:'A shift fork moves the synchronizer sleeve by engaging ____.',
  opts:['A groove on the outside of the sliding sleeve','The dog teeth on the gear','The friction cone of the gear wheel','The output shaft splines'],a:0,
  exp:'滑套外侧有环槽，换挡拨叉卡入环槽推动滑套轴向移动。'},
 {ty:'choice',q:'课文说自动变速器档位选择器有六个位置，顺序是什么？',en:'The selector quadrant of an automatic transmission has six positions, in the following order: ____.',
  opts:['P - R - N - D - 2 - 1','P - N - R - D - 1 - 2','1 - 2 - D - N - R - P','R - P - N - D - 2 - 1'],a:0,
  exp:'课文：顺序依次是 P（停车挡）- R（倒车挡）- N（空挡）- D（行车挡）- 2（2 速挡）- 1（1 速挡）。'},
 {ty:'choice',q:'按原厂维修手册，P 挡时输出轴由什么锁定？',en:'According to the OEM workshop manual, in PARK the output shaft is held by ____.',
  opts:['The parking pawl, which locks it to the case','The synchronizer sleeve','The torque converter lock-up clutch','The differential pinion gears'],a:0,
  exp:'原厂手册：P 挡无动力传递，且驻车棘爪（parking pawl）把输出轴机械锁在壳体上。N 挡只是无动力传递，输出轴是自由的。'},
 {ty:'choice',q:'选挡杆位置 “2”（二挡）通常用于：',en:'Selector position "2" is typically used for ____.',
  opts:['Second-gear start and hold, useful on slippery roads or for engine braking','Normal highway cruising at maximum fuel economy','Locking the output shaft for parking','Starting the engine only'],a:0,
  exp:'原厂说明：2 位提供二挡起步并锁定（不升到更高挡），适合湿滑路面起步或利用发动机制动。'},
 {ty:'choice',q:'课文说手动变速器与自动变速器相比，燃油经济性通常如何？',en:'According to the text, manual transmissions typically offer ____ fuel economy than automatic ones.',
  opts:['Better','Worse','Exactly the same','Far worse'],a:0,
  exp:'课文：手动变速器通常比自动变速器有更好的节油性，节油幅度 5%~15%。'},
 {ty:'choice',q:'传统自动变速器油耗偏高的主要原因是什么？',en:'What was the main reason a traditional automatic transmission used more fuel?',
  opts:['The torque converter always has some slip, which wastes energy','Its gears are heavier','It has no reverse gear','It cannot use helical gears'],a:0,
  exp:'液力变矩器靠液体传力，始终存在滑差：速比接近零时效率不足 10%，最高也只有 85%~90%。'},
 {ty:'choice',q:'现代自动变速器靠什么消除变矩器的滑差损失？',en:'Modern automatic transmissions remove the converter slip by using ____.',
  opts:['A lock-up clutch that mechanically links impeller and turbine','A larger oil pump','More forward gears only','A heavier flywheel'],a:0,
  exp:'锁止离合器在约二挡以上或车速 20 km/h 以上时把泵轮与涡轮机械锁合，消除滑差，这就是现代 AT 油耗已接近 MT 的原因。'},
 {ty:'choice',q:'倒挡需要惰轮，是因为：',en:'Reverse gear needs an idler gear in order to ____.',
  opts:['Reverse the direction of rotation of the output shaft','Increase the gear ratio','Reduce gear noise','Lubricate the countershaft'],a:0,
  exp:'齿轮系中增加一只惰轮不改变传动比大小，但会使末级齿轮反转，从而实现倒车。'},
 {ty:'choice',q:'倒挡齿轮通常发出"呜呜"声，原因是什么？',en:'Reverse gear usually whines because ____.',
  opts:['It is normally spur-cut and often has no synchronizer','It turns much faster than the other gears','It is lubricated with water','It has more teeth than first gear'],a:0,
  exp:'倒挡惰轮一般做成直齿（spur-cut），而且多数手动变速器倒挡不装同步器——所以倒挡噪音明显。'},
 {ty:'choice',q:'斜齿轮相对直齿轮的主要缺点之一是：',en:'One main disadvantage of helical gears compared with spur gears is ____.',
  opts:['Axial thrust that must be accommodated','Lower load-carrying capacity','Greater noise at high speed','They cannot transmit power between parallel shafts'],a:0,
  exp:'斜齿轮运转更平稳安静、承载能力更强，但会产生轴向推力，必须由推力轴承承受。直齿轮没有这个问题。'},
 {ty:'choice',q:'齿侧间隙（backlash）的主要作用是：',en:'The main purpose of backlash between meshing teeth is to ____.',
  opts:['Provide room for the oil film and allow for thermal expansion','Increase the gear ratio','Eliminate the need for a synchronizer','Lock the gear to the shaft'],a:0,
  exp:'齿侧间隙为润滑油膜和热膨胀留出空间，防止齿轮卡死。间隙过小会发热卡死，过大则产生敲击与传动空程。'},
 {ty:'choice',q:'超速挡（overdrive）的传动比特点是：',en:'The characteristic of an overdrive gear is that ____.',
  opts:['Its ratio is below 1.00, so the output turns faster than the input','Its ratio is above 2.00, giving maximum torque','It has no ratio at all','It reverses the output direction'],a:0,
  exp:'超速挡传动比小于 1.00，输出转速高于输入转速，因此同样车速下发动机转速更低、更省油、更安静。'},
 {ty:'choice',q:'纯电动车通常只用一个单级减速器，原因是：',en:'A battery electric vehicle usually needs only a single-speed reduction gearbox because ____.',
  opts:['The motor\u2019s traction output already matches the ideal traction curve and it can reverse','Its motor cannot produce torque at zero speed','Electric motors cannot be geared down','It has no differential'],a:0,
  exp:'电动机的牵引特性本身已覆盖全车速范围，而且可以反转，所以不需要多挡变速器；倒车靠电机反转实现，不需要倒挡惰轮。'},
 {ty:'choice',q:'普通（开放式）差速器存在什么天生弱点？',en:'What is the inherent weakness of an open differential?',
  opts:['It splits torque equally, so total traction is limited by the wheel with less grip','It cannot allow the two wheels to turn at different speeds','It cannot perform the final reduction','It always locks both wheels together'],a:0,
  exp:'开放式差速器始终把扭矩平均分配给两根半轴：一侧车轮打滑时，另一侧也只能得到同样小的扭矩，车就"卡住"了——这正是限滑差速器存在的理由。'},
 {ty:'tf',q:'滑动型（sliding-gear）手动变速器目前仍广泛用于现代汽车。',en:'The sliding-gear type of manual transmission is still widely used on modern cars.',a:false,
  exp:'课文：滑动型变速器现在已经不用了（obsolete），现代变速器全部是固定啮合型。'},
 {ty:'tf',q:'变速器能在发动机与驱动轮之间改变速度和扭矩。',en:'A transmission changes speed and torque between the engine and the driving wheels.',a:true,
  exp:'课文：变速器是一个改变速度和动力的装置。'},
 {ty:'tf',q:'变速器能产生额外的发动机功率，所以低挡加速更快。',en:'The transmission creates additional engine power, which is why a low gear accelerates the vehicle faster.',a:false,
  exp:'变速器不产生功率，只把转速换成扭矩：3∶1 即转速 ÷3、扭矩 ×3，功率近似守恒（齿面摩擦会损失约 1%~2%）。'},
 {ty:'tf',q:'自动变速器的燃油经济性一定优于手动变速器。',en:'An automatic transmission always gives better fuel economy than a manual transmission.',a:false,
  exp:'课文：手动变速器通常比自动变速器更省油（5%~15%）。说"自动一定更省油"是错的；不过现代 AT 采用锁止离合器后差距已明显缩小。'},
 {ty:'tf',q:'下坡挂空挡滑行省油，是推荐做法。',en:'Coasting downhill in Neutral saves fuel and is recommended.',a:false,
  exp:'空挡无动力传递、也没有发动机制动，非常危险。电控发动机带挡松油门时几乎断油，反而更省油、更安全。'},
 {ty:'tf',q:'同步环在变速器内部的作用类似一个小型锥形离合器。',en:'A synchronizer ring acts like a small conical clutch inside the gearbox.',a:true,
  exp:'它靠锥面摩擦力矩使输入侧加速或减速，与轴的转速匹配后再让接合齿挂入，所以挂挡不打齿。'},
 {ty:'tf',q:'手动变速器倒挡通常不装同步器，因为挂倒挡时车辆已停住。',en:'Reverse gear in a manual transmission normally has no synchronizer because it is engaged after the vehicle has stopped.',a:true,
  exp:'车辆停住时输出转速为零，不需要同步；这也是倒挡齿轮多用直齿、噪音较大的原因之一。'},
 {ty:'tf',q:'在前驱车上，变速器把动力传递给半轴和前轮。',en:'In a front-wheel-drive vehicle, the transmission delivers power to the axle half shafts and the front wheels.',a:true,
  exp:'课文：前驱车是传递给半轴和前轮。'},
 {ty:'tf',q:'主减速比对加速性、最高车速与燃油经济性没有影响。',en:'The final drive ratio has no effect on acceleration, top speed or fuel economy.',a:false,
  exp:'主减速比越大，各车速下的驱动力越大——加速与牵引能力更好，但同样车速下发动机转速与油耗升高、极速下降；反之亦然。'},
 {ty:'tf',q:'变速器可以中断动力的传送。',en:'A transmission is able to interrupt the transmission of power.',a:true,
  exp:'课文三大功能之一：中断动力传送（对应空挡）。'}
];

/* ================= 单词与短语（30 个） ================= */
const VOCAB6=[
 {en:'transmission',ipa:"[trænzˈmɪʃn]",zh:'变速器；传动系',ty:'n.'},
 {en:'driving wheel',ipa:"[ˈdraɪvɪŋ wiːl]",zh:'驱动轮',ty:'n.'},
 {en:'gear ratio',ipa:"[ɡɪə ˈreɪʃiəʊ]",zh:'传动比；速比',ty:'n.'},
 {en:'drive shaft',ipa:"[ˈdraɪv ʃɑːft]",zh:'驱动轴；传动轴',ty:'n.'},
 {en:'propeller shaft',ipa:"[prəˈpelə ʃɑːft]",zh:'传动轴（后驱）',ty:'n.'},
 {en:'rear wheel',ipa:"[rɪə wiːl]",zh:'后轮',ty:'n.'},
 {en:'front wheel',ipa:"[frʌnt wiːl]",zh:'前轮',ty:'n.'},
 {en:'axle half shaft',ipa:"[ˈæksl hɑːf ʃɑːft]",zh:'半轴',ty:'n.'},
 {en:'front-wheel-drive',ipa:"[ˌfrʌnt wiːl ˈdraɪv]",zh:'前轮驱动；前驱',ty:'n.'},
 {en:'reverse',ipa:"[rɪˈvɜːs]",zh:'倒挡；倒车；反向',ty:'n./v.'},
 {en:'idler shaft',ipa:"[ˈaɪdlə ʃɑːft]",zh:'空转轴；惰轮轴（中间轴）',ty:'n.'},
 {en:'countershaft',ipa:"[ˈkaʊntəʃɑːft]",zh:'中间轴；副轴',ty:'n.'},
 {en:'cluster gear',ipa:"[ˈklʌstə ɡɪə]",zh:'副轴齿轮组；塔轮',ty:'n.'},
 {en:'reverse gear',ipa:"[rɪˈvɜːs ɡɪə]",zh:'倒挡齿轮',ty:'n.'},
 {en:'idler gear',ipa:"[ˈaɪdlə ɡɪə]",zh:'惰轮',ty:'n.'},
 {en:'gear train',ipa:"[ˈɡɪə treɪn]",zh:'齿轮系',ty:'n.'},
 {en:'Manual Transmission (MT)',ipa:"[ˈmænjuəl trænzˈmɪʃn]",zh:'手动变速器',ty:'n.'},
 {en:'Automatic Transmission (AT)',ipa:"[ˌɔːtəˈmætɪk trænzˈmɪʃn]",zh:'自动变速器',ty:'n.'},
 {en:'sliding-gear type',ipa:"[ˈslaɪdɪŋ ɡɪə taɪp]",zh:'滑动齿轮式（已淘汰）',ty:'n.'},
 {en:'constant-mesh design',ipa:"[ˈkɒnstənt meʃ dɪˈzaɪn]",zh:'常啮合式',ty:'n.'},
 {en:'park',ipa:"[pɑːk]",zh:'停车挡；停放（P 挡）',ty:'n./v.'},
 {en:'neutral',ipa:"[ˈnjuːtrəl]",zh:'空挡位置（N 挡）',ty:'n.'},
 {en:'overdrive',ipa:"[ˈəʊvədraɪv]",zh:'超速挡',ty:'n.'},
 {en:'upshift / downshift',ipa:"[ˈʌpʃɪft] / [ˈdaʊnʃɪft]",zh:'升挡 / 降挡',ty:'n./v.'},
 {en:'input shaft',ipa:"[ˈɪnpʊt ʃɑːft]",zh:'输入轴',ty:'n.'},
 {en:'output shaft',ipa:"[ˈaʊtpʊt ʃɑːft]",zh:'输出轴',ty:'n.'},
 {en:'synchronizer',ipa:"[ˈsɪŋkrənaɪzə]",zh:'同步器',ty:'n.'},
 {en:'synchronizer ring',ipa:"[ˈsɪŋkrənaɪzə rɪŋ]",zh:'同步环；锁环',ty:'n.'},
 {en:'blocker ring',ipa:"[ˈblɒkə rɪŋ]",zh:'锁止环（同步环别称）',ty:'n.'},
 {en:'dog clutch / dog teeth',ipa:"[dɒɡ klʌtʃ]",zh:'牙嵌离合器；接合齿',ty:'n.'},
 {en:'shift fork',ipa:"[ʃɪft fɔːk]",zh:'换挡拨叉',ty:'n.'},
 {en:'shift rail',ipa:"[ʃɪft reɪl]",zh:'换挡拨叉轴',ty:'n.'},
 {en:'detent',ipa:"[dɪˈtent]",zh:'定位装置；自锁装置',ty:'n.'},
 {en:'gear lever',ipa:"[ˈɡɪə liːvə]",zh:'变速杆；换挡杆',ty:'n.'},
 {en:'selector rod',ipa:"[sɪˈlektə rɒd]",zh:'选挡拉杆',ty:'n.'},
 {en:'gear shift mechanism',ipa:"[ɡɪə ʃɪft ˈmekənɪzəm]",zh:'换挡操纵机构',ty:'n.'},
 {en:'universal joint',ipa:"[ˌjuːnɪˈvɜːsl dʒɔɪnt]",zh:'万向节',ty:'n.'},
 {en:'final drive',ipa:"[ˈfaɪnl draɪv]",zh:'主减速器',ty:'n.'},
 {en:'differential',ipa:"[ˌdɪfəˈrenʃl]",zh:'差速器',ty:'n.'},
 {en:'transaxle',ipa:"[trænzˈæksl]",zh:'变速驱动桥',ty:'n.'},
 {en:'torque converter',ipa:"[tɔːk kənˈvɜːtə]",zh:'液力变矩器',ty:'n.'},
 {en:'planetary gearset',ipa:"[ˈplænətri ˈɡɪəset]",zh:'行星齿轮组',ty:'n.'},
 {en:'helical gear',ipa:"[ˈhelɪkl ɡɪə]",zh:'斜齿轮',ty:'n.'},
 {en:'spur gear',ipa:"[spɜː ɡɪə]",zh:'直齿轮',ty:'n.'},
 {en:'backlash',ipa:"[ˈbæklæʃ]",zh:'齿侧间隙；背隙',ty:'n.'},
 {en:'transmission fluid',ipa:"[trænzˈmɪʃn ˈfluːɪd]",zh:'变速器油',ty:'n.'}
];
(function(){
  const box=$('#vocab6Card'); if(!box)return;
  let html='<div class="card" style="padding:8px;overflow-x:auto"><table class="vocab-table"><tr><th style="width:44px">序号</th><th>英文 English</th><th>音标 IPA</th><th style="width:86px">词性</th><th>中文</th><th style="width:64px">发音</th></tr>';
  VOCAB6.forEach((v,i)=>{ html+='<tr><td>6.'+(i+1)+'</td><td class="en">'+v.en+'</td><td class="ipa">'+(v.ipa||'—')+'</td><td style="color:var(--muted);font-size:12.5px">'+v.ty+'</td><td class="zh">'+v.zh+'</td><td><button class="speak-btn" data-t="'+v.en.replace(/ \(.*\)/,'')+'" data-l="en-US">🔊</button></td></tr>'; });
  html+='</table></div>';
  box.innerHTML=html;
  box.querySelectorAll('.speak-btn').forEach(b=>bindSpeak(b,b.dataset.t,'en-US'));
})();

/* ================= 齿轮绘制小工具 ================= */
function gearShape(H,g,cx,cy,R,n,fill,stroke,toothH){
  const th=toothH||R*0.20, ri=R-th;
  H.circ(g,cx,cy,R+th*0.5,fill,{stroke:stroke||fill,'stroke-width':1.2,opacity:.92});
  for(let i=0;i<n;i++){
    const a=i*Math.PI*2/n, w=Math.PI/n*0.55;
    const p1=[cx+ri*Math.cos(a-w),cy+ri*Math.sin(a-w)];
    const p2=[cx+(R+th)*Math.cos(a-w*0.7),cy+(R+th)*Math.sin(a-w*0.7)];
    const p3=[cx+(R+th)*Math.cos(a+w*0.7),cy+(R+th)*Math.sin(a+w*0.7)];
    const p4=[cx+ri*Math.cos(a+w),cy+ri*Math.sin(a+w)];
    H.path(g,'M'+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+' L'+p2[0].toFixed(1)+' '+p2[1].toFixed(1)+' L'+p3[0].toFixed(1)+' '+p3[1].toFixed(1)+' L'+p4[0].toFixed(1)+' '+p4[1].toFixed(1)+' Z',fill,{stroke:stroke||fill,'stroke-width':1});
  }
  H.circ(g,cx,cy,ri*0.92,'#1e293b',{opacity:.55});
  H.circ(g,cx,cy,R*0.30,fill,{opacity:.85});
}

/* ================= 数据：18 个零件（换挡机构 3 / 齿轮传动 10 / 壳体与动力输出 5） =================
   画布 viewBox: -90 -110 1330 1250
   列心 X = [140, 390, 640, 890, 1140]；行心 Y: A=150, B1=430, B2=660, C1=930
   横幅规则：徽标 b 写在零件下部，标签渲染在 b[1]+26 / b[1]+39
======================================================================================== */
const TRANS_PARTS=[
 /* ======== A 组 · 换挡机构（3） ======== */
 {id:1,en:'gear lever',zh:'换挡操纵杆（变速杆）',group:'换挡机构',b:[140,222],ex:[-28,-58],
  desc:'驾驶员操纵的换挡杆，通过外部连杆或拉索把动作传到变速器内部的拨叉轴与拨叉上。',
  draw(g,H){
    H.circ(g,140,104,13,'#f59e0b',{stroke:'#b45309','stroke-width':2});
    H.rect(g,134,112,12,72,'#94a3b8',{rx:5});
    H.circ(g,140,190,15,'#64748b',{stroke:'#475569','stroke-width':2});
    H.circ(g,140,190,6,'#334155');
    H.rect(g,96,198,88,14,'#475569',{rx:6});
    H.hexa=null;
    H.path(g,'M104 196 L140 118 L176 196',  'none',{stroke:'#7dd3fc','stroke-width':1.6,'stroke-dasharray':'5 4',opacity:.75});
  }},
 {id:2,en:'shift rail',zh:'换挡拨叉轴',group:'换挡机构',b:[640,222],ex:[0,-58],
  desc:'支承并引导换挡拨叉做轴向滑动的光轴，轴上的凹槽（定位槽）配合钢球实现换挡定位。',
  draw(g,H){
    H.rect(g,540,138,200,22,'#94a3b8',{rx:11,stroke:'#64748b','stroke-width':1.5});
    for(let i=0;i<3;i++){
      H.path(g,'M'+(600+i*40)+' 138 q6 11 0 22 q-6 -11 0 -22','#334155',{});
    }
    H.rect(g,534,142,8,14,'#64748b',{rx:3});
    H.rect(g,738,142,8,14,'#64748b',{rx:3});
    H.circ(g,565,196,7,'#cbd5e1');
    H.circ(g,715,196,7,'#cbd5e1');
    H.rect(g,556,192,18,8,'#475569',{rx:3});
    H.rect(g,706,192,18,8,'#475569',{rx:3});
  }},
 {id:3,en:'shift fork',zh:'换挡拨叉',group:'换挡机构',b:[1140,222],ex:[30,-58],
  desc:'卡在同步器接合套外缘的叉形零件。拨叉轴带动它轴向移动，从而拨动接合套完成换挡。',
  draw(g,H){
    /* 叉形：顶部拨叉脚（套在拨叉轴上），下方两条叉臂呈 C 形抱住接合套 */
    H.rect(g,1128,94,24,34,'#94a3b8',{rx:6,stroke:'#64748b','stroke-width':1.5});
    H.circ(g,1140,94,10,'#64748b',{stroke:'#475569','stroke-width':1.5});
    H.rect(g,1134,126,12,14,'#94a3b8',{rx:3});
    H.path(g,'M1098 176 A42 42 0 0 1 1182 176','none',{stroke:'#f59e0b','stroke-width':21,'stroke-linecap':'round'});
    H.path(g,'M1098 176 A42 42 0 0 1 1182 176','none',{stroke:'#b45309','stroke-width':2,'stroke-linecap':'round'});
    H.rect(g,1090,168,17,16,'#fbbf24',{rx:4});
    H.rect(g,1173,168,17,16,'#fbbf24',{rx:4});
    H.circ(g,1140,152,9,'#fde68a',{opacity:.9});
  }},

 /* ======== B1 组 · 轴与齿轮（5） ======== */
 {id:4,en:'input shaft',zh:'输入轴（第一轴）',group:'齿轮传动',b:[140,502],ex:[-34,-6],
  desc:'变速器第一轴。前端通过花键与离合器从动盘连接，把发动机的动力带进变速器。',
  draw(g,H){
    H.rect(g,52,412,176,26,'#94a3b8',{rx:13,stroke:'#64748b','stroke-width':1.5});
    for(let i=0;i<7;i++)H.line(g,58+i*10,412,58+i*10,438,'#64748b',2);
    H.rect(g,196,420,34,10,'#cbd5e1',{rx:4});
    H.circ(g,84,425,15,'#64748b');
    H.circ(g,84,425,6,'#334155');
    H.circ(g,196,425,14,'#64748b');
    H.circ(g,196,425,5.5,'#334155');
  }},
 {id:5,en:'input shaft gear',zh:'输入轴常啮合齿轮',group:'齿轮传动',b:[390,502],ex:[-6,-42],
  desc:'与输入轴做成一体或压装在输入轴上的齿轮，始终与中间轴上的齿轮啮合，故称"常啮合"。',
  draw(g,H){
    gearShape(H,g,390,428,44,20,'#7dd3fc','#0ea5e9');
    H.circ(g,390,428,13,'#1e293b');
    H.rect(g,378,470,24,12,'#94a3b8',{rx:3});
  }},
 {id:6,en:'countershaft',zh:'中间轴（惰轮轴）',group:'齿轮传动',b:[640,502],ex:[0,-6],
  desc:'与输入轴、输出轴平行的第三根轴（课文中称 idler shaft）。轴上装有一组齿轮，是动力从输入轴流向输出轴的"中转站"。',
  draw(g,H){
    H.rect(g,556,414,168,22,'#64748b',{rx:11,stroke:'#475569','stroke-width':1.5});
    H.circ(g,576,425,13,'#334155');
    H.circ(g,704,425,13,'#334155');
    H.rect(g,600,406,26,10,'#94a3b8',{rx:3});
    H.rect(g,656,434,26,10,'#94a3b8',{rx:3});
    H.rect(g,600,440,12,10,'#475569',{rx:2});
    H.rect(g,676,404,12,10,'#475569',{rx:2});
  }},
 {id:7,en:'countershaft gear cluster',zh:'中间轴齿轮组',group:'齿轮传动',b:[890,502],ex:[12,-40],
  desc:'中间轴上的一组直径各不相同的齿轮（塔轮）。每一对齿轮对应一个档位，直径比就决定了该档的传动比。',
  draw(g,H){
    const d=[[842,62,'#38bdf8',18],[886,50,'#22c55e',16],[926,42,'#f59e0b',14],[962,36,'#f472b6',12]];
    d.forEach(function(it){ gearShape(H,g,it[0],428,it[1],it[3],it[2],'#0369a1'); });
    H.rect(g,822,414,166,20,'#64748b',{rx:10});
  }},
 {id:8,en:'output shaft',zh:'输出轴（第二轴）',group:'齿轮传动',b:[1140,502],ex:[34,-6],
  desc:'变速器的第二轴。它把经过变速后的动力输出给传动轴（后驱）或直接输出给主减速器（前驱）。',
  draw(g,H){
    H.rect(g,1052,412,176,26,'#94a3b8',{rx:13,stroke:'#64748b','stroke-width':1.5});
    for(let i=0;i<5;i++)H.line(g,1090+i*11,412,1090+i*11,438,'#64748b',2);
    H.circ(g,1076,425,15,'#64748b'); H.circ(g,1076,425,6,'#334155');
    H.circ(g,1204,425,15,'#64748b'); H.circ(g,1204,425,6,'#334155');
    H.rect(g,1052,440,32,12,'#cbd5e1',{rx:3});
  }},

 /* ======== B2 组 · 换挡与支承（5） ======== */
 {id:9,en:'output shaft gears',zh:'输出轴齿轮（各档从动齿轮）',group:'齿轮传动',b:[140,732],ex:[-30,44],
  desc:'空套在输出轴上的一组齿轮，分别与中间轴齿轮组啮合。平时它们在轴上自由转动，只有被同步器锁住的那个才传递动力。',
  draw(g,H){
    const d=[[92,52,'#fbbf24',20],[140,44,'#38bdf8',18],[186,38,'#22c55e',16]];
    d.forEach(function(it){ gearShape(H,g,it[0],658,it[1],it[3],it[2],'#b45309'); });
    H.rect(g,60,646,164,24,'#64748b',{rx:12,opacity:.85});
  }},
 {id:10,en:'synchronizer hub &amp; sleeve',zh:'同步器花键毂与接合套',group:'齿轮传动',b:[390,732],ex:[-6,44],
  desc:'同步器的核心：花键毂固定在输出轴上，接合套可轴向滑动。拨叉推它滑向某个档位齿轮，把该齿轮锁到轴上。',
  draw(g,H){
    H.ellipse(g,390,658,58,26,'#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.circ(g,390,658,26,'#64748b');
    for(let i=0;i<12;i++){const a=i*Math.PI/6;H.circ(g,390+40*Math.cos(a),658+18*Math.sin(a),4,'#334155');}
    H.rect(g,318,646,144,24,'#cbd5e1',{rx:5,stroke:'#94a3b8','stroke-width':2});
    for(let i=0;i<10;i++)H.line(g,326+i*14,646,326+i*14,670,'#94a3b8',2);
    H.circ(g,390,658,9,'#334155');
  }},
 {id:11,en:'synchronizer ring',zh:'同步环（锁环）',group:'齿轮传动',b:[640,732],ex:[0,44],
  desc:'带有内锥面的铜环。换挡时它先与齿轮的外锥面摩擦，把两者转速"磨"到一致，之后接合套才能顺利啮合——这就是"同步"。',
  draw(g,H){
    H.ellipse(g,640,658,54,24,'none',{stroke:'#f59e0b','stroke-width':13});
    for(let i=0;i<3;i++){const a=-Math.PI/2+i*Math.PI*2/3;
      H.rect(g,640+46*Math.cos(a)-6,658+20*Math.sin(a)-7,13,15,'#b45309',{rx:2});}
    H.ellipse(g,640,658,54,24,'none',{stroke:'#b45309','stroke-width':1.5});
    H.path(g,'M586 658 q54 30 108 0','none',{stroke:'#fbbf24','stroke-width':3,opacity:.85});
  }},
 {id:12,en:'reverse idler gear',zh:'倒挡惰轮',group:'齿轮传动',b:[890,732],ex:[14,44],
  desc:'倒档时被拨入啮合的小齿轮。它本身不改变传动比的大小，只是"多插一手"，使输出轴反向旋转，实现倒车。',
  draw(g,H){
    gearShape(H,g,890,656,38,14,'#a78bfa','#7c3aed');
    H.circ(g,890,656,11,'#1e293b');
    H.rect(g,868,690,44,13,'#64748b',{rx:4});
    H.circ(g,890,700,8,'#cbd5e1');
    H.path(g,'M836 630 q54 -22 108 0','none',{stroke:'#c4b5fd','stroke-width':2,'stroke-dasharray':'5 4',opacity:.85});
  }},
 {id:13,en:'main bearing',zh:'主轴承（滚珠轴承）',group:'齿轮传动',b:[1140,732],ex:[32,44],
  desc:'支承输入轴、输出轴与中间轴的轴承，保证齿轮在重载下仍能精确啮合并平稳旋转。',
  draw(g,H){
    H.circ(g,1140,656,54,'#475569',{stroke:'#64748b','stroke-width':2});
    H.circ(g,1140,656,42,'#1e293b');
    for(let i=0;i<10;i++){const a=i*Math.PI/5;H.circ(g,1140+34*Math.cos(a),656+34*Math.sin(a),8,'#cbd5e1',{stroke:'#94a3b8','stroke-width':1.5});}
    H.circ(g,1140,656,22,'#475569',{stroke:'#64748b','stroke-width':2});
    H.circ(g,1140,656,10,'#0f172a');
  }},

 /* ======== C 组 · 壳体与动力输出（5） ======== */
 {id:14,en:'transmission housing',zh:'变速器壳体',group:'动力输出',b:[140,1002],ex:[-34,50],
  desc:'容纳并支承全部齿轮、轴与轴承的箱体（课文中称 housing）。它同时起密封和储油作用，前端与离合器壳相连。',
  draw(g,H){
    H.path(g,'M70 902 L210 902 L226 936 L226 986 L196 1006 L84 1006 L54 986 L54 936 Z','#475569',{stroke:'#64748b','stroke-width':2});
    H.circ(g,104,946,17,'#0f172a');
    H.circ(g,176,946,17,'#0f172a');
    H.rect(g,74,918,132,10,'#64748b',{rx:4,opacity:.8});
    H.rect(g,88,976,104,16,'#334155',{rx:5});
    H.circ(g,140,984,6,'#94a3b8');
  }},
 {id:15,en:'drive shaft',zh:'传动轴',group:'动力输出',b:[390,1002],ex:[-6,50],
  desc:'把变速器输出轴的动力传到后桥主减速器的长管轴（后驱车称 propeller shaft）。它要承受高速旋转与扭矩。',
  draw(g,H){
    H.rect(g,268,916,244,34,'#94a3b8',{rx:17,stroke:'#64748b','stroke-width':1.5});
    H.rect(g,282,908,30,12,'#cbd5e1',{rx:4});
    H.rect(g,476,948,30,12,'#cbd5e1',{rx:4});
    H.circ(g,278,933,18,'#64748b',{stroke:'#475569','stroke-width':1.5});
    H.circ(g,502,933,18,'#64748b',{stroke:'#475569','stroke-width':1.5});
    for(let i=0;i<3;i++)H.line(g,330+i*40,916,330+i*40,950,'#64748b',1.5,{opacity:.6});
  }},
 {id:16,en:'universal joint',zh:'万向节',group:'动力输出',b:[640,1002],ex:[0,50],
  desc:'装在传动轴两端的十字轴式铰链（课文中称 universal joint，图 2.2-1 中编号 6）。它允许传动轴在颠簸中改变角度，仍能连续传递动力。',
  draw(g,H){
    H.circ(g,640,930,46,'#94a3b8',{stroke:'#64748b','stroke-width':2});
    H.rect(g,594,922,92,16,'#64748b',{rx:8});
    H.rect(g,632,884,16,92,'#64748b',{rx:8});
    H.circ(g,640,930,16,'#334155');
    [[594,894],[594,958],[686,894],[686,958]].forEach(function(p){
      H.circ(g,p[0],p[1],11,'#cbd5e1',{stroke:'#94a3b8','stroke-width':1.5});
      H.circ(g,p[0],p[1],4,'#334155');
    });
  }},
 {id:17,en:'final drive',zh:'主减速器',group:'动力输出',b:[890,1002],ex:[14,50],
  desc:'由一对锥齿轮组成（图 2.2-1 中编号 7）。它把传动轴传来的转速再降低、扭矩再放大一次，并改变动力方向 90° 传给半轴。',
  draw(g,H){
    gearShape(H,g,890,930,44,22,'#fbbf24','#b45309');
    H.circ(g,890,930,14,'#334155');
    H.rect(g,806,906,58,20,'#94a3b8',{rx:6});
    gearShape(H,g,834,916,20,10,'#cbd5e1','#94a3b8',5);
    H.path(g,'M862 946 q28 22 56 0','none',{stroke:'#fcd34d','stroke-width':2.5,opacity:.8});
  }},
 {id:18,en:'differential',zh:'差速器',group:'动力输出',b:[1140,1002],ex:[34,50],
  desc:'把主减速器传来的动力分配给左右半轴，并允许两侧车轮以不同转速转动——转弯时外侧车轮走的路更长，差速器就是为此而生。',
  draw(g,H){
    H.circ(g,1140,930,50,'#475569',{stroke:'#64748b','stroke-width':2});
    H.circ(g,1140,930,32,'#334155');
    [[0,-30],[0,30],[-30,0],[30,0]].forEach(function(p){
      gearShape(H,g,1140+p[0],930+p[1],13,8,'#cbd5e1','#94a3b8',3);
    });
    H.rect(g,1058,920,34,20,'#94a3b8',{rx:5});
    H.rect(g,1188,920,34,20,'#94a3b8',{rx:5});
    H.circ(g,1140,930,9,'#0f172a');
  }}
];
/* ================= 通用齿轮绘制（以 cx,cy 为心，可在组内旋转） ================= */
function drawGear(svg,cx,cy,R,n,fill,stroke,id){
  const g=el('g',{transform:'translate('+cx+','+cy+')'},svg);
  if(id)g.setAttribute('id',id);
  const th=Math.max(4,R*0.16);
  el('circle',{cx:0,cy:0,r:R,fill:fill,stroke:stroke,'stroke-width':1.5},g);
  for(let i=0;i<n;i++){
    const a=i*Math.PI*2/n, w=Math.PI/n*0.52;
    const p=[[R*Math.cos(a-w),R*Math.sin(a-w)],[(R+th)*Math.cos(a-w*0.65),(R+th)*Math.sin(a-w*0.65)],[(R+th)*Math.cos(a+w*0.65),(R+th)*Math.sin(a+w*0.65)],[R*Math.cos(a+w),R*Math.sin(a+w)]];
    el('path',{d:'M'+p.map(function(q){return q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' L')+' Z',fill:fill,stroke:stroke,'stroke-width':1},g);
  }
  el('circle',{cx:0,cy:0,r:R*0.26,fill:'#0f172a'},g);
  el('circle',{cx:0,cy:0,r:R*0.60,fill:'none',stroke:'#0f172a','stroke-width':1.4,opacity:.4},g);
  return g;
}

/* ================= 爆炸图渲染 ================= */

function buildTransAnim(){
  const svg=$('#transSvg'); if(!svg)return;
  svg.innerHTML='';
  const H={
    rect(g,x,y,w,h,fill,ex){const r=el('rect',Object.assign({x,y,width:w,height:h,fill},ex||{}),g);r.classList.add('shp');return r;},
    circ(g,cx,cy,r,fill,ex){const c=el('circle',Object.assign({cx,cy,r,fill},ex||{}),g);c.classList.add('shp');return c;},
    ellipse(g,cx,cy,rx,ry,fill,ex){const e=el('ellipse',Object.assign({cx,cy,rx,ry,fill},ex||{}),g);e.classList.add('shp');return e;},
    path(g,d,fill,ex){const p=el('path',Object.assign({d,fill},ex||{}),g);p.classList.add('shp');return p;},
    line(g,x1,y1,x2,y2,stroke,w,ex){const l=el('line',Object.assign({x1,y1,x2,y2,stroke,'stroke-width':w||2},ex||{}),g);l.classList.add('shp');return l;}
  };
  el('rect',{x:-90,y:-110,width:1330,height:1250,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=-90;x<=1240;x+=34)el('line',{x1:x,y1:-110,x2:x,y2:1140},grid);
  for(let y=-110;y<=1140;y+=34)el('line',{x1:-90,y1:y,x2:1240,y2:y},grid);
  el('text',{x:575,y:-72,text:'TRANSMISSION · EXPLODED VIEW 变速器零件爆炸图',fill:'#c7d2fe','font-size':16,'font-weight':800,'text-anchor':'middle'},svg);
  const bands=[['SHIFT MECHANISM 换挡机构',64,'#a78bfa'],['GEAR TRAIN 齿轮传动 · 输入轴 → 中间轴 → 输出轴',344,'#7dd3fc'],['HOUSING & POWER OUTPUT 壳体与动力输出',824,'#fbbf24']];
  bands.forEach(function(b){
    el('rect',{x:-40,y:b[1]-20,width:1230,height:26,rx:13,fill:'#132445',stroke:'#24365f','stroke-width':1},svg);
    el('text',{x:575,y:b[1]-2,text:b[0],fill:b[2],'font-size':12.5,'font-weight':800,'text-anchor':'middle'},svg);
  });
  TRANS_PARTS.forEach(function(p){
    const g=el('g',{'class':'pt','data-id':p.id},svg);
    if(p.draw)p.draw(g,H);
    const bg=el('g',{},g);
    el('circle',{'class':'badge-circle',cx:p.b[0],cy:p.b[1],r:11},bg);
    el('text',{'class':'badge-text',x:p.b[0],y:p.b[1],text:p.id},bg);
    const lg=el('g',{'class':'pt-label'},g);
    const t1=el('text',{'class':'part-label',x:p.b[0],y:p.b[1]+26,text:p.en},lg);
    t1.setAttribute('text-anchor','middle');
    const t2=el('text',{'class':'part-label zh',x:p.b[0],y:p.b[1]+39,text:p.zh},lg);
    t2.setAttribute('text-anchor','middle');
    g.addEventListener('click',function(){ selectTransPart(p.id); });
  });
}
function selectTransPart(id){
  $$('#transSvg .pt').forEach(function(g){ g.classList.toggle('sel',g.dataset.id==String(id)); });
  const n=$('#transInfoN'),e=$('#transInfoE'),z=$('#transInfoZ'),d=$('#transInfoD');
  if(!n)return;
  if(id==null){
    n.textContent='?'; e.textContent='点击零件编号'; z.textContent='查看中英文名称与说明';
    d.innerHTML='课文：变速器一般由<b>壳体</b>（14）、<b>输入轴及齿轮</b>（4、5）、<b>输出轴及齿轮</b>（8、9）、<b>空转轴/中间轴</b>（6）及其<b>齿轮组</b>（7）、<b>倒挡齿轮</b>（12）、<b>齿轮组</b>与<b>换挡操纵机构</b>（1、2、3）组成；另有同步器（10、11）、主轴承（13），以及把动力送往驱动轮的传动轴（15）、万向节（16）、主减速器（17）和差速器（18）。';
    transSel=null; return;
  }
  const p=TRANS_PARTS.find(function(x){return x.id===id;}); transSel=id;
  n.textContent=p.id; e.textContent=p.en.replace(/&amp;/g,'&'); z.textContent=p.zh+' · '+p.group+'部分'; d.textContent=p.desc;
}
function setTransExplode(on){
  transExploded=on;
  const svg=$('#transSvg'); if(svg)svg.classList.toggle('exploded',on);
  TRANS_PARTS.forEach(function(p){ const g=$('#transSvg .pt[data-id="'+p.id+'"]'); if(g)g.style.transform=on?('translate('+p.ex[0]+'px,'+p.ex[1]+'px)'):''; });
  const b=$('#btnTransExplode'); if(b)b.textContent=on?'🔩 重新组装':'💥 爆炸拆解';
}

/* ================= 动画一：传动比与档位（可交互） ================= */
const GEAR6=[
 {n:'1 档',en:'1st',d:14,o:36,rev:false,use:'起步、爬坡、重载。传动比最大 → 扭矩放大最多、车速最低。'},
 {n:'2 档',en:'2nd',d:18,o:32,rev:false,use:'低速行驶、拥堵跟车。'},
 {n:'3 档',en:'3rd',d:23,o:27,rev:false,use:'城市道路常用档，速度与动力较均衡。'},
 {n:'4 档',en:'4th',d:22,o:22,rev:false,use:'直接档（1:1）：输出转速 = 输入转速，高速巡航常用。'},
 {n:'倒档',en:'R',d:14,o:30,rev:true,use:'倒车。多一个惰轮 → 输出轴反向旋转（传动比大小由齿数决定）。'},
 {n:'空档',en:'N',d:0,o:0,rev:false,neutral:true,use:'切断动力：主动齿轮随输入轴空转，输出轴不转 —— 对应课文的"中断动力传送"。'}
];

function buildRatio(){
  const svg=$('#ratioSvg'); if(!svg)return;
  svg.innerHTML='';
  const G=GEAR6[gear6Idx];
  el('rect',{x:0,y:0,width:760,height:400,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=0;x<=760;x+=32)el('line',{x1:x,y1:0,x2:x,y2:400},grid);
  for(let y=0;y<=400;y+=32)el('line',{x1:0,y1:y,x2:760,y2:y},grid);
  el('text',{x:380,y:24,text:'GEAR RATIO 传动比 = 从动齿轮齿数 ÷ 主动齿轮齿数',fill:'#c7d2fe','font-size':13.5,'font-weight':800,'text-anchor':'middle'},svg);
  const cy=206, m=3;
  if(G.neutral){
    const R1=m*14,R2=m*36;
    const cA=190, cB=cA+R1+R2;
    drawGear(svg,cA,cy,R1,14,'#38bdf8','#0ea5e9','rgA');
    drawGear(svg,cB,cy,R2,36,'#475569','#334155','rgB');
    el('text',{x:cA,y:cy+R1+30,text:'主动 driving（空转）',fill:'#7dd3fc','font-size':12,'text-anchor':'middle'},svg);
    el('text',{x:cB,y:cy+R2+30,text:'从动 driven（不转）',fill:'#94a3b8','font-size':12,'text-anchor':'middle'},svg);
    el('text',{x:380,y:cy-R2-34,text:'空 档 · NEUTRAL',fill:'#fbbf24','font-size':19,'font-weight':800,'text-anchor':'middle'},svg);
    el('text',{x:380,y:382,text:'动力被切断：主动齿轮随输入轴空转，从动齿轮与输出轴静止。',fill:'#cbd5e1','font-size':12.5,'text-anchor':'middle'},svg);
    return;
  }
  const R1=m*G.d, R2=m*G.o, Ri=G.rev?26:0;
  const span=2*(R1+Ri+(G.rev?Ri:0)+R2);
  const cA=(760-span)/2+R1;
  const cI=G.rev? cA+R1+Ri : 0;
  const cB=G.rev? cI+Ri+R2 : cA+R1+R2;
  drawGear(svg,cA,cy,R1,G.d,'#38bdf8','#0ea5e9','rgA');
  drawGear(svg,cB,cy,R2,G.o,'#fbbf24','#b45309','rgB');
  if(G.rev){
    drawGear(svg,cI,cy,Ri,10,'#a78bfa','#7c3aed','rgI');
    el('text',{x:cI,y:cy+Ri+28,text:'惰轮 idler',fill:'#c4b5fd','font-size':12,'text-anchor':'middle'},svg);
  }
  el('text',{x:cA,y:cy-R1-16,text:'主动 driving · '+G.d+' 齿',fill:'#7dd3fc','font-size':12.5,'font-weight':700,'text-anchor':'middle'},svg);
  el('text',{x:cB,y:cy+R2+28,text:'从动 driven · '+G.o+' 齿',fill:'#fcd34d','font-size':12.5,'font-weight':700,'text-anchor':'middle'},svg);
  el('text',{x:380,y:cy-R2-38,text:G.n+' · '+(G.rev?'REVERSE 反向':'FORWARD'),fill:G.rev?'#c4b5fd':'#fbbf24','font-size':17,'font-weight':800,'text-anchor':'middle'},svg);
  el('text',{x:380,y:384,text:G.use,fill:'#cbd5e1','font-size':12.5,'text-anchor':'middle'},svg);
}
function ratioTick(){
  const G=GEAR6[gear6Idx];
  const aA=$('#rgA'), aB=$('#rgB'), aI=$('#rgI');
  gear6Ang=(gear6Ang+1.6)%360;
  if(aA)aA.setAttribute('transform','translate('+cxOf(aA)+','+cyOf(aA)+') rotate('+gear6Ang+')');
  if(aI)aI.setAttribute('transform','translate('+cxOf(aI)+','+cyOf(aI)+') rotate('+(-gear6Ang*1.4)+')');
  if(aB){
    const k=G.neutral?0:(G.d/G.o);
    aB.setAttribute('transform','translate('+cxOf(aB)+','+cyOf(aB)+') rotate('+(-gear6Ang*k*(G.rev?-1:1))+')');
  }
  ratioRAF=requestAnimationFrame(ratioTick);
}
/* 从 translate(x,y) 里取回圆心，避免重复计算 */
function cxOf(g){ const m=/translate\(([-\d.]+),/.exec(g.getAttribute('transform')||''); return m?m[1]:0; }
function cyOf(g){ const m=/translate\([-\d.]+,\s*([-\d.]+)\)/.exec(g.getAttribute('transform')||''); return m?m[1]:0; }

function setGear6(i){
  gear6Idx=Math.max(0,Math.min(GEAR6.length-1,i));
  $$('#gearBtns6 button').forEach(function(b,k){ b.classList.toggle('on',k===gear6Idx); });
  const G=GEAR6[gear6Idx];
  const ro=$('#ratioReadout');
  if(ro){
    if(G.neutral){
      ro.innerHTML='<div class="kv-list"><div><b>档位</b><span>'+G.en+' · '+G.n+'（空档）</span></div>'+
        '<div><b>传动比</b><span>— （动力被切断）</span></div>'+
        '<div><b>输出转速</b><span>0 r/min</span></div>'+
        '<div><b>输出扭矩</b><span>0（不传递动力）</span></div>'+
        '<div><b>用途</b><span>'+G.use+'</span></div></div>';
    }else{
      const ratio=G.o/G.d, rpm=Math.round(2000/ratio);
      ro.innerHTML='<div class="kv-list">'+
        '<div><b>档位</b><span>'+G.en+' · '+G.n+(G.rev?'（反向）':'')+'</span></div>'+
        '<div><b>齿数</b><span>主动 '+G.d+' 齿 → 从动 '+G.o+' 齿</span></div>'+
        '<div><b>传动比</b><span>'+G.o+' ÷ '+G.d+' = <b style="color:#fbbf24">'+ratio.toFixed(2)+' : 1</b></span></div>'+
        '<div><b>输出转速</b><span>发动机 2000 r/min ÷ '+ratio.toFixed(2)+' = <b style="color:#7dd3fc">'+rpm+' r/min</b></span></div>'+
        '<div><b>扭矩倍数</b><span>约 ×'+ratio.toFixed(2)+'（转速降到 1/'+ratio.toFixed(2)+'，扭矩升到 '+ratio.toFixed(2)+' 倍）</span></div>'+
        '<div><b>用途</b><span>'+G.use+'</span></div></div>';
    }
  }
  buildRatio();
  if(trans3DOn)applyTrans3DGear();
}
(function(){
  const box=$('#gearBtns6'); if(!box)return;
  GEAR6.forEach(function(g,i){
    const b=document.createElement('button');
    b.className='btn ghost'; b.style.cssText='padding:7px 14px;font-size:13px';
    b.textContent=g.n;
    b.addEventListener('click',function(){ setGear6(i); });
    box.appendChild(b);
  });
  setGear6(0);
  ratioTick();
})();

/* ================= 动画二：同步器换挡过程 ================= */
function buildSync(){
  const svg=$('#syncSvg'); if(!svg)return;
  svg.innerHTML='';
  el('rect',{x:0,y:0,width:760,height:360,fill:'#0d1b36'},svg);
  const grid=el('g',{opacity:.05,stroke:'#7dd3fc'},svg);
  for(let x=0;x<=760;x+=32)el('line',{x1:x,y1:0,x2:x,y2:360},grid);
  for(let y=0;y<=360;y+=32)el('line',{x1:0,y1:y,x2:760,y2:y},grid);
  const cy=165;
  el('line',{x1:60,y1:cy,x2:700,y2:cy,stroke:'#64748b','stroke-width':11,'stroke-linecap':'round'},svg);
  el('text',{x:380,y:26,text:'SYNCHRONIZER 同步器换挡过程 · 拖动滑块观察',fill:'#c7d2fe','font-size':13.5,'font-weight':800,'text-anchor':'middle'},svg);
  /* 左齿轮（待啮合） */
  drawGear(svg,150,cy,52,18,'#475569','#334155','syL');
  el('text',{x:150,y:cy+82,text:'待啮合齿轮 L',fill:'#94a3b8','font-size':12,'text-anchor':'middle'},svg);
  /* 右齿轮（待啮合） */
  drawGear(svg,610,cy,52,18,'#475569','#334155','syR');
  el('text',{x:610,y:cy+82,text:'待啮合齿轮 R',fill:'#94a3b8','font-size':12,'text-anchor':'middle'},svg);
  /* 花键毂（固定在输出轴上） */
  el('rect',{x:334,y:cy-46,width:92,height:92,rx:8,fill:'#94a3b8',stroke:'#64748b','stroke-width':2},svg);
  for(let i=0;i<8;i++)el('line',{x1:342+i*11,y1:cy-46,x2:342+i*11,y2:cy+46,stroke:'#64748b','stroke-width':2},svg);
  el('text',{x:380,y:cy+116,text:'花键毂 hub（随输出轴转动）',fill:'#cbd5e1','font-size':12,'text-anchor':'middle'},svg);
  /* 同步环 ×2 */
  el('ellipse',{id:'syRing',cx:544,cy:cy,rx:13,ry:46,fill:'#f59e0b',opacity:.25,stroke:'#f59e0b','stroke-width':2},svg);
  el('text',{x:544,y:cy-64,text:'同步环 ring',fill:'#fbbf24','font-size':11.5,'font-weight':700,'text-anchor':'middle'},svg);
  /* 接合套（可移动） */
  const sl=el('g',{id:'sySleeve'},svg);
  el('rect',{x:-32,y:cy-52,width:64,height:104,rx:7,fill:'#fbbf24',stroke:'#b45309','stroke-width':2},sl);
  for(let i=0;i<6;i++)el('line',{x1:-26+i*10,y1:cy-52,x2:-26+i*10,y2:cy+52,stroke:'#b45309','stroke-width':2},sl);
  el('text',{x:0,y:cy+92,text:'接合套 sleeve（拨叉推动）',fill:'#fcd34d','font-size':12,'text-anchor':'middle'},sl);
  el('text',{id:'syState',x:380,y:336,text:'',fill:'#fbbf24','font-size':13.5,'font-weight':700,'text-anchor':'middle'},svg);
}
function syncApply(v){
  const g=$('#sySleeve'); if(!g)return;
  const t=v/100;                       /* 0 → 1 向右移动 */
  const x=380+t*140;
  g.setAttribute('transform','translate('+x+',0)');
  const ring=$('#syRing');
  if(ring)ring.setAttribute('opacity',(t>0.18&&t<0.62)?(0.35+0.5*Math.sin(Date.now()/120)):0.18);
  const st=$('#syState');
  let txt,col;
  if(t<0.18){ txt='① 空档：接合套居中，两侧齿轮都在轴上自由空转，动力不输出'; col='#94a3b8'; }
  else if(t<0.62){ txt='② 同步：同步环锥面先与齿轮锥面摩擦，把两者转速"磨"到一致（此时还咬不进去）'; col='#f59e0b'; }
  else { txt='③ 啮合：转速已同步，接合套花键顺利滑入齿轮的啮合齿，该档位齿轮被锁在输出轴上 —— 换挡完成'; col='#22c55e'; }
  if(st){ st.textContent=txt; st.setAttribute('fill',col); }
  const sv=$('#syncVal'); if(sv)sv.textContent=Math.round(t*100)+'%';
}
buildSync();
(function(){
  const r=$('#syncRange'); if(!r)return;
  r.addEventListener('input',function(){ syncApply(+r.value); });
  syncApply(+r.value);
})();

/* ================= 3D 三轴齿轮传动模型 ================= */
function applyTrans3DGear(){
  const g=window.__TRANS3D; if(!g)return;
  const G=GEAR6[gear6Idx]; if(!G||G.neutral){ g.outSpeed=0; return; }
  g.outSpeed=G.d/G.o;
}
function initTrans3D(){
  const box=$('#trans3dBox'), note=$('#trans3dNote');
  if(!box)return;
  box.style.display=''; note.textContent='正在加载 three.js 组件…（首次可能需 10~20 秒）';
  loadThree().then(function(ok){
    if(!ok){ note.textContent='⚠️ 3D 组件加载失败（网络原因），可稍后重试；不影响其他内容。'; box.style.display='none'; trans3DInited=false;
      const b=$('#btnTrans3D'); if(b){b.disabled=false;b.textContent='▶ 加载 3D 模型';} return; }
    note.textContent='🖱️ 拖拽旋转 · 滚轮缩放 · 观察三根轴上的齿轮如何啮合传动（输入轴 → 中间轴 → 输出轴）；切换上面的档位按钮可改变输出轴转速';
    const b=$('#btnTrans3D'); if(b){b.disabled=false;b.textContent='🙈 隐藏模型';}
    buildTrans3D(box); trans3DOn=true; applyTrans3DGear();
  });
}
function buildTrans3D(box){
  const THREE=window.THREE;
  const W=box.clientWidth||640, H=box.clientHeight||430;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0b1424);
  const camera=new THREE.PerspectiveCamera(42,W/H,0.05,200);
  camera.position.set(3.2,2.3,3.6); camera.lookAt(0,0,0);
  let renderer=null;
  try{ renderer=new THREE.WebGLRenderer({antialias:true}); }catch(e){ const n=$('#trans3dNote'); if(n)n.textContent='⚠️ 当前设备不支持 3D（WebGL 不可用）。'; return; }
  renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  box.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x1b2a4a,1.2));
  const d1=new THREE.DirectionalLight(0xffffff,0.8); d1.position.set(5,8,6); scene.add(d1);
  const d2=new THREE.DirectionalLight(0x7dd3fc,0.35); d2.position.set(-5,3,-6); scene.add(d2);
  const grp=new THREE.Group(); scene.add(grp);
  const M=function(c,o){ return new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:.55,roughness:.42},o||{})); };

  const MOD=0.032, CD=0.80;                 /* 模数与中心距（两轴距离恒定） */
  const AX=[ [-0.42,0.38],[0,-0.30],[0.42,0.38] ];   /* 输入轴 / 中间轴 / 输出轴 */
  const CM=[20,30];                          /* 常啮合齿轮：输入 20 齿 → 中间轴 30 齿 */
  const PAIRS=[[14,36],[18,32],[23,27],[28,22]];     /* 1~4 档：中间轴 → 输出轴 */
  const ZS=[-0.78,-0.32,0.06,0.44,0.82];     /* 齿轮在轴上的轴向位置 */

  function shaft(ax,ay,len,color){
    const m=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.045,len,16),M(color||0x94a3b8,{metalness:.8,roughness:.3}));
    m.rotation.x=Math.PI/2; m.position.set(ax,ay,0); grp.add(m); return m;
  }
  function gearMesh(ax,ay,R,teeth,z,color){
    const g=new THREE.Group(); g.position.set(ax,ay,z); grp.add(g);
    const body=new THREE.Mesh(new THREE.CylinderGeometry(R,R,0.075,teeth*2),M(color,{metalness:.6,roughness:.35}));
    body.rotation.x=Math.PI/2; g.add(body);
    for(let i=0;i<teeth;i++){
      const a=i*Math.PI*2/teeth;
      const t=new THREE.Mesh(new THREE.BoxGeometry(R*0.20,0.075,R*0.09),M(color,{metalness:.6,roughness:.35}));
      t.position.set(Math.cos(a)*(R+R*0.09),0,Math.sin(a)*(R+R*0.09));
      t.rotation.y=-a; g.add(t);
    }
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.10,12),M(0x334155));
    hub.rotation.x=Math.PI/2; g.add(hub);
    return g;
  }
  const LEN=2.1;
  const sIn=shaft(AX[0][0],AX[0][1],LEN,0x94a3b8);
  const sCs=shaft(AX[1][0],AX[1][1],LEN,0x64748b);
  const sOut=shaft(AX[2][0],AX[2][1],LEN,0xcbd5e1);
  /* 输入轴：常啮合齿轮 */
  const gInCM=gearMesh(AX[0][0],AX[0][1],MOD*CM[0]/2,CM[0],ZS[0],0x7dd3fc);
  /* 中间轴：常啮合大齿轮 + 4 个档位齿轮 */
  const gCsCM=gearMesh(AX[1][0],AX[1][1],CD-MOD*CM[0]/2,CM[1],ZS[0],0x38bdf8);
  const gCs=[], gOut=[];
  PAIRS.forEach(function(p,k){
    const rC=MOD*p[0]/2, rO=CD-rC;
    gCs.push(gearMesh(AX[1][0],AX[1][1],rC,p[0],ZS[k+1],0x0ea5e9));
    gOut.push(gearMesh(AX[2][0],AX[2][1],rO,p[1],ZS[k+1],k===3?0x22c55e:0xfbbf24));
  });
  /* 同步器（示意：输出轴上的接合套） */
  const sync=new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.09,20),M(0xf59e0b,{metalness:.7,roughness:.3,emissive:0x7c2d12,emissiveIntensity:.4}));
  sync.rotation.x=Math.PI/2; sync.position.set(AX[2][0],AX[2][1],0.25); grp.add(sync);
  /* 壳体线框 */
  const caseGeo=new THREE.BoxGeometry(1.75,1.35,2.25);
  grp.add(new THREE.Mesh(caseGeo,new THREE.MeshStandardMaterial({color:0x60a5fa,transparent:true,opacity:0.055,side:THREE.DoubleSide,depthWrite:false})));
  grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(caseGeo),new THREE.LineBasicMaterial({color:0x60a5fa,transparent:true,opacity:0.42})));

  const st={ outSpeed:1, kc:CM[0]/CM[1] };
  window.__TRANS3D=st;

  let rx=0.18, ry=-0.5, zoom=1, dragging=false, px=0, py=0, ang=0;
  const dom=renderer.domElement; dom.style.cursor='grab';
  dom.addEventListener('pointerdown',function(e){dragging=true;px=e.clientX;py=e.clientY;dom.style.cursor='grabbing';});
  window.addEventListener('pointermove',function(e){ if(!dragging)return; ry+=(e.clientX-px)*0.008; rx+=(e.clientY-py)*0.006; rx=Math.max(-0.7,Math.min(1.1,rx)); px=e.clientX; py=e.clientY; });
  window.addEventListener('pointerup',function(){dragging=false;dom.style.cursor='grab';});
  dom.addEventListener('wheel',function(e){e.preventDefault();zoom=Math.max(0.6,Math.min(2.6,zoom+(e.deltaY>0?0.09:-0.09)));},{passive:false});

  function loop(){
    if(!dragging) ry+=0.0016;
    ang=(ang+0.014)%(Math.PI*2);
    const kc=-st.kc, ko=-kc*(st.outSpeed||0);
    gInCM.rotation.z=ang;
    gCsCM.rotation.z=ang*kc;
    gCs.forEach(function(g){ g.rotation.z=ang*kc; });
    gOut.forEach(function(g){ g.rotation.z=ang*ko; });
    sync.rotation.z=ang*ko;
    grp.rotation.y=ry; grp.rotation.x=rx;
    camera.position.set(3.2*zoom,2.3*zoom,3.6*zoom); camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('resize',function(){ const w=box.clientWidth,h=box.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
}

/* ================= 练习 1 · 连线配对 ================= */
const PAIRS6=[
 {zh:'变速器',en:'transmission'},
 {zh:'传动比',en:'gear ratio'},
 {zh:'驱动轮',en:'driving wheel'},
 {zh:'手动变速器',en:'Manual Transmission (MT)'},
 {zh:'自动变速器',en:'Automatic Transmission (AT)'},
 {zh:'空档位置',en:'neutral'},
 {zh:'停车；停放',en:'park'},
 {zh:'万向节',en:'universal joint'},
 {zh:'主减速器',en:'final drive'},
 {zh:'差速器',en:'differential'}
];
(function(){
  const mb=$('#matchBox6'); if(!mb)return;
  const L=PAIRS6.map(function(p,i){return {i:i,zh:p.zh,ok:false};});
  const R=PAIRS6.map(function(p,i){return {i:i,en:p.en,ok:false};}).sort(function(){return Math.random()-0.5;});
  let sel=null, done=0;
  const colL=document.createElement('div'), colR=document.createElement('div');
  const render=function(){
    colL.innerHTML=''; colR.innerHTML='';
    L.forEach(function(it){
      const b=document.createElement('button');
      b.className='match-item'+(it.ok?' done':''); b.textContent=it.zh;
      if(!it.ok)b.addEventListener('click',function(){ sel=it; render(); });
      colL.appendChild(b);
    });
    R.forEach(function(it){
      const b=document.createElement('button');
      b.className='match-item'+(it.ok?' done':''); b.textContent=it.en;
      if(!it.ok)b.addEventListener('click',function(){
        if(!sel){ toast('请先点左边的中文'); return; }
        if(sel.i===it.i){ sel.ok=true; it.ok=true; done++; sel=null; render();
          $('#matchMsg6').textContent='已配对 '+done+' / '+PAIRS6.length+(done===PAIRS6.length?' 🎉 全部正确！':'');
        } else { b.classList.add('wrong'); setTimeout(function(){b.classList.remove('wrong');},420); toast('❌ 配对错误，再想想'); }
      });
      colR.appendChild(b);
    });
  };
  mb.appendChild(colL); mb.appendChild(colR); render();
})();

/* ================= 练习 3 · 读音练习 ================= */
(function(){
  const READ6=['transmission','driving wheel','gear ratio','drive shaft','rear wheel','front wheel','axle half shaft','front-wheel-drive','reverse','idler shaft','countershaft','reverse gear','Manual Transmission','Automatic Transmission','sliding-gear type','constant-mesh design','park','neutral','overdrive','input shaft','output shaft','cluster gear','synchronizer','shift fork','gear shift mechanism','universal joint','final drive','differential','transaxle'];
  const rb=$('#readBox6'); if(!rb)return;
  rb.innerHTML=READ6.map(function(w){ return '<span style="display:inline-flex;align-items:center;gap:6px;background:var(--accent-l);border:1px solid #fcd34d;color:#92400e;font-size:13.5px;padding:5px 10px 5px 14px;border-radius:999px;font-weight:700">'+w+'<button class="speak-btn" data-t="'+w+'" data-l="en-US" style="width:26px;height:26px;font-size:13px">🔊</button></span>'; }).join('');
  rb.querySelectorAll('.speak-btn').forEach(function(b){ bindSpeak(b,b.dataset.t,'en-US'); });
})();

/* ================= 爆炸图按钮 ================= */
(function(){
  buildTransAnim(); selectTransPart(null);
  const be=$('#btnTransExplode'); if(be)be.addEventListener('click',function(){ setTransExplode(!transExploded); });
  const bt=$('#btnTransTour');
  if(bt)bt.addEventListener('click',function(){
    if(bt._t){ clearInterval(bt._t); bt._t=null; bt.textContent='🎬 自动巡讲'; selectTransPart(null); return; }
    let k=0; bt.textContent='⏹ 停止巡讲';
    bt._t=setInterval(function(){
      if(!transExploded)setTransExplode(true);
      selectTransPart(TRANS_PARTS[k%TRANS_PARTS.length].id);
      const g=$('#transSvg .pt.sel'); if(g&&g.scrollIntoView)g.scrollIntoView({block:'nearest'});
      k++;
    },2600);
  });
  /* 3D 按钮 */
  const b3=$('#btnTrans3D');
  if(b3)b3.addEventListener('click',function(){
    if(trans3DInited){ const box=$('#trans3dBox'); const hidden=box.style.display==='none';
      box.style.display=hidden?'':'none'; trans3DOn=!hidden; b3.textContent=hidden?'🙈 隐藏模型':'▶ 显示模型'; return; }
    trans3DInited=true; b3.disabled=true; b3.textContent='⏳ 加载中…'; initTrans3D();
  });
})();

/* ================= 课程六导入打字机 ================= */
(function(){
  const txt='发动机能转，但它转得再快也没法直接驱动车轮——转速太高、扭矩太小，而且不能倒转。所以在发动机和驱动轮之间，必须装一个"翻译官"：它把发动机的转速和扭矩重新"配比"之后再送出去，还能让车倒着走、让动力随时断开。它就是变速器 Transmission！这节课我们把变速器拆开：输入轴、中间轴、输出轴、一层层齿轮、还有那个能让齿轮"无声咬合"的同步器……看看动力是怎样被"变速"的！⚙️';
  const box=$('#typedIntro6'); if(!box)return;
  const io=new IntersectionObserver(function(es){
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=function(){ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();

createQuiz({box:'#quizBox6',bar:'#qBar6',questions:QUESTIONS6});
window.__COURSE_REGISTER('trans',{track:'track-trans'});
})();
