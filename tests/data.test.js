/* 데이터 불변식 검증 — CLAUDE.md「데이터 규칙」과 1:1 대응 */
const { PROFILES, UNIVS } = require('./_load');
const { group, ok, info, done } = require('./harness');

group('[D1] 반영비율 프로필');
{
  const bad = [];
  for (const [k, p] of Object.entries(PROFILES)) {
    const sum = p.ratio.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 100) > 0.05) bad.push(`${k}: 합계 ${sum}`);
    if (p.ratio.length !== 4) bad.push(`${k}: ratio 길이 ${p.ratio.length}`);
    if (p.ratio.some(x => x < 0)) bad.push(`${k}: 음수 비율`);
    if (p.engT.length !== 9) bad.push(`${k}: engT 길이 ${p.engT.length}`);
    if (!['std', 'pct'].includes(p.base)) bad.push(`${k}: base=${p.base}`);
    if (!['ratio', 'penalty'].includes(p.engMode)) bad.push(`${k}: engMode=${p.engMode}`);
    if (p.engMode === 'ratio' && p.ratio[2] === 0) bad.push(`${k}: ratio형인데 영어 비율 0`);
    if (p.engMode === 'penalty' && p.ratio[2] !== 0) bad.push(`${k}: penalty형인데 영어 비율 ${p.ratio[2]}`);
    if (!['c', 'e'].includes(p.conf)) bad.push(`${k}: conf=${p.conf}`);
  }
  ok('모든 프로필이 규칙을 만족', bad.length === 0, bad.slice(0, 5).join(' / '));
  info(`프로필 ${Object.keys(PROFILES).length}종`);
}

group('[D2] 영어 환산표 단조성');
{
  const bad = [];
  for (const [k, p] of Object.entries(PROFILES))
    for (let i = 1; i < 9; i++)
      if (p.engT[i] > p.engT[i - 1]) bad.push(`${k}: ${i}→${i + 1}등급에서 점수 상승`);
  ok('등급이 낮아질수록 환산점수가 오르지 않음', bad.length === 0, bad.slice(0, 3).join(' / '));
}

group('[D3] 대학·학과');
{
  const missing = [], badCut = [], badMg = [], badG = [];
  const seen = new Set(), dupIds = [], dupDepts = [];
  let n = 0;
  for (const u of UNIVS) {
    if (seen.has(u.id)) dupIds.push(u.id); seen.add(u.id);
    const dn = new Set();
    for (const d of u.depts) {
      n++;
      if (dn.has(d.n)) dupDepts.push(`${u.name} ${d.n}`); dn.add(d.n);
      if (!PROFILES[d.p]) missing.push(`${u.name} ${d.n} → ${d.p}`);
      if (!(d.cut > 0 && d.cut <= 100)) badCut.push(`${u.name} ${d.n}: ${d.cut}`);
      if (!['가', '나', '다'].includes(d.mg)) badMg.push(`${u.name} ${d.n}: ${d.mg}`);
      if (!['인문', '자연', '의약'].includes(d.g)) badG.push(`${u.name} ${d.n}: ${d.g}`);
    }
  }
  ok('참조하는 프로필이 모두 존재', missing.length === 0, missing.slice(0, 3).join(' / '));
  ok('합격선이 0~100 백분위 범위', badCut.length === 0, badCut.slice(0, 3).join(' / '));
  ok('모집군이 가/나/다 중 하나', badMg.length === 0, badMg.slice(0, 3).join(' / '));
  ok('계열이 인문/자연/의약 중 하나', badG.length === 0, badG.slice(0, 3).join(' / '));
  ok('대학 id 중복 없음', dupIds.length === 0, dupIds.join(' / '));
  ok('한 대학 안에서 학과명 중복 없음', dupDepts.length === 0, dupDepts.slice(0, 3).join(' / '));
  info(`대학 ${UNIVS.length}개 · 학과 ${n}개`);

  const conf = UNIVS.flatMap(u => u.depts.map(d => d.conf));
  info(`출처 확인 ${conf.filter(c => c === 'c').length}개 · 추정 ${conf.filter(c => c === 'e').length}개`);
  const mg = UNIVS.flatMap(u => u.depts.map(d => d.mg)).reduce((a, x) => (a[x] = (a[x] || 0) + 1, a), {});
  info(`모집군 분포 ${JSON.stringify(mg)}`);
}

group('[D5] 학년도별 합격선 (「어디가」 원자료)');
{
  const bad = [];
  for (const u of UNIVS) for (const d of u.depts) {
    const tag = `${u.name} ${d.n}`;
    if (!d.cuts) { bad.push(`${tag}: cuts 없음`); continue; }
    const ys = Object.keys(d.cuts).map(Number);
    if (!ys.length || ys.some(y => y < 2023 || y > 2026)) bad.push(`${tag}: 학년도 ${ys}`);
    if (d.cy !== Math.max(...ys)) bad.push(`${tag}: cy ${d.cy} ≠ 최신 ${Math.max(...ys)}`);
    if (d.cut !== d.cuts[d.cy]) bad.push(`${tag}: cut ${d.cut} ≠ cuts[${d.cy}]`);
    if (d.conf !== d.cconf[d.cy]) bad.push(`${tag}: conf ≠ cconf[${d.cy}]`);
    if (Object.values(d.cuts).some(v => !(v > 0 && v <= 100))) bad.push(`${tag}: 범위 밖 합격선`);
    if (Object.values(d.eng || {}).some(g => !(g >= 1 && g <= 9))) bad.push(`${tag}: 영어등급`);
  }
  ok('cut = 최신 학년도 값이고 모든 연도 값이 0~100', bad.length === 0, bad.slice(0, 3).join(' / '));
  const byYear = {};
  for (const u of UNIVS) for (const d of u.depts) for (const y in d.cuts) byYear[y] = (byYear[y] || 0) + 1;
  info(`학년도별 합격선 수 ${JSON.stringify(byYear)}`);
}

group('[D4] 합격선 상식 검증');
{
  const med = UNIVS.flatMap(u => u.depts.filter(d => d.g === '의약').map(d => d.cut));
  // 「어디가」 2026학년도 실측으로 의약계열 70% 컷 최저는 94(충남대 의예과 등).
  // 90 미만이면 계열 분류 오류(예: '식물의학과'가 의약으로 잡힘)를 의심한다.
  ok('의약계열 합격선은 모두 백분위 90 이상', Math.min(...med) >= 90, `최저 ${Math.min(...med)}`);
  const snu = UNIVS.find(u => u.id === 'snu').depts.map(d => d.cut);
  const kwu = UNIVS.find(u => u.id === 'kwu').depts.filter(d => d.g !== '의약').map(d => d.cut);
  ok('서울대 최저 합격선 > 지방국립대 일반학과 최고 합격선',
    Math.min(...snu) > Math.max(...kwu), `${Math.min(...snu)} vs ${Math.max(...kwu)}`);
}

done();
