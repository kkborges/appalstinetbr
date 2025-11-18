"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MapView } from "@/components/maps/map-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Star, Phone, MessageCircle } from "lucide-react";

export default function ClientPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(coords);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to São Paulo
          setUserLocation([-23.5505, -46.6333]);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Load categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((error) => console.error("Error loading categories:", error));
  }, []);

  useEffect(() => {
    if (userLocation) {
      searchProviders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, selectedCategory]);

  const searchProviders = async () => {
    if (!userLocation) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        latitude: userLocation[0].toString(),
        longitude: userLocation[1].toString(),
        radius: "2",
      });

      if (selectedCategory) {
        params.append("categoryId", selectedCategory);
      }

      if (searchQuery) {
        params.append("query", searchQuery);
      }

      const response = await fetch(`/api/providers/search?${params}`);
      const data = await response.json();
      setProviders(data.providers || []);
    } catch (error) {
      console.error("Error searching providers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProviders();
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Location Marketplace</h1>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="text-sm">Olá, {session.user.name}</span>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/api/auth/signout")}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth/login")}
                  >
                    Entrar
                  </Button>
                  <Button onClick={() => router.push("/auth/register")}>
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Buscar produtos ou serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </form>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div className="flex-1">
          {userLocation ? (
            <MapView providers={providers} center={userLocation} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Obtendo sua localização...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with provider list */}
        <div className="w-96 border-l bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              {providers.length} fornecedores encontrados
            </h2>

            {providers.length === 0 && !isLoading && (
              <p className="text-center text-gray-500 py-8">
                Nenhum fornecedor encontrado nesta região
              </p>
            )}

            <div className="space-y-4">
              {providers.map((provider) => (
                <Card key={provider.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {provider.tradeName || provider.legalName}
                    </h3>

                    {provider.avgRating > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {provider.avgRating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({provider._count.reviews} avaliações)
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.distance.toFixed(2)} km</span>
                    </div>

                    {provider.description && (
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {provider.description}
                      </p>
                    )}

                    <div className="flex gap-2">
                      {provider.phone && (
                        <a
                          href={`tel:${provider.phone}`}
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full">
                            <Phone className="mr-2 h-4 w-4" />
                            Ligar
                          </Button>
                        </a>
                      )}
                      {provider.whatsapp && (
                        <a
                          href={`https://wa.me/${provider.whatsapp.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
