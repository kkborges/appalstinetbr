# 📱 Análise de Requisitos - Location Marketplace App

## 📊 Visão Geral do Projeto

Marketplace baseado em geolocalização que conecta clientes a fornecedores/prestadores de serviços próximos, com funcionalidades de e-commerce, rastreamento de interações e sistema de fiscalização.

---

## 🎯 Requisitos Funcionais Principais

### 1. **App Cliente/Consumidor (Mobile + Web Responsivo)**

#### 1.1 Autenticação
- ✅ Login com email/senha
- ✅ OAuth integrado: Google, Instagram, LinkedIn
- 🆕 **SUGESTÃO:** Adicionar Facebook e Apple Sign-In
- 🆕 **SUGESTÃO:** Autenticação por SMS (OTP) para maior segurança
- 🆕 **SUGESTÃO:** Biometria para dispositivos móveis

#### 1.2 Busca e Descoberta
- ✅ Busca automática por geolocalização (raio de 2km)
- ✅ Busca por categorias → subcategorias → texto livre
- ✅ Visualização em mapa dos fornecedores próximos
- 🆕 **SUGESTÃO:** Filtros avançados (preço, avaliação, distância, horário)
- 🆕 **SUGESTÃO:** Busca por voz
- 🆕 **SUGESTÃO:** Histórico de buscas recentes
- 🆕 **SUGESTÃO:** Favoritos/Lista de desejos
- 🆕 **SUGESTÃO:** Modo offline com cache de dados recentes

#### 1.3 Detalhes do Fornecedor
- ✅ Nome fantasia, endereço, telefone, WhatsApp
- ✅ 5 produtos/serviços principais (conforme plano)
- ✅ Rastreamento de interação para relatórios
- 🆕 **SUGESTÃO:** Horário de funcionamento
- 🆕 **SUGESTÃO:** Fotos da loja/estabelecimento
- 🆕 **SUGESTÃO:** Redes sociais do fornecedor
- 🆕 **SUGESTÃO:** Tempo médio de resposta
- 🆕 **SUGESTÃO:** Taxa de satisfação geral

#### 1.4 Sistema de Avaliação
- ✅ Notificação push para avaliar após contato
- ✅ Avaliação de produtos/serviços
- 🆕 **SUGESTÃO:** Sistema de estrelas (1-5) + comentários
- 🆕 **SUGESTÃO:** Upload de fotos nas avaliações
- 🆕 **SUGESTÃO:** Moderação de avaliações (anti-spam)
- 🆕 **SUGESTÃO:** Resposta do fornecedor às avaliações
- 🆕 **SUGESTÃO:** Avaliações verificadas (compra confirmada)

#### 1.5 Sistema de E-commerce
- ✅ Carrinho de compras
- ✅ Gateway de pagamento: Stripe e Mercado Pago
- ✅ Métodos: Cartão crédito, PIX, débito
- ✅ Rastreamento de pedidos
- ✅ Status da entrega
- 🆕 **SUGESTÃO:** Pagamento na entrega
- 🆕 **SUGESTÃO:** Parcelamento no cartão
- 🆕 **SUGESTÃO:** Cashback/programa de fidelidade
- 🆕 **SUGESTÃO:** Cupons de desconto
- 🆕 **SUGESTÃO:** Frete calculado por distância
- 🆕 **SUGESTÃO:** Chat em tempo real com fornecedor
- 🆕 **SUGESTÃO:** Histórico completo de pedidos
- 🆕 **SUGESTÃO:** Nota fiscal eletrônica

---

### 2. **Painel Fornecedor/Prestador (Web)**

#### 2.1 Gestão de Usuários
- ✅ Até 5 usuários por conta
- ✅ 3 perfis de operadores com permissões específicas
- 🆕 **SUGESTÃO:** Controle granular de permissões (ACL)
- 🆕 **SUGESTÃO:** Log de ações dos usuários (auditoria)
- 🆕 **SUGESTÃO:** Perfil customizável de operadores

