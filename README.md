# Casale La Cocca — one-pager (v1 mock-up)

Sito diretto della villa di lusso a uso esclusivo **Casale La Cocca** (Valle d'Itria, Puglia).
Questa è la **v1 mock-up**: photo-forward, bilingue IT/EN, con un form "Richiedi informazioni".
Pensata per essere ripresa ed estesa dal collaboratore.

## Stack
- **HTML statico** + **Tailwind CSS** (build via Tailwind CLI, non CDN).
- **Vanilla JS**, nessun framework.
- **i18n IT/EN** con dizionari JSON (`assets/i18n/`), default IT, scelta in `localStorage`.
- **Form** senza backend (Web3Forms/Formspree) + fallback `mailto:`.

## Requisiti
- Node.js ≥ 18 e npm.

## Installazione e build
```bash
npm install            # installa Tailwind
npm run build          # genera assets/css/styles.css (minificato)
npm run watch          # ricostruisce il CSS ad ogni modifica (sviluppo)
```

## Avvio del server locale
```bash
npm run serve          # serve la cartella su http://localhost:5173
# in alternativa: python3 -m http.server 5173
```
> Serve un server HTTP: il loader i18n usa `fetch()` sui JSON e **non funziona** aprendo
> `index.html` con `file://`.

## Sviluppo (CSS watch + server insieme)
```bash
npm run dev
```

## Struttura
```
index.html              # la one-pager (tutte le sezioni)
tailwind.config.js      # palette brand + tipografia
assets/
  css/input.css         # sorgente Tailwind + componenti
  css/styles.css        # output build (generato)
  js/i18n.js            # loader dizionari + toggle lingua
  js/gallery.js         # lightbox vanilla
  js/reveal.js          # fade-in allo scroll (IntersectionObserver)
  js/form.js            # validazione + submit + stato conferma
  i18n/it.json | en.json
  img/placeholders/     # immagini temporanee (vedi assets/img/README.md)
  img/README.md         # manifest slot → file
```

## Contenuti e traduzioni
Tutti i testi vivono in `assets/i18n/it.json` e `en.json`. Gli elementi HTML li ricevono via:
- `data-i18n="path.alla.chiave"` → `textContent`
- `data-i18n-attr="alt:path,placeholder:path2"` → attributi (alt, placeholder, aria-label, content…)

Per aggiungere/modificare un testo: aggiornare **entrambi** i JSON e referenziare la chiave nell'HTML.

---

## ✅ Cosa è incluso nella v1
- Tutte le 10 sezioni (hero, overview+dati, galleria con lightbox, spazi, esterni, comfort,
  posizione+mappa, contatti, footer).
- Toggle lingua IT/EN funzionante, `<html lang>` aggiornato, scelta persistente.
- Galleria con lightbox (frecce, tastiera ←/→/ESC, swipe, contatore, lazy-load).
- Form con validazione client-side, stato di conferma/errore, fallback `mailto:`.
- Responsive mobile-first, microinterazioni con `prefers-reduced-motion`.
- SEO: title/description IT/EN, Open Graph + Twitter card, favicon placeholder, JSON-LD `VacationRental`.

---

## ⚠️ TODO per il proprietario
Cercare i segnaposto `TODO_*` nel codice (`grep -rn "TODO_" .`). Da compilare:

| Segnaposto | Dove | Cosa fare |
|---|---|---|
| `TODO_DOMINIO` | `index.html` (canonical, og:url, JSON-LD) | Dominio definitivo (es. casalelacocca.com) |
| `TODO_FORM_ENDPOINT` | `index.html` (`<form data-endpoint>`) | Endpoint Web3Forms/Formspree. Finché è placeholder, il form usa il fallback `mailto:`. |
| `TODO_EMAIL_PROPRIETARIO` | `index.html` (form, contatti, footer) | Email destinataria delle richieste |
| `TODO_TELEFONO` / `TODO_WHATSAPP` | `index.html` (contatti, footer) | Numero telefono e numero WhatsApp (formato internazionale, es. 39333…) |
| `TODO_LOGO` | `index.html` (wordmark, favicon) | Logo/wordmark e favicon brandizzata |
| `TODO_NOME_FOTOGRAFO` | `index.html` (footer) | Credito fotografo |
| `TODO_FOTO_ORIGINALI` | `assets/img/README.md` | Sostituire i placeholder con gli originali HD (+ `srcset`) |
| `TODO_GEO` | `index.html` (JSON-LD, mappa) | Coordinate esatte per JSON-LD `geo` e marker mappa |
| `TODO_PAGINE_LEGALI` | `index.html` (consenso form, footer) | Privacy & cookie policy reali (GDPR) |
| `TODO_PREZZI` | — | Prezzi e policy prenotazione/cancellazione definitive (non ancora a sito) |

### Note produzione
- **SEO multilingua**: per la v1 il toggle è lato JS. In futuro valutare URL separati `/it` e `/en`.
- **Immagini**: predisporre `<picture>`/`srcset` quando arrivano gli originali del fotografo.
- **Dati struttura**: usare solo quelli in `CLAUDE.md` §6 (fonte unica di verità).
