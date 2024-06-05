"use client";
import React, { useState, useEffect } from "react";
import ShopFilterProducts from "../product/ProductsFilters";
import ProductCart from "../cart/ProductCart";
import Grid4x from "../product/Grid4x";
import ProductInList from "../product/ProductInList";

const CategoryFilterProducts = ({ categoryId, products }) => {
  const [filterData, setFilterData] = useState([]);
  const [view, setView] = useState("grid4x");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    rating: "",
    size: "",
    color: "",
  });


  const applyFilters = () => {
    const filtered = products.filter((product) => {
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
          (attr) =>
            attr.name === "Color" && attr.values.includes(filter.color)
        );

      return matchesRating && matchesSize && matchesColor;
    });
    setFilterData(filtered); // Update filterData with the filtered products
    return filtered;
  };

  useEffect(() => {
    applyFilters();
  }, [filter]);

  return (
    <ShopFilterProducts
      heading={`Category / ${categoryId}`}
      view={view}
      setView={setView}
      filtersAt={"CategoryPage"}
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
    </ShopFilterProducts>
  );
};

export default CategoryFilterProducts;
