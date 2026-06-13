import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/lib/actions/product";
import { VariantManager } from "@/components/admin/variant-manager";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, variants: { orderBy: { order: "asc" } } },
  });
  const categories = await prisma.category.findMany();

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Edit Product
      </h1>
      <form action={updateProduct} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={product.id} />
        <div>
          <label className="text-sm font-medium text-foreground/80">Name</label>
          <input
            name="name"
            defaultValue={product.name}
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">Slug</label>
          <input
            name="slug"
            defaultValue={product.slug}
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Price (Rp)
          </label>
          <input
            name="price"
            type="number"
            defaultValue={product.price}
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Category
          </label>
          <select
            name="categoryId"
            defaultValue={product.categoryId}
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Status
          </label>
          <select
            name="inStock"
            defaultValue={String(product.inStock)}
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={product.description}
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Image URLs (comma separated)
          </label>
          <input
            name="images"
            defaultValue={product.images.join(", ")}
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Variants
          </label>
          <div className="mt-1.5">
            <VariantManager
              initialVariants={product.variants.map((v) => ({
                type: v.type,
                value: v.value,
                label: v.label,
                price: v.price ? String(v.price) : "",
                stock: String(v.stock),
              }))}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="rounded-xl bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
