import Image from "next/image";

export default function ContactFooter() {
  return (
    <section id="contact" className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-[48px] md:gap-[72px] lg:gap-[96px] items-start max-w-[1280px] w-full py-[60px] md:py-[80px] lg:py-[120px] px-[20px] lg:px-0">
        <div className="flex flex-col gap-[24px] items-start">
          <div className="theme-bg border theme-border flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px]">
            <div className="bg-primary rounded-full w-[16px] h-[16px]" />
            <span className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px] whitespace-nowrap">
              Have a project idea?
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[48px] md:text-[64px] lg:text-[96px] theme-text tracking-[-1.92px] leading-[52px] md:leading-[68px] lg:leading-[99px] max-w-[872px]">
            <em className="italic text-primary">Let&apos;s talk</em> about it!
          </h2>
          <div className="flex flex-col sm:flex-row gap-[5px] items-start sm:items-center">
            <a
              href="mailto:thrihash@gmail.com"
              className="bg-primary text-white font-[family-name:var(--font-geist)] text-[14px] sm:text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
            >
              Say hello to - thrihash@gmail.com
            </a>
            <div className="flex gap-[5px]">
              <a
                href="#"
                className="bg-primary flex items-center justify-center px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/assets/social-x.svg"
                  alt="X (Twitter)"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="#"
                className="bg-primary flex items-center justify-center px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/assets/social-linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
        <p className="font-[family-name:var(--font-geist)] text-[16px] theme-text tracking-[-0.32px]">
          2023 &copy; &mdash; Made by Orcitek
        </p>
      </div>
    </section>
  );
}
