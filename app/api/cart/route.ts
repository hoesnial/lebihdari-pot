import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true, variant: true },
      },
    },
  });

  if (!cart) {
    return NextResponse.json({ items: [] });
  }

  const items = cart.items.map((item) => ({
    productId: item.productId,
    variantId: item.variantId,
    name: item.product.name,
    variantLabel: item.variant?.label ?? null,
    image: item.product.images[0] ?? null,
    price: item.variant?.price ?? item.product.price,
    quantity: item.quantity,
    slug: item.product.slug,
    inStock: item.variant?.stock ?? item.product.inStock,
  }));

  return NextResponse.json({ items });
}
