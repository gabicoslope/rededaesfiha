import { CreditCard } from "lucide-react";
import celularRecorte from "@/assets/celular-anota-ai-recorte.webp";
import { ORDER_URL } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// Seção toda vermelha com a foto real das mãos segurando o celular na loja do
// Anota Aí, recortada (fundo transparente) e encostada na base da seção.
export function OrderSection() {
  return (
    <section id="pedido" className="overflow-hidden bg-burgundy pt-14 md:pt-16">
      <div className="container-page grid items-end gap-8 md:grid-cols-2 md:gap-12">
        <Reveal className="self-center text-center md:pb-16 md:text-left">
          <h2 className="heading-display text-brand-white">
            <Palavras>Faça seu pedido agora mesmo</Palavras>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-snug text-brand-white md:mx-0 md:text-lg">
            O nosso delivery é tão fácil de pedir quanto é gostoso de saborear.
          </p>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base mt-8 bg-gold px-10 text-espresso hover:bg-gold-contrast"
          >
            Peça já
          </a>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-[13px] font-semibold text-brand-white md:mt-8 md:justify-start md:text-sm">
            {[
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
            className="group block w-[22rem] md:w-[32rem]"
          >
            <img
              src={celularRecorte}
              alt="Mãos segurando um celular com a loja da Rede da Esfiha Vila Moraes aberta no Anota Aí"
              width={900}
              height={854}
              loading="lazy"
              className="block h-auto w-full origin-bottom transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
