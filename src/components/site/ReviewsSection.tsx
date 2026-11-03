import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEWS_URL, reviews } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";
import salaoFundo from "@/assets/ambiente-superior-1.webp";

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 estrelas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const averageRating = "4,0";
const reviewCount = 895;
const AUTOPLAY_MS = 7000;

// Desenho das avaliações da versão anterior (cards brancos + nota do Google),
// agora em fundo escuro pra seguir a alternância de cores do modelo.
export function ReviewsSection() {
  const [perPage, setPerPage] = useState(1);
  const [page, setPage] = useState(0);
  const paused = useRef(false);
  const reduce = useReducedMotion();
  const pageCount = Math.ceil(reviews.length / perPage);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setPerPage(query.matches ? 3 : 1);
      setPage(0);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) setPage((p) => (p + 1) % pageCount);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [pageCount, reduce]);

  return (
    <section
      id="avaliacoes"
      className="relative isolate overflow-hidden bg-espresso section-y"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {/* foto real do salão de fundo, escurecida pra leitura */}
      <img src={salaoFundo} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_16_24/0.9),rgb(15_16_24/0.78)_45%,rgb(15_16_24/0.92))]" />
      <div className="container-page">
        <Reveal>
          <h2 className="heading-display mx-auto max-w-xl text-center text-champagne">
            <Palavras>Veja o que dizem sobre a gente</Palavras>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl bg-gold px-5 py-3 text-espresso transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gold-contrast"
          >
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-espresso text-gold">
              <span className="text-sm font-bold">{averageRating}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-espresso text-espresso" />
                <span className="text-sm font-semibold">Avaliações no Google</span>
              </div>
              <p className="text-xs text-espresso/75">{reviewCount} avaliações, clique pra ver</p>
            </div>
          </a>
        </Reveal>

        <div className="mt-10 md:mt-14" aria-live="polite" aria-label={`Avaliações, página ${page + 1} de ${pageCount}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {reviews.slice(page * perPage, (page + 1) * perPage).map((r) => (
                <article
                  key={r.name}
                  className="card-base relative flex min-w-0 flex-col bg-brand-white p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Quote className="absolute right-4 top-4 size-8 text-gold/40" />
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold font-semibold text-espresso">
                      {r.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-espresso">{r.name}</p>
                      <p className="text-xs text-espresso/70">{r.meta}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Stars />
                    <span className="text-xs text-espresso/70">{r.when}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-espresso/90 md:text-base">{r.text}</p>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            aria-label="Avaliações anteriores"
            className="size-10 rounded-full border border-gold/50 text-brand-white transition-[scale] hover:scale-110 hover:bg-gold hover:text-espresso"
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2" aria-label="Páginas de avaliações">
            {Array.from({ length: pageCount }, (_, i) => (
              <Button
                key={i}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setPage(i)}
                aria-label={`Ir para página ${i + 1}`}
                aria-current={page === i ? "page" : undefined}
                className="size-8 rounded-full hover:bg-transparent"
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${page === i ? "w-6 bg-gold" : "w-2.5 bg-brand-white/40"}`} />
              </Button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => (p + 1) % pageCount)}
            aria-label="Próximas avaliações"
            className="size-10 rounded-full border border-gold/50 text-brand-white transition-[scale] hover:scale-110 hover:bg-gold hover:text-espresso"
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-gold text-espresso hover:bg-gold-contrast"
          >
            Ver avaliações no Google
          </a>
        </div>
      </div>
    </section>
  );
}
