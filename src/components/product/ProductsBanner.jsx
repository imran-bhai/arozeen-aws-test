import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const ProductsBanner = () => {
  return (
    <MaxWidthWrapper>
      <div className="relative flex justify-center items-center">
        <Image
          src="/shop/product-banner.png"
          alt="shop banner"
          width={800}
          height={800}
          className=" h-80 w-full object-fill"
        />
        <div className="absolute top-[30%] left-[10%] md:left-[28%] lg:top-[33%] lg:left-[38%] flex flex-col justify-center items-center">
          {/* <h4 className="text-gray-500">
            Home &gt; <span className="text-black">Shop</span>
          </h4> */}
          <h3 className="text-primary font-semibold text-2xl md:text-3xl lg:text-4xl">
            Shop Now
          </h3>
          <h5 className="py-2">
            Let&apos;s design the place you always imagined.
          </h5>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsBanner;
