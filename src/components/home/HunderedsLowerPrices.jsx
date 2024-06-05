import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import img from "../../../public/home/hundered.png";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";

const HunderedsLowerPrices = () => {
  return (
    <MaxWidthWrapper>
      <div className="w-full h-96 font-grotesk flex flex-col sm:flex-row">
        <div className="flex-1">
          <Image
            src={img}
            alt="Hundered Image"
            width={500}
            height={500}
            className="object-fill w-full h-full"
          />
        </div>
        <div
          className="flex-1 flex flex-col justify-center items-center sm:items-start pl-[10%] bg-[#0F2311]
"
        >
          <p className="text-primary font-semibold pt-1 sm:pt-0 ">
            SALE UP TO 35% OFF
          </p>
          <h6 className="py-0 sm:py-1 text-secondary font-semibold text-xl sm:text-3xl w-64">
            HUNDEREDS of New Lower Prices!
          </h6>
          <h3 className="text-secondary py-1  sm:mb-3 w-[264px]">
            Multiple products are waiting for you come and buy
          </h3>
          <Link href="/products">
            <Button className="w-32 h-10 my-3">Shop Now</Button>
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HunderedsLowerPrices;
