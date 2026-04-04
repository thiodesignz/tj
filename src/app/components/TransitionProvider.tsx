"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type TransitionContextType = {
  navigateTo: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

// enter = slide in from left, hold = fully covering, exit = slide out to right
type Phase = "idle" | "enter" | "hold" | "exit";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const targetRef = useRef<string | null>(null);
  const prevPathRef = useRef(pathname);

  const navigateTo = useCallback(
    (href: string) => {
      if (href === pathname || phase !== "idle") return;
      targetRef.current = href;
      setPhase("enter");
    },
    [pathname, phase]
  );

  // enter → after animation, navigate and go to hold
  useEffect(() => {
    if (phase === "enter") {
      const timer = setTimeout(() => {
        if (targetRef.current) {
          router.push(targetRef.current);
        }
        setPhase("hold");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [phase, router]);

  // When pathname changes while in hold, start exit
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      if (phase === "hold") {
        const timer = setTimeout(() => {
          setPhase("exit");
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, phase]);

  // exit → after animation, back to idle
  useEffect(() => {
    if (phase === "exit") {
      const timer = setTimeout(() => {
        setPhase("idle");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const getTransform = () => {
    switch (phase) {
      case "enter":
        return "translateX(0%) skewX(-15deg)";
      case "hold":
        return "translateX(0%) skewX(-15deg)";
      case "exit":
        return "translateX(120%) skewX(-15deg)";
      default:
        return "translateX(-120%) skewX(-15deg)";
    }
  };

  const showOverlay = phase !== "idle";

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      {/* Blue overlay — angled slab left-to-right */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        style={{ visibility: showOverlay ? "visible" : "hidden" }}
      >
        <div
          className="absolute bg-primary"
          style={{
            top: "-10%",
            left: "-15%",
            height: "120%",
            width: "130%",
            transform: getTransform(),
            transition:
              phase === "idle"
                ? "none"
                : "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />
      </div>
    </TransitionContext.Provider>
  );
}
