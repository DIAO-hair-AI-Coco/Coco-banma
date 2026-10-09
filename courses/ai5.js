/* ================================================================
   生成式AI教程 · 第 5 课：DSH 的部署
   所有命令、版本号、包数、报错均来自真机实测
================================================================ */
(function(){
'use strict';

/* 模块级状态（集中声明，避免严格模式 TDZ） */
let plugSel=null;

/* ================= 插件树（真实包名） ================= */
const PLUGS=[
 {p:'dsh-base',n:'基础能力包',d:'DSH 的核心底座，提供最基础的能力与约定。它是 profile bundles 里的两项之一。'},
 {p:'dsh-web-app',n:'Web 界面',d:'⭐ 连"浏览器界面"本身都是一个插件。这就是"一切皆插件"最直观的证据——界面可替换。'},
 {p:'dsh-agent-preset',n:'四种预设',d:'提供标准 / PTC / 极简 / 创造四种预设。换句话说，"模式"也是可替换的插件。'},
 {p:'dsh-plan-mode',n:'计划模式',d:'⭐ 连"先出方案再动手"这个开关也是插件。它和预设正交，可任意组合。'},
 {p:'dsh-tool-fs',n:'文件读写工具',d:'让 AI 能读写文件。你给它的工作区边界，就是约束这个插件的范围。'},
 {p:'dsh-tool-pwsh',n:'PowerShell 工具',d:'在 Windows 上执行命令的能力（另有 dsh-tool-bash 对应 Linux/macOS）。'},
 {p:'dsh-tool-web',n:'网页检索工具',d:'让 AI 能上网查资料。这是它能"核实事实"的关键——没有这个插件时它只能凭记忆答。'},
 {p:'dsh-tool-subagent',n:'子智能体',d:'把大任务拆给多个子智能体并行处理。这是"多智能体"能力的具体实现。'},
 {p:'dsh-tool-workflow',n:'工作流编排',d:'用脚本把大量子任务编排起来批量执行。'},
 {p:'dsh-pwsh-sandbox',n:'沙箱',d:'⭐ 连"沙箱"都是插件。官方安全须知提醒：它能降低风险，但不能保证隔离。'},
 {p:'dsh-mcp-client',n:'MCP 客户端',d:'接入 MCP（模型上下文协议）的标准接口，相当于"AI 世界的 USB-C"，用来连接外部工具与数据。'},
 {p:'dsh-skill-office',n:'Office 技能',d:'处理 Word / Excel / PPT 文档的技能包。教学场景里最实用的一类插件。'}
];

/* ================= 命令速记卡 ================= */
const CMDS_A5=[
 ['node --version','检查 Node 版本（要求 ^22.19.0 || >=24.0.0）'],
 ['npm install -g @deepseek-ai/dsh','全局安装 DSH（实测 536 个包 / 约 3 分钟）'],
 ['npm install -g pnpm','单独安装 pnpm —— 装插件时才需要'],
 ['npx @deepseek-ai/dsh web','⭐ 官方 README 推荐的运行方式'],
 ['dsh --version','验证"装上了没有"，与"启动失败"分开排查'],
 ['dsh --help','看 profile 体系与全部用法（教学价值最高的一条命令）'],
 ['dsh --profile web --help','看 Web 界面的启动参数'],
 ['dsh web','启动浏览器界面（默认 127.0.0.1:3080）'],
 ['dsh web --port 8080','换一个端口启动'],
 ['dsh web --port 0','让系统自动挑空闲端口'],
 ['dsh web --no-open','启动但不自动打开浏览器'],
 ['dsh tui','启动终端界面（不开浏览器）'],
 ['dsh headless "任务"','执行一个任务、打印结果、退出'],
 ['dsh rescue --from-default-profile web','配置坏了用它重建一个救援配置档'],
 ['npm update -g @deepseek-ai/dsh','升级已全局安装的 DSH']
];

/* ================= 渲染：可交互插件树 ================= */
(function(){
  const box=$('#plugTree'), out=$('#plugOut');
  if(!box)return;
  PLUGS.forEach(function(it,i){
    const b=document.createElement('button');
    b.className='pg';
    b.innerHTML='<b>'+it.p+'</b><span>'+it.n+'</span>';
    b.addEventListener('click',function(){
      box.querySelectorAll('.pg').forEach(function(x){x.classList.remove('on');});
      b.classList.add('on');
      out.innerHTML='<b>'+it.p+'</b>　——　'+it.n+'<br>'+it.d;
    });
    box.appendChild(b);
  });
})();

/* ================= 渲染：命令速记卡（点击翻面） ================= */
(function(){
  const box=$('#cmdBoxA5'); if(!box)return;
  CMDS_A5.forEach(function(it){
    const b=document.createElement('button');
    b.className='btn ghost';
    b.style.cssText='padding:9px 15px;font-size:13px;font-family:Consolas,monospace;text-align:left;max-width:100%';
    b.textContent=it[0];
    let flipped=false;
    b.addEventListener('click',function(){
      flipped=!flipped;
      b.textContent=flipped?it[1]:it[0];
      b.style.fontFamily=flipped?'inherit':'Consolas,monospace';
      b.style.background=flipped?'var(--primary-l)':'';
    });
    box.appendChild(b);
  });
})();

/* ================= 导入打字机 ================= */
(function(){
  const txt='装一个 AI 工具，和装一个普通软件，到底有什么不一样？普通软件装完就能用；而 AI 工具装完，你还得告诉它"用哪个模型""能碰哪些文件""有多大权限"。更麻烦的是——它真的会动手改你的文件。这节课我们把 DSH 从下载到跑通走一遍：桌面版和命令行两条路、每一步的真实截图、还有我们实测踩到的坑。装好之后，你要盯的不是"它有多强"，而是"你给了它多大权限"。🤖';
  const box=$('#typedIntroA5'); if(!box)return;
  const io=new IntersectionObserver(function(es){
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=function(){ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();

window.__COURSE_REGISTER('ai5',{track:'track-ai5'});
})();
