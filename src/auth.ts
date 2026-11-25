import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "@/auth.config";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success || !hasDatabaseUrl()) return null;

        const admin = await prisma.adminUser.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });
        if (!admin) return null;

        const valid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
        if (!valid) return null;

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name ?? "Admin",
        };
      },
    }),
  ],
});
