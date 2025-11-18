import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  providerId: z.string(),
  orderId: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    // Check if user already reviewed this provider
    const existingReview = await prisma.review.findFirst({
      where: {
        clientId: session.user.id,
        providerId: validatedData.providerId,
        ...(validatedData.orderId && { orderId: validatedData.orderId }),
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "Você já avaliou este fornecedor" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        clientId: session.user.id,
        providerId: validatedData.providerId,
        orderId: validatedData.orderId,
        rating: validatedData.rating,
        comment: validatedData.comment,
        images: validatedData.images || [],
        isApproved: true, // Auto-approve for now
      },
      include: {
        client: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get("providerId");

    if (!providerId) {
      return NextResponse.json(
        { error: "providerId é obrigatório" },
        { status: 400 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        providerId,
        isApproved: true,
      },
      include: {
        client: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json({ error: "Erro ao buscar avaliações" }, { status: 500 });
  }
}
