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

/* 대학·모집단위·합격선(UNIVS)은 src/univs.js — 「어디가」 원자료에서 자동 생성된다. */
