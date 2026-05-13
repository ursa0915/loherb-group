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
