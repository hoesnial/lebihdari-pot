import Link from "next/link";
import { subscribeNewsletter } from "@/lib/actions/newsletter";

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const formattedPhone = waNumber?.replace("628", "+62-").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") || "+62 812-3456-7890";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="max-w-container-max mx-auto py-stack-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="md:col-span-1">
          <h2 className="font-heading text-headline-md text-primary mb-4">
            LEBIHDARI.POT
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
            Menghubungkan Anda dengan alam melalui koleksi tanaman dan pot kurasi terbaik untuk ruang hidup yang lebih bernapas.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              href="#"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-primary mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li>
              <Link href="/about" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary hover:underline transition-all">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary hover:underline transition-all">
                Catalog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary hover:underline transition-all">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/products" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary hover:underline transition-all">
                Care Guides
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-primary mb-6">Contact</h4>
          <ul className="space-y-4">
            <li className="flex gap-2 items-start">
              <span className="text-primary text-[20px]">✉</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">hello@lebihdari.pot</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-primary text-[20px]">📞</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{formattedPhone}</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-primary text-[20px]">📍</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Kota Bandung, Jawa Barat</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-primary mb-6">Newsletter</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
            Dapatkan tips perawatan dan update koleksi terbaru.
          </p>
          <form action={subscribeNewsletter} className="flex gap-2">
            <input
              name="email"
              className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-body-sm"
              placeholder="Email Anda"
              type="email"
              required
              suppressHydrationWarning
            />
            <button className="bg-primary text-white px-4 py-2 rounded-xl">
              Kirim
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 border-t border-outline-variant/30 text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          &copy; 2024 LEBIHDARI.POT. Crafted for Natural Precision.
        </p>
      </div>
    </footer>
  );
}
