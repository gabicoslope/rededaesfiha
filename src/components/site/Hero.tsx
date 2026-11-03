import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import esfihas from "@/assets/hero/esfihas.webp";
import pizza from "@/assets/hero/pizza.webp";
import pizzaDoce from "@/assets/hero/pizza-doce.webp";
import burger from "@/assets/hero/burger.webp";
import pastel from "@/assets/hero/pastel.webp";
import { ORDER_URL } from "./data";

// Fotos do cardápio recortadas em círculo (640x640), espalhadas pelas bordas
// da "mesa" vermelha, como no modelo de 02/11.
const PLATES = [
  { src: esfihas, alt: "Tábua com esfihas abertas salgadas", className: "left-[-14%] top-[-10%] w-[52vw] md:left-[-5%] md:top-[-16%] md:w-[30vw]", from: { x: -40, y: -40 } },
  { src: pizza, alt: "Pizza meio calabresa, meio mussarela com tomate", className: "right-[-18%] top-[-12%] w-[56vw] md:right-[-7%] md:top-[-22%] md:w-[33vw]", from: { x: 40, y: -40 } },
  { src: pastel, alt: "Pastel frito recheado em prato branco", className: "bottom-[6%] left-[-20%] w-[40vw] md:bottom-[10%] md:left-[-9%] md:w-[20vw]", from: { x: -40, y: 30 } },
  { src: burger, alt: "Hambúrguer duplo com queijo", className: "bottom-[-14%] left-[2%] w-[46vw] md:bottom-[-18%] md:left-[6%] md:w-[23vw]", from: { x: -20, y: 40 } },
  { src: pizzaDoce, alt: "Pizza doce de chocolate com confeitos e morangos", className: "bottom-[-16%] right-[-16%] w-[54vw] md:bottom-[-24%] md:right-[-4%] md:w-[29vw]", from: { x: 40, y: 40 } },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="hero-wood relative overflow-hidden">
      {PLATES.map((plate, i) => (
        <motion.div
          key={plate.src}
          className={`pointer-events-none absolute aspect-square max-w-[34rem] ${plate.className}`}
          initial={reduce ? false : { opacity: 0, scale: 0.9, ...plate.from }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={plate.src}
            alt={plate.alt}
            width={640}
            height={640}
            fetchPriority={i < 2 ? "high" : undefined}
            className="plate-float h-full w-full rounded-full shadow-[0_24px_50px_-12px_rgb(0_0_0/0.6)]"
            style={{ animationDelay: `${-i * 1.4}s`, animationDuration: `${6 + (i % 3)}s` }}
          />
        </motion.div>
      ))}

      {/* curva que separa o topo da seção vermelha de baixo */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] z-10 h-8 w-full md:h-14"
      >
        <path d="M0 60 L0 30 Q720 -20 1440 30 L1440 60 Z" fill="var(--color-burgundy)" />
      </svg>

      <div className="container-page relative flex min-h-[34rem] flex-col items-center justify-center py-24 text-center md:min-h-[min(42rem,82vh)]">
        <motion.h1
          className="heading-display text-[3.4rem] text-brand-white [text-shadow:0_4px_24px_rgb(0_0_0/0.45)] md:text-[6.25rem]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Rede da Esfiha
        </motion.h1>
        <motion.div
          className="mt-6 md:mt-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-gold px-10 text-espresso hover:bg-gold-contrast"
          >
            Peça já
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
