import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="min-w-full max-md:hidden h-12  text-sm bg-primary flex justify-center items-center">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center  ">
          <div className="">
            <h3 className="text-secondary">Call us: +92 325 6969288</h3>
          </div>
          <div className="text-secondary flex">
          Sign up and GET  OFF for your first order. <Link href="/register"><span className="text-green-900 underline ml-1 cursor-pointer"> Sign up now</span></Link>
          </div>
          <div className="flex flex-row gap-x-2">
            <Image
              src="/SVGs/TopBar/facebook.svg"
              alt="facebook icon"
              width={20}
              height={20}
            />
            <Image
              src="/SVGs/TopBar/instagram.svg"
              alt="instagram icon"
              width={20}
              height={20}
            />
            <Image
              src="/SVGs/TopBar/pinterest.svg"
              alt="pinterest icon"
              width={20}
              height={20}
            />
            <Image
              src="/SVGs/TopBar/whatsapp.svg"
              alt="whatsapp icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TopBar;
