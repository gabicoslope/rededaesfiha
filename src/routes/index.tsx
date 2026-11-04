import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Preloader } from "@/components/site/Preloader";
import { BannerCarousel } from "@/components/site/BannerCarousel";
import { InfoStrip } from "@/components/site/InfoStrip";
import {
  AmbientSection,
  CouponSection,
  FloatingCta,
  FloatingWhatsApp,
  Footer,
  Hero,
  LocationSection,
  MenuSection,
  ReviewsSection,
} from "@/components/site/Sections";
import boardAsset from "@/assets/IMGP9352.jpg";
import heroMesa from "@/assets/hero-mesa.webp";
import heroMesaMobile from "@/assets/hero-mesa-mobile.webp";
import {
  ADDRESS,
  INSTAGRAM_URL,
  ORDER_URL,
  WHATSAPP_URL,
} from "@/components/site/data";

const title = "Rede da Esfiha Vila Moraes | peça online";
const description =
  "Esfihas, pizzas, hambúrguers e muito mais. Peça agora pelo delivery da Rede da Esfiha Vila Moraes e receba quentinho em casa.";
const socialImage = "https://site.rededaesfiha.com.br/og-image.jpg";

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
  sameAs: [INSTAGRAM_URL, WHATSAPP_URL],
};

export const Route = createFileRoute("/")({
  head: () => ({
    // a foto do topo começa a baixar junto com a página (é o maior elemento da tela)
    links: [
      { rel: "preload", as: "image", href: heroMesaMobile, media: "(max-width: 767px)", fetchPriority: "high" },
      { rel: "preload", as: "image", href: heroMesa, media: "(min-width: 768px)", fetchPriority: "high" },
      { rel: "canonical", href: "https://site.rededaesfiha.com.br/" },
    ],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Rede da Esfiha Vila Moraes: esfihas, pizzas e lanches no delivery e no salão" },
      { property: "og:url", content: "https://site.rededaesfiha.com.br/" },
      { property: "og:site_name", content: "Rede da Esfiha Vila Moraes" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [
      // a tela de abertura aparece só na primeira visita da sessão; nas outras, some antes de pintar
      {
        children:
          "try{if(sessionStorage.getItem('rde-abertura')){document.documentElement.classList.add('sem-abertura')}else{sessionStorage.setItem('rde-abertura','1')}}catch(e){}",
      },
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
      <Preloader />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <InfoStrip />
        <MenuSection />
        <BannerCarousel />
        <AmbientSection />
        <CouponSection />
        <ReviewsSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingCta />
      <FloatingWhatsApp />
    </div>
  );
}
