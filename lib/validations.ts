import { z } from "zod";

export const variantItemSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
  label: z.string().min(1),
  price: z.coerce.number().int().positive().optional().nullable(),
  stock: z
    .string()
    .default("true")
    .transform((v) => v === "true"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  description: z.string().max(2000).default(""),
  price: z.coerce.number().int().positive("Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  images: z
    .string()
    .default("")
    .transform((s) =>
      s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    ),
  inStock: z
    .string()
    .default("true")
    .transform((v) => v === "true"),
  variants: z
    .string()
    .default("[]")
    .transform((s) => {
      try {
        const parsed = JSON.parse(s);
        return z.array(variantItemSchema).parse(parsed);
      } catch {
        return [];
      }
    }),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).default(""),
});

export const noteSchema = z.object({
  content: z.string().min(1, "Content is required").max(5000),
  author: z.string().min(1).max(100),
  type: z.enum(["routine", "emergency", "inventory", "general"]),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Nama harus diisi").max(100),
  email: z.string().email("Email tidak valid"),
  message: z.string().min(1, "Pesan harus diisi").max(5000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama harus diisi").max(100),
    email: z.string().email("Email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