#### 2.2 Gestão de Produtos/Serviços
- ✅ Cadastro ilimitado de produtos/serviços
- ✅ Upload de fotos: 5 para serviços, 10 para produtos
- ✅ 5 produtos principais destacados (conforme plano)
- 🆕 **SUGESTÃO:** Categorização múltipla
- 🆕 **SUGESTÃO:** Variações de produto (tamanho, cor)
- 🆕 **SUGESTÃO:** Controle de estoque
- 🆕 **SUGESTÃO:** Produtos em promoção com countdown
- 🆕 **SUGESTÃO:** Import/Export em massa (CSV/Excel)
- 🆕 **SUGESTÃO:** Editor rico para descrições
- 🆕 **SUGESTÃO:** SEO para cada produto

#### 2.3 Campanhas de Marketing
- ✅ Cadastro de promoções/ofertas/anúncios
- 🆕 **SUGESTÃO:** Agendamento de campanhas
- 🆕 **SUGESTÃO:** Campanhas geotargeting (enviar para clientes próximos)
- 🆕 **SUGESTÃO:** A/B testing de anúncios
- 🆕 **SUGESTÃO:** Push notifications segmentadas
- 🆕 **SUGESTÃO:** Budget diário/mensal para anúncios
- 🆕 **SUGESTÃO:** Analytics de campanhas (CTR, conversão)

#### 2.4 Relatórios e Analytics
- ✅ Relatório de clientes que chegaram via plataforma
- ✅ Relatórios de avaliações
- 🆕 **SUGESTÃO:** Dashboard com métricas em tempo real
- 🆕 **SUGESTÃO:** Relatório de vendas (diário, semanal, mensal)
- 🆕 **SUGESTÃO:** Produtos mais visualizados/vendidos
- 🆕 **SUGESTÃO:** Taxa de conversão (visualização → compra)
- 🆕 **SUGESTÃO:** Horários de pico de visitas
- 🆕 **SUGESTÃO:** Análise de concorrência na região
- 🆕 **SUGESTÃO:** Exportação de relatórios (PDF, Excel)

#### 2.5 Gestão de Pedidos
- ✅ Recebimento de pedidos por email
- ✅ Sistema de status de pedidos
- ✅ Integração com código de rastreamento
- 🆕 **SUGESTÃO:** Notificações push para novos pedidos
- 🆕 **SUGESTÃO:** Som de alerta para pedidos
- 🆕 **SUGESTÃO:** Impressão de etiquetas de envio
- 🆕 **SUGESTÃO:** Integração com Correios/transportadoras
- 🆕 **SUGESTÃO:** Chat com cliente
- 🆕 **SUGESTÃO:** Cancelamento/reembolso de pedidos
- 🆕 **SUGESTÃO:** Marketplace de entregadores (integração com iFood, Rappi)

---

### 3. **Painel Administrativo (Web)**

#### 3.1 Gestão de Fornecedores
- ✅ Cadastro completo: CNPJ/CPF, razão social, endereço
- ✅ Coordenadas geográficas (lat/long)
- ✅ Categorias/subcategorias
- ✅ Plano contratado
- 🆕 **SUGESTÃO:** Aprovação manual de novos fornecedores
- 🆕 **SUGESTÃO:** Sistema de verificação (selo verificado)
- 🆕 **SUGESTÃO:** Histórico de alterações do cadastro
- 🆕 **SUGESTÃO:** Suspensão/banimento temporário
- 🆕 **SUGESTÃO:** Ranking de fornecedores (por avaliação)

#### 3.2 Gestão de Planos e Pagamentos
- ✅ Cadastro/alteração de planos
- ✅ Controle de pagamentos dos fornecedores
- 🆕 **SUGESTÃO:** Planos freemium/premium/enterprise
- 🆕 **SUGESTÃO:** Cobrança recorrente automática
- 🆕 **SUGESTÃO:** Notificação de vencimento
- 🆕 **SUGESTÃO:** Suspensão automática por inadimplência
- 🆕 **SUGESTÃO:** Relatório financeiro consolidado
- 🆕 **SUGESTÃO:** Comissionamento sobre vendas
- 🆕 **SUGESTÃO:** Split payment automático

