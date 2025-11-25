# Configuração do Banco de Dados - Marketplace

## Problema Identificado

O erro que está ocorrendo é:

```
The table `public.users` does not exist in the current database.
```

Isso acontece porque:
1. As migrations do Prisma não foram executadas
2. O banco de dados não está configurado

## Solução

### Opção 1: Usando Docker (Recomendado)

1. Inicie um container PostgreSQL:

```bash
docker run -d \
  --name marketplace-postgres \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=marketplace \
  -p 5432:5432 \
  postgres:16-alpine
```

2. Aguarde alguns segundos para o PostgreSQL iniciar completamente:

```bash
sleep 5
```

3. Execute as migrations:

```bash
npx prisma migrate deploy
```

4. (Opcional) Execute o seed para popular o banco com dados iniciais:

```bash
npx ts-node prisma/seed.ts
```

### Opção 2: PostgreSQL Local

Se você já tem PostgreSQL instalado localmente:

1. Crie o banco de dados:

```bash
createdb marketplace
```

2. Verifique se a conexão está funcionando:

```bash
psql -d marketplace -c "SELECT version();"
```

3. Execute as migrations:

```bash
npx prisma migrate deploy
```

### Opção 3: Aplicar SQL Manualmente

Se as migrations do Prisma não funcionarem, você pode aplicar o SQL diretamente:

```bash
psql -d marketplace -f prisma/migrations/20251125_init/migration.sql
```

## Configuração do .env

O arquivo `.env` foi criado com as configurações padrão. Você precisa ajustar a variável `DATABASE_URL` se estiver usando configurações diferentes:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace?schema=public"
```

Substitua:
- `user` pelo seu usuário do PostgreSQL
- `password` pela sua senha do PostgreSQL
- `localhost:5432` pelo host e porta do seu banco de dados
- `marketplace` pelo nome do seu banco de dados

## Verificação

Para verificar se tudo está funcionando:

1. Verifique se as tabelas foram criadas:

```bash
npx prisma studio
```

Ou via psql:

```bash
psql -d marketplace -c "\dt"
```

2. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Estrutura Criada

A migration criou as seguintes tabelas:
- `users` - Usuários do sistema
- `accounts` - Contas OAuth
- `sessions` - Sessões de autenticação
- `verification_tokens` - Tokens de verificação
- `providers` - Fornecedores/Prestadores de serviço
- `provider_users` - Usuários associados aos fornecedores
- `categories` - Categorias de produtos
- `subcategories` - Subcategorias
- `provider_categories` - Relação entre fornecedores e categorias
- `products` - Produtos e serviços
- `orders` - Pedidos
- `order_items` - Itens dos pedidos
- `reviews` - Avaliações
- `interactions` - Interações de usuários
- `verifications` - Verificações fiscais
- `plans` - Planos de assinatura
- `subscriptions` - Assinaturas ativas
- `campaigns` - Campanhas de marketing
- `notifications` - Notificações

## Extensão PostGIS

A migration também instala a extensão PostGIS para suporte a dados geoespaciais, necessário para as funcionalidades de localização do marketplace.
