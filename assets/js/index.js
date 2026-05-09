const nav = document.getElementById('siteNav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

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
