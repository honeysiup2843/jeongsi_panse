#!/usr/bin/env node
/* src/{data.js, univs.js, engine.js, app.html} → dist/index.html (단일 파일)
   Artifact 게시본은 <!doctype>/<html>/<head>/<body> 없이 본문만 담는다. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const data = read('src/data.js') + '\n' + read('src/univs.js');
const engine = read('src/engine.js');
let html = read('src/app.html');

for (const [tag, src] of [['/*__DATA__*/', data], ['/*__ENGINE__*/', engine]]) {
  if (!html.includes(tag)) { console.error('플레이스홀더 없음: ' + tag); process.exit(1); }
  html = html.replace(tag, src);
}

/* 게시 규칙 검증 */
const errs = [];
for (const t of ['<!doctype', '<html', '<head>', '<body']) {
  if (html.toLowerCase().includes(t)) errs.push(`금지 태그 포함: ${t}`);
}
if (!/<title>[^<]+<\/title>/.test(html)) errs.push('<title> 없음');
if (/__[A-Z_]+__/.test(html)) errs.push('치환되지 않은 플레이스홀더 남음');
const cdn = [...html.matchAll(/https?:\/\/([^\/"']+)/g)].map(m => m[1]);
const allow = new Set(['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com']);
for (const h of new Set(cdn)) if (!allow.has(h)) errs.push(`허용되지 않은 외부 호스트: ${h}`);

if (errs.length) { errs.forEach(e => console.error('  ✗ ' + e)); process.exit(1); }

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/index.html'), html);

/* 로컬 미리보기용 래퍼 (Artifact가 붙여주는 골격을 흉내) */
fs.writeFileSync(path.join(ROOT, 'dist/preview.html'),
  '<!doctype html><html><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<style>body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style>' +
  '</head><body>' + html + '</body></html>');

console.log(`✓ dist/index.html  ${(html.length / 1024).toFixed(1)}KB`);
console.log(`✓ dist/preview.html (로컬 확인용)`);
