"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import Countdown from "react-countdown";
import Link from "next/link";

const Promotions = () => {
  // Use useMemo to memoize the endDate
  const endDate = useMemo(() => new Date("2024-09-15 12:00:00"), []);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        clearInterval(intervalId);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000); // Update every second
    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <div className="w-full-screen mb-48 sm:mb-12 h-96 font-grotesk flex flex-col sm:flex-row ">
      <div className="flex-1">
        <Image
          src="/shop/Promotion/promotion-image.png"
          alt="Hundered Image"
          width={500}
          height={500}
          className="object-fill w-full h-full"
        />
      </div>
      <div
        className="flex-1 flex flex-col justify-center pl-[10%] bg-[#0F2311]
"
      >
        <p className="text-primary font-semibold pt-1 sm:pt-0">PROMOTION</p>
        <h6 className="py-0 sm:py-1 text-secondary font-semibold text-xl sm:text-3xl ">
          Hurry up! 40% OFF
        </h6>
        <h3 className="text-secondary py-1  sm:mb-3 w-[264px]">
          Thousands of high tech are waiting for you.
        </h3>
        <div className="flex gap-x-3">
          <div className="text-secondary py-1 text-center">
            <div
              id="days"
              className="h-12 w-12 md:h-16 lg:w-24 md:w-16 lg:h-24 bg-secondary text-black flex items-center justify-center text-xl md:text-3xl font-semibold"
            >
              {remainingTime.days}
            </div>
            Days
          </div>
          <div className="text-secondary py-1 text-center">
            <div
              id="hours"
              className="h-12 w-12 md:h-16 lg:w-24 md:w-16 lg:h-24 bg-secondary text-black flex items-center justify-center text-xl md:text-3xl font-semibold"
            >
              {remainingTime.hours}
            </div>
            Hours
          </div>
          <div className="text-secondary py-1 text-center">
            <div
              id="minutes"
              className="h-12 w-12 md:h-16 lg:w-24 md:w-16 lg:h-24 bg-secondary text-black flex items-center justify-center text-xl md:text-3xl font-semibold"
            >
              {remainingTime.minutes}
            </div>
            Minutes
          </div>
          <div className="text-secondary py-1 text-center">
            <div
              id="seconds"
              className="h-12 w-12 md:h-16 lg:w-24 md:w-16 lg:h-24 bg-secondary text-black flex items-center justify-center text-xl md:text-3xl font-semibold"
            >
              {remainingTime.seconds}
            </div>
            Seconds
          </div>
        </div>
        <Link href="/shop">
          <Button className="w-32 h-10 my-3">Shop Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Promotions;
