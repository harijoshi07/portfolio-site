//==============================
// DYNAMIC DATA RENDERING
//==============================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeStorageKey = 'portfolio-theme';
const themeQuery = window.matchMedia('(prefers-color-scheme: light)');
let hasManualTheme = false;

function getStoredTheme() {
  try {
    const theme = localStorage.getItem(themeStorageKey);
    return theme === 'light' || theme === 'dark' ? theme : null;
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Ignore storage failures; the in-page theme still updates.
  }
}

function getSystemTheme() {
  return themeQuery.matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  updateThemeToggle(nextTheme);
}

function updateThemeToggle(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const isLight = theme === 'light';
  toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  toggle.innerHTML = isLight
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2"/><path d="M12 19v2"/><path d="m5.64 5.64 1.41 1.41"/><path d="m16.95 16.95 1.41 1.41"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="m5.64 18.36 1.41-1.41"/><path d="m16.95 7.05 1.41-1.41"/><circle cx="12" cy="12" r="4"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.99 12.53A8 8 0 1 1 11.47 3.01 6.5 6.5 0 0 0 20.99 12.53Z"/></svg>';
}

function initThemeToggle() {
  const storedTheme = getStoredTheme();
  hasManualTheme = Boolean(storedTheme);
  applyTheme(storedTheme || getSystemTheme());

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      hasManualTheme = true;
      storeTheme(nextTheme);
      applyTheme(nextTheme);
    });
  }

  themeQuery.addEventListener('change', () => {
    if (!hasManualTheme) applyTheme(getSystemTheme());
  });
}

function renderHero() {
  const c = document.getElementById('hero-content');
  if (!c) return;
  const d = ABOUT_DATA.hero;

  let chipsHtml = d.chips.map(chip => `<span class="chip ${chip.class}">${chip.text}</span>`).join('<span class="chip-sep">/</span>');

  let socialsHtml = `
    <a href="${d.socials.github}" target="_blank" rel="noopener" class="soc" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
    <a href="${d.socials.linkedin}" target="_blank" rel="noopener" class="soc" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a>
  `;

  c.innerHTML = `
    <div class="h-eye">${d.eyeText}</div>
    <h1 class="h-name">
      <span class="l1">${d.firstName}</span>
      <span class="l2">${d.lastName}<span class="fill">${d.lastName}</span></span>
    </h1>
    <div class="h-chips">
      ${chipsHtml}
    </div>
    <p class="h-desc">${d.description}</p>
    <div class="h-btns">
      <a href="#work" class="btn-o">See my work <span aria-hidden="true">↓</span></a>
      <a href="${d.resumeLink}" target="_blank" class="btn-g">Resume / CV</a>
    </div>
    <div class="h-soc">${socialsHtml}</div>
  `;

  // Keep hero name visible after animation ends
  const heroName = document.querySelector('.h-name');
  if (heroName) {
    heroName.addEventListener('animationend', () => {
      heroName.style.opacity = '1';
    }, { once: true });
  }
}