#### 3.3 Sistema de Fiscalização
- ✅ Cadastro de fiscais (motoboys, entregadores)
- ✅ App mobile para fiscalização
- ✅ Validação de coordenadas com foto + GPS
- ✅ Sistema de tickets de fiscalização
- ✅ Pagamento semanal/quinzenal/mensal
- 🆕 **SUGESTÃO:** Gamificação para fiscais (pontos, badges)
- 🆕 **SUGESTÃO:** Rota otimizada para fiscalização
- 🆕 **SUGESTÃO:** Histórico de fiscalizações por fornecedor
- 🆕 **SUGESTÃO:** Sistema de denúncias de clientes
- 🆕 **SUGESTÃO:** Penalidades por localização incorreta

#### 3.4 Analytics Global
- 🆕 **SUGESTÃO:** Dashboard executivo
- 🆕 **SUGESTÃO:** Total de usuários ativos (clientes/fornecedores)
- 🆕 **SUGESTÃO:** GMV (Gross Merchandise Value) total
- 🆕 **SUGESTÃO:** Mapa de calor de uso da plataforma
- 🆕 **SUGESTÃO:** Taxa de retenção de clientes
- 🆕 **SUGESTÃO:** Churn rate de fornecedores
- 🆕 **SUGESTÃO:** Lifetime Value (LTV) médio
- 🆕 **SUGESTÃO:** Relatórios customizados

#### 3.5 Gestão de Conteúdo
- 🆕 **SUGESTÃO:** Blog/notícias
- 🆕 **SUGESTÃO:** FAQ dinâmico
- 🆕 **SUGESTÃO:** Banners promocionais
- 🆕 **SUGESTÃO:** Termos de uso/política de privacidade
- 🆕 **SUGESTÃO:** Notificações push para todos os usuários

---

### 4. **App Fiscal (Mobile)**

#### 4.1 Funcionalidades
- ✅ Cadastro simplificado com confirmação de dados
- ✅ Sistema de tickets de fiscalização
- ✅ Captura de foto + coordenadas GPS
- ✅ Upload de evidências
- 🆕 **SUGESTÃO:** Navegação GPS até o local
- 🆕 **SUGESTÃO:** Checklist de verificação
- 🆕 **SUGESTÃO:** Assinatura digital do fornecedor
- 🆕 **SUGESTÃO:** Modo offline com sincronização posterior
- 🆕 **SUGESTÃO:** Histórico de fiscalizações realizadas
- 🆕 **SUGESTÃO:** Ganhos acumulados e saques

---

## 🏗️ Arquitetura Técnica Proposta

### Stack Tecnológico Recomendado

#### **Frontend (Web + Mobile Responsivo)**
```
- Next.js 14+ (App Router) - Framework React full-stack
- TypeScript - Tipagem estática
- TailwindCSS - Estilização utilitária
- Shadcn/UI - Componentes acessíveis
- React Hook Form + Zod - Validação de formulários
- TanStack Query - Gerenciamento de estado server
- Zustand - Estado global leve
- Leaflet/Mapbox GL JS - Mapas interativos
- Socket.io Client - Real-time (chat, notificações)
- PWA - Progressive Web App para mobile
```

#### **Backend (API)**
```
- Next.js API Routes - Endpoints serverless
- Node.js 20+ - Runtime JavaScript
- Prisma ORM - Database abstraction
- PostgreSQL 15+ com PostGIS - Banco geoespacial
- Redis - Cache e sessões
- Socket.io - WebSocket para real-time
- Bull - Queue de jobs
- Winston - Logging estruturado
```

#### **Autenticação e Autorização**
```
- NextAuth.js - Autenticação completa
- OAuth Providers: Google, Facebook, LinkedIn, Instagram
- JWT - Token based authentication
- RBAC - Role-Based Access Control
- 2FA - Two-Factor Authentication (opcional)
```

