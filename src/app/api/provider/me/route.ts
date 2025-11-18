import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "PROVIDER") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    const provider = await prisma.provider.findUnique({
      where: { userId: session.user.id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        subscription: {
          include: {
            plan: true,
          },
        },
        _count: {
          select: {
            products: true,
            orders: true,
            reviews: true,
            interactions: true,
          },
        },
      },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 }
      );
    }

    // Calculate average rating
    const reviews = await prisma.review.findMany({
      where: { providerId: provider.id },
      select: { rating: true },
    });

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      provider: {
        ...provider,
        avgRating: Math.round(avgRating * 10) / 10,
      },
    });
  } catch (error) {
    console.error("Provider fetch error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados do fornecedor" },
      { status: 500 }
    );
  }
}
