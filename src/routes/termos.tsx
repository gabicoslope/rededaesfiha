import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { ADDRESS, WHATSAPP_URL } from "@/components/site/data";

const title = "Termos de Uso | Rede da Esfiha Vila Moraes";
const description =
  "Condições de uso do site da Rede da Esfiha Vila Moraes: pedidos, cupons, preços e responsabilidades.";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://site.rededaesfiha.com.br/termos" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-champagne">
      <Header />
      <main id="conteudo" tabIndex={-1} className="bg-champagne section-y outline-none">
        <div className="container-page max-w-3xl">
          <Reveal>
            <h1 className="heading-display text-burgundy">Termos de Uso</h1>
            <div className="gold-rule mt-5" />
          </Reveal>

          <Reveal delay={0.08} className="mt-10 space-y-8 text-sm leading-relaxed text-espresso/85 md:text-base">
            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                1. Sobre este site
              </h2>
              <p className="mt-2">
                Este site é um canal informativo da Rede da Esfiha Vila Moraes,
                situada em {ADDRESS}.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                2. Pedidos e pagamento
              </h2>
              <p className="mt-2">
                Os pedidos realizados através deste site são processados por meio da
                plataforma parceira Anota Aí (pedido.anota.ai), que possui seus
                próprios termos de uso e política de pagamento. A Rede da Esfiha
                Vila Moraes não realiza cobrança direta neste site.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                3. Preços e disponibilidade
              </h2>
              <p className="mt-2">
                Preços, disponibilidade de produtos e prazos de entrega estão
                sujeitos a alteração sem aviso prévio e devem ser confirmados no
                momento da finalização do pedido.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                4. Cupons de desconto
              </h2>
              <p className="mt-2">
                Cupons de desconto possuem regras e validade próprias, informadas
                junto à oferta.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                5. Contato
              </h2>
              <p className="mt-2">
                Dúvidas sobre estes termos podem ser enviadas pelo nosso{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-link font-bold text-burgundy"
                >
                  WhatsApp
                </a>
                .
              </p>
            </section>

            <Link to="/" className="btn-base bg-burgundy text-brand-white hover:bg-brand-red-deep">
              Voltar para o início
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
