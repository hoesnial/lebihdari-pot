import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { VariantSelector } from "@/components/products/variant-selector";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) return { title: "Not Found" };
  return { title: product.name };
}

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, variants: { orderBy: { order: "asc" } } },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: { category: true },
    take: 4,
  });

  const careInfo = [
    { icon: "☀️", label: "Cahaya", value: "Indirect" },
    { icon: "💧", label: "Penyiraman", value: "Mingguan" },
    { icon: "💨", label: "Kelembaban", value: "Sedang - Tinggi" },
    { icon: "🌡", label: "Suhu", value: "18-30°C" },
  ];

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <nav className="mb-8 text-body-sm text-on-surface-variant">
        <Link href="/products" className="hover:text-primary transition-colors">
          Catalog
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products?category=${product.category.slug}`}
          className="hover:text-primary transition-colors"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-[24px] bg-gradient-to-br from-primary/10 to-secondary-container/30">
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-7xl">
                🌿
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square w-20 overflow-hidden rounded-xl border border-outline-variant/20 bg-gradient-to-br from-primary/5 to-secondary-container/20"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-block bg-secondary-container text-white text-label-sm font-label-sm px-4 py-1.5 rounded-full">
            {product.category.name}
          </span>
          <h1 className="mt-4 font-heading text-headline-lg text-primary">
            {product.name}
          </h1>
          <p className="mt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {careInfo.map((info) => (
              <div key={info.label} className="rounded-xl bg-surface-container-low p-4 flex items-center gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{info.label}</p>
                  <p className="font-body-sm text-body-sm text-foreground font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            {product.variants.length > 0 ? (
              <VariantSelector
                productId={product.id}
                variants={product.variants.map((v) => ({
                  id: v.id,
                  type: v.type,
                  value: v.value,
                  label: v.label,
                  price: v.price,
                  stock: v.stock,
                }))}
                basePrice={product.price}
                productName={product.name}
                productImage={product.images[0] ?? null}
                productSlug={product.slug}
              />
            ) : (
              <div className="space-y-6">
                <p className="font-heading text-headline-lg font-bold text-tertiary">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/${waNumber}?text=Halo%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(product.name)}%20(Rp%20${product.price.toLocaleString("id-ID")})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button size="lg" className="w-full">
                      Order via WhatsApp
                    </Button>
                  </a>
                  <span
                    className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold ${
                      product.inStock
                        ? "bg-secondary-container text-white"
                        : "bg-error-container text-on-error-container"
                    }`}
                  >
                    {product.inStock ? "Tersedia" : "Stok Habis"}
                  </span>
                </div>
                <AddToCartButton
                  productId={product.id}
                  name={product.name}
                  variantLabel={null}
                  image={product.images[0] ?? null}
                  price={product.price}
                  slug={product.slug}
                  inStock={product.inStock}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="font-heading text-headline-lg text-primary">
            Complete the Look
          </h2>
          <div className="mt-8 grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
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
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
