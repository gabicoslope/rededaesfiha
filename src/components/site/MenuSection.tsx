import { ORDER_URL, categories } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// Cardápio no estilo das grandes redes de fast food: foto reta, sem cantos
// arredondados nem degradês, o nome embaixo em negrito e o preço "a partir de".
// No hover, só a foto aproxima e o nome fica vermelho.
export function MenuSection() {
  return (
    <section id="cardapio" className="bg-champagne section-y">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-display text-center text-burgundy">
            <Palavras>Conheça nosso cardápio</Palavras>
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 gap-x-2 gap-y-5 md:mt-14 md:grid-cols-4 md:gap-x-5 md:gap-y-10">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.05}>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="focus-gold group block">
                <div className="overflow-hidden bg-espresso">
                  <img
                    src={c.src}
                    alt={c.alt}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 font-display text-[15px] font-bold leading-tight text-espresso transition-colors group-hover:text-burgundy md:mt-3 md:text-xl">
                  {c.name}
                </p>
                {c.price && (
                  <p className="mt-1 text-sm leading-tight text-espresso/75 md:text-base">
                    a partir de <strong className="whitespace-nowrap text-espresso">{c.price}</strong>
                  </p>
                )}
              </a>
            </Reveal>
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
