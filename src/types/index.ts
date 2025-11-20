// Re-export Prisma types
// Note: Types are defined as placeholders until Prisma client is properly generated
export type User = any;
export type Provider = any;
export type Product = any;
export type Category = any;
export type Subcategory = any;
export type Order = any;
export type Review = any;
export type Plan = any;
export type Subscription = any;
export type Campaign = any;
export type Notification = any;
export type UserRole = "CLIENT" | "PROVIDER" | "ADMIN" | "FISCAL";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "PIX" | "BOLETO";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";

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
