import { NextResponse } from "next/server";
import { mockCategories } from "@/lib/mock-data";

export async function GET() {
  try {
    // Using mock data temporarily (remove when database is ready)
    const categories = mockCategories;

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, icon, order } = body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon,
        order: order || 0,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
