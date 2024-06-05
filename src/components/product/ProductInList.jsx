"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import StarRating from "../StarRating";
import Link from "next/link";

export default function ProductInList({ products, isLoading, error }) {
  return (
    <div className="flex my-7 flex-col justify-center hover:shadow-lg lg:basis-6/7 h-full ">
      {products?.map((product, index) => (
        <Link key={index} href={`products/${product.id}`}>
          <div className="flex mb-5 space-x-5 md:space-x-0 " key={index}>
            <div className="basis-2/7 ">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${
                  product.image || product.firstImage
                }`}
                alt="Striped Sweater for Men"
                width={200}
                height={200}
                className="w-full h-32 md:h-64 object-contain rounded-lg"
              />
            </div>

            <div className="md:p-4 basis-5/7">
              <h3 className="font-bold text-lg">{product.name}</h3>

              <p className="text-gray-500 line-clamp-1 md:line-clamp-none">
                {product.description}
              </p>
              <p className="text-gray-500">
                Made of Cotton, Perfect for Winter
              </p>
              <div className="mt-2 flex justify-between items-center">
                <div variant="secondary">
                  {/* <StarRating rating={product.average_rating} /> ({product?.productreview.length}) */}
                </div>
                <div className="flex gap-x-5 md:flex-col">
                  <div className="text-md md:text-xl font-bold text-gray-900">
                    Rs.{product.price}
                  </div>

                  {/* <div className="line-through text-gray-500 text-sm">
                  Rs. {product.price_before}
                </div> */}
                  <div className="text-red-500 text-sm">-19%</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
