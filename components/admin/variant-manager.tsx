"use client";

import { useState } from "react";

interface Variant {
  type: string;
  value: string;
  label: string;
  price: string;
  stock: string;
}

interface Props {
  initialVariants?: Variant[];
}

export function VariantManager({ initialVariants }: Props) {
  const [variants, setVariants] = useState<Variant[]>(initialVariants || []);
  const [type, setType] = useState("ukuran");
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("true");

  function addVariant() {
    if (!value || !label) return;
    setVariants([...variants, { type, value, label, price, stock }]);
    setValue("");
    setLabel("");
    setPrice("");
    setStock("true");
  }

  function removeVariant(i: number) {
    setVariants(variants.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-32 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="ukuran">Ukuran</option>
          <option value="warna">Warna</option>
          <option value="bahan">Bahan</option>
        </select>
        <input
          placeholder="Value (e.g. small-25cm)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-36 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <input
          placeholder="Label (e.g. Small 25cm)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-40 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <input
          type="number"
          placeholder="Price override"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-32 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-28 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <button
          type="button"
          onClick={addVariant}
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95"
        >
          Add
        </button>
      </div>

      {variants.length > 0 && (
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface-container-low px-4 py-2 text-sm"
            >
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {v.type}
              </span>
              <span className="font-medium text-foreground">{v.label}</span>
              <span className="text-muted">({v.value})</span>
              {v.price && (
                <span className="text-accent">
                  Rp {Number(v.price).toLocaleString("id-ID")}
                </span>
              )}
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                  v.stock === "true"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {v.stock === "true" ? "In Stock" : "Out of Stock"}
              </span>
              <button
                type="button"
                onClick={() => removeVariant(i)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="hidden"
        name="variants"
        value={JSON.stringify(
          variants.map((v) => ({
            ...v,
            price: v.price || null,
          })),
        )}
      />
    </div>
  );
}
