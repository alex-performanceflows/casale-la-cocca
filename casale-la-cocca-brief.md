# Casale La Cocca — Brief di inizializzazione per Claude Code

> **Come usare questo file**
> 1. Salvalo nella root della cartella di progetto come `CLAUDE.md` (Claude Code lo carica in automatico a ogni sessione, anche per il collaboratore).
> 2. Per la prima generazione, incolla in chat il blocco **"Primo comando"** qui sotto.
> 3. Tutto il resto del documento è la specifica che Claude Code deve seguire.

---

## ▶️ Primo comando (da incollare in Claude Code)

```
Leggi CLAUDE.md. Inizializza la prima mock-up (v1) della one-pager di Casale La Cocca
seguendo la specifica: stack HTML statico + Tailwind (build con CLI), bilingue IT/EN
con dizionari JSON, gallery fotografica come elemento centrale, sezione form
"Richiedi informazioni" con invio via email. Scarica in locale le immagini placeholder
indicate e crea il manifest. Non inventare dati sulla struttura: usa solo quelli nel
blocco "Dati struttura (fonte unica di verità)". Al termine fai partire un server locale
e dimmi cosa hai costruito e cosa resta come TODO per il proprietario.
```

---

## 1. Contesto e obiettivo

**Casale La Cocca** è una villa di lusso a uso esclusivo nella Valle d'Itria (campagna di Cisternino, tra Ostuni e Martina Franca). Oggi è presente solo su piattaforme terze (Puglia Paradise, Airbnb, Hotels-Apulia, Agoda). L'obiettivo è dare alla proprietà **un proprio sito diretto**, partendo da una **one-pager** che metta le fotografie al centro e permetta di raccogliere **richieste di prenotazione/informazioni**.

