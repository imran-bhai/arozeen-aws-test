"use client";

import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Explore",
    },
    {
      text: "our",
    },
    {
      text: "Modern",
    },
    {
      text: "Product",
    },
    {
      text: "Collection.",
      className: "text-primary dark:text-primary font-grotesk",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[12rem] ">
      <TypewriterEffect words={words} />
    </div>
  );
}
