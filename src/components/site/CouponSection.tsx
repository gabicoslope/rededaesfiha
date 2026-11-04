import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Copy, Check, MapPin, ShoppingBag, Store } from "lucide-react";
import esfihas from "@/assets/hero/esfihas.webp";
import logoUrl from "@/assets/logo-rede-da-esfiha.webp";
import { COUPON, ORDER_URL } from "./data";

// Cupom em faixa de ponta a ponta (referência de voucher enviada pela Gabi em 02/11):
// lado vermelho com uma foto grande das esfihas saindo pela borda e o título; painel
// branco com o desconto enorme, o código e os botões. Visual chapado, sem efeitos.
export function CouponSection() {
  const [copied, setCopied] = useState(false);
  const [pulos, setPulos] = useState(0);
  const reduce = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      setPulos((n) => n + 1);
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
    <section id="cupom" className="grid overflow-hidden bg-burgundy lg:min-h-[36rem] lg:grid-cols-[1fr_minmax(24rem,36%)]">
      {/* lado vermelho */}
      <div className="relative flex flex-col items-center gap-4 overflow-hidden px-5 pb-8 pt-7 text-center text-brand-white lg:flex-row lg:gap-0 lg:text-left lg:py-20 lg:pl-[20rem] lg:pr-12 xl:pl-[32rem]">
        <motion.img
          src={esfihas}
          alt="Tábua com esfihas abertas salgadas"
          width={640}
          height={640}
          loading="lazy"
          className="w-36 shrink-0 rounded-full lg:absolute lg:-left-24 lg:top-1/2 lg:w-[26rem] lg:-translate-y-1/2 lg:translate-x-0 xl:-left-20 xl:w-[36rem]"
          {...enter(0, { x: -40 })}
        />
        <motion.div className="relative min-w-0 lg:flex-1" {...enter(0.1, { y: 20 })}>
          <p className="inline-block bg-gold px-3 py-1 font-display text-base font-bold text-espresso lg:text-2xl">Exclusivo do site</p>
          <h2 className="font-display text-[2.25rem] font-bold leading-none mt-2 lg:mt-3 lg:text-6xl lg:leading-[0.9] xl:text-7xl 2xl:text-8xl">
            Cupom de desconto
          </h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm font-semibold text-brand-white lg:mt-7 lg:justify-start lg:gap-x-6 lg:gap-y-2 lg:text-base">
            <li className="inline-flex items-center gap-2"><MapPin className="size-5 text-brand-white" aria-hidden="true" />Só na Vila Moraes</li>
            <li className="inline-flex items-center gap-2"><Store className="size-5 text-brand-white" aria-hidden="true" />Pedindo pelo Anota Aí</li>
            <li className="inline-flex items-center gap-2"><ShoppingBag className="size-5 text-brand-white" aria-hidden="true" />Pedido mínimo R$ 50</li>
          </ul>
        </motion.div>
      </div>

      {/* painel branco com o desconto; o bico aponta pro lado vermelho */}
      <div className="relative flex flex-col justify-center bg-brand-white px-5 pb-7 pt-8 text-center lg:px-12 lg:py-16">
        <span
          aria-hidden="true"
          className="absolute -top-4 left-1/2 size-8 -translate-x-1/2 rotate-45 lg:size-10 bg-brand-white lg:-left-5 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
        />
        {/* gênio espiando do canto do cupom; dá um pulinho quando o código é copiado */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-12 right-3 z-10 w-20 lg:top-5 lg:right-5 lg:w-24">
          <div className="genio-flutua">
            <img key={pulos} src={logoUrl} alt="" width={420} height={399} loading="lazy" className={(pulos ? "genio-pula " : "") + "w-full drop-shadow-[0_10px_14px_rgb(0_0_0/0.3)]"} />
          </div>
          <AnimatePresence>
            {copied && (
              <motion.span
                className="absolute -left-20 top-2 whitespace-nowrap bg-espresso px-3 py-1.5 text-sm font-bold text-brand-white shadow-lg lg:-left-24 lg:text-sm"
                initial={{ opacity: 0, scale: 0.6, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Copiado! ✨
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.div {...enter(0.2, { x: 40 })}>
          <div className="flex items-baseline justify-center gap-2 lg:block">
            <p className="font-display text-[4rem] font-bold leading-none text-burgundy lg:text-[10rem]">
              25<span className="text-[0.6em]">%</span>
            </p>
            <p className="font-display text-[1.6rem] font-bold leading-none text-espresso lg:mt-2 lg:text-3xl">
              de desconto
            </p>
          </div>

          <div className="mx-auto mt-4 grid max-w-sm grid-cols-[1fr_auto] gap-2.5 lg:mt-8 lg:grid-cols-1 lg:gap-3">
            <button
              type="button"
              onClick={copy}
              aria-label={`Copiar o código ${COUPON}`}
              className="flex h-12 min-w-0 items-center justify-center rounded-lg border-2 border-dashed border-burgundy text-base font-extrabold tracking-[0.08em] lg:h-16 lg:text-2xl lg:tracking-[0.12em] text-espresso transition-colors hover:bg-burgundy/5"
            >
              {COUPON}
            </button>
            <button type="button" onClick={copy} className="btn-base h-12 bg-burgundy px-4 text-brand-white lg:h-14 lg:px-8">
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
                  <span className="lg:hidden">{copied ? "Copiado" : "Copiar"}</span>
                  <span className="hidden lg:inline">{copied ? "Código copiado" : "Copiar código"}</span>
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base col-span-2 h-12 bg-gold text-espresso lg:col-span-1 lg:h-14">
              Usar e pedir agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
