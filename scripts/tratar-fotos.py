"""Tratamento das fotos da auditoria (04/11).

Cardápio: recorte quadrado centrado no prato (a partir dos originais 1920x1281),
mesma luz e mesmo tom em todas.
Ambiente: luz e cor corrigidas; vitrine sem a lixeira e sem o cartaz vencido (recorte);
geladeiras sem o pano e a panela (recorte); fachada do fim da tarde com céu de entardecer.

Uso: python3 tratar.py <pasta-do-projeto> <pasta-de-saida>
"""
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

ROOT, OUT = sys.argv[1], sys.argv[2]
A = os.path.join(ROOT, "src", "assets")
os.makedirs(os.path.join(OUT, "cardapio"), exist_ok=True)


def lum(a):
    return 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]


def sat(a):
    mx, mn = a.max(-1), a.min(-1)
    return (mx - mn) / np.maximum(mx, 1e-4)


def niveis(a, lo=0.4, hi=99.6):
    L = lum(a)
    l0, l1 = np.percentile(L, lo), np.percentile(L, hi)
    return np.clip((a - l0) / max(l1 - l0, 1e-3), 0, 1)


def exposicao(a, alvo=0.45, forca=0.6):
    med = float(np.median(lum(a)))
    if med <= 0.01:
        return a
    g = np.log(alvo) / np.log(med)
    g = 1 + (g - 1) * forca
    g = float(np.clip(g, 0.7, 1.35))
    return np.clip(a, 0, 1) ** g


def balanco_branco(a, forca=0.8, quente=(1.03, 1.0, 0.955)):
    """Neutraliza o tom usando as superfícies claras e sem cor (teto, piso, pratos)."""
    L, S = lum(a), sat(a)
    m = (L > np.percentile(L, 70)) & (S < 0.18) & (L < 0.97)
    if m.sum() < 800:
        return a
    media = a[m].mean(0)
    alvo = media.mean() * np.array(quente)
    ganho = alvo / media
    ganho = ganho / ganho[1]
    ganho = np.clip(ganho, 0.85, 1.2)
    ganho = 1 + (ganho - 1) * forca
    return np.clip(a * ganho, 0, 1)


def curva(a, quanto=0.10):
    s = a * a * (3 - 2 * a)
    return a * (1 - quanto) + s * quanto


def saturacao(a, f=1.06):
    L = lum(a)[..., None]
    return np.clip(L + (a - L) * f, 0, 1)


def para_img(a):
    return Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))


def de_img(im):
    return np.asarray(im.convert("RGB")).astype(np.float32) / 255


def nitidez(im, r=1.0, p=55):
    return im.filter(ImageFilter.UnsharpMask(radius=r, percent=p, threshold=2))


# ---------------- Cardápio ----------------
CARDAPIO = [
    # arquivo de saída, original, centro x, centro y, lado do quadrado (px do original)
    ("IMGP9352.webp", "IMGP9352.jpg", 470, 333, 667),
    ("DSC09351-2.webp", "DSC09351-2.webp", 900, 640, 1281),
    ("DSC09574-2.webp", "DSC09574-2.webp", 960, 640, 1281),
    ("DSC00137-2.webp", "DSC00137-2.webp", 870, 640, 1250),
    ("DSC09700.webp", "DSC09700.webp", 960, 600, 1250),
    ("DSC09712-2.webp", "DSC09712-2.webp", 860, 600, 1250),
    ("DSC09488-2.webp", "DSC09488-2.webp", 910, 640, 1150),
    ("DSC09552.webp", "DSC09552.webp", 900, 640, 1281),
    ("DSC09760.webp", "DSC09760.webp", 960, 700, 1160),
    ("DSC00039-2.webp", "DSC00039-2.webp", 860, 640, 1150),
    ("DSC09622.webp", "DSC09622.webp", 920, 660, 1100),
    ("DSC09477.webp", "DSC09477.webp", 1200, 700, 1160),
]
LADO = 600

