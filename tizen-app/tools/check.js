// Static checks for CI (Node 18+, needs `acorn`): every app script parses as ES5, and every file index.html loads exists.
// Usage: node tizen-app/tools/check.js   (from the repo root, after `npm i --no-save acorn`)
var fs = require('fs'), path = require('path'), acorn = require('acorn');
var APP = path.join(__dirname, '..'), bad = 0;
function fail(msg) { bad++; console.error('FAIL ' + msg); }

// 1. ES5 only in js/ (vendored js/lib is minified third-party code and excluded)
(function walk(dir) {
  fs.readdirSync(dir).forEach(function (f) {
    var p = path.join(dir, f), rel = path.relative(APP, p);
    if (fs.statSync(p).isDirectory()) { if (rel !== path.join('js', 'lib')) walk(p); return; }
    if (!/\.js$/.test(f)) return;
    try { acorn.parse(fs.readFileSync(p, 'utf8'), { ecmaVersion: 5, sourceType: 'script' }); }
    catch (e) { fail(rel + ':' + (e.loc ? e.loc.line + ':' + e.loc.column : '') + ' not ES5: ' + e.message); }
  });
})(path.join(APP, 'js'));

// 2. every local <script src> / stylesheet in index.html exists (tmdb-token.js is optional and generated at build time)
var html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8'), re = /(?:src|href)="([^"]+)"/g, m;
while ((m = re.exec(html))) {
  var u = m[1];
  if (/^(https?:|data:|#|\$WEBAPIS)/.test(u) || u === 'js/tmdb-token.js') continue;
  if (!fs.existsSync(path.join(APP, u.split(/[?#]/)[0]))) fail('index.html references missing file ' + u);
}

// 3. config.xml declares a semver version
var ver = /<widget [^>]*version="([^"]*)"/.exec(fs.readFileSync(path.join(APP, 'config.xml'), 'utf8'));
if (!ver || !/^\d+\.\d+\.\d+$/.test(ver[1])) fail('config.xml widget version is not x.y.z');

console.log(bad ? bad + ' problem(s)' : 'all checks passed');
process.exit(bad ? 1 : 0);
