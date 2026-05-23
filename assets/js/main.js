// ── IMAGE ERROR FALLBACK ──
document.querySelectorAll('figure.photo img').forEach(img => {
  img.addEventListener('error', () => {
    img.closest('figure').classList.add('photo--error');
  });
});

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── NAV: PROJECT TITLE FADE IN AFTER HERO ──
const navTitle = document.querySelector('.nav-project-title');
const hero     = document.querySelector('.cs-hero, .hero');
if (navTitle && hero) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const show = !entry.isIntersecting;
      navTitle.classList.toggle('visible', show);
      navTitle.setAttribute('aria-hidden', show ? 'false' : 'true');
    });
  }, { threshold: 0 });
  heroObserver.observe(hero);
}

// ── NAV: SCROLL SHADOW + HIDE ON SCROLL DOWN / SHOW ON SCROLL UP ──
const nav = document.querySelector('nav');
if (nav) {
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Shadow
    nav.classList.toggle('scrolled', currentScrollY > 20);

    // Hide/show
    if (currentScrollY <= 50) {
      // Always show near top
      nav.classList.remove('nav--hidden');
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down — hide
      nav.classList.add('nav--hidden');
    } else {
      // Scrolling up — show
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}
