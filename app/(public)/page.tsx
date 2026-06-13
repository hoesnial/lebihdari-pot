import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "LEBIHDARI.POT | Toko Tanaman & Pot Hias Premium di Bandung",
  description:
    "Temukan koleksi tanaman hias, pot premium, hampers tanaman, dan perlengkapan taman terbaik. Toko tanaman online Bandung dengan layanan konsultasi gratis.",
  openGraph: {
    title: "LEBIHDARI.POT | Toko Tanaman & Pot Hias Premium di Bandung",
    description:
      "Temukan koleksi tanaman hias, pot premium, hampers tanaman, dan perlengkapan taman terbaik.",
  },
  twitter: {
    title: "LEBIHDARI.POT | Toko Tanaman & Pot Hias Premium di Bandung",
    description:
      "Temukan koleksi tanaman hias, pot premium, hampers tanaman, dan perlengkapan taman terbaik.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "LEBIHDARI.POT",
  url: "https://lebihdari.pot",
  description:
    "Menghubungkan Anda dengan alam melalui koleksi tanaman dan pot kurasi terbaik untuk ruang hidup yang lebih bernapas.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAAJvhP2DvLiCvaLNWE5HhH9oHMHu37G2ZywQaMHnRN7-0E-6YZMuvQrN_f7SjzL87Z-5u6GygJw7PYN4ZMmkPXv2SrjoN1cXdrnmw7L-rGx2rIlOlATmf4u49AZgAUyLOvEQmBJutF5Rd7hTZ-f8U5itV1KQ--R0KWhi4oW2Su_RC1v3yLwCmqxlxkaOAwEjbeJK97CXaBcWRW0YMwnC-FSI4ZgNX64FZJyRy_yMK986HSC_z1vASVgvECwtTP3MvKa7HYezQrvIM",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    contactType: "customer service",
  },
  sameAs: ["https://instagram.com/lebihdari.pot"],
};

const features = [
  {
    title: "Premium Quality",
    desc: "Tanaman sehat & terawat dari kebun pilihan.",
    icon: "verified",
  },
  {
    title: "Elegant Pots",
    desc: "Desain pot eksklusif untuk setiap gaya interior.",
    icon: "pattern",
  },
  {
    title: "Personalized Hampers",
    desc: "Kado istimewa dengan pesan personal.",
    icon: "feature_search",
  },
  {
    title: "Care Assistance",
    desc: "Konsultasi gratis perawatan tanaman Anda.",
    icon: "psychology",
  },
];

const testimonials = [
  {
    name: "Sarah Kamila",
    text: "Tanaman datang dalam kondisi sangat segar. Potnya elegan banget, pas buat pojokan ruang tamu saya. Gak nyesel langganan di sini!",
    role: "Rumah Tangga",
  },
  {
    name: "Dimas Pratama",
    text: "Pesan hampers buat kado nikahan temen, respon admin cepet dan packingnya super aman. Temen saya suka banget sama tanamannya.",
    role: "Wirausaha",
  },
  {
    name: "Andini Putri",
    text: "Dashboard cuacanya ngebantu banget buat saya yang sering lupa nyiram. Tipsnya praktis dan beneran bikin tanaman awet.",
    role: "Pecinta Tanaman",
  },
  {
    name: "Bambang Prasetyo",
    text: "Pelayanan ramah, packing super aman. Recommended untuk pecinta tanaman pemula sekalipun.",
    role: "Karyawan",
  },
];

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const heroBg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbDwU4MfhL5C5ph6D_-sCvYPhc0hcKG_5kTswP8Ek4uXBm8s1mGucp8bAqaWo3NOtIvWt2r-gbaWPWnYiSqyIZG0TzneJtipRBFrzn78j2m8QhfwzTRmWqNnb89w5YlKC8INdFEHg1t0e0O6qjuu1yifKZZlMZ8eIn0jlfLiZk3ozfVLa7Zf9O6mGMXhBWY3RFCV81IaOIVSRNjgn8ZGbjHb90LqOzXGnPQFseCIqFJaYLkBg2S4E6DzqOSA9ereGEzGA6eATavP4";

const featuredImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKK7cwHf_dH5EGDNIFf2yXqL3C2ceW4man8U75fSt2tb0fzIsNIsn7c-k951kbrbBaDQ0nz5_b0WFwA7T105XBLV0SesN74bxL2xM9a3PAiWqomwH-roF_V2nXb5MgCCNFjMKQoJ-B6aPQMre_G2jbG_IcFD3qCH_MYs_edCxWHKs7DxENX80KYfWtlszd0uJquOBllE1usgiRmWoffKb1X7phkLx2fqp93y4ociRODt-h22leECM5oenLIgAVutCsgWS2SvClMCU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8kdRkkteZitxJIXS3y-RDZSKObIJXlPtaAgKaJt2XqoztAhJm60iQ8QTKNmb0T0IeHOFmg2o4-LeNv9X6kdRure-inhGtbHGexBlk-M85qe_PH4TzqDeD79siOuycFZBYCBm10sSjSWqRsNV7MRtxCnKJ1Ptm-M0gP7THcWSyDlXdoFKwAsj_sIAfuYnHXziO1KbMA-Gt01ZLNZTw7Et7_xqL40cLBwq49GFGzMSgcwtFsFxUImcpj6URgSQENW7ZfZI2bgBjHwQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Tm0XoJb57h5wJlhuOAoKhQB0w4B1feHdjrgDQhfMAw1__2dNV-ZMs9rBw6KgUbJdfBb0oQaWy9Awwv5o1dqmBSMY_0CQFFGE83eZkINlqhAYUy067C-FK_h1PohbRL2ZriFGvs_XYuI0vsU2P_WPY3oO-BzccCvEY52BfcsxVPdmYfbajksSUN5o2V1ogDyAUd5ToLBbkDcLV3dD6ufoqW4E4L58E8l6FlzvGSqKVJJj6mWBn3BF1oA8p3Ne7SaP58uyyMNXcuc",
];

const instagramImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB25RvfvH6OR3CI7c-Jt2xFlbiXX5luPFGrNFQm3jzyGFgYcM1NM964xZyjNqQYnCIh4PQLf-5NAmCxV-eM_5sO3UQBoFmzt2cROn6H4U_UMJd-64he4ral44vmVoGCU6mcla--urZxcsPgaH0Lp2aXugK1tBV8c-IIOg5AbLzzUrp2s3v-LigIdHCt2M5wM8uLh7Z6pjZQEKtIyiBQTThp127abV6iyG0idQPsHbzLQQIMK-DXazDk3j9mCQECPUyv9frC9NscyVU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEO0NHwARN4ld_W1BnOsxgnXrRY7_6jlO0P5zQZp-ztWqC_EIRUi-HZVsAj7wgy4O0XOoput7nS5LgsKNLZzpuRfxJni4rHmoU6vj44JqbQcR9fMWxBto4tl07zi5tS1MVcVBzKH2nK3gVPqu9UhhXD8GIi-ACsO44Gl41-j7OiThJXW3f4Zl3uoCLvuWh2Dd35c2y2D2zces0QwEMUzmunn4mS27GooFyshR3xyms_JgHN5RNBb-4BGCSE-FY5-1PuDPQbkqajN0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCmf3_-Xi3J08etQ6adbGf0pQUDeA7rwoOAHObE7aNX2WuC7yoRuQhAwYx2tJLpoKRynMRnjIhhLN2MQyp19RW9CAE6oSEek6qLLk7PZeCWKwAejeQq3WRQlbtGG5SIhZ_FhDyvoYkveUSei7svwR4Rl36gpkd9cDK8y-kKbZyry9ub9L1qGPhzrSamXJkOEzC1F4nCUQjC4dz0bLR6OhPPLqyrBETALpp7QUlpnhM5cZwftznCF5Bv_MhFBILW72Im-3tri4hkZJk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAa2NkuMcHZjIaX6vDecgt0e-bKymvaELluL9syOKs1rGkTphTkgO_ZOPXCJKCOes9IgY6WHtTIjKjjcNRkZoApQOCUNorg_8mksjo3OG5as91boHelZBNo_j0UXPajAH6DmECgBi20wCWjgo8xnIxKocjrl2PwPDcVJ_4bCI1x_PcNbrKaKVrrctmt-ERrrkL-3Smo0cfGeBm7qGKXMAFKQbcboR93vYhNk3q7nvHwn2nVStM44-aI6GVEGYWRnpDyAuxDvpLtnCs",
];

const featuredItems = [
  { title: "Best Sellers", desc: "Monstera Deliciosa, Fiddle Leaf Fig", slug: "/products?category=tanaman-hias", image: featuredImages[0] },
  { title: "Gift Hampers", desc: "Paket hantaran tanaman cantik & eksklusif", slug: "/products?category=hampers", image: featuredImages[1] },
  { title: "Aromatic Plants", desc: "Lavender, Rosemary untuk relaksasi", slug: "/products?category=tanaman-hias", image: featuredImages[2] },
];

