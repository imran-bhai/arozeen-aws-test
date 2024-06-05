"use client";
import Image from "next/image";
import ColorSize from "./ColorSize";
import { Button } from "../ui/button";
import DropDownIcon from "../iconSVG/DropDownIcon";
import DropUpIcon from "../iconSVG/DropUpIcon";
import { AddToCart } from "../cart/AddToCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/app/config/actions";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "@/app/store/slice/cartSlice";
import { toast } from "react-toastify";

const ProductDescription = ({ product, productId, storeInfo }) => {
  const [quantity, setQuantity] = useState(1);
  const [wishlistItem, setWishlistItem] = useState([]);
  const [isToken, setIsToken] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [firstAttribute, setFirstAttribute] = useState({ name: "", value: "" });
  const [secondAttribute, setSecondAttribute] = useState({
    name: "",
    value: "",
  });

  const dispatch = useDispatch();

  const wishlistData = useSelector((state) => state.cart.wishlist);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          setIsToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleAddItemInWishList = debounce(async (id) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}create-wishlist`,
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      dispatch(updateWishlist(res.data));
      setWishlistItem((prevWishlist) => [...prevWishlist, id]);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Too many requests, please try again later.");
      } else {
        console.error("Error adding to wishlist:", error);
      }
    }
  }, 300); // Debounce for 300ms

  const handleRemoveItemFromWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${id}`,
        {
          headers: { Authorization: `Bearer ${isToken}` },
        }
      );

      if (response.data.code === 200) {
        setWishlistItem((prevWishlist) =>
          prevWishlist.filter((itemId) => itemId !== id)
        );
        dispatch(updateWishlist(response.data));
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!isToken) return;

      setIsCartLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}view-wishlist`,
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );

        const wishlistProductIds = response.data.data.map(
          (item) => item.product_id
        );
        setWishlistItem(wishlistProductIds);
        setIsCartLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setIsCartLoading(false);
      }
    };

    fetchWishlistItems();
  }, [isToken]);

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Check if both attributes are selected
  const areAttributesSelected =
    firstAttribute.value !== "" && secondAttribute.value !== "";

  const handleAddToCartClick = () => {
    if (!areAttributesSelected && product.attributes_status == 1) {
      setShowError(true);
    } else {
      setShowError(false);
      // Add to cart logic here
      // ...
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <div>
          <div className="lg:flex lg:justify-between ">
            <h1 className="mb-2 text-2xl sm:text-3xl lg:w-60 lg:text-xl font-medium text-center sm:text-start">
              {product.name}
            </h1>
            {storeInfo?.data?.stock_quantity > 0 ? (
              <div className="text-green-500 hidden md:block ">
                <div className="flex">
                  <Image
                    src="/SVGs/productDetails/check.svg"
                    alt=""
                    width={23}
                    height={23}
                    className="object-contain"
                  />
                  <span className="ml-1">In Stock</span>
                </div>
              </div>
            ) : (
              <div className="text-red-700 hidden md:block line-through font-semibold">
                Out of Stock
              </div>
            )}
          </div>
          <div className="flex justify-between mx-2 py-3">
            <div className="flex items-center gap-x-2">
              <h5 className="text-sm py-2 text-[#C39378] line-through font-normal">
                {product.price_before}
              </h5>
              <h6 className="text-primary font-semibold">
                {product.price} PKR
              </h6>
            </div>
            <div
              onClick={() => {
                if (wishlistItem.includes(product.id)) {
                  handleRemoveItemFromWishlist(product.id);
                } else {
                  handleAddItemInWishList(product.id);
                }
              }}
              className="text-primary flex items-center gap-x-1 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  wishlistItem.includes(product.id) ? "currentColor" : "none"
                }
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
              <span className="">Save for later</span>
            </div>
          </div>
        </div>
        <div className="mx-3">
          <ColorSize
            storeInfo={storeInfo}
            firstAttribute={firstAttribute}
            setFirstAttribute={setFirstAttribute}
            secondAttribute={secondAttribute}
            setSecondAttribute={setSecondAttribute}
            areAttributesSelected={areAttributesSelected}
            showError={showError}
          />
        </div>

        <hr className="mx-3 " />
        <div className=" mx-3 py-3 text-md font-semibold text-gray-800 space-y-3 ">
          <div className="flex justify-between">
            <p className="py-5 ml-4 ">Quantity</p>
            <div className="flex items-center">
              <Button variant="outline" onClick={decrementQuantity}>
                <DropDownIcon />
              </Button>
              <p className="mx-4 text-primary font-semibold">{quantity}</p>
              <Button variant="outline" onClick={incrementQuantity}>
                <DropUpIcon />
              </Button>
            </div>
          </div>
          <AddToCart
            productId={productId}
            product={product}
            quantity={quantity}
            firstAttribute={firstAttribute}
            secondAttribute={secondAttribute}
            areAttributesSelected={areAttributesSelected}
            handleAddToCartClick={handleAddToCartClick}
            setShowError={setShowError}
            buttonClasses={
              "cursor-pointer hover:opacity-90 flex justify-center items-center bg-[#F7EAE3] text-primary h-10"
            }
          />
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
