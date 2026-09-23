/* ─────────────────────────────────────────────────────────────
   환산점수 엔진
   전역 PROFILES / UNIVS (src/data.js) 에 의존한다.
   브라우저에서는 scripts/build.js 가 data.js 뒤에 이어붙이고,
   노드에서는 tests/_load.js 가 같은 순서로 합쳐 평가한다.
   → 페이지와 테스트가 '같은 소스'를 본다.
   ───────────────────────────────────────────────────────────── */
const STD_MAX = {kor:139, math:140, tam:74};
const ANCHOR = {
  kor:[[100,137],[99,131],[98,128],[97,126],[96,124],[95,122],[94,120],[92,117],[90,114],[85,109],[80,105],[70,99],[60,94],[50,90],[40,85],[30,80],[20,74],[10,67],[0,55]],
  math:[[100,139],[99,133],[98,130],[97,128],[96,126],[95,124],[94,122],[92,119],[90,116],[85,111],[80,107],[70,100],[60,95],[50,90],[40,85],[30,80],[20,74],[10,67],[0,55]],
  tam:[[100,72],[99,69],[98,68],[97,67],[96,66],[95,65],[94,64],[92,63],[90,62],[85,60],[80,58],[70,55],[60,52],[50,50],[40,47],[30,44],[20,40],[10,36],[0,30]]
};
const GRADE_CUT = [96,89,77,60,40,23,11,4,0]; // 백분위 기준 등급 하한(근사)
function pctToStd(pct, a){
  const A = ANCHOR[a]; pct = Math.max(0, Math.min(100, pct));
  for(let i=0;i<A.length-1;i++){ const [p1,s1]=A[i], [p2,s2]=A[i+1];
    if(pct<=p1 && pct>=p2) return s2 + (pct-p2)/(p1-p2)*(s1-s2); }
  return A[A.length-1][1];
}
function stdToPct(std, a){
  const A = ANCHOR[a]; std = Math.min(STD_MAX[a], std);
  for(let i=0;i<A.length-1;i++){ const [p1,s1]=A[i], [p2,s2]=A[i+1];
    if(std<=s1 && std>=s2) return Math.round((p2 + (std-s2)/(s1-s2)*(p1-p2))*10)/10; }
  return std > A[0][1] ? 100 : 0;
}
const pctToGrade = p => { for(let i=0;i<9;i++) if(p>=GRADE_CUT[i]) return i+1; return 9; };
const clamp = v => Math.max(0, Math.min(100, v));
const normStd = (s,a) => clamp(s / STD_MAX[a] * 100);

// 탐구 두 과목 평균 — 비어 있는(0) 과목은 빼고 입력된 과목만 평균한다.
// 빈 과목을 0점으로 평균하면 탐구 점수가 반토막 나고 보정값이 한계까지 밀린다. [E12]
const avgOf = xs => { const v = xs.filter(x => x > 0); return v.length ? v.reduce((a,b)=>a+b,0)/v.length : 0; };
function tamAvg(tam){
  const both = tam.filter(t => t.std > 0 && t.pct > 0); // 보정용: 표준·백분위가 둘 다 있는 과목만
  return { std: avgOf(tam.map(t => t.std)), pct: avgOf(tam.map(t => t.pct)),
    calStd: avgOf(both.map(t => t.std)), calPct: avgOf(both.map(t => t.pct)) };
}

function calibrate(me){
  const cal = {}, t = tamAvg(me.tam);
  const pairs = { kor:[me.kor.std, me.kor.pct], math:[me.math.std, me.math.pct],
    tam:[t.calStd, t.calPct] };
  for(const a of ['kor','math','tam']){
    const [s,p] = pairs[a];
    cal[a] = (s && p) ? Math.max(-15, Math.min(15, s - pctToStd(p,a))) : 0;
  }
  return cal;
}
const pctToStdCal = (p,a,cal) => Math.min(STD_MAX[a], pctToStd(p,a) + (cal? cal[a] : 0));

