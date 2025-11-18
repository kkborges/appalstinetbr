# 🚀 Guia Rápido - Location Marketplace App

## ⚡ Início Rápido (5 minutos)

### 1. **Instalar Dependências**
```bash
npm install
```

### 2. **Configurar Banco de Dados**

#### Opção A: Docker (Recomendado)
```bash
docker run -d \
  --name marketplace-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=marketplace \
  -p 5432:5432 \
  postgis/postgis:15-3.4
```

#### Opção B: PostgreSQL Local
```bash
# Instalar PostGIS
sudo apt-get install postgresql-15-postgis-3  # Ubuntu/Debian
brew install postgis  # macOS

# Criar database
createdb marketplace
psql marketplace -c "CREATE EXTENSION postgis;"
```

### 3. **Configurar Variáveis de Ambiente**
```bash
cp .env.example .env
```

**Edite `.env` com as configurações mínimas:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marketplace"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# OAuth Google (Opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Cloudinary (Opcional - para upload de imagens)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="marketplace"
```

### 4. **Executar Migrations e Seed**
```bash
npm run db:push
npm run db:seed
```

### 5. **Iniciar Servidor**
```bash
npm run dev
```

**Acesse:** [http://localhost:3000](http://localhost:3000)

---

## 👥 Usuários de Teste

Após executar `npm run db:seed`, você terá:

### Admin
- **Email:** admin@marketplace.com
- **Senha:** admin123
- **Acesso:** [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

### Fornecedor Demo
- **Email:** fornecedor@marketplace.com
- **Senha:** provider123
- **Acesso:** [http://localhost:3000/provider/dashboard](http://localhost:3000/provider/dashboard)

### Cliente
- **Crie sua conta:** [http://localhost:3000/auth/register](http://localhost:3000/auth/register)

---

## 📱 Principais Funcionalidades Implementadas

### ✅ Para Clientes
- [x] Busca por geolocalização (raio 2km)
- [x] Mapa interativo com Leaflet
- [x] Filtros por categoria
- [x] Visualização de produtos
- [x] Avaliações e reviews
- [x] Contato direto (WhatsApp/Telefone)
- [x] Sistema de pedidos

### ✅ Para Fornecedores
- [x] Dashboard com métricas
- [x] CRUD completo de produtos
- [x] Upload de até 10 imagens por produto
- [x] Produtos em destaque
- [x] Controle de estoque
- [x] Gestão de pedidos
- [x] Relatórios básicos

### ✅ Para Administradores
- [x] Dashboard administrativo
- [x] Gestão de fornecedores
- [x] Gestão de categorias
- [x] Gestão de planos
- [x] Métricas da plataforma

---

## 🗂️ Estrutura do Projeto

```
appalstinetbr/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Páginas de autenticação
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       └── register/
│   │   ├── (client)/        # App do cliente
│   │   │   └── page.tsx     # Mapa e busca
│   │   ├── (provider)/      # Painel do fornecedor
│   │   │   └── provider/
│   │   │       ├── dashboard/
│   │   │       └── products/
│   │   ├── (admin)/         # Painel admin
│   │   │   └── admin/
│   │   │       └── dashboard/
│   │   └── api/             # API Routes
│   │       ├── auth/
│   │       ├── products/
│   │       ├── providers/
│   │       ├── orders/
│   │       ├── reviews/
│   │       └── categories/
│   ├── components/
│   │   ├── ui/              # Shadcn/UI components
│   │   └── maps/            # Map components
│   ├── lib/
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client
│   │   ├── utils.ts         # Utilities
│   │   └── cart-store.ts    # Zustand store
│   └── types/               # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
├── .env.example             # Environment template
├── PROJECT_ANALYSIS.md      # Detailed analysis
└── README.md                # Full documentation
```

---

## 🔑 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev
npm run build            # Build para produção
npm run start            # Inicia servidor produção

# Database
npm run db:push          # Aplica schema ao DB (dev)
npm run db:migrate       # Cria migration
npm run db:seed          # Popula com dados
npm run db:studio        # Abre Prisma Studio
npm run db:generate      # Gera Prisma Client

# Code Quality
npm run lint             # Roda ESLint
```

---

## 🎨 Categorias Disponíveis (via Seed)

