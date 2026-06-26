/* =============================================================================
 * gallery.js — lightbox vanilla per la galleria.
 * -----------------------------------------------------------------------------
 * Ogni thumbnail è un <button data-gallery-item> contenente una <img>.
 * Funzioni: apertura a schermo intero, frecce prev/next, tastiera (←/→/ESC),
 * swipe su mobile, contatore, focus trap minimale, blocco scroll del body.
 * Le immagini sono lazy-load (loading="lazy" sui thumbnail).
 * =============================================================================
 */
(function () {
  'use strict';

  var items = [];   // [{ src, alt }]
  var index = 0;
  var overlay, imgEl, counterEl, btnPrev, btnNext;
  var lastFocused = null;
  var touchStartX = null;

  function t(path, fallback) {
    var val = window.__i18n && window.__i18n.t ? window.__i18n.t(path) : undefined;
    return typeof val === 'string' ? val : fallback;
  }

  // Costruisce l'overlay una sola volta.
  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className =
      'fixed inset-0 z-[60] hidden items-center justify-center bg-carbon/95 backdrop-blur-sm';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    overlay.innerHTML = [
      '<button data-lb-close aria-label="' + t('gallery.close', 'Chiudi') + '"',
      '  class="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full',
      '         text-cream/80 transition hover:bg-white/10 hover:text-cream">',
      '  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
      '</button>',
      '<button data-lb-prev aria-label="' + t('gallery.prev', 'Precedente') + '"',
      '  class="absolute left-2 md:left-5 z-10 flex h-12 w-12 items-center justify-center rounded-full',
      '         text-cream/80 transition hover:bg-white/10 hover:text-cream">',
      '  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
      '</button>',
      '<button data-lb-next aria-label="' + t('gallery.next', 'Successiva') + '"',
      '  class="absolute right-2 md:right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full',
      '         text-cream/80 transition hover:bg-white/10 hover:text-cream">',
      '  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
      '</button>',
      '<figure class="flex max-h-[88vh] max-w-[92vw] flex-col items-center gap-3">',
      '  <img data-lb-img alt="" class="max-h-[80vh] max-w-[92vw] rounded-sm object-contain shadow-2xl" />',
      '  <figcaption data-lb-counter class="text-xs uppercase tracking-eyebrow text-cream/60"></figcaption>',
      '</figure>'
    ].join('\n');

    document.body.appendChild(overlay);

    imgEl = overlay.querySelector('[data-lb-img]');
    counterEl = overlay.querySelector('[data-lb-counter]');
    btnPrev = overlay.querySelector('[data-lb-prev]');
    btnNext = overlay.querySelector('[data-lb-next]');

    overlay.querySelector('[data-lb-close]').addEventListener('click', close);
    btnPrev.addEventListener('click', function () { go(-1); });
    btnNext.addEventListener('click', function () { go(1); });

    // Click sullo sfondo (non sull'immagine) chiude.
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    // Swipe su mobile.
    overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      touchStartX = null;
    }, { passive: true });
  }

  function render() {
    var item = items[index];
    if (!item) return;
    imgEl.src = item.src;
    imgEl.alt = item.alt || '';
    var tpl = t('gallery.counter', '{current} / {total}');
    counterEl.textContent = tpl
      .replace('{current}', String(index + 1))
      .replace('{total}', String(items.length));
  }

  function go(delta) {
    index = (index + delta + items.length) % items.length;
    render();
  }

  function open(i) {
    index = i;
    lastFocused = document.activeElement;
    if (!overlay) buildOverlay();
    render();
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    btnNext.focus();
  }

  function close() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  }

  // Raccoglie i thumbnail e li collega.
  function init() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-item]'));
    if (!nodes.length) return;

    items = nodes.map(function (node, i) {
      var img = node.querySelector('img');
      node.addEventListener('click', function () { open(i); });
      return {
        src: node.getAttribute('data-full') || (img && img.src),
        alt: img ? img.alt : ''
      };
    });

    // Aggiorna gli alt nei dati lightbox quando cambia la lingua.
    document.addEventListener('i18n:applied', function () {
      nodes.forEach(function (node, i) {
        var img = node.querySelector('img');
        if (img) items[i].alt = img.alt;
      });
      if (overlay && !overlay.classList.contains('hidden')) render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
