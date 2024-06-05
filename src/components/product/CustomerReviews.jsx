"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import DropDownIcon from "../iconSVG/DropDownIcon";
import LineChart from "./LineChart";
import MaxWidthWrapper from "../MaxWidthWrapper";
import axios from "axios";

import StarRating from "../StarRating";

const CustomerReviews = ({ productId, storeInfo }) => {
  const [productReview, setProductReview] = useState([]);
  const [displayedReview, setDisplayedReview] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductReview = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}reviews-of-product/${productId}`
        );
        setProductReview(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductReview();
  }, [productId]);

  const handleMoreReview = () => {
    setDisplayedReview((prevCount) => prevCount + 2);
  };

  return (
    <MaxWidthWrapper>
      <div className="w-full">
        <div className="md:flex md:justify-between">
          <h3 className="text-3xl font-semibold text-black py-5">
            Customer Reviews ({productReview?.data?.length || 0})
          </h3>
          <div className="flex items-center text-[#214A25] gap-x-2">
            {/* <p className="">Sort by: Newest </p> */}
            <div>
              {/* <DropDownIcon className="#214A25" /> */}
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-center lg:gap-x-24">
          <div className="flex-1">
            {loading ? (
              <p>Loading...</p>
            ) : productReview.data?.length ? (
              productReview.data?.slice(0, displayedReview).map((review) => (
                <div key={review.id} className="flex flex-col py-3">
                  <div className="flex gap-x-2">
                    <div className="mx-2">
                      <Image
                        src="/home/categories/bombers.png"
                        alt="Bombers"
                        width={50}
                        height={50}
                        className="object-contain rounded-full "
                      />
                    </div>
                    <div className="mx-auto">
                      <p className="text-gray-700">Sold By</p>
                      <h3 className="font-semibold text-xl">{`${review.customer.firstname} ${review.customer.lastname}`}</h3>
                      <StarRating
                        rating={review.product_rating}
                        className="py-1"
                      />
                      <p className="text-gray-700 py-3">
                        {review.product_review}
                      </p>
                      {/* <div className="text-[#214A25] flex items-center py-3 gap-x-2">
                        <ThumbsUp className="text-primary" />
                        <p className="">12 Person Liked</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Reviews Yet</p>
            )}

            {productReview.data?.length > displayedReview && (
              <div
                onClick={handleMoreReview}
                className="text-center hover:cursor-pointer text-[#214A25] underline underline-offset-3"
              >
                <p className="">View More</p>
              </div>
            )}
          </div>
          <div className="">
            <div className="flex-1 py-2 my-5 border border-primary">
              <div className="text-center">
                <h3 className="font-semibold text-2xl text-primary">
                  Overall Rating
                </h3>
                <p className="text-gray-700 py-3 mx-3">
                  Rating and reviews are verified and are from people who use
                  the service
                </p>
              </div>
              <div className="flex">
                <div className="flex-1 pl-12">
                  <p className="text-4xl sm:text-5xl font-bold">{storeInfo.average_product_rating}</p>
                  <div className="py-3">
                    <StarRating rating={storeInfo.average_product_rating} />
                  </div>
                  <p className="text-gray-700">{productReview?.data?.length || 0} Reviews</p>
                </div>
                <div className="flex-1">
                  <LineChart storeInfo={storeInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CustomerReviews;
