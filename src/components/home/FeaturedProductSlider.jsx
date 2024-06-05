import React, { Suspense } from "react";
import axios from "axios";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { CarouselFeatured } from "./CarouselFeatured";


const FeaturedProductSlider = () => {
  return (
    <div className="py-1 sm:py-12 ">
      <MaxWidthWrapper className="flex flex-col justify-center items-center sm:items-start md:items-center lg:items-start">
        <h3 className="text-primary font-semibold text-xl sm:text-3xl py-1 md:pb-8 ">
          Featured
        </h3>
        <Suspense>
         <CarouselFeatured />
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
};

export default FeaturedProductSlider;
