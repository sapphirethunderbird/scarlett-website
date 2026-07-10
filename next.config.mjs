/** @type {import('next').NextConfig} */
const nextConfig = {
  // Runs as a self-contained Node app behind Caddy on the server.
  output: "standalone",
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
