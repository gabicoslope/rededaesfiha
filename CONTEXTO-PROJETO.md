# Rede da Esfiha Vila Moraes: contexto do projeto (atualizado em 02/11/2026)

Este documento resume tudo o que já foi feito no site e o que ainda falta, pra continuar o trabalho de onde parou. As regras fixas (produto, stack e estrutura) estão em `.kiro/steering/`.

## Onde estamos

O site está pronto pra publicar. Antes, faltam alguns dados do cliente e dois ajustes nas artes (veja "Pendências"). O último build foi entregue como ZIP pro cPanel em 02/11, mas a Gabi ainda não subiu pro ar.

## O que já foi feito

**Base**
- O projeto foi copiado do Lovable em 23/10 e desde então é mantido só localmente. O Lovable não é mais usado.
- O logo virou um PNG de verdade (`src/assets/logo-rede-da-esfiha.png`). O do Lovable apontava pra um caminho interno que só existia lá.

**Ajustes pedidos pelo Daniel em 22/10, todos concluídos**
- **Paleta:** segue o logo 3D novo (vermelho, amarelo, preto e branco).
- **Fonte:** os títulos passaram pra Sansita Swashed 800, a mais parecida com o logo. As fontes que o Daniel sugeriu (Elephant e Matura MT) não têm licença pra uso na web.
- **Logo:** o novo, com fundo transparente, está no header, no footer, no favicon e na imagem de compartilhamento.
- **Carrossel:** tem 6 banners e fica logo abaixo do cardápio (ver "Banners").
- **Fotos do ambiente:** fachada, piso térreo e piso superior.

**Topo (hero)**
- A arte foi gerada por IA, com uma versão pra computador e outra pra celular: o mascote com esfihas, pizza, lanche e milkshake.
- O texto ficou enxuto: "Delivery e salão na Vila Moraes", o título "Rede da Esfiha", a frase "Variedade, qualidade e um preço justo.", os botões "Pedir agora" e "Ver cardápio" e três informações curtas (avaliação no Google, entrega em até 45 min e aberto todos os dias).

**Nosso ambiente (27/10)**
- Abas Fachada, Piso térreo e Piso superior.
- Todas as fotos têm o mesmo tamanho (4:3) e uma legenda curta.
- Animações: o destaque da aba desliza, as fotos entram em sequência e crescem de leve com o mouse em cima.
- Ao clicar, a foto abre ampliada, com setas na tela e no teclado.
- No celular, a galeria é arrastável pro lado.
- O texto "Quem somos" foi removido porque era inventado. Ele volta quando houver um texto real da loja.

**Menos cara de IA (27/10)**
- Os títulos saíram do Title Case e "Rede Da Esfiha" foi corrigido pra "Rede da Esfiha" em todo o site.

**Banners (02/11)**
- As artes do Daniel entraram em `src/assets/banners/`, na ordem e com os links que ele definiu. Todos abrem em janela nova:

| # | id | Banner | Destino |
|---|----|--------|---------|
| 1 | cupom | Cupom CUPOMSITE25, 25%, pedido mínimo de R$ 50 | Anota Aí |
| 2 | pedido | Faça seu pedido | Anota Aí |
| 3 | festas | Aniversário e confraternização | WhatsApp de eventos (ainda não definido; por enquanto vai pro WhatsApp da unidade com uma mensagem pronta) |
| 4 | cashback | Peça pelo WhatsApp e ganhe cashback | WhatsApp da unidade |
| 5 | dez-pedidos | 10 pedidos no mês e benefícios exclusivos | WhatsApp da unidade |
| 6 | instagram | Acompanhe as promoções no Instagram | Instagram da unidade |

- No computador, o carrossel fica centralizado, em 12:5, com cantos arredondados e setas por fora. No celular, ocupa a largura toda em 16:9. As bolinhas ficam abaixo da arte.
- A troca é automática a cada 6 segundos e pausa com o mouse em cima, o foco, o toque, a aba escondida ou o reduced-motion ligado.

