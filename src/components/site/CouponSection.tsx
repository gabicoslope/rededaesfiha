import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { COUPON, ORDER_URL } from "./data";
import { Reveal } from "./Reveal";

export function CouponSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="cupom" className="bg-espresso section-y">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-display mx-auto max-w-2xl text-center text-champagne">
            Cupom exclusivo para Vila Moraes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <motion.div
            className="rounded-2xl bg-champagne p-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)] md:p-8"
            animate={copied ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
              <input
                readOnly
                value={COUPON}
                aria-label="Código do cupom"
                className="btn-base w-full cursor-pointer rounded-xl border-2 border-dashed border-burgundy bg-brand-white/60 text-center text-base tracking-[0.18em] text-espresso shadow-none hover:translate-y-0 hover:shadow-none"
                onClick={copy}
              />
              <button
                type="button"
                onClick={copy}
                className="btn-base w-full gap-2 rounded-xl bg-burgundy text-brand-white hover:bg-brand-red-deep"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    className="inline-flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? "Cupom copiado" : "Copiar cupom"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-espresso/80">
              25% de desconto em pedidos a partir de R$ 50, só pelo Anota Aí.
            </p>
          </motion.div>

          <div className="mt-8 flex justify-center">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base bg-burgundy px-8 text-brand-white hover:bg-brand-red-deep"
            >
              Usar cupom e pedir agora
              <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
