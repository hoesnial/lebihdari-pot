import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categorySchema } from "@/lib/validations";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Category",
};

async function updateCategory(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const parsed = categorySchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
  });

  await prisma.category.update({ where: { id }, data: parsed });
  redirect("/admin/categories");
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Edit Category
      </h1>
      <form action={updateCategory} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={category.id} />
        <div>
          <label className="text-sm font-medium text-foreground/80">Name</label>
          <input
            name="name"
            defaultValue={category.name}
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">Slug</label>
          <input
            name="slug"
            defaultValue={category.slug}
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={category.description}
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="rounded-xl bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95">
          Save Changes
        </button>
      </form>
    </div>
  );
}
