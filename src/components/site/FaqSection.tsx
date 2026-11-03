import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

const FAQ_ITEMS = [
  {
    question: "Qual o pedido mínimo?",
    answer: "R$ 19,99.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer:
      "Pix, cartão de crédito e débito, dinheiro, e vale-refeição/alimentação (VR, Sodexo, Alelo, Ticket Restaurante).",
  },
  {
    question: "Qual o horário de funcionamento?",
    answer: "Todos os dias. Loja aberta das 08h às 04h, delivery das 18h às 02h.",
  },
  {
    question: "Como uso o cupom de desconto?",
    answer:
      "Copie o código na seção de cupom desta página e cole no campo de cupom ao finalizar seu pedido pelo Anota Aí. O desconto é de 25% nos produtos, em pedidos a partir de R$ 50.",
  },
  {
    question: "Como faço meu pedido?",
    answer:
      "Escolha uma categoria no cardápio, clique para ser redirecionado ao Anota Aí, monte seu pedido e finalize por lá.",
  },
  {
    question: "Vocês entregam no meu bairro?",
    answer: "[RESPOSTA]",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-champagne section-y">
      <div className="container-page min-w-0 max-w-3xl">
        <Reveal className="text-center">
          <h2 className="heading-display text-burgundy">Perguntas frequentes</h2>
          <div className="gold-rule mt-5" />
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="mt-8 min-w-0 md:mt-10">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`faq-${i}`}
                className="mb-3 min-w-0 overflow-hidden rounded-2xl border border-gold/40 bg-espresso/5 px-4 last:border-b sm:px-5"
              >
                <AccordionTrigger className="min-w-0 gap-3 py-4 text-left text-base font-semibold text-burgundy hover:no-underline md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-0 text-sm leading-relaxed text-espresso/80 md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
