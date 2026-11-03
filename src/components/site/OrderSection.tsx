import { ArrowRight, Bike, CreditCard, ShoppingBag } from "lucide-react";
import anotaAiPhone from "@/assets/anota-ai-celular.webp";
import { ORDER_URL } from "./data";
import { Reveal } from "./Reveal";

// Logo abaixo do topo: chamada pro pedido com a loja do Anota Aí num celular.
// A tela é um print da loja (pedido.anota.ai) tirado em 02/11.
export function OrderSection() {
  return (
    <section id="pedido" className="overflow-hidden bg-burgundy section-y">
      <div className="container-page grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <Reveal className="text-center md:text-left">
          <h2 className="heading-display text-brand-white">Faça seu pedido agora mesmo</h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-brand-white md:mx-0 md:text-lg">
            O nosso delivery é tão fácil de pedir quanto é gostoso de saborear.
          </p>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-brand-white md:mx-0 md:text-lg">
            Peça agora mesmo pelo link e aproveite.
          </p>
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
              { icon: Bike, text: "Entrega em até 45 min" },
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

        <Reveal delay={0.12} className="flex justify-center md:justify-end">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir a loja da Rede da Esfiha Vila Moraes no Anota Aí"
            className="phone-float group relative block w-[15.5rem] md:w-[17.5rem]"
          >
            <div className="rounded-[2.6rem] bg-espresso p-2.5 transition-transform duration-500 group-hover:scale-[1.03] shadow-[0_40px_70px_-25px_rgb(0_0_0/0.65)] ring-1 ring-white/10">
              <div className="relative overflow-hidden rounded-[2.1rem] bg-white">
                <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-espresso" />
                <img
                  src={anotaAiPhone}
                  alt="Loja da Rede da Esfiha Vila Moraes aberta no Anota Aí, com esfihas e pizzas em destaque"
                  width={780}
                  height={1688}
                  loading="lazy"
                  className="block aspect-[390/780] w-full object-cover object-top"
                />
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