#### **Pagamentos**
```
- Stripe SDK - Pagamentos internacionais
- Mercado Pago SDK - Pagamentos Brasil
- PIX - Integração nativa
```

#### **Cloud e Infraestrutura**
```
- Vercel/Railway - Hosting Next.js
- AWS S3/Cloudinary - Storage de imagens
- AWS SES - Email transacional
- Firebase Cloud Messaging - Push notifications
- Sentry - Error tracking
- Google Analytics - Analytics
```

#### **DevOps**
```
- Docker - Containerização
- GitHub Actions - CI/CD
- Jest + Testing Library - Testes
- Prettier + ESLint - Code quality
```

---

## 📊 Modelo de Dados (Schema Simplificado)

### Entidades Principais

```
┌─────────────┐
│   Users     │ ─── Usuários do sistema (clientes, fornecedores, admins, fiscais)
├─────────────┤
│ id          │ PK
│ email       │ unique
│ password    │ hashed
│ role        │ ENUM (CLIENT, PROVIDER, ADMIN, FISCAL)
│ name        │
│ phone       │
│ document    │ CPF/CNPJ
│ coordinates │ Point (PostGIS)
└─────────────┘

┌──────────────────┐
│   Providers      │ ─── Fornecedores/Prestadores
├──────────────────┤
│ id               │ PK
│ userId           │ FK → Users
│ legalName        │ Razão Social
│ tradeName        │ Nome Fantasia
│ document         │ CNPJ/CPF
│ address          │ JSON
│ coordinates      │ Point (PostGIS)
│ planId           │ FK → Plans
│ isVerified       │ boolean
│ verificationDate │ timestamp
└──────────────────┘

┌──────────────────┐
│   Products       │ ─── Produtos/Serviços
├──────────────────┤
│ id               │ PK
│ providerId       │ FK → Providers
│ name             │
│ description      │ text
│ price            │ decimal
│ categoryId       │ FK → Categories
│ subcategoryId    │ FK → Subcategories
│ images           │ JSON array
│ stock            │ integer
│ isFeatured       │ boolean (5 principais)
│ isActive         │ boolean
└──────────────────┘

┌──────────────────┐
│   Categories     │ ─── Categorias
├──────────────────┤
│ id               │ PK
│ name             │
│ slug             │ unique
│ icon             │ url
└──────────────────┘

┌──────────────────┐
│  Subcategories   │ ─── Subcategorias
├──────────────────┤
│ id               │ PK
│ categoryId       │ FK → Categories
│ name             │
│ slug             │
└──────────────────┘

┌──────────────────┐
│     Orders       │ ─── Pedidos
├──────────────────┤
│ id               │ PK
│ clientId         │ FK → Users
│ providerId       │ FK → Providers
│ totalAmount      │ decimal
│ status           │ ENUM
│ paymentMethod    │ ENUM
│ paymentStatus    │ ENUM
│ trackingCode     │ string
│ deliveryAddress  │ JSON
│ createdAt        │ timestamp
└──────────────────┘

┌──────────────────┐
│   OrderItems     │ ─── Items do Pedido
├──────────────────┤
│ id               │ PK
│ orderId          │ FK → Orders
│ productId        │ FK → Products
│ quantity         │ integer
│ unitPrice        │ decimal
│ subtotal         │ decimal
└──────────────────┘

┌──────────────────┐
│    Reviews       │ ─── Avaliações
├──────────────────┤
│ id               │ PK
│ clientId         │ FK → Users
│ providerId       │ FK → Providers
│ orderId          │ FK → Orders (nullable)
│ rating           │ integer (1-5)
│ comment          │ text
│ images           │ JSON array
│ response         │ text (resposta do fornecedor)
│ createdAt        │ timestamp
└──────────────────┘

┌──────────────────┐
│   Interactions   │ ─── Rastreamento de interações
├──────────────────┤
│ id               │ PK
│ clientId         │ FK → Users
│ providerId       │ FK → Providers
│ type             │ ENUM (VIEW, CLICK, CALL, WHATSAPP)
│ metadata         │ JSON
│ createdAt        │ timestamp
└──────────────────┘

┌──────────────────┐
│  Verifications   │ ─── Fiscalizações
├──────────────────┤
│ id               │ PK
│ providerId       │ FK → Providers
│ fiscalId         │ FK → Users
│ photo            │ url
│ coordinates      │ Point (PostGIS)
│ isValid          │ boolean
│ notes            │ text
│ createdAt        │ timestamp
│ paidAt           │ timestamp
└──────────────────┘

┌──────────────────┐
│      Plans       │ ─── Planos de assinatura
├──────────────────┤
│ id               │ PK
│ name             │
│ price            │ decimal
│ features         │ JSON (maxProducts, hasEcommerce, etc)
│ billingCycle     │ ENUM (MONTHLY, YEARLY)
└──────────────────┘

┌──────────────────┐
│   Subscriptions  │ ─── Assinaturas dos fornecedores
├──────────────────┤
│ id               │ PK
│ providerId       │ FK → Providers
│ planId           │ FK → Plans
│ status           │ ENUM (ACTIVE, SUSPENDED, CANCELLED)
│ startDate        │ timestamp
│ nextBillingDate  │ timestamp
│ cancelledAt      │ timestamp
└──────────────────┘

┌──────────────────┐
│   Campaigns      │ ─── Campanhas de marketing
├──────────────────┤
│ id               │ PK
│ providerId       │ FK → Providers
│ name             │
│ description      │ text
│ startDate        │ timestamp
│ endDate          │ timestamp
│ budget           │ decimal
│ targetRadius     │ integer (km)
│ isActive         │ boolean
└──────────────────┘

┌──────────────────┐
│  Notifications   │ ─── Notificações push
├──────────────────┤
│ id               │ PK
│ userId           │ FK → Users
│ title            │
│ body             │ text
│ type             │ ENUM
│ isRead           │ boolean
│ createdAt        │ timestamp
└──────────────────┘
```

