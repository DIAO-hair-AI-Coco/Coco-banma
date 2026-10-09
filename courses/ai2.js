/* ================================================================
   生成式AI教程 · 第 2 课：正确认识 AI
   含三个自制交互图表（无外部依赖、无图片，全部程序化生成）
================================================================ */
(function(){
'use strict';

/* ================= 交互一：预测下一个词（含温度滑块） ================= */
const CANDS=[
  {w:'机械能', p:62},
  {w:'热能',   p:18},
  {w:'电能',   p:9},
  {w:'动力',   p:6},
  {w:'光能',   p:3},
  {w:'化学能', p:2}
];
(function(){
  const box=$('#nextWordDemo'); if(!box)return;
  box.innerHTML=
    '<div style="background:#0d1b36;border-radius:14px;padding:18px 20px;color:#dbe7ff">'
    + '<div style="font-size:13px;color:#7dd3fc;font-weight:800;letter-spacing:1px;margin-bottom:10px">输入（提示词）</div>'
    + '<div style="font-size:17px;line-height:1.8;font-family:inherit">'
    +   '汽车发动机的作用是把燃料的化学能转化为'
    +   '<span id="nwSlot" style="display:inline-block;min-width:74px;border-bottom:3px solid #38bdf8;color:#fbbf24;font-weight:800;text-align:center;transition:.3s">？</span>'
    +   '。'
    + '</div>'
    + '<div style="font-size:13px;color:#7dd3fc;font-weight:800;letter-spacing:1px;margin:18px 0 10px">模型的候选词与概率</div>'
    + '<div id="nwBars"></div>'
    + '<div style="display:flex;align-items:center;gap:12px;margin-top:16px;flex-wrap:wrap">'
    +   '<button class="btn" id="nwRun" style="padding:9px 22px;font-size:14px">🎲 生成下一个词</button>'
    +   '<span style="font-size:13px;color:#9db8e6">温度 temperature</span>'
    +   '<input type="range" id="nwTemp" min="0" max="100" value="30" style="flex:1;min-width:130px;accent-color:#38bdf8">'
    +   '<span id="nwTempVal" style="font-size:13px;color:#fbbf24;font-weight:800;min-width:96px">0.3（较稳定）</span>'
    + '</div>'
    + '<div id="nwNote" style="margin-top:12px;font-size:13px;line-height:1.7;color:#9db8e6">'
    +   '👆 点「生成下一个词」试一次。默认温度较低，它会倾向挑概率最高的词。'
    + '</div>'
    + '</div>';

  const bars=$('#nwBars');
  CANDS.forEach(function(c,i){
    const row=document.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:10px;margin:7px 0;font-size:13.5px';
    row.innerHTML='<span style="width:62px;color:#dbe7ff;font-weight:700;text-align:right">'+c.w+'</span>'
      +'<span style="flex:1;height:17px;background:rgba(255,255,255,.07);border-radius:9px;overflow:hidden;display:block">'
      +'<i id="nwBar'+i+'" style="display:block;height:100%;width:0;background:linear-gradient(90deg,#38bdf8,#818cf8);border-radius:9px;transition:width .5s"></i></span>'
      +'<span id="nwPct'+i+'" style="width:44px;color:#9db8e6;font-size:12.5px;text-align:right">'+c.p+'%</span>';
    bars.appendChild(row);
  });

  const temp=$('#nwTemp'), tempVal=$('#nwTempVal'), slot=$('#nwSlot'), note=$('#nwNote');
  let t=0.3;
  const showBars=function(){
    CANDS.forEach(function(c,i){ const b=$('#nwBar'+i); if(b)b.style.width=c.p+'%'; });
  };
  showBars();

  temp.addEventListener('input',function(){
    t=+temp.value/100;
    const label = t<0.25?'（很稳定）' : t<0.55?'（较稳定）' : t<0.8?'（较发散）' : '（很随机）';
    tempVal.textContent=t.toFixed(1)+label;
  });

  $('#nwRun').addEventListener('click',function(){
    slot.textContent='…'; slot.style.color='#7dd3fc';
    const btn=this; btn.disabled=true;
    CANDS.forEach(function(c,i){ const b=$('#nwBar'+i); if(b)b.style.width='0%'; });
    setTimeout(function(){
      showBars();
      /* 按温度调整权重：温度低→放大高概率；温度高→拉平 */
      const k = t<0.01 ? 0.02 : t*2.2;
      const adj = CANDS.map(function(c){ return Math.pow(c.p/100, 1/k); });
      const sum = adj.reduce(function(a,b){return a+b;},0);
      const probs = adj.map(function(a){ return a/sum; });
      let r=Math.random(), pick=0;
      for(let i=0;i<probs.length;i++){ if(r<probs[i]){pick=i;break;} r-=probs[i]; pick=i; }
      setTimeout(function(){
        slot.textContent=CANDS[pick].w;
        slot.style.color = pick===0 ? '#4ade80' : (pick<=2 ? '#fbbf24' : '#f87171');
        $('#nwBar'+pick).style.background='linear-gradient(90deg,#4ade80,#22c55e)';
        CANDS.forEach(function(c,i){ if(i!==pick){ const b=$('#nwBar'+i); if(b)b.style.background='linear-gradient(90deg,#38bdf8,#818cf8)'; } });
        note.innerHTML = pick===0
          ? '✅ 它挑中了概率最高的「<b style="color:#4ade80">'+CANDS[pick].w+'</b>」——这通常是"最安全"的答案。'
          : '⚠️ 它挑中了概率较低的「<b style="color:#fbbf24">'+CANDS[pick].w+'</b>」。<b>注意：概率低 ≠ 一定错，但概率低意味着"不太常见"，需要你核对。</b>';
        note.innerHTML += '<br>💡 <b>关键：它只是按概率挑了一个词，并没有"判断对错"这一步。</b>把温度调高再点几次，你会看到它挑出完全不同的词。';
        btn.disabled=false;
      },260);
    },240);
  });
})();

/* ================= 交互二：四象限风险矩阵 ================= */
(function(){
  const box=$('#quadrant'); if(!box)return;
  const Q=[
    {t:'我熟悉 + 我能验证',r:'✅ 最安全',c:'#22c55e',bg:'#f0fdf4',
     d:'放心用。你有能力判断它对不对——这是 AI 最能帮上忙的场景。',
     ex:'例：让 AI 帮你改写自己写过很多遍的教案；让它按你的样例出题，你逐题审。'},
    {t:'我熟悉 + 我不易验证',r:'⚠️ 抽样核对',c:'#f59e0b',bg:'#fffbeb',
     d:'可以试，但要抽样查证。你懂这个领域，能看出"哪里不对劲"。',
     ex:'例：让它查一个你熟悉领域的老数据；让它复述你熟悉的规章条款。'},
    {t:'我不熟悉 + 我能验证',r:'🔍 可以试，必须查证',c:'#3b82f6',bg:'#eff6ff',
     d:'当"入门老师"用可以，但每一条都要另找来源。它的作用是帮你快速建立框架，不是给你答案。',
     ex:'例：让它解释一个你没学过的新概念，然后去查教材或权威资料核对。'},
    {t:'我不熟悉 + 我不能验证',r:'🚨 最危险',c:'#ef4444',bg:'#fef2f2',
     d:'⭐ 这就是本章那句话说的场景。你没有任何能力发现它在骗你。',
     ex:'例：让它给一个你没学过的领域写参考文献、法律意见、医学建议——它会编得煞有介事。'}
  ];
  let html='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(232px,1fr));gap:13px;margin:8px 0 12px">';
  Q.forEach(function(q,i){
    html+='<button class="pg" data-q="'+i+'" style="text-align:left;border-top:4px solid '+q.c+';background:'+q.bg+'">'
      +'<b style="color:'+q.c+';font-family:inherit;font-size:13.5px">'+q.t+'</b>'
      +'<span style="color:#334155;font-weight:800;font-size:14px;margin-top:7px">'+q.r+'</span></button>';
  });
  html+='</div><div id="qOut" class="plug-out"></div>';
  box.innerHTML=html;
  const out=$('#qOut');
  const show=function(i){
    const q=Q[i];
    box.querySelectorAll('.pg').forEach(function(b){ b.classList.toggle('on', +b.dataset.q===i); });
    out.innerHTML='<b style="color:'+q.c+'">'+q.t+'　'+q.r+'</b><br>'+q.d
      +'<br><span style="color:#7dd3fc">'+q.ex+'</span>';
  };
  box.querySelectorAll('.pg').forEach(function(b){
    b.addEventListener('click',function(){ show(+b.dataset.q); });
  });
  show(3);
})();

/* ================= 交互三：幻觉成因流程图 ================= */
(function(){
  const box=$('#halluFlow'); if(!box)return;
  const steps=[
    {n:'1',t:'你提出一个问题',d:'模型开始工作——注意，它不是在"检索答案"。',c:'#3b82f6'},
    {n:'2',t:'它计算"下一个词最可能是什么"',d:'基于训练时见过的海量文字，它给每个候选词打分。',c:'#6366f1'},
    {n:'3',t:'训练数据里有相关知识吗？',d:'这是唯一的"分岔口"。',c:'#8b5cf6',branch:true},
    {n:'4a',t:'有 → 输出一个"统计上很合理"的答案',d:'⚠️ 但注意：即便如此，也可能与事实有偏差、或已经过时。',c:'#f59e0b',branchYes:true},
    {n:'4b',t:'没有 → 它不会说"我不知道"',d:'因为在训练数据里，"我不知道"出现的概率，远低于"一个看起来完整的答案"。',c:'#ef4444',branchNo:true},
    {n:'5',t:'于是它编一个"最像真的"答案',d:'⭐ 这就是幻觉。而且语气自信、格式工整——这让它格外有欺骗性。',c:'#ef4444'}
  ];
  let h='<div style="margin:8px 0">';
  steps.forEach(function(s,i){
    h+='<div style="display:flex;gap:13px;align-items:flex-start;margin:0">'
      +'<div style="flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:'+s.c+';color:#fff;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,.15)">'+s.n+'</div>'
      +'<div style="flex:1;min-width:0;padding:7px 0 14px">'
      +  '<div style="font-size:15px;font-weight:800;color:'+s.c+'">'+s.t+'</div>'
      +  '<div style="font-size:13.5px;color:var(--muted);line-height:1.75;margin-top:4px">'+s.d+'</div>'
      +'</div></div>';
    if(i<steps.length-1){
      h+='<div style="margin-left:16px;width:2px;height:16px;background:linear-gradient(180deg,'+s.c+','
        + (steps[i+1].c||'#94a3b8') +');opacity:.45"></div>';
    }
  });
  h+='</div>';
  box.innerHTML=h;
})();

/* ================= 导入打字机 ================= */
(function(){
  const txt='市面上的 AI 课大多在讲"AI 多厉害"。这一章我们讲点别的：AI 到底会在哪里翻车。它不是"知道答案"，而是在"预测下一个词"——这一个原理，就解释了它为什么会编造文献、为什么算错数、为什么你一质疑它就道歉。我们还会看三项真实研究：用得对，学习增益相当于 1.5 到 2 年；用得随意，通用 AI 反而会损害学习。学完这一章，你带走的最重要的一句话是——AI 在你陌生的领域最危险。🧠';
  const box=$('#typedIntroA2'); if(!box)return;
  const io=new IntersectionObserver(function(es){
    if(es[0].isIntersecting){ io.disconnect();
      let i=0; const step=function(){ if(i<=txt.length){ box.innerHTML=txt.slice(0,i)+'<span class="caret"></span>'; i++; setTimeout(step,50); } else box.innerHTML=txt+'<span class="caret"></span>'; };
      setTimeout(step,400);
    }
  },{threshold:.2});
  io.observe(box);
})();

window.__COURSE_REGISTER('ai2',{track:'track-ai2'});
})();
