/* 의존성 없는 최소 테스트 하네스 */
let pass = 0, fail = 0;
const fails = [];

function group(name) { console.log('\n' + name); }
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  \x1b[32m✓\x1b[0m ' + name + (extra ? '  \x1b[2m' + extra + '\x1b[0m' : '')); }
  else { fail++; fails.push(name); console.log('  \x1b[31m✗\x1b[0m ' + name + (extra ? '  ' + extra : '')); }
}
function eq(name, a, b, tol) {
  const good = tol === undefined ? a === b : Math.abs(a - b) <= tol;
  ok(name, good, good ? '' : `기대 ${b}, 실제 ${a}`);
}
function info(line) { console.log('    \x1b[2m' + line + '\x1b[0m'); }
function done() {
  console.log(`\n${fail ? '\x1b[31m' : '\x1b[32m'}${pass} passed, ${fail} failed\x1b[0m`);
  if (fail) { fails.forEach(f => console.log('  - ' + f)); process.exitCode = 1; }
}
module.exports = { group, ok, eq, info, done };
