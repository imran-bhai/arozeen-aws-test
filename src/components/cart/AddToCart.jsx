"use client";
import clsx from "clsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getToken } from "@/app/config/actions";

import { useDispatch } from "react-redux";
import { updateCart, updateWishlist } from "@/app/store/slice/cartSlice";
import { useRouter } from "next/navigation";

function SubmitButton({
  productId,
  product,
  addtionQuantity,
  buttonClasses,
  quantity,
  firstAttribute,
  secondAttribute,
  areAttributesSelected,
  handleAddToCartClick,
  setShowError,
}) {
  const [token, setToken] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchToken = await getToken();
      setToken(fetchToken);
    };
    fetchToken();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    // Ensure both attributes are selected
    if (!areAttributesSelected && product.attributes_status == 1) {
      toast.error("Please select all product attributes before adding to cart");
      handleAddToCartClick();
      return;
    }

    try {
      if (token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}products/${productId}`
        );
        const product = response.data.data;

        const showCartItems = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}show-cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cartItems = showCartItems.data.data.cart_items;
        setCartProducts(cartItems);

        // Check for an existing item in the cart with the same product_id and attributes
        const matchedItem = cartItems?.find(
          (item) =>
            item.product_id === product.id &&
            item.attributes[firstAttribute.name] === firstAttribute.value &&
            item.attributes[secondAttribute.name] === secondAttribute.value
        );

        if (matchedItem) {
          // Update the quantity of the existing item
          const quantity = matchedItem.quantity;

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}update-cart-item/${matchedItem.id}`,
            { quantity: quantity + addtionQuantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (res.data.code) {
            dispatch(
              updateCart({
                product_id: matchedItem.id,
                quantity: matchedItem.quantity + addtionQuantity,
              })
            );
            axios.delete(
              `${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${product.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            toast.success("Cart updated successfully");
          }
        } else {
          if (product.attributes_status == 0) {
            // Add new item with different attributes

            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}add-to-cart`,
              {
                product_id: product.id,
                quantity: addtionQuantity,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setShowError(false);
            if (res.data?.code == 200) {
              setShowError(false);
              dispatch(
                updateCart({
                  product_id: product.id,
                  quantity: addtionQuantity,
                })
              );
              dispatch(updateWishlist({ product_id: product.id }));
              axios.delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${product.id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              toast.success("Added to cart successfully");
            } else {
              toast.error("Add to cart failed");
            }
          } else {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}add-to-cart`,
              {
                product_id: product.id,
                quantity: addtionQuantity,
                name: [firstAttribute.name, secondAttribute.name],
                value: [firstAttribute.value, secondAttribute.value],
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setShowError(false);
            if (res.data?.code == 200) {
              setShowError(false);
              dispatch(
                updateCart({
                  product_id: product.id,
                  quantity: addtionQuantity,
                })
              );
              dispatch(updateWishlist({ product_id: product.id }));
              axios.delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}wishlist/${product.id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              toast.success("Added to cart successfully");
            } else {
              toast.error("Add to cart failed");
            }
          }
        }
      } else {
        // router.push("/login");
        router.push(`/login?q=/products/${productId}?quantity=/${quantity}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="grid grid-cols-1">
      <div
        onClick={handleAdd}
        className={`cursor-pointer hover:opacity-90 flex justify-center items-center bg-[#F7EAE3] text-primary h-10 ${
          !areAttributesSelected ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        ADD TO CART
      </div>
    </div>
  );
}

export function AddToCart({
  productId,
  product,
  quantity,
  buttonClasses,
  firstAttribute,
  secondAttribute,
  areAttributesSelected,
  handleAddToCartClick,
  setShowError,
}) {
  return (
    <form>
      <SubmitButton
        productId={productId}
        product={product}
        addtionQuantity={quantity}
        buttonClasses={buttonClasses}
        quantity={quantity}
        firstAttribute={firstAttribute}
        secondAttribute={secondAttribute}
        areAttributesSelected={areAttributesSelected}
        handleAddToCartClick={handleAddToCartClick}
        setShowError={setShowError}
      />
      <p aria-live="polite" className="sr-only" role="status"></p>
    </form>
  );
}
