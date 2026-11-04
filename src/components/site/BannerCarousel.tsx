import { banners } from "./banners";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

// Promoções fixas (auditoria 04/11): em vez de carrossel que passa sozinho, as artes
// ficam lado a lado (2 por linha no computador). No celular, uma faixa que a pessoa
// arrasta no próprio ritmo, com a próxima arte aparecendo na borda.
// Nada se move sozinho, então não precisa de botão de pausar (WCAG 2.2.2).
export function BannerCarousel() {
  return (
    <section aria-labelledby="promocoes-titulo" className="bg-champagne pb-14 md:pb-24">
      <div className="container-page">
        <Reveal>
          <h2 id="promocoes-titulo" className="heading-display text-center text-burgundy">
            <Palavras>Promoções e vantagens</Palavras>
          </h2>
        </Reveal>
      </div>

      <Reveal>
      <ul className="mt-8 flex snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] md:container-page md:mt-12 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0">
        {banners.map((slide) => {
          const image = slide.mobileImage ?? slide.desktopImage;
          return (
            <li key={slide.id} className="w-full shrink-0 snap-center md:w-auto">
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${slide.headline} — ${slide.cta}`}
                  className="focus-gold group block overflow-hidden bg-espresso"
                >
                  <picture className="block aspect-video">
                    <source media="(min-width: 768px)" srcSet={slide.desktopImage ?? image} />
                    <img
                      src={image}
                      alt={slide.headline}
                      width={1080}
                      height={608}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </picture>
                </a>
            </li>
          );
        })}
      </ul>
      </Reveal>
      <p className="mt-3 text-center text-sm text-espresso/70 md:hidden">Arraste para o lado para ver mais</p>
    </section>
  );
}
