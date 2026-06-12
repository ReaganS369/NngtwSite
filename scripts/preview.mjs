import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
]);

function resolveRequest(url = '/') {
  const requestedPath = decodeURIComponent(url.split('?')[0]);
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = join(root, safePath === '/' ? 'index.html' : safePath);
  if (!filePath.startsWith(root)) return null;
  if (existsSync(filePath) && statSync(filePath).isFile()) return filePath;
  return join(root, 'index.html');
}

const server = createServer((request, response) => {
  const filePath = resolveRequest(request.url);
  if (!filePath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  response.writeHead(200, {
    'Content-Type': types.get(extname(filePath)) || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`NNGTW Studio preview running at http://localhost:${port}`);
});
