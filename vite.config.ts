// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerender: the whole site is presentational (no server functions, no API
    // routes), so every route is rendered to plain HTML at build time. The output can be
    // uploaded as-is to any static file host (cPanel/Apache).
    pages: [{ path: "/" }, { path: "/termos" }, { path: "/privacidade" }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
