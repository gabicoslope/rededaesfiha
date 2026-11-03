// Artes do Daniel (02/11): computador 1920x800 (12:5) e celular 1280x720 (16:9), em WebP.
// A ordem e os links abaixo seguem a lista dele. Todos abrem em janela nova.
import { EVENTS_WHATSAPP_URL, INSTAGRAM_URL, ORDER_URL, WHATSAPP_URL } from "./data";

export type BannerId = "cupom" | "pedido" | "festas" | "cashback" | "dez-pedidos" | "instagram";
export interface BannerSlide {
  id: BannerId;
  eyebrow: string;
  headline: string;
  detail?: string;
  cta: string;
  href: string;
  theme: "red" | "black-yellow" | "yellow" | "black";
  rules?: string;
  desktopImage?: string;
  mobileImage?: string;
}

const artwork = import.meta.glob<string>("/src/assets/banners/*.{webp,jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default",
});

function imageFor(id: BannerId, size: "desktop" | "mobile") {
  return Object.entries(artwork).find(([path]) =>
    path.replace(/\.(webp|jpg|jpeg|png)$/, "").endsWith(`/banner-${id}-${size}`),
  )?.[1];
}

export const banners: BannerSlide[] = [
  { id: "cupom", eyebrow: "Cupom do site", headline: "Use o CUPOMSITE25 no seu pedido pelo Anota Aí e ganhe 25% de desconto. Pedido mínimo de R$ 50", cta: "Pedir com desconto", href: ORDER_URL, theme: "yellow" },
  { id: "pedido", eyebrow: "Peça agora", headline: "Faça seu pedido pelo Anota Aí ou WhatsApp, fácil, rápido e com benefícios exclusivos na unidade Vila Moraes", cta: "Pedir agora", href: ORDER_URL, theme: "red" },
  // TODO: trocar pelo WhatsApp de eventos quando o João definir (por enquanto vai pro WhatsApp da unidade)
  { id: "festas", eyebrow: "Festas e eventos", headline: "Faça seu aniversário ou confraternização na Rede da Esfiha Vila Moraes. Clique e faça sua reserva", cta: "Fazer reserva", href: EVENTS_WHATSAPP_URL, theme: "black" },
  { id: "cashback", eyebrow: "Cashback", headline: "Peça pelo nosso WhatsApp e ganhe cashback", cta: "Pedir pelo WhatsApp", href: WHATSAPP_URL, theme: "red" },
  { id: "dez-pedidos", eyebrow: "Benefícios exclusivos", headline: "Acumule 10 pedidos no mês e ganhe benefícios exclusivos", cta: "Saiba mais", href: WHATSAPP_URL, theme: "black-yellow" },
  { id: "instagram", eyebrow: "Instagram", headline: "Acompanhe nossas promoções pelo Instagram. Clique e siga", cta: "Seguir no Instagram", href: INSTAGRAM_URL, theme: "red" },
].map((slide) => ({
  ...slide,
  desktopImage: imageFor(slide.id as BannerId, "desktop"),
  mobileImage: imageFor(slide.id as BannerId, "mobile"),
})) as BannerSlide[];
