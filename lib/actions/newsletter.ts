"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";

export async function subscribeNewsletter(formData: FormData) {
  const parsed = newsletterSchema.parse({
    email: formData.get("email"),
  });

  const existing = await prisma.user.findUnique({
    where: { email: parsed.email },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: parsed.email,
        name: parsed.email.split("@")[0],
        role: "visitor",
      },
    });
  }
}
