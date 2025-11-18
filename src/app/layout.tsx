import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Location Marketplace - Encontre fornecedores e serviços próximos",
  description: "Marketplace baseado em geolocalização que conecta você a fornecedores e prestadores de serviços na sua região.",
  keywords: ["marketplace", "localização", "fornecedores", "serviços", "geolocalização"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
