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
  },
};

export default nextConfig;
