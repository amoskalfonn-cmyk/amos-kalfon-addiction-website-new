import fs from 'node:fs';
import path from 'node:path';
const repo = process.cwd();
const htmlFiles = [];
function walk(dir){
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if (entry.name === '.git' || entry.name === '04_NETLIFY_RELEASES') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(repo);
const aiCss = [];
const aiJs = [];
const missing = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('/css/ai-website-guide.css')) aiCss.push(path.relative(repo,file));
  if (html.includes('/js/ai-website-guide.js')) aiJs.push(path.relative(repo,file));
  for (const m of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const value = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(value)) continue;
    let clean = value.split('?')[0].replace(/^\//, '');
    if (!clean || clean.endsWith('/')) continue;
    if (!path.extname(clean)) continue;
    const target = path.join(repo, clean);
    const relativeTarget = path.join(path.dirname(file), clean);
    if (!fs.existsSync(target) && !fs.existsSync(relativeTarget)) missing.push({ file: path.relative(repo,file), value });
  }
}
console.log(JSON.stringify({ htmlPages: htmlFiles.length, aiCssPages: aiCss.length, aiJsPages: aiJs.length, missingAssets: missing.slice(0,10), missingAssetsCount: missing.length }));
