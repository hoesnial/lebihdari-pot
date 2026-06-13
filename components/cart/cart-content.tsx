"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-provider";
import { removeCartItem, updateCartItemQuantity } from "@/lib/actions/cart";
import type { CartItemData } from "@/lib/cart-store";

interface Props {
  initialItems: CartItemData[];
  loggedIn: boolean;
}

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function CartContent({ initialItems, loggedIn }: Props) {
  const { items, removeItem, updateQuantity, total } = useCart();

  const displayItems = items.length > 0 ? items : initialItems;

  if (displayItems.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="font-body-lg text-body-lg text-on-surface-variant">Keranjang Anda kosong.</p>
        <Link
          href="/products"
          className="mt-4 inline-block bg-tertiary text-white px-6 py-3 rounded-xl font-label-md transition-all hover:opacity-90"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  function handleRemove(productId: string, variantId: string | null, cartItemId?: string) {
    if (loggedIn && cartItemId) {
      removeCartItem(cartItemId);
    }
    removeItem(productId, variantId);
  }

  function handleQtyChange(productId: string, variantId: string | null, qty: number, cartItemId?: string) {
    if (loggedIn && cartItemId) {
      updateCartItemQuantity(cartItemId, qty);
    }
    updateQuantity(productId, variantId, qty);
  }

  return (
    <div className="mt-8 space-y-6">
      {displayItems.map((item) => (
        <div
          key={`${item.productId}-${item.variantId ?? "base"}`}
          className="flex gap-4 rounded-2xl border border-outline-variant/20 bg-card p-4 shadow-sm"
        >
          <Link
            href={`/products/${item.slug}`}
            className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container-low"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl">
                🌿
              </div>
            )}
          </Link>
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <Link
                href={`/products/${item.slug}`}
                className="font-semibold text-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
              {item.variantLabel && (
                <p className="text-body-sm text-on-surface-variant">{item.variantLabel}</p>
              )}
              <p className="mt-1 font-heading font-bold text-tertiary">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-outline-variant">
                  <button
                    type="button"
                    onClick={() =>
                      handleQtyChange(
                        item.productId,
                        item.variantId,
                        item.quantity - 1,
                      )
                    }
                    className="px-2 py-1 text-sm text-foreground transition-colors hover:bg-outline-variant/20"
                  >
                    &minus;
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-medium text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleQtyChange(
                        item.productId,
                        item.variantId,
                        item.quantity + 1,
                      )
                    }
                    className="px-2 py-1 text-sm text-foreground transition-colors hover:bg-outline-variant/20"
                  >
                    +
                  </button>
                </div>
                <span className="text-body-sm text-on-surface-variant">
                  = Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.productId, item.variantId)}
                className="text-body-sm text-error transition-colors hover:text-error"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-outline-variant/20 bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-heading text-headline-md font-bold text-foreground">
            Total
          </span>
          <span className="font-heading text-headline-lg font-bold text-tertiary">
            Rp {total.toLocaleString("id-ID")}
          </span>
        </div>
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
            `Halo, saya ingin memesan:\n${displayItems
              .map(
                (i) =>
                  `- ${i.name}${i.variantLabel ? ` (${i.variantLabel})` : ""} x${i.quantity} = Rp ${(i.price * i.quantity).toLocaleString("id-ID")}`,
              )
              .join("\n")}\n\nTotal: Rp ${total.toLocaleString("id-ID")}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block"
        >
          <button className="w-full rounded-xl bg-tertiary py-4 font-label-md text-white transition-all hover:opacity-90 active:scale-95">
            Checkout via WhatsApp
          </button>
        </a>
      </div>
    </div>
  );
}
