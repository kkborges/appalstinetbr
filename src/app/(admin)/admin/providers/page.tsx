"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Store, CheckCircle, XCircle, Eye, Edit, Ban, Check } from "lucide-react";

type ProviderStatus = "pending" | "active" | "inactive" | "rejected";

interface Provider {
  id: string;
  tradeName: string;
  legalName: string;
  cnpj: string;
  email: string;
  phone: string;
  category: string;
  address: string;
  city: string;
  status: ProviderStatus;
  registeredAt: string;
  productsCount: number;
  ordersCount: number;
  revenue: number;
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      tradeName: "Bom Sabor Restaurante",
      legalName: "Bom Sabor Alimentos LTDA",
      cnpj: "12.345.678/0001-90",
      email: "contato@bomsabor.com",
      phone: "(11) 3456-7890",
      category: "Alimentação",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      status: "active",
      registeredAt: "2024-01-15",
      productsCount: 45,
      ordersCount: 234,
      revenue: 12345.67,
    },
    {
      id: "2",
      tradeName: "Farmácia Vida",
      legalName: "Vida Medicamentos LTDA",
      cnpj: "98.765.432/0001-10",
      email: "contato@farmaciavida.com",
      phone: "(11) 3456-7891",
      category: "Saúde",
      address: "Av. Principal, 456",
      city: "São Paulo",
      status: "pending",
      registeredAt: "2024-01-20",
      productsCount: 0,
      ordersCount: 0,
      revenue: 0,
    },
    {
      id: "3",
      tradeName: "Mercado Central",
      legalName: "Mercado Central Comércio LTDA",
      cnpj: "11.222.333/0001-44",
      email: "contato@mercadocentral.com",
      phone: "(11) 3456-7892",
      category: "Comércio",
      address: "Rua do Comércio, 789",
      city: "São Paulo",
      status: "active",
      registeredAt: "2024-01-10",
      productsCount: 156,
      ordersCount: 567,
      revenue: 45678.90,
    },
    {
      id: "4",
      tradeName: "Salão Beleza Total",
      legalName: "Beleza Total Serviços LTDA",
      cnpj: "55.666.777/0001-88",
      email: "contato@belezatotal.com",
      phone: "(11) 3456-7893",
      category: "Beleza",
      address: "Rua da Beleza, 321",
      city: "São Paulo",
      status: "inactive",
      registeredAt: "2023-12-01",
      productsCount: 28,
      ordersCount: 89,
      revenue: 8901.23,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProviderStatus | "all">("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.tradeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.cnpj.includes(searchQuery) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || provider.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: providers.length,
    active: providers.filter(p => p.status === "active").length,
    pending: providers.filter(p => p.status === "pending").length,
    inactive: providers.filter(p => p.status === "inactive").length,
  };

  const getStatusConfig = (status: ProviderStatus) => {
    switch (status) {
      case "active":
        return { label: "Ativo", color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "pending":
        return { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Eye };
      case "inactive":
        return { label: "Inativo", color: "bg-gray-100 text-gray-800", icon: Ban };
      case "rejected":
        return { label: "Rejeitado", color: "bg-red-100 text-red-800", icon: XCircle };
    }
  };

  const handleApprove = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId ? { ...p, status: "active" as ProviderStatus } : p
    ));
  };

  const handleReject = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId ? { ...p, status: "rejected" as ProviderStatus } : p
    ));
  };

  const handleToggleStatus = (providerId: string) => {
    setProviders(providers.map(p => {
      if (p.id === providerId) {
        const newStatus: ProviderStatus = p.status === "active" ? "inactive" : "active";
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Fornecedores</h1>
        <p className="text-gray-600 mt-1">
          Gerencie fornecedores, aprove cadastros e monitore atividades
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar por nome, CNPJ ou email..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value as ProviderStatus | "all")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">Pendentes</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
          <option value="rejected">Rejeitados</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Store className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Fornecedores cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Operando normalmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Eye className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
            <Ban className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">Temporariamente suspensos</p>
          </CardContent>
        </Card>
      </div>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProviders.length === 0 ? (
            <div className="text-center py-12">
              <Store className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Nenhum fornecedor encontrado
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Tente ajustar os filtros de busca
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Fornecedor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">CNPJ</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Categoria</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Cidade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProviders.map((provider) => {
                    const statusConfig = getStatusConfig(provider.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <tr key={provider.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{provider.tradeName}</div>
                            <div className="text-sm text-gray-500">{provider.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{provider.cnpj}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {provider.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{provider.city}</td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-700">
                            <div>{provider.productsCount} produtos</div>
                            <div className="text-gray-500">{provider.ordersCount} pedidos</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            {provider.status === "pending" ? (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleApprove(provider.id)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleReject(provider.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStatus(provider.id)}
                                className={provider.status === "active" ? "text-yellow-600" : "text-green-600"}
                              >
                                {provider.status === "active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProvider(provider);
                                setShowDetailModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Detalhes do Fornecedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome Fantasia</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.tradeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Razão Social</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.legalName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">CNPJ</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.cnpj}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Categoria</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.phone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Endereço</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.address}, {selectedProvider.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data de Cadastro</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedProvider.registeredAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(selectedProvider.status).color}`}>
                      {getStatusConfig(selectedProvider.status).label}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Produtos</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProvider.productsCount}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Pedidos</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProvider.ordersCount}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Receita</p>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {selectedProvider.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDetailModal(false)}
                >
                  Fechar
                </Button>
                {selectedProvider.status === "pending" && (
                  <>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleApprove(selectedProvider.id);
                        setShowDetailModal(false);
                      }}
                    >
                      Aprovar
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        handleReject(selectedProvider.id);
                        setShowDetailModal(false);
                      }}
                    >
                      Rejeitar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
