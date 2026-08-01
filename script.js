(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const themeToggle = document.querySelector('#theme-toggle');
  const languageToggle = document.querySelector('#language-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  const savedTheme = localStorage.getItem('xy-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.dataset.theme = savedTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.dataset.theme = 'dark';
  }

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('xy-theme', next);
  });

  let language = localStorage.getItem('xy-language') || 'en';
  const applyLanguage = (lang) => {
    language = lang;
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach((el) => {
      el.textContent = el.dataset[lang];
    });
    if (languageToggle) languageToggle.textContent = lang === 'en' ? '中文' : 'EN';
    localStorage.setItem('xy-language', lang);
  };
  applyLanguage(language);

  languageToggle?.addEventListener('click', () => applyLanguage(language === 'en' ? 'zh' : 'en'));

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 12), { passive: true });
  document.querySelector('#year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
