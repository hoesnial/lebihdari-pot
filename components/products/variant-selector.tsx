"use client";

import { useState, useCallback } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

interface Variant {
  id: string;
  type: string;
  value: string;
  label: string;
  price: number | null;
  stock: boolean;
}

interface Props {
  productId: string;
  variants: Variant[];
  basePrice: number;
  productName: string;
  productImage: string | null;
  productSlug: string;
}

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function VariantSelector({
  productId,
  variants,
  basePrice,
  productName,
  productImage,
  productSlug,
}: Props) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const groups = variants.reduce(
    (acc, v) => {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v);
      return acc;
    },
    {} as Record<string, Variant[]>,
  );

  const activeVariant = variants.find(
    (v) =>
      selected[v.type] === v.value &&
      Object.entries(selected).every(
        ([t]) => t === v.type || selected[t] === v.value || !groups[t],
      ),
  );

  const hasAllSelections = Object.keys(groups).every(
    (t) => selected[t],
  );

  const activePrice = hasAllSelections
    ? activeVariant?.price ?? basePrice
    : basePrice;

  const activeStock = hasAllSelections
    ? activeVariant?.stock ?? true
    : true;

  const activeVariantId = hasAllSelections ? activeVariant?.id ?? null : null;

  const whatsappMessage = `Halo, saya tertarik dengan ${productName}${
    hasAllSelections && activeVariant
      ? ` (${Object.entries(selected)
          .map(([, v]) => v)
          .join(", ")})`
      : ""
  } (Rp ${activePrice.toLocaleString("id-ID")})`;

  const handleSelect = useCallback((type: string, value: string) => {
    setSelected((prev) => ({ ...prev, [type]: value }));
  }, []);

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([type, typeVariants]) => (
        <div key={type}>
          <p className="mb-2 font-label-sm text-label-sm text-on-surface-variant uppercase">
            {type}
          </p>
          <div className="flex flex-wrap gap-2">
            {typeVariants.map((v) => {
              const isActive = selected[type] === v.value;
              return (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => handleSelect(type, v.value)}
                  className={`rounded-xl border px-4 py-2 font-label-sm text-label-sm transition-all ${
                    isActive
                      ? "border-tertiary bg-tertiary text-white"
                      : "border-outline-variant bg-white text-foreground hover:border-tertiary/50"
                  } ${!v.stock ? "cursor-not-allowed opacity-40" : ""}`}
                  disabled={!v.stock}
                >
                  {v.label}
                  {v.price && v.price !== basePrice && (
                    <span className="ml-1 text-xs opacity-80">
                      (+Rp {(v.price - basePrice).toLocaleString("id-ID")})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-headline-lg font-bold text-tertiary">
            Rp {activePrice.toLocaleString("id-ID")}
          </p>
          {activePrice !== basePrice && hasAllSelections && (
            <p className="text-body-sm text-on-surface-variant line-through">
              Rp {basePrice.toLocaleString("id-ID")}
            </p>
          )}
        </div>
        <span
          className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-label-sm ${
            activeStock
              ? "bg-secondary-container text-white"
              : "bg-error-container text-on-error-container"
          }`}
        >
          {activeStock ? "Tersedia" : "Stok Habis"}
        </span>
      </div>

      <AddToCartButton
        productId={productId}
        variantId={activeVariantId}
        name={productName}
        variantLabel={
          hasAllSelections && activeVariant
            ? activeVariant.label
            : null
        }
        image={productImage}
        price={activePrice}
        slug={productSlug}
        inStock={activeStock}
      />

      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <button className="w-full rounded-xl border border-tertiary px-8 py-3 font-label-md text-tertiary transition-all hover:bg-tertiary/5 active:scale-95">
          Order via WhatsApp
        </button>
      </a>
    </div>
  );
}
