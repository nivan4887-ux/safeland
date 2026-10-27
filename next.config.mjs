/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  experimental: { optimizePackageImports: ["lucide-react", "recharts"] }
};

export default nextConfig;
