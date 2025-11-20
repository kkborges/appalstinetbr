import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";

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
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
