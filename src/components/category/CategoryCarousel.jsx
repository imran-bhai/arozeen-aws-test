"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import MaxWidthWrapper from "../MaxWidthWrapper";

export function CategoryCarousel({ categories }) {
  const carouselProducts = [...categories, ...categories, ...categories];

  return (
    <MaxWidthWrapper>
    <div className="h-[22rem] overflow-hidden  rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative">
      <InfiniteMovingCards
        items={carouselProducts}
        direction="right"
        speed="slow"
      />
    </div>
     </MaxWidthWrapper>
  );
}
