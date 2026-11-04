import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Sections";
import { OPEN_COOKIE_PREFERENCES } from "@/components/site/CookieBanner";
import { ADDRESS, WHATSAPP_URL } from "@/components/site/data";

const title = "Política de Privacidade | Rede da Esfiha Vila Moraes";
const description =
  "Como a Rede da Esfiha Vila Moraes trata dados pessoais e cookies neste site, e como exercer seus direitos pela LGPD.";

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
    links: [{ rel: "canonical", href: "https://site.rededaesfiha.com.br/privacidade" }],
  }),
  component: PrivacyPage,
});

// Dados que só a loja pode informar. Ficam destacados em amarelo até serem preenchidos.
function Preencher({ children }: { children: ReactNode }) {
  return <mark className="bg-gold/50 px-1 font-semibold text-espresso">{children}</mark>;
}

function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-burgundy md:text-3xl">{titulo}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

const cookies = [
  { nome: "rde-cookie-consent", quem: "Este site", tipo: "Essencial", para: "Guardar a sua escolha sobre cookies", prazo: "Até você limpar os dados do navegador" },
  { nome: "rde-abertura", quem: "Este site", tipo: "Essencial", para: "Mostrar a animação de abertura só uma vez por visita", prazo: "Até fechar a aba" },
  { nome: "_ga, _ga_*", quem: "Google Analytics", tipo: "Análise (opcional)", para: "Contar visitas e cliques, sem identificar você pelo nome", prazo: "Até 2 anos" },
  { nome: "_fbp", quem: "Meta (Facebook/Instagram)", tipo: "Marketing (opcional)", para: "Medir o resultado de anúncios e promoções", prazo: "Até 3 meses" },
];

function PrivacyPage() {
  return (
    <div className="bg-champagne">
      <Header />
      <main id="conteudo" tabIndex={-1} className="bg-champagne section-y outline-none">
        <div className="container-page max-w-3xl">
          <h1 className="heading-display text-burgundy">Política de Privacidade</h1>
          <p className="mt-3 text-base text-espresso/75">Atualizada em 4 de novembro de 2026.</p>

          <div className="mt-10 space-y-10 text-base leading-relaxed text-espresso/90">
            <Bloco titulo="1. Quem somos">
              <p>
                Este site é da <strong>Rede da Esfiha Vila Moraes</strong> (<Preencher>razão social</Preencher>, CNPJ{" "}
                <Preencher>00.000.000/0000-00</Preencher>), com endereço na {ADDRESS}. Somos os responsáveis
                (controladores) pelos dados tratados aqui, nos termos da Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).
              </p>
            </Bloco>

            <Bloco titulo="2. Que dados este site usa">
              <p>
                O site <strong>não tem cadastro, formulário nem pagamento</strong>. Os pedidos e pagamentos acontecem no{" "}
                <strong>Anota Aí</strong>, que tem a própria política de privacidade.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Conversas pelo WhatsApp:</strong> se você nos chama, recebemos seu número, nome de perfil e o que
                  você escrever. Usamos só para responder e atender o seu pedido ou reserva.
                </li>
                <li>
                  <strong>Cookies opcionais:</strong> só se você aceitar, o Google Analytics e o Meta Pixel registram dados
                  de navegação (páginas vistas, cliques, tipo de aparelho e cidade aproximada).
                </li>
              </ul>
            </Bloco>

            <Bloco titulo="3. Para que usamos e com qual base legal">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Atender pedidos, reservas e dúvidas</strong> pelo WhatsApp: para cumprir o que você pediu
                  (art. 7º, V, da LGPD).
                </li>
                <li>
                  <strong>Medir visitas e o resultado das promoções</strong> (cookies de análise e marketing): só com o seu
                  consentimento (art. 7º, I). Você pode retirar quando quiser.
                </li>
              </ul>
              <p>Não vendemos dados e não usamos seus dados para decisões automáticas sobre você.</p>
            </Bloco>

            <Bloco titulo="4. Cookies deste site">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-espresso/20">
                      <th className="py-2 pr-3 font-bold">Nome</th>
                      <th className="py-2 pr-3 font-bold">De quem</th>
                      <th className="py-2 pr-3 font-bold">Tipo</th>
                      <th className="py-2 pr-3 font-bold">Para quê</th>
                      <th className="py-2 font-bold">Por quanto tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.map((c) => (
                      <tr key={c.nome} className="border-b border-espresso/10 align-top">
                        <td className="py-2 pr-3 font-mono text-[13px]">{c.nome}</td>
                        <td className="py-2 pr-3">{c.quem}</td>
                        <td className="py-2 pr-3">{c.tipo}</td>
                        <td className="py-2 pr-3">{c.para}</td>
                        <td className="py-2">{c.prazo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Os cookies opcionais vêm <strong>desligados</strong> e só funcionam se você aceitar. Para mudar sua escolha a
                qualquer momento:
              </p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES))}
                className="btn-base bg-espresso text-brand-white hover:bg-espresso/85"
              >
                Mudar minhas escolhas de cookies
              </button>
            </Bloco>

            <Bloco titulo="5. Com quem os dados são compartilhados">
              <p>
                Com os serviços que fazem o site e o atendimento funcionarem: <strong>Anota Aí</strong> (pedidos),{" "}
                <strong>WhatsApp/Meta</strong> (conversas), <strong>Google</strong> e <strong>Meta</strong> (medição, só com
                o seu aceite) e a empresa de hospedagem do site. Google e Meta podem guardar dados fora do Brasil, com as
                proteções previstas no art. 33 da LGPD.
              </p>
            </Bloco>

            <Bloco titulo="6. Por quanto tempo guardamos">
              <p>
                Conversas do WhatsApp ficam pelo tempo necessário para atender você e cumprir obrigações legais. Os dados dos
                cookies seguem os prazos da tabela acima.
              </p>
            </Bloco>

            <Bloco titulo="7. Seus direitos">
              <p>Pela LGPD (art. 18), você pode pedir a qualquer momento:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>confirmação de que tratamos seus dados e acesso a eles;</li>
                <li>correção de dados incompletos ou errados;</li>
                <li>anonimização, bloqueio ou eliminação do que for desnecessário;</li>
                <li>portabilidade dos dados;</li>
                <li>informação sobre com quem compartilhamos;</li>
                <li>retirada do consentimento e eliminação dos dados tratados com base nele.</li>
              </ul>
              <p>
                Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD), em{" "}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-red-deep underline underline-offset-2">
                  gov.br/anpd
                </a>
                .
              </p>
            </Bloco>

            <Bloco titulo="8. Como falar com a gente">
              <p>
                Para qualquer pedido sobre seus dados, fale pelo WhatsApp{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-red-deep underline underline-offset-2">
                  (11) 96442-7506
                </a>{" "}
                ou pelo e-mail <Preencher>contato@rededaesfiha.com.br</Preencher>. Respondemos em até 15 dias.
              </p>
            </Bloco>

            <Bloco titulo="9. Mudanças nesta política">
              <p>Quando esta política mudar, a data no topo da página é atualizada.</p>
            </Bloco>

            <Link to="/" className="btn-base bg-burgundy text-brand-white hover:bg-brand-red-deep">
              Voltar para o início
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
