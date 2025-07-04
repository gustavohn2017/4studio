import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "4Studio - Locuções de alta qualidade para URA e espera telefônica",
  description: "Serviços profissionais de locução para URA, espera telefônica e locuções com voz IA. Qualidade, agilidade e personalização.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "4Studio",
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-route-announcer-disabled="true">
      <head>
        {/* 
          Meta tag para desabilitar o anúncio de navegação para leitores de tela.
          Isso efetivamente desativa o route announcer do Next.js.
        */}
        <meta name="next-route-announcer" content="disable" />
        <meta name="route-announcer" content="disable" />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased font-sans`}
      >
        {/* Componente vazio para substituir o route announcer */}
        <div id="__next-route-announcer__" aria-hidden="true" style={{ display: 'none' }}></div>
        {children}
      </body>
    </html>
  );
}
