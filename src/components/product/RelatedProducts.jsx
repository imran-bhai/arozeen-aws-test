"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";

import Image from "next/image";
import StarRating from "../StarRating";



export default function RelatedProducts({ id, heading }) {
  const [products, setProducts] = useState([]);

  function extractFirstThreeWords(text) {
    const words = text
      .replace(/[^\w\s]|_/g, "")
      .split(/\s+/)
      .slice(0, 3)
      .join(" ");
    return words;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}related-products/${id}`);
      const data = await response.json();
      setProducts(data.data);
    };
    fetchProducts();
  }, [id]);

  if (!products.length) return null;

  return (
    <div className="py-8 ">
      <h2 className="mb-4 text-2xl font-bold text-primary ">{heading}</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1 ">
        <Swiper
          rewind={true}
          loop={true}
          autoplay={{
            
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          // pagination={{
          //   clickable: true,
          // }}
          className=""
        >
          {products.map((product, i) => (
            <SwiperSlide
              key={i}
              className="transition transform 0.2s ease-in-out "
            >
              <li
                key={`${product.id}${i}`}
                className="aspect-square w-full flex-none mx-auto"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative h-full w-full"
                >
                  <div className=" ">
                    <div className="flex flex-row sm:flex-col">
                      <span className="w-10 text-center absolute top-2 left-3 px-2 py-0.5 rounded-md  bg-secondary text-primary font-semibold text-xs ">
                        NEW
                      </span>
                      {/* <span className="w-10 text-center absolute top-8 left-3 px-2 py-0.5 rounded-md  bg-primary text-secondary font-semibold text-xs ">
                        -50%
                      </span> */}
                    </div>

                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${product.images[0]?.image}`}
                      alt=""
                      width={300}
                      height={400}
                      className="h-56 w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col py-2 items-center sm:items-start">
                    <div className=" text-lg py-1 text-primary font-semibold  ">
                      <StarRating rating={product.average_rating} />
                    </div>
                    <h3 className="text-base font-medium">
                      {`${extractFirstThreeWords(product.name)}`}
                    </h3>
                    <div className="flex gap-x-2">
                      <p className="text-sm py-2 text-primary font-semibold">
                        {"$"}
                        {`${product.price}`}
                      </p>
                      {/* <p className="text-sm py-2 text-[#C39378] font-semibold line-through">
                  {"$"}
                  {`${product.before_price}`}
                </p> */}
                    </div>
                  </div>
                </Link>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </div>
  );
}
