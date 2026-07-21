import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleAiGuide } from '../netlify/lib/ai-guide-core.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 8891);
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.ico', 'image/x-icon'],
  ['.svg', 'image/svg+xml']
]);

process.env.AI_GUIDE_ENABLED = process.env.AI_GUIDE_ENABLED || 'true';
process.env.AI_GUIDE_USE_MOCK = process.env.AI_GUIDE_USE_MOCK || 'true';
process.env.AI_GUIDE_ENV = process.env.AI_GUIDE_ENV || 'development';
delete process.env.OPENAI_API_KEY;

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; if (body.length > 20000) reject(new Error('too_large')); });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname === '/.netlify/functions/ai-guide') {
      const body = await readBody(req);
      const previousEnabled = process.env.AI_GUIDE_ENABLED;
      if (body.includes('ai_disabled')) process.env.AI_GUIDE_ENABLED = 'false';
      const result = await handleAiGuide({
        httpMethod: req.method,
        headers: { 'x-forwarded-for': req.socket.remoteAddress || 'local-qa' },
        body
      });
      process.env.AI_GUIDE_ENABLED = previousEnabled;
      return send(res, result.statusCode, result.headers || {}, result.body || '');
    }

    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    if (!path.extname(pathname)) pathname += '.html';
    const file = path.resolve(repo, `.${pathname}`);
    if (!file.startsWith(repo) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      return send(res, 404, { 'content-type': 'text/plain; charset=utf-8' }, 'not found');
    }
    const ext = path.extname(file).toLowerCase();
    send(res, 200, { 'content-type': mime.get(ext) || 'application/octet-stream' }, fs.readFileSync(file));
  } catch (error) {
    send(res, 500, { 'content-type': 'text/plain; charset=utf-8' }, error.message);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(JSON.stringify({ mockQaServer: true, port }));
});