**Layout novo (02/11, modelo da Gabi)**
- A home foi refeita seguindo o modelo que a Gabi desenhou. A fonte dos títulos é a Sansita.
- O topo tem pratos do cardápio recortados em círculo sobre uma mesa vermelha, com "Rede da Esfiha" e o botão "Peça já".
- A seção "Faça seu pedido agora mesmo" mostra um celular com a loja do Anota Aí (print de 02/11).
- O cardápio mostra só os nomes, sem preço. Os banners ocupam a largura toda.
- Cupom e avaliações ficam em fundo escuro.
- "Nosso ambiente" virou 4 cards em pé: fachada, térreo, superior e espaço kids. Cada card abre as fotos.
- "Onde estamos" mostra só endereço e horário. O footer é vermelho, com o logo.
- O FAQ e a área de entrega saíram da página porque não estão no modelo.

**Refinos (02/11, à noite)**
- Rodapé completo: faixa "Bateu a fome?" com botões de pedido e WhatsApp, colunas de navegação, contato, horário e formas de pagamento, e uma barra com os links legais.
- Botões: brilho no hover, seta que anda, efeito ao clicar e foco visível. O header ganhou o botão vermelho "Faça seu pedido".
- Animações: pratos do topo flutuando, curva entre o topo e a seção do celular, celular flutuando e cards do cardápio subindo no hover.
- "Nosso ambiente" virou um carrossel de 10 fotos (embla) com filtros (Todos, Fachada, Piso térreo, Piso superior, Espaço kids), setas, barra de progresso, arrastar e foto ampliada.
- Avaliações voltaram ao desenho anterior (nota do Google e cards brancos), em fundo escuro, passando sozinhas a cada 7 segundos.

## Pendências

**Depende do cliente**
1. **CUPOMSITE25 no Anota Aí:** hoje só existe o cupom DESCONTO25 (25% nos produtos, mínimo de R$ 50). O Daniel pediu pra outra agência criar o CUPOMSITE25. **Só publique o site depois que ele existir**, senão o cupom do site dá erro.
2. **WhatsApp de eventos:** o João vai definir. Quando chegar o número, troque `EVENTS_WHATSAPP_URL` em `src/components/site/data.ts`.
3. **Banner de aniversário, versão de computador:** o logo está escrito "Esfina", a fachada diz "AELIVERY" e os telefones estão errados. Os corretos são (11) 96442-7506 e (11) 5073-7481. O Daniel precisa corrigir.
4. **Banners de aniversário e de cashback, versão de computador:** vieram mais largos (2000x689 e 2000x667) que os outros (1942x809). Pra não cortar o texto, foram preenchidos em cima e embaixo com fundo desfocado. O ideal é receber os dois em 1942x809 e trocar.
5. **Horário:** a loja no Anota Aí mostra "Aberto até 23h59", e o site diz loja das 08h às 04h e delivery das 18h às 02h. Confirmar com a loja qual está certo.
6. **Quem somos:** só volta com um texto real da loja.
7. **IDs do Google Analytics 4 e do Meta Pixel:** ainda são placeholders em `src/components/site/Tracking.tsx` (`G-XXXXXXXXXX` e `000000000000000`).
8. **Links por categoria do cardápio:** hoje todas as categorias vão pra loja do Anota Aí. Se o cliente mandar links por categoria, dá pra apontar cada uma.

**Sugestões de melhoria (opcionais)**
- **Fundo das avaliações:** topo, banner, avaliações e ambiente são todos vermelhos em sequência. Um fundo claro nas avaliações deixaria a página mais leve.
- **Fotos do térreo:** a da vitrine tem uma lixeira em primeiro plano e um cartaz de "Feliz dia das crianças" já vencido. A das geladeiras tem um pano em cima da panela. Vale tirar essas fotos de novo.
- **Arquivos sem uso:** `OpenStatus.tsx`, `assets/fachada-*.jpeg` e `assets/logo-round-badge.png` podem ser apagados.

## Como publicar

1. Rode `npm install` (só na primeira vez) e depois `npm run build`.
2. Compacte todo o conteúdo de `.output/public`, com o `.htaccess` e a pasta `assets`, num ZIP.
3. No cPanel, envie o ZIP pra pasta do subdomínio `site.rededaesfiha.com.br` e extraia lá, substituindo os arquivos antigos.
