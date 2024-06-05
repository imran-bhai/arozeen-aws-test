"use client"
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";





const ShopBanner = () => {

  
  return (
 
      <div className="relative  flex flex-row bg-[#F3F5F7] ">
        <div className=" basis-4/7 flex flex-col ">
          <Image
            src="/shop/banner.png"
            alt="shop banner"
            width={1500}
            height={1500}
            className="object-fit h-full w-full"
          />
         
        </div>

        <div className="basis-3/7 flex flex-col items-center justify-center">
          <div className="py-6">
            <h3 className="text-primary">Women Collection</h3>
            <h3 className="text-[#121212] font-semibold text-2xl py-1">
              Peaky Blinders
            </h3>
            <p className="text-primary pb-1">DESCRIPTION</p>
            <h3 className="text-gray-700 w-96">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
              duis ultrices sollicitudin. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Scelerisque duis.
            </h3>
            <div className="flex gap-x-2 py-2">
              {/* <h3 className="">Size: </h3>
              <span className="h-6  px-6 rounded-lg bg-[#214A25] text-secondary">
                M
              </span> */}
            </div>
            <p className="text-primary font-semibold py-3">PKR 1000.00</p>
            {/* <Button className="h-8 px-7">Buy Now</Button> */}
          </div>
        </div>
      </div>
  
  );
};

export default ShopBanner;
