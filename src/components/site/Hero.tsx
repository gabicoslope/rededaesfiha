import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroMesa from "@/assets/hero-mesa.webp";
import { ORDER_URL } from "./data";

// Primeiro slide do carrossel do topo (estilo BK): foto da mesa vermelha com a comida
// nas bordas (arte enviada pela Gabi em 02/11). O centro da arte é liso, então o texto
// fica legível sem sombra. No celular o slide é 16:9, por isso só título e botão.
export function HeroSlide({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const enter = (delay: number, y = 20) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: active || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.7, delay: active ? delay : 0, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#8e1a0e]">
      <motion.img
        src={heroMesa}
        alt="Mesa de madeira vermelha com esfihas, pizza, hambúrguer, pastéis, esfihas doces e refrigerante"
        width={1672}
        height={941}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: active ? 1 : 1.08 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1 className="heading-display !text-[2.6rem] text-brand-white sm:!text-[3.6rem] md:!text-[6.5rem]" {...enter(0.15, 24)}>
          Rede da Esfiha
        </motion.h1>
        <motion.p
          className="mt-4 hidden max-w-xl text-balance text-xl leading-snug text-brand-white md:block lg:text-2xl"
          {...enter(0.28)}
        >
          Esfihas, pizzas, lanches e pastéis no delivery ou no nosso salão na Vila Moraes.
        </motion.p>
        <motion.div className="mt-3 md:mt-8" {...enter(0.4, 16)}>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? 0 : -1}
            className="btn-base btn-sm bg-gold text-espresso hover:bg-gold-contrast md:!h-[3.25rem] md:!px-10 md:!text-[0.8125rem]"
          >
            Peça já
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
