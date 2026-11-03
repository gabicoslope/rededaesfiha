import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { WHATSAPP_URL } from "@/components/site/data";

const title = "Política de Privacidade | Rede da Esfiha Vila Moraes";
const description =
  "Como a Rede da Esfiha Vila Moraes trata dados pessoais: pedidos pelo Anota Aí e contato pelo WhatsApp.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-champagne">
      <Header />
      <main className="bg-champagne section-y">
        <div className="container-page max-w-3xl">
          <Reveal>
            <h1 className="heading-display text-burgundy">Política de Privacidade</h1>
            <div className="gold-rule mt-5" />
          </Reveal>

          <Reveal delay={0.08} className="mt-10 space-y-8 text-sm leading-relaxed text-espresso/85 md:text-base">
            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                1. Dados de pagamento
              </h2>
              <p className="mt-2">
                Este site não coleta dados de pagamento — todo o processo de pedido
                e pagamento ocorre na plataforma Anota Aí.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                2. Dados de contato
              </h2>
              <p className="mt-2">
                Eventuais dados de contato fornecidos voluntariamente (como número
                de WhatsApp) são usados exclusivamente para comunicação com a Rede
                da Esfiha Vila Moraes e não são compartilhados com terceiros para
                fins de marketing sem consentimento.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-base font-bold text-burgundy md:text-lg">
                3. Dúvidas sobre seus dados
              </h2>
              <p className="mt-2">
                Para dúvidas sobre seus dados, entre em contato pelo WhatsApp{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-link font-bold text-burgundy"
                >
                  (11) 96442-7506
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
