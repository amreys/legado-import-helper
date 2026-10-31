// ==UserScript==
// @name         阅读书源/订阅源识别导入（移动版）
// @name:en      Legado / Yuedu Source Importer (Mobile)
// @namespace    https://greasyfork.org/users/you
// @version      2.4.1
// @description  在手机浏览器中打开阅读（Legado）的源链接，页面右下角显示源名称按钮，点击即可一键导入书源、订阅源、替换规则、字典规则、朗读引擎、主题、排版与目录规则。单次导入超过 10 个源时，将先列出清单以供确认。
// @description:en Open a Legado source link in a mobile browser. A button showing the source name appears in the bottom-right corner; tap it to import book sources, RSS sources, replace rules, dict rules, TTS engines, themes, reading layouts and TOC rules in one tap. A list is shown for confirmation when importing more than 10 sources.
// @author       you
// @homepageURL  https://greasyfork.org/zh-CN/scripts/603178
// @supportURL   https://greasyfork.org/zh-CN/scripts/603178/feedback
// @license      MIT
// @match        *://*/*
// @run-at       document-idle
// @grant        none
// @noframes
// @compatible   Via 浏览器
// @compatible   X 浏览器 / Kiwi / Firefox 手机版 / 雨见浏览器
// @compatible   阅读 Legado 全系分支（MD3 / Sigma / Max / R / Archive / LegadoTeam / 鸿蒙版）
// ==/UserScript==

