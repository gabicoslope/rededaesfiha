import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import logoUrl from "@/assets/logo-rede-da-esfiha.png";
import { ADDRESS, INSTAGRAM_URL, ORDER_URL, WHATSAPP_URL } from "./data";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import fachadaFundo from "@/assets/ambiente-fachada-2.webp";

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#cupom", label: "Cupom" },
  { href: "#nosso-ambiente", label: "Nosso ambiente" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#onde-estamos", label: "Onde estamos" },
];

const PAYMENT_METHODS = ["Pix", "Cartão", "Dinheiro", "VR", "Sodexo", "Alelo", "Ticket"];

const title = "font-display text-xl font-bold text-brand-white";
const link = "inline-flex items-center gap-2 text-brand-white/85 transition-colors hover:text-gold";

export function Footer() {
  return (
    <footer className="relative bg-burgundy text-sm text-brand-white">
      {/* faixa de chamada pro pedido */}
      <div className="container-page">
        <Reveal className="relative isolate -translate-y-1/2 overflow-hidden bg-espresso px-6 py-8 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.7)] md:flex md:items-center md:justify-between md:px-10 md:py-10">
          {/* fachada de verdade no fundo da chamada final */}
          <img src={fachadaFundo} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_45%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_16_24/0.92)_30%,rgb(15_16_24/0.6))]" />
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-bold text-champagne md:text-3xl">Bateu a fome?</p>
            <p className="mt-1 text-brand-white/75">Peça agora pelo Anota Aí e receba quentinho em casa.</p>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3 md:mt-0">
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base bg-gold text-espresso hover:bg-gold-contrast">
              Fazer pedido
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-base border border-brand-white/40 bg-transparent text-brand-white shadow-none hover:bg-brand-white hover:text-espresso">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>

      <div className="container-page -mt-4 grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr] lg:gap-8">
        <div>
          <img src={logoUrl} alt="Rede da Esfiha Vila Moraes" className="h-24 w-auto" width={420} height={399} loading="lazy" />
          <p className="mt-4 max-w-xs leading-relaxed text-brand-white/85">
            Variedade, qualidade e um preço justo, no delivery e no salão da Vila Moraes.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Rede da Esfiha Vila Moraes"
              className="grid size-10 place-items-center rounded-full bg-brand-white/15 transition-[scale,background-color,color] hover:scale-110 hover:bg-brand-white hover:text-burgundy"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Rede da Esfiha Vila Moraes"
              className="grid size-10 place-items-center rounded-full bg-brand-white/15 transition-[scale,background-color,color] hover:scale-110 hover:bg-brand-white hover:text-burgundy"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <p className={title}>Navegue</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={title}>Contato</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={link}>
                <WhatsAppIcon className="size-4 shrink-0 text-gold" />
                (11) 96442-7506
              </a>
            </li>
            <li>
              <a href="tel:+551150737481" className={link}>
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                (11) 5073-7481
              </a>
            </li>
            <li className="flex gap-2 text-brand-white/85">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex gap-2 text-brand-white/85">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                Todos os dias
                <br />
                Loja: 08h às 04h · Delivery: 18h às 02h
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className={title}>Formas de pagamento</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => (
              <li key={m} className="rounded-md bg-brand-white/12 px-3 py-1.5 text-xs font-semibold">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-white/20">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-white/75 md:flex-row">
          <p>© 2026 Rede da Esfiha Vila Moraes</p>
          <div className="flex gap-5">
            <Link to="/termos" className="transition-colors hover:text-gold">Termos de uso</Link>
            <Link to="/privacidade" className="transition-colors hover:text-gold">Política de privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
