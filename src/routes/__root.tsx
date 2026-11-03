import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Tracking } from "../components/site/Tracking";
import { CookieBanner } from "../components/site/CookieBanner";
import { ORDER_URL } from "../components/site/data";
import logoUrl from "@/assets/logo-rede-da-esfiha.webp";

// Página "não encontrada" quando a navegação acontece dentro do site.
// No servidor (cPanel), endereços que não existem caem no public/404.html, com o mesmo visual.
function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-burgundy px-4 py-10 text-center text-brand-white">
      <div className="max-w-lg">
        <img src={logoUrl} alt="Rede da Esfiha Vila Moraes" width={420} height={399} className="genio-flutua mx-auto w-44" />
        <p aria-hidden="true" className="mt-2 font-display text-[clamp(5rem,22vw,9rem)] font-bold leading-[0.9] text-gold">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">Essa página sumiu como mágica</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-brand-white/90">
          Nem o gênio conseguiu achar o que você procurou. Mas o cardápio continua no mesmo lugar, e quentinho.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-base bg-gold text-espresso hover:bg-gold-contrast">
            Voltar para o início
          </Link>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-base bg-brand-white/15 text-brand-white hover:bg-brand-white/25">
            Fazer pedido
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rede da Esfiha Vila Moraes" },
      {
        name: "description",
        content:
          "Esfiharia na Vila Moraes, São Paulo: esfihas abertas, pizzas, pastéis e combos com delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Tracking />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieBanner />
    </QueryClientProvider>
  );
}
