"use client";
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import axios from "axios";
import ShopFilters from "./ShopFilters";
import Grid4x from "../product/Grid4x";
import ProductInList from "../product/ProductInList";

const ShopMainPage = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("grid4x");
  const [filterData, setFilterData] = useState([]);

  const [filter, setFilter] = useState({
    category: [],
    rating: "",
    size: "",
    color: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}products/store/${shopId}`
        );

        setProducts(response.data);
        setFilterData(response.data.products); // Initialize filterData with all products
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const categoryIds = filter.category.map(
      (category) => categoryMapping[category]
    );

    const filtered = products.products?.filter((product) => {
      const matchesCategory =
        categoryIds.length === 0 || categoryIds.includes(product.category_id);
      const matchesRating =
        !filter.rating || product.average_rating == filter.rating;
      const matchesSize =
        !filter.size ||
        product.attributes.some(
          (attr) => attr.name === "Size" && attr.values.includes(filter.size)
        );
      const matchesColor =
        !filter.color ||
        product.attributes.some(
          (attr) => attr.name === "Color" && attr.values.includes(filter.color)
        );

      return matchesCategory && matchesRating && matchesSize && matchesColor;
    });
    setFilterData(filtered); // Update filterData with the filtered products
    return filtered;
  };

  const handleSortFilter = async (option) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      const sortOptions = {
        "Price: Low to High": { sort_price: "lowtohigh" },
        "Price: High to Low": { sort_price: "hightolow" },
        // "Ascending Products": { sort_alphabetically: "asc" },
        // "Descending Products": { sort_alphabetically: "desc" },
      };

      response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}products/store/${shopId}`,
        sortOptions[option] || {}
      );

      setProducts(response.data.products);
      setFilterData(response.data.products); // Update filterData with sorted products
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filter]);

  return (
    <>
      <div className="relative ">
        <Image
          // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}StoreBanners/${products.store?.banner_image}`}
          src="/home/heroSlider/2.png"
          alt={products.store?.name}
          // layout="responsive"
          width={1920}
          height={580}
          className="w-full object-cover sm:object-contain md:object-cover lg:object-cover xl:object-cover h-96"
        />

        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 lg:bottom-10 lg:left-16  rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 ">
          <Image
          src="/shop/favicon.ico"
            // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}StoreLogos/${products.store?.logo}`}
            alt={products.store?.name}
            width={192}
            height={192}
            className="rounded-full w-full h-full object-contain"
          />
        </div>
      </div>

      <MaxWidthWrapper>
        <ShopFilters
          heading={`Store ${products.store?.name}`}
          view={view}
          setView={setView}
          handleSortFilter={handleSortFilter}
          filtersAt={"ProductsPage"}
          filter={filter}
          setFilter={setFilter}
        >
          {view === "grid4x" ? (
            <Grid4x
              endpoint={"Productimages/"}
              isLoading={isLoading}
              products={filterData}
              error={error}
            />
          ) : (
            <ProductInList
              products={filterData}
              isLoading={isLoading}
              error={error}
            />
          )}
        </ShopFilters>
      </MaxWidthWrapper>
    </>
  );
};

export default ShopMainPage;
