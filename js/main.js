/* =============================================
   MAIN JS — Navigation, Scroll, Core Utils
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollHeader();
  initStickyMobileCTA();
  initAccordions();
});

/* ---- Mobile Navigation ---- */
function initNavigation() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    menu.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  // Close mobile menu on non-dropdown link click
  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && !link.closest('.nav__item--dropdown')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close mobile menu on dropdown sub-link click
  menu.querySelectorAll('.nav__dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile dropdown toggles
  document.querySelectorAll('.nav__item--dropdown > .nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const item = link.closest('.nav__item--dropdown');
        // Close other open dropdowns
        document.querySelectorAll('.nav__item--dropdown.open').forEach(openItem => {
          if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open');
      }
    });
  });
}

/* ---- Scroll-based Header Styling ---- */
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
}

/* ---- Sticky Mobile CTA ---- */
function initStickyMobileCTA() {
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');
  if (!stickyCta || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyCta.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(hero);
}

/* ---- Accordions ---- */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      trigger.setAttribute('aria-expanded', !isOpen);
      content.classList.toggle('accordion__content--open');
    });
  });
}
