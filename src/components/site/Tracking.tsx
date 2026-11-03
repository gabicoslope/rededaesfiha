import { useEffect } from "react";
import {
  CONSENT_EVENT,
  getCookieConsent,
  type CookieConsent,
} from "@/components/site/CookieBanner";

// [SUBSTITUIR PELO ID REAL] Google Analytics 4
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
// [SUBSTITUIR PELO ID REAL] Meta Pixel
const META_PIXEL_ID = "000000000000000";

type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

type TrackingWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  fbq?: PixelFunction;
  _fbq?: PixelFunction;
};

const isGaConfigured = GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX";
const isPixelConfigured = META_PIXEL_ID !== "000000000000000";

export function Tracking() {
  useEffect(() => {
    const trackingWindow = window as TrackingWindow;

    const loadGa = () => {
      if (!isGaConfigured || trackingWindow.gtag) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      trackingWindow.dataLayer = trackingWindow.dataLayer ?? [];
      trackingWindow.gtag = (...args: unknown[]) => trackingWindow.dataLayer?.push(args);
      trackingWindow.gtag("js", new Date());
      trackingWindow.gtag("config", GA4_MEASUREMENT_ID);
    };

    const loadPixel = () => {
      if (!isPixelConfigured || trackingWindow.fbq) return;
      const fbq = ((...args: unknown[]) => {
        if (fbq.callMethod) {
          fbq.callMethod(...args);
        } else {
          fbq.queue.push(args);
        }
      }) as PixelFunction;

      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      trackingWindow.fbq = fbq;
      trackingWindow._fbq = fbq;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      fbq("init", META_PIXEL_ID);
      fbq("track", "PageView");
    };

    const applyConsent = (consent: CookieConsent) => {
      if (consent.analytics) loadGa();
      if (consent.marketing) loadPixel();
    };

    const consent = getCookieConsent();
    if (consent) applyConsent(consent);

    const onConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsent>).detail;
      if (detail) applyConsent(detail);
    };
    window.addEventListener(CONSENT_EVENT, onConsentChange);

    const trackOrderClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href*="pedido.anota.ai"]');
      if (!link) return;

      trackingWindow.gtag?.("event", "click_to_order", {
        event_category: "engagement",
        event_label: link.textContent?.trim() || "Pedido Anota Aí",
        link_url: link.href,
      });
      trackingWindow.fbq?.("track", "Lead", {
        content_name: "Clique para pedir no Anota Aí",
      });
    };

    document.addEventListener("click", trackOrderClick);
    return () => {
      document.removeEventListener("click", trackOrderClick);
      window.removeEventListener(CONSENT_EVENT, onConsentChange);
    };
  }, []);

  return null;
}
