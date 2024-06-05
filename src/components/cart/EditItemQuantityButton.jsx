import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "../LoadingDots";
import { updateCart } from "@/app/store/slice/cartSlice";
import axios from "axios";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

function SubmitButton({ type, item, token, newCartItems, setNewCartItems }) {
  const [pending, setPending] = useState(false); // Track pending state locally
  const dispatch = useDispatch();

  const optimisticUpdateCart = (updatedQuantity) => {
    // Optimistically update the quantity locally
    const updatedItem = { ...item, quantity: updatedQuantity };
    setNewCartItems(updatedItem);
  };

  const handleUpdateCart = async (updatedQuantity) => {
    try {
      const updated = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}update-cart-item/${item.id}`,
        {
          quantity: updatedQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateCart(updated));
    } catch (error) {
      // Revert the quantity if the API call fails
      optimisticUpdateCart(item.quantity);
      toast.error("Failed to update quantity. Please try again.");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleIncrement = () => {
    const updatedQuantity = item.quantity + 1;
    // if (updatedQuantity > 10) {
    //   toast.error("Reached the Limit");
    //   return;
    // }

    setPending(true);
    optimisticUpdateCart(updatedQuantity);
    handleUpdateCart(updatedQuantity);
  };

  const handleDecrement = () => {
    const updatedQuantity = item.quantity - 1;
    if (updatedQuantity < 1) return;

    setPending(true);
    optimisticUpdateCart(updatedQuantity);
    handleUpdateCart(updatedQuantity);
  };

  return (
    <button
      type="button" // Change to type="button"
      onClick={type === "plus" ? handleIncrement : handleDecrement}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "cursor-not-allowed": pending,
          "ml-auto": type === "minus",
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  quantity,
  type,
  token,
  newCartItems,
  setNewCartItems,
}) {
  return (
    <SubmitButton
      type={type}
      item={item}
      quantity={quantity}
      token={token}
      newCartItems={newCartItems}
      setNewCartItems={setNewCartItems}
    />
  );
}