---

## 🔐 Considerações de Segurança

### 1. **Autenticação e Autorização**
- ✅ Senhas com hash bcrypt (cost factor 12)
- ✅ Tokens JWT com refresh tokens
- ✅ Rate limiting por IP e por usuário
- ✅ RBAC granular para todos os endpoints
- ✅ OAuth 2.0 para login social
- 🆕 **SUGESTÃO:** 2FA obrigatório para admins
- 🆕 **SUGESTÃO:** Detecção de dispositivos suspeitos

### 2. **Dados Sensíveis**
- ✅ LGPD compliance (consentimento explícito)
- ✅ Criptografia de dados em repouso (AES-256)
- ✅ TLS 1.3 para dados em trânsito
- ✅ Tokenização de dados de pagamento (PCI DSS)
- 🆕 **SUGESTÃO:** Anonimização de dados em relatórios
- 🆕 **SUGESTÃO:** Direito ao esquecimento automatizado

### 3. **API Security**
- ✅ CORS configurado adequadamente
- ✅ CSRF protection
- ✅ Input validation (Zod schemas)
- ✅ SQL Injection protection (Prisma ORM)
- ✅ XSS protection (sanitização de inputs)
- 🆕 **SUGESTÃO:** API keys para integrações
- 🆕 **SUGESTÃO:** Webhook signatures (HMAC)

### 4. **Geolocalização**
- ✅ Validação de coordenadas (range válido)
- ✅ Fuzzing de coordenadas exatas do cliente (privacidade)
- 🆕 **SUGESTÃO:** Opt-in explícito para tracking
- 🆕 **SUGESTÃO:** Histórico de localização com TTL

