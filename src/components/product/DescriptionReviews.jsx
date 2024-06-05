"use client";
import React, { useState } from "react";
import StoreInfo from "./StoreInfo";
import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";

const DescriptionReviews = ({ product, storeInfo }) => {
  const [activeLink, setActiveLink] = useState("Description");

  return (
    <MaxWidthWrapper className="">
      <div className="flex flex-col lg:gap-x-32  lg:flex-row lg:justify-center lg:items-center ">
        <div className="lg:flex-1">
          <div className="flex justify-between mx-3 lg:mx-0 py-3 font-semibold text-gray-600">
            <h3
              className={`hover:underline hover:cursor-pointer hover:text-primary underline-offset-4 ${
                activeLink === "Description" ? "text-primary" : ""
              }`}
              onClick={() => setActiveLink("Description")}
            >
              Description
            </h3>
            {/* <h3
              className={`hover:underline hover:cursor-pointer hover:text-primary underline-offset-4 ${
                activeLink === "Size & Fit" ? "text-primary" : ""
              }`}
              onClick={() => setActiveLink("Size & Fit")}
            >
              Size & Fit
            </h3> */}
            {/* <h3
              className={`hover:underline hover:cursor-pointer hover:text-primary underline-offset-4 ${
                activeLink === "Shipping & Return" ? "text-primary" : ""
              }`}
              onClick={() => setActiveLink("Shipping & Return")}
            >
              Shipping & Return
            </h3> */}
          </div>
          {/* Conditionally render content */}
          {activeLink === "Description" && (
            <>
              {" "}
              <p className="mx-3 lg:mx-0 text-sm text-gray-600">
                {product.description}
              </p>
              <div className="mx-3 py-3"></div>
            </>
          )}

          {/* {activeLink === "Size & Fit" && (
            <>
              <div className="mx-3 text-sm text-gray-600">
                This shirt is a garment for the upper body...
              </div>
              <div className="mx-3 py-3">
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
              </div>
            </>
          )} */}

          {/* {activeLink === "Shipping & Return" && (
            <>
              <div className="mx-3 text-sm text-gray-600">
                This shirt is a garment for the upper body, usually made of
                lightweight cloth like cotton, and has a collar, sleeves, and a
                front opening. Shirts can be long- or short -sleeved, and can
                have buttons or snaps down the front. In American English, the
                term shirt can refer to a wide variety of upper-body garments
                and undergarments, hile in British English, it&quot;s more
                specifically a garment with a collar, sleeves with cuffs, and a
                full vertical opening.
              </div>
              <div className="mx-3 py-3">
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt="check icon"
                    width={40}
                    height={40}
                    className="object-contain h-3 w-7"
                  />
                  <h5 className="">pima cotton</h5>
                </div>
              </div>
            </>
          )} */}
        </div>

        <div className="lg:flex-1">
          <StoreInfo product={product} storeInfo={storeInfo} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default DescriptionReviews;
