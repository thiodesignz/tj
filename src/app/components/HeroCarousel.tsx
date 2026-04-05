"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/assets/hero-1.jpg",
  "/assets/hero-2.jpg",
  "/assets/hero-3.jpg",
];

export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(661);

  useEffect(() => {
    function updateCardWidth() {
      const w = window.innerWidth;
      if (w < 768) {
        setCardWidth(300);
      } else if (w < 1024) {
        setCardWidth(450);
      } else {
        setCardWidth(661);
      }
    }
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // px per frame
    const gap = 12;

    function animate() {
      position -= speed;
      const singleSetWidth = (cardWidth + gap) * images.length;
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
  }, [cardWidth]);

  // Duplicate images for seamless infinite loop
  const allImages = [...images, ...images];

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] mt-[48px] md:mt-[72px] lg:mt-[96px]">
      <div
        ref={trackRef}
        className="flex gap-[12px] h-full will-change-transform"
      >
        {allImages.map((src, i) => (
          <div
            key={i}
            className="h-full rounded-[12px] overflow-hidden shrink-0 relative"
            style={{ width: `${cardWidth}px` }}
          >
            <Image
              src={src}
              alt={`Project showcase ${(i % images.length) + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, 661px"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
