import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { status, paymentStatus, trackingCode, providerNotes } = body;

    // Verify access
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { provider: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    // Only provider or admin can update
    if (session.user.role === "PROVIDER") {
      const provider = await prisma.provider.findUnique({
        where: { userId: session.user.id },
      });

      if (!provider || provider.id !== order.providerId) {
        return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
      }
    } else if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(trackingCode && { trackingCode }),
        ...(providerNotes && { providerNotes }),
        ...(status === "DELIVERED" && { deliveredAt: new Date() }),
      },
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
      },
    });

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar pedido" },
      { status: 500 }
    );
  }
}
