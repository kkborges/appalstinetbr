import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateDistance } from "@/lib/utils";

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
    const where: any = {
      isVerified: true,
    };

    if (categoryId) {
      where.categories = {
        some: {
          categoryId,
        },
      };
    }

    if (query) {
      where.OR = [
        { tradeName: { contains: query, mode: "insensitive" } },
        { legalName: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    // Get all providers matching criteria
    const providers = await prisma.provider.findMany({
      where,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        reviews: {
          select: {
            rating: true,
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

    // Filter by distance and calculate distance for each
    const providersWithDistance = providers
      .map((provider) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          provider.latitude,
          provider.longitude
        );

        // Calculate average rating
        const avgRating =
          provider.reviews.length > 0
            ? provider.reviews.reduce((sum, r) => sum + r.rating, 0) /
              provider.reviews.length
            : 0;

        return {
          ...provider,
          distance,
          avgRating: Math.round(avgRating * 10) / 10,
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
