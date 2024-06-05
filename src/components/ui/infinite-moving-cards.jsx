"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "10s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative  z-20  max-w-7xl overflow-hidden  ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex  min-w-full shrink-0 gap-4  w-max flex-nowrap  ",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[250px]   text-center flex justify-center  max-w-full relative rounded-2xl border  flex-shrink-0 border-primary px-8 py-6 "
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.name}
          >
            <Link href={`/category/${item.id}`}>
              <div
                aria-hidden="true"
                className="user-select-none   -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Category_images/${item.image}`}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="object-cover h-24 sm:h-24  w-24 sm:w-24 lg:h-32 lg:w-32  rounded-full"
                />
              </span>
              <div className="relative z-20 mt-6  ">
                <span className="flex flex-col justify-center items-center gap-1">
                  <span className=" text-lg  leading-[1.6] text-primary font-semibold">
                    {item.name}
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
