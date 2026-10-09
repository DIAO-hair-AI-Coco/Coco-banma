/* ================================================================
   生成式AI教程 · 第 3 课：AI 基本术语与常识
   含：嵌套包含关系图 / Token 切分 / 训练三阶段 / 上下文窗口 / 54 词可搜索术语表
================================================================ */
(function(){
'use strict';

let glCat='全部';

/* ================= 交互一：嵌套包含关系图 ================= */
(function(){
  const box=$('#nestDiagram'); if(!box)return;
  const LV=[
    {k:'AI',n:'人工智能',c:'#3b82f6',d:'<b>最大的一层。</b>让机器完成通常需要人类智能的任务的总称——看、听、说话、推理、决策都算。<br>⚠️ 说"AI 会编造事实"太笼统：<b>扫地机器人也是 AI，它不会编文献。</b>'},
    {k:'ML',n:'机器学习',c:'#8b5cf6',d:'<b>AI 的一个分支。</b>不靠人写规则，而是让程序从大量数据里自己找规律。<br>类比：不是老师给公式，而是给学生一千道题让他自己总结套路。'},
    {k:'DL',n:'深度学习',c:'#0d9488',d:'<b>机器学习中的一种方法。</b>"深"指神经网络层数多，每层提取更抽象的特征。<br>2012 年 AlexNet 夺冠后，深度学习成为主流。'},
    {k:'GenAI',n:'生成式 AI',c:'#f59e0b',d:'<b>深度学习的一个应用方向。</b>能"生成"新内容（文本、图片、音频、视频、代码），而不只是分类或打分。<br>对比：人脸识别是"判断"，写文章是"生成"。'},
    {k:'LLM',n:'大语言模型',c:'#ef4444',d:'<b>生成式 AI 里以语言为核心的那一支。</b>ChatGPT、DeepSeek 这类产品的内核。<br>⚠️ <b>平时大家说的"AI 会幻觉"，准确讲是"LLM 会幻觉"。</b>'}
  ];
  let h='<div style="position:relative">';
  h+='<div id="nestOuter" style="border:2px solid '+LV[0].c+';border-radius:16px;padding:14px 14px 14px 16px;cursor:pointer;transition:.2s;background:rgba(59,130,246,.05)">';
  h+='<div style="font-size:13px;font-weight:800;color:'+LV[0].c+';margin-bottom:9px">AI 人工智能</div>';
  h+='<div style="border:2px solid '+LV[1].c+';border-radius:13px;padding:12px 12px 12px 14px;background:rgba(139,92,246,.05)">';
  h+='<div style="font-size:13px;font-weight:800;color:'+LV[1].c+';margin-bottom:9px">ML 机器学习</div>';
  h+='<div style="border:2px solid '+LV[2].c+';border-radius:11px;padding:11px 11px 11px 13px;background:rgba(13,148,136,.05)">';
  h+='<div style="font-size:13px;font-weight:800;color:'+LV[2].c+';margin-bottom:9px">DL 深度学习</div>';
  h+='<div style="border:2px solid '+LV[3].c+';border-radius:9px;padding:10px 10px 10px 12px;background:rgba(245,158,11,.06)">';
  h+='<div style="font-size:13px;font-weight:800;color:'+LV[3].c+';margin-bottom:9px">生成式 AI</div>';
  h+='<div style="border:2px dashed '+LV[4].c+';border-radius:7px;padding:10px 12px;background:rgba(239,68,68,.07)">';
  h+='<div style="font-size:13px;font-weight:800;color:'+LV[4].c+'">LLM 大语言模型　<span style="font-weight:400;color:var(--muted);font-size:12.5px">← ChatGPT / DeepSeek 在这里</span></div>';
  h+='</div></div></div></div></div></div>';
  h+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin:13px 0 10px" id="nestBtns">';
  LV.forEach(function(l,i){ h+='<button class="btn ghost" data-l="'+i+'" style="padding:6px 14px;font-size:13px;border-color:'+l.c+';color:'+l.c+'">'+l.k+'</button>'; });
  h+='</div><div class="plug-out" id="nestOut">👆 点上方的按钮（或直接点方框），看每一层是什么。</div>';
  box.innerHTML=h;
  const out=$('#nestOut');
  box.querySelectorAll('[data-l]').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      const l=LV[+b.dataset.l];
      box.querySelectorAll('[data-l]').forEach(function(x){ x.className='btn ghost'; x.style.cssText='padding:6px 14px;font-size:13px;border-color:'+LV[+x.dataset.l].c+';color:'+LV[+x.dataset.l].c; });
      b.style.cssText='padding:6px 14px;font-size:13px;background:'+l.c+';color:#fff;border-color:'+l.c;
      out.innerHTML='<b style="color:'+l.c+'">'+l.k+' · '+l.n+'</b><br>'+l.d;
    });
  });
})();

