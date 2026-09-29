/* ================================================================
   Service Worker —— 缓存策略
   历史问题：旧版对「非首页」资源一律缓存优先，导致更新课程文件后，
             用户浏览器一直先拿到旧版本（"没看到新增内容"）。
   现行策略：
     · 音频 / 图标 / manifest  → 缓存优先（内容基本不变，省流量）
     · 其余所有同源资源        → 网络优先，失败才回退缓存（更新即时生效，且仍可离线）
   另外 index.html 会给 courses/*.html、courses/*.js 带 ?v=版本号，
   进一步保证一次刷新即可拿到新版本。
================================================================ */
const CACHE = 'dse-v2';

function isImmutable(path){
  return path.indexOf('/audio/') !== -1
      || path.endsWith('/icon.svg')
      || path.endsWith('/manifest.json');
}
function offlineResponse(){
  return new Response('<h1>离线</h1><p>当前无网络，且该资源未被缓存。</p>',
    {status:200, headers:{'Content-Type':'text/html;charset=utf-8'}});
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(['./manifest.json','./icon.svg']).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   /* 第三方 CDN 不介入 */

  /* ---- 缓存优先：音频、图标、manifest ---- */
  if (isImmutable(url.pathname)) {
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok) {
          const cl = res.clone();
          const c = await caches.open(CACHE);
          c.put(req, cl);
        }
        return res;
      } catch (err) {
        return offlineResponse();
      }
    })());
    return;
  }

  /* ---- 网络优先：index.html、courses/*.html、courses/*.js 等 ---- */
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res.ok) {
        const cl = res.clone();
        const c = await caches.open(CACHE);
        c.put(req, cl);
      }
      return res;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      const idx = await caches.match('./index.html');
      if (idx) return idx;
      return offlineResponse();
    }
  })());
});
