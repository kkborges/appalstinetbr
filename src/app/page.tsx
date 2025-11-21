"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShoppingBag, Store, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirecionar automaticamente se já estiver logado
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      switch (session.user.role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "PROVIDER":
          router.push("/provider/dashboard");
          break;
        case "CLIENT":
          router.push("/marketplace");
          break;
        default:
          break;
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Marketplace Local</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Conectando você aos melhores serviços locais
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre fornecedores próximos, gerencie seu negócio ou administre toda a plataforma
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Cliente/Consumidor */}
          <Link
            href="/marketplace"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Cliente / Consumidor
              </h3>
              <p className="text-gray-600 mb-6">
                Busque e compre produtos de fornecedores próximos a você. Avalie serviços e acompanhe seus pedidos.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                Acessar Marketplace
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Fornecedor/Prestador */}
          <Link
            href="/auth/login?redirect=/provider/dashboard"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Store className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fornecedor / Prestador
              </h3>
              <p className="text-gray-600 mb-6">
                Cadastre seus produtos, gerencie pedidos, crie campanhas e expanda seu negócio localmente.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                Acessar Painel
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Administração */}
          <Link
            href="/auth/login?redirect=/admin/dashboard"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-red-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Painel Administrativo
              </h3>
              <p className="text-gray-600 mb-6">
                Gerencie fornecedores, usuários, categorias, verificação fiscal e todas as configurações da plataforma.
              </p>
              <div className="flex items-center text-red-600 font-medium group-hover:translate-x-2 transition-transform">
                Acessar Admin
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-12">Por que escolher nossa plataforma?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="p-6">
              <div className="text-4xl mb-4">📍</div>
              <h4 className="font-bold text-gray-900 mb-2">Busca por Localização</h4>
              <p className="text-sm text-gray-600">Encontre fornecedores próximos a você com busca geolocalizada</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="font-bold text-gray-900 mb-2">Verificação Fiscal</h4>
              <p className="text-sm text-gray-600">Todos os fornecedores passam por verificação de documentos</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="font-bold text-gray-900 mb-2">Avaliações</h4>
              <p className="text-sm text-gray-600">Sistema de avaliações para garantir qualidade</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💼</div>
              <h4 className="font-bold text-gray-900 mb-2">Gestão Completa</h4>
              <p className="text-sm text-gray-600">Ferramentas profissionais para fornecedores gerenciarem negócios</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Marketplace Local. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
