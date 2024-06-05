import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import November from "../../../public/home/shopCollection/November.png";
import Ceshmere from "../../../public/home/shopCollection/Ceshmere.png";
import Nordic from "../../../public/home/shopCollection/Nordic.png";
import Leather from "../../../public/home/shopCollection/Leather.png";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collection = [
  {
    src: November,
    alt: "November",
    name: "November Outfits",
  },
  {
    src: Ceshmere,
    alt: "Ceshmere",
    name: "Ceshmere Set",
  },

  {
    src: Leather,
    alt: "Leather",
    name: "The Leather",
  },
  {
    src: Nordic,
    alt: "Nordic",
    name: "The New Nordic",
  },
  {
    src: Nordic,
    alt: "Nordic",
    name: "The New Nordic",
  },
  {
    src: November,
    alt: "November",
    name: "November Outfits",
  },
  {
    src: Leather,
    alt: "Leather",
    name: "The Leather",
  },
  {
    src: Ceshmere,
    alt: "Ceshmere",
    name: "Ceshmere Set",
  },
];

const ShopCollection = () => {
  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center md:items-center lg:items-start">
      <h3 className="text-primary font-semibold text-2xl sm:text-3xl pt-12 sm:pt-0">
        Shop Collection
      </h3>
      <div className="my-7 min-h-screen font-grotesk grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
        {collection.map((item, index) => (
          <div key={index} className="relative">
            <Image
              src={item.src}
              alt={item.alt}
              width={200}
              height={200}
              className=" object-cover w-72 "
            />
            <h3 className="absolute text-secondary left-5 bottom-10 z-10">
              {item.name}
            </h3>
            <div className="absolute flex items-center left-5 bottom-5">
              <h4 className=" text-sm text-secondary font-normal underline underline-secondary ">
                Collection &rarr;
              </h4>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default ShopCollection;