/* ================= 交互二：Token 切分可视化 ================= */
(function(){
  const box=$('#tokenDemo'); if(!box)return;
  const SENT='汽车发动机把燃料的化学能转化为机械能。';
  /* 模拟切分：中文常见按 1-2 字切，标点单独成 token（不同模型切法不同） */
  const TOK=['汽车','发动','机','把','燃料','的','化学','能','转化','为','机械','能','。'];
  box.innerHTML='<div style="background:#0d1b36;border-radius:14px;padding:18px 20px">'
    +'<div style="font-size:13px;color:#7dd3fc;font-weight:800;letter-spacing:1px;margin-bottom:12px">原句（'+SENT.length+' 个字符）</div>'
    +'<div style="font-size:17px;color:#dbe7ff;line-height:1.9;margin-bottom:6px">'+SENT+'</div>'
    +'<button class="btn" id="tkRun" style="padding:8px 20px;font-size:14px;margin:10px 0 4px">✂️ 切分成 Token</button>'
    +'<div id="tkOut" style="margin-top:12px"></div></div>';
  $('#tkRun').addEventListener('click',function(){
    const colors=['#38bdf8','#818cf8','#a78bfa','#f472b6','#fbbf24','#4ade80','#22d3ee'];
    let h='<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px">';
    TOK.forEach(function(t,i){
      h+='<span style="display:inline-block;padding:5px 11px;border-radius:8px;font-size:15px;font-weight:700;color:#0d1b36;background:'+colors[i%colors.length]+'">'+t+'</span>';
      if(i<TOK.length-1) h+='<span style="color:#475569;align-self:center;font-size:12px">|</span>';
    });
    h+='</div>';
    h+='<div style="color:#dbe7ff;font-size:14px;line-height:1.9">'
      +'字符数：<b style="color:#7dd3fc">'+SENT.length+'</b>　·　'
      +'Token 数：<b style="color:#fbbf24">'+TOK.length+'</b>　·　'
      +'比例：<b style="color:#4ade80">'+(TOK.length/SENT.length).toFixed(2)+' token / 字</b></div>'
      +'<div style="color:#9db8e6;font-size:13px;margin-top:10px;line-height:1.8">'
      +'⚠️ <b>不同模型的切法不一样</b>，这里只是示意。英文中一个单词可能被切成 1–2 个 token，'
      +'中文一个汉字通常也要 1–2 个 token。<b>计费和长度限制都按 token 算，所以中文通常比英文"更费"。</b></div>';
    $('#tkOut').innerHTML=h;
  });
})();

/* ================= 交互三：训练三阶段 ================= */
(function(){
  const box=$('#trainFlow'); if(!box)return;
  const ST=[
    {n:'①',t:'预训练 Pre-training',c:'#3b82f6',d:'读海量文本，学会语言规律和世界知识。<b>这是最烧钱的阶段</b>，耗时数周至数月。',a:'类比：上完所有通识课'},
    {n:'②',t:'微调 Fine-tuning',c:'#8b5cf6',d:'在预训练模型基础上，用特定领域的小数据集再训练，让它更懂某个专业。<br><span style="color:var(--muted)">还有更便宜的 <b>LoRA</b>，个人显卡也能做。</span>',a:'类比：专业实习'},
    {n:'③',t:'对齐 Alignment（如 RLHF）',c:'#0d9488',d:'用人类反馈调整它的<b>行为倾向</b>——让它"有用、诚实、无害"。<br>⭐ <b>AI 那种"礼貌、爱道歉、爱附和"的性格，主要来自这一步。</b>',a:'类比：职业道德培训'}
  ];
  let h='<div class="cmp-wrap" style="overflow-x:auto"><table class="vocab-table"><tr><th style="width:22%">阶段</th><th>做什么</th><th style="width:20%">类比</th></tr>';
  ST.forEach(function(s){
    h+='<tr><td><span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:'+s.c+';color:#fff;font-weight:800;font-size:13px;text-align:center;line-height:24px;margin-right:7px">'+s.n+'</span><b style="color:'+s.c+'">'+s.t+'</b></td>'
      +'<td>'+s.d+'</td><td style="color:var(--muted);font-size:13px">'+s.a+'</td></tr>';
  });
  h+='</table></div>';
  box.innerHTML=h;
})();

