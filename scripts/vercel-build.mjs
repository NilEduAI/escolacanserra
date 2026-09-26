// Build per a Vercel: copia el web a public/ i fa absolutes les URL d'Open Graph
// (WhatsApp, Teams o Facebook només mostren la previsualització amb URL absolutes).
// Vercel l'executa automàticament (vegeu vercel.json). Localment: node scripts/vercel-build.mjs
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'public');
const PAGES = ['index.html', 'design-system.html', '404.html'];

// SITE_URL permet fixar un domini propi; si no, el de producció que dona Vercel.
const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || '';
const site = host ? (host.startsWith('http') ? host : `https://${host}`).replace(/\/$/, '') : '';

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'assets'), join(out, 'assets'), { recursive: true });

for (const page of PAGES) {
  let html = await readFile(join(root, page), 'utf8');
  if (site) {
    html = html.replace(/(<meta (?:property|name)="(?:og:image|og:url|twitter:image)" content=")\//g, `$1${site}/`);
  }
  await writeFile(join(out, page), html);
}

console.log(`public/ a punt (${PAGES.length} pàgines)${site ? ` · URL base: ${site}` : ' · sense URL base (OG relatives)'}`);