- **Posizionamento**: ultra-premium. È un immobile da ~5.000 € a weekend. Il sito deve trasmettere lusso discreto, non urlato.
- **Le fotografie sono l'asset principale** (scattate da un fotografo professionista): devono dominare il layout, a tutta larghezza, con respiro.
- **Riferimento di stile**: [cabianchini.com/it](https://www.cabianchini.com/it) — pulito, photo-forward, elegante. Qui però alziamo di un livello: meno "agriturismo veneto", più "villa di lusso pugliese".
- Questa è una **v1 mock-up**: poi ci lavorerà il collaboratore. Quindi codice ordinato, commentato, facilmente estendibile.

---

## 2. Stack e impostazione tecnica

- **HTML statico + Tailwind CSS** con build via **Tailwind CLI** (`npm`), non CDN, così abbiamo `tailwind.config.js` con palette e font del brand e CSS già "purgato".
- Vanilla JS (no framework). Niente dipendenze pesanti.
- **i18n IT + EN**: contenuti in `assets/i18n/it.json` e `en.json`, caricati da un piccolo loader (`assets/js/i18n.js`) che popola gli elementi con attributo `data-i18n`. Toggle lingua in nav, default **IT**, scelta salvata in `localStorage`, aggiorna `<html lang>`.
  - *Nota produzione (per il collaboratore)*: in futuro valutare URL separati `/it` e `/en` per SEO. Per la v1 il toggle JS va bene.
- **Form** "Richiedi informazioni" → invio via **email**. Per un sito statico usare un servizio senza backend (consigliato **Web3Forms** o **Formspree**): mettere l'endpoint come placeholder `TODO_FORM_ENDPOINT` e validazione + stato di conferma lato client. Includere fallback `mailto:` e contatto WhatsApp.

### Struttura cartelle attesa
```
casale-la-cocca/
├── index.html
├── package.json
├── tailwind.config.js
├── CLAUDE.md
├── README.md
└── assets/
    ├── css/
    │   ├── input.css        # @tailwind base/components/utilities + custom
    │   └── styles.css        # output build
    ├── js/
    │   ├── i18n.js           # loader dizionari + toggle lingua
    │   ├── gallery.js        # lightbox vanilla
    │   ├── reveal.js         # fade-in on scroll (IntersectionObserver)
    │   └── form.js           # validazione + submit + stato conferma
    ├── i18n/
    │   ├── it.json
    │   └── en.json
    └── img/
        ├── placeholders/     # immagini scaricate (vedi §7)
        └── README.md         # mapping slot→file + TODO sostituzione originali
```

---

## 3. Design direction

- **Mood**: pietra calcarea imbiancata, luce mediterranea, ulivi, acqua della piscina. Lusso sobrio.
- **Palette** (definirla in `tailwind.config.js` come `theme.extend.colors`):
  - background crema/avorio `#F7F4EE`
  - testo carbone caldo `#2B2723`
  - verde oliva `#5E6B4F` (accento naturale)
  - terracotta/argilla tenue `#B08463` (accento caldo, usato con parsimonia per CTA/dettagli)
  - pietra/sabbia `#D8CFBF` (sezioni alternate)
- **Tipografia**: display **serif** elegante (es. *Fraunces* o *Cormorant Garamond*) per titoli; **sans** umanista pulito (es. *Inter*) per il corpo. Label/eyebrow in maiuscoletto con letter-spacing ampio. Self-host dei font se semplice, altrimenti Google Fonts per la v1.
- **Layout**: molto whitespace, immagini full-bleed e in griglia editoriale, titoli grandi, ritmo verticale generoso.
- **Microinterazioni**: fade/slide-in leggero allo scroll, transizioni morbide su hover; rispettare `prefers-reduced-motion`. Niente effetti chiassosi.
- **Nav**: minimale e sticky, trasparente sull'hero poi su sfondo solido; logo/wordmark a sinistra, link ancore + toggle lingua + CTA "Richiedi disponibilità" a destra. Menu mobile a tutto schermo.

---

## 4. Struttura della one-pager (sezioni, in ordine)

1. **Hero** — immagine full-bleed (piscina a sfioro / casale), nome "Casale La Cocca", una riga di posizionamento, riga location, CTA primaria "Richiedi disponibilità". Scroll indicator discreto.
2. **Introduzione / Panoramica** — paragrafo evocativo breve + striscia con i dati chiave: *10 ospiti · 5 camere en-suite · 5,5 bagni · piscina a sfioro 14 m · uso esclusivo*.
3. **Galleria** — **sezione centrale, valorizza il fotografo.** Griglia editoriale (masonry o griglia a misure miste) con **lightbox** (frecce, ESC, swipe su mobile, lazy-load). Sottotitolo che cita le fotografie d'autore.
4. **Gli spazi** — Casa principale + Pool Suite + Garden Suite + Suite al primo piano: per ciascuno immagine + testo breve.
5. **Gli esterni & la piscina** — feature section: piscina a sfioro salata 14×4 m, solarium panoramico, cucina esterna attrezzata, area barbecue, doccia esterna.
6. **Caratteristiche / Comfort** — lista amenities con icone (vedi §6), pulita e ordinata.
7. **Posizione & dintorni** — mappa (embed leggero o statica) + distanze chiave (borghi, mare, aeroporti) presentate con eleganza.
8. **Esperienze nella Valle d'Itria** *(opzionale v1)* — borghi, Acquedotto Pugliese (sentiero a 400 m), mare, golf.
9. **Richiedi informazioni** — il form (vedi §5), con contatto alternativo (telefono/WhatsApp/email).
10. **Footer** — contatti, CIN, social, link legali (placeholder), credito "Fotografie di [NOME FOTOGRAFO — TODO]".

---

## 5. Form "Richiedi informazioni"

Campi: **Nome e cognome\*** · **Email\*** · **Telefono\*** · **Check-in** · **Check-out** · **Numero ospiti** · **Messaggio** · **Consenso privacy GDPR\*** (checkbox con link a privacy policy — TODO).

- Validazione client-side; stato di successo ("Grazie, ti rispondiamo entro 24 ore") e di errore.
- Invio via servizio no-backend (`TODO_FORM_ENDPOINT`), email destinatario `TODO_EMAIL_PROPRIETARIO`.
- Testo legale GDPR coerente (in IT/EN). Non usare `<form>` con submit nativo che ricarica: gestire con JS (`fetch`).
- CTA in tutta la pagina puntano a questa sezione (ancora `#contatti`).

---

## 6. Dati struttura (fonte unica di verità)

> **Usare solo questi dati. Non inventarne altri.** Riscrivere i testi descrittivi con tono premium originale (non copiare verbatim dalle piattaforme).

**Identità**
- Nome: Casale La Cocca
- Tipo: villa di lusso a uso esclusivo, casale anni '50 ristrutturato da artigiani locali (volte in pietra, pavimenti tradizionali, interni essenziali e contemporanei)
- Località: Valle d'Itria, campagna tra Cisternino, Ostuni e Martina Franca (provincia di Brindisi/Bari)
- A 400 m dal sentiero pedonale/ciclabile dell'Acquedotto Pugliese
- CIN: `IT074005B400099613`

**Capienza**
- 10 ospiti · 5 camere matrimoniali tutte con bagno en-suite · 5,5 bagni · piscina privata

**Composizione**
- *Casa principale*: 2 camere padronali en-suite, soggiorno aperto su piscina/giardino, zona pranzo, cucina attrezzata, cucina esterna attrezzata + barbecue, zona servizio con frigo extra e lavanderia, bagno di servizio.
- *Pool Suite*: vicino alla piscina, ampie vetrate, vista acqua/giardino, bagno en-suite.
- *Garden Suite*: piano terra, accesso diretto al giardino, porte vetrate sul verde, bagno en-suite.
- *Suite al primo piano*: accesso da scala esterna privata, terrazza privata, bagno en-suite.

**Piscina/esterni**
- Piscina a sfioro in acqua salata, 14×4 m, con ampia zona ad acqua bassa
- Solarium panoramico · cucina esterna attrezzata · area BBQ a gas · doccia esterna fredda in zona piscina

**Comfort & dotazioni** (per la lista icone)
- Piscina privata acqua salata · Wi-Fi · aria condizionata in ogni stanza · raffrescamento/riscaldamento a pavimento · ventilazione forzata · area pranzo esterna coperta · altoparlanti Bluetooth · BBQ a gas · cucina completamente attrezzata · lavastoviglie · lavatrice · asciugatrice · macchina caffè · bollitore · macchina del ghiaccio · forno · ferro e asse da stiro · doccia esterna · parcheggio privato · cancello automatico privato · asciugacapelli in ogni bagno · tende oscuranti · Smart TV · impianto fotovoltaico · sistema d'allarme con vigilanza privata · (videosorveglianza disattivata durante il soggiorno)

**Regole**
- Check-in dopo le 16:00 · check-out entro le 10:00
- Animali non ammessi · fumo solo all'esterno · feste non ammesse
- Cauzione 500 € · tassa di soggiorno esclusa

**Posizione & distanze**
- Cisternino 3 km / 5 min · Martina Franca 7 km / 8 min · Locorotondo 9 km / 14 min · Ostuni 18 km / 20 min · Alberobello 18 km / 25 min · Polignano a Mare 41 km / 44 min
- Spiaggia più vicina: Torre Canne 20 km / 25 min
- Golf: Savelletri 27 km / 33 min
- Aeroporti: Brindisi 57 km / 53 min · Bari 93 km / 73 min

**Tono dei testi**
- IT elegante, evocativo, ritmo lento ("rallentare", "luce", "pietra", "convivialità"). Frasi brevi. Niente superlativi gonfiati.
- EN: traduzione curata, registro luxury-travel (non letterale). Produrre entrambe le lingue nei JSON.

---

## 7. Immagini placeholder (temporanee)

Le foto definitive ad alta risoluzione arriveranno dal fotografo. Per la v1 **scaricare in locale** un set placeholder dalla scheda Puglia Paradise in `assets/img/placeholders/`, rinominandole con nomi semantici, e creare `assets/img/README.md` con la tabella di mapping e il **TODO: sostituire con gli originali del fotografo (più formati/risoluzioni per srcset)**.

- **Base URL**: `https://pugliaparadise.com/wp-content/uploads/2024/08/<FILE>`
- **Set curato consigliato** (slot → file):

| Slot | File |
|---|---|
| hero-pool | `04-1.webp` |
| exterior-casale | `02-1.webp`, `03-2.webp`, `10-1.webp` |
| pool-infinity | `09.webp`, `Casale_La_Cocca_07.webp`, `Casale_La_Cocca_08.webp` |
| garden | `IMG_7868.webp`, `IMG_7870.webp`, `IMG_7865.webp` |
| solarium | `IMG_7746.webp`, `IMG_7807.webp` |
| outdoor-kitchen-dining | `IMG_7791.webp`, `IMG_7798.webp`, `IMG_7703.webp`, `IMG_7699.webp` |
| living | `06-1.webp`, `131.webp`, `Casale_La_Cocca_02.webp` |
| dining-indoor | `Casale_La_Cocca_17.webp`, `Casale_La_Cocca_18.webp` |
| kitchen | `138-1.webp`, `Casale_La_Cocca_20.webp` |
| pool-suite | `Casale_La_Cocca_06.webp`, `Casale_La_Cocca_10.webp` |
| garden-suite | `Casale_La_Cocca_12.webp`, `163.webp` |
| firstfloor-suite | `Casale_La_Cocca_16.webp`, `171.webp` |
| bedroom-casale | `140.webp`, `142.webp`, `152.webp` |
| details | `Casale_La_Cocca_01.webp`, `Casale_La_Cocca_15.webp` |

> Se servono altre immagini, sulla pagina sorgente è disponibile l'elenco completo dei file `2024/08/*.webp`.
> **Attribuzione**: le foto sono dell'autore/della proprietà; uso legittimo come placeholder per il sito proprio della struttura.

---

## 8. Requisiti tecnici di qualità

- **Responsive** mobile-first; testare 360px / 768px / 1280px / 1920px.
- **Performance**: `loading="lazy"` su tutte le immagini tranne l'hero (che va in preload); `width`/`height` o `aspect-ratio` per evitare CLS; quando ci saranno gli originali, predisporre `srcset`/`<picture>`.
- **Accessibilità**: HTML semantico (`header/nav/main/section/footer`), `alt` significativi (in IT/EN nei JSON), focus visibili, contrasto adeguato, label sui campi form, supporto `prefers-reduced-motion`.
- **SEO**: `<title>` e meta description IT/EN, Open Graph + Twitter card, favicon (placeholder), e **JSON-LD** `schema.org` tipo `VacationRental`/`LodgingBusiness` con nome, geo, numero ospiti/camere, amenities e CIN.
- Codice commentato e ordinato; `README.md` con istruzioni `npm install` / build Tailwind / avvio server locale.

---

## 9. TODO per il proprietario (da lasciare segnalati nel codice)

- `TODO_DOMINIO` (es. casalelacocca.com)
- `TODO_EMAIL_PROPRIETARIO` + `TODO_FORM_ENDPOINT` (Web3Forms/Formspree)
- `TODO_TELEFONO` / `TODO_WHATSAPP`
- `TODO_LOGO` / wordmark
- `TODO_NOME_FOTOGRAFO` (credito in footer)
- `TODO_PREZZI` e policy prenotazione/cancellazione definitive
- `TODO_PAGINE_LEGALI` (privacy & cookie policy per GDPR)
- `TODO_FOTO_ORIGINALI` ad alta risoluzione (più formati per srcset)

---

## 10. Definizione di "fatto" per la v1

- `npm` + Tailwind CLI configurati; build funzionante.
- `index.html` con tutte le sezioni di §4, bilingue IT/EN funzionante via toggle.
- Galleria con lightbox operativa; immagini placeholder scaricate in locale + manifest.
- Form completo con validazione e stato di conferma (endpoint placeholder).
- Responsive, accessibile, con meta/OG/JSON-LD compilati.
- Server locale avviato e riepilogo finale con elenco TODO.
