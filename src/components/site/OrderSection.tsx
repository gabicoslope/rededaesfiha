import { CreditCard, ShoppingBag } from "lucide-react";
import celularFoto from "@/assets/celular-anota-ai-foto.webp";
import { ORDER_URL } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// Duas metades de ponta a ponta: texto no vermelho e, à direita, a foto real das mãos
// com o celular aberto na loja do Anota Aí (fundo branco, cortada embaixo).
export function OrderSection() {
  return (
    <section id="pedido" className="grid overflow-hidden bg-burgundy md:grid-cols-2">
      <Reveal className="flex flex-col items-center justify-center px-6 py-14 text-center md:items-start md:py-20 md:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] md:pr-12 md:text-left">
        <h2 className="heading-display text-brand-white">
          <Palavras>Faça seu pedido agora mesmo</Palavras>
        </h2>
        <p className="mt-3 max-w-md text-base leading-snug text-brand-white md:text-lg">
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

      <a
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir a loja da Rede da Esfiha Vila Moraes no Anota Aí"
        className="group relative block overflow-hidden bg-white"
      >
        <img
          src={celularFoto}
          alt="Mãos segurando um celular com a loja da Rede da Esfiha Vila Moraes aberta no Anota Aí"
          width={1000}
          height={912}
          loading="lazy"
          className="mx-auto block h-[24rem] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] md:absolute md:inset-0 md:h-full"
        />
      </a>
    </section>
  );
}
