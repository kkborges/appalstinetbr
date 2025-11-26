import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Providers stats
    const totalProviders = await prisma.provider.count();
    const activeProviders = await prisma.provider.count({
      where: { isVerified: true },
    });
    const pendingProviders = await prisma.provider.count({
      where: { isVerified: false },
    });
    const providersThisMonth = await prisma.provider.count({
      where: { createdAt: { gte: startOfMonth } },
    });
    const providersLastMonth = await prisma.provider.count({
      where: {
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    });

    // Users stats
    const totalUsers = await prisma.user.count();
    const usersThisMonth = await prisma.user.count({
      where: { createdAt: { gte: startOfMonth } },
    });
    const usersLastMonth = await prisma.user.count({
      where: {
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    });

    // Orders stats
    const totalOrders = await prisma.order.count();
    const pendingOrders = await prisma.order.count({
      where: { status: "PENDING" },
    });
    const completedOrders = await prisma.order.count({
      where: { status: "DELIVERED" },
    });
    const cancelledOrders = await prisma.order.count({
      where: { status: "CANCELLED" },
    });
    const ordersThisMonth = await prisma.order.count({
      where: { createdAt: { gte: startOfMonth } },
    });
    const ordersLastMonth = await prisma.order.count({
      where: {
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    });

    // Revenue stats
    const revenueData = await prisma.order.aggregate({
      where: {
        paymentStatus: "COMPLETED",
      },
      _sum: {
        totalAmount: true,
      },
    });

    const revenueThisMonth = await prisma.order.aggregate({
      where: {
        paymentStatus: "COMPLETED",
        createdAt: { gte: startOfMonth },
      },
      _sum: {
        totalAmount: true,
      },
    });

    const revenueLastMonth = await prisma.order.aggregate({
      where: {
        paymentStatus: "COMPLETED",
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Calculate growth percentages
    const providersGrowth =
      providersLastMonth > 0
        ? ((providersThisMonth - providersLastMonth) / providersLastMonth) * 100
        : 0;

    const usersGrowth =
      usersLastMonth > 0
        ? ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100
        : 0;

    const ordersGrowth =
      ordersLastMonth > 0
        ? ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100
        : 0;

    const revenueGrowth =
      Number(revenueLastMonth._sum.totalAmount || 0) > 0
        ? ((Number(revenueThisMonth._sum.totalAmount || 0) -
            Number(revenueLastMonth._sum.totalAmount || 0)) /
            Number(revenueLastMonth._sum.totalAmount || 0)) *
          100
        : 0;

    // Get pending providers
    const pendingProvidersList = await prisma.provider.findMany({
      where: { isVerified: false },
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
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // Get top categories
    const categoriesWithStats = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            providers: true,
            products: true,
          },
        },
      },
      orderBy: {
        providers: {
          _count: "desc",
        },
      },
      take: 10,
    });

    const stats = {
      providers: {
        total: totalProviders,
        pending: pendingProviders,
        active: activeProviders,
        inactive: totalProviders - activeProviders,
        growth: Math.round(providersGrowth * 10) / 10,
      },
      users: {
        total: totalUsers,
        active: totalUsers,
        inactive: 0,
        growth: Math.round(usersGrowth * 10) / 10,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders,
        growth: Math.round(ordersGrowth * 10) / 10,
      },
      revenue: {
        total: Number(revenueData._sum.totalAmount || 0),
        thisMonth: Number(revenueThisMonth._sum.totalAmount || 0),
        growth: Math.round(revenueGrowth * 10) / 10,
      },
    };

    return NextResponse.json({
      stats,
      pendingProviders: pendingProvidersList,
      topCategories: categoriesWithStats,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
