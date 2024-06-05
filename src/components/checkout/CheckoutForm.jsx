"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import BillingAddress from "./BillingAddress";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { getToken } from "@/app/config/actions";

const options = [
  {
    value: "same-as-shipping",
    label: "Same as shipping address",
  },
  {
    value: "use-different",
    label: "Use a different billing address",
  },
];

const CheckoutForm = () => {
  const [errors, setErrors] = useState({});
  const [inputShow, setInputShow] = useState(false);
  const [billingApt, setBillingApt] = useState(false);
  const [token, setToken] = useState();
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [formData, setFormData] = useState({
    email: "",
    subscribe: false,
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    saveInfo: "",
    cod: "Cash on Delivery",
  });
  const [billingInfo, setBillingInfo] = useState({
    countryBill: "",
    firstNameBill: "",
    lastNameBill: "",
    addressBill: "",
    aptBill: "",
    cityBill: "",
    stateBill: "",
    zipBill: "",
    phoneBill: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const retrievedToken = await getToken();
      setToken(retrievedToken);
    })();
  }, []);

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shippingFields = [
      "email",
      "firstName",
      "lastName",
      "state",
      "city",
      "country",
      "zip",
      "phone",
      "address",
    ];
    const billingFields = [
      "countryBill",
      "firstNameBill",
      "lastNameBill",
      "addressBill",
      "zipBill",
      "phoneBill",
    ];

    let requiredFields =
      selectedOption === "same-as-shipping" ? shippingFields : billingFields;

    let hasError = false;
    const errors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(errors);
      toast.error("Please fill required fields");
      return;
    }

    const clearCart = async () => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}delete-cart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}checkout`,
        {
          Contact: formData.email,
          firstname: formData.firstName,
          lastname: formData.lastName,
          address: formData?.address,
          country: formData?.country,
          city: formData?.city,
          state: formData?.state,
          zip_code: formData.zip,
          phone: formData.phone,
          address_lable: formData.address,
          Payment_method: formData?.cod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Checkout Successfully!", {
        position: "bottom-right",
      });

      setIsLoading(false);

      clearCart();
      window.location.href = "/";

      return response;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Checkout Failed!", {
        position: "bottom-right",
      });
    }
  };

  const billingContent = (
    <div className="py-3">
      <div className="">
        <label
          className="text-black font-normal text-sm my-1 "
          htmlFor="country"
        >
          Country & Region
        </label>
        <select
          id="country"
          value={billingInfo.countryBill}
          onChange={(e) =>
            setBillingInfo({ ...billingInfo, countryBill: e.target.value })
          }
          className="flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4"
        >
          <option value="" disabled hidden className="">
            Select Country
          </option>
          <option value="pakistan">Paksitan</option>
        </select>
        {errors.countryBill && (
          <p className="text-red-500 text-xs ">{errors.countryBill}</p>
        )}
      </div>
      <div className="flex flex-wrap mb-4 gap-x-2">
        <div className="w-full md:w-[49%] ">
          <label
            className="text-black font-normal text-sm my-1"
            htmlFor="firstName"
          >
            First Name
          </label>
          <div className="relative mt-1">
            <Input
              className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
              id="firstName"
              placeholder="first name"
              type="text"
              value={billingInfo.firstNameBill}
              onChange={(e) =>
                setBillingInfo({
                  ...billingInfo,
                  firstNameBill: e.target.value,
                })
              }
            />
            {errors.firstNameBill && (
              <p className="text-red-500 text-xs ">{errors.firstNameBill}</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-[49%]">
          <label
            className="text-black font-normal text-sm my-1"
            htmlFor="lastName"
          >
            Second Name
          </label>
          <div className="relative mt-1">
            <Input
              className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
              id="lastName"
              placeholder="last name"
              type="text"
              value={billingInfo.lastNameBill}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, lastNameBill: e.target.value })
              }
            />
            {errors.lastNameBill && (
              <p className="text-red-500 text-xs ">{errors.lastNameBill}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          className="text-black font-normal text-sm my-1"
          htmlFor="address"
        >
          Address
        </label>
        <div className="relative mt-1">
          <Input
            className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
            id="address"
            placeholder="address"
            type="text"
            value={billingInfo.addressBill}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, addressBill: e.target.value })
            }
          />
          {errors.addressBill && (
            <p className="text-red-500 text-xs ">{errors.addressBill}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        {billingApt ? (
          <Input
            className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
            id="apt"
            placeholder="+ Add apartment, suite, etc."
            type="text"
            value={billingInfo.addressBill}
            onChange={(e) =>
              setBillingApt({ ...billingInfo, addressBill: e.target.value })
            }
          />
        ) : (
          <p
            htmlFor="apt"
            className="block  mb-1 font-bold cursor-pointer text-sm text-blue-500"
            onClick={() => setBillingApt(true)}
          >
            + Add apartment, suite, etc. (optional)
          </p>
        )}
      </div>

      <div className="flex gap-x-6">
        <div className="w-[30%]">
          <label className="text-black font-normal text-sm my-1" htmlFor="city">
            City
          </label>
          <div className="relative mt-1">
            <Input
              className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
              id="city"
              placeholder="City"
              type="text"
              value={billingInfo.cityBill}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, cityBill: e.target.value })
              }
            />
            {errors.cityBill && (
              <p className="text-red-500 text-xs ">{errors.cityBill}</p>
            )}
          </div>
        </div>
        <div className="w-[30%] mt-1">
          <label
            className="text-black font-normal text-sm my-1 "
            htmlFor="state"
          >
            State
          </label>
          <select
            id="state"
            value={billingInfo.stateBill}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, stateBill: e.target.value })
            }
            className="flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4"
          >
            <option value="" disabled hidden className="">
              State
            </option>
            <option value="punjab">Punjab</option>
            <option value="sindh">Sindh</option>
            <option value="balochistan">Balochistan</option>
            <option value="kpk">Kpk</option>
          </select>
        </div>
        <div className="w-[30%]">
          <label className="text-black font-normal text-sm my-1" htmlFor="zip">
            Zip code
          </label>
          <div className="relative mt-1">
            <Input
              className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
              id="zip"
              placeholder="Zip code"
              type="text"
              value={billingInfo.zipBill}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, zipBill: e.target.value })
              }
            />
            {errors.zipBill && (
              <p className="text-red-500 text-xs">{errors.zipBill}</p>
            )}
          </div>
        </div>
      </div>

      <div className="">
        <label className="text-black font-normal text-sm my-1" htmlFor="phone">
          Phone Number
        </label>
        <div className="relative mt-1">
          <Input
            className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
            id="phone"
            placeholder="Enter your phone number"
            value={billingInfo.phoneBill}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, phoneBill: e.target.value })
            }
          />
          {errors.phoneBill && (
            <p className="text-red-500 text-xs ">{errors.phoneBill}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 font-grotesk">
      <div className="flex flex-col w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <Form id="contact-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mt-1">
              <Input
                className="border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
              placeholder:text-gray-400 mb-1"
                id="email"
                placeholder="Email or Mobile phone number"
                type="email"
                maxlength="40"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs ">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="subscribe" className="text-gray-700 font-light">
              Email me with news and offers
            </label>
          </div>
          <h3 className="text-lg font-semibold mb-1">Delivery</h3>
          <label
            className="text-black font-normal text-sm my-1 "
            htmlFor="state"
          >
            Country & Region
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4"
          >
            <option value="" disabled hidden className="">
              Select Country
            </option>
            <option className="py-3" value="pakistan">
              Paksitan
            </option>
          </select>
          {errors.email && (
            <p className="text-red-500 text-xs ">{errors.email}</p>
          )}

          <div className="flex flex-wrap mb-4 gap-x-2">
            <div className="w-full md:w-[49%] ">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="firstName"
              >
                First Name
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                  id="firstName"
                  placeholder="first name"
                  type="text"
                  maxlength="20"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs ">{errors.firstName}</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-[49%]">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
                placeholder:text-gray-400 mb-1"
                  id="lastName"
                  placeholder="last name"
                  type="text"
                  maxlength="20"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs ">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="address"
            >
              Address
            </label>
            <div className="relative mt-1">
              <Input
                className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="address"
                placeholder="address"
                maxlength="60"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              {errors.address && (
                <p className="text-red-500 text-xs ">{errors.address}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            {inputShow ? (
              <Input
                className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="apt"
                placeholder="+ Add apartment, suite, etc."
                type="text"
                value={formData.apt}
                onChange={(e) =>
                  setFormData({ ...formData, apt: e.target.value })
                }
              />
            ) : (
              <p
                for="apt"
                className="block text-sm mb-1 font-bold cursor-pointer text-blue-500"
                onClick={() => setInputShow(true)}
              >
                + Add apartment, suite, etc. (optional)
              </p>
            )}
          </div>
          <div className="flex gap-x-6">
            <div className="w-[30%]">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="city"
              >
                City
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                  id="city"
                  placeholder="City"
                  maxlength="30"
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                {errors.city && (
                  <p className="text-red-500 text-xs ">{errors.city}</p>
                )}
              </div>
            </div>
            <div className="w-[30%] mt-1">
              <label
                className="text-black font-normal text-sm my-1 "
                htmlFor="state"
              >
                State
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="flex h-10 w-full  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 border-b-[1px] border-gray-800 rounded-none focus-visible:rounded focus-visible:border-hidden focus-visible:ring-offset-3 placeholder:text-gray-600 mb-4"
              >
                <option value="" disabled hidden className="">
                  State
                </option>
                <option value="punjab">Punjab</option>
                <option value="sindh">Sindh</option>
                <option value="balochistan">Balochistan</option>
                <option value="kpk">Kpk</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs ">{errors.state}</p>
              )}
            </div>
            <div className="w-[30%]">
              <label
                className="text-black font-normal text-sm my-1"
                htmlFor="email"
              >
                Zip code
              </label>
              <div className="relative mt-1">
                <Input
                  className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                  id="zip"
                  placeholder="Zip code"
                  type="zip"
                  maxlength="6"
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                />
                {errors.zip && (
                  <p className="text-red-500 text-xs ">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <label
              className="text-black font-normal text-sm my-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <div className="relative mt-1">
              <Input
                className=" border-0 border-b-[1px] border-gray-800  focus:border-0 rounded-none focus:rounded
           placeholder:text-gray-400 mb-1"
                id="phone"
                type="text"
                pattern="[0-9]*"
                maxlength="12"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => {
                  const phone = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                  if (phone.length <= 12) {
                    setFormData({ ...formData, phone });
                  }
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs ">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="save-info"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="saveInfo" className="text-gray-700 font-normal">
              Save this information for next
            </label>
          </div>
          <div className="">
            <p className="mb-1 ">Shipping method</p>
            <div className="bg-gray-100 h-12 w-full rounded-lg pl-5 text-xs flex items-center">
              Enter your shipping address to view available shipping methods.
            </div>
          </div>
          <div className="my-7 ">
            <h3 className="text-black font-normal text-lg">Payment</h3>
            <p className="text-gray-500 text-xs  py-2">
              All transactions are secure and encrypted.
            </p>
            <div className="bg-gray-200 h-12 w-full rounded-lg pl-3 text-xs flex items-center border border-orange-500">
              Cash on Delivery(COD)
            </div>
          </div>
          {/* <BillingAddress
            options={options}
            content={{
              "same-as-shipping": null,
              "use-different": billingContent,
            }}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          /> */}

          <Button
            type="submit"
            loading={isLoading}
            onClick={handleSubmit}
            className="mb-16 text-white font-bold py-2 px-4 mt-8 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            Complete Order
          </Button>
          <hr className="mb-3" />
          <div className="text-xs flex gap-x-5 text-blue-500">
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-services">Term of Service</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutForm;
