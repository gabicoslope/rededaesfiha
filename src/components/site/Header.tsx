import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import logoUrl from "@/assets/logo-rede-da-esfiha.png";
import { ORDER_URL } from "./data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#cupom", label: "Cupom" },
  { href: "#nosso-ambiente", label: "Nosso ambiente" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#onde-estamos", label: "Onde estamos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-espresso/10 bg-champagne shadow-[var(--shadow-header)] backdrop-blur"
          : "border-transparent bg-champagne",
      )}
    >
      {/* faixa de aviso no topo, como a do BK; some quando a página rola */}
      <div
        className={cn(
          "overflow-hidden bg-gold text-center text-xs font-semibold text-espresso transition-[max-height] duration-300 md:text-sm",
          scrolled ? "max-h-0" : "max-h-16",
        )}
      >
        <a href="#cupom" className="container-page block py-2 hover:underline">
          Cupom do site: <strong className="tracking-wide">CUPOMSITE25</strong> dá 25% de desconto no Anota Aí, a partir de R$ 50.
        </a>
      </div>

      <div
        className={cn(
          "container-page relative flex items-center gap-4 transition-all duration-300",
          scrolled ? "h-16 md:h-18" : "h-16 md:h-20",
        )}
      >
        {/* logo "pendurado", passando da altura do cabeçalho (estilo BK) */}
        <a href="#inicio" className="logo-link relative z-10 flex w-20 shrink-0 self-start md:w-28">
          <img
            src={logoUrl}
            alt="Rede da Esfiha Vila Moraes"
            className={cn(
              "logo-anima absolute left-0 w-auto drop-shadow-[0_8px_14px_rgb(0_0_0/0.25)] transition-all duration-300",
              scrolled ? "top-2 h-12 md:h-14" : "top-1 h-[4.75rem] md:h-[6.25rem]",
            )}
            width={760}
            height={722}
          />
          <span className="sr-only">Rede da Esfiha Vila Moraes</span>
        </a>

        <nav className="mx-auto hidden items-center gap-6 font-display text-lg font-bold text-espresso lg:flex xl:gap-9 xl:text-xl">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="story-link">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-sm hidden bg-burgundy text-brand-white hover:bg-brand-red-deep lg:inline-flex"
        >
          Faça seu pedido
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="focus-gold ml-auto grid size-10 place-items-center rounded-full text-espresso transition-colors hover:bg-espresso/5 lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-espresso/10 bg-champagne lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-3 text-sm text-espresso">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2.5 font-semibold transition-colors hover:bg-espresso/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 font-semibold transition-colors hover:bg-espresso/5"
              >
                Faça seu pedido
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
