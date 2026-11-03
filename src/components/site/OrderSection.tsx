import { ArrowRight, CreditCard, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import celularMaos from "@/assets/celular-anota-ai-maos.webp";
import { ORDER_URL } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// "Escolhe. Pede. Chega quentinho.": cada palavra entra com um bloco amarelo que
// passa por cima e revela o texto (mesma ideia do "Entra. Pega. Paga." do Good Money).
const PASSOS = [
  { palavra: "Escolhe.", texto: "No cardápio do Anota Aí." },
  { palavra: "Pede.", texto: "E paga por lá, do jeito que preferir." },
  { palavra: "Chega quentinho.", texto: "Em até 45 minutos na sua casa." },
];

function Passos() {
  const reduce = useReducedMotion();
  return (
    <motion.ol
      className="mx-auto mt-7 max-w-md space-y-3 text-left md:mx-0 md:space-y-4"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      transition={{ staggerChildren: 0.35 }}
    >
      {PASSOS.map((p) => (
        <li key={p.palavra} className="flex flex-wrap items-baseline gap-x-3">
          <span className="relative inline-block overflow-hidden">
            <motion.span
              className="font-display text-[2rem] leading-none text-gold md:text-[2.6rem]"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.25, duration: 0.01 } } }}
            >
              {p.palavra}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 origin-left bg-gold"
              variants={{
                hidden: { scaleX: 0, x: "0%" },
                show: { scaleX: [0, 1, 1], x: ["0%", "0%", "101%"], transition: { duration: 0.6, times: [0, 0.45, 1], ease: "easeInOut" } },
              }}
            />
          </span>
          <motion.span
            className="text-sm text-brand-white md:text-base"
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4 } } }}
          >
            {p.texto}
          </motion.span>
        </li>
      ))}
    </motion.ol>
  );
}

// Logo abaixo do topo: chamada pro pedido com a loja do Anota Aí num celular.
// A tela é um print da loja (pedido.anota.ai) tirado em 02/11.
export function OrderSection() {
  return (
    <section id="pedido" className="overflow-hidden bg-burgundy pt-14 md:pt-16">
      <div className="container-page grid items-end gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <Reveal className="self-center text-center md:pb-16 md:text-left">
          <h2 className="heading-display text-brand-white">
            <Palavras>Faça seu pedido agora mesmo</Palavras>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-brand-white md:mx-0 md:text-lg">
            O nosso delivery é tão fácil de pedir quanto é gostoso de saborear.
          </p>
          <Passos />
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base mt-8 bg-gold px-10 text-espresso hover:bg-gold-contrast"
          >
            Peça já
            <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
          </a>
          <ul className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-medium text-brand-white md:justify-start md:text-sm">
            {[
              { icon: ShoppingBag, text: "Pedido mínimo R$ 19,99" },
              { icon: CreditCard, text: "Pix, cartão e vale-refeição" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2 rounded-full bg-brand-white/12 px-3.5 py-2">
                <Icon className="size-4 text-gold" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="-mb-px flex justify-center md:justify-end">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir a loja da Rede da Esfiha Vila Moraes no Anota Aí"
            className="group relative block w-[19rem] md:w-[26rem]"
          >
            <img
              src={celularMaos}
              alt="Mãos segurando um celular com a loja da Rede da Esfiha Vila Moraes aberta no Anota Aí"
              width={900}
              height={1125}
              loading="lazy"
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
