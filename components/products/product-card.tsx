import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  productId: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  inStock: boolean;
  categoryName: string;
  variantCount?: number;
}

export function ProductCard({
  slug,
  name,
  price,
  description,
  image,
  inStock,
  categoryName,
  variantCount,
}: ProductCardProps) {
  return (
    <div className="group bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow">
      <Link href={`/products/${slug}`}>
        <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary-container/30">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🌿
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <span className="inline-block bg-secondary-container text-white text-label-sm font-label-sm px-3 py-1 rounded-full">
          {categoryName}
        </span>
        {variantCount && variantCount > 0 ? (
          <span className="ml-2 inline-block bg-tertiary/10 text-tertiary text-label-sm font-label-sm px-3 py-1 rounded-full">
            {variantCount} varian
          </span>
        ) : null}
        <Link href={`/products/${slug}`}>
          <h3 className="mt-3 font-heading text-headline-md text-primary group-hover:text-tertiary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-headline-md font-bold text-tertiary">
            Rp {price.toLocaleString("id-ID")}
          </span>
          {!inStock && (
            <span className="inline-block bg-error-container text-on-error-container text-label-sm font-label-sm px-3 py-1 rounded-full">
              Habis
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link href={`/products/${slug}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Detail
            </Button>
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Halo%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(name)}%20(Rp%20${price.toLocaleString("id-ID")})`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="w-full">
              Order via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
