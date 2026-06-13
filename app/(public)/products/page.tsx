import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/product-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Collection",
};

interface Props {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q, category: categorySlug, sort } = await searchParams;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const where: Record<string, unknown> = {};

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  if (categorySlug) {
    const cat = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });
    if (cat) where.categoryId = cat.id;
  }

  const orderBy: Record<string, string> = {};
  if (sort === "price_asc") orderBy.price = "asc";
  else if (sort === "price_desc") orderBy.price = "desc";
  else orderBy.createdAt = "desc";

  const products = await prisma.product.findMany({
    where,
    include: { category: true, _count: { select: { variants: true } } },
    orderBy,
  });

  const selectedCategory = categorySlug || "";
  const currentSort = sort || "newest";

  return (
    <>
      <header className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg mb-stack-md text-center md:text-left">
        <h1 className="font-heading text-headline-xl text-primary mb-4">Our Collection</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Discover artisanal pottery and curated greenery, designed to bring natural precision into your modern sanctuary.
        </p>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <section className="bg-surface-container-low p-6 rounded-3xl mb-stack-md flex flex-wrap items-end gap-gutter shadow-sm">
          <div className="flex-1 min-w-[280px]">
            <form className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">🔍</span>
              <input
                name="q"
                defaultValue={q || ""}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md font-body-md"
                placeholder="Search for plants or pots..."
              />
            </form>
          </div>
          <div className="w-full md:w-48">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Category</label>
            <select
              name="category"
              defaultValue={selectedCategory}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-body-md font-body-md"
            >
              <option value="">All Items</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Sort By</label>
            <select
              name="sort"
              defaultValue={currentSort}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-body-md font-body-md"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-label-md hover:opacity-80 transition-opacity active:scale-95 self-end">
            Filter
          </button>
        </section>

        {products.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Tidak ada produk yang ditemukan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                productId={p.id}
                slug={p.slug}
                name={p.name}
                price={p.price}
                description={p.description}
                image={p.images[0]}
                inStock={p.inStock}
                categoryName={p.category.name}
                variantCount={p._count.variants}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
