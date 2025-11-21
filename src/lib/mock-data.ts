// Mock data for development without database
export const mockUsers = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@marketplace.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5kuY/RFD6lBW6", // password: admin123
    role: "ADMIN",
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "user-2",
    name: "João Silva",
    email: "joao@email.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5kuY/RFD6lBW6", // password: admin123
    role: "CLIENT",
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "user-3",
    name: "Restaurante Bom Sabor",
    email: "contato@bomsabor.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5kuY/RFD6lBW6", // password: admin123
    role: "PROVIDER",
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCategories = [
  { id: "cat-1", name: "Restaurantes", icon: "🍽️", description: "Restaurantes e delivery" },
  { id: "cat-2", name: "Supermercados", icon: "🛒", description: "Mercados e hortifruti" },
  { id: "cat-3", name: "Farmácias", icon: "💊", description: "Farmácias e drogarias" },
  { id: "cat-4", name: "Serviços", icon: "🔧", description: "Reparos e manutenção" },
  { id: "cat-5", name: "Beleza", icon: "💇", description: "Salões e estética" },
];

export const mockProviders = [
  {
    id: "prov-1",
    userId: "user-3",
    legalName: "Restaurante Bom Sabor LTDA",
    tradeName: "Bom Sabor",
    document: "12345678000190",
    description: "Restaurante com comida caseira e delivery rápido",
    logo: null,
    coverImage: null,
    street: "Av. Paulista",
    number: "1000",
    complement: "Loja 5",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    country: "Brasil",
    latitude: -23.5629,
    longitude: -46.6544,
    phone: "(11) 98765-4321",
    whatsapp: "5511987654321",
    website: "https://bomsabor.com",
    instagram: "@bomsabor",
    facebook: null,
    businessHours: JSON.stringify({
      "seg-sex": "11:00-23:00",
      "sab": "11:00-00:00",
      "dom": "11:00-22:00"
    }),
    isVerified: true,
    verificationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [{ categoryId: "cat-1" }],
    _count: {
      products: 12,
      reviews: 45,
    },
  },
  {
    id: "prov-2",
    userId: "user-3",
    legalName: "Farmácia Saúde Total LTDA",
    tradeName: "Farmácia Saúde Total",
    document: "98765432000111",
    description: "Farmácia 24h com delivery grátis acima de R$ 50",
    logo: null,
    coverImage: null,
    street: "Rua Augusta",
    number: "2500",
    complement: null,
    neighborhood: "Consolação",
    city: "São Paulo",
    state: "SP",
    zipCode: "01412-100",
    country: "Brasil",
    latitude: -23.5558,
    longitude: -46.6619,
    phone: "(11) 97777-8888",
    whatsapp: "5511977778888",
    website: "https://saudetotal.com",
    instagram: "@saudetotal",
    facebook: null,
    businessHours: JSON.stringify({
      "todos": "00:00-23:59"
    }),
    isVerified: true,
    verificationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [{ categoryId: "cat-3" }],
    _count: {
      products: 230,
      reviews: 128,
    },
  },
  {
    id: "prov-3",
    userId: "user-3",
    legalName: "Supermercado Economia LTDA",
    tradeName: "Super Economia",
    document: "11122233000144",
    description: "Supermercado com os melhores preços da região",
    logo: null,
    coverImage: null,
    street: "Av. Brigadeiro Luís Antônio",
    number: "800",
    complement: null,
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01318-000",
    country: "Brasil",
    latitude: -23.5586,
    longitude: -46.6498,
    phone: "(11) 96666-5555",
    whatsapp: "5511966665555",
    website: "https://supereconomia.com",
    instagram: "@supereconomia",
    facebook: null,
    businessHours: JSON.stringify({
      "seg-sab": "07:00-22:00",
      "dom": "08:00-20:00"
    }),
    isVerified: true,
    verificationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [{ categoryId: "cat-2" }],
    _count: {
      products: 850,
      reviews: 89,
    },
  },
  {
    id: "prov-4",
    userId: "user-3",
    legalName: "Salão Beleza Pura LTDA",
    tradeName: "Beleza Pura",
    document: "55566677000188",
    description: "Salão de beleza com profissionais qualificados",
    logo: null,
    coverImage: null,
    street: "Rua da Consolação",
    number: "1500",
    complement: "2º andar",
    neighborhood: "Consolação",
    city: "São Paulo",
    state: "SP",
    zipCode: "01301-100",
    country: "Brasil",
    latitude: -23.5487,
    longitude: -46.6513,
    phone: "(11) 95555-4444",
    whatsapp: "5511955554444",
    website: "https://belezapura.com",
    instagram: "@belezapura",
    facebook: null,
    businessHours: JSON.stringify({
      "seg-sex": "09:00-19:00",
      "sab": "09:00-17:00"
    }),
    isVerified: true,
    verificationDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [{ categoryId: "cat-5" }],
    _count: {
      products: 25,
      reviews: 67,
    },
  },
];

// Calculate distance using Haversine formula (in km)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate average rating for a provider
export function calculateAvgRating(providerId: string): number {
  // Mock ratings
  const ratings: Record<string, number> = {
    "prov-1": 4.5,
    "prov-2": 4.8,
    "prov-3": 4.2,
    "prov-4": 4.7,
  };
  return ratings[providerId] || 0;
}
