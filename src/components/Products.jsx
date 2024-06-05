import React, { useState, useEffect } from "react";

import axios from "axios";

import ProductCart from "./cart/ProductCart";
import ProductCartSkeleton from "./ProductCartSkeleton";

const Products = ({ endlimit }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    <>
      {isLoading ? (
        <div className="mt-12">
          <ProductCartSkeleton />
        </div>
      ) : (
        <div className="my-12">
          <ProductCart
            products={products}
            endpoint={"Productimages/"}
            endlimit={endlimit}
            className="my-7 font-grotesk grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4"
          />
        </div>
      )}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </>
  );
};

export default Products;
