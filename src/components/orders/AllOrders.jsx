"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import axios from "axios";
import { getToken } from "@/app/config/actions";
import BreadcrumbCustome from "../BreadcrumbCustome";
import Link from "next/link";
import OrderTableSkeleton from "../OrderTableSkeleton";
import SelectStarRating from "../product/SelectStarRating";
import { toast } from "react-toastify";

const AllOrders = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [showName, setShowName] = useState(false);
  const [expand, setExpand] = useState();
  const [formID, setFormID] = useState();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState({
    product_rating: 0,
    store_rating: 0,
    delivery_rating: 0,
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Append new files to existing files
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleReviewFormShow = (id, product_id) => {
    setFormID(product_id);
    setExpand(!expand);
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}all-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formateDate = (date) => {
    const utcDateTime = new Date(date);

    // Convert the UTC datetime to local time
    const localDateTime = utcDateTime.toLocaleString();

    // Get the formatted date in "Month Day, Year" format
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(utcDateTime);
    return formattedDate;
  };

  const handleTextareaChange = (event) => {
    event.preventDefault();
    setReviewText(event.target.value);
  };

  const handleCheckboxChange = () => {
    setShowName(!showName);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (reviewText.trim() === "") {
      errors.reviewText = "Review text is required";
      isValid = false;
    }

    if (rating.product_rating === 0) {
      errors.productRating = "Product rating is required";
      isValid = false;
    }

    if (rating.store_rating === 0) {
      errors.storeRating = "Store rating is required";
      isValid = false;
    }

    if (rating.delivery_rating === 0) {
      errors.deliveryRating = "Delivery rating is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const token = await getToken();
   

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}create-review`,
        {
          product_id: formID,
          product_review: reviewText,
          product_rating: rating.product_rating,
          store_rating: rating.store_rating,
          delivery_rating: rating.delivery_rating,
          images: selectedFiles,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code == 200) {
        toast.success("Review submitted successfully!");
        setReviewText("");
        setSelectedFiles([]);
        setExpand(false);
        setFormID();
        setRating({
          product_rating: 0,
          store_rating: 0,
          delivery_rating: 0,
        });
      } else if (response.data.code == 422) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error submitting review!");
    } finally {
      // Enable the button
      setIsLoading(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="bg-gray-50 p-1 md:p-6 mx-auto">
        <BreadcrumbCustome />
        <div className="">
          {isLoading ? (
            <div className="">
              <OrderTableSkeleton />
            </div>
          ) : orders.data?.length ? (
            orders.data?.map((order, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <div className="flex  md:space-x-6 py-5">
                      <p className="">
                        Order ID:{" "}
                        <span className=" text-primary">{order.order_id}</span>
                      </p>
                      <h4 className="text-[#00B420]">
                        Placed On: {formateDate(order.created_at)}
                      </h4>
                    </div>
                    {order.status === "cancelled" ? (
                      ""
                    ) : (
                      <Link href={`/orders/${order.id}`}>
                        <div className="">
                          <div className="bg-secondary text-primary">
                            Manage
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>

                  {order.order_items.map((item, index) => {
                    return (
                      <>
                        <h3>{}</h3>
                        <div
                          key={item.id}
                          className="py-4 md:py-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-6"
                        >
                          <div className="flex flex-row items-center space-x-4 mb-4 md:mb-0">
                            {/* <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}Productimages/${item.product?.images[0]?.image}`}
                              alt={item.product.name}
                              className="w-16 h-20 border border-primary"
                              height="100"
                              style={{
                                aspectRatio: "80/100",
                                objectFit: "cover",
                              }}
                              width="80"
                            /> */}
                            <div className="">
                              <h3 className="text-lg font-semibold">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-gray-500 w-96">
                                {/* {item.product.category.name} */}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between  md:gap-x-28 pb-4">
                            <div className="text-[#214A25]">
                              {formateDate(item.product.updated_at)}
                            </div>
                            <div className="">
                              <p>Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="">
                              <div className="flex  items-center justify-between md:space-x-2 ">
                                {order.status === "pending" ? (
                                  <div
                                    style={{ color: "#214A25" }}
                                    className="font-semibold bg-secondary rounded-none text-secondary py-2.5 px-5"
                                  >
                                    {`${order.status
                                      .charAt(0)
                                      .toUpperCase()}${order.status.slice(1)}`}
                                  </div>
                                ) : (
                                  <div
                                    style={{ color: "text-secondary" }}
                                    className="font-semibold bg-red-500 rounded-none text-secondary py-2.5 px-5"
                                  >
                                    {`${order.status
                                      .charAt(0)
                                      .toUpperCase()}${order.status.slice(1)}`}
                                  </div>
                                )}

                                {order.status === "cancelled" ? (
                                  " "
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleReviewFormShow(
                                        item.id,
                                        item.product.id
                                      )
                                    }
                                    className="hover:bg-secondary whitespace-nowrap bg-[#F7EAE3] rounded-none text-primary"
                                  >
                                    Write a Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {expand && formID == item.product.id ? (
                          <div id="" className="">
                            <div className="mt-4 grid gap-6 md:grid-cols-3">
                              <div className="bg-[#F7EAE3] py-2 flex flex-col  justify-center items-center">
                                <h4 className="font-semibold text-md mb-2  text-[#214A25]">
                                  Product Rating
                                </h4>
                                <div className="flex space-x-1">
                                  <SelectStarRating
                                    onChange={(count) =>
                                      setRating({
                                        ...rating,
                                        product_rating: count,
                                      })
                                    }
                                  />
                                </div>
                                {errors.productRating && (
                                  <p className="text-red-500 mt-1">
                                    {errors.productRating}
                                  </p>
                                )}
                              </div>
                              <div className="bg-[#F7EAE3] py-2 flex flex-col justify-center items-center">
                                <h4 className="font-semibold text-md mb-2 text-[#214A25]">
                                  Seller Rating
                                </h4>
                                <div className="flex space-x-1">
                                  <SelectStarRating
                                    onChange={(count) =>
                                      setRating({
                                        ...rating,
                                        store_rating: count,
                                      })
                                    }
                                  />
                                </div>
                                {errors.storeRating && (
                                  <p className="text-red-500 mt-1">
                                    {errors.storeRating}
                                  </p>
                                )}
                              </div>
                              <div className="bg-[#F7EAE3] py-2 flex flex-col justify-center items-center">
                                <h4 className="font-semibold text-md mb-2 text-[#214A25]">
                                  Delivery Rating
                                </h4>
                                <div className="flex space-x-1">
                                  <SelectStarRating
                                    onChange={(count) =>
                                      setRating({
                                        ...rating,
                                        delivery_rating: count,
                                      })
                                    }
                                  />
                                </div>

                                {errors.deliveryRating && (
                                  <p className="text-red-500 mt-1">
                                    {errors.deliveryRating}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className=" mt-4 md:mt-4 md:ml-0 w-full ">
                              <div className="md:flex ">
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />
                                <Button
                                  onClick={handleButtonClick}
                                  className="text-orange-500  w-full h-[116px] border-2 border-dashed border-orange-200"
                                  variant="ghost"
                                >
                                  <CameraIcon className="text-gray-400 w-6 h-6 mr-2" />
                                  Add Photo
                                </Button>
                                <div className="flex flex-col mt-4 md:mt-0 md:ml-6 w-full ">
                                  <Textarea
                                    value={reviewText}
                                    rows="5"
                                    maxLength="250"
                                    minLength="5"
                                    onChange={handleTextareaChange}
                                    className=""
                                    placeholder="Write your review here."
                                  />
                                  {errors.reviewText && (
                                    <p className="text-red-500 mt-1">
                                      {errors.reviewText}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {selectedFiles && selectedFiles.length > 0 && (
                                <div className="mt-4 flex space-x-3">
                                  {selectedFiles.map((file, index) => (
                                    <div key={index}>
                                      <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`Selected ${index + 1}`}
                                        className="max-w-xs h-32 w-36"
                                        width={20}
                                        height={20}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              <span className="flex justify-between md:justify-center md:gap-x-2 items-center mt-4 ">
                                {/* <div className="bg-[#F7EAE3]  py-2 px-3">
                                  <Checkbox
                                    id="user-name"
                                    checked={showName}
                                    onCheckedChange={handleCheckboxChange}
                                  />
                                  <label
                                    className="text-sm font-medium leading-none ml-2"
                                    htmlFor="show-name"
                                  >
                                    Show user name
                                  </label>
                                </div> */}
                                <div className="w-full">
                                  {isLoading ? (
                                    <Button
                                      onClick={handleSubmit}
                                      disabled
                                      className="ml-auto rounded-none px-12"
                                    >
                                      {" "}
                                      Submit
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={handleSubmit}
                                      className="w-full sm:w-32 rounded-lg md:ml-auto md:rounded-none  "
                                    >
                                      {" "}
                                      Submit
                                    </Button>
                                  )}
                                </div>
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center min-h-screen ">
              <div className="text-center mb-24">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Don&apos;t have any Ordered
                </p>
                <p className="text-gray-600">
                  Please place orders to be a valuable customer.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AllOrders;

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
