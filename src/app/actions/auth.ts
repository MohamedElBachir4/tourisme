"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const callbackUrl = String(formData.get("callbackUrl") || "/admin");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/admin/login?error=CredentialsSignin`);
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}