/* ================= 交互四：上下文窗口演示 ================= */
(function(){
  const box=$('#ctxDemo'); if(!box)return;
  const MSGS=['老师你好，我要准备一节汽修专业的英语课。','学生是中职二年级，基础比较薄弱。','课题是《发动机基本概念》。','请帮我设计一个 45 分钟的教案。','要求包含三维目标、重难点、时间分配。','还要有 5 个课堂提问。','最后加一份课后作业。','⚠️ 最重要的要求：不要出现任何英文字母，全部用中文。'];
  box.innerHTML='<div style="background:#0d1b36;border-radius:14px;padding:18px 20px">'
    +'<div style="font-size:13px;color:#7dd3fc;font-weight:800;letter-spacing:1px;margin-bottom:12px">模拟一段对话（窗口容量 = 6 条消息）</div>'
    +'<div id="ctxList" style="display:flex;flex-direction:column;gap:8px;min-height:250px"></div>'
    +'<div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap">'
    +'<button class="btn" id="ctxAdd" style="padding:8px 20px;font-size:14px">➕ 再说一句</button>'
    +'<button class="btn ghost" id="ctxReset" style="padding:8px 18px;font-size:14px">↺ 重来</button>'
    +'<span style="font-size:13px;color:#9db8e6" id="ctxState"></span></div>'
    +'<div id="ctxNote" style="margin-top:12px;font-size:13px;line-height:1.8;color:#9db8e6"></div></div>';
  let n=1;   /* 初始先显示第 1 句，避免演示区空白 */
  const CAP=6;
  const render=function(){
    const list=$('#ctxList'); list.innerHTML='';
    const start=Math.max(0,n-CAP);
    for(let i=start;i<n;i++){
      const d=document.createElement('div');
      const dropped = i < n-CAP;
      d.style.cssText='padding:9px 13px;border-radius:10px;font-size:13.5px;line-height:1.6;'
        +(i===7?'background:rgba(239,68,68,.18);border:1px solid #ef4444;color:#fca5a5':'background:rgba(255,255,255,.07);color:#dbe7ff');
      d.textContent=(i===7?'⚠️ ':'')+'你：'+MSGS[i];
      list.appendChild(d);
    }
    $('#ctxState').textContent='已说 ' + n + ' 句，窗口保留最近 ' + Math.min(n,CAP) + ' 句';
    const note=$('#ctxNote');
    if(n<8){
      note.innerHTML='继续点「再说一句」，观察窗口满了之后会发生什么。';
    } else {
      note.innerHTML='⭐ <b style="color:#f87171">看第 1 句去哪了？</b>它被"挤出去"了。<br>'
        +'现在你只说了"最后加一份课后作业"，而<b>最早那句"学生是中职二年级、基础薄弱"已经不在窗口里了</b>——'
        +'模型这时候给出的教案，可能就<b>不符合学情</b>。<br>'
        +'💡 <b>这就是为什么长对话到后面，AI 会"忘了你开头说的要求"。</b>'
        +'解决办法：<b>把最重要的约束条件放在开头或结尾</b>，或者用 <code class="k">/compact</code> 之类的压缩功能整理上下文。';
    }
  };
  $('#ctxAdd').addEventListener('click',function(){ if(n<MSGS.length){ n++; render(); } });
  $('#ctxReset').addEventListener('click',function(){ n=0; render(); });
  render();
})();

