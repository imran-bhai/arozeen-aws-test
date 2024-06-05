"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import OrderConformationPopup from "@/components/orders/OrderConformationPopup";
import axios from "axios";
import { getToken } from "@/app/config/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ShippingCart = ({ order, id }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) {
        setToken(token);
      }
    };
    fetchToken();
  }, []);

  const handleConfirm = async () => {
    setShowPopup(false);
    if (token) {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}cancel-order/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.code == 200) {
          toast.success("Order cancelled successfully");
          router.push("/orders");
        }
      } catch (error) {
        console.error("Error cancelling order", error);
      }
    } else {
      console.error("Token not available");
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const formateDate = (dateString) => {
    // Check if the dateString is valid
    const utcDateTime = new Date(dateString);
    if (isNaN(utcDateTime)) {
      return "Invalid Date";
    }

    // Get the formatted date in "Month Day, Year" format
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(utcDateTime);

    return formattedDate;
  };

  return (
    <>
      <div className="py-5">
        <div className="flex justify-between items-center">
          <div className="flex  md:space-x-6 pb-4 ">
            <p className="">
              Order ID:{" "}
              <span className=" text-primary">{order.data?.order_id}</span>
            </p>
            <h4 className="text-[#6ea177]">
              Placed On: {formateDate(order.data?.created_at)}
            </h4>
          </div>
        </div>

        <div className="flex justify-center items-center bg-[#F3F5F7] ">
          <div className="basis-6/7">
            {order.data?.order_items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#F3F5F7]  p-4 md:py-0 flex flex-col md:flex-row md:items-center  md:space-x-6 "
                >
                  <div className="flex flex-row items-center space-x-4 ">
                    <Image
                      alt={item.product.name}
                      className="w-16 h-20 border border-primary"
                      height="100"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${item.product.first_image}`}
                      style={{
                        aspectRatio: "80/100",
                        objectFit: "cover",
                      }}
                      width="80"
                    />
                    <div className="w-96">
                      <h3 className="text-lg font-semibold text-start">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 text-start">
                        {/* {order.product.category.name} */}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between  md:gap-x-28 pb-4">
                    <div className="text-[#214A25] text-primary">
                      <span className="font-semibold text-gray-900">Rs:</span>{" "}
                     <div className="">{item.product.price}</div> 
                    </div>
                    <div className="">
                      <p className="text-primary">
                        <span className="font-semibold text-gray-900">
                          Quantity:
                        </span>{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-primary">
                        <span className="font-semibold text-gray-900">
                          {item.attributes[0]?.name}
                        </span>{" "}
                        {item.attributes[0]?.value}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-primary">
                        <span className="font-semibold text-gray-900">
                          {item.attributes[1]?.name}
                        </span>{" "}
                        {item.attributes[1]?.value}
                      </p>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>

          <div className=" basis-1/7 ">
            <Button
              onClick={() => setShowPopup(true)}
              className="w-32 bg-[#FFE6E6] text-red-700 hover:bg-[#FFD6E6] rounded-none"
            >
              Cancel
            </Button>

            {showPopup && (
              <OrderConformationPopup
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-8 ">
        <div className="basis-1/3 text-start">
          <h3 className="text-lg font-semibold">Delivery</h3>
          <h4 className="text-md text-gray-700">Address</h4>
          <p className="text-sm text-gray-500">
            #123, ABC Street, New York, NY 10001
          </p>
          <p className="text-sm text-gray-500">+92 325 6969288</p>
        </div>
        <div className="basis-1/3 text-start">
          <div className="">
            <h3 className="font-semibold">Payment</h3>
            <h5 className="">Cash on Delivery</h5>
          </div>
          <div className="">
            <h3 className="text-black">Need Help</h3>
            <h4 className="">Order issue</h4>
            <h4 className="">Delivery Info</h4>
            <h4 className="">Returns</h4>
          </div>
        </div>
        <div className="basis-1/3 text-start">
          <h3 className="text-lg font-semibold">Order Summary</h3>

          <div className="">
            <div className="flex justify-between">
              <h4 className="text-md text-gray-700 font-semibold">Subtotal</h4>
              <h5 className="">PKR {order.data?.total_price}</h5>
            </div>

            <div className="flex justify-between">
              <h4 className="text-md text-gray-700">Discount</h4>
              <h5 className="">{`(20%)PKR 120.00`}</h5>
            </div>
            <div className="flex justify-between">
              <h4 className="text-md text-gray-700">Delivery by Charges</h4>
              <h5 className="">0</h5>
            </div>

            <div className="flex justify-between">
              <h4 className="text-md text-gray-700">Tax</h4>
              <h5 className="">PKR 60</h5>
            </div>

            <hr className="my-2 border border-gray-800 border-dotted" />

            <div className="flex justify-between">
              <h4 className="text-md text-gray-700">Total</h4>
              <h5 className="">PKR {order.data?.total_price}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingCart;
