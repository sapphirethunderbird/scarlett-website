/** @type {import('next').NextConfig} */
const nextConfig = {
  // Runs as a self-contained Node app behind Caddy on the server.
  output: "standalone",
  /**
   * English keeps the bare URLs the site has always had ("/", "/about"); the
   * pages themselves live under `app/[locale]`, so a bare path is rewritten onto
   * "/en". Prefixed paths ("/ja/about", "/en/about") already match the route
   * tree and pass through. Rewrite, not redirect: the browser URL stays bare.
   *
   * This must be a config rewrite, not a proxy.ts (middleware) one. Behind Caddy
   * the proxy builds its rewrite URL as https://localhost:PORT (from
   * X-Forwarded-Proto), which never matches the server's own 127.0.0.1 origin,
   * so Next treats it as external and proxies over TLS to its own plain-HTTP
   * port — every bare path 500s. Config rewrites resolve internally.
   *
   * Excluded: the locale segments (keep in sync with LOCALES in
   * lib/i18n/config.ts), API routes (Caddy proxies /api/* to the chat backend and
   * carves out /api/contact for this app), Next's own assets, and files served
   * straight out of public/ — matched by having a dot in the path.
   */
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        {
          source: "/:path((?!(?:en|ja)(?:/|$)|api/|_next/|.*\\.).+)",
          destination: "/en/:path",
        },
      ],
    };
  },
  // Caddy proxies /api/* to the external chat backend, except /api/contact which is
  // carved out to this Next app. The standalone tracer misses resend (and its deps),
  // so force them into the bundle or the /api/contact route 500s on import at runtime.
  outputFileTracingIncludes: {
    "/api/contact": [
      "./node_modules/resend/**/*",
      "./node_modules/postal-mime/**/*",
      "./node_modules/standardwebhooks/**/*",
    ],
    // better-sqlite3 is a native module the tracer also misses. The hub
    // ("/personality") reads the DB too, for its live running teaser.
    "/personality/running": [
      "./node_modules/better-sqlite3/**/*",
      "./node_modules/bindings/**/*",
      "./node_modules/file-uri-to-path/**/*",
    ],
    "/personality": [
      "./node_modules/better-sqlite3/**/*",
      "./node_modules/bindings/**/*",
      "./node_modules/file-uri-to-path/**/*",
    ],
  },
};

export default nextConfig;
