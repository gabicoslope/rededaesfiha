import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

// Faixa logo abaixo do topo com o que o cliente mais procura: se está aberto,
// onde fica e o horário (antes ficava só no fim da página).
// O "aberto agora" é calculado no horário de São Paulo, não no do aparelho.
// Horários iguais aos da seção "Onde estamos" (ainda a confirmar com a loja).
const LOJA = { abre: 8, fecha: 4 }; // 08h às 04h do dia seguinte
const DELIVERY = { abre: 18, fecha: 2 }; // 18h às 02h do dia seguinte
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Avenida do Cursino, 3216 - Vila Moraes, São Paulo - SP")}`;

function horaEmSaoPaulo(agora = new Date()) {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(agora);
  const h = Number(partes.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(partes.find((p) => p.type === "minute")?.value ?? 0);
  return h + m / 60;
}

const aberto = (t: number, faixa: { abre: number; fecha: number }) => t >= faixa.abre || t < faixa.fecha;

type Situacao = { aberto: boolean; texto: string };

function situacaoAgora(): Situacao {
  const t = horaEmSaoPaulo();
  if (!aberto(t, LOJA)) return { aberto: false, texto: "Fechado agora · abre às 08h" };
  if (aberto(t, DELIVERY)) return { aberto: true, texto: "Aberto agora · delivery funcionando" };
  return { aberto: true, texto: "Aberto agora · delivery a partir das 18h" };
}

export function InfoStrip() {
  const [situacao, setSituacao] = useState<Situacao | null>(null);

  useEffect(() => {
    setSituacao(situacaoAgora());
    const id = setInterval(() => setSituacao(situacaoAgora()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-label="Informações rápidas" className="bg-champagne pt-2 md:pt-4">
      <div className="container-page">
        <ul className="grid divide-y divide-espresso/10 border border-espresso/10 bg-brand-white text-[15px] text-espresso md:grid-cols-3 md:divide-x md:divide-y-0 md:text-base">
          <li className="flex items-center gap-3 px-4 py-3 md:justify-center md:py-4">
            <span
              aria-hidden="true"
              className={`size-2.5 shrink-0 rounded-full ${situacao ? (situacao.aberto ? "bg-[#1f9d55]" : "bg-burgundy") : "bg-espresso/30"}`}
            />
            <span className="font-bold" aria-live="polite">
              {situacao ? situacao.texto : "Aberto todos os dias"}
            </span>
          </li>
          <li>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-gold flex items-center gap-3 px-4 py-3 transition-colors hover:text-burgundy md:justify-center md:py-4"
            >
              <MapPin className="size-5 shrink-0 text-burgundy" aria-hidden="true" />
              <span>
                Av. do Cursino, 3216 · Vila Moraes <span className="font-bold underline underline-offset-2">Como chegar</span>
              </span>
            </a>
          </li>
          <li className="flex items-center gap-3 px-4 py-3 md:justify-center md:py-4">
            <Clock className="size-5 shrink-0 text-burgundy" aria-hidden="true" />
            <span>
              Loja <strong>08h às 04h</strong> · Delivery <strong>18h às 02h</strong>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
