# -*- coding: utf-8 -*-
"""
汽车专业英语 · 发动机课程 本地静态服务器（固化服务版）
- 多线程 HTTP 服务，绑定 0.0.0.0:8080，供 cloudflared 隧道转发
- 日志写入 server.log（UTF-8）
运行：pythonw server.py  或  python server.py
"""
import os, sys, time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

BASE = os.path.dirname(os.path.abspath(__file__))
LOG = os.path.join(BASE, 'server.log')
PORT = 8080

def log(msg):
    line = '[%s] %s' % (time.strftime('%Y-%m-%d %H:%M:%S'), msg)
    try:
        with open(LOG, 'a', encoding='utf-8') as f:
            f.write(line + '\n')
    except Exception:
        pass
    print(line, flush=True)

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=BASE, **kw)
    def log_message(self, fmt, *args):
        log('%-6s %s' % (self.command, self.address_string()) + ' -> ' + (fmt % args))
    def end_headers(self):
        # 允许局域网/隧道访问时不被缓存卡住
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

Handler.extensions_map.update({
    '.js': 'application/javascript; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
})

def main():
    os.chdir(BASE)
    try:
        srv = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    except OSError as e:
        log('端口 %d 被占用：%s' % (PORT, e))
        sys.exit(1)
    log('DSEngineServer 已启动：http://0.0.0.0:%d  （目录 %s）' % (PORT, BASE))
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        log('DSEngineServer 已停止')

if __name__ == '__main__':
    main()
