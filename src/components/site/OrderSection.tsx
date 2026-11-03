import { ArrowRight, Bike, CreditCard, ShoppingBag } from "lucide-react";
import celularMaos from "@/assets/celular-anota-ai-maos.webp";
import { ORDER_URL } from "./data";
import { Reveal } from "./Reveal";

// Logo abaixo do topo: chamada pro pedido com a loja do Anota Aí num celular.
// A tela é um print da loja (pedido.anota.ai) tirado em 02/11.
export function OrderSection() {
  return (
    <section id="pedido" className="overflow-hidden bg-burgundy pt-14 md:pt-16">
      <div className="container-page grid items-end gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <Reveal className="self-center text-center md:pb-16 md:text-left">
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