### 5. **Pagamentos**
- ✅ Nunca armazenar dados de cartão
- ✅ Webhooks com validação de assinatura
- ✅ Idempotency keys para evitar cobranças duplicadas
- 🆕 **SUGESTÃO:** Monitoramento de fraudes
- 🆕 **SUGESTÃO:** Limite de tentativas de pagamento

### 6. **Upload de Arquivos**
- ✅ Validação de tipo MIME
- ✅ Limite de tamanho (5MB por foto)
- ✅ Scan de malware (ClamAV)
- ✅ Armazenamento em CDN com signed URLs
- 🆕 **SUGESTÃO:** Compressão automática de imagens
- 🆕 **SUGESTÃO:** Watermark em fotos de produtos

---

## 📱 Fluxos Principais

### Fluxo 1: Cadastro e Onboarding do Cliente
```
1. Cliente acessa o app
2. Escolhe método de cadastro (email ou OAuth)
3. Preenche dados obrigatórios (CPF, endereço, telefone)
4. Confirma email/telefone (OTP)
5. Permite acesso à localização
6. Tutorial de uso do app (primeira vez)
7. Entra na home com busca geolocalizada
```

### Fluxo 2: Busca e Contato com Fornecedor
```
1. App busca fornecedores no raio de 2km
2. Cliente visualiza mapa + lista de resultados
3. Cliente filtra por categoria/subcategoria
4. Cliente clica em um fornecedor
5. Sistema registra interação (analytics)
6. Exibe detalhes do fornecedor + produtos
7. Cliente clica em WhatsApp/telefone
8. Sistema registra tipo de contato
9. [Após 24-48h] Push notification solicitando avaliação
```

### Fluxo 3: Compra de Produto
```
1. Cliente busca produto no mapa
2. Clica em "Comprar" no card do fornecedor
3. Produto é adicionado ao carrinho
4. Cliente pode adicionar mais produtos do mesmo fornecedor
5. Cliente revisa carrinho e clica em "Finalizar"
6. Preenche endereço de entrega (se diferente do cadastrado)
7. Escolhe método de pagamento
8. [PIX] Sistema gera QR Code + copia e cola
9. [Cartão] Preenche dados e confirma
10. Gateway processa pagamento
11. [Sucesso] Fornecedor recebe email + notificação
12. Fornecedor atualiza status do pedido
13. Cliente recebe atualizações de status
14. Ao receber, cliente confirma entrega
15. Sistema solicita avaliação
```

### Fluxo 4: Cadastro e Onboarding do Fornecedor
```
1. Admin cadastra fornecedor no painel
2. Fornecedor recebe email com credenciais
3. Primeiro login força troca de senha
4. Preenche dados completos da empresa
5. [Opcional] Solicita localização GPS ou insere manualmente
6. Sistema alerta sobre fiscalização de coordenadas
7. Escolhe categorias/subcategorias de atuação
8. Cadastra primeiros produtos/serviços
9. Faz upload de fotos
10. Define quais são os 5 produtos principais
11. [Se plano incluir] Ativa e-commerce
12. Convida usuários/operadores
13. Tutorial do painel
14. Aguarda verificação (fiscal)
```

### Fluxo 5: Fiscalização de Localização
```
1. Admin gera tickets de fiscalização (batch semanal/mensal)
2. Fiscal loga no app mobile
3. Visualiza lista de tickets disponíveis
4. Aceita um ticket
5. App mostra navegação GPS até o local
6. Fiscal chega no local informado
7. Tira foto do estabelecimento
8. App captura coordenadas GPS automáticas
9. Fiscal preenche checklist de verificação
10. [Opcional] Solicita assinatura digital do fornecedor
11. Faz upload da fiscalização
12. Sistema valida coordenadas (margem de 50m)
13. [Válido] Fornecedor recebe selo "Verificado"
14. [Inválido] Admin recebe alerta + notifica fornecedor
15. Fiscal acumula valor no saldo
16. [Fim do período] Fiscal solicita saque
```

