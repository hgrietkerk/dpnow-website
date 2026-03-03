/* =============================================
   MODAL — Dialog + Exit Intent
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
  initExitIntent();
});

function initModals() {
  // Open triggers
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-modal-open');
      openModal(id);
    });
  });

  // Close triggers
  document.querySelectorAll('[data-modal-close]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = trigger.closest('.modal');
      if (modal) closeModal(modal.id);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal.open');
      if (openModal) closeModal(openModal.id);
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.add('open');
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Focus first input or close button
  const focusTarget = modal.querySelector('input, .modal__close');
  if (focusTarget) setTimeout(() => focusTarget.focus(), 100);

  // Trap focus
  trapFocus(modal);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ---- Exit Intent Detection ---- */
function initExitIntent() {
  const modal = document.getElementById('exit-intent-modal');
  if (!modal) return;

  document.addEventListener('mouseout', (e) => {
    if (e.clientY <= 0 && !sessionStorage.getItem('exitModalShown')) {
      openModal('exit-intent-modal');
      sessionStorage.setItem('exitModalShown', 'true');
    }
  });
}
