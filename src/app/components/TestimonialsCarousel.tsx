"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface Testimonial {
  company: string;
  quote: string;
  avatar: string;
  name: string;
  role: string;
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const speed = 0.4;
    const cardWidth = 337; // ~1684px / 5 cards
    const gap = 8;
    const singleSetWidth = (cardWidth + gap) * testimonials.length;

    function animate() {
      position -= speed;
      if (Math.abs(position) >= singleSetWidth) {
        position += singleSetWidth;
      }
      if (track) {
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [testimonials.length]);

  // Duplicate for seamless loop
  const allCards = [...testimonials, ...testimonials];

  return (
    <div className="w-full overflow-hidden pb-[120px]">
      <div
        ref={trackRef}
        className="flex gap-[8px] will-change-transform"
      >
        {allCards.map((t, i) => (
          <div
            key={i}
            className="bg-[#fafafa] flex flex-col w-[337px] h-[420px] items-start justify-between overflow-hidden p-[32px] rounded-[24px] shrink-0"
          >
            <p className="font-[family-name:var(--font-geist)] font-semibold text-[18px] text-black/30 tracking-[-0.36px]">
              {t.company}
            </p>
            <p className="font-[family-name:var(--font-geist)] text-[16px] text-[#5e5e5e] tracking-[-0.32px] leading-normal">
              {t.quote}
            </p>
            <div className="flex gap-[12px] items-center">
              <Image
                src={t.avatar}
                alt={t.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col leading-normal">
                <span className="font-[family-name:var(--font-geist)] font-semibold text-[16px] text-black tracking-[-0.32px]">
                  {t.name}
                </span>
                <span className="font-[family-name:var(--font-geist)] text-[14px] text-[#7c7c7c] tracking-[-0.28px]">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
