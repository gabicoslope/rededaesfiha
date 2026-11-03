# Remix of Esfiha Vila Moraes Landing

Build a single-page, mobile-first landing page for "Rede Da Esfiha Vila Moraes", a Middle Eastern-style esfiha (savory pastry) fast-food restaurant in São Paulo, Brazil. I'm attaching screenshots of my finished design reference (built in Canva) — this is the exact, approved design. Recreate it faithfully as real React/Tailwind code: same sections, same order, same colors, same fonts, same photos, same content.

COLOR (exact):

- Deep Burgundy (hero, "Faça seu pedido", "Veja o que dizem" backgrounds): #710912

- Dark Espresso/near-black (header nav text, cupom section background, footer): match the attached screenshots' dark tone exactly

- Champagne/cream (header background, "Conheça Nosso Cardápio" and "Onde estamos" backgrounds): #EFE5D2

- Antique Gold (the "Ver Avaliações no Google" button): #C28D39

TYPOGRAPHY: every section headline uses the same decorative serif/gothic-style script font shown in the screenshots (used for "Rede da Esfiha", "Conheça Nosso Cardápio", "Cupom Exclusivo para Vila Moraes", "Veja o que dizem sobre a gente", "Onde estamos" — note the small ornamental accent marks before some capital letters). Body text, nav, category captions, and buttons use a clean simple sans-serif, exactly like the screenshots.

DESIGN SYSTEM — apply these consistently everywhere, not per-section:

- ONE vertical padding scale for the top/bottom of every full-width section.

- ONE max-width and horizontal padding for the content container, so everything aligns to the same edges down the page.

- ONE card style (border-radius, shadow, padding, gap) shared by the category grid, review cards, and any other card.

- ONE button component (height, padding, border-radius, font-size, letter-spacing, weight) for every CTA — only fill color changes between primary (burgundy or gold) and secondary (outline).

- ONE consistent image aspect-ratio/crop for the 12 category photos.

SECTIONS, in order:

1. Header (sticky, cream bg): logo left, "Início" / "Cardápio" nav, "Faça seu pedido" CTA linking to https://pedido.anota.ai/loja/megaesfihacursino

2. Hero: food photo background with dark red overlay, script "Rede da Esfiha" headline, subtitle: "Massa fresquinha, recheio generoso e aquele sabor que já é tradição na Vila Moraes."

3. "Faça seu pedido agora mesmo" (Burgundy bg): two columns — heading + body text + "Anota Aí" button on the left, real food photo on the right

4. "Conheça Nosso Cardápio" (champagne bg): script H2, 4-column grid of 12 category cards (Esfihas Abertas Salgadas, Esfihas Abertas Doces, Pizzas Salgadas, Pizzas Doces, Pastéis e Salgados, Fogazzas, Hambúrguers, Beirutes, Porções, Sobremesas, Bebidas, Combos), each with a real photo and caption

5. "Cupom Exclusivo para Vila Moraes" (dark bg): coupon code input + "Copiar Cupom" button side by side, validity text below, full-width "Usar Cupom e Pedir Agora" button beneath

6. "Veja o que dizem sobre a gente" (Burgundy bg): script H2, horizontal carousel of real Google review cards, gold "Ver Avaliações no Google" button

7. "Onde estamos" (champagne bg): address + horário with icons on the left, real embedded Google Map on the right — address: Avenida do Cursino, 3216 – Vila Moraes, São Paulo – SP · Horário: Todos os dias — Loja aberta: 08h às 04h · Delivery: 18h às 02h

8. FOOTER (dark bg) — build this properly, it's currently missing: logo + "Rede Da Esfiha Vila Moraes", address, WhatsApp (11) 96442-7506, Instagram icon linking to https://www.instagram.com/rededaesfihavilamoraes_ofc/, quick links (Início / Cardápio / Faça seu pedido), horário summary, and a copyright line "© 2026 Rede Da Esfiha Vila Moraes"

Every CTA links to https://pedido.anota.ai/loja/megaesfihacursino unless otherwise noted. Everything in Brazilian Portuguese, no emoji in UI chrome (real review text stays as-is, including any emoji in the actual review content). Mobile-first, sticky floating CTA button on mobile.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e051803b-2abc-4ed4-868c-f28bbc17e51a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
