"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const images = [
  "/assets/hero-1.jpg",
  "/assets/hero-2.jpg",
  "/assets/hero-3.jpg",
];

export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // px per frame

    function animate() {
      position -= speed;
      // Each image is 661px + 12px gap = 673px, 3 images = 2019px
      // Reset when first set is fully scrolled
      const singleSetWidth = (661 + 12) * images.length;
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
  }, []);

  // Duplicate images for seamless infinite loop
  const allImages = [...images, ...images];

  return (
    <div className="w-full h-[500px] mt-[96px]">
      <div
        ref={trackRef}
        className="flex gap-[12px] h-full will-change-transform"
      >
        {allImages.map((src, i) => (
          <div
            key={i}
            className="w-[661px] h-full rounded-[12px] overflow-hidden shrink-0 relative"
          >
            <Image
              src={src}
              alt={`Project showcase ${(i % images.length) + 1}`}
              fill
              className="object-cover"
              sizes="661px"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
