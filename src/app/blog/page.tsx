import Image from "next/image";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import { db } from "@/lib/db";
import { blog } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const categories = [
  "All",
  "Design",
  "Development",
  "AI",
  "Branding",
  "Inspiration",
  "Process",
];

const posts = [
  {
    id: 1,
    title: "Eat With the Seasons: A Fresh Take on Healthy Eating",
    excerpt:
      "There's something comforting about eating with the seasons. Strawberries that taste like sunshine in June. Pumpkins that fill your home with warmth in October. The rhythm of nature offers more than just variety — it offers balance.",
    date: "12.12.2023",
    category: "Design",
    author: "Thrihash",
    featured: true,
  },
  {
    id: 2,
    title: "Why Seasonal Eating Just Makes Sense",
    excerpt:
      "Seasonal produce is harvested at its peak — fresher, tastier, and more nutritious. That spring spinach in your smoothie? Packed with iron and vitamin C, and grown close to home.",
    date: "10.12.2023",
    category: "Development",
    author: "Thrihash",
  },
  {
    id: 3,
    title: "Keep It Simple, Keep It Joyful",
    excerpt:
      "Healthy eating is simple: skip the detox, shop local, choose what's fresh, and let nature shape your meals. Real food, real flavor — no overthinking needed.",
    date: "08.12.2023",
    category: "AI",
    author: "Thrihash",
  },
  {
    id: 4,
    title: "5 Easy Ways to Eat More Veggies Without Even Noticing",
    excerpt:
      "Add more greens to your meals with zero effort — these small tricks make a big difference.",
    date: "12.12.2023",
    category: "Design",
    author: "Thrihash",
  },
  {
    id: 5,
    title: "Spring Pea & Mint Risotto",
    excerpt:
      "Fresh, light and full of flavor — this creamy risotto is your new go-to for spring evenings.",
    date: "12.12.2023",
    category: "Branding",
    author: "Thrihash",
  },
  {
    id: 6,
    title: "Why Slowing Down at the Table Might Be the Healthiest Choice",
    excerpt:
      "It's not just what you eat, it's how. Discover the joy (and benefits) of mindful meals.",
    date: "12.12.2023",
    category: "Inspiration",
    author: "Thrihash",
  },
  {
    id: 7,
    title: "From Designer to Design Engineer — My Journey",
    excerpt:
      "How I went from pushing pixels in Figma to shipping production code, and why every designer should learn to build.",
    date: "05.01.2024",
    category: "Process",
    author: "Thrihash",
  },
  {
    id: 8,
    title: "The Role of AI in Modern Design Workflows",
    excerpt:
      "AI tools are changing how designers work. I explore the tools I use daily and how they've improved my output.",
    date: "28.02.2024",
    category: "AI",
    author: "Thrihash",
  },
  {
    id: 9,
    title: "Lessons from Redesigning 20+ Brand Identities",
    excerpt:
      "Every rebrand teaches you something new. These are the common patterns, mistakes, and breakthroughs I've seen.",
    date: "22.01.2024",
    category: "Branding",
    author: "Thrihash",
  },
];

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="font-[family-name:var(--font-geist)] text-[13px] text-black/60 tracking-[-0.26px] border theme-border rounded-full px-[12px] py-[4px] whitespace-nowrap">
      {label}
    </span>
  );
}

function AuthorRow({
  author,
  date,
  category,
}: {
  author: string;
  date: string;
  category: string;
}) {
  return (
    <div className="flex items-center gap-[8px] flex-wrap">
      <Image
        src="/assets/thrihash.jpg"
        alt={author}
        width={24}
        height={24}
        className="rounded-full object-cover w-[24px] h-[24px]"
      />
      <span className="font-[family-name:var(--font-geist)] font-medium text-[13px] theme-text tracking-[-0.26px]">
        {author}
      </span>
      <span className="text-black/30">·</span>
      <span className="font-[family-name:var(--font-geist)] text-[13px] theme-text-faint tracking-[-0.26px]">
        {date}
      </span>
      <span className="text-black/30">·</span>
      <CategoryTag label={category} />
    </div>
  );
}

