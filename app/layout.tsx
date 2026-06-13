import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lebihdari.pot";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LEBIHDARI.POT | Menghadirkan Kehidupan Dalam Setiap Ruang",
    template: "%s | LEBIHDARI.POT",
  },
  description:
    "Temukan koleksi tanaman dan pot kurasi terbaik untuk ruang hidup yang lebih bernapas.",
  keywords: [
    "tanaman hias", "pot tanaman", "hampers tanaman", "Bandung",
    "dekorasi rumah", "kado tanaman", "Lelebihdari pot", "indoor plants",
  ],
  authors: [{ name: "LEBIHDARI.POT" }],
  creator: "LEBIHDARI.POT",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "LEBIHDARI.POT",
    title: "LEBIHDARI.POT | Menghadirkan Kehidupan Dalam Setiap Ruang",
    description:
      "Temukan koleksi tanaman dan pot kurasi terbaik untuk ruang hidup yang lebih bernapas.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "LEBIHDARI.POT | Menghadirkan Kehidupan Dalam Setiap Ruang",
    description:
      "Temukan koleksi tanaman dan pot kurasi terbaik untuk ruang hidup yang lebih bernapas.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full scroll-smooth`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
