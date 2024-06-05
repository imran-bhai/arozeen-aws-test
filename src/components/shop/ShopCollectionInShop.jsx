import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const ShopCollectionInShop = () => {
  return (
    <MaxWidthWrapper className=" flex flex-col  justify-center items-center md:items-start ">
      <h3 className="text-primary font-semibold text-2xl sm:text-3xl pt-12 sm:pt-0 md:py-12">
        Shop Collection
      </h3>
      <div className=" py-7 font-grotesk flex flex-col md:flex-row  space-y-3 md:space-y-0 md:space-x-3 xl:min-w-full">
        <div className="relative flex md:flex-1 ">
          <div className="absolute ">
            <h3 className="text-primary font-semibold text-xl py-2 px-5">
              Leaving Room
            </h3>

            <h4 className=" text-sm text-[#214A25] font-normal underline underline-[#214A25] px-5">
              Read More&rarr;
            </h4>
          </div>
          <Image
            src="/shop/ShopCollection/img1.png"
            alt="Image One"
            width={200}
            height={200}
            className="w-full h-60 md:h-full lg:h-96  xl:min-h-full object-fit"
          />
        </div>
        <div className="flex flex-col md:flex-1 space-y-3 ">
          <div className="">
            <div className="relative ">
              <div className="absolute">
                <h3 className="text-primary font-semibold text-xl py-2 px-5">
                  Bedroom
                </h3>

                <h4 className=" text-sm text-[#214A25] font-normal underline underline-[#214A25] px-5">
                  Read More&rarr;
                </h4>
              </div>
              <Image
                src="/shop/ShopCollection/img2.png"
                alt="Image Second"
                width={200}
                height={200}
                className="w-full h-60 lg:w-[600px]  object-fit "
              />
            </div>
          </div>
          <div className="relative ">
            <div className="absolute">
              <h3 className="text-primary font-semibold text-xl py-2 px-5">
                Kitchen
              </h3>

              <h4 className=" text-sm text-[#214A25] font-normal underline underline-[#214A25]  px-5">
                Read More&rarr;
              </h4>
            </div>
            <Image
              src="/shop/ShopCollection/img3.png"
              alt="Image Third"
              width={200}
              height={200}
              className="w-full h-60 object-fit"
            />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ShopCollectionInShop;
