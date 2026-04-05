"use client";

import Image from "next/image";
import TransitionLink from "./TransitionLink";
import { useState } from "react";

const navLinks = [
  { label: "Works", href: "/works" },
  { label: "Products", href: "/products" },
  { label: "Templates", href: "/templates" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex flex-col items-center w-full relative">
      <div className="flex h-[80px] items-center justify-between max-w-[1280px] w-full px-[20px] lg:px-[4px]">
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
          {/* Desktop nav links */}
          <div className="hidden md:flex gap-[36px] items-center font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px]">
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
        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
        >
          Book a call
        </a>
        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] items-center justify-center w-[40px] h-[40px] rounded-[8px] hover:bg-black/5 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-[20px] h-[2px] bg-black rounded-full transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-[20px] h-[2px] bg-black rounded-full transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[20px] h-[2px] bg-black rounded-full transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 right-0 bg-white border-t border-[#eaecee] z-50 shadow-lg">
          <div className="flex flex-col px-[20px] py-[16px] gap-[4px]">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.label}
                href={link.href}
                className={`font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] py-[12px] px-[12px] rounded-[12px] hover:bg-black/5 transition-colors ${
                  active === link.label
                    ? "text-black font-semibold"
                    : "text-black/40"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </TransitionLink>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity text-center mt-[8px]"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
