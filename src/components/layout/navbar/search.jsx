"use client";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { createUrl } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";


export default function Search({className}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef(null);
  const [isInputVisible, setInputVisible] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const searchValue = inputRef.current.value.trim(); // Trim any whitespace from the input

    const newParams = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      newParams.set("q", searchValue);
      router.push(createUrl("/search", newParams));
    } else {
      router.push("/"); // Redirect to root if input is empty
    }
  }

  function toggleInputVisibility() {
    setInputVisible(!isInputVisible);
  }

  return (
    <>
      {isInputVisible && (
        <form
          onSubmit={onSubmit}
          className="mr-2 w-max-[550px] relative w-full lg:w-80 xl:w-full"
        >
          <Input
            ref={inputRef} // Attach ref to input
            key={searchParams?.get("q")}
            type="text"
            name="search"
            placeholder="Search products..."
            autoComplete="off"
            defaultValue={searchParams?.get("q") || ""}
            className="w-full h-10 rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          />

          <button
            type="submit" // Use button instead of div for better accessibility
            className="absolute right-0 top-0 bottom-1 hover:cursor-pointer mr-3 flex h-full justify-center items-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
      )}
      {!isInputVisible && (
        <div
          onClick={toggleInputVisibility}
          className="relative flex h-10 w-10 md:mr-2 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
        >
          
         
          <MagnifyingGlassIcon  className={clsx(
          "h-4 transition-all ease-in-out hover:scale-125", className )}/>
        </div>
      )}
    </>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full flex items-center">
      <Input
        placeholder=""
        className="w-12 rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="hover:cursor-pointer ml-3 flex h-full justify-center items-center">
        <MagnifyingGlassIcon className="h-5" />
      </div>
    </form>
  );
}
