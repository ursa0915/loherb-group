// 日光時刻 LOHERB Moments — Main JS
(function () {
  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // Scroll-triggered nav (transparent → blurred ivory)
  const nav = document.querySelector('nav.top');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll-reveal observer
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Hero parallax (subtle, desktop only)
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(min-width: 901px)').matches) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY * 0.12, 60);
      heroVisual.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

  // Mark form fields as filled (so empty date/select can show grey "placeholder")
  document.querySelectorAll('.field input[type="date"]').forEach((el) => {
    const sync = () => el.toggleAttribute('data-filled', !!el.value);
    el.addEventListener('input', sync);
    el.addEventListener('change', sync);
    sync();
  });
  document.querySelectorAll('.field select').forEach((el) => {
    const sync = () => el.toggleAttribute('data-empty', !el.value);
    el.addEventListener('change', sync);
    sync();
  });

  // Reviews carousel — manual (arrows/dots/swipe) + auto-advance
  const carousel = document.querySelector('.lp2-reviews-grid--carousel');
  if (carousel) {
    const cards = carousel.querySelectorAll('.lp2-review');
    const dots = document.querySelectorAll('.lp2-rev-dot');
    const prevBtn = document.querySelector('.lp2-rev-prev');
    const nextBtn = document.querySelector('.lp2-rev-next');
    const AUTO_MS = 6000;
    let current = 0;
    let timer = null;

    const show = (i) => {
      current = (i + cards.length) % cards.length;
      cards.forEach((c, idx) => c.classList.toggle('is-active', idx === current));
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
    };
    const next = () => show(current + 1);
    const prev = () => show(current - 1);
    const start = () => { stop(); timer = setInterval(next, AUTO_MS); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const restart = () => { stop(); start(); };

    prevBtn && prevBtn.addEventListener('click', () => { prev(); restart(); });
    nextBtn && nextBtn.addEventListener('click', () => { next(); restart(); });
    dots.forEach((d, idx) => d.addEventListener('click', () => { show(idx); restart(); }));

    // Pause on hover
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    // Swipe / drag support
    let startX = null;
    const onStart = (x) => { startX = x; stop(); };
    const onEnd = (x) => {
      if (startX === null) return;
      const diff = x - startX;
      if (Math.abs(diff) > 40) (diff > 0 ? prev : next)();
      startX = null;
      start();
    };
    carousel.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
    carousel.addEventListener('touchend', (e) => onEnd(e.changedTouches[0].clientX));
    carousel.addEventListener('mousedown', (e) => onStart(e.clientX));
    carousel.addEventListener('mouseup', (e) => onEnd(e.clientX));
    carousel.addEventListener('mouseleave', () => { startX = null; });

    show(0);
    start();
  }
})();

// Form submit handler — used by /book pages
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const locale = window.location.pathname.startsWith('/party/en/') ? 'en' : 'zh';
  const get = (n) => form.querySelector(`[name="${n}"]`)?.value || '';
  const payload = {
    locale,
    source: 'partyloherb',
    name: get('name'),
    phone: get('phone'),
    email: get('email'),
    line: get('line'),
    eventType: get('event-type'),
    people: get('people'),
    date: get('date'),
    budget: get('budget'),
    message: get('message')
  };
  const btn = form.querySelector('button[type="submit"]');
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = locale === 'en' ? 'Sending...' : '送出中...';
  try {
    const res = await fetch('/api/wedding-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('submit failed');
    const thanks = locale === 'en'
      ? `Thank you, ${payload.name || 'friend'}. We'll be in touch within one business day.`
      : `感謝您${payload.name ? `，${payload.name}` : ''}。我們會在 1 個工作天內聯繫您。`;
    form.innerHTML = `<div style="text-align:center;padding:48px 0;color:var(--gold);font-size:18px;letter-spacing:0.1em;">${thanks}</div>`;
  } catch (err) {
    alert(locale === 'en'
      ? 'Submission failed. Please try again later or call +886-3-959-5685.'
      : '送出失敗，請稍後再試，或直接致電 +886-3-959-5685。');
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}
