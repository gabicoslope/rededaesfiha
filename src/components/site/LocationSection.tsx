import { MapPin, Clock } from "lucide-react";
import fachadaDia from "@/assets/ambiente-fachada-1.webp";
import { ADDRESS } from "./data";
import { Reveal } from "./Reveal";
import { Palavras } from "./Palavras";

const DESTINO = encodeURIComponent("Avenida do Cursino, 3216 - Vila Moraes, São Paulo - SP");
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${DESTINO}`;
const WAZE_URL = `https://waze.com/ul?q=${DESTINO}&navigate=yes`;

export function LocationSection() {
  return (
    <section id="onde-estamos" className="bg-champagne section-y !pb-28 md:!pb-36">
      <div className="container-page grid min-w-0 items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-14">
        <div className="min-w-0">
          <Reveal>
            <h2 className="heading-display text-espresso">
            <Palavras>Onde estamos</Palavras>
          </h2>
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

        {/* foto real da fachada no lugar do mapa embutido (o Google Maps embutido é
            bloqueado na prévia e o endereço exato não existe no OpenStreetMap). Os botões
            abrem a rota no Google Maps ou no Waze. */}
        <Reveal delay={0.12} className="relative min-w-0 overflow-hidden bg-espresso shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)]">
          <img
            src={fachadaDia}
            alt="Fachada da Rede da Esfiha na Avenida do Cursino, prédio vermelho de dois andares"
            width={1040}
            height={780}
            loading="lazy"
            className="block aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-x-3 bottom-3 bg-brand-white p-4 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.45)] sm:inset-x-4 sm:bottom-4 md:p-5">
            <p className="flex items-start gap-2 text-sm leading-snug text-espresso md:text-base">
              <MapPin className="mt-0.5 size-5 shrink-0 text-burgundy" aria-hidden="true" />
              <span>
                <strong className="block">Rede da Esfiha Vila Moraes</strong>
                {ADDRESS}
              </span>
            </p>
            <div className="mt-3 flex gap-2">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-base btn-sm flex-1 bg-burgundy text-brand-white">
                Como chegar
              </a>
              <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="btn-base btn-sm flex-1 bg-[#33ccff] text-espresso">
                Waze
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
