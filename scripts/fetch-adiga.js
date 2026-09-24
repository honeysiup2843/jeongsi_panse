#!/usr/bin/env node
/* 대교협 대입정보포털 「어디가」에서 정시(수능위주) 전형 결과를 내려받는다.

   node scripts/fetch-adiga.js [대학코드 ...]      (코드 생략 시 UNIV_CODES 전체)

   → data/adiga/raw/<대학코드>_<결과학년도>.json

   · 「어디가」는 searchSyr=N 화면에 (N-1)학년도 결과를 싣는다. 2024~2027을 조회해
     2023~2026학년도 결과를 받는다.
   · 서버 부담을 줄이려고 요청 사이에 쉰다. 이미 받은 파일은 건너뛴다.
   · node 18+ 내장 fetch만 쓴다 (npm install 불필요).
     프록시 뒤에서는 NODE_USE_ENV_PROXY=1 을 붙여 실행한다 (내장 fetch는 HTTPS_PROXY를 안 읽음). */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data/adiga/raw');
const BASE = 'https://www.adiga.kr';
const SEARCH_SYRS = [2024, 2025, 2026, 2027];
const DELAY_MS = 600;

// 앱에 실린 35개 대학의 「어디가」 대학코드 (모두 [본교])
const UNIV_CODES = {
  snu: '0000019', yon: '0000149', kor: '0000069', skk: '0000133', sog: '0000120',
  han: '0000203', cau: '0000175', khu: '0000066', ewh: '0000163', uos: '0000040',
  hufs: '0000192', kku: '0000052', dgu: '0000100', hong: '0000212', sook: '0000141',
  ssu: '0000143', sej: '0000138', kmu: '0000078', kw: '0000074', mju: '0000109',
  dku: '0000082', ssw: '0000136', gch: '0000063', aju: '0000146', inh: '0000169',
  kgu: '0000056', pnu: '0000014', knu: '0000005', cnu: '0000029', jnu: '0000023',
  cbu: '0000030', jbu: '0000025', kwu: '0000003', snue: '0000255', gine: '0000256'
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
const unesc = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const strip = s => unesc(s.replace(/<[^>]+>/g, '')).trim();
const num = s => { const v = parseFloat(String(s).replace(/,/g, '')); return Number.isFinite(v) ? v : null; };

let cookie = '', csrf = '';
async function session() {
  const r = await fetch(BASE + '/ucp/uvt/uni/univView.do?menuId=PCUVTINF2000');
  cookie = (r.headers.getSetCookie ? r.headers.getSetCookie() : [r.headers.get('set-cookie') || ''])
    .map(c => c.split(';')[0]).join('; ');
  const m = (await r.text()).match(/name="_csrf" value="([^"]+)"/);
  if (!m) throw new Error('CSRF 토큰을 찾지 못함');
  csrf = m[1];
}
async function fetchResult(unvCd, syr) {
  const r = await fetch(BASE + '/uct/acd/ade/criteriaAndResultItemNewAjax.do', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRF-TOKEN': csrf, 'X-Requested-With': 'XMLHttpRequest', Cookie: cookie },
    // tsrdCmphSlcnArtclUpCd=40 : 「Ⅳ. 수능위주전형」
    body: new URLSearchParams({ searchSyr: String(syr), unvCd, tsrdCmphSlcnArtclUpCd: '40', compUnvCd: '' })
  });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.text();
}

/* 결과 표 파싱. 한 행 = 31칸:
   구분·모집단위 | 모집인원(최초·이월·최종) | 경쟁률 | 충원 | 환산점수(50%·70%) |
   백분위 50%(국·수·탐1 사/과/직·탐2 사/과/직·평균·한국사·영어) | 백분위 70%(같은 11칸) */
const PCT_KEYS = ['kor', 'math', 't1s', 't1g', 't1j', 't2s', 't2g', 't2j', 'avg', 'hist', 'eng'];
function parse(html) {
  const rows = [];
  for (const blk of html.split('<div class="tbAdmRes">').slice(1)) {
    const t = blk.match(/<h5[^>]*>([\s\S]*?)<\/h5>/);
    const track = t ? strip(t[1]) : '';
    const body = (blk.split('<tbody>')[1] || '').split('</tbody>')[0];
    for (const tr of body.match(/<tr>[\s\S]*?<\/tr>/g) || []) {
      const tds = [...tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => strip(m[1]));
      if (tds.length < 2) continue;
      const row = { track, gun: tds[0], unit: tds[1] };
      if (tds.length >= 31) {
        const v = tds.slice(2).map(num);
        Object.assign(row, { first: v[0], carry: v[1], final: v[2], rate: v[3], extra: v[4],
          conv50: v[5], conv70: v[6] });
        row.p50 = Object.fromEntries(PCT_KEYS.map((k, i) => [k, v[7 + i]]));
        row.p70 = Object.fromEntries(PCT_KEYS.map((k, i) => [k, v[18 + i]]));
      } else {
        row.note = tds.slice(2).filter(x => x && !/^[\d.]+$/.test(x)).join(' ');
      }
      rows.push(row);
    }
  }
  return rows;
}

async function main() {
  const codes = process.argv.slice(2).length ? process.argv.slice(2) : Object.values(UNIV_CODES);
  fs.mkdirSync(OUT, { recursive: true });
  await session();
  for (const code of codes) for (const syr of SEARCH_SYRS) {
    const file = path.join(OUT, `${code}_${syr - 1}.json`);
    if (fs.existsSync(file)) continue;
    let rows = null;
    for (let a = 0; a < 3 && !rows; a++) {
      try { rows = parse(await fetchResult(code, syr)); }
      catch (e) {
        console.error(`  ! ${code} ${syr}: ${e.message} — 재시도`);
        await sleep(5000 * (a + 1));
        try { await session(); } catch (e2) { /* 다음 시도에서 다시 */ }
      }
    }
    if (!rows) { console.error(`  ✗ ${code} ${syr} 실패`); continue; }
    fs.writeFileSync(file, JSON.stringify({ source: 'adiga.kr', unvCd: code, searchSyr: syr,
      resultYear: syr - 1, fetchedAt: new Date().toISOString().slice(0, 10), rows }));
    console.log(`✓ ${code} ${syr - 1}학년도 ${rows.length}행`);
    await sleep(DELAY_MS);
  }
}

if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
module.exports = { parse, UNIV_CODES };
