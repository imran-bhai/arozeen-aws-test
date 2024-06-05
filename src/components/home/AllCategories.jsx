"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import axios from "axios";
import { CategoryCarousel } from "../category/CategoryCarousel";

const AllCategories = () => {
  const [isLoading, setIsLoading] = useState();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}view-all-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.data);

      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    const takingToken = async () => {
      try {
        const Token = await getToken();
        return Token;
      } catch (error) {
        console.log(error);
      }
    };
    const token = takingToken();
    fetchCategories(token);
  }, []);

  return (
    <div className="">
      <MaxWidthWrapper className="flex flex-col  justify-center items-center md:items-center lg:items-start">
        <h3 className="text-primary font-semibold text-xl sm:text-3xl  sm:py-0 ">
          Shop by Categories
        </h3>

        <CategoryCarousel categories={categories} />
      </MaxWidthWrapper>
    </div>
  );
};

export default AllCategories;
