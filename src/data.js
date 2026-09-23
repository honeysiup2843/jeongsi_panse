/* =========================================================================
   대학 데이터셋  ―  참고용
   ratio  : [국어, 수학, 영어, 탐구]  합 100
   base   : 'std' 표준점수 반영 | 'pct' 백분위 반영
   engMode: 'ratio'   영어가 반영비율 안에 포함 (engT = 100점 만점 환산점)
            'penalty' 총점에서 감점        (engT = 1000점 만점 기준 가감점)
   engT   : 1~9등급 값
   mbonus : 미적분/기하 선택 시 수학 취득점수 가산율(%)
   sbonus : 과학탐구 선택 시 탐구 취득점수 가산율(%)
   conf   : 'c' 공개자료로 확인 | 'e' 추정치
   ========================================================================= */

const PROFILES = {
  // ── 최상위 ───────────────────────────────────────────────
  snu_h:  { ratio:[33.3,33.3,0,33.4], base:'std', engMode:'penalty',
            engT:[0,-1.25,-5,-10,-15,-20,-25,-30,-35], mbonus:0, sbonus:0, conf:'c' },
  snu_s:  { ratio:[33.3,40,0,26.7],  base:'std', engMode:'penalty',
            engT:[0,-1.25,-5,-10,-15,-20,-25,-30,-35], mbonus:0, sbonus:0, conf:'c' },

  yon_h:  { ratio:[33.3,33.3,16.7,16.7], base:'std', engMode:'ratio',
            engT:[100,95,87.5,75,60,45,30,15,0], mbonus:0, sbonus:0, conf:'e' },
  yon_s:  { ratio:[22.2,33.3,16.7,27.8], base:'std', engMode:'ratio',
            engT:[100,95,87.5,75,60,45,30,15,0], mbonus:0, sbonus:3, conf:'e' },

  kor_h:  { ratio:[35,35,0,30], base:'std', engMode:'penalty',
            engT:[0,-3,-6,-9,-12,-15,-18,-21,-24], mbonus:0, sbonus:0, conf:'c' },
  kor_s:  { ratio:[31.7,38.3,0,30], base:'std', engMode:'penalty',
            engT:[0,-3,-6,-9,-12,-15,-18,-21,-24], mbonus:0, sbonus:3, conf:'c' },

  skk_h:  { ratio:[40,30,10,20], base:'std', engMode:'ratio',
            engT:[100,97,92,86,75,64,58,53,50], mbonus:0, sbonus:0, conf:'c' },
  skk_s:  { ratio:[30,40,10,20], base:'std', engMode:'ratio',
            engT:[100,97,92,86,75,64,58,53,50], mbonus:0, sbonus:3, conf:'c' },

  sog_h:  { ratio:[36.7,43.3,0,20], base:'std', engMode:'penalty',
            engT:[0,-5,-15,-30,-50,-75,-105,-140,-180], mbonus:0, sbonus:0, conf:'c' },
  sog_s:  { ratio:[36.7,43.3,0,20], base:'std', engMode:'penalty',
            engT:[0,-5,-15,-30,-50,-75,-105,-140,-180], mbonus:0, sbonus:0, conf:'c' },

  han_h:  { ratio:[30,30,10,30], base:'std', engMode:'ratio',
            engT:[100,96,90,82,72,60,46,30,12], mbonus:0, sbonus:0, conf:'e' },
  han_s:  { ratio:[25,40,10,25], base:'std', engMode:'ratio',
            engT:[100,96,90,82,72,60,46,30,12], mbonus:0, sbonus:3, conf:'c' },

  // ── 서울 상위권 ──────────────────────────────────────────
  cau_h:  { ratio:[40,40,0,20], base:'std', engMode:'penalty',
            engT:[0,-20,-50,-80,-140,-250,-360,-420,-500], mbonus:0, sbonus:0, conf:'c' },
  cau_s:  { ratio:[25,45,0,30], base:'std', engMode:'penalty',
            engT:[0,-20,-50,-80,-140,-250,-360,-420,-500], mbonus:0, sbonus:0, conf:'c' },

  khu_h:  { ratio:[40,30,0,30], base:'std', engMode:'penalty',
            engT:[0,0,-20,-40,-80,-120,-180,-240,-300], mbonus:0, sbonus:0, conf:'c' },
  khu_s:  { ratio:[25,45,0,30], base:'std', engMode:'penalty',
            engT:[0,0,-20,-40,-80,-120,-180,-240,-300], mbonus:0, sbonus:3, conf:'c' },

  ewh_h:  { ratio:[25,25,25,25], base:'std', engMode:'ratio',
            engT:[100,98,94,88,80,70,58,44,28], mbonus:0, sbonus:0, conf:'e' },
  ewh_s:  { ratio:[25,30,20,25], base:'std', engMode:'ratio',
            engT:[100,98,94,88,80,70,58,44,28], mbonus:0, sbonus:0, conf:'e' },

  uos_h:  { ratio:[32.5,27.5,20,20], base:'std', engMode:'ratio',
            engT:[100,98,95,91,86,80,73,65,56], mbonus:0, sbonus:0, conf:'e' },
  uos_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,98,95,91,86,80,73,65,56], mbonus:0, sbonus:3, conf:'e' },

  hufs_h: { ratio:[35,30,15,20], base:'std', engMode:'ratio',
            engT:[100,95,88,78,66,52,36,20,0], mbonus:0, sbonus:0, conf:'e' },
  hufs_s: { ratio:[25,35,15,25], base:'std', engMode:'ratio',
            engT:[100,95,88,78,66,52,36,20,0], mbonus:0, sbonus:0, conf:'e' },

  // ── 서울 중상위권 ────────────────────────────────────────
  kku_h:  { ratio:[35,30,10,25], base:'std', engMode:'ratio',
            engT:[100,98.5,97,95,92.5,90,85,80,75], mbonus:0, sbonus:0, conf:'c' },
  kku_s:  { ratio:[30,40,10,20], base:'std', engMode:'ratio',
            engT:[100,98.5,97,95,92.5,90,85,80,75], mbonus:0, sbonus:3, conf:'c' },

  dgu_h:  { ratio:[35,25,15,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,82,74,64,52,38], mbonus:0, sbonus:0, conf:'e' },
  dgu_s:  { ratio:[25,35,15,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,82,74,64,52,38], mbonus:0, sbonus:3, conf:'e' },

  hong_h: { ratio:[30,30,20,20], base:'std', engMode:'ratio',
            engT:[100,96,90,82,72,60,46,30,12], mbonus:0, sbonus:0, conf:'e' },
  hong_s: { ratio:[25,35,20,20], base:'std', engMode:'ratio',
            engT:[100,96,90,82,72,60,46,30,12], mbonus:0, sbonus:3, conf:'e' },

  sook_h: { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,80,70,58,44,28], mbonus:0, sbonus:0, conf:'e' },
  sook_s: { ratio:[25,30,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,80,70,58,44,28], mbonus:0, sbonus:0, conf:'e' },

  ssu_h:  { ratio:[35,20,20,25], base:'std', engMode:'ratio',
            engT:[100,97,92,86,78,68,56,42,26], mbonus:0, sbonus:0, conf:'c' },
  ssu_s:  { ratio:[25,35,15,25], base:'std', engMode:'ratio',
            engT:[100,97,92,86,78,68,56,42,26], mbonus:0, sbonus:3, conf:'e' },

  sej_h:  { ratio:[30,25,20,25], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:0, conf:'e' },
  sej_s:  { ratio:[25,35,15,25], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:5, conf:'e' },

  kmu_h:  { ratio:[30,25,20,25], base:'pct', engMode:'ratio',
            engT:[100,96,91,85,77,67,55,41,25], mbonus:0, sbonus:0, conf:'e' },
  kmu_s:  { ratio:[25,30,20,25], base:'pct', engMode:'ratio',
            engT:[100,96,91,85,77,67,55,41,25], mbonus:0, sbonus:5, conf:'e' },

  kw_h:   { ratio:[30,25,20,25], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,82,74,64,52,38], mbonus:0, sbonus:0, conf:'e' },
  kw_s:   { ratio:[20,35,20,25], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,82,74,64,52,38], mbonus:0, sbonus:5, conf:'e' },

  mju_h:  { ratio:[35,25,20,20], base:'pct', engMode:'ratio',
            engT:[100,96,91,85,77,67,55,41,25], mbonus:0, sbonus:0, conf:'c' },
  mju_s:  { ratio:[25,35,20,20], base:'pct', engMode:'ratio',
            engT:[100,96,91,85,77,67,55,41,25], mbonus:0, sbonus:5, conf:'e' },

  dku_h:  { ratio:[35,25,20,20], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:0, conf:'c' },
  dku_s:  { ratio:[25,35,20,20], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:5, conf:'e' },

  ssw_h:  { ratio:[30,20,30,20], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:0, conf:'c' },
  ssw_s:  { ratio:[25,30,25,20], base:'pct', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:5, conf:'e' },

  gch_h:  { ratio:[30,25,20,25], base:'pct', engMode:'ratio',
            engT:[98,95,92,86,80,60,50,40,30], mbonus:0, sbonus:0, conf:'c' },
  gch_s:  { ratio:[25,30,20,25], base:'pct', engMode:'ratio',
            engT:[98,95,92,86,80,60,50,40,30], mbonus:0, sbonus:5, conf:'c' },

  // ── 수도권 ───────────────────────────────────────────────
  aju_h:  { ratio:[30,30,20,20], base:'std', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:0, conf:'e' },
  aju_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:3, conf:'e' },

  inh_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:0, conf:'e' },
  inh_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:3, conf:'e' },

  kgu_h:  { ratio:[30,25,20,25], base:'pct', engMode:'ratio',
            engT:[100,96,91,85,77,67,55,41,25], mbonus:0, sbonus:0, conf:'e' },
  kgu_s:  { ratio:[25,30,20,25], base:'pct', engMode:'ratio',
            engT:[100,96,91,85,77,67,55,41,25], mbonus:0, sbonus:5, conf:'e' },

  // ── 거점국립대 ───────────────────────────────────────────
  pnu_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:0, conf:'e' },
  pnu_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,93,88,81,72,60,46,30], mbonus:0, sbonus:3, conf:'e' },

  knu_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:0, conf:'e' },
  knu_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:3, conf:'e' },

  cnu_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:0, conf:'e' },
  cnu_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:3, conf:'e' },

  jnu_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:0, conf:'e' },
  jnu_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:3, conf:'e' },

  cbu_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:0, conf:'e' },
  cbu_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:3, conf:'e' },

  jbu_h:  { ratio:[30,25,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:0, conf:'e' },
  jbu_s:  { ratio:[20,35,20,25], base:'std', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:3, conf:'e' },

  kwu_h:  { ratio:[30,25,20,25], base:'pct', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:0, conf:'e' },
  kwu_s:  { ratio:[20,35,20,25], base:'pct', engMode:'ratio',
            engT:[100,97,94,90,85,79,72,64,55], mbonus:0, sbonus:3, conf:'e' },

  // ── 의약계열 전용 프로필 ─────────────────────────────────
  med_top:{ ratio:[30,35,10,25], base:'std', engMode:'ratio',
            engT:[100,98,95,90,83,74,63,50,35], mbonus:0, sbonus:3, conf:'e' },
  med_mid:{ ratio:[25,35,15,25], base:'std', engMode:'ratio',
            engT:[100,98,95,90,83,74,63,50,35], mbonus:0, sbonus:5, conf:'e' },

  // ── 교대 ─────────────────────────────────────────────────
  edu_p:  { ratio:[25,25,25,25], base:'std', engMode:'ratio',
            engT:[100,98,95,91,86,80,73,65,56], mbonus:0, sbonus:0, conf:'e' },
};

