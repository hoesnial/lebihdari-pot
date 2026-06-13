import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-5xl font-bold text-foreground">
          Tentang <span className="text-primary">LEBIHDARI.POT</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          LEBIHDARI.POT lahir dari kecintaan terhadap tanaman dan keyakinan
          bahwa ruang hidup yang hijau adalah investasi untuk kesehatan fisik
          dan mental. Kami adalah tim kurator tanaman yang berkomitmen
          menghadirkan tanaman dan pot berkualitas tinggi untuk setiap rumah
          dan kantor.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Setiap tanaman dalam koleksi kami melewati proses seleksi ketat.
          Bekerja sama dengan petani dan pengrajin pot lokal terbaik, kami
          memastikan setiap produk yang sampai ke tangan Anda adalah yang
          terbaik.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Visi kami adalah menjadi jembatan antara keindahan alam dan
          kehidupan modern — menginspirasi lebih banyak orang untuk
          menghadirkan elemen alami dalam rutinitas sehari-hari.
        </p>
      </div>
    </section>
  );
}
