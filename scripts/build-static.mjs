/* =============================================================================
 * build-static.mjs — assembla il sito statico nella cartella public/ per il deploy.
 * -----------------------------------------------------------------------------
 * Vercel (e in genere gli host statici) pubblicano una "output directory".
 * Questo script copia in public/ solo i file che compongono il sito,
 * escludendo node_modules, sorgenti e file di progetto.
 * Eseguito dopo build:css (vedi package.json).
 * =============================================================================
 */
import { rmSync, mkdirSync, cpSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public');

// File/cartelle da pubblicare (tutto il resto resta fuori da public/).
const include = ['index.html', 'assets'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const entry of include) {
  cpSync(resolve(root, entry), resolve(out, entry), { recursive: true });
}

console.log('build-static: public/ pronta (' + include.join(', ') + ')');
