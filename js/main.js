/* ==========================================================================
   PRINT101 LLC — main.js
   Handles: sticky nav, mobile panel, scroll-reveal (IntersectionObserver),
   active nav-link tracking, gallery lightbox, testimonial slider,
   back-to-top, and contact form UX.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Sticky navbar + active link + back-to-top ---------------- */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  const navAnchorLinks = document.querySelectorAll('.nav-links a, .mobile-panel a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  const onScroll = () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('visible', y > 560);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (y >= top) current = sec.id;
    });
    navAnchorLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav panel ---------------- */
  const toggleBtn = document.getElementById('mobileToggle');
  const closeBtn = document.getElementById('mobileClose');
  const panel = document.getElementById('mobilePanel');
  const scrim = document.getElementById('scrim');

  const openPanel = () => { panel?.classList.add('active'); scrim?.classList.add('active'); document.body.style.overflow = 'hidden'; };
  const closePanel = () => { panel?.classList.remove('active'); scrim?.classList.remove('active'); document.body.style.overflow = ''; };

  toggleBtn?.addEventListener('click', openPanel);
  closeBtn?.addEventListener('click', closePanel);
  scrim?.addEventListener('click', closePanel);
  document.querySelectorAll('.mobile-panel a[href^="#"]').forEach(a => a.addEventListener('click', closePanel));

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 84;
        window.scrollTo({ top: target.offsetTop - navH + 1, behavior: 'smooth' });
      }
    });
  });

  /* ---------------- Back to top ---------------- */
  backTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Scroll-reveal (IntersectionObserver) ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------------- Animated stat counters ---------------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIO.observe(el));
  }

  /* ---------------- Gallery lightbox ---------------- */
  const galItems = document.querySelectorAll('.gal-item');
  const lightbox = document.getElementById('lightbox');
  const lbVisual = document.getElementById('lbVisual');
  const lbTag = document.getElementById('lbTag');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  const galData = Array.from(galItems).map(item => ({
    icon: item.getAttribute('data-icon'),
    tone: item.getAttribute('data-tone'),
    tag: item.getAttribute('data-tag'),
    title: item.getAttribute('data-title')
  }));
  let lbIndex = 0;

  const renderLightbox = () => {
    const d = galData[lbIndex];
    if (!d || !lbVisual) return;
    lbVisual.className = 'lightbox-visual tone-' + d.tone;
    lbVisual.innerHTML = '<i class="fas ' + d.icon + '"></i>';
    if (lbTag) lbTag.textContent = d.tag;
    if (lbCaption) lbCaption.textContent = d.title;
  };

  const openLightbox = (i) => {
    lbIndex = i;
    renderLightbox();
    lightbox?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  };

  galItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lbNext?.addEventListener('click', () => { lbIndex = (lbIndex + 1) % galData.length; renderLightbox(); });
  lbPrev?.addEventListener('click', () => { lbIndex = (lbIndex - 1 + galData.length) % galData.length; renderLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbNext?.click();
    if (e.key === 'ArrowLeft') lbPrev?.click();
  });

  /* ---------------- Testimonial slider ---------------- */
  const slidesWrap = document.getElementById('testiSlides');
  const dotsWrap = document.getElementById('testiDots');
  const slides = slidesWrap ? Array.from(slidesWrap.children) : [];
  let tIndex = 0;
  let tTimer;

  const goToSlide = (i) => {
    tIndex = (i + slides.length) % slides.length;
    if (slidesWrap) slidesWrap.style.transform = `translateX(-${tIndex * 100}%)`;
    dotsWrap?.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('active', bi === tIndex));
  };

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      dot.addEventListener('click', () => { goToSlide(i); resetAutoplay(); });
      dotsWrap.appendChild(dot);
    });
    goToSlide(0);

    function resetAutoplay() {
      clearInterval(tTimer);
      tTimer = setInterval(() => goToSlide(tIndex + 1), 6000);
    }
    resetAutoplay();
  }

  /* ---------------- Contact form (formsubmit.co AJAX-friendly submit) ---------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function () {
      if (formStatus) {
        formStatus.textContent = 'Sending your message…';
        formStatus.style.color = 'var(--ink-soft)';
      }
    });
  }
});