function renderAbout() {
  const c = document.getElementById('about-container');
  if (!c) return;
  const d = ABOUT_DATA.aboutProfile;

  const paragraphsHtml = d.paragraphs.map(p => `<p class="about-p">${p}</p>`).join('');
  const focusChips = d.focus.chips.map(chip => `<span class="about-focus-chip">${chip}</span>`).join('');
  const stackHtml = d.stack.map(group => `
    <div class="about-stack-row">
      <div class="about-stack-label">${group.label}</div>
      <div class="about-stack-chips">
        ${group.items.map(item => `<span class="about-stack-chip">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');

  c.innerHTML = `
    <div class="about-copy">
      ${paragraphsHtml}
      <div class="about-focus-card">
        <div class="about-focus-label">${d.focus.label}</div>
        <h3>${d.focus.title}</h3>
        <p>${d.focus.body}</p>
        <div class="about-focus-chips">${focusChips}</div>
      </div>
    </div>
    <div class="about-stack">${stackHtml}</div>
  `;
}

function renderExperience() {
  const c = document.getElementById('experience-timeline');
  if (!c) return;

  let html = `<div class="tl-line"></div>`;

  EXPERIENCE_DATA.forEach((exp, i) => {
    let badgesHtml = exp.badges.map(b => `<span class="tl-badge ${b.class}">${b.text}</span>`).join('');
    let bulletsHtml = exp.bullets.map(b => `<li>${b}</li>`).join('');
    let tagsHtml = exp.tags.map(t => `<span class="tl-tag ${t.class}">${t.text}</span>`).join('');

    html += `
      <div class="tl-item ${exp.isActive ? 'active-role' : ''} rv" style="transition-delay:.${i}s">
        <div class="tl-date">
          <span class="tl-year">${exp.year}</span>
          <span class="tl-month">${exp.month}</span>
          <span class="tl-duration">${exp.duration}</span>
        </div>
        <div class="tl-card">
          <div class="tl-top">
            <div>
              <div class="tl-role">${exp.role}</div>
              <div class="tl-company">${exp.company}</div>
              <div class="tl-loc">${exp.location}</div>
            </div>
            <div class="tl-badges">${badgesHtml}</div>
          </div>
          <ul class="tl-bullets">${bulletsHtml}</ul>
          <div class="tl-tags">${tagsHtml}</div>
        </div>
      </div>
    `;
  });

  c.innerHTML = html;
}

function renderProjects() {
  const c = document.getElementById('projects-container');
  if (!c) return;

  c.innerHTML = PROJECTS_DATA.map(p => `
    <div class="proj rv">
      <div class="p-info">
        <div class="p-idx"><span>PROJECT_${p.id}</span></div>
        <h3 class="p-name">${p.name}</h3>
        <span class="p-badge ${p.badge.class}">${p.badge.text}</span>
        <div class="proj-metrics">
          ${p.metrics.map(m => `<span class="pmet">${m.label} <span class="mv">${m.value}</span></span>`).join('')}
        </div>
        <p class="p-desc">${p.description}</p>
        <div class="p-tags">
          ${p.tags.map(t => `<span class="ptag ${t.class}">${t.text}</span>`).join('')}
        </div>
        <div class="p-links">
          ${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="${l.class}">${l.text}</a>`).join('')}
        </div>
      </div>
      <div class="p-vis">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="pnum">${p.id}</div>
      </div>
    </div>
  `).join('');
}

function renderContact() {
  const c = document.getElementById('contact-left');
  const ch = document.getElementById('contact-channels');
  if (!c) return;
  const d = ABOUT_DATA.contact;

  c.innerHTML = `
    <p>${d.paragraphs.join(' ')}</p>
  `;

  if (ch) {
    const channels = d.channels || [];
    ch.innerHTML = channels.map(channel => `
      <a href="${channel.url}" ${channel.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="channel-row">
        <span class="channel-icon">${channel.icon}</span>
        <span class="channel-main">
          <span class="channel-label">${channel.label || channel.text}</span>
          <span class="channel-desc">${channel.handle || channel.value || channel.text}</span>
        </span>
        <span class="channel-value" aria-hidden="true">↗</span>
      </a>
    `).join('');
  }
}

// Render everything
initThemeToggle();
renderHero();
renderAbout();
renderExperience();
renderProjects();
renderContact();

// ── Custom cursor ──
const curDot = document.getElementById('cur');
const curRing = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  curDot.style.left = mx + 'px';
  curDot.style.top = my + 'px';
});
(function tick() {
  rx += (mx - rx) * .13;
  ry += (my - ry) * .13;
  curRing.style.left = rx + 'px';
  curRing.style.top = ry + 'px';
  requestAnimationFrame(tick);
})();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('on-link'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('on-link'));
});

// ── Progress bar ──
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = Math.min(pct, 100) + '%';
});

// ── Nav stuck state ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', window.scrollY > 20));

// ── Active nav link on scroll ──
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= documentHeight - 60) {
    // Reached the exact bottom
    current = 'contact';
  } else {
    secs.forEach(sec => {
      const secTop = sec.offsetTop;
      if (scrollY >= secTop - viewportHeight / 3) {
        current = sec.getAttribute('id');
      }
    });
  }

  nls.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === '#' + current) {
      a.classList.add('active');
    }
  });
});

// ── Scroll reveal ──
const rvIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(r => rvIO.observe(r));

// ── Hamburger menu ──
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
ham.addEventListener('click', () => {
  const open = mob.classList.toggle('open');
  const spans = ham.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translateY(8px)' : '';
  spans[1].style.opacity = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translateY(-8px)' : '';
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mob.classList.remove('open');
  ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}));

// ── Project image hover zoom ──
const hoverPreview = document.createElement('div');
hoverPreview.id = 'img-hover-preview';
hoverPreview.innerHTML = '<img id="hover-preview-img" src="" alt="">';
document.body.appendChild(hoverPreview);

const hoverImg = document.getElementById('hover-preview-img');

document.querySelectorAll('.p-vis img').forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    hoverImg.src = img.src;
    hoverPreview.classList.add('show');
  });
});

hoverPreview.addEventListener('click', () => {
  hoverPreview.classList.remove('show');
});

// ── Go to top button ──
const btnTop = document.getElementById('btn-top');
if (btnTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btnTop.classList.add('show');
    else btnTop.classList.remove('show');
  });
  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
