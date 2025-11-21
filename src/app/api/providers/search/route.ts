import { NextResponse } from "next/server";
import { mockProviders, calculateDistance, calculateAvgRating } from "@/lib/mock-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = parseFloat(searchParams.get("latitude") || "0");
    const longitude = parseFloat(searchParams.get("longitude") || "0");
    const radius = parseFloat(searchParams.get("radius") || "2"); // default 2km
    const categoryId = searchParams.get("categoryId");
    const query = searchParams.get("query");

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Latitude e longitude são obrigatórias" },
        { status: 400 }
      );
    }

    // Using mock data temporarily (remove when database is ready)
    let providers = mockProviders;

    // Filter by category if specified
    if (categoryId) {
      providers = providers.filter((p) =>
        p.categories.some((c) => c.categoryId === categoryId)
      );
    }

    // Filter by search query if specified
    if (query) {
      const lowerQuery = query.toLowerCase();
      providers = providers.filter(
        (p) =>
          p.tradeName.toLowerCase().includes(lowerQuery) ||
          p.legalName.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Calculate distance and add average rating
    const providersWithDistance = providers
      .map((provider) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          provider.latitude,
          provider.longitude
        );

        const avgRating = calculateAvgRating(provider.id);

        return {
          ...provider,
          distance,
          avgRating,
        };
      })
      .filter((provider) => provider.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return NextResponse.json({
      providers: providersWithDistance,
      total: providersWithDistance.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fornecedores" },
      { status: 500 }
    );
  }
}
