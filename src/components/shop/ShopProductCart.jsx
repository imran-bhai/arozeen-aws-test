"use client";
import React, { useEffect, useState } from "react";
import ProductCart from "../cart/ProductCart";

import axios from "axios";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { SkeletonCard } from "../SkeletonCard";
import { Button } from "../ui/button";
import Link from "next/link";

const ShopProductCart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        setIsLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}view-all-products`
        );

        setProducts(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreProducts = () => {
    setDisplayedProducts((prevCount) => prevCount + 4);
  };

  return (
    <MaxWidthWrapper>
      <div className="">
        {isLoading ? (
          <SkeletonCard lenght={4} />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <ProductCart
            products={products.slice(0, displayedProducts)}
            folderName={"Productimages/"}
            className="my-7 font-grotesk grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
          />
        )}
      </div>

      <div className="flex justify-center items-center mb-12">
        {products.length > displayedProducts && (
          <Button
            variant="secondary"
            className="text-[#214A25] "
            onClick={handleMoreProducts}
          >
            Show More
          </Button>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default ShopProductCart;
