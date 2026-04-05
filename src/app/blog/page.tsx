import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import { getPosts, type GhostPost } from "@/lib/ghost";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function AuthorRow({
  post,
}: {
  post: GhostPost;
}) {
  return (
    <div className="flex items-center gap-[8px] flex-wrap">
      {post.primary_author?.profile_image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.primary_author.profile_image}
          alt={post.primary_author.name}
          className="rounded-full object-cover w-[24px] h-[24px]"
        />
      ) : (
        <Image
          src="/assets/thrihash.jpg"
          alt="Author"
          width={24}
          height={24}
          className="rounded-full object-cover w-[24px] h-[24px]"
        />
      )}
      <span className="font-[family-name:var(--font-geist)] font-medium text-[13px] theme-text tracking-[-0.26px]">
        {post.primary_author?.name || "Thrihash"}
      </span>
      <span className="text-black/30">·</span>
      <span className="font-[family-name:var(--font-geist)] text-[13px] theme-text-faint tracking-[-0.26px]">
        {formatDate(post.published_at)}
      </span>
      {post.primary_tag && (
        <>
          <span className="text-black/30">·</span>
          <span className="font-[family-name:var(--font-geist)] text-[13px] text-black/60 tracking-[-0.26px] border theme-border rounded-full px-[12px] py-[4px] whitespace-nowrap">
            {post.primary_tag.name}
          </span>
        </>
      )}
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getPosts(20);

  const featured = posts[0];
  const sideTop = posts[1];
  const sideBottom = posts[2];
  const grid = posts.slice(3);

  // Extract unique tags for filter
  const tags = [
    "All",
    ...Array.from(
      new Set(posts.map((p) => p.primary_tag?.name).filter(Boolean) as string[])
    ),
  ];

  return (
    <div className="theme-bg flex flex-col items-center w-full">
      <Navbar active="Blog" />

      <section className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[40px] md:gap-[52px] lg:gap-[64px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          {/* Heading */}
          <div className="flex flex-col gap-[24px] items-start">
            <div className="theme-bg border theme-border flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px] whitespace-nowrap">
                Blog
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] theme-text tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[872px]">
              Thoughts, <em className="italic text-primary">ideas </em> &amp;
              learnings.
            </h1>
          </div>

          {/* Filter tags */}
          <div className="flex gap-[8px] items-center flex-wrap">
            {tags.map((cat, i) => (
              <button
                key={cat}
                className={`font-[family-name:var(--font-geist)] text-[14px] tracking-[-0.28px] border rounded-full px-[16px] py-[8px] whitespace-nowrap transition-colors ${
                  i === 0
                    ? "bg-primary text-white border-primary"
                    : "theme-bg theme-text theme-border hover:border-black/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* No posts state */}
          {posts.length === 0 && (
            <p className="font-[family-name:var(--font-geist)] text-[16px] theme-text-secondary py-[64px] text-center w-full">
              No blog posts yet. Connect your Ghost instance to get started.
            </p>
          )}

          {/* Featured / Bento layout */}
          {featured && (
            <div className="flex flex-col lg:flex-row gap-[24px] w-full">
              {/* Left — Featured post */}
              <Link
                href={`/blog/${featured.slug}`}
                className="flex flex-col gap-[16px] flex-1 min-w-0 cursor-pointer group"
              >
                <div className="theme-bg-card rounded-[16px] w-full h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden shrink-0">
                  {featured.feature_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.feature_image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <AuthorRow post={featured} />
                <h2 className="font-[family-name:var(--font-geist)] font-semibold text-[22px] theme-text tracking-[-0.44px] leading-[28px] group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="font-[family-name:var(--font-geist)] text-[15px] theme-text-secondary tracking-[-0.3px] leading-[22px]">
                  {featured.excerpt}
                </p>
              </Link>

              {/* Right — Two stacked posts */}
              <div className="flex flex-col gap-[24px] flex-1 min-w-0">
                {sideTop && (
                  <Link
                    href={`/blog/${sideTop.slug}`}
                    className="flex gap-[16px] cursor-pointer group"
                  >
                    <div className="theme-bg-card rounded-[16px] w-[160px] md:w-[200px] lg:w-[240px] h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden shrink-0">
                      {sideTop.feature_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={sideTop.feature_image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                      <AuthorRow post={sideTop} />
                      <h3 className="font-[family-name:var(--font-geist)] font-semibold text-[17px] theme-text tracking-[-0.34px] leading-[22px] group-hover:text-primary transition-colors">
                        {sideTop.title}
                      </h3>
                      <p className="font-[family-name:var(--font-geist)] text-[14px] theme-text-secondary tracking-[-0.28px] leading-[20px] line-clamp-3">
                        {sideTop.excerpt}
                      </p>
                    </div>
                  </Link>
                )}
                {sideBottom && (
                  <Link
                    href={`/blog/${sideBottom.slug}`}
                    className="flex gap-[16px] cursor-pointer group"
                  >
                    <div className="theme-bg-card rounded-[16px] w-[160px] md:w-[200px] lg:w-[240px] h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden shrink-0">
                      {sideBottom.feature_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={sideBottom.feature_image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                      <AuthorRow post={sideBottom} />
                      <h3 className="font-[family-name:var(--font-geist)] font-semibold text-[17px] theme-text tracking-[-0.34px] leading-[22px] group-hover:text-primary transition-colors">
                        {sideBottom.title}
                      </h3>
                      <p className="font-[family-name:var(--font-geist)] text-[14px] theme-text-secondary tracking-[-0.28px] leading-[20px] line-clamp-3">
                        {sideBottom.excerpt}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Grid — responsive columns */}
          {grid.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
              {grid.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col gap-[16px] cursor-pointer group"
                >
                  <div className="theme-bg-card rounded-[16px] w-full h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden">
                    {post.feature_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.feature_image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <AuthorRow post={post} />
                  <h3 className="font-[family-name:var(--font-geist)] font-semibold text-[17px] theme-text tracking-[-0.34px] leading-[22px] group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-[family-name:var(--font-geist)] text-[14px] theme-text-secondary tracking-[-0.28px] leading-[20px] line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
