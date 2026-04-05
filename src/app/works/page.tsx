import Image from "next/image";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactFooter from "../components/ContactFooter";
import { db } from "@/lib/db";
import { works } from "@/lib/schema";

export const dynamic = "force-dynamic";

export default async function WorksPage() {
  const items = await db.select().from(works).orderBy(works.order);

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Navbar active="Works" />

      <section className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[48px] md:gap-[72px] lg:gap-[96px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="bg-white border border-[#eaecee] flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px] whitespace-nowrap">
                See my projects
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] text-black tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[872px]">
              Some of{" "}
              <em className="italic text-primary">my design projects</em> done
              for my clients.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] w-full">
            {items.map((work) => (
              <a
                key={work.id}
                href={work.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eee] flex h-[350px] md:h-[450px] lg:h-[581px] items-end overflow-hidden p-[4px] rounded-[36px] relative group"
              >
                {work.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.image}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="bg-white flex flex-1 items-center justify-between px-[20px] py-[24px] rounded-[44px] relative z-10">
                  <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px]">
                    View Casestudy
                  </span>
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

      <TestimonialsSection />
      <ContactFooter />
    </div>
  );
}
