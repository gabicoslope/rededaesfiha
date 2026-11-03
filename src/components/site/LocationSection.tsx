import { ArrowRight, MapPin, Clock } from "lucide-react";
import { ADDRESS } from "./data";
import { Reveal } from "./Reveal";

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Avenida%20do%20Cursino%2C%203216%20-%20Vila%20Moraes%2C%20S%C3%A3o%20Paulo%20-%20SP";

export function LocationSection() {
  return (
    <section id="onde-estamos" className="bg-champagne section-y !pb-28 md:!pb-36">
      <div className="container-page grid min-w-0 items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-14">
        <div className="min-w-0">
          <Reveal>
            <h2 className="heading-display text-espresso md:text-[4.5rem]">Onde estamos</h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-burgundy" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-semibold text-espresso">Endereço</p>
                <p className="mt-1 break-words text-sm leading-relaxed text-espresso/80 md:text-base">{ADDRESS}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-6 flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-burgundy" aria-hidden="true" />
              <div className="min-w-0 text-sm leading-relaxed text-espresso/80 md:text-base">
                <p className="font-semibold text-espresso">Horário</p>
                <p className="mt-1">Todos os dias</p>
                <p>Loja aberta: 08h às 04h</p>
                <p>Delivery: 18h às 02h</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative min-w-0 overflow-hidden bg-[#e9e4dc] shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)]">
          <iframe
            title="Mapa da Rede da Esfiha Vila Moraes"
            src="https://maps.google.com/maps?q=Avenida%20do%20Cursino%2C%203216%20-%20Vila%20Moraes%2C%20S%C3%A3o%20Paulo%20-%20SP&z=16&hl=pt-BR&output=embed"
            className="block h-80 w-full border-0 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* endereço sempre visível por cima do mapa */}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 bg-brand-white p-3.5 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.45)] sm:inset-x-auto sm:left-4 sm:max-w-sm md:bottom-4">
            <span className="grid size-10 shrink-0 place-items-center bg-burgundy text-brand-white">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 text-sm leading-snug">
              <p className="font-bold text-espresso">Rede da Esfiha Vila Moraes</p>
              <p className="text-espresso/75">{ADDRESS}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-bold text-burgundy hover:underline"
              >
                Como chegar
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
