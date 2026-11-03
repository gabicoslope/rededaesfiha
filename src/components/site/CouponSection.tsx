import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Copy, Check } from "lucide-react";
import pizza from "@/assets/hero/pizza.webp";
import { COUPON, ORDER_URL } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// Cupom em formato de voucher (referência enviada pela Gabi em 02/11): ticket vermelho
// com a pizza saindo pela lateral, linha picotada e canhoto com as regras.
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

  const furo = "absolute size-7 rounded-full bg-[var(--cupom-bg)]";

  return (
    <section id="cupom" className="overflow-hidden bg-espresso section-y [--cupom-bg:var(--color-espresso)]">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-display mx-auto max-w-2xl text-center text-champagne">
            <Palavras>Cupom exclusivo para Vila Moraes</Palavras>
          </h2>
        </Reveal>

        <motion.div
          className="relative mx-auto mt-10 max-w-4xl md:mt-14"
          initial={reduce ? false : { opacity: 0, y: 30, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-burgundy text-brand-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] md:flex-row">
            {/* parte principal */}
            <div className="relative flex-1 overflow-hidden">
              <motion.img
                src={pizza}
                alt=""
                aria-hidden="true"
                width={640}
                height={640}
                loading="lazy"
                className="pointer-events-none absolute -right-24 -top-24 w-56 rounded-full shadow-[0_20px_40px_-12px_rgb(0_0_0/0.6)] md:-left-28 md:right-auto md:top-1/2 md:w-[22rem] md:-translate-y-1/2"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative px-6 pb-7 pt-8 md:ml-[13rem] md:px-10 md:py-10">
                <p className="font-display text-xl text-gold md:text-2xl">Cupom do site</p>
                <p className="mt-1 font-display text-[4.2rem] font-bold leading-[0.9] md:text-[6rem]">
                  25<span className="align-top text-[0.55em]">%</span> <span className="text-gold">OFF</span>
                </p>
                <p className="mt-3 max-w-sm text-sm text-brand-white/90 md:text-base">
                  Em todo o pedido pelo Anota Aí, a partir de R$ 50.
                </p>

                <div className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={copy}
                    aria-label={`Copiar o código ${COUPON}`}
                    className="flex h-12 w-full shrink-0 items-center justify-center rounded-lg border-2 border-dashed sm:w-auto sm:flex-1 border-gold/80 bg-brand-red-deep/50 font-bold tracking-[0.2em] text-brand-white transition-colors hover:bg-brand-red-deep"
                  >
                    {COUPON}
                  </button>
                  <button
                    type="button"
                    onClick={copy}
                    className="btn-base h-12 gap-2 bg-gold px-6 text-espresso hover:bg-gold-contrast"
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
              </div>
            </div>

            {/* canhoto */}
            <div className="relative flex items-center justify-center border-t-2 border-dashed border-brand-white/40 bg-brand-red-deep px-6 py-5 md:w-36 md:border-l-2 md:border-t-0 md:px-0 md:py-0">
              <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-white md:-rotate-90 md:whitespace-nowrap md:text-sm">
                Válido no Anota Aí
                <span className="mt-1 block font-semibold tracking-[0.12em] text-gold md:mt-1.5">Pedido mínimo R$ 50</span>
              </p>
            </div>
          </div>

          {/* furos do picote: em cima/embaixo no computador, nas laterais no celular */}
          <span aria-hidden="true" className={`${furo} -left-3.5 bottom-[3.6rem] md:bottom-auto md:left-auto md:right-[8.125rem] md:-top-3.5`} />
          <span aria-hidden="true" className={`${furo} -right-3.5 bottom-[3.6rem] md:-bottom-3.5 md:right-[8.125rem]`} />

          {/* selo de "copiado" */}
          <AnimatePresence>
            {copied && (
              <motion.span
                className="pointer-events-none absolute right-8 top-6 rotate-[-12deg] rounded-md border-[3px] border-gold px-3 py-1 font-display text-2xl font-bold uppercase text-gold md:right-48 md:top-8"
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

        <div className="mt-10 flex justify-center">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-gold px-8 text-espresso hover:bg-gold-contrast"
          >
            Usar cupom e pedir agora
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
