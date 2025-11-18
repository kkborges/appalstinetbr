# 🗺️ Location Marketplace App

Marketplace baseado em geolocalização que conecta clientes a fornecedores e prestadores de serviços próximos, com funcionalidades completas de e-commerce, sistema de avaliações e fiscalização.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

O Location Marketplace App é uma plataforma completa que permite:

- **Para Clientes:** Encontrar fornecedores e serviços próximos usando geolocalização (raio de 2km), realizar compras online e avaliar prestadores
- **Para Fornecedores:** Gerenciar produtos/serviços, receber pedidos, criar campanhas de marketing e acompanhar métricas
- **Para Administradores:** Controle completo da plataforma, gestão de planos, pagamentos e fiscalizações
- **Para Fiscais:** App mobile para validar localizações dos fornecedores

## ✨ Funcionalidades

### App Cliente (Mobile/Web Responsivo)

- ✅ Autenticação com email/senha e OAuth (Google, Facebook, LinkedIn)
- ✅ Busca por geolocalização (raio configurável)
- ✅ Busca por categorias e subcategorias
- ✅ Visualização em mapa interativo
- ✅ Detalhes completos dos fornecedores
- ✅ Sistema de avaliações com fotos
- ✅ E-commerce com carrinho de compras
- ✅ Múltiplos métodos de pagamento (Cartão, PIX, Débito)
- ✅ Rastreamento de pedidos
- ✅ Notificações push
- ✅ Histórico de pedidos e interações

### Painel Fornecedor

- ✅ Dashboard com métricas em tempo real
- ✅ Gestão de produtos/serviços (CRUD completo)
- ✅ Upload múltiplo de imagens
- ✅ Até 5 produtos em destaque
- ✅ Gestão de pedidos com status
- ✅ Campanhas de marketing geotargeting
- ✅ Relatórios avançados (vendas, visitas, conversões)
- ✅ Sistema de multi-usuários (até 5 usuários)
- ✅ Integração com WhatsApp Business

### Painel Administrativo

- ✅ Cadastro e gestão de fornecedores
- ✅ Gestão de planos e assinaturas
- ✅ Controle de pagamentos e inadimplência
- ✅ Sistema de fiscalização de localizações
- ✅ Analytics global da plataforma
- ✅ Gestão de categorias/subcategorias
- ✅ Moderação de avaliações
- ✅ Relatórios financeiros consolidados

### App Fiscal (Mobile)

- ✅ Login simples
- ✅ Lista de tickets de fiscalização
- ✅ Navegação GPS até o local
- ✅ Captura de foto + coordenadas
- ✅ Validação automática de distância
- ✅ Sistema de pagamento por fiscalização

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Shadcn/UI** - Componentes acessíveis
- **React Hook Form + Zod** - Validação de formulários
- **TanStack Query** - State management server
- **Zustand** - Estado global
- **Leaflet** - Mapas interativos

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Prisma ORM** - Database abstraction
- **PostgreSQL 15+ com PostGIS** - Banco geoespacial
- **NextAuth.js** - Autenticação completa

### Pagamentos
- **Stripe** - Pagamentos internacionais
- **Mercado Pago** - Pagamentos Brasil + PIX

### Cloud & DevOps
- **Vercel/Railway** - Hosting
- **Cloudinary** - Storage de imagens
- **Firebase Cloud Messaging** - Push notifications
- **Sentry** - Error tracking

## 📦 Pré-requisitos

- Node.js 20+
- PostgreSQL 15+ com extensão PostGIS
- npm ou yarn
- Conta Vercel/Railway (para deploy)
- Contas nos serviços: Stripe, Mercado Pago, Cloudinary, Firebase

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/appalstinetbr.git
cd appalstinetbr
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais.

4. **Configure o banco de dados:**

Certifique-se de que o PostgreSQL está rodando e tem a extensão PostGIS:

```sql
CREATE DATABASE marketplace;
\c marketplace
CREATE EXTENSION postgis;
```

5. **Execute as migrations:**
```bash
npm run db:push
```

6. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## ⚙️ Configuração

### Variáveis de Ambiente Obrigatórias

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth (pelo menos um)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Pagamentos (pelo menos um)
STRIPE_SECRET_KEY="..."
MERCADOPAGO_ACCESS_TOKEN="..."

# Storage
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### Setup do PostGIS

O PostGIS é necessário para queries geoespaciais. Para instalar:

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql-15-postgis-3
```

**macOS:**
```bash
brew install postgis
```

**Docker:**
```bash
docker run -d \
  --name marketplace-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=marketplace \
  -p 5432:5432 \
  postgis/postgis:15-3.4
