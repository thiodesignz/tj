import Image from "next/image";
import TestimonialsCarousel from "./TestimonialsCarousel";

const testimonials = [
  {
    company: "Stripe",
    quote:
      "\u201cPalm UI made designing websites so much faster. The layouts are clean, modern, and easy to customize. Highly recommended!\u201d",
    avatar: "/assets/avatar-1.png",
    name: "Alex Carte",
    role: "Product Designer, Google",
  },
  {
    company: "Base",
    quote:
      "\u201cPalm UI saved us weeks of design work. The components are beautifully crafted and easy to plug in.\u201d",
    avatar: "/assets/avatar-2.png",
    name: "Alex Carter",
    role: "Product Designer, Base",
  },
  {
    company: "Nova",
    quote:
      "\u201cI\u2019ve tried dozens of UI kits\u2014this is by far the cleanest and most versatile one yet.\u201d",
    avatar: "/assets/avatar-3.png",
    name: "Samantha Lee",
    role: "Product Designer, Nova",
  },
  {
    company: "Atlas",
    quote:
      "\u201cThe design quality is top-tier. It gave our MVP a polished feel right from day one.\u201d",
    avatar: "/assets/avatar-4.png",
    name: "Jordan Kim",
    role: "Frontend Engineer, Atlas",
  },
  {
    company: "Layer",
    quote:
      "\u201cIt\u2019s rare to find a kit that works perfectly out of the box. Palm UI just gets it right.\u201d",
    avatar: "/assets/avatar-5.png",
    name: "Daniel White",
    role: "Head of Design, Frameworks",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="flex flex-col items-center w-full overflow-hidden">
      <div className="flex flex-col gap-[96px] items-center max-w-[1280px] w-full py-[120px]">
        {/* Header */}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="bg-white border border-[#eaecee] flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px] whitespace-nowrap">
                Testimonials
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[96px] text-black tracking-[-1.92px] leading-[99px] max-w-[872px]">
              Words from my
              <br />
              lovely <em className="italic text-primary">clients</em>
            </h2>
          </div>
          <div className="flex flex-col gap-[12px] items-end shrink-0">
            <div className="font-[family-name:var(--font-geist)] text-[16px] text-right tracking-[-0.32px]">
              <p className="text-black">Loved by those</p>
              <p className="text-black/40">who value thoughtful designs</p>
            </div>
            <div className="border border-[#efefef] flex items-center p-[8px] rounded-full">
              <div className="flex items-start pr-[10px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="bg-[#d1d1d1] border-[3px] border-white rounded-full w-[44px] h-[44px] -mr-[10px]"
                  />
                ))}
                <div className="bg-black border-[3px] border-white rounded-full w-[44px] h-[44px] -mr-[10px] flex items-center justify-center overflow-hidden">
                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] text-white leading-[20px]">
                    +20
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
