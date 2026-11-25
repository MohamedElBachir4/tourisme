"use server";

import { contactSchema } from "@/lib/validations";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";

export type ActionResult = {
  ok: boolean;
  message?: string;
};

export async function createContactMessage(
  raw: unknown,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "validation" };
  }

  if (!hasDatabaseUrl()) {
    return { ok: false, message: "database" };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, message: "server" };
  }
}
