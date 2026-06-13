"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function updateUserRole(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const role = formData.get("role") as string;

  await prisma.user.update({
    where: { id },
    data: { role },
  });

  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.user.delete({ where: { id } });
  redirect("/admin/users");
}
