import React from "react";
import ShopMainPage from "@/components/shop/ShopMainPage";
import ShopCollectionInShop from "@/components/shop/ShopCollectionInShop";
import LatestArticle from "@/components/home/LatestArticle";
import ShopBanner from "@/components/shop/ShopBanner";
import AllCategories from "@/components/home/AllCategories";
import ShopProductCart from "@/components/shop/ShopProductCart";

const page = () => {
  return (
    <div className="font-grotesk min-w-screen">
      {/* <ShopBanner /> */}
      <div className="pt-5">
        <ShopMainPage />
        {/* <All Categories /> */}
      </div>
      {/* <ShopProductCart /> */}
      {/* <ShopCollectionInShop /> */}
      <LatestArticle />
    </div>
  );
};

export default page;
