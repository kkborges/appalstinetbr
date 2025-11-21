"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Globe, Mail, Bell, Shield, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Marketplace Local",
    siteUrl: "https://marketplace.local",
    supportEmail: "suporte@marketplace.local",
    contactPhone: "(11) 3000-0000",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@marketplace.local",
    fromName: "Marketplace Local",
  });

  const [notifications, setNotifications] = useState({
    newProviders: true,
    newOrders: true,
    fiscalReview: true,
    systemErrors: true,
    weeklyReport: false,
  });

  const [platformSettings, setPlatformSettings] = useState({
    allowRegistration: true,
    requireEmailVerification: true,
    autoApproveProviders: false,
    maintenanceMode: false,
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600 mt-1">Gerencie as configurações gerais da plataforma</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle>Configurações Gerais</CardTitle>
            </div>
            <CardDescription>Informações básicas da plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nome do Site</label>
                <Input value={generalSettings.siteName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">URL do Site</label>
                <Input value={generalSettings.siteUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Email de Suporte</label>
                <Input type="email" value={generalSettings.supportEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Telefone de Contato</label>
                <Input value={generalSettings.contactPhone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button><Save className="mr-2 h-4 w-4" />Salvar Alterações</Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <CardTitle>Configurações de Email</CardTitle>
            </div>
            <CardDescription>Configure o servidor SMTP para envio de emails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Host SMTP</label>
                <Input value={emailSettings.smtpHost} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Porta SMTP</label>
                <Input value={emailSettings.smtpPort} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Usuário SMTP</label>
                <Input value={emailSettings.smtpUser} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Nome do Remetente</label>
                <Input value={emailSettings.fromName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSettings({ ...emailSettings, fromName: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Senha SMTP</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button><Save className="mr-2 h-4 w-4" />Salvar Configurações</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle>Notificações do Administrador</CardTitle>
            </div>
            <CardDescription>Configure quais notificações você deseja receber</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Novos Fornecedores</div><div className="text-sm text-gray-500">Notificação quando um novo fornecedor se cadastrar</div></div>
                <input type="checkbox" checked={notifications.newProviders} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications({ ...notifications, newProviders: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Novos Pedidos</div><div className="text-sm text-gray-500">Resumo de pedidos realizados na plataforma</div></div>
                <input type="checkbox" checked={notifications.newOrders} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications({ ...notifications, newOrders: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Revisão Fiscal</div><div className="text-sm text-gray-500">Documentos aguardando aprovação fiscal</div></div>
                <input type="checkbox" checked={notifications.fiscalReview} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications({ ...notifications, fiscalReview: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Erros do Sistema</div><div className="text-sm text-gray-500">Notificações de erros críticos</div></div>
                <input type="checkbox" checked={notifications.systemErrors} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications({ ...notifications, systemErrors: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Relatório Semanal</div><div className="text-sm text-gray-500">Resumo semanal das atividades</div></div>
                <input type="checkbox" checked={notifications.weeklyReport} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications({ ...notifications, weeklyReport: e.target.checked })} className="rounded" />
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <Button><Save className="mr-2 h-4 w-4" />Salvar Preferências</Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <CardTitle>Configurações da Plataforma</CardTitle>
            </div>
            <CardDescription>Controles de segurança e operação da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Permitir Novos Cadastros</div><div className="text-sm text-gray-500">Permitir que novos usuários se cadastrem</div></div>
                <input type="checkbox" checked={platformSettings.allowRegistration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlatformSettings({ ...platformSettings, allowRegistration: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Verificação de Email Obrigatória</div><div className="text-sm text-gray-500">Exigir verificação de email no cadastro</div></div>
                <input type="checkbox" checked={platformSettings.requireEmailVerification} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlatformSettings({ ...platformSettings, requireEmailVerification: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div><div className="font-medium">Auto-aprovar Fornecedores</div><div className="text-sm text-gray-500 text-red-600">⚠️ Não recomendado para produção</div></div>
                <input type="checkbox" checked={platformSettings.autoApproveProviders} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlatformSettings({ ...platformSettings, autoApproveProviders: e.target.checked })} className="rounded" />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer bg-red-50 border-red-200">
                <div><div className="font-medium text-red-900">Modo de Manutenção</div><div className="text-sm text-red-700">Desabilitar acesso ao site temporariamente</div></div>
                <input type="checkbox" checked={platformSettings.maintenanceMode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlatformSettings({ ...platformSettings, maintenanceMode: e.target.checked })} className="rounded" />
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <Button><Save className="mr-2 h-4 w-4" />Salvar Configurações</Button>
            </div>
          </CardContent>
        </Card>

        {/* Database Backup */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              <CardTitle>Backup e Manutenção</CardTitle>
            </div>
            <CardDescription>Ferramentas de backup e manutenção do banco de dados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div><div className="font-medium">Último Backup</div><div className="text-sm text-gray-500">20/01/2024 às 03:00</div></div>
              <Button variant="outline">Fazer Backup Agora</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div><div className="font-medium">Backup Automático</div><div className="text-sm text-gray-500">Diariamente às 03:00</div></div>
              <Button variant="outline">Configurar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
