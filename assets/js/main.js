/* Escola Can Serra · interaccions (sense dependències) */
(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sense emmagatzematge */ } },
  };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Tema clar / fosc ---- */
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  const syncThemeButtons = () => $$('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(isDark()));
    $('use', b)?.setAttribute('href', isDark() ? '#i-sun' : '#i-moon');
  });
  $$('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    store.set('cs-theme', root.dataset.theme);
    syncThemeButtons();
  }));
  syncThemeButtons();

  /* ---- Mida del text (accessibilitat) ---- */
  const sizes = [100, 112.5, 125];
  let sizeIdx = Number(store.get('cs-size')) || 0;
  $$('[data-size-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(sizeIdx > 0));
    b.addEventListener('click', () => {
      sizeIdx = (sizeIdx + 1) % sizes.length;
      root.style.fontSize = sizes[sizeIdx] + '%';
      store.set('cs-size', String(sizeIdx));
      b.setAttribute('aria-pressed', String(sizeIdx > 0));
    });
  });

  /* ---- Capçalera amb ombra en fer scroll ---- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Menú mòbil ---- */
  const nav = $('[data-nav]');
  const toggle = $('[data-menu-toggle]');
  const setMenu = (open) => {
    if (!nav || !toggle) return;
    if (open && header) nav.style.setProperty('--nav-top', Math.max(0, header.getBoundingClientRect().bottom) + 'px');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tanca el menú' : 'Obre el menú');
    $('use', toggle)?.setAttribute('href', open ? '#i-x' : '#i-menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---- Enllaç actiu segons la secció visible ---- */
  const navLinks = $$('.main-nav a[href^="#"], .ds-toc a[href^="#"]');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Aparició suau ---- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---- Comptadors ---- */
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; const end = Number(el.dataset.count); const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / 1100);
          el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---- Pestanyes de nivells + estacions del mapa ---- */
  const tabs = $$('[role="tab"][data-tab]');
  const stations = $$('[data-station]');
  const selectTab = (key, focus = false) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === key;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
      if (on && focus) t.focus();
    });
    stations.forEach((s) => s.classList.toggle('is-active', s.dataset.station === key));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t.dataset.tab));
    t.addEventListener('keydown', (e) => {
      const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (dir) { e.preventDefault(); selectTab(tabs[(i + dir + tabs.length) % tabs.length].dataset.tab, true); }
      if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0].dataset.tab, true); }
      if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1].dataset.tab, true); }
    });
  });
  stations.forEach((s) => s.addEventListener('click', () => selectTab(s.dataset.station)));

  /* ---- Botons de desplaçament horitzontal ---- */
  $$('[data-scroll]').forEach((b) => b.addEventListener('click', () => {
    const track = $(b.dataset.scroll);
    if (!track) return;
    track.scrollBy({ left: Number(b.dataset.dir) * track.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
  }));

  /* ---- Mapa sota demanda (sense peticions a tercers fins que es demana) ---- */
  $$('[data-map]').forEach((box) => {
    const btn = $('[data-map-load]', box);
    btn?.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.title = "Mapa de situació de l'Escola Can Serra";
      frame.src = box.dataset.map;
      box.prepend(frame);
      $('.map-placeholder', box)?.remove();
      frame.focus();
    });
  });

  /* ---- Design system: graella d'icones generada des del sprite ---- */
  const iconGrid = $('[data-icon-grid]');
  if (iconGrid) {
    const ids = $$('symbol[id^="i-"]').map((s) => s.id);
    iconGrid.innerHTML = ids.map((id) => `<div class="icon-tile"><svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>${id}</div>`).join('');
    const count = $('[data-icon-count]');
    if (count) count.textContent = String(ids.length);
  }
  $$('[data-demo-form]').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  /* ---- Design system: copiar valors ---- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const value = b.dataset.copy;
    try { await navigator.clipboard.writeText(value); } catch { return; }
    const old = b.getAttribute('data-label') || '';
    b.classList.add('is-copied');
    b.setAttribute('data-label', 'Copiat!');
    setTimeout(() => { b.classList.remove('is-copied'); b.setAttribute('data-label', old); }, 1200);
  }));
})();
