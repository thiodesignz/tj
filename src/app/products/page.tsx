import Image from "next/image";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactFooter from "../components/ContactFooter";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await db.select().from(products).orderBy(products.order);

  return (
    <div className="theme-bg flex flex-col items-center w-full">
      <Navbar active="Products" />

      <section className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[48px] md:gap-[72px] lg:gap-[96px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="theme-bg border theme-border flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
              <div className="bg-primary rounded-full w-[16px] h-[16px]" />
              <span className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px] whitespace-nowrap">
                My products
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] theme-text tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[872px]">
              Products I{" "}
              <em className="italic text-primary">built &amp; shipped</em> for
              the community.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] w-full">
            {items.map((product) => (
              <a
                key={product.id}
                href={product.liveUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-bg-card flex h-[350px] md:h-[450px] lg:h-[581px] items-end overflow-hidden p-[4px] rounded-[36px] relative group"
              >
                {product.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="theme-bg-card-inner flex flex-1 items-center justify-between px-[20px] py-[24px] rounded-[32px] relative z-10">
                  <span className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px]">
                    View Live
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
