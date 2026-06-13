import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { updateUserRole, deleteUser } from "@/lib/actions/user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Users",
};

export default async function AdminUsers() {
  const currentUser = await auth();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Users
      </h1>
      <p className="mt-2 text-sm text-muted">
        Manage user roles and accounts.
      </p>

      <div className="mt-8 space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl border border-border/20 bg-card px-6 py-4"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">
                {user.name || "Unnamed"}
                {user.id === currentUser?.user?.id && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    You
                  </span>
                )}
              </p>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <form action={updateUserRole}>
                <input type="hidden" name="id" value={user.id} />
                <select
                  name="role"
                  defaultValue={user.role}
                  onChange={(e) => e.target.form?.requestSubmit()}
                  className="rounded-xl border border-border bg-white px-3 py-1.5 text-sm outline-none focus:border-primary"
                >
                  <option value="visitor">Visitor</option>
                  <option value="admin">Admin</option>
                </select>
              </form>
              {user.id !== currentUser?.user?.id && (
                <form action={deleteUser.bind(null, user.id)}>
                  <button className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50">
                    Delete
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
