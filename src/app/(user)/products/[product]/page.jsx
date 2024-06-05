import { notFound } from "next/navigation";
import { Suspense } from "react";
import axios from "axios";
import RelatedProducts from "@/components/product/RelatedProducts";
import CustomerReviews from "@/components/product/CustomerReviews";
import DescriptionReviews from "@/components/product/DescriptionReviews";
import BreadcrumbCustome from "@/components/BreadcrumbCustome";
import ProductDescription from "@/components/product/ProductDescription";
import Gallery from "@/components/product/Gallery";

export default async function ProductPage({ params }) {
  const productId = params.product;

  let product;
  let ImagesUrl;
  let storeInfo;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}products/${productId}`
    );
    product = response.data.data;
    storeInfo = response.data;

    const extractedImages = product.images.map(
      (obj) =>
        `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/` + obj.image
    );
    ImagesUrl = extractedImages;
  } catch (error) {
    console.log(error);
  }

  if (!product) return notFound();
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 font-grotesk">
        <div className="px-24">
          <div className="py-3">
            <BreadcrumbCustome />
          </div>
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white  dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-10">
            <div className="h-full w-full basis-full lg:basis-4/6">
              <Gallery
                images={ImagesUrl.map((image) => ({
                  src: image,
                  altText: product.name,
                }))}
              />
            </div>

            <div className="basis-full lg:basis-3/6">
              <ProductDescription
                product={product}
                productId={productId}
                storeInfo={storeInfo}
              />
            </div>
          </div>
        </div>

        <DescriptionReviews product={product} storeInfo={storeInfo} />
        <div className="">
          <CustomerReviews productId={productId} storeInfo={storeInfo} />
        </div>
        <Suspense>
          <RelatedProducts id={productId} heading="You Might Also Like" />
        </Suspense>
      </div>
    </>
  );
}
