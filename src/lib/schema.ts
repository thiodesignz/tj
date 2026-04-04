import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  link: text("link"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  image: text("image"),
  previewUrl: text("preview_url"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  liveUrl: text("live_url"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blog = pgTable("blog", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  coverImage: text("cover_image"),
  category: text("category"),
  author: text("author").default("Thrihash"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