1. **🍔 Alimentação** - Restaurantes, Lanchonetes, Padarias, Cafeterias
2. **🔧 Serviços** - Manutenção, Limpeza, Beleza, Saúde
3. **🛒 Comércio** - Supermercados, Farmácias, Pet Shops, Eletrônicos
4. **📚 Educação** - Escolas, Cursos, Idiomas
5. **💊 Saúde e Bem-estar** - Clínicas, Academias, Estética

---

## 💳 Planos de Assinatura (via Seed)

| Plano | Preço | Produtos | Categorias | E-commerce | Destaque |
|-------|-------|----------|------------|------------|----------|
| **Gratuito** | R$ 0 | 3 | 1 | ❌ | 0 |
| **Básico** | R$ 49,90 | 10 | 3 | ❌ | 3 |
| **Profissional** | R$ 149,90 | 50 | 5 | ✅ | 5 |
| **Premium** | R$ 299,90 | ∞ | ∞ | ✅ | 10 |

---

## 🔧 Configuração Completa (Produção)

### OAuth Providers

#### Google OAuth
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto novo
3. Ative "Google+ API"
4. Crie credenciais OAuth 2.0
5. Adicione URLs autorizadas:
   - `http://localhost:3000` (dev)
   - `https://seudominio.com` (prod)
6. Adicione redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://seudominio.com/api/auth/callback/google`

### Cloudinary (Upload de Imagens)
1. Crie conta em [Cloudinary](https://cloudinary.com/)
2. No Dashboard, copie:
   - Cloud Name
   - API Key
   - API Secret
3. Crie um Upload Preset:
   - Settings → Upload → Add upload preset
   - Nome: `marketplace`
   - Signing Mode: `Unsigned`

---

## 📊 Database Schema

O projeto usa **15 modelos Prisma**:

- **Users** - Autenticação multi-role
- **Providers** - Fornecedores com geolocalização
- **Products** - Produtos/serviços
- **Categories/Subcategories** - Organização
- **Orders/OrderItems** - E-commerce
- **Reviews** - Avaliações
- **Plans/Subscriptions** - Planos de assinatura
- **Campaigns** - Marketing
- **Verifications** - Fiscalização
- **Interactions** - Analytics
- **Notifications** - Push notifications

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'bcryptjs'"
```bash
npm install
```

### Erro: "Database does not exist"
```bash
createdb marketplace
psql marketplace -c "CREATE EXTENSION postgis;"
npm run db:push
```

### Erro: "NEXTAUTH_SECRET is not defined"
```bash
# Adicione no .env:
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### Imagens não fazem upload
- Verifique configuração do Cloudinary no `.env`
- Crie upload preset "marketplace" no Cloudinary
- Tamanho máximo: 5MB por imagem

---

## 📚 Documentação Adicional

- **README.md** - Documentação completa do projeto
- **PROJECT_ANALYSIS.md** - Análise detalhada com 50+ melhorias
- **prisma/schema.prisma** - Schema completo do database

---

## 🎯 Próximos Passos

### Implementações Futuras
- [ ] Integração Stripe/Mercado Pago
- [ ] Notificações push real-time
- [ ] App fiscal (PWA)
- [ ] Campanhas de marketing
- [ ] Chat em tempo real
- [ ] Analytics avançado
- [ ] Testes automatizados

### Para Desenvolvimento
```bash
# 1. Fork o projeto
# 2. Crie uma branch
git checkout -b feature/minha-feature

# 3. Commit suas mudanças
git commit -m "feat: adiciona nova funcionalidade"

# 4. Push para a branch
git push origin feature/minha-feature

# 5. Abra um Pull Request
```

---

## 💡 Dicas

1. **Geolocalização**: Chrome/Firefox solicitam permissão para acessar localização. Aceite para usar a busca por proximidade.

2. **Produtos Demo**: Após seed, você terá 3 produtos de exemplo na categoria Alimentação.

3. **Prisma Studio**: Use `npm run db:studio` para visualizar/editar dados do banco visualmente.

4. **Hot Reload**: O Next.js 15 tem hot reload automático. Salve e veja as mudanças instantaneamente.

5. **Leaflet Maps**: Os mapas usam OpenStreetMap (gratuito). Para produção, considere Mapbox ou Google Maps.

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-repo/issues)
- **Documentação**: Veja README.md e PROJECT_ANALYSIS.md

---

**Desenvolvido com ❤️ para conectar negócios locais aos seus clientes**
