#!/usr/bin/env python3
"""Build de la proposta web de l'Escola Can Serra.

1. Injecta el sprite d'icones (assets/icons.svg) a totes les pàgines HTML
   entre els marcadors <!-- sprite:start --> i <!-- sprite:end -->.
2. Genera versions autocontingudes a dist/ (CSS, JS i imatges incrustats)
   per poder compartir cada pàgina com un únic fitxer .html.

Ús:  python3 scripts/build.py
"""
from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "design-system.html"]
SPRITE_RE = re.compile(r"(<!-- sprite:start -->)(.*?)(<!-- sprite:end -->)", re.S)


def inject_sprite() -> None:
    sprite = (ROOT / "assets/icons.svg").read_text(encoding="utf-8").strip()
    for name in PAGES:
        page = ROOT / name
        if not page.exists():
            continue
        html = page.read_text(encoding="utf-8")
        new = SPRITE_RE.sub(lambda m: f"{m.group(1)}\n{sprite}\n{m.group(3)}", html)
        if new != html:
            page.write_text(new, encoding="utf-8")
            print(f"sprite → {name}")


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def bundle(name: str) -> None:
    html = (ROOT / name).read_text(encoding="utf-8")

    def css(m: re.Match) -> str:
        return f"<style>\n{(ROOT / m.group(1)).read_text(encoding='utf-8')}\n</style>"

    def js(m: re.Match) -> str:
        return f"<script>\n{(ROOT / m.group(1)).read_text(encoding='utf-8')}\n</script>"

    def img(m: re.Match) -> str:
        return f'{m.group(1)}="{data_uri(ROOT / m.group(2))}"'

    html = re.sub(r'<link rel="stylesheet" href="(assets/[^"]+\.css)">', css, html)
    html = re.sub(r'<script src="(assets/[^"]+\.js)"></script>', js, html)
    html = re.sub(r'(src|content)="(assets/img/[^"]+)"', img, html)
    # Enllaços de descàrrega (p. ex. tokens.css) → data URI
    html = re.sub(r'href="(assets/[^"]+)" download',
                  lambda m: f'href="{data_uri(ROOT / m.group(1))}" download="{Path(m.group(1)).name}"', html)
    out = ROOT / "dist" / name
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"bundle → dist/{name} ({out.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    inject_sprite()
    for page in PAGES:
        if (ROOT / page).exists():
            bundle(page)
