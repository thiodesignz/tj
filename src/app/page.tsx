import Image from "next/image";
import Navbar from "./components/Navbar";
import TransitionLink from "./components/TransitionLink";
import AvailabilityBadge from "./components/AvailabilityBadge";
import HeroCarousel from "./components/HeroCarousel";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactFooter from "./components/ContactFooter";
import { db } from "@/lib/db";
import { works } from "@/lib/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await db.select().from(works).orderBy(works.order).limit(4);
  return (
    <div className="theme-bg flex flex-col items-center w-full">
      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center w-full overflow-hidden">
        <div className="flex flex-col items-start max-w-[1280px] w-full pt-[60px] md:pt-[80px] lg:pt-[120px] px-[20px] lg:px-0">
          <div className="flex flex-col gap-[24px] items-start max-w-[1106px]">
            {/* Availability badge */}
            <AvailabilityBadge />
            {/* Heading */}
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] theme-text tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[1023px]">
              AI design engineer partner with focus on{" "}
              <em className="italic text-primary">design experiences</em>
            </h1>
            {/* CTA */}
            <a
              href="#works"
              className="bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
            >
              See my projects
            </a>
          </div>
        </div>
        {/* Auto-scroll carousel - full width, no clip */}
        <HeroCarousel />
      </section>

      {/* ── About Section ── */}
      <section className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[48px] md:gap-[72px] lg:gap-[96px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          <div className="flex flex-col gap-[24px] items-start">
            {/* Badge */}
            <div className="theme-bg border theme-border flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px] whitespace-nowrap">
                Hello I am Thrihash
              </span>
            </div>
            {/* Heading */}
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] theme-text tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[955px]">
              I help{" "}
              <em className="italic text-primary">
                Startups, Business &amp; Brands
              </em>{" "}
              to build a strong online presence so that people remember them.
            </h2>
          </div>
          {/* Brand logos marquee */}
          <div className="h-[32px] overflow-hidden w-full relative">
            <div className="flex gap-[64px] items-center opacity-40 animate-marquee whitespace-nowrap">
              {[
                "AGENCY",
                "STUDIO.io",
                "Create+",
                "DESIGNLAB",
                "ARTISTIC",
                "PIXELPERFECT",
                "Visuals",
                "MINDSCAPE",
                "AGENCY",
                "STUDIO.io",
                "Create+",
                "DESIGNLAB",
                "ARTISTIC",
                "PIXELPERFECT",
                "Visuals",
                "MINDSCAPE",
              ].map((brand, i) => (
                <span
                  key={i}
                  className="font-[family-name:var(--font-inter)] font-bold theme-text text-[24px] leading-[32px] shrink-0"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="bg-primary flex flex-col items-center w-full">
        <div className="flex flex-col gap-[48px] md:gap-[72px] lg:gap-[96px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] text-white tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[955px]">
            What Services i do !
          </h2>
          {/* Services grid */}
          <div className="flex flex-col md:flex-row gap-[12px] md:h-[720px] items-center w-full">
            {/* Left column */}
            <div className="flex flex-col gap-[12px] flex-1 w-full md:h-full min-w-0">
              <ServiceCard title="Branding/Logo design" />
              <ServiceCard title="Visual & Promotional Design" />
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-[12px] flex-1 w-full md:h-full min-w-0">
              {/* Top row: Framer + AI */}
              <div className="flex gap-[12px] flex-1 min-h-[160px] md:min-h-0">
                <div className="theme-bg flex flex-1 items-center justify-center overflow-hidden p-[24px] md:p-[32px] rounded-[20px] min-w-0">
                  <div className="flex flex-col gap-[24px] items-center">
                    <Image
                      src="/assets/slack.svg"
                      alt="Framer"
                      width={38}
                      height={38}
                    />
                    <p className="font-[family-name:var(--font-geist)] font-semibold text-[20px] theme-text tracking-[-0.4px] text-center">
                      Framer
                      <br />
                      Development
                    </p>
                  </div>
                </div>
                <div className="theme-bg flex flex-1 items-center justify-center overflow-hidden p-[24px] md:p-[32px] rounded-[20px] min-w-0">
                  <div className="flex flex-col gap-[24px] items-center">
                    <Image
                      src="/assets/slack.svg"
                      alt="AI"
                      width={38}
                      height={38}
                    />
                    <p className="font-[family-name:var(--font-geist)] font-semibold text-[20px] theme-text tracking-[-0.4px] text-center">
                      AI &amp;
                      <br />
                      Automations
                    </p>
                  </div>
                </div>
              </div>
              {/* Product design card */}
              <div className="theme-bg flex flex-col items-start overflow-hidden rounded-[20px] shrink-0">
                <div className="h-[162px] overflow-hidden relative w-full">
                  <div className="absolute top-1/2 -translate-y-1/2 left-[-48px] flex gap-[6px] items-center">
                    {[
                      { src: "/assets/figma.svg", alt: "Figma" },
                      { src: "/assets/notion-bg.svg", alt: "Notion" },
                      { src: "/assets/meet.svg", alt: "Meet" },
                      { src: "/assets/slack.svg", alt: "Slack" },
                      { src: "/assets/messengers.svg", alt: "Teams" },
                      { src: "/assets/slack.svg", alt: "Slack 2" },
                      { src: "/assets/notion-bg.svg", alt: "Notion 2" },
                      { src: "/assets/meet.svg", alt: "Meet 2" },
                    ].map((tool, i) => (
                      <div
                        key={i}
                        className="theme-bg-card flex items-center overflow-hidden px-[21px] py-[19px] rounded-[25px] shrink-0"
                      >
                        <Image
                          src={tool.src}
                          alt={tool.alt}
                          width={38}
                          height={38}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start pb-[32px] px-[32px] w-full">
                  <p className="font-[family-name:var(--font-geist)] font-semibold text-[20px] theme-text tracking-[-0.4px] text-center w-full">
                    Product design
                  </p>
                </div>
              </div>
              {/* UI/UX card */}
              <ServiceCard title="UI/UX design" height={280} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="works" className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[48px] md:gap-[72px] lg:gap-[96px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="theme-bg border theme-border flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px] whitespace-nowrap">
                See my works
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] theme-text tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[872px]">
              Some of <em className="italic text-primary">my projects</em> build
              for my clients
            </h2>
            <TransitionLink
              href="/works"
              className="bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
            >
              View all my projects
            </TransitionLink>
          </div>
          {/* Project cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] w-full">
            {projects.map((work) => (
              <a
                key={work.id}
                href={work.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-bg-card flex h-[350px] md:h-[450px] lg:h-[581px] items-end overflow-hidden p-[4px] rounded-[36px] relative group"
              >
                {work.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.image}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-[36px]"
                  />
                )}
                <div className="theme-bg-card-inner flex flex-1 items-center justify-between px-[20px] py-[24px] rounded-[32px] relative z-10">
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-geist)] font-semibold text-[16px] theme-text tracking-[-0.32px]">
                      {work.title}
                    </span>
                    <span className="font-[family-name:var(--font-geist)] text-[14px] theme-text-muted tracking-[-0.28px]">
                      View Casestudy
                    </span>
                  </div>
                  <Image
                    src="/assets/arrow-right.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <TestimonialsSection />

      {/* ── Contact & Footer ── */}
      <ContactFooter />
    </div>
  );
}

/* ── Service Card Component ── */
function ServiceCard({
  title,
  height,
}: {
  title: string;
  height?: number;
}) {
  return (
    <div
      className="theme-bg flex flex-col flex-1 items-start overflow-hidden rounded-[20px] min-h-[200px] md:min-h-0"
      style={height ? { height, flex: "none" } : undefined}
    >
      <div className="theme-bg-card flex-1 overflow-hidden relative w-full min-h-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[4px] opacity-30">
          <div className="w-[32px] h-[32px] rounded-full border-2 border-[#c0c0c0]" />
          <div className="w-[36px] h-[31px] border-l-2 border-b-2 border-[#c0c0c0]" />
          <div className="w-[31px] h-[31px] bg-[#d2d2d2]" />
        </div>
      </div>
      <div className="flex flex-col items-start p-[32px] w-full">
        <p className="font-[family-name:var(--font-geist)] font-semibold text-[20px] theme-text tracking-[-0.4px] text-center w-full">
          {title}
        </p>
      </div>
    </div>
  );
}
