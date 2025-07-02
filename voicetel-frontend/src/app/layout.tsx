import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/disable-announcer.css"; // Import CSS to disable route announcer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voicetel - Locuções de alta qualidade para URA e espera telefônica",
  description: "Serviços profissionais de locução para URA, espera telefônica e locuções com voz IA. Qualidade, agilidade e personalização.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4338ca" },
    { media: "(prefers-color-scheme: dark)", color: "#312e81" }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Voicetel",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Componente vazio para substituir o route announcer */}
        <div id="__next-route-announcer__" aria-hidden="true" style={{ display: 'none' }}></div>
        {children}
      </body>
    </html>
  );
}
