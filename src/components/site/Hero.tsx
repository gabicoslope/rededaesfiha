import { motion, useReducedMotion } from "motion/react";
import heroMesa from "@/assets/hero-mesa.webp";
import { ORDER_URL } from "./data";

// Topo: foto da mesa vermelha com a comida nas bordas (arte enviada pela Gabi em 02/11,
// 1672x941). O centro da arte é liso, então o texto fica legível sem sombra.
export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number, y = 20) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#8e1a0e]">
      <motion.img
        src={heroMesa}
        alt="Mesa de madeira vermelha com esfihas, pizza, hambúrguer, pastéis, esfihas doces e refrigerante"
        width={1672}
        height={941}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* curva que separa o topo da seção vermelha de baixo */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] z-10 h-8 w-full md:h-14"
      >
        <path d="M0 60 L0 30 Q720 -20 1440 30 L1440 60 Z" fill="var(--color-burgundy)" />
      </svg>

      <div className="container-page relative flex min-h-[34rem] flex-col items-center justify-center py-24 text-center md:min-h-[min(44rem,84vh)]">
        <motion.h1 className="heading-display !text-[3.6rem] text-brand-white md:!text-[7rem]" {...enter(0.2, 24)}>
          Rede da Esfiha
        </motion.h1>
        <motion.p
          className="mt-3 max-w-[22rem] text-balance text-lg leading-snug text-brand-white md:mt-4 md:max-w-xl md:text-2xl"
          {...enter(0.32)}
        >
          Esfihas, pizzas, lanches e pastéis no delivery ou no nosso salão na Vila Moraes.
        </motion.p>
        <motion.div className="mt-7 md:mt-9" {...enter(0.44, 16)}>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-gold px-10 text-espresso hover:bg-gold-contrast"
          >
            Peça já
          </a>
        </motion.div>
      </div>
    </section>
  );
}
