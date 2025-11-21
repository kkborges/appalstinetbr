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

export default function AdminDashboardPage() {
  // Mock data
  const stats = {
    providers: { total: 156, pending: 12, active: 132, inactive: 12, growth: 8.5 },
    users: { total: 3420, active: 2890, inactive: 530, growth: 12.3 },
    orders: { total: 8923, pending: 45, completed: 8654, cancelled: 224, growth: 15.7 },
    revenue: { total: 234567.89, thisMonth: 45678.90, growth: 22.4 }
  };

  const recentActivities = [
    { id: 1, type: "provider", message: "Novo fornecedor cadastrado: Farmácia Vida", time: "5 min atrás", status: "pending" },
    { id: 2, type: "order", message: "Pedido #8923 concluído", time: "12 min atrás", status: "completed" },
    { id: 3, type: "user", message: "50 novos usuários registrados hoje", time: "1 hora atrás", status: "info" },
    { id: 4, type: "provider", message: "Fornecedor 'Mercado Central' aprovado", time: "2 horas atrás", status: "completed" },
    { id: 5, type: "fiscal", message: "Documento fiscal rejeitado - Padaria do Bairro", time: "3 horas atrás", status: "rejected" },
  ];

  const pendingProviders = [
    { id: 1, name: "Farmácia Vida", category: "Saúde", date: "2024-01-20", status: "Aguardando aprovação" },
    { id: 2, name: "Loja de Roupas Fashion", category: "Moda", date: "2024-01-20", status: "Aguardando documentos" },
    { id: 3, name: "Eletrônicos Tech", category: "Tecnologia", date: "2024-01-19", status: "Em análise" },
    { id: 4, name: "Pet Shop Amigo", category: "Pet", date: "2024-01-19", status: "Aguardando aprovação" },
  ];

  const topCategories = [
    { name: "Alimentação", providers: 45, orders: 3421, revenue: 89234.56 },
    { name: "Saúde", providers: 32, orders: 2156, revenue: 67890.12 },
    { name: "Serviços", providers: 28, orders: 1876, revenue: 45678.90 },
    { name: "Comércio", providers: 24, orders: 1234, revenue: 34567.89 },
  ];

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
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const getStatusIcon = () => {
                  switch (activity.status) {
                    case 'completed':
                      return <CheckCircle className="h-4 w-4 text-green-600" />;
                    case 'pending':
                      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
                    case 'rejected':
                      return <XCircle className="h-4 w-4 text-red-600" />;
                    default:
                      return <Clock className="h-4 w-4 text-blue-600" />;
                  }
                };

                return (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    {getStatusIcon()}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Fornecedores Pendentes ({stats.providers.pending})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingProviders.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{provider.name}</p>
                    <p className="text-xs text-gray-500">{provider.category} • {provider.date}</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {provider.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Categorias Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Categoria</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Fornecedores</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Pedidos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Receita</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((category, index) => {
                  const maxRevenue = Math.max(...topCategories.map(c => c.revenue));
                  const percentage = (category.revenue / maxRevenue) * 100;

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{category.name}</td>
                      <td className="py-4 px-4 text-gray-700">{category.providers}</td>
                      <td className="py-4 px-4 text-gray-700">{category.orders.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-700">
                        R$ {category.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-12 text-right">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