/* ================= 交互五：54 词可搜索术语表 ================= */
const GLOSSARY=[
 {c:'基础概念',e:'Artificial Intelligence (AI)',z:'人工智能',d:'让机器完成通常需要人类智能的任务的总称。范围最大的一层。'},
 {c:'基础概念',e:'Machine Learning (ML)',z:'机器学习',d:'不靠人写规则，而是让程序从大量数据中自己找规律。'},
 {c:'基础概念',e:'Deep Learning (DL)',z:'深度学习',d:'机器学习中用多层神经网络的方法，"深"指层数多。'},
 {c:'基础概念',e:'Neural Network',z:'神经网络',d:'大量简单计算单元分层连接成的数学模型。受生物神经启发，但只是数学。'},
 {c:'基础概念',e:'Generative AI',z:'生成式人工智能',d:'能生成新内容（文本/图片/音频/视频/代码）的 AI，不只是分类或打分。'},
 {c:'基础概念',e:'Large Language Model (LLM)',z:'大语言模型',d:'在海量文本上训练、参数量巨大的语言模型。ChatGPT / DeepSeek 的内核。'},
 {c:'基础概念',e:'AGI',z:'通用人工智能',d:'假想在几乎所有认知任务上达到或超过人类、能跨领域迁移的 AI。目前尚未实现。'},
 {c:'基础概念',e:'Multimodal',z:'多模态',d:'能同时处理文字、图片、音频、视频等多种信息形式。'},
 {c:'基础概念',e:'Token',z:'词元 / 令牌',d:'模型处理文本的最小单位。API 按 token 计费，上下文长度也按 token 算。'},
 {c:'基础概念',e:'Context Window',z:'上下文窗口',d:'模型一次能"看到"的 token 总量上限。超了就得丢弃最早的内容。'},
 {c:'基础概念',e:'Knowledge Cutoff',z:'知识截止日期',d:'训练数据收集的截止时间。之后的事它不知道，而且不会主动说。'},
 {c:'基础概念',e:'Benchmark',z:'基准测试',d:'用标准化题目横向比较模型能力的评测集。榜单会被刷、题目会污染，不能当唯一依据。'},

 {c:'模型机制',e:'Parameter',z:'参数',d:'模型内部可调数值的总数，粗略代表"模型多大"。常见写法 7B / 70B（B=十亿）。'},
 {c:'模型机制',e:'Training',z:'训练',d:'用数据反复调整参数、让模型学会预测的过程。耗时数周至数月。'},
 {c:'模型机制',e:'Inference',z:'推理',d:'训练完成后，实际回答你问题的那次计算。训练是"上学"，推理是"考试答题"。'},
 {c:'模型机制',e:'Pre-training',z:'预训练',d:'第一步的大规模通用训练，用海量无标注文本学会语言规律。'},
 {c:'模型机制',e:'Fine-tuning',z:'微调',d:'在预训练模型基础上，用特定领域的小数据集再训练，让它更懂某个专业。'},
 {c:'模型机制',e:'SFT',z:'有监督微调',d:'用"问题—标准答案"配对数据微调，教模型按人类期望的格式和语气回答。'},
 {c:'模型机制',e:'RLHF',z:'基于人类反馈的强化学习',d:'让人给模型的多个回答排序，训练一个"打分器"来引导它的行为倾向。'},
 {c:'模型机制',e:'Distillation',z:'知识蒸馏',d:'让小模型学着模仿大模型的输出，用更低成本获得接近的能力。'},
 {c:'模型机制',e:'Quantization',z:'量化',d:'用更低精度存储参数，模型变小、跑得更快、精度略降。消费级显卡能跑大模型的关键。'},
 {c:'模型机制',e:'MoE (Mixture of Experts)',z:'混合专家',d:'把模型拆成多个"专家"子网络，每个 token 只激活其中一小部分，兼顾能力与成本。'},
 {c:'模型机制',e:'Scaling Law',z:'缩放定律',d:'经验规律：参数、数据量、算力同步增大时，性能可预测地提升（但边际收益递减）。'},
 {c:'模型机制',e:'Emergent Ability',z:'涌现能力',d:'规模跨过某个阈值后突然出现、小模型完全没有的能力（如多步推理）。'},
 {c:'模型机制',e:'Overfitting',z:'过拟合',d:'模型把训练数据"背下来"了，训练集表现极好、遇到新题就崩。'},
 {c:'模型机制',e:'Catastrophic Forgetting',z:'灾难性遗忘',d:'学新任务时把旧本事忘掉了。'},
 {c:'模型机制',e:'Reasoning Model',z:'推理模型',d:'回答前先生成一段较长的内部推理过程（"思考"）的模型，更慢更贵但更准。'},
 {c:'模型机制',e:'Test-time Compute',z:'测试时计算',d:'在推理阶段投入更多算力（让它想更久）来提升答案质量，而非只靠加大模型。'},
 {c:'模型机制',e:'Diffusion Model',z:'扩散模型',d:'图像/视频生成的主流技术：从纯噪声出发逐步"去噪"还原出画面。'},
 {c:'模型机制',e:'LoRA',z:'低秩适配',d:'高效微调方法，只训练极少量额外参数就能适配新任务，个人显卡也能做。'},

 {c:'提示与交互',e:'Prompt',z:'提示词',d:'你输入给模型的指令或问题。提示词质量直接决定输出质量。'},
 {c:'提示与交互',e:'System Prompt',z:'系统提示词',d:'对话开始前设定的角色与规则，优先级高于用户输入。'},
 {c:'提示与交互',e:'Zero-shot / Few-shot',z:'零样本 / 少样本',d:'不给例子 vs 在提示里给 1–5 个示例。给例子通常大幅提升稳定性。'},
 {c:'提示与交互',e:'Chain-of-Thought (CoT)',z:'思维链',d:'要求模型分步推理而不是直接给答案，显著提升数学与逻辑题正确率。'},
 {c:'提示与交互',e:'Temperature',z:'温度',d:'控制随机性的参数。低=稳定可复现（出题、事实问答）；高=发散有创意（头脑风暴）。'},
 {c:'提示与交互',e:'Top-p',z:'核采样',d:'另一种随机性控制：只从累计概率前 p 的候选词里选。与温度二选一调即可。'},
 {c:'提示与交互',e:'Prompt Injection',z:'提示词注入',d:'攻击者在被处理的文本里埋入指令，劫持 AI 的行为。'},
 {c:'提示与交互',e:'Jailbreak',z:'越狱',d:'用特殊话术绕过模型的安全限制。属于违规行为。'},
 {c:'提示与交互',e:'Inference Cost',z:'推理成本',d:'每处理一个任务或每百万 token 的花费。横比模型要看"每任务成本"。'},

 {c:'检索与智能体',e:'Hallucination',z:'幻觉',d:'模型一本正经地编造不存在的内容，且语气自信。根源是它在预测下一个词。'},
 {c:'检索与智能体',e:'RAG',z:'检索增强生成',d:'先从可信资料库检索相关段落，再让模型"看着材料回答"。相当于开卷作答。'},
 {c:'检索与智能体',e:'Embedding',z:'嵌入 / 向量化',d:'把文字转成数字向量，语义相近的向量也相近，从而可以"按意思搜索"。'},
 {c:'检索与智能体',e:'Vector Database',z:'向量数据库',d:'专门存储和快速检索 embedding 的数据库，是 RAG 与知识库问答的基础设施。'},
 {c:'检索与智能体',e:'Agent',z:'智能体',d:'能自主规划多步、调用工具、看结果再决定下一步的 AI 系统。'},
 {c:'检索与智能体',e:'Tool Use / Function Calling',z:'工具调用',d:'模型主动调用外部程序（计算器、搜索、数据库）来完成任务。'},
 {c:'检索与智能体',e:'MCP',z:'模型上下文协议',d:'一套开放标准，让 AI 用统一方式连接外部数据源与工具。类似 AI 世界的 USB-C。'},
 {c:'检索与智能体',e:'Guardrail',z:'护栏',d:'厂商设置的安全过滤层，拦截违法违规或高风险请求。'},
 {c:'检索与智能体',e:'API',z:'应用程序接口',d:'让程序（而非人）调用模型能力的通道，按 token 计费。'},
 {c:'检索与智能体',e:'Multimodal Grounding',z:'多模态落地',d:'把语言描述与图像中的具体区域对应起来（如"圈出图中的故障点"）。'},

 {c:'产业与治理',e:'Open-weight',z:'开放权重',d:'模型文件可下载、可本地部署，数据不出校园。注意许可证可能限制商用。'},
 {c:'产业与治理',e:'Closed-source',z:'闭源',d:'只能通过官方网页或 API 使用，无法本地部署。'},
 {c:'产业与治理',e:'Alignment',z:'对齐',d:'让 AI 的目标与行为符合人类价值观，包括有用性、诚实性、无害性。'},
 {c:'产业与治理',e:'Watermarking',z:'水印',d:'在生成内容中嵌入可检测标记，用于溯源"这是 AI 生成的"。'},
 {c:'产业与治理',e:'Model Collapse',z:'模型坍缩',d:'持续用 AI 生成内容训练下一代 AI，模型会逐渐丧失多样性、退化。'}
];

