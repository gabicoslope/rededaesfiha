import { ORDER_URL, categories } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

export function MenuSection() {
  return (
    <section id="cardapio" className="bg-champagne section-y">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-display text-center text-burgundy">
            <Palavras>Conheça nosso cardápio</Palavras>
          </h2>
        </Reveal>

        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:mt-14 md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-9 md:overflow-visible md:px-0 md:pb-0">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.08} className="w-[64%] shrink-0 snap-center sm:w-[40%] md:w-auto">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-gold group block rounded-lg text-center"
              >
                <div className="overflow-hidden rounded-lg shadow-[0_14px_30px_-18px_rgb(0_0_0/0.55)] transition-[translate,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_40px_-20px_rgb(0_0_0/0.6)]">
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 font-display text-base font-bold leading-tight text-espresso transition-colors group-hover:text-burgundy md:text-lg">
                  {c.name}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-espresso/60 md:hidden">Arraste pro lado pra ver tudo</p>
      </div>
    </section>
  );
}
