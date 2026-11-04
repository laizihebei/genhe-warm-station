import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'], ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'], ['.pdf', 'application/pdf'],
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'], ['.webp', 'image/webp'], ['.glb', 'model/gltf-binary'],
  ['.zip', 'application/zip'], ['.skp', 'application/octet-stream'], ['.dae', 'model/vnd.collada+xml'],
  ['.mp4', 'video/mp4'], ['.srt', 'application/x-subrip; charset=utf-8']
]);

function resolveSiteFile(root, requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, 'http://127.0.0.1').pathname);
  } catch {
    return null;
  }
  const file = resolve(root, `.${pathname}`);
  const rel = relative(root, file);
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return null;
  return file;
}

export function createPreviewServer({ root = process.cwd() } = {}) {
  const siteRoot = resolve(root);
  return createServer(async (request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let file = resolveSiteFile(siteRoot, request.url || '/');
    if (!file) {
      response.writeHead(404).end('Not found');
      return;
    }
    try {
      let info = await stat(file);
      if (info.isDirectory()) {
        file = resolve(file, 'index.html');
        info = await stat(file);
      }
      if (!info.isFile()) throw new Error('Not a file');
      let start = 0, end = info.size - 1, status = 200;
      const rangeHeaders = {};
      if (request.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        let valid = Boolean(match && (match[1] || match[2]) && info.size > 0);
        if (valid && match[1]) {
          start = Number(match[1]);
          end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
          valid = Number.isSafeInteger(start) && Number.isSafeInteger(end) && start < info.size && start <= end;
        } else if (valid) {
          const suffix = Number(match[2]);
          valid = Number.isSafeInteger(suffix) && suffix > 0;
          start = Math.max(0, info.size - suffix);
        }
        if (!valid) {
          response.writeHead(416, { 'Content-Range': `bytes */${info.size}`, 'Accept-Ranges': 'bytes' }).end();
          return;
        }
        status = 206;
        rangeHeaders['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
      response.writeHead(status, {
        'Content-Type': contentTypes.get(extname(file).toLowerCase()) || 'application/octet-stream',
        'Content-Length': info.size ? end - start + 1 : 0,
        'Accept-Ranges': 'bytes',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
        ...rangeHeaders
      });
      if (request.method === 'HEAD' || info.size === 0) response.end();
      else createReadStream(file, { start, end }).pipe(response);
    } catch {
      if (!response.headersSent) response.writeHead(404).end('Not found');
      else response.destroy();
    }
  });
}

const executedFile = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : '';
if (import.meta.url === executedFile) {
  const port = Number(process.argv[2] || process.env.PORT || 4179);
  const server = createPreviewServer();
  server.listen(port, '127.0.0.1', () => {
    process.stdout.write(`冷极暖站本地预览：http://127.0.0.1:${port}/index.html\n`);
  });
}

