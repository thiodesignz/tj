import Image from "next/image";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactFooter from "../components/ContactFooter";

export default function WorksPage() {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      {/* ── Navigation ── */}
      <Navbar active="Works" />

      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[96px] items-start max-w-[1280px] w-full py-[120px]">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="bg-white border border-[#eaecee] flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px] whitespace-nowrap">
                See my projects
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[96px] text-black tracking-[-1.92px] leading-[99px] max-w-[872px]">
              Some of{" "}
              <em className="italic text-primary">my design projects</em> done
              for my clients.
            </h1>
          </div>

          {/* Project cards grid — 2 columns, 3 rows */}
          <div className="grid grid-cols-2 gap-[12px] w-full">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div
                key={project}
                className="bg-[#eee] flex h-[581px] items-end overflow-hidden p-[4px] rounded-[36px]"
              >
                <div className="bg-white flex flex-1 items-center justify-between px-[20px] py-[24px] rounded-[44px]">
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
              </div>
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
