// import WishListIcon from "@/components/iconSVG/WishListIcon";
import { HeartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

const OpenWishList = ({ className, wishlistItems }) => {
  return (
    <div className=" relative flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <HeartIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-125",
          className
        )}
      />

      {wishlistItems?.data.length > 0 && wishlistItems?.data ? (
        <div className="absolute text-center right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-orange-600 text-[11px] font-medium text-white">
          {wishlistItems.data.length}
        </div>
      ) : null}
    </div>
  );
};

export default OpenWishList;
