import Image from "next/image";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactFooter from "../components/ContactFooter";
import { db } from "@/lib/db";
import { templates } from "@/lib/schema";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const items = await db.select().from(templates).orderBy(templates.order);

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Navbar active="Templates" />

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

          <div className="grid grid-cols-2 gap-[12px] w-full">
            {items.map((template) => (
              <a
                key={template.id}
                href={template.previewUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eee] flex flex-col h-[581px] overflow-hidden rounded-[36px] group"
              >
                <div className="flex-1 relative overflow-hidden">
                  {template.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-[4px]">
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
