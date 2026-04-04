"use client";

import { useCallback, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function PageReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [revealContent, setRevealContent] = useState(false);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
    setRevealContent(true);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <div
        className={`transition-opacity duration-700 ${
          revealContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
