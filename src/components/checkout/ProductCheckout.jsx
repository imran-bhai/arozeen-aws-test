"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getToken } from "@/app/config/actions";

import axios from "axios";

import { useSelector } from "react-redux";

const ProductCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullResponse, setFullResponse] = useState();

  const cartProducts = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const token = (await getToken());
        if (!token) {
          throw new Error("Token not found");
        } else {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}show-cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCartItems(response.data.data.cart_items); // Assuming the response contains cart items
          setFullResponse(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false); // Ensure loading state is updated even if there's an error
      }
    };

    fetchCartItems();
  }, [cartProducts]);

  // const totalAmount = cartItems?.reduce(
  //   (accumulator, current) => accumulator + current.quantity * current.price,
  //   0
  // );

  const totalQuantity = cartItems?.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0
  );

  return (
    <div className="flex h-auto flex-col justify-between overflow-hidden p-1">
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <ul className="flex-grow overflow-auto py-4">
            {cartItems.length &&
              cartItems.map((item, i) => {
                return (
                  <li
                    key={i}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className=" flex flex-row space-x-4">
                        <div className="relative h-16 w-16  overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          <Image
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            alt={item.product.name}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${item.product.first_image}`}
                          />
                        </div>

                        <div className="flex flex-1 flex-col text-base">
                          {/* <span className="leading-tight">{item.product.description}</span> */}
                          {item.product.name ? (
                            <p className="text-sm text-neutral-500 font-semibold dark:text-neutral-400">
                              {item.product.name}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex h-16 flex-col justify-between">
                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <p className="w-6 text-center">
                            <span className="w-full text-sm">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
            {/* <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p>Taxes</p>
            </div> */}
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
              <p>Shipping</p>
              <p className="text-right">Calculated at checkout</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
              <p>Total</p>
              <p className="text-right">Rs: {fullResponse?.total_price}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCheckout;