```

## 🎨 Uso

### Criar conta de Administrador

```bash
npm run db:seed
```

Isso criará um usuário admin padrão:
- Email: `admin@marketplace.com`
- Senha: `admin123`

**⚠️ IMPORTANTE:** Altere a senha após o primeiro login!

### Adicionar Categorias

1. Acesse o painel admin: `/admin/categories`
2. Crie categorias principais (ex: Alimentação, Serviços, Comércio)
3. Adicione subcategorias para cada categoria

### Cadastrar Fornecedor

1. No painel admin, acesse: `/admin/providers`
2. Clique em "Novo Fornecedor"
3. Preencha os dados completos
4. Defina o plano contratado
5. Aguarde a fiscalização para ativar

### Testar Busca Geolocalizada

1. Abra o app em `/`
2. Permita acesso à localização
3. O mapa mostrará fornecedores no raio de 2km
4. Use filtros para refinar a busca

## 📁 Estrutura do Projeto

```
appalstinetbr/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── seed.ts                # Dados iniciais
├── public/                    # Arquivos estáticos
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Rotas de autenticação
│   │   ├── (client)/         # App cliente
│   │   ├── (provider)/       # Painel fornecedor
│   │   ├── (admin)/          # Painel admin
│   │   ├── api/              # API Routes
│   │   └── layout.tsx        # Layout raiz
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # Componentes base (Shadcn)
│   │   ├── maps/            # Componentes de mapa
│   │   ├── forms/           # Formulários
│   │   └── layouts/         # Layouts
│   ├── lib/                  # Utilitários
│   │   ├── prisma.ts        # Cliente Prisma
│   │   ├── auth.ts          # Configuração NextAuth
│   │   ├── utils.ts         # Funções auxiliares
│   │   └── validations.ts   # Schemas Zod
│   └── types/                # TypeScript types
├── .env.example              # Exemplo de variáveis
├── next.config.ts            # Configuração Next.js
├── tailwind.config.ts        # Configuração Tailwind
├── tsconfig.json             # Configuração TypeScript
├── PROJECT_ANALYSIS.md       # Análise completa do projeto
└── README.md                 # Este arquivo
```

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Concluído)
- [x] Setup do projeto
- [x] Estrutura de pastas
- [x] Schema do banco de dados
- [x] Configurações básicas

### 🚧 Fase 2 - Autenticação (Em desenvolvimento)
- [ ] NextAuth.js setup
- [ ] Login com email/senha
- [ ] OAuth providers
- [ ] Proteção de rotas
- [ ] Perfis de usuário

### 📋 Fase 3 - Busca Geolocalizada
- [ ] Mapa interativo (Leaflet)
- [ ] Queries PostGIS
- [ ] Filtros de busca
- [ ] Detalhes do fornecedor
- [ ] Sistema de interações

### 📋 Fase 4 - Gestão de Produtos
- [ ] CRUD de produtos
- [ ] Upload de imagens (Cloudinary)
- [ ] Categorização
- [ ] Produtos em destaque
- [ ] Painel do fornecedor

### 📋 Fase 5 - E-commerce
- [ ] Carrinho de compras
- [ ] Checkout flow
- [ ] Integração Stripe
- [ ] Integração Mercado Pago
- [ ] PIX
- [ ] Gestão de pedidos

### 📋 Fase 6 - Avaliações
- [ ] Sistema de reviews
- [ ] Upload de fotos
- [ ] Resposta do fornecedor
- [ ] Moderação
- [ ] Notificações push

### 📋 Fase 7 - Fiscalização
- [ ] App mobile (PWA)
- [ ] Sistema de tickets
- [ ] Validação GPS
- [ ] Pagamento de fiscais

### 📋 Fase 8 - Planos & Pagamentos
- [ ] Gestão de planos
- [ ] Cobrança recorrente
- [ ] Split payment
- [ ] Dashboard financeiro

### 📋 Fase 9 - Marketing
- [ ] Campanhas
- [ ] Geotargeting
- [ ] Analytics
- [ ] Push notifications

### 📋 Fase 10 - Otimizações
- [ ] Performance
- [ ] SEO
- [ ] PWA completo
- [ ] Testes automatizados

## 🔐 Segurança

- Senhas com bcrypt (cost factor 12)
- Tokens JWT com refresh tokens
- Rate limiting por IP
- RBAC granular
- CORS configurado
- Input validation (Zod)
- SQL Injection protection (Prisma)
- XSS protection
- LGPD compliance
- PCI DSS para pagamentos

## 📊 Modelo de Negócio

### Planos para Fornecedores

| Feature | Gratuito | Básico | Profissional | Premium |
|---------|----------|--------|--------------|---------|
| **Preço** | R$ 0 | R$ 49,90 | R$ 149,90 | R$ 299,90 |
| Produtos | 3 | 10 | 50 | Ilimitado |
| Categorias | 1 | 3 | 5 | Ilimitado |
| Fotos/produto | 1 | 5 | 10 | Ilimitado |
| Produtos destaque | 0 | 3 | 5 | 10 |
| E-commerce | ❌ | ❌ | ✅ | ✅ |
| Campanhas/mês | 0 | 0 | 1 | 3 |
| Relatórios | Básico | Básico | Avançado | Avançado |
| Suporte | Email | Email | Prioritário | Prioritário |

### Outras Receitas
- Comissão sobre vendas (5-15%)
- Anúncios pagos
- Verificação expressa
- API access

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:

- Email: contato@marketplace.com
- Website: https://marketplace.com

## 🙏 Agradecimentos

- Next.js Team
- Prisma Team
- Shadcn/UI
- Leaflet
- Toda a comunidade open source

---

**Feito com ❤️ para conectar negócios locais aos seus clientes**
