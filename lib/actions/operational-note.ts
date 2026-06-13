"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { noteSchema } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized: admin role required");
  }

  const parsed = noteSchema.parse({
    content: formData.get("content"),
    author: formData.get("author"),
    type: formData.get("type"),
  });

  await prisma.operationalNote.create({ data: parsed });
  redirect("/admin/operational-notes");
}

export async function deleteNote(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.operationalNote.delete({ where: { id } });
  redirect("/admin/operational-notes");
}
