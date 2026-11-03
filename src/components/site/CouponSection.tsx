import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Copy, Check } from "lucide-react";
import pizza from "@/assets/hero/pizza.webp";
import { COUPON, ORDER_URL } from "./data";
import { Palavras } from "./Palavras";

// A seção inteira é o voucher (referência enviada pela Gabi em 02/11): ticket vermelho
// grande com a pizza saindo pela lateral, linha picotada e canhoto com as regras.
// Os "furos" do picote usam a cor de fundo da seção (--cupom-bg).
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

  const furo = "absolute z-10 size-8 rounded-full bg-[var(--cupom-bg)]";

  return (
    <section id="cupom" className="overflow-hidden bg-espresso py-12 md:py-20 [--cupom-bg:var(--color-espresso)]">
      <div className="container-page">
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-burgundy text-brand-white shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] md:min-h-[32rem] md:flex-row">
            {/* parte principal */}
            <div className="relative flex flex-1 items-center overflow-hidden">
              <motion.img
                src={pizza}
                alt=""
                aria-hidden="true"
                width={640}
                height={640}
                loading="lazy"
                className="pointer-events-none absolute -right-28 -top-28 w-64 rounded-full shadow-[0_24px_50px_-12px_rgb(0_0_0/0.6)] sm:w-80 md:-left-40 md:right-auto md:top-1/2 md:w-[34rem] md:-translate-y-1/2"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative w-full px-6 pb-9 pt-10 sm:px-10 md:ml-[19rem] md:px-12 md:py-14 lg:ml-[22rem]">
                <h2 className="max-w-[14rem] font-display text-2xl leading-tight text-gold sm:max-w-none md:text-3xl">
                  <Palavras>Cupom exclusivo para Vila Moraes</Palavras>
                </h2>
                <p className="mt-2 font-display text-[5.5rem] font-bold leading-[0.85] md:text-[8.5rem]">
                  25<span className="align-top text-[0.5em]">%</span>{" "}
                  <span className="text-gold">OFF</span>
                </p>
                <p className="mt-4 max-w-md text-base text-brand-white/90 md:text-lg">
                  No seu pedido pelo Anota Aí, a partir de R$ 50. É só copiar o código e colar na hora de finalizar.
                </p>

                <div className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={copy}
                    aria-label={`Copiar o código ${COUPON}`}
                    className="flex h-14 w-full shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gold bg-brand-red-deep/50 text-lg font-extrabold tracking-[0.22em] text-brand-white transition-colors hover:bg-brand-red-deep sm:w-auto sm:flex-1"
                  >
                    {COUPON}
                  </button>
                  <button
                    type="button"
                    onClick={copy}
                    className="btn-base h-14 gap-2 bg-gold px-7 text-espresso hover:bg-gold-contrast"
                  >
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
                        {copied ? "Copiado" : "Copiar cupom"}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>

                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base mt-4 h-14 w-full max-w-xl bg-brand-white text-burgundy hover:bg-champagne"
                >
                  Usar cupom e pedir agora
                </a>
              </div>
            </div>

            {/* canhoto */}
            <div className="relative flex h-24 items-center justify-center border-t-2 border-dashed border-brand-white/40 bg-brand-red-deep px-6 md:h-auto md:w-40 md:border-l-2 md:border-t-0 md:px-0">
              <p className="text-center text-sm font-extrabold uppercase tracking-[0.2em] text-brand-white md:-rotate-90 md:whitespace-nowrap md:text-base">
                Válido no Anota Aí
                <span className="mt-1 block text-xs font-bold tracking-[0.14em] text-gold md:mt-2 md:text-sm">Pedido mínimo R$ 50</span>
              </p>
            </div>
          </div>

          {/* furos do picote: em cima/embaixo no computador, nas laterais no celular */}
          <span aria-hidden="true" className={`${furo} -left-4 bottom-[5rem] md:bottom-auto md:left-auto md:right-[9rem] md:-top-4`} />
          <span aria-hidden="true" className={`${furo} -right-4 bottom-[5rem] md:-bottom-4 md:right-[9rem]`} />

          {/* carimbo de "copiado" */}
          <AnimatePresence>
            {copied && (
              <motion.span
                className="pointer-events-none absolute right-6 top-8 z-10 rotate-[-12deg] rounded-md border-4 border-gold px-4 py-1 font-display text-3xl font-bold uppercase text-gold md:right-60 md:top-12"
                initial={{ opacity: 0, scale: 1.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                Copiado!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
