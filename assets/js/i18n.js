/* =============================================================================
 * i18n.js — loader dizionari + toggle lingua
 * -----------------------------------------------------------------------------
 * Carica assets/i18n/<lang>.json e popola ogni elemento con attributo:
 *   data-i18n="path.to.key"            -> textContent
 *   data-i18n-attr="attr:path,attr2:path2"  -> attributi (es. alt, aria-label, content, placeholder)
 * Lingua di default: IT. Scelta salvata in localStorage. Aggiorna <html lang>.
 * =============================================================================
 */
(function () {
  'use strict';

  var SUPPORTED = ['it', 'en'];
  var DEFAULT_LANG = 'it';
  var STORAGE_KEY = 'clc-lang';
  var cache = {}; // dizionari già caricati

  // Risolve un path "a.b.c" dentro l'oggetto del dizionario.
  function resolve(dict, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] != null ? acc[key] : undefined;
    }, dict);
  }

  // Carica un dizionario JSON (con cache).
  function loadDict(lang) {
    if (cache[lang]) return Promise.resolve(cache[lang]);
    return fetch('assets/i18n/' + lang + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('i18n: impossibile caricare ' + lang);
        return res.json();
      })
      .then(function (json) {
        cache[lang] = json;
        return json;
      });
  }

  // Applica il dizionario al DOM.
  function apply(dict) {
    // Testi
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = resolve(dict, el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });

    // Attributi: data-i18n-attr="alt:hero.imageAlt,aria-label:nav.menuOpen"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = parts[0].trim();
        var value = resolve(dict, (parts[1] || '').trim());
        if (typeof value === 'string') el.setAttribute(attr, value);
      });
    });

    // Notifica gli altri moduli (es. gallery) che la lingua è cambiata.
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { dict: dict } }));
  }

  // Aggiorna lo stato visivo dei pulsanti lingua.
  function syncToggle(lang) {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('font-semibold', active);
      btn.classList.toggle('text-carbon', active);
      btn.classList.toggle('text-carbon/50', !active);
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    return loadDict(lang).then(function (dict) {
      document.documentElement.lang = lang;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      apply(dict);
      syncToggle(lang);
      // Esposto per altri moduli che vogliono leggere stringhe (gallery counter, form).
      window.__i18n = { lang: lang, dict: dict, t: function (p) { return resolve(dict, p); } };
      return dict;
    });
  }

  // Lingua iniziale: localStorage -> browser -> default.
  function initialLang() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT_LANG;
  }

  // Wiring dei pulsanti di toggle.
  function bindToggles() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang-btn'));
      });
    });
  }

  function init() {
    bindToggles();
    setLang(initialLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // API pubblica minima.
  window.i18n = { setLang: setLang };
})();
