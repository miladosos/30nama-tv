/* QR login screen. */
(function () {
  var S = N.screens = N.screens || {}, el = N.el, ui = N.ui, sc = N.sc;
  var userObj = sc.userObj;

  /* ================= QR login ================= */
  S.login = function (root) {
    var dead = false, pollT = null, startT = 0, code = null;
    root.classList.add('login');
    N.stage.neutral(true); N.splashReady();
    root.appendChild(el('div', 'lg-bg')); root.appendChild(el('div', 'lg-glow'));
    var mark = el('img', 'lg-mark'); mark.alt = ''; mark.src = 'img/logo-mark.png'; root.appendChild(mark);
    var logo = el('img', 'lg-logo'); logo.alt = ''; logo.src = 'img/logo.png'; root.appendChild(logo);
    var col = el('div', 'lg-col'); root.appendChild(col);
    col.appendChild(el('div', 'lg-h', N.t('scanTitle')));
    col.appendChild(el('div', 'lg-p', N.t('orVisit')));
    col.appendChild(ui.txt(el('div', 'lg-url'), '30nama.com/auth'));
    var codeBox = el('div', 'lg-code'), codeEl = el('span', 'latin', ''); codeEl.dir = 'ltr'; codeBox.appendChild(codeEl); col.appendChild(codeBox);
    var status = el('div', 'qr-status'); status.appendChild(el('i')); status.appendChild(el('span', '', N.t('waitingScan'))); col.appendChild(status);
    var acts = el('div', 'acts'), newB = ui.btn(N.t('newCode'), function () { cleanup(); dead = false; begin(); }, '');
    acts.appendChild(newB); col.appendChild(acts);
    var tile = el('div', 'qr-tile'), qrBox = el('div', 'qr'), okBox = el('div', 'ok'), exp = el('div', 'exp', N.t('codeExpired'));
    okBox.appendChild(ui.icon('check')); tile.appendChild(qrBox); tile.appendChild(exp); tile.appendChild(okBox); root.appendChild(tile);
    N.nav.focus(newB, true);

    // fa only: the official feature notes under the QR tile (guest home payload)
    if (N.lang === 'fa') N.getHome().then(function (h) {
      var n = !dead && h && h.hero_header && h.hero_header.notes;
      if (!n || !n.title) return;
      var w = el('div', 'lg-notes'); w.appendChild(el('div', 'nt', String(n.title)));
      if (n.features && n.features.length) { // the dot travels with the next item, so a wrap never leaves it dangling
        var nf = el('div', 'nf');
        n.features.forEach(function (f, i) { if (i) nf.appendChild(document.createTextNode(' ')); nf.appendChild(el('span', '', (i ? '· ' : '') + f)); });
        w.appendChild(nf);
      }
      root.appendChild(w);
    }).catch(function () {});

    function cleanup() { dead = true; clearInterval(pollT); }
    function begin() {
      tile.classList.remove('dim', 'done'); qrBox.innerHTML = ''; codeEl.textContent = ''; exp.textContent = N.t('codeExpired'); status.style.visibility = 'visible';
      N.api.get('qrlogin_code').then(function (r) {
        if (dead) return;
        code = r.code; var link = r.url || (N.config.qrBase + code);
        var qr = qrcode(0, 'M'); qr.addData(link); qr.make();
        qrBox.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
        codeEl.textContent = code;
        startT = Date.now(); clearInterval(pollT);
        pollT = setInterval(function () {
          if (dead) return;
          if (Date.now() - startT > N.config.qrTimeoutMs) { // expired
            clearInterval(pollT); tile.classList.add('dim'); status.style.visibility = 'hidden'; N.nav.focus(newB, true); return;
          }
          N.api.call('qrlogin_login', { auth_code: code }).then(function (j) {
            if (dead || !j || !j.success) return; // CODE_NOT_USED -> keep polling
            var u = userObj(j.result);
            var token = u ? u.user_session : (j.result && (j.result.token || j.result.user_session));
            if (!token) return;
            cleanup();
            N.setSession(u || { user_session: token });
            // qrlogin_login returns only {token}; fetch the profile with it
            N.api.call('user', {}).then(function (uj) {
              var rr = uj && uj.success && uj.result;
              var full = rr && (rr.user_session ? rr : (rr.user || rr));
              if (full) { if (!full.user_session) full.user_session = token; N.setSession(full); }
            }).catch(function () {}).then(function () {
              tile.classList.add('done'); status.style.visibility = 'hidden'; N.dropHome(); if (N.lists && N.lists.reset) N.lists.reset();
              var nm = N.session.user && N.session.user.user_name;
              N.toast(nm ? N.tf('welcomeName', { name: '\u2068' + nm + '\u2069' }) : N.t('welcome')); // FSI/PDI: a Latin name keeps the Persian comma on the right side
              setTimeout(function () { N.go('home', {}, { reset: true }); }, 400);
            });
          }).catch(function () {});
        }, N.config.qrPollMs);
      }).catch(function (e) {
        if (dead) return; tile.classList.add('dim'); exp.textContent = N.t('error'); status.style.visibility = 'hidden'; N.nav.focus(newB, true);
      });
    }
    begin();
    return { destroy: cleanup };
  };
})();
