"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StarRating from "../StarRating";
import { isArray } from "lodash";
import { getToken } from "@/app/config/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist, updateCart } from "@/app/store/slice/cartSlice";
import { toast } from "react-toastify";
import LoginModal from "../wishlist/LoginModal";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "../ui/background-gradient";

const ProductCart = ({ products, className, endpoint, endlimit }) => {
  const [isToken, setIsToken] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistItem, setWishlistItem] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const removeWishFlag = useSelector((state) => state.cart.removeWish);
  const router = useRouter();

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  useEffect(() => {
    router.refresh();
  }, [refreshPage]);

  // Fetch token only once
  useEffect(() => {
    const fetchToken = async () => {
      const Token = await getToken();

      if (Token) {
        setIsToken(Token);
      } else {
        setIsToken();
      }
    };
    fetchToken();
  }, [removeWishFlag, refreshPage]);

  const handleAddItemInWishList = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}create-wishlist`,
        {
          product_id: id,
        },
        {
          headers: { Authorization: `Bearer ${isToken}` },
        }
      );

      if (response.data.code === 200) {
        toast.success("Product added to wishlist");
        // setUpdatedWishlist(response.data.data);
        setWishlist([...wishlist, id]);

        dispatch(updateCart({ product_id: id, quantity: 1 }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItemFromWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${id}`,
        {
          headers: { Authorization: `Bearer ${isToken}` },
        }
      );

      if (response.data.code === 200) {
        // Remove the item from the wishlist state
        setWishlist(wishlist.filter((itemId) => itemId !== id));
        dispatch(updateCart({ product_id: id, quantity: 1 }));
        toast.success("Product removed from wishlist");
        // Update the Redux store or perform any other necessary actions
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch wishlist items again when logout
  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!isToken) return; // Don't fetch until token is ready
      try {
        const fetchWishlistItems = async () => {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}view-wishlist`,
            {
              headers: {
                Authorization: `Bearer ${isToken}`,
              },
            }
          );

          // Check for valid response
          if (response.data && Array.isArray(response.data.data)) {
            // Check for valid data
            setWishlist(response.data.data.map((item) => item.product_id)); // Store product IDs
          }
        };
      } catch (error) {
        console.log(error);
      }
    };

    if (removeWishFlag) {
      setWishlist();
      dispatch(removeWishlist(false)); // Reset the flag
    } else {
      fetchWishlistItems();
    }
  }, [removeWishFlag]); // Fetch only when token changes

  // Fetch wishlist items at when token change
  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!isToken) return; // Exit if token is not available
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}view-wishlist`,
          { headers: { Authorization: `Bearer ${isToken}` } }
        );
        if (response.data && Array.isArray(response.data.data)) {
          setWishlist(response.data.data.map((item) => item.product_id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlistItems();
  }, [isToken]);

  const handleCancel = () => {
    setLoginPopup(false);
  };

  const handleLogin = () => {
    setLoginPopup(false);
  };

  return (
    <div className={`${className} `}>
      {isArray(products) ? (
        products?.slice(0, endlimit).map((product, index) => (
          <div className="relative" key={product.id}>
            {" "}
            {/* Added key here */}
            <Link href={`/products/${product.id}`} className="">
              <BackgroundGradient className="hover:scale-105 relative rounded-sm max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 lg:h-96 w-auto h-56">
                {/* <div className="flex flex-col justify-center items-center lg:h-56 w-auto h-56 bg-white shadow-lg "> */}
                <div className="flex flex-row sm:flex-col">
                  <span className="w-10 text-center absolute top-2 left-3 px-2 py-0.5 rounded-md bg-secondary text-primary font-semibold text-xs">
                    NEW
                  </span>
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${endpoint}${
                    product.image || product.firstImage
                  }`}
                  alt=""
                  width={300}
                  height={400}
                  className="h-56 w-full object-contain"
                />
                {/* </div> */}

                <div className="flex flex-col py-2 items-center sm:items-start">
                  <div className="text-lg py-1 text-primary font-semibold">
                    <StarRating rating={product.average_rating} />
                  </div>
                  <h3 className="font-inter text-base font-medium line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex gap-x-2">
                    <p className="text-sm py-2 text-primary font-semibold">
                      {"Rs "}
                      {`${product.price}`}
                    </p>
                  </div>
                </div>
              </BackgroundGradient>
            </Link>
            <div
              onClick={() => {
                if (isToken) {
                  if (wishlist.includes(product.id)) {
                    handleRemoveItemFromWishlist(product.id);
                  } else {
                    handleAddItemInWishList(product.id);
                  }
                } else {
                  setWishlistItem(product.id);
                  openLogin();
                }
              }}
              className="w-10 hover:cursor-pointer text-center absolute top-2 right-3 px-2 py-0.5 rounded-sm bg-secondary text-primary font-semibold text-xs z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={wishlist?.includes(product.id) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
            {isToken ? (
              " "
            ) : (
              <LoginModal
                refreshPage={refreshPage}
                setRefreshPage={setRefreshPage}
                id={wishlistItem}
                isOpen={isLoginOpen}
                onClose={closeLogin}
                wishlistItem={wishlistItem}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center min-h-screen ">
          <div className="text-center mb-24">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Don&apos;t have products of this category
            </p>
            <p className="text-gray-600">
              Please check back later or try a different category.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
