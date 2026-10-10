# Coco-banma · 汽车专业英语互动教学网站

单页应用（SPA）+ PWA，零构建工具，纯 HTML/CSS/JS，部署在 GitHub Pages。

- 🌐 线上地址：<https://DIAO-hair-AI-Coco.github.io/Coco-banma/>
- 👩‍🏫 授课人：孔梦琳

## 专辑结构

| 专辑 | 课数 | 说明 |
|---|---|---|
| 🚗 汽车专业英语 | 6 | 发动机 / 活塞连杆 / 燃油系统 / 润滑冷却 / 离合器 / 变速器（含爆炸图 + 3D + 双语动画 + 闯关练习） |
| 🤖 生成式AI教程 | 3 | 正确认识AI / 基本术语 / DSH 部署（含真实截图） |
| 🕹️ AI Agent 教程 | 14 | 转载自菜鸟教程 runoob.com |

## 目录结构

```
index.html        框架（含全部 CSS/JS 与课程元数据，单文件）
courses/*.html    各课程的页面 HTML（懒加载）
courses/*.js      各课程的交互逻辑（懒加载，末尾调 __COURSE_REGISTER 注册）
css/              样式（agent.css、katex.min.css + 字体）
img/              图片（已全转 WebP）
audio/            单词发音（MP3）
sw.js             Service Worker（网络优先 + 离线回退）
manifest.json     PWA 清单
server.py         本地服务器（0.0.0.0:8080，局域网可访问）
install_service.bat / start_server.vbs   本地服务器随开机自启（需管理员）
.github/          GitHub Actions CI
_tools/           部署脚本 + 测试套件（不随仓库发布）
```

> 📌 **整个文件夹是可移植的**：直接复制到任何电脑、任何盘符/目录都能用。
> 所有脚本都用「相对自身位置」定位，没有写死盘符路径。
> 新电脑接手请看 **[【新电脑接手说明】.md](【新电脑接手说明】.md)**。

## 资源版本号

懒加载资源的 `?v=` 版本号由**文件内容哈希**自动生成，无需手动维护：

```bash
node _tools/deploy.mjs "提交说明"   # 自动算哈希 → 注入 → 只传改动文件
node _tools/build-version.mjs        # 只算哈希并注入，不上传
```

## 部署

本机 `github.com` 的 git 端点可能不可达，故用 **GitHub contents API** 上传（效果同 `git push`）：

```bash
node _tools/deploy.mjs "deploy: 站点更新"
```

流程：**内容哈希注入 → 本地结构校验门禁（不过就中止）→ 只上传有变化的文件 → 更新状态**。

上传后 GitHub Actions 会自动再跑一次云端 `ci-check`（双保险）。

## 本地预览

```bash
python server.py   # 端口 8080
```

## 测试

```bash
pwsh -File _tools/_runall.ps1          # 全量回归（本地）
pwsh -File _tools/_runall.ps1 -Live    # 线上回归
```

> 说明：`_tools/` 及内部文档（*.md）均被 `.gitignore` 排除，不会进入公开仓库。
