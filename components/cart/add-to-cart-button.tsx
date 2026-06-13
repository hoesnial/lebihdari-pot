"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { addToCart } from "@/lib/actions/cart";

interface Props {
  productId: string;
  variantId?: string | null;
  name: string;
  variantLabel: string | null;
  image: string | null;
  price: number;
  slug: string;
  inStock: boolean;
}

export function AddToCartButton({
  productId,
  variantId,
  name,
  variantLabel,
  image,
  price,
  slug,
  inStock,
}: Props) {
  const { addItem, isLoggedIn } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!inStock) return null;

  async function handleAdd() {
    const item = {
      productId,
      variantId: variantId ?? null,
      name,
      variantLabel,
      image,
      price,
      quantity: qty,
      slug,
      inStock,
    };

    if (isLoggedIn) {
      await addToCart(productId, variantId ?? null, qty);
    }
    addItem(item);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-xl border border-border">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="px-3 py-2 text-sm text-foreground transition-colors hover:bg-border/20"
        >
          &minus;
        </button>
        <span className="min-w-[2rem] text-center text-sm font-medium text-foreground">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty(qty + 1)}
          className="px-3 py-2 text-sm text-foreground transition-colors hover:bg-border/20"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-all active:scale-95 ${
          added
            ? "bg-green-600 text-white"
            : "bg-tertiary text-white hover:opacity-90"
        }`}
      >
        {added ? "\u2713 Ditambahkan" : "Tambah ke Keranjang"}
      </button>
    </div>
  );
}
