import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import ContactFooter from "../../components/ContactFooter";
import { db } from "@/lib/db";
import { blog } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import BlogContent from "./BlogContent";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(blog)
    .where(and(eq(blog.slug, slug), eq(blog.published, true)));

  if (!post) return notFound();

  return (
    <div className="theme-bg flex flex-col items-center w-full">
      <Navbar active="Blog" />

      <article className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[40px] items-start max-w-[720px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          <Link
            href="/blog"
            className="font-[family-name:var(--font-geist)] text-[14px] theme-text-faint hover:theme-text transition-colors"
          >
            &larr; Back to blog
          </Link>

          <div className="flex flex-col gap-[16px]">
            {post.category && (
              <span className="font-[family-name:var(--font-geist)] text-[13px] text-primary tracking-[-0.26px] border border-primary/20 rounded-full px-[12px] py-[4px] w-fit">
                {post.category}
              </span>
            )}
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] md:text-[48px] lg:text-[56px] theme-text tracking-[-1.12px] leading-[40px] md:leading-[52px] lg:leading-[60px]">
              {post.title}
            </h1>
            <div className="flex items-center gap-[12px] flex-wrap">
              <Image
                src="/assets/thrihash.jpg"
                alt="Author"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="font-[family-name:var(--font-geist)] font-medium text-[14px] theme-text tracking-[-0.28px]">
                {post.author || "Thrihash"}
              </span>
              {post.createdAt && (
                <>
                  <span className="theme-text-faint">&middot;</span>
                  <span className="font-[family-name:var(--font-geist)] text-[14px] theme-text-muted tracking-[-0.28px]">
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          {post.coverImage && (
            <div className="w-full rounded-[16px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {post.content && <BlogContent html={post.content} />}
        </div>
      </article>

      <ContactFooter />
    </div>
  );
}
