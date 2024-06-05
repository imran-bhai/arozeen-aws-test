"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { GridTileImage } from "../grid/Tile";
import { useState } from "react";

const Gallery = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(imageIndex);

  const handleNextImage = () => {
    setImageIndex((prevIndex) => {
      return prevIndex + 1 < images.length ? prevIndex + 1 : 0;
    });
    setSelectedImageIndex(imageIndex + 1 < images.length ? imageIndex + 1 : 0);
  };

  const handlePreviousImage = () => {
    setImageIndex((prevIndex) => {
      // Pass prevIndex as an argument
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
    setSelectedImageIndex(
      imageIndex === 0 ? images.length - 1 : imageIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <div className="lg:flex lg:flex-col lg:justify-center lg:items-center">
      <div className="font-grotesk relative aspect-square   max-h-[500px] w-full lg:w-[80%] overflow-hidden bg-white">
        {images[selectedImageIndex] && (
          <Image
            className="h-full w-full object-contain "
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[selectedImageIndex]?.altText}
            src={images[selectedImageIndex]?.src}
            priority={true}
          />
        )}

        {images.length > 1 && (
          <>
            <div className="absolute bottom-[15%] flex w-full justify-center overflow-x-auto">
              <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                <div
                  aria-label="Previous product image"
                  onClick={handlePreviousImage}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowLeftIcon className="h-5" />
                </div>
                <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                <div
                  aria-label="Next product image"
                  onClick={handleNextImage}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowRightIcon className="h-5" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {images.length > 1 ? (
        <ul className="my-12  flex items-center justify-center  gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === selectedImageIndex;
            return (
              <li key={image.src} className="h-20 w-20">
                <div
                  aria-label="Enlarge product image"
                  onClick={() => handleThumbnailClick(index)}
                  scroll={false}
                  className="h-full w-full "
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Gallery;
