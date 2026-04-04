"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [dots, setDots] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 5 ? "" : prev + "."));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Trigger fade out after 2.5s, then call onComplete
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-white border-[1.66px] border-[#eaecee] flex gap-[13px] items-center overflow-hidden pl-[20px] pr-[33px] py-[20px] rounded-[53px] animate-[scaleIn_0.6s_ease-out]">
        <div className="relative w-[53px] h-[53px] shrink-0">
          {/* Rotating blue stroke */}
          <div className="absolute inset-[-3px] rounded-full border-[2.5px] border-transparent border-t-primary border-r-primary animate-[spin_1s_linear_infinite]" />
          <div className="overflow-hidden rounded-full w-full h-full relative">
            <Image
              src="/assets/thrihash.jpg"
              alt="Thrihash"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="font-[family-name:var(--font-geist)] text-[27px] text-black tracking-[-0.53px] whitespace-nowrap">
          Revelling<span className="inline-block w-[45px] text-left">{dots}</span>
        </p>
      </div>
    </div>
  );
}
