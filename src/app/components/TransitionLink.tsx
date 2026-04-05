"use client";

import { useTransition } from "./TransitionProvider";

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { navigateTo } = useTransition();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.();
        // Only intercept internal links, not anchors
        if (href.startsWith("/")) {
          e.preventDefault();
          navigateTo(href);
        }
      }}
    >
      {children}
    </a>
  );
}
