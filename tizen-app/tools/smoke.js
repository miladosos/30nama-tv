// Headless smoke test for CI (needs `playwright` + chromium): boots the app through the dev server with no session
// and checks it reaches a screen (login, or the error view if the API is unreachable) without script errors.
// Usage: node tizen-app/tools/smoke.js [baseUrl]   (dev server already running, default http://localhost:8080/)
var pw, launch = {};
try { pw = require('playwright'); } catch (e) { pw = require('playwright-core'); launch.channel = 'chrome'; } // local runs: use installed Chrome
var BASE = process.argv[2] || 'http://localhost:8080/';

(async function () {
  var browser = await pw.chromium.launch(launch);
  var page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  var errors = [];
  page.on('pageerror', function (e) { errors.push(e.message); });
  var out = {};
  for (var lang of ['fa', 'en']) {
    await page.goto(BASE + '?lang=' + lang, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#content .screen', { timeout: 90000 }).catch(function () {});
    out[lang] = await page.evaluate(function () {
      var s = document.querySelector('#content .screen');
      return { screen: s ? s.className : null, dir: document.documentElement.dir, focused: !!document.querySelector('.focus') };
    });
  }
  await browser.close();
  console.log(JSON.stringify(out));
  var ok = !errors.length && out.fa.screen && out.en.screen && out.fa.dir === 'rtl' && out.en.dir === 'ltr' && out.fa.focused;
  if (errors.length) console.error('page errors:\n  ' + errors.join('\n  '));
  if (!ok) { console.error('smoke test failed'); process.exit(1); }
  console.log('smoke test passed');
})().catch(function (e) { console.error(e); process.exit(1); });
