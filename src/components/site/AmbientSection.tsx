import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import fachadaTardeVertical from "@/assets/fachada-2.jpeg";
import fachadaNoiteVertical from "@/assets/fachada-1.jpeg";
import fachada1 from "@/assets/ambiente-fachada-1.webp";
import fachada2 from "@/assets/ambiente-fachada-2.webp";
import fachada3 from "@/assets/ambiente-fachada-3.webp";
import terreo1 from "@/assets/ambiente-terreo-1.webp";
import terreo2 from "@/assets/ambiente-terreo-2.webp";
import terreo3 from "@/assets/ambiente-terreo-3.webp";
import superior1 from "@/assets/ambiente-superior-1.webp";
import superior2 from "@/assets/ambiente-superior-2.webp";
import superior3 from "@/assets/ambiente-superior-3.webp";
import superior4 from "@/assets/ambiente-superior-4.webp";

// Carrossel de cards em pé (3:4). "card" é a imagem do card; "full" é a foto
// em 4:3 (1040x780) que abre ampliada. As fachadas de fim de tarde e noite
// usam o original vertical no card, pra não cortar o prédio.
type Area = "fachada" | "terreo" | "superior" | "kids";

const AREAS: { id: Area | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "fachada", label: "Fachada" },
  { id: "terreo", label: "Piso térreo" },
  { id: "superior", label: "Piso superior" },
  { id: "kids", label: "Espaço kids" },
];

const PHOTOS: { area: Area; card: string; full: string; caption: string; alt: string; position?: string }[] = [
  { area: "fachada", card: fachadaTardeVertical, full: fachada2, caption: "Fachada no fim da tarde", alt: "Fachada ao anoitecer com as placas Aberto 24h e a equipe no balcão de entrada", position: "50% 70%" },
  { area: "terreo", card: terreo1, full: terreo1, caption: "Salão e balcão", alt: "Salão do piso térreo com mesas de madeira, balcão de atendimento e a rua ao fundo", position: "40% 50%" },
  { area: "superior", card: superior2, full: superior2, caption: "Salão do piso superior", alt: "Vista do salão do piso superior a partir da escada, com mesas, sofás e luminárias vermelhas", position: "45% 50%" },
  { area: "kids", card: superior3, full: superior3, caption: "Espaço kids", alt: "Espaço kids com piscina de bolinhas e brinquedos, protegido por vidro e rede" },
  { area: "fachada", card: fachada1, full: fachada1, caption: "Fachada de dia", alt: "Fachada da Rede da Esfiha durante o dia, prédio vermelho de dois andares com o letreiro da marca", position: "38% 50%" },
  { area: "terreo", card: terreo2, full: terreo2, caption: "Vitrine de salgados", alt: "Balcão com estufa e vitrine de salgados, luminárias vermelhas e painel de lanches na parede", position: "60% 50%" },
  { area: "superior", card: superior1, full: superior1, caption: "Mesas perto das janelas", alt: "Salão do piso superior com mesas de madeira, janelas amplas e o espaço kids ao fundo" },
  { area: "fachada", card: fachadaNoiteVertical, full: fachada3, caption: "Fachada à noite", alt: "Fachada iluminada à noite, com o salão do segundo andar aparecendo pelas vidraças", position: "50% 62%" },
  { area: "terreo", card: terreo3, full: terreo3, caption: "Bebidas geladas", alt: "Geladeiras cheias de refrigerantes, sucos e águas atrás do balcão", position: "55% 50%" },
  { area: "superior", card: superior4, full: superior4, caption: "Máquina de prêmios", alt: "Balcão de apoio com revestimento preto e a máquina de prêmios ao lado das mesas", position: "65% 50%" },
];

const AREA_LABEL: Record<Area, string> = { fachada: "Fachada", terreo: "Piso térreo", superior: "Piso superior", kids: "Espaço kids" };

