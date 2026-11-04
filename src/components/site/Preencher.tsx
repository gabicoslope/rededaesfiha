import type { ReactNode } from "react";

// Marca em amarelo um dado que só a loja pode informar (preço, CNPJ, bairros...).
// Some sozinho quando o valor real é colocado no lugar. Busque por <Preencher> no projeto
// pra achar tudo o que falta antes de publicar.
export function Preencher({ children }: { children: ReactNode }) {
  return (
    <mark title="A preencher com o dado real da loja" className="bg-gold/55 px-1 font-semibold text-espresso">
      {children}
    </mark>
  );
}
