# Escola Can Serra · Proposta de nou web + Design System

> **5 colors · 1 serralada · molts cims**

Prototip navegable d'un nou web per a l'[Escola Can Serra](https://agora.xtec.cat/escolacanserra/) (Barberà del Vallès), amb un design system propi construït a partir de tres elements que ja formen part de l'escola:

- **Els cinc cims** del logotip (1979, redibuixat el 2010).
- **Les lames de colors** de la façana de l'edifici.
- **La Farigoleta**, la gegantona de l'escola.

## Què hi ha

| Fitxer | Què és |
| --- | --- |
| `index.html` | Pàgina d'inici completa: hero, accés ràpid, trets d'identitat, projectes («Els nostres cims»), nivells amb el «camí cap al cim», la Farigoleta, calendari de festes, notícies, famílies i AFA, biblioteca i instal·lacions, història, portes obertes i contacte. |
| `design-system.html` | Documentació del design system: principis, logotip, color, tipografia, espai, patrons, icones, components, veu i to, i accessibilitat. |
| `assets/css/tokens.css` | **Tokens de disseny** (colors, tipografia, espai, radis, ombres, moviment) en variables CSS, amb tema clar i fosc. |
| `assets/css/main.css` | Components i maquetació. Només usa tokens. |
| `assets/css/ds.css` | Estils de la pàgina de documentació. |
| `404.html` | Pàgina d'error pròpia («Aquest cim encara no l'hem pujat»). |
| `assets/js/main.js` | Interaccions sense dependències: menú mòbil, mode fosc, mida del text, pestanyes, mapa sota demanda, animacions. |
| `assets/js/theme-init.js` | Aplica el tema i la mida de text desats abans de pintar la pàgina. |
| `assets/fonts/`, `assets/css/fonts.css` | Tipografies autoallotjades. |
| `assets/img/og.png` | Imatge de previsualització per a xarxes i xats (font: `scripts/og-image.html`). |
| `vercel.json`, `scripts/vercel-build.mjs` | Configuració i build per publicar a Vercel. |
| `assets/icons.svg` | Sprite d'icones i isotip vectorial. |
| `scripts/build.py` | Injecta el sprite a les pàgines i genera versions d'un sol fitxer a `dist/`. |
| `dist/` | `index.html` i `design-system.html` **autocontinguts** (CSS, JS, tipografies i imatges incrustats) per compartir per correu o obrir sense servidor. |

## Com veure-ho

Obre `index.html` al navegador (doble clic). No cal instal·lar res.

Per compartir la proposta en un únic fitxer, fes servir `dist/index.html`.

Si modifiques les icones o els estils, regenera:

```bash
python3 scripts/build.py
```

## Publicar a Vercel

El repositori ja està configurat (`vercel.json`). Només cal:

1. A [vercel.com/new](https://vercel.com/new), importa el repositori `NilEduAI/escolacanserra`.
2. Deixa el *Framework Preset* a **Other** i no toquis res més: `vercel.json` ja defineix el build (`node scripts/vercel-build.mjs`) i la carpeta de sortida (`public/`).
3. **Deploy.**

Què fa la configuració:

- **URL netes:** `/design-system` en lloc de `/design-system.html`, i una pàgina **404** pròpia.
- **Previsualització als xats:** el build posa URL absolutes a les etiquetes Open Graph (amb el domini de producció de Vercel), perquè WhatsApp, Teams o el correu mostrin la imatge `assets/img/og.png`. Amb un domini propi, afegeix la variable d'entorn `SITE_URL` (p. ex. `web.escolacanserra.cat`).
- **No indexació:** és un prototip no oficial, així que porta `noindex` (etiqueta i capçalera `X-Robots-Tag`) i una franja que enllaça al web oficial. **Quan l'escola l'aprovi**, esborra `<meta name="robots">` de les pàgines i la capçalera `X-Robots-Tag` de `vercel.json`.
- **Seguretat:** capçaleres CSP, `nosniff`, `Referrer-Policy` i `Permissions-Policy`. No hi ha cap script en línia ni de tercers.

### Privacitat (RGPD)

- **Tipografies autoallotjades** a `assets/fonts/` (llicència SIL OFL): el web no fa cap petició a Google.
- **El mapa no es carrega fins que es clica** «Mostra el mapa»: cap petició a OpenStreetMap sense consentiment.
- **Sense galetes ni analítica.** El tema i la mida de text es desen només al navegador (`localStorage`).
- **Sense fotos d'alumnes.**

## El design system en 30 segons

- **Color per etapa.** Infantil = groc · Cicle Inicial = verd · Cicle Mitjà = blau · Cicle Superior = vermell · Comunitat = negre. S'aplica amb un sol atribut: `data-cycle="infantil"`.
- **Tipografia.** *Bricolage Grotesque* (títols) · *Atkinson Hyperlegible* (text, dissenyada per a baixa visió) · *Caveat* (notes a mà).
- **Signatura visual.** Formes planes, vora de 2 px i ombra «adhesiu» desplaçada.
- **Accessibilitat.** Contrastos verificats (WCAG 2.2 AA), focus visible, mode fosc, botó per ampliar el text fins al 125 % i respecte per `prefers-reduced-motion`.
- **Imatge dels infants.** El prototip no fa servir cap foto d'alumnes: les notícies tenen *cobertes generatives* (color d'etapa + icona + paraula a mà).

## Contingut

Els textos surten del web actual de l'escola (història, trets d'identitat, projectes, horaris d'atenció, notícies del curs 25-26). Cal que l'escola revisi abans de publicar:

- Dates de portes obertes i preinscripció del curs 2027-28.
- Descripcions breus dels serveis de l'AFA (acollida, extraescolars, casal).
- Detalls de projectes resumits (p. ex. francès, caixes d'investigació).

## Possibles passos següents

1. Validar la proposta amb l'equip directiu i el claustre.
2. Traslladar els tokens i components al web actual (Àgora/WordPress admet CSS addicional) o mantenir-lo com a web estàtic a Vercel.
3. Crear plantilles per a circulars, cartells i xarxes amb el mateix sistema.
