const nav = document.getElementById('siteNav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const copyBtn = document.querySelector('.copy-email-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('designsmith.c@gmail.com').then(() => {
      const v = copyBtn.querySelector('.v');
      v.textContent = 'Copied!';
      setTimeout(() => { v.textContent = 'Copy my email'; }, 2000);
    });
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  (function () {
    const MOBILE_BP = 1000;
    const section = document.getElementById('about');
    const img = document.querySelector('.about-right img');
    if (!section || !img) return;

    let startOffset = 0;
    let rafId = null;
    let scheduled = false;

    function isMobile() { return window.innerWidth <= MOBILE_BP; }

    function measure() {
      img.style.transform = 'translate(-50%, -50%)';
      const containerRect = img.parentElement.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      startOffset = containerRect.right - imgRect.left;
    }

    function paint() {
      scheduled = false;
      if (isMobile()) return;
      const sectionRect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const raw = (winH - sectionRect.top) / winH;
      const progress = Math.min(1, Math.max(0, raw));
      const offset = startOffset * (1 - progress);
      img.style.transform = `translate(calc(-50% + ${offset}px), -50%)`;
    }

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(paint);
    }

    window.addEventListener('load', () => {
      if (isMobile()) return;
      measure();
      paint();
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', () => {
      if (rafId) cancelAnimationFrame(rafId);
      scheduled = false;
      if (isMobile()) {
        img.style.transform = '';
        return;
      }
      measure();
      paint();
    }, { passive: true });
  })();
}

// ── PAGE TRANSITION: card → case study ──
// Cards with a CSS .thumb-shape play an exit animation before navigating:
// the cover image drives off to the left while the shape grows from its
// centre to fill the screen. The case study page picks up from the flag
// in sessionStorage (see the inline script in its <head>) and fades in.
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cards = document.querySelectorAll('.work-card');
  let layer = null;
  let running = false;

  cards.forEach((card) => {
    const shape = card.querySelector('.thumb-shape');
    const img = shape && shape.nextElementSibling;
    if (!img) return;

    // Warm the cache on intent so the case study is ready when the animation ends
    const prefetch = () => {
      if (card.dataset.prefetched) return;
      card.dataset.prefetched = '1';
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = card.href;
      document.head.appendChild(link);
    };
    card.addEventListener('pointerenter', prefetch, { once: true });
    card.addEventListener('focus', prefetch, { once: true });

    card.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduceMotion.matches || running || !Element.prototype.animate) return;
      e.preventDefault();
      play(card, shape, img);
    });
  });

  function play(card, shape, img) {
    running = true;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = shape.getBoundingClientRect();
    const i = img.getBoundingClientRect();
    const color = getComputedStyle(shape).backgroundColor;

    // Fixed layer above everything, holding clones at their on-screen positions
    layer = document.createElement('div');
    layer.className = 'pt-layer';
    layer.setAttribute('aria-hidden', 'true');

    const circle = document.createElement('div');
    circle.className = 'pt-circle';
    Object.assign(circle.style, {
      left: s.left + 'px', top: s.top + 'px',
      width: s.width + 'px', height: s.height + 'px',
      background: color,
    });

    const car = img.cloneNode();
    car.removeAttribute('loading');
    car.className = 'pt-car';
    Object.assign(car.style, {
      left: i.left + 'px', top: i.top + 'px',
      width: i.width + 'px', height: i.height + 'px',
    });

    layer.append(circle, car);
    document.body.appendChild(layer);
    card.classList.add('pt-source');

    // Scale needed for the circle (centre fixed) to reach the farthest viewport corner
    const cx = s.left + s.width / 2;
    const cy = s.top + s.height / 2;
    const reach = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
    const scale = (reach / (s.width / 2)) * 1.02;

    const drive = car.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${-(i.right + 40)}px)` }],
      { duration: 700, easing: 'cubic-bezier(0.55, 0, 0.8, 0.2)', fill: 'forwards' }
    );
    const grow = circle.animate(
      [{ transform: 'scale(1)' }, { transform: `scale(${scale})` }],
      { duration: 800, delay: 150, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' }
    );

    Promise.all([drive.finished, grow.finished]).then(() => {
      try {
        sessionStorage.setItem('pt-enter', JSON.stringify({ color, t: Date.now() }));
      } catch (_) { /* storage blocked: case study just loads normally */ }
      window.location.href = card.href;
    });
  }

  // Back button restores this page from bfcache mid-transition — reset it
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted || !layer) return;
    layer.remove();
    layer = null;
    running = false;
    document.querySelectorAll('.pt-source').forEach((c) => c.classList.remove('pt-source'));
  });
})();
