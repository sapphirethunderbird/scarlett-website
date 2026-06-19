/** @type {import('next').NextConfig} */
const nextConfig = {
  // Runs as a self-contained Node app behind Caddy on the server.
  output: "standalone",
  // The live chat backend (already deployed) is reverse-proxied by Caddy at /api/chat.
  // Next serves everything else; we never reimplement that endpoint here.
};

export default nextConfig;