export default async function HomePage() {
  const latestWeather = await prisma.weatherData
    .findFirst({ orderBy: { recordedAt: "desc" } })
    .catch(() => null);

  const latestRecommendation = await prisma.recommendation
    .findFirst({ orderBy: { createdAt: "desc" } })
    .catch(() => null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[700px] md:min-h-[870px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Elegant home interior with plants"
            className="w-full h-full object-cover"
            src={heroBg}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
          <div className="max-w-3xl">
            <h1 className="font-headline-xl text-primary mb-stack-sm leading-[1.15] tracking-tight" style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>
              Lebih dari sekadar pot, menghadirkan kehidupan dalam setiap ruang.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-md max-w-2xl">
              Hadirkan kesegaran alami untuk rumah, kantor, dan orang tersayang melalui koleksi tanaman pilihan kami.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-tertiary text-white px-8 py-4 rounded-xl font-label-md hover:opacity-90 transition-all shadow-lg active:scale-95 gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">store</span>
                Jelajahi Katalog
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-label-md hover:bg-primary/80 transition-all active:scale-95 gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-stack-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-stack-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Koleksi Terkurasi</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Pilihan terbaik untuk estetika hunian Anda.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {featuredItems.map((item) => (
              <Link key={item.title} href={item.slug} className="group relative overflow-hidden rounded-[24px] bg-surface shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-headline-md text-headline-md text-primary mb-1">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">{item.desc}</p>
                  <span className="inline-flex items-center text-tertiary font-label-md hover:gap-2 transition-all gap-1">
                    Lihat Koleksi
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-stack-lg bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">Mengapa Memilih LEBIHDARI?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary-container text-white rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h4 className="font-label-md text-label-md text-primary mb-2">{f.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {latestWeather && (
        <section className="py-stack-lg">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="bg-secondary-container/40 rounded-[32px] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row gap-gutter items-start">
                <div className="md:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span className="font-label-md text-label-md text-primary uppercase tracking-widest">Bandung Intelligence</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Optimalkan Perawatan Tanaman Anda Hari Ini</h2>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-surface/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                      <span className="material-symbols-outlined text-tertiary mb-2 block">device_thermostat</span>
                      <div className="text-headline-md font-bold text-primary">{latestWeather.temperature}°C</div>
                      <div className="text-body-sm text-on-surface-variant">Suhu</div>
                    </div>
                    <div className="bg-surface/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                      <span className="material-symbols-outlined text-primary mb-2 block">humidity_percentage</span>
                      <div className="text-headline-md font-bold text-primary">{latestWeather.humidity}%</div>
                      <div className="text-body-sm text-on-surface-variant">Lembap</div>
                    </div>
                    <div className="bg-surface/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                      <span className="material-symbols-outlined text-primary mb-2 block">rainy</span>
                      <div className="text-headline-md font-bold text-primary">{latestWeather.rainfall} mm</div>
                      <div className="text-body-sm text-on-surface-variant">Curah</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 bg-surface rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary">Plant Care Tip</h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    {latestRecommendation?.message || "Hari ini suhu cukup tinggi. Tingkatkan frekuensi penyiraman tanaman sensitif agar tetap segar dan tidak mengalami dehidrasi."}
                  </p>
                  <Link
                    href="/admin/weather"
                    className="w-full py-4 bg-primary text-white rounded-xl font-label-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    View Weather Dashboard
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-stack-lg bg-surface-container">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-stack-md">
            <h2 className="font-headline-lg text-headline-lg text-primary">Apa Kata Mereka?</h2>
          </div>
          <div className="flex overflow-x-auto gap-gutter snap-x pb-4" style={{ scrollbarWidth: "none" }}>
            {testimonials.map((t) => (
              <div key={t.name} className="min-w-[300px] md:min-w-[400px] bg-surface p-8 rounded-3xl snap-center border border-outline-variant/20 shadow-sm shrink-0">
                <div className="flex gap-1 text-tertiary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-md italic text-on-surface-variant mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">{t.name}</h4>
                    <p className="text-body-sm text-on-surface-variant">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-center mb-stack-md">
            <h2 className="font-headline-lg text-headline-lg text-primary">@LEBIHDARI.POT</h2>
            <a className="text-on-surface-variant hover:text-primary font-label-md border-b border-on-surface-variant hover:border-primary transition-colors" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Follow Us
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramImages.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl group cursor-pointer">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={img}
                  alt={`Instagram feed ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-stack-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
            Siap menghadirkan lebih banyak hijau?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md max-w-lg mx-auto">
            Mulai perjalanan Anda bersama LEBIHDARI.POT dan rasakan perbedaan tanaman kurasi dalam ruang hidup Anda.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-tertiary text-white px-8 py-4 rounded-xl font-label-md hover:opacity-90 transition-all shadow-lg active:scale-95 gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            Mulai Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
