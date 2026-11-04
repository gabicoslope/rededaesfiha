import boardAsset from "@/assets/cardapio/IMGP9352.webp";
import esfihaDoceAsset from "@/assets/cardapio/DSC09351-2.webp";
import pizzaSalgadaAsset from "@/assets/cardapio/DSC09574-2.webp";
import pizzaDoceAsset from "@/assets/cardapio/DSC00137-2.webp";
import pastelAsset from "@/assets/cardapio/DSC09700.webp";
import burgerAsset from "@/assets/cardapio/DSC09488-2.webp";
import sobremesaAsset from "@/assets/cardapio/DSC00039-2.webp";
import porcoesAsset from "@/assets/cardapio/DSC09760.webp";
import bebidasAsset from "@/assets/cardapio/DSC09622.webp";
import fogazzaAsset from "@/assets/cardapio/DSC09712-2.webp";
import beiruteAsset from "@/assets/cardapio/DSC09552.webp";
import combosAsset from "@/assets/cardapio/DSC09477.webp";

export const ORDER_URL = "https://pedido.anota.ai/loja/megaesfihacursino";
export const INSTAGRAM_URL = "https://www.instagram.com/rededaesfihavilamoraes_ofc/";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rede+da+Esfiha+Vila+Moraes+Avenida+do+Cursino+3216";
export const WHATSAPP_URL = "https://wa.me/5511964427506";
// WhatsApp de festas e eventos: Elaine, (11) 98341-7628 (passado pelo João em 04/11)
export const EVENTS_WHATSAPP_URL = `https://wa.me/5511983417628?text=${encodeURIComponent("Olá, Elaine! Quero fazer meu aniversário/confraternização na Rede da Esfiha Vila Moraes. Pode me passar informações?")}`;
export const ADDRESS = "Avenida do Cursino, 3216 – Vila Moraes, São Paulo – SP";
export const COUPON = "CUPOMSITE25";

// Preço "a partir de" de cada categoria e dados de entrega: preencher com os valores do Anota Aí.
// Enquanto estiverem vazios, o site mostra um campo amarelo "a preencher" no lugar.
export const DELIVERY = {
  bairros: "", // ex.: "Vila Moraes, Cursino, Saúde, Sacomã e região"
  taxa: "", // ex.: "R$ 5,00"
  tempo: "", // ex.: "40 a 60 min"
};

export const categories: { name: string; src: string; alt: string; price?: string }[] = [
  { name: "Esfihas Abertas Salgadas", price: "R$ 4,00", src: boardAsset, alt: "Tábua com esfihas abertas salgadas variadas, com recheios de carne, queijo e calabresa" },
  { name: "Esfihas Abertas Doces", price: "R$ 7,90", src: esfihaDoceAsset, alt: "Esfiha aberta doce com cobertura de chocolate derretido" },
  { name: "Pizzas Salgadas", price: "R$ 46,00", src: pizzaSalgadaAsset, alt: "Pizza salgada metade calabresa e metade mussarela sobre tábua de madeira" },
  { name: "Pizzas Doces", price: "R$ 45,00", src: pizzaDoceAsset, alt: "Pizza doce com cobertura de chocolate e confeitos" },
  { name: "Pastéis e Salgados", price: "R$ 4,00", src: pastelAsset, alt: "Pastel frito dourado e crocante servido em prato" },
  { name: "Fogazzas", price: "R$ 14,00", src: fogazzaAsset, alt: "Fogazza assada com massa fofinha e recheio generoso" },
  { name: "Hambúrguers", price: "R$ 20,00", src: burgerAsset, alt: "Hambúrguer duplo com queijo derretido, alface e pão brioche" },
  { name: "Beirutes", price: "R$ 49,00", src: beiruteAsset, alt: "Sanduíche beirute com pão sírio, carne, queijo e salada" },
  { name: "Porções", price: "R$ 35,00", src: porcoesAsset, alt: "Porção de carnes mistas com acompanhamentos em tábua" },
  { name: "Sobremesas", price: "R$ 10,00", src: sobremesaAsset, alt: "Petit gâteau com calda de chocolate escorrendo" },
  { name: "Bebidas", price: "R$ 5,00", src: bebidasAsset, alt: "Milkshake cremoso com chantilly em copo alto" },
  { name: "Combos", src: combosAsset, alt: "Mesa com variedade de esfihas salgadas e doces e caneca da Rede da Esfiha" },
];

export const reviews = [
  {
    name: "Zoraide Polonio da Silva",
    meta: "2 avaliações",
    when: "9 meses atrás",
    tags: "Refeição no local  |  Outro  |  R$ 140–160",
    text: "Excelente ambiente. Refeição caprichada. Gratidão em especial para Vinícius que nos atendeu maravilhosamente bem. Todos os atendentes muito educados.",
  },
  {
    name: "Brenda Cardoso",
    meta: "Local Guide · 11 avaliações",
    when: "10 meses atrás",
    tags: "Refeição no local  |  R$ 60–80",
    text: "Primeira vez na rede da esfiha cursino e fomos super bem atendidos. Local limpo e confortável, esfiha e pizza deliciosas e chegaram rápido e quentinhas. Queremos reforçar o elogio ao atendimento, principalmente ao Vinicius, que foi super cuidadoso, cordial e atencioso com nosso pedido.",
  },
  {
    name: "Nubia Barros",
    meta: "Local Guide · 45 avaliações",
    when: "um ano atrás",
    tags: "Outro  |  R$ 80–100",
    text: "Atendimento excelente! Fui muito bem recebida logo na entrada, com simpatia e agilidade. O ambiente é limpo, organizado e super aconchegante. Os lanches são caprichados, bem servidos e com ingredientes de qualidade. Recomendo com certeza. Voltarei mais vezes!",
  },
  {
    name: "Giuliana V.",
    meta: "Local Guide · 340 avaliações · 62 fotos",
    when: "5 meses atrás",
    tags: "Refeição no local",
    text: "Atendimento maravilhoso. Funcionária Carla nota 10 que me atendeu. Música boa. Espaço limpo. Abre 24hs de fds. Açaí pequeno feito com carinho.",
  },
  {
    name: "Alfredo Cascini",
    meta: "Local Guide · 92 avaliações · 2 fotos",
    when: "4 meses atrás",
    tags: "Refeição no local",
    text: "Top, bem servido, pizza e esfihas, perfeitas, muito bem atendido, indico a todos, muito família, local top para juntar e se divertir.",
  },
  {
    name: "Mauricio de Moraes Vitorino",
    meta: "6 avaliações · 6 fotos",
    when: "10 meses atrás",
    tags: "Refeição no local",
    text: "Mt bom. Pratos bons em preços legais, lugares para crianças, entregas rápidas.",
  },
];
