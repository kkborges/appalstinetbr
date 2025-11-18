import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  price: z.number().positive("Preço deve ser positivo"),
  categoryId: z.string(),
  subcategoryId: z.string().optional(),
  images: z.array(z.string()).min(1, "Adicione pelo menos uma imagem"),
  hasStock: z.boolean().default(false),
  stock: z.number().optional(),
  isFeatured: z.boolean().default(false),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get("providerId");
    const categoryId = searchParams.get("categoryId");

    const where: any = {
      isActive: true,
    };

    if (providerId) {
      where.providerId = providerId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        subcategory: true,
        provider: {
          select: {
            id: true,
            tradeName: true,
            legalName: true,
            logo: true,
          },
        },
      },
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "PROVIDER") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    // Get provider
    const provider = await prisma.provider.findUnique({
      where: { userId: session.user.id },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = productSchema.parse(body);

    // Generate slug
    const slug = validatedData.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        providerId: provider.id,
        slug,
      },
    });

    const finalSlug = existingProduct
      ? `${slug}-${Date.now()}`
      : slug;

    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug: finalSlug,
        providerId: provider.id,
        images: validatedData.images,
      },
      include: {
        category: true,
        subcategory: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
