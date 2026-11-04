import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import heroMesa from "@/assets/hero-genio.webp";
import heroMesaMobile from "@/assets/hero-genio-mobile.webp";
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
    <section id="inicio" className="relative overflow-hidden bg-[#d10f10] md:bg-[#a70608]">
      {/* arte do gênio com a comida (05/11): no computador ele fica à direita e o texto à esquerda;
          no celular, versão vertical com o gênio embaixo e o texto no vermelho liso de cima */}
      <picture>
        <source media="(min-width: 768px)" srcSet={heroMesa} />
        <motion.img
          src={heroMesaMobile}
          alt="O gênio da Rede da Esfiha de braços cruzados atrás de uma tábua com esfihas, pizza, hambúrguer, batata frita, milkshake e refrigerante"
          width={900}
          height={1613}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-top md:left-auto md:right-0 md:w-auto md:max-w-none md:object-contain md:[mask-image:linear-gradient(to_right,transparent,black_18%)]"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </picture>

      {/* curva que separa o topo do cardápio (bege) logo abaixo */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] z-10 h-8 w-full md:h-14"
      >
        <path d="M0 60 L0 30 Q720 -20 1440 30 L1440 60 Z" fill="var(--color-champagne)" />
      </svg>

      <div className="container-page relative flex min-h-[195vw] flex-col items-center justify-start pb-24 pt-10 text-center md:min-h-[min(44rem,84vh)] md:items-start md:justify-center md:py-24 md:text-left">
        {/* título com a proposta da casa (o nome já está no logo do cabeçalho) */}
        <motion.h1
          className="heading-display max-w-[20ch] text-balance md:max-w-[13ch] !text-[2.75rem] !leading-[1.02] text-brand-white md:!text-[5.25rem]"
          {...enter(0.2, 24)}
        >
          Esfihas, pizzas e lanches na Vila Moraes
        </motion.h1>
        <motion.p
          className="mt-4 max-w-[23rem] text-balance text-lg leading-snug text-brand-white md:mt-5 md:max-w-xl md:text-2xl"
          {...enter(0.32)}
        >
          No delivery ou no nosso salão de dois andares, com espaço kids.
        </motion.p>
        <motion.div className="mt-7 flex flex-wrap justify-center gap-3 md:mt-9 md:justify-start" {...enter(0.44, 16)}>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-gold px-10 text-espresso hover:bg-gold-contrast"
          >
            Peça já
          </a>
          <a href="#cardapio" className="btn-base border-2 border-brand-white bg-transparent px-8 text-brand-white hover:bg-brand-white hover:text-espresso">
            Ver cardápio
          </a>
        </motion.div>
        <motion.a
          href="#avaliacoes"
          className="mt-6 hidden items-center gap-2 text-base font-semibold md:inline-flex text-brand-white underline-offset-4 hover:underline"
          {...enter(0.56, 12)}
        >
          <Star className="size-5 fill-gold text-gold" aria-hidden="true" />
          4,0 no Google · 895 avaliações
        </motion.a>
      </div>
    </section>
  );
}
