"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Shield, Store, User, Edit, Trash2, X } from "lucide-react";

type UserRole = "CLIENT" | "PROVIDER" | "ADMIN" | "FISCAL";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    orders: number;
    reviews: number;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "CLIENT" as UserRole,
  });

  useEffect(() => {
    fetchUsers();
  }, [filterRole]);

  const fetchUsers = async () => {
    try {
      const url = filterRole === "all" ? "/api/users" : `/api/users?role=${filterRole}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          ...formData,
        }),
      });

      if (res.ok) {
        await fetchUsers();
        setShowEditModal(false);
        setEditingUser(null);
        setFormData({ name: "", phone: "", role: "CLIENT" });
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Erro ao atualizar usuário");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchUsers();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao deletar usuário");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Erro ao deletar usuário");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    clients: users.filter(u => u.role === "CLIENT").length,
    providers: users.filter(u => u.role === "PROVIDER").length,
    admins: users.filter(u => u.role === "ADMIN").length,
  };

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case "CLIENT": return { label: "Cliente", color: "bg-blue-100 text-blue-800", icon: User };
      case "PROVIDER": return { label: "Fornecedor", color: "bg-purple-100 text-purple-800", icon: Store };
      case "ADMIN": return { label: "Admin", color: "bg-red-100 text-red-800", icon: Shield };
      case "FISCAL": return { label: "Fiscal", color: "bg-green-100 text-green-800", icon: Shield };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
        <p className="text-gray-600 mt-1">Gerencie todos os usuários da plataforma</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input placeholder="Buscar por nome ou email..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <select value={filterRole} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterRole(e.target.value as UserRole | "all")} className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="all">Todos os Tipos</option>
          <option value="CLIENT">Clientes</option>
          <option value="PROVIDER">Fornecedores</option>
          <option value="ADMIN">Administradores</option>
          <option value="FISCAL">Fiscais</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total</CardTitle><Users className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Clientes</CardTitle><User className="h-4 w-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{stats.clients}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Fornecedores</CardTitle><Store className="h-4 w-4 text-purple-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-purple-600">{stats.providers}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Admins</CardTitle><Shield className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{stats.admins}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Lista de Usuários</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Usuário</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Telefone</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Pedidos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Cadastro</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleConfig = getRoleConfig(user.role);
                  const RoleIcon = roleConfig.icon;

                  return (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{user.phone || "-"}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig.color}`}>
                          <RoleIcon className="h-3 w-3" />
                          {roleConfig.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {user._count.orders}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDelete(user.id)}
                          >
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
        </CardContent>
      </Card>

      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Editar Usuário</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={editingUser.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email não pode ser alterado</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <Input
                    placeholder="(11) 98765-4321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo de Usuário</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="CLIENT">Cliente</option>
                    <option value="PROVIDER">Fornecedor</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="FISCAL">Fiscal</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
