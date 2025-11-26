"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Save,
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
  Bell,
  Lock,
  Globe,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [businessInfo, setBusinessInfo] = useState({
    tradeName: "",
    legalName: "",
    cnpj: "",
    description: "",
    phone: "",
    email: "",
    website: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      loadData();
    }
  }, [status, router]);

  const loadData = async () => {
    try {
      // Load categories
      const categoriesRes = await fetch("/api/categories");
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.categories || []);

      // Try to load provider data
      const providerRes = await fetch("/api/provider/me");
      if (providerRes.ok) {
        const data = await providerRes.json();
        const provider = data.provider;

        setProviderId(provider.id);
        setBusinessInfo({
          tradeName: provider.tradeName || "",
          legalName: provider.legalName || "",
          cnpj: provider.cnpj || "",
          description: provider.description || "",
          phone: provider.phone || "",
          email: provider.email || "",
          website: provider.website || "",
        });
        setAddressInfo({
          street: provider.street || "",
          number: provider.number || "",
          complement: provider.complement || "",
          neighborhood: provider.neighborhood || "",
          city: provider.city || "",
          state: provider.state || "",
          zipCode: provider.zipCode || "",
          latitude: provider.latitude || 0,
          longitude: provider.longitude || 0,
        });
        setSelectedCategories(provider.categories?.map((c: any) => c.categoryId) || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProvider = async () => {
    setSaving(true);
    try {
      const method = providerId ? "PUT" : "POST";
      const payload = providerId
        ? {
            id: providerId,
            ...businessInfo,
            ...addressInfo,
            categoryIds: selectedCategories,
          }
        : {
            ...businessInfo,
            ...addressInfo,
            categoryIds: selectedCategories,
          };

      const res = await fetch("/api/providers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setProviderId(data.provider.id);
        toast({
          title: "Sucesso!",
          description: "Perfil de fornecedor salvo com sucesso",
        });
        // Reload data
        await loadData();
      } else {
        const error = await res.json();
        toast({
          title: "Erro ao salvar",
          description: error.error || "Erro ao salvar perfil",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving provider:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar perfil de fornecedor",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">
          Gerencie as informações e preferências do seu estabelecimento
        </p>
      </div>

      {!providerId && (
        <Card className="border-yellow-300 bg-yellow-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900">Complete seu perfil de fornecedor</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  Você precisa completar o cadastro do seu estabelecimento para poder cadastrar produtos e receber pedidos.
                  Preencha as informações abaixo e clique em &quot;Salvar Perfil&quot;.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-blue-600" />
              <CardTitle>Informações do Negócio</CardTitle>
            </div>
            <CardDescription>
              Dados cadastrais e informações gerais do estabelecimento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nome Fantasia</label>
                <Input
                  value={businessInfo.tradeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBusinessInfo({ ...businessInfo, tradeName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Razão Social</label>
                <Input
                  value={businessInfo.legalName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBusinessInfo({ ...businessInfo, legalName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">CNPJ</label>
              <Input
                value={businessInfo.cnpj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBusinessInfo({ ...businessInfo, cnpj: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descrição do Negócio</label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={businessInfo.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBusinessInfo({ ...businessInfo, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </label>
                <Input
                  value={businessInfo.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBusinessInfo({ ...businessInfo, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input
                  type="email"
                  value={businessInfo.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBusinessInfo({ ...businessInfo, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </label>
                <Input
                  value={businessInfo.website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBusinessInfo({ ...businessInfo, website: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Categories Selection */}
            <div>
              <label className="text-sm font-medium">Categorias de Atuação</label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category.id]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <CardTitle>Endereço</CardTitle>
            </div>
            <CardDescription>
              Localização física do estabelecimento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Rua/Avenida</label>
                <Input
                  value={addressInfo.street}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, street: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Número</label>
                <Input
                  value={addressInfo.number}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, number: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Complemento</label>
                <Input
                  value={addressInfo.complement}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, complement: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bairro</label>
                <Input
                  value={addressInfo.neighborhood}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, neighborhood: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Cidade</label>
                <Input
                  value={addressInfo.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Estado</label>
                <Input
                  value={addressInfo.state}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, state: e.target.value })
                  }
                  maxLength={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium">CEP</label>
                <Input
                  value={addressInfo.zipCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, zipCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Latitude</label>
                <Input
                  type="number"
                  step="0.000001"
                  value={addressInfo.latitude}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, latitude: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="-23.550520"
                />
                <p className="text-xs text-gray-500 mt-1">Opcional - para cálculo de distância</p>
              </div>
              <div>
                <label className="text-sm font-medium">Longitude</label>
                <Input
                  type="number"
                  step="0.000001"
                  value={addressInfo.longitude}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressInfo({ ...addressInfo, longitude: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="-46.633308"
                />
                <p className="text-xs text-gray-500 mt-1">Opcional - para cálculo de distância</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/provider/dashboard")}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveProvider}
            disabled={saving || selectedCategories.length === 0}
            className="min-w-[200px]"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Salvando..." : (providerId ? "Atualizar Perfil" : "Criar Perfil de Fornecedor")}
          </Button>
        </div>
      </div>
    </div>
  );
}
