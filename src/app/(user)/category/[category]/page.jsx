import { cookies } from "next/headers";
import axios from "axios";
import CategoryFilterProducts from "@/components/category/CategoryFilterProducts";

export default async function Page({ params }) {
  const categoryId = params.category;
 

  const fetchCategoryProducts = async (categoryId) => {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("token")?.value;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}products/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
    

      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch category products:", error);
      throw error; // Re-throw the error to be caught in the calling function if needed
    }
  };

  try {
    const products = await fetchCategoryProducts(categoryId);

    return (
      <>
        <CategoryFilterProducts products={products} categoryId={categoryId} />
      </>
    );
  } catch (error) {
    // Handle the error appropriately here (e.g., show an error message or redirect)
    return <div>Error loading products. Please try again later.</div>;
  }
}
