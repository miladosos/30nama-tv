/* Search screen: tvOS linear keyboard (one sliding row of keys at y=170) + 6-column poster grid from y=350. */
(function () {
  var S = N.screens = N.screens || {}, el = N.el, ui = N.ui, sc = N.sc;

  /* ================= Search ================= */
  var KB = {
    en: 'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
    fa: ['ا', 'آ', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی', 'ئ', 'ء', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  };
  var COLS = 6, KW = 88, KFN = 188, KGAP = 12, ZWNJ = '‌';
  // query normalisation: Persian/Arabic digits -> ASCII, Arabic yeh/kaf -> Persian, collapse blanks. ZWNJ is kept.
  function norm(q) {
    return q.replace(/[۰-۹]/g, function (c) { return String(c.charCodeAt(0) - 1776); }).replace(/[٠-٩]/g, function (c) { return String(c.charCodeAt(0) - 1632); })
      .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[ \t]+/g, ' ').replace(/^\s+|\s+$/g, '');
  }
  S.search = function (root, params, restore) {
    var dead = false, seq = 0, timer = null, swT = null, q = (restore && restore.q) || (params && params.q) || '', kbLang = N.store.get('kbLang', 'en'); // English keyboard first: titles are English
    var keys = [], widths = [], cells = [], kMem = null, cMem = 0, wantIdx = restore && restore.idx >= 0 ? restore.idx : -1, langKey = null, micKey = null;
    if (kbLang !== 'fa' && kbLang !== 'en') kbLang = N.lang;
    root.classList.add('search'); N.stage.neutral(true);
    var spage = el('div', 's-page'); root.appendChild(spage);
    var field = el('div', 's-q'), qt = el('span', 'qt'), ph = el('span', 'ph-t', N.t('searchPh')), caret = el('i', 'caret');
    field.appendChild(qt); field.appendChild(caret); field.appendChild(ph); spage.appendChild(field);
    var kbw = el('div', 'kb-w'), kb = el('div', 'kb'); kbw.appendChild(kb); spage.appendChild(kbw);
    var rh = el('div', 'rh'), rg = el('div', 'rgrid'); spage.appendChild(rh); spage.appendChild(rg);
    rg.reveal = function (e) { ui.vscroll(spage, e._cell || e, 350); };
    var hid = el('input'); hid.type = 'text'; hid.setAttribute('autocomplete', 'off'); hid.style.cssText = 'position:absolute;left:-2000px;top:0;width:10px;height:10px';
    root.appendChild(hid);

    function key(label, w, cls, fn2) {
      var k = el('button', 'key f fl' + (cls ? ' ' + cls : ''));
      if (typeof label === 'string') k.textContent = label; else k.appendChild(label);
      k.style.width = w + 'px'; k._w = w; k.onclick = fn2; keys.push(k); widths.push(w); kb.appendChild(k);
      k.onfocus2 = function () { focusKey(k); };
      return k;
    }
    function focusKey(k) {
      kMem = k;
      var s = Math.max(0, Math.min(k._x + k._w / 2 - 960, kb._total - 1830));
      if (kb._sx !== s) { kb._sx = s; kb.style.transform = s ? 'translateX(' + ((kbLang === 'fa' ? 1 : -1) * s) + 'px)' : ''; }
      ui.vscroll(spage, kbw, 170);
    }
    function layout() {
      kb.innerHTML = ''; keys = []; widths = []; kb.dir = kbLang === 'fa' ? 'rtl' : 'ltr'; kb.className = 'kb ' + kbLang;
      KB[kbLang].forEach(function (c) { key(c, KW, '', function () { type(c); }); });
      key(N.t('space'), KFN, 'fn', function () { type(' '); });
      if (kbLang === 'fa') key(N.t('zwnj'), KFN, 'fn', function () { type(ZWNJ); });
      key('⌫', KW, 'fn bs' + (kbLang === 'fa' ? ' mirror' : ''), del);
      key(N.t('clearK'), KFN, 'fn', function () { q = ''; changed(); });
      langKey = key(kbLang === 'en' ? 'فا' : 'EN', KW, 'fn lg', function () {
        kbLang = kbLang === 'en' ? 'fa' : 'en'; N.store.set('kbLang', kbLang); layout(); N.nav.focus(langKey, true);
      });
      micKey = key(ui.icon('mic'), KW, 'fn', function () { hid.value = q; N.nav.focus(hid); });
      ui.layoutTrack(kb, keys, widths, KGAP, 90, 1830);
      kb._sx = null; kb.style.transition = 'none'; kb.style.transform = ''; void kb.offsetWidth; kb.style.transition = '';
      kMem = keys[0];
    }
    // row nav: Left/Right follow the layout direction (physical keys); start edge opens the sidebar
    kb.onnav = function (dir, cur) {
      var i = keys.indexOf(cur); if (i < 0) return false;
      if (dir === 'up') return true;
      if (dir === 'down') return cells.length ? cells[Math.min(cMem, Math.min(cells.length, COLS) - 1)].card : true;
      var n = i + ((dir === 'right') !== (kbLang === 'fa') ? 1 : -1);
      // row ends: the rail sits on the UI start edge, so only a move toward it opens the rail (EN keys in the fa UI run the other way)
      if (n < 0 || n >= keys.length) { if (ui.step(dir) < 0) N.rail.enter(); else ui.bump(cur, dir); return true; }
      return keys[n];
    };
    function type(c) { if (q.length < 60) { q += c; changed(); } }
    function del() { if (q) { q = q.slice(0, -1); changed(); } }
    function paintQ() {
      var fa = N.FA.test(q), lat = !fa && /[A-Za-z]/.test(q);
      qt.textContent = q; ph.style.display = q ? 'none' : '';
      if (q) { qt.dir = fa ? 'rtl' : 'ltr'; field.dir = qt.dir; } else { qt.removeAttribute('dir'); field.removeAttribute('dir'); }
      qt.classList.toggle('latin', lat);
    }
    function changed() { paintQ(); clearTimeout(timer); timer = setTimeout(run, 500); }
    hid.oninput = function () { q = hid.value; changed(); };
    hid.onenter = function () { hid.blur(); N.nav.focus(micKey, true); clearTimeout(timer); run(); };
    // physical keyboard (desktop testing / USB keyboards); MediaPlayPause = backspace while a key is focused
    function onKeyDown(e) {
      if ((N.player && N.player.open) || document.querySelector('.modal')) return;
      if (e.keyCode === N.keys.PLAYPAUSE) { if (N.nav.cur && kb.contains(N.nav.cur)) { e.preventDefault(); del(); } return; }
      if (document.activeElement === hid || e.ctrlKey || e.altKey || e.metaKey || !e.key || e.key.length !== 1) return;
      type(e.key.toLowerCase());
    }
    document.addEventListener('keydown', onKeyDown);

    function loadAround(i) {
      var row = Math.floor(i / COLS);
      for (var k = Math.max(0, (row - 1) * COLS); k < Math.min(cells.length, (row + 3) * COLS); k++) ui.load(cells[k].card);
    }
    function cellNav(idx) {
      return function (dir, cur) {
        var col = idx % COLS, last = cells.length - 1;
        if (dir === 'up') return idx < COLS ? (kMem || keys[0]) : cells[idx - COLS].card;
        if (dir === 'down') { if (cells[idx + COLS]) return cells[idx + COLS].card; return Math.floor(idx / COLS) < Math.floor(last / COLS) ? cells[last].card : true; }
        if (ui.step(dir) > 0) { if (col < COLS - 1 && cells[idx + 1]) return cells[idx + 1].card; ui.bump(cur, dir); return true; }
        if (col > 0) return cells[idx - 1].card;
        N.rail.enter(); return true;
      };
    }
    function show(posts, header, msg) {
      clearTimeout(swT); rg.classList.add('sw');
      swT = setTimeout(function () {
        if (dead) return;
        var inGrid = N.nav.cur && rg.contains(N.nav.cur);
        rg.innerHTML = ''; cells = []; cMem = 0;
        rh.className = 'rh' + (msg ? ' nores' : ''); rh.innerHTML = ''; rh.appendChild(ui.txt(el('span'), msg || header));
        posts.forEach(function (p, i) {
          var cell = ui.cell(p), c = cell.card;
          c.onclick = function () { N.go('details', { id: p.id }); };
          c.onfocus2 = function () { cMem = i % COLS; loadAround(i); };
          c.onnav = cellNav(i);
          cells.push(cell); rg.appendChild(cell);
        });
        for (var k = 0; k < Math.min(cells.length, 3 * COLS); k++) ui.load(cells[k].card);
        rg.classList.remove('sw');
        if (wantIdx >= 0) {
          var w = cells[wantIdx]; wantIdx = -1;
          if (w) { sc.instant(root, function () { N.nav.focus(w.card); }); return; }
        }
        if (inGrid || !N.nav.cur) N.nav.focus(kMem || keys[0], true);
      }, 120);
    }
    function popular(msg) {
      var my = seq; // a slow home_stream must not overwrite newer results
      N.getHome().then(function (h) {
        if (dead || my !== seq) return;
        var ps = (h.suggested && h.suggested.posts) || (h.movies && h.movies.posts) || [];
        show(ps.slice(0, 18), N.t('popularNow'), msg);
      }).catch(function () { if (!dead && my === seq) show([], '', msg || N.t('error')); });
    }
    function run() {
      var qq = norm(q), my = ++seq;
      if (qq.length < 3) { popular(''); return; } // the API rejects queries shorter than 3 letters
      function get(s) { return N.api.get('search', { query: s, streamonly: 'true', page: 1 }); }
      get(qq).then(function (r) {
        if (dead || my !== seq) return null;
        if ((!r || !r.posts || !r.posts.length) && qq.indexOf(ZWNJ) >= 0) return get(qq.replace(/‌/g, ' '));
        return r;
      }).then(function (r) {
        if (!r || dead || my !== seq) return;
        var ps = sc.extractPosts(r);
        if (!ps.length) { popular(N.tf('nothingFor', { q: '⁨' + qq + '⁩' })); return; }
        show(ps, N.t('topResults'), '');
      }).catch(function () { if (!dead && my === seq) popular(N.t('error')); });
    }
    layout(); paintQ();
    if (restore && keys[restore.k]) kMem = keys[restore.k];
    if (q) run(); else popular('');
    N.nav.focus(kMem || keys[0], true);
    return {
      destroy: function () { dead = true; clearTimeout(timer); clearTimeout(swT); document.removeEventListener('keydown', onKeyDown); },
      focusState: function () { var k = keys.indexOf(kMem); for (var i = 0; i < cells.length; i++) if (cells[i].card === N.nav.cur) return { q: q, idx: i, k: k }; return { q: q, idx: -1, k: k }; }
    };
  };
})();
