"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Store,
  Users,
  FolderTree,
  FileCheck,
  Settings,
  LogOut,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/providers", label: "Fornecedores", icon: Store },
  { href: "/admin/users", label: "Usuários", icon: Users },
  { href: "/admin/categories", label: "Categorias", icon: FolderTree },
  { href: "/admin/fiscal", label: "Verificação Fiscal", icon: FileCheck },
  { href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Painel Administrativo</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-medium">
                {session?.user?.name?.charAt(0) || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || "Administrador"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || "admin@marketplace.com"}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
