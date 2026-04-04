import Image from "next/image";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactFooter from "../components/ContactFooter";

export default function TemplatesPage() {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      {/* ── Navigation ── */}
      <Navbar active="Templates" />

      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[96px] items-start max-w-[1280px] w-full py-[120px]">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="bg-white border border-[#eaecee] flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px] whitespace-nowrap">
                Ready to use templates
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[96px] text-black tracking-[-1.92px] leading-[99px] max-w-[872px]">
              Starter{" "}
              <em className="italic text-primary">templates</em> to kickstart
              your next project.
            </h1>
          </div>

          {/* Template cards grid — 2 columns, 3 rows */}
          <div className="grid grid-cols-2 gap-[12px] w-full">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-[#eee] flex flex-col h-[581px] overflow-hidden rounded-[36px]"
              >
                {/* Template preview area */}
                <div className="flex-1 relative" />
                {/* Bottom bar */}
                <div className="p-[4px] pb-[4px]">
                  <div className="bg-white flex items-center justify-between px-[20px] py-[24px] rounded-[32px]">
                    <div className="flex flex-col">
                      <span className="font-[family-name:var(--font-geist)] font-semibold text-[16px] text-black tracking-[-0.32px]">
                        {template.name}
                      </span>
                      <span className="font-[family-name:var(--font-geist)] text-[14px] text-[#7c7c7c] tracking-[-0.28px]">
                        {template.category}
                      </span>
                    </div>
                    <div className="flex gap-[8px] items-center">
                      <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px]">
                        View Preview
                      </span>
                      <Image
                        src="/assets/arrow-right.svg"
                        alt="Arrow"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
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

const templates = [
  { id: 1, name: "SaaS Landing", category: "Landing Page" },
  { id: 2, name: "Portfolio Pro", category: "Portfolio" },
  { id: 3, name: "Agency starter", category: "Agency" },
  { id: 4, name: "Blog starter", category: "Blog" },
  { id: 5, name: "E-commerce starter", category: "E-commerce" },
  { id: 6, name: "Dashboard UI", category: "Dashboard" },
];
