import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const providerSchema = z.object({
  legalName: z.string().min(3, "Razão social deve ter no mínimo 3 caracteres"),
  tradeName: z.string().optional(),
  document: z.string().min(11, "CNPJ/CPF inválido"),
  description: z.string().optional(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  zipCode: z.string().min(8, "CEP inválido"),
  country: z.string().default("BR"),
  latitude: z.number(),
  longitude: z.number(),
  phone: z.string().min(10, "Telefone inválido"),
  whatsapp: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  businessHours: z.any().optional(),
  categoryIds: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const isVerified = searchParams.get("isVerified");

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (isVerified !== null && isVerified !== undefined) {
      where.isVerified = isVerified === "true";
    }

    const providers = await prisma.provider.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
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
            reviews: true,
            orders: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ providers });
  } catch (error) {
    console.error("Providers fetch error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fornecedores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = providerSchema.parse(body);

    // Check if user already has a provider
    const existingProvider = await prisma.provider.findUnique({
      where: { userId: session.user.id },
    });

    if (existingProvider) {
      return NextResponse.json(
        { error: "Usuário já possui um fornecedor cadastrado" },
        { status: 400 }
      );
    }

    // Check if document already exists
    const existingDocument = await prisma.provider.findUnique({
      where: { document: validatedData.document },
    });

    if (existingDocument) {
      return NextResponse.json(
        { error: "CNPJ/CPF já cadastrado" },
        { status: 400 }
      );
    }

    const { categoryIds, ...providerData } = validatedData;

    // Create provider
    const provider = await prisma.provider.create({
      data: {
        ...providerData,
        userId: session.user.id,
        categories: {
          create: categoryIds.map((categoryId) => ({
            categoryId,
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Update user role to PROVIDER
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "PROVIDER" },
    });

    return NextResponse.json({ provider }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Provider creation error:", error);
    return NextResponse.json(
      { error: "Erro ao criar fornecedor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, categoryIds, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do fornecedor é obrigatório" },
        { status: 400 }
      );
    }

    // Check if user owns this provider or is admin
    const provider = await prisma.provider.findUnique({
      where: { id },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 }
      );
    }

    if (provider.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    // Update provider
    const updatedProvider = await prisma.provider.update({
      where: { id },
      data: {
        ...data,
        ...(categoryIds && {
          categories: {
            deleteMany: {},
            create: categoryIds.map((categoryId: string) => ({
              categoryId,
            })),
          },
        }),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json({ provider: updatedProvider });
  } catch (error) {
    console.error("Provider update error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar fornecedor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do fornecedor é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.provider.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Provider deletion error:", error);
    return NextResponse.json(
      { error: "Erro ao deletar fornecedor" },
      { status: 500 }
    );
  }
}
