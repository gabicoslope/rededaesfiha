import { motion, useReducedMotion } from "motion/react";

// Título que entra palavra por palavra (cada uma sobe de dentro de uma "janela"),
// no mesmo espírito do "Entra. Pega. Paga." do site do Good Money. Repete quando
// a pessoa chega na seção (só na primeira vez).
export function Palavras({ children, delay = 0, stagger = 0.08 }: { children: string; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  const words = children.split(" ");
  if (reduce) return <>{children}</>;

  return (
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{children}</span>
      {words.map((w, i) => (
        <span key={i}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "105%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
