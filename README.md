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
| `assets/js/main.js` | Interaccions sense dependències: menú mòbil, mode fosc, mida del text, pestanyes, animacions. |
| `assets/icons.svg` | Sprite d'icones i isotip vectorial. |
| `scripts/build.py` | Injecta el sprite a les pàgines i genera versions d'un sol fitxer a `dist/`. |
| `dist/` | `index.html` i `design-system.html` **autocontinguts** (CSS, JS i imatges incrustats) per compartir per correu o obrir sense servidor. |

## Com veure-ho

Obre `index.html` al navegador (doble clic). No cal instal·lar res.

Per compartir la proposta en un únic fitxer, fes servir `dist/index.html`.

Si modifiques les icones o els estils, regenera:

```bash
python3 scripts/build.py
```

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
2. Traslladar els tokens i components al web actual (Àgora/WordPress admet CSS addicional) o publicar-lo com a web estàtic.
3. Crear plantilles per a circulars, cartells i xarxes amb el mateix sistema.
