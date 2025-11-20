import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const apiHostname = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname
  : 'localhost';

const imageDomains = ['localhost', 'api.4studio.com.br', apiHostname];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Permitir warnings durante o build para GitHub Pages
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Manter erros de TypeScript
  },
  // Configuração de imagens e mídia
  images: {
    domains: [...new Set(imageDomains)], // Usa Set para evitar duplicatas
    unoptimized: isGitHubPages, // GitHub Pages doesn't support Image Optimization
  },
  // Configuração para GitHub Pages
  ...(isGitHubPages && {
    basePath: '/4studio',
    assetPrefix: '/4studio/',
    output: 'export',
    trailingSlash: true,
  }),
};

export default nextConfig;
