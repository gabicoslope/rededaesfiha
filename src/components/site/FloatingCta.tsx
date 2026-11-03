import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ORDER_URL } from "./data";

export function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-[4.75rem] z-50 h-12 min-w-0 bg-gold px-3 text-espresso shadow-lg md:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          Pedir agora
        </motion.a>
      )}
    </AnimatePresence>
  );
}
