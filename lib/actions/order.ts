"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { redirect } from "next/navigation";

const updateOrderSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

export async function updateOrderStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const { status } = updateOrderSchema.parse({
    status: formData.get("status"),
  });

  await prisma.order.update({ where: { id }, data: { status } });
  redirect("/admin/orders");
}

export async function deleteOrder(id: string) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.order.delete({ where: { id } });
  redirect("/admin/orders");
}
