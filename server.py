# support for WASM, ES6 modules, utf-8 chraset, etc
import http.server
import socketserver

PORT = 8000

class HttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        '': 'application/octet-stream',
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg':	'image/svg+xml',
        '.css':	'text/css; charset=utf-8',
        '.js':'text/javascript; charset=utf-8',
        '.wasm': 'application/wasm',
        '.json': 'application/json',
        '.xml': 'application/xml',
    }

httpd = socketserver.TCPServer(("", PORT), HttpRequestHandler)

try:
    print(f"serving at http://*:{PORT}")
    httpd.serve_forever()
except KeyboardInterrupt:
    pass