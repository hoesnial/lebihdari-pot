import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/operational-notes", label: "Notes" },
  { href: "/admin/weather", label: "Weather" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Akses Ditolak
          </h1>
          <p className="mt-4 text-muted">
            Anda tidak memiliki akses ke halaman ini.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-primary hover:underline"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
        <div className="border-b border-border p-6">
          <Link
            href="/admin"
            className="font-heading text-lg font-bold text-primary"
          >
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <div className="mb-3 px-4 text-xs text-muted">
            {session.user.email}
          </div>
          <form action="/api/auth/signout" method="post">
            <button className="w-full rounded-xl border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-border/50">
              Logout
            </button>
          </form>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/admin"
              className="font-heading text-lg font-bold text-primary"
            >
              Admin Panel
            </Link>
            <form action="/api/auth/signout" method="post">
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-border/50">
                Logout
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
