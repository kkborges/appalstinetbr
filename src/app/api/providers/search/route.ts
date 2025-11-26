import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Calculate distance using Haversine formula (in km)
function calculateDistance(
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

    // Build where clause
    const where: any = {};

    // Filter by category if specified
    if (categoryId) {
      where.categories = {
        some: {
          categoryId: categoryId,
        },
      };
    }

    // Filter by search query if specified
    if (query) {
      where.OR = [
        { tradeName: { contains: query, mode: "insensitive" } },
        { legalName: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    // Fetch providers from database
    const providers = await prisma.provider.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            products: true,
            reviews: true,
          },
        },
      },
    });

    // Calculate distance and average rating for each provider
    const providersWithDistance = await Promise.all(
      providers.map(async (provider) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          provider.latitude,
          provider.longitude
        );

        // Calculate average rating from reviews
        const reviews = await prisma.review.findMany({
          where: {
            providerId: provider.id,
            isApproved: true,
          },
          select: {
            rating: true,
          },
        });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return {
          ...provider,
          distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
          avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
        };
      })
    );

    // Filter by radius and sort by distance
    const filteredProviders = providersWithDistance
      .filter((provider) => provider.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return NextResponse.json({
      providers: filteredProviders,
      total: filteredProviders.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fornecedores" },
      { status: 500 }
    );
  }
}
