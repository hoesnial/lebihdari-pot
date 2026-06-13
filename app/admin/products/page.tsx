import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { createProduct, deleteProduct } from "@/lib/actions/product";
import { VariantManager } from "@/components/admin/variant-manager";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Products",
};

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Products
        </h1>
        <Link
          href="/admin/categories"
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-border/50"
        >
          Manage Categories
        </Link>
      </div>
      <form
        action={createProduct}
        className="mt-8 rounded-[24px] border border-border/20 bg-card p-6 shadow-sm"
      >
        <h2 className="font-heading text-xl font-bold text-foreground">
          Add Product
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            name="name"
            placeholder="Product Name"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="slug"
            placeholder="product-slug"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <select
            name="categoryId"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Description"
            className="min-h-[100px] w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 md:col-span-2"
          />
          <input
            name="images"
            placeholder="Image URLs (comma separated)"
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 md:col-span-2"
          />
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium text-foreground/80">
            Variants (optional)
          </label>
          <div className="mt-1.5">
            <VariantManager />
          </div>
        </div>
        <button className="mt-6 rounded-xl bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95">
          Add Product
        </button>
      </form>
      <div className="mt-8 space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-border/20 bg-card px-6 py-4"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground">{p.name}</h3>
              <p className="text-sm text-muted">
                {p.category.name} &mdash; Rp {p.price.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  p.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </span>
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="rounded-lg border border-border px-3 py-1 text-sm text-foreground transition-colors hover:bg-border/50"
              >
                Edit
              </Link>
              <form action={deleteProduct.bind(null, p.id)}>
                <button className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
