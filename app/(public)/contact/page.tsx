import type { Metadata } from "next";
import { sendContactMessage } from "@/lib/actions/contact";

export const metadata: Metadata = {
  title: "Contact",
};

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const formattedPhone = waNumber?.replace("628", "+62-").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") || "+62 812-3456-7890";

export default function ContactPage() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-headline-xl text-primary">
          Hubungi Kami
        </h1>
        <p className="mt-6 font-body-lg text-body-lg text-on-surface-variant">
          Punya pertanyaan seputar produk, perawatan tanaman, atau ingin
          konsultasi? Kami siap membantu.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center text-xl">💬</div>
              <div>
                <h2 className="font-label-md text-label-md text-primary">WhatsApp</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{formattedPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl">✉️</div>
              <div>
                <h2 className="font-label-md text-label-md text-primary">Email</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">hello@lebihdari.pot</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary-container text-white rounded-full flex items-center justify-center text-xl">📍</div>
              <div>
                <h2 className="font-label-md text-label-md text-primary">Lokasi</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Kota Bandung, Jawa Barat, Indonesia</p>
              </div>
            </div>
          </div>
          <div>
            <form action={sendContactMessage} className="space-y-4">
              <input
                name="name"
                placeholder="Nama Anda"
                required
                className="w-full rounded-xl border border-outline-variant bg-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md"
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                required
                className="w-full rounded-xl border border-outline-variant bg-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md"
              />
              <textarea
                name="message"
                placeholder="Pesan Anda"
                required
                className="min-h-[120px] w-full rounded-xl border border-outline-variant bg-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md"
              />
              <button className="rounded-xl bg-tertiary text-white px-6 py-3 font-label-md transition-all hover:opacity-90 active:scale-95">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
