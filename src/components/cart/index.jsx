"use client";
import { useState, useEffect, Suspense } from "react";
import { getToken } from "@/app/config/actions";
import CartModal from "./Modal";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "@/app/store/slice/cartSlice"; // Import the action

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [fullResponse, setFullResponse] = useState({});
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [newCartItems, setNewCartItems] = useState(false);

  const dispatch = useDispatch(); // Get the dispatch function
  const cartProducts = useSelector((state) => state.cart);
  const removeCartFlag = useSelector((state) => state.cart.removeCart); // Get the flag

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = (await getToken());
      try {
        if (!token) {
          throw new Error("Token not found");
        } else {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}show-cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFullResponse(response.data);
          setCartItems(response.data.data.cart_items); // Assuming the response contains cart items
        }

        setIsCartLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setIsCartLoading(false); // Ensure loading state is updated even if there's an error
      }
    };

    // Check the flag first
    if (removeCartFlag) {
      setCartItems([]); // Clear cart items
      dispatch(removeCart(false)); // Reset the flag
    } else {
      fetchCartItems(); // Only fetch if not logging out
    }
  }, [newCartItems, cartProducts, removeCartFlag]);

  return (
    <div className="">
      <Suspense>
        <CartModal
          cart={cartItems}
          newCartItems={newCartItems}
          setNewCartItems={setNewCartItems}
          fullResponse={fullResponse}
        />
      </Suspense>
    </div>
  );
}