### Fluxo 6: Gestão de Pedido pelo Fornecedor
```
1. Fornecedor recebe notificação de novo pedido
2. Abre painel e visualiza detalhes
3. Aceita ou rejeita pedido (2h para responder)
4. [Aceito] Atualiza status: "Preparando"
5. Imprime etiqueta de envio
6. Atualiza status: "Aguardando coleta"
7. Entregador coleta
8. Atualiza status: "Em trânsito"
9. [Se tiver] Adiciona código de rastreamento
10. Cliente visualiza rastreamento em tempo real
11. Entrega é realizada
12. Cliente confirma recebimento no app
13. Fornecedor marca como "Entregue"
14. Após 7 dias, pagamento é liberado (split payment)
```

---

## 📊 KPIs e Métricas Sugeridas

### Para a Plataforma
- **MAU** (Monthly Active Users) - Clientes e Fornecedores
- **GMV** (Gross Merchandise Value) - Volume bruto de vendas
- **Take Rate** - % de comissão sobre vendas
- **Taxa de conversão** - Busca → Contato → Compra
- **Churn Rate** - Cancelamento de fornecedores
- **LTV** (Lifetime Value) - Valor médio por fornecedor
- **CAC** (Customer Acquisition Cost) - Custo de aquisição

### Para Fornecedores (Dashboard)
- **Visualizações** - Quantas vezes foi visualizado
- **Cliques** - Cliques em WhatsApp/telefone
- **Taxa de conversão** - Visualização → Contato
- **Avaliação média** - Estrelas (1-5)
- **Vendas totais** - Valor total vendido
- **Ticket médio** - Valor médio por pedido
- **Produtos mais vendidos** - Top 10
- **Horários de pico** - Quando recebe mais visitas

### Para Admins
- **Fornecedores ativos** - Por região/categoria
- **Taxa de verificação** - % de fornecedores verificados
- **Tempo médio de fiscalização** - Dias até verificar
- **Taxa de abandono de carrinho** - E-commerce
- **Tempo médio de entrega** - Por região
- **Taxa de inadimplência** - Fornecedores

---

## 🚀 Roadmap de Implementação Sugerido

### **Fase 1 - MVP (2-3 meses)**
- ✅ Setup do projeto (Next.js + PostgreSQL + Prisma)
- ✅ Autenticação básica (email/senha + OAuth Google)
- ✅ Cadastro de usuários (cliente + fornecedor)
- ✅ Sistema de categorias/subcategorias
- ✅ Busca geolocalizada básica (raio 2km)
- ✅ Visualização em mapa (Leaflet)
- ✅ Cadastro de produtos/serviços
- ✅ Upload de imagens (Cloudinary)
- ✅ Detalhes do fornecedor
- ✅ Sistema de rastreamento de interações
- ✅ Painel básico do fornecedor
- ✅ Painel administrativo básico

### **Fase 2 - E-commerce (1-2 meses)**
- ✅ Carrinho de compras
- ✅ Checkout flow
- ✅ Integração Stripe
- ✅ Integração Mercado Pago
- ✅ PIX (QR Code)
- ✅ Gestão de pedidos
- ✅ Sistema de status de entrega
- ✅ Email transacional (confirmações)

### **Fase 3 - Avaliações e Notificações (1 mês)**
- ✅ Sistema de avaliações (estrelas + comentários)
- ✅ Upload de fotos em avaliações
- ✅ Notificações push (Firebase)
- ✅ Push após contato (solicitar avaliação)
- ✅ Resposta do fornecedor às avaliações

### **Fase 4 - Fiscalização (1 mês)**
- ✅ App mobile para fiscais (React Native ou PWA)
- ✅ Sistema de tickets
- ✅ Captura de foto + GPS
- ✅ Validação de coordenadas
- ✅ Sistema de pagamento de fiscais
- ✅ Selo "Verificado" para fornecedores

### **Fase 5 - Planos e Pagamentos Recorrentes (1 mês)**
- ✅ Sistema de planos (freemium/premium)
- ✅ Cobrança recorrente
- ✅ Split payment (comissão da plataforma)
- ✅ Suspensão por inadimplência
- ✅ Relatório financeiro

