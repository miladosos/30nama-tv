(function () {
  var S = {
    en: {
      home: 'Home', search: 'Search', archive: 'Browse', settings: 'Settings', movies: 'Movies', series: 'Series', anime: 'Anime', account: 'Account',
      signIn: 'Sign in', scanTitle: 'Scan the QR code to sign in',
      orVisit: 'Or open this address on your phone or computer and enter the code:',
      guest: 'Continue as guest', loading: 'Loading...', error: 'Something went wrong', retry: 'Retry',
      continueWatching: 'Continue watching', hero_header: 'Featured', new_releases: 'New releases', suggested: 'Suggested',
      top_10: 'Top 10', top10: 'Top 10',
      play: 'Play', resume: 'Resume', details: 'Details', episodes: 'Episodes', season: 'Season', cast: 'Cast',
      movie: 'Movie',
      loginRequired: 'Sign in to stream and continue watching', playLogin: 'Sign in to watch', nothingFor: 'Nothing found for “{q}”',
      popularNow: 'Popular now', topResults: 'Results', searchPh: 'Search movies, series, anime',
      space: 'Space', clearK: 'Clear', browse: 'Browse', categories: 'Categories', genres: 'Genres', newest: 'Newest', popular: 'Popular', updated: 'Updated',
      language: 'Language', logout: 'Sign out', login: 'Sign in (QR)', expires: 'Subscription ends', unknown: 'unknown', userType: 'Plan',
      playback: 'Playback', display: 'Display', about: 'About', defSubs: 'Default subtitles', subSize: 'Subtitle size', autoplay: 'Autoplay next episode', reduce: 'Reduce motion',
      on: 'On', off: 'Off', small: 'Small', medium: 'Medium', large: 'Large', sample: 'This is how subtitles will look.',
      version: 'Version', unofficial: 'Unofficial client for 30nama.com', apiHost: 'API host',
      skipIntro: 'Skip intro', skipRecap: 'Skip recap', nextEpisode: 'Next episode', playNow: 'Play now', credits: 'Credits', audio: 'Audio', subtitles: 'Subtitles',
      english: 'English', persian: 'Persian', noStream: 'No stream available',
      exitTitle: 'Exit 30nama?', exitBody: 'You can come back any time.', exit: 'Exit', cancel: 'Cancel', logoutTitle: 'Sign out?', logoutBody: 'You will need to scan a new code to sign in again.',
      welcome: 'Welcome', sessionExpired: 'Your session expired. Please sign in again.', subFailed: 'Subtitle failed', playErr: 'Playback error',
      trendingWeek: 'Trending this week', newSeries: 'New & returning series', popularMovies: 'Popular movies now',
      crew: 'Crew', reviews: 'Reviews', moreLikeThis: 'More like this', nextEp: 'Next episode', close: 'Close', tmdb: 'TMDB metadata', tmdbOn: 'Connected', tmdbMock: 'Mock data', tmdbOff: 'Not configured', clearCache: 'Clear metadata cache', cleared: 'Cache cleared', tmdbCredit: 'Movie data from TMDB. Not endorsed or certified by TMDB.',
      Creator: 'Creator', Director: 'Director', Writer: 'Writer', Composer: 'Composer', 'Executive Producer': 'Executive producer',
      minLeftN: '{n} min left', seasonsN: '{n} seasons', seasonsN1: '{n} season', epN: 'Episode {n}', seasonEp: 'S{s}, E{e}', daysN: '{n} days', watched: 'Watched',
      watchlist: 'Watchlist', addToList: 'Add to Watchlist', removeFromList: 'Remove from Watchlist', addedToList: 'Added to Watchlist', removedFromList: 'Removed from Watchlist',
      emptyList: 'Your Watchlist is empty', removeCw: 'Remove from Continue Watching', moreInfo: 'More info', typeSeries: 'Series', typeAnime: 'Anime', startOver: 'Start Over',
      info: 'Information', genre: 'Genre', released: 'Released', runtime: 'Runtime', rated: 'Rated', country: 'Country', origLang: 'Original language', network: 'Network', status: 'Status',
      airContinuing: 'Returning series', airEnded: 'Ended', nextEpOn: 'Next episode: {d}', persianSubBadge: 'Persian subtitles', exclusiveSub: 'Exclusive subtitles',
      newEp: 'New episode', newBadge: 'New', zwnj: 'ZWNJ', titlesN: '{n} titles', userName: 'Username', remaining: 'Days remaining',
      defQuality: 'Default quality', qMax: 'Highest', qAuto: 'Auto', audioCh: 'Audio channels', chAuto: 'Automatic', ch6: '5.1 (6 channels)', ch2: 'Stereo (2 channels)',
      quality: 'Quality', subOff: 'Off', audioLang: 'Audio language', track: 'Track {n}', secs: '{n}s', aboutName: '30nama TV', userFallback: 'User',
      welcomeName: 'Welcome, {name}', guestName: 'Guest', signInShort: 'Sign in', waitingScan: 'Waiting for scan…', codeExpired: 'Code expired', newCode: 'New code', back: 'Back',
      err403: 'You can\'t watch this title', err404: 'File not found', err503: 'This title is temporarily unavailable', errNet: 'Can\'t reach the server', errBlock: 'Too many requests. Please try again in a few minutes.', errMaint: '30nama is under maintenance. Please try again later.',
      ut_admin: 'Admin', ut_blue: 'Blue', ut_free: 'Free', ut_golden: 'Gold', ut_red: 'Red', ut_robot: 'Robot', ut_staff: 'Staff'
    },
    fa: {
      home: 'خانه', search: 'جستجو', archive: 'آرشیو', settings: 'تنظیمات', movies: 'فیلم‌ها', series: 'سریال‌ها', anime: 'انیمه', account: 'حساب کاربری',
      signIn: 'ورود', scanTitle: 'برای ورود، کد QR را با گوشی اسکن کنید',
      orVisit: 'یا در مرورگر گوشی یا رایانه به این آدرس بروید و کد زیر را وارد کنید:',
      guest: 'ورود به‌عنوان مهمان', loading: 'در حال بارگذاری…', error: 'مشکلی پیش آمد', retry: 'تلاش دوباره',
      continueWatching: 'ادامه تماشا', hero_header: 'ویژه', new_releases: 'جدیدترین‌ها', suggested: 'پیشنهادی‌ها',
      top_10: '۱۰ عنوان برتر', top10: '۱۰ عنوان برتر',
      play: 'پخش', resume: 'ادامه تماشا', details: 'جزئیات', episodes: 'قسمت‌ها', season: 'فصل', cast: 'بازیگران',
      movie: 'فیلم',
      loginRequired: 'برای تماشای آنلاین وارد حساب کاربری شوید', playLogin: 'برای تماشا وارد شوید', nothingFor: 'نتیجه‌ای برای «{q}» پیدا نشد',
      popularNow: 'محبوب این روزها', topResults: 'نتایج جستجو', searchPh: 'جستجوی فیلم، سریال و انیمه',
      space: 'فاصله', clearK: 'پاک کردن', browse: 'مرور', categories: 'دسته‌ها', genres: 'ژانرها', newest: 'جدیدترین', popular: 'محبوب‌ترین', updated: 'آخرین به‌روزرسانی',
      language: 'زبان', logout: 'خروج از حساب کاربری', login: 'ورود با کد QR', expires: 'اعتبار اشتراک تا', unknown: 'نامشخص', userType: 'نوع اشتراک',
      playback: 'پخش', display: 'نمایش', about: 'درباره برنامه', defSubs: 'زیرنویس پیش‌فرض', subSize: 'اندازه زیرنویس', autoplay: 'پخش خودکار قسمت بعد', reduce: 'کاهش جلوه‌های حرکتی',
      on: 'روشن', off: 'خاموش', small: 'کوچک', medium: 'معمولی', large: 'بزرگ', sample: 'زیرنویس‌ها این‌گونه نمایش داده می‌شوند.',
      version: 'نسخه', unofficial: 'برنامهٔ غیررسمی برای ۳۰نما', apiHost: 'سرور',
      skipIntro: 'رد کردن تیتراژ', skipRecap: 'رد کردن خلاصه', nextEpisode: 'قسمت بعد', playNow: 'پخش قسمت بعد', credits: 'تماشای تیتراژ', audio: 'صدا', subtitles: 'زیرنویس',
      english: 'انگلیسی', persian: 'فارسی', noStream: 'نسخهٔ آنلاین این عنوان در دسترس نیست',
      exitTitle: 'خروج از ۳۰نما؟', exitBody: 'هر زمان بخواهید می‌توانید برگردید.', exit: 'خروج', cancel: 'انصراف', logoutTitle: 'از حساب کاربری خارج می‌شوید؟', logoutBody: 'برای ورود دوباره باید کد QR جدیدی اسکن کنید.',
      welcome: 'خوش آمدید', sessionExpired: 'زمان ورود شما به پایان رسیده است. لطفاً دوباره وارد شوید.', subFailed: 'بارگذاری زیرنویس ناموفق بود', playErr: 'خطای پخش',
      trendingWeek: 'پرطرفدار این هفته', newSeries: 'سریال‌های جدید و ادامه‌دار', popularMovies: 'فیلم‌های محبوب روز',
      crew: 'عوامل', reviews: 'نقدها', moreLikeThis: 'عناوین مشابه', nextEp: 'قسمت بعد', close: 'بستن', tmdb: 'اطلاعات TMDB', tmdbOn: 'متصل', tmdbMock: 'داده آزمایشی', tmdbOff: 'تنظیم نشده', clearCache: 'پاک کردن حافظه نهان', cleared: 'پاک شد', tmdbCredit: 'اطلاعات فیلم‌ها از TMDB است؛ این برنامه مورد تأیید TMDB نیست.',
      Creator: 'سازنده', Director: 'کارگردان', Writer: 'نویسنده', Composer: 'آهنگساز', 'Executive Producer': 'تهیه‌کننده اجرایی',
      minLeftN: '{n} دقیقه مانده', seasonsN: '{n} فصل', seasonsN1: '{n} فصل', epN: 'قسمت {n}', seasonEp: 'فصل {s}، قسمت {e}', daysN: '{n} روز', watched: 'تماشا شده',
      watchlist: 'لیست تماشا', addToList: 'افزودن به لیست تماشا', removeFromList: 'حذف از لیست تماشا', addedToList: 'به لیست تماشا اضافه شد', removedFromList: 'از لیست تماشا حذف شد',
      emptyList: 'لیست تماشای شما خالی است', removeCw: 'حذف از ادامه تماشا', moreInfo: 'اطلاعات بیشتر', typeSeries: 'سریال', typeAnime: 'انیمه', startOver: 'پخش از ابتدا',
      info: 'اطلاعات', genre: 'ژانر', released: 'سال انتشار', runtime: 'مدت', rated: 'رده سنی', country: 'کشور', origLang: 'زبان اصلی', network: 'شبکه', status: 'وضعیت',
      airContinuing: 'در حال پخش', airEnded: 'پایان‌یافته', nextEpOn: 'قسمت بعد: {d}', persianSubBadge: 'زیرنویس فارسی', exclusiveSub: 'زیرنویس اختصاصی',
      newEp: 'قسمت جدید', newBadge: 'جدید', zwnj: 'نیم‌فاصله', titlesN: '{n} عنوان', userName: 'نام کاربری', remaining: 'روزهای باقی‌مانده',
      defQuality: 'کیفیت پیش‌فرض', qMax: 'بالاترین', qAuto: 'خودکار', audioCh: 'کانال صدا', chAuto: 'اتوماتیک', ch6: '۶ کاناله', ch2: '۲ کاناله',
      quality: 'کیفیت', subOff: 'بدون زیرنویس', audioLang: 'زبان صدا', track: 'صدای {n}', secs: '{n} ثانیه', aboutName: '۳۰نما', userFallback: 'کاربر',
      welcomeName: '{name}، خوش آمدید', guestName: 'مهمان', signInShort: 'ورود به حساب', waitingScan: 'در انتظار اسکن…', codeExpired: 'کد منقضی شد', newCode: 'کد جدید', back: 'بازگشت',
      err403: 'شما مجاز به تماشای این عنوان نیستید', err404: 'فایل پیدا نشد', err503: 'تماشای این عنوان موقتاً غیرفعال است', errNet: 'خطا در برقراری ارتباط با سرور', errBlock: 'درخواست‌ها بیش از حد مجاز است. چند دقیقهٔ دیگر دوباره تلاش کنید.', errMaint: '۳۰نما در حال به‌روزرسانی است. کمی بعد دوباره تلاش کنید.',
      ut_admin: 'ادمین', ut_blue: 'بلو', ut_free: 'رایگان', ut_golden: 'طلایی', ut_red: 'قرمز', ut_robot: 'ربات', ut_staff: 'همکار'
    }
  };
  N.lang = N.store.get('lang', 'fa');
  if (N.lang !== 'fa' && N.lang !== 'en') N.lang = 'fa';
  N.t = function (k) { var d = S[N.lang] || S.en; return d[k] !== undefined ? d[k] : (S.en[k] !== undefined ? S.en[k] : k); };
  // merge {fa:{...}, en:{...}} into the string tables (screens/modules add their own copy without touching this file)
  N.addStrings = function (d) { for (var l in d) if (d.hasOwnProperty(l)) { var t = S[l] || (S[l] = {}); for (var k in d[l]) if (d[l].hasOwnProperty(k)) t[k] = d[l][k]; } };
  // template lookup: N.tf('minLeftN', {n: 12})
  N.tf = function (k, v) { v = v || {}; return N.t(k).replace(/\{(\w+)\}/g, function (_, x) { return v[x] !== undefined ? v[x] : ''; }); };
  N.setLang = function (l) {
    N.lang = l; N.store.set('lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr';
  };
  N.isRtl = function () { return N.lang === 'fa'; };
  document.documentElement.lang = N.lang;
  document.documentElement.dir = N.lang === 'fa' ? 'rtl' : 'ltr';

  /* ---------- formatting (the DOM keeps ASCII digits; VzFD draws Persian glyphs in fa) ---------- */
  var FA_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  var EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fa() { return N.lang === 'fa'; }
  function ascii(s) { return String(s === undefined || s === null ? '' : s).replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); }).replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); }); }
  N.fmt = {
    num: function (n, dec) {
      n = Number(n); if (isNaN(n)) return '';
      var s = dec !== undefined ? n.toFixed(dec) : String(n), neg = s.charAt(0) === '-'; if (neg) s = s.slice(1);
      var p = s.split('.'), ip = p[0], g = fa() ? '٬' : ',';
      ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, g);
      return (neg ? '-' : '') + ip + (p.length > 1 ? (fa() ? '٫' : '.') + p[1] : '');
    },
    dur: function (min) {
      min = Math.round(Number(min) || 0); if (min <= 0) return '';
      var h = Math.floor(min / 60), m = min % 60;
      if (fa()) return (h ? h + ' ساعت' : '') + (h && m ? ' و ' : '') + (m ? m + ' دقیقه' : '');
      return (h ? h + ' hr' : '') + (h && m ? ' ' : '') + (m ? m + ' min' : '');
    },
    ep: function (s, e) { return N.tf('seasonEp', { s: s, e: e }); },
    list: function (arr) {
      var out = []; for (var i = 0; i < (arr || []).length; i++) if (arr[i] !== undefined && arr[i] !== null && arr[i] !== '') out.push('⁨' + arr[i] + '⁩');
      return out.join(fa() ? '، ' : ', ');
    },
    // Jalali 'YYYY-MM-DD' (Persian or ASCII digits) -> '24 مهر 1405'
    jdate: function (j) {
      var m = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(ascii(j)); if (!m || !FA_MONTHS[+m[2] - 1]) return ascii(j);
      return (+m[3]) + ' ' + FA_MONTHS[+m[2] - 1] + ' ' + m[1];
    },
    // Gregorian 'YYYY-MM-DD…' -> 'Jan 31, 2027'
    gdate: function (g) {
      var m = /(\d{4})-(\d{1,2})-(\d{1,2})/.exec(ascii(g)); if (!m || !EN_MONTHS[+m[2] - 1]) return String(g || '');
      return EN_MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1];
    },
    // {j:'۲۴ مهر ۱۴۰۵ جمعه', g:'16 October 2026 Friday'} -> 'جمعه 24 مهر' | 'Friday, October 16'
    nextDate: function (o) {
      if (!o) return '';
      var p;
      if (fa() && o.j) {
        p = ascii(o.j).replace(/^\s+|\s+$/g, '').split(/\s+/); if (p.length < 2) return p.join(' ');
        var wd = p.pop(); if (/^\d{4}$/.test(p[p.length - 1])) p.pop();
        return wd + ' ' + p.join(' ');
      }
      if (o.g) {
        p = String(o.g).replace(/^\s+|\s+$/g, '').split(/\s+/); if (p.length < 4) return p.join(' ');
        return p[3] + ', ' + p[1] + ' ' + (+p[0]);
      }
      return ascii(o.j || '');
    }
  };
})();