(function () {
  'use strict';

  if (document.getElementById('lih-dock')) return;   // 防重复注入

  /* ============ 1. 导入协议 ============ */
  // Legado 官方 path：bookSource / rssSource / replaceRule / textTocRule /
  //                  httpTTS / theme / readConfig / dictRule / addToBookshelf
  // 书源沿用 yuedu:// 旧路径（阅读2/3 都认，兼容性最好），其余用 legado://
  // 线性图标（比 emoji 干净，且能跟随文字颜色）
  const ic = (d) => `<svg viewBox="0 0 24 24" width="15" height="15" fill="none"
    stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  const SCHEME = {
    bookSource: { url: 'yuedu://booksource/importonline?src=', label: '书源',
      icon: ic('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>') },
    rssSource: { url: 'legado://import/rssSource?src=', label: '订阅源',
      icon: ic('<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.2" fill="currentColor"/>') },
    replaceRule: { url: 'legado://import/replaceRule?src=', label: '替换规则',
      icon: ic('<path d="M3 5h18l-7 8v6l-4 2v-8z"/>') },
    dictRule: { url: 'legado://import/dictRule?src=', label: '字典',
      icon: ic('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>') },
    httpTTS: { url: 'legado://import/httpTTS?src=', label: '朗读引擎',
      icon: ic('<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>') },
    theme: { url: 'legado://import/theme?src=', label: '主题',
      icon: ic('<circle cx="12" cy="12" r="9"/><circle cx="9" cy="9.5" r="1.1" fill="currentColor"/><circle cx="15" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="15" r="1.1" fill="currentColor"/>') },
    readConfig: { url: 'legado://import/readConfig?src=', label: '排版',
      icon: ic('<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M9 21V9"/>') },
    textTocRule: { url: 'legado://import/textTocRule?src=', label: '目录规则',
      icon: ic('<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1.1" fill="currentColor"/><circle cx="3.5" cy="12" r="1.1" fill="currentColor"/><circle cx="3.5" cy="18" r="1.1" fill="currentColor"/>') },
    auto: { url: 'legado://import/auto?src=', label: '源文件',
      icon: ic('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>') },
  };

  /* ============ 1.5 明暗判定（看页面实际底色，不只看系统） ============ */
  const lumOf = (m) => (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
  const RGBA = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)/;

  function bgLum(el) {
    try {
      const bg = getComputedStyle(el).backgroundColor;
      const m = bg && bg.match(RGBA);
      if (!m) return null;
      const a = m[4] === undefined ? 1 : parseFloat(m[4]);
      if (a < 0.5) return null;            // 透明 → 不算数
      return lumOf(m);
    } catch (e) { return null; }
  }

  // 先看页面真实底色，再看系统——按钮是贴在页面上的，页面说了算
  function isDarkPage() {
    try {
      const b = bgLum(document.body);
      if (b !== null) return b < 0.45;
      const h = bgLum(document.documentElement);
      if (h !== null) return h < 0.45;
      return matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {}
    return false;                          // 兜底当白底
  }

  /* ============ 0. 样式：集中注入一次，元素只用 class ============ */
  function injectCSS() {
    if (document.getElementById('lih-css')) return;
    const st = document.createElement('style');
    st.id = 'lih-css';
    st.textContent = `#lih-dock{position:fixed;z-index:2147483647;display:inline-flex;align-items:center;height:42px;
padding:0 14px;border-radius:21px;text-decoration:none;touch-action:none;user-select:none;
-webkit-user-select:none;-webkit-tap-highlight-color:transparent;font:600 12.5px/1 system-ui,sans-serif;
background:#4f46e5;color:#fff;border:1px solid rgba(255,255,255,.22);
box-shadow:0 6px 20px rgba(79,70,229,.42);transition:opacity .28s,transform .28s,background .2s,color .2s}
#lih-dock.lih-dk{background:rgba(244,245,250,.96);color:#14161c;border-color:rgba(255,255,255,.6);
box-shadow:0 6px 22px rgba(0,0,0,.45)}
#lih-dock .lih-ic{display:inline-flex;align-items:center;margin-right:6px}
#lih-dock .lih-txt{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#lih-dock.lih-tuck{width:42px;padding:0;justify-content:center}
#lih-dock.lih-tuck .lih-ic{margin:0;transform:scale(1.18)}
#lih-dock.lih-tuck .lih-txt{display:none}
.lih-mask{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;
justify-content:center;padding:16px;background:rgba(0,0,0,.42)}
.lih-card{width:100%;max-width:430px;max-height:70vh;overflow:auto;background:#fff;color:#1a1c24;
border-radius:16px;padding:18px 18px 14px;box-shadow:0 10px 40px rgba(0,0,0,.3);
font:14px/1.5 system-ui,-apple-system,"Microsoft YaHei",sans-serif}
.lih-card.lih-dk{background:#24262b;color:#f2f3f5}
.lih-h{font-size:16px;font-weight:700;margin-bottom:4px}
.lih-sub{font-size:12.5px;opacity:.62;margin-bottom:12px}
.lih-row{display:flex;gap:8px;font-size:13px;padding:5px 0;border-top:1px solid #f0f1f5}
.lih-dk .lih-row{border-color:#33363d}
.lih-n{opacity:.45;flex:0 0 16px}
.lih-t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lih-more{font-size:12.5px;opacity:.55;padding-top:8px}
.lih-p{font-size:13px;opacity:.66;line-height:1.6}
.lih-bar{display:flex;gap:10px;margin-top:14px}
.lih-btn{flex:1;padding:11px 0;border-radius:11px;font:600 14px/1 system-ui,sans-serif;
border:none;color:#4b5563;background:#f1f2f6}
.lih-dk .lih-btn{color:#d7dae0;background:#33363d}
.lih-btn.lih-on{color:#fff;background:#4f46e5}
.lih-toast{position:fixed;left:50%;bottom:130px;transform:translateX(-50%);max-width:78vw;
background:rgba(30,34,40,.88);color:#fff;font-size:14px;line-height:1.45;padding:10px 18px;
border-radius:12px;z-index:2147483647;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
pointer-events:none;opacity:0;transition:opacity .28s;text-align:center}
.lih-toast.lih-dk{background:rgba(246,247,251,.96);color:#14161c}`;
    (document.head || document.documentElement).appendChild(st);
  }

  /* ============ 2. Toast（三级兜底） ============ */
  function showToast(msg, ms) {
    try { if (typeof GM_toast === 'function') { GM_toast(msg); return; } } catch (e) {}
    try { if (typeof GM !== 'undefined' && GM.toast) { GM.toast(msg); return; } } catch (e) {}
    const t = document.createElement('div');
    t.className = 'lih-toast' + (isDarkPage() ? ' lih-dk' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, ms || 2600);
  }

  /* ============ 3. 取页面文本 ============ */
  function looksJson(s) {
    if (!s || s.length < 20) return false;
    const c = s[0];
    return c === '{' || c === '[' || c === '"' || s.includes('"bookSourceUrl"') || s.includes('"sourceUrl"');
  }

  function getRawText() {
    // 3.1 <pre> / <code> / <textarea>（JSON 查看器最常见）
    const blocks = document.querySelectorAll('pre, code, textarea');
    for (const el of blocks) {
      const s = (el.value || el.textContent || '').trim();
      if (looksJson(s)) return s;
    }
    // 3.2 body 纯文本（限长度，避免在正常网页上白扫）
    const body = document.body;
    if (body) {
      const s = (body.innerText || body.textContent || '').trim();
      if (s.length < 4e6 && looksJson(s)) return s;
    }
    return null;
  }

  // 去 BOM / 去前导注释 / 去二次编码（"{\"a\":1}"）
  function normalize(raw) {
    let s = raw.replace(/^\uFEFF/, '').trim();
    // 前导 // 或 /* */ 注释（有人给 JSON 加注释）
    const i = s.search(/[\[{]/);
    if (i > 0) {
      const head = s.slice(0, i);
      if (!/["\d]/.test(head)) s = s.slice(i);
    }
    // 二次编码
    for (let k = 0; k < 2; k++) {
      if (s[0] === '"' && s[s.length - 1] === '"') {
        try { s = JSON.parse(s); } catch (e) { break; }
      } else break;
    }
    return s;
  }

  // 拆包：{data:[...]} / {bookSources:[...]} / {sources:[...]}
  function unwrap(o) {
    if (Array.isArray(o)) return o;
    if (!o || typeof o !== 'object') return [o];
    for (const k of ['data', 'bookSources', 'sources', 'items', 'list', 'result']) {
      if (Array.isArray(o[k])) return o[k];
      if (o[k] && typeof o[k] === 'object') return unwrap(o[k]);
    }
    return [o];
  }

  /* ============ 4. 类型判定 ============ */
  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  function classify(o) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) return null;
    // 书源：bookSourceUrl 必备
    if (has(o, 'bookSourceUrl') || (has(o, 'bookSourceName') && (has(o, 'ruleSearch') || has(o, 'searchUrl'))))
      return 'bookSource';
    // 订阅源
    if (has(o, 'sourceUrl') || (has(o, 'sourceName') && (has(o, 'ruleArticles') || has(o, 'ruleTitle'))))
      return 'rssSource';
    // 替换规则：pattern + replacement（Legado ReplaceRule 固定字段）
    if (has(o, 'pattern') && has(o, 'replacement')) return 'replaceRule';
    // 字典规则
    if (has(o, 'urlRule') && has(o, 'showRule')) return 'dictRule';
    // 朗读引擎
    if (has(o, 'contentType') && (has(o, 'url') || has(o, 'urlRule')) && !has(o, 'bookSourceUrl')) return 'httpTTS';
    // 主题
    if (has(o, 'theme') && has(o, 'name')) return 'theme';
    // 阅读排版
    if (has(o, 'readConfig') || (has(o, 'name') && has(o, 'fontSize') && has(o, 'lineSpacing'))) return 'readConfig';
    // 本地txt目录规则
    if (has(o, 'rule') && has(o, 'name') && has(o, 'serialNumber')) return 'textTocRule';
    return null;
  }

  /* ============ 5. 取名字 ============ */
  const NAME_KEYS  = ['bookSourceName', 'sourceName', 'name', 'title', 'ruleName'];
  const GROUP_KEYS = ['bookSourceGroup', 'sourceGroup', 'group'];

  function pickName(o) {
    for (const k of NAME_KEYS) {
      const v = o[k];
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
    // 没有名字就从 URL 里抠个域名当名字
    const u = o.bookSourceUrl || o.sourceUrl || o.url;
    if (typeof u === 'string' && u) {
      try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) {}
    }
    return '';
  }

  function pickGroups(list) {
    const set = new Set();
    list.forEach(o => {
      for (const k of GROUP_KEYS) {
        const v = o[k];
        if (typeof v === 'string' && v.trim()) {
          v.split(/[;；,，、\s]+/).forEach(x => { if (x) set.add(x); });
          break;
        }
      }
    });
    return [...set];
  }

  /* ============ 6. 总判定 ============ */
  function detect(raw) {
    const text = normalize(raw);
    let data;
    try { data = JSON.parse(text); }
    catch (e) {
      // 非严格 JSON：靠特征串兜底
      if (text.includes('"bookSourceUrl"')) return build('bookSource', [{ bookSourceName: guessName(text) }], true);
      if (text.includes('"sourceUrl"')) return build('rssSource', [{ sourceName: guessName(text) }], true);
      if (text.includes('"replacement"') && text.includes('"pattern"')) return build('replaceRule', [{}], true);
      return null;
    }

    const list = unwrap(data).filter(o => o && typeof o === 'object' && !Array.isArray(o));
    if (!list.length) return null;

    // 前 20 条投票定类型
    const probe = list.slice(0, 20);
    const votes = {};
    probe.forEach(o => { const t = classify(o); if (t) votes[t] = (votes[t] || 0) + 1; });
    let type = null, max = 0;
    for (const k in votes) if (votes[k] > max) { max = votes[k]; type = k; }
    if (!type) return null;

    // 类型混杂（比如配置包里有书源+订阅）→ 用 auto 让 App 自己判断
    if (Object.keys(votes).length > 1) type = 'auto';

    return build(type, list, false);
  }

  function guessName(text) {
    const m = text.match(/"(?:bookSourceName|sourceName)"\s*:\s*"([^"]{1,40})"/);
    return m ? m[1] : '';
  }

  function build(type, list, weak) {
    const cfg = SCHEME[type] || SCHEME.auto;
    const count = list.length;
    let name = '';
    let btnText = '';
    let toast = '';
    let group = '';

    if (count === 1) {
      name = pickName(list[0]) || cfg.label;
      group = pickGroups(list)[0] || '';
      btnText = `导入 ${name}`;
      toast = `发现${cfg.label}：${name}` + (group ? `（分组：${group}）` : '');
    } else {
      const groups = pickGroups(list);
      if (groups.length) {
        // 多源同一组 = 源组合
        name = groups.slice(0, 2).join('、') + (groups.length > 2 ? ' 等' : '');
        group = name;
        btnText = `导入 ${name} ${count}源`;
        toast = groups.length === 1
          ? `发现${cfg.label}组合「${name}」，共 ${count} 个源`
          : `发现 ${count} 个${cfg.label}，分组：${name}`;
      } else {
        const first = pickName(list[0]);
        name = first ? `${first} 等${count}源` : `${count}个${cfg.label}`;
        btnText = `导入 ${name}`;
        toast = first
          ? `发现${cfg.label}：${first} 等 ${count} 个（无分组）`
          : `发现 ${count} 个${cfg.label}（无名称）`;
      }
    }

    return { type, cfg, count, name, group, weak: !!weak, btnText, toast, list };
  }

  /* ============ 7. 悬浮胶囊 ============ */
  const H = 42;          // 胶囊高度
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function copyText(s) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(s); return true;
      }
    } catch (e) {}
    try {
      const ta = document.createElement('textarea');
      ta.value = s; ta.style.cssText = 'position:fixed;left:-9999px;';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy'); ta.remove(); return ok;
    } catch (e) { return false; }
  }

  function createBall(info, importUrl) {
    injectCSS();

    const pill = document.createElement('a');
    pill.id = 'lih-dock';
    pill.href = importUrl;
    pill.title = info.toast;
    pill.setAttribute('aria-label', info.toast);
    pill.innerHTML = `<span class="lih-ic">${info.cfg.icon}</span>` +
      `<span class="lih-txt">${info.btnText}</span>`;

    // 白底页面 → 实心品牌色；深色页面 → 近白。两边都保证高对比
    function applyTheme() { pill.classList.toggle('lih-dk', isDarkPage()); }
    applyTheme();
    try {
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    } catch (e) {
      try { matchMedia('(prefers-color-scheme: dark)').addListener(applyTheme); } catch (e2) {}
    }

    document.body.appendChild(pill);

    let side = localStorage.getItem('lih_side') || 'right';
    let yRatio = parseFloat(localStorage.getItem('lih_y') || '0.72');
    let tucked = false, tuckTimer = null, suppressClick = false, wasTucked = false, hinted = false;

    // 收起态：只留图标（圆形），避免长名字贴边时挡住正文
    function position() {
      pill.classList.toggle('lih-tuck', tucked);
      const w = pill.offsetWidth || 120;
      pill.style.left = side === 'right' ? '' : '0';
      pill.style.right = side === 'right' ? '0' : '';
      pill.style.top = clamp(yRatio * innerHeight, 60, innerHeight - H - 12) + 'px';
      const keep = 34;                                   // 收起时露出多少像素（够看清图标）
      const shift = (side === 'right' ? 1 : -1) * (w - keep);
      pill.style.opacity = tucked ? '.62' : '1';
      pill.style.transform = tucked ? `translateX(${shift}px)` : '';
    }
    function tuck(delay) {
      clearTimeout(tuckTimer);
      tuckTimer = setTimeout(() => { tucked = true; position(); }, delay);
    }

    /* --- 底部弹层（预览 / 未唤起兜底） --- */
    const PREVIEW_MIN = 10;          // ≥10 个才弹预览，小包直接导入
    let sheet = null, fbTimer = null;

    function closeSheet() { if (sheet) { sheet.remove(); sheet = null; } }

    function openSheet(buildBody) {
      closeSheet();
      sheet = document.createElement('div');
      sheet.className = 'lih-mask';
      const card = document.createElement('div');
      card.className = 'lih-card' + (isDarkPage() ? ' lih-dk' : '');
      buildBody(card);
      sheet.appendChild(card);
      sheet.addEventListener('click', ev => { if (ev.target === sheet) closeSheet(); });
      document.body.appendChild(sheet);
    }

    function el(cls, text) {
      const d = document.createElement('div');
      d.className = cls;
      if (text != null) d.textContent = text;
      return d;
    }

    function btn(txt, primary) {
      const b = document.createElement('button');
      b.className = 'lih-btn' + (primary ? ' lih-on' : '');
      b.textContent = txt;
      return b;
    }

    // 大包预览：列前 5 个 + 总数，确认再跳
    function showPreview() {
      openSheet(card => {
        card.appendChild(el('lih-h', `发现 ${info.count} 个${info.cfg.label}`));
        card.appendChild(el('lih-sub', info.group ? `分组：${info.group}` : '无分组'));
        info.list.slice(0, 5).forEach((o, i) => {
          const row = el('lih-row');
          row.appendChild(el('lih-n', String(i + 1)));
          row.appendChild(el('lih-t', pickName(o) || '(无名)'));
          card.appendChild(row);
        });
        if (info.count > 5) card.appendChild(el('lih-more', `…还有 ${info.count - 5} 个`));
        const bar = el('lih-bar');
        const cancel = btn('取消');
        cancel.addEventListener('click', closeSheet);
        const ok = btn('全部导入', true);
        ok.addEventListener('click', () => { closeSheet(); jump(); });
        bar.appendChild(cancel); bar.appendChild(ok);
        card.appendChild(bar);
      });
    }

    // 点了没唤起 App → 给两个出口：源链接（iOS / 桌面 / 网络导入通用）与导入链接（Android 一键）
    let clickedAt = 0;
    function armFallback() {
      clearTimeout(fbTimer);
      fbTimer = setTimeout(() => {
        if (document.hidden) return;            // 已经切到阅读了
        if (Date.now() - clickedAt < 2000) return;
        showFallback();
      }, 2400);
    }
    function showFallback() {
      openSheet(card => {
        card.appendChild(el('lih-h', '没有打开阅读？'));
        card.appendChild(el('lih-p',
          '复制源链接，到软件内「网络导入」粘贴；只支持本地文件的，把页面另存为 .json 后导入。'));
        const bar = el('lih-bar');
        const src = btn('复制源链接', true);
        src.addEventListener('click', () => {
          showToast(copyText(location.href) ? '已复制源链接' : '复制失败，请长按按钮复制');
          closeSheet();
        });
        const imp = btn('复制导入链接');
        imp.addEventListener('click', () => {
          showToast(copyText(importUrl) ? '已复制导入链接' : '复制失败，请长按按钮复制');
          closeSheet();
        });
        bar.appendChild(src); bar.appendChild(imp);
        card.appendChild(bar);
      });
    }

    function jump() {
      clickedAt = Date.now();
      try { location.href = importUrl; } catch (e) {}
      armFallback();
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { clearTimeout(fbTimer); closeSheet(); }
    });

    function doImport() {
      // 大包 / 混合包先预览，小包直接导
      if (info.count >= PREVIEW_MIN || (info.type === 'auto' && info.count > 1)) showPreview();
      else jump();
    }

    /* --- 拖动（Pointer 事件，触摸/鼠标通用） --- */
    let drag = null;

    pill.addEventListener('pointerdown', e => {
      drag = { x: e.clientX, y: e.clientY, moved: false };
      wasTucked = tucked;                       // 记住：这次是"展开"而不是"导入"
      tucked = false; clearTimeout(tuckTimer); position();
    });

    pill.addEventListener('pointermove', e => {
      if (!drag) return;
      if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 8) drag.moved = true;
      if (!drag.moved) return;
      if (e.cancelable) e.preventDefault();
      pill.style.right = 'auto'; pill.style.left = 'auto';
      pill.style.left = clamp(e.clientX - pill.offsetWidth / 2, -18, innerWidth - 24) + 'px';
      pill.style.top = clamp(e.clientY - H / 2, 24, innerHeight - H - 8) + 'px';
      pill.style.transform = 'translateX(0)';
      pill.style.opacity = '1';
    });

    const endDrag = () => {
      if (!drag) return;
      const moved = drag.moved; drag = null;
      if (moved) {
        suppressClick = true;               // 拖动过就别再触发跳转
        const r = pill.getBoundingClientRect();
        side = (r.left + r.width / 2) < innerWidth / 2 ? 'left' : 'right';
        yRatio = clamp((r.top + H / 2) / innerHeight, .1, .86);
        localStorage.setItem('lih_side', side);
        localStorage.setItem('lih_y', yRatio);
        position();
      }
      tuck(1500);
    };
    pill.addEventListener('pointerup', endDrag);
    pill.addEventListener('pointercancel', endDrag);

    pill.addEventListener('click', e => {
      if (suppressClick) { e.preventDefault(); suppressClick = false; return; }
      if (wasTucked) {                          // 收起态点一下 → 先展开，防误触
        e.preventDefault();
        wasTucked = false;
        tuck(3200);
        if (!hinted) { hinted = true; showToast('已展开，再点一次即可导入'); }
        return;
      }
      e.preventDefault();
      doImport();
    });

    position();
    tuck(1800);
  }

  /* ============ 8. 入口（动态页面重试） ============ */
  function main() {
    injectCSS();
    if (document.getElementById('lih-dock')) return true;
    const raw = getRawText();
    if (!raw) return false;
    const info = detect(raw);
    if (!info) return false;
    // 页面地址去掉 hash，作为 src
    const pageUrl = location.origin + location.pathname + location.search;
    const importUrl = info.cfg.url + encodeURIComponent(pageUrl);
    showToast(info.toast);
    createBall(info, importUrl);
    return true;
  }

  if (!main()) {
    // SPA / 异步渲染：补两次重试
    let n = 0;
    const retry = () => { n++; if (main() || n >= 3) return; setTimeout(retry, 1200); };
    setTimeout(retry, 700);
  }
})();
