import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartContent } from "@/components/cart/cart-content";
import type { CartItemData } from "@/lib/cart-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keranjang",
};

export default async function CartPage() {
  const session = await auth();
  let initialItems: CartItemData[] = [];

  if (session?.user?.id) {
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (cart) {
      initialItems = cart.items.map((item) => {
        const price = item.variant?.price ?? item.product.price;
        return {
          productId: item.productId,
          variantId: item.variantId,
          name: item.product.name,
          variantLabel: item.variant?.label ?? null,
          image: item.product.images[0] ?? null,
          price,
          quantity: item.quantity,
          slug: item.product.slug,
          inStock: item.variant?.stock ?? item.product.inStock,
        } satisfies CartItemData;
      });
    }
  }

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <h1 className="font-heading text-headline-lg text-primary">
        Keranjang
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant">
        Review pesanan Anda sebelum checkout.
      </p>
      <CartContent
        initialItems={initialItems}
        loggedIn={!!session?.user?.id}
      />
    </section>
  );
}
