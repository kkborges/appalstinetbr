"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, FolderTree, Edit, Trash2, Package } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  providersCount: number;
  productsCount: number;
  ordersCount: number;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Alimentação", slug: "alimentacao", description: "Restaurantes, lanchonetes e delivery de comida", icon: "🍔", providersCount: 45, productsCount: 1234, ordersCount: 3421, isActive: true },
    { id: "2", name: "Saúde", slug: "saude", description: "Farmácias e produtos de saúde", icon: "💊", providersCount: 32, productsCount: 567, ordersCount: 2156, isActive: true },
    { id: "3", name: "Serviços", slug: "servicos", description: "Serviços gerais e profissionais", icon: "🔧", providersCount: 28, productsCount: 234, ordersCount: 1876, isActive: true },
    { id: "4", name: "Comércio", slug: "comercio", description: "Lojas e comércio em geral", icon: "🛍️", providersCount: 24, productsCount: 890, ordersCount: 1234, isActive: true },
    { id: "5", name: "Beleza", slug: "beleza", description: "Salões, clínicas de estética e produtos de beleza", icon: "💅", providersCount: 18, productsCount: 345, ordersCount: 890, isActive: true },
    { id: "6", name: "Pet", slug: "pet", description: "Pet shops e serviços para animais", icon: "🐾", providersCount: 9, productsCount: 123, ordersCount: 234, isActive: false },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: categories.length,
    active: categories.filter(c => c.isActive).length,
    totalProviders: categories.reduce((sum, c) => sum + c.providersCount, 0),
    totalProducts: categories.reduce((sum, c) => sum + c.productsCount, 0),
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Categorias</h1>
        <p className="text-gray-600 mt-1">Gerencie categorias de fornecedores e produtos</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input placeholder="Buscar categorias..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <Button onClick={() => setShowAddModal(true)}><Plus className="mr-2 h-4 w-4" />Nova Categoria</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total</CardTitle><FolderTree className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div><p className="text-xs text-muted-foreground">{stats.active} ativas</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Fornecedores</CardTitle><Package className="h-4 w-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{stats.totalProviders}</div><p className="text-xs text-muted-foreground">Cadastrados</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Produtos</CardTitle><Package className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{stats.totalProducts.toLocaleString()}</div><p className="text-xs text-muted-foreground">Totais</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Média</CardTitle><Package className="h-4 w-4 text-purple-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-purple-600">{Math.round(stats.totalProducts / stats.total)}</div><p className="text-xs text-muted-foreground">Produtos por categoria</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className={!category.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fornecedores:</span>
                  <span className="font-medium">{category.providersCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Produtos:</span>
                  <span className="font-medium">{category.productsCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pedidos:</span>
                  <span className="font-medium">{category.ordersCount.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1"><Edit className="h-3 w-3 mr-1" />Editar</Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-3 w-3" /></Button>
              </div>
              {!category.isActive && (
                <div className="mt-2 text-xs text-center text-gray-500 bg-gray-100 py-1 rounded">Inativa</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader><CardTitle>Nova Categoria</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><label className="text-sm font-medium">Nome</label><Input placeholder="Ex: Tecnologia" /></div>
              <div><label className="text-sm font-medium">Slug (URL)</label><Input placeholder="tecnologia" /></div>
              <div><label className="text-sm font-medium">Descrição</label><Input placeholder="Eletrônicos e produtos de tecnologia" /></div>
              <div><label className="text-sm font-medium">Ícone (emoji)</label><Input placeholder="💻" maxLength={2} /></div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancelar</Button>
                <Button className="flex-1" onClick={() => setShowAddModal(false)}>Criar Categoria</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
