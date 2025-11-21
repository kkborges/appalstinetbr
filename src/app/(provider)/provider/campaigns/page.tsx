"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Calendar, DollarSign, TrendingUp, Eye, Edit, Trash2, PlayCircle, PauseCircle } from "lucide-react";

type CampaignStatus = "active" | "paused" | "scheduled" | "completed";

interface Campaign {
  id: string;
  name: string;
  description: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Promoção de Verão",
      description: "Descontos especiais para a temporada de verão",
      budget: 500,
      spent: 325.50,
      impressions: 12500,
      clicks: 450,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "active",
    },
    {
      id: "2",
      name: "Lançamento Novos Produtos",
      description: "Divulgação da nova linha de produtos",
      budget: 300,
      spent: 180.00,
      impressions: 8200,
      clicks: 320,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "active",
    },
    {
      id: "3",
      name: "Black Friday",
      description: "Campanha especial para Black Friday",
      budget: 1000,
      spent: 1000,
      impressions: 45000,
      clicks: 2100,
      startDate: "2023-11-20",
      endDate: "2023-11-27",
      status: "completed",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  const getStatusConfig = (status: CampaignStatus) => {
    switch (status) {
      case "active":
        return { label: "Ativa", color: "bg-green-100 text-green-800" };
      case "paused":
        return { label: "Pausada", color: "bg-yellow-100 text-yellow-800" };
      case "scheduled":
        return { label: "Agendada", color: "bg-blue-100 text-blue-800" };
      case "completed":
        return { label: "Concluída", color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Campanhas</h1>
        <p className="text-gray-600 mt-1">
          Crie e gerencie campanhas de marketing para promover seus produtos
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar campanhas..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            <PlayCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              de {campaigns.length} totais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalBudget.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Investimento planejado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% do orçamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()} impressões
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Nenhuma campanha encontrada
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Crie sua primeira campanha para começar a promover seus produtos
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Campanha
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Período
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Orçamento
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Performance
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => {
                    const statusConfig = getStatusConfig(campaign.status);
                    const ctr = campaign.impressions > 0
                      ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
                      : "0.00";

                    return (
                      <tr key={campaign.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-700">
                            <div>{new Date(campaign.startDate).toLocaleDateString("pt-BR")}</div>
                            <div className="text-gray-500">até {new Date(campaign.endDate).toLocaleDateString("pt-BR")}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              R$ {campaign.spent.toFixed(2)}
                            </div>
                            <div className="text-gray-500">
                              de R$ {campaign.budget.toFixed(2)}
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{
                                  width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-700">
                            <div>{campaign.impressions.toLocaleString()} impressões</div>
                            <div>{campaign.clicks.toLocaleString()} cliques</div>
                            <div className="text-gray-500">CTR: {ctr}%</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            {campaign.status === "active" ? (
                              <Button variant="ghost" size="sm" title="Pausar campanha">
                                <PauseCircle className="h-4 w-4" />
                              </Button>
                            ) : campaign.status === "paused" ? (
                              <Button variant="ghost" size="sm" title="Retomar campanha">
                                <PlayCircle className="h-4 w-4" />
                              </Button>
                            ) : null}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
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

      {/* Add Campaign Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Criar Nova Campanha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome da Campanha</label>
                <Input placeholder="Ex: Promoção de Páscoa" />
              </div>
              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Input placeholder="Descreva o objetivo da campanha" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Data de Início</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Data de Término</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Orçamento (R$)</label>
                <Input type="number" placeholder="500.00" step="0.01" />
              </div>
              <div>
                <label className="text-sm font-medium">Público Alvo</label>
                <Input placeholder="Ex: Clientes em um raio de 5km" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={() => setShowAddModal(false)}>
                  Criar Campanha
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
