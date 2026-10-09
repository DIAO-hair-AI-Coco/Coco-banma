/* ================================================================
   生成式AI教程 · 第 5 课：DSH 的部署
   所有命令、版本号、包数、报错均来自真机实测
================================================================ */
(function(){
'use strict';

/* 模块级状态（集中声明，避免严格模式 TDZ） */
let plugSel=null;

/* ================= 题库（25 题：20 选择 + 5 判断） ================= */
const QUESTIONS_A5=[
 {ty:'choice',q:'DSH（DeepSeek Harness）本质上是什么？',en:'What is DSH?',
  opts:['An agent harness (runtime)','An AI model','A chat client','A programming language'],a:0,
  exp:'官方 README：DSH 是开源 agent harness（智能体运行时），本身不含模型能力，必须自己配置模型和 API Key。'},
 {ty:'choice',q:'官方 README 推荐的运行方式是？',en:'Which command does the official README recommend?',
  opts:['npx @deepseek-ai/dsh web','npm install -g @deepseek-ai/dsh','git clone && pnpm build','pip install dsh'],a:0,
  exp:'官方 README 的 Run from npm 一节给出的就是 npx @deepseek-ai/dsh web。'},
 {ty:'choice',q:'本机实测执行 npm install -g @deepseek-ai/dsh 后，装了多少个包？',en:'How many packages were installed in our real test?',
  opts:['536','36','5360','0 (no install needed)'],a:0,
  exp:'实测输出为 added 536 packages in 3m，其中含 287 个 @deepseek-ai/* 插件包。'},
 {ty:'choice',q:'实测这次 npm 全局安装大约耗时多久？',en:'How long did the real install take?',
  opts:['About 3 minutes','About 3 seconds','About 3 hours','About 30 minutes'],a:0,
  exp:'终端输出为 added 536 packages in 3m，即约 3 分钟。'},
 {ty:'choice',q:'实测安装完成后占用了多少磁盘空间？',en:'How much disk space did the install use?',
  opts:['About 453 MB','About 45 MB','About 4.5 GB','About 4.5 MB'],a:0,
  exp:'清点安装目录后为 453 MB，包含 177 个直接依赖与 287 个 @deepseek-ai/* 插件包。'},
 {ty:'choice',q:'dsh web 默认监听哪个地址？',en:'What address does dsh web serve by default?',
  opts:['http://127.0.0.1:3080','http://localhost:8080','http://0.0.0.0:80','https://dsh.deepseek.com'],a:0,
  exp:'官方 README 说明默认在 http://127.0.0.1:3080 启动 Web UI 并打开浏览器。'},
 {ty:'choice',q:'官方桌面版相比 npm 方式，最大的优势是什么？',en:'What is the biggest advantage of the desktop version?',
  opts:['It bundles its own Node.js runtime, so no environment setup is needed','It runs without any API Key','It is a different AI model','It does not need a network'],a:0,
  exp:'实测桌面版内置 Node v24.18.1 与 pnpm v11.7.0，不依赖电脑上装没装 Node 环境。'},
 {ty:'choice',q:'官方下载页标注的 Windows 系统要求是？',en:'What Windows version does the official download page require?',
  opts:['Windows 10 or later','Windows 7 or later','Windows 11 only','No requirement stated'],a:0,
  exp:'官方下载按钮下方明确标注 Windows 10 或更高版本。'},
 {ty:'choice',q:'官方下载页对 macOS 的限制是什么？',en:'What is the macOS limitation on the official download page?',
  opts:['macOS 13 or later, and only the Apple silicon (arm64) build is provided','macOS 10.13 or later, Intel only','macOS is not supported','Any macOS version, both Intel and Apple silicon'],a:0,
  exp:'官方只提供 macOS 13+ 的 Apple 芯片（arm64）版本，未提供 Intel 版。Intel Mac 需要改走 npm 方式。'},
 {ty:'choice',q:'DSH 的用户数据（配置、会话、密钥）存在哪里？',en:'Where does DSH store user data?',
  opts:['C:\\Users\\<用户名>\\.dsh','C:\\Program Files\\DSH','The installation folder','A cloud server'],a:0,
  exp:'由环境变量 DSH_HOME 指向的 ~/.dsh 目录，里面有 profiles、sessions、logs 与 .credentials.yaml。'},
 {ty:'choice',q:'用户数据目录里的 .credentials.yaml 是什么？为什么要特别小心？',en:'What is .credentials.yaml and why be careful?',
  opts:['It stores API keys and other credentials — never show it on a projector','It stores your chat history only','It is a temporary cache file','It stores the app theme settings'],a:0,
  exp:'里面是 API Key 等凭据，按量计费、泄露会被盗刷。演示时绝不能投到大屏，转手电脑前要先删除。'},
 {ty:'choice',q:'首次进入界面发现输入框是灰色的、打不了字，最可能的原因是？',en:'The input box is grey and you cannot type. Most likely cause?',
  opts:['No workspace has been added and selected','The API Key is wrong','The model is overloaded','The network is down'],a:0,
  exp:'工作区（Workspace）是文件边界，必须先添加并选中一个工作区，输入框才会激活。这是新手最常见的问题。'},
 {ty:'choice',q:'在 DSH 中，「工作区（Workspace）」的准确含义是？',en:'In DSH, what exactly is a "workspace"?',
  opts:['A file boundary that defines what the AI can read and write','A folder for organising chat categories','A cloud backup location','A list of saved prompts'],a:0,
  exp:'工作区不是聊天分类，而是文件边界——它决定了 AI 能访问哪些文件，是安全边界。'},
 {ty:'choice',q:'关于 Full Access（完全访问）权限，正确的理解是？',en:'How should Full Access be understood?',
  opts:['It is the highest-risk option, not an "advanced" version','It is the recommended setting for beginners','It only affects the interface language','It costs more money'],a:0,
  exp:'权限越高不等于越强，只等于"AI 出错时能造成的破坏越大"。官方安全须知要求用最小必要权限运行。'},
 {ty:'choice',q:'三级权限中，新手应该从哪一级开始？',en:'Which permission level should beginners start with?',
  opts:['Read Only','Workspace Write','Full Access','It does not matter'],a:0,
  exp:'从只读开始，确认可靠后再逐步放开。推荐组合是"标准模式 + 只读权限 + 计划模式"。'},
 {ty:'choice',q:'关于「计划模式」和「预设」，下列说法正确的是？',en:'Which statement about Plan Mode and Presets is correct?',
  opts:['They are orthogonal — a preset decides the tools, Plan Mode decides whether the AI plans first','Plan Mode is the fifth preset','Presets decide whether the AI plans first','Plan Mode replaces the preset entirely'],a:0,
  exp:'预设决定"会话里有什么工具"；计划模式决定"AI 先出方案还是直接动手"。两者正交，可任意组合。这是最容易讲错的一点。'},
 {ty:'choice',q:'下列哪一项<b>不是</b> DSH 的预设（Preset）？',en:'Which of the following is NOT a DSH preset?',
  opts:['Plan mode','Standard mode','PTC mode','Minimal mode'],a:0,
  exp:'四种预设是标准、PTC、极简、创造。计划模式（/plan）是一个开关，不是预设。'},
 {ty:'choice',q:'命令 dsh headless "任务" 的作用是？',en:'What does dsh headless "task" do?',
  opts:['Answer one task, print the result, and exit','Start the browser UI','Reset all configuration','Install a plugin'],a:0,
  exp:'这是 dsh --help 的 Examples 里给出的用法，适合自动化与批量处理，不开界面。'},
 {ty:'choice',q:'如果配置被改坏了，官方提供的恢复命令是？',en:'Which command helps when your configuration is broken?',
  opts:['dsh rescue --from-default-profile web','dsh reset --all','dsh fix --force','npm uninstall and reinstall'],a:0,
  exp:'dsh --help 的 Examples 里有：dsh rescue --from-default-profile web —— 用官方模板重建一个救援配置档。'},
 {ty:'choice',q:'实测中执行 dsh plugin 时报出 pnpm 命令找不到，正确的处理是？',en:'The real error "pnpm is not recognized" means you should:',
  opts:['Install pnpm separately with: npm install -g pnpm','Reinstall Node.js','Give up — DSH is broken','Disable the firewall'],a:0,
  exp:'DSH 的插件管理依赖 pnpm，而 pnpm 不在 Node 安装包里，要单独装。注意：只用 Web 界面不需要 pnpm。'},
 {ty:'choice',q:'启动 dsh web 后，那个终端窗口可以关闭吗？',en:'After running dsh web, can you close the terminal window?',
  opts:['No — the web page is only the UI, the service runs in that terminal','Yes, the service keeps running in the background','Yes, but only after the first use','Only on macOS'],a:0,
  exp:'网页只是界面，服务跑在终端里。关掉终端 = 关掉服务 = 网页立刻打不开。这是新手最容易犯的错。'},
 {ty:'choice',q:'3080 端口被占用时，正确的做法是？',en:'Port 3080 is already in use. What should you do?',
  opts:['dsh web --port 8080, or --port 0 to let the OS pick a free port','Change the API Key','Reinstall DSH','Restart the computer'],a:0,
  exp:'dsh --profile web --help 里列出了 --port 参数；传 0 表示让操作系统自动挑一个空闲端口。'},
 {ty:'choice',q:'想备份 DSH 的配置与会话，只需要备份哪个目录？',en:'To back up your DSH configuration and sessions, which folder do you copy?',
  opts:['The entire ~/.dsh folder','Only the installation folder','Only the sessions subfolder','Nothing — it syncs to the cloud automatically'],a:0,
  exp:'配置、会话、附件都在 ~/.dsh 下。但注意它含 .credentials.yaml，不要放进公共网盘。'},
 {ty:'choice',q:'官方桌面版的更新通道是什么？这对教学意味着什么？',en:'What update channel does the desktop app use, and what does that mean for teaching?',
  opts:['nightly — so do not update the day before a class demo','stable — updates are rare','yearly — no concern','beta — only manual updates'],a:0,
  exp:'实测升级源配置的通道为 nightly（每夜构建）。建议把升级安排在课后，演示用的机器课前不要升级。'},
 {ty:'choice',q:'官方安全须知（SAFETY.md）的核心结论是什么？',en:'What is the core message of the official SAFETY.md?',
  opts:['It is experimental, not security-audited, and sandboxing does not guarantee isolation','It is fully secure and production-ready','Sandboxing makes it 100% safe','Only viruses are a risk'],a:0,
  exp:'原文：未经安全审计、不可视为安全或可用于生产；沙箱、审批与权限控制能降低风险，但不保证隔离或防止损害。'},
 {ty:'tf',q:'DSH 本身自带 AI 模型能力，装好就能直接对话。',en:'DSH includes its own AI model, so it can chat right after installation.',a:false,
  exp:'DSH 是运行时，不含模型能力。必须自己配置模型提供方与 API Key 才能使用。'},
 {ty:'tf',q:'官方桌面版自带 Node.js 运行时，因此不依赖电脑上是否已安装 Node。',en:'The official desktop app bundles its own Node.js runtime, so it does not depend on a system-wide Node install.',a:true,
  exp:'实测桌面版内置 Node v24.18.1 与 pnpm v11.7.0，这正是它适合教学演示的原因。'},
 {ty:'tf',q:'只能用 Web 界面的话，不需要额外安装 pnpm。',en:'If you only use the web UI, you do not need to install pnpm separately.',a:true,
  exp:'pnpm 只在"安装/管理插件"时才需要。实测中 pnpm 缺失时，Web 界面本身仍可正常启动。'},
 {ty:'tf',q:'权限给得越高，AI 的能力就越强。',en:'Granting higher permissions makes the AI more capable.',a:false,
  exp:'权限高低不改变 AI 的能力，只改变"它出错时能造成的破坏范围"。Full Access 是风险最高，不是高级版。'},
 {ty:'tf',q:'DSH 的会话记录可以归档，而归档不等于删除。',en:'DSH sessions can be archived, and archiving is not the same as deleting.',a:true,
  exp:'归档只是把会话收起来，数据仍然保留；这与删除是两回事。'}
];

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

/* ================= 连线配对 ================= */
const PAIRS_A5=[
 {zh:'智能体运行时',en:'agent harness'},
 {zh:'一切皆插件',en:'everything-is-a-plugin'},
 {zh:'配置档（预设组合）',en:'profile'},
 {zh:'工作区（文件边界）',en:'workspace'},
 {zh:'只读权限',en:'Read Only'},
 {zh:'完全访问权限',en:'Full Access'},
 {zh:'一次性执行任务',en:'dsh headless'},
 {zh:'重建配置档',en:'dsh rescue'},
 {zh:'用户数据目录',en:'~/.dsh'},
 {zh:'凭据文件（含 API Key）',en:'.credentials.yaml'}
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

/* ================= 渲染：连线配对 ================= */
(function(){
  const mb=$('#matchBoxA5'); if(!mb)return;
  const L=PAIRS_A5.map(function(p,i){return {i:i,zh:p.zh,ok:false};});
  const R=PAIRS_A5.map(function(p,i){return {i:i,en:p.en,ok:false};}).sort(function(){return Math.random()-0.5;});
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
          $('#matchMsgA5').textContent='已配对 '+done+' / '+PAIRS_A5.length+(done===PAIRS_A5.length?' 🎉 全部正确！':'');
        } else { b.classList.add('wrong'); setTimeout(function(){b.classList.remove('wrong');},420); toast('❌ 配对错误，再想想'); }
      });
      colR.appendChild(b);
    });
  };
  mb.appendChild(colL); mb.appendChild(colR); render();
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

createQuiz({box:'#quizBoxA5',bar:'#qBarA5',questions:QUESTIONS_A5});
window.__COURSE_REGISTER('ai5',{track:'track-ai5'});
})();
