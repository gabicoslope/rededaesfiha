import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "rde-cookie-consent";
export const CONSENT_EVENT = "rde-cookie-consent-changed";
/** Evento pra reabrir as preferências (link "Cookies" no rodapé e na política de privacidade). */
export const OPEN_COOKIE_PREFERENCES = "rde-abrir-preferencias-cookies";

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
  // Auditoria 04/11 (guia de cookies da ANPD): nada vem marcado; a pessoa liga o que quiser.
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
    // reabrir as preferências a qualquer momento, já com a escolha atual
    const abrir = () => {
      const atual = getCookieConsent();
      setAnalytics(atual?.analytics ?? false);
      setMarketing(atual?.marketing ?? false);
      setConfiguring(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES, abrir);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES, abrir);
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
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-espresso/10 bg-champagne pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-cookie)]"
    >
      <div className="container-page px-4 py-3 md:py-4">
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="flex items-start gap-2.5 text-sm leading-snug text-espresso/90">
            <Cookie className="mt-0.5 size-5 shrink-0 text-burgundy" aria-hidden />
            <span>
              Usamos cookies opcionais pra medir visitas e o alcance das promoções. Você escolhe.{" "}
              <Link to="/privacidade" className="font-bold text-brand-red-deep underline underline-offset-2">
                Política de privacidade
              </Link>
              {!configuring && (
                <>
                  {" · "}
                  <button type="button" onClick={() => setConfiguring(true)} className="font-bold text-brand-red-deep underline underline-offset-2">
                    Preferências
                  </button>
                </>
              )}
            </span>
          </p>

          {!configuring && (
            <div className="grid shrink-0 grid-cols-2 gap-2 md:w-72">
              <button
                type="button"
                onClick={() => close({ analytics: false, marketing: false })}
                className="btn-base h-11 bg-espresso px-3 text-brand-white hover:bg-espresso/85"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => close({ analytics: true, marketing: true })}
                className="btn-base h-11 bg-espresso px-3 text-brand-white hover:bg-espresso/85"
              >
                Aceitar
              </button>
            </div>
          )}
        </div>

        {configuring && (
          <div className="mt-3 border border-espresso/15 bg-espresso/5 p-3">
            <ul className="space-y-2">
              <li className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-espresso">Essenciais</p>
                  <p className="text-sm text-espresso/75">
                    Guardam só a sua escolha sobre cookies. Sempre ativos.
                  </p>
                </div>
                <span className="shrink-0 bg-gold px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-espresso">
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
                onClick={() => (getCookieConsent() === null ? setConfiguring(false) : setVisible(false))}
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
        <p className="text-sm text-espresso/75">{description}</p>
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
