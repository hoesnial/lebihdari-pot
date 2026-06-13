import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartInitializer } from "@/components/cart/cart-initializer";
import type { CartItemData } from "@/lib/cart-store";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let initialItems: CartItemData[] = [];

  if (session?.user?.id) {
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: true, variant: true },
        },
      },
    });

    if (cart) {
      initialItems = cart.items.map((item) => ({
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
    }
  }

  return (
    <CartProvider
      initialItems={initialItems}
      loggedIn={!!session?.user?.id}
    >
      <CartInitializer loggedIn={!!session?.user?.id} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
}
