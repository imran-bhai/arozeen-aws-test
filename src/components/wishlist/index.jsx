"use client";
import { useState, useEffect, Suspense } from "react";
import { getToken } from "@/app/config/actions";
import axios from "axios";
import WishListDetail from "./WishListDetail";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "@/app/store/slice/cartSlice";


export default function Wish() {
  const [isToken, setIsToken] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [wishlistItem, setWishlistItem] = useState();
  const cartProducts = useSelector((state) => state.cart);
const removeWishFlag = useSelector((state) => state.cart.removeWish);

const dispatch = useDispatch()
  useEffect(() => {
    const fetchWishlistItems = async () => {
      const token = (await getToken());
      try {
        if (!token) {
          throw new Error("Token not found");
        } else {
          setIsToken(token);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}view-wishlist`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setWishlistItem(response.data);
        }

        setIsCartLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setIsCartLoading(false); 
      }
    };
    
    if(removeWishFlag){
      setWishlistItem()
      dispatch(removeWishlist(false)); // Reset the flag
    }
    else{
      fetchWishlistItems();
    }
  }, [cartProducts,removeWishFlag]);

  return (
    <div className="">
      <Suspense>
        <WishListDetail wishlistItems={wishlistItem} isToken={isToken} />
      </Suspense>
    </div>
  );
}
