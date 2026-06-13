"use client";

import { useEffect, useRef } from "react";
import { getGuestCart, clearGuestCart } from "@/lib/cart-store";
import { syncGuestCart } from "@/lib/actions/cart";

export function CartInitializer({ loggedIn }: { loggedIn: boolean }) {
  const merged = useRef(false);

  useEffect(() => {
    if (!loggedIn || merged.current) return;
    merged.current = true;

    const guest = getGuestCart();
    if (guest.items.length === 0) return;

    syncGuestCart(
      guest.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
    ).then(() => {
      clearGuestCart();
    });
  }, [loggedIn]);

  return null;
}
