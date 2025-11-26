"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Store, CheckCircle, XCircle, Eye, Ban, Check, X } from "lucide-react";

interface Provider {
  id: string;
  tradeName: string | null;
  legalName: string;
  document: string;
  phone: string;
  city: string;
  state: string;
  isVerified: boolean;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  categories: {
    category: {
      id: string;
      name: string;
    };
  }[];
  _count: {
    products: number;
    orders: number;
    reviews: number;
  };
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "verified" | "pending">("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await fetch("/api/providers");
      const data = await res.json();
      setProviders(data.providers || []);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (providerId: string) => {
    try {
      const res = await fetch("/api/providers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: providerId,
          isVerified: true,
          verificationDate: new Date()
        }),
      });

      if (res.ok) {
        await fetchProviders();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao aprovar fornecedor");
      }
    } catch (error) {
      console.error("Error approving provider:", error);
      alert("Erro ao aprovar fornecedor");
    }
  };

  const handleReject = async (providerId: string) => {
    if (!confirm("Tem certeza que deseja rejeitar este fornecedor?")) return;

    try {
      const res = await fetch(`/api/providers?id=${providerId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchProviders();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao rejeitar fornecedor");
      }
    } catch (error) {
      console.error("Error rejecting provider:", error);
      alert("Erro ao rejeitar fornecedor");
    }
  };

  const handleToggleStatus = async (providerId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/providers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: providerId, isVerified: !currentStatus }),
      });

      if (res.ok) {
        await fetchProviders();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao atualizar status");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Erro ao atualizar status");
    }
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.tradeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.legalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.document.includes(searchQuery) ||
      provider.user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "verified" && provider.isVerified) ||
      (filterStatus === "pending" && !provider.isVerified);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: providers.length,
    active: providers.filter((p) => p.isVerified).length,
    pending: providers.filter((p) => !p.isVerified).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando fornecedores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Fornecedores</h1>
        <p className="text-gray-600 mt-1">
          Gerencie fornecedores, aprove cadastros e monitore atividades
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar por nome, CNPJ ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">Pendentes</option>
          <option value="verified">Verificados</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <CardTitle className="text-sm font-medium">Verificados</CardTitle>
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
            <XCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>
      </div>

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
                  {filteredProviders.map((provider) => (
                    <tr key={provider.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {provider.tradeName || provider.legalName}
                          </div>
                          <div className="text-sm text-gray-500">{provider.user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{provider.document}</td>
                      <td className="py-4 px-4">
                        {provider.categories[0] ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {provider.categories[0].category.name}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Sem categoria</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {provider.city}, {provider.state}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-700">
                          <div>{provider._count.products} produtos</div>
                          <div className="text-gray-500">{provider._count.orders} pedidos</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            provider.isVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {provider.isVerified ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              Verificado
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              Pendente
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          {!provider.isVerified ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(provider.id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Aprovar"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(provider.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Rejeitar"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(provider.id, provider.isVerified)}
                              className="text-yellow-600"
                              title="Suspender"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedProvider(provider);
                              setShowDetailModal(true);
                            }}
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {showDetailModal && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Detalhes do Fornecedor</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetailModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome Fantasia</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedProvider.tradeName || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Razão Social</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.legalName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">CNPJ</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.document}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Categorias</label>
                  <div className="mt-1">
                    {selectedProvider.categories.map((cat) => (
                      <span
                        key={cat.category.id}
                        className="inline-flex items-center px-2 py-1 mr-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {cat.category.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedProvider.phone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Localização</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedProvider.city}, {selectedProvider.state}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data de Cadastro</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedProvider.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedProvider.isVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedProvider.isVerified ? "Verificado" : "Pendente"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Produtos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedProvider._count.products}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Pedidos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedProvider._count.orders}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Avaliações</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedProvider._count.reviews}
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
                {!selectedProvider.isVerified && (
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
