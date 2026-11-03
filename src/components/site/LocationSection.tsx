import { MapPin, Clock } from "lucide-react";
import { ADDRESS } from "./data";
import { Reveal } from "./Reveal";

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

        <Reveal delay={0.12} className="min-w-0 overflow-hidden rounded-lg shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)]">
          <iframe
            title="Mapa da Rede da Esfiha Vila Moraes"
            src="https://maps.google.com/maps?q=Avenida%20do%20Cursino%2C%203216%20-%20Vila%20Moraes%2C%20S%C3%A3o%20Paulo%20-%20SP&z=16&hl=pt-BR&output=embed"
            className="block h-72 w-full border-0 md:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
