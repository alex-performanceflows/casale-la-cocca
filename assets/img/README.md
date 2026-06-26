# Immagini — manifest e mapping

> ⚠️ **TODO_FOTO_ORIGINALI** — Le immagini in `placeholders/` sono **temporanee**,
> scaricate dalla scheda Puglia Paradise solo per la v1 mock-up.
> Vanno **sostituite con gli originali ad alta risoluzione del fotografo**, in più
> formati/risoluzioni per predisporre `srcset`/`<picture>` (vedi §8 della specifica).

## Fonte
- **Base URL**: `https://pugliaparadise.com/wp-content/uploads/2024/08/<FILE>`
- **Attribuzione**: le foto sono dell'autore/della proprietà; uso legittimo come
  placeholder per il sito proprio della struttura.

## Mapping slot → file locale → file remoto

| Slot (uso nel sito) | File locale (`placeholders/`) | File remoto originale |
|---|---|---|
| hero-pool | `hero-pool.webp` | `04-1.webp` |
| exterior-casale | `exterior-casale-01.webp` | `02-1.webp` |
| exterior-casale | `exterior-casale-02.webp` | `03-2.webp` |
| exterior-casale | `exterior-casale-03.webp` | `10-1.webp` |
| pool-infinity | `pool-infinity-01.webp` | `09.webp` |
| pool-infinity | `pool-infinity-02.webp` | `Casale_La_Cocca_07.webp` |
| pool-infinity | `pool-infinity-03.webp` | `Casale_La_Cocca_08.webp` |
| garden | `garden-01.webp` | `IMG_7868.webp` |
| garden | `garden-02.webp` | `IMG_7870.webp` |
| garden | `garden-03.webp` | `IMG_7865.webp` |
| solarium | `solarium-01.webp` | `IMG_7746.webp` |
| solarium | `solarium-02.webp` | `IMG_7807.webp` |
| outdoor-kitchen-dining | `outdoor-kitchen-dining-01.webp` | `IMG_7791.webp` |
| outdoor-kitchen-dining | `outdoor-kitchen-dining-02.webp` | `IMG_7798.webp` |
| outdoor-kitchen-dining | `outdoor-kitchen-dining-03.webp` | `IMG_7703.webp` |
| outdoor-kitchen-dining | `outdoor-kitchen-dining-04.webp` | `IMG_7699.webp` |
| living | `living-01.webp` | `06-1.webp` |
| living | `living-02.webp` | `131.webp` |
| living | `living-03.webp` | `Casale_La_Cocca_02.webp` |
| dining-indoor | `dining-indoor-01.webp` | `Casale_La_Cocca_17.webp` |
| dining-indoor | `dining-indoor-02.webp` | `Casale_La_Cocca_18.webp` |
| kitchen | `kitchen-01.webp` | `138-1.webp` |
| kitchen | `kitchen-02.webp` | `Casale_La_Cocca_20.webp` |
| pool-suite | `pool-suite-01.webp` | `Casale_La_Cocca_06.webp` |
| pool-suite | `pool-suite-02.webp` | `Casale_La_Cocca_10.webp` |
| garden-suite | `garden-suite-01.webp` | `Casale_La_Cocca_12.webp` |
| garden-suite | `garden-suite-02.webp` | `163.webp` |
| firstfloor-suite | `firstfloor-suite-01.webp` | `Casale_La_Cocca_16.webp` |
| firstfloor-suite | `firstfloor-suite-02.webp` | `171.webp` |
| bedroom-casale | `bedroom-casale-01.webp` | `140.webp` |
| bedroom-casale | `bedroom-casale-02.webp` | `142.webp` |
| bedroom-casale | `bedroom-casale-03.webp` | `152.webp` |
| details | `details-01.webp` | `Casale_La_Cocca_01.webp` |
| details | `details-02.webp` | `Casale_La_Cocca_15.webp` |

**Totale**: 34 file scaricati in `placeholders/`.

## Dove sono usate (in `index.html`)
- **Hero**: `hero-pool.webp` (in `preload`, unica immagine non-lazy).
- **Galleria**: `pool-infinity-01`, `living-03`, `solarium-01`, `dining-indoor-01`,
  `garden-02`, `outdoor-kitchen-dining-01`, `bedroom-casale-01`, `exterior-casale-02`,
  `details-01`, `kitchen-02`.
- **Gli spazi**: `living-01` (casa principale), `pool-suite-01`, `garden-suite-01`, `firstfloor-suite-01`.
- **Esterni & piscina**: `pool-infinity-02`.

Le restanti immagini scaricate (es. `garden-01/03`, `solarium-02`, `pool-infinity-03`,
`bedroom-casale-02/03`, `living-02`, `dining-indoor-02`, `kitchen-01`, `details-02`,
`outdoor-kitchen-dining-02..04`, `exterior-casale-01/03`, `pool-suite-02`,
`garden-suite-02`, `firstfloor-suite-02`) sono disponibili per estendere la galleria o
le sezioni.
