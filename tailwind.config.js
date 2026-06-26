/** @type {import('tailwindcss').Config} */
// Configurazione brand di Casale La Cocca.
// Palette e tipografia centralizzate qui: il collaboratore estende da questo punto.
module.exports = {
  // Scansiona HTML e JS per il purge delle classi inutilizzate.
  content: ['./index.html', './assets/js/**/*.js', './assets/i18n/*.json'],
  theme: {
    extend: {
      colors: {
        // Palette brand (vedi §3 della specifica)
        cream: '#F7F4EE',      // background crema/avorio
        carbon: '#2B2723',     // testo carbone caldo
        olive: '#5E6B4F',      // verde oliva — accento naturale
        clay: '#B08463',       // terracotta/argilla — accento caldo (CTA/dettagli)
        sand: '#D8CFBF',       // pietra/sabbia — sezioni alternate
      },
      fontFamily: {
        // Display serif elegante per i titoli; sans umanista per il corpo.
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em', // maiuscoletto per label/eyebrow
      },
      maxWidth: {
        prose: '46rem',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
