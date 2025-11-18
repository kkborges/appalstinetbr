import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@marketplace.com" },
    update: {},
    create: {
      email: "admin@marketplace.com",
      password: hashedPassword,
      name: "Administrador",
      role: "ADMIN",
      phone: "(11) 99999-9999",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create Categories
  const categories = [
    {
      name: "Alimentação",
      slug: "alimentacao",
      description: "Restaurantes, lanchonetes, padarias e deliveries",
      icon: "🍔",
      order: 1,
      subcategories: [
        { name: "Restaurantes", slug: "restaurantes", order: 1 },
        { name: "Lanchonetes", slug: "lanchonetes", order: 2 },
        { name: "Padarias", slug: "padarias", order: 3 },
        { name: "Cafeterias", slug: "cafeterias", order: 4 },
      ],
    },
    {
      name: "Serviços",
      slug: "servicos",
      description: "Prestadores de serviços diversos",
      icon: "🔧",
      order: 2,
      subcategories: [
        { name: "Manutenção", slug: "manutencao", order: 1 },
        { name: "Limpeza", slug: "limpeza", order: 2 },
        { name: "Beleza", slug: "beleza", order: 3 },
        { name: "Saúde", slug: "saude", order: 4 },
      ],
    },
    {
      name: "Comércio",
      slug: "comercio",
      description: "Lojas e estabelecimentos comerciais",
      icon: "🛒",
      order: 3,
      subcategories: [
        { name: "Supermercados", slug: "supermercados", order: 1 },
        { name: "Farmácias", slug: "farmacias", order: 2 },
        { name: "Pet Shops", slug: "pet-shops", order: 3 },
        { name: "Eletrônicos", slug: "eletronicos", order: 4 },
      ],
    },
    {
      name: "Educação",
      slug: "educacao",
      description: "Escolas, cursos e treinamentos",
      icon: "📚",
      order: 4,
      subcategories: [
        { name: "Escolas", slug: "escolas", order: 1 },
        { name: "Cursos", slug: "cursos", order: 2 },
        { name: "Idiomas", slug: "idiomas", order: 3 },
      ],
    },
    {
      name: "Saúde e Bem-estar",
      slug: "saude-bem-estar",
      description: "Clínicas, academias e espaços de bem-estar",
      icon: "💊",
      order: 5,
      subcategories: [
        { name: "Clínicas", slug: "clinicas", order: 1 },
        { name: "Academias", slug: "academias", order: 2 },
        { name: "Estética", slug: "estetica", order: 3 },
      ],
    },
  ];

  for (const category of categories) {
    const { subcategories, ...categoryData } = category;

    const createdCategory = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: categoryData,
    });

    console.log(`✅ Category created: ${createdCategory.name}`);

    // Create subcategories
    if (subcategories) {
      for (const subcategory of subcategories) {
        const createdSubcategory = await prisma.subcategory.upsert({
          where: {
            categoryId_slug: {
              categoryId: createdCategory.id,
              slug: subcategory.slug,
            },
          },
          update: {},
          create: {
            ...subcategory,
            categoryId: createdCategory.id,
          },
        });

        console.log(`  ✅ Subcategory created: ${createdSubcategory.name}`);
      }
    }
  }

  // Create Plans
  const plans = [
    {
      name: "Gratuito",
      slug: "free",
      description: "Plano básico para começar",
      price: 0,
      billingCycle: "MONTHLY" as const,
      features: {
        description: "Ideal para começar",
        features: [
          "Listagem no mapa",
          "1 categoria",
          "3 produtos/serviços",
          "1 foto por produto",
        ],
      },
      maxProducts: 3,
      maxCategories: 1,
      maxPhotosPerProduct: 1,
      maxFeaturedProducts: 0,
      hasEcommerce: false,
      hasCampaigns: false,
      maxCampaignsPerMonth: 0,
      hasAdvancedReports: false,
      isActive: true,
      order: 1,
    },
    {
      name: "Básico",
      slug: "basic",
      description: "Para pequenos negócios",
      price: 49.90,
      billingCycle: "MONTHLY" as const,
      features: {
        description: "Tudo do Gratuito, mais:",
        features: [
          "3 categorias",
          "10 produtos/serviços",
          "5 fotos por produto",
          "3 produtos em destaque",
          "Telefone e WhatsApp visíveis",
        ],
      },
      maxProducts: 10,
      maxCategories: 3,
      maxPhotosPerProduct: 5,
      maxFeaturedProducts: 3,
      hasEcommerce: false,
      hasCampaigns: false,
      maxCampaignsPerMonth: 0,
      hasAdvancedReports: false,
      isActive: true,
      order: 2,
    },
    {
      name: "Profissional",
      slug: "professional",
      description: "Para negócios em crescimento",
      price: 149.90,
      billingCycle: "MONTHLY" as const,
      features: {
        description: "Tudo do Básico, mais:",
        features: [
          "5 categorias",
          "50 produtos/serviços",
          "10 fotos por produto",
          "5 produtos em destaque",
          "E-commerce habilitado",
          "1 campanha de marketing/mês",
          "Relatórios avançados",
        ],
      },
      maxProducts: 50,
      maxCategories: 5,
      maxPhotosPerProduct: 10,
      maxFeaturedProducts: 5,
      hasEcommerce: true,
      hasCampaigns: true,
      maxCampaignsPerMonth: 1,
      hasAdvancedReports: true,
      isActive: true,
      order: 3,
    },
    {
      name: "Premium",
      slug: "premium",
      description: "Recursos ilimitados",
      price: 299.90,
      billingCycle: "MONTHLY" as const,
      features: {
        description: "Tudo do Profissional, mais:",
        features: [
          "Categorias ilimitadas",
          "Produtos ilimitados",
          "Fotos ilimitadas",
          "10 produtos em destaque",
          "3 campanhas de marketing/mês",
          "Destaque no mapa",
          "Suporte prioritário",
          "API access",
        ],
      },
      maxProducts: 0, // 0 = unlimited
      maxCategories: 0,
      maxPhotosPerProduct: 0,
      maxFeaturedProducts: 10,
      hasEcommerce: true,
      hasCampaigns: true,
      maxCampaignsPerMonth: 3,
      hasAdvancedReports: true,
      isActive: true,
      order: 4,
    },
  ];

  for (const plan of plans) {
    const createdPlan = await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: plan,
    });

    console.log(`✅ Plan created: ${createdPlan.name} - R$ ${createdPlan.price}`);
  }

  // Create Demo Provider
  const providerPassword = await bcrypt.hash("provider123", 12);
  const providerUser = await prisma.user.upsert({
    where: { email: "fornecedor@marketplace.com" },
    update: {},
    create: {
      email: "fornecedor@marketplace.com",
      password: providerPassword,
      name: "Fornecedor Demo",
      role: "PROVIDER",
      phone: "(11) 98888-8888",
      document: "12345678901",
      latitude: -23.5505,
      longitude: -46.6333,
    },
  });

  const freePlan = await prisma.plan.findUnique({ where: { slug: "free" } });

  const demoProvider = await prisma.provider.upsert({
    where: { userId: providerUser.id },
    update: {},
    create: {
      userId: providerUser.id,
      legalName: "Demo Fornecedor LTDA",
      tradeName: "Loja Demo",
      document: "12345678000100",
      description: "Esta é uma loja de demonstração do marketplace",
      street: "Avenida Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      country: "BR",
      latitude: -23.5617,
      longitude: -46.6560,
      phone: "(11) 98888-8888",
      whatsapp: "5511988888888",
      isVerified: true,
      verificationDate: new Date(),
    },
  });

  console.log(`✅ Demo provider created: ${demoProvider.tradeName}`);

  // Create subscription for demo provider
  if (freePlan) {
    await prisma.subscription.create({
      data: {
        providerId: demoProvider.id,
        planId: freePlan.id,
        status: "ACTIVE",
        startDate: new Date(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    console.log(`✅ Subscription created for demo provider`);
  }

  // Link categories to demo provider
  const alimentacaoCategory = await prisma.category.findUnique({
    where: { slug: "alimentacao" },
  });

  if (alimentacaoCategory) {
    await prisma.providerCategory.create({
      data: {
        providerId: demoProvider.id,
        categoryId: alimentacaoCategory.id,
      },
    });

    console.log(`✅ Category linked to demo provider`);
  }

  // Create demo products
  if (alimentacaoCategory) {
    const demoProducts = [
      {
        name: "X-Burger Especial",
        description: "Hambúrguer artesanal 200g, queijo, alface, tomate e molho especial",
        price: 25.90,
        slug: "x-burger-especial",
        images: [
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        ],
        isFeatured: true,
        featuredOrder: 1,
      },
      {
        name: "Pizza Margherita",
        description: "Molho de tomate, mussarela, manjericão e azeite",
        price: 45.00,
        slug: "pizza-margherita",
        images: [
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        ],
        isFeatured: true,
        featuredOrder: 2,
      },
      {
        name: "Refrigerante Lata",
        description: "Coca-Cola, Guaraná ou Fanta 350ml",
        price: 5.00,
        slug: "refrigerante-lata",
        images: [
          "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500",
        ],
        isFeatured: false,
      },
    ];

    for (const product of demoProducts) {
      await prisma.product.create({
        data: {
          ...product,
          providerId: demoProvider.id,
          categoryId: alimentacaoCategory.id,
          isActive: true,
        },
      });

      console.log(`✅ Demo product created: ${product.name}`);
    }
  }

  console.log("\n🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
