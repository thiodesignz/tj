"use client";

import DOMPurify from "isomorphic-dompurify";

export default function BlogContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "img", "ul", "ol", "li",
      "blockquote", "pre", "code", "em", "strong", "br", "hr", "figure",
      "figcaption", "div", "span", "table", "thead", "tbody", "tr", "th", "td",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel"],
  });

  return (
    <div
      className="font-[family-name:var(--font-geist)] text-[17px] theme-text tracking-[-0.34px] leading-[28px] w-full [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:mt-[40px] [&_h2]:mb-[16px] [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:mt-[32px] [&_h3]:mb-[12px] [&_p]:mb-[16px] [&_a]:text-primary [&_a]:underline [&_img]:rounded-[12px] [&_img]:my-[24px] [&_img]:w-full [&_blockquote]:border-l-[3px] [&_blockquote]:border-primary [&_blockquote]:pl-[20px] [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-[24px] [&_ul]:mb-[16px] [&_ol]:list-decimal [&_ol]:pl-[24px] [&_ol]:mb-[16px] [&_li]:mb-[8px] [&_code]:theme-bg-card [&_code]:px-[6px] [&_code]:py-[2px] [&_code]:rounded-[4px] [&_code]:text-[15px] [&_pre]:theme-bg-card [&_pre]:p-[20px] [&_pre]:rounded-[12px] [&_pre]:overflow-x-auto [&_pre]:mb-[16px]"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
