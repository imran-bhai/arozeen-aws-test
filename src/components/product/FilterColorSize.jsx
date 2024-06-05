"use client";
import React, { useState } from "react";
import OrangeStar from "../iconSVG/OrangeStar";
import GrayStar from "../iconSVG/GrayStar";
import DropDownIcon from "../iconSVG/DropDownIcon";

const productData = {
  name: "Awesome T-Shirt",
  imageUrl: "/images/awesome-tshirt.jpg",
  sizes: ["XXL", "XS", "S", "M", "L", "XL", "Custom"],
  colors: [
    { name: "Red", colorCode: "#f00" },
    { name: "Blue", colorCode: "#00f" },
    { name: "Green", colorCode: "#0f0" },
    { name: "Purple", colorCode: "#f0f" },
    { name: "Yellow", colorCode: "#ff0" },
    { name: "Orange", colorCode: "#f60" },
    { name: "Pink", colorCode: "#f0f" },
    { name: "Black", colorCode: "#000" },
    { name: "Brown", colorCode: "#a52a2a" },
    { name: "Gray", colorCode: "#808080" },
  ],
};

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const orangeStars = rating > 0 ? Math.min(rating, totalStars) : 0;
  const grayStars = totalStars - orangeStars;

  return (
    <div className="flex items-center gap-x-4">
      {[...Array(orangeStars)].map((_, index) => (
        <OrangeStar key={index} className="mr-1" width={"24"} height={"24"} />
      ))}
      {[...Array(grayStars)].map((_, index) => (
        <GrayStar key={index} className="mr-1" width={"24"} height={"24"} />
      ))}
    </div>
  );
};

const FilterColorSize = ({ filter, setFilter }) => {
  const [showColor, setShowColor] = useState(true);
  const [showSize, setShowSize] = useState(true);
  const [showRating, setShowRating] = useState(true);

  

  const handleSelectColor = (color) => {
    setFilter((prevFilters) => ({
      ...prevFilters,
      color: color.name,
    }));
  };

  const handleSelectSize = (size) => {
    setFilter((prevFilters) => ({
      ...prevFilters,
      size: size,
    }));
  };

  const handleSelectRating = (rating) => {
    setFilter((prevFilters) => ({
      ...prevFilters,
      rating: rating,
    }));
  };

  return (
    <div className="pb-5">
      {/* Color Section */}
      <div className="mt-5">
        <button
          className="flex items-center justify-between w-full font-semibold gap-2"
          onClick={(e) => {
            e.preventDefault();
            setShowColor(!showColor);
          }}
        >
          <h2>Color</h2>
          <DropDownIcon className={`${showColor ? "rotate-180 " : ""}`} />
        </button>
        {showColor && (
          <div className="grid grid-cols-5 justify-center gap-y-5 mt-4">
            {productData.colors.map((color) => (
              <button
                key={color.name}
                className={`w-6 h-6 rounded-full border ${
                  filter.color === color.name ? "border-black" : ""
                }`}
                style={{ backgroundColor: color.colorCode }}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectColor(color);
                }}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* Size Section */}
      <div className="mt-5">
        <button
          className="flex items-center justify-between w-full font-semibold gap-2"
          onClick={(e) => {
            e.preventDefault();
            setShowSize(!showSize);
          }}
        >
          <h2>Size</h2>
          <DropDownIcon className={`${showSize ? "rotate-180" : ""}`} />
        </button>
        {showSize && (
          <div className="grid grid-cols-3 justify-center gap-y-2 mt-3">
            {productData.sizes.map((size) => (
              <button
                key={size}
                className={`border py-2 rounded-md hover:bg-gray-100 h-10 w-16 ${
                  filter.size === size ? "bg-gray-200" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectSize(size);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rating Section */}
      <div className="mt-5">
        <button
          className="flex items-center justify-between font-semibold gap-2 w-full"
          onClick={(e) => {
            e.preventDefault();
            setShowRating(!showRating);
          }}
        >
          <h2>Rating</h2>
          <DropDownIcon className={`${showRating ? "rotate-180" : ""}`} />
        </button>
        {showRating && (
          <div className="flex flex-col gap-4 mt-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="hover:cursor-pointer"
                onClick={() => handleSelectRating(rating)}
              >
                <StarRating rating={rating} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterColorSize;
