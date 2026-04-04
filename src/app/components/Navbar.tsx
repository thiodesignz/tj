import Image from "next/image";
import TransitionLink from "./TransitionLink";

const navLinks = [
  { label: "Works", href: "/works" },
  { label: "Products", href: "/products" },
  { label: "Templates", href: "/templates" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar({ active }: { active?: string }) {
  return (
    <nav className="flex flex-col items-center w-full">
      <div className="flex h-[80px] items-center justify-between max-w-[1280px] w-full px-[4px]">
        <div className="flex gap-[56px] items-center">
          <TransitionLink href="/">
            <Image
              src="/assets/thrihash.jpg"
              alt="Thrihash"
              width={36}
              height={36}
              className="rounded-full object-cover w-[36px] h-[36px]"
            />
          </TransitionLink>
          <div className="flex gap-[36px] items-center font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px]">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.label}
                href={link.href}
                className={`hover:opacity-70 transition-opacity ${
                  active === link.label
                    ? "text-black font-semibold"
                    : "text-black/40"
                }`}
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>
        </div>
        <a
          href="#contact"
          className="bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
