import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const CheckOrder = () => {
  return (
    <div className="mt-12">
      <div className="flex gap-x-5 justify-center">
        <div className="relative">
          <div className="absolute right-2 font-semibold  -top-7 h-7 w-7 rounded-full bg-[#214A25] flex justify-center items-center text-secondary">
            1
          </div>
          <Image
            src="/SVGs/Order/table1.png"
            alt="table 1"
            width={200}
            height={300}
            className="rounded-lg h-32 w-32"
          />
        </div>
        <div className="relative">
          <div className="absolute right-2 font-semibold  -top-7 h-7 w-7 rounded-full bg-[#214A25] flex justify-center items-center text-secondary">
            2
          </div>

          <Image
            src="/SVGs/Order/table2.png"
            alt="table 3"
            width={200}
            height={300}
            className="rounded-lg object-contain h-32 w-32"
          />
        </div>
        <div className="relative">
          <div className="absolute right-2 font-semibold  -top-7 h-7 w-7 rounded-full bg-[#214A25] flex justify-center items-center text-secondary">
            3
          </div>

          <Image
            src="/SVGs/Order/table3.png"
            alt="table 3"
            width={200}
            height={300}
            className="rounded-lg h-32 w-32"
          />
        </div>
      </div>

      <div className="flex justify-center gap-x-32 pt-24 pb-12">
        <div className="text-start text-gray-700 font-semibold">
          <h3 className="">Order Code:</h3>
          <h3 className="">Date:</h3>
          <h3 className="">Total:</h3>
          <h3 className="">Payment Method:</h3>
        </div>

        <div className="text-start font-semibold text-[#214A25]">
          <h4 className="">#0123 314</h4>
          <h4 className="">Octobar 19,2024</h4>
          <h4 className="">PKR 1,345.00</h4>
          <h4 className="">Credit Card</h4>
        </div>
      </div>
      <Button className="rounded-full bg-[#214A25]">Purchase History</Button>
    </div>
  );
};

export default CheckOrder;
