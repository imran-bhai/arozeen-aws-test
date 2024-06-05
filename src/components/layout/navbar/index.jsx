"use client";
import Cart from "@/components/cart";
import OpenCart from "@/components/cart/OpenCart";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./MobileMenu";
import Search, { SearchSkeleton } from "@/components/layout/navbar/search";
import { ProfileDropDown } from "./ProfileDropDown";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OpenWishList from "@/components/wishlist/OpenWishList";
import Wish from "@/components/wishlist";
import NavLinks from "./NavLinks";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative  mt-2 mb-1 lg:px-6 font-grotesk ">
      <MaxWidthWrapper className="flex justify-between">
        <div className="block flex-none md:hidden">
          <MobileMenu />
        </div>

        <div className="w-full  flex justify-between items-center">
          <Link
            href="/"
            className=" mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            {/* <h1 className="text-primary text-2xl font-semibold">Arozeen</h1> */}
            <Image
              src="/nav-logo.png"
              alt="logo"
              width={100}
              height={250}
              className="object-contain"
            />
          </Link>
          <div className="sm:hidden">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <p className="font-urdu md:text-xs lg:text-[1rem] text-neutral-600">
              کاروبار جاتا ہے تو جائے، جھوٹ نہیں بولے گے
            </p>
          </div>

          <div className="hidden justify-center md:flex ">
            {/* <ul className="hidden gap-5 text-sm md:flex md:items-center md:mr-4">
            <Link
              href="/"
              className={`text-neutral-600 text-[1rem] font-semibold underline-offset-4 hover:text-orange-600  hover:underline dark:text-neutral-400 dark:hover:text-neutral ${
                pathname === "/" ? "underline text-orange-600" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-neutral-600 text-[1rem] font-semibold underline-offset-4 hover:text-orange-600  hover:underline dark:text-neutral-400 dark:hover:text-neutral ${
                pathname === "/products" ? "underline text-orange-600" : ""
              }`}
            >
              Products
            </Link>

            <Link
              href="/contact-us"
              className={`text-neutral-600 text-[1rem] font-semibold underline-offset-4 hover:text-orange-600  hover:underline dark:text-neutral-400 dark:hover:text-neutral ${
                pathname === "/contact-us" ? "underline text-orange-600" : ""
              }`}
            >
              Contact Us
            </Link>
          </ul> */}
            <NavLinks />
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>

            <div className="flex gap-x-2">
              <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense>
              <Suspense fallback={<OpenWishList />}>
                <div className="">
                  <Wish />
                </div>
              </Suspense>
            </div>
            <div className="hidden sm:block">
              <Suspense>
                <ProfileDropDown />
              </Suspense>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
