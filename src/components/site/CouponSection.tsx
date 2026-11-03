import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Copy, Check, MapPin, ShoppingBag, Store } from "lucide-react";
import esfihas from "@/assets/hero/esfihas.webp";
import esfihaDoce from "@/assets/hero/esfiha-doce.webp";
import { COUPON, ORDER_URL } from "./data";

// Cupom em faixa de ponta a ponta (referência de voucher enviada pela Gabi em 02/11):
// lado vermelho com a comida e o título, painel branco com o desconto e o código.
// Visual chapado: sem sombra, sem rotação, sem carimbo.
export function CouponSection() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const enter = (delay: number, from: { x?: number; y?: number }) => ({
    initial: reduce ? false : { opacity: 0, ...from },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: false, amount: 0.4 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="cupom" className="grid overflow-hidden bg-burgundy md:grid-cols-[1fr_minmax(22rem,34%)]">
      {/* lado vermelho */}
      <div className="relative flex flex-col items-center gap-8 px-6 py-12 text-brand-white md:flex-row md:gap-12 md:py-16 md:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] md:pr-14">
        <motion.div className="relative h-40 w-56 shrink-0 md:h-56 md:w-72" {...enter(0, { x: -30 })}>
          <img src={esfihas} alt="Tábua com esfihas abertas salgadas" width={640} height={640} loading="lazy" className="absolute left-0 top-0 size-40 rounded-full md:size-56" />
          <img src={esfihaDoce} alt="Esfiha doce de chocolate com cobertura branca" width={640} height={640} loading="lazy" className="absolute bottom-0 right-0 size-28 rounded-full border-4 border-burgundy md:size-36" />
        </motion.div>

        <motion.div className="text-center md:text-left" {...enter(0.1, { y: 16 })}>
          <h2 className="font-display text-4xl font-bold leading-[0.95] md:text-6xl">
            Cupom do site
            <span className="mt-1 block text-2xl font-bold text-gold md:text-3xl">pra pedir pelo Anota Aí</span>
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-brand-white/90 md:justify-start">
            <li className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />Só na Vila Moraes</li>
            <li className="inline-flex items-center gap-1.5"><Store className="size-4" aria-hidden="true" />No Anota Aí</li>
            <li className="inline-flex items-center gap-1.5"><ShoppingBag className="size-4" aria-hidden="true" />Pedido mínimo R$ 50</li>
          </ul>
        </motion.div>
      </div>

      {/* painel branco com o desconto; o bico aponta pro lado vermelho */}
      <div className="relative bg-brand-white px-6 pb-10 pt-12 text-center md:flex md:flex-col md:justify-center md:px-12 md:py-16">
        <span
          aria-hidden="true"
          className="absolute -top-4 left-1/2 size-8 -translate-x-1/2 rotate-45 bg-brand-white md:-left-4 md:top-14 md:translate-x-0"
        />
        <motion.div {...enter(0.15, { x: 30 })}>
          <p className="font-display text-2xl font-bold text-burgundy md:text-3xl">Desconto de</p>
          <p className="font-display text-[6.5rem] font-bold leading-[0.85] text-burgundy md:text-[8rem]">25%</p>

          <div className="mx-auto mt-6 flex max-w-xs flex-col gap-2.5">
            <button
              type="button"
              onClick={copy}
              aria-label={`Copiar o código ${COUPON}`}
              className="flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-burgundy text-lg font-extrabold tracking-[0.18em] text-espresso transition-colors hover:bg-burgundy/5"
            >
              {COUPON}
            </button>
            <button type="button" onClick={copy} className="btn-base h-12 bg-burgundy text-brand-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  className="inline-flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? "Código copiado" : "Copiar código"}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base h-12 bg-gold text-espresso">
              Usar e pedir agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
