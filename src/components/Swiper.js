"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider-style.css";
import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import img1 from "../../public/home/heroSlider/1.png";
import img2 from "../../public/home/heroSlider/2.png";
import img3 from "../../public/home/heroSlider/3.png";

const slides = [img1, img2, img3];

const Slider = () => {
  const [swiper, setSwiper] = useState(null);

  const handleNextImage = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const handlePrevImage = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  return (
    <div className="relative min-w-full md:top-[53px]">
      <Swiper
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[30vh] sm:h-[70vh] md:h-[40vh] lg:h-[84vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className=" ">
            <div className="font-grotesk relative h-72 sm:h-[500px]">
              <div className="w-full min-h-screen h-[50vh] sm:h-[95vh] justify-center items-center cursor-pointer duration-500 flex flex-col lg:flex-row ">
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center h-full">
                  <div
                    onClick={handlePrevImage}
                    className="hidden sm:flex justify-center items-center bg-gray-100 h-7 sm:h-12 w-7 sm:w-12 rounded-full ml-4 cursor-pointer"
                  >
                    <ArrowLeft />
                  </div>
                  <div
                    onClick={handleNextImage}
                    className="hidden sm:flex justify-center items-center bg-gray-100 h-7 sm:h-12 w-7 sm:w-12 rounded-full mr-4 cursor-pointer"
                  >
                    <ArrowRight />
                  </div>
                </div>
                <div className="h-full hover:scale-105  transition-all ease-in-out">
                  <Image
                    src={slide}
                    alt={slide}
                    priority={true}
                    className="min-w-screen object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
