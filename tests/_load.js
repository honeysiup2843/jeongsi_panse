/* 테스트 로더
   빌드와 '같은 순서로' data.js + univs.js + engine.js 를 이어붙여 평가한다.
   테스트가 검증하는 코드와 페이지에 실리는 코드가 동일함을 보장하기 위함. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const src = ['src/data.js', 'src/univs.js', 'src/engine.js']
  .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8'))
  .join('\n');

const NAMES = [
  'PROFILES', 'UNIVS',
  'STD_MAX', 'ANCHOR', 'GRADE_CUT',
  'pctToStd', 'stdToPct', 'pctToGrade', 'clamp', 'normStd',
  'avgOf', 'tamAvg', 'calibrate', 'pctToStdCal', 'normalizeVals', 'calcScore',
  'meVals', 'cutVals', 'DEF_TH', 'TIER_ORDER', 'TIER_VAR', 'TIER_DESC',
  'tierOf', 'prob', 'CUT_MODES', 'cutEngOf', 'cutOf', 'analyze'
];

module.exports = new Function(`${src}\nreturn {${NAMES.join(',')}};`)();
