"use client";

import Image from "next/image";
import TransitionLink from "./TransitionLink";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Works", href: "/works" },
  { label: "Products", href: "/products" },
  { label: "Templates", href: "/templates" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex flex-col items-center w-full relative theme-bg">
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
        <div className="flex items-center gap-[12px]">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center theme-border border hover:opacity-70 transition-opacity"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-text">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-text">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:block bg-primary text-white font-[family-name:var(--font-geist)] text-[16px] tracking-[-0.32px] px-[20px] py-[12px] rounded-[44px] hover:opacity-90 transition-opacity"
          >
            Book a call
          </a>
        </div>
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
