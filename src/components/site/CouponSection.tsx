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
      <div className="relative flex items-center gap-4 overflow-hidden px-5 py-7 text-brand-white md:gap-0 md:py-20 md:pl-[26rem] md:pr-12 lg:pl-[32rem]">
        <motion.img
          src={esfihas}
          alt="Tábua com esfihas abertas salgadas"
          width={640}
          height={640}
          loading="lazy"
          className="w-28 shrink-0 rounded-full md:absolute md:-left-28 md:top-1/2 md:w-[32rem] md:-translate-y-1/2 md:translate-x-0 lg:-left-20 lg:w-[36rem]"
          {...enter(0, { x: -40 })}
        />
        <motion.div className="relative min-w-0 flex-1 text-left" {...enter(0.1, { y: 20 })}>
          <p className="font-display text-lg font-bold text-gold md:text-3xl">Exclusivo do site</p>
          <h2 className="font-display text-[2.1rem] font-bold leading-[0.95] md:mt-1 md:text-7xl md:leading-[0.9] lg:text-8xl">
            Cupom de desconto
          </h2>
          <ul className="mt-3 flex flex-col gap-1 text-[13px] font-semibold text-brand-white md:mt-7 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-2 md:text-base">
            <li className="inline-flex items-center gap-2"><MapPin className="size-5 text-gold" aria-hidden="true" />Só na Vila Moraes</li>
            <li className="inline-flex items-center gap-2"><Store className="size-5 text-gold" aria-hidden="true" />Pedindo pelo Anota Aí</li>
            <li className="inline-flex items-center gap-2"><ShoppingBag className="size-5 text-gold" aria-hidden="true" />Pedido mínimo R$ 50</li>
          </ul>
        </motion.div>
      </div>

      {/* painel branco com o desconto; o bico aponta pro lado vermelho */}
      <div className="relative flex flex-col justify-center bg-brand-white px-5 pb-7 pt-8 text-center md:px-12 md:py-16">
        <span
          aria-hidden="true"
          className="absolute -top-4 left-[3.25rem] size-8 rotate-45 md:size-10 bg-brand-white md:-left-5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
        />
        <motion.div {...enter(0.2, { x: 40 })}>
          <div className="flex items-end justify-center gap-3 md:block">
            <p className="font-display text-[5rem] font-bold leading-[0.8] text-burgundy md:text-[10rem]">
              25<span className="text-[0.6em]">%</span>
            </p>
            <p className="pb-1 text-left font-display text-2xl font-bold leading-none text-espresso md:mt-2 md:pb-0 md:text-center md:text-3xl">
              de <br className="md:hidden" />desconto
            </p>
          </div>

          <div className="mx-auto mt-5 grid max-w-sm grid-cols-[1fr_auto] gap-2.5 md:mt-8 md:grid-cols-1 md:gap-3">
            <button
              type="button"
              onClick={copy}
              aria-label={`Copiar o código ${COUPON}`}
              className="flex h-12 min-w-0 items-center justify-center rounded-lg border-2 border-dashed border-burgundy text-lg font-extrabold tracking-[0.08em] md:h-16 md:text-2xl md:tracking-[0.12em] text-espresso transition-colors hover:bg-burgundy/5"
            >
              {COUPON}
            </button>
            <button type="button" onClick={copy} className="btn-base h-12 bg-burgundy px-4 text-brand-white md:h-14 md:px-8">
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
                  <span className="md:hidden">{copied ? "Copiado" : "Copiar"}</span>
                  <span className="hidden md:inline">{copied ? "Código copiado" : "Copiar código"}</span>
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base col-span-2 h-12 bg-gold text-espresso md:col-span-1 md:h-14">
              Usar e pedir agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