const normalizeVals = (v,b) => b==='pct'
  ? {kor:v.kor.pct, math:v.math.pct, tam:v.tam.pct}
  : {kor:normStd(v.kor.std,'kor'), math:normStd(v.math.std,'math'), tam:normStd(v.tam.std,'tam')};

function calcScore(prof, v, o){
  const r = prof.ratio;
  let m = v.math, t = v.tam;
  if(o.applyBonus){
    if(prof.mbonus && o.mathSel !== '확률과통계') m = clamp(m * (1 + prof.mbonus/100));
    if(prof.sbonus && o.tamType === '과탐') t = clamp(t * (1 + prof.sbonus/100));
  }
  const parts = {kor: v.kor*r[0]/10, math: m*r[1]/10, tam: t*r[3]/10, eng:0};
  const eg = o.engGrade || 1;
  parts.eng = prof.engMode==='ratio' ? prof.engT[eg-1]*r[2]/10 : prof.engT[eg-1];
  const caps = {kor:r[0]*10, math:r[1]*10, tam:r[3]*10, eng: prof.engMode==='ratio'? r[2]*10 : 0};
  return {total: parts.kor+parts.math+parts.tam+parts.eng, parts, caps};
}
const meVals = me => { const t = tamAvg(me.tam); return {
  kor:{std:me.kor.std, pct:me.kor.pct}, math:{std:me.math.std, pct:me.math.pct},
  tam:{std:t.std, pct:t.pct}
}; };
const cutVals = (c,cal) => ({
  kor:{std:pctToStdCal(c,'kor',cal), pct:c}, math:{std:pctToStdCal(c,'math',cal), pct:c},
  tam:{std:pctToStdCal(c,'tam',cal), pct:c}
});
const DEF_TH = {하향:1.5, 적정:0.4, 소신:-0.7, 상향:-2.2};
const TIER_ORDER = ['위험','상향','소신','적정','하향'];
const TIER_VAR = {위험:'--t1', 상향:'--t2', 소신:'--t3', 적정:'--t4', 하향:'--t5'};
const TIER_DESC = {
  위험:'합격선과 차이가 커서 사실상 어려운 구간',
  상향:'한 장 걸어볼 만한 도전 구간',
  소신: '합격선 근처. 경쟁률·이월에 따라 갈리는 구간',
  적정:'합격선을 안정적으로 넘는 주력 구간',
  하향:'여유 있게 넘어서는 안전 구간'
};
function tierOf(d,th){
  if(d>=th.하향) return '하향'; if(d>=th.적정) return '적정';
  if(d>=th.소신) return '소신'; if(d>=th.상향) return '상향'; return '위험';
}
const prob = d => Math.round(100/(1+Math.exp(-d/1.0)));

function analyze(me, th, overrides){
  const mv = meVals(me), cal = calibrate(me), out = [];
  for(const u of UNIVS) for(const d of u.depts){
    const key = u.id + '·' + d.n;
    const prof = (overrides && overrides[key]) ? Object.assign({}, PROFILES[d.p], {ratio: overrides[key]}) : PROFILES[d.p];
    const my = calcScore(prof, normalizeVals(mv, prof.base),
      {engGrade:me.eng.grade, applyBonus:true, mathSel:me.math.sel, tamType:me.tamType});
    const cs = calcScore(prof, normalizeVals(cutVals(d.cut, cal), prof.base), {engGrade:1, applyBonus:false});
    const diff = (my.total - cs.total)/10;
    out.push({key, uid:u.id, u:u.name, region:u.region, d:d.n, g:d.g, mg:d.mg, cutP:d.cut,
      // conf: 합격선·반영비율 중 하나라도 추정이면 'e' (UI 추정 배지 기준) [E11]
      conf:(d.conf==='e' || prof.conf==='e') ? 'e' : 'c', cutConf:d.conf, ratioConf:prof.conf, prof, score:my.total, parts:my.parts, caps:my.caps,
      cutTotal:cs.total, cutParts:cs.parts, diff, tier:tierOf(diff,th), p:prob(diff)});
  }
  return out;
}
