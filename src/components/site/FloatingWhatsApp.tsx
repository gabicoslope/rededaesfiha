import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SendHorizontal, X } from "lucide-react";
import logoUrl from "@/assets/logo-rede-da-esfiha.png";
import { EVENTS_WHATSAPP_URL, WHATSAPP_URL } from "./data";

// Botão do WhatsApp que abre uma janelinha de conversa (como no site do Good Money):
// assuntos prontos e um campo livre; a mensagem vai escrita pro wa.me em janela nova.
const ASSUNTOS = [
  { label: "Quero fazer um pedido", msg: "Olá! Vim pelo site e quero fazer um pedido." },
  { label: "Quero reservar pra aniversário ou confraternização", msg: "Olá! Vim pelo site e quero reservar o espaço pra um aniversário/confraternização.", eventos: true },
  { label: "Como funciona o cashback?", msg: "Olá! Vim pelo site e queria saber como funciona o cashback." },
];

function waLink(msg: string, base = WHATSAPP_URL) {
  return `${base.split("?")[0]}?text=${encodeURIComponent(msg)}`;
}

const WA_ICON =
  "M16.04 3A12.84 12.84 0 0 0 5.09 22.55L3 30l7.64-2a12.83 12.83 0 1 0 5.4-25Zm0 23.52c-1.88 0-3.72-.5-5.33-1.45l-.38-.22-4.53 1.19 1.21-4.42-.25-.4a10.69 10.69 0 1 1 9.28 5.3Zm5.86-8.01c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.72.16-.21.32-.82 1.05-1.01 1.27-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.61 9.61 0 0 1-1.78-2.21c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.77 2.17-1.52.27-.74.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z";

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const [text, setText] = useState("");
  const seen = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // "digitando…" só na primeira vez que abre
  useEffect(() => {
    if (!open) return;
    if (seen.current || reduce) {
      setTyping(false);
      return;
    }
    seen.current = true;
    setTyping(true);
    const id = setTimeout(() => setTyping(false), 1100);
    return () => clearTimeout(id);
  }, [open, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t) && !(t as Element).closest?.("[data-wa-toggle]")) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const send = (msg: string, base?: string) => {
    window.open(waLink(msg, base), "_blank", "noopener,noreferrer");
    setOpen(false);
    setText("");
  };

  return (
    <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[60] md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Conversar pelo WhatsApp"
            className="absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(22rem,calc(100vw-1.5rem))] origin-bottom-right overflow-hidden rounded-2xl bg-[#efe7dd] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)]"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
              <img src={logoUrl} alt="" className="size-10 rounded-full bg-white object-contain p-0.5" width={420} height={399} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">Rede da Esfiha Vila Moraes</p>
                <p className="text-xs text-white/80">{typing ? "digitando…" : "online"}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fechar conversa" className="grid size-8 place-items-center rounded-full hover:bg-white/15">
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-2 px-3 py-4">
              <AnimatePresence mode="wait" initial={false}>
                {typing ? (
                  <motion.div key="dots" className="flex w-fit gap-1 rounded-lg bg-white px-3 py-3" exit={{ opacity: 0 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-[#8a8a8a]"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="msg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                    <p className="w-fit max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-[#111]">
                      Oi! Que bom te ver por aqui. Como podemos ajudar?
                    </p>
                    <div className="flex flex-col items-end gap-1.5 pt-1">
                      {ASSUNTOS.map((a) => (
                        <button
                          key={a.label}
                          type="button"
                          onClick={() => send(a.msg, a.eventos ? EVENTS_WHATSAPP_URL : undefined)}
                          className="max-w-[90%] rounded-full border border-[#075E54]/30 bg-white px-3.5 py-2 text-right text-sm font-semibold text-[#075E54] transition-colors hover:bg-[#dcf8c6]"
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form
              className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (text.trim()) send(`Olá! Vim pelo site. ${text.trim()}`);
              }}
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escreva sua mensagem"
                aria-label="Sua mensagem"
                className="min-w-0 flex-1 rounded-full bg-white px-4 py-2 text-base text-[#111] outline-none placeholder:text-[#888] md:text-sm"
              />
              <button type="submit" aria-label="Enviar pelo WhatsApp" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1DA851] text-white transition-transform hover:scale-105">
                <SendHorizontal className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        data-wa-toggle
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fechar conversa do WhatsApp" : "Conversar pelo WhatsApp"}
        className="focus-gold grid size-12 place-items-center rounded-full bg-[#1DA851] text-white shadow-xl md:size-16"
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: [0.78, 1.08, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6 md:size-7" />
            </motion.span>
          ) : (
            <motion.svg key="wa" viewBox="0 0 32 32" aria-hidden="true" className="size-7 fill-current md:size-9" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
              <path d={WA_ICON} />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
