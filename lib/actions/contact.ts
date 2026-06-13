"use server";

import { contactSchema } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function sendContactMessage(formData: FormData) {
  const parsed = contactSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Pesan dari ${parsed.name} (${parsed.email}):\n\n${parsed.message}`,
  )}`;

  redirect(whatsappUrl);
}
