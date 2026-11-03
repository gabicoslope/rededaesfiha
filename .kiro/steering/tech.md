---
inclusion: always
---

# Stack e comandos

- TanStack Start com React 19, Vite 8 e Tailwind CSS v4. As cores ficam como tokens oklch no `@theme` de `src/styles.css`.
- Componentes: shadcn/ui (em `src/components/ui`), embla-carousel-react, motion (`motion/react`) e lucide-react.
- Node 24 e npm. Use `package-lock.json` e ignore o `bun.lock`.

## Comandos

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera o site estático em .output/public
```

## Publicação (cPanel, hospedagem estática)

- O build faz o prerender de `/`, `/termos` e `/privacidade`. O que vai pro ar é **todo o conteúdo de `.output/public`**, incluindo o `.htaccess`.
- O ZIP pro cPanel precisa incluir arquivos ocultos. No Windows, o `Compress-Archive` deixa o `.htaccess` de fora, então use Python `zipfile` ou 7-Zip.
- Não existe backend. Não use rotas de servidor nem recursos que dependam de Node em produção.

## Prévia ao vivo (artefato no claude.ai)

- Link: https://claude.ai/artifact/78KZaPRKkdr6o6WrTgTjy9. É o site de verdade, com animações e cliques.
- Pra atualizar: rode `npm run build` e depois `python scripts/preparar-artefato.py <pasta>`, e publique a pasta como artefato no mesmo link.
- No artefato, o mapa do Google não aparece, porque o claude.ai bloqueia iframes de outros sites. No site de verdade ele funciona.

## Regras

- Não use Lovable. O projeto nasceu lá, mas agora é mantido só localmente, então não sugira prompts nem sincronização com o Lovable.
- Fotos e imagens vão em WebP otimizado, com largura máxima de cerca de 1920px pros banners e 1040px pras fotos do ambiente.
- Todo link externo abre em janela nova, com `target="_blank" rel="noopener noreferrer"`.
- Respeite `prefers-reduced-motion` em qualquer animação nova.
- Depois de cada mudança, rode `npm run build` e confira se termina com "Prerendered 3 pages".
