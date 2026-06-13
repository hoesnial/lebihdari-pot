import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory } from "@/lib/actions/category";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Categories
      </h1>
      <form
        action={createCategory}
        className="mt-8 rounded-[24px] border border-border/20 bg-card p-6 shadow-sm"
      >
        <h2 className="font-heading text-xl font-bold text-foreground">
          Add Category
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            name="name"
            placeholder="Category Name"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="slug"
            placeholder="category-slug"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="description"
            placeholder="Description (optional)"
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="mt-6 rounded-xl bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95">
          Add Category
        </button>
      </form>
      <div className="mt-8 space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between rounded-xl border border-border/20 bg-card px-6 py-4"
          >
            <div>
              <h3 className="font-semibold text-foreground">{cat.name}</h3>
              <p className="text-sm text-muted">
                {cat._count.products} products
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/categories/${cat.id}/edit`}
                className="rounded-lg border border-border px-3 py-1 text-sm text-foreground transition-colors hover:bg-border/50"
              >
                Edit
              </Link>
              <form action={deleteCategory.bind(null, cat.id)}>
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
