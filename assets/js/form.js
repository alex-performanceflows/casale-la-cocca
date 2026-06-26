/* =============================================================================
 * form.js — validazione client-side + submit no-backend + stato di conferma.
 * -----------------------------------------------------------------------------
 * Invio via servizio senza backend (Web3Forms/Formspree).
 * Configurare l'endpoint in data-endpoint del <form> (placeholder TODO_FORM_ENDPOINT).
 * Se l'endpoint non è configurato, mostra un avviso e usa il fallback mailto.
 * I messaggi di stato/errore sono presi dai dizionari i18n.
 * =============================================================================
 */
(function () {
  'use strict';

  function t(path, fallback) {
    var val = window.__i18n && window.__i18n.t ? window.__i18n.t(path) : undefined;
    return typeof val === 'string' ? val : fallback;
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function init() {
    var form = document.getElementById('inquiry-form');
    if (!form) return;

    var statusEl = form.querySelector('[data-form-status]');
    var submitBtn = form.querySelector('[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.querySelector('[data-submit-label]') : null;

    // Validazione di un singolo campo. Ritorna true se valido.
    function validateField(name) {
      var field = form.elements[name];
      var errEl = form.querySelector('[data-error-for="' + name + '"]');
      var valid = true;

      if (name === 'name') valid = field.value.trim().length > 1;
      else if (name === 'email') valid = EMAIL_RE.test(field.value.trim());
      else if (name === 'phone') valid = field.value.trim().length >= 5;
      else if (name === 'consent') valid = field.checked;

      if (errEl) {
        errEl.textContent = valid ? '' : t('contact.errors.' + name, '');
        errEl.classList.toggle('hidden', valid);
      }
      field.setAttribute('aria-invalid', String(!valid));
      field.classList.toggle('border-red-500', !valid);
      return valid;
    }

    var REQUIRED = ['name', 'email', 'phone', 'consent'];

    // Validazione "soft" al blur dei campi obbligatori.
    REQUIRED.forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener('blur', function () { validateField(name); });
    });

    function setStatus(message, type) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.remove('hidden', 'text-olive', 'text-red-600');
      statusEl.classList.add(type === 'error' ? 'text-red-600' : 'text-olive');
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.classList.toggle('opacity-60', loading);
      if (submitLabel) {
        submitLabel.textContent = loading
          ? t('contact.form.sending', 'Invio…')
          : t('contact.form.submit', 'Invia');
      }
    }

    // Fallback mailto: compone un messaggio con i dati del form.
    function mailtoFallback(data) {
      var to = form.getAttribute('data-owner-email') || 'TODO_EMAIL_PROPRIETARIO';
      var subject = 'Richiesta disponibilità — Casale La Cocca';
      var body = [
        'Nome: ' + data.name,
        'Email: ' + data.email,
        'Telefono: ' + data.phone,
        'Check-in: ' + (data.checkin || '-'),
        'Check-out: ' + (data.checkout || '-'),
        'Ospiti: ' + (data.guests || '-'),
        '',
        data.message || ''
      ].join('\n');
      window.location.href =
        'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // niente reload nativo

      var allValid = REQUIRED.every(function (name) { return validateField(name); });
      if (!allValid) {
        setStatus(t('contact.states.invalid', 'Controlla i campi.'), 'error');
        return;
      }

      var fd = new FormData(form);
      var data = Object.fromEntries(fd.entries());
      var endpoint = form.getAttribute('data-endpoint') || '';

      // Endpoint non configurato (placeholder TODO): usa mailto come fallback.
      if (!endpoint || /TODO_FORM_ENDPOINT/.test(endpoint)) {
        setStatus(t('contact.states.success', 'Grazie!'), 'success');
        mailtoFallback(data);
        return;
      }

      setLoading(true);
      setStatus('', 'success');

      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          form.reset();
          setStatus(t('contact.states.success', 'Grazie!'), 'success');
        })
        .catch(function () {
          setStatus(t('contact.states.error', 'Errore.'), 'error');
        })
        .finally(function () {
          setLoading(false);
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
