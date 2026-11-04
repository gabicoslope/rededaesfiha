import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import logoUrl from "@/assets/logo-rede-da-esfiha.webp";
import { ADDRESS, INSTAGRAM_URL, WHATSAPP_URL } from "./data";
import { OPEN_COOKIE_PREFERENCES } from "./CookieBanner";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#nosso-ambiente", label: "Nosso ambiente" },
  { href: "#cupom", label: "Cupom" },
  { href: "#onde-estamos", label: "Onde estamos" },
];

const PAYMENT_METHODS = ["Pix", "Cartão", "Dinheiro", "VR", "Sodexo", "Alelo", "Ticket"];

const title = "font-display text-xl font-bold text-brand-white";
const link = "inline-flex min-h-10 items-center gap-2 text-[15px] text-brand-white/90 transition-colors hover:text-gold md:min-h-0 md:text-sm";

export function Footer() {
  return (
    <footer className="relative bg-burgundy pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-sm text-brand-white md:pb-0">
      <div className="container-page grid gap-8 pb-10 pt-12 sm:grid-cols-2 md:gap-10 md:pb-12 md:pt-16 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr] lg:gap-8">
        <div>
          <img src={logoUrl} alt="Rede da Esfiha Vila Moraes" className="genio-flutua genio-balanca h-24 w-auto" width={420} height={399} loading="lazy" />
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

        <nav aria-label="Rodapé" className="hidden sm:block">
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
            <li className="hidden gap-2 text-brand-white/85 md:flex">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{ADDRESS}</span>
            </li>
            <li className="hidden gap-2 text-brand-white/85 md:flex">
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
              <li key={m} className="bg-brand-white/12 px-3 py-1.5 text-sm font-semibold">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-white/20">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-sm text-brand-white/80 md:flex-row">
          <p>© 2026 Rede da Esfiha Vila Moraes</p>
          <div className="flex flex-wrap justify-center gap-x-5">
            <Link to="/termos" className="py-2 transition-colors hover:text-gold">Termos de uso</Link>
            <Link to="/privacidade" className="py-2 transition-colors hover:text-gold">Política de privacidade</Link>
            {/* reabre as escolhas de cookies a qualquer momento (LGPD: revogar tem que ser fácil) */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES))}
              className="py-2 transition-colors hover:text-gold"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
