"use client";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import CloseCart from "./CartClose";
import OpenCart from "./OpenCart";
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import DeleteItemButton from "./DeleteItemButton";
import { getToken } from "@/app/config/actions";
import _ from "lodash";
import Price from "../price";

function groupCartItems(cartItems) {
  const groupedItems = {};

  cartItems.forEach((item) => {
    const key = `${item.product_id}-${JSON.stringify(item.attributes)}`;

    if (!groupedItems[key]) {
      groupedItems[key] = { ...item, quantity: 0 };
    }

    //if id is different and attribute is also different then make a new row. if id same but attribute is different then make a new arrow of that item. if product_id and attributes are same then update that row.
    if (
      groupedItems[key].id !== item.id &&
      JSON.stringify(groupedItems[key].attributes) !==
        JSON.stringify(item.attributes)
    ) {
      groupedItems[key] = { ...item, quantity: 0 };
    } else if (
      groupedItems[key].id === item.id &&
      JSON.stringify(groupedItems[key].attributes) !==
        JSON.stringify(item.attributes)
    ) {
      groupedItems[key] = { ...item, quantity: 0 };
    } else if (
      groupedItems[key].id === item.id &&
      JSON.stringify(groupedItems[key].attributes) ===
        JSON.stringify(item.attributes)
    ) {
      groupedItems[key] = {
        ...groupedItems[key],
        quantity: groupedItems[key].quantity + item.quantity,
      };
    }
  });

  return Object.values(groupedItems);
}

export default function CartModal({
  cart,
  newCartItems,
  setNewCartItems,
  fullResponse,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (cart) {
      setCartItems(groupCartItems(cart));
    }
  }, [cart]);

  useEffect(() => {
    (async () => {
      const retrievedToken = await getToken();
      setToken(retrievedToken);
    })();
  }, []);

  const totalAmount = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const totalQuantity = _.sumBy(cartItems, "quantity");

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={totalQuantity} />
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-600 bg-white/60 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[590px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cartItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                      >
                        <div className="relative flex w-full flex-row justify-between px-1 py-4">
                          <div className="absolute z-40 -mt-2 ml-[55px]">
                            <DeleteItemButton
                              item={item}
                              token={token}
                              newCartItems={newCartItems}
                              setNewCartItems={setNewCartItems}
                            />
                          </div>
                          <Link
                            href={""}
                            onClick={closeCart}
                            className="z-30 flex flex-row space-x-4"
                          >
                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                              <Image
                                className="h-full w-full object-contain"
                                width={64}
                                height={64}
                                alt={item.product.name}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${item.product.first_image}`}
                              />
                            </div>

                            <div className="flex flex-1 flex-col text-base">
                              <span className="leading-tight">
                                {item.product.name}
                              </span>
                              {item.attributes &&
                                item.attributes.length > 0 && (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.attributes
                                      .map(
                                        (attr) => `${attr.name}: ${attr.value}`
                                      )
                                      .join(", ")}
                                  </p>
                                )}
                            </div>
                          </Link>
                          <div className="flex h-16 flex-col justify-between">
                            <Price
                              className="flex justify-end space-y-2 text-right text-sm"
                              amount={`${item.price}`}
                              currencyCode={"PKR"}
                            />
                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                              <EditItemQuantityButton
                                item={item}
                                quantity={item.quantity}
                                token={token}
                                type="minus"
                                newCartItems={newCartItems}
                                setNewCartItems={setNewCartItems}
                              />
                              <p className="w-6 text-center">
                                <span className="w-full text-sm">
                                  {item.quantity}
                                </span>
                              </p>
                              <EditItemQuantityButton
                                item={item}
                                quantity={item.quantity}
                                token={token}
                                type="plus"
                                newCartItems={newCartItems}
                                setNewCartItems={setNewCartItems}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount="0.00"
                        currencyCode={"PKR"}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={fullResponse.total_price}
                        currencyCode={"PKR"}
                      />
                    </div>
                  </div>
                  <Link
                    onClick={closeCart}
                    href="/checkout"
                    className="block w-full rounded-full bg-orange-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
