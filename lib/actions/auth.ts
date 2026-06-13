"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { hash } from "bcrypt-ts";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const data = registerSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  const existing = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase().trim() },
  });

  if (existing) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      role: "visitor",
    },
  });

  redirect("/signin");
}
