"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Store, ShoppingCart, DollarSign, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const monthlyData = [
    { month: "Jan", revenue: 45678.90, orders: 234, users: 120, providers: 5 },
    { month: "Fev", revenue: 52341.23, orders: 267, users: 156, providers: 3 },
    { month: "Mar", revenue: 48912.45, orders: 245, users: 134, providers: 4 },
    { month: "Abr", revenue: 61234.67, orders: 289, users: 178, providers: 6 },
    { month: "Mai", revenue: 73456.89, orders: 321, users: 203, providers: 8 },
    { month: "Jun", revenue: 67890.12, orders: 298, users: 189, providers: 5 },
  ];

  const topProviders = [
    { name: "Mercado Central", revenue: 45678.90, orders: 567, growth: 15.3 },
    { name: "Bom Sabor Restaurante", revenue: 32145.67, orders: 423, growth: 12.1 },
    { name: "Farmácia Vida", revenue: 28934.23, orders: 389, growth: 8.7 },
    { name: "Salão Beleza Total", revenue: 19876.54, orders: 234, growth: -3.2 },
  ];

  const topCategories = [
    { name: "Alimentação", revenue: 89234.56, orders: 3421, share: 38 },
    { name: "Saúde", revenue: 67890.12, orders: 2156, share: 29 },
    { name: "Serviços", revenue: 45678.90, orders: 1876, share: 19 },
    { name: "Comércio", revenue: 34567.89, orders: 1234, share: 14 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Métricas e análises detalhadas da plataforma</p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Últimos 6 meses</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">Último ano</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">Período personalizado</button>
      </div>

      {/* Revenue Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Receita Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyData.map((data, index) => {
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-100 rounded-t relative group cursor-pointer hover:bg-blue-200 transition-colors" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      R$ {data.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 font-medium">{data.month}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Top Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProviders.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{provider.name}</div>
                    <div className="text-sm text-gray-500">{provider.orders} pedidos</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">R$ {provider.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div className={`text-xs flex items-center gap-1 justify-end ${provider.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {provider.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(provider.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Categorias Principais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm font-bold text-gray-900">R$ {category.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${category.share}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{category.orders.toLocaleString()} pedidos</span>
                    <span className="text-xs text-gray-500">{category.share}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Métricas Mensais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mês</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Receita</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Pedidos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Novos Usuários</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Novos Fornecedores</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ticket Médio</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{data.month}</td>
                    <td className="py-4 px-4 text-gray-700">R$ {data.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 px-4 text-gray-700">{data.orders}</td>
                    <td className="py-4 px-4 text-gray-700">{data.users}</td>
                    <td className="py-4 px-4 text-gray-700">{data.providers}</td>
                    <td className="py-4 px-4 text-gray-700">R$ {(data.revenue / data.orders).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
