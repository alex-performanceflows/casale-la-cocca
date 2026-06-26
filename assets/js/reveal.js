/* =============================================================================
 * reveal.js — fade/slide-in allo scroll con IntersectionObserver.
 * Aggiunge la classe .is-visible agli elementi .reveal quando entrano in viewport.
 * Rispetta prefers-reduced-motion (in quel caso mostra subito tutto).
 * =============================================================================
 */
(function () {
  'use strict';

  function init() {
    var els = document.querySelectorAll('.reveal');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Niente animazioni o nessun supporto IO: mostra tutto immediatamente.
    if (reduce || !('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    els.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
