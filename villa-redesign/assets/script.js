    /* Nav scroll state */
    const nav = document.getElementById('nav');
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 80) nav.classList.add('scrolled');
          else nav.classList.remove('scrolled');
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu toggle */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    /* Hero slideshow */
    (function() {
      const slides = document.querySelectorAll('.hero-slide');
      if (slides.length < 2) return;
      let i = 0;
      setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 5500);
    })();

    /* Reveal on scroll */
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* Reviews carousel */
    (function() {
      const wrap = document.getElementById('reviewsTrackWrap');
      const track = document.getElementById('reviewsTrack');
      const prev = document.getElementById('reviewPrev');
      const next = document.getElementById('reviewNext');
      const dotsHost = document.getElementById('reviewDots');
      if (!wrap || !track) return;

      const cards = Array.from(track.children);

      function visibleCount() {
        const w = window.innerWidth;
        if (w <= 640) return 1;
        if (w <= 900) return 2;
        return 3;
      }
      function pageCount() { return Math.max(1, Math.ceil(cards.length / visibleCount())); }
      function cardStep() {
        if (cards.length < 2) return wrap.clientWidth;
        return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
      }

      function buildDots() {
        dotsHost.innerHTML = '';
        for (let i = 0; i < pageCount(); i++) {
          const d = document.createElement('span');
          d.className = 'review-dot' + (i === 0 ? ' active' : '');
          d.dataset.idx = i;
          d.addEventListener('click', () => goTo(i));
          dotsHost.appendChild(d);
        }
      }

      function currentPage() {
        const step = cardStep();
        if (!step) return 0;
        const idx = Math.round(wrap.scrollLeft / step);
        return Math.min(pageCount() - 1, Math.floor(idx / visibleCount()));
      }

      function syncDots() {
        const p = currentPage();
        Array.from(dotsHost.children).forEach((d, i) => {
          d.classList.toggle('active', i === p);
        });
      }

      function goTo(page) {
        wrap.scrollTo({ left: page * visibleCount() * cardStep(), behavior: 'smooth' });
      }

      function nextPage() {
        const p = currentPage();
        const target = p + 1 >= pageCount() ? 0 : p + 1;
        goTo(target);
      }
      function prevPage() {
        const p = currentPage();
        const target = p - 1 < 0 ? pageCount() - 1 : p - 1;
        goTo(target);
      }

      next.addEventListener('click', nextPage);
      prev.addEventListener('click', prevPage);
      wrap.addEventListener('scroll', syncDots, { passive: true });
      window.addEventListener('resize', buildDots);

      buildDots();

      /* Auto-advance every 6s, pause on hover/touch */
      let timer = setInterval(nextPage, 6000);
      const pause = () => { clearInterval(timer); timer = null; };
      const resume = () => { if (!timer) timer = setInterval(nextPage, 6000); };
      wrap.addEventListener('mouseenter', pause);
      wrap.addEventListener('mouseleave', resume);
      wrap.addEventListener('touchstart', pause, { passive: true });
      wrap.addEventListener('touchend', resume, { passive: true });
    })();

    /* Split-image slideshows (旅程準備 / 四季悠然) */
    document.querySelectorAll('.split-img.slideshow').forEach(slideshow => {
      const slides = slideshow.querySelectorAll('.slide');
      const dots   = slideshow.querySelectorAll('.slide-dot');
      if (slides.length < 2) return;
      let i = 0;
      let timer;

      function goTo(idx) {
        slides[i].classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
        i = (idx + slides.length) % slides.length;
        slides[i].classList.add('active');
        if (dots[i]) dots[i].classList.add('active');
      }
      function next() { goTo(i + 1); }
      function start() { timer = setInterval(next, 5000); }
      function stop()  { clearInterval(timer); }

      dots.forEach((d, idx) => d.addEventListener('click', () => { stop(); goTo(idx); start(); }));
      slideshow.addEventListener('mouseenter', stop);
      slideshow.addEventListener('mouseleave', start);
      slideshow.addEventListener('touchstart', stop, { passive: true });
      slideshow.addEventListener('touchend', start, { passive: true });

      start();
    });
