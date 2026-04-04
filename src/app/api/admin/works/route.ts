import { db } from "@/lib/db";
import { works } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await db.select().from(works).orderBy(works.order);
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [item] = await db.insert(works).values(body).returning();
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...data } = body;
  const [item] = await db.update(works).set(data).where(eq(works.id, id)).returning();
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await db.delete(works).where(eq(works.id, id));
  return NextResponse.json({ ok: true });
}
