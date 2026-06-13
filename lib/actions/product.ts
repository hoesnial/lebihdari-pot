"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const data = productSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    images: formData.get("images"),
    inStock: "true",
    variants: formData.get("variants"),
  });

  await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      images: data.images,
      variants: {
        create: data.variants.map((v, i) => ({
          type: v.type,
          value: v.value,
          label: v.label,
          price: v.price ?? null,
          stock: v.stock,
          order: i,
        })),
      },
    },
  });

  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const data = productSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    images: formData.get("images"),
    inStock: formData.get("inStock"),
    variants: formData.get("variants"),
  });

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        images: data.images,
        inStock: data.inStock,
      },
    });

    await tx.productVariant.deleteMany({ where: { productId: id } });

    if (data.variants.length > 0) {
      await tx.productVariant.createMany({
        data: data.variants.map((v, i) => ({
          productId: id,
          type: v.type,
          value: v.value,
          label: v.label,
          price: v.price ?? null,
          stock: v.stock,
          order: i,
        })),
      });
    }
  });

  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.product.delete({ where: { id } });
  redirect("/admin/products");
}