### **Fase 6 - Campanhas de Marketing (1 mês)**
- ✅ Criação de campanhas
- ✅ Geotargeting (notificações por região)
- ✅ Agendamento de campanhas
- ✅ Analytics de campanhas

### **Fase 7 - Melhorias e Otimizações (contínuo)**
- ✅ Chat em tempo real (Socket.io)
- ✅ PWA full (modo offline)
- ✅ Otimização de performance
- ✅ SEO avançado
- ✅ Testes automatizados
- ✅ Monitoramento (Sentry + Analytics)

---

## 💰 Modelo de Negócio Sugerido

### **Planos para Fornecedores**

#### **Plano Gratuito**
- Listagem básica no mapa
- 1 categoria
- 3 produtos/serviços cadastrados
- 1 foto por produto
- Sem destaque
- Sem e-commerce
- **Preço:** Grátis

#### **Plano Básico**
- Listagem completa
- 3 categorias
- 10 produtos/serviços
- 5 fotos por produto
- 3 produtos em destaque
- Telefone + WhatsApp visíveis
- **Preço:** R$ 49,90/mês

#### **Plano Profissional**
- Tudo do Básico +
- 5 categorias
- 50 produtos/serviços
- 10 fotos por produto
- 5 produtos em destaque
- E-commerce habilitado
- 1 campanha de marketing/mês
- Relatórios avançados
- **Preço:** R$ 149,90/mês

#### **Plano Premium**
- Tudo do Profissional +
- Categorias ilimitadas
- Produtos ilimitados
- Fotos ilimitadas
- 10 produtos em destaque
- 3 campanhas de marketing/mês
- Destaque no mapa (pin maior)
- Suporte prioritário
- API access
- **Preço:** R$ 299,90/mês

### **Outras Fontes de Receita**
- **Comissão sobre vendas:** 5-15% sobre transações via e-commerce
- **Anúncios pagos:** Fornecedores pagam para aparecer no topo
- **Taxa de verificação expressa:** Agilizar fiscalização
- **Leads qualificados:** Venda de dados agregados (anônimos)

---

## 🎨 Sugestões de UX/UI

### **App Cliente**
- Design minimalista e intuitivo
- Bottom navigation (Home, Buscar, Pedidos, Perfil)
- Mapa como elemento principal da home
- Cards de fornecedores com fotos atrativas
- Busca com autocomplete inteligente
- Filtros em slide-over panel
- Dark mode opcional

### **Painel Fornecedor**
- Dashboard com métricas em destaque
- Sidebar com navegação clara
- Onboarding wizard para novos usuários
- Notificações em tempo real (badge)
- Drag-and-drop para upload de fotos
- Editor WYSIWYG para descrições

### **Painel Admin**
- Interface robusta e informativa
- Gráficos e KPIs em tempo real
- Tabelas com filtros e sorting
- Ações em massa (aprovar, suspender)
- Sistema de busca global
- Logs de auditoria visíveis

---

## 📝 Próximos Passos

1. ✅ **Aprovação da arquitetura proposta**
2. ✅ **Definição da stack final**
3. ✅ **Setup do projeto (Next.js + Prisma + PostgreSQL)**
4. ✅ **Modelagem final do banco de dados**
5. ✅ **Implementação do MVP (Fase 1)**
6. ✅ **Testes com usuários piloto**
7. ✅ **Iteração e melhorias**
8. ✅ **Launch das fases seguintes**

---

## 📞 Observações Finais

Este documento serve como base para o desenvolvimento. Durante a implementação, ajustes podem ser necessários baseados em:

- **Feedback de usuários**
- **Limitações técnicas**
- **Custos de infraestrutura**
- **Regulamentações (LGPD, PCI DSS)**
- **Integrações com terceiros**

**Recomendação:** Iniciar com o MVP (Fase 1) e validar com um grupo pequeno de fornecedores e clientes antes de investir nas funcionalidades avançadas.
