"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileCheck, CheckCircle, XCircle, Clock, Eye, Download } from "lucide-react";

type DocumentStatus = "pending" | "approved" | "rejected" | "reviewing";

interface FiscalDocument {
  id: string;
  providerId: string;
  providerName: string;
  documentType: string;
  documentNumber: string;
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  status: DocumentStatus;
  notes?: string;
  fileUrl: string;
}

export default function FiscalPage() {
  const [documents, setDocuments] = useState<FiscalDocument[]>([
    { id: "1", providerId: "prov-1", providerName: "Bom Sabor Restaurante", documentType: "Alvará de Funcionamento", documentNumber: "ALV-2024-001", uploadedAt: "2024-01-20T10:00:00", status: "pending", fileUrl: "/docs/alv-001.pdf" },
    { id: "2", providerId: "prov-2", providerName: "Farmácia Vida", documentType: "Licença Sanitária", documentNumber: "LS-2024-045", uploadedAt: "2024-01-20T14:30:00", status: "pending", fileUrl: "/docs/ls-045.pdf" },
    { id: "3", providerId: "prov-3", providerName: "Mercado Central", documentType: "CNPJ", documentNumber: "11.222.333/0001-44", uploadedAt: "2024-01-15T09:15:00", reviewedAt: "2024-01-15T16:00:00", reviewedBy: "Carlos Fiscal", status: "approved", fileUrl: "/docs/cnpj-003.pdf" },
    { id: "4", providerId: "prov-4", providerName: "Padaria do Bairro", documentType: "Certidão Negativa", documentNumber: "CN-2024-123", uploadedAt: "2024-01-18T11:20:00", reviewedAt: "2024-01-19T10:00:00", reviewedBy: "Carlos Fiscal", status: "rejected", notes: "Documento vencido. Favor enviar documento atualizado.", fileUrl: "/docs/cn-123.pdf" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | "all">("all");
  const [selectedDoc, setSelectedDoc] = useState<FiscalDocument | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.providerName.toLowerCase().includes(searchQuery.toLowerCase()) || doc.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === "pending").length,
    approved: documents.filter(d => d.status === "approved").length,
    rejected: documents.filter(d => d.status === "rejected").length,
  };

  const getStatusConfig = (status: DocumentStatus) => {
    switch (status) {
      case "pending": return { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock };
      case "reviewing": return { label: "Em Análise", color: "bg-blue-100 text-blue-800", icon: Eye };
      case "approved": return { label: "Aprovado", color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "rejected": return { label: "Rejeitado", color: "bg-red-100 text-red-800", icon: XCircle };
    }
  };

  const handleApprove = (docId: string) => {
    setDocuments(documents.map(d => d.id === docId ? { ...d, status: "approved" as DocumentStatus, reviewedAt: new Date().toISOString(), reviewedBy: "Admin User" } : d));
    setShowReviewModal(false);
  };

  const handleReject = (docId: string, notes: string) => {
    setDocuments(documents.map(d => d.id === docId ? { ...d, status: "rejected" as DocumentStatus, reviewedAt: new Date().toISOString(), reviewedBy: "Admin User", notes } : d));
    setShowReviewModal(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Verificação Fiscal</h1>
        <p className="text-gray-600 mt-1">Analise e aprove documentos fiscais dos fornecedores</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input placeholder="Buscar por fornecedor ou tipo de documento..." value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <select value={filterStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value as DocumentStatus | "all")} className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="all">Todos</option>
          <option value="pending">Pendentes</option>
          <option value="reviewing">Em Análise</option>
          <option value="approved">Aprovados</option>
          <option value="rejected">Rejeitados</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total</CardTitle><FileCheck className="h-4 w-4" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pendentes</CardTitle><Clock className="h-4 w-4 text-yellow-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-yellow-600">{stats.pending}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Aprovados</CardTitle><CheckCircle className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{stats.approved}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Rejeitados</CardTitle><XCircle className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{stats.rejected}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Documentos Fiscais</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Fornecedor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo de Documento</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Número</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Data de Envio</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => {
                  const statusConfig = getStatusConfig(doc.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{doc.providerName}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{doc.documentType}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{doc.documentNumber}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{new Date(doc.uploadedAt).toLocaleString('pt-BR')}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3" />{statusConfig.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedDoc(doc); setShowReviewModal(true); }}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                          {doc.status === "pending" && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleApprove(doc.id)} className="text-green-600"><CheckCircle className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" onClick={() => handleReject(doc.id, "")} className="text-red-600"><XCircle className="h-4 w-4" /></Button>
                            </>
                          )}
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

      {showReviewModal && selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader><CardTitle>Revisar Documento</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium">Fornecedor</label><p className="mt-1 text-sm">{selectedDoc.providerName}</p></div>
                <div><label className="text-sm font-medium">Tipo</label><p className="mt-1 text-sm">{selectedDoc.documentType}</p></div>
                <div><label className="text-sm font-medium">Número</label><p className="mt-1 text-sm">{selectedDoc.documentNumber}</p></div>
                <div><label className="text-sm font-medium">Data de Envio</label><p className="mt-1 text-sm">{new Date(selectedDoc.uploadedAt).toLocaleString('pt-BR')}</p></div>
              </div>
              {selectedDoc.notes && (
                <div><label className="text-sm font-medium">Observações</label><p className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedDoc.notes}</p></div>
              )}
              <div><label className="text-sm font-medium">Adicionar Observação</label><textarea className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md" placeholder="Observações sobre o documento..." /></div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowReviewModal(false)}>Cancelar</Button>
                {selectedDoc.status === "pending" && (
                  <>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => handleReject(selectedDoc.id, "")}>Rejeitar</Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleApprove(selectedDoc.id)}>Aprovar</Button>
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