export function AmbientSection() {
  const [filter, setFilter] = useState<Area | "todos">("todos");
  const [open, setOpen] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", duration: reduce ? 0 : 28 });

  const photos = useMemo(() => (filter === "todos" ? PHOTOS : PHOTOS.filter((p) => p.area === filter)), [filter]);
  const total = photos.length;

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
      setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
    };
    update();
    api.on("select", update).on("reInit", update).on("scroll", update);
    return () => {
      api.off("select", update).off("reInit", update).off("scroll", update);
    };
  }, [api]);

  useEffect(() => {
    api?.reInit();
    api?.scrollTo(0, true);
  }, [api, filter]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open === null ? null : photos[open];
  const arrow =
    "focus-gold grid size-11 shrink-0 place-items-center rounded-full bg-brand-white text-espresso shadow-[0_10px_24px_-10px_rgb(0_0_0/0.55)] transition-[scale,background-color,opacity] duration-200 hover:scale-110 hover:bg-gold disabled:pointer-events-none disabled:opacity-35";

  return (
    <section id="nosso-ambiente" className="overflow-hidden bg-burgundy section-y">
      <div className="container-page min-w-0">
        <Reveal>
          <h2 className="heading-display text-center text-brand-white">Nosso ambiente</h2>
          <p className="mt-3 text-center text-sm text-brand-white/85 md:text-base">
            Dois andares e espaço kids. Arraste ou use as setas pra conhecer.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap justify-center gap-2">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={filter === a.id}
              onClick={() => setFilter(a.id)}
              className={cn(
                "focus-gold relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === a.id ? "text-espresso" : "text-brand-white hover:bg-brand-white/10",
              )}
            >
              {filter === a.id && (
                <motion.span
                  layoutId="ambiente-filtro"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{a.label}</span>
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.12} className="mt-8 md:mt-10">
          <div ref={viewportRef} className="overflow-visible md:overflow-hidden" aria-roledescription="carrossel" aria-label="Fotos do ambiente">
            <ul className="flex touch-pan-y gap-4 md:gap-6">
                {photos.map((p, i) => (
                  <motion.li
                    key={`${filter}-${p.caption}`}
                    initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : Math.min(i, 5) * 0.05 }}
                    className="min-w-0 shrink-0 basis-[84%] sm:basis-[48%] md:basis-[calc((100%-3rem)/3)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-label={`Ampliar foto: ${p.caption}`}
                      className="focus-gold group block w-full overflow-hidden bg-espresso text-left shadow-[0_20px_40px_-22px_rgb(0_0_0/0.6)] transition-transform duration-300 hover:-translate-y-1.5"
                    >
                      <span className="relative block aspect-[4/5] overflow-hidden">
                        <img
                          src={p.card}
                          alt={p.alt}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          style={{ objectPosition: p.position ?? "50% 50%" }}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-espresso/75 px-2.5 py-1 text-[11px] font-medium text-brand-white">
                          {AREA_LABEL[p.area]}
                        </span>
                        <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-brand-white/90 text-espresso opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <Expand className="size-4" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="block px-3 py-2.5 text-center text-sm font-medium text-brand-white">
                        {p.caption}
                      </span>
                    </button>
                  </motion.li>
                ))}
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button type="button" onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label="Fotos anteriores" className={arrow}>
              <ChevronLeft className="size-5" />
            </button>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-brand-white/25 md:w-48" aria-hidden="true">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-150"
                style={{ width: `${canPrev || canNext ? Math.max(12, progress * 100) : 100}%` }}
              />
            </div>
            <button type="button" onClick={() => api?.scrollNext()} disabled={!canNext} aria-label="Próximas fotos" className={arrow}>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>
      </div>

      <Dialog open={current !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent aria-describedby={undefined} className="max-w-5xl gap-0 border-0 bg-transparent p-0 text-brand-white shadow-none sm:rounded-none [&>button:last-child]:right-3 [&>button:last-child]:top-3 [&>button:last-child]:rounded-full [&>button:last-child]:bg-black/60 [&>button:last-child]:p-2 [&>button:last-child]:text-brand-white [&>button:last-child]:opacity-100">
          <DialogTitle className="sr-only">{current ? current.caption : "Foto"}</DialogTitle>
          {current && (
            <div className="relative overflow-hidden bg-black">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={current.full}
                  src={current.full}
                  alt={current.alt}
                  width={1040}
                  height={780}
                  className="aspect-[4/3] w-full object-cover"
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
                <p className="text-sm font-semibold md:text-base">
                  {current.caption}
                  <span className="ml-2 font-normal opacity-70">
                    {open! + 1}/{total}
                  </span>
                </p>
                {total > 1 && (
                  <div className="flex gap-2">
                    <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="focus-gold rounded-full bg-black/60 p-2 transition-colors hover:bg-gold hover:text-espresso">
                      <ChevronLeft className="size-5" />
                    </button>
                    <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className="focus-gold rounded-full bg-black/60 p-2 transition-colors hover:bg-gold hover:text-espresso">
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
