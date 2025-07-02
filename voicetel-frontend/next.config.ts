import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'voicetel-backend.local'], // Add your production domain here
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LOCALE: process.env.NEXT_PUBLIC_LOCALE || 'pt-BR',
  },
  reactStrictMode: true,
  eslint: {
    // Durante desenvolvimento, ignore ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Durante desenvolvimento, ignore TypeScript errors
    ignoreBuildErrors: true,
  },
  // Desabilita funções de acessibilidade indesejadas
  // Note: The a11y and disableRouteAnnouncer config is not needed in App Router
  // We're using the meta tag in layout.tsx and CSS to disable the route announcer
  // App Router no longer needs i18n config here
};

export default nextConfig;
