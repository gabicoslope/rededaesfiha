import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { BannerCarousel } from "@/components/site/BannerCarousel";
import {
  AmbientSection,
  CouponSection,
  FloatingCta,
  FloatingWhatsApp,
  Footer,
  Hero,
  LocationSection,
  MenuSection,
  OrderSection,
  ReviewsSection,
} from "@/components/site/Sections";
import boardAsset from "@/assets/IMGP9352.jpg";
import {
  ADDRESS,
  INSTAGRAM_URL,
  ORDER_URL,
  WHATSAPP_URL,
} from "@/components/site/data";

const title = "Rede da Esfiha Vila Moraes | peça online";
const description =
  "Esfihas, pizzas, hambúrguers e muito mais. Peça agora pelo delivery da Rede da Esfiha Vila Moraes e receba quentinho em casa.";
const socialImage = "https://site.rededaesfiha.com.br/og-logo.png";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Rede da Esfiha Vila Moraes",
  image: boardAsset,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida do Cursino, 3216",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  telephone: "+5511964427506",
  url: "https://site.rededaesfiha.com.br",
  menu: ORDER_URL,
  servesCuisine: ["Middle Eastern", "Brazilian", "Fast Food"],
  priceRange: "$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "04:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.0",
    reviewCount: "895",
  },
  sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: socialImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: socialImage },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-w-0 overflow-x-clip bg-champagne">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <BannerCarousel />
        <AmbientSection />
        <CouponSection />
        <ReviewsSection />
        <OrderSection />
        {/* Avaliações fora por enquanto (pedido da Gabi em 02/11); o componente continua em ReviewsSection.tsx */}
        <LocationSection />
      </main>
      <Footer />
      <FloatingCta />
      <FloatingWhatsApp />
    </div>
  );
}
