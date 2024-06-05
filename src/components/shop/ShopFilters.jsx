"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import axios from "axios";
import Image from "next/image";
import FilterColorSize from "../product/FilterColorSize";
import DropUpFilterIcon from "../iconSVG/DropUpFilterIcon";
import DropDownFilterIcon from "../iconSVG/DropDownFilterIcon";



const sortOptions = [
  // { name: "Ascending Products", href: "#", current: false },
  // { name: "Descending Products", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "garments", label: "Garments", checked: false },
      { value: "mobile", label: "Mobile", checked: false },
      { value: "bags", label: "Bags", checked: true },
      { value: "shoes", label: "Shoes", checked: false },
      { value: "laptops", label: "Laptops", checked: false },
      { value: "beauty", label: "Beauty", checked: false },
      { value: "sports", label: "Sports", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShopFilters({
  heading,
  children,
  view,
  setView,
  handleSortFilter,
  filtersAt,
  filter,
  setFilter,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [showPrice, setShowPrice] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  const [checkedFilter, setCheckedFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setIsLoading(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}view-all-products`);
        
        setProducts(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (event, optionIdx) => {
    const { checked } = event.target;
    const value = filters[0].options[optionIdx].value;

    setFilter((prev) => {
      const updatedCategory = checked
        ? [...prev.category, value]
        : prev.category.filter((item) => item !== value);
      return { ...prev, category: updatedCategory };
    });
  };

  const RemoveFilter = (value) => {
    setFilter((prev) => ({
      ...prev,
      category: prev.category.filter((item) => item !== value),
    }));
  };

 

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog icon */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters for mobile screen */}
                  <form className="flex flex-col justify-center items-center mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <div className="">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200  mt-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center ">
                                  {open ? (
                                    <DropUpFilterIcon />
                                  ) : (
                                    <DropDownFilterIcon />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center "
                                  >
                                    <div className="">
                                      {section.id !== "size" && (
                                        <>
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            onChange={(e) =>
                                              handleCheckboxChange(e, optionIdx)
                                            }
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    </div>

                    <FilterColorSize filter={filter} setFilter={setFilter} />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex  justify-between  border-b border-gray-200 pb-6 pt-24">
            <div className="hidden  sm:flex space-x-64 items-center">
              {" "}
              <h3 className="hidden  text-primary font-semibold text-xl py sm:flex gap-x-2">
                <Image
                  src="/SVGs/filterIcon.svg"
                  alt="Filter Icon"
                  width={15}
                  height={15}
                />{" "}
                Filters
              </h3>
              <h3 className="md:text-lg lg:text-xl font-semibold">{heading}</h3>
            </div>

            <div className="flex items-center gap-x-64  xxsm:gap-x-64 xsm:bg-red-700 xsm:gap-x-60 sm:gap-x-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-md font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 md:right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              onClick={() => handleSortFilter(option.name)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900 "
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                onClick={() => setView("grid4x")}
                className={`hidden sm:block -m-2 ml-5 p-2 text-gray-400  hover:text-gray-500 sm:ml-7 ${
                  view === "grid4x" && "bg-secondary rounded-lg"
                }`}
              >
                <span className=" sr-only">View grid</span>
                <Squares2X2Icon className=" h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setView("list")}
                className={`hidden sm:block -m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 ${
                  view === "list" && "bg-secondary rounded-lg"
                }`}
              >
                <span className="sr-only">View list</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className=" flex  md:gap-x-12">
              {/* Filters for desktop at left side */}
              <form className="hidden lg:block lg:basis-1/7">
                <div className="">
                  <h3 className="font-semibold ">Promotion &amp; Services</h3>
                  <div className="w-full flex gap-x-2 mt-3">
                    <div className="flex-1 flex justify-center items-center bg-[#FFF6F1;]">
                      <svg
                        width="48"
                        height="24"
                        viewBox="0 0 64 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_182_4898)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M51.1462 8.32803L43.5737 8.28232V3.2384C43.5737 2.48664 43.261 1.80599 42.7688 1.31836C42.2715 0.825656 41.5896 0.515808 40.8257 0.515808H12.3403C11.5815 0.515808 10.8945 0.825656 10.4023 1.31328C9.90503 1.80599 9.59741 2.48156 9.59741 3.23332C9.59741 3.64984 9.92554 3.96985 10.3408 3.96985C10.7561 3.96985 11.0842 3.64476 11.0842 3.23332C11.0842 2.893 11.2227 2.57299 11.4585 2.35458C11.6892 2.126 12.002 1.98377 12.3455 1.98377H40.8308C41.1743 1.98377 41.4819 2.12092 41.7178 2.35458C41.9485 2.58315 42.092 2.893 42.092 3.23332V26.3449H36.2114C35.791 26.3449 35.468 26.67 35.468 27.0814C35.468 27.4827 35.7961 27.818 36.2114 27.818H42.8303C43.2507 27.818 43.5737 27.4929 43.5737 27.0814V26.2332H48.0752C48.4187 18.5428 59.5442 17.4863 60.6772 26.2332H63.1279C63.4509 24.5265 63.333 22.5353 62.8818 20.341C62.3589 17.7809 62.5127 18.2787 60.0979 17.3593L55.176 15.1752L51.1462 8.32803ZM9.74609 16.4958C10.1614 16.4958 10.4946 16.8311 10.4946 17.2374C10.4946 17.6489 10.1562 17.979 9.74609 17.979H4.42432C4.00903 17.979 3.67578 17.6438 3.67578 17.2374C3.67578 16.826 4.01416 16.4958 4.42432 16.4958H9.74609ZM9.74609 11.6348C10.1614 11.6348 10.4946 11.97 10.4946 12.3764C10.4946 12.7878 10.1562 13.118 9.74609 13.118H3.0144C2.59912 13.118 2.26587 12.7827 2.26587 12.3764C2.26587 11.9649 2.60425 11.6348 3.0144 11.6348H9.74609ZM9.74609 6.77371C10.1614 6.77371 10.4946 7.10896 10.4946 7.51532C10.4946 7.92675 10.1562 8.25692 9.74609 8.25692H1.06104C0.650879 8.262 0.3125 7.92675 0.3125 7.5204C0.3125 7.10896 0.650879 6.77879 1.06104 6.77879H9.74609V6.77371ZM33.6736 6.61117H38.5852V8.76487H36.6216V10.8271H38.457V12.8742H36.6216V15.2463H38.7852V17.4H33.6736V6.61117ZM27.47 6.61117H32.3816V8.76487H30.418V10.8271H32.2534V12.8742H30.418V15.2463H32.5815V17.4H27.47V6.61117ZM19.5078 6.61117H21.5894C22.9788 6.61117 23.917 6.66197 24.4092 6.76356C24.9014 6.86514 25.3013 7.12928 25.614 7.54579C25.9268 7.96231 26.0806 8.6328 26.0806 9.55218C26.0806 10.3903 25.9729 10.9541 25.7524 11.2436C25.5371 11.5332 25.1013 11.7059 24.4604 11.7618C25.0449 11.8989 25.4346 12.0868 25.6345 12.3154C25.8345 12.544 25.9575 12.7573 26.0088 12.9503C26.0601 13.1434 26.0806 13.6767 26.0806 14.5453V17.3949H23.3479V13.8037C23.3479 13.2246 23.3018 12.8691 23.2043 12.7319C23.1121 12.5948 22.8608 12.5237 22.4609 12.5237V17.3949H19.5129V6.61117H19.5078ZM22.4558 8.45502V10.8576C22.7839 10.8576 23.0146 10.817 23.1479 10.7255C23.2812 10.6392 23.3479 10.3547 23.3479 9.88235V9.28805C23.3479 8.94265 23.2812 8.71915 23.1582 8.61248C23.0249 8.50581 22.7942 8.45502 22.4558 8.45502ZM13.5554 6.61117H18.5388V8.76487H16.5034V10.8271H18.3081V12.8742H16.5034V17.405H13.5554V6.61117ZM20.8767 26.35C21.2817 26.35 21.6201 26.6751 21.6201 27.0865C21.6201 27.4878 21.292 27.823 20.8767 27.823H12.3557C11.5969 27.823 10.9099 27.4979 10.4177 26.9951C9.92041 26.4871 9.61279 25.7811 9.61279 25.0446V22.0934C9.61279 21.6921 9.94092 21.3569 10.3562 21.3569C10.7766 21.3569 11.0996 21.682 11.0996 22.0934V25.0446C11.0996 25.4001 11.2534 25.7354 11.4893 25.9843C11.72 26.2128 12.0173 26.3703 12.3608 26.3703L20.8767 26.35ZM28.4492 21.5194C25.655 21.5194 23.4043 23.7645 23.4043 26.5176C23.4043 29.2859 25.6704 31.5158 28.4492 31.5158C31.2434 31.5158 33.4941 29.2707 33.4941 26.5176C33.4941 23.7493 31.228 21.5194 28.4492 21.5194ZM28.4492 24.5976C27.3777 24.5976 26.5112 25.4611 26.5112 26.5176C26.5112 27.5792 27.3828 28.4377 28.4492 28.4377C29.5208 28.4377 30.3872 27.5741 30.3872 26.5176C30.3923 25.456 29.5208 24.5976 28.4492 24.5976ZM54.3762 21.5194C51.582 21.5194 49.3313 23.7645 49.3313 26.5176C49.3313 29.2859 51.5974 31.5158 54.3762 31.5158C57.1704 31.5158 59.4211 29.2707 59.4211 26.5176C59.4211 23.7493 57.155 21.5194 54.3762 21.5194ZM54.3762 24.5976C53.3047 24.5976 52.4382 25.4611 52.4382 26.5176C52.4382 27.5792 53.3098 28.4377 54.3762 28.4377C55.4478 28.4377 56.3142 27.5741 56.3142 26.5176C56.3142 25.456 55.4478 24.5976 54.3762 24.5976ZM49.2083 10.436L45.4502 10.3903V15.1853H51.7512L49.2083 10.436Z"
                            fill="#F97316"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_182_4898">
                            <rect
                              width="63"
                              height="31"
                              fill="white"
                              transform="translate(0.3125 0.515808)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center items-center bg-[#FFF6F1;]">
                      <svg
                        width="48"
                        height="20"
                        viewBox="0 0 50 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_182_4903)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.4467 0.0158081H49.1152V23.894H46.0288L46.2441 6.37337V6.16512C46.2441 5.42174 45.9447 4.70874 45.4116 4.18272C44.8786 3.6567 44.1554 3.36066 43.401 3.35962H5.43872V0.0158081H5.4467ZM0.115234 5.68182H43.7838V28.0158H0.115234V5.68182Z"
                            fill="#F97316"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M36.6895 9.15137C36.7063 9.9839 37.0465 10.7784 37.64 11.3712C38.2334 11.964 39.035 12.31 39.8796 12.338V21.1749C39.4275 21.1753 38.98 21.2648 38.5635 21.4379C38.1469 21.6111 37.7697 21.8645 37.454 22.1833C37.1382 22.5022 36.8903 22.8799 36.7248 23.2945C36.5592 23.709 36.4794 24.152 36.4901 24.5973H7.46012C7.47326 23.7373 7.14433 22.9063 6.54369 22.2822C5.94305 21.658 5.11839 21.2902 4.24609 21.2575V12.4205C5.13629 12.43 5.99393 12.0911 6.63086 11.4782C7.26779 10.8653 7.63199 10.0285 7.64355 9.15137H36.6895Z"
                            fill="#F7EAE3"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.1776 13.839C16.7991 12.6894 17.7525 11.7472 18.9175 11.1315C20.0824 10.5159 21.4064 10.2545 22.7221 10.3803C24.0378 10.5062 25.2861 11.0137 26.309 11.8387C27.332 12.6636 28.0838 13.7689 28.4692 15.0149C28.8546 16.2608 28.8564 17.5914 28.4743 18.8384C28.0922 20.0853 27.3435 21.1926 26.3227 22.0202C25.302 22.8479 24.0551 23.3586 22.7397 23.4879C21.4244 23.6172 20.0996 23.3593 18.9331 22.7467C18.1583 22.3404 17.4723 21.7876 16.9144 21.1199C16.3566 20.4523 15.9377 19.6828 15.6818 18.8555C15.4259 18.0283 15.338 17.1594 15.4231 16.2987C15.5081 15.4379 15.7645 14.6021 16.1776 13.839Z"
                            fill="#F97316"
                          />
                          <path
                            d="M22.1346 21.7761C22.0526 21.7772 21.9712 21.762 21.8953 21.7316C21.8193 21.7012 21.7503 21.6561 21.6923 21.5989C21.6343 21.5418 21.5886 21.4738 21.5577 21.399C21.5268 21.3241 21.5114 21.2439 21.5125 21.1631V20.5659C21.1524 20.5459 20.7962 20.4825 20.4518 20.3773C20.1857 20.2902 19.927 20.1824 19.6782 20.0551C19.5931 20.019 19.517 19.9652 19.4551 19.8973C19.3931 19.8295 19.3468 19.7493 19.3193 19.6622C19.272 19.4977 19.2804 19.3225 19.3432 19.1631C19.4055 19.011 19.5237 18.8875 19.6742 18.8174C19.7635 18.7832 19.8595 18.7697 19.9549 18.7779C20.0503 18.7861 20.1425 18.8157 20.2245 18.8645C20.4458 18.9749 20.6767 19.0657 20.9144 19.1356C21.267 19.234 21.6325 19.2803 21.999 19.2732C22.3507 19.3034 22.7033 19.2251 23.0079 19.0492C23.1009 18.9862 23.1768 18.9017 23.2289 18.803C23.2811 18.7044 23.3079 18.5946 23.3069 18.4834C23.3086 18.397 23.2909 18.3114 23.2551 18.2326C23.2192 18.1538 23.1661 18.0838 23.0996 18.0276C22.8808 17.8705 22.626 17.7693 22.3579 17.7329L21.2254 17.4893C19.9733 17.2273 19.3472 16.5724 19.3472 15.5246C19.3419 15.2569 19.3914 14.9909 19.4928 14.7424C19.5942 14.494 19.7454 14.2682 19.9374 14.0787C20.3662 13.6692 20.9196 13.4097 21.5125 13.34V12.7034C21.5111 12.6235 21.5259 12.5441 21.556 12.4699C21.5862 12.3957 21.631 12.3281 21.688 12.2712C21.7462 12.2132 21.8159 12.1676 21.8927 12.1372C21.9695 12.1068 22.0518 12.0922 22.1346 12.0944C22.2149 12.0925 22.2948 12.1073 22.3689 12.1378C22.4431 12.1682 22.51 12.2137 22.5652 12.2712C22.6222 12.3281 22.667 12.3957 22.6971 12.4699C22.7273 12.5441 22.7421 12.6235 22.7407 12.7034V13.3125C23.0117 13.3477 23.2788 13.4082 23.5382 13.4932C23.7927 13.5748 24.0343 13.6912 24.256 13.839C24.3305 13.8813 24.3957 13.9379 24.4477 14.0053C24.4998 14.0728 24.5376 14.1498 24.559 14.2319C24.5955 14.3835 24.5786 14.5428 24.5112 14.6838C24.4789 14.7534 24.4326 14.8158 24.375 14.8672C24.3174 14.9185 24.2498 14.9577 24.1762 14.9824C24.0824 15.0092 23.9839 15.0164 23.8871 15.0035C23.7903 14.9907 23.6973 14.9581 23.614 14.9077C23.4199 14.8137 23.2169 14.7386 23.0079 14.6838C22.7473 14.6188 22.4791 14.5884 22.2103 14.5934C21.8796 14.5736 21.5511 14.659 21.2732 14.837C21.1678 14.9055 21.0816 14.9989 21.0223 15.1087C20.9631 15.2186 20.9328 15.3413 20.9343 15.4657C20.9319 15.5508 20.9486 15.6354 20.983 15.7135C21.0175 15.7915 21.0689 15.8612 21.1337 15.9176C21.3424 16.068 21.5842 16.1676 21.8395 16.2083L22.9839 16.4519C23.5267 16.5379 24.0317 16.7798 24.4354 17.1474C24.5919 17.3126 24.7137 17.5066 24.7938 17.7184C24.8739 17.9301 24.9106 18.1554 24.902 18.3812C24.9107 18.6459 24.8626 18.9094 24.7609 19.1545C24.6592 19.3996 24.5062 19.6208 24.3118 19.8036C23.8827 20.1917 23.345 20.4436 22.7686 20.5266V21.1631C22.7702 21.2431 22.7555 21.3225 22.7254 21.3968C22.6952 21.471 22.6503 21.5386 22.5931 21.5954C22.5381 21.6534 22.4714 21.6995 22.3972 21.7306C22.323 21.7617 22.2431 21.7772 22.1625 21.7761H22.1346Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_182_4903">
                            <rect
                              width="49"
                              height="28"
                              fill="white"
                              transform="translate(0.115234 0.0158081)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200  mt-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center ">
                              {open ? (
                                <DropUpFilterIcon />
                              ) : (
                                <DropDownFilterIcon />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center "
                              >
                                <div className="">
                                  {section.id !== "size" && (
                                    <>
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        onChange={(e) =>
                                          handleCheckboxChange(e, optionIdx)
                                        }
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}

                <FilterColorSize filter={filter} setFilter={setFilter} />

                {/* Price  */}
                {/* <div className="">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrice(!showPrice);
                    }}
                    className="flex  items-center justify-between w-full font-semibold gap-2"
                  >
                    <h3 className="font-semibold mb-3">Price</h3>
                    <DropDownIcon
                      className={`${showPrice ? "rotate-180 " : ""}`}
                    />
                  </button>
                  {showPrice && (
                    <div className="flex justify-center items-center gap-x-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Min Price"
                          value={minPrice}
                          className="rounded-none"
                        />
                      </div>
                      <span className="text-primary font-semibold ">&#45;</span>
                      <div className="flex-1">
                        <Input
                          placeholder="Max Price"
                          value={maxPrice}
                          className="rounded-none"
                        />
                      </div>
                    </div>
                  )}
                </div> */}

                {/* Brand  */}

                {/* <div className="">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowBrand(!showBrand);
                    }}
                    className="flex  items-center justify-between w-full font-semibold gap-2"
                  >
                    <h3 className="font-semibold mb-3">Brand</h3>
                    <DropDownIcon
                      className={`${showBrand ? "rotate-180 " : ""}`}
                    />
                  </button>
                  {showBrand && (
                    <div className="flex justify-center items-center gap-x-2"></div>
                  )}
                </div> */}
              </form>

              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
