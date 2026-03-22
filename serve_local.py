from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "4173"))
HOST = os.environ.get("HOST", "127.0.0.1")

os.chdir(ROOT)

server = ThreadingHTTPServer((HOST, PORT), SimpleHTTPRequestHandler)
print(f"Serving GitaFlow Local MVP at http://{HOST}:{PORT}")
print(f"Root: {ROOT}")
print("Press Ctrl+C to stop.")

try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nStopping server...")
finally:
    server.server_close()