(function(){
  const box=$('#glList'), cats=$('#glCats'), cnt=$('#glCount'), srch=$('#glSearch');
  if(!box)return;
  const CATS=['全部','基础概念','模型机制','提示与交互','检索与智能体','产业与治理'];
  cats.innerHTML=CATS.map(function(c){
    return '<span class="glc" data-c="'+c+'" style="cursor:pointer;display:inline-flex;align-items:center;padding:5px 14px;border-radius:999px;font-size:13px;font-weight:700;'
      +(c==='全部'?'background:var(--primary);color:#fff;':'background:var(--primary-l);color:var(--primary-d);')+'">'+c+'</span>';
  }).join('');
  const render=function(){
    const q=(srch.value||'').trim().toLowerCase();
    const list=GLOSSARY.filter(function(g){
      const okC = glCat==='全部' || g.c===glCat;
      const okQ = !q || (g.e+g.z+g.d).toLowerCase().indexOf(q)>=0;
      return okC && okQ;
    });
    cnt.textContent='共 '+(q||glCat!=='全部' ? list.length+' / '+GLOSSARY.length : GLOSSARY.length)+' 个术语';
    if(!list.length){ box.innerHTML='<p style="color:var(--muted);font-size:14px;padding:12px 0">没有匹配的术语，换个关键词试试。</p>'; return; }
    let h='<div class="cmp-wrap" style="overflow-x:auto"><table class="vocab-table"><tr><th style="width:24%">English</th><th style="width:14%">中文</th><th style="width:11%">类别</th><th>通俗解释</th></tr>';
    list.forEach(function(g){
      h+='<tr><td class="en" style="font-size:13.5px">'+g.e+'</td><td class="zh">'+g.z+'</td>'
        +'<td style="font-size:12px;color:var(--muted)">'+g.c+'</td><td style="font-size:13.5px;line-height:1.7">'+g.d+'</td></tr>';
    });
    h+='</table></div>';
    box.innerHTML=h;
  };
  cats.querySelectorAll('.glc').forEach(function(el){
    el.addEventListener('click',function(){
      glCat=el.dataset.c;
      cats.querySelectorAll('.glc').forEach(function(x){
        const on = x.dataset.c===glCat;
        x.style.background = on?'var(--primary)':'var(--primary-l)';
        x.style.color = on?'#fff':'var(--primary-d)';
      });
      render();
    });
  });
  srch.addEventListener('input',render);
  render();
  window.__GLOSSARY=GLOSSARY;
})();

/* ================= 导入打字机 ================= */
(function(){
  const txt='AI、机器学习、深度学习、生成式 AI、大模型——这五个词你分得清吗？很多人说"AI 会编造事实"，其实说的是"大模型会幻觉"，差别很大。这一章我们把这些词一层层剥开：从最外面的 AI 大筐，到最里面的 LLM；还会讲清 token 怎么切、上下文窗口怎么"忘事"、温度到底是什么。学完你能做到两件事：听懂别人聊 AI，以及——别人用术语忽悠你时，你能识别。📖';
  const box=$('#typedIntroA3'); if(!box)return;
  const io=new IntersectionObserver(function(es){
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=function(){ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();

window.__COURSE_REGISTER('ai3',{track:'track-ai3'});
})();
