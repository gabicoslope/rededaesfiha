import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "loja" | "delivery" | "closed";

function getStatus(now = new Date()): Status {
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;

  // Loja: 08:00 até 04:00 do dia seguinte
  const lojaOpen = time >= 8 || time < 4;
  // Delivery: 18:00 até 02:00 do dia seguinte
  const deliveryOpen = time >= 18 || time < 2;

  if (deliveryOpen) return "delivery";
  if (lojaOpen) return "loja";
  return "closed";
}

const labels: Record<Status, string> = {
  loja: "Loja aberta",
  delivery: "Delivery aberto",
  closed: "Fechado no momento",
};

export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("loja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStatus(getStatus());
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const open = status !== "closed";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm md:text-sm",
        open
          ? "border-gold bg-gold text-espresso"
          : "border-gold bg-gold text-espresso",
        className,
      )}
    >
      <Clock className="size-3.5 md:size-4" />
      <span className="relative flex items-center">
        <span
          className={cn(
            "mr-2 inline-block size-2 rounded-full",
            open ? "bg-espresso" : "bg-espresso/50",
          )}
          aria-hidden="true"
        >
          {open && (
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-espresso opacity-75" />
          )}
        </span>
        {labels[status]}
      </span>
    </span>
  );
}
