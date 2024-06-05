"use client";
import React from "react";
import { SkeletonCard } from "../SkeletonCard";
import ProductCart from "../cart/ProductCart";

const Grid4x = ({ products, isLoading, error, endpoint }) => {
  return (
    <div className="basis-full lg:basis-6/7">
      {isLoading ? (
        <SkeletonCard lenght={12} />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ProductCart
          products={products}
          endpoint={endpoint}
          endlimit={40}
          className="my-7 font-grotesk grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
        />
      )}
    </div>
  );
};

export default Grid4x;
