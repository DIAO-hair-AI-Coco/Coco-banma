#!/usr/bin/env node
/**
 * ci-check.mjs —— GitHub Actions 里的结构校验（无需浏览器，秒级完成）
 * 在 CI 的"已检出仓库"目录下运行，cwd = 仓库根。
 * 检查：必需文件、关键机制、课程 html/js 配对、注册完整性、图片引用、大文件。
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
let fail = 0;
const ok = (cond, msg) => { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) fail++; };
const walk = (dir, out = []) => { for (const f of readdirSync(dir)) { const p = join(dir, f); if (statSync(p).isDirectory()) walk(p, out); else out.push(p); } return out; };
const rel = p => relative(ROOT, p).replace(/\\/g, '/');

console.log('=== 结构校验（CI）===');

/* 1. 必需文件 */
for (const f of ['index.html', 'sw.js', 'manifest.json', 'icon.svg']) {
  ok(existsSync(join(ROOT, f)), '必需文件 ' + f);
}

/* 2. index.html 关键机制 */
const html = existsSync(join(ROOT, 'index.html')) ? readFileSync(join(ROOT, 'index.html'), 'utf8') : '';
ok(html.includes('__COURSE_REGISTER'), 'index.html 含课程注册机制');
ok(/window\.__VERSIONS=\{[^}]*\};/.test(html) && !/window\.__VERSIONS=\{\};/.test(html), 'index.html 已注入版本哈希（非空）');
ok(html.includes('function loadCourse'), 'index.html 含懒加载 loadCourse');
ok(html.includes('fileVer('), 'index.html 使用 fileVer 内容哈希');

/* 3. 课程 html/js 配对 */
const cdir = join(ROOT, 'courses');
const htmls = readdirSync(cdir).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5));
const jss = readdirSync(cdir).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
const onlyHtml = htmls.filter(f => !jss.includes(f));
const onlyJs = jss.filter(f => !htmls.includes(f));
ok(htmls.length > 0, '存在课程（' + htmls.length + ' 门）');
ok(onlyHtml.length === 0, '无缺 .js 的课程 .html' + (onlyHtml.length ? ' → ' + onlyHtml.join(',') : ''));
ok(onlyJs.length === 0, '无缺 .html 的课程 .js' + (onlyJs.length ? ' → ' + onlyJs.join(',') : ''));

/* 4. 每个课程 js 都注册 */
const unreg = jss.filter(f => !readFileSync(join(cdir, f + '.js'), 'utf8').includes('__COURSE_REGISTER'));
ok(unreg.length === 0, '所有课程 js 均已注册' + (unreg.length ? ' → 缺 ' + unreg.join(',') : ''));

/* 5. 图片引用都能解析到本地文件 */
const imgFiles = new Set(walk(join(ROOT, 'img')).map(rel));
const missing = [];
for (const p of [...walk(cdir), join(ROOT, 'index.html')]) {
  if (!/\.(html|js)$/.test(p)) continue;
  const t = readFileSync(p, 'utf8');
  for (const m of t.matchAll(/img\/[^"'\s)]+/g)) {
    const r = m[0].replace(/[?#].*$/, '');
    if (r.includes('.')) { if (!imgFiles.has(r)) missing.push(r + ' ← ' + rel(p)); }
  }
}
ok(missing.length === 0, '图片引用全部可解析（' + imgFiles.size + ' 个图片文件）');
missing.slice(0, 10).forEach(m => console.log('        ✗ ' + m));

/* 6. 无超大文件（仅检查站点文件，不扫描开发目录） */
const siteRootFiles = ['index.html', 'sw.js', 'manifest.json', 'icon.svg', 'server.py', 'README.md', '.gitignore']
  .map(f => join(ROOT, f)).filter(p => existsSync(p));
const siteDirs = ['courses', 'css', 'img', 'audio', '.github']
  .filter(d => existsSync(join(ROOT, d)))
  .flatMap(d => walk(join(ROOT, d)));
const big = [...siteRootFiles, ...siteDirs].filter(p => statSync(p).size > 5 * 1024 * 1024).map(rel);
ok(big.length === 0, '无 >5MB 的超大文件' + (big.length ? ' → ' + big.join(', ') : ''));

/* 7. 无残留旧格式图片引用（应全部 webp） */
const oldImg = [];
for (const p of walk(cdir)) {
  if (!/\.(html|js)$/.test(p)) continue;
  const t = readFileSync(p, 'utf8');
  for (const m of t.matchAll(/img\/[^"'\s)]+\.(png|jpg|jpeg)/gi)) oldImg.push(m[0] + ' ← ' + rel(p));
}
ok(oldImg.length === 0, '无残留 png/jpg 引用（已全转 webp）' + (oldImg.length ? ' → ' + oldImg.slice(0, 5).join(', ') : ''));

console.log('\n' + (fail === 0 ? '✅ 结构校验通过' : '❌ 结构校验失败 ' + fail + ' 项'));
process.exit(fail === 0 ? 0 : 1);
