import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="rounded-[24px] border border-border/20 bg-card p-8 shadow-sm">
      <div className="text-center">
        <Link
          href="/"
          className="font-heading text-2xl font-bold text-primary"
        >
          LEBIHDARI.POT
        </Link>
        <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">
          Buat Akun
        </h1>
        <p className="mt-2 text-sm text-muted">
          Daftar untuk mengelola toko Anda.
        </p>
      </div>
      <form action={registerUser} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground/80"
          >
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Nama lengkap"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground/80"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="email@contoh.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground/80"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Min. 8 karakter, huruf besar, kecil, angka"
          />
          <p className="mt-1 text-xs text-muted">
            Minimal 8 karakter, harus mengandung huruf besar, huruf kecil, dan
            angka.
          </p>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground/80"
          >
            Konfirmasi Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Ulangi password"
          />
        </div>
        <Button type="submit" className="w-full" size="lg">
          Daftar
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Sudah punya akun?{" "}
        <Link
          href="/signin"
          className="font-semibold text-primary hover:underline"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