base = []
for saida, orig, cx, cy, s in CARDAPIO:
    im = Image.open(os.path.join(A, orig)).convert("RGB")
    W, H = im.size
    x0 = max(0, min(W - s, cx - s // 2))
    y0 = max(0, min(H - s, cy - s // 2))
    im = im.crop((x0, y0, x0 + s, y0 + s)).resize((LADO, LADO), Image.LANCZOS)
    a = exposicao(niveis(de_img(im)), alvo=0.42, forca=0.55)
    base.append((saida, a))

# mesmo tom em todas: aproxima a cor média de cada foto da mediana do conjunto
cromas = np.array([a.reshape(-1, 3).mean(0) / a.reshape(-1, 3).mean() for _, a in base])
alvo = np.median(cromas, axis=0)
for (saida, a), c in zip(base, cromas):
    ganho = 1 + (alvo / c - 1) * 0.6
    a = np.clip(a * ganho, 0, 1)
    a = saturacao(curva(a, 0.12), 1.07)
    im = nitidez(para_img(a), 1.0, 50)
    im.save(os.path.join(OUT, "cardapio", saida), "WEBP", quality=80, method=6)


# ---------------- Ambiente ----------------
def levantar_sombras(a, quanto=0.18):
    L = lum(a)[..., None]
    peso = np.clip(1 - L / 0.45, 0, 1) ** 2
    return np.clip(a + (np.sqrt(np.clip(a, 0, 1)) - a) * peso * quanto, 0, 1)


def tratar_ambiente(a, alvo=0.5):
    a = niveis(a, 0.3, 99.7)
    a = levantar_sombras(a)
    a = balanco_branco(a, 0.75)
    a = exposicao(a, alvo=alvo, forca=0.5)
    a = saturacao(curva(a, 0.10), 1.05)
    return a


def salvar(a, nome, q=82):
    nitidez(para_img(a), 1.1, 45).save(os.path.join(OUT, nome), "WEBP", quality=q, method=6)


for nome in [
    "ambiente-fachada-1", "ambiente-fachada-3", "ambiente-superior-1", "ambiente-superior-2",
    "ambiente-superior-3", "ambiente-superior-4", "ambiente-terreo-1", "fachada-1",
]:
    a = de_img(Image.open(os.path.join(A, nome + ".webp")))
    alvo = 0.42 if nome in ("ambiente-fachada-3", "fachada-1") else 0.5  # noturnas ficam escuras
    salvar(tratar_ambiente(a, alvo), nome + ".webp")

# vitrine: recorte tira a lixeira (embaixo) e o cartaz vencido do Dia das Crianças (esquerda)
im = Image.open(os.path.join(A, "ambiente-terreo-2.webp")).convert("RGB").crop((140, 0, 1040, 566))
salvar(tratar_ambiente(de_img(im)), "ambiente-terreo-2.webp")

# geladeiras: recorte tira a panela com o pano (esquerda) e o micro-ondas/toalha (direita)
im = Image.open(os.path.join(A, "ambiente-terreo-3.webp")).convert("RGB").crop((388, 150, 872, 780))
salvar(tratar_ambiente(de_img(im)), "ambiente-terreo-3.webp")

# fachada no fim da tarde: troca o céu cinza por um céu de entardecer, mantendo fios e postes
im = Image.open(os.path.join(A, "fachada-2.webp")).convert("RGB")
a = de_img(im)
H, W, _ = a.shape
L, S = lum(a), sat(a)
# probabilidade de ser céu: claro, sem cor e acima do prédio
ys = np.arange(H)[:, None]
# acima de y=420 não há luminárias: nuvens bem claras também contam como céu
teto_claro = np.where(ys < 420, 1.0, np.clip((0.985 - L) / 0.06, 0, 1))
p = np.clip((L - 0.28) / 0.12, 0, 1) * np.clip((0.16 - S) / 0.07, 0, 1) * teto_claro
xs = np.arange(W)[None, :]
limite = np.full(W, 560.0)
limite[xs[0] < 200] = 700  # telhado da ala esquerda fica mais baixo
limite[xs[0] > 840] = 620  # prédio vizinho à direita
p = p * (ys < limite[None, :])
# só o céu ligado ao topo (evita pegar paredes cinza)
from scipy import ndimage  # noqa: E402

rot, n = ndimage.label(p > 0.35)
topo = set(np.unique(rot[0, :])) - {0}
conectado = np.isin(rot, list(topo))
p = p * ndimage.binary_dilation(conectado, iterations=2)
p = np.asarray(Image.fromarray((p * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32) / 255
# degradê de entardecer: azul no alto, lilás no meio e laranja perto do telhado
t = np.clip(ys / 560.0, 0, 1)
c0, c1, c2 = np.array([0.22, 0.36, 0.62]), np.array([0.55, 0.66, 0.84]), np.array([0.97, 0.80, 0.62])
ceu = np.where(t[..., None] < 0.6, c0 + (c1 - c0) * (t[..., None] / 0.6), c1 + (c2 - c1) * ((t[..., None] - 0.6) / 0.4))
ceu = np.broadcast_to(ceu, (H, W, 3))
# mantém a textura das nuvens do original
media_ceu = float((L * p).sum() / max(p.sum(), 1))
textura = np.clip(L / max(media_ceu, 1e-3), 0.6, 1.35)[..., None] ** 0.6
novo = np.clip(ceu * textura, 0, 1)
a2 = a * (1 - p[..., None]) + novo * p[..., None]
a2 = tratar_ambiente(a2, alvo=0.45)
salvar(a2, "fachada-2.webp")
Image.fromarray((p * 255).astype(np.uint8)).save(os.path.join(OUT, "mascara-ceu.png"))
print("pronto")
