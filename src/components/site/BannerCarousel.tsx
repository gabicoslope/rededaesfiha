import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Gift, Instagram, PartyPopper, Percent, ShoppingBag, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { banners, type BannerSlide } from "./banners";

import { BANNER_INTERVAL_MS, shouldAutoplay } from "./banner-autoplay";

const icons = { pedido: ShoppingBag, cashback: Wallet, "dez-pedidos": Gift, cupom: Percent, instagram: Instagram, festas: PartyPopper };

function SlideContent({ slide }: { slide: BannerSlide }) {
  const Icon = icons[slide.id];
  const image = slide.mobileImage ?? slide.desktopImage;
  if (image) {
    return (
      <picture className="block h-full w-full">
        <source media="(min-width: 768px)" srcSet={slide.desktopImage ?? image} />
        <img src={image} alt={slide.headline} className="h-full w-full object-cover" />
      </picture>
    );
  }
  return (
    <div className="banner-art container-page relative flex h-full items-center">
      <div className="banner-copy relative z-10">
        <p className="banner-eyebrow">{slide.eyebrow}</p>
        <h2 className="banner-headline">
          {slide.id === "cupom" ? <>25% de desconto com o cupom <span className="banner-code">CUPOMSITE25</span></> : slide.headline}
        </h2>
        {slide.detail && <p className="banner-detail">{slide.detail}</p>}
        <span className="banner-cta">{slide.cta}<ArrowRight aria-hidden="true" className="size-3 md:size-4" /></span>
      </div>
      <Icon aria-hidden="true" className="banner-icon" strokeWidth={1.25} />
    </div>
  );
}

// Carrossel das artes de promoção (16:9), logo abaixo do cardápio.
export function BannerCarousel() {
  const total = banners.length;
  const [viewportRef, api] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [rulesOpen, setRulesOpen] = useState(false);
  const pause = useRef({ hover: false, focus: false, touch: false });

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => { api.off("select", onSelect).off("reInit", onSelect); };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    const reset = () => {
      clearInterval(interval);
      if (document.hidden || reducedMotion.matches || rulesOpen) return;
      interval = setInterval(() => {
        if (shouldAutoplay({ ...pause.current, hidden: document.hidden, reducedMotion: reducedMotion.matches, rulesOpen })) api.scrollNext();
      }, BANNER_INTERVAL_MS);
    };
    reset();
    document.addEventListener("visibilitychange", reset);
    reducedMotion.addEventListener("change", reset);
    api.on("select", reset);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", reset);
      reducedMotion.removeEventListener("change", reset);
      api.off("select", reset);
    };
  }, [api, rulesOpen]);

  return (
    <section
      aria-label="Promoções da Rede da Esfiha"
      aria-roledescription="carrossel"
      className="banner-section relative min-w-0"
      onMouseEnter={() => { pause.current.hover = true; }}
      onMouseLeave={() => { pause.current.hover = false; }}
      onFocusCapture={() => { pause.current.focus = true; }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) pause.current.focus = false; }}
      onPointerDown={(event) => { if (event.pointerType !== "mouse") pause.current.touch = true; }}
      onPointerUp={() => { pause.current.touch = false; }}
      onPointerCancel={() => { pause.current.touch = false; }}
    >
      <div className="banner-carousel relative">
      <div ref={viewportRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {banners.map((slide, index) => (
            <div key={slide.id} className={cn("banner-slide relative h-full min-w-0 shrink-0 basis-full", `banner-${slide.theme}`)} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${total}`} aria-hidden={selected !== index}>
              <a href={slide.href} target="_blank" rel="noopener noreferrer" aria-label={`${slide.headline} — ${slide.cta}`} tabIndex={selected === index ? 0 : -1} className="focus-gold block h-full w-full">
                <SlideContent slide={slide} />
              </a>
              {slide.rules && (
                <Dialog onOpenChange={setRulesOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" tabIndex={selected === index ? 0 : -1} className="banner-rules absolute bottom-2 right-2 text-[10px] md:bottom-3 md:right-5">confira as regras | saiba +</Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80dvh] w-[calc(100%-2rem)] overflow-y-auto text-foreground">
                    <DialogHeader><DialogTitle>Regras — {slide.eyebrow}</DialogTitle><DialogDescription className="whitespace-pre-line">{slide.rules}</DialogDescription></DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button variant="ghost" size="icon" aria-label="Banner anterior" onClick={() => api?.scrollPrev()} className="banner-control absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full md:inline-flex md:left-5"><ArrowLeft /></Button>
      <Button variant="ghost" size="icon" aria-label="Próximo banner" onClick={() => api?.scrollNext()} className="banner-control absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full md:inline-flex md:right-5"><ArrowRight /></Button>
      </div>
      <div className="banner-dots mx-auto mt-3 flex w-fit items-center rounded-full px-1">
        {banners.map((slide, index) => <Button key={slide.id} variant="ghost" aria-label={`Mostrar slide ${index + 1}: ${slide.eyebrow}`} aria-current={selected === index ? "true" : undefined} onClick={() => api?.scrollTo(index)} className="banner-dot size-6 rounded-full p-0"><span className={cn("block h-1.5 rounded-full bg-brand-white transition-all duration-300", selected === index ? "w-4" : "w-1.5 opacity-50")} /></Button>)}
      </div>
    </section>
  );
}
