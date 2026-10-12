/* Screens, shared helpers. Loaded before every screens/*.js; exposes N.screens (registry) and N.sc (helpers). */
(function () {
  var el = N.el, ui = N.ui;
  N.screens = N.screens || {};

  function userObj(r) { return (r && r.user_session) ? r : (r && r.user && r.user.user_session ? r.user : null); }
  function errorView(root, e, retry) {
    root.innerHTML = '';
    var w = el('div', 'center-msg'); w.appendChild(ui.icon('warn'));
    w.appendChild(el('div', 'm', N.t('error')));
    if (e && e.message) w.appendChild(ui.txt(el('div', 'md'), e.message)); // raw detail: small, isolated Latin line
    var b = ui.btn(N.t('retry'), retry, ''); w.appendChild(b); root.appendChild(w); N.nav.focus(b, true);
  }
  function instant(root, fn) { root.classList.add('noanim'); fn(); void root.offsetWidth; root.classList.remove('noanim'); }
  function skeletonHome(root) {
    var w = el('div', 'skel-wrap'), b = el('div', 'sk-bb');
    [[600, 64, 0], [420, 28, 20], [760, 28, 20], [760, 28, 12]].forEach(function (s) { var x = el('div', 'bar'); x.style.width = s[0] + 'px'; x.style.height = s[1] + 'px'; x.style.marginTop = s[2] + 'px'; b.appendChild(x); });
    w.appendChild(b);
    var r = el('div', 'sk-rows'); r.style.top = '640px';
    for (var i = 0; i < 7; i++) r.appendChild(ui.skelCard());
    w.appendChild(r); root.appendChild(w); return w;
  }

  N.sc = { extractPosts: N.extractPosts, userObj: userObj, errorView: errorView, instant: instant, skeletonHome: skeletonHome };
})();
