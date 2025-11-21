"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Shield, Store, User, Ban, CheckCircle, Edit } from "lucide-react";

type UserRole = "CLIENT" | "PROVIDER" | "ADMIN" | "FISCAL";
type UserStatus = "active" | "inactive" | "blocked";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  registeredAt: string;
  ordersCount?: number;
  providerId?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([
    { id: "1", name: "João Silva", email: "joao@example.com", phone: "(11) 98765-4321", role: "CLIENT", status: "active", registeredAt: "2024-01-15", ordersCount: 12 },
    { id: "2", name: "Maria Santos", email: "maria@bomsabor.com", phone: "(11) 98765-4322", role: "PROVIDER", status: "active", registeredAt: "2024-01-10", providerId: "prov-1" },
    { id: "3", name: "Admin User", email: "admin@marketplace.com", phone: "(11) 98765-4323", role: "ADMIN", status: "active", registeredAt: "2023-12-01" },
    { id: "4", name: "Carlos Fiscal", email: "carlos@fiscal.gov", phone: "(11) 98765-4324", role: "FISCAL", status: "active", registeredAt: "2024-01-05" },
    { id: "5", name: "Ana Costa", email: "ana@example.com", phone: "(11) 98765-4325", role: "CLIENT", status: "blocked", registeredAt: "2024-01-20", ordersCount: 3 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");

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
      case "FISCAL": return { label: "Fiscal", color: "bg-green-100 text-green-800", icon: CheckCircle };
    }
  };

  const getStatusConfig = (status: UserStatus) => {
    switch (status) {
      case "active": return { label: "Ativo", color: "bg-green-100 text-green-800" };
      case "inactive": return { label: "Inativo", color: "bg-gray-100 text-gray-800" };
      case "blocked": return { label: "Bloqueado", color: "bg-red-100 text-red-800" };
    }
  };

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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Cadastro</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleConfig = getRoleConfig(user.role);
                  const statusConfig = getStatusConfig(user.status);
                  const RoleIcon = roleConfig.icon;

                  return (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div><div className="font-medium text-gray-900">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{user.phone}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig.color}`}>
                          <RoleIcon className="h-3 w-3" />{roleConfig.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>{statusConfig.label}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{new Date(user.registeredAt).toLocaleDateString('pt-BR')}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className={user.status === "blocked" ? "text-green-600" : "text-red-600"}>
                            {user.status === "blocked" ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
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
    </div>
  );
}
