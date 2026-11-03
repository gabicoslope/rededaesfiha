import { motion } from "motion/react";

const WHATSAPP_ORDER_URL =
  "https://wa.me/5511964427506?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20fazer%20um%20pedido!";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer pedido pelo WhatsApp"
      title="Fazer pedido pelo WhatsApp"
      className="focus-gold fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[60] grid size-12 place-items-center rounded-full bg-whatsapp text-champagne shadow-xl md:bottom-6 md:right-6 md:size-16"
      initial={{ opacity: 0, scale: 0.78 }}
      animate={{ opacity: 1, scale: [0.78, 1.08, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="size-7 fill-current md:size-9"
      >
        <path d="M16.04 3A12.84 12.84 0 0 0 5.09 22.55L3 30l7.64-2a12.83 12.83 0 1 0 5.4-25Zm0 23.52c-1.88 0-3.72-.5-5.33-1.45l-.38-.22-4.53 1.19 1.21-4.42-.25-.4a10.69 10.69 0 1 1 9.28 5.3Zm5.86-8.01c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.72.16-.21.32-.82 1.05-1.01 1.27-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.61 9.61 0 0 1-1.78-2.21c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.77 2.17-1.52.27-.74.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z" />
      </svg>
    </motion.a>
  );
}
