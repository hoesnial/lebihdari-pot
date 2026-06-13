"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/cart/cart-icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Catalog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAJvhP2DvLiCvaLNWE5HhH9oHMHu37G2ZywQaMHnRN7-0E-6YZMuvQrN_f7SjzL87Z-5u6GygJw7PYN4ZMmkPXv2SrjoN1cXdrnmw7L-rGx2rIlOlATmf4u49AZgAUyLOvEQmBJutF5Rd7hTZ-f8U5itV1KQ--R0KWhi4oW2Su_RC1v3yLwCmqxlxkaOAwEjbeJK97CXaBcWRW0YMwnC-FSI4ZgNX64FZJyRy_yMK986HSC_z1vASVgvECwtTP3MvKa7HYezQrvIM"
              alt="LEBIHDARI.POT Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-headline-md text-primary font-bold leading-tight">
              LEBIHDARI.POT
            </span>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest leading-tight">
              pots &amp; plant
            </span>
          </div>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary transition-colors font-label-md"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <CartIcon />
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-primary text-white px-6 py-2.5 rounded-full font-label-md hover:opacity-80 transition-opacity active:scale-95 duration-150 shadow-md"
          >
            Shop via WhatsApp
          </a>
          <button
            className="flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-outline-variant bg-surface px-margin-mobile pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-on-surface-variant transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="text-on-surface-variant transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Keranjang
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <Button size="sm" className="w-full">
                Shop via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
