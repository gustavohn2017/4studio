import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

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
    domains: ['localhost', 'api.4studio.com.br'],
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
