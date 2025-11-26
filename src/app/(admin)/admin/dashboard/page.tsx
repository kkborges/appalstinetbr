"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Store,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardStats {
  stats: {
    providers: { total: number; pending: number; active: number; inactive: number; growth: number };
    users: { total: number; active: number; inactive: number; growth: number };
    orders: { total: number; pending: number; completed: number; cancelled: number; growth: number };
    revenue: { total: number; thisMonth: number; growth: number };
  };
  pendingProviders: any[];
  topCategories: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">Erro ao carregar estatísticas</p>
        </div>
      </div>
    );
  }

  const { stats } = data;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-1">
          Visão geral da plataforma e métricas principais
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fornecedores</CardTitle>
            <Store className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.providers.total}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs flex items-center gap-1 ${stats.providers.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.providers.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stats.providers.growth}%
              </span>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              <div>{stats.providers.active} ativos • {stats.providers.pending} pendentes</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs flex items-center gap-1 ${stats.users.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.users.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stats.users.growth}%
              </span>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              <div>{stats.users.active.toLocaleString()} ativos • {stats.users.inactive} inativos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders.total.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs flex items-center gap-1 ${stats.orders.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.orders.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stats.orders.growth}%
              </span>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              <div>{stats.orders.pending} pendentes • {stats.orders.completed.toLocaleString()} concluídos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats.revenue.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs flex items-center gap-1 ${stats.revenue.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.revenue.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stats.revenue.growth}%
              </span>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
            <div className="mt-3 text-xs text-gray-600">
              <div>R$ {stats.revenue.thisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pending Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Fornecedores Pendentes ({stats.providers.pending})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.pendingProviders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhum fornecedor pendente
              </p>
            ) : (
              <div className="space-y-3">
                {data.pendingProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{provider.tradeName || provider.legalName}</p>
                      <p className="text-xs text-gray-500">
                        {provider.categories[0]?.category.name || 'Sem categoria'} •
                        {new Date(provider.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Aguardando aprovação
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Principais Categorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.topCategories.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma categoria cadastrada
              </p>
            ) : (
              <div className="space-y-3">
                {data.topCategories.slice(0, 5).map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{category.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                        <span>{category._count.providers} fornecedores</span>
                        <span>•</span>
                        <span>{category._count.products} produtos</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-600">
                        {category._count.providers}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
