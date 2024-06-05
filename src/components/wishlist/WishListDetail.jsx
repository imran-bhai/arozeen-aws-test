"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseCart from "../cart/CartClose";
import OpenWishList from "./OpenWishList";
import WishListIcon from "../iconSVG/WishListIcon";
import DeleteItemButton from "../cart/DeleteItemButton";
import Price from "../price";
import Image from "next/image";
import { AddToCart } from "../cart/AddToCart";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateWishlist } from "@/app/store/slice/cartSlice";
import Link from "next/link";

const WishListDetail = ({ wishlistItems, isToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const dispatch = useDispatch();

  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${id}`,
        {
          headers: { Authorization: `Bearer ${isToken}` },
        }
      );
      dispatch(updateWishlist({ product_id: id, quantity: 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenWishList wishlistItems={wishlistItems} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
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
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[590px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-primary">
                  My Wish List
                </p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!wishlistItems || wishlistItems.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <WishListIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {wishlistItems.data?.length ? (
                      wishlistItems.data?.map((item, i) => {
                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div
                                className="absolute z-40 -mt-2 "
                                onClick={() =>
                                  handleRemoveItem(item.product.id)
                                }
                              >
                                <DeleteItemButton item={item} token={isToken} />
                              </div>

                              <div className="flex justify-between items-center w-full">
                                <div className="flex flex-row items-center space-x-4">
                                  <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                    <Image
                                      className="h-full w-full object-cover"
                                      width={64}
                                      height={64}
                                      alt={item.product.name}
                                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${item.product.product_images[0].image}`}
                                    />
                                  </div>

                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight font-semibold ">
                                      {item.product.name}
                                    </span>

                                    <div className="">
                                      <Price
                                        className="flex  justify-start mt-3 text-right text-sm font-semibold"
                                        amount={`${item.product.price}`}
                                        currencyCode={"PKR"}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <Link
                                  onClick={closeCart}
                                  href={`/products/${item.product_id}`}
                                >
                                  <div className="hover:opacity-90 hover:cursor-pointer hover:bg-orange-500 hover:text-white my-2 relative flex text-secondary w-32 items-center justify-center rounded-lg bg-orange-600 p-3 tracking-wide">
                                    View Product
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <div className="">
                        <p className="mt-6 text-center text-2xl font-bold">
                          Your wishlist is empty.
                        </p>
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default WishListDetail;
