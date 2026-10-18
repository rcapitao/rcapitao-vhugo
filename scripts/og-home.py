#!/usr/bin/env python3
"""Gera static/images/og-home.png (1200x630), a imagem que aparece ao compartilhar rcapitao.com.

Uso: python3 scripts/og-home.py
Requer: pip install pillow fonttools brotli
"""
import io
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PHOTO = ROOT / "static/images/profile.jpg"
FONT = ROOT / "static/fonts/open-sans-latin-wght-normal.woff2"
OUT = ROOT / "static/images/og-home.png"

NAME = "Rafael Capitão"
LINES = ["Advogado", "Compliance, Privacidade", "e Proteção de Dados"]
URL = "rcapitao.com"

# Paleta Oslo
POLAR_NIGHT = (28, 36, 66)
FROST_BLUE = (193, 207, 228)
ICY_LILAC = (227, 229, 233)
GLACIER_MIST = (248, 248, 249)
AURORA_HAZE = (143, 149, 196)
NORDIC_BRICK = (139, 43, 38)

W, H = 1200, 630
S = 2  # desenha em 2x e reduz no fim, para bordas suaves


def font(size, weight):
    """Open Sans variável no peso pedido (convertida de woff2 em memória)."""
    tt = TTFont(FONT)
    tt.flavor = None
    buf = io.BytesIO()
    tt.save(buf)
    buf.seek(0)
    f = ImageFont.truetype(buf, size * S)
    f.set_variation_by_axes([weight])
    return f


img = Image.new("RGB", (W * S, H * S), POLAR_NIGHT)
draw = ImageDraw.Draw(img)

# Brilho suave no canto (Aurora Haze), feito com círculos concêntricos
glow = Image.new("L", (W * S, H * S), 0)
gd = ImageDraw.Draw(glow)
cx, cy, rmax = 980 * S, 120 * S, 520 * S
for i in range(60):
    r = rmax * (1 - i / 60)
    gd.ellipse((cx - r, cy - r, cx + r, cy + r), fill=int(70 * (i / 60) ** 2))
img.paste(Image.new("RGB", img.size, AURORA_HAZE), (0, 0), glow)
draw = ImageDraw.Draw(img)

# Foto redonda com anel Frost Blue
size = 300 * S
px, py = 110 * S, (H * S - size) // 2
photo = Image.open(PHOTO).convert("RGB")
side = min(photo.size)
photo = photo.crop(((photo.width - side) // 2, 0, (photo.width + side) // 2, side)).resize((size, size), Image.LANCZOS)
mask = Image.new("L", (size, size), 0)
ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
ring = 10 * S
draw.ellipse((px - ring, py - ring, px + size + ring, py + size + ring), fill=FROST_BLUE)
img.paste(photo, (px, py), mask)

# Textos
tx = px + size + 80 * S
draw.rectangle((tx, 150 * S, tx + 56 * S, 156 * S), fill=NORDIC_BRICK)
draw.text((tx, 178 * S), NAME, font=font(64, 700), fill=GLACIER_MIST)
y = 280 * S
for line in LINES:
    draw.text((tx, y), line, font=font(32, 400), fill=ICY_LILAC)
    y += 46 * S
draw.text((tx, 470 * S), URL, font=font(26, 600), fill=AURORA_HAZE)

img.resize((W, H), Image.LANCZOS).save(OUT, optimize=True)
print(f"Gerado: {OUT.relative_to(ROOT)}")
