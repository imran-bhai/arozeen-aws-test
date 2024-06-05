"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInList from "@/components/product/ProductInList";
import Grid4x from "@/components/product/Grid4x";
import Promotions from "@/components/shop/Promotions";

import ProductsBanner from "@/components/product/ProductsBanner";
import ProductsFilters from "@/components/product/ProductsFilters";
import LatestArticle from "@/components/home/LatestArticle";


const categoryMapping = {
  garments: 1,
  mobile: 2,
  bags: 3,
  shoes: 4,
  laptops: 5,
  beauty: 6,
  sports: 7,
};

const Products = () => {
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
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}view-all-products`);
        setProducts(response.data.data);
        setFilterData(response.data.data); // Initialize filterData with all products
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

    const filtered = products.filter((product) => {
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

      response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}view-all-products`,
        sortOptions[option] || {}
      );

      setProducts(response.data.data);
      setFilterData(response.data.data); // Update filterData with sorted products
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
    <div className="min-h-screen">
      <ProductsBanner />
      <ProductsFilters
        heading={"All Products"}
        view={view}
        setView={setView}
        handleSortFilter={handleSortFilter}
        filtersAt={"ProductsPage"}
        filter={filter}
        setFilter={setFilter}
      >
        {view === "grid4x" ? (
          <Grid4x
            isLoading={isLoading}
            products={filterData}
            error={error}
            endpoint={"Productimages/"}
          />
        ) : (
          <ProductInList
            products={filterData}
            isLoading={isLoading}
            error={error}
          />
        )}
      </ProductsFilters>

      <Promotions />
      <LatestArticle />
    </div>
  );
};

export default Products;
