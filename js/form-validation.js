/* =============================================
   FORM VALIDATION — Client-side
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-validate]').forEach(initFormValidation);
});

function initFormValidation(form) {
  form.addEventListener('submit', (e) => {
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form__error').forEach(el => el.remove());
    form.querySelectorAll('.form__input--error').forEach(el => {
      el.classList.remove('form__input--error');
    });

    // Validate required fields
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        showError(field, 'This field is required');
        isValid = false;
      }
    });

    // Validate email fields
    form.querySelectorAll('input[type="email"]').forEach(field => {
      if (field.value && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault();
      // Focus first error
      const firstError = form.querySelector('.form__input--error');
      if (firstError) firstError.focus();
    }
  });

  // Real-time validation on blur
  form.querySelectorAll('.form__input, .form__textarea, .form__select').forEach(field => {
    field.addEventListener('blur', () => {
      // Clear error on this field
      const existing = field.parentElement.querySelector('.form__error');
      if (existing) existing.remove();
      field.classList.remove('form__input--error');

      if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
      } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
      }
    });
  });
}

function showError(field, message) {
  field.classList.add('form__input--error');
  const error = document.createElement('span');
  error.className = 'form__error';
  error.textContent = message;
  field.parentElement.appendChild(error);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