/* 대학 목록 — mg: 모집군, cut: 최근 합격선(국·수·탐 평균 백분위 70%컷 추정) */
const UNIVS = [
  { id:'snu', name:'서울대', region:'서울', depts:[
    {n:'의예과',         p:'snu_s', g:'의약', mg:'나', cut:99.7, conf:'c'},
    {n:'경영대학',       p:'snu_h', g:'인문', mg:'나', cut:98.5, conf:'c'},
    {n:'경제학부',       p:'snu_h', g:'인문', mg:'나', cut:98.3, conf:'e'},
    {n:'정치외교학부',   p:'snu_h', g:'인문', mg:'나', cut:97.8, conf:'e'},
    {n:'컴퓨터공학부',   p:'snu_s', g:'자연', mg:'나', cut:98.7, conf:'e'},
    {n:'전기정보공학부', p:'snu_s', g:'자연', mg:'나', cut:98.2, conf:'e'},
    {n:'화학생물공학부', p:'snu_s', g:'자연', mg:'나', cut:97.9, conf:'e'},
    {n:'수리과학부',     p:'snu_s', g:'자연', mg:'나', cut:97.3, conf:'e'},
  ]},
  { id:'yon', name:'연세대', region:'서울', depts:[
    {n:'의예과',       p:'yon_s', g:'의약', mg:'가', cut:99.6, conf:'c'},
    {n:'치의예과',     p:'yon_s', g:'의약', mg:'가', cut:99.2, conf:'e'},
    {n:'경영학과',     p:'yon_h', g:'인문', mg:'가', cut:97.5, conf:'c'},
    {n:'응용통계학과', p:'yon_h', g:'인문', mg:'가', cut:97.0, conf:'e'},
    {n:'언론홍보영상', p:'yon_h', g:'인문', mg:'가', cut:96.7, conf:'e'},
    {n:'컴퓨터과학과', p:'yon_s', g:'자연', mg:'가', cut:97.8, conf:'e'},
    {n:'전기전자공학', p:'yon_s', g:'자연', mg:'가', cut:97.2, conf:'e'},
    {n:'신소재공학부', p:'yon_s', g:'자연', mg:'가', cut:96.4, conf:'e'},
  ]},
  { id:'kor', name:'고려대', region:'서울', depts:[
    {n:'의과대학',     p:'kor_s', g:'의약', mg:'가', cut:99.5, conf:'c'},
    {n:'경영대학',     p:'kor_h', g:'인문', mg:'가', cut:97.0, conf:'c'},
    {n:'경제학과',     p:'kor_h', g:'인문', mg:'가', cut:96.8, conf:'e'},
    {n:'미디어학부',   p:'kor_h', g:'인문', mg:'가', cut:96.5, conf:'e'},
    {n:'컴퓨터학과',   p:'kor_s', g:'자연', mg:'가', cut:97.5, conf:'e'},
    {n:'전기전자공학', p:'kor_s', g:'자연', mg:'가', cut:96.9, conf:'e'},
    {n:'기계공학부',   p:'kor_s', g:'자연', mg:'가', cut:96.2, conf:'e'},
    {n:'생명공학부',   p:'kor_s', g:'자연', mg:'가', cut:95.8, conf:'e'},
  ]},
  { id:'skk', name:'성균관대', region:'서울', depts:[
    {n:'의예과',         p:'med_top', g:'의약', mg:'가', cut:99.5, conf:'c'},
    {n:'글로벌경영학과', p:'skk_h', g:'인문', mg:'나', cut:96.5, conf:'e'},
    {n:'글로벌리더학부', p:'skk_h', g:'인문', mg:'나', cut:96.2, conf:'e'},
    {n:'사회과학계열',   p:'skk_h', g:'인문', mg:'나', cut:95.0, conf:'c'},
    {n:'반도체시스템공학', p:'skk_s', g:'자연', mg:'나', cut:97.0, conf:'e'},
    {n:'소프트웨어학과', p:'skk_s', g:'자연', mg:'나', cut:96.3, conf:'e'},
    {n:'공학계열',       p:'skk_s', g:'자연', mg:'나', cut:94.0, conf:'c'},
    {n:'자연과학계열',   p:'skk_s', g:'자연', mg:'나', cut:93.4, conf:'e'},
  ]},
  { id:'sog', name:'서강대', region:'서울', depts:[
    {n:'경영학부',     p:'sog_h', g:'인문', mg:'나', cut:95.8, conf:'e'},
    {n:'경제학부',     p:'sog_h', g:'인문', mg:'나', cut:95.4, conf:'e'},
    {n:'인문계',       p:'sog_h', g:'인문', mg:'나', cut:94.6, conf:'e'},
    {n:'컴퓨터공학과', p:'sog_s', g:'자연', mg:'나', cut:96.2, conf:'e'},
    {n:'전자공학과',   p:'sog_s', g:'자연', mg:'나', cut:95.2, conf:'e'},
    {n:'기계공학과',   p:'sog_s', g:'자연', mg:'나', cut:94.4, conf:'e'},
  ]},
  { id:'han', name:'한양대', region:'서울', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:99.5, conf:'c'},
    {n:'정책학과',     p:'han_h', g:'인문', mg:'가', cut:96.5, conf:'c'},
    {n:'파이낸스경영', p:'han_h', g:'인문', mg:'가', cut:96.2, conf:'e'},
    {n:'경영학부',     p:'han_h', g:'인문', mg:'가', cut:95.5, conf:'e'},
    {n:'컴퓨터소프트웨어', p:'han_s', g:'자연', mg:'가', cut:96.6, conf:'e'},
    {n:'전기공학전공', p:'han_s', g:'자연', mg:'가', cut:95.4, conf:'e'},
    {n:'기계공학부',   p:'han_s', g:'자연', mg:'가', cut:94.6, conf:'e'},
    {n:'신소재공학부', p:'han_s', g:'자연', mg:'가', cut:94.2, conf:'e'},
  ]},
  { id:'cau', name:'중앙대', region:'서울', depts:[
    {n:'약학부',       p:'med_mid', g:'의약', mg:'나', cut:98.5, conf:'e'},
    {n:'경영학부',     p:'cau_h', g:'인문', mg:'나', cut:95.0, conf:'e'},
    {n:'경제학부',     p:'cau_h', g:'인문', mg:'나', cut:94.2, conf:'e'},
    {n:'미디어커뮤니케이션', p:'cau_h', g:'인문', mg:'다', cut:94.0, conf:'e'},
    {n:'소프트웨어학부', p:'cau_s', g:'자연', mg:'가', cut:95.6, conf:'e'},
    {n:'전자전기공학', p:'cau_s', g:'자연', mg:'가', cut:94.3, conf:'e'},
    {n:'기계공학부',   p:'cau_s', g:'자연', mg:'가', cut:93.2, conf:'e'},
    {n:'화학신소재공학', p:'cau_s', g:'자연', mg:'다', cut:93.0, conf:'e'},
  ]},
  { id:'khu', name:'경희대', region:'서울', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:99.2, conf:'e'},
    {n:'한의예과',     p:'med_top', g:'의약', mg:'가', cut:98.8, conf:'e'},
    {n:'경영학과',     p:'khu_h', g:'인문', mg:'나', cut:94.0, conf:'e'},
    {n:'국제학과',     p:'khu_h', g:'인문', mg:'나', cut:93.5, conf:'e'},
    {n:'미디어학과',   p:'khu_h', g:'인문', mg:'나', cut:93.3, conf:'e'},
    {n:'컴퓨터공학과', p:'khu_s', g:'자연', mg:'가', cut:94.6, conf:'e'},
    {n:'전자공학과',   p:'khu_s', g:'자연', mg:'가', cut:93.2, conf:'e'},
    {n:'기계공학과',   p:'khu_s', g:'자연', mg:'가', cut:92.4, conf:'e'},
  ]},
  { id:'ewh', name:'이화여대', region:'서울', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:99.0, conf:'e'},
    {n:'약학전공',     p:'med_mid', g:'의약', mg:'가', cut:98.0, conf:'e'},
    {n:'경영학부',     p:'ewh_h', g:'인문', mg:'가', cut:93.2, conf:'e'},
    {n:'인문과학계열', p:'ewh_h', g:'인문', mg:'가', cut:92.0, conf:'e'},
    {n:'컴퓨터공학전공', p:'ewh_s', g:'자연', mg:'가', cut:93.0, conf:'e'},
    {n:'화학신소재공학', p:'ewh_s', g:'자연', mg:'가', cut:91.8, conf:'e'},
  ]},
  { id:'uos', name:'서울시립대', region:'서울', depts:[
    {n:'경영학부',     p:'uos_h', g:'인문', mg:'나', cut:93.8, conf:'e'},
    {n:'세무학과',     p:'uos_h', g:'인문', mg:'나', cut:93.5, conf:'e'},
    {n:'행정학과',     p:'uos_h', g:'인문', mg:'나', cut:93.0, conf:'e'},
    {n:'컴퓨터과학부', p:'uos_s', g:'자연', mg:'가', cut:94.2, conf:'e'},
    {n:'전자전기컴퓨터', p:'uos_s', g:'자연', mg:'가', cut:93.4, conf:'e'},
    {n:'건축학부',     p:'uos_s', g:'자연', mg:'가', cut:92.0, conf:'e'},
  ]},
  { id:'hufs', name:'한국외대', region:'서울', depts:[
    {n:'LD학부',       p:'hufs_h', g:'인문', mg:'나', cut:94.0, conf:'e'},
    {n:'LT학부',       p:'hufs_h', g:'인문', mg:'나', cut:93.6, conf:'e'},
    {n:'경영학부',     p:'hufs_h', g:'인문', mg:'나', cut:92.8, conf:'e'},
    {n:'영어통번역학부', p:'hufs_h', g:'인문', mg:'나', cut:92.0, conf:'c'},
    {n:'중국어통번역',  p:'hufs_h', g:'인문', mg:'다', cut:90.5, conf:'e'},
    {n:'컴퓨터공학부', p:'hufs_s', g:'자연', mg:'다', cut:91.6, conf:'e'},
  ]},
  { id:'kku', name:'건국대', region:'서울', depts:[
    {n:'수의예과',     p:'med_mid', g:'의약', mg:'가', cut:97.5, conf:'e'},
    {n:'경영학과',     p:'kku_h', g:'인문', mg:'나', cut:92.6, conf:'e'},
    {n:'경제학과',     p:'kku_h', g:'인문', mg:'나', cut:91.5, conf:'c'},
    {n:'컴퓨터공학부', p:'kku_s', g:'자연', mg:'가', cut:93.2, conf:'e'},
    {n:'기계항공공학', p:'kku_s', g:'자연', mg:'가', cut:91.6, conf:'e'},
    {n:'화학공학부',   p:'kku_s', g:'자연', mg:'가', cut:91.2, conf:'e'},
  ]},
  { id:'dgu', name:'동국대', region:'서울', depts:[
    {n:'경영학과',     p:'dgu_h', g:'인문', mg:'나', cut:92.0, conf:'c'},
    {n:'경찰행정학부', p:'dgu_h', g:'인문', mg:'나', cut:91.8, conf:'e'},
    {n:'국어국문학과', p:'dgu_h', g:'인문', mg:'나', cut:90.0, conf:'c'},
    {n:'컴퓨터AI학부', p:'dgu_s', g:'자연', mg:'가', cut:92.4, conf:'e'},
    {n:'전자전기공학', p:'dgu_s', g:'자연', mg:'가', cut:90.8, conf:'e'},
    {n:'건설환경공학', p:'dgu_s', g:'자연', mg:'가', cut:89.6, conf:'e'},
  ]},
  { id:'hong', name:'홍익대', region:'서울', depts:[
    {n:'경영학부',     p:'hong_h', g:'인문', mg:'나', cut:91.5, conf:'e'},
    {n:'법학부',       p:'hong_h', g:'인문', mg:'나', cut:90.6, conf:'e'},
    {n:'인문계열',     p:'hong_h', g:'인문', mg:'나', cut:90.0, conf:'c'},
    {n:'컴퓨터공학과', p:'hong_s', g:'자연', mg:'가', cut:93.0, conf:'c'},
    {n:'전자전기공학', p:'hong_s', g:'자연', mg:'가', cut:91.0, conf:'e'},
    {n:'건축학전공',   p:'hong_s', g:'자연', mg:'가', cut:90.4, conf:'e'},
  ]},
  { id:'sook', name:'숙명여대', region:'서울', depts:[
    {n:'약학부',       p:'med_mid', g:'의약', mg:'나', cut:97.6, conf:'e'},
    {n:'경영학부',     p:'sook_h', g:'인문', mg:'나', cut:91.0, conf:'e'},
    {n:'미디어학부',   p:'sook_h', g:'인문', mg:'나', cut:90.4, conf:'e'},
    {n:'인공지능공학부', p:'sook_s', g:'자연', mg:'가', cut:91.2, conf:'e'},
    {n:'화공생명공학', p:'sook_s', g:'자연', mg:'가', cut:90.0, conf:'e'},
  ]},
  { id:'ssu', name:'숭실대', region:'서울', depts:[
    {n:'경영학부',     p:'ssu_h', g:'인문', mg:'나', cut:90.8, conf:'e'},
    {n:'인문계열',     p:'ssu_h', g:'인문', mg:'나', cut:88.5, conf:'c'},
    {n:'컴퓨터학부',   p:'ssu_s', g:'자연', mg:'가', cut:91.4, conf:'c'},
    {n:'전자정보공학', p:'ssu_s', g:'자연', mg:'가', cut:89.8, conf:'e'},
    {n:'산업정보시스템', p:'ssu_s', g:'자연', mg:'가', cut:88.6, conf:'e'},
  ]},
  { id:'sej', name:'세종대', region:'서울', depts:[
    {n:'경영학부',     p:'sej_h', g:'인문', mg:'나', cut:90.0, conf:'c'},
    {n:'호텔관광경영', p:'sej_h', g:'인문', mg:'나', cut:88.8, conf:'e'},
    {n:'인문계열',     p:'sej_h', g:'인문', mg:'나', cut:88.0, conf:'c'},
    {n:'컴퓨터공학과', p:'sej_s', g:'자연', mg:'가', cut:90.6, conf:'e'},
    {n:'항공우주공학', p:'sej_s', g:'자연', mg:'가', cut:89.4, conf:'e'},
    {n:'전자정보통신', p:'sej_s', g:'자연', mg:'가', cut:88.4, conf:'e'},
  ]},
  { id:'kmu', name:'국민대', region:'서울', depts:[
    {n:'경영학부',     p:'kmu_h', g:'인문', mg:'나', cut:89.6, conf:'c'},
    {n:'행정학과',     p:'kmu_h', g:'인문', mg:'나', cut:88.4, conf:'e'},
    {n:'인문계열',     p:'kmu_h', g:'인문', mg:'나', cut:88.0, conf:'c'},
    {n:'소프트웨어학부', p:'kmu_s', g:'자연', mg:'가', cut:90.0, conf:'c'},
    {n:'자동차공학과', p:'kmu_s', g:'자연', mg:'가', cut:88.6, conf:'e'},
    {n:'기계공학부',   p:'kmu_s', g:'자연', mg:'가', cut:87.8, conf:'e'},
  ]},
  { id:'kw', name:'광운대', region:'서울', depts:[
    {n:'경영학부',     p:'kw_h', g:'인문', mg:'나', cut:88.4, conf:'e'},
    {n:'인문사회계열', p:'kw_h', g:'인문', mg:'나', cut:86.8, conf:'e'},
    {n:'전자공학과',   p:'kw_s', g:'자연', mg:'가', cut:89.6, conf:'e'},
    {n:'컴퓨터정보공학', p:'kw_s', g:'자연', mg:'가', cut:89.0, conf:'e'},
    {n:'로봇학부',     p:'kw_s', g:'자연', mg:'다', cut:87.4, conf:'e'},
  ]},
  { id:'mju', name:'명지대', region:'서울', depts:[
    {n:'경영학과',     p:'mju_h', g:'인문', mg:'나', cut:86.0, conf:'e'},
    {n:'인문사회계열', p:'mju_h', g:'인문', mg:'나', cut:84.0, conf:'c'},
    {n:'컴퓨터공학과', p:'mju_s', g:'자연', mg:'가', cut:87.2, conf:'e'},
    {n:'전기공학과',   p:'mju_s', g:'자연', mg:'가', cut:85.4, conf:'e'},
  ]},
  { id:'dku', name:'단국대', region:'경기', depts:[
    {n:'문과대학',     p:'dku_h', g:'인문', mg:'나', cut:86.5, conf:'c'},
    {n:'법과대학',     p:'dku_h', g:'인문', mg:'나', cut:86.8, conf:'c'},
    {n:'경영학부',     p:'dku_h', g:'인문', mg:'나', cut:87.4, conf:'e'},
    {n:'소프트웨어학과', p:'dku_s', g:'자연', mg:'가', cut:88.6, conf:'e'},
    {n:'전자전기공학', p:'dku_s', g:'자연', mg:'가', cut:86.6, conf:'e'},
  ]},
  { id:'ssw', name:'성신여대', region:'서울', depts:[
    {n:'어문계열',     p:'ssw_h', g:'인문', mg:'나', cut:84.5, conf:'c'},
    {n:'글로벌비즈니스', p:'ssw_h', g:'인문', mg:'나', cut:85.8, conf:'e'},
    {n:'AI융합학부',   p:'ssw_s', g:'자연', mg:'가', cut:86.0, conf:'e'},
    {n:'화학에너지융합', p:'ssw_s', g:'자연', mg:'가', cut:84.8, conf:'e'},
  ]},
  { id:'gch', name:'가천대', region:'경기', depts:[
    {n:'의예과',       p:'med_mid', g:'의약', mg:'다', cut:98.6, conf:'c'},
    {n:'한의예과',     p:'med_mid', g:'의약', mg:'다', cut:97.8, conf:'e'},
    {n:'경영학부',     p:'gch_h', g:'인문', mg:'나', cut:85.0, conf:'e'},
    {n:'인문계열',     p:'gch_h', g:'인문', mg:'나', cut:83.2, conf:'e'},
    {n:'컴퓨터공학과', p:'gch_s', g:'자연', mg:'가', cut:86.4, conf:'e'},
    {n:'전자공학과',   p:'gch_s', g:'자연', mg:'가', cut:84.6, conf:'e'},
  ]},
  { id:'aju', name:'아주대', region:'경기', depts:[
    {n:'의학과',       p:'med_top', g:'의약', mg:'나', cut:99.0, conf:'e'},
    {n:'경영학과',     p:'aju_h', g:'인문', mg:'나', cut:89.6, conf:'e'},
    {n:'인문계열',     p:'aju_h', g:'인문', mg:'나', cut:87.8, conf:'e'},
    {n:'소프트웨어학과', p:'aju_s', g:'자연', mg:'가', cut:91.8, conf:'e'},
    {n:'전자공학과',   p:'aju_s', g:'자연', mg:'가', cut:89.6, conf:'e'},
    {n:'기계공학과',   p:'aju_s', g:'자연', mg:'가', cut:88.4, conf:'e'},
  ]},
  { id:'inh', name:'인하대', region:'인천', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'나', cut:98.9, conf:'e'},
    {n:'경영학과',     p:'inh_h', g:'인문', mg:'나', cut:88.8, conf:'e'},
    {n:'인문계열',     p:'inh_h', g:'인문', mg:'나', cut:86.8, conf:'e'},
    {n:'컴퓨터공학과', p:'inh_s', g:'자연', mg:'가', cut:90.8, conf:'e'},
    {n:'전기전자공학', p:'inh_s', g:'자연', mg:'가', cut:89.0, conf:'e'},
    {n:'기계공학과',   p:'inh_s', g:'자연', mg:'가', cut:87.6, conf:'e'},
  ]},
  { id:'kgu', name:'경기대', region:'경기', depts:[
    {n:'경영학과',     p:'kgu_h', g:'인문', mg:'나', cut:83.4, conf:'e'},
    {n:'인문계열',     p:'kgu_h', g:'인문', mg:'나', cut:81.6, conf:'e'},
    {n:'컴퓨터공학부', p:'kgu_s', g:'자연', mg:'가', cut:84.6, conf:'e'},
    {n:'전자공학과',   p:'kgu_s', g:'자연', mg:'가', cut:82.8, conf:'e'},
  ]},
  { id:'pnu', name:'부산대', region:'부산', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:98.8, conf:'e'},
    {n:'경영학과',     p:'pnu_h', g:'인문', mg:'가', cut:89.0, conf:'e'},
    {n:'인문계열',     p:'pnu_h', g:'인문', mg:'가', cut:86.4, conf:'e'},
    {n:'정보컴퓨터공학', p:'pnu_s', g:'자연', mg:'나', cut:90.2, conf:'e'},
    {n:'전기전자공학', p:'pnu_s', g:'자연', mg:'나', cut:88.4, conf:'e'},
    {n:'기계공학부',   p:'pnu_s', g:'자연', mg:'나', cut:87.0, conf:'e'},
  ]},
  { id:'knu', name:'경북대', region:'대구', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:98.7, conf:'e'},
    {n:'경영학부',     p:'knu_h', g:'인문', mg:'가', cut:88.2, conf:'e'},
    {n:'인문계열',     p:'knu_h', g:'인문', mg:'가', cut:85.6, conf:'e'},
    {n:'컴퓨터학부',   p:'knu_s', g:'자연', mg:'나', cut:89.4, conf:'e'},
    {n:'전자공학부',   p:'knu_s', g:'자연', mg:'나', cut:87.6, conf:'e'},
    {n:'기계공학부',   p:'knu_s', g:'자연', mg:'나', cut:86.2, conf:'e'},
  ]},
  { id:'cnu', name:'충남대', region:'대전', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:98.5, conf:'e'},
    {n:'경영학부',     p:'cnu_h', g:'인문', mg:'가', cut:86.6, conf:'e'},
    {n:'인문계열',     p:'cnu_h', g:'인문', mg:'가', cut:84.2, conf:'e'},
    {n:'컴퓨터융합학부', p:'cnu_s', g:'자연', mg:'나', cut:87.8, conf:'e'},
    {n:'전기공학과',   p:'cnu_s', g:'자연', mg:'나', cut:85.8, conf:'e'},
  ]},
  { id:'jnu', name:'전남대', region:'광주', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:98.4, conf:'e'},
    {n:'경영학부',     p:'jnu_h', g:'인문', mg:'가', cut:84.8, conf:'e'},
    {n:'인문계열',     p:'jnu_h', g:'인문', mg:'가', cut:82.4, conf:'e'},
    {n:'전기컴퓨터공학', p:'jnu_s', g:'자연', mg:'나', cut:86.0, conf:'e'},
    {n:'기계공학부',   p:'jnu_s', g:'자연', mg:'나', cut:84.0, conf:'e'},
  ]},
  { id:'cbu', name:'충북대', region:'청주', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:98.3, conf:'e'},
    {n:'경영학부',     p:'cbu_h', g:'인문', mg:'가', cut:84.4, conf:'e'},
    {n:'인문계열',     p:'cbu_h', g:'인문', mg:'가', cut:82.0, conf:'e'},
    {n:'소프트웨어학부', p:'cbu_s', g:'자연', mg:'나', cut:85.8, conf:'e'},
    {n:'전기공학부',   p:'cbu_s', g:'자연', mg:'나', cut:83.6, conf:'e'},
  ]},
  { id:'jbu', name:'전북대', region:'전주', depts:[
    {n:'의예과',       p:'med_top', g:'의약', mg:'가', cut:98.3, conf:'e'},
    {n:'경영학부',     p:'jbu_h', g:'인문', mg:'가', cut:83.8, conf:'e'},
    {n:'인문계열',     p:'jbu_h', g:'인문', mg:'가', cut:81.4, conf:'e'},
    {n:'컴퓨터인공지능', p:'jbu_s', g:'자연', mg:'나', cut:85.2, conf:'e'},
    {n:'기계공학과',   p:'jbu_s', g:'자연', mg:'나', cut:83.0, conf:'e'},
  ]},
  { id:'kwu', name:'강원대', region:'춘천', depts:[
    {n:'의예과',       p:'med_mid', g:'의약', mg:'가', cut:98.0, conf:'e'},
    {n:'경영학과',     p:'kwu_h', g:'인문', mg:'가', cut:82.6, conf:'e'},
    {n:'인문계열',     p:'kwu_h', g:'인문', mg:'가', cut:80.4, conf:'e'},
    {n:'컴퓨터공학과', p:'kwu_s', g:'자연', mg:'나', cut:84.0, conf:'e'},
    {n:'전기전자공학', p:'kwu_s', g:'자연', mg:'나', cut:82.2, conf:'e'},
  ]},
  { id:'snue', name:'서울교대', region:'서울', depts:[
    {n:'초등교육과',   p:'edu_p', g:'인문', mg:'나', cut:89.0, conf:'e'},
  ]},
  { id:'gine', name:'경인교대', region:'경기', depts:[
    {n:'초등교육과',   p:'edu_p', g:'인문', mg:'나', cut:86.4, conf:'e'},
  ]},
];
