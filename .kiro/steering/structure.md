---
inclusion: always
---

# Estrutura

```
src/
  routes/
    __root.tsx        # <head>, Google Fonts (Nunito + Sansita), Tracking, CookieBanner
    index.tsx         # home: monta as seções, título/SEO e JSON-LD
    termos.tsx, privacidade.tsx
  components/site/    # seções do site (uma por arquivo)
    Header, Hero, MenuSection, BannerCarousel, ReviewsSection, CouponSection,
    LocationSection, AmbientSection, FaqSection, OrderSection, Footer,
    FloatingCta, FloatingWhatsApp, CookieBanner, Tracking, Reveal (animação ao rolar)
    data.ts           # links oficiais, cupom, endereço, categorias do cardápio, avaliações
    banners.ts        # ordem, textos (alt) e links dos banners do carrossel
    banner-autoplay.ts
  components/ui/      # shadcn/ui
  assets/             # imagens importadas pelo código
    banners/          # banner-<id>-desktop.webp (1920x800) e banner-<id>-mobile.webp (1280x720)
    ambiente-*.webp   # fotos do "Nosso ambiente", todas em 1040x780 (4:3)
    hero-desktop.webp (1920x1071), hero-mobile.webp (1080x1935)
    logo-rede-da-esfiha.png
  styles.css          # tokens de cor/fonte, utilitários e CSS do carrossel
public/               # favicon.png, og-logo.png, robots.txt, .htaccess
```

Ordem das seções na home (modelo de 02/11): Header, Hero (pratos em círculo sobre mesa vermelha), Faça seu pedido (celular com a loja do Anota Aí, em `OrderSection.tsx`), Cardápio, Banners (largura total), Cupom (fundo escuro), Nosso ambiente (carrossel de fotos com filtros), Avaliações (fundo escuro), Onde estamos, Footer vermelho. O `FaqSection.tsx` existe, mas saiu da página porque não está no modelo.

## Como adicionar ou trocar um banner

1. Salve as artes como `src/assets/banners/banner-<id>-desktop.webp` (1920x800) e `banner-<id>-mobile.webp` (1280x720).
2. Em `banners.ts`, acrescente o `id` no tipo `BannerId` e um item no array, na posição desejada, com o `href` de destino.
3. O carrossel encontra as imagens sozinho (`import.meta.glob`). Se uma arte faltar, ele mostra uma versão em texto.

## Arquivos que não estão em uso

`OpenStatus.tsx`, `FaqSection.tsx`, `assets/fachada-3.jpeg` e `assets/logo-round-badge.png` (as `fachada-1.jpeg` e `fachada-2.jpeg` são usadas nos cards do ambiente) ficaram de versões anteriores. Dá pra apagar.
