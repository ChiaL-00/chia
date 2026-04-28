// Bottleneck image — scroll up from bottom, stop when section top hits nav
const problemSection = document.querySelector('.em-problem-section');
const bottleneckImg  = document.querySelector('.em-bottleneck-img');
const NAV_H = 64;

function updateBottleneck() {
  if (!problemSection || !bottleneckImg) return;
  const rect    = problemSection.getBoundingClientRect();
  const viewH   = window.innerHeight;
  const wrapH   = bottleneckImg.parentElement.offsetHeight;
  const progress = (rect.top - NAV_H) / (viewH - NAV_H);
  const clamped  = Math.max(0, Math.min(1, progress));
  bottleneckImg.style.transform = `translateY(${wrapH * clamped}px)`;
}

window.addEventListener('scroll', updateBottleneck, { passive: true });
updateBottleneck();

// Ticker — reusable number count-up with a slow-down phase near the target.
// Usage: add these data attributes to any element:
//   data-ticker="88"            required: target number
//   data-ticker-from="50"       optional: starting number (default 0)
//   data-ticker-slow-at="85"    optional: value where deceleration kicks in (default: 90% of target)
//   data-ticker-suffix="%+"     optional: text appended after the number (default "")
//   data-ticker-duration="5000" optional: total ms (default 5000)
function initTicker(el) {
  const target   = parseFloat(el.dataset.ticker);
  const from     = parseFloat(el.dataset.tickerFrom ?? 0);
  const slowAt   = parseFloat(el.dataset.tickerSlowAt ?? target * 0.9);
  const suffix   = el.dataset.tickerSuffix ?? '';
  const duration = parseFloat(el.dataset.tickerDuration ?? 5000);
  const splitT   = (slowAt - from) / (target - from) * 0.65;
  let started = false;

  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting || started) return;
    started = true;
    obs.disconnect();
    const startTime = performance.now();
    function step(now) {
      const p = Math.min((now - startTime) / duration, 1);
      let current;
      if (p < splitT) {
        current = from + (slowAt - from) * (p / splitT);
      } else {
        const localP = (p - splitT) / (1 - splitT);
        const eased  = 1 - Math.pow(1 - localP, 4);
        current = slowAt + (target - slowAt) * eased;
      }
      el.textContent = Math.round(current) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, { threshold: 0.5 }).observe(el);
}

document.querySelectorAll('[data-ticker]').forEach(initTicker);

// Insight reveal — fade in overlay when section top hits top of viewport
const insightSection = document.querySelectorAll('.cs-section--dark')[1];
const insightOverlay = document.querySelector('.em-insight-overlay');
if (insightSection && insightOverlay) {
  function updateInsight() {
    const top = insightSection.getBoundingClientRect().top;
    insightOverlay.style.opacity = top <= 0 ? '1' : '0';
  }
  window.addEventListener('scroll', updateInsight, { passive: true });
  updateInsight();
}
