import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ORDER_URL, categories } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// Cardápio: foto em pé com o nome por cima, numa faixa escura em degradê.
// Os cards entram em cascata (um depois do outro) e, no hover, a foto aproxima
// e aparece uma setinha amarela no canto.
export function MenuSection() {
  const reduce = useReducedMotion();

  return (
    <section id="cardapio" className="bg-champagne section-y">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-display text-center text-burgundy">
            <Palavras>Conheça nosso cardápio</Palavras>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 gap-2.5 md:mt-14 md:grid-cols-4 md:gap-5">
          {categories.map((c, i) => (
            <motion.a
              key={c.name}
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.name}: ver no cardápio`}
              className="focus-gold group relative block aspect-[3/4] overflow-hidden rounded-xl bg-espresso shadow-[0_12px_28px_-18px_rgb(0_0_0/0.6)] transition-shadow duration-300 hover:shadow-[0_22px_40px_-18px_rgb(0_0_0/0.65)] md:aspect-[4/5] md:rounded-2xl"
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : (i % 4) * 0.07 }}
            >
              <img
                src={c.src}
                alt={c.alt}
                width={400}
                height={500}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/90"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 grid size-7 scale-75 place-items-center rounded-full bg-gold text-espresso opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 md:right-3 md:top-3 md:size-9"
              >
                <ArrowUpRight className="size-4 md:size-5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-2.5 text-left md:p-4">
                <span className="block font-display text-[15px] font-bold leading-[1.05] text-brand-white md:text-2xl">
                  {c.name}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-0.5 w-6 rounded-full bg-gold transition-[width] duration-300 group-hover:w-12 md:mt-2 md:h-1 md:w-8 md:group-hover:w-16"
                />
              </span>
            </motion.a>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center md:mt-14">
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base bg-burgundy px-10 text-brand-white hover:bg-brand-red-deep">
            Ver cardápio completo
          </a>
        </Reveal>
      </div>
    </section>
  );
}
