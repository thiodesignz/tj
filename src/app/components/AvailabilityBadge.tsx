"use client";

import { useEffect, useRef, useState } from "react";

const items = ["New projects", "Consulting"];

export default function AvailabilityBadge() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = (index + 1) % items.length;

  // Measure width of current text
  useEffect(() => {
    if (currentRef.current) {
      setWidth(currentRef.current.scrollWidth);
    }
  }, [index]);

  useEffect(() => {
    let cancelled = false;

    function scheduleNext() {
      // Hold current word for 2500ms, then start slide
      timeoutRef.current = setTimeout(() => {
        if (cancelled) return;
        if (nextRef.current) {
          setWidth(nextRef.current.scrollWidth);
        }
        setAnimate(true);

        // After slide finishes (450ms), swap index and schedule again
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          setIndex((prev) => (prev + 1) % items.length);
          setAnimate(false);
          scheduleNext();
        }, 450);
      }, 2500);
    }

    scheduleNext();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-white border border-[#eaecee] flex gap-[8px] h-[45px] items-center overflow-hidden pl-[12px] pr-[20px] py-[12px] rounded-[32px] w-fit">
      <div className="bg-[#20d200] rounded-full w-[16px] h-[16px] shrink-0 animate-[pulse_2s_ease-in-out_infinite]" />
      <span className="font-[family-name:var(--font-geist)] text-[16px] text-black tracking-[-0.32px] whitespace-nowrap flex items-center">
        Available for
        <span
          className="inline-block h-[24px] overflow-hidden relative ml-[5px] transition-[width] duration-300 ease-in-out"
          style={{ width: width ? `${width}px` : "auto" }}
        >
          <span
            ref={currentRef}
            className="absolute left-0 top-0 h-[24px] flex items-center font-medium whitespace-nowrap transition-transform duration-450 ease-in-out"
            style={{
              transform: animate ? "translateY(-100%)" : "translateY(0)",
            }}
          >
            {items[index]}
          </span>
          <span
            ref={nextRef}
            className="absolute left-0 top-0 h-[24px] flex items-center font-medium whitespace-nowrap transition-transform duration-450 ease-in-out"
            style={{
              transform: animate ? "translateY(0)" : "translateY(100%)",
            }}
          >
            {items[next]}
          </span>
        </span>
      </span>
    </div>
  );
}
