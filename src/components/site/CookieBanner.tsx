import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "rde-cookie-consent";
export const CONSENT_EVENT = "rde-cookie-consent-changed";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent<CookieConsent>(CONSENT_EVENT, { detail: consent }));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  const close = useCallback((consent: CookieConsent) => {
    saveConsent(consent);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] rounded-t-2xl border-t border-gold/40 bg-champagne/98 shadow-[var(--shadow-cookie)] backdrop-blur"
    >
      <div className="container-page px-4 py-3 md:py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="flex items-start gap-2.5">
            <Cookie className="mt-0.5 size-5 shrink-0 text-burgundy" aria-hidden />
            <div>
              <p className="text-sm font-bold text-espresso">
                Nós usamos cookies
              </p>
              <p className="mt-0.5 text-xs leading-snug text-espresso/80">
                Usamos cookies para melhorar sua experiência e medir o alcance das
                nossas promoções. Saiba mais na nossa{" "}
                <Link
                  to="/privacidade"
                  className="story-link font-bold text-burgundy"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>

          {!configuring && (
            <div className="flex shrink-0 flex-col gap-2 md:w-56">
              <button
                type="button"
                onClick={() => close({ analytics: true, marketing: true })}
                className="btn-base h-10 w-full bg-burgundy text-brand-white hover:bg-brand-red-deep"
              >
                Aceitar tudo
              </button>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setConfiguring(true)}
                  className="text-xs font-medium text-burgundy underline-offset-2 transition-opacity hover:opacity-80 hover:underline"
                >
                  Preferências
                </button>
                <button
                  type="button"
                  onClick={() => close({ analytics: false, marketing: false })}
                  className="text-xs font-medium text-burgundy underline-offset-2 transition-opacity hover:opacity-80 hover:underline"
                >
                  Recusar
                </button>
              </div>
            </div>
          )}
        </div>

        {configuring && (
          <div className="mt-3 rounded-xl border border-gold/40 bg-espresso/5 p-3">
            <ul className="space-y-2">
              <li className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-espresso">Essenciais</p>
                  <p className="text-xs text-espresso/70">
                    Necessários para o site funcionar. Sempre ativos.
                  </p>
                </div>
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-espresso">
                  Sempre ativos
                </span>
              </li>

              <PreferenceToggle
                label="Análise"
                description="Medem visitas e cliques (ex.: Google Analytics)."
                checked={analytics}
                onChange={setAnalytics}
              />
              <PreferenceToggle
                label="Marketing"
                description="Medem a eficácia de anúncios e promoções (ex.: Meta Pixel)."
                checked={marketing}
                onChange={setMarketing}
              />
            </ul>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => close({ analytics, marketing })}
                className="btn-base h-10 flex-1 bg-burgundy text-brand-white hover:bg-brand-red-deep"
              >
                Salvar preferências
              </button>
              <button
                type="button"
                onClick={() => setConfiguring(false)}
                className="btn-base h-10 flex-1 border border-burgundy/40 bg-transparent text-espresso hover:bg-burgundy/5"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreferenceToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-espresso">{label}</p>
        <p className="text-xs text-espresso/70">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label}: ${checked ? "ativo" : "desativado"}`}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-burgundy" : "bg-espresso/25"
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-champagne shadow transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </li>
  );
}
