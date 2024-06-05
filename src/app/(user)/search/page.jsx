import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCart from "@/components/cart/ProductCart";
import axios from "axios";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

async function getProducts({ searchValue }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}search-deep?query=${searchValue}`
    );

    if (!res.data || !Array.isArray(res.data.data)) {
      throw new Error("Invalid data format received from the API.");
    }

    return res.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}

export default async function SearchPage({ searchParams }) {
  const { q: searchValue } = searchParams;

  try {
    const products = await getProducts({ searchValue });
    const resultsText = products.length > 1 ? "results" : "result";

    return (
      <>
        {searchValue ? (
          <MaxWidthWrapper>
            <p className="mb-4">
              {products.length === 0
                ? "There are no products that match "
                : `Showing ${products.length} ${resultsText} for `}
              <span className="font-bold">&quot;{searchValue}&quot;</span>
            </p>
          </MaxWidthWrapper>
        ) : null}
        {products.length > 0 ? (
          <MaxWidthWrapper>
            <div className="min-h-screen">
              <ProductCart
                products={products}
                endpoint={"Productimages/"}
                className={
                  "my-7  font-grotesk grid grid-cols-1 md:grid-cols-4  xl:grid-cols-5 gap-4"
                }
              />
            </div>
          </MaxWidthWrapper>
        ) : null}
      </>
    );
  } catch (error) {
    // Handle errors that occurred during data fetching:
    console.error("Error in SearchPage:", error);

    if (error.response && error.response.status === 404) {
      // If the API returned a 404, redirect to a not found page
      notFound();
    } else {
      // For other errors, display a generic error message
      return (
        <MaxWidthWrapper>
          <p className="error-message mt-6">
            There are no product that match{" "}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        </MaxWidthWrapper>
      );
    }
  }
}
