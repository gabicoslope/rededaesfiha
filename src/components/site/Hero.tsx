import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import heroGenio from "@/assets/hero-genio-recorte.webp";
import heroGenioMobile from "@/assets/hero-genio-mobile.webp";
import { ORDER_URL } from "./data";

// Pixel transparente: cada tamanho de tela baixa só a sua arte (o <picture> troca pela vazia na outra).
const VAZIO = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// Topo com a arte do gênio (05/11).
// Celular: arte vertical de fundo, com o texto no vermelho liso de cima e o gênio embaixo.
// Tablet: texto em cima e o gênio embaixo. Computador: texto e gênio lado a lado dentro da
// largura do site, com o mesmo respiro vermelho nas duas laterais. A arte do computador é só o
// recorte do gênio com a comida, com as bordas já esfumadas na cor do fundo (#be090a), então
// não aparece o retângulo da imagem. Uma vinheta leve escurece só as pontas da tela.
export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number, y = 20) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  // zoom out lento ao abrir a página: a arte começa aproximada e vai se afastando
  const zoom = {
    initial: reduce ? false : { scale: 1.25 },
    animate: { scale: 1 },
    transition: { duration: 3.2, ease: [0.16, 1, 0.3, 1] as const },
  };
  const alt =
    "O gênio da Rede da Esfiha de braços cruzados atrás de uma tábua com esfihas, pizza, hambúrguer, batata frita, milkshake e refrigerante";

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#7c0203] md:bg-[#be090a]"
    >
      {/* curva que separa o topo do cardápio (bege) logo abaixo */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] z-10 h-8 w-full md:h-14"
      >
        <path d="M0 60 L0 30 Q720 -20 1440 30 L1440 60 Z" fill="var(--color-champagne)" />
      </svg>

      <div className="container-page relative z-[2] flex flex-col items-center justify-start pb-0 pt-[4.5rem] text-center md:pb-24 md:pt-16 lg:grid lg:min-h-[min(48vw,calc(100svh-5rem))] lg:max-w-[min(86rem,88vw)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:justify-normal lg:gap-8 lg:pb-16 lg:pt-10 lg:text-left">
        <div className="relative z-[2] flex flex-col items-center lg:items-start">
          {/* título com a proposta da casa (o nome já está no logo do cabeçalho) */}
          <motion.h1
            className="heading-display max-w-[20ch] text-balance md:max-w-[12ch] lg:max-w-[14ch] !text-[clamp(2.3rem,11vw,2.75rem)] !leading-[1.02] text-brand-white md:!text-[clamp(3rem,6vw,3.75rem)] lg:!text-[clamp(3.25rem,5vw,6.25rem)]"
            {...enter(0.2, 24)}
          >
            Esfihas, pizzas e lanches na Vila Moraes
          </motion.h1>
          <motion.p
            className="mt-3 max-w-[23rem] text-balance text-[clamp(1rem,4.4vw,1.125rem)] leading-snug text-brand-white md:mt-5 md:max-w-[30rem] md:text-xl lg:max-w-[34rem] lg:text-[clamp(1.25rem,1.45vw,1.9rem)]"
            {...enter(0.32)}
          >
            No delivery ou no nosso salão de dois andares, com espaço kids.
          </motion.p>
          <motion.div className="mt-5 flex flex-wrap justify-center gap-3 md:mt-8 lg:justify-start" {...enter(0.44, 16)}>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base bg-gold px-10 text-espresso hover:bg-gold-contrast xl:h-14 xl:px-11 xl:text-lg 2xl:h-16 2xl:px-12 2xl:text-xl"
            >
              Peça já
            </a>
            <a href="#cardapio" className="btn-base border-2 border-brand-white bg-transparent px-8 text-brand-white hover:bg-brand-white hover:text-espresso xl:h-14 xl:px-9 xl:text-lg 2xl:h-16 2xl:px-10 2xl:text-xl">
              Ver cardápio
            </a>
          </motion.div>
          <motion.a
            href="#avaliacoes"
            className="mt-6 hidden items-center gap-2 text-base font-semibold text-brand-white underline-offset-4 hover:underline md:inline-flex xl:text-lg 2xl:text-xl"
            {...enter(0.56, 12)}
          >
            <Star className="size-5 fill-gold text-gold" aria-hidden="true" />
            4,0 no Google · 895 avaliações
          </motion.a>
        </div>

        {/* computador: gênio com a comida ao lado do texto, um pouco além da margem direita */}
        <div className="relative hidden md:mt-10 md:block md:w-[88%] md:max-w-[40rem] lg:mt-0 lg:-ml-[7vw] lg:-mr-[7vw] lg:w-auto lg:max-w-none">
          <picture>
            <source media="(max-width: 767px)" srcSet={VAZIO} />
            <motion.img
              src={heroGenio}
              alt={alt}
              width={1300}
              height={1116}
              fetchPriority="high"
              className="block h-auto w-full lg:max-h-[calc(100svh-8rem)] lg:object-contain"
              {...zoom}
            />
          </picture>
        </div>
      </div>

      {/* celular: arte vertical logo abaixo do texto. O turbante fica a ~103vw do topo da arte,
          então ela sobe por baixo do texto até o gênio ficar 1,5rem abaixo dos botões. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={VAZIO} />
        <motion.img
          src={heroGenioMobile}
          alt={alt}
          width={900}
          height={1794}
          fetchPriority="high"
          className="relative z-0 -mt-[calc(103vw-1.5rem)] mb-14 block h-auto w-full md:hidden"
          {...zoom}
        />
      </picture>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(70_0_0/0.35)_100%)] md:block"
      />
    </section>
  );
}
