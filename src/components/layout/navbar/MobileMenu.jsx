"use client";

import { Dialog, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Search from "@/components/layout/navbar/search";
import NavLinks from "./NavLinks";

export default function MobileMenu({ menu }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  const [policyNav, setPolicyNav] = useState("");
  const router = useRouter();
  const handlePolicyNav = (e) => {
    router.push(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="">
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div className="p-4 ">
                <div className="flex justify-between">
                  <button
                    className="mb-4 flex items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-9 w-9" />
                  </button>
                  <div className="">
                    <Suspense>
                      <Search />
                    </Suspense>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-y-3 ">
                  <NavLinks />
                </div>
                {/* <ul className="">
                  <Link
                    href="/"
                    className="text-neutral-500 font-semibold underline-offset-4 hover:text-orange-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    Home
                  </Link>

                  <Link
                    href="/products"
                    className="text-neutral-500 font-semibold underline-offset-4 hover:text-orange-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    Products
                  </Link>
                  <Link
                    href="/orders"
                    className="text-neutral-500 font-semibold underline-offset-4 hover:text-orange-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-neutral-500 font-semibold underline-offset-4 hover:text-orange-600 hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    Contact Us
                  </Link>
                </ul> */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
