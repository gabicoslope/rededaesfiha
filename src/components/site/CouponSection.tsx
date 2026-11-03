import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Copy, Check, MapPin, ShoppingBag, Store } from "lucide-react";
import esfihas from "@/assets/hero/esfihas.webp";
import { COUPON, ORDER_URL } from "./data";

// Cupom em faixa de ponta a ponta (referência de voucher enviada pela Gabi em 02/11):
// lado vermelho com uma foto grande das esfihas saindo pela borda e o título; painel
// branco com o desconto enorme, o código e os botões. Visual chapado, sem efeitos.
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
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="cupom" className="grid overflow-hidden bg-burgundy md:min-h-[36rem] md:grid-cols-[1fr_minmax(24rem,36%)]">
      {/* lado vermelho */}
      <div className="relative flex items-center overflow-hidden px-6 pb-12 pt-[17rem] text-brand-white md:py-20 md:pl-[26rem] md:pr-12 lg:pl-[32rem]">
        <motion.img
          src={esfihas}
          alt="Tábua com esfihas abertas salgadas"
          width={640}
          height={640}
          loading="lazy"
          className="absolute -top-16 left-1/2 w-80 -translate-x-1/2 rounded-full md:-left-28 md:top-1/2 md:w-[32rem] md:-translate-y-1/2 md:translate-x-0 lg:-left-20 lg:w-[36rem]"
          {...enter(0, { x: -40 })}
        />
        <motion.div className="relative w-full text-center md:text-left" {...enter(0.1, { y: 20 })}>
          <p className="font-display text-2xl font-bold text-gold md:text-3xl">Exclusivo do site</p>
          <h2 className="mt-1 font-display text-6xl font-bold leading-[0.9] md:text-7xl lg:text-8xl">
            Cupom de desconto
          </h2>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-semibold text-brand-white md:justify-start">
            <li className="inline-flex items-center gap-2"><MapPin className="size-5 text-gold" aria-hidden="true" />Só na Vila Moraes</li>
            <li className="inline-flex items-center gap-2"><Store className="size-5 text-gold" aria-hidden="true" />Pedindo pelo Anota Aí</li>
            <li className="inline-flex items-center gap-2"><ShoppingBag className="size-5 text-gold" aria-hidden="true" />Pedido mínimo R$ 50</li>
          </ul>
        </motion.div>
      </div>

      {/* painel branco com o desconto; o bico aponta pro lado vermelho */}
      <div className="relative flex flex-col justify-center bg-brand-white px-6 pb-12 pt-14 text-center md:px-12 md:py-16">
        <span
          aria-hidden="true"
          className="absolute -top-5 left-1/2 size-10 -translate-x-1/2 rotate-45 bg-brand-white md:-left-5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
        />
        <motion.div {...enter(0.2, { x: 40 })}>
          <p className="font-display text-[8rem] font-bold leading-[0.8] text-burgundy md:text-[10rem]">
            25<span className="text-[0.6em]">%</span>
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-espresso">de desconto</p>

          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
            <button
              type="button"
              onClick={copy}
              aria-label={`Copiar o código ${COUPON}`}
              className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-burgundy text-2xl font-extrabold tracking-[0.12em] text-espresso transition-colors hover:bg-burgundy/5"
            >
              {COUPON}
            </button>
            <button type="button" onClick={copy} className="btn-base h-14 bg-burgundy text-brand-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  className="inline-flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                  {copied ? "Código copiado" : "Copiar código"}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base h-14 bg-gold text-espresso">
              Usar e pedir agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
