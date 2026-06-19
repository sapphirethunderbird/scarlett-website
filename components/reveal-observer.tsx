"use client";

import { useEffect } from "react";

/**
 * Mirrors the original site's scroll-reveal: any element with class `reveal`
 * gets `in` added when it scrolls into view. Mounted once near the page root so
 * server components can stay server components and just use className="reveal".
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
