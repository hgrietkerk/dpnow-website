/* =============================================
   TESTIMONIAL SLIDER
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.testimonial-slider').forEach(initSlider);
});

function initSlider(slider) {
  const track = slider.querySelector('.testimonial-slider__track');
  const slides = slider.querySelectorAll('.testimonial-slider__slide');
  const nav = slider.querySelector('.testimonial-slider__nav');

  if (!track || slides.length < 2) return;

  let current = 0;
  const total = slides.length;

  // Create dots
  if (nav) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-slider__dot${i === 0 ? ' testimonial-slider__dot--active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      nav.appendChild(dot);
    });
  }

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function updateDots() {
    if (!nav) return;
    nav.querySelectorAll('.testimonial-slider__dot').forEach((dot, i) => {
      dot.classList.toggle('testimonial-slider__dot--active', i === current);
    });
  }

  // Auto-advance every 6 seconds
  let interval = setInterval(() => {
    goTo((current + 1) % total);
  }, 6000);

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => {
    interval = setInterval(() => {
      goTo((current + 1) % total);
    }, 6000);
  });

  // Swipe support for mobile
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < total - 1) goTo(current + 1);
      if (diff < 0 && current > 0) goTo(current - 1);
    }
  }, { passive: true });
}
