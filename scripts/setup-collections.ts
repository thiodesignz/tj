/**
 * Run this script after creating your PocketBase superuser:
 *   npx tsx scripts/setup-collections.ts EMAIL PASSWORD
 *
 * It creates the works, templates, products, and blog collections.
 */

import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/setup-collections.ts EMAIL PASSWORD");
    process.exit(1);
  }

  // Auth as superuser
  await pb.collection("_superusers").authWithPassword(email, password);
  console.log("✓ Authenticated as superuser");

  // --- Works ---
  try {
    await pb.collections.create({
      name: "works",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "text" },
        { name: "image", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "link", type: "url" },
        { name: "order", type: "number", options: { min: 0 } },
      ],
      listRule: "",
      viewRule: "",
    });
    console.log("✓ Created 'works' collection");
  } catch (e: any) {
    console.log("⚠ works:", e.message || "already exists");
  }

  // --- Templates ---
  try {
    await pb.collections.create({
      name: "templates",
      type: "base",
      schema: [
        { name: "name", type: "text", required: true },
        { name: "category", type: "text" },
        { name: "image", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "previewUrl", type: "url" },
        { name: "order", type: "number", options: { min: 0 } },
      ],
      listRule: "",
      viewRule: "",
    });
    console.log("✓ Created 'templates' collection");
  } catch (e: any) {
    console.log("⚠ templates:", e.message || "already exists");
  }

  // --- Products ---
  try {
    await pb.collections.create({
      name: "products",
      type: "base",
      schema: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "text" },
        { name: "image", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "liveUrl", type: "url" },
        { name: "order", type: "number", options: { min: 0 } },
      ],
      listRule: "",
      viewRule: "",
    });
    console.log("✓ Created 'products' collection");
  } catch (e: any) {
    console.log("⚠ products:", e.message || "already exists");
  }

  // --- Blog ---
  try {
    await pb.collections.create({
      name: "blog",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true },
        { name: "excerpt", type: "text" },
        { name: "content", type: "editor" },
        { name: "coverImage", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "category", type: "text" },
        { name: "author", type: "text" },
        { name: "published", type: "bool" },
      ],
      listRule: "",
      viewRule: "",
    });
    console.log("✓ Created 'blog' collection");
  } catch (e: any) {
    console.log("⚠ blog:", e.message || "already exists");
  }

  console.log("\n✅ All collections ready!");
  console.log("   Admin panel: http://127.0.0.1:8090/_/");
}

main().catch(console.error);