export default async function BlogPage() {
  const posts = await db.select().from(blog).where(eq(blog.published, true)).orderBy(desc(blog.createdAt));
  const featured = posts[0];
  const sideTop = posts[1];
  const sideBottom = posts[2];
  const grid = posts.slice(3);

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
            {categories.map((cat, i) => (
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

          {/* Featured / Bento layout */}
          {featured && <div className="flex flex-col lg:flex-row gap-[24px] w-full">
            {/* Left — Featured post */}
            <div className="flex flex-col gap-[16px] flex-1 min-w-0 cursor-pointer group">
              <div className="theme-bg-card rounded-[16px] w-full h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden shrink-0">
                {featured.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.coverImage} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <AuthorRow
                author={featured.author || "Thrihash"}
                date={featured.createdAt ? new Date(featured.createdAt).toLocaleDateString() : ""}
                category={featured.category || ""}
              />
              <h2 className="font-[family-name:var(--font-geist)] font-semibold text-[22px] theme-text tracking-[-0.44px] leading-[28px] group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="font-[family-name:var(--font-geist)] text-[15px] theme-text-secondary tracking-[-0.3px] leading-[22px]">
                {featured.excerpt}
              </p>
            </div>

            {/* Right — Two stacked posts */}
            <div className="flex flex-col gap-[24px] flex-1 min-w-0">
              {/* Top right */}
              {sideTop && <div className="flex gap-[16px] cursor-pointer group">
                <div className="theme-bg-card rounded-[16px] w-[160px] md:w-[200px] lg:w-[240px] h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden shrink-0">
                  {sideTop.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sideTop.coverImage} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                  <AuthorRow
                    author={sideTop.author || "Thrihash"}
                    date={sideTop.createdAt ? new Date(sideTop.createdAt).toLocaleDateString() : ""}
                    category={sideTop.category || ""}
                  />
                  <h3 className="font-[family-name:var(--font-geist)] font-semibold text-[17px] theme-text tracking-[-0.34px] leading-[22px] group-hover:text-primary transition-colors">
                    {sideTop.title}
                  </h3>
                  <p className="font-[family-name:var(--font-geist)] text-[14px] theme-text-secondary tracking-[-0.28px] leading-[20px] line-clamp-3">
                    {sideTop.excerpt}
                  </p>
                </div>
              </div>}
              {/* Bottom right */}
              {sideBottom && <div className="flex gap-[16px] cursor-pointer group">
                <div className="theme-bg-card rounded-[16px] w-[160px] md:w-[200px] lg:w-[240px] h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden shrink-0">
                  {sideBottom.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sideBottom.coverImage} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                  <AuthorRow
                    author={sideBottom.author || "Thrihash"}
                    date={sideBottom.createdAt ? new Date(sideBottom.createdAt).toLocaleDateString() : ""}
                    category={sideBottom.category || ""}
                  />
                  <h3 className="font-[family-name:var(--font-geist)] font-semibold text-[17px] theme-text tracking-[-0.34px] leading-[22px] group-hover:text-primary transition-colors">
                    {sideBottom.title}
                  </h3>
                  <p className="font-[family-name:var(--font-geist)] text-[14px] theme-text-secondary tracking-[-0.28px] leading-[20px] line-clamp-3">
                    {sideBottom.excerpt}
                  </p>
                </div>
              </div>}
            </div>
          </div>}

          {/* Grid — responsive columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
            {grid.map((post) => (
              <article
                key={post.id}
                className="flex flex-col gap-[16px] cursor-pointer group"
              >
                <div className="theme-bg-card rounded-[16px] w-full h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden">
                  {post.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <AuthorRow
                  author={post.author || "Thrihash"}
                  date={post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                  category={post.category || ""}
                />
                <h3 className="font-[family-name:var(--font-geist)] font-semibold text-[17px] theme-text tracking-[-0.34px] leading-[22px] group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="font-[family-name:var(--font-geist)] text-[14px] theme-text-secondary tracking-[-0.28px] leading-[20px] line-clamp-2">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
