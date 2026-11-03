// Artes novas (02/11, à noite): uma versão só em 16:9 (1672x941); a do celular é a mesma
// arte reduzida pra 1080x608. A ordem e os links seguem a lista do Daniel. Todos abrem em janela nova.
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
  { id: "pedido", eyebrow: "Peça agora", headline: "Deu fome? Peça agora pelo Anota Aí ou WhatsApp. Seu pedido, do seu jeito", cta: "Pedir agora", href: ORDER_URL, theme: "red" },
  // TODO: trocar pelo WhatsApp de eventos quando o João definir (por enquanto vai pro WhatsApp da unidade)
  { id: "festas", eyebrow: "Festas e eventos", headline: "Sua comemoração é aqui! Aniversários e confraternizações na unidade Vila Moraes. Faça sua reserva", cta: "Fazer reserva", href: EVENTS_WHATSAPP_URL, theme: "black" },
  { id: "cashback", eyebrow: "Cashback", headline: "Peça pelo WhatsApp e ganhe cashback", cta: "Pedir pelo WhatsApp", href: WHATSAPP_URL, theme: "red" },
  { id: "dez-pedidos", eyebrow: "Benefícios exclusivos", headline: "Acumule 10 pedidos no mês e ganhe benefícios exclusivos", cta: "Saiba mais", href: WHATSAPP_URL, theme: "black-yellow" },
  { id: "instagram", eyebrow: "Instagram", headline: "Acompanhe nossas promoções pelo Instagram. Siga agora", cta: "Seguir no Instagram", href: INSTAGRAM_URL, theme: "red" },
].map((slide) => ({
  ...slide,
  desktopImage: imageFor(slide.id as BannerId, "desktop"),
  mobileImage: imageFor(slide.id as BannerId, "mobile"),
})) as BannerSlide[];
