import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const orderSchema = z.object({
  providerId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
      unitPrice: z.number().positive(),
    })
  ),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PIX", "CASH_ON_DELIVERY"]),
  deliveryAddress: z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  clientNotes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Calculate total
    const totalAmount = validatedData.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        clientId: session.user.id,
        providerId: validatedData.providerId,
        totalAmount,
        status: "PENDING",
        paymentMethod: validatedData.paymentMethod,
        paymentStatus: "PENDING",
        deliveryAddress: validatedData.deliveryAddress,
        clientNotes: validatedData.clientNotes,
        items: {
          create: validatedData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.unitPrice * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        provider: {
          select: {
            tradeName: true,
            legalName: true,
            phone: true,
            whatsapp: true,
          },
        },
      },
    });

    // Create interaction record
    await prisma.interaction.create({
      data: {
        clientId: session.user.id,
        providerId: validatedData.providerId,
        type: "CLICK",
        metadata: {
          action: "order_created",
          orderId: order.id,
        },
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get("providerId");

    const where: any = {};

    // Filter based on role
    if (session.user.role === "CLIENT") {
      where.clientId = session.user.id;
    } else if (session.user.role === "PROVIDER") {
      const provider = await prisma.provider.findUnique({
        where: { userId: session.user.id },
      });

      if (!provider) {
        return NextResponse.json(
          { error: "Fornecedor não encontrado" },
          { status: 404 }
        );
      }

      where.providerId = provider.id;
    }

    if (providerId) {
      where.providerId = providerId;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        client: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        provider: {
          select: {
            tradeName: true,
            legalName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 });
  }
}
