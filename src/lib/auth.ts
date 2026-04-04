import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const sql = neon(process.env.DATABASE_URL!);
        const rows = await sql`SELECT * FROM admins WHERE email = ${credentials?.email as string}`;
        const user = rows[0];
        if (!user) return null;
        const valid = await bcryptjs.compare(
          credentials?.password as string,
          user.password
        );
        if (!valid) return null;
        return { id: String(user.id), email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
});
