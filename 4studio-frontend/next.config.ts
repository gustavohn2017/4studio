import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Em ambiente de produção, preferível resolver erros ao invés de ignorar
  eslint: {
    // Ignorar erros apenas em desenvolvimento
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    // Ignorar erros apenas em desenvolvimento
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  // Configuração de imagens e mídia
  images: {
    domains: ['localhost', 'api.4studio.com.br'],
  }
};

export default nextConfig;
