import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Palavras } from "./Palavras";
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

// Mosaico editorial: fotos de tamanhos diferentes, espaços finos, sem filtros nem
// etiquetas. "card" é a imagem do mosaico; "full" é a foto em 4:3 (1040x780) que
// abre ampliada. As fachadas usam o original vertical no mosaico.
const PHOTOS: { card: string; full: string; caption: string; alt: string; position?: string }[] = [
  { card: fachadaTardeVertical, full: fachada2, caption: "Fachada no fim da tarde", alt: "Fachada ao anoitecer com as placas Aberto 24h e a equipe no balcão de entrada", position: "50% 70%" },
  { card: superior2, full: superior2, caption: "Salão do piso superior", alt: "Vista do salão do piso superior a partir da escada, com mesas, sofás e luminárias vermelhas" },
  { card: superior3, full: superior3, caption: "Espaço kids", alt: "Espaço kids com piscina de bolinhas e brinquedos, protegido por vidro e rede" },
  { card: terreo1, full: terreo1, caption: "Salão e balcão do térreo", alt: "Salão do piso térreo com mesas de madeira, balcão de atendimento e a rua ao fundo", position: "40% 50%" },
  { card: terreo2, full: terreo2, caption: "Vitrine de salgados", alt: "Balcão com estufa e vitrine de salgados, luminárias vermelhas e painel de lanches na parede", position: "60% 50%" },
  { card: fachada1, full: fachada1, caption: "Fachada de dia", alt: "Fachada da Rede da Esfiha durante o dia, prédio vermelho de dois andares com o letreiro da marca", position: "38% 50%" },
  { card: superior1, full: superior1, caption: "Mesas perto das janelas", alt: "Salão do piso superior com mesas de madeira, janelas amplas e o espaço kids ao fundo" },
  { card: fachadaNoiteVertical, full: fachada3, caption: "Fachada à noite", alt: "Fachada iluminada à noite, com o salão do segundo andar aparecendo pelas vidraças" },
  { card: terreo3, full: terreo3, caption: "Bebidas geladas", alt: "Geladeiras cheias de refrigerantes, sucos e águas atrás do balcão" },
  { card: superior4, full: superior4, caption: "Máquina de prêmios", alt: "Balcão de apoio com revestimento preto e a máquina de prêmios ao lado das mesas" },
];

// Posição de cada foto no mosaico. Computador: 4 colunas x 2 linhas.
// Celular: o salão grande em cima e 2x2 embaixo (a vitrine some).
const TILES = [
  { photo: 1, className: "order-first col-span-2 aspect-[4/3] md:order-none md:col-start-2 md:row-start-1 md:aspect-auto" },
  { photo: 0, className: "aspect-square md:col-start-1 md:row-span-2 md:row-start-1 md:aspect-auto" },
  { photo: 2, className: "aspect-square md:col-start-4 md:row-start-1 md:aspect-auto" },
  { photo: 3, className: "aspect-square md:col-start-2 md:row-start-2 md:aspect-auto" },
  { photo: 4, className: "hidden md:col-start-3 md:row-start-2 md:block" },
  { photo: 5, className: "aspect-square md:col-start-4 md:row-start-2 md:aspect-auto", more: true },
];

export function AmbientSection() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const total = PHOTOS.length;

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

  const current = open === null ? null : PHOTOS[open];

  return (
    <section id="nosso-ambiente" className="bg-espresso section-y">
      <div className="container-page min-w-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="heading-display text-brand-white">
            <Palavras>Nosso ambiente</Palavras>
          </h2>
          <div className="md:max-w-sm md:pb-2 md:text-right">
            <p className="text-base leading-snug text-brand-white/80 md:text-lg">
              Dois andares, salão amplo e espaço kids, aqui na Vila Moraes.
            </p>
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="focus-gold mt-1 inline-block py-2 font-bold text-gold underline decoration-2 underline-offset-4 transition-colors hover:text-gold-contrast"
            >
              Ver as {total} fotos
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-1.5 md:mt-10 md:grid-cols-4 md:grid-rows-[17rem_17rem] md:gap-2 lg:grid-rows-[19rem_19rem]">
          {TILES.map((t, i) => {
            const p = PHOTOS[t.photo];
            return (
              <motion.button
                key={t.photo}
                type="button"
                onClick={() => setOpen(t.photo)}
                aria-label={t.more ? `Ver todas as ${total} fotos` : `Ampliar foto: ${p.caption}`}
                className={cn("focus-gold group relative block min-h-0 overflow-hidden bg-espresso text-left", t.className)}
                initial={reduce ? false : "coberta"}
                whileInView="revelada"
                viewport={{ once: false, amount: 0.25 }}
              >
                {/* cortina da cor do fundo que sobe e revela a foto */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 origin-top bg-espresso"
                  variants={{ coberta: { scaleY: 1 }, revelada: { scaleY: 0 } }}
                  transition={{ duration: 0.9, delay: reduce ? 0 : i * 0.08, ease: [0.65, 0, 0.35, 1] }}
                />
                <img
                  src={p.card}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  style={{ objectPosition: p.position ?? "50% 50%" }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {t.more ? (
                  <span className="absolute inset-0 grid place-items-center bg-espresso/60 text-center text-brand-white transition-colors group-hover:bg-espresso/70">
                    <span>
                      <span className="block font-display text-4xl font-bold md:text-5xl">
                        {/* fotos que ficam de fora: 5 no celular, 4 no computador */}
                        +<span className="md:hidden">{total - 5}</span>
                        <span className="hidden md:inline">{total - 6}</span>
                      </span>
                      <span className="text-sm font-semibold">ver todas</span>
                    </span>
                  </span>
                ) : (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-brand-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {p.caption}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
                <p className="text-sm font-semibold md:text-base">
                  {current.caption}
                  <span className="ml-2 font-normal opacity-70">
                    {open! + 1}/{total}
                  </span>
                </p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="focus-gold rounded-full bg-black/60 p-2 transition-colors hover:bg-gold hover:text-espresso">
                    <ChevronLeft className="size-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className="focus-gold rounded-full bg-black/60 p-2 transition-colors hover:bg-gold hover:text-espresso">
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
