"use client";
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import ProductCart from "../cart/ProductCart";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import axios from "axios";

import { SkeletonCard } from "../SkeletonCard";
import { Button } from "../ui/button";

const ProductsHome = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}view-all-products`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="flex justify-between mt-12 sm:mt-2">
        <h3 className="text-primary font-semibold text-3xl">Products</h3>
        <Link
          href="/products"
          className="text-[#214A25] font-semibold text-sm flex justify-end items-center"
        >
          View More <ArrowRight className="w-5 h-4" />
        </Link>
      </div>

      {isLoading ? (
        <SkeletonCard lenght={10} />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ProductCart
          products={products}
          endpoint={"Productimages/"}
          endlimit={10}
          className="my-7 font-grotesk grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        />
      )}

      <div className="flex justify-center items-center mb-12">
        <Link href="/products">
          {" "}
          <Button>Show More</Button>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsHome;
