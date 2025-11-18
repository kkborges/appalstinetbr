// Re-export Prisma types
export type {
  User,
  Provider,
  Product,
  Category,
  Subcategory,
  Order,
  Review,
  Plan,
  Subscription,
  Campaign,
  Notification,
  UserRole,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  SubscriptionStatus,
} from "@prisma/client";

// Extended types
export interface ProviderWithDistance extends Provider {
  distance: number;
}

export interface ProductWithCategory extends Product {
  category: Category;
  subcategory?: Subcategory | null;
}

export interface OrderWithDetails extends Order {
  client: User;
  provider: Provider;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Geolocation types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AddressInput {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

// Search types
export interface SearchFilters {
  query?: string;
  categoryId?: string;
  subcategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  radius?: number; // in km
  coordinates?: Coordinates;
}

// Dashboard types
export interface ProviderStats {
  totalViews: number;
  totalClicks: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
}

export interface AdminStats {
  totalProviders: number;
  activeProviders: number;
  totalClients: number;
  activeClients: number;
  totalOrders: number;
  totalRevenue: number;
  gmv: number; // Gross Merchandise Value
}

import { Provider, Product, Category, Subcategory, Order, User } from "@prisma/client";
