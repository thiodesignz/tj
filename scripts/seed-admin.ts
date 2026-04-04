import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { admins } from "../src/lib/schema";
import bcryptjs from "bcryptjs";

async function main() {
  const email = process.argv[2] || "thrihash@gmail.com";
  const password = process.argv[3] || "admin123456";

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const hashed = await bcryptjs.hash(password, 10);

  await db
    .insert(admins)
    .values({ email, password: hashed })
    .onConflictDoNothing();

  console.log(`✅ Admin created: ${email}`);
}

main().catch(console.error);
