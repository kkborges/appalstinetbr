"use client";

import { useState } from "react";
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
  Globe
} from "lucide-react";

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    tradeName: "Bom Sabor Restaurante",
    legalName: "Bom Sabor Alimentos LTDA",
    cnpj: "12.345.678/0001-90",
    description: "Restaurante com comida caseira e delivery rápido na região",
    phone: "(11) 3456-7890",
    email: "contato@bomsabor.com",
    website: "www.bomsabor.com",
  });

  const [addressInfo, setAddressInfo] = useState({
    street: "Rua das Flores",
    number: "123",
    complement: "Loja 1",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  });

  const [operatingHours] = useState([
    { day: "Segunda-feira", open: "09:00", close: "18:00", closed: false },
    { day: "Terça-feira", open: "09:00", close: "18:00", closed: false },
    { day: "Quarta-feira", open: "09:00", close: "18:00", closed: false },
    { day: "Quinta-feira", open: "09:00", close: "18:00", closed: false },
    { day: "Sexta-feira", open: "09:00", close: "20:00", closed: false },
    { day: "Sábado", open: "10:00", close: "16:00", closed: false },
    { day: "Domingo", open: "00:00", close: "00:00", closed: true },
  ]);

  const [paymentMethods, setPaymentMethods] = useState({
    cash: true,
    debitCard: true,
    creditCard: true,
    pix: true,
    bankTransfer: false,
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    customerMessages: true,
    campaignResults: false,
    systemUpdates: true,
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">
          Gerencie as informações e preferências do seu estabelecimento
        </p>
      </div>

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

            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
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

            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Endereço
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <CardTitle>Horário de Funcionamento</CardTitle>
            </div>
            <CardDescription>
              Defina os horários de abertura e fechamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operatingHours.map((schedule, index) => (
                <div key={index} className="flex items-center gap-4 py-2 border-b last:border-0">
                  <div className="w-32 font-medium text-sm text-gray-700">
                    {schedule.day}
                  </div>
                  {schedule.closed ? (
                    <span className="text-sm text-gray-500">Fechado</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={schedule.open}
                        className="w-32"
                      />
                      <span className="text-gray-500">até</span>
                      <Input
                        type="time"
                        value={schedule.close}
                        className="w-32"
                      />
                    </div>
                  )}
                  <label className="flex items-center gap-2 ml-auto">
                    <input
                      type="checkbox"
                      checked={schedule.closed}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">Fechado</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Horários
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <CardTitle>Formas de Pagamento</CardTitle>
            </div>
            <CardDescription>
              Selecione os métodos de pagamento aceitos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.cash}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPaymentMethods({ ...paymentMethods, cash: e.target.checked })
                  }
                  className="rounded"
                />
                <div>
                  <div className="font-medium">Dinheiro</div>
                  <div className="text-sm text-gray-500">Pagamento em espécie</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.debitCard}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPaymentMethods({ ...paymentMethods, debitCard: e.target.checked })
                  }
                  className="rounded"
                />
                <div>
                  <div className="font-medium">Cartão de Débito</div>
                  <div className="text-sm text-gray-500">Débito na hora</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.creditCard}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPaymentMethods({ ...paymentMethods, creditCard: e.target.checked })
                  }
                  className="rounded"
                />
                <div>
                  <div className="font-medium">Cartão de Crédito</div>
                  <div className="text-sm text-gray-500">Parcelamento disponível</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.pix}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPaymentMethods({ ...paymentMethods, pix: e.target.checked })
                  }
                  className="rounded"
                />
                <div>
                  <div className="font-medium">PIX</div>
                  <div className="text-sm text-gray-500">Transferência instantânea</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentMethods.bankTransfer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPaymentMethods({ ...paymentMethods, bankTransfer: e.target.checked })
                  }
                  className="rounded"
                />
                <div>
                  <div className="font-medium">Transferência Bancária</div>
                  <div className="text-sm text-gray-500">TED/DOC</div>
                </div>
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Métodos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle>Notificações</CardTitle>
            </div>
            <CardDescription>
              Configure as notificações que deseja receber
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-medium">Novos Pedidos</div>
                  <div className="text-sm text-gray-500">Receba notificações de novos pedidos</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.newOrders}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNotifications({ ...notifications, newOrders: e.target.checked })
                  }
                  className="rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-medium">Atualizações de Pedidos</div>
                  <div className="text-sm text-gray-500">Mudanças de status dos pedidos</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNotifications({ ...notifications, orderUpdates: e.target.checked })
                  }
                  className="rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-medium">Mensagens de Clientes</div>
                  <div className="text-sm text-gray-500">Quando clientes enviarem mensagens</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.customerMessages}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNotifications({ ...notifications, customerMessages: e.target.checked })
                  }
                  className="rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-medium">Resultados de Campanhas</div>
                  <div className="text-sm text-gray-500">Relatórios de performance</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.campaignResults}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNotifications({ ...notifications, campaignResults: e.target.checked })
                  }
                  className="rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-medium">Atualizações do Sistema</div>
                  <div className="text-sm text-gray-500">Novos recursos e melhorias</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.systemUpdates}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNotifications({ ...notifications, systemUpdates: e.target.checked })
                  }
                  className="rounded"
                />
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar Preferências
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <CardTitle>Segurança</CardTitle>
            </div>
            <CardDescription>
              Gerencie a segurança da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Senha Atual</label>
              <Input type="password" placeholder="Digite sua senha atual" />
            </div>
            <div>
              <label className="text-sm font-medium">Nova Senha</label>
              <Input type="password" placeholder="Digite a nova senha" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirmar Nova Senha</label>
              <Input type="password" placeholder="Confirme a nova senha" />
            </div>
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Alterar Senha
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
